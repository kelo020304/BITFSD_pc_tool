import {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { AnnotationBox, ClassDefinition, PointRecord } from "../types";

interface BevCanvasProps {
  points: PointRecord[];
  boxes: AnnotationBox[];
  classes: ClassDefinition[];
  selectedIds: string[];
  activeClass?: ClassDefinition;
  onSelect: (boxIds: string[]) => void;
  onMoveSelected: (dx: number, dy: number) => void;
  onRotateSelected: (deltaYaw: number) => void;
  onCreateBox: (center: [number, number, number]) => void;
  onHoverWorldChange?: (point: [number, number, number] | null) => void;
}

interface BevViewState {
  centerX: number;
  centerY: number;
  scale: number;
}

interface PointerDragState {
  kind: "pan" | "box";
  startClientX: number;
  startClientY: number;
  lastClientX: number;
  lastClientY: number;
  moved: boolean;
  hitBoxId: string | null;
}

const MAX_RENDER_POINTS = 60000;
const MIN_SCALE = 4;
const MAX_SCALE = 120;
const VIEW_PADDING_PX = 28;

function BevCanvasInner({
  points,
  boxes,
  classes,
  selectedIds,
  activeClass,
  onSelect,
  onMoveSelected,
  onRotateSelected,
  onCreateBox,
  onHoverWorldChange,
}: BevCanvasProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragRef = useRef<PointerDragState | null>(null);
  const dragPointerIdRef = useRef<number | null>(null);
  const viewRef = useRef<BevViewState>({ centerX: 0, centerY: 0, scale: 10 });
  const hoverRef = useRef<[number, number, number] | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const classMap = useMemo(() => new Map(classes.map((item) => [item.name, item])), [classes]);
  const sampledPoints = useMemo(() => samplePoints(points, MAX_RENDER_POINTS), [points]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      setSize({
        width: Math.max(1, Math.floor(entry.contentRect.width)),
        height: Math.max(1, Math.floor(entry.contentRect.height)),
      });
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (size.width <= 0 || size.height <= 0) {
      return;
    }
    viewRef.current = fitView(sampledPoints, boxes, size.width, size.height);
    drawScene();
  }, [boxes, sampledPoints, size.height, size.width]);

  useEffect(() => {
    drawScene();
  }, [activeClass?.color, boxes, classMap, sampledPoints, selectedIds, size.height, size.width]);

  const drawScene = () => {
    const canvas = canvasRef.current;
    if (!canvas || size.width <= 0 || size.height <= 0) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const pixelWidth = Math.max(1, Math.floor(size.width * dpr));
    const pixelHeight = Math.max(1, Math.floor(size.height * dpr));
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, size.width, size.height);
    context.fillStyle = "#080b10";
    context.fillRect(0, 0, size.width, size.height);

    drawGrid(context, size.width, size.height, viewRef.current);
    drawAxes(context, size.width, size.height, viewRef.current);
    drawPoints(context, sampledPoints, viewRef.current, size.width, size.height);
    drawBoxes(context, boxes, selectedIds, classMap, viewRef.current, size.width, size.height);
  };

  const zoom = (factor: number) => {
    viewRef.current = {
      ...viewRef.current,
      scale: clamp(viewRef.current.scale * factor, MIN_SCALE, MAX_SCALE),
    };
    drawScene();
  };

  const resetView = () => {
    viewRef.current = fitView(sampledPoints, boxes, size.width, size.height);
    drawScene();
  };

  const updateHover = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const screenX = clientX - rect.left;
    const screenY = clientY - rect.top;
    const world = screenToWorld(screenX, screenY, viewRef.current, size.width, size.height);
    const nearest = findNearestPoint(points, world.x, world.y);
    const nextHover = nearest
      ? ([nearest.x, nearest.y, nearest.z] as [number, number, number])
      : ([world.x, world.y, 0] as [number, number, number]);
    if (!sameHoverPoint(hoverRef.current, nextHover)) {
      hoverRef.current = nextHover;
      onHoverWorldChange?.(nextHover);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const releaseDrag = (pointerId?: number) => {
      dragRef.current = null;
      if (pointerId != null && canvas.hasPointerCapture(pointerId)) {
        canvas.releasePointerCapture(pointerId);
      }
      dragPointerIdRef.current = null;
      canvas.style.cursor = "crosshair";
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) {
        return;
      }
      updateHover(event.clientX, event.clientY);

      const rect = canvas.getBoundingClientRect();
      const screenX = event.clientX - rect.left;
      const screenY = event.clientY - rect.top;
      const world = screenToWorld(screenX, screenY, viewRef.current, size.width, size.height);
      const hitBoxId = findHitBox(boxes, world.x, world.y);

      if (hitBoxId) {
        if (event.shiftKey) {
          onSelect(
            selectedIds.includes(hitBoxId)
              ? selectedIds.filter((item) => item !== hitBoxId)
              : [...selectedIds, hitBoxId],
          );
        } else if (!selectedIds.includes(hitBoxId) || selectedIds.length !== 1) {
          onSelect([hitBoxId]);
        }

        dragRef.current = {
          kind: "box",
          startClientX: event.clientX,
          startClientY: event.clientY,
          lastClientX: event.clientX,
          lastClientY: event.clientY,
          moved: false,
          hitBoxId,
        };
        dragPointerIdRef.current = event.pointerId;
        canvas.setPointerCapture(event.pointerId);
        canvas.style.cursor = "move";
        event.preventDefault();
        return;
      }

      dragRef.current = {
        kind: "pan",
        startClientX: event.clientX,
        startClientY: event.clientY,
        lastClientX: event.clientX,
        lastClientY: event.clientY,
        moved: false,
        hitBoxId: null,
      };
      dragPointerIdRef.current = event.pointerId;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const handlePointerMove = (event: PointerEvent) => {
      updateHover(event.clientX, event.clientY);

      const drag = dragRef.current;
      if (!drag) {
        const rect = canvas.getBoundingClientRect();
        const screenX = event.clientX - rect.left;
        const screenY = event.clientY - rect.top;
        const world = screenToWorld(screenX, screenY, viewRef.current, size.width, size.height);
        canvas.style.cursor = findHitBox(boxes, world.x, world.y) ? "move" : "crosshair";
        return;
      }

      const dxScreen = event.clientX - drag.lastClientX;
      const dyScreen = event.clientY - drag.lastClientY;
      if (Math.abs(event.clientX - drag.startClientX) > 2 || Math.abs(event.clientY - drag.startClientY) > 2) {
        drag.moved = true;
      }
      drag.lastClientX = event.clientX;
      drag.lastClientY = event.clientY;

      if (drag.kind === "box") {
        if (dxScreen !== 0 || dyScreen !== 0) {
          const dxWorld = -dyScreen / viewRef.current.scale;
          const dyWorld = dxScreen / viewRef.current.scale;
          onMoveSelected(dxWorld, dyWorld);
        }
        return;
      }

      viewRef.current = {
        ...viewRef.current,
        centerX: viewRef.current.centerX + dyScreen / viewRef.current.scale,
        centerY: viewRef.current.centerY - dxScreen / viewRef.current.scale,
      };
      drawScene();
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (dragPointerIdRef.current != null && dragPointerIdRef.current !== event.pointerId) {
        return;
      }
      const drag = dragRef.current;
      releaseDrag(event.pointerId);
      if (!drag) {
        return;
      }
      if (!drag.moved && drag.kind === "pan") {
        onSelect([]);
      }
    };

    const handlePointerCancel = (event: PointerEvent) => {
      if (dragPointerIdRef.current != null && dragPointerIdRef.current !== event.pointerId) {
        return;
      }
      releaseDrag(event.pointerId);
    };

    const handleWindowBlur = () => {
      releaseDrag();
    };

    const handleDoubleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const screenX = event.clientX - rect.left;
      const screenY = event.clientY - rect.top;
      const world = screenToWorld(screenX, screenY, viewRef.current, size.width, size.height);
      const nearest = findNearestPoint(points, world.x, world.y);
      if (nearest) {
        onCreateBox([nearest.x, nearest.y, nearest.z]);
      } else {
        onCreateBox([world.x, world.y, 0]);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.altKey && selectedIds.length > 0) {
        event.preventDefault();
        onRotateSelected(event.deltaY > 0 ? 0.06 : -0.06);
        return;
      }
      event.preventDefault();
      zoom(event.deltaY > 0 ? 1 / 1.12 : 1.12);
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerCancel);
    canvas.addEventListener("lostpointercapture", handleWindowBlur);
    window.addEventListener("blur", handleWindowBlur);
    canvas.addEventListener("dblclick", handleDoubleClick);
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    const handleContextMenu = (event: MouseEvent) => event.preventDefault();
    canvas.addEventListener("contextmenu", handleContextMenu);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerCancel);
      canvas.removeEventListener("lostpointercapture", handleWindowBlur);
      window.removeEventListener("blur", handleWindowBlur);
      canvas.removeEventListener("dblclick", handleDoubleClick);
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("contextmenu", handleContextMenu);
      releaseDrag();
    };
  }, [boxes, onCreateBox, onHoverWorldChange, onMoveSelected, onRotateSelected, onSelect, points, selectedIds, size.height, size.width]);

  return (
    <div className="frame-canvas" ref={hostRef}>
      <canvas ref={canvasRef} className="frame-canvas__surface" />
      <div className="frame-canvas__toolbar">
        <button className="ghost-button" onClick={() => zoom(1.16)} type="button">
          +
        </button>
        <button className="ghost-button" onClick={() => zoom(1 / 1.16)} type="button">
          -
        </button>
        <button className="ghost-button" onClick={resetView} type="button">
          Fit
        </button>
        <button className="ghost-button" onClick={resetView} type="button">
          Center
        </button>
      </div>
    </div>
  );
}

export const BevCanvas = memo(BevCanvasInner);

function samplePoints(points: PointRecord[], maxPoints: number) {
  if (points.length <= maxPoints) {
    return points;
  }
  const stride = Math.max(1, Math.floor(points.length / maxPoints));
  const sampled: PointRecord[] = [];
  for (let index = 0; index < points.length; index += stride) {
    sampled.push(points[index]);
  }
  return sampled;
}

function fitView(points: PointRecord[], boxes: AnnotationBox[], width: number, height: number): BevViewState {
  const bounds = collectBounds(points, boxes);
  const rangeX = Math.max(bounds.maxX - bounds.minX, 6);
  const rangeY = Math.max(bounds.maxY - bounds.minY, 6);
  const scale = clamp(
    Math.min(
      Math.max(1, (height - VIEW_PADDING_PX * 2) / rangeX),
      Math.max(1, (width - VIEW_PADDING_PX * 2) / rangeY),
    ),
    MIN_SCALE,
    MAX_SCALE,
  );
  return {
    centerX: (bounds.minX + bounds.maxX) * 0.5,
    centerY: (bounds.minY + bounds.maxY) * 0.5,
    scale,
  };
}

function collectBounds(points: PointRecord[], boxes: AnnotationBox[]) {
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    minX = Math.min(minX, point.x);
    maxX = Math.max(maxX, point.x);
    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
  }

  for (const box of boxes) {
    for (const corner of boxCorners(box)) {
      minX = Math.min(minX, corner[0]);
      maxX = Math.max(maxX, corner[0]);
      minY = Math.min(minY, corner[1]);
      maxY = Math.max(maxY, corner[1]);
    }
  }

  if (!Number.isFinite(minX) || !Number.isFinite(maxX) || !Number.isFinite(minY) || !Number.isFinite(maxY)) {
    return { minX: -10, maxX: 10, minY: -10, maxY: 10 };
  }

  return { minX, maxX, minY, maxY };
}

function drawGrid(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  view: BevViewState,
) {
  const gridStep = chooseGridStep(view.scale);
  const minWorld = screenToWorld(0, height, view, width, height);
  const maxWorld = screenToWorld(width, 0, view, width, height);

  context.save();
  context.strokeStyle = "rgba(24, 34, 48, 0.9)";
  context.lineWidth = 1;

  const startY = Math.floor(minWorld.y / gridStep) * gridStep;
  for (let worldY = startY; worldY <= maxWorld.y; worldY += gridStep) {
    const screen = worldToScreen(view.centerX, worldY, view, width, height);
    context.beginPath();
    context.moveTo(screen.x, 0);
    context.lineTo(screen.x, height);
    context.stroke();
  }

  const startX = Math.floor(minWorld.x / gridStep) * gridStep;
  for (let worldX = startX; worldX <= maxWorld.x; worldX += gridStep) {
    const screen = worldToScreen(worldX, view.centerY, view, width, height);
    context.beginPath();
    context.moveTo(0, screen.y);
    context.lineTo(width, screen.y);
    context.stroke();
  }

  context.restore();
}

function drawAxes(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  view: BevViewState,
) {
  const origin = worldToScreen(0, 0, view, width, height);

  context.save();
  context.lineWidth = 1.4;

  context.strokeStyle = "rgba(255, 90, 90, 0.88)";
  context.beginPath();
  context.moveTo(origin.x, origin.y);
  context.lineTo(origin.x, origin.y - 36);
  context.stroke();

  context.strokeStyle = "rgba(90, 170, 255, 0.88)";
  context.beginPath();
  context.moveTo(origin.x, origin.y);
  context.lineTo(origin.x + 36, origin.y);
  context.stroke();

  context.restore();
}

function drawPoints(
  context: CanvasRenderingContext2D,
  points: PointRecord[],
  view: BevViewState,
  width: number,
  height: number,
) {
  const radius = view.scale >= 18 ? 2.1 : view.scale >= 10 ? 1.5 : 1.1;
  context.save();
  context.fillStyle = "#b8e7ff";
  context.globalAlpha = 0.9;
  for (const point of points) {
    const screen = worldToScreen(point.x, point.y, view, width, height);
    if (screen.x < -2 || screen.y < -2 || screen.x > width + 2 || screen.y > height + 2) {
      continue;
    }
    context.beginPath();
    context.arc(screen.x, screen.y, radius, 0, Math.PI * 2);
    context.fill();
  }
  context.restore();
}

function drawBoxes(
  context: CanvasRenderingContext2D,
  boxes: AnnotationBox[],
  selectedIds: string[],
  classMap: Map<string, ClassDefinition>,
  view: BevViewState,
  width: number,
  height: number,
) {
  for (const box of boxes) {
    const corners = boxCorners(box).map(([x, y]) => worldToScreen(x, y, view, width, height));
    const color = classMap.get(box.class_name)?.color ?? "#58a6ff";
    const selected = selectedIds.includes(box.box_id);

    context.save();
    context.beginPath();
    context.moveTo(corners[0].x, corners[0].y);
    for (let index = 1; index < corners.length; index += 1) {
      context.lineTo(corners[index].x, corners[index].y);
    }
    context.closePath();
    context.fillStyle = hexToRgba(color, selected ? 0.22 : 0.1);
    context.fill();
    context.strokeStyle = selected ? "#ffffff" : color;
    context.lineWidth = selected ? 2.2 : 1.6;
    context.stroke();

    const front = worldToScreen(
      box.center_xyz[0] + Math.cos(box.yaw) * box.size_lwh[0] * 0.5,
      box.center_xyz[1] + Math.sin(box.yaw) * box.size_lwh[0] * 0.5,
      view,
      width,
      height,
    );
    const center = worldToScreen(box.center_xyz[0], box.center_xyz[1], view, width, height);
    context.beginPath();
    context.moveTo(center.x, center.y);
    context.lineTo(front.x, front.y);
    context.strokeStyle = selected ? "#ffffff" : color;
    context.stroke();
    context.restore();
  }
}

function worldToScreen(
  x: number,
  y: number,
  view: BevViewState,
  width: number,
  height: number,
) {
  return {
    x: width * 0.5 + (y - view.centerY) * view.scale,
    y: height * 0.5 - (x - view.centerX) * view.scale,
  };
}

function screenToWorld(
  x: number,
  y: number,
  view: BevViewState,
  width: number,
  height: number,
) {
  return {
    x: view.centerX - (y - height * 0.5) / view.scale,
    y: view.centerY + (x - width * 0.5) / view.scale,
  };
}

function findNearestPoint(points: PointRecord[], x: number, y: number) {
  const nearby: PointRecord[] = [];
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const point of points) {
    const dx = point.x - x;
    const dy = point.y - y;
    const distance = dx * dx + dy * dy;
    if (distance <= 1.5) {
      nearby.push(point);
    }
    if (distance < bestDistance) {
      bestDistance = distance;
    }
  }
  if (bestDistance > 1.5 || nearby.length === 0) {
    return null;
  }

  const sortedZ = nearby.map((point) => point.z).sort((left, right) => left - right);
  const groundZ = sortedZ[Math.max(0, Math.floor((sortedZ.length - 1) * 0.16))] ?? 0;
  let best: PointRecord | null = null;
  let bestScore = Number.NEGATIVE_INFINITY;
  for (const point of nearby) {
    const dx = point.x - x;
    const dy = point.y - y;
    const dxy2 = dx * dx + dy * dy;
    const score = (point.z - groundZ) * 1.8 - dxy2 * 3.2;
    if (score > bestScore) {
      bestScore = score;
      best = point;
    }
  }
  return best;
}

function findHitBox(boxes: AnnotationBox[], x: number, y: number) {
  for (let index = boxes.length - 1; index >= 0; index -= 1) {
    if (pointInBox(x, y, boxes[index])) {
      return boxes[index].box_id;
    }
  }
  return null;
}

function pointInBox(x: number, y: number, box: AnnotationBox) {
  const dx = x - box.center_xyz[0];
  const dy = y - box.center_xyz[1];
  const cos = Math.cos(-box.yaw);
  const sin = Math.sin(-box.yaw);
  const localX = dx * cos - dy * sin;
  const localY = dx * sin + dy * cos;
  return Math.abs(localX) <= box.size_lwh[0] * 0.5 && Math.abs(localY) <= box.size_lwh[1] * 0.5;
}

function boxCorners(box: AnnotationBox) {
  const halfX = box.size_lwh[0] * 0.5;
  const halfY = box.size_lwh[1] * 0.5;
  const cos = Math.cos(box.yaw);
  const sin = Math.sin(box.yaw);
  return [
    rotateCorner(box.center_xyz[0], box.center_xyz[1], halfX, halfY, cos, sin),
    rotateCorner(box.center_xyz[0], box.center_xyz[1], halfX, -halfY, cos, sin),
    rotateCorner(box.center_xyz[0], box.center_xyz[1], -halfX, -halfY, cos, sin),
    rotateCorner(box.center_xyz[0], box.center_xyz[1], -halfX, halfY, cos, sin),
  ];
}

function rotateCorner(
  centerX: number,
  centerY: number,
  localX: number,
  localY: number,
  cos: number,
  sin: number,
) {
  return [
    centerX + localX * cos - localY * sin,
    centerY + localX * sin + localY * cos,
  ] as const;
}

function chooseGridStep(scale: number) {
  const candidates = [0.5, 1, 2, 5, 10, 20, 50];
  for (const candidate of candidates) {
    if (candidate * scale >= 42) {
      return candidate;
    }
  }
  return 100;
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const full = normalized.length === 3
    ? normalized
        .split("")
        .map((item) => `${item}${item}`)
        .join("")
    : normalized;
  const value = Number.parseInt(full, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function sameHoverPoint(
  left: [number, number, number] | null,
  right: [number, number, number] | null,
) {
  if (!left || !right) {
    return left === right;
  }
  return (
    Math.abs(left[0] - right[0]) < 0.05 &&
    Math.abs(left[1] - right[1]) < 0.05 &&
    Math.abs(left[2] - right[2]) < 0.05
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
