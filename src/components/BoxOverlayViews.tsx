import { useEffect, useMemo, useRef } from "react";
import type { AnnotationBox, PointRecord } from "../types";

interface BoxOverlayViewsProps {
  box: AnnotationBox;
  points: PointRecord[];
}

type AxisKey = "x" | "y" | "z";

interface LocalPoint {
  x: number;
  y: number;
  z: number;
  inside: boolean;
  normZ: number;
  intensity: number;
}

interface ProjectionSpec {
  id: string;
  label: string;
  xAxis: AxisKey;
  yAxis: AxisKey;
}

const PROJECTIONS: ProjectionSpec[] = [
  { id: "top", label: "俯视", xAxis: "y", yAxis: "x" },
  { id: "front", label: "前视", xAxis: "y", yAxis: "z" },
  { id: "side", label: "侧视", xAxis: "x", yAxis: "z" },
];

const PANEL_W = 160;
const PANEL_H = 140;

export function BoxOverlayViews({ box, points }: BoxOverlayViewsProps) {
  const preview = useMemo(() => buildPreview(box, points), [box, points]);

  return (
    <div className="box-overlay">
      <div className="box-overlay__stats">
        <span className="box-overlay__tag">{box.class_name}</span>
        <span className="box-overlay__tag box-overlay__tag--dim">
          {preview.insideCount}/{preview.nearbyCount} pts
        </span>
        <span className="box-overlay__tag box-overlay__tag--dim">
          {box.size_lwh[0].toFixed(2)}×{box.size_lwh[1].toFixed(2)}×{box.size_lwh[2].toFixed(2)}
        </span>
      </div>
      <div className="box-overlay__views">
        {PROJECTIONS.map((proj) => (
          <OverlayCanvas key={proj.id} preview={preview} projection={proj} />
        ))}
      </div>
    </div>
  );
}

function OverlayCanvas({
  preview,
  projection,
}: {
  preview: PreviewData;
  projection: ProjectionSpec;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pw = Math.floor(PANEL_W * dpr);
    const ph = Math.floor(PANEL_H * dpr);
    if (canvas.width !== pw || canvas.height !== ph) {
      canvas.width = pw;
      canvas.height = ph;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(ctx, PANEL_W, PANEL_H, preview, projection);
  }, [preview, projection]);

  return (
    <div className="box-overlay__card">
      <canvas
        ref={canvasRef}
        style={{ width: PANEL_W, height: PANEL_H }}
      />
      <span className="box-overlay__label">{projection.label}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface PreviewData {
  nearbyCount: number;
  insideCount: number;
  points: LocalPoint[];
  halfExtents: { x: number; y: number; z: number };
  drawExtents: { x: number; y: number; z: number };
}

function buildPreview(box: AnnotationBox, allPoints: PointRecord[]): PreviewData {
  if (
    !Number.isFinite(box.center_xyz[0]) ||
    box.size_lwh[0] <= 0 || box.size_lwh[1] <= 0 || box.size_lwh[2] <= 0
  ) {
    return {
      nearbyCount: 0, insideCount: 0, points: [],
      halfExtents: { x: 0.1, y: 0.1, z: 0.1 },
      drawExtents: { x: 0.3, y: 0.3, z: 0.3 },
    };
  }

  const he = {
    x: box.size_lwh[0] * 0.5,
    y: box.size_lwh[1] * 0.5,
    z: box.size_lwh[2] * 0.5,
  };
  const margin = {
    x: Math.max(0.25, box.size_lwh[0] * 0.4),
    y: Math.max(0.25, box.size_lwh[1] * 0.5),
    z: Math.max(0.15, box.size_lwh[2] * 0.5),
  };

  const cosY = Math.cos(box.yaw);
  const sinY = Math.sin(box.yaw);
  const cx = box.center_xyz[0];
  const cy = box.center_xyz[1];
  const cz = box.center_xyz[2];

  const localPts: LocalPoint[] = [];
  let nearby = 0;
  let inside = 0;
  let zMin = Infinity;
  let zMax = -Infinity;

  for (const p of allPoints) {
    const dx = p.x - cx;
    const dy = p.y - cy;
    const lx = dx * cosY + dy * sinY;
    const ly = -dx * sinY + dy * cosY;
    const lz = p.z - cz;

    if (Math.abs(lx) > he.x + margin.x ||
        Math.abs(ly) > he.y + margin.y ||
        Math.abs(lz) > he.z + margin.z) continue;

    const isInside = Math.abs(lx) <= he.x && Math.abs(ly) <= he.y && Math.abs(lz) <= he.z;
    nearby++;
    if (isInside) inside++;
    zMin = Math.min(zMin, lz);
    zMax = Math.max(zMax, lz);
    localPts.push({ x: lx, y: ly, z: lz, inside: isInside, normZ: 0, intensity: p.intensity });
  }

  const zRange = Math.max(1e-4, zMax - zMin);
  for (const lp of localPts) {
    lp.normZ = clamp((lp.z - zMin) / zRange, 0, 1);
  }

  const stride = Math.max(1, Math.ceil(localPts.length / 12000));
  const sampled = stride === 1 ? localPts : localPts.filter((_, i) => i % stride === 0);

  return {
    nearbyCount: nearby,
    insideCount: inside,
    points: sampled,
    halfExtents: he,
    drawExtents: {
      x: (he.x + margin.x) * 1.05,
      y: (he.y + margin.y) * 1.05,
      z: (he.z + margin.z) * 1.05,
    },
  };
}

// ---------------------------------------------------------------------------
// Drawing
// ---------------------------------------------------------------------------

function draw(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  data: PreviewData,
  proj: ProjectionSpec,
) {
  ctx.fillStyle = "rgba(6, 10, 18, 0.88)";
  ctx.fillRect(0, 0, w, h);

  const xExt = axExt(data.drawExtents, proj.xAxis);
  const yExt = axExt(data.drawExtents, proj.yAxis);
  const bHalfW = axExt(data.halfExtents, proj.xAxis);
  const bHalfH = axExt(data.halfExtents, proj.yAxis);

  // box rect
  const rMin = proj2(- bHalfW, -bHalfH, w, h, xExt, yExt);
  const rMax = proj2(bHalfW, bHalfH, w, h, xExt, yExt);
  const rx = Math.min(rMin[0], rMax[0]);
  const ry = Math.min(rMin[1], rMax[1]);
  const rw = Math.abs(rMax[0] - rMin[0]);
  const rh = Math.abs(rMax[1] - rMin[1]);
  ctx.fillStyle = "rgba(28, 185, 255, 0.06)";
  ctx.fillRect(rx, ry, rw, rh);
  ctx.strokeStyle = "rgba(138, 228, 255, 0.5)";
  ctx.lineWidth = 1;
  ctx.strokeRect(rx, ry, rw, rh);

  // points - use same colorize as main view
  for (const p of data.points) {
    const sx = axVal(p, proj.xAxis);
    const sy = axVal(p, proj.yAxis);
    const [px, py] = proj2(sx, sy, w, h, xExt, yExt);
    const r = data.nearbyCount <= 30 ? 2.5 : data.nearbyCount <= 100 ? 2.0 : 1.5;
    if (p.inside) {
      const [cr, cg, cb] = samplePalette(p.normZ);
      const boost = 0.6 + clamp(p.intensity / 255, 0.25, 1) * 0.4;
      ctx.fillStyle = `rgb(${(cr * boost * 255) | 0}, ${(cg * boost * 255) | 0}, ${(cb * boost * 255) | 0})`;
    } else {
      ctx.fillStyle = "rgba(255, 100, 120, 0.7)";
    }
    ctx.fillRect(px - r * 0.5, py - r * 0.5, r, r);
  }

  // axis labels
  ctx.fillStyle = "rgba(180, 200, 240, 0.6)";
  ctx.font = "9px monospace";
  ctx.fillText(axLabel(proj.xAxis), w - 12, h - 4);
  ctx.fillText(axLabel(proj.yAxis), 3, 10);
}

function proj2(x: number, y: number, w: number, h: number, xExt: number, yExt: number): [number, number] {
  const pad = 8;
  const dw = w - pad * 2;
  const dh = h - pad * 2;
  return [
    pad + ((x + Math.max(0.1, xExt)) / (Math.max(0.1, xExt) * 2)) * dw,
    h - pad - ((y + Math.max(0.1, yExt)) / (Math.max(0.1, yExt) * 2)) * dh,
  ];
}

function axVal(p: { x: number; y: number; z: number }, a: AxisKey) {
  return a === "x" ? p.x : a === "y" ? p.y : p.z;
}
function axExt(e: { x: number; y: number; z: number }, a: AxisKey) {
  return a === "x" ? e.x : a === "y" ? e.y : e.z;
}
function axLabel(a: AxisKey) {
  return a.toUpperCase();
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function samplePalette(t: number) {
  const palette: Array<[number, number, number]> = [
    [0.062, 0.046, 0.122],
    [0.251, 0.072, 0.349],
    [0.533, 0.103, 0.445],
    [0.812, 0.251, 0.443],
    [0.953, 0.553, 0.349],
    [0.988, 0.886, 0.643],
  ];
  const scaled = t * (palette.length - 1);
  const left = Math.floor(scaled);
  const right = Math.min(palette.length - 1, left + 1);
  const mix = scaled - left;
  return [
    palette[left][0] * (1 - mix) + palette[right][0] * mix,
    palette[left][1] * (1 - mix) + palette[right][1] * mix,
    palette[left][2] * (1 - mix) + palette[right][2] * mix,
  ] as const;
}
