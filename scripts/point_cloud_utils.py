#!/usr/bin/env python3
"""Shared point cloud cleanup helpers."""

from __future__ import annotations

import numpy as np

INVALID_X_SENTINEL = -0.46
INVALID_TOLERANCE = 1e-6


def invalid_point_mask(points: np.ndarray) -> np.ndarray:
    array = np.asarray(points)
    if array.ndim != 2 or array.shape[1] < 3:
        return np.zeros(0 if array.ndim == 0 else len(array), dtype=bool)

    mask = (
        np.isclose(array[:, 0], INVALID_X_SENTINEL, atol=INVALID_TOLERANCE)
        & np.isclose(array[:, 1], 0.0, atol=INVALID_TOLERANCE)
        & np.isclose(array[:, 2], 0.0, atol=INVALID_TOLERANCE)
    )
    if array.shape[1] >= 4:
        mask &= np.isclose(array[:, 3], 0.0, atol=INVALID_TOLERANCE)
    return mask


def sanitize_points(points: np.ndarray) -> np.ndarray:
    array = np.asarray(points, dtype=np.float32)
    if array.ndim != 2 or array.shape[1] < 3:
        return array.astype(np.float32, copy=False)

    valid_mask = np.isfinite(array).all(axis=1)
    if valid_mask.any():
        array = array[valid_mask]
    else:
        return np.zeros((0, array.shape[1]), dtype=np.float32)

    sentinel_mask = invalid_point_mask(array)
    if sentinel_mask.any():
        array = array[~sentinel_mask]

    return array.astype(np.float32, copy=False)
