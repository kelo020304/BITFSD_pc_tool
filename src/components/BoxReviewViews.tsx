import { useEffect, useMemo, useRef } from "react";
import type { AnnotationBox, PointRecord } from "../types";

interface BoxReviewViewsProps {
  box: AnnotationBox;
  points: PointRecord[];
}

type AxisKey = "x" | "y" | "z";

interface LocalPoint {
  x: number;
  y: number;
  z: number;
  inside: boolean;
}

interface ProjectionSpec {
  id: string;
  title: string;
  subtitle: string;
  xAxis: AxisKey;
  yAxis: AxisKey;
}

interface BoxPreviewData {
  nearbyCount: number;
  insideCount: number;
  sampledPoints: LocalPoint[];
  halfExtents: {
    x: number;
    y: number;
    z: number;
  };
  drawExtents: {
    x: number;
    y: number;
    z: number;
  };
}

const MAX_DRAW_POINTS = 20000;
const CANVAS_HEIGHT = 180;

const PROJECTIONS: ProjectionSpec[] = [
  {
    id: "top",
    title: "Top / 俯视",
    subtitle: "X vs Y",
    xAxis: "y",
    yAxis: "x",
  },
  {
    id: "front",
    title: "Front / 前视",
    subtitle: "Y vs Z",
    xAxis: "y",
    yAxis: "z",
  },
  {
    id: "side",
    title: "Side / 侧视",
    subtitle: "X vs Z",
    xAxis: "x",
    yAxis: "z",
  },
];

export function BoxReviewViews({ box, points }: BoxReviewViewsProps) {
  const preview = useMemo(() => buildPreview(box, points), [box, points]);

  return (
    <div className="box-review">
      <div className="section-title">Local Check</div>
      <div className="box-review__summary">
        <span className="box-review__chip">Nearby {preview.nearbyCount}</span>
        <span className="box-review__chip box-review__chip--good">Inside {preview.insideCount}</span>
        <span className="box-review__chip box-review__chip--warn">
          Spill {Math.max(0, preview.nearbyCount - preview.insideCount)}
        </span>
      </div>
      <div className="box-review__summary box-review__summary--secondary">
        <span>
          L {box.size_lwh[0].toFixed(2)} / W {box.size_lwh[1].toFixed(2)} / H {box.size_lwh[2].toFixed(2)}
        </span>
        <span>Yaw {box.yaw.toFixed(2)}</span>
      </div>
      <div className="box-review__grid">
        {PROJECTIONS.map((projection) => (
        <ProjectionCanvas
            key={projection.id}
            preview={preview}
            projection={projection}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectionCanvas({
  preview,
  projection,
}: {
  preview: BoxPreviewData;
  projection: ProjectionSpec;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const width = canvas.clientWidth || 280;
    const height = CANVAS_HEIGHT;
    const dpr = window.devicePixelRatio || 1;
    const pixelWidth = Math.floor(width * dpr);
    const pixelHeight = Math.floor(height * dpr);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);

      drawProjection(context, width, height, preview, projection);
  }, [preview, projection]);

  return (
    <section className="projection-card">
      <div className="projection-card__header">
        <strong>{projection.title}</strong>
        <span>{projection.subtitle}</span>
      </div>
      <canvas className="projection-card__canvas" ref={canvasRef} />
      <div className="projection-card__legend">
        <span className="projection-card__legend-item">
          <i className="projection-card__dot projection-card__dot--inside" />
          inside
        </span>
        <span className="projection-card__legend-item">
          <i className="projection-card__dot projection-card__dot--spill" />
          outside
        </span>
        <span className="projection-card__legend-item">
          <i className="projection-card__line" />
          box
        </span>
      </div>
    </section>
  );
}

function buildPreview(box: AnnotationBox, points: PointRecord[]): BoxPreviewData {
  if (
    !Number.isFinite(box.center_xyz[0]) ||
    !Number.isFinite(box.center_xyz[1]) ||
    !Number.isFinite(box.center_xyz[2]) ||
    !Number.isFinite(box.size_lwh[0]) ||
    !Number.isFinite(box.size_lwh[1]) ||
    !Number.isFinite(box.size_lwh[2]) ||
    box.size_lwh[0] <= 0 ||
    box.size_lwh[1] <= 0 ||
    box.size_lwh[2] <= 0
  ) {
    return {
      nearbyCount: 0,
      insideCount: 0,
      sampledPoints: [],
      halfExtents: { x: 0.1, y: 0.1, z: 0.1 },
      drawExtents: { x: 0.3, y: 0.3, z: 0.3 },
    };
  }
  const halfExtents = {
    x: box.size_lwh[0] * 0.5,
    y: box.size_lwh[1] * 0.5,
    z: box.size_lwh[2] * 0.5,
  };
  const margin = {
    x: Math.max(0.2, box.size_lwh[0] * 0.3),
    y: Math.max(0.2, box.size_lwh[1] * 0.45),
    z: Math.max(0.12, box.size_lwh[2] * 0.45),
  };

  const localPoints: LocalPoint[] = [];
  let nearbyCount = 0;
  let insideCount = 0;
  let maxAbsX = halfExtents.x + margin.x;
  let maxAbsY = halfExtents.y + margin.y;
  let maxAbsZ = halfExtents.z + margin.z;

  for (const point of points) {
    const local = toLocal(box, point);
    const nearby =
      Math.abs(local.x) <= halfExtents.x + margin.x &&
      Math.abs(local.y) <= halfExtents.y + margin.y &&
      Math.abs(local.z) <= halfExtents.z + margin.z;
    if (!nearby) {
      continue;
    }

    const inside =
      Math.abs(local.x) <= halfExtents.x &&
      Math.abs(local.y) <= halfExtents.y &&
      Math.abs(local.z) <= halfExtents.z;

    nearbyCount += 1;
    if (inside) {
      insideCount += 1;
    }

    localPoints.push({ ...local, inside });
    maxAbsX = Math.max(maxAbsX, Math.abs(local.x));
    maxAbsY = Math.max(maxAbsY, Math.abs(local.y));
    maxAbsZ = Math.max(maxAbsZ, Math.abs(local.z));
  }

  const stride = Math.max(1, Math.ceil(localPoints.length / MAX_DRAW_POINTS));
  const sampledPoints = localPoints.filter((_, index) => index % stride === 0);

  return {
    nearbyCount,
    insideCount,
    sampledPoints,
    halfExtents,
    drawExtents: {
      x: maxAbsX * 1.08,
      y: maxAbsY * 1.08,
      z: maxAbsZ * 1.08,
    },
  };
}

function drawProjection(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  preview: BoxPreviewData,
  projection: ProjectionSpec,
) {
  context.fillStyle = "#09101c";
  context.fillRect(0, 0, width, height);

  drawGrid(context, width, height);

  const xExtent = axisExtent(preview.drawExtents, projection.xAxis);
  const yExtent = axisExtent(preview.drawExtents, projection.yAxis);
  const boxHalfWidth = axisExtent(preview.halfExtents, projection.xAxis);
  const boxHalfHeight = axisExtent(preview.halfExtents, projection.yAxis);

  for (const point of preview.sampledPoints) {
    const screen = projectPoint(point, projection, width, height, xExtent, yExtent);
    const radius = preview.nearbyCount <= 24 ? 3.1 : preview.nearbyCount <= 80 ? 2.4 : 1.8;
    context.fillStyle = point.inside ? "rgba(79, 230, 255, 0.92)" : "rgba(255, 126, 146, 0.9)";
    context.beginPath();
    context.arc(screen[0], screen[1], point.inside ? radius : radius + 0.2, 0, Math.PI * 2);
    context.fill();
  }

  const rectMin = projectVector(-boxHalfWidth, -boxHalfHeight, width, height, xExtent, yExtent);
  const rectMax = projectVector(boxHalfWidth, boxHalfHeight, width, height, xExtent, yExtent);
  const rectX = Math.min(rectMin[0], rectMax[0]);
  const rectY = Math.min(rectMin[1], rectMax[1]);
  const rectWidth = Math.abs(rectMax[0] - rectMin[0]);
  const rectHeight = Math.abs(rectMax[1] - rectMin[1]);

  context.fillStyle = "rgba(28, 185, 255, 0.08)";
  context.fillRect(rectX, rectY, rectWidth, rectHeight);
  context.strokeStyle = "#8ae4ff";
  context.lineWidth = 1.5;
  context.strokeRect(rectX, rectY, rectWidth, rectHeight);

  context.strokeStyle = "rgba(255, 255, 255, 0.18)";
  context.lineWidth = 1;
  const origin = projectVector(0, 0, width, height, xExtent, yExtent);
  context.beginPath();
  context.moveTo(origin[0], 10);
  context.lineTo(origin[0], height - 10);
  context.moveTo(10, origin[1]);
  context.lineTo(width - 10, origin[1]);
  context.stroke();

  context.fillStyle = "#9bb6e8";
  context.font = "11px 'IBM Plex Sans', 'Segoe UI', sans-serif";
  context.fillText(axisLabel(projection.xAxis), width - 22, height - 10);
  context.fillText(axisLabel(projection.yAxis), 10, 16);

  if (preview.nearbyCount === 0) {
    context.fillStyle = "#8ea4d4";
    context.font = "12px 'IBM Plex Sans', 'Segoe UI', sans-serif";
    context.fillText("No nearby points", 14, 26);
  } else {
    context.fillStyle = "#8ea4d4";
    context.font = "11px 'IBM Plex Sans', 'Segoe UI', sans-serif";
    context.fillText(
      `${preview.insideCount}/${preview.nearbyCount} in box`,
      12,
      height - 12,
    );
  }

  const centerMarker = projectPoint(
    { x: 0, y: 0, z: 0, inside: true },
    projection,
    width,
    height,
    xExtent,
    yExtent,
  );
  context.fillStyle = "#ffffff";
  context.beginPath();
  context.arc(centerMarker[0], centerMarker[1], 2.2, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = "rgba(130, 215, 255, 0.85)";
  context.lineWidth = 1.2;
  if (projection.id === "top") {
    const heading = projectVector(boxHalfWidth, 0, width, height, xExtent, yExtent);
    context.beginPath();
    context.moveTo(centerMarker[0], centerMarker[1]);
    context.lineTo(heading[0], heading[1]);
    context.stroke();
  }
}

function drawGrid(context: CanvasRenderingContext2D, width: number, height: number) {
  context.strokeStyle = "rgba(255, 255, 255, 0.06)";
  context.lineWidth = 1;
  for (let step = 1; step < 4; step += 1) {
    const y = (height / 4) * step;
    const x = (width / 4) * step;
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
}

function toLocal(box: AnnotationBox, point: PointRecord): Omit<LocalPoint, "inside"> {
  const dx = point.x - box.center_xyz[0];
  const dy = point.y - box.center_xyz[1];
  const cos = Math.cos(box.yaw);
  const sin = Math.sin(box.yaw);

  return {
    x: dx * cos + dy * sin,
    y: -dx * sin + dy * cos,
    z: point.z - box.center_xyz[2],
  };
}

function projectPoint(
  point: LocalPoint,
  projection: ProjectionSpec,
  width: number,
  height: number,
  xExtent: number,
  yExtent: number,
): [number, number] {
  const x = axisValue(point, projection.xAxis);
  const y = axisValue(point, projection.yAxis);
  return projectVector(x, y, width, height, xExtent, yExtent);
}

function projectVector(
  x: number,
  y: number,
  width: number,
  height: number,
  xExtent: number,
  yExtent: number,
): [number, number] {
  const safeX = Math.max(0.1, xExtent);
  const safeY = Math.max(0.1, yExtent);
  const paddingX = 14;
  const paddingY = 14;
  const drawableWidth = width - paddingX * 2;
  const drawableHeight = height - paddingY * 2;

  return [
    paddingX + ((x + safeX) / (safeX * 2)) * drawableWidth,
    height - paddingY - ((y + safeY) / (safeY * 2)) * drawableHeight,
  ];
}

function axisValue(point: Omit<LocalPoint, "inside">, axis: AxisKey) {
  if (axis === "x") {
    return point.x;
  }
  if (axis === "y") {
    return point.y;
  }
  return point.z;
}

function axisExtent(extents: { x: number; y: number; z: number }, axis: AxisKey) {
  if (axis === "x") {
    return extents.x;
  }
  if (axis === "y") {
    return extents.y;
  }
  return extents.z;
}

function axisLabel(axis: AxisKey) {
  if (axis === "x") {
    return "X";
  }
  if (axis === "y") {
    return "Y";
  }
  return "Z";
}
