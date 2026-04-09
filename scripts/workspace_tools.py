#!/usr/bin/env python3
"""Workspace helpers for bitfsd-annotator."""

from __future__ import annotations

import argparse
import json
import shutil
import struct
import sys
import time
from pathlib import Path

import numpy as np

HESAI_TOPICS = ["/pandar_points", "/lidar_points", "/hesai/pandar"]
PROGRESS_MARKER = "@@progress@@ "


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="bitfsd-annotator workspace helpers")
    subparsers = parser.add_subparsers(dest="command", required=True)

    extract = subparsers.add_parser("extract-pcd", help="extract pcd frames from rosbag2/mcap")
    extract.add_argument("--bag", required=True)
    extract.add_argument("--workspace", required=True)
    extract.add_argument("--topic", default="")
    extract.add_argument("--frame-step", type=int, default=5)
    extract.add_argument(
        "--range",
        nargs=6,
        type=float,
        metavar=("XMIN", "YMIN", "ZMIN", "XMAX", "YMAX", "ZMAX"),
        help="optional ROI crop",
    )

    package = subparsers.add_parser("package-groups", help="extract frames and split them into group workspaces")
    package.add_argument("--bag", required=True)
    package.add_argument("--output-root", required=True)
    package.add_argument("--topic", default="")
    package.add_argument("--frame-step", type=int, default=5)
    package.add_argument("--group-size", type=int, default=20)
    package.add_argument(
        "--append",
        action="store_true",
        help="keep existing groups in output-root and append new groups after the last one",
    )
    package.add_argument(
        "--range",
        nargs=6,
        type=float,
        metavar=("XMIN", "YMIN", "ZMIN", "XMAX", "YMAX", "ZMAX"),
        help="optional ROI crop",
    )

    export = subparsers.add_parser("export-openpcdet", help="export workspace to OpenPCDet format")
    export.add_argument("--workspace", required=True)
    export.add_argument("--output", required=True)
    export.add_argument("--reviewed-only", action="store_true")
    export.add_argument("--annotated-only", action="store_true")
    export.add_argument("--points-only", action="store_true")
    export.add_argument("--frame-list", default="")

    return parser.parse_args()


def cmd_extract(args: argparse.Namespace) -> None:
    bag_path = Path(args.bag).expanduser().resolve()
    workspace = Path(args.workspace).expanduser().resolve()
    pcd_dir = workspace / "pcd"
    annotations_dir = workspace / "annotations"
    meta_dir = workspace / "meta"
    ensure_workspace(workspace)
    frame_step = max(1, int(args.frame_step))
    for stale_pcd in pcd_dir.glob("*.pcd"):
        stale_pcd.unlink()
    for stale_annotation in annotations_dir.glob("*.json"):
        stale_annotation.unlink()

    if not bag_path.exists():
        raise SystemExit(f"bag does not exist: {bag_path}")

    try:
        from rosbags.rosbag2 import Reader
        from rosbags.typesys import Stores, get_typestore
    except ImportError as exc:  # pragma: no cover - dependency error path
        raise SystemExit("rosbags is required: pip install rosbags") from exc

    typestore = get_typestore(Stores.ROS2_HUMBLE)
    topic = args.topic.strip()
    connections_meta: list[tuple[str, str]] = []
    if not topic:
        with Reader(bag_path) as reader:
            connections_meta = [(connection.topic, connection.msgtype) for connection in reader.connections]
        topic = auto_detect_topic(connections_meta)
        if not topic:
            raise SystemExit(
                "no point-cloud topic detected; available topics:\n"
                + "\n".join(f"  {item}" for item in format_connections(connections_meta))
            )
    elif not connections_meta:
        with Reader(bag_path) as reader:
            connections_meta = [(connection.topic, connection.msgtype) for connection in reader.connections]

    frame_count = 0
    valid_frame_count = 0
    skipped = 0
    started = time.time()
    with Reader(bag_path) as reader:
        for connection, _, rawdata in reader.messages():
            if connection.topic != topic:
                continue
            try:
                msg = typestore.deserialize_cdr(rawdata, connection.msgtype)
                points = parse_pointcloud2(msg)
            except Exception as exc:  # pragma: no cover - depends on bag contents
                skipped += 1
                if skipped <= 3:
                    print(f"[warn] failed to decode frame: {exc}", file=sys.stderr)
                continue

            if points is None or len(points) == 0:
                skipped += 1
                continue

            if args.range:
                xmin, ymin, zmin, xmax, ymax, zmax = args.range
                mask = (
                    (points[:, 0] >= xmin)
                    & (points[:, 0] <= xmax)
                    & (points[:, 1] >= ymin)
                    & (points[:, 1] <= ymax)
                    & (points[:, 2] >= zmin)
                    & (points[:, 2] <= zmax)
                )
                points = points[mask]

            if len(points) == 0:
                skipped += 1
                continue

            valid_index = valid_frame_count
            valid_frame_count += 1
            if valid_index % frame_step != 0:
                continue

            write_pcd_binary(pcd_dir / f"{frame_count:07d}.pcd", points)
            frame_count += 1
            if frame_count % 100 == 0:
                elapsed = max(time.time() - started, 1e-6)
                print(f"[extract] {frame_count} frames ({frame_count / elapsed:.1f} fps)")

    manifest = {
        "bag_path": str(bag_path),
        "topic": topic,
        "frame_count": frame_count,
        "valid_frame_count": valid_frame_count,
        "frame_step": frame_step,
        "skipped": skipped,
        "created_at_ms": int(time.time() * 1000),
    }
    if frame_count == 0:
        raise SystemExit(
            f"no point-cloud frames were extracted from topic {topic}\n"
            f"skipped messages: {skipped}\n"
            "available topics:\n"
            + "\n".join(f"  {item}" for item in format_connections(connections_meta))
        )
    (meta_dir / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(json.dumps(manifest, indent=2))


def emit_progress(**payload: object) -> None:
    print(f"{PROGRESS_MARKER}{json.dumps(payload, ensure_ascii=False)}", flush=True)


def parse_group_index(group_id: str) -> int:
    suffix = group_id.rsplit("_", 1)[-1]
    try:
        return int(suffix)
    except ValueError:
        return 0


def load_existing_group_collection(output_root: Path) -> tuple[list[dict], dict]:
    metadata = {
        "bag_path": "",
        "topic": "",
        "frame_step": None,
        "group_size": None,
        "valid_frame_count": 0,
        "skipped": 0,
        "next_group_index": 1,
        "next_frame_index": 0,
        "frame_count": 0,
    }

    manifest_path = output_root / "groups_manifest.json"
    if manifest_path.exists():
        try:
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        except Exception as exc:
            raise SystemExit(f"invalid groups manifest: {manifest_path}: {exc}") from exc
        bag_path = str(manifest.get("bag_path") or "").strip()
        if bag_path:
            metadata["bag_path"] = str(Path(bag_path).expanduser().resolve())
        metadata["topic"] = str(manifest.get("topic") or "").strip()
        metadata["frame_step"] = manifest.get("frame_step")
        metadata["group_size"] = manifest.get("group_size")
        metadata["valid_frame_count"] = int(manifest.get("valid_frame_count") or 0)
        metadata["skipped"] = int(manifest.get("skipped") or 0)

    groups: list[dict] = []
    group_dirs = sorted(
        (path for path in output_root.glob("group_*") if path.is_dir() and (path / "pcd").exists()),
        key=lambda path: (parse_group_index(path.name) or 10**9, path.name),
    )
    for group_dir in group_dirs:
        frame_ids = read_frame_ids(group_dir)
        group_index = parse_group_index(group_dir.name)
        if group_index > 0:
            metadata["next_group_index"] = max(int(metadata["next_group_index"]), group_index + 1)
        numeric_frame_ids = [int(frame_id) for frame_id in frame_ids if frame_id.isdigit()]
        if numeric_frame_ids:
            metadata["next_frame_index"] = max(int(metadata["next_frame_index"]), max(numeric_frame_ids) + 1)
        groups.append({
            "group_id": group_dir.name,
            "title": f"第 {group_index} 组" if group_index > 0 else group_dir.name,
            "workspace_path": str(group_dir.resolve()),
            "frame_count": len(frame_ids),
            "start_frame_id": frame_ids[0] if frame_ids else None,
            "end_frame_id": frame_ids[-1] if frame_ids else None,
        })

    metadata["frame_count"] = sum(int(group.get("frame_count", 0)) for group in groups)
    return groups, metadata


def cmd_package_groups(args: argparse.Namespace) -> None:
    bag_path = Path(args.bag).expanduser().resolve()
    output_root = Path(args.output_root).expanduser().resolve()
    frame_step = max(1, int(args.frame_step))
    group_size = max(1, int(args.group_size))
    append_mode = bool(args.append)

    if not bag_path.exists():
        raise SystemExit(f"bag does not exist: {bag_path}")

    existing_groups: list[dict] = []
    existing_meta = {
        "bag_path": "",
        "topic": "",
        "frame_step": None,
        "group_size": None,
        "valid_frame_count": 0,
        "skipped": 0,
        "next_group_index": 1,
        "next_frame_index": 0,
        "frame_count": 0,
    }

    if output_root.exists() and append_mode:
        existing_groups, existing_meta = load_existing_group_collection(output_root)
        existing_bag_path = str(existing_meta.get("bag_path") or "")
        if existing_bag_path and Path(existing_bag_path) != bag_path:
            raise SystemExit(
                "append mode only supports the same bag as the existing package root:\n"
                f"  existing: {existing_bag_path}\n"
                f"  current:  {bag_path}"
            )
        existing_frame_step = existing_meta.get("frame_step")
        if existing_frame_step not in {None, frame_step}:
            raise SystemExit(
                f"append mode requires the same frame-step as the existing package root: "
                f"{existing_frame_step} != {frame_step}"
            )
        existing_group_size = existing_meta.get("group_size")
        if existing_group_size not in {None, group_size}:
            raise SystemExit(
                f"append mode requires the same group-size as the existing package root: "
                f"{existing_group_size} != {group_size}"
            )
    elif output_root.exists():
        for group_dir in output_root.glob("group_*"):
            if group_dir.is_dir():
                shutil.rmtree(group_dir)
        if (output_root / "groups_manifest.json").exists():
            (output_root / "groups_manifest.json").unlink()
    output_root.mkdir(parents=True, exist_ok=True)
    (output_root / "meta").mkdir(parents=True, exist_ok=True)

    try:
        from rosbags.rosbag2 import Reader
        from rosbags.typesys import Stores, get_typestore
    except ImportError as exc:  # pragma: no cover - dependency error path
        raise SystemExit("rosbags is required: pip install rosbags") from exc

    typestore = get_typestore(Stores.ROS2_HUMBLE)
    topic = args.topic.strip()
    connections_meta: list[tuple[str, str]] = []
    if not topic:
        with Reader(bag_path) as reader:
            connections_meta = [(connection.topic, connection.msgtype) for connection in reader.connections]
        topic = auto_detect_topic(connections_meta)
        if not topic:
            raise SystemExit(
                "no point-cloud topic detected; available topics:\n"
                + "\n".join(f"  {item}" for item in format_connections(connections_meta))
            )
    elif not connections_meta:
        with Reader(bag_path) as reader:
            connections_meta = [(connection.topic, connection.msgtype) for connection in reader.connections]

    total_topic_messages = 0
    with Reader(bag_path) as reader:
        for connection, _, _ in reader.messages():
            if connection.topic == topic:
                total_topic_messages += 1

    if total_topic_messages == 0:
        raise SystemExit(
            f"no point-cloud messages found for topic {topic}\n"
            "available topics:\n"
            + "\n".join(f"  {item}" for item in format_connections(connections_meta))
        )

    appended_frame_count = 0
    valid_frame_count = 0
    skipped = 0
    started = time.time()
    processed_topic_messages = 0
    last_progress_emit = 0.0
    groups: list[dict] = [dict(group) for group in existing_groups]
    next_group_index = int(existing_meta["next_group_index"])
    next_frame_index = int(existing_meta["next_frame_index"])
    total_existing_frames = int(existing_meta["frame_count"])

    def maybe_emit_progress(force: bool = False) -> None:
        nonlocal last_progress_emit
        now = time.time()
        should_emit = (
            force
            or processed_topic_messages == total_topic_messages
            or processed_topic_messages == 1
            or processed_topic_messages % 20 == 0
            or now - last_progress_emit >= 0.8
        )
        if not should_emit:
            return
        percent = round(processed_topic_messages * 100 / max(total_topic_messages, 1), 1)
        emit_progress(
            kind="package_groups",
            stage="packaging",
            current=processed_topic_messages,
            total=total_topic_messages,
            percent=percent,
            appended_frames=appended_frame_count,
            output_frames=total_existing_frames + appended_frame_count,
            group_count=len(groups),
            label=f"已处理 {processed_topic_messages}/{total_topic_messages} 条点云消息",
            mode="append" if append_mode else "replace",
        )
        last_progress_emit = now

    emit_progress(
        kind="package_groups",
        stage="starting",
        current=0,
        total=total_topic_messages,
        percent=0,
        appended_frames=0,
        output_frames=total_existing_frames,
        group_count=len(groups),
        label="正在读取 bag",
        mode="append" if append_mode else "replace",
    )

    with Reader(bag_path) as reader:
        for connection, _, rawdata in reader.messages():
            if connection.topic != topic:
                continue
            processed_topic_messages += 1
            try:
                msg = typestore.deserialize_cdr(rawdata, connection.msgtype)
                points = parse_pointcloud2(msg)
            except Exception as exc:  # pragma: no cover - depends on bag contents
                skipped += 1
                if skipped <= 3:
                    print(f"[warn] failed to decode frame: {exc}", file=sys.stderr)
                maybe_emit_progress()
                continue

            if points is None or len(points) == 0:
                skipped += 1
                maybe_emit_progress()
                continue

            if args.range:
                xmin, ymin, zmin, xmax, ymax, zmax = args.range
                mask = (
                    (points[:, 0] >= xmin)
                    & (points[:, 0] <= xmax)
                    & (points[:, 1] >= ymin)
                    & (points[:, 1] <= ymax)
                    & (points[:, 2] >= zmin)
                    & (points[:, 2] <= zmax)
                )
                points = points[mask]

            if len(points) == 0:
                skipped += 1
                maybe_emit_progress()
                continue

            valid_index = valid_frame_count
            valid_frame_count += 1
            if valid_index % frame_step != 0:
                maybe_emit_progress()
                continue

            group_offset = appended_frame_count // group_size
            group_id = f"group_{next_group_index + group_offset:03d}"
            frame_id = f"{next_frame_index + appended_frame_count:07d}"
            if not groups or groups[-1]["group_id"] != group_id:
                workspace_path = output_root / group_id
                ensure_workspace(workspace_path)
                group_info = {
                    "group_id": group_id,
                    "title": f"第 {next_group_index + group_offset} 组",
                    "workspace_path": str(workspace_path),
                    "frame_count": 0,
                    "start_frame_id": frame_id,
                    "end_frame_id": frame_id,
                }
                groups.append(group_info)
            else:
                workspace_path = Path(groups[-1]["workspace_path"])
                group_info = groups[-1]

            write_pcd_binary(workspace_path / "pcd" / f"{frame_id}.pcd", points)
            group_info["frame_count"] += 1
            group_info["end_frame_id"] = frame_id
            appended_frame_count += 1

            if appended_frame_count % 100 == 0:
                elapsed = max(time.time() - started, 1e-6)
                print(f"[package] {appended_frame_count} frames ({appended_frame_count / elapsed:.1f} fps)")

            maybe_emit_progress()

    if appended_frame_count == 0:
        raise SystemExit(
            f"no point-cloud frames were packaged from topic {topic}\n"
            f"skipped messages: {skipped}\n"
            "available topics:\n"
            + "\n".join(f"  {item}" for item in format_connections(connections_meta))
        )

    for group in groups:
        group_meta_path = Path(group["workspace_path"]) / "meta" / "group_manifest.json"
        group_meta_path.write_text(json.dumps(group, indent=2), encoding="utf-8")

    manifest = {
        "type": "workspace_group_collection",
        "output_root": str(output_root),
        "bag_path": str(bag_path),
        "topic": topic,
        "frame_step": frame_step,
        "group_size": group_size,
        "frame_count": int(existing_meta["frame_count"]) + appended_frame_count,
        "valid_frame_count": int(existing_meta["valid_frame_count"]) + valid_frame_count,
        "skipped": int(existing_meta["skipped"]) + skipped,
        "group_count": len(groups),
        "groups": groups,
        "append_mode": append_mode,
        "appended_frame_count": appended_frame_count,
        "created_at_ms": int(time.time() * 1000),
    }
    (output_root / "groups_manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    emit_progress(
        kind="package_groups",
        stage="finished",
        current=total_topic_messages,
        total=total_topic_messages,
        percent=100,
        appended_frames=appended_frame_count,
        output_frames=manifest["frame_count"],
        group_count=len(groups),
        label="分包完成",
        mode="append" if append_mode else "replace",
    )
    print(json.dumps(manifest, indent=2))


def cmd_export_openpcdet(args: argparse.Namespace) -> None:
    workspace = Path(args.workspace).expanduser().resolve()
    output = Path(args.output).expanduser().resolve()
    ensure_workspace(workspace)

    frame_ids = read_frame_ids(workspace)
    if args.frame_list:
        requested = {
            line.strip()
            for line in Path(args.frame_list).expanduser().resolve().read_text(encoding="utf-8").splitlines()
            if line.strip()
        }
        frame_ids = [frame_id for frame_id in frame_ids if frame_id in requested]

    if args.reviewed_only:
        frame_ids = [frame_id for frame_id in frame_ids if load_annotation(workspace, frame_id)["review_status"] == "reviewed"]
    elif args.annotated_only:
        frame_ids = [frame_id for frame_id in frame_ids if load_annotation(workspace, frame_id).get("boxes")]

    if not frame_ids:
        raise SystemExit("no frames matched the export criteria")

    if output.exists():
        shutil.rmtree(output)
    points_dir = output / "points"
    labels_dir = output / "labels"
    imagesets_dir = output / "ImageSets"
    points_dir.mkdir(parents=True, exist_ok=True)
    if not args.points_only:
        labels_dir.mkdir(parents=True, exist_ok=True)
        imagesets_dir.mkdir(parents=True, exist_ok=True)

    exported = []
    for frame_id in frame_ids:
        points = read_pcd_points(workspace / "pcd" / f"{frame_id}.pcd")
        np.save(points_dir / f"{frame_id}.npy", points.astype(np.float32))
        if not args.points_only:
            annotation = load_annotation(workspace, frame_id)
            write_label_file(labels_dir / f"{frame_id}.txt", annotation)
        exported.append(frame_id)

    if not args.points_only:
        train_ids, val_ids = split_train_val(exported)
        (imagesets_dir / "train.txt").write_text("\n".join(train_ids) + ("\n" if train_ids else ""), encoding="utf-8")
        (imagesets_dir / "val.txt").write_text("\n".join(val_ids) + ("\n" if val_ids else ""), encoding="utf-8")
        (imagesets_dir / "all.txt").write_text("\n".join(exported) + "\n", encoding="utf-8")

    summary = {
        "workspace": str(workspace),
        "output": str(output),
        "frame_count": len(exported),
        "points_only": bool(args.points_only),
        "reviewed_only": bool(args.reviewed_only),
        "annotated_only": bool(args.annotated_only),
        "frames": exported,
    }
    (output / "manifest.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps(summary, indent=2))


def ensure_workspace(workspace: Path) -> None:
    for relative in ["pcd", "annotations", "meta", "exports", "models"]:
        (workspace / relative).mkdir(parents=True, exist_ok=True)


def auto_detect_topic(connections: list[tuple[str, str]]) -> str:
    pointcloud_topics = [
        topic
        for topic, msgtype in connections
        if msgtype.endswith("/PointCloud2") or msgtype.endswith("msg/PointCloud2")
    ]
    for topic in HESAI_TOPICS:
        if topic in pointcloud_topics:
            return topic
    for topic in pointcloud_topics:
        lowered = topic.lower()
        if "pandar" in lowered or "lidar" in lowered or "point" in lowered or "cloud" in lowered:
            return topic
    if pointcloud_topics:
        return pointcloud_topics[0]
    for topic, _ in connections:
        lowered = topic.lower()
        if "point" in lowered or "cloud" in lowered or "pandar" in lowered or "lidar" in lowered:
            return topic
    return ""


def format_connections(connections: list[tuple[str, str]]) -> list[str]:
    return [f"{topic} [{msgtype}]" for topic, msgtype in connections]


def parse_pointcloud2(msg) -> np.ndarray | None:
    fields = {field.name: (field.offset, field.datatype) for field in msg.fields}
    num_points = msg.width * msg.height
    if num_points == 0:
        return None

    point_step = msg.point_step
    payload = bytes(msg.data)
    fmt_map = {1: "B", 2: "b", 3: "H", 4: "h", 5: "I", 6: "i", 7: "f", 8: "d"}

    if {"x", "y", "z"}.issubset(fields) and fields["x"] == (0, 7) and fields["y"] == (4, 7) and fields["z"] == (8, 7):
        raw = np.frombuffer(payload, dtype=np.uint8).reshape(num_points, point_step)
        xyz = np.frombuffer(raw[:, 0:12].tobytes(), dtype=np.float32).reshape(-1, 3)
        intensity_name = "intensity" if "intensity" in fields else "reflectivity" if "reflectivity" in fields else None
        if intensity_name and fields[intensity_name][1] == 7:
            offset = fields[intensity_name][0]
            intensity = np.frombuffer(raw[:, offset : offset + 4].tobytes(), dtype=np.float32).reshape(-1, 1)
        else:
            intensity = np.zeros((num_points, 1), dtype=np.float32)
        points = np.hstack([xyz, intensity])
    else:
        points = np.zeros((num_points, 4), dtype=np.float32)
        names = ["x", "y", "z", "intensity"]
        for index in range(num_points):
            base = index * point_step
            for field_index, name in enumerate(names):
                actual_name = name
                if name == "intensity" and name not in fields:
                    actual_name = "reflectivity" if "reflectivity" in fields else None
                if not actual_name or actual_name not in fields:
                    continue
                offset, dtype_id = fields[actual_name]
                points[index, field_index] = struct.unpack_from(fmt_map.get(dtype_id, "f"), payload, base + offset)[0]

    valid = np.isfinite(points).all(axis=1)
    return points[valid].astype(np.float32)


def write_pcd_binary(path: Path, points: np.ndarray) -> None:
    points = np.asarray(points, dtype=np.float32)
    header = "\n".join(
        [
            "# .PCD v0.7 - Point Cloud Data file format",
            "VERSION 0.7",
            "FIELDS x y z intensity",
            "SIZE 4 4 4 4",
            "TYPE F F F F",
            "COUNT 1 1 1 1",
            f"WIDTH {len(points)}",
            "HEIGHT 1",
            "VIEWPOINT 0 0 0 1 0 0 0",
            f"POINTS {len(points)}",
            "DATA binary",
            "",
        ]
    ).encode("ascii")
    with path.open("wb") as handle:
        handle.write(header)
        points.astype(np.float32).tofile(handle)


def read_pcd_points(path: Path) -> np.ndarray:
    payload = path.read_bytes()
    offset, header = parse_pcd_header(payload)
    fields = split_tokens(header, "FIELDS")
    sizes = [int(item) for item in split_tokens(header, "SIZE")]
    types = [item.upper() for item in split_tokens(header, "TYPE")]
    counts = [int(item) for item in split_tokens(header, "COUNT")] if "COUNT" in header else [1] * len(fields)
    point_count = int(header["POINTS"])
    data_mode = header["DATA"].strip().lower()

    intensity_name = "intensity" if "intensity" in {field.lower() for field in fields} else "reflectivity"

    if data_mode == "ascii":
        scalar_count = sum(counts)
        values = np.fromstring(payload[offset:].decode("utf-8", errors="ignore"), sep=" ", dtype=np.float32)
        values = values[: point_count * scalar_count].reshape(point_count, scalar_count)
        offsets = scalar_offsets(fields, counts)
        out = np.zeros((point_count, 4), dtype=np.float32)
        out[:, 0] = values[:, offsets["x"]]
        out[:, 1] = values[:, offsets["y"]]
        out[:, 2] = values[:, offsets["z"]]
        if intensity_name in offsets:
            out[:, 3] = values[:, offsets[intensity_name]]
        return out

    dtype_fields = []
    for field, size, field_type, count in zip(fields, sizes, types, counts):
        base = pcd_numpy_type(field_type, size)
        if count == 1:
            dtype_fields.append((field, base))
        else:
            dtype_fields.append((field, base, (count,)))
    dtype = np.dtype(dtype_fields)
    structured = np.frombuffer(payload, dtype=dtype, count=point_count, offset=offset)
    lowered = {name.lower(): name for name in structured.dtype.names or []}
    out = np.zeros((point_count, 4), dtype=np.float32)
    out[:, 0] = np.asarray(structured[lowered["x"]], dtype=np.float32).reshape(-1)
    out[:, 1] = np.asarray(structured[lowered["y"]], dtype=np.float32).reshape(-1)
    out[:, 2] = np.asarray(structured[lowered["z"]], dtype=np.float32).reshape(-1)
    if intensity_name in lowered:
        out[:, 3] = np.asarray(structured[lowered[intensity_name]], dtype=np.float32).reshape(-1)
    return out


def parse_pcd_header(payload: bytes) -> tuple[int, dict[str, str]]:
    marker_index = payload.find(b"DATA ")
    if marker_index < 0:
        raise ValueError("invalid pcd: missing DATA header")
    header_end = payload.find(b"\n", marker_index)
    if header_end < 0:
        raise ValueError("invalid pcd: unterminated DATA line")
    header_end += 1

    entries: dict[str, str] = {}
    text = payload[:header_end].decode("utf-8", errors="ignore")
    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split()
        if not parts:
            continue
        entries[parts[0].upper()] = " ".join(parts[1:])
    return header_end, entries


def split_tokens(entries: dict[str, str], key: str) -> list[str]:
    return entries[key].split()


def scalar_offsets(fields: list[str], counts: list[int]) -> dict[str, int]:
    offsets: dict[str, int] = {}
    cursor = 0
    for field, count in zip(fields, counts):
        offsets[field.lower()] = cursor
        cursor += count
    return offsets


def pcd_numpy_type(field_type: str, size: int):
    mapping = {
        ("F", 4): np.float32,
        ("F", 8): np.float64,
        ("U", 1): np.uint8,
        ("U", 2): np.uint16,
        ("U", 4): np.uint32,
        ("I", 1): np.int8,
        ("I", 2): np.int16,
        ("I", 4): np.int32,
    }
    try:
        return mapping[(field_type, size)]
    except KeyError as exc:
        raise ValueError(f"unsupported pcd field type {field_type}{size}") from exc


def read_frame_ids(workspace: Path) -> list[str]:
    frame_ids = [path.stem for path in (workspace / "pcd").glob("*.pcd")]
    frame_ids.sort()
    return frame_ids


def load_annotation(workspace: Path, frame_id: str) -> dict:
    path = workspace / "annotations" / f"{frame_id}.json"
    if not path.exists():
        return {
            "frame_id": frame_id,
            "source": "manual",
            "review_status": "unreviewed",
            "boxes": [],
            "updated_at_ms": 0,
        }
    return json.loads(path.read_text(encoding="utf-8"))


def write_label_file(path: Path, annotation: dict) -> None:
    lines = []
    for item in annotation.get("boxes", []):
        center = item["center_xyz"]
        size = item["size_lwh"]
        yaw = item.get("yaw", 0.0)
        class_name = item["class_name"]
        lines.append(
            f"{float(center[0]):.6f} {float(center[1]):.6f} {float(center[2]):.6f} "
            f"{float(size[0]):.6f} {float(size[1]):.6f} {float(size[2]):.6f} "
            f"{float(yaw):.6f} {class_name}"
        )
    path.write_text("\n".join(lines) + ("\n" if lines else ""), encoding="utf-8")


def split_train_val(frame_ids: list[str]) -> tuple[list[str], list[str]]:
    if len(frame_ids) <= 1:
        return frame_ids, frame_ids
    if len(frame_ids) < 5:
        return frame_ids[:-1], frame_ids[-1:]
    val_ids = [frame_id for index, frame_id in enumerate(frame_ids) if index % 5 == 0]
    train_ids = [frame_id for frame_id in frame_ids if frame_id not in set(val_ids)]
    if not train_ids:
        train_ids = frame_ids[:-1]
        val_ids = frame_ids[-1:]
    return train_ids, val_ids


def main() -> None:
    args = parse_args()
    if args.command == "extract-pcd":
        cmd_extract(args)
        return
    if args.command == "package-groups":
        cmd_package_groups(args)
        return
    if args.command == "export-openpcdet":
        cmd_export_openpcdet(args)
        return
    raise SystemExit(f"unsupported command: {args.command}")


if __name__ == "__main__":
    main()
