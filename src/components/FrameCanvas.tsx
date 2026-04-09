import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { AnnotationBox, ClassDefinition, PointRecord } from "../types";
import { BevCanvas } from "./BevCanvas";
import { BoxOverlayViews } from "./BoxOverlayViews";

export type ViewMode = "bev" | "view3d";

interface FrameCanvasProps {
  mode: ViewMode;
  readOnly?: boolean;
  points: PointRecord[];
  boxes: AnnotationBox[];
  classes: ClassDefinition[];
  pendingClassChoice?: { boxId: string; x: number; y: number } | null;
  selectedIds: string[];
  activeClass?: ClassDefinition;
  selectedBox?: AnnotationBox | null;
  onChoosePendingClass?: (className: string) => void;
  onDismissPendingClassChoice?: () => void;
  onSelect: (boxIds: string[]) => void;
  onMoveSelected: (dx: number, dy: number) => void;
  onRotateSelected: (deltaYaw: number) => void;
  onCreateBox: (center: [number, number, number], placement?: { x: number; y: number }) => void;
  onHoverWorldChange?: (point: [number, number, number] | null) => void;
}

const MAX_DISPLAY_POINTS = 240000;
const POINT_SIZE_3D = 0.06;
const POINT_SIZE_BEV = 4.0;
const POINT_PICK_THRESHOLD = 0.24;
const HOVER_INTERVAL_MS = 50;
const ORBIT_ZOOM_SPEED = 2.6;
const ORBIT_PAN_SPEED = 2.4;
const ORBIT_ROTATE_SPEED = 1.05;

function View3dCanvasInner({
  mode,
  readOnly,
  points,
  boxes,
  classes,
  pendingClassChoice,
  selectedIds,
  activeClass,
  selectedBox,
  onChoosePendingClass,
  onDismissPendingClassChoice,
  onSelect,
  onMoveSelected,
  onRotateSelected,
  onCreateBox,
  onHoverWorldChange,
}: FrameCanvasProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const perspectiveCameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const bevCameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const pointCloudRef = useRef<THREE.Points | null>(null);
  const pointGeometryRef = useRef<THREE.BufferGeometry | null>(null);
  const pointMaterialRef = useRef<THREE.PointsMaterial | null>(null);
  const sampledPointsRef = useRef<PointRecord[]>([]);
  const boxGroupRef = useRef<THREE.Group | null>(null);
  const boxPickMapRef = useRef(new Map<string, THREE.Mesh>());
  const boundsRef = useRef<THREE.Box3>(new THREE.Box3());
  const needsRenderRef = useRef(true);
  const rafIdRef = useRef<number | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const pointerRef = useRef(new THREE.Vector2());
  const dragPointerIdRef = useRef<number | null>(null);
  const dragRef = useRef<{
    plane: THREE.Plane;
    lastPoint: THREE.Vector3;
  } | null>(null);
  const hoverRef = useRef<{ time: number; point: [number, number, number] | null }>({
    time: 0,
    point: null,
  });
  const sizeRef = useRef({ width: 0, height: 0 });
  const modeRef = useRef(mode);
  const propsRef = useRef({
    readOnly,
    boxes,
    points,
    selectedIds,
    classMap: new Map(classes.map((item) => [item.name, item])),
    activeClass,
    onSelect,
    onMoveSelected,
    onRotateSelected,
    onCreateBox,
    onChoosePendingClass,
    onDismissPendingClassChoice,
    onHoverWorldChange,
  });
  const [webglError, setWebglError] = useState<string | null>(null);

  const classMap = useMemo(() => new Map(classes.map((item) => [item.name, item])), [classes]);
  const pickerWidth = 180;
  const pickerHeight = Math.min(Math.max(classes.length * 44 + 64, 140), 320);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    propsRef.current = {
      readOnly,
      boxes,
      points,
      selectedIds,
      classMap,
      activeClass,
      onSelect,
      onMoveSelected,
      onRotateSelected,
      onCreateBox,
      onChoosePendingClass,
      onDismissPendingClassChoice,
      onHoverWorldChange,
    };
  }, [activeClass, boxes, classMap, onChoosePendingClass, onCreateBox, onDismissPendingClassChoice, onHoverWorldChange, onMoveSelected, onRotateSelected, onSelect, points, readOnly, selectedIds]);

  const activeCamera = useCallback(() => {
    return modeRef.current === "view3d" ? perspectiveCameraRef.current : bevCameraRef.current;
  }, []);

  const invalidate = useCallback(() => {
    needsRenderRef.current = true;
  }, []);

  const fitView = useCallback(
    (resetOrientation = false) => {
      const bounds = boundsRef.current;
      const { width, height } = sizeRef.current;
      if (bounds.isEmpty() || width <= 0 || height <= 0) {
        return;
      }

      const center = bounds.getCenter(new THREE.Vector3());
      const extent = bounds.getSize(new THREE.Vector3());
      const controls = controlsRef.current;
      const perspectiveCamera = perspectiveCameraRef.current;
      const bevCamera = bevCameraRef.current;
      if (!controls || !perspectiveCamera || !bevCamera) {
        return;
      }

      if (modeRef.current === "view3d") {
        const radius = Math.max(extent.x, extent.y, extent.z, 8);
        const distance =
          radius / Math.tan(THREE.MathUtils.degToRad(perspectiveCamera.fov * 0.5)) * 1.08;
        const direction = resetOrientation
          ? new THREE.Vector3(1.2, -1.25, 0.88).normalize()
          : perspectiveCamera.position.clone().sub(controls.target).normalize();
        perspectiveCamera.position.copy(center).addScaledVector(direction, distance);
        perspectiveCamera.near = 0.1;
        perspectiveCamera.far = Math.max(500, distance * 8);
        perspectiveCamera.up.set(0, 0, 1);
        perspectiveCamera.lookAt(center);
        perspectiveCamera.updateProjectionMatrix();
      } else {
        const aspect = width / height;
        const span = Math.max(extent.x, extent.y, 18) * 0.62;
        bevCamera.left = -span * aspect;
        bevCamera.right = span * aspect;
        bevCamera.top = span;
        bevCamera.bottom = -span;
        bevCamera.near = 0.1;
        bevCamera.far = Math.max(600, extent.z + 240);
        bevCamera.position.set(center.x, center.y, center.z + Math.max(extent.z + 100, 140));
        bevCamera.up.set(0, 1, 0);
        bevCamera.lookAt(center);
        bevCamera.updateProjectionMatrix();
      }

      controls.target.copy(center);
      controls.update();
      invalidate();
    },
    [invalidate],
  );

  // ---- Init: renderer, scene, cameras, controls, animation loop ----
  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) {
      return;
    }

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setWebglError("WebGL context lost");
    };
    const handleContextRestored = () => {
      setWebglError(null);
      invalidate();
    };
    const handleContextCreationError = (event: Event) => {
      const statusMessage =
        "statusMessage" in event && typeof event.statusMessage === "string"
          ? event.statusMessage
          : "WebGL context creation failed";
      setWebglError(statusMessage);
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);
    canvas.addEventListener("webglcontextcreationerror", handleContextCreationError);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
        depth: true,
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
      });
    } catch (error) {
      setWebglError(error instanceof Error ? error.message : String(error));
      return () => {
        canvas.removeEventListener("webglcontextlost", handleContextLost);
        canvas.removeEventListener("webglcontextrestored", handleContextRestored);
        canvas.removeEventListener("webglcontextcreationerror", handleContextCreationError);
      };
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x080b10, 1);
    renderer.sortObjects = false;
    rendererRef.current = renderer;
    setWebglError(null);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080b10);
    sceneRef.current = scene;

    const perspectiveCamera = new THREE.PerspectiveCamera(55, 1, 0.1, 1200);
    perspectiveCamera.up.set(0, 0, 1);
    perspectiveCamera.position.set(26, -24, 16);
    perspectiveCameraRef.current = perspectiveCamera;

    const bevCamera = new THREE.OrthographicCamera(-50, 50, 50, -50, 0.1, 1200);
    bevCamera.up.set(0, 1, 0);
    bevCamera.position.set(0, 0, 120);
    bevCamera.lookAt(0, 0, 0);
    bevCameraRef.current = bevCamera;

    const controls = new OrbitControls(perspectiveCamera, canvas);
    controls.enableDamping = false;
    controls.dampingFactor = 0;
    controls.screenSpacePanning = true;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableRotate = true;
    controls.zoomSpeed = ORBIT_ZOOM_SPEED;
    controls.rotateSpeed = ORBIT_ROTATE_SPEED;
    controls.panSpeed = ORBIT_PAN_SPEED;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    controls.addEventListener("change", invalidate);

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    const grid = new THREE.GridHelper(180, 90, 0x182230, 0x0f1722);
    grid.rotation.x = Math.PI * 0.5;
    const gridMaterial = grid.material as THREE.Material;
    gridMaterial.transparent = true;
    gridMaterial.opacity = 0.5;
    scene.add(grid);

    const axes = new THREE.AxesHelper(4.5);
    scene.add(axes);

    const boxGroup = new THREE.Group();
    scene.add(boxGroup);
    boxGroupRef.current = boxGroup;

    // ---- Resize observer ----
    const onResize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      if (!entry) return;
      const w = Math.max(1, Math.floor(entry.contentRect.width));
      const h = Math.max(1, Math.floor(entry.contentRect.height));
      sizeRef.current = { width: w, height: h };
      renderer.setSize(w, h, false);
      perspectiveCamera.aspect = w / h;
      perspectiveCamera.updateProjectionMatrix();
      const aspect = w / h;
      if (bevCamera.left !== -50 * aspect) {
        bevCamera.left = -50 * aspect;
        bevCamera.right = 50 * aspect;
        bevCamera.updateProjectionMatrix();
      }
      invalidate();
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(host);

    // ---- Animation loop ----
    let alive = true;
    const animate = () => {
      if (!alive) return;
      rafIdRef.current = requestAnimationFrame(animate);
      const cam = modeRef.current === "view3d" ? perspectiveCamera : bevCamera;
      const dampingActive = controls.enableDamping && controls.enabled;
      if (dampingActive) {
        controls.update();
      }
      if (needsRenderRef.current) {
        needsRenderRef.current = false;
        renderer.render(scene, cam);
      }
    };
    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      alive = false;
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      canvas.removeEventListener("webglcontextcreationerror", handleContextCreationError);
      controls.removeEventListener("change", invalidate);
      controls.dispose();
      disposePoints(pointCloudRef.current, pointGeometryRef.current, pointMaterialRef.current);
      if (boxGroupRef.current) {
        disposeGroup(boxGroupRef.current);
      }
      scene.clear();
      renderer.dispose();
      rendererRef.current = null;
      sceneRef.current = null;
      perspectiveCameraRef.current = null;
      bevCameraRef.current = null;
      controlsRef.current = null;
      boxGroupRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Mode switch: reconfigure controls & material ----
  useEffect(() => {
    const controls = controlsRef.current;
    const perspectiveCamera = perspectiveCameraRef.current;
    const bevCamera = bevCameraRef.current;
    if (!controls || !perspectiveCamera || !bevCamera) return;

    controls.object = mode === "view3d" ? perspectiveCamera : bevCamera;
    controls.enableRotate = mode === "view3d";
    controls.mouseButtons.LEFT = mode === "view3d" ? THREE.MOUSE.ROTATE : THREE.MOUSE.PAN;
    controls.mouseButtons.MIDDLE = THREE.MOUSE.DOLLY;
    controls.mouseButtons.RIGHT = THREE.MOUSE.PAN;
    controls.update();

    const material = pointMaterialRef.current;
    if (material) {
      material.size = mode === "view3d" ? POINT_SIZE_3D : POINT_SIZE_BEV;
      material.sizeAttenuation = mode === "view3d";
      material.needsUpdate = true;
    }

    if (points.length > 0) {
      fitView(mode === "view3d");
    }
    invalidate();
  }, [mode, fitView, invalidate, points.length]);

  // ---- Build point cloud (only when points data changes) ----
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    disposePoints(pointCloudRef.current, pointGeometryRef.current, pointMaterialRef.current);
    boundsRef.current.makeEmpty();

    if (points.length === 0) {
      pointCloudRef.current = null;
      pointGeometryRef.current = null;
      pointMaterialRef.current = null;
      invalidate();
      return;
    }

    const sampled = samplePoints(points, MAX_DISPLAY_POINTS);
    sampledPointsRef.current = sampled;
    const positions = new Float32Array(sampled.length * 3);
    const colors = new Float32Array(sampled.length * 3);
    const bounds = new THREE.Box3();
    const temp = new THREE.Vector3();
    const [zMin, zMax] = getHeightRange(sampled);

    for (let index = 0; index < sampled.length; index += 1) {
      const point = sampled[index];
      const offset = index * 3;
      positions[offset] = point.x;
      positions[offset + 1] = point.y;
      positions[offset + 2] = point.z;
      const color = colorizePoint(point.z, zMin, zMax, point.intensity);
      colors[offset] = color[0];
      colors[offset + 1] = color[1];
      colors[offset + 2] = color[2];
      temp.set(point.x, point.y, point.z);
      bounds.expandByPoint(temp);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.computeBoundingSphere();

    const is3d = modeRef.current === "view3d";
    const material = new THREE.PointsMaterial({
      size: is3d ? POINT_SIZE_3D : POINT_SIZE_BEV,
      sizeAttenuation: is3d,
      vertexColors: true,
      transparent: true,
      opacity: 0.96,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(geometry, material);
    pointCloud.frustumCulled = false;
    scene.add(pointCloud);

    pointCloudRef.current = pointCloud;
    pointGeometryRef.current = geometry;
    pointMaterialRef.current = material;
    boundsRef.current.copy(bounds);
    raycasterRef.current.params.Points = { threshold: POINT_PICK_THRESHOLD };

    fitView(true);
  }, [fitView, points, invalidate]);

  // ---- Build boxes ----
  useEffect(() => {
    const boxGroup = boxGroupRef.current;
    if (!boxGroup) return;

    disposeGroup(boxGroup);
    boxPickMapRef.current.clear();

    for (const box of boxes) {
      const color = classMap.get(box.class_name)?.color ?? "#58a6ff";
      const selected = selectedIds.includes(box.box_id);
      const { group, pickMesh } = buildBox(box, color, selected);
      boxGroup.add(group);
      boxPickMapRef.current.set(box.box_id, pickMesh);
    }

    invalidate();
  }, [boxes, classMap, invalidate, selectedIds]);

  // ---- Pointer / interaction handlers ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const releaseDrag = (pointerId?: number) => {
      dragRef.current = null;
      if (pointerId != null && canvas.hasPointerCapture(pointerId)) {
        canvas.releasePointerCapture(pointerId);
      }
      dragPointerIdRef.current = null;
      if (controlsRef.current) controlsRef.current.enabled = true;
      canvas.style.cursor = modeRef.current === "view3d" ? "grab" : "crosshair";
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;

      const hitId = raycastBox(
        event, canvas, activeCamera(), raycasterRef.current, pointerRef.current, boxPickMapRef.current,
      );
      if (!hitId) {
        if (!event.shiftKey) propsRef.current.onSelect([]);
        return;
      }

      if (event.shiftKey) {
        const nextSelection = propsRef.current.selectedIds.includes(hitId)
          ? propsRef.current.selectedIds.filter((item) => item !== hitId)
          : [...propsRef.current.selectedIds, hitId];
        propsRef.current.onSelect(nextSelection);
        invalidate();
        return;
      }

      if (!propsRef.current.selectedIds.includes(hitId) || propsRef.current.selectedIds.length !== 1) {
        propsRef.current.onSelect([hitId]);
      }
      if (propsRef.current.readOnly) {
        return;
      }

      const box = propsRef.current.boxes.find((item) => item.box_id === hitId);
      const camera = activeCamera();
      if (!box || !camera) return;

      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -box.center_xyz[2]);
      const hitPoint = intersectPlane(event, canvas, camera, raycasterRef.current, pointerRef.current, plane);
      if (!hitPoint) return;

      dragRef.current = { plane, lastPoint: hitPoint.clone() };
      dragPointerIdRef.current = event.pointerId;
      canvas.setPointerCapture(event.pointerId);
      if (controlsRef.current) controlsRef.current.enabled = false;
      event.preventDefault();
      canvas.style.cursor = "move";
    };

    const handlePointerMove = (event: PointerEvent) => {
      const camera = activeCamera();
      if (!camera) return;

      if (dragRef.current) {
        const hitPoint = intersectPlane(
          event, canvas, camera, raycasterRef.current, pointerRef.current, dragRef.current.plane,
        );
        if (!hitPoint) return;
        const dx = hitPoint.x - dragRef.current.lastPoint.x;
        const dy = hitPoint.y - dragRef.current.lastPoint.y;
        dragRef.current.lastPoint.copy(hitPoint);
        if (Math.abs(dx) > 1e-5 || Math.abs(dy) > 1e-5) {
          propsRef.current.onMoveSelected(dx, dy);
        }
        return;
      }

      const now = performance.now();
      const hitId = raycastBox(
        event, canvas, camera, raycasterRef.current, pointerRef.current, boxPickMapRef.current,
      );
      canvas.style.cursor = hitId ? "move" : modeRef.current === "view3d" ? "grab" : "crosshair";
      if (now - hoverRef.current.time < HOVER_INTERVAL_MS) return;
      hoverRef.current.time = now;

      const ground = intersectPlane(
        event, canvas, camera, raycasterRef.current, pointerRef.current,
        new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
      );
      const nextPoint = ground ? ([ground.x, ground.y, ground.z] as [number, number, number]) : null;
      if (!sameHoverPoint(hoverRef.current.point, nextPoint)) {
        hoverRef.current.point = nextPoint;
        propsRef.current.onHoverWorldChange?.(nextPoint);
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (dragPointerIdRef.current != null && dragPointerIdRef.current !== event.pointerId) {
        return;
      }
      releaseDrag(event.pointerId);
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
      if (propsRef.current.readOnly) {
        return;
      }
      if (raycastBox(event, canvas, activeCamera(), raycasterRef.current, pointerRef.current, boxPickMapRef.current)) {
        return;
      }
      const pointCloud = pointCloudRef.current;
      const camera = activeCamera();
      if (!pointCloud || !camera) return;

      const hitPoint = raycastPoint(
        event, canvas, camera, raycasterRef.current, pointerRef.current, pointCloud, sampledPointsRef.current,
      );
      if (hitPoint) {
        const rect = canvas.getBoundingClientRect();
        propsRef.current.onCreateBox([hitPoint.x, hitPoint.y, hitPoint.z], {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
        return;
      }

      const ground = intersectPlane(
        event, canvas, camera, raycasterRef.current, pointerRef.current,
        new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
      );
      if (ground) {
        const rect = canvas.getBoundingClientRect();
        propsRef.current.onCreateBox([ground.x, ground.y, ground.z], {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (propsRef.current.readOnly) return;
      if (!event.altKey || propsRef.current.selectedIds.length === 0) return;
      event.preventDefault();
      propsRef.current.onRotateSelected(event.deltaY > 0 ? 0.06 : -0.06);
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
  }, [activeCamera, invalidate]);

  const nudgeZoom = useCallback(
    (factor: number) => {
      const camera = activeCamera();
      const controls = controlsRef.current;
      if (!camera || !controls) return;

      if (camera instanceof THREE.OrthographicCamera) {
        camera.zoom = clamp(camera.zoom * factor, 0.3, 12);
        camera.updateProjectionMatrix();
        invalidate();
        return;
      }

      const offset = camera.position.clone().sub(controls.target);
      offset.multiplyScalar(1 / factor);
      camera.position.copy(controls.target.clone().add(offset));
      camera.updateProjectionMatrix();
      controls.update();
      invalidate();
    },
    [activeCamera, invalidate],
  );

  return (
    <div className="frame-canvas" ref={hostRef}>
      <canvas ref={canvasRef} className="frame-canvas__surface" />
      <div className="frame-canvas__toolbar">
        <button className="ghost-button" onClick={() => nudgeZoom(1.16)} type="button">
          +
        </button>
        <button className="ghost-button" onClick={() => nudgeZoom(1 / 1.16)} type="button">
          -
        </button>
        <button className="ghost-button" onClick={() => fitView(false)} type="button">
          Fit
        </button>
        <button className="ghost-button" onClick={() => fitView(true)} type="button">
          Center
        </button>
      </div>
      {!readOnly && pendingClassChoice && (
        <div
          className="bbox-class-picker"
          style={{
            left: Math.min(Math.max(pendingClassChoice.x + 12, 18), Math.max(sizeRef.current.width - pickerWidth, 18)),
            top: Math.min(Math.max(pendingClassChoice.y - 10, 18), Math.max(sizeRef.current.height - pickerHeight, 18)),
          }}
        >
          {classes.map((item) => (
            <button
              className="bbox-class-picker__btn"
              key={item.id}
              onClick={() => onChoosePendingClass?.(item.name)}
              style={{
                borderColor: `${item.color}66`,
                background: `linear-gradient(135deg, ${hexToRgba(item.color, 0.24)}, rgba(13, 17, 23, 0.94))`,
              }}
              type="button"
            >
              <span className="bbox-class-picker__swatch" style={{ background: item.color }} />
              <span className="bbox-class-picker__name">{item.name}</span>
            </button>
          ))}
          <button className="bbox-class-picker__close" onClick={() => onDismissPendingClassChoice?.()} type="button">
            ×
          </button>
        </div>
      )}
      {selectedBox && points.length > 0 && (
        <BoxOverlayViews box={selectedBox} points={points} />
      )}
      {webglError && <div className="frame-canvas__warning">{webglError}</div>}
    </div>
  );
}

function FrameCanvasSwitch(props: FrameCanvasProps) {
  if (props.mode === "bev") {
    return (
      <BevCanvas
        activeClass={props.activeClass}
        boxes={props.boxes}
        classes={props.classes}
        onCreateBox={props.onCreateBox}
        onHoverWorldChange={props.onHoverWorldChange}
        onMoveSelected={props.onMoveSelected}
        onRotateSelected={props.onRotateSelected}
        onSelect={props.onSelect}
        points={props.points}
        selectedIds={props.selectedIds}
      />
    );
  }
  return <View3dCanvasInner {...props} />;
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) {
    return `rgba(88, 166, 255, ${alpha})`;
  }
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export const FrameCanvas = memo(FrameCanvasSwitch);

function samplePoints(points: PointRecord[], maxPoints: number) {
  if (points.length <= maxPoints) return points;
  const stride = Math.max(1, Math.floor(points.length / maxPoints));
  const sampled: PointRecord[] = [];
  for (let index = 0; index < points.length; index += stride) {
    sampled.push(points[index]);
  }
  return sampled;
}

function buildBox(box: AnnotationBox, colorValue: string, selected: boolean) {
  const group = new THREE.Group();
  const geometry = new THREE.BoxGeometry(box.size_lwh[0], box.size_lwh[1], box.size_lwh[2]);
  const fillMaterial = new THREE.MeshBasicMaterial({
    color: colorValue,
    transparent: true,
    opacity: selected ? 0.22 : 0.1,
    depthWrite: false,
  });
  const fillMesh = new THREE.Mesh(geometry, fillMaterial);
  fillMesh.userData.boxId = box.box_id;
  group.add(fillMesh);

  const edgeGeometry = new THREE.EdgesGeometry(geometry);
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: selected ? "#ffffff" : colorValue,
    transparent: true,
    opacity: 0.95,
  });
  const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
  group.add(edges);

  group.position.set(box.center_xyz[0], box.center_xyz[1], box.center_xyz[2]);
  group.rotation.z = box.yaw;
  return { group, pickMesh: fillMesh };
}

function disposePoints(
  pointCloud: THREE.Points | null,
  geometry: THREE.BufferGeometry | null,
  material: THREE.Material | null,
) {
  if (pointCloud?.parent) pointCloud.parent.remove(pointCloud);
  geometry?.dispose();
  material?.dispose();
}

function disposeGroup(group: THREE.Group) {
  while (group.children.length > 0) {
    const child = group.children.pop();
    if (!child) continue;
    group.remove(child);
    child.traverse((object: THREE.Object3D) => {
      const mesh = object as THREE.Mesh;
      if ("geometry" in mesh && mesh.geometry) mesh.geometry.dispose();
      const material = mesh.material;
      if (Array.isArray(material)) {
        material.forEach((item) => item.dispose());
      } else if (material) {
        material.dispose();
      }
    });
  }
}

function updatePointer(
  event: MouseEvent | PointerEvent,
  canvas: HTMLCanvasElement,
  pointer: THREE.Vector2,
) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function raycastBox(
  event: MouseEvent | PointerEvent,
  canvas: HTMLCanvasElement,
  camera: THREE.Camera | null | undefined,
  raycaster: THREE.Raycaster,
  pointer: THREE.Vector2,
  pickMap: Map<string, THREE.Mesh>,
) {
  if (!camera || pickMap.size === 0) return null;
  updatePointer(event, canvas, pointer);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects([...pickMap.values()], false);
  if (hits.length === 0) return null;
  return String(hits[0].object.userData.boxId ?? "");
}

function raycastPoint(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  camera: THREE.Camera,
  raycaster: THREE.Raycaster,
  pointer: THREE.Vector2,
  pointCloud: THREE.Points,
  points: PointRecord[],
) {
  updatePointer(event, canvas, pointer);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster
    .intersectObject(pointCloud, false)
    .filter((item: THREE.Intersection) => typeof item.index === "number");
  if (hits.length === 0) return null;

  const minDistanceToRay = hits.reduce((best, item) => {
    const distanceToRay = typeof item.distanceToRay === "number" ? item.distanceToRay : item.distance;
    return Math.min(best, distanceToRay);
  }, Number.POSITIVE_INFINITY);
  const candidateHits = hits.filter((item) => {
    const distanceToRay = typeof item.distanceToRay === "number" ? item.distanceToRay : item.distance;
    return distanceToRay <= minDistanceToRay + 0.05;
  });
  candidateHits.sort((left, right) => {
    const leftPoint = left.index != null ? points[left.index] : null;
    const rightPoint = right.index != null ? points[right.index] : null;
    const zDelta = (rightPoint?.z ?? Number.NEGATIVE_INFINITY) - (leftPoint?.z ?? Number.NEGATIVE_INFINITY);
    if (Math.abs(zDelta) > 1e-5) {
      return zDelta;
    }
    const leftDistance = typeof left.distanceToRay === "number" ? left.distanceToRay : left.distance;
    const rightDistance = typeof right.distanceToRay === "number" ? right.distanceToRay : right.distance;
    return leftDistance - rightDistance;
  });

  const hit = candidateHits[0];
  if (hit.index == null) return null;
  return points[hit.index] ?? null;
}

function intersectPlane(
  event: MouseEvent | PointerEvent,
  canvas: HTMLCanvasElement,
  camera: THREE.Camera,
  raycaster: THREE.Raycaster,
  pointer: THREE.Vector2,
  plane: THREE.Plane,
) {
  updatePointer(event, canvas, pointer);
  raycaster.setFromCamera(pointer, camera);
  const point = new THREE.Vector3();
  return raycaster.ray.intersectPlane(plane, point) ? point : null;
}

function sameHoverPoint(
  left: [number, number, number] | null,
  right: [number, number, number] | null,
) {
  if (!left || !right) return left === right;
  return (
    Math.abs(left[0] - right[0]) < 0.05 &&
    Math.abs(left[1] - right[1]) < 0.05 &&
    Math.abs(left[2] - right[2]) < 0.05
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getHeightRange(points: PointRecord[]) {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (const point of points) {
    min = Math.min(min, point.z);
    max = Math.max(max, point.z);
  }
  if (!Number.isFinite(min) || !Number.isFinite(max) || Math.abs(max - min) < 1e-4) {
    return [-2, 2] as const;
  }
  return [min, max] as const;
}

function colorizePoint(z: number, zMin: number, zMax: number, intensity: number) {
  const normalized = clamp((z - zMin) / Math.max(1e-4, zMax - zMin), 0, 1);
  const intensityFactor = clamp(intensity / 255, 0.25, 1);
  const [r, g, b] = samplePalette(normalized);
  const boost = 0.6 + intensityFactor * 0.4;
  return [r * boost, g * boost, b * boost] as const;
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
