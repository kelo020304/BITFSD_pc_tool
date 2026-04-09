import type { PointRecord } from "./types";

export interface AutoBoxSuggestion {
  center_xyz: [number, number, number];
  size_lwh: [number, number, number];
  yaw: number;
  point_count: number;
  seed_point: PointRecord;
}

interface CandidatePoint {
  index: number;
  point: PointRecord;
}

export function suggestBoxFromPointCluster(
  points: PointRecord[],
  anchor: [number, number, number],
  defaultSize: [number, number, number],
): AutoBoxSuggestion | null {
  if (!points.length) {
    return null;
  }

  const [priorLength, priorWidth, priorHeight] = defaultSize.map((value) => Math.max(0.2, value)) as [
    number,
    number,
    number,
  ];
  const searchRadiusXY = clamp(Math.max(priorLength, priorWidth) * 3.0, 2.0, 10);
  const searchRadiusZ = clamp(priorHeight * 2.5 + 1.0, 2.0, 8);
  const groundRadius = clamp(Math.max(priorLength, priorWidth) * 3.2, 0.55, 1.25);
  const groundZ = estimateLocalGround(points, anchor[0], anchor[1], groundRadius, anchor[2]);

  const seedPoint = findSeedPoint(
    points,
    anchor,
    groundZ,
    priorLength,
    priorWidth,
    priorHeight,
    searchRadiusXY,
    searchRadiusZ,
  );
  if (!seedPoint) {
    return null;
  }

  const candidates = collectCandidates(points, seedPoint, searchRadiusXY, searchRadiusZ);
  if (!candidates.length) {
    return null;
  }

  const objectCandidates = filterObjectCandidates(
    candidates,
    seedPoint,
    groundZ,
    priorLength,
    priorWidth,
    priorHeight,
  );
  const clusterSource = objectCandidates.length >= 3 ? objectCandidates : candidates;
  const cluster =
    growCluster(clusterSource, seedPoint, defaultSize, clusterSource === objectCandidates ? 0.92 : 1) ??
    growCluster(clusterSource, seedPoint, defaultSize, clusterSource === objectCandidates ? 1.12 : 1.35);
  if (!cluster || cluster.length < 3) {
    return null;
  }

  const refinedCluster = trimClusterToCone(cluster, seedPoint, groundZ, priorLength, priorWidth, priorHeight);
  const workingCluster = refinedCluster.length >= 3 ? refinedCluster : cluster;
  const yaw = estimateYaw(workingCluster);
  const footprint = projectFootprint(workingCluster, yaw);
  const zValues = workingCluster.map((point) => point.z).sort((left, right) => left - right);
  const topZ = percentileSorted(zValues, 0.96);
  const confidence = clamp((workingCluster.length - 4) / 18, 0.24, 1);
  const baseZ = groundZ;

  let rawLength = footprint.maxLongitudinal - footprint.minLongitudinal + 0.18;
  let rawWidth = footprint.maxLateral - footprint.minLateral + 0.14;
  if (rawWidth > rawLength) {
    [rawLength, rawWidth] = [rawWidth, rawLength];
  }

  const size_lwh: [number, number, number] = [
    regularizeSize(rawLength, priorLength, confidence, 0.72, 1.55, 0.14),
    regularizeSize(rawWidth, priorWidth, confidence, 0.72, 1.55, 0.14),
    regularizeSize(topZ - baseZ + 0.08, priorHeight, confidence, 0.78, 1.7, 0.18),
  ];

  const centerLongitudinal = (footprint.minLongitudinal + footprint.maxLongitudinal) * 0.5;
  const centerLateral = (footprint.minLateral + footprint.maxLateral) * 0.5;
  const cosYaw = Math.cos(footprint.yaw);
  const sinYaw = Math.sin(footprint.yaw);
  const centerX =
    footprint.meanX + centerLongitudinal * cosYaw - centerLateral * sinYaw;
  const centerY =
    footprint.meanY + centerLongitudinal * sinYaw + centerLateral * cosYaw;
  const centerZ = baseZ + size_lwh[2] * 0.5;
  const footprintLength = Math.max(1e-4, footprint.maxLongitudinal - footprint.minLongitudinal);
  const footprintWidth = Math.max(1e-4, footprint.maxLateral - footprint.minLateral);
  const aspectRatio = Math.max(footprintLength, footprintWidth) / Math.max(1e-4, Math.min(footprintLength, footprintWidth));

  return {
    center_xyz: [centerX, centerY, centerZ],
    size_lwh,
    yaw: aspectRatio <= 1.28 ? 0 : normalizeYaw(footprint.yaw),
    point_count: workingCluster.length,
    seed_point: seedPoint,
  };
}

function findSeedPoint(
  points: PointRecord[],
  anchor: [number, number, number],
  groundZ: number,
  priorLength: number,
  priorWidth: number,
  priorHeight: number,
  searchRadiusXY: number,
  searchRadiusZ: number,
) {
  const nearby: PointRecord[] = [];
  const hasAnchorZ = Number.isFinite(anchor[2]);
  const candidateRadius = clamp(Math.max(priorLength, priorWidth) * 2.8, 0.45, 0.95);
  const candidateRadius2 = candidateRadius * candidateRadius;

  for (const point of points) {
    const dx = point.x - anchor[0];
    const dy = point.y - anchor[1];
    if (Math.abs(dx) > searchRadiusXY || Math.abs(dy) > searchRadiusXY) {
      continue;
    }
    const dz = point.z - anchor[2];
    if (hasAnchorZ && Math.abs(dz) > searchRadiusZ) {
      continue;
    }
    nearby.push(point);
  }

  let fallbackPoint: PointRecord | null = null;
  let fallbackScore = Number.POSITIVE_INFINITY;
  for (const point of nearby) {
    const dx = point.x - anchor[0];
    const dy = point.y - anchor[1];
    const dxy2 = dx * dx + dy * dy;
    const dz = point.z - anchor[2];
    const score = dxy2 + (hasAnchorZ ? dz * dz * 0.3 : 0);
    if (score < fallbackScore) {
      fallbackScore = score;
      fallbackPoint = point;
    }
  }

  const focused = nearby.filter((point) => {
    const dx = point.x - anchor[0];
    const dy = point.y - anchor[1];
    return dx * dx + dy * dy <= candidateRadius2;
  });
  if (!focused.length) {
    return fallbackPoint;
  }

  const supportRadius = clamp(Math.max(priorLength, priorWidth) * 1.35, 0.18, 0.4);
  const supportRadius2 = supportRadius * supportRadius;
  const minLift = Math.max(priorHeight * 0.12, 0.04);
  let bestPoint: PointRecord | null = null;
  let bestScore = Number.NEGATIVE_INFINITY;

  for (const point of focused) {
    let localMinZ = Number.POSITIVE_INFINITY;
    let localMaxZ = Number.NEGATIVE_INFINITY;
    let localCount = 0;
    let elevatedCount = 0;

    for (const neighbor of focused) {
      const dx = neighbor.x - point.x;
      const dy = neighbor.y - point.y;
      if (dx * dx + dy * dy > supportRadius2) {
        continue;
      }
      localCount += 1;
      localMinZ = Math.min(localMinZ, neighbor.z);
      localMaxZ = Math.max(localMaxZ, neighbor.z);
      if (neighbor.z >= groundZ + minLift) {
        elevatedCount += 1;
      }
    }

    const dx = point.x - anchor[0];
    const dy = point.y - anchor[1];
    const dxy2 = dx * dx + dy * dy;
    const liftFromGround = point.z - groundZ;
    const localLift = point.z - localMinZ;
    const verticalSpan = localMaxZ - localMinZ;
    const score =
      Math.min(liftFromGround, priorHeight * 1.9) * 2.1 +
      Math.min(localLift, priorHeight * 1.5) * 1.4 +
      Math.min(verticalSpan, priorHeight * 1.8) * 1.1 +
      Math.min(elevatedCount, 6) * 0.12 +
      Math.min(localCount, 8) * 0.03 -
      dxy2 * 9.5;

    if (score > bestScore) {
      bestScore = score;
      bestPoint = point;
    }
  }

  return bestPoint && bestScore > -0.2 ? bestPoint : fallbackPoint;
}

function collectCandidates(
  points: PointRecord[],
  seedPoint: PointRecord,
  searchRadiusXY: number,
  searchRadiusZ: number,
) {
  const candidates: CandidatePoint[] = [];
  for (let index = 0; index < points.length; index += 1) {
    const point = points[index];
    if (
      Math.abs(point.x - seedPoint.x) > searchRadiusXY ||
      Math.abs(point.y - seedPoint.y) > searchRadiusXY ||
      Math.abs(point.z - seedPoint.z) > searchRadiusZ
    ) {
      continue;
    }
    candidates.push({ index, point });
  }
  return candidates;
}

function growCluster(
  candidates: CandidatePoint[],
  seedPoint: PointRecord,
  defaultSize: [number, number, number],
  looseness: number,
) {
  const baseStep = clamp(Math.min(defaultSize[0], defaultSize[1]) * 0.7, 0.3, 0.8);
  const verticalStep = clamp(defaultSize[2] * 0.5, 0.25, 0.9);
  const epsXY = baseStep * looseness;
  const epsZ = verticalStep * looseness;
  const epsXY2 = epsXY * epsXY;
  const cells = new Map<string, number[]>();
  const seedKey = cellKey(seedPoint, epsXY, epsZ);
  let seedLocalIndex = -1;

  candidates.forEach((candidate, localIndex) => {
    const key = cellKey(candidate.point, epsXY, epsZ);
    const bucket = cells.get(key);
    if (bucket) {
      bucket.push(localIndex);
    } else {
      cells.set(key, [localIndex]);
    }
    if (seedLocalIndex === -1 && candidate.point === seedPoint) {
      seedLocalIndex = localIndex;
    }
  });

  if (seedLocalIndex < 0) {
    const seedBucket = cells.get(seedKey) ?? [];
    seedLocalIndex = seedBucket[0] ?? -1;
  }
  if (seedLocalIndex < 0) {
    return null;
  }

  const visited = new Uint8Array(candidates.length);
  const queue = [seedLocalIndex];
  visited[seedLocalIndex] = 1;
  const cluster: PointRecord[] = [];

  while (queue.length > 0) {
    const localIndex = queue.pop()!;
    const current = candidates[localIndex].point;
    cluster.push(current);

    const [cellX, cellY, cellZ] = cellCoords(current, epsXY, epsZ);
    for (let dx = -1; dx <= 1; dx += 1) {
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dz = -1; dz <= 1; dz += 1) {
          const bucket = cells.get(`${cellX + dx}:${cellY + dy}:${cellZ + dz}`);
          if (!bucket) {
            continue;
          }
          for (const neighborIndex of bucket) {
            if (visited[neighborIndex]) {
              continue;
            }
            const neighbor = candidates[neighborIndex].point;
            const deltaX = neighbor.x - current.x;
            const deltaY = neighbor.y - current.y;
            if (deltaX * deltaX + deltaY * deltaY > epsXY2) {
              continue;
            }
            if (Math.abs(neighbor.z - current.z) > epsZ) {
              continue;
            }
            visited[neighborIndex] = 1;
            queue.push(neighborIndex);
          }
        }
      }
    }
  }

  return cluster;
}

function filterObjectCandidates(
  candidates: CandidatePoint[],
  seedPoint: PointRecord,
  groundZ: number,
  priorLength: number,
  priorWidth: number,
  priorHeight: number,
) {
  const supportRadius = clamp(Math.max(priorLength, priorWidth) * 1.6, 0.2, 0.42);
  const supportRadius2 = supportRadius * supportRadius;
  const keepRadius = clamp(Math.max(priorLength, priorWidth) * 2.1, 0.28, 0.58);
  const keepRadius2 = keepRadius * keepRadius;
  const closeRadius = clamp(Math.max(priorLength, priorWidth) * 1.25, 0.16, 0.3);
  const closeRadius2 = closeRadius * closeRadius;
  const minLift = Math.max(priorHeight * 0.08, 0.035);
  const filtered: CandidatePoint[] = [];

  for (const candidate of candidates) {
    const dxSeed = candidate.point.x - seedPoint.x;
    const dySeed = candidate.point.y - seedPoint.y;
    const dxySeed2 = dxSeed * dxSeed + dySeed * dySeed;
    if (dxySeed2 > keepRadius2) {
      continue;
    }

    const liftFromGround = candidate.point.z - groundZ;
    const requiredLift = dxySeed2 <= closeRadius2 ? -0.02 : minLift;
    if (liftFromGround < requiredLift) {
      continue;
    }

    let localMinZ = Number.POSITIVE_INFINITY;
    let localMaxZ = Number.NEGATIVE_INFINITY;
    let localCount = 0;
    for (const neighbor of candidates) {
      const dx = neighbor.point.x - candidate.point.x;
      const dy = neighbor.point.y - candidate.point.y;
      if (dx * dx + dy * dy > supportRadius2) {
        continue;
      }
      localCount += 1;
      localMinZ = Math.min(localMinZ, neighbor.point.z);
      localMaxZ = Math.max(localMaxZ, neighbor.point.z);
    }

    const localSpan = localMaxZ - localMinZ;
    if (localCount < 2 && liftFromGround < minLift) {
      continue;
    }
    if (localSpan < Math.max(priorHeight * 0.18, 0.06) && liftFromGround < Math.max(priorHeight * 0.22, 0.06)) {
      continue;
    }
    filtered.push(candidate);
  }

  return filtered;
}

function trimClusterToCone(
  cluster: PointRecord[],
  seedPoint: PointRecord,
  groundZ: number,
  priorLength: number,
  priorWidth: number,
  priorHeight: number,
) {
  const radius = clamp(Math.max(priorLength, priorWidth) * 1.9, 0.24, 0.55);
  const radius2 = radius * radius;
  const minLift = Math.max(priorHeight * 0.04, 0.015);
  const trimmed = cluster.filter((point) => {
    const dx = point.x - seedPoint.x;
    const dy = point.y - seedPoint.y;
    return dx * dx + dy * dy <= radius2 && point.z >= groundZ - minLift;
  });
  return trimmed.length >= 3 ? trimmed : cluster;
}

function estimateYaw(cluster: PointRecord[]) {
  if (cluster.length < 2) {
    return 0;
  }

  let meanX = 0;
  let meanY = 0;
  for (const point of cluster) {
    meanX += point.x;
    meanY += point.y;
  }
  meanX /= cluster.length;
  meanY /= cluster.length;

  let covXX = 0;
  let covXY = 0;
  let covYY = 0;
  for (const point of cluster) {
    const dx = point.x - meanX;
    const dy = point.y - meanY;
    covXX += dx * dx;
    covXY += dx * dy;
    covYY += dy * dy;
  }

  const spread = covXX + covYY;
  if (spread < 1e-6) {
    return 0;
  }
  const anisotropy =
    Math.hypot(covXX - covYY, 2 * covXY) / Math.max(spread, 1e-6);
  if (anisotropy < 0.08) {
    return 0;
  }
  return 0.5 * Math.atan2(2 * covXY, covXX - covYY);
}

function projectFootprint(cluster: PointRecord[], yaw: number) {
  const cosYaw = Math.cos(yaw);
  const sinYaw = Math.sin(yaw);
  let meanX = 0;
  let meanY = 0;
  for (const point of cluster) {
    meanX += point.x;
    meanY += point.y;
  }
  meanX /= cluster.length;
  meanY /= cluster.length;

  const longitudinal: number[] = [];
  const lateral: number[] = [];
  for (const point of cluster) {
    const dx = point.x - meanX;
    const dy = point.y - meanY;
    longitudinal.push(dx * cosYaw + dy * sinYaw);
    lateral.push(-dx * sinYaw + dy * cosYaw);
  }
  longitudinal.sort((left, right) => left - right);
  lateral.sort((left, right) => left - right);

  let alignedYaw = yaw;
  let minLongitudinal = percentileSorted(longitudinal, 0.04);
  let maxLongitudinal = percentileSorted(longitudinal, 0.96);
  let minLateral = percentileSorted(lateral, 0.05);
  let maxLateral = percentileSorted(lateral, 0.95);

  if (maxLateral - minLateral > maxLongitudinal - minLongitudinal) {
    const previousMinLongitudinal = minLongitudinal;
    const previousMaxLongitudinal = maxLongitudinal;
    const previousMinLateral = minLateral;
    const previousMaxLateral = maxLateral;
    alignedYaw = normalizeYaw(yaw + Math.PI * 0.5);
    minLongitudinal = previousMinLateral;
    maxLongitudinal = previousMaxLateral;
    minLateral = -previousMaxLongitudinal;
    maxLateral = -previousMinLongitudinal;
  }

  return {
    yaw: alignedYaw,
    meanX,
    meanY,
    minLongitudinal,
    maxLongitudinal,
    minLateral,
    maxLateral,
  };
}

function regularizeSize(
  measured: number,
  prior: number,
  confidence: number,
  minScale: number,
  maxScale: number,
  minAbsolute: number,
) {
  const blended = prior * (1 - confidence) + measured * confidence;
  const minValue = Math.max(minAbsolute, prior * minScale);
  const maxValue = Math.max(minValue + 0.02, prior * maxScale);
  return clamp(blended, minValue, maxValue);
}

function percentileSorted(values: number[], ratio: number) {
  if (!values.length) {
    return 0;
  }
  const clampedRatio = clamp(ratio, 0, 1);
  const position = (values.length - 1) * clampedRatio;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  if (lower === upper) {
    return values[lower];
  }
  const mix = position - lower;
  return values[lower] * (1 - mix) + values[upper] * mix;
}

function estimateLocalGround(
  points: PointRecord[],
  x: number,
  y: number,
  radius: number,
  fallbackZ: number,
) {
  const radius2 = radius * radius;
  const zValues: number[] = [];
  for (const point of points) {
    const dx = point.x - x;
    const dy = point.y - y;
    if (dx * dx + dy * dy <= radius2) {
      zValues.push(point.z);
    }
  }
  if (!zValues.length) {
    return Number.isFinite(fallbackZ) ? fallbackZ : 0;
  }
  zValues.sort((left, right) => left - right);
  return percentileSorted(zValues, 0.16);
}

function cellKey(point: PointRecord, epsXY: number, epsZ: number) {
  const [x, y, z] = cellCoords(point, epsXY, epsZ);
  return `${x}:${y}:${z}`;
}

function cellCoords(point: PointRecord, epsXY: number, epsZ: number) {
  return [
    Math.floor(point.x / epsXY),
    Math.floor(point.y / epsXY),
    Math.floor(point.z / epsZ),
  ] as const;
}

function normalizeYaw(value: number) {
  let next = value;
  while (next > Math.PI) {
    next -= Math.PI * 2;
  }
  while (next <= -Math.PI) {
    next += Math.PI * 2;
  }
  return next;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
