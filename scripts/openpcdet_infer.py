#!/usr/bin/env python3
"""Run PointPillars inference on exported npy frames and emit native prediction JSON."""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

import numpy as np
import torch


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="OpenPCDet inference helper")
    parser.add_argument("--openpcdet-root", required=True)
    parser.add_argument("--cfg-file", required=True)
    parser.add_argument("--ckpt-file", required=True)
    parser.add_argument("--points-dir", required=True)
    parser.add_argument("--output-json", required=True)
    parser.add_argument("--score-thresh", type=float, default=0.3)
    args, _ = parser.parse_known_args()
    return args


def main() -> None:
    args = parse_args()
    openpcdet_root = Path(args.openpcdet_root).expanduser().resolve()
    cfg_file = Path(args.cfg_file).expanduser().resolve()
    ckpt_file = Path(args.ckpt_file).expanduser().resolve()
    points_dir = Path(args.points_dir).expanduser().resolve()
    output_json = Path(args.output_json).expanduser().resolve()

    if not openpcdet_root.exists():
        raise SystemExit(f"OpenPCDet root does not exist: {openpcdet_root}")
    if not cfg_file.exists():
        raise SystemExit(f"cfg file does not exist: {cfg_file}")
    if not ckpt_file.exists():
        raise SystemExit(f"checkpoint does not exist: {ckpt_file}")
    if not points_dir.exists():
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
        def __init__(self, dataset_cfg, class_names, root_path, logger):
            super().__init__(dataset_cfg=dataset_cfg, class_names=class_names, training=False, root_path=root_path, logger=logger)
            self.sample_files = sorted(root_path.glob("*.npy"))

        def __len__(self):
            return len(self.sample_files)

        def __getitem__(self, index):
            path = self.sample_files[index]
            points = np.load(path).astype(np.float32)
            return self.prepare_data({"points": points, "frame_id": path.stem})

    cfg_from_yaml_file(str(cfg_file), cfg)
    logger = common_utils.create_logger()
    dataset = NpyDataset(cfg.DATA_CONFIG, cfg.CLASS_NAMES, points_dir, logger)
    model = build_network(model_cfg=cfg.MODEL, num_class=len(cfg.CLASS_NAMES), dataset=dataset)
    model.load_params_from_file(filename=str(ckpt_file), logger=logger, to_cpu=False)
    model.cuda()
    model.eval()

    predictions = []
    with torch.no_grad():
        for sample in dataset:
            batch = dataset.collate_batch([sample])
            load_data_to_gpu(batch)
            pred_dicts, _ = model.forward(batch)
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
                items.append(
                    {
                        "class_name": class_name,
                        "center_xyz": [float(box[0]), float(box[1]), float(box[2])],
                        "size_lwh": [float(box[3]), float(box[4]), float(box[5])],
                        "yaw": float(box[6]),
                        "score": float(score),
                    }
                )
            predictions.append({"frame_id": str(frame_id), "boxes": items})

    output_json.parent.mkdir(parents=True, exist_ok=True)
    output_json.write_text(json.dumps(predictions, indent=2), encoding="utf-8")
    print(json.dumps({"output_json": str(output_json), "frames": len(predictions)}, indent=2))


if __name__ == "__main__":
    main()
