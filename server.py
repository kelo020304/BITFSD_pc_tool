#!/usr/bin/env python3
"""Web backend for bitfsd-annotator, replacing the Tauri Rust backend."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
import threading
import time
import uuid
from pathlib import Path
from typing import Any, Optional

import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# ---------------------------------------------------------------------------
# Import helpers from existing workspace_tools
# ---------------------------------------------------------------------------
SCRIPTS_DIR = Path(__file__).parent / "scripts"
CONFIG_DIR = Path(__file__).parent / "config" / "openpcdet"
DEFAULT_DATASET_CFG = CONFIG_DIR / "dataset_configs" / "cone_dataset.yaml"
DEFAULT_MODEL_CFG = CONFIG_DIR / "cone_models" / "pointpillar_cone.yaml"
sys.path.insert(0, str(SCRIPTS_DIR))
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
    score_threshold: float = 0.3
    min_reviewed_for_training: int = 16
    train_extra_args: str = "--epochs 30 --workers 0"
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

class ImportPredictionsReq(BaseModel):
    workspace_path: str
    predictions_path: str

class ReadTaskLogReq(BaseModel):
    log_path: str

class OpenTrainingRootReq(BaseModel):
    root_path: str

class TrainOpenpcdetReq(BaseModel):
    root_path: str

# ---------------------------------------------------------------------------
# Defaults
# ---------------------------------------------------------------------------

DEFAULT_CLASSES: list[dict[str, Any]] = [
    {"id": "cone_blue", "name": "Cone_Blue", "color": "#0066FF", "default_size": [0.228, 0.228, 0.325]},
    {"id": "cone_red", "name": "Cone_Red", "color": "#FF3030", "default_size": [0.228, 0.228, 0.325]},
]

DEFAULT_SETTINGS: dict[str, Any] = {
    "python_bin": sys.executable,
    "openpcdet_root": "",
    "model_config_path": str(DEFAULT_MODEL_CFG.resolve()) if DEFAULT_MODEL_CFG.exists() else "",
    "dataset_config_path": str(DEFAULT_DATASET_CFG.resolve()) if DEFAULT_DATASET_CFG.exists() else "",
    "checkpoint_path": "",
    "score_threshold": 0.3,
    "min_reviewed_for_training": 16,
    "train_extra_args": "--epochs 30 --workers 0",
    "infer_extra_args": "",
}

# ---------------------------------------------------------------------------
# Workspace helpers
# ---------------------------------------------------------------------------

def workspace_root(path: str) -> Path:
    return Path(path).expanduser().resolve()


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


def normalize_classes(classes: Any) -> list[dict[str, Any]]:
    source = classes if isinstance(classes, list) else []
    normalized: list[dict[str, Any]] = []
    seen_ids: set[str] = set()
    fallback_palette = [item["color"] for item in DEFAULT_CLASSES] or ["#58A6FF"]

    for index, item in enumerate(source):
        if not isinstance(item, dict):
            continue
        raw_name = item.get("name")
        name = raw_name.strip() if isinstance(raw_name, str) else ""
        if not name:
            continue
        raw_id = item.get("id")
        base_id = raw_id.strip() if isinstance(raw_id, str) and raw_id.strip() else slugify_class_name(name) or f"class_{index + 1}"
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
                "color": normalize_hex_color(item.get("color"), fallback_palette[index % len(fallback_palette)]),
                "default_size": normalize_default_size(item.get("default_size")),
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
        normalized["python_bin"] = sys.executable
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
            frames = scan_frames(workspace_path)
            groups.append({
                "group_id": item.get("group_id"),
                "title": item.get("title") or item.get("group_id"),
                "workspace_path": str(workspace_path),
                "frame_count": len(frames),
                "annotated_count": len([frame for frame in frames if frame.get("box_count", 0) > 0]),
                "reviewed_count": len([frame for frame in frames if frame.get("review_status") == "reviewed"]),
                "start_frame_id": item.get("start_frame_id"),
                "end_frame_id": item.get("end_frame_id"),
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
        frames = scan_frames(child)
        inferred_groups.append({
            "group_id": child.name,
            "title": child.name,
            "workspace_path": str(child.resolve()),
            "frame_count": len(frames),
            "annotated_count": len([frame for frame in frames if frame.get("box_count", 0) > 0]),
            "reviewed_count": len([frame for frame in frames if frame.get("review_status") == "reviewed"]),
            "start_frame_id": frames[0]["frame_id"] if frames else None,
            "end_frame_id": frames[-1]["frame_id"] if frames else None,
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


def scan_frames(ws: Path) -> list[dict]:
    frame_ids = read_frame_ids(ws)
    summaries = []
    for fid in frame_ids:
        ann = load_annotation(ws, fid)
        summaries.append({
            "frame_id": fid,
            "source": ann.get("source"),
            "review_status": ann.get("review_status"),
            "box_count": len(ann.get("boxes", [])),
        })
    return summaries


def list_tasks(ws: Path) -> list[dict]:
    tasks_dir = ws / "meta" / "tasks"
    if not tasks_dir.exists():
        return []
    tasks = []
    for p in tasks_dir.glob("*.json"):
        try:
            tasks.append(json.loads(p.read_text(encoding="utf-8")))
        except Exception:
            pass
    tasks.sort(key=lambda t: t.get("created_at_ms", 0), reverse=True)
    return tasks


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
    for _, checkpoint in reversed(candidates):
        if task_id in str(checkpoint):
            return checkpoint
    return candidates[-1][1] if candidates else None


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
) -> dict:
    task_id = f"{kind}_{int(time.time() * 1000)}"
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

    def persist_record() -> None:
        record_path.write_text(json.dumps(record, indent=2), encoding="utf-8")

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
        metadata = dict(record.get("metadata") or {})
        metadata["progress"] = progress
        record["metadata"] = metadata
        persist_record()

    persist_record()

    def run():
        record["status"] = "running"
        record["started_at_ms"] = int(time.time() * 1000)
        persist_record()
        try:
            with open(log_path, "w", encoding="utf-8") as log_f:
                proc = subprocess.Popen(
                    cmd,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.STDOUT,
                    text=True,
                    encoding="utf-8",
                    bufsize=1,
                )
                assert proc.stdout is not None
                for line in proc.stdout:
                    log_f.write(line)
                    log_f.flush()
                    update_progress_from_line(line)
                proc.wait(timeout=3600)
            if proc.returncode == 0:
                record["status"] = "succeeded"
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
                            metadata = dict(record.get("metadata") or {})
                            metadata["checkpoint_path"] = str(checkpoint.resolve())
                            record["metadata"] = metadata
                            update_checkpoint_setting(
                                Path(post_action["settings_path"]).expanduser().resolve(),
                                checkpoint,
                            )
            else:
                record["status"] = "failed"
                record["error"] = f"exit code {proc.returncode}"
        except Exception as e:
            record["status"] = "failed"
            record["error"] = str(e)
        record["finished_at_ms"] = int(time.time() * 1000)
        persist_record()

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
                "class_name": pb["class_name"],
                "center_xyz": pb["center_xyz"],
                "size_lwh": pb["size_lwh"],
                "yaw": pb.get("yaw", 0.0),
                "score": pb.get("score"),
            })
        ann = {
            "frame_id": fid,
            "source": "model",
            "review_status": "unreviewed",
            "boxes": boxes,
            "updated_at_ms": int(time.time() * 1000),
        }
        (ws / "annotations" / f"{fid}.json").write_text(json.dumps(ann, indent=2), encoding="utf-8")
        updated.append({
            "frame_id": fid,
            "source": "model",
            "review_status": "unreviewed",
            "box_count": len(boxes),
        })
    return updated


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
    frames = scan_frames(ws)
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
    }


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
    ann = req.annotation.model_dump()
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

    task_id = f"train_openpcdet_{int(time.time() * 1000)}"
    python_bin = settings.get("python_bin") or sys.executable
    runtime_dir = root / "training" / task_id
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
        task_id,
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
        "runtime_dir": str(runtime_dir),
    }
    return spawn_task(
        root,
        "train_openpcdet",
        cmd,
        post_action={
            "type": "update_training_checkpoint",
            "task_id": task_id,
            "openpcdet_root": settings["openpcdet_root"],
            "settings_path": str(training_settings_path(root)),
        },
        metadata=metadata,
    )


@app.post("/api/infer_range")
def api_infer_range(req: InferRangeReq):
    ws = workspace_root(req.workspace_path)
    settings = load_settings(ws)
    if not settings.get("openpcdet_root"):
        raise HTTPException(400, "openpcdet_root not configured")
    if not settings.get("model_config_path"):
        raise HTTPException(400, "model_config_path not configured")
    if not settings.get("checkpoint_path"):
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
        str(settings["checkpoint_path"]),
        "--points-dir",
        str(export_dir / "points"),
        "--output-json",
        str(predictions_path),
        "--score-thresh",
        str(settings.get("score_threshold", 0.3)),
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
