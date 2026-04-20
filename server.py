#!/usr/bin/env python3
"""Web backend for bitfsd-annotator, replacing the Tauri Rust backend."""

from __future__ import annotations

import json
import os
import re
import shutil
import shlex
import signal
import subprocess
import sys
import threading
import time
import uuid
import atexit
import tempfile
from collections import deque
from pathlib import Path
from typing import Any, Optional

import numpy as np
import yaml
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# ---------------------------------------------------------------------------
# Import helpers from existing workspace_tools
# ---------------------------------------------------------------------------
ROOT_DIR = Path(__file__).parent.resolve()
SCRIPTS_DIR = ROOT_DIR / "scripts"
CONFIG_DIR = ROOT_DIR / "config" / "openpcdet"
LOCAL_ENV_PYTHON = ROOT_DIR / ".conda-env" / "bin" / "python3"
DEFAULT_OPENPCDET_ROOT = ROOT_DIR / "third_party" / "OpenPCDet"
DEFAULT_DATASET_CFG = CONFIG_DIR / "dataset_configs" / "cone_dataset.yaml"
DEFAULT_MODEL_CFG = CONFIG_DIR / "cone_models" / "pointpillar_cone.yaml"
sys.path.insert(0, str(SCRIPTS_DIR))
from point_cloud_utils import sanitize_points  # noqa: E402
from workspace_tools import (  # noqa: E402
    ensure_workspace,
    load_annotation,
    read_frame_ids,
    read_pcd_points,
)

app = FastAPI(title="bitfsd-annotator")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

TASK_PROGRESS_MARKER = "@@progress@@ "
TASK_RUNTIME_LOCK = threading.Lock()
TASK_RUNTIMES: dict[str, dict[str, Any]] = {}
ACTIVE_TASK_STATUSES = {"pending", "running", "paused"}
FINAL_TASK_STATUSES = {"succeeded", "failed", "cancelled"}
ORPHAN_TASK_ERROR = "后端已中断，旧任务已停止"
MAX_TRAINING_HISTORY_POINTS = 240

# ---------------------------------------------------------------------------
# Pydantic models
# ---------------------------------------------------------------------------

class AnnotationBox(BaseModel):
    box_id: str
    class_name: str
    center_xyz: list[float]
    size_lwh: list[float]
    yaw: float
    score: Optional[float] = None

class FrameAnnotation(BaseModel):
    frame_id: str
    source: str  # manual | propagated | model
    review_status: str  # unreviewed | reviewed | rejected
    boxes: list[AnnotationBox]
    updated_at_ms: int

class ClassDefinition(BaseModel):
    id: str
    name: str
    color: str
    default_size: list[float]

class WorkspaceSettings(BaseModel):
    python_bin: str = ""
    openpcdet_root: str = ""
    model_config_path: str = ""
    dataset_config_path: str = ""
    checkpoint_path: str = ""
    score_threshold: float = 0.05
    min_reviewed_for_training: int = 16
    train_extra_args: str = "--epochs 30 --workers 0 --ckpt_save_interval 0 --ckpt_save_step_interval 250 --save_best"
    infer_extra_args: str = ""

class OpenWorkspaceReq(BaseModel):
    workspace_path: str

class InspectWorkspaceReq(BaseModel):
    path: str

class LoadFrameReq(BaseModel):
    workspace_path: str
    frame_id: str
    max_points: int = 260000
    view_range: Optional[list[float]] = None

class SaveAnnotationReq(BaseModel):
    workspace_path: str
    annotation: FrameAnnotation

class SaveClassesReq(BaseModel):
    workspace_path: str
    classes: list[ClassDefinition]

class SaveSettingsReq(BaseModel):
    workspace_path: str
    settings: WorkspaceSettings

class SaveTrainingSettingsReq(BaseModel):
    root_path: str
    settings: WorkspaceSettings

class ExtractPcdReq(BaseModel):
    bag_path: str
    workspace_path: str
    topic: Optional[str] = None
    frame_step: int = 5

class PackageGroupsReq(BaseModel):
    bag_path: str
    output_root: str
    topic: Optional[str] = None
    frame_step: int = 5
    group_size: int = 20
    min_travel_m: float = 0.0
    replace_existing: bool = True

class ExportReq(BaseModel):
    workspace_path: str
    output_path: Optional[str] = None
    reviewed_only: bool = False
    annotated_only: bool = False
    frame_ids: Optional[list[str]] = None
    points_only: bool = False

class InferRangeReq(BaseModel):
    workspace_path: str
    frame_ids: list[str]
    checkpoint_path: str = ""
    score_threshold: Optional[float] = None

class ImportPredictionsReq(BaseModel):
    workspace_path: str
    predictions_path: str

class ReadTaskLogReq(BaseModel):
    log_path: str

class OpenTrainingRootReq(BaseModel):
    root_path: str

class TrainOpenpcdetReq(BaseModel):
    root_path: str
    task_name: str = ""


class ControlTaskReq(BaseModel):
    workspace_path: str
    task_id: str
    action: str


class ListTrainingFramesReq(BaseModel):
    dataset_path: str


class LoadTrainingFrameReq(BaseModel):
    dataset_path: str
    frame_id: str
    max_points: int = 260000
    view_range: Optional[list[float]] = None


class InferTrainingFrameReq(BaseModel):
    root_path: str
    dataset_path: str
    frame_id: str
    checkpoint_path: str = ""
    model_config_path: str = ""
    openpcdet_root: str = ""
    python_bin: str = ""
    score_threshold: Optional[float] = None


class OpenModelTestRootReq(BaseModel):
    root_path: str


class ListModelTestFramesReq(BaseModel):
    source_path: str
    source_kind: str


class LoadModelTestFrameReq(BaseModel):
    source_path: str
    source_kind: str
    frame_id: str
    max_points: int = 260000
    view_range: Optional[list[float]] = None


class InferModelTestFrameReq(BaseModel):
    source_path: str
    source_kind: str
    frame_id: str
    checkpoint_path: str = ""
    model_config_path: str = ""
    openpcdet_root: str = ""
    python_bin: str = ""
    score_threshold: Optional[float] = None

# ---------------------------------------------------------------------------
# Defaults
# ---------------------------------------------------------------------------

DEFAULT_CLASSES: list[dict[str, Any]] = [
    {"id": "cone", "name": "Cone", "color": "#FF9F1C", "default_size": [0.228, 0.228, 0.325]},
]

DEFAULT_SETTINGS: dict[str, Any] = {
    "python_bin": str(LOCAL_ENV_PYTHON) if LOCAL_ENV_PYTHON.exists() else sys.executable,
    "openpcdet_root": str(DEFAULT_OPENPCDET_ROOT) if DEFAULT_OPENPCDET_ROOT.exists() else "",
    "model_config_path": str(DEFAULT_MODEL_CFG.resolve()) if DEFAULT_MODEL_CFG.exists() else "",
    "dataset_config_path": str(DEFAULT_DATASET_CFG.resolve()) if DEFAULT_DATASET_CFG.exists() else "",
    "checkpoint_path": "",
    "score_threshold": 0.05,
    "min_reviewed_for_training": 16,
    "train_extra_args": "--epochs 200 --batch_size 2 --workers 0 --ckpt_save_interval 0 --ckpt_save_step_interval 500 --save_best",
    "infer_extra_args": "",
}

MODEL_PRESET_METADATA: dict[str, dict[str, str]] = {
    "pointpillar_cone": {
        "label": "PointPillar",
        "description": "速度最快，适合快速迭代和基线训练。",
    },
    "second_cone": {
        "label": "SECOND",
        "description": "体素卷积基线，速度和精度更均衡。",
    },
    "centerpoint_cone": {
        "label": "CenterPoint",
        "description": "中心点检测头，对小目标召回通常更友好，训练成本高于 PointPillar。",
    },
    "pv_rcnn_cone": {
        "label": "PV-RCNN",
        "description": "两阶段模型，更重更慢，但精度上限通常更高。",
    },
}

MODEL_PRESET_ORDER = {
    "pointpillar_cone": 0,
    "second_cone": 1,
    "centerpoint_cone": 2,
    "pv_rcnn_cone": 3,
}

# ---------------------------------------------------------------------------
# Workspace helpers
# ---------------------------------------------------------------------------

def workspace_root(path: str) -> Path:
    return Path(path).expanduser().resolve()


def ensure_mapping(value: Any) -> dict[str, Any]:
    return value if isinstance(value, dict) else {}


def build_task_failure_messages(lines: list[str], returncode: int) -> tuple[str, str]:
    meaningful_lines = []
    for raw_line in lines:
        line = raw_line.rstrip()
        if not line or TASK_PROGRESS_MARKER in line:
            continue
        meaningful_lines.append(line)

    fallback = f"exit code {returncode}"
    if not meaningful_lines:
        return fallback, fallback

    detail_lines = meaningful_lines[-20:]
    error_markers = (
        "error",
        "exception",
        "traceback",
        "failed",
        "fatal",
        "runtimeerror",
        "modulenotfounderror",
        "filenotfounderror",
        "valueerror",
    )
    summary = next(
        (
            line
            for line in reversed(meaningful_lines)
            if any(marker in line.lower() for marker in error_markers)
        ),
        meaningful_lines[-1],
    )
    if summary.lower().startswith("traceback") and len(meaningful_lines) >= 2:
        summary = meaningful_lines[-1]
    summary = summary[:400] if len(summary) > 400 else summary
    return summary, "\n".join(detail_lines)


def list_openpcdet_model_presets() -> list[dict[str, str]]:
    model_dir = CONFIG_DIR / "cone_models"
    if not model_dir.exists():
        return []

    dataset_cfg_path = str(DEFAULT_DATASET_CFG.resolve()) if DEFAULT_DATASET_CFG.exists() else ""
    presets: list[dict[str, str]] = []
    for model_cfg_path in sorted(model_dir.glob("*.yaml")):
        try:
            payload = ensure_mapping(yaml.safe_load(model_cfg_path.read_text(encoding="utf-8")))
        except Exception:
            continue

        model_id = model_cfg_path.stem
        model_name = str(ensure_mapping(payload.get("MODEL")).get("NAME") or model_id)
        metadata = MODEL_PRESET_METADATA.get(model_id, {})
        label = metadata.get("label") or model_name
        description = metadata.get("description") or f"{model_name} 模型模板"
        presets.append(
            {
                "id": model_id,
                "label": label,
                "model_name": model_name,
                "description": description,
                "model_config_path": str(model_cfg_path.resolve()),
                "dataset_config_path": dataset_cfg_path,
            }
        )

    presets.sort(key=lambda item: (MODEL_PRESET_ORDER.get(item["id"], 999), item["label"].lower()))
    return presets


def list_checkpoint_candidates(root: Path, settings: dict[str, Any] | None = None) -> list[str]:
    resolved_root = root.expanduser().resolve()
    active_settings = settings or load_training_settings(resolved_root)
    candidates: list[tuple[float, str]] = []
    seen: set[str] = set()

    def add_candidate(path: Path) -> None:
        try:
            resolved = str(path.expanduser().resolve())
        except Exception:
            return
        if resolved in seen or not Path(resolved).exists():
            return
        seen.add(resolved)
        try:
            modified = Path(resolved).stat().st_mtime
        except Exception:
            modified = 0.0
        candidates.append((modified, resolved))

    configured_ckpt = str(active_settings.get("checkpoint_path") or "").strip()
    if configured_ckpt:
        add_candidate(Path(configured_ckpt))

    for base_path in (resolved_root / "training",):
        if not base_path.exists():
            continue
        for checkpoint_path in base_path.rglob("*.pth"):
            add_candidate(checkpoint_path)

    openpcdet_root = str(active_settings.get("openpcdet_root") or "").strip()
    if openpcdet_root:
        output_root = Path(openpcdet_root).expanduser().resolve() / "output"
        if output_root.exists():
            for checkpoint_path in output_root.rglob("*.pth"):
                add_candidate(checkpoint_path)

    candidates.sort(key=lambda item: item[0], reverse=True)
    return [path for _, path in candidates[:64]]


def ensure_meta(ws: Path) -> None:
    ensure_workspace(ws)
    classes_path = ws / "meta" / "classes.json"
    if classes_path.exists():
        try:
            current_classes = json.loads(classes_path.read_text(encoding="utf-8"))
        except Exception:
            current_classes = None
    else:
        current_classes = None
    normalized_classes = normalize_classes(current_classes)
    if current_classes != normalized_classes:
        classes_path.write_text(json.dumps(normalized_classes, indent=2), encoding="utf-8")
    settings_path = ws / "meta" / "settings.json"
    current_settings = None
    if settings_path.exists():
        try:
            current_settings = json.loads(settings_path.read_text(encoding="utf-8"))
        except Exception:
            current_settings = None
    normalized_settings = normalize_settings(current_settings)
    if current_settings != normalized_settings:
        settings_path.write_text(json.dumps(normalized_settings, indent=2), encoding="utf-8")
    (ws / "meta" / "tasks").mkdir(parents=True, exist_ok=True)


def load_classes(ws: Path) -> list[dict]:
    path = ws / "meta" / "classes.json"
    if path.exists():
        return normalize_classes(json.loads(path.read_text(encoding="utf-8")))
    return list(DEFAULT_CLASSES)


def canonicalize_cone_class_name(value: Any) -> str:
    if not isinstance(value, str):
        return ""
    name = value.strip()
    lowered = name.lower()
    if lowered == "cone" or lowered == "cone_big":
        return "Cone"
    if lowered.startswith("cone_"):
        return "Cone"
    return name


def normalize_annotation_payload(annotation: Any) -> dict[str, Any]:
    if not isinstance(annotation, dict):
        return {
            "frame_id": "",
            "source": "manual",
            "review_status": "unreviewed",
            "boxes": [],
            "updated_at_ms": 0,
        }

    normalized = dict(annotation)
    boxes = []
    for item in annotation.get("boxes", []) if isinstance(annotation.get("boxes"), list) else []:
        if not isinstance(item, dict):
            continue
        next_item = dict(item)
        normalized_name = canonicalize_cone_class_name(item.get("class_name"))
        if normalized_name:
            next_item["class_name"] = normalized_name
        boxes.append(next_item)
    normalized["boxes"] = boxes
    return normalized


def normalize_classes(classes: Any) -> list[dict[str, Any]]:
    source = classes if isinstance(classes, list) else []
    normalized: list[dict[str, Any]] = []
    seen_ids: set[str] = set()
    fallback_palette = [item["color"] for item in DEFAULT_CLASSES] or ["#58A6FF"]

    for index, item in enumerate(source):
        if not isinstance(item, dict):
            continue
        raw_name = item.get("name")
        raw_name_text = raw_name.strip() if isinstance(raw_name, str) else ""
        name = canonicalize_cone_class_name(raw_name)
        if not name:
            continue
        legacy_alias = bool(raw_name_text) and raw_name_text != name
        raw_id = item.get("id")
        base_id = raw_id.strip() if isinstance(raw_id, str) and raw_id.strip() else slugify_class_name(name) or f"class_{index + 1}"
        base_id = slugify_class_name(name) or base_id
        next_id = base_id
        suffix = 2
        while next_id.lower() in seen_ids:
            next_id = f"{base_id}_{suffix}"
            suffix += 1
        seen_ids.add(next_id.lower())
        normalized.append(
            {
                "id": next_id,
                "name": name,
                "color": normalize_hex_color(
                    item.get("color"),
                    DEFAULT_CLASSES[0]["color"] if legacy_alias and name == DEFAULT_CLASSES[0]["name"] else fallback_palette[index % len(fallback_palette)],
                ),
                "default_size": list(DEFAULT_CLASSES[0]["default_size"]) if legacy_alias and name == DEFAULT_CLASSES[0]["name"] else normalize_default_size(item.get("default_size")),
            }
        )

    if normalized:
        return normalized
    return [dict(item) for item in DEFAULT_CLASSES]


def slugify_class_name(value: str) -> str:
    return re.sub(r"(^_+|_+$)", "", re.sub(r"[^a-z0-9]+", "_", value.strip().lower()))


def normalize_hex_color(value: Any, fallback: str = "#58A6FF") -> str:
    if isinstance(value, str):
        color = value.strip()
        if re.fullmatch(r"#[0-9a-fA-F]{6}", color):
            return color.upper()
        if re.fullmatch(r"#[0-9a-fA-F]{3}", color):
            return f"#{color[1] * 2}{color[2] * 2}{color[3] * 2}".upper()
    return fallback


def normalize_default_size(value: Any) -> list[float]:
    fallback = [0.3, 0.3, 0.4]
    if not isinstance(value, list) or len(value) != 3:
        return list(fallback)
    normalized: list[float] = []
    for index, item in enumerate(value):
        try:
            parsed = float(item)
        except (TypeError, ValueError):
            return list(fallback)
        if parsed <= 0:
            return list(fallback)
        normalized.append(parsed if parsed > 0 else fallback[index])
    return normalized


def load_settings(ws: Path) -> dict:
    path = ws / "meta" / "settings.json"
    if path.exists():
        return normalize_settings(json.loads(path.read_text(encoding="utf-8")))
    return dict(DEFAULT_SETTINGS)


def normalize_settings(settings: Any) -> dict[str, Any]:
    source = settings if isinstance(settings, dict) else {}
    normalized = dict(DEFAULT_SETTINGS)
    for key, value in source.items():
        if key not in normalized:
            continue
        normalized[key] = value
    if not str(normalized.get("python_bin") or "").strip():
        normalized["python_bin"] = str(LOCAL_ENV_PYTHON) if LOCAL_ENV_PYTHON.exists() else sys.executable
    if not str(normalized.get("openpcdet_root") or "").strip() and DEFAULT_OPENPCDET_ROOT.exists():
        normalized["openpcdet_root"] = str(DEFAULT_OPENPCDET_ROOT)
    return normalized


def training_settings_path(root: Path) -> Path:
    return root / "meta" / "training_settings.json"


def ensure_training_root(root: Path) -> None:
    root.mkdir(parents=True, exist_ok=True)
    (root / "meta" / "tasks").mkdir(parents=True, exist_ok=True)
    (root / "training").mkdir(parents=True, exist_ok=True)
    settings_path = training_settings_path(root)
    current_settings = None
    if settings_path.exists():
        try:
            current_settings = json.loads(settings_path.read_text(encoding="utf-8"))
        except Exception:
            current_settings = None
    normalized_settings = normalize_settings(current_settings)
    if current_settings != normalized_settings:
        settings_path.write_text(json.dumps(normalized_settings, indent=2), encoding="utf-8")


def load_training_settings(root: Path) -> dict[str, Any]:
    settings_path = training_settings_path(root)
    if settings_path.exists():
        return normalize_settings(json.loads(settings_path.read_text(encoding="utf-8")))
    return dict(DEFAULT_SETTINGS)


def clear_transient_propagated_annotations(ws: Path) -> bool:
    annotations_dir = ws / "annotations"
    if not annotations_dir.exists():
        return False
    removed_any = False
    for ann_path in annotations_dir.glob("*.json"):
        try:
            ann = json.loads(ann_path.read_text(encoding="utf-8"))
        except Exception:
            continue
        if ann.get("source") == "propagated":
            ann_path.unlink(missing_ok=True)
            removed_any = True
    return removed_any


def inspect_workspace_target_path(path: Path) -> dict[str, Any]:
    if not str(path).strip():
        return {"kind": "empty", "path": str(path), "groups": []}
    if not path.exists():
        return {"kind": "missing", "path": str(path), "groups": []}

    groups_manifest_path = path / "groups_manifest.json"
    if groups_manifest_path.exists():
        try:
            manifest = json.loads(groups_manifest_path.read_text(encoding="utf-8"))
        except Exception as exc:
            raise HTTPException(500, f"Invalid groups manifest: {exc}") from exc
        groups: list[dict[str, Any]] = []
        for item in manifest.get("groups", []):
            workspace_path = Path(item["workspace_path"]).expanduser().resolve()
            ensure_meta(workspace_path)
            clear_transient_propagated_annotations(workspace_path)
            frames, class_totals = scan_frames(workspace_path)
            groups.append({
                "group_id": item.get("group_id"),
                "title": item.get("title") or item.get("group_id"),
                "workspace_path": str(workspace_path),
                "frame_count": len(frames),
                "annotated_count": len([frame for frame in frames if frame.get("box_count", 0) > 0]),
                "reviewed_count": len([frame for frame in frames if frame.get("review_status") == "reviewed"]),
                "start_frame_id": item.get("start_frame_id"),
                "end_frame_id": item.get("end_frame_id"),
                "class_totals": class_totals,
            })
        return {
            "kind": "group_root",
            "path": str(path),
            "groups": groups,
            "group_size": manifest.get("group_size"),
            "frame_step": manifest.get("frame_step"),
            "bag_path": manifest.get("bag_path"),
        }

    if (path / "pcd").exists():
        return {"kind": "workspace", "path": str(path), "groups": []}

    inferred_groups = []
    for child in sorted(path.glob("group_*")):
        if not child.is_dir() or not (child / "pcd").exists():
            continue
        ensure_meta(child)
        clear_transient_propagated_annotations(child)
        frames, class_totals = scan_frames(child)
        inferred_groups.append({
            "group_id": child.name,
            "title": child.name,
            "workspace_path": str(child.resolve()),
            "frame_count": len(frames),
            "annotated_count": len([frame for frame in frames if frame.get("box_count", 0) > 0]),
            "reviewed_count": len([frame for frame in frames if frame.get("review_status") == "reviewed"]),
            "start_frame_id": frames[0]["frame_id"] if frames else None,
            "end_frame_id": frames[-1]["frame_id"] if frames else None,
            "class_totals": class_totals,
        })
    if inferred_groups:
        return {"kind": "group_root", "path": str(path), "groups": inferred_groups}

    return {"kind": "unknown", "path": str(path), "groups": []}


def is_openpcdet_dataset_dir(path: Path) -> bool:
    return (path / "points").is_dir() and (path / "ImageSets").is_dir() and (path / "labels").is_dir()


def read_split_count(path: Path, split: str) -> int:
    split_path = path / "ImageSets" / f"{split}.txt"
    if not split_path.exists():
        return 0
    return len([line.strip() for line in split_path.read_text(encoding="utf-8").splitlines() if line.strip()])


def count_dataset_frames(path: Path) -> int:
    all_split = read_split_count(path, "all")
    if all_split > 0:
        return all_split
    return len(list((path / "points").glob("*.npy")))


def read_training_frame_ids(path: Path) -> list[str]:
    resolved = path.expanduser().resolve()
    split_path = resolved / "ImageSets" / "all.txt"
    if split_path.exists():
        return [line.strip() for line in split_path.read_text(encoding="utf-8").splitlines() if line.strip()]
    return sorted(point_path.stem for point_path in (resolved / "points").glob("*.npy"))


def load_training_points_as_records(dataset_path: Path, frame_id: str, max_points: int, view_range: list[float] | None) -> list[dict[str, float]]:
    points_path = dataset_path.expanduser().resolve() / "points" / f"{frame_id}.npy"
    if not points_path.exists():
        raise HTTPException(404, f"points file not found: {points_path}")

    points = sanitize_points(np.load(points_path))
    if points.ndim != 2 or points.shape[1] < 3:
        raise HTTPException(500, f"invalid points array shape: {points.shape}")
    if points.shape[1] == 3:
        zeros = np.zeros((points.shape[0], 1), dtype=points.dtype)
        points = np.concatenate([points, zeros], axis=1)

    if view_range and len(view_range) == 6:
        xmin, ymin, zmin, xmax, ymax, zmax = view_range
        mask = (
            (points[:, 0] >= xmin) & (points[:, 0] <= xmax) &
            (points[:, 1] >= ymin) & (points[:, 1] <= ymax) &
            (points[:, 2] >= zmin) & (points[:, 2] <= zmax)
        )
        points = points[mask]

    if max_points and len(points) > max_points:
        stride = max(1, int(np.ceil(len(points) / max_points)))
        points = points[::stride]

    return [
        {"x": float(point[0]), "y": float(point[1]), "z": float(point[2]), "intensity": float(point[3])}
        for point in points
    ]


def build_training_group_info(path: Path, group_id: str | None = None) -> dict[str, Any]:
    resolved = path.expanduser().resolve()
    frame_count = count_dataset_frames(resolved)
    label_count = len(list((resolved / "labels").glob("*.txt")))
    train_count = read_split_count(resolved, "train")
    val_count = read_split_count(resolved, "val")
    next_group_id = group_id or resolved.name or "dataset"
    return {
        "group_id": next_group_id,
        "title": next_group_id,
        "dataset_path": str(resolved),
        "frame_count": frame_count,
        "labeled_count": label_count,
        "train_count": train_count,
        "val_count": val_count,
    }


def inspect_training_target_path(path: Path) -> dict[str, Any]:
    if not str(path).strip():
        return {"kind": "empty", "path": str(path), "groups": [], "frame_count": 0, "train_count": 0, "val_count": 0}
    if not path.exists():
        return {"kind": "missing", "path": str(path), "groups": [], "frame_count": 0, "train_count": 0, "val_count": 0}

    if is_openpcdet_dataset_dir(path):
        group = build_training_group_info(path)
        return {
            "kind": "training_dataset",
            "path": str(path),
            "groups": [group],
            "frame_count": group["frame_count"],
            "train_count": group["train_count"],
            "val_count": group["val_count"],
        }

    groups = [
        build_training_group_info(child, child.name)
        for child in sorted(path.iterdir())
        if child.is_dir() and is_openpcdet_dataset_dir(child)
    ]
    if groups:
        return {
            "kind": "training_group_root",
            "path": str(path),
            "groups": groups,
            "frame_count": sum(int(group["frame_count"]) for group in groups),
            "train_count": sum(int(group["train_count"]) for group in groups),
            "val_count": sum(int(group["val_count"]) for group in groups),
        }

    return {"kind": "unknown", "path": str(path), "groups": [], "frame_count": 0, "train_count": 0, "val_count": 0}


def build_model_test_group_info(
    *,
    group_id: str,
    title: str,
    source_kind: str,
    source_path: Path,
    frame_count: int,
) -> dict[str, Any]:
    return {
        "group_id": group_id,
        "title": title,
        "source_kind": source_kind,
        "source_path": str(source_path.expanduser().resolve()),
        "frame_count": int(frame_count),
    }


def inspect_model_test_target_path(path: Path) -> dict[str, Any]:
    workspace_target = inspect_workspace_target_path(path)
    workspace_kind = str(workspace_target.get("kind") or "")
    if workspace_kind == "workspace":
        group = build_model_test_group_info(
            group_id=path.name or "group",
            title=path.name or "group",
            source_kind="workspace",
            source_path=path,
            frame_count=len(read_frame_ids(path)),
        )
        return {
            "kind": "workspace",
            "path": str(path),
            "groups": [group],
            "frame_count": group["frame_count"],
        }
    if workspace_kind == "group_root":
        groups = [
            build_model_test_group_info(
                group_id=str(item.get("group_id") or Path(str(item.get("workspace_path") or "")).name or "group"),
                title=str(item.get("title") or item.get("group_id") or "group"),
                source_kind="workspace",
                source_path=Path(str(item.get("workspace_path"))),
                frame_count=int(item.get("frame_count") or 0),
            )
            for item in workspace_target.get("groups") or []
            if item.get("workspace_path")
        ]
        return {
            "kind": "group_root",
            "path": str(path),
            "groups": groups,
            "frame_count": sum(int(group["frame_count"]) for group in groups),
        }
    if workspace_kind in {"empty", "missing"}:
        return {
            "kind": workspace_kind,
            "path": str(path),
            "groups": [],
            "frame_count": 0,
        }

    training_target = inspect_training_target_path(path)
    training_kind = str(training_target.get("kind") or "")
    if training_kind == "training_dataset":
        group = build_model_test_group_info(
            group_id=path.name or "dataset",
            title=path.name or "dataset",
            source_kind="training_dataset",
            source_path=path,
            frame_count=int(training_target.get("frame_count") or 0),
        )
        return {
            "kind": "training_dataset",
            "path": str(path),
            "groups": [group],
            "frame_count": group["frame_count"],
        }
    if training_kind == "training_group_root":
        groups = [
            build_model_test_group_info(
                group_id=str(item.get("group_id") or Path(str(item.get("dataset_path") or "")).name or "dataset"),
                title=str(item.get("title") or item.get("group_id") or "dataset"),
                source_kind="training_dataset",
                source_path=Path(str(item.get("dataset_path"))),
                frame_count=int(item.get("frame_count") or 0),
            )
            for item in training_target.get("groups") or []
            if item.get("dataset_path")
        ]
        return {
            "kind": "training_group_root",
            "path": str(path),
            "groups": groups,
            "frame_count": sum(int(group["frame_count"]) for group in groups),
        }
    if training_kind in {"empty", "missing"}:
        return {
            "kind": training_kind,
            "path": str(path),
            "groups": [],
            "frame_count": 0,
        }

    return {
        "kind": "unknown",
        "path": str(path),
        "groups": [],
        "frame_count": 0,
    }


def list_model_test_checkpoint_candidates(
    root: Path,
    target: dict[str, Any],
    settings: dict[str, Any] | None = None,
) -> list[str]:
    active_settings = settings or dict(DEFAULT_SETTINGS)
    candidates: list[tuple[float, str]] = []
    seen: set[str] = set()

    def add_candidate(path: Path) -> None:
        try:
            resolved = str(path.expanduser().resolve())
        except Exception:
            return
        if resolved in seen or not Path(resolved).exists():
            return
        seen.add(resolved)
        try:
            modified = Path(resolved).stat().st_mtime
        except Exception:
            modified = 0.0
        candidates.append((modified, resolved))

    configured_ckpt = str(active_settings.get("checkpoint_path") or "").strip()
    if configured_ckpt:
        add_candidate(Path(configured_ckpt))

    for checkpoint_path in list_checkpoint_candidates(root, active_settings):
        add_candidate(Path(checkpoint_path))

    for group in target.get("groups") or []:
        source_path = str(group.get("source_path") or "").strip()
        if not source_path:
            continue
        group_root = Path(source_path).expanduser().resolve()
        for child_name in ("training", "models"):
            child_root = group_root / child_name
            if not child_root.exists():
                continue
            for checkpoint_path in child_root.rglob("*.pth"):
                add_candidate(checkpoint_path)

    candidates.sort(key=lambda item: item[0], reverse=True)
    return [path for _, path in candidates[:64]]


def scan_frames(ws: Path) -> tuple[list[dict], dict[str, int]]:
    frame_ids = read_frame_ids(ws)
    summaries = []
    class_totals: dict[str, int] = {}
    for fid in frame_ids:
        ann = load_annotation(ws, fid)
        boxes = ann.get("boxes", [])
        summaries.append({
            "frame_id": fid,
            "source": ann.get("source"),
            "review_status": ann.get("review_status"),
            "box_count": len(boxes),
        })
        for box in boxes:
            cls = box.get("class_name", "")
            if cls:
                class_totals[cls] = class_totals.get(cls, 0) + 1
    return summaries, class_totals


def read_process_cmdline(pid: int) -> str:
    proc_cmdline = Path("/proc") / str(pid) / "cmdline"
    if not proc_cmdline.exists():
        return ""
    try:
        raw = proc_cmdline.read_bytes()
    except Exception:
        return ""
    return raw.replace(b"\x00", b" ").decode("utf-8", errors="replace").strip()


def is_process_alive(pid: int) -> bool:
    try:
        os.kill(pid, 0)
        return True
    except ProcessLookupError:
        return False
    except PermissionError:
        return True
    except Exception:
        return False


def process_matches_task_record(record: dict[str, Any], pid: int) -> bool:
    cmdline = read_process_cmdline(pid)
    if not cmdline:
        return False
    task_id = str(record.get("id") or "").strip()
    if task_id and task_id in cmdline:
        return True

    command = str(record.get("command") or "").strip()
    if not command:
        return False
    try:
        tokens = shlex.split(command)
    except ValueError:
        tokens = command.split()

    for token in reversed(tokens):
        if token.startswith("-"):
            continue
        basename = Path(token).name
        if basename in {"python", "python3", "python3.10", "bash", "sh"}:
            continue
        if len(basename) >= 3 and basename in cmdline:
            return True
    return False


def terminate_orphan_task_process(record: dict[str, Any]) -> bool:
    metadata = dict(record.get("metadata") or {})
    candidates: list[tuple[int, bool]] = []
    seen: set[int] = set()
    for key, is_group in (("process_group_id", True), ("process_pid", False)):
        raw_pid = metadata.get(key)
        if not isinstance(raw_pid, int) or raw_pid <= 0 or raw_pid in seen:
            continue
        seen.add(raw_pid)
        candidates.append((raw_pid, is_group))

    for pid, is_group in candidates:
        if not is_process_alive(pid) or not process_matches_task_record(record, pid):
            continue
        try:
            if is_group:
                os.killpg(pid, signal.SIGTERM)
            else:
                os.kill(pid, signal.SIGTERM)
        except ProcessLookupError:
            return False
        except Exception:
            continue

        for _ in range(6):
            if not is_process_alive(pid):
                return True
            time.sleep(0.1)

        try:
            if is_group:
                os.killpg(pid, signal.SIGKILL)
            else:
                os.kill(pid, signal.SIGKILL)
        except ProcessLookupError:
            return True
        except Exception:
            return False
        return True
    return False


def append_training_metric_history(previous_progress: dict[str, Any], progress: dict[str, Any]) -> None:
    if progress.get("stage") != "train":
        return
    if not any(progress.get(key) is not None for key in ("loss", "loss_avg", "lr")):
        return

    raw_history = previous_progress.get("metric_history")
    history = [item for item in raw_history if isinstance(item, dict)] if isinstance(raw_history, list) else []
    point = {
        "ts_ms": int(time.time() * 1000),
        "epoch": progress.get("epoch"),
        "total_epochs": progress.get("total_epochs"),
        "iter": progress.get("iter"),
        "iters_per_epoch": progress.get("iters_per_epoch"),
        "loss": progress.get("loss"),
        "loss_avg": progress.get("loss_avg"),
        "lr": progress.get("lr"),
        "elapsed_seconds": progress.get("elapsed_seconds"),
        "eta_seconds": progress.get("eta_seconds"),
    }
    if history:
        last_point = history[-1]
        if last_point.get("epoch") == point["epoch"] and last_point.get("iter") == point["iter"]:
            history[-1] = point
        else:
            history.append(point)
    else:
        history.append(point)
    progress["metric_history"] = history[-MAX_TRAINING_HISTORY_POINTS:]


def reconcile_orphan_task_record(record_path: Path, record: dict[str, Any]) -> dict[str, Any]:
    status = str(record.get("status") or "")
    if status not in ACTIVE_TASK_STATUSES:
        return record
    if get_task_runtime(str(record.get("id") or "")) is not None:
        return record

    terminate_orphan_task_process(record)

    metadata = dict(record.get("metadata") or {})
    progress = dict(metadata.get("progress") or {})
    progress["paused"] = False
    progress["stopping"] = False
    progress["orphaned"] = True
    progress["label"] = "后端已重启，旧任务已停止"
    metadata["progress"] = progress
    metadata["orphaned_at_ms"] = int(time.time() * 1000)
    if not metadata.get("error_detail"):
        metadata["error_detail"] = "The previous backend process exited before task completion. This task was cancelled during recovery."
    record["metadata"] = metadata
    record["status"] = "cancelled"
    record["error"] = ORPHAN_TASK_ERROR
    if not isinstance(record.get("finished_at_ms"), int):
        record["finished_at_ms"] = int(time.time() * 1000)
    record_path.write_text(json.dumps(record, indent=2), encoding="utf-8")
    return record


def list_tasks(ws: Path) -> list[dict]:
    tasks_dir = ws / "meta" / "tasks"
    if not tasks_dir.exists():
        return []
    tasks = []
    for p in tasks_dir.glob("*.json"):
        try:
            record = json.loads(p.read_text(encoding="utf-8"))
            tasks.append(reconcile_orphan_task_record(p, record))
        except Exception:
            pass
    tasks.sort(key=lambda t: t.get("created_at_ms", 0), reverse=True)
    return tasks


def load_task_record(record_path: Path) -> dict[str, Any]:
    try:
        return json.loads(record_path.read_text(encoding="utf-8"))
    except Exception as exc:
        raise HTTPException(500, f"failed to read task record: {record_path}") from exc


def update_task_progress_state(record: dict[str, Any], **updates: Any) -> None:
    metadata = dict(record.get("metadata") or {})
    progress = dict(metadata.get("progress") or {})
    progress.update({key: value for key, value in updates.items() if value is not None})
    metadata["progress"] = progress
    record["metadata"] = metadata


def register_task_runtime(task_id: str, runtime: dict[str, Any]) -> None:
    with TASK_RUNTIME_LOCK:
        TASK_RUNTIMES[task_id] = runtime


def get_task_runtime(task_id: str) -> dict[str, Any] | None:
    with TASK_RUNTIME_LOCK:
        return TASK_RUNTIMES.get(task_id)


def unregister_task_runtime(task_id: str) -> None:
    with TASK_RUNTIME_LOCK:
        TASK_RUNTIMES.pop(task_id, None)


def update_runtime_record(runtime: dict[str, Any]) -> None:
    runtime["record_path"].write_text(json.dumps(runtime["record"], indent=2), encoding="utf-8")


def send_signal_to_runtime(runtime: dict[str, Any], sig: int) -> None:
    proc = runtime.get("proc")
    if proc is None:
        raise RuntimeError("task process is not running")
    pgid = runtime.get("pgid")
    if pgid:
        os.killpg(pgid, sig)
    else:
        os.kill(proc.pid, sig)


def stop_active_task_runtimes_for_shutdown() -> None:
    with TASK_RUNTIME_LOCK:
        runtimes = list(TASK_RUNTIMES.values())

    for runtime in runtimes:
        try:
            with runtime["lock"]:
                current_record = runtime["record"]
                status = str(current_record.get("status") or "")
                if status in FINAL_TASK_STATUSES:
                    continue
                metadata = dict(current_record.get("metadata") or {})
                progress = dict(metadata.get("progress") or {})
                progress["paused"] = False
                progress["stopping"] = False
                progress["orphaned"] = True
                progress["label"] = "后端退出，任务已停止"
                metadata["control_action"] = "stop"
                metadata["progress"] = progress
                if not metadata.get("error_detail"):
                    metadata["error_detail"] = "The backend exited before task completion. The task was cancelled during shutdown."
                current_record["metadata"] = metadata
                current_record["status"] = "cancelled"
                current_record["error"] = ORPHAN_TASK_ERROR
                current_record["finished_at_ms"] = int(time.time() * 1000)
                update_runtime_record(runtime)
            send_signal_to_runtime(runtime, signal.SIGTERM)
        except Exception:
            pass


atexit.register(stop_active_task_runtimes_for_shutdown)


def control_task_runtime(ws: Path, task_id: str, action: str) -> dict[str, Any]:
    if action not in {"pause", "resume", "stop"}:
        raise HTTPException(400, f"unsupported action: {action}")

    record_path = ws / "meta" / "tasks" / f"{task_id}.json"
    if not record_path.exists():
        raise HTTPException(404, f"task not found: {task_id}")

    runtime = get_task_runtime(task_id)
    if runtime is None:
        record = load_task_record(record_path)
        status = str(record.get("status") or "")
        if status in FINAL_TASK_STATUSES:
            return record
        raise HTTPException(409, "task is not active in current server process")

    with runtime["lock"]:
        record = runtime["record"]
        status = str(record.get("status") or "")
        metadata = dict(record.get("metadata") or {})
        progress = dict(metadata.get("progress") or {})

        if action == "pause":
            if status != "running":
                raise HTTPException(409, f"task is not running: {status}")
            send_signal_to_runtime(runtime, signal.SIGSTOP)
            record["status"] = "paused"
            metadata["paused_at_ms"] = int(time.time() * 1000)
            progress["paused"] = True
            progress["stopping"] = False
            progress["label"] = "训练已暂停"
        elif action == "resume":
            if status != "paused":
                raise HTTPException(409, f"task is not paused: {status}")
            paused_at_ms = metadata.get("paused_at_ms")
            if isinstance(paused_at_ms, int):
                metadata["paused_total_ms"] = int(metadata.get("paused_total_ms") or 0) + max(
                    0, int(time.time() * 1000) - paused_at_ms
                )
            metadata.pop("paused_at_ms", None)
            send_signal_to_runtime(runtime, signal.SIGCONT)
            record["status"] = "running"
            progress["paused"] = False
            progress["stopping"] = False
            progress["label"] = progress.get("last_active_label") or "训练已恢复"
        else:
            if status not in {"pending", "running", "paused"}:
                raise HTTPException(409, f"task cannot be stopped from status: {status}")
            metadata["control_action"] = "stop"
            progress["paused"] = False
            progress["stopping"] = True
            progress["label"] = "正在停止训练"
            if status == "paused":
                try:
                    send_signal_to_runtime(runtime, signal.SIGCONT)
                except Exception:
                    pass
                record["status"] = "running"
            proc = runtime.get("proc")
            if proc is None:
                record["status"] = "cancelled"
                record["error"] = "stopped by user"
                record["finished_at_ms"] = int(time.time() * 1000)
                metadata["stop_completed"] = True
            else:
                send_signal_to_runtime(runtime, signal.SIGTERM)

        metadata["progress"] = progress
        record["metadata"] = metadata
        update_runtime_record(runtime)
        return json.loads(json.dumps(record))


def run_export_openpcdet_sync(
    ws: Path,
    output_dir: Path,
    *,
    reviewed_only: bool = False,
    annotated_only: bool = False,
    points_only: bool = False,
    frame_ids: list[str] | None = None,
) -> None:
    ensure_meta(ws)
    python_bin = load_settings(ws).get("python_bin") or sys.executable
    cmd = [
        python_bin,
        str(SCRIPTS_DIR / "workspace_tools.py"),
        "export-openpcdet",
        "--workspace",
        str(ws),
        "--output",
        str(output_dir),
    ]
    frame_list_path: Path | None = None
    if reviewed_only:
        cmd.append("--reviewed-only")
    if annotated_only:
        cmd.append("--annotated-only")
    if points_only:
        cmd.append("--points-only")
    if frame_ids:
        frame_list_path = ws / "meta" / "tasks" / f"export_frames_{int(time.time() * 1000)}.txt"
        frame_list_path.write_text("\n".join(frame_ids), encoding="utf-8")
        cmd += ["--frame-list", str(frame_list_path)]

    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=600)
    finally:
        if frame_list_path and frame_list_path.exists():
            frame_list_path.unlink(missing_ok=True)

    if result.returncode != 0:
        message = (result.stderr or result.stdout or "export failed").strip()
        raise RuntimeError(message)


def find_newest_checkpoint(openpcdet_root: Path, task_id: str) -> Path | None:
    output_root = openpcdet_root / "output"
    if not output_root.exists():
        return None

    candidates: list[tuple[float, Path]] = []
    for checkpoint in output_root.rglob("*.pth"):
        try:
            modified = checkpoint.stat().st_mtime
        except FileNotFoundError:
            continue
        candidates.append((modified, checkpoint))

    candidates.sort(key=lambda item: item[0])
    matching = [checkpoint for _, checkpoint in candidates if task_id in str(checkpoint)]
    best_matches = [checkpoint for checkpoint in matching if checkpoint.name == "best_model.pth"]
    if best_matches:
        return best_matches[-1]
    for checkpoint in reversed(matching):
        return checkpoint
    return candidates[-1][1] if candidates else None


def sanitize_training_run_name(raw_name: str) -> str:
    name = re.sub(r"\s+", "_", str(raw_name or "").strip())
    name = re.sub(r'[<>:"/\\\\|?*\x00-\x1f]+', "_", name)
    name = name.strip("._-")
    return name[:80]


def allocate_training_run_name(root: Path, kind: str, requested_name: str) -> tuple[str, str]:
    base_name = sanitize_training_run_name(requested_name)
    if not base_name:
        generated = f"{kind}_{int(time.time() * 1000)}"
        return generated, generated

    tasks_dir = root / "meta" / "tasks"
    training_dir = root / "training"
    run_name = base_name
    task_id = f"{kind}_{run_name}"
    suffix = 2
    while (
        (training_dir / run_name).exists()
        or (tasks_dir / f"{task_id}.json").exists()
        or (tasks_dir / f"{task_id}.log").exists()
    ):
        run_name = f"{base_name}_{suffix}"
        task_id = f"{kind}_{run_name}"
        suffix += 1
    return task_id, run_name


def update_checkpoint_setting(settings_path: Path, checkpoint: Path | None) -> None:
    if checkpoint is None:
        return
    current = None
    if settings_path.exists():
        try:
            current = json.loads(settings_path.read_text(encoding="utf-8"))
        except Exception:
            current = None
    normalized = normalize_settings(current)
    normalized["checkpoint_path"] = str(checkpoint.resolve())
    settings_path.write_text(json.dumps(normalized, indent=2), encoding="utf-8")


def load_pcd_as_records(ws: Path, frame_id: str, max_points: int, view_range: list[float] | None) -> list[dict]:
    pcd_path = ws / "pcd" / f"{frame_id}.pcd"
    if not pcd_path.exists():
        raise HTTPException(404, f"PCD file not found: {pcd_path}")
    points = read_pcd_points(pcd_path)

    if view_range and len(view_range) == 6:
        xmin, ymin, zmin, xmax, ymax, zmax = view_range
        mask = (
            (points[:, 0] >= xmin) & (points[:, 0] <= xmax) &
            (points[:, 1] >= ymin) & (points[:, 1] <= ymax) &
            (points[:, 2] >= zmin) & (points[:, 2] <= zmax)
        )
        points = points[mask]

    if max_points and len(points) > max_points:
        stride = max(1, int(np.ceil(len(points) / max_points)))
        points = points[::stride]

    return [
        {"x": float(p[0]), "y": float(p[1]), "z": float(p[2]), "intensity": float(p[3])}
        for p in points
    ]


# ---------------------------------------------------------------------------
# Background task runner
# ---------------------------------------------------------------------------

def spawn_task(
    ws: Path,
    kind: str,
    cmd: list[str],
    post_action: dict | None = None,
    metadata: dict[str, Any] | None = None,
    task_id: str | None = None,
) -> dict:
    task_id = task_id or f"{kind}_{int(time.time() * 1000)}"
    tasks_dir = ws / "meta" / "tasks"
    tasks_dir.mkdir(parents=True, exist_ok=True)
    log_path = str(tasks_dir / f"{task_id}.log")
    record = {
        "id": task_id,
        "kind": kind,
        "status": "pending",
        "command": " ".join(cmd),
        "log_path": log_path,
        "created_at_ms": int(time.time() * 1000),
        "started_at_ms": None,
        "finished_at_ms": None,
        "error": None,
        "metadata": metadata or {},
    }
    record_path = tasks_dir / f"{task_id}.json"
    runtime = {
        "task_id": task_id,
        "workspace_path": str(ws),
        "record": record,
        "record_path": record_path,
        "lock": threading.Lock(),
        "proc": None,
        "pgid": None,
    }

    def persist_record() -> None:
        with runtime["lock"]:
            update_runtime_record(runtime)

    def update_progress_from_line(line: str) -> None:
        if TASK_PROGRESS_MARKER not in line:
            return
        _, _, payload = line.partition(TASK_PROGRESS_MARKER)
        payload = payload.strip()
        if not payload:
            return
        try:
            progress = json.loads(payload)
        except Exception:
            return
        with runtime["lock"]:
            current_record = runtime["record"]
            metadata = dict(current_record.get("metadata") or {})
            previous = dict(metadata.get("progress") or {})
            if progress.get("label"):
                progress["last_active_label"] = progress["label"]
            if current_record.get("status") == "paused":
                progress["paused"] = True
            append_training_metric_history(previous, progress)
            metadata["progress"] = {**previous, **progress}
            current_record["metadata"] = metadata
            update_runtime_record(runtime)

    persist_record()
    register_task_runtime(task_id, runtime)

    def run():
        with runtime["lock"]:
            current_record = runtime["record"]
            metadata = dict(current_record.get("metadata") or {})
            if metadata.get("control_action") == "stop":
                current_record["status"] = "cancelled"
                current_record["error"] = "stopped by user"
                current_record["finished_at_ms"] = int(time.time() * 1000)
                update_runtime_record(runtime)
                unregister_task_runtime(task_id)
                return
            current_record["status"] = "running"
            current_record["started_at_ms"] = int(time.time() * 1000)
            update_runtime_record(runtime)
        try:
            recent_lines: deque[str] = deque(maxlen=120)
            with open(log_path, "w", encoding="utf-8") as log_f:
                env = os.environ.copy()
                env.setdefault("PYTHONUNBUFFERED", "1")
                proc = subprocess.Popen(
                    cmd,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.STDOUT,
                    text=True,
                    encoding="utf-8",
                    bufsize=1,
                    start_new_session=True,
                    env=env,
                )
                with runtime["lock"]:
                    runtime["proc"] = proc
                    runtime["pgid"] = proc.pid
                    current_record = runtime["record"]
                    metadata = dict(current_record.get("metadata") or {})
                    metadata["process_pid"] = proc.pid
                    metadata["process_group_id"] = proc.pid
                    current_record["metadata"] = metadata
                    update_runtime_record(runtime)
                assert proc.stdout is not None
                for line in proc.stdout:
                    recent_lines.append(line)
                    log_f.write(line)
                    log_f.flush()
                    update_progress_from_line(line)
                proc.wait(timeout=3600)
            with runtime["lock"]:
                current_record = runtime["record"]
                metadata = dict(current_record.get("metadata") or {})
                stop_requested = metadata.get("control_action") == "stop"
                if proc.returncode == 0:
                    current_record["status"] = "succeeded"
                    progress = dict(metadata.get("progress") or {})
                    progress["paused"] = False
                    progress["stopping"] = False
                    metadata["progress"] = progress
                    current_record["metadata"] = metadata
                    if post_action:
                        post_type = post_action.get("type")
                        if post_type == "import_predictions":
                            pred_path = post_action["predictions_path"]
                            if Path(pred_path).exists():
                                do_import_predictions(ws, pred_path)
                        elif post_type == "update_training_checkpoint":
                            checkpoint = find_newest_checkpoint(
                                Path(post_action["openpcdet_root"]).expanduser().resolve(),
                                str(post_action["task_id"]),
                            )
                            if checkpoint:
                                metadata = dict(current_record.get("metadata") or {})
                                metadata["checkpoint_path"] = str(checkpoint.resolve())
                                current_record["metadata"] = metadata
                                update_checkpoint_setting(
                                    Path(post_action["settings_path"]).expanduser().resolve(),
                                    checkpoint,
                                )
                else:
                    summary, detail = build_task_failure_messages(list(recent_lines), proc.returncode)
                    if stop_requested:
                        current_record["status"] = "cancelled"
                        current_record["error"] = "stopped by user"
                    else:
                        current_record["status"] = "failed"
                        current_record["error"] = summary
                    metadata = dict(current_record.get("metadata") or {})
                    progress = dict(metadata.get("progress") or {})
                    progress["paused"] = False
                    progress["stopping"] = False
                    metadata["progress"] = progress
                    metadata["error_detail"] = detail
                    current_record["metadata"] = metadata
        except Exception as e:
            with runtime["lock"]:
                current_record = runtime["record"]
                metadata = dict(current_record.get("metadata") or {})
                if metadata.get("control_action") == "stop":
                    current_record["status"] = "cancelled"
                    current_record["error"] = "stopped by user"
                else:
                    current_record["status"] = "failed"
                    current_record["error"] = str(e)
                    metadata["error_detail"] = str(e)
                progress = dict(metadata.get("progress") or {})
                progress["paused"] = False
                progress["stopping"] = False
                metadata["progress"] = progress
                current_record["metadata"] = metadata
        finally:
            with runtime["lock"]:
                current_record = runtime["record"]
                current_record["finished_at_ms"] = int(time.time() * 1000)
                runtime["proc"] = None
                runtime["pgid"] = None
                update_runtime_record(runtime)
            unregister_task_runtime(task_id)

    threading.Thread(target=run, daemon=True).start()
    return record


# ---------------------------------------------------------------------------
# Import predictions helper
# ---------------------------------------------------------------------------

def do_import_predictions(ws: Path, predictions_path: str) -> list[dict]:
    pred_data = json.loads(Path(predictions_path).read_text(encoding="utf-8"))
    existing_ids = set(read_frame_ids(ws))
    updated = []
    for pred_frame in pred_data:
        fid = pred_frame["frame_id"]
        if fid not in existing_ids:
            continue
        existing = load_annotation(ws, fid)
        if (existing.get("source") == "manual" and
            existing.get("review_status") == "reviewed" and
            len(existing.get("boxes", [])) > 0):
            continue
        boxes = []
        for i, pb in enumerate(pred_frame.get("boxes", [])):
            boxes.append({
                "box_id": f"{fid}_model_{i}_{int(time.time()*1000)}",
                "class_name": canonicalize_cone_class_name(pb.get("class_name")) or "Cone",
                "center_xyz": pb["center_xyz"],
                "size_lwh": pb["size_lwh"],
                "yaw": pb.get("yaw", 0.0),
                "score": pb.get("score"),
            })
        ann = normalize_annotation_payload({
            "frame_id": fid,
            "source": "model",
            "review_status": "unreviewed",
            "boxes": boxes,
            "updated_at_ms": int(time.time() * 1000),
        })
        (ws / "annotations" / f"{fid}.json").write_text(json.dumps(ann, indent=2), encoding="utf-8")
        updated.append({
            "frame_id": fid,
            "source": "model",
            "review_status": "unreviewed",
            "box_count": len(boxes),
        })
    return updated


def resolve_model_test_settings(
    root: Path,
    target: dict[str, Any],
) -> dict[str, Any]:
    kind = str(target.get("kind") or "")
    if kind in {"training_dataset", "training_group_root"}:
        return load_training_settings(root)
    if kind == "workspace":
        return load_settings(root)
    if kind == "group_root":
        return load_settings(root)
    return dict(DEFAULT_SETTINGS)


def resolve_runtime_model_config_path(checkpoint_path: str, configured_model_path: str) -> str:
    configured = str(configured_model_path or "").strip()
    checkpoint = str(checkpoint_path or "").strip()
    if not checkpoint:
        return configured

    runtime_model_path = Path(checkpoint).expanduser().resolve().parent.parent / "model.yaml"
    if not runtime_model_path.exists():
        return configured

    if not configured:
        return str(runtime_model_path)

    try:
        resolved_configured = Path(configured).expanduser().resolve()
    except Exception:
        return str(runtime_model_path)

    default_model_dir = (CONFIG_DIR / "cone_models").resolve()
    try:
        if resolved_configured.is_relative_to(default_model_dir):
            return str(runtime_model_path)
    except AttributeError:
        if str(resolved_configured).startswith(str(default_model_dir) + os.sep):
            return str(runtime_model_path)
    return configured


def run_single_frame_openpcdet_inference(
    *,
    frame_id: str,
    points_path: Path,
    settings: dict[str, Any],
    checkpoint_path: str = "",
    model_config_path: str = "",
    openpcdet_root: str = "",
    python_bin: str = "",
    score_threshold: Optional[float] = None,
) -> dict[str, Any]:
    resolved_points_path = points_path.expanduser().resolve()
    if not resolved_points_path.exists():
        raise HTTPException(404, f"points file not found: {resolved_points_path}")

    resolved_openpcdet_root = str(openpcdet_root or settings.get("openpcdet_root") or "").strip()
    resolved_checkpoint_path = str(checkpoint_path or settings.get("checkpoint_path") or "").strip()
    resolved_model_config_path = resolve_runtime_model_config_path(
        resolved_checkpoint_path,
        str(model_config_path or settings.get("model_config_path") or "").strip(),
    )
    resolved_python_bin = str(python_bin or settings.get("python_bin") or sys.executable).strip()
    resolved_score_threshold = (
        float(score_threshold) if score_threshold is not None else float(settings.get("score_threshold") or 0.3)
    )

    if not resolved_openpcdet_root:
        raise HTTPException(400, "openpcdet_root not configured")
    if not resolved_model_config_path:
        raise HTTPException(400, "model_config_path not configured")
    if not resolved_checkpoint_path:
        raise HTTPException(400, "checkpoint_path not configured")

    with tempfile.TemporaryDirectory(prefix="bitfsd_model_test_") as temp_dir_name:
        temp_dir = Path(temp_dir_name)
        output_json = temp_dir / f"infer_{frame_id}.json"
        cmd = [
            resolved_python_bin,
            str(SCRIPTS_DIR / "openpcdet_infer.py"),
            "--openpcdet-root",
            resolved_openpcdet_root,
            "--cfg-file",
            resolved_model_config_path,
            "--ckpt-file",
            resolved_checkpoint_path,
            "--points-path",
            str(resolved_points_path),
            "--output-json",
            str(output_json),
            "--score-thresh",
            str(resolved_score_threshold),
        ]
        extra_args = str(settings.get("infer_extra_args") or "").strip()
        if extra_args:
            cmd.extend(shlex.split(extra_args))

        result = subprocess.run(cmd, capture_output=True, text=True, timeout=600)
        if result.returncode != 0:
            message = (result.stderr or result.stdout or "single-frame inference failed").strip()
            raise HTTPException(500, message)
        if not output_json.exists():
            raise HTTPException(500, "inference output not found")

        try:
            payload = json.loads(output_json.read_text(encoding="utf-8"))
        except Exception as exc:
            raise HTTPException(500, f"invalid inference output: {exc}") from exc

    if not isinstance(payload, list) or not payload:
        return {"frame_id": frame_id, "boxes": [], "inference_ms": None}

    record = payload[0] if isinstance(payload[0], dict) else {}
    boxes = []
    for index, item in enumerate(record.get("boxes") or []):
        if not isinstance(item, dict):
            continue
        normalized_box = dict(item)
        normalized_box["class_name"] = canonicalize_cone_class_name(item.get("class_name")) or "Cone"
        boxes.append(normalized_box)
    return {
        "frame_id": str(record.get("frame_id") or frame_id),
        "boxes": boxes,
        "inference_ms": record.get("inference_ms"),
        "checkpoint_path": resolved_checkpoint_path,
        "model_config_path": resolved_model_config_path,
    }


# ---------------------------------------------------------------------------
# API routes
# ---------------------------------------------------------------------------

@app.post("/api/inspect_workspace_target")
def api_inspect_workspace_target(req: InspectWorkspaceReq):
    trimmed = req.path.strip()
    if not trimmed:
        return {"kind": "empty", "path": "", "groups": []}
    path = Path(trimmed).expanduser().resolve()
    return inspect_workspace_target_path(path)


@app.post("/api/inspect_training_target")
def api_inspect_training_target(req: InspectWorkspaceReq):
    trimmed = req.path.strip()
    if not trimmed:
        return {"kind": "empty", "path": "", "groups": [], "frame_count": 0, "train_count": 0, "val_count": 0}
    path = Path(trimmed).expanduser().resolve()
    return inspect_training_target_path(path)


@app.post("/api/open_workspace")
def api_open_workspace(req: OpenWorkspaceReq):
    ws = workspace_root(req.workspace_path)
    target = inspect_workspace_target_path(ws)
    if target.get("kind") == "group_root":
        raise HTTPException(400, "Selected path is a group root. Choose one group workspace first.")
    if target.get("kind") not in {"workspace", "unknown"} and not (ws / "pcd").exists():
        raise HTTPException(404, f"Workspace not found: {ws}")
    ensure_meta(ws)
    clear_transient_propagated_annotations(ws)
    frames, class_totals = scan_frames(ws)
    classes = load_classes(ws)
    settings = load_settings(ws)
    tasks = list_tasks(ws)
    review_queue = [f["frame_id"] for f in frames if f.get("review_status") == "unreviewed"]
    return {
        "workspace_path": str(ws),
        "frames": frames,
        "classes": classes,
        "settings": settings,
        "review_queue": review_queue,
        "tasks": tasks,
        "class_totals": class_totals,
        "checkpoint_candidates": list_checkpoint_candidates(ws, settings),
    }


@app.post("/api/open_training_root")
def api_open_training_root(req: OpenTrainingRootReq):
    root = workspace_root(req.root_path)
    target = inspect_training_target_path(root)
    if target.get("kind") not in {"training_dataset", "training_group_root"}:
        raise HTTPException(400, "Selected path is not an exported OpenPCDet dataset root.")
    ensure_training_root(root)
    settings = load_training_settings(root)
    tasks = list_tasks(root)
    return {
        "root_path": str(root),
        "target": target,
        "settings": settings,
        "tasks": tasks,
        "model_presets": list_openpcdet_model_presets(),
        "checkpoint_candidates": list_checkpoint_candidates(root, settings),
    }


@app.post("/api/open_model_test_root")
def api_open_model_test_root(req: OpenModelTestRootReq):
    root = workspace_root(req.root_path)
    target = inspect_model_test_target_path(root)
    if target.get("kind") not in {"workspace", "group_root", "training_dataset", "training_group_root"}:
        raise HTTPException(400, "Selected path is not a supported model test root.")
    settings = resolve_model_test_settings(root, target)
    return {
        "root_path": str(root),
        "target": target,
        "settings": settings,
        "model_presets": list_openpcdet_model_presets(),
        "checkpoint_candidates": list_model_test_checkpoint_candidates(root, target, settings),
    }


@app.post("/api/list_training_frames")
def api_list_training_frames(req: ListTrainingFramesReq):
    dataset_path = workspace_root(req.dataset_path)
    if not is_openpcdet_dataset_dir(dataset_path):
        raise HTTPException(400, "Selected path is not an exported OpenPCDet dataset.")
    return read_training_frame_ids(dataset_path)


@app.post("/api/list_model_test_frames")
def api_list_model_test_frames(req: ListModelTestFramesReq):
    source_path = workspace_root(req.source_path)
    if req.source_kind == "workspace":
        if not (source_path / "pcd").is_dir():
            raise HTTPException(400, "Selected path is not a raw workspace group.")
        return read_frame_ids(source_path)
    if req.source_kind == "training_dataset":
        if not is_openpcdet_dataset_dir(source_path):
            raise HTTPException(400, "Selected path is not an exported OpenPCDet dataset.")
        return read_training_frame_ids(source_path)
    raise HTTPException(400, f"Unsupported model test source kind: {req.source_kind}")


@app.post("/api/load_training_frame")
def api_load_training_frame(req: LoadTrainingFrameReq):
    dataset_path = workspace_root(req.dataset_path)
    if not is_openpcdet_dataset_dir(dataset_path):
        raise HTTPException(400, "Selected path is not an exported OpenPCDet dataset.")
    return {
        "dataset_path": str(dataset_path),
        "frame_id": req.frame_id,
        "points": load_training_points_as_records(dataset_path, req.frame_id, req.max_points, req.view_range),
    }


@app.post("/api/load_model_test_frame")
def api_load_model_test_frame(req: LoadModelTestFrameReq):
    source_path = workspace_root(req.source_path)
    if req.source_kind == "workspace":
        return {
            "source_path": str(source_path),
            "frame_id": req.frame_id,
            "points": load_pcd_as_records(source_path, req.frame_id, req.max_points, req.view_range),
        }
    if req.source_kind == "training_dataset":
        if not is_openpcdet_dataset_dir(source_path):
            raise HTTPException(400, "Selected path is not an exported OpenPCDet dataset.")
        return {
            "source_path": str(source_path),
            "frame_id": req.frame_id,
            "points": load_training_points_as_records(source_path, req.frame_id, req.max_points, req.view_range),
        }
    raise HTTPException(400, f"Unsupported model test source kind: {req.source_kind}")


@app.post("/api/infer_training_frame")
def api_infer_training_frame(req: InferTrainingFrameReq):
    root = workspace_root(req.root_path)
    ensure_training_root(root)
    settings = load_training_settings(root)

    dataset_path = workspace_root(req.dataset_path)
    if not is_openpcdet_dataset_dir(dataset_path):
        raise HTTPException(400, "Selected path is not an exported OpenPCDet dataset.")

    points_path = dataset_path / "points" / f"{req.frame_id}.npy"
    return run_single_frame_openpcdet_inference(
        frame_id=req.frame_id,
        points_path=points_path,
        settings=settings,
        checkpoint_path=req.checkpoint_path,
        model_config_path=req.model_config_path,
        openpcdet_root=req.openpcdet_root,
        python_bin=req.python_bin,
        score_threshold=req.score_threshold,
    )


@app.post("/api/infer_model_test_frame")
def api_infer_model_test_frame(req: InferModelTestFrameReq):
    source_path = workspace_root(req.source_path)
    default_settings = normalize_settings({})

    if req.source_kind == "workspace":
        pcd_path = source_path / "pcd" / f"{req.frame_id}.pcd"
        if not pcd_path.exists():
            raise HTTPException(404, f"PCD file not found: {pcd_path}")
        settings = load_settings(source_path) if (source_path / "meta").exists() else default_settings
        with tempfile.TemporaryDirectory(prefix="bitfsd_model_test_points_") as temp_dir_name:
            points_path = Path(temp_dir_name) / f"{req.frame_id}.npy"
            np.save(points_path, read_pcd_points(pcd_path).astype(np.float32))
            return run_single_frame_openpcdet_inference(
                frame_id=req.frame_id,
                points_path=points_path,
                settings=settings,
                checkpoint_path=req.checkpoint_path,
                model_config_path=req.model_config_path,
                openpcdet_root=req.openpcdet_root,
                python_bin=req.python_bin,
                score_threshold=req.score_threshold,
            )

    if req.source_kind == "training_dataset":
        if not is_openpcdet_dataset_dir(source_path):
            raise HTTPException(400, "Selected path is not an exported OpenPCDet dataset.")
        points_path = source_path / "points" / f"{req.frame_id}.npy"
        settings = default_settings
        return run_single_frame_openpcdet_inference(
            frame_id=req.frame_id,
            points_path=points_path,
            settings=settings,
            checkpoint_path=req.checkpoint_path,
            model_config_path=req.model_config_path,
            openpcdet_root=req.openpcdet_root,
            python_bin=req.python_bin,
            score_threshold=req.score_threshold,
        )

    raise HTTPException(400, f"Unsupported model test source kind: {req.source_kind}")


@app.post("/api/load_frame")
def api_load_frame(req: LoadFrameReq):
    ws = workspace_root(req.workspace_path)
    points = load_pcd_as_records(ws, req.frame_id, req.max_points, req.view_range)
    ann = load_annotation(ws, req.frame_id)
    return {
        "frame_id": req.frame_id,
        "points": points,
        "annotation": ann,
    }


@app.post("/api/save_annotation")
def api_save_annotation(req: SaveAnnotationReq):
    ws = workspace_root(req.workspace_path)
    ann = normalize_annotation_payload(req.annotation.model_dump())
    (ws / "annotations" / f"{ann['frame_id']}.json").write_text(
        json.dumps(ann, indent=2), encoding="utf-8"
    )
    return {
        "frame_id": ann["frame_id"],
        "source": ann["source"],
        "review_status": ann["review_status"],
        "box_count": len(ann["boxes"]),
    }


@app.post("/api/save_classes")
def api_save_classes(req: SaveClassesReq):
    ws = workspace_root(req.workspace_path)
    ensure_meta(ws)
    data = normalize_classes([c.model_dump() for c in req.classes])
    (ws / "meta" / "classes.json").write_text(json.dumps(data, indent=2), encoding="utf-8")
    return data


@app.post("/api/save_settings")
def api_save_settings(req: SaveSettingsReq):
    ws = workspace_root(req.workspace_path)
    data = req.settings.model_dump()
    (ws / "meta" / "settings.json").write_text(json.dumps(data, indent=2), encoding="utf-8")
    return data


@app.post("/api/save_training_settings")
def api_save_training_settings(req: SaveTrainingSettingsReq):
    root = workspace_root(req.root_path)
    ensure_training_root(root)
    data = normalize_settings(req.settings.model_dump())
    training_settings_path(root).write_text(json.dumps(data, indent=2), encoding="utf-8")
    return data


@app.post("/api/extract_pcd")
def api_extract_pcd(req: ExtractPcdReq):
    ws = workspace_root(req.workspace_path)
    ensure_meta(ws)
    python_bin = load_settings(ws).get("python_bin") or sys.executable
    cmd = [python_bin, str(SCRIPTS_DIR / "workspace_tools.py"), "extract-pcd",
           "--bag", req.bag_path, "--workspace", str(ws),
           "--frame-step", str(max(1, req.frame_step))]
    if req.topic:
        cmd += ["--topic", req.topic]
    return spawn_task(ws, "extract_pcd", cmd)


@app.post("/api/package_groups")
def api_package_groups(req: PackageGroupsReq):
    output_root = Path(req.output_root).expanduser().resolve()
    python_bin = sys.executable
    cmd = [
        python_bin,
        str(SCRIPTS_DIR / "workspace_tools.py"),
        "package-groups",
        "--bag",
        req.bag_path,
        "--output-root",
        str(output_root),
        "--frame-step",
        str(max(1, req.frame_step)),
        "--group-size",
        str(max(1, req.group_size)),
        "--min-travel-m",
        str(max(0.0, float(req.min_travel_m))),
    ]
    if not req.replace_existing:
        cmd.append("--append")
    if req.topic:
        cmd += ["--topic", req.topic]
    return spawn_task(output_root, "package_groups", cmd)


@app.post("/api/export_openpcdet")
def api_export_openpcdet(req: ExportReq):
    ws = workspace_root(req.workspace_path)
    task_id = f"export_{int(time.time()*1000)}"
    output_dir = (
        Path(req.output_path).expanduser().resolve()
        if req.output_path
        else ws / "exports" / task_id
    )
    python_bin = load_settings(ws).get("python_bin") or sys.executable
    cmd = [python_bin, str(SCRIPTS_DIR / "workspace_tools.py"), "export-openpcdet",
           "--workspace", str(ws), "--output", str(output_dir)]
    if req.reviewed_only:
        cmd.append("--reviewed-only")
    if req.annotated_only:
        cmd.append("--annotated-only")
    if req.points_only:
        cmd.append("--points-only")
    if req.frame_ids:
        frame_list_path = ws / "meta" / "tasks" / f"{task_id}_frames.txt"
        frame_list_path.write_text("\n".join(req.frame_ids), encoding="utf-8")
        cmd += ["--frame-list", str(frame_list_path)]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=600)
        if result.returncode != 0:
            message = (result.stderr or result.stdout or "export failed").strip()
            raise HTTPException(500, message)
        if not output_dir.exists():
            raise HTTPException(500, f"export output not found: {output_dir}")
        return {"output_dir": str(output_dir), "stdout": result.stdout}
    except Exception as e:
        raise HTTPException(500, str(e))


@app.post("/api/list_tasks")
def api_list_tasks(req: OpenWorkspaceReq):
    ws = workspace_root(req.workspace_path)
    return list_tasks(ws)


@app.post("/api/read_task_log")
def api_read_task_log(req: ReadTaskLogReq):
    p = Path(req.log_path)
    if not p.exists():
        return ""
    return p.read_text(encoding="utf-8", errors="replace")


@app.post("/api/control_task")
def api_control_task(req: ControlTaskReq):
    ws = workspace_root(req.workspace_path)
    return control_task_runtime(ws, req.task_id, req.action.strip().lower())


@app.post("/api/import_predictions")
def api_import_predictions(req: ImportPredictionsReq):
    ws = workspace_root(req.workspace_path)
    return do_import_predictions(ws, req.predictions_path)


@app.post("/api/train_seed")
def api_train_seed(req: OpenWorkspaceReq):
    ws = workspace_root(req.workspace_path)
    settings = load_settings(ws)
    if not settings.get("openpcdet_root"):
        raise HTTPException(400, "openpcdet_root not configured")
    if not settings.get("model_config_path") or not settings.get("dataset_config_path"):
        raise HTTPException(400, "model_config_path / dataset_config_path not configured")

    task_id = f"train_seed_{int(time.time() * 1000)}"
    export_dir = ws / "training" / task_id / "seed_source"
    try:
        run_export_openpcdet_sync(ws, export_dir, reviewed_only=True)
    except Exception as exc:
        raise HTTPException(500, str(exc)) from exc

    python_bin = settings.get("python_bin") or sys.executable
    runtime_dir = ws / "training" / task_id
    cmd = [
        python_bin,
        str(SCRIPTS_DIR / "openpcdet_train.py"),
        "--source-root",
        str(export_dir),
        "--runtime-dir",
        str(runtime_dir),
        "--openpcdet-root",
        str(settings["openpcdet_root"]),
        "--dataset-cfg",
        str(settings["dataset_config_path"]),
        "--model-cfg",
        str(settings["model_config_path"]),
        "--extra-tag",
        task_id,
        "--python-bin",
        python_bin,
    ]
    extra_args = str(settings.get("train_extra_args") or "").strip()
    if extra_args:
        cmd.extend(extra_args.split())
    return spawn_task(
        ws,
        "train_seed",
        cmd,
        post_action={
            "type": "update_training_checkpoint",
            "task_id": task_id,
            "openpcdet_root": settings["openpcdet_root"],
            "settings_path": str(ws / "meta" / "settings.json"),
        },
    )


@app.post("/api/train_openpcdet")
def api_train_openpcdet(req: TrainOpenpcdetReq):
    root = workspace_root(req.root_path)
    target = inspect_training_target_path(root)
    if target.get("kind") not in {"training_dataset", "training_group_root"}:
        raise HTTPException(400, "Selected path is not an exported OpenPCDet dataset root.")

    ensure_training_root(root)
    settings = load_training_settings(root)
    if not settings.get("openpcdet_root"):
        raise HTTPException(400, "openpcdet_root not configured")
    if not settings.get("model_config_path") or not settings.get("dataset_config_path"):
        raise HTTPException(400, "model_config_path / dataset_config_path not configured")

    task_record_id, run_name = allocate_training_run_name(root, "train_openpcdet", req.task_name)
    python_bin = settings.get("python_bin") or sys.executable
    runtime_dir = root / "training" / run_name
    cmd = [
        python_bin,
        str(SCRIPTS_DIR / "openpcdet_train.py"),
        "--source-root",
        str(root),
        "--runtime-dir",
        str(runtime_dir),
        "--openpcdet-root",
        str(settings["openpcdet_root"]),
        "--dataset-cfg",
        str(settings["dataset_config_path"]),
        "--model-cfg",
        str(settings["model_config_path"]),
        "--extra-tag",
        run_name,
        "--python-bin",
        python_bin,
    ]
    extra_args = str(settings.get("train_extra_args") or "").strip()
    if extra_args:
        cmd.extend(extra_args.split())

    metadata = {
        "source_root": str(root),
        "group_count": int(target.get("groups") and len(target["groups"]) or 0),
        "frame_count": int(target.get("frame_count") or 0),
        "train_count": int(target.get("train_count") or 0),
        "val_count": int(target.get("val_count") or 0),
        "run_name": run_name,
        "runtime_dir": str(runtime_dir),
    }
    return spawn_task(
        root,
        "train_openpcdet",
        cmd,
        post_action={
            "type": "update_training_checkpoint",
            "task_id": run_name,
            "openpcdet_root": settings["openpcdet_root"],
            "settings_path": str(training_settings_path(root)),
        },
        metadata=metadata,
        task_id=task_record_id,
    )


@app.post("/api/infer_range")
def api_infer_range(req: InferRangeReq):
    ws = workspace_root(req.workspace_path)
    settings = load_settings(ws)
    if not settings.get("openpcdet_root"):
        raise HTTPException(400, "openpcdet_root not configured")
    if not settings.get("model_config_path"):
        raise HTTPException(400, "model_config_path not configured")
    effective_checkpoint = req.checkpoint_path.strip() or settings.get("checkpoint_path") or ""
    if not effective_checkpoint:
        raise HTTPException(400, "checkpoint_path not configured")
    if not req.frame_ids:
        raise HTTPException(400, "frame_ids is empty")

    task_id = f"infer_range_{int(time.time() * 1000)}"
    export_dir = ws / "training" / task_id / "infer_source"
    try:
        run_export_openpcdet_sync(ws, export_dir, points_only=True, frame_ids=req.frame_ids)
    except Exception as exc:
        raise HTTPException(500, str(exc)) from exc

    predictions_path = ws / "models" / f"{task_id}_predictions.json"
    python_bin = settings.get("python_bin") or sys.executable
    cmd = [
        python_bin,
        str(SCRIPTS_DIR / "openpcdet_infer.py"),
        "--openpcdet-root",
        str(settings["openpcdet_root"]),
        "--cfg-file",
        str(settings["model_config_path"]),
        "--ckpt-file",
        str(effective_checkpoint),
        "--points-dir",
        str(export_dir / "points"),
        "--output-json",
        str(predictions_path),
        "--score-thresh",
        str(req.score_threshold if req.score_threshold is not None else settings.get("score_threshold", 0.3)),
    ]
    extra_args = str(settings.get("infer_extra_args") or "").strip()
    if extra_args:
        cmd.extend(extra_args.split())
    return spawn_task(
        ws,
        "infer_range",
        cmd,
        post_action={"type": "import_predictions", "predictions_path": str(predictions_path)},
    )


@app.api_route(
    "/api/{api_path:path}",
    methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
)
def api_not_found(api_path: str):
    raise HTTPException(404, f"Unknown API endpoint: /api/{api_path}")


# ---------------------------------------------------------------------------
# Serve frontend static files (production build)
# ---------------------------------------------------------------------------

dist_dir = Path(__file__).parent / "dist"
if dist_dir.exists():
    @app.get("/")
    def serve_index():
        return FileResponse(dist_dir / "index.html")

    app.mount("/", StaticFiles(directory=str(dist_dir)), name="static")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8787)
    parser.add_argument("--host", type=str, default="0.0.0.0")
    args = parser.parse_args()

    import uvicorn
    uvicorn.run(app, host=args.host, port=args.port)
