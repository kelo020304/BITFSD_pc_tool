#!/usr/bin/env python3
"""Run OpenPCDet inference on exported npy frames and emit native prediction JSON."""

from __future__ import annotations

import argparse
import json
import os
import sys
import tempfile
import time
from pathlib import Path

import numpy as np
import torch
import yaml
from point_cloud_utils import sanitize_points


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="OpenPCDet inference helper")
    parser.add_argument("--openpcdet-root", required=True)
    parser.add_argument("--cfg-file", required=True)
    parser.add_argument("--ckpt-file", required=True)
    parser.add_argument("--points-dir", default="")
    parser.add_argument("--points-path", default="")
    parser.add_argument("--output-json", required=True)
    parser.add_argument("--score-thresh", type=float, default=0.3)
    args, _ = parser.parse_known_args()
    return args


APP_ROOT = Path(__file__).resolve().parents[1]
APP_OPENPCDET_CFG_ROOT = APP_ROOT / "config" / "openpcdet"


def iter_candidate_base_paths(base_config: str, owner_cfg_path: Path, openpcdet_root: Path) -> list[Path]:
    raw = Path(base_config)
    if raw.is_absolute():
        return [raw]

    candidates = [
        owner_cfg_path.parent / raw,
        openpcdet_root / raw,
        openpcdet_root / "tools" / raw,
        APP_OPENPCDET_CFG_ROOT / raw,
    ]
    if raw.parts and raw.parts[0] == "cfgs":
        candidates.append(APP_OPENPCDET_CFG_ROOT / Path(*raw.parts[1:]))
    return [candidate.expanduser().resolve() for candidate in candidates]


def materialize_cfg_tree(
    source_path: Path,
    openpcdet_root: Path,
    work_dir: Path,
    cache: dict[Path, Path],
) -> Path:
    resolved_source = source_path.expanduser().resolve()
    cached = cache.get(resolved_source)
    if cached is not None:
        return cached

    try:
        payload = yaml.safe_load(resolved_source.read_text(encoding="utf-8"))
    except Exception:
        target_path = work_dir / resolved_source.name
        target_path.write_text(resolved_source.read_text(encoding="utf-8"), encoding="utf-8")
        cache[resolved_source] = target_path
        return target_path

    if not isinstance(payload, dict):
        target_path = work_dir / resolved_source.name
        target_path.write_text(yaml.safe_dump(payload, sort_keys=False), encoding="utf-8")
        cache[resolved_source] = target_path
        return target_path

    def rewrite(node):
        if isinstance(node, dict):
            updated = {}
            for key, value in node.items():
                if key == "_BASE_CONFIG_" and isinstance(value, str) and value.strip():
                    base_source = next(
                        (candidate for candidate in iter_candidate_base_paths(value.strip(), resolved_source, openpcdet_root) if candidate.exists()),
                        None,
                    )
                    if base_source is None:
                        raise FileNotFoundError(f"Unable to resolve _BASE_CONFIG_: {value}")
                    updated[key] = str(materialize_cfg_tree(base_source, openpcdet_root, work_dir, cache))
                else:
                    updated[key] = rewrite(value)
            return updated
        if isinstance(node, list):
            return [rewrite(item) for item in node]
        return node

    rewritten_payload = rewrite(payload)
    target_path = work_dir / resolved_source.name
    target_path.write_text(yaml.safe_dump(rewritten_payload, sort_keys=False), encoding="utf-8")
    cache[resolved_source] = target_path
    return target_path


def apply_runtime_score_threshold(cfg, score_thresh: float) -> None:
    model_cfg = getattr(cfg, "MODEL", None)
    if model_cfg is None:
        return

    post_processing = getattr(model_cfg, "POST_PROCESSING", None)
    if post_processing is not None:
        existing = getattr(post_processing, "SCORE_THRESH", None)
        post_processing.SCORE_THRESH = score_thresh if existing is None else min(float(existing), score_thresh)

    dense_head = getattr(model_cfg, "DENSE_HEAD", None)
    dense_post = getattr(dense_head, "POST_PROCESSING", None) if dense_head is not None else None
    if dense_post is not None:
        existing = getattr(dense_post, "SCORE_THRESH", None)
        dense_post.SCORE_THRESH = score_thresh if existing is None else min(float(existing), score_thresh)


def main() -> None:
    args = parse_args()
    openpcdet_root = Path(args.openpcdet_root).expanduser().resolve()
    cfg_file = Path(args.cfg_file).expanduser().resolve()
    ckpt_file = Path(args.ckpt_file).expanduser().resolve()
    points_dir = Path(args.points_dir).expanduser().resolve() if args.points_dir else None
    points_path = Path(args.points_path).expanduser().resolve() if args.points_path else None
    output_json = Path(args.output_json).expanduser().resolve()

    if not openpcdet_root.exists():
        raise SystemExit(f"OpenPCDet root does not exist: {openpcdet_root}")
    if not cfg_file.exists():
        raise SystemExit(f"cfg file does not exist: {cfg_file}")
    if not ckpt_file.exists():
        raise SystemExit(f"checkpoint does not exist: {ckpt_file}")
    if points_path is not None:
        if not points_path.exists():
            raise SystemExit(f"points file does not exist: {points_path}")
    elif points_dir is None or not points_dir.exists():
        raise SystemExit(f"points dir does not exist: {points_dir}")
    if not torch.cuda.is_available():
        raise SystemExit("CUDA is required for OpenPCDet inference in this tool")

    os.chdir(openpcdet_root)
    sys.path.insert(0, str(openpcdet_root))

    from pcdet.config import cfg, cfg_from_yaml_file
    from pcdet.datasets import DatasetTemplate
    from pcdet.models import build_network, load_data_to_gpu
    from pcdet.utils import common_utils

    class NpyDataset(DatasetTemplate):
        def __init__(self, dataset_cfg, class_names, root_path, logger, sample_files=None):
            super().__init__(dataset_cfg=dataset_cfg, class_names=class_names, training=False, root_path=root_path, logger=logger)
            if sample_files is not None:
                self.sample_files = [Path(path).expanduser().resolve() for path in sample_files]
            else:
                self.sample_files = sorted(root_path.glob("*.npy"))

        def __len__(self):
            return len(self.sample_files)

        def __getitem__(self, index):
            path = self.sample_files[index]
            points = sanitize_points(np.load(path).astype(np.float32))
            return self.prepare_data({"points": points, "frame_id": path.stem})

    with tempfile.TemporaryDirectory(prefix="bitfsd_infer_cfg_") as temp_cfg_dir_name:
        resolved_cfg_file = materialize_cfg_tree(cfg_file, openpcdet_root, Path(temp_cfg_dir_name), {})
        cfg_from_yaml_file(str(resolved_cfg_file), cfg)
        apply_runtime_score_threshold(cfg, float(args.score_thresh))
        logger = common_utils.create_logger()
        dataset_root = points_path.parent if points_path is not None else points_dir
        dataset = NpyDataset(
            cfg.DATA_CONFIG,
            cfg.CLASS_NAMES,
            dataset_root,
            logger,
            sample_files=[points_path] if points_path is not None else None,
        )
        model = build_network(model_cfg=cfg.MODEL, num_class=len(cfg.CLASS_NAMES), dataset=dataset)
        model.load_params_from_file(filename=str(ckpt_file), logger=logger, to_cpu=False)
        model.cuda()
        model.eval()

        predictions = []
        with torch.no_grad():
            for sample in dataset:
                batch = dataset.collate_batch([sample])
                load_data_to_gpu(batch)
                torch.cuda.synchronize()
                start_time = time.perf_counter()
                pred_dicts, _ = model.forward(batch)
                torch.cuda.synchronize()
                inference_ms = (time.perf_counter() - start_time) * 1000.0
                pred = pred_dicts[0]
                frame_id = batch["frame_id"][0]

                boxes = pred["pred_boxes"].detach().cpu().numpy()
                scores = pred["pred_scores"].detach().cpu().numpy()
                labels = pred["pred_labels"].detach().cpu().numpy()
                items = []
                for box, score, label in zip(boxes, scores, labels):
                    if float(score) < args.score_thresh:
                        continue
                    class_name = cfg.CLASS_NAMES[int(label) - 1]
                    if class_name.lower().startswith("cone_") or class_name.lower() in {"cone", "cone_big"}:
                        class_name = "Cone"
                    items.append(
                        {
                            "class_name": class_name,
                            "center_xyz": [float(box[0]), float(box[1]), float(box[2])],
                            "size_lwh": [float(box[3]), float(box[4]), float(box[5])],
                            "yaw": float(box[6]),
                            "score": float(score),
                        }
                    )
                predictions.append({"frame_id": str(frame_id), "boxes": items, "inference_ms": inference_ms})

    output_json.parent.mkdir(parents=True, exist_ok=True)
    output_json.write_text(json.dumps(predictions, indent=2), encoding="utf-8")
    print(json.dumps({"output_json": str(output_json), "frames": len(predictions)}, indent=2))


if __name__ == "__main__":
    main()
