#!/usr/bin/env python3
"""Aggregate exported group datasets and launch OpenPCDet training."""

from __future__ import annotations

import argparse
import copy
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any

import numpy as np
import yaml

PROGRESS_MARKER = "@@progress@@ "


def parse_args() -> tuple[argparse.Namespace, list[str]]:
    parser = argparse.ArgumentParser(description="OpenPCDet training helper")
    parser.add_argument("--source-root", required=True, help="single exported dataset dir or a root containing multiple group_* datasets")
    parser.add_argument("--runtime-dir", required=True, help="working directory for generated dataset/config files")
    parser.add_argument("--openpcdet-root", required=True)
    parser.add_argument("--dataset-cfg", required=True)
    parser.add_argument("--model-cfg", required=True)
    parser.add_argument("--extra-tag", required=True)
    parser.add_argument("--python-bin", default="python3")
    return parser.parse_known_args()


def emit_progress(stage: str, label: str, percent: float | None = None, **payload: object) -> None:
    body: dict[str, object] = {
        "kind": "train_openpcdet",
        "stage": stage,
        "label": label,
    }
    if percent is not None:
        body["percent"] = percent
    body.update(payload)
    print(f"{PROGRESS_MARKER}{json.dumps(body, ensure_ascii=False)}", flush=True)


def is_openpcdet_dataset_dir(path: Path) -> bool:
    return (path / "points").is_dir() and (path / "labels").is_dir() and (path / "ImageSets").is_dir()


def resolve_group_dirs(source_root: Path) -> list[Path]:
    if is_openpcdet_dataset_dir(source_root):
        return [source_root]
    groups = [child for child in sorted(source_root.iterdir()) if child.is_dir() and is_openpcdet_dataset_dir(child)]
    if groups:
        return groups
    raise SystemExit(f"no exported OpenPCDet dataset found under: {source_root}")


def read_split_ids(dataset_dir: Path, split: str) -> list[str]:
    split_path = dataset_dir / "ImageSets" / f"{split}.txt"
    if not split_path.exists():
        return []
    return [line.strip() for line in split_path.read_text(encoding="utf-8").splitlines() if line.strip()]


def read_all_ids(dataset_dir: Path) -> list[str]:
    all_ids = read_split_ids(dataset_dir, "all")
    if all_ids:
        return all_ids
    ids = sorted(path.stem for path in (dataset_dir / "points").glob("*.npy"))
    return ids


def split_train_val(ids: list[str]) -> tuple[list[str], list[str]]:
    if len(ids) <= 1:
        return list(ids), list(ids)
    if len(ids) < 5:
        return list(ids[:-1]), list(ids[-1:])
    val_ids = [sample_id for index, sample_id in enumerate(ids) if index % 5 == 0]
    train_ids = [sample_id for sample_id in ids if sample_id not in set(val_ids)]
    if not train_ids:
        train_ids = list(ids[:-1])
        val_ids = list(ids[-1:])
    return train_ids, val_ids


def sanitize_group_id(value: str) -> str:
    cleaned = "".join(char if char.isalnum() or char in {"_", "-"} else "_" for char in value.strip())
    return cleaned or "group"


def collect_samples(group_dirs: list[Path]) -> tuple[list[dict[str, Any]], list[str], list[str]]:
    samples: list[dict[str, Any]] = []
    train_ids: list[str] = []
    val_ids: list[str] = []
    seen_ids: set[str] = set()

    for group_dir in group_dirs:
        group_id = sanitize_group_id(group_dir.name)
        all_ids = read_all_ids(group_dir)
        if not all_ids:
            continue

        train_set = set(read_split_ids(group_dir, "train"))
        val_set = set(read_split_ids(group_dir, "val"))
        if not train_set and not val_set:
            fallback_train, fallback_val = split_train_val(all_ids)
            train_set = set(fallback_train)
            val_set = set(fallback_val)

        for frame_id in all_ids:
            points_path = group_dir / "points" / f"{frame_id}.npy"
            label_path = group_dir / "labels" / f"{frame_id}.txt"
            if not points_path.exists() or not label_path.exists():
                continue
            sample_id = f"{group_id}__{frame_id}"
            if sample_id in seen_ids:
                raise SystemExit(f"duplicated aggregated sample id: {sample_id}")
            seen_ids.add(sample_id)
            samples.append(
                {
                    "sample_id": sample_id,
                    "group_id": group_id,
                    "frame_id": frame_id,
                    "points_path": points_path,
                    "label_path": label_path,
                }
            )
            if frame_id in train_set:
                train_ids.append(sample_id)
            elif frame_id in val_set:
                val_ids.append(sample_id)

    all_sample_ids = [sample["sample_id"] for sample in samples]
    if not train_ids and not val_ids:
        train_ids, val_ids = split_train_val(all_sample_ids)
    else:
        train_ids = [sample_id for sample_id in all_sample_ids if sample_id in set(train_ids)]
        val_ids = [sample_id for sample_id in all_sample_ids if sample_id in set(val_ids)]
        if not val_ids:
            _, val_ids = split_train_val(all_sample_ids)
        if not train_ids:
            train_ids = [sample_id for sample_id in all_sample_ids if sample_id not in set(val_ids)] or list(all_sample_ids)

    return samples, train_ids, val_ids


def parse_label_line(line: str) -> tuple[str, list[float]] | None:
    stripped = line.strip()
    if not stripped:
        return None
    parts = stripped.split()
    if len(parts) < 8:
        return None
    try:
        box = [float(item) for item in parts[:7]]
    except ValueError:
        return None
    return parts[7], box


def collect_class_stats(samples: list[dict[str, Any]]) -> tuple[list[str], dict[str, list[float]]]:
    dimensions: dict[str, list[list[float]]] = {}
    for sample in samples:
        label_path = Path(sample["label_path"])
        for raw_line in label_path.read_text(encoding="utf-8").splitlines():
            parsed = parse_label_line(raw_line)
            if parsed is None:
                continue
            class_name, box = parsed
            dimensions.setdefault(class_name, []).append(box[3:6])

    if not dimensions:
        raise SystemExit("no labeled boxes found in the selected dataset root")

    class_names = sorted(dimensions)
    anchor_sizes = {
        class_name: np.median(np.asarray(values, dtype=np.float32), axis=0).astype(float).tolist()
        for class_name, values in dimensions.items()
    }
    return class_names, anchor_sizes


def symlink_or_copy(source: Path, target: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists() or target.is_symlink():
        target.unlink()
    try:
        os.symlink(source, target)
    except OSError:
        shutil.copy2(source, target)


def prepare_runtime_dataset(
    runtime_dataset_dir: Path,
    samples: list[dict[str, Any]],
    train_ids: list[str],
    val_ids: list[str],
) -> dict[str, Any]:
    if runtime_dataset_dir.exists():
        shutil.rmtree(runtime_dataset_dir)
    points_dir = runtime_dataset_dir / "points"
    labels_dir = runtime_dataset_dir / "labels"
    imagesets_dir = runtime_dataset_dir / "ImageSets"
    points_dir.mkdir(parents=True, exist_ok=True)
    labels_dir.mkdir(parents=True, exist_ok=True)
    imagesets_dir.mkdir(parents=True, exist_ok=True)

    all_ids = [sample["sample_id"] for sample in samples]
    train_set = set(train_ids)
    val_set = set(val_ids)

    for sample in samples:
        sample_id = str(sample["sample_id"])
        symlink_or_copy(Path(sample["points_path"]), points_dir / f"{sample_id}.npy")
        symlink_or_copy(Path(sample["label_path"]), labels_dir / f"{sample_id}.txt")

    (imagesets_dir / "all.txt").write_text("\n".join(all_ids) + ("\n" if all_ids else ""), encoding="utf-8")
    (imagesets_dir / "train.txt").write_text(
        "\n".join([sample_id for sample_id in all_ids if sample_id in train_set]) + ("\n" if train_set else ""),
        encoding="utf-8",
    )
    (imagesets_dir / "val.txt").write_text(
        "\n".join([sample_id for sample_id in all_ids if sample_id in val_set]) + ("\n" if val_set else ""),
        encoding="utf-8",
    )

    manifest = {
        "source_groups": sorted({str(Path(sample["points_path"]).parents[1]) for sample in samples}),
        "sample_count": len(samples),
        "train_count": len(train_ids),
        "val_count": len(val_ids),
        "samples": [{"sample_id": sample["sample_id"], "group_id": sample["group_id"], "frame_id": sample["frame_id"]} for sample in samples],
    }
    (runtime_dataset_dir / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    return manifest


def ensure_mapping(value: Any) -> dict[str, Any]:
    return value if isinstance(value, dict) else {}


def build_runtime_dataset_cfg(
    base_cfg_path: Path,
    output_path: Path,
    runtime_dataset_dir: Path,
    class_names: list[str],
) -> None:
    dataset_cfg = ensure_mapping(yaml.safe_load(base_cfg_path.read_text(encoding="utf-8")))
    dataset_cfg["DATA_PATH"] = str(runtime_dataset_dir)
    dataset_cfg["MAP_CLASS_TO_KITTI"] = {class_name: "Pedestrian" for class_name in class_names}

    point_feature_encoding = ensure_mapping(dataset_cfg.get("POINT_FEATURE_ENCODING"))
    src_feature_list = point_feature_encoding.get("src_feature_list")
    num_point_features = len(src_feature_list) if isinstance(src_feature_list, list) and src_feature_list else 4

    augmentor = ensure_mapping(dataset_cfg.get("DATA_AUGMENTOR"))
    aug_list = augmentor.get("AUG_CONFIG_LIST")
    if isinstance(aug_list, list):
        for item in aug_list:
            if not isinstance(item, dict) or item.get("NAME") != "gt_sampling":
                continue
            prepare = ensure_mapping(item.get("PREPARE"))
            prepare["filter_by_min_points"] = [f"{class_name}:2" for class_name in class_names]
            if "filter_by_difficulty" not in prepare:
                prepare["filter_by_difficulty"] = [-1]
            item["PREPARE"] = prepare
            item["SAMPLE_GROUPS"] = [f"{class_name}:10" for class_name in class_names]
            item["NUM_POINT_FEATURES"] = num_point_features
            item["DB_INFO_PATH"] = ["custom_dbinfos_train.pkl"]

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(yaml.safe_dump(dataset_cfg, sort_keys=False), encoding="utf-8")


def build_anchor_template(class_name: str, anchor_size: list[float], template: dict[str, Any] | None) -> dict[str, Any]:
    config = copy.deepcopy(template) if isinstance(template, dict) else {
        "class_name": class_name,
        "anchor_sizes": [anchor_size],
        "anchor_rotations": [0],
        "anchor_bottom_heights": [0.0],
        "align_center": False,
        "feature_map_stride": 2,
        "matched_threshold": 0.35,
        "unmatched_threshold": 0.2,
    }
    config["class_name"] = class_name
    config["anchor_sizes"] = [anchor_size]
    return config


def build_runtime_model_cfg(
    base_cfg_path: Path,
    output_path: Path,
    runtime_dataset_cfg_path: Path,
    class_names: list[str],
    anchor_sizes: dict[str, list[float]],
) -> None:
    model_cfg = ensure_mapping(yaml.safe_load(base_cfg_path.read_text(encoding="utf-8")))
    model_cfg["CLASS_NAMES"] = class_names

    data_config = ensure_mapping(model_cfg.get("DATA_CONFIG"))
    data_config["_BASE_CONFIG_"] = str(runtime_dataset_cfg_path)
    model_cfg["DATA_CONFIG"] = data_config

    dense_head = ensure_mapping(ensure_mapping(model_cfg.get("MODEL")).get("DENSE_HEAD"))
    anchor_generator = dense_head.get("ANCHOR_GENERATOR_CONFIG")
    base_template = anchor_generator[0] if isinstance(anchor_generator, list) and anchor_generator else None
    if dense_head:
        dense_head["ANCHOR_GENERATOR_CONFIG"] = [
            build_anchor_template(class_name, anchor_sizes[class_name], base_template) for class_name in class_names
        ]
        model_cfg["MODEL"]["DENSE_HEAD"] = dense_head

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(yaml.safe_dump(model_cfg, sort_keys=False), encoding="utf-8")


def parse_workers(train_args: list[str]) -> int:
    for index, arg in enumerate(train_args):
        if arg == "--workers" and index + 1 < len(train_args):
            try:
                return max(1, int(train_args[index + 1]))
            except ValueError:
                return 4
        if arg.startswith("--workers="):
            try:
                return max(1, int(arg.split("=", 1)[1]))
            except ValueError:
                return 4
    return 4


def create_infos(
    openpcdet_root: Path,
    runtime_dataset_cfg_path: Path,
    runtime_dataset_dir: Path,
    runtime_model_cfg_path: Path,
    workers: int,
) -> None:
    sys.path.insert(0, str(openpcdet_root))
    os.chdir(openpcdet_root)

    from easydict import EasyDict
    import pcdet.datasets.custom.custom_dataset as custom_dataset_module

    custom_dataset_module.Path = Path
    create_custom_infos = custom_dataset_module.create_custom_infos

    dataset_cfg = EasyDict(yaml.safe_load(runtime_dataset_cfg_path.read_text(encoding="utf-8")))
    model_cfg = ensure_mapping(yaml.safe_load(runtime_model_cfg_path.read_text(encoding="utf-8")))
    class_names = list(model_cfg.get("CLASS_NAMES", []))
    create_custom_infos(
        dataset_cfg=dataset_cfg,
        class_names=class_names,
        data_path=runtime_dataset_dir,
        save_path=runtime_dataset_dir,
        workers=workers,
    )


def run_command(command: list[str], cwd: Path) -> None:
    print("[exec]", " ".join(command))
    process = subprocess.Popen(command, cwd=str(cwd))
    return_code = process.wait()
    if return_code != 0:
        raise SystemExit(return_code)


def main() -> None:
    args, train_args = parse_args()
    source_root = Path(args.source_root).expanduser().resolve()
    runtime_dir = Path(args.runtime_dir).expanduser().resolve()
    openpcdet_root = Path(args.openpcdet_root).expanduser().resolve()
    dataset_cfg_path = Path(args.dataset_cfg).expanduser().resolve()
    model_cfg_path = Path(args.model_cfg).expanduser().resolve()

    if not source_root.exists():
        raise SystemExit(f"training source root does not exist: {source_root}")
    if not openpcdet_root.exists():
        raise SystemExit(f"OpenPCDet root does not exist: {openpcdet_root}")
    if not dataset_cfg_path.exists():
        raise SystemExit(f"dataset config does not exist: {dataset_cfg_path}")
    if not model_cfg_path.exists():
        raise SystemExit(f"model config does not exist: {model_cfg_path}")

    emit_progress("scan", "正在扫描训练数据", 5)
    group_dirs = resolve_group_dirs(source_root)
    samples, train_ids, val_ids = collect_samples(group_dirs)
    if not samples:
        raise SystemExit("no valid frames found for training")

    emit_progress(
        "aggregate",
        "正在聚合多组训练数据",
        20,
        group_count=len(group_dirs),
        frame_count=len(samples),
        train_count=len(train_ids),
        val_count=len(val_ids),
    )
    runtime_dataset_dir = runtime_dir / "dataset"
    runtime_manifest = prepare_runtime_dataset(runtime_dataset_dir, samples, train_ids, val_ids)

    emit_progress("analyze", "正在统计类别与 anchor 尺寸", 35, sample_count=len(samples))
    class_names, anchor_sizes = collect_class_stats(samples)

    emit_progress("config", "正在生成 OpenPCDet 运行配置", 45, class_count=len(class_names))
    runtime_cfg_dir = runtime_dir / "configs"
    runtime_dataset_cfg_path = runtime_cfg_dir / "dataset.yaml"
    runtime_model_cfg_path = runtime_cfg_dir / "model.yaml"
    build_runtime_dataset_cfg(dataset_cfg_path, runtime_dataset_cfg_path, runtime_dataset_dir, class_names)
    build_runtime_model_cfg(model_cfg_path, runtime_model_cfg_path, runtime_dataset_cfg_path, class_names, anchor_sizes)

    workers = parse_workers(train_args)
    emit_progress("infos", "正在生成 infos 与 gt database", 60, workers=workers)
    create_infos(
        openpcdet_root=openpcdet_root,
        runtime_dataset_cfg_path=runtime_dataset_cfg_path,
        runtime_dataset_dir=runtime_dataset_dir,
        runtime_model_cfg_path=runtime_model_cfg_path,
        workers=workers,
    )

    summary = {
        "source_root": str(source_root),
        "runtime_dir": str(runtime_dir),
        "group_count": len(group_dirs),
        "frame_count": len(samples),
        "train_count": len(train_ids),
        "val_count": len(val_ids),
        "class_names": class_names,
        "anchor_sizes": anchor_sizes,
        "runtime_manifest": runtime_manifest,
        "runtime_model_cfg_path": str(runtime_model_cfg_path),
    }
    (runtime_dir / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")

    emit_progress("train", "OpenPCDet 开始训练", 75, config_path=str(runtime_model_cfg_path))
    command = [
        args.python_bin,
        "tools/train.py",
        "--cfg_file",
        str(runtime_model_cfg_path),
        "--extra_tag",
        args.extra_tag,
        *train_args,
    ]
    run_command(command, cwd=openpcdet_root)
    emit_progress("finished", "训练完成", 100)


if __name__ == "__main__":
    main()
