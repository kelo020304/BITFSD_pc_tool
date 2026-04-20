import {
  startTransition,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./App.css";
import { suggestBoxFromPointCluster } from "./autoBox";
import {
  controlTask,
  exportOpenpcdet,
  inferModelTestFrame,
  inferRange,
  inspectTrainingTarget,
  inspectWorkspaceTarget,
  listModelTestFrames,
  listTasks,
  loadFrame,
  loadModelTestFrame,
  openModelTestRoot,
  openTrainingRoot,
  openWorkspace,
  packageGroups,
  pickDirectory,
  pickRosbagDirectory,
  readTaskLog,
  saveAnnotation,
  saveClasses,
  saveSettings,
  saveTrainingSettings,
  trainOpenpcdet,
} from "./api";
import { FrameCanvas } from "./components/FrameCanvas";
import type {
  AnnotationBox,
  ClassDefinition,
  FrameAnnotation,
  FrameData,
  FrameSummary,
  ModelTestSnapshot,
  OpenpcdetModelPreset,
  PointRecord,
  ReviewStatus,
  TaskRecord,
  TrainingInferenceResult,
  TrainingSnapshot,
  TrainingTargetInfo,
  WorkspaceSettings,
  WorkspaceTargetInfo,
  WorkspaceSnapshot,
} from "./types";

type NoticeTone = "info" | "success" | "error";
type AppScreen = "home" | "workspace" | "package" | "training" | "model_test" | "cone_color";
type WorkspaceMode = "annotate" | "review";
type LeftPanelTab = "workspace" | "classes" | "frames" | "export" | "automation" | "openpcdet";

interface Notice {
  tone: NoticeTone;
  text: string;
}

function NoticeBanner({ notice }: { notice: Notice }) {
  const [copied, setCopied] = useState(false);
  const canCopy = notice.tone === "error" && notice.text.trim().length > 0;

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timer = window.setTimeout(() => {
      setCopied(false);
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [copied, notice.text]);

  return (
    <div className={`notice notice--${notice.tone}`}>
      <div className="notice__body">{notice.text}</div>
      {canCopy && (
        <button
          className="notice__copy"
          onClick={() => {
            void copyTextToClipboard(notice.text).then(
              () => setCopied(true),
              () => setCopied(false),
            );
          }}
          type="button"
        >
          {copied ? "已复制" : "复制报错"}
        </button>
      )}
    </div>
  );
}

interface TrainingMetricPoint {
  tsMs: number | null;
  epoch: number | null;
  totalEpochs: number | null;
  iter: number | null;
  itersPerEpoch: number | null;
  loss: number | null;
  lossAvg: number | null;
  lr: number | null;
  elapsedSeconds: number | null;
  etaSeconds: number | null;
}

type TrainArgOption = "epochs" | "workers" | "batch_size" | "logger_iter_interval" | "ckpt_save_step_interval";

const LAST_WORKSPACE_KEY = "bitfsd-annotator:last-workspace";
const LAST_PACKAGE_BAG_KEY = "bitfsd-annotator:last-package-bag";
const LAST_PACKAGE_OUTPUT_KEY = "bitfsd-annotator:last-package-output";
const LAST_EXPORT_KEY = "bitfsd-annotator:last-export";
const LAST_TRAINING_ROOT_KEY = "bitfsd-annotator:last-training-root";
const LAST_MODEL_TEST_ROOT_KEY = "bitfsd-annotator:last-model-test-root";
const LAST_CONE_COLOR_ROOT_KEY = "bitfsd-annotator:last-cone-color-root";
const FRAME_POINT_LIMIT = 260000;
const PACKAGE_FRAME_STEP = 5;
const PACKAGE_GROUP_SIZE = 20;
// Match the existing labelCloud workspace defaults used for cone annotation.
const DEFAULT_VIEW_RANGE: [number, number, number, number, number, number] = [-15, -25, -2, 50, 25, 2];
const DEFAULT_CLASS_DEFINITIONS: ClassDefinition[] = [
  { id: "cone", name: "Cone", color: "#FF9F1C", default_size: [0.228, 0.228, 0.325] },
];

function App() {
  const [workspaceInput, setWorkspaceInput] = useState(() => localStorage.getItem(LAST_WORKSPACE_KEY) ?? "");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [workspaceTarget, setWorkspaceTarget] = useState<WorkspaceTargetInfo | null>(null);
  const [packageBagInput, setPackageBagInput] = useState(() => localStorage.getItem(LAST_PACKAGE_BAG_KEY) ?? "");
  const [packageOutputInput, setPackageOutputInput] = useState(() => localStorage.getItem(LAST_PACKAGE_OUTPUT_KEY) ?? "");
  const [packageTopicInput, setPackageTopicInput] = useState("");
  const [packageMinTravelM, setPackageMinTravelM] = useState(0.5);
  const [packageTargetInfo, setPackageTargetInfo] = useState<WorkspaceTargetInfo | null>(null);
  const [packageTaskId, setPackageTaskId] = useState<string | null>(null);
  const [packageTask, setPackageTask] = useState<TaskRecord | null>(null);
  const [exportInput, setExportInput] = useState(() => localStorage.getItem(LAST_EXPORT_KEY) ?? "");
  const [trainingRootInput, setTrainingRootInput] = useState(() => localStorage.getItem(LAST_TRAINING_ROOT_KEY) ?? "");
  const [trainingTarget, setTrainingTarget] = useState<TrainingTargetInfo | null>(null);
  const [openedTrainingRoot, setOpenedTrainingRoot] = useState("");
  const [trainingSnapshot, setTrainingSnapshot] = useState<TrainingSnapshot | null>(null);
  const [trainingSettingsDraft, setTrainingSettingsDraft] = useState<WorkspaceSettings | null>(null);
  const [trainingSettingsDirty, setTrainingSettingsDirty] = useState(false);
  const [trainingRunName, setTrainingRunName] = useState("");
  const [trainingTaskId, setTrainingTaskId] = useState<string | null>(null);
  const [trainingTask, setTrainingTask] = useState<TaskRecord | null>(null);
  const [trainingTaskFailureDetail, setTrainingTaskFailureDetail] = useState("");
  const [modelTestRootInput, setModelTestRootInput] = useState(() => localStorage.getItem(LAST_MODEL_TEST_ROOT_KEY) ?? "");
  const [openedModelTestRoot, setOpenedModelTestRoot] = useState("");
  const [modelTestSnapshot, setModelTestSnapshot] = useState<ModelTestSnapshot | null>(null);
  const [modelTestSettingsDraft, setModelTestSettingsDraft] = useState<WorkspaceSettings | null>(null);
  const [modelTestGroupId, setModelTestGroupId] = useState("");
  const [modelTestCheckpointPath, setModelTestCheckpointPath] = useState("");
  const [modelTestFrameIds, setModelTestFrameIds] = useState<string[]>([]);
  const [modelTestFrameId, setModelTestFrameId] = useState("");
  const [modelTestPoints, setModelTestPoints] = useState<PointRecord[]>([]);
  const [modelTestBoxes, setModelTestBoxes] = useState<AnnotationBox[]>([]);
  const [modelTestInferenceMs, setModelTestInferenceMs] = useState<number | null>(null);
  const [isLoadingModelTestFrame, setIsLoadingModelTestFrame] = useState(false);
  const [isRunningModelTestInference, setIsRunningModelTestInference] = useState(false);
  const [coneColorRootInput, setConeColorRootInput] = useState(() => localStorage.getItem(LAST_CONE_COLOR_ROOT_KEY) ?? "");
  const [coneColorSnapshot, setConeColorSnapshot] = useState<ModelTestSnapshot | null>(null);
  const [coneColorSettingsDraft, setConeColorSettingsDraft] = useState<WorkspaceSettings | null>(null);
  const [coneColorGroupId, setConeColorGroupId] = useState("");
  const [coneColorCheckpointPath, setConeColorCheckpointPath] = useState("");
  const [coneColorFrameIds, setConeColorFrameIds] = useState<string[]>([]);
  const [coneColorFrameId, setConeColorFrameId] = useState("");
  const [coneColorPoints, setConeColorPoints] = useState<PointRecord[]>([]);
  const [coneColorRawBoxes, setConeColorRawBoxes] = useState<AnnotationBox[]>([]);
  const [coneColoredBoxes, setConeColoredBoxes] = useState<AnnotationBox[]>([]);
  const [coneColorInferMs, setConeColorInferMs] = useState<number | null>(null);
  const [isLoadingConeColorFrame, setIsLoadingConeColorFrame] = useState(false);
  const [isRunningConeColorInference, setIsRunningConeColorInference] = useState(false);
  const [appScreen, setAppScreen] = useState<AppScreen>("home");
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>("annotate");
  const [leftPanelTab, setLeftPanelTab] = useState<LeftPanelTab>("workspace");
  const [openedWorkspacePath, setOpenedWorkspacePath] = useState("");
  const [snapshot, setSnapshot] = useState<WorkspaceSnapshot | null>(null);
  const [frameData, setFrameData] = useState<FrameData | null>(null);
  const [currentFrameId, setCurrentFrameId] = useState<string | null>(null);
  const [selectedBoxIds, setSelectedBoxIds] = useState<string[]>([]);
  const [activeClassName, setActiveClassName] = useState("");
  const [frameFilter, setFrameFilter] = useState("");
  const [queueOnly, setQueueOnly] = useState(false);
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [classesDraft, setClassesDraft] = useState<ClassDefinition[]>(DEFAULT_CLASS_DEFINITIONS);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [classesDirty, setClassesDirty] = useState(false);
  const [settingsDraft, setSettingsDraft] = useState<WorkspaceSettings | null>(null);
  const [settingsDirty, setSettingsDirty] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isInferringCurrentFrame, setIsInferringCurrentFrame] = useState(false);
  const [inferCheckpointPath, setInferCheckpointPath] = useState("");
  const [inferScoreThreshold, setInferScoreThreshold] = useState<number | "">(0.05);
  const [pendingClassChoice, setPendingClassChoice] = useState<{ boxId: string; x: number; y: number } | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoadingWorkspace, setIsLoadingWorkspace] = useState(false);
  const [isLoadingFrame, setIsLoadingFrame] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [hoverWorld, setHoverWorld] = useState<[number, number, number] | null>(null);
  const handledTaskTerminalRef = useRef<string | null>(null);
  const handledPackageTaskTerminalRef = useRef<string | null>(null);
  const handledTrainingTaskTerminalRef = useRef<string | null>(null);
  // Tracks per-class counts of the last frame loaded from server, for incremental class_totals updates
  const loadedFrameClassCountsRef = useRef<Record<string, number>>({});

  const viewMode = "view3d" as const;
  const canEdit = workspaceMode === "annotate";
  const deferredPoints = useDeferredValue(frameData?.points ?? []);
  const availableClasses = useMemo(
    () => normalizeClassDefinitions(snapshot?.classes ?? []),
    [snapshot?.classes],
  );
  const allFrameIds = useMemo(() => snapshot?.frames.map((item) => item.frame_id) ?? [], [snapshot?.frames]);
  const currentFrameSummary = useMemo(
    () => snapshot?.frames.find((item) => item.frame_id === currentFrameId) ?? null,
    [currentFrameId, snapshot?.frames],
  );
  const activeClass = useMemo(
    () => availableClasses.find((item) => item.name === activeClassName) ?? availableClasses[0],
    [activeClassName, availableClasses],
  );
  const selectedDraftClass = useMemo(
    () => classesDraft.find((item) => item.id === selectedClassId) ?? classesDraft[0] ?? null,
    [classesDraft, selectedClassId],
  );
  const selectedGroup = useMemo(
    () => workspaceTarget?.groups.find((group) => group.group_id === selectedGroupId) ?? null,
    [selectedGroupId, workspaceTarget?.groups],
  );
  const modelTestTarget = useMemo(() => modelTestSnapshot?.target ?? null, [modelTestSnapshot?.target]);
  const modelTestSelectedSource = useMemo(() => {
    if (!modelTestTarget?.groups.length) {
      return null;
    }
    const multiGroup = modelTestTarget.kind === "group_root" || modelTestTarget.kind === "training_group_root";
    if (!multiGroup) {
      return modelTestTarget.groups[0];
    }
    return (
      modelTestTarget.groups.find((group) => group.group_id === modelTestGroupId) ??
      modelTestTarget.groups[0] ??
      null
    );
  }, [modelTestGroupId, modelTestTarget]);
  const modelTestSourcePath = modelTestSelectedSource?.source_path ?? "";
  const modelTestSourceKind = modelTestSelectedSource?.source_kind ?? null;
  const coneColorTarget = useMemo(() => coneColorSnapshot?.target ?? null, [coneColorSnapshot?.target]);
  const coneColorSelectedSource = useMemo(() => {
    if (!coneColorTarget?.groups.length) return null;
    const multiGroup = coneColorTarget.kind === "group_root" || coneColorTarget.kind === "training_group_root";
    if (!multiGroup) return coneColorTarget.groups[0];
    return coneColorTarget.groups.find((g) => g.group_id === coneColorGroupId) ?? coneColorTarget.groups[0] ?? null;
  }, [coneColorGroupId, coneColorTarget]);
  const coneColorSourcePath = coneColorSelectedSource?.source_path ?? "";
  const coneColorSourceKind = coneColorSelectedSource?.source_kind ?? null;
  const currentBoxes = frameData?.annotation.boxes ?? [];
  const selectedBoxes = useMemo(() => {
    if (!frameData) {
      return [];
    }
    return frameData.annotation.boxes.filter((item) => selectedBoxIds.includes(item.box_id));
  }, [frameData, selectedBoxIds]);
  const selectedTask = useMemo(
    () => snapshot?.tasks.find((task) => task.id === selectedTaskId) ?? null,
    [selectedTaskId, snapshot?.tasks],
  );
  const modelTestClasses = useMemo(
    () => buildModelTestClasses(modelTestBoxes),
    [modelTestBoxes],
  );
  const filteredFrames = useMemo(() => {
    if (!snapshot) {
      return [];
    }
    const sourceFrames =
      workspaceMode === "review"
        ? snapshot.frames.filter((frame) => frame.box_count > 0)
        : snapshot.frames;
    return sourceFrames.filter((frame) => {
      if (canEdit && queueOnly && frame.review_status !== "unreviewed") {
        return false;
      }
      if (!frameFilter.trim()) {
        return true;
      }
      return frame.frame_id.toLowerCase().includes(frameFilter.trim().toLowerCase());
    });
  }, [canEdit, frameFilter, queueOnly, snapshot, workspaceMode]);
  const navigationFrameIds = useMemo(
    () => filteredFrames.map((item) => item.frame_id),
    [filteredFrames],
  );
  const currentFrameIndex = currentFrameId ? navigationFrameIds.indexOf(currentFrameId) : -1;

  const reviewedCount = useMemo(
    () => snapshot?.frames.filter((item) => item.review_status === "reviewed").length ?? 0,
    [snapshot?.frames],
  );
  const unreviewedCount = useMemo(
    () => snapshot?.frames.filter((item) => item.review_status === "unreviewed").length ?? 0,
    [snapshot?.frames],
  );

  const pushNotice = useCallback((tone: NoticeTone, text: string) => {
    setNotice({ tone, text });
  }, []);

  const reportError = useCallback(
    (error: unknown) => {
      const text = error instanceof Error ? error.message : String(error);
      pushNotice("error", text);
    },
    [pushNotice],
  );

  const handleCopyToClipboard = useCallback(
    async (text: string, successMessage = "已复制") => {
      try {
        await copyTextToClipboard(text);
        pushNotice("success", successMessage);
      } catch {
        pushNotice("error", "复制失败");
      }
    },
    [pushNotice],
  );

  const resetLoadedWorkspace = useCallback((options: { clearGroup?: boolean } = {}) => {
    setOpenedWorkspacePath("");
    setSnapshot(null);
    setFrameData(null);
    setCurrentFrameId(null);
    setSelectedBoxIds([]);
    setPendingClassChoice(null);
    setIsDirty(false);
    setIsLoadingWorkspace(false);
    setIsLoadingFrame(false);
    setSelectedTaskId(null);
    setClassesDraft(DEFAULT_CLASS_DEFINITIONS);
    setSelectedClassId("");
    setClassesDirty(false);
    setSettingsDraft(null);
    setSettingsDirty(false);
    setRangeStart("");
    setRangeEnd("");
    if (options.clearGroup) {
      setSelectedGroupId("");
    }
  }, []);

  useEffect(() => {
    if (!notice) {
      return;
    }
    const timeoutMs = notice.tone === "error" ? 5200 : 2600;
    const timer = window.setTimeout(() => {
      setNotice((current) => (current === notice ? null : current));
    }, timeoutMs);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    if (!classesDraft.length) {
      setSelectedClassId("");
      return;
    }
    if (!classesDraft.some((item) => item.id === selectedClassId)) {
      setSelectedClassId(classesDraft[0].id);
    }
  }, [classesDraft, selectedClassId]);

  const handleWorkspaceInputChange = useCallback((value: string) => {
    setWorkspaceInput(value);
    setWorkspaceTarget(null);
    setSelectedGroupId("");
  }, []);

  const handlePackageOutputChange = useCallback((value: string) => {
    setPackageOutputInput(value);
    setPackageTargetInfo(null);
    setPackageTaskId(null);
    setPackageTask(null);
  }, []);

  const handleTrainingRootChange = useCallback((value: string) => {
    setTrainingRootInput(value);
    setTrainingTarget(null);
    setTrainingTaskFailureDetail("");
    if (openedTrainingRoot && value.trim() !== openedTrainingRoot) {
      setOpenedTrainingRoot("");
      setTrainingSnapshot(null);
      setTrainingSettingsDraft(null);
      setTrainingSettingsDirty(false);
      setTrainingTaskId(null);
      setTrainingTask(null);
    }
  }, [openedTrainingRoot]);

  const handleModelTestRootChange = useCallback((value: string) => {
    setModelTestRootInput(value);
    if (openedModelTestRoot && value.trim() !== openedModelTestRoot) {
      setOpenedModelTestRoot("");
      setModelTestSnapshot(null);
      setModelTestSettingsDraft(null);
      setModelTestGroupId("");
      setModelTestCheckpointPath("");
      setModelTestFrameIds([]);
      setModelTestFrameId("");
      setModelTestPoints([]);
      setModelTestBoxes([]);
      setModelTestInferenceMs(null);
    }
  }, [openedModelTestRoot]);

  const resolveWorkspaceSelection = useCallback(() => {
    const trimmed = workspaceInput.trim();
    if (!trimmed) {
      return "";
    }
    if (workspaceTarget?.kind === "group_root") {
      return selectedGroup?.workspace_path ?? "";
    }
    return trimmed;
  }, [selectedGroup?.workspace_path, workspaceInput, workspaceTarget?.kind]);

  const loadSnapshot = useCallback(
    async (workspacePath: string, resetEditors = false) => {
      if (!workspacePath.trim()) {
        return;
      }
      setIsLoadingWorkspace(true);
      try {
        const nextSnapshot = await openWorkspace(workspacePath);
        const normalizedClasses = normalizeClassDefinitions(nextSnapshot.classes);
        startTransition(() => {
          if (resetEditors || workspacePath !== openedWorkspacePath) {
            setPendingClassChoice(null);
          }
          setOpenedWorkspacePath(workspacePath);
          setSnapshot(nextSnapshot);
          const nextFrameIds = nextSnapshot.frames.map((item) => item.frame_id);
          const firstFrame = nextFrameIds[0] ?? null;
          setCurrentFrameId((prev) => (prev && nextFrameIds.includes(prev) ? prev : firstFrame));
          setRangeStart((prev) => (prev && nextFrameIds.includes(prev) ? prev : firstFrame ?? ""));
          setRangeEnd((prev) => {
            if (prev && nextFrameIds.includes(prev)) {
              return prev;
            }
            return nextFrameIds.length > 0 ? nextFrameIds[nextFrameIds.length - 1] : "";
          });
          if (resetEditors || !settingsDirty) {
            setSettingsDraft(nextSnapshot.settings);
            setSettingsDirty(false);
            setInferCheckpointPath((prev) => prev || nextSnapshot.settings.checkpoint_path || "");
            setInferScoreThreshold((prev) => prev !== "" ? prev : (nextSnapshot.settings.score_threshold ?? 0.05));
          }
          if (resetEditors || !classesDirty) {
            setClassesDraft(normalizedClasses);
            setSelectedClassId((prev) =>
              prev && normalizedClasses.some((item) => item.id === prev) ? prev : normalizedClasses[0]?.id ?? "",
            );
            setClassesDirty(false);
          }
          if (!activeClassName || !normalizedClasses.some((item) => item.name === activeClassName)) {
            setActiveClassName(normalizedClasses[0]?.name ?? "");
          }
          if (selectedTaskId && !nextSnapshot.tasks.some((task) => task.id === selectedTaskId)) {
            setSelectedTaskId(nextSnapshot.tasks[0]?.id ?? null);
          }
        });
      } finally {
        setIsLoadingWorkspace(false);
      }
    },
    [activeClassName, classesDirty, openedWorkspacePath, selectedTaskId, settingsDirty],
  );

  const loadTrainingSnapshot = useCallback(
    async (rootPath: string, resetEditors = false) => {
      const trimmed = rootPath.trim();
      if (!trimmed) {
        return;
      }
      const nextSnapshot = await openTrainingRoot(trimmed);
      startTransition(() => {
        setOpenedTrainingRoot(nextSnapshot.root_path);
        setTrainingSnapshot(nextSnapshot);
        setTrainingTarget(nextSnapshot.target);
        if (resetEditors || !trainingSettingsDirty) {
          setTrainingSettingsDraft(nextSnapshot.settings);
          setTrainingSettingsDirty(false);
        }
        const activeTask = nextSnapshot.tasks.find((task) => task.kind === "train_openpcdet" && isTaskActive(task)) ?? null;
        // Only restore a pinned task if it is still active — completed tasks are not auto-restored
        // so that coming back to the training page always starts with a clean slate.
        const pinnedTask = trainingTaskId
          ? nextSnapshot.tasks.find((task) => task.id === trainingTaskId && isTaskActive(task)) ?? null
          : null;
        const nextTaskId = (pinnedTask ?? activeTask)?.id ?? null;
        setTrainingTaskId(nextTaskId);
        setTrainingTask(nextTaskId ? nextSnapshot.tasks.find((task) => task.id === nextTaskId) ?? null : null);
      });
    },
    [trainingSettingsDirty, trainingTaskId],
  );

  const loadModelTestSnapshot = useCallback(async (rootPath: string) => {
    const trimmed = rootPath.trim();
    if (!trimmed) {
      return;
    }
    const nextSnapshot = await openModelTestRoot(trimmed);
    startTransition(() => {
      setOpenedModelTestRoot(nextSnapshot.root_path);
      setModelTestSnapshot(nextSnapshot);
      setModelTestSettingsDraft(nextSnapshot.settings);
    });
  }, []);

  useEffect(() => {
    if (!modelTestTarget) {
      setModelTestGroupId("");
      setModelTestFrameIds([]);
      setModelTestFrameId("");
      setModelTestPoints([]);
      setModelTestBoxes([]);
      setModelTestInferenceMs(null);
      return;
    }
    if (modelTestTarget.kind === "group_root" || modelTestTarget.kind === "training_group_root") {
      const nextGroupId = modelTestTarget.groups.some((group) => group.group_id === modelTestGroupId)
        ? modelTestGroupId
        : modelTestTarget.groups[0]?.group_id ?? "";
      if (nextGroupId !== modelTestGroupId) {
        setModelTestGroupId(nextGroupId);
      }
    } else if (modelTestGroupId) {
      setModelTestGroupId("");
    }
  }, [modelTestGroupId, modelTestTarget]);

  useEffect(() => {
    const preferredCheckpoint =
      modelTestSettingsDraft?.checkpoint_path?.trim() ||
      modelTestSnapshot?.checkpoint_candidates?.[0] ||
      "";
    if (!modelTestSnapshot?.root_path) {
      return;
    }
    setModelTestCheckpointPath(preferredCheckpoint);
    setModelTestBoxes([]);
    setModelTestInferenceMs(null);
  }, [modelTestSettingsDraft?.checkpoint_path, modelTestSnapshot?.checkpoint_candidates, modelTestSnapshot?.root_path]);

  useEffect(() => {
    if (!modelTestSourcePath || !modelTestSourceKind) {
      setModelTestFrameIds([]);
      setModelTestFrameId("");
      setModelTestPoints([]);
      setModelTestBoxes([]);
      setModelTestInferenceMs(null);
      return;
    }
    let cancelled = false;
    void listModelTestFrames(modelTestSourcePath, modelTestSourceKind)
      .then((frameIds) => {
        if (cancelled) {
          return;
        }
        startTransition(() => {
          setModelTestFrameIds(frameIds);
          setModelTestFrameId((current) => (current && frameIds.includes(current) ? current : frameIds[0] ?? ""));
          setModelTestPoints([]);
          setModelTestBoxes([]);
          setModelTestInferenceMs(null);
        });
      })
      .catch(reportError);
    return () => {
      cancelled = true;
    };
  }, [modelTestSourceKind, modelTestSourcePath, reportError]);

  useEffect(() => {
    if (!modelTestSourcePath || !modelTestSourceKind || !modelTestFrameId) {
      setModelTestPoints([]);
      setModelTestBoxes([]);
      setModelTestInferenceMs(null);
      setIsLoadingModelTestFrame(false);
      return;
    }
    let cancelled = false;
    setIsLoadingModelTestFrame(true);
    setModelTestBoxes([]);
    setModelTestInferenceMs(null);
    void loadModelTestFrame(modelTestSourcePath, modelTestSourceKind, modelTestFrameId, FRAME_POINT_LIMIT, DEFAULT_VIEW_RANGE)
      .then((frame) => {
        if (!cancelled) {
          startTransition(() => {
            setModelTestPoints(frame.points);
          });
        }
      })
      .catch(reportError)
      .finally(() => {
        if (!cancelled) {
          setIsLoadingModelTestFrame(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [modelTestFrameId, modelTestSourceKind, modelTestSourcePath, reportError]);

  useEffect(() => {
    if (!coneColorTarget) return;
    const multiGroup = coneColorTarget.kind === "group_root" || coneColorTarget.kind === "training_group_root";
    if (multiGroup) {
      const nextId = coneColorTarget.groups.some((g) => g.group_id === coneColorGroupId)
        ? coneColorGroupId
        : coneColorTarget.groups[0]?.group_id ?? "";
      if (nextId !== coneColorGroupId) setConeColorGroupId(nextId);
    } else if (coneColorGroupId) {
      setConeColorGroupId("");
    }
  }, [coneColorGroupId, coneColorTarget]);

  useEffect(() => {
    if (!coneColorSourcePath || !coneColorSourceKind) {
      setConeColorFrameIds([]);
      setConeColorFrameId("");
      setConeColorPoints([]);
      setConeColorRawBoxes([]);
      setConeColoredBoxes([]);
      return;
    }
    let cancelled = false;
    void listModelTestFrames(coneColorSourcePath, coneColorSourceKind)
      .then((ids) => {
        if (cancelled) return;
        setConeColorFrameIds(ids);
        setConeColorFrameId((prev) => (ids.includes(prev) ? prev : ids[0] ?? ""));
      })
      .catch(reportError);
    return () => { cancelled = true; };
  }, [coneColorSourceKind, coneColorSourcePath, reportError]);

  useEffect(() => {
    if (!coneColorSourcePath || !coneColorSourceKind || !coneColorFrameId) {
      setConeColorPoints([]);
      setConeColorRawBoxes([]);
      setConeColoredBoxes([]);
      setIsLoadingConeColorFrame(false);
      return;
    }
    let cancelled = false;
    setIsLoadingConeColorFrame(true);
    setConeColorRawBoxes([]);
    setConeColoredBoxes([]);
    void loadModelTestFrame(coneColorSourcePath, coneColorSourceKind, coneColorFrameId, FRAME_POINT_LIMIT, DEFAULT_VIEW_RANGE)
      .then((frame) => {
        if (!cancelled) startTransition(() => setConeColorPoints(frame.points));
      })
      .catch(reportError)
      .finally(() => { if (!cancelled) setIsLoadingConeColorFrame(false); });
    return () => { cancelled = true; };
  }, [coneColorFrameId, coneColorSourceKind, coneColorSourcePath, reportError]);

  useEffect(() => {
    const trimmed = workspaceInput.trim();
    if (!trimmed) {
      setWorkspaceTarget(null);
      setSelectedGroupId("");
      return;
    }
    let cancelled = false;
    const timer = window.setTimeout(() => {
      void inspectWorkspaceTarget(trimmed)
        .then((target) => {
          if (cancelled) {
            return;
          }
          startTransition(() => {
            setWorkspaceTarget(target);
            if (target.kind === "group_root") {
              const nextGroupId = target.groups.some((group) => group.group_id === selectedGroupId)
                ? selectedGroupId
                : "";
              setSelectedGroupId(nextGroupId);
            } else if (selectedGroupId) {
              setSelectedGroupId("");
            }
          });
        })
        .catch(() => {
          if (!cancelled) {
            setWorkspaceTarget({ kind: "unknown", path: trimmed, groups: [] });
          }
        });
    }, 220);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [selectedGroupId, workspaceInput]);

  // Refresh workspace target stats when the export tab becomes active
  useEffect(() => {
    if (leftPanelTab !== "export") return;
    const trimmed = workspaceInput.trim();
    if (!trimmed) return;
    void inspectWorkspaceTarget(trimmed)
      .then((target) => {
        startTransition(() => { setWorkspaceTarget(target); });
      })
      .catch(() => {});
  }, [leftPanelTab, workspaceInput]);

  useEffect(() => {
    const trimmed = packageOutputInput.trim();
    if (!trimmed) {
      setPackageTargetInfo(null);
      return;
    }
    let cancelled = false;
    const inspect = () => {
      void inspectWorkspaceTarget(trimmed)
        .then((target) => {
          if (!cancelled) {
            setPackageTargetInfo(target);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setPackageTargetInfo({ kind: "unknown", path: trimmed, groups: [] });
          }
        });
    };
    inspect();
    const timer = window.setInterval(inspect, appScreen === "package" ? 2500 : 6000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [appScreen, packageOutputInput]);

  useEffect(() => {
    const trimmed = trainingRootInput.trim();
    if (!trimmed) {
      setTrainingTarget(null);
      return;
    }
    let cancelled = false;
    const timer = window.setTimeout(() => {
      void inspectTrainingTarget(trimmed)
        .then((target) => {
          if (!cancelled) {
            setTrainingTarget(target);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setTrainingTarget({ kind: "unknown", path: trimmed, groups: [], frame_count: 0, train_count: 0, val_count: 0 });
          }
        });
    }, 220);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [trainingRootInput]);

  useEffect(() => {
    const trimmed = packageOutputInput.trim();
    if (appScreen !== "package" || !trimmed) {
      return;
    }
    let cancelled = false;
    const pollTasks = () => {
      void listTasks(trimmed)
        .then((tasks) => {
          if (cancelled) {
            return;
          }
          const exactMatch = packageTaskId ? tasks.find((task) => task.id === packageTaskId) ?? null : null;
          const runningTask =
            tasks.find((task) => task.kind === "package_groups" && (task.status === "pending" || task.status === "running")) ?? null;
          const nextTask = exactMatch ?? runningTask;
          startTransition(() => {
            setPackageTask(nextTask);
            if (!packageTaskId && runningTask) {
              setPackageTaskId(runningTask.id);
            }
          });
        })
        .catch(() => {
          if (!cancelled && packageTaskId) {
            setPackageTask(null);
          }
        });
    };
    pollTasks();
    const timer = window.setInterval(pollTasks, 1200);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [appScreen, packageOutputInput, packageTaskId]);

  useEffect(() => {
    const trimmed = openedTrainingRoot || trainingRootInput.trim();
    if (appScreen !== "training" || !trimmed) {
      return;
    }
    let cancelled = false;
    const pollTasks = () => {
      void listTasks(trimmed)
        .then((tasks) => {
          if (cancelled) {
            return;
          }
          const exactMatch = trainingTaskId ? tasks.find((task) => task.id === trainingTaskId) ?? null : null;
          const activeTask = tasks.find((task) => task.kind === "train_openpcdet" && isTaskActive(task)) ?? null;
          const nextTask = exactMatch ?? activeTask;
          startTransition(() => {
            setTrainingTask(nextTask);
            if (!trainingTaskId && nextTask) {
              setTrainingTaskId(nextTask.id);
            }
          });
        })
        .catch(() => {
          if (!cancelled && trainingTaskId) {
            setTrainingTask(null);
          }
        });
    };
    pollTasks();
    const timer = window.setInterval(pollTasks, 1200);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [appScreen, openedTrainingRoot, trainingRootInput, trainingTaskId]);

  useEffect(() => {
    if (!openedWorkspacePath) {
      return;
    }
    const interval = window.setInterval(() => {
      void loadSnapshot(openedWorkspacePath, false).catch(reportError);
    }, 3500);
    return () => window.clearInterval(interval);
  }, [loadSnapshot, openedWorkspacePath, reportError]);

  useEffect(() => {
    if (appScreen !== "training" || !openedTrainingRoot) {
      return;
    }
    const interval = window.setInterval(() => {
      void loadTrainingSnapshot(openedTrainingRoot, false).catch(reportError);
    }, 3500);
    return () => window.clearInterval(interval);
  }, [appScreen, loadTrainingSnapshot, openedTrainingRoot, reportError]);

  useEffect(() => {
    if (appScreen !== "workspace") {
      return;
    }
    if (filteredFrames.length === 0) {
      if (workspaceMode === "review") {
        setCurrentFrameId(null);
      }
      return;
    }
    if (!currentFrameId || !filteredFrames.some((frame) => frame.frame_id === currentFrameId)) {
      setCurrentFrameId(filteredFrames[0].frame_id);
    }
  }, [appScreen, currentFrameId, filteredFrames, workspaceMode]);

  useEffect(() => {
    if (!openedWorkspacePath || !currentFrameId) {
      setFrameData(null);
      setIsLoadingFrame(false);
      return;
    }
    let cancelled = false;
    setIsLoadingFrame(true);
    void loadFrame(openedWorkspacePath, currentFrameId, FRAME_POINT_LIMIT, DEFAULT_VIEW_RANGE)
      .then((data) => {
        if (cancelled) {
          return;
        }
        startTransition(() => {
          setFrameData(data);
          loadedFrameClassCountsRef.current = countBoxClasses(data.annotation.boxes);
          setSelectedBoxIds([]);
          setIsDirty(false);
        });
      })
      .catch(reportError)
      .finally(() => {
        if (!cancelled) {
          setIsLoadingFrame(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [currentFrameId, openedWorkspacePath, reportError]);

  useEffect(() => {
    if (!selectedTask?.id || !selectedTask.finished_at_ms) {
      return;
    }
    const marker = `${selectedTask.id}:${selectedTask.status}:${selectedTask.finished_at_ms}`;
    if (handledTaskTerminalRef.current === marker) {
      return;
    }
    handledTaskTerminalRef.current = marker;

    if (selectedTask.kind === "extract_pcd") {
      if (selectedTask.status === "succeeded") {
        pushNotice("success", `extract finished: ${selectedTask.id}`);
        const workspacePath = openedWorkspacePath || workspaceInput.trim();
        if (workspacePath) {
          void loadSnapshot(workspacePath, false).catch(reportError);
        }
      } else if (selectedTask.status === "failed") {
        pushNotice("error", selectedTask.error || `extract failed: ${selectedTask.id}`);
      }
      return;
    }

    if (selectedTask.kind === "package_groups") {
      if (selectedTask.status === "succeeded") {
        pushNotice("success", `分包完成: ${selectedTask.id}`);
      } else if (selectedTask.status === "failed") {
        pushNotice("error", selectedTask.error || `package failed: ${selectedTask.id}`);
      }
      return;
    }

    if (selectedTask.status === "failed") {
      pushNotice("error", selectedTask.error || `${selectedTask.kind} failed`);
    }
  }, [
    loadSnapshot,
    openedWorkspacePath,
    pushNotice,
    reportError,
    selectedTask?.error,
    selectedTask?.finished_at_ms,
    selectedTask?.id,
    selectedTask?.kind,
    selectedTask?.status,
    workspaceInput,
  ]);

  useEffect(() => {
    if (!packageTask?.id || !packageTask.finished_at_ms) {
      return;
    }
    const marker = `${packageTask.id}:${packageTask.status}:${packageTask.finished_at_ms}`;
    if (handledPackageTaskTerminalRef.current === marker) {
      return;
    }
    handledPackageTaskTerminalRef.current = marker;
    if (packageTask.status === "succeeded") {
      pushNotice("success", "分包完成");
      const trimmed = packageOutputInput.trim();
      if (trimmed) {
        void inspectWorkspaceTarget(trimmed)
          .then((target) => {
            startTransition(() => {
              setWorkspaceInput(trimmed);
              setWorkspaceTarget(target);
              setSelectedGroupId("");
              setPackageTargetInfo(target);
            });
          })
          .catch(() => {});
      }
      return;
    }
    if (packageTask.status === "failed") {
      pushNotice("error", packageTask.error || "分包失败");
    }
  }, [packageOutputInput, packageTask?.error, packageTask?.finished_at_ms, packageTask?.id, packageTask?.status, pushNotice]);

  useEffect(() => {
    if (!trainingTask?.id || !trainingTask.finished_at_ms) {
      return;
    }
    const marker = `${trainingTask.id}:${trainingTask.status}:${trainingTask.finished_at_ms}`;
    if (handledTrainingTaskTerminalRef.current === marker) {
      return;
    }
    handledTrainingTaskTerminalRef.current = marker;
    if (trainingTask.status === "succeeded") {
      pushNotice("success", "OpenPCDet 训练完成");
      if (openedTrainingRoot) {
        void loadTrainingSnapshot(openedTrainingRoot, true).catch(reportError);
      }
      return;
    }
    if (trainingTask.status === "failed") {
      pushNotice("error", trainingTask.error || "OpenPCDet 训练失败");
      return;
    }
    if (trainingTask.status === "cancelled") {
      pushNotice("info", trainingTask.error || "OpenPCDet 训练已停止");
    }
  }, [
    loadTrainingSnapshot,
    openedTrainingRoot,
    pushNotice,
    reportError,
    trainingTask?.error,
    trainingTask?.finished_at_ms,
    trainingTask?.id,
    trainingTask?.status,
  ]);

  useEffect(() => {
    if (!trainingTask?.id || trainingTask.status !== "failed") {
      setTrainingTaskFailureDetail("");
      return;
    }
    const fallbackDetail = getTaskFailureDetail(trainingTask) || trainingTask.error || "OpenPCDet 训练失败";
    setTrainingTaskFailureDetail(fallbackDetail);
    let cancelled = false;
    void readTaskLog(trainingTask.log_path)
      .then((logText) => {
        if (!cancelled) {
          setTrainingTaskFailureDetail(formatTaskFailureLog(logText, fallbackDetail));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTrainingTaskFailureDetail(fallbackDetail);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [trainingTask?.error, trainingTask?.id, trainingTask?.log_path, trainingTask?.status]);

  useEffect(() => {
    if (!openedWorkspacePath || !currentFrameId || isDirty || !currentFrameSummary) {
      return;
    }
    let cancelled = false;
    void loadFrame(openedWorkspacePath, currentFrameId, FRAME_POINT_LIMIT, DEFAULT_VIEW_RANGE)
      .then((data) => {
        if (!cancelled) {
          startTransition(() => {
            setFrameData(data);
            setSelectedBoxIds((prev) =>
              prev.filter((boxId) => data.annotation.boxes.some((box) => box.box_id === boxId)),
            );
          });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [
    currentFrameId,
    currentFrameSummary?.box_count,
    currentFrameSummary?.review_status,
    currentFrameSummary?.source,
    isDirty,
    openedWorkspacePath,
  ]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (appScreen !== "workspace") {
        return;
      }
      const target = event.target as HTMLElement | null;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement;
      if (canEdit && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        void handleSave().catch(reportError);
        return;
      }
      if (typing) {
        return;
      }
      if (canEdit && (event.key === "Delete" || event.key === "Backspace")) {
        event.preventDefault();
        deleteSelectedBoxes();
        return;
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        moveFrameBy(-1);
        return;
      }
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        moveFrameBy(1);
        return;
      }
      if (canEdit && event.key.toLowerCase() === "q") {
        event.preventDefault();
        rotateSelected(-0.08);
        return;
      }
      if (canEdit && event.key.toLowerCase() === "e") {
        event.preventDefault();
        rotateSelected(0.08);
        return;
      }
      if (canEdit && /^[1-9]$/.test(event.key)) {
        const index = Number.parseInt(event.key, 10) - 1;
        const nextClass = availableClasses[index];
        if (!nextClass) {
          return;
        }
        setActiveClassName(nextClass.name);
        if (selectedBoxIds.length > 0) {
          setSelectedBoxesClass(nextClass.name);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [appScreen, availableClasses, canEdit, selectedBoxIds.length]);

  const updateAnnotation = useCallback(
    (mutator: (draft: FrameAnnotation) => void, forceManualSource: boolean) => {
      setFrameData((current) => {
        if (!current) {
          return current;
        }
        const nextAnnotation = cloneAnnotation(current.annotation);
        mutator(nextAnnotation);
        if (forceManualSource) {
          nextAnnotation.source = "manual";
        }
        nextAnnotation.updated_at_ms = Date.now();
        return { ...current, annotation: nextAnnotation };
      });
      setIsDirty(true);
    },
    [],
  );

  const createBoxAt = useCallback(
    (center: [number, number, number], placement?: { x: number; y: number }) => {
      if (!frameData || !activeClass) {
        return;
      }
      if (!isFiniteVector3(center) || Math.abs(center[0]) > 500 || Math.abs(center[1]) > 500) {
        pushNotice("error", "3D create failed: invalid pick position");
        return;
      }
      const defaultSize = [...activeClass.default_size] as [number, number, number];
      const suggestion = suggestBoxFromPointCluster(frameData.points, center, defaultSize);
      const fallbackCenterZ = estimateCenterZ(frameData.points, center[0], center[1], defaultSize[2]);
      const nextCenter = suggestion?.center_xyz ?? [center[0], center[1], fallbackCenterZ] as [number, number, number];
      const nextSize = suggestion?.size_lwh ?? defaultSize;
      const nextYaw = suggestion?.yaw ?? 0;
      if (!isFiniteVector3(nextCenter)) {
        pushNotice("error", "box center z is invalid");
        return;
      }
      const boxId = `${frameData.frame_id}_${Date.now()}`;
      updateAnnotation((draft) => {
        draft.boxes.push({
          box_id: boxId,
          class_name: activeClass.name,
          center_xyz: nextCenter,
          size_lwh: nextSize,
          yaw: nextYaw,
          score: null,
        });
      }, true);
      setPendingClassChoice({
        boxId,
        x: placement?.x ?? 24,
        y: placement?.y ?? 24,
      });
    },
    [activeClass, frameData, updateAnnotation],
  );

  const handleChoosePendingClass = useCallback(
    (className: string) => {
      if (!pendingClassChoice) {
        return;
      }
      setActiveClassName(className);
      updateAnnotation((draft) => {
        draft.boxes = draft.boxes.map((box) =>
          box.box_id === pendingClassChoice.boxId ? { ...box, class_name: className } : box,
        );
      }, true);
      setSelectedBoxIds([pendingClassChoice.boxId]);
      setPendingClassChoice(null);
    },
    [pendingClassChoice, updateAnnotation],
  );

  const dismissPendingClassChoice = useCallback(() => {
    setPendingClassChoice(null);
  }, []);

  const moveSelectedBoxes = useCallback(
    (dx: number, dy: number) => {
      if (!selectedBoxIds.length) {
        return;
      }
      updateAnnotation((draft) => {
        draft.boxes = draft.boxes.map((box) =>
          selectedBoxIds.includes(box.box_id)
            ? {
                ...box,
                center_xyz: [box.center_xyz[0] + dx, box.center_xyz[1] + dy, box.center_xyz[2]],
              }
            : box,
        );
      }, true);
    },
    [selectedBoxIds, updateAnnotation],
  );

  const rotateSelected = useCallback(
    (deltaYaw: number) => {
      if (!selectedBoxIds.length) {
        return;
      }
      updateAnnotation((draft) => {
        draft.boxes = draft.boxes.map((box) =>
          selectedBoxIds.includes(box.box_id) ? { ...box, yaw: normalizeYaw(box.yaw + deltaYaw) } : box,
        );
      }, true);
    },
    [selectedBoxIds, updateAnnotation],
  );

  const deleteSelectedBoxes = useCallback(() => {
    if (!selectedBoxIds.length) {
      return;
    }
    updateAnnotation((draft) => {
      draft.boxes = draft.boxes.filter((box) => !selectedBoxIds.includes(box.box_id));
    }, true);
    setPendingClassChoice((current) => (current && selectedBoxIds.includes(current.boxId) ? null : current));
    setSelectedBoxIds([]);
  }, [selectedBoxIds, updateAnnotation]);

  const deleteSingleBox = useCallback(
    (boxId: string) => {
      updateAnnotation((draft) => {
        draft.boxes = draft.boxes.filter((box) => box.box_id !== boxId);
      }, true);
      setPendingClassChoice((current) => (current?.boxId === boxId ? null : current));
      setSelectedBoxIds((current) => current.filter((item) => item !== boxId));
    },
    [updateAnnotation],
  );

  const handleSelectBoxes = useCallback((boxIds: string[]) => {
    setSelectedBoxIds(boxIds);
    setPendingClassChoice((current) => {
      if (!current) {
        return current;
      }
      return boxIds.includes(current.boxId) ? current : null;
    });
  }, []);

  const setSelectedBoxesClass = useCallback(
    (className: string) => {
      updateAnnotation((draft) => {
        draft.boxes = draft.boxes.map((box) =>
          selectedBoxIds.includes(box.box_id) ? { ...box, class_name: className } : box,
        );
      }, true);
    },
    [selectedBoxIds, updateAnnotation],
  );

  const patchSelectedBox = useCallback(
    (field: keyof AnnotationBox, value: AnnotationBox[keyof AnnotationBox], axis?: number) => {
      if (!selectedBoxes[0]) {
        return;
      }
      const targetId = selectedBoxes[0].box_id;
      if (field === "class_name") {
        setPendingClassChoice((current) => (current?.boxId === targetId ? null : current));
      }
      updateAnnotation((draft) => {
        draft.boxes = draft.boxes.map((box) => {
          if (box.box_id !== targetId) {
            return box;
          }
          if (field === "center_xyz" || field === "size_lwh") {
            const next = [...box[field]] as [number, number, number];
            if (axis != null) {
              next[axis] = Number(value);
            }
            return { ...box, [field]: next };
          }
          return { ...box, [field]: value };
        });
      }, field !== "score");
    },
    [selectedBoxes, updateAnnotation],
  );

  const patchReviewStatus = useCallback(
    (reviewStatus: ReviewStatus) => {
      updateAnnotation((draft) => {
        draft.review_status = reviewStatus;
      }, false);
    },
    [updateAnnotation],
  );

  const persistCurrentFrame = useCallback(async () => {
    if (!openedWorkspacePath || !frameData) {
      return false;
    }
    const oldCounts = loadedFrameClassCountsRef.current;
    const newCounts = countBoxClasses(frameData.annotation.boxes);
    const summary = await saveAnnotation(openedWorkspacePath, {
      ...frameData.annotation,
      updated_at_ms: Date.now(),
    });
    loadedFrameClassCountsRef.current = newCounts;
    setSnapshot((current) => {
      if (!current) return current;
      const updatedTotals = { ...current.class_totals };
      for (const [cls, cnt] of Object.entries(oldCounts)) {
        updatedTotals[cls] = (updatedTotals[cls] ?? 0) - cnt;
        if ((updatedTotals[cls] ?? 0) <= 0) delete updatedTotals[cls];
      }
      for (const [cls, cnt] of Object.entries(newCounts)) {
        updatedTotals[cls] = (updatedTotals[cls] ?? 0) + cnt;
      }
      return applyFrameSummary({ ...current, class_totals: updatedTotals }, summary);
    });
    setIsDirty(false);
    return true;
  }, [frameData, openedWorkspacePath]);

  const handleEnterMode = async (mode: WorkspaceMode) => {
    resetLoadedWorkspace({ clearGroup: workspaceTarget?.kind === "group_root" });
    setWorkspaceMode(mode);
    setLeftPanelTab("workspace");
    if (workspaceInput.trim()) {
      localStorage.setItem(LAST_WORKSPACE_KEY, workspaceInput.trim());
    }
    setAppScreen("workspace");
  };

  const handleOpenWorkspace = async () => {
    try {
      const selectedPath = resolveWorkspaceSelection();
      if (!selectedPath) {
        pushNotice("error", "workspace path is empty");
        return;
      }
      if (workspaceTarget?.kind === "group_root" && !selectedGroup) {
        pushNotice("error", "请选择要打开的分组");
        return;
      }
      localStorage.setItem(LAST_WORKSPACE_KEY, workspaceInput.trim());
      await loadSnapshot(selectedPath, true);
      setLeftPanelTab("frames");
      setAppScreen("workspace");
      pushNotice("success", `workspace ready: ${selectedPath}`);
    } catch (error) {
      reportError(error);
    }
  };

  const handlePickWorkspace = async () => {
    try {
      const selected = await pickDirectory(workspaceInput || openedWorkspacePath || null);
      if (!selected) {
        return;
      }
      setWorkspaceInput(selected);
      pushNotice("info", `workspace selected: ${selected}`);
    } catch (error) {
      reportError(error);
    }
  };

  const handlePickExportRoot = async () => {
    try {
      const selected = await pickDirectory(exportInput || null);
      if (!selected) {
        return;
      }
      setExportInput(selected);
      localStorage.setItem(LAST_EXPORT_KEY, selected);
      pushNotice("info", `export root selected: ${selected}`);
    } catch (error) {
      reportError(error);
    }
  };

  const handlePickPackageBag = async () => {
    try {
      const selected = await pickRosbagDirectory(packageBagInput || null);
      if (!selected) {
        return;
      }
      setPackageBagInput(selected);
      pushNotice("info", `ros2 bag selected: ${selected}`);
    } catch (error) {
      reportError(error);
    }
  };

  const handlePickPackageOutput = async () => {
    try {
      const selected = await pickDirectory(packageOutputInput || null);
      if (!selected) {
        return;
      }
      setPackageOutputInput(selected);
      pushNotice("info", `package output selected: ${selected}`);
    } catch (error) {
      reportError(error);
    }
  };

  const handlePickTrainingRoot = async () => {
    try {
      const selected = await pickDirectory(trainingRootInput || openedTrainingRoot || null);
      if (!selected) {
        return;
      }
      handleTrainingRootChange(selected);
      localStorage.setItem(LAST_TRAINING_ROOT_KEY, selected);
      pushNotice("info", `训练数据目录已选择: ${selected}`);
    } catch (error) {
      reportError(error);
    }
  };

  const handlePickModelTestRoot = async () => {
    try {
      const selected = await pickDirectory(modelTestRootInput || openedModelTestRoot || null);
      if (!selected) {
        return;
      }
      handleModelTestRootChange(selected);
      localStorage.setItem(LAST_MODEL_TEST_ROOT_KEY, selected);
      pushNotice("info", `模型测试目录已选择: ${selected}`);
    } catch (error) {
      reportError(error);
    }
  };

  const handleEnterPackager = useCallback(() => {
    setAppScreen("package");
  }, []);

  const handleEnterTraining = useCallback(() => {
    setAppScreen("training");
  }, []);

  const handleEnterModelTest = useCallback(() => {
    setAppScreen("model_test");
  }, []);

  const handleEnterConeColor = useCallback(() => {
    setAppScreen("cone_color");
  }, []);

  const handleBackFromConeColor = useCallback(() => {
    setAppScreen("home");
  }, []);

  const handleOpenConeColorRoot = async () => {
    const path = coneColorRootInput.trim();
    if (!path) { pushNotice("error", "请输入数据目录"); return; }
    try {
      const snap = await openModelTestRoot(path);
      setConeColorSnapshot(snap);
      setConeColorSettingsDraft(snap.settings);
      localStorage.setItem(LAST_CONE_COLOR_ROOT_KEY, path);
      const cands = snap.checkpoint_candidates;
      if (cands.length > 0) setConeColorCheckpointPath(cands[cands.length - 1]);
    } catch (e) { reportError(e); }
  };

  const handleRunConeColorInference = async () => {
    if (!coneColorSourcePath || !coneColorSourceKind || !coneColorFrameId || !coneColorCheckpointPath.trim()) return;
    const settings = coneColorSettingsDraft;
    if (!settings?.model_config_path) { pushNotice("error", "请配置 Model Config 路径"); return; }
    setIsRunningConeColorInference(true);
    setConeColorRawBoxes([]);
    setConeColoredBoxes([]);
    try {
      const result = await inferModelTestFrame({
        sourcePath: coneColorSourcePath,
        sourceKind: coneColorSourceKind,
        frameId: coneColorFrameId,
        checkpointPath: coneColorCheckpointPath,
        modelConfigPath: settings.model_config_path,
        openpcdetRoot: settings.openpcdet_root,
        pythonBin: settings.python_bin,
        scoreThreshold: settings.score_threshold,
      });
      setConeColorRawBoxes(normalizeInferenceBoxes(result));
      setConeColorInferMs(typeof result.inference_ms === "number" ? result.inference_ms : null);
      pushNotice("success", `推理完成：${result.boxes.length} 个 Cone，点击「计算红蓝」分类`);
    } catch (e) { reportError(e); } finally { setIsRunningConeColorInference(false); }
  };

  const handleClassifyConeColors = () => {
    if (!coneColorPoints.length || !coneColorRawBoxes.length) return;
    const colored = classifyConeColors(coneColorPoints, coneColorRawBoxes);
    setConeColoredBoxes(colored);
    const red = colored.filter((b) => b.class_name === "RedCone").length;
    const blue = colored.filter((b) => b.class_name === "BlueCone").length;
    pushNotice("success", `颜色分类完成：红 ${red} / 蓝 ${blue}`);
  };

  const handleBackFromPackager = useCallback(() => {
    const trimmed = packageOutputInput.trim();
    if (trimmed) {
      setWorkspaceInput(trimmed);
      setSelectedGroupId("");
      setWorkspaceTarget(packageTargetInfo);
    }
    setAppScreen("home");
  }, [packageOutputInput, packageTargetInfo]);

  const handleBackFromTraining = useCallback(() => {
    setAppScreen("home");
    setTrainingTaskId(null);
    setTrainingTask(null);
    setTrainingTaskFailureDetail("");
  }, []);

  const handleBackFromModelTest = useCallback(() => {
    setAppScreen("home");
  }, []);

  const handleEnterGroupFromPackage = useCallback(
    async (mode: WorkspaceMode, workspaceRootPath: string, groupId: string, _groupWorkspacePath: string) => {
      resetLoadedWorkspace();
      setWorkspaceInput(workspaceRootPath);
      setSelectedGroupId(groupId);
      setWorkspaceTarget(packageTargetInfo);
      setWorkspaceMode(mode);
      setLeftPanelTab("workspace");
      localStorage.setItem(LAST_WORKSPACE_KEY, workspaceRootPath);
      setAppScreen("workspace");
      pushNotice("info", `已选择 ${groupId}，点击“打开”后载入`);
    },
    [packageTargetInfo, pushNotice, resetLoadedWorkspace],
  );

  const handleSave = async () => {
    if (!canEdit || !openedWorkspacePath || !frameData) {
      return;
    }
    try {
      const persisted = await persistCurrentFrame();
      if (persisted) {
        setPendingClassChoice(null);
        pushNotice("success", `saved ${frameData.frame_id}`);
      }
    } catch (error) {
      reportError(error);
    }
  };

  const handlePackageGroups = async () => {
    try {
      if (!packageOutputInput.trim()) {
        pushNotice("error", "请先设置分包保存目录");
        return;
      }
      if (!packageBagInput.trim()) {
        pushNotice("error", "bag path is empty");
        return;
      }
      let replaceExisting = true;
      if (packageTargetInfo?.kind === "group_root" && packageTargetInfo.groups.length > 0) {
        const nextGroupId = getNextGroupId(packageTargetInfo.groups);
        replaceExisting = window.confirm(
          `检测到目标目录里已有 ${packageTargetInfo.groups.length} 组分包。\n\n` +
            "点击“确定”会删除旧分组并重新分包。\n" +
            `点击“取消”会保留旧分组，并从 ${nextGroupId} 开始把新分组追加到后面。`,
        );
      }
      localStorage.setItem(LAST_PACKAGE_BAG_KEY, packageBagInput.trim());
      localStorage.setItem(LAST_PACKAGE_OUTPUT_KEY, packageOutputInput.trim());
      const task = await packageGroups(packageBagInput.trim(), packageOutputInput.trim(), {
        topic: packageTopicInput.trim() || undefined,
        frameStep: PACKAGE_FRAME_STEP,
        groupSize: PACKAGE_GROUP_SIZE,
        minTravelM: packageMinTravelM,
        replaceExisting,
      });
      setPackageTaskId(task.id);
      setPackageTask(task);
      pushNotice("info", `${replaceExisting ? "覆盖" : "追加"}分包任务已启动`);
    } catch (error) {
      reportError(error);
    }
  };

  const handleExportReviewed = async () => {
    try {
      if (!openedWorkspacePath) {
        return;
      }
      if (canEdit && isDirty) {
        await persistCurrentFrame();
      }
      const exportRoot = exportInput.trim();
      if (!exportRoot) {
        pushNotice("error", "请先选择导出根目录");
        setLeftPanelTab("export");
        return;
      }
      localStorage.setItem(LAST_EXPORT_KEY, exportRoot);
      const outputPath = buildExportOutputPath(exportRoot, openedWorkspacePath);
      const result = await exportOpenpcdet(openedWorkspacePath, {
        outputPath,
        annotatedOnly: true,
      });
      pushNotice("success", `exported annotated frames to ${result.output_dir}`);
      // Refresh group-level stats after export
      const wsInput = workspaceInput.trim();
      if (wsInput) {
        void inspectWorkspaceTarget(wsInput)
          .then((target) => startTransition(() => setWorkspaceTarget(target)))
          .catch(() => {});
      }
    } catch (error) {
      reportError(error);
    }
  };

  const handleOpenTrainingRoot = async () => {
    try {
      const trimmed = trainingRootInput.trim();
      if (!trimmed) {
        pushNotice("error", "请先选择训练数据目录");
        return;
      }
      localStorage.setItem(LAST_TRAINING_ROOT_KEY, trimmed);
      await loadTrainingSnapshot(trimmed, true);
      pushNotice("success", `训练目录已载入: ${trimmed}`);
    } catch (error) {
      reportError(error);
    }
  };

  const handleOpenModelTestRoot = async () => {
    try {
      const trimmed = modelTestRootInput.trim();
      if (!trimmed) {
        pushNotice("error", "请先选择模型测试目录");
        return;
      }
      localStorage.setItem(LAST_MODEL_TEST_ROOT_KEY, trimmed);
      await loadModelTestSnapshot(trimmed);
      pushNotice("success", `模型测试目录已载入: ${trimmed}`);
    } catch (error) {
      reportError(error);
    }
  };

  const handleRunModelTestInference = useCallback(async () => {
    try {
      const rootPath = openedModelTestRoot || modelTestRootInput.trim();
      if (!rootPath) {
        pushNotice("error", "请先载入模型测试目录");
        return;
      }
      if (!modelTestSnapshot || modelTestSnapshot.root_path !== rootPath) {
        pushNotice("error", "请先点击“载入测试目录”");
        return;
      }
      if (!modelTestSourcePath || !modelTestSourceKind || !modelTestFrameId) {
        pushNotice("error", "请先选择一个 group 和帧");
        return;
      }
      if (!modelTestCheckpointPath.trim()) {
        pushNotice("error", "请先选择训练权重");
        return;
      }
      setIsRunningModelTestInference(true);
      const result = await inferModelTestFrame({
        sourcePath: modelTestSourcePath,
        sourceKind: modelTestSourceKind,
        frameId: modelTestFrameId,
        checkpointPath: modelTestCheckpointPath.trim(),
        modelConfigPath: modelTestSettingsDraft?.model_config_path?.trim() ?? "",
        openpcdetRoot: modelTestSettingsDraft?.openpcdet_root?.trim() ?? "",
        pythonBin: modelTestSettingsDraft?.python_bin?.trim() ?? "",
        scoreThreshold: modelTestSettingsDraft?.score_threshold ?? undefined,
      });
      setModelTestBoxes(normalizeInferenceBoxes(result));
      setModelTestInferenceMs(typeof result.inference_ms === "number" ? result.inference_ms : null);
      pushNotice("success", `当前帧推理完成: ${result.frame_id}`);
    } catch (error) {
      reportError(error);
    } finally {
      setIsRunningModelTestInference(false);
    }
  }, [
    modelTestCheckpointPath,
    modelTestFrameId,
    modelTestRootInput,
    modelTestSettingsDraft?.model_config_path,
    modelTestSettingsDraft?.openpcdet_root,
    modelTestSettingsDraft?.python_bin,
    modelTestSettingsDraft?.score_threshold,
    modelTestSnapshot,
    modelTestSourceKind,
    modelTestSourcePath,
    openedModelTestRoot,
    pushNotice,
    reportError,
  ]);

  const handleSaveTrainingSettings = async (rootPathOverride?: string) => {
    try {
      const saveRoot = rootPathOverride || openedTrainingRoot;
      if (!saveRoot || !trainingSettingsDraft) {
        pushNotice("error", "请先载入训练目录");
        return;
      }
      const saved = await saveTrainingSettings(saveRoot, trainingSettingsDraft);
      setTrainingSettingsDraft(saved);
      setTrainingSettingsDirty(false);
      await loadTrainingSnapshot(saveRoot, true);
      pushNotice("success", "训练设置已保存");
    } catch (error) {
      reportError(error);
    }
  };

  const handleStartTraining = async () => {
    try {
      const targetPath = openedTrainingRoot || trainingRootInput.trim();
      if (!targetPath) {
        pushNotice("error", "请先选择训练数据目录");
        return;
      }
      if (!openedTrainingRoot || targetPath !== openedTrainingRoot) {
        await handleOpenTrainingRoot();
      }
      if (trainingSettingsDirty) {
        await handleSaveTrainingSettings(targetPath);
      }
      const task = await trainOpenpcdet(targetPath, trainingRunName.trim());
      setTrainingTaskId(task.id);
      setTrainingTask(task);
      setTrainingTaskFailureDetail("");
      pushNotice("info", "OpenPCDet 训练任务已启动");
      await loadTrainingSnapshot(targetPath, false);
    } catch (error) {
      reportError(error);
    }
  };

  const handleControlTrainingTask = useCallback(
    async (action: "pause" | "resume" | "stop") => {
      try {
        const targetPath = openedTrainingRoot || trainingRootInput.trim();
        if (!targetPath || !trainingTask?.id) {
          pushNotice("error", "当前没有可控制的训练任务");
          return;
        }
        const updatedTask = await controlTask(targetPath, trainingTask.id, action);
        setTrainingTask(updatedTask);
        if (action === "pause") {
          pushNotice("info", "训练已暂停");
        } else if (action === "resume") {
          pushNotice("success", "训练已恢复");
        } else {
          pushNotice("info", "正在停止训练");
        }
      } catch (error) {
        reportError(error);
      }
    },
    [openedTrainingRoot, pushNotice, reportError, trainingRootInput, trainingTask?.id],
  );

  const handleAutoLabel = async () => {
    try {
      if (!openedWorkspacePath || !snapshot) {
        return;
      }
      const frameRangeIds = collectFrameRange(snapshot.frames, rangeStart, rangeEnd);
      if (!frameRangeIds.length) {
        pushNotice("error", "selected range is empty");
        return;
      }
      const task = await inferRange(
        openedWorkspacePath,
        frameRangeIds,
        inferCheckpointPath.trim() || undefined,
        inferScoreThreshold !== "" ? inferScoreThreshold : undefined,
      );
      setSelectedTaskId(task.id);
      pushNotice("info", `inference started on ${frameRangeIds.length} frames`);
      await loadSnapshot(openedWorkspacePath, false);
    } catch (error) {
      reportError(error);
    }
  };

  const handleInferCurrentFrame = async () => {
    if (!openedWorkspacePath || !currentFrameId || !snapshot?.settings) return;
    const settings = snapshot.settings;
    const ckpt = inferCheckpointPath.trim() || settings.checkpoint_path || "";
    if (!ckpt || !settings.model_config_path) {
      pushNotice("error", "请填写 Checkpoint 路径（或在「推理设置」tab 中配置）");
      return;
    }
    setIsInferringCurrentFrame(true);
    try {
      const result = await inferModelTestFrame({
        sourcePath: openedWorkspacePath,
        sourceKind: "workspace",
        frameId: currentFrameId,
        checkpointPath: ckpt,
        modelConfigPath: settings.model_config_path,
        openpcdetRoot: settings.openpcdet_root,
        pythonBin: settings.python_bin,
        scoreThreshold: inferScoreThreshold !== "" ? inferScoreThreshold : settings.score_threshold,
      });
      const boxes = normalizeInferenceBoxes(result);
      updateAnnotation((draft) => {
        draft.boxes = boxes;
        draft.source = "model";
      }, false);
      pushNotice("success", `推理完成，共 ${boxes.length} 个框，可手动增减后保存`);
    } catch (error) {
      reportError(error);
    } finally {
      setIsInferringCurrentFrame(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      if (!openedWorkspacePath || !settingsDraft) {
        return;
      }
      await saveSettings(openedWorkspacePath, settingsDraft);
      setSettingsDirty(false);
      await loadSnapshot(openedWorkspacePath, true);
      pushNotice("success", "settings saved");
    } catch (error) {
      reportError(error);
    }
  };

  const handleAddClass = useCallback(() => {
    const nextClass = createDraftClass(classesDraft);
    setClassesDraft((current) => [...current, nextClass]);
    setSelectedClassId(nextClass.id);
    setClassesDirty(true);
    setLeftPanelTab("classes");
  }, [classesDraft]);

  const updateDraftClass = useCallback(
    (classId: string, mutator: (current: ClassDefinition) => ClassDefinition) => {
      setClassesDraft((current) =>
        current.map((item) => {
          if (item.id !== classId) {
            return item;
          }
          return mutator(item);
        }),
      );
      setClassesDirty(true);
    },
    [],
  );

  const handleRemoveClass = useCallback(() => {
    if (!selectedDraftClass) {
      return;
    }
    if (classesDraft.length <= 1) {
      pushNotice("error", "至少保留一个类别");
      return;
    }
    const confirmed = window.confirm(`删除类别“${selectedDraftClass.name}”后不会自动修改已有标注，是否继续？`);
    if (!confirmed) {
      return;
    }
    setClassesDraft((current) => current.filter((item) => item.id !== selectedDraftClass.id));
    setClassesDirty(true);
  }, [classesDraft.length, pushNotice, selectedDraftClass]);

  const handleSaveClasses = async () => {
    try {
      if (!openedWorkspacePath) {
        pushNotice("error", "请先打开工作区");
        return;
      }
      const prepared = prepareClassesForSave(classesDraft);
      if (prepared.error) {
        pushNotice("error", prepared.error);
        return;
      }
      const saved = await saveClasses(openedWorkspacePath, prepared.classes);
      const normalized = normalizeClassDefinitions(saved);
      setSnapshot((current) => (current ? { ...current, classes: normalized } : current));
      setClassesDraft(normalized);
      setSelectedClassId((prev) =>
        prev && normalized.some((item) => item.id === prev) ? prev : normalized[0]?.id ?? "",
      );
      setClassesDirty(false);
      setActiveClassName((current) =>
        current && normalized.some((item) => item.name === current) ? current : normalized[0]?.name ?? "",
      );
      pushNotice("success", "类别配置已保存");
    } catch (error) {
      reportError(error);
    }
  };

  const confirmFrameSwitch = useCallback(() => {
    if (!isDirty) {
      return true;
    }
    return window.confirm("Current frame has unsaved changes. Discard them?");
  }, [isDirty]);

  const selectFrame = useCallback(
    (frameId: string) => {
      if (frameId === currentFrameId) {
        return;
      }
      if (!confirmFrameSwitch()) {
        return;
      }
      setPendingClassChoice(null);
      setCurrentFrameId(frameId);
      setSelectedBoxIds([]);
    },
    [confirmFrameSwitch, currentFrameId],
  );

  const moveFrameBy = useCallback(
    (delta: number) => {
      if (filteredFrames.length === 0 || currentFrameIndex < 0) {
        return;
      }
      const nextIndex = clamp(currentFrameIndex + delta, 0, filteredFrames.length - 1);
      const nextFrame = filteredFrames[nextIndex];
      if (nextFrame) {
        selectFrame(nextFrame.frame_id);
      }
    },
    [currentFrameIndex, filteredFrames, selectFrame],
  );

  const updateSettingField = (field: keyof WorkspaceSettings, value: string | number) => {
    setSettingsDraft((current) => (current ? { ...current, [field]: value } : current));
    setSettingsDirty(true);
  };

  const updateTrainingSettingField = (field: keyof WorkspaceSettings, value: string | number) => {
    setTrainingSettingsDraft((current) => (current ? { ...current, [field]: value } : current));
    setTrainingSettingsDirty(true);
  };

  const updateModelTestSettingField = useCallback((field: keyof WorkspaceSettings, value: string | number) => {
    setModelTestSettingsDraft((current) => (current ? { ...current, [field]: value } : current));
  }, []);

  const updateTrainingArgField = useCallback(
    (option: TrainArgOption, value: number | null) => {
      setTrainingSettingsDraft((current) =>
        current
          ? {
              ...current,
              train_extra_args: updateTrainArgsOption(current.train_extra_args, option, value),
            }
          : current,
      );
      setTrainingSettingsDirty(true);
    },
    [],
  );

  const applyTrainingModelPreset = useCallback(
    (presetId: string) => {
      if (!presetId) {
        return;
      }
      const preset = trainingSnapshot?.model_presets.find((item) => item.id === presetId);
      if (!preset) {
        return;
      }
      setTrainingSettingsDraft((current) =>
        current
          ? {
              ...current,
              model_config_path: preset.model_config_path,
              dataset_config_path: preset.dataset_config_path || current.dataset_config_path,
            }
          : current,
      );
      setTrainingSettingsDirty(true);
    },
    [trainingSnapshot?.model_presets],
  );

  const statusTone = notice?.tone ?? (isLoadingWorkspace || isLoadingFrame ? "info" : isDirty ? "error" : "success");
  const statusText =
    notice?.text ??
    (isLoadingWorkspace || isLoadingFrame
      ? "加载中..."
      : isDirty
        ? "当前帧存在未保存修改"
        : openedWorkspacePath
          ? "就绪"
          : "等待打开工作区");

  if (appScreen === "home") {
    const selectedGroupStats = workspaceTarget?.kind === "group_root" ? selectedGroup : null;
    const homeFramesCount = selectedGroupStats?.frame_count ?? (openedWorkspacePath === workspaceInput.trim() ? snapshot?.frames.length ?? 0 : 0);
    const homeReviewedCount = selectedGroupStats?.reviewed_count ?? (openedWorkspacePath === workspaceInput.trim() ? reviewedCount : 0);
    return (
      <HomeScreen
        notice={notice}
        onEnterPackage={handleEnterPackager}
        onEnterTraining={handleEnterTraining}
        onEnterModelTest={handleEnterModelTest}
        onEnterConeColor={handleEnterConeColor}
        onEnterAnnotate={() => void handleEnterMode("annotate")}
        onEnterReview={() => void handleEnterMode("review")}
        onGroupChange={(groupId) => {
          setSelectedGroupId(groupId);
        }}
        onPickWorkspace={() => void handlePickWorkspace()}
        reviewedCount={homeReviewedCount}
        selectedGroupId={selectedGroup?.group_id ?? ""}
        workspaceTarget={workspaceTarget}
        workspaceInput={workspaceInput}
        workspacePath={selectedGroup?.workspace_path ?? (openedWorkspacePath === workspaceInput.trim() ? openedWorkspacePath : "")}
        framesCount={homeFramesCount}
        onWorkspaceChange={handleWorkspaceInputChange}
      />
    );
  }

  if (appScreen === "package") {
    return (
      <PackageScreen
        notice={notice}
        bagInput={packageBagInput}
        outputInput={packageOutputInput}
        packageTargetInfo={packageTargetInfo}
        topicInput={packageTopicInput}
        packageTask={packageTask}
        onBack={handleBackFromPackager}
        onBagChange={setPackageBagInput}
        onEnterGroup={handleEnterGroupFromPackage}
        onOutputChange={handlePackageOutputChange}
        onPackage={() => void handlePackageGroups()}
        onPickBag={() => void handlePickPackageBag()}
        onPickOutput={() => void handlePickPackageOutput()}
        onTopicChange={setPackageTopicInput}
        minTravelM={packageMinTravelM}
        onMinTravelMChange={setPackageMinTravelM}
      />
    );
  }

  if (appScreen === "training") {
    return (
      <TrainingScreen
        notice={notice}
        trainingRootInput={trainingRootInput}
        trainingTarget={trainingTarget}
        trainingSnapshot={trainingSnapshot}
        trainingTask={trainingTask}
        trainingSettings={trainingSettingsDraft}
        trainingSettingsDirty={trainingSettingsDirty}
        trainingRunName={trainingRunName}
        onBack={handleBackFromTraining}
        onOpenTrainingRoot={() => void handleOpenTrainingRoot()}
        onPickTrainingRoot={() => void handlePickTrainingRoot()}
        onRootChange={handleTrainingRootChange}
        onTrainingRunNameChange={setTrainingRunName}
        onSaveSettings={() => void handleSaveTrainingSettings()}
        onSelectModelPreset={applyTrainingModelPreset}
        onSettingChange={updateTrainingSettingField}
        onStartTraining={() => void handleStartTraining()}
        onTrainingArgChange={updateTrainingArgField}
        onTrainingControl={(action) => void handleControlTrainingTask(action)}
        trainingTaskFailureDetail={trainingTaskFailureDetail}
        onCopyTrainingErrorDetail={(text) => void handleCopyToClipboard(text, "报错已复制")}
      />
    );
  }

  if (appScreen === "model_test") {
    return (
      <ModelTestScreen
        notice={notice}
        modelTestRootInput={modelTestRootInput}
        modelTestSnapshot={modelTestSnapshot}
        modelTestSettings={modelTestSettingsDraft}
        modelTestGroupId={modelTestGroupId}
        modelTestSourcePath={modelTestSourcePath}
        modelTestCheckpointPath={modelTestCheckpointPath}
        modelTestFrameIds={modelTestFrameIds}
        modelTestFrameId={modelTestFrameId}
        modelTestPoints={modelTestPoints}
        modelTestBoxes={modelTestBoxes}
        modelTestClasses={modelTestClasses}
        modelTestInferenceMs={modelTestInferenceMs}
        isLoadingModelTestFrame={isLoadingModelTestFrame}
        isRunningModelTestInference={isRunningModelTestInference}
        onBack={handleBackFromModelTest}
        onModelTestRootChange={handleModelTestRootChange}
        onPickModelTestRoot={() => void handlePickModelTestRoot()}
        onOpenModelTestRoot={() => void handleOpenModelTestRoot()}
        onModelTestSettingChange={updateModelTestSettingField}
        onModelTestGroupChange={setModelTestGroupId}
        onModelTestCheckpointChange={setModelTestCheckpointPath}
        onModelTestFrameChange={setModelTestFrameId}
        onRunModelTestInference={() => void handleRunModelTestInference()}
      />
    );
  }

  if (appScreen === "cone_color") {
    const displayBoxes = coneColoredBoxes.length > 0 ? coneColoredBoxes : coneColorRawBoxes;
    const coneColorClasses = buildConeColorClasses(displayBoxes);
    return (
      <ConeColorScreen
        notice={notice}
        rootInput={coneColorRootInput}
        snapshot={coneColorSnapshot}
        settings={coneColorSettingsDraft}
        groupId={coneColorGroupId}
        checkpointPath={coneColorCheckpointPath}
        frameIds={coneColorFrameIds}
        frameId={coneColorFrameId}
        points={coneColorPoints}
        displayBoxes={displayBoxes}
        coloredBoxes={coneColoredBoxes}
        coneColorClasses={coneColorClasses}
        inferMs={coneColorInferMs}
        isLoadingFrame={isLoadingConeColorFrame}
        isInferring={isRunningConeColorInference}
        onBack={handleBackFromConeColor}
        onRootChange={(v) => setConeColorRootInput(v)}
        onOpenRoot={() => void handleOpenConeColorRoot()}
        onSettingChange={(field, value) => setConeColorSettingsDraft((prev) => prev ? { ...prev, [field]: value } : prev)}
        onGroupChange={setConeColorGroupId}
        onCheckpointChange={setConeColorCheckpointPath}
        onFrameChange={setConeColorFrameId}
        onInfer={() => void handleRunConeColorInference()}
        onClassify={handleClassifyConeColors}
      />
    );
  }

  return (
    <div className="annotator-app">
      <header className="toolbar">
        <div className="logo">
          <div className="logo-mark">PC</div>
          <div>
            <div className="logo-text">Point Cloud Annotator</div>
            <div className="logo-subtext">{openedWorkspacePath || "No workspace open"}</div>
          </div>
        </div>

        <div className="tool-group">
          <button className="tool-btn" onClick={() => setAppScreen("home")} type="button">
            首页
          </button>
          <button className="tool-btn active" type="button">
            {workspaceMode === "annotate" ? "标注模式" : "查看模式"}
          </button>
        </div>

        <div className="tool-group">
          <button className="tool-btn" onClick={() => moveFrameBy(-1)} type="button">
            上一帧
          </button>
          <button className="tool-btn" onClick={() => moveFrameBy(1)} type="button">
            下一帧
          </button>
        </div>

        {canEdit && (
          <div className="tool-group">
            <button
              className="tool-btn primary"
              disabled={!isDirty || !frameData}
              onClick={() => void handleSave()}
              type="button"
            >
              保存
            </button>
            <button className="tool-btn" onClick={() => void handleAutoLabel()} type="button">
              自动标注
            </button>
          </div>
        )}

        <div className="spacer" />

        <div className="tool-group tool-group--end">
          <button className="tool-btn primary" onClick={() => void handleExportReviewed()} type="button">
            导出本地
          </button>
        </div>
      </header>

      <aside className="left-panel">
        <div className="panel-title">数据与标签</div>
        <div className="panel-tabs">
          <button
            className={`panel-tab ${leftPanelTab === "workspace" ? "is-active" : ""}`}
            onClick={() => setLeftPanelTab("workspace")}
            type="button"
          >
            工作区
          </button>
          {canEdit && (
            <button
              className={`panel-tab ${leftPanelTab === "classes" ? "is-active" : ""}`}
              onClick={() => setLeftPanelTab("classes")}
              type="button"
            >
              类别
            </button>
          )}
          <button
            className={`panel-tab ${leftPanelTab === "frames" ? "is-active" : ""}`}
            onClick={() => setLeftPanelTab("frames")}
            type="button"
          >
            帧
          </button>
          <button
            className={`panel-tab ${leftPanelTab === "export" ? "is-active" : ""}`}
            onClick={() => setLeftPanelTab("export")}
            type="button"
          >
            导出
          </button>
          {canEdit && (
            <button
              className={`panel-tab ${leftPanelTab === "automation" ? "is-active" : ""}`}
              onClick={() => setLeftPanelTab("automation")}
              type="button"
            >
              自动
            </button>
          )}
          {canEdit && (
            <button
              className={`panel-tab ${leftPanelTab === "openpcdet" ? "is-active" : ""}`}
              onClick={() => setLeftPanelTab("openpcdet")}
              type="button"
            >
              推理
            </button>
          )}
        </div>
        <div className="panel-body">
          {leftPanelTab === "workspace" && (
            <section className="panel-section">
            <div className="section-title">工作区</div>
            <label className="field-group">
              <span className="field-label">Workspace</span>
              <input
                placeholder="/path/to/output_workspace"
                value={workspaceInput}
                onChange={(event) => handleWorkspaceInputChange(event.target.value)}
              />
              <span className="field-hint">
                {workspaceTarget?.kind === "group_root"
                  ? "当前路径是分组根目录，请先选一组再打开。"
                  : "打开后会读取 `pcd / annotations / meta / models`。"}
              </span>
            </label>
            {workspaceTarget?.kind === "group_root" && (
              <label className="field-group">
                <span className="field-label">标注组</span>
                <select
                  value={selectedGroup?.group_id ?? ""}
                  onChange={(event) => {
                    setSelectedGroupId(event.target.value);
                  }}
                >
                  <option value="">选择一组</option>
                  {workspaceTarget.groups.map((group) => (
                    <option key={group.group_id} value={group.group_id}>
                      {group.group_id} · {group.frame_count} 帧 · reviewed {group.reviewed_count}
                    </option>
                  ))}
                </select>
                {selectedGroup && (
                  <span className="field-hint">
                    {selectedGroup.start_frame_id} - {selectedGroup.end_frame_id} · {selectedGroup.workspace_path}
                  </span>
                )}
              </label>
            )}
            <div className="button-row">
              <button className="ghost-button" onClick={() => void handlePickWorkspace()} type="button">
                选择目录
              </button>
              <button className="secondary-button" onClick={() => void handleOpenWorkspace()} type="button">
                打开
              </button>
              <button
                className="ghost-button"
                onClick={() => void loadSnapshot(openedWorkspacePath || resolveWorkspaceSelection(), false)}
                type="button"
              >
                刷新
              </button>
            </div>
            <div className="workspace-stats">
              <StatChip label="Frames" value={snapshot?.frames.length ?? 0} />
              <StatChip label="Reviewed" value={reviewedCount} />
              <StatChip label="Queue" value={unreviewedCount} />
            </div>
          </section>
          )}

          {canEdit && leftPanelTab === "classes" && (
            <section className="panel-section">
              <div className="section-title">类别配置</div>
              {!openedWorkspacePath ? (
                <div className="empty-state">打开工作区后可编辑类别。</div>
              ) : (
                <>
                  <div className="button-row">
                    <button className="ghost-button" onClick={handleAddClass} type="button">
                      新增类别
                    </button>
                    <button
                      className="secondary-button"
                      disabled={!classesDirty || !openedWorkspacePath}
                      onClick={() => void handleSaveClasses()}
                      type="button"
                    >
                      保存类别
                    </button>
                  </div>
                  <span className="field-hint class-editor__hint">新建框、批量改类和双击后的类别选择都会使用这里的配置。</span>
                  <div className="label-list class-editor__list">
                    {classesDraft.map((classDef) => (
                      <button
                        className={`label-card ${selectedDraftClass?.id === classDef.id ? "active" : ""}`}
                        key={classDef.id}
                        onClick={() => setSelectedClassId(classDef.id)}
                        type="button"
                      >
                        <span className="label-dot" style={{ background: classDef.color }} />
                        <span className="label-name">{classDef.name}</span>
                        <span className="label-badge">{formatClassSize(classDef.default_size)}</span>
                      </button>
                    ))}
                  </div>
                  {selectedDraftClass && (
                    <div className="inline-editor class-editor">
                      <label className="field-group">
                        <span className="field-label">名称</span>
                        <input
                          value={selectedDraftClass.name}
                          onChange={(event) =>
                            updateDraftClass(selectedDraftClass.id, (current) => ({
                              ...current,
                              name: event.target.value,
                            }))
                          }
                        />
                      </label>
                      <label className="field-group">
                        <span className="field-label">颜色</span>
                        <div className="class-editor__color-row">
                          <input
                            className="class-editor__color-picker"
                            type="color"
                            value={normalizeHexColor(selectedDraftClass.color)}
                            onChange={(event) =>
                              updateDraftClass(selectedDraftClass.id, (current) => ({
                                ...current,
                                color: event.target.value,
                              }))
                            }
                          />
                          <input
                            value={selectedDraftClass.color}
                            onChange={(event) =>
                              updateDraftClass(selectedDraftClass.id, (current) => ({
                                ...current,
                                color: event.target.value,
                              }))
                            }
                          />
                        </div>
                      </label>
                      <VectorEditor
                        label="默认尺寸 LWH"
                        values={selectedDraftClass.default_size}
                        onChange={(axis, value) =>
                          updateDraftClass(selectedDraftClass.id, (current) => {
                            const next = [...current.default_size] as [number, number, number];
                            next[axis] = toEditableNumber(value, current.default_size[axis]);
                            return { ...current, default_size: next };
                          })
                        }
                      />
                      <div className="button-row">
                        <button
                          className="ghost-button"
                          disabled={classesDraft.length <= 1}
                          onClick={handleRemoveClass}
                          type="button"
                        >
                          删除类别
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </section>
          )}

          {leftPanelTab === "export" && (
            <section className="panel-section">
            <div className="section-title">导出结果</div>
            <label className="field-group">
              <span className="field-label">Export Root</span>
              <input
                placeholder="/path/to/export_root"
                value={exportInput}
                onChange={(event) => {
                  setExportInput(event.target.value);
                  localStorage.setItem(LAST_EXPORT_KEY, event.target.value);
                }}
              />
              <span className="field-hint">
                导出时会自动落到 {exportInput.trim() ? buildExportOutputPath(exportInput.trim(), openedWorkspacePath || "group_001") : "/path/to/export_root/group_001"}
              </span>
            </label>
            <div className="button-row">
              <button className="ghost-button" onClick={() => void handlePickExportRoot()} type="button">
                选择根目录
              </button>
              <button className="secondary-button" onClick={() => void handleExportReviewed()} type="button">
                导出当前组
              </button>
            </div>
            <div className="workspace-stats">
              {(() => {
                const groupStats = workspaceTarget?.kind === "group_root" ? workspaceTarget.groups : null;
                const annotatedGroups = groupStats ? groupStats.filter((g) => g.annotated_count > 0).length : null;
                const totalFrames = groupStats
                  ? groupStats.reduce((sum, g) => sum + g.frame_count, 0)
                  : (snapshot?.frames.length ?? 0);
                const annotatedFrames = groupStats
                  ? groupStats.reduce((sum, g) => {
                      const isCurrentGroup = g.workspace_path === openedWorkspacePath;
                      const count = isCurrentGroup
                        ? (snapshot?.frames.filter((f) => f.box_count > 0).length ?? g.annotated_count)
                        : g.annotated_count;
                      return sum + count;
                    }, 0)
                  : (snapshot?.frames.filter((f) => f.box_count > 0).length ?? 0);
                const classTotals: Record<string, number> = {};
                if (groupStats) {
                  for (const group of groupStats) {
                    // Use live snapshot data for the currently-open group; cached data for others
                    const isCurrentGroup = group.workspace_path === openedWorkspacePath;
                    const source = isCurrentGroup
                      ? (snapshot?.class_totals ?? group.class_totals ?? {})
                      : (group.class_totals ?? {});
                    for (const [cls, count] of Object.entries(source)) {
                      classTotals[cls] = (classTotals[cls] ?? 0) + count;
                    }
                  }
                } else {
                  Object.assign(classTotals, snapshot?.class_totals ?? {});
                }
                return (
                  <>
                    {groupStats && (
                      <div className="stat-chip">
                        <span>组</span>
                        <strong>{annotatedGroups} / {groupStats.length}</strong>
                      </div>
                    )}
                    <div className="stat-chip">
                      <span>帧</span>
                      <strong>{annotatedFrames} / {totalFrames}</strong>
                    </div>
                    {availableClasses.map((classDef) => (
                      <div className="stat-chip" key={classDef.id}>
                        <span>{classDef.name}</span>
                        <strong style={{ color: classDef.color }}>
                          {classTotals[classDef.name] ?? 0}
                        </strong>
                      </div>
                    ))}
                  </>
                );
              })()}
            </div>
          </section>
          )}

          {leftPanelTab === "frames" && (
            <section className="panel-section">
            <div className="section-title">帧列表</div>
            <label className="field-group">
              <span className="field-label">过滤</span>
              <input
                placeholder="filter frame id"
                value={frameFilter}
                onChange={(event) => setFrameFilter(event.target.value)}
              />
            </label>
            <label className="checkbox-row">
              <input checked={queueOnly} onChange={(event) => setQueueOnly(event.target.checked)} type="checkbox" />
              <span>只看待审核帧</span>
            </label>
            <div className="frame-list">
              {filteredFrames.map((frame) => (
                <button
                  key={frame.frame_id}
                  className={`frame-item ${frame.frame_id === currentFrameId ? "is-active" : ""}`}
                  onClick={() => selectFrame(frame.frame_id)}
                  type="button"
                >
                  <div className="frame-item__name">{frame.frame_id}.pcd</div>
                  <div className="frame-item__meta">
                    <StatusDot reviewStatus={frame.review_status ?? undefined} />
                    <span>{frame.box_count} boxes</span>
                    <span>{frame.source ?? "-"}</span>
                  </div>
                </button>
              ))}
              {!filteredFrames.length && <div className="empty-state">没有可显示的帧。</div>}
            </div>
          </section>
          )}

          {canEdit && leftPanelTab === "automation" && (
            <section className="panel-section">
              <div className="section-title">自动化</div>
              {(snapshot?.checkpoint_candidates ?? []).length > 0 && (
                <label className="field-group">
                  <span className="field-label">训练权重</span>
                  <select
                    value={(snapshot?.checkpoint_candidates ?? []).includes(inferCheckpointPath) ? inferCheckpointPath : ""}
                    onChange={(event) => setInferCheckpointPath(event.target.value)}
                  >
                    <option value="">手动输入权重路径</option>
                    {(snapshot?.checkpoint_candidates ?? []).map((ckpt) => (
                      <option key={ckpt} value={ckpt}>{ckpt}</option>
                    ))}
                  </select>
                </label>
              )}
              <LabeledInput
                label="Checkpoint (.pth)"
                value={inferCheckpointPath}
                onChange={setInferCheckpointPath}
              />
              <LabeledInput
                label="Score Threshold"
                type="number"
                step="0.01"
                value={inferScoreThreshold}
                onChange={(v) => setInferScoreThreshold(v === "" ? "" : Number(v))}
              />
              {currentFrameId && (
                <>
                  <div className="section-title" style={{ fontSize: "0.75rem", opacity: 0.7, marginBottom: 4 }}>当前帧</div>
                  <div className="button-column">
                    <button
                      className="primary-button"
                      disabled={isInferringCurrentFrame || (!inferCheckpointPath.trim() && !snapshot?.settings?.checkpoint_path)}
                      onClick={() => void handleInferCurrentFrame()}
                      type="button"
                    >
                      {isInferringCurrentFrame ? "推理中..." : "用模型标注当前帧"}
                    </button>
                    <span className="field-hint">推理结果替换当前帧标注，可手动增减后保存。</span>
                  </div>
                </>
              )}
              <div className="section-title" style={{ fontSize: "0.75rem", opacity: 0.7, marginBottom: 4, marginTop: 12 }}>批量范围</div>
              <div className="range-grid">
                <FieldSelect label="Auto Start" value={rangeStart} options={allFrameIds} onChange={setRangeStart} />
                <FieldSelect label="Auto End" value={rangeEnd} options={allFrameIds} onChange={setRangeEnd} />
              </div>
              <div className="button-column">
                <button className="secondary-button" onClick={() => void handleAutoLabel()} type="button">
                  对范围自动标注
                </button>
              </div>
            </section>
          )}

          {canEdit && leftPanelTab === "openpcdet" && (
            <section className="panel-section">
              <div className="section-title">推理设置</div>
              {settingsDraft ? (
                <>
                  <span className="field-hint class-editor__hint">训练入口已移到首页“模型训练”。这里保留的是当前工作区自动标注需要的模型与 checkpoint。</span>
                  <div className="settings-grid">
                  <LabeledInput label="Python" value={settingsDraft.python_bin} onChange={(value) => updateSettingField("python_bin", value)} />
                  <LabeledInput
                    label="OpenPCDet Root"
                    value={settingsDraft.openpcdet_root}
                    onChange={(value) => updateSettingField("openpcdet_root", value)}
                  />
                  <LabeledInput
                    label="Model Config"
                    value={settingsDraft.model_config_path}
                    onChange={(value) => updateSettingField("model_config_path", value)}
                  />
                  <LabeledInput
                    label="Dataset Config"
                    value={settingsDraft.dataset_config_path}
                    onChange={(value) => updateSettingField("dataset_config_path", value)}
                  />
                  <LabeledInput
                    label="Checkpoint"
                    value={settingsDraft.checkpoint_path}
                    onChange={(value) => updateSettingField("checkpoint_path", value)}
                  />
                  <LabeledInput
                    label="Score"
                    type="number"
                    step="0.01"
                    value={settingsDraft.score_threshold}
                    onChange={(value) => updateSettingField("score_threshold", Number(value))}
                  />
                  <LabeledInput
                    label="Min Reviewed"
                    type="number"
                    step="1"
                    value={settingsDraft.min_reviewed_for_training}
                    onChange={(value) => updateSettingField("min_reviewed_for_training", Number(value))}
                  />
                  <LabeledInput
                    label="Train Args"
                    value={settingsDraft.train_extra_args}
                    onChange={(value) => updateSettingField("train_extra_args", value)}
                  />
                  <LabeledInput
                    label="Infer Args"
                    value={settingsDraft.infer_extra_args}
                    onChange={(value) => updateSettingField("infer_extra_args", value)}
                  />
                  </div>
                </>
              ) : (
                <div className="empty-state">打开工作区后可编辑模型设置。</div>
              )}
              <button
                className="secondary-button"
                disabled={!settingsDirty || !openedWorkspacePath}
                onClick={() => void handleSaveSettings()}
                type="button"
              >
                保存设置
              </button>
            </section>
          )}

          {canEdit && leftPanelTab === "workspace" && (
            <section className="shortcuts">
              <div className="section-title">快捷键</div>
              <div className="shortcut-row"><span>双击建框并选类别</span><span className="kbd">Double Click</span></div>
              <div className="shortcut-row"><span>旋转框</span><span className="kbd">Q / E</span></div>
              <div className="shortcut-row"><span>删除选中</span><span className="kbd">Del</span></div>
              <div className="shortcut-row"><span>保存</span><span className="kbd">Ctrl + S</span></div>
              <div className="shortcut-row"><span>切帧</span><span className="kbd">← →</span></div>
            </section>
          )}
        </div>
      </aside>

      <main className="viewport-panel">
        {notice && <NoticeBanner notice={notice} />}

        <div className="viewport-header">
          <div className="hud-chip">帧 <span>{currentFrameId ?? "-"}</span></div>
          <div className="hud-chip">点云 <span>{deferredPoints.length.toLocaleString()}</span></div>
          <div className="hud-chip">标注 <span>{currentBoxes.length}</span></div>
          <div className="hud-chip">来源 <span>{frameData?.annotation.source ?? "-"}</span></div>
        </div>

        <section className="viewport-card">
          {frameData ? (
            <FrameCanvas
              activeClass={activeClass}
              boxes={currentBoxes}
              classes={availableClasses}
              mode={viewMode}
              pendingClassChoice={pendingClassChoice}
              readOnly={!canEdit}
              selectedBox={selectedBoxes.length === 1 ? selectedBoxes[0] : null}
              onCreateBox={canEdit ? createBoxAt : () => {}}
              onDismissPendingClassChoice={dismissPendingClassChoice}
              onHoverWorldChange={setHoverWorld}
              onMoveSelected={canEdit ? moveSelectedBoxes : () => {}}
              onChoosePendingClass={handleChoosePendingClass}
              onRotateSelected={canEdit ? rotateSelected : () => {}}
              onSelect={handleSelectBoxes}
              points={deferredPoints}
              selectedIds={selectedBoxIds}
            />
          ) : (
            <div className="empty-stage">
              {isLoadingWorkspace || isLoadingFrame
                ? "Loading frame..."
                : workspaceMode === "review"
                  ? "No annotated frames found in this workspace."
                  : "Open a workspace and pick a frame."}
            </div>
          )}
        </section>

        <div className="viewport-footer">
          <div className="viewport-tip">
            {canEdit
              ? "双击点云会从点击位置附近做一次局部聚类出框，然后在框旁直接选择类别。"
              : "查看模式下只浏览已有标注，双击、拖动和旋转都不会修改数据。"}
          </div>
        </div>
      </main>

      <aside className="right-panel">
        <div className="panel-title panel-title--split">
          <span>标注列表</span>
          <span>{currentBoxes.length} 项</span>
        </div>

        {canEdit && frameData && (
          <section className="right-stack-card right-stack-card--tight">
            <div className="section-title">当前状态</div>
            <div className="review-switch">
              <button
                className={`review-switch__btn ${frameData.annotation.review_status === "unreviewed" ? "is-active" : ""}`}
                onClick={() => patchReviewStatus("unreviewed")}
                type="button"
              >
                待审核
              </button>
              <button
                className={`review-switch__btn ${frameData.annotation.review_status === "reviewed" ? "is-active" : ""}`}
                onClick={() => patchReviewStatus("reviewed")}
                type="button"
              >
                已审核
              </button>
              <button
                className={`review-switch__btn review-switch__btn--danger ${frameData.annotation.review_status === "rejected" ? "is-active" : ""}`}
                onClick={() => patchReviewStatus("rejected")}
                type="button"
              >
                驳回
              </button>
            </div>
          </section>
        )}

        <div className="annotation-list">
          {currentBoxes.length === 0 ? (
            <div className="empty-state">暂无标注，双击点云开始聚类建框。</div>
          ) : (
            currentBoxes.map((box, index) => {
              const boxClass = availableClasses.find((item) => item.name === box.class_name);
              return (
                <article
                  key={box.box_id}
                  className={`ann-card ${selectedBoxIds.includes(box.box_id) ? "selected" : ""}`}
                  onClick={() => handleSelectBoxes([box.box_id])}
                >
                  <div className="ann-header">
                    <span className="ann-color" style={{ background: boxClass?.color ?? "#58a6ff" }} />
                    <span className="ann-label">{box.class_name}</span>
                    <span className="ann-id">#{index + 1}</span>
                  </div>
                  <div className="ann-props">
                    <div className="ann-prop">
                      <div className="ann-prop-label">位置 XYZ</div>
                      <div className="ann-prop-val">
                        {box.center_xyz.map((value) => value.toFixed(2)).join(", ")}
                      </div>
                    </div>
                    <div className="ann-prop">
                      <div className="ann-prop-label">尺寸 LWH</div>
                      <div className="ann-prop-val">
                        {box.size_lwh.map((value) => value.toFixed(2)).join(", ")}
                      </div>
                    </div>
                  </div>
                  <div className="ann-actions">
                    <button
                      className="ann-act"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleSelectBoxes([box.box_id]);
                      }}
                      type="button"
                    >
                      选中
                    </button>
                    {canEdit && (
                      <button
                        className="ann-act del"
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteSingleBox(box.box_id);
                        }}
                        type="button"
                      >
                        删除
                      </button>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>

        {canEdit && (
          <section className={`edit-panel ${selectedBoxes.length > 0 ? "visible" : ""}`}>
            <div className="edit-title">编辑属性</div>
            {!frameData && <div className="empty-state">No frame loaded.</div>}
            {frameData && selectedBoxes.length === 0 && (
              <div className="empty-state">选中一个框后可以在这里修改尺寸、姿态和类别。</div>
            )}
            {selectedBoxes.length > 1 && (
              <div className="multi-selection">
                <div>{selectedBoxes.length} boxes selected</div>
                <select
                  value={activeClassName}
                  onChange={(event) => {
                    setActiveClassName(event.target.value);
                    setSelectedBoxesClass(event.target.value);
                  }}
                >
                  {availableClasses.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <button className="ghost-button" onClick={deleteSelectedBoxes} type="button">
                  删除选中
                </button>
              </div>
            )}
            {selectedBoxes.length === 1 && (
              <>
                <div className="inspector-meta">
                  <div>Frame: {frameData?.frame_id}</div>
                  <div>Source: {frameData?.annotation.source}</div>
                  <div>Review: {frameData?.annotation.review_status}</div>
                </div>
                <div className="inspector-form">
                  <label className="field-group">
                    <span className="field-label">Class</span>
                    <select
                      value={
                        availableClasses.some((item) => item.name === selectedBoxes[0].class_name)
                          ? selectedBoxes[0].class_name
                          : "__legacy_unknown__"
                      }
                      onChange={(event) => patchSelectedBox("class_name", event.target.value)}
                    >
                      {!availableClasses.some((item) => item.name === selectedBoxes[0].class_name) && (
                        <option disabled value="__legacy_unknown__">
                          {selectedBoxes[0].class_name}
                        </option>
                      )}
                      {availableClasses.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <VectorEditor
                    label="Center XYZ"
                    values={selectedBoxes[0].center_xyz}
                    onChange={(axis, value) => patchSelectedBox("center_xyz", Number(value), axis)}
                  />
                  <VectorEditor
                    label="Size LWH"
                    values={selectedBoxes[0].size_lwh}
                    onChange={(axis, value) => patchSelectedBox("size_lwh", Number(value), axis)}
                  />
                  <label className="field-group">
                    <span className="field-label">Yaw</span>
                    <input
                      type="number"
                      step="0.01"
                      value={selectedBoxes[0].yaw}
                      onChange={(event) => patchSelectedBox("yaw", Number(event.target.value))}
                    />
                  </label>
                  <label className="field-group">
                    <span className="field-label">Score</span>
                    <input
                      type="number"
                      step="0.01"
                      value={selectedBoxes[0].score ?? ""}
                      onChange={(event) =>
                        patchSelectedBox("score", event.target.value ? Number(event.target.value) : null)
                      }
                    />
                  </label>
                  <button className="ghost-button" onClick={deleteSelectedBoxes} type="button">
                    删除框
                  </button>
                </div>
              </>
            )}
          </section>
        )}

      </aside>

      <footer className="statusbar">
        <div className="status-item">
          <span className={`status-dot-large status-dot-large--${statusTone}`} />
          <span>{statusText}</span>
        </div>
        <div className="status-item">
          标签:
          <span className="status-pill-inline" style={{ color: activeClass?.color }}>
            {activeClass?.name ?? "-"}
          </span>
        </div>
        <div className="status-item">
          帧:
          <span className="status-pill-inline">
            {currentFrameId ? `${currentFrameIndex + 1}/${navigationFrameIds.length}` : "-"}
          </span>
        </div>
        <div className="status-item status-item--right">
          光标:
          <span className="status-pill-inline status-pill-inline--mono">
            {hoverWorld
              ? `X ${hoverWorld[0].toFixed(2)}  Y ${hoverWorld[1].toFixed(2)}  Z ${hoverWorld[2].toFixed(2)}`
              : "X -.--  Y -.--  Z -.--"}
          </span>
        </div>
      </footer>
    </div>
  );
}

function HomeScreen({
  notice,
  workspaceInput,
  workspaceTarget,
  selectedGroupId,
  workspacePath,
  framesCount,
  reviewedCount,
  onWorkspaceChange,
  onGroupChange,
  onPickWorkspace,
  onEnterPackage,
  onEnterTraining,
  onEnterModelTest,
  onEnterConeColor,
  onEnterAnnotate,
  onEnterReview,
}: {
  notice: Notice | null;
  workspaceInput: string;
  workspaceTarget: WorkspaceTargetInfo | null;
  selectedGroupId: string;
  workspacePath: string;
  framesCount: number;
  reviewedCount: number;
  onWorkspaceChange: (value: string) => void;
  onGroupChange: (value: string) => void;
  onPickWorkspace: () => void;
  onEnterPackage: () => void;
  onEnterTraining: () => void;
  onEnterModelTest: () => void;
  onEnterConeColor: () => void;
  onEnterAnnotate: () => void;
  onEnterReview: () => void;
}) {
  return (
    <div className="entry-page">
      <div className="entry-page__hero" />
      <div className="entry-page__veil" />
      <div className="entry-page__content">
        <div className="entry-page__brand">
          <div className="logo-mark">PC</div>
          <div>
            <div className="entry-page__eyebrow">BIT FSD Cone Workflow</div>
            <h1>Point Cloud Annotator</h1>
            <p>进入标注模式继续人工打框，进入查看模式只加载已经标过的帧并以 3D 视图浏览。</p>
          </div>
        </div>

        {notice && <NoticeBanner notice={notice} />}

        <section className="entry-card entry-card--workspace">
          <div className="entry-card__title">工作区入口</div>
          <label className="field-group">
            <span className="field-label">Workspace</span>
            <input
              placeholder="/path/to/output_workspace"
              value={workspaceInput}
              onChange={(event) => onWorkspaceChange(event.target.value)}
            />
          </label>
          {workspaceTarget?.kind === "group_root" && (
            <label className="field-group">
              <span className="field-label">标注组</span>
              <select value={selectedGroupId} onChange={(event) => onGroupChange(event.target.value)}>
                <option value="">选择一组</option>
                {workspaceTarget.groups.map((group) => (
                  <option key={group.group_id} value={group.group_id}>
                    {group.group_id} · {group.frame_count} 帧 · 已审 {group.reviewed_count}
                  </option>
                ))}
              </select>
            </label>
          )}
          <div className="button-row">
            <button className="ghost-button" onClick={onPickWorkspace} type="button">
              选择目录
            </button>
          </div>
          <div className="entry-stats">
            <div className="entry-stat">
              <span>Frames</span>
              <strong>{framesCount}</strong>
            </div>
            <div className="entry-stat">
              <span>Reviewed</span>
              <strong>{reviewedCount}</strong>
            </div>
          </div>
          {workspaceTarget?.kind === "group_root" && (
            <div className="entry-card__path">
              检测到分组根目录，共 {workspaceTarget.groups.length} 组。当前选择: {selectedGroupId || "-"}
            </div>
          )}
          <div className="entry-card__path">{workspacePath || workspaceInput || "No workspace selected"}</div>
        </section>

        <div className="entry-mode-grid entry-mode-grid--penta">
          <button className="entry-card entry-card--mode" onClick={onEnterPackage} type="button">
            <div className="entry-card__label">Package</div>
            <div className="entry-card__mode">点云分包</div>
            <p>进入分包页，按 5 帧取 1 帧、每 20 帧切一组，生成多人协作标注目录。</p>
          </button>
          <button className="entry-card entry-card--mode" onClick={onEnterTraining} type="button">
            <div className="entry-card__label">Train</div>
            <div className="entry-card__mode">模型训练</div>
            <p>进入 OpenPCDet 训练页，直接选择一个或多个 `group_*` 导出的数据目录发起训练。</p>
          </button>
          <button className="entry-card entry-card--mode" onClick={onEnterModelTest} type="button">
            <div className="entry-card__label">Test</div>
            <div className="entry-card__mode">模型测试</div>
            <p>选择训练权重和导出 group，按帧手动推理并查看 3D 预测框与单帧耗时。</p>
          </button>
          <button className="entry-card entry-card--mode" onClick={onEnterConeColor} type="button">
            <div className="entry-card__label">Color</div>
            <div className="entry-card__mode">锥桶颜色分析</div>
            <p>加载点云后推理 Cone 位置，基于 range-normalized intensity 自动分类红/蓝锥桶。</p>
          </button>
          <button className="entry-card entry-card--mode" onClick={onEnterAnnotate} type="button">
            <div className="entry-card__label">Annotate</div>
            <div className="entry-card__mode">进入标注</div>
            <p>按你选中的工作区或分组进入 3D 标注，双击建框后可直接选择类别。</p>
          </button>
          <button className="entry-card entry-card--mode" onClick={onEnterReview} type="button">
            <div className="entry-card__label">Review</div>
            <div className="entry-card__mode">进入查看</div>
            <p>只加载已有标注的帧，保留 3D 浏览和列表查看，不进入编辑流。</p>
          </button>
        </div>
      </div>
    </div>
  );
}

function ModelTestScreen({
  notice,
  modelTestRootInput,
  modelTestSnapshot,
  modelTestSettings,
  modelTestGroupId,
  modelTestSourcePath,
  modelTestCheckpointPath,
  modelTestFrameIds,
  modelTestFrameId,
  modelTestPoints,
  modelTestBoxes,
  modelTestClasses,
  modelTestInferenceMs,
  isLoadingModelTestFrame,
  isRunningModelTestInference,
  onBack,
  onModelTestRootChange,
  onPickModelTestRoot,
  onOpenModelTestRoot,
  onModelTestSettingChange,
  onModelTestGroupChange,
  onModelTestCheckpointChange,
  onModelTestFrameChange,
  onRunModelTestInference,
}: {
  notice: Notice | null;
  modelTestRootInput: string;
  modelTestSnapshot: ModelTestSnapshot | null;
  modelTestSettings: WorkspaceSettings | null;
  modelTestGroupId: string;
  modelTestSourcePath: string;
  modelTestCheckpointPath: string;
  modelTestFrameIds: string[];
  modelTestFrameId: string;
  modelTestPoints: PointRecord[];
  modelTestBoxes: AnnotationBox[];
  modelTestClasses: ClassDefinition[];
  modelTestInferenceMs: number | null;
  isLoadingModelTestFrame: boolean;
  isRunningModelTestInference: boolean;
  onBack: () => void;
  onModelTestRootChange: (value: string) => void;
  onPickModelTestRoot: () => void;
  onOpenModelTestRoot: () => void;
  onModelTestSettingChange: (field: keyof WorkspaceSettings, value: string | number) => void;
  onModelTestGroupChange: (value: string) => void;
  onModelTestCheckpointChange: (value: string) => void;
  onModelTestFrameChange: (value: string) => void;
  onRunModelTestInference: () => void;
}) {
  const modelTestTarget = modelTestSnapshot?.target ?? null;
  const modelTestGroups = modelTestTarget?.groups ?? [];
  const modelTestCheckpointCandidates = modelTestSnapshot?.checkpoint_candidates ?? [];
  const modelTestResultCount = modelTestBoxes.length;
  const showGroupSelect = modelTestGroups.length > 1;

  return (
    <div className="entry-page entry-page--package">
      <div className="entry-page__hero" />
      <div className="entry-page__veil" />
      <div className="entry-page__content entry-page__content--package">
        <div className="entry-page__brand">
          <div className="logo-mark">PC</div>
          <div>
            <div className="entry-page__eyebrow">BIT FSD Cone Workflow</div>
            <h1>Model Tester</h1>
            <p>支持原始分组点云和导出的 OpenPCDet 数据目录。按帧手动触发推理，不加载标注，只看预测框和单帧耗时。</p>
          </div>
        </div>

        {notice && <NoticeBanner notice={notice} />}

        <section className="entry-card model-test-panel">
          <div className="model-test-panel__header">
            <div>
              <div className="entry-card__title">模型测试</div>
              <div className="model-test-panel__subtitle">支持原始 `group_*/pcd/*.pcd` 和导出的 `points/*.npy`。不加载标注，按帧手动触发推理。</div>
            </div>
            <div className="model-test-panel__chips">
              <span>{modelTestFrameIds.length} 帧</span>
              <span>{modelTestResultCount} 预测框</span>
              <span>{modelTestInferenceMs != null ? `${Math.round(modelTestInferenceMs)} ms` : "未推理"}</span>
            </div>
          </div>

          <div className="model-test-panel__grid">
            <div className="model-test-panel__controls">
              <label className="field-group">
                <span className="field-label">测试数据根目录</span>
                <input
                  placeholder="/sda1/fsd/pc_raw_group/autox_2025"
                  value={modelTestRootInput}
                  onChange={(event) => onModelTestRootChange(event.target.value)}
                />
                <span className="field-hint">支持原始单个 group、包含多个 `group_*` 的父目录，或导出的 OpenPCDet 数据根目录。</span>
              </label>
              <div className="button-row">
                <button className="ghost-button" onClick={onBack} type="button">
                  返回首页
                </button>
                <button className="ghost-button" onClick={onPickModelTestRoot} type="button">
                  选择目录
                </button>
                <button className="secondary-button" onClick={onOpenModelTestRoot} type="button">
                  载入测试目录
                </button>
              </div>

              {showGroupSelect && (
                <label className="field-group">
                  <span className="field-label">选择 Group</span>
                  <select value={modelTestGroupId} onChange={(event) => onModelTestGroupChange(event.target.value)}>
                    {modelTestGroups.map((group) => (
                      <option key={group.group_id} value={group.group_id}>
                        {group.group_id} · {group.frame_count} 帧
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <label className="field-group">
                <span className="field-label">训练权重</span>
                <select
                  value={modelTestCheckpointCandidates.includes(modelTestCheckpointPath) ? modelTestCheckpointPath : ""}
                  onChange={(event) => onModelTestCheckpointChange(event.target.value)}
                >
                  <option value="">手动输入权重路径</option>
                  {modelTestCheckpointCandidates.map((checkpointPath) => (
                    <option key={checkpointPath} value={checkpointPath}>
                      {checkpointPath}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field-group">
                <span className="field-label">当前权重路径</span>
                <input value={modelTestCheckpointPath} onChange={(event) => onModelTestCheckpointChange(event.target.value)} />
              </label>

              <label className="field-group">
                <span className="field-label">Model Config</span>
                <input
                  placeholder="/path/to/model.yaml"
                  value={modelTestSettings?.model_config_path ?? ""}
                  onChange={(event) => onModelTestSettingChange("model_config_path", event.target.value)}
                />
              </label>

              <label className="field-group">
                <span className="field-label">OpenPCDet Root</span>
                <input
                  placeholder="/path/to/OpenPCDet"
                  value={modelTestSettings?.openpcdet_root ?? ""}
                  onChange={(event) => onModelTestSettingChange("openpcdet_root", event.target.value)}
                />
              </label>

              <label className="field-group">
                <span className="field-label">Score Threshold</span>
                <input
                  min={0}
                  max={1}
                  step={0.01}
                  type="number"
                  value={modelTestSettings?.score_threshold ?? 0.3}
                  onChange={(event) => onModelTestSettingChange("score_threshold", Number(event.target.value))}
                />
              </label>

              <label className="field-group">
                <span className="field-label">当前帧</span>
                <select
                  disabled={!modelTestFrameIds.length}
                  value={modelTestFrameId}
                  onChange={(event) => onModelTestFrameChange(event.target.value)}
                >
                  {modelTestFrameIds.map((frameId) => (
                    <option key={frameId} value={frameId}>
                      {frameId}
                    </option>
                  ))}
                </select>
              </label>

              <div className="button-row">
                <button
                  className="ghost-button"
                  disabled={!modelTestFrameIds.length || !modelTestFrameId}
                  onClick={() => {
                    const index = modelTestFrameIds.indexOf(modelTestFrameId);
                    if (index > 0) {
                      onModelTestFrameChange(modelTestFrameIds[index - 1]);
                    }
                  }}
                  type="button"
                >
                  上一帧
                </button>
                <button
                  className="ghost-button"
                  disabled={!modelTestFrameIds.length || !modelTestFrameId}
                  onClick={() => {
                    const index = modelTestFrameIds.indexOf(modelTestFrameId);
                    if (index >= 0 && index < modelTestFrameIds.length - 1) {
                      onModelTestFrameChange(modelTestFrameIds[index + 1]);
                    }
                  }}
                  type="button"
                >
                  下一帧
                </button>
                <button
                  className="secondary-button"
                  disabled={!modelTestSourcePath || !modelTestFrameId || !modelTestCheckpointPath.trim() || isLoadingModelTestFrame || isRunningModelTestInference}
                  onClick={onRunModelTestInference}
                  type="button"
                >
                  {isRunningModelTestInference ? "推理中..." : "推理当前帧"}
                </button>
              </div>

              <div className="package-meta-list model-test-panel__meta-list">
                <div className="package-meta-item">
                  <span>数据源</span>
                  <strong>{modelTestSourcePath || "待载入"}</strong>
                </div>
                <div className="package-meta-item">
                  <span>Model Config</span>
                  <strong>{modelTestSettings?.model_config_path || "未配置"}</strong>
                </div>
                <div className="package-meta-item">
                  <span>OpenPCDet Root</span>
                  <strong>{modelTestSettings?.openpcdet_root || "未配置"}</strong>
                </div>
              </div>

              {modelTestBoxes.length > 0 && (
                <div className="model-test-panel__predictions">
                  {modelTestBoxes.slice(0, 8).map((box) => (
                    <div className="model-test-panel__prediction" key={box.box_id}>
                      <span>{box.class_name}</span>
                      <strong>{box.score != null ? box.score.toFixed(3) : "-"}</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="model-test-panel__viewer">
              {modelTestPoints.length ? (
                <FrameCanvas
                  mode="view3d"
                  readOnly
                  points={modelTestPoints}
                  boxes={modelTestBoxes}
                  classes={modelTestClasses}
                  selectedIds={[]}
                  onSelect={() => {}}
                  onMoveSelected={() => {}}
                  onRotateSelected={() => {}}
                  onCreateBox={() => {}}
                />
              ) : (
                <div className="empty-state model-test-panel__empty">
                  {isLoadingModelTestFrame ? "正在载入点云..." : "载入测试目录并选择帧后，这里显示点云与推理框。"}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ConeColorScreen({
  notice,
  rootInput,
  snapshot,
  settings,
  groupId,
  checkpointPath,
  frameIds,
  frameId,
  points,
  displayBoxes,
  coloredBoxes,
  coneColorClasses,
  inferMs,
  isLoadingFrame,
  isInferring,
  onBack,
  onRootChange,
  onOpenRoot,
  onSettingChange,
  onGroupChange,
  onCheckpointChange,
  onFrameChange,
  onInfer,
  onClassify,
}: {
  notice: Notice | null;
  rootInput: string;
  snapshot: ModelTestSnapshot | null;
  settings: WorkspaceSettings | null;
  groupId: string;
  checkpointPath: string;
  frameIds: string[];
  frameId: string;
  points: PointRecord[];
  displayBoxes: AnnotationBox[];
  coloredBoxes: AnnotationBox[];
  coneColorClasses: ClassDefinition[];
  inferMs: number | null;
  isLoadingFrame: boolean;
  isInferring: boolean;
  onBack: () => void;
  onRootChange: (v: string) => void;
  onOpenRoot: () => void;
  onSettingChange: (field: keyof WorkspaceSettings, value: string | number) => void;
  onGroupChange: (v: string) => void;
  onCheckpointChange: (v: string) => void;
  onFrameChange: (v: string) => void;
  onInfer: () => void;
  onClassify: () => void;
}) {
  const target = snapshot?.target ?? null;
  const groups = target?.groups ?? [];
  const checkpointCandidates = snapshot?.checkpoint_candidates ?? [];
  const showGroupSelect = groups.length > 1;
  const hasRawBoxes = displayBoxes.length > 0;
  const isClassified = coloredBoxes.length > 0;
  const redCount = coloredBoxes.filter((b) => b.class_name === "RedCone").length;
  const blueCount = coloredBoxes.filter((b) => b.class_name === "BlueCone").length;

  return (
    <div className="entry-page entry-page--package">
      <div className="entry-page__hero" />
      <div className="entry-page__veil" />
      <div className="entry-page__content entry-page__content--package">
        <div className="entry-page__brand">
          <div className="logo-mark">CC</div>
          <div>
            <div className="entry-page__eyebrow">BIT FSD Cone Workflow</div>
            <h1>锥桶颜色分析</h1>
            <p>基于 range-normalized intensity 自动区分红/蓝锥桶。先推理出 Cone 位置，再点「计算红蓝」分类。</p>
          </div>
        </div>

        {notice && <NoticeBanner notice={notice} />}

        <section className="entry-card model-test-panel">
          <div className="model-test-panel__header">
            <div>
              <div className="entry-card__title">颜色分析</div>
              <div className="model-test-panel__subtitle">I_norm = mean(intensity) × r²，高强度→红，低强度→蓝</div>
            </div>
            <div className="model-test-panel__chips">
              <span>{frameIds.length} 帧</span>
              <span style={{ color: "#ff4444" }}>红 {redCount}</span>
              <span style={{ color: "#4488ff" }}>蓝 {blueCount}</span>
              <span>{inferMs != null ? `${Math.round(inferMs)} ms` : "未推理"}</span>
            </div>
          </div>

          <div className="model-test-panel__grid">
            <div className="model-test-panel__controls">
              <label className="field-group">
                <span className="field-label">数据根目录</span>
                <input
                  placeholder="/sda1/fsd/pc_raw_group/autox_2025"
                  value={rootInput}
                  onChange={(e) => onRootChange(e.target.value)}
                />
                <span className="field-hint">支持原始 group_* 目录或包含多个 group 的父目录。</span>
              </label>
              <div className="button-row">
                <button className="ghost-button" onClick={onBack} type="button">返回首页</button>
                <button className="secondary-button" onClick={onOpenRoot} type="button">载入目录</button>
              </div>

              {showGroupSelect && (
                <label className="field-group">
                  <span className="field-label">选择 Group</span>
                  <select value={groupId} onChange={(e) => onGroupChange(e.target.value)}>
                    {groups.map((g) => (
                      <option key={g.group_id} value={g.group_id}>{g.group_id} · {g.frame_count} 帧</option>
                    ))}
                  </select>
                </label>
              )}

              <label className="field-group">
                <span className="field-label">训练权重</span>
                <select
                  value={checkpointCandidates.includes(checkpointPath) ? checkpointPath : ""}
                  onChange={(e) => onCheckpointChange(e.target.value)}
                >
                  <option value="">手动输入路径</option>
                  {checkpointCandidates.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="field-group">
                <span className="field-label">权重路径</span>
                <input value={checkpointPath} onChange={(e) => onCheckpointChange(e.target.value)} />
              </label>

              <label className="field-group">
                <span className="field-label">Model Config</span>
                <input
                  placeholder="/path/to/pointpillar_cone.yaml"
                  value={settings?.model_config_path ?? ""}
                  onChange={(e) => onSettingChange("model_config_path", e.target.value)}
                />
              </label>
              <label className="field-group">
                <span className="field-label">OpenPCDet Root</span>
                <input
                  placeholder="/path/to/OpenPCDet"
                  value={settings?.openpcdet_root ?? ""}
                  onChange={(e) => onSettingChange("openpcdet_root", e.target.value)}
                />
              </label>
              <label className="field-group">
                <span className="field-label">Score Threshold</span>
                <input
                  min={0} max={1} step={0.01} type="number"
                  value={settings?.score_threshold ?? 0.3}
                  onChange={(e) => onSettingChange("score_threshold", Number(e.target.value))}
                />
              </label>

              <label className="field-group">
                <span className="field-label">当前帧</span>
                <select disabled={!frameIds.length} value={frameId} onChange={(e) => onFrameChange(e.target.value)}>
                  {frameIds.map((id) => <option key={id} value={id}>{id}</option>)}
                </select>
              </label>

              <div className="button-row">
                <button
                  className="ghost-button"
                  disabled={!frameIds.length || !frameId}
                  onClick={() => {
                    const idx = frameIds.indexOf(frameId);
                    if (idx > 0) onFrameChange(frameIds[idx - 1]);
                  }}
                  type="button"
                >上一帧</button>
                <button
                  className="ghost-button"
                  disabled={!frameIds.length || !frameId}
                  onClick={() => {
                    const idx = frameIds.indexOf(frameId);
                    if (idx >= 0 && idx < frameIds.length - 1) onFrameChange(frameIds[idx + 1]);
                  }}
                  type="button"
                >下一帧</button>
              </div>

              <div className="button-row">
                <button
                  className="secondary-button"
                  disabled={!frameId || !checkpointPath.trim() || isLoadingFrame || isInferring}
                  onClick={onInfer}
                  type="button"
                >
                  {isInferring ? "推理中..." : "推理当前帧"}
                </button>
                <button
                  className="primary-button"
                  disabled={!hasRawBoxes || isInferring}
                  onClick={onClassify}
                  type="button"
                >
                  计算红蓝
                </button>
              </div>

              {isClassified && (
                <div className="model-test-panel__predictions">
                  {coloredBoxes.map((box) => (
                    <div className="model-test-panel__prediction" key={box.box_id}
                      style={{ borderLeft: `3px solid ${box.class_name === "RedCone" ? "#ff4444" : "#4488ff"}` }}>
                      <span>{box.class_name}</span>
                      <strong>{box.score != null ? box.score.toFixed(3) : "-"}</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="model-test-panel__viewer">
              {points.length ? (
                <FrameCanvas
                  mode="view3d"
                  readOnly
                  points={points}
                  boxes={displayBoxes}
                  classes={coneColorClasses}
                  selectedIds={[]}
                  onSelect={() => {}}
                  onMoveSelected={() => {}}
                  onRotateSelected={() => {}}
                  onCreateBox={() => {}}
                />
              ) : (
                <div className="empty-state model-test-panel__empty">
                  {isLoadingFrame ? "正在载入点云..." : "载入目录并选择帧后显示点云，推理后显示预测框。"}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function PackageScreen({
  notice,
  bagInput,
  outputInput,
  topicInput,
  packageTargetInfo,
  packageTask,
  minTravelM,
  onBack,
  onBagChange,
  onOutputChange,
  onTopicChange,
  onMinTravelMChange,
  onPickBag,
  onPickOutput,
  onPackage,
  onEnterGroup,
}: {
  notice: Notice | null;
  bagInput: string;
  outputInput: string;
  topicInput: string;
  packageTargetInfo: WorkspaceTargetInfo | null;
  packageTask: TaskRecord | null;
  minTravelM: number;
  onBack: () => void;
  onBagChange: (value: string) => void;
  onOutputChange: (value: string) => void;
  onTopicChange: (value: string) => void;
  onMinTravelMChange: (value: number) => void;
  onPickBag: () => void;
  onPickOutput: () => void;
  onPackage: () => void;
  onEnterGroup: (mode: WorkspaceMode, workspaceRootPath: string, groupId: string, groupWorkspacePath: string) => void;
}) {
  const groups = packageTargetInfo?.kind === "group_root" ? packageTargetInfo.groups : [];
  const totalFrames = groups.reduce((sum, group) => sum + group.frame_count, 0);
  const totalAnnotated = groups.reduce((sum, group) => sum + group.annotated_count, 0);
  const totalReviewed = groups.reduce((sum, group) => sum + group.reviewed_count, 0);
  const nextGroupId = getNextGroupId(groups);
  const existingBagPath = packageTargetInfo?.bag_path?.trim() ?? "";
  const manifestOutputRoot = packageTargetInfo?.path?.trim() || outputInput.trim();
  const hasExistingGroups = groups.length > 0;
  const progress = getPackageTaskProgress(packageTask);
  const isPackaging = packageTask?.status === "pending" || packageTask?.status === "running";
  return (
    <div className="entry-page entry-page--package">
      <div className="entry-page__hero" />
      <div className="entry-page__veil" />
      <div className="entry-page__content entry-page__content--package">
        <div className="entry-page__brand">
          <div className="logo-mark">PC</div>
          <div>
            <div className="entry-page__eyebrow">BIT FSD Cone Workflow</div>
            <h1>Point Cloud Packager</h1>
            <p>选择 bag 和保存目录后开始分包。完成后会在下面展示每一组，方便直接进入标注或查看。</p>
          </div>
        </div>

        {notice && <NoticeBanner notice={notice} />}

        <section className="package-hero-grid">
          <article className="entry-card entry-card--package package-pane package-pane--form">
            <div className="entry-card__title">点云分包</div>
            <label className="field-group">
              <span className="field-label">ROS2 Bag</span>
              <input placeholder="/path/to/ros2_bag" value={bagInput} onChange={(event) => onBagChange(event.target.value)} />
            </label>
            <label className="field-group">
              <span className="field-label">保存目录</span>
              <input placeholder="/path/to/group_output" value={outputInput} onChange={(event) => onOutputChange(event.target.value)} />
            </label>
            <label className="field-group">
              <span className="field-label">Topic</span>
              <input placeholder="auto detect if empty" value={topicInput} onChange={(event) => onTopicChange(event.target.value)} />
            </label>
            <label className="field-group">
              <span className="field-label">最小间距 (m)</span>
              <input
                type="number"
                min="0"
                step="0.1"
                value={minTravelM}
                onChange={(event) => onMinTravelMChange(Math.max(0, parseFloat(event.target.value) || 0))}
              />
            </label>
            <div className="button-row">
              <button className="ghost-button" onClick={onBack} type="button">
                返回首页
              </button>
              <button className="ghost-button" onClick={onPickBag} type="button">
                选择 Bag
              </button>
              <button className="ghost-button" onClick={onPickOutput} type="button">
                选择目录
              </button>
              <button className="secondary-button" disabled={isPackaging} onClick={onPackage} type="button">
                {isPackaging ? "分包中..." : "分包成组"}
              </button>
            </div>
            {packageTask && (
              <div className={`package-progress package-progress--${packageTask.status}`}>
                <div className="package-progress__header">
                  <div>
                    <div className="package-progress__eyebrow">分包进度</div>
                    <div className="package-progress__status">{getPackageTaskStatusLabel(packageTask.status)}</div>
                  </div>
                  <div className="package-progress__percent">
                    {progress?.percent != null
                      ? `${Math.round(progress.percent)}%`
                      : packageTask.status === "succeeded"
                        ? "100%"
                        : packageTask.status === "failed"
                          ? "ERR"
                          : "..."}
                  </div>
                </div>
                <div className="package-progress__bar">
                  <div
                    className={`package-progress__fill ${
                      progress?.percent == null && isPackaging ? "is-indeterminate" : ""
                    }`}
                    style={progress?.percent != null ? { width: `${clamp(progress.percent, 0, 100)}%` } : undefined}
                  />
                </div>
                <div className="package-progress__label">
                  {getTaskStatusText(packageTask, progress?.label, {
                    pending: "任务已启动，正在读取 bag",
                    running: "任务已启动，正在读取 bag",
                    paused: "任务已暂停",
                    succeeded: "分包完成",
                    failed: "分包失败",
                    cancelled: "任务已停止",
                  })}
                </div>
                <div className="package-progress__stats">
                  {progress?.current != null && progress?.total != null && <span>{progress.current} / {progress.total} 消息</span>}
                  {progress?.outputFrames != null && <span>{progress.outputFrames} 帧</span>}
                  {progress?.groupCount != null && <span>{progress.groupCount} 组</span>}
                  {progress?.mode && <span>{progress.mode === "append" ? "追加" : "覆盖"}</span>}
                </div>
              </div>
            )}
            <div className="entry-card__path">
              {minTravelM > 0
                ? `车辆每移动 ${minTravelM} m 取 1 帧，每 ${PACKAGE_GROUP_SIZE} 帧分成一组。`
                : `每 ${PACKAGE_FRAME_STEP} 帧取 1 帧，每 ${PACKAGE_GROUP_SIZE} 帧分成一组。`}
              适合多人并行标注。
            </div>
            <div className="entry-card__path">{outputInput || "No package output selected"}</div>
          </article>

          <article className="entry-card package-pane package-pane--summary">
            <div className="entry-card__title">输出概览</div>
            <div className="entry-stats entry-stats--package">
              <div className="entry-stat">
                <span>Groups</span>
                <strong>{groups.length}</strong>
              </div>
              <div className="entry-stat">
                <span>Frames</span>
                <strong>{totalFrames}</strong>
              </div>
              <div className="entry-stat">
                <span>Annotated</span>
                <strong>{totalAnnotated}</strong>
              </div>
              <div className="entry-stat">
                <span>Reviewed</span>
                <strong>{totalReviewed}</strong>
              </div>
            </div>
            <div className="package-meta-list">
              <div className="package-meta-item">
                <span>输出目录</span>
                <strong>{manifestOutputRoot || "未选择"}</strong>
              </div>
              <div className="package-meta-item">
                <span>已记录 Bag</span>
                <strong>{existingBagPath || "首次分包时会写入"}</strong>
              </div>
              <div className="package-meta-item">
                <span>下一组</span>
                <strong>{nextGroupId}</strong>
              </div>
            </div>
          </article>
        </section>

        <section className="entry-card package-gallery">
          <div className="package-gallery__header">
            <div className="entry-card__title">分组预览</div>
            <div className="package-gallery__badge">{hasExistingGroups ? `Next ${nextGroupId}` : "Awaiting Groups"}</div>
          </div>
          {!groups.length ? (
            <div className="empty-state package-gallery__empty">分包完成后，这里会以全屏网格展示每一组。</div>
          ) : (
            <div className="group-preview-grid group-preview-grid--full">
              {groups.map((group) => (
                <article className="group-preview-card" key={group.group_id}>
                  <div className="group-preview-card__title">{group.group_id}</div>
                  <div className="group-preview-card__meta">{group.start_frame_id} - {group.end_frame_id}</div>
                  <div className="group-preview-card__stats">
                    <span>{group.frame_count} 帧</span>
                    <span>{group.annotated_count} 已标</span>
                    <span>{group.reviewed_count} 已审</span>
                  </div>
                  <div className="button-row group-preview-card__actions">
                    <button
                      className="ghost-button"
                      onClick={() => onEnterGroup("review", manifestOutputRoot, group.group_id, group.workspace_path)}
                      type="button"
                    >
                      查看这组
                    </button>
                    <button
                      className="secondary-button"
                      onClick={() => onEnterGroup("annotate", manifestOutputRoot, group.group_id, group.workspace_path)}
                      type="button"
                    >
                      标注这组
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function TrainingScreen({
  notice,
  trainingRootInput,
  trainingTarget,
  trainingSnapshot,
  trainingTask,
  trainingTaskFailureDetail,
  trainingSettings,
  trainingSettingsDirty,
  trainingRunName,
  onBack,
  onRootChange,
  onPickTrainingRoot,
  onOpenTrainingRoot,
  onTrainingRunNameChange,
  onSettingChange,
  onSaveSettings,
  onSelectModelPreset,
  onStartTraining,
  onTrainingArgChange,
  onTrainingControl,
  onCopyTrainingErrorDetail,
}: {
  notice: Notice | null;
  trainingRootInput: string;
  trainingTarget: TrainingTargetInfo | null;
  trainingSnapshot: TrainingSnapshot | null;
  trainingTask: TaskRecord | null;
  trainingTaskFailureDetail: string;
  trainingSettings: WorkspaceSettings | null;
  trainingSettingsDirty: boolean;
  trainingRunName: string;
  onBack: () => void;
  onRootChange: (value: string) => void;
  onPickTrainingRoot: () => void;
  onOpenTrainingRoot: () => void;
  onTrainingRunNameChange: (value: string) => void;
  onSettingChange: (field: keyof WorkspaceSettings, value: string | number) => void;
  onSaveSettings: () => void;
  onSelectModelPreset: (presetId: string) => void;
  onStartTraining: () => void;
  onTrainingArgChange: (option: TrainArgOption, value: number | null) => void;
  onTrainingControl: (action: "pause" | "resume" | "stop") => void;
  onCopyTrainingErrorDetail: (text: string) => void;
}) {
  const target = trainingSnapshot?.target ?? trainingTarget;
  const groups = target?.groups ?? [];
  const modelPresets = trainingSnapshot?.model_presets ?? [];
  const totalFrames = target?.frame_count ?? groups.reduce((sum, group) => sum + group.frame_count, 0);
  const totalTrain = target?.train_count ?? groups.reduce((sum, group) => sum + group.train_count, 0);
  const totalVal = target?.val_count ?? groups.reduce((sum, group) => sum + group.val_count, 0);
  const totalLabeled = groups.reduce((sum, group) => sum + group.labeled_count, 0);
  const progress = getTrainingTaskProgress(trainingTask);
  const checkpointPath = trainingSettings?.checkpoint_path?.trim() ?? "";
  const selectedModelPreset =
    modelPresets.find((item) => item.model_config_path === (trainingSettings?.model_config_path?.trim() ?? "")) ?? null;
  const trainingFailureDetail =
    trainingTask?.status === "failed" ? trainingTaskFailureDetail || getTaskFailureDetail(trainingTask) : "";
  const trainArgs = parseTrainArgSettings(trainingSettings?.train_extra_args ?? "");
  const metricHistory = progress?.metricHistory ?? [];
  const isTrainingActive = isTaskActive(trainingTask);
  const isTrainingPaused = trainingTask?.status === "paused";
  const isTrainingStopping = getTaskBooleanFlag(trainingTask, "stopping");
  const overallPercent = progress?.percent ?? (trainingTask?.status === "succeeded" ? 100 : 0);
  const trainPercent = progress?.trainPercent ?? null;
  const epochPercent = progress?.epochPercent ?? null;
  const etaLabel = formatDuration(progress?.etaSeconds ?? null);
  const epochEtaLabel = formatDuration(progress?.epochEtaSeconds ?? null);
  const elapsedLabel = formatDuration(progress?.elapsedSeconds ?? null);
  const epochElapsedLabel = formatDuration(progress?.epochElapsedSeconds ?? null);
  const etaFinishLabel =
    progress?.etaSeconds != null ? new Date(Date.now() + progress.etaSeconds * 1000).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }) : "估算中";
  const latestCheckpoint =
    getTaskStringMetadata(trainingTask, "checkpoint_path") || checkpointPath || "训练成功后自动回填";
  const currentEpochLabel =
    progress?.epoch != null && progress?.totalEpochs != null ? `${progress.epoch} / ${progress.totalEpochs}` : "等待训练";
  const currentIterLabel =
    progress?.iter != null && progress?.itersPerEpoch != null ? `${progress.iter} / ${progress.itersPerEpoch}` : "-";

  return (
    <div className="entry-page entry-page--package entry-page--training">
      <div className="entry-page__hero" />
      <div className="entry-page__veil" />
      <div className="entry-page__content entry-page__content--package">
        <div className="entry-page__brand">
          <div className="logo-mark">PC</div>
          <div>
            <div className="entry-page__eyebrow">BIT FSD Cone Workflow</div>
            <h1>OpenPCDet Trainer</h1>
            <p>训练页只使用已经导出的 OpenPCDet 数据目录。选中根目录后会自动兼容里面多个 `group_*`，并在训练前聚合成一套无冲突的数据集。</p>
          </div>
        </div>

        {notice && <NoticeBanner notice={notice} />}

        <section className="package-hero-grid">
          <article className="entry-card entry-card--package package-pane package-pane--form">
            <div className="entry-card__title">训练数据</div>
            <label className="field-group">
              <span className="field-label">训练根目录</span>
              <input
                placeholder="/sda1/fsd/cone_annoated"
                value={trainingRootInput}
                onChange={(event) => onRootChange(event.target.value)}
              />
              <span className="field-hint">
                可选单个导出组目录，也可直接选包含多个 `group_*` 的父目录。
              </span>
            </label>
            <label className="field-group">
              <span className="field-label">训练任务名</span>
              <input
                placeholder="例如 pointpillar_clean_v1"
                value={trainingRunName}
                onChange={(event) => onTrainingRunNameChange(event.target.value)}
              />
              <span className="field-hint">
                留空时会回退到时间戳；填写后训练目录和输出 tag 会优先使用这个名字。
              </span>
            </label>
            <div className="button-row">
              <button className="ghost-button" onClick={onBack} type="button">
                返回首页
              </button>
              <button className="ghost-button" onClick={onPickTrainingRoot} type="button">
                选择目录
              </button>
              <button className="ghost-button" onClick={onOpenTrainingRoot} type="button">
                载入目录
              </button>
              <button className="secondary-button" disabled={isTrainingActive || !trainingSettings || isTrainingStopping} onClick={onStartTraining} type="button">
                {isTrainingActive ? "训练中..." : "开始训练"}
              </button>
            </div>
            <div className="entry-card__path">
              训练前会把样本重命名成 `group_xxx__frame_id`，避免不同组里的 `0000000.npy` 冲突。
            </div>
            <div className="entry-card__path">{trainingSnapshot?.root_path || trainingRootInput || "No training root selected"}</div>
          </article>

          <article className="entry-card package-pane package-pane--summary training-monitor">
            <div className="training-monitor__header">
              <div>
                <div className="entry-card__title">训练监控</div>
                <div className="training-monitor__subtitle">
                  {getTaskStatusText(trainingTask, progress?.label, {
                    pending: "正在准备训练任务",
                    running: "正在等待训练日志",
                    succeeded: "训练完成",
                    failed: "训练失败",
                    paused: "训练已暂停",
                    cancelled: "训练已停止",
                  })}
                </div>
              </div>
              <div className="training-monitor__actions">
                <button
                  className="ghost-button"
                  disabled={!trainingTask || trainingTask.status !== "running" || isTrainingStopping}
                  onClick={() => onTrainingControl("pause")}
                  type="button"
                >
                  暂停训练
                </button>
                <button
                  className="secondary-button"
                  disabled={!trainingTask || !isTrainingPaused || isTrainingStopping}
                  onClick={() => onTrainingControl("resume")}
                  type="button"
                >
                  继续训练
                </button>
                <button
                  className="danger-button"
                  disabled={!trainingTask || !isTrainingActive || isTrainingStopping}
                  onClick={() => onTrainingControl("stop")}
                  type="button"
                >
                  {isTrainingStopping ? "停止中..." : "停止训练"}
                </button>
              </div>
            </div>

            <div className={`package-progress package-progress--${trainingTask?.status ?? "pending"} training-monitor__progress-card`}>
              <div className="package-progress__header">
                <div>
                  <div className="package-progress__eyebrow">总体进度</div>
                  <div className="package-progress__status">{trainingTask ? getPackageTaskStatusLabel(trainingTask.status) : "待启动"}</div>
                </div>
                <div className="package-progress__percent">{Math.round(clamp(overallPercent, 0, 100))}%</div>
              </div>
              <div className="package-progress__bar">
                <div
                  className={`package-progress__fill ${
                    overallPercent <= 0 && isTrainingActive ? "is-indeterminate" : ""
                  }`}
                  style={overallPercent > 0 ? { width: `${clamp(overallPercent, 0, 100)}%` } : undefined}
                />
              </div>
              <div className="training-monitor__micro-grid">
                <div className="training-monitor__micro-card">
                  <span>Epoch</span>
                  <strong>{currentEpochLabel}</strong>
                </div>
                <div className="training-monitor__micro-card">
                  <span>Iter</span>
                  <strong>{currentIterLabel}</strong>
                </div>
                <div className="training-monitor__micro-card">
                  <span>ETA</span>
                  <strong>{isTrainingPaused ? "已暂停" : etaLabel}</strong>
                </div>
                <div className="training-monitor__micro-card">
                  <span>预计完成</span>
                  <strong>{isTrainingPaused ? "-" : etaFinishLabel}</strong>
                </div>
              </div>
            </div>

            <div className="training-monitor__bars">
              <div className="training-monitor__bar-card">
                <div className="training-monitor__bar-header">
                  <span>训练阶段</span>
                  <strong>{trainPercent != null ? `${Math.round(trainPercent)}%` : "-"}</strong>
                </div>
                <div className="package-progress__bar training-monitor__subbar">
                  <div className="package-progress__fill" style={trainPercent != null ? { width: `${clamp(trainPercent, 0, 100)}%` } : { width: "0%" }} />
                </div>
              </div>
              <div className="training-monitor__bar-card">
                <div className="training-monitor__bar-header">
                  <span>当前 Epoch</span>
                  <strong>{epochPercent != null ? `${Math.round(epochPercent)}%` : "-"}</strong>
                </div>
                <div className="package-progress__bar training-monitor__subbar">
                  <div className="package-progress__fill" style={epochPercent != null ? { width: `${clamp(epochPercent, 0, 100)}%` } : { width: "0%" }} />
                </div>
              </div>
            </div>

            <div className="training-monitor__grid">
              <div className="training-monitor__metric">
                <span>Loss</span>
                <strong>{formatMetricNumber(progress?.loss ?? null)}</strong>
              </div>
              <div className="training-monitor__metric">
                <span>Avg Loss</span>
                <strong>{formatMetricNumber(progress?.lossAvg ?? null)}</strong>
              </div>
              <div className="training-monitor__metric">
                <span>Learning Rate</span>
                <strong>{formatMetricNumber(progress?.lr ?? null, 6)}</strong>
              </div>
              <div className="training-monitor__metric">
                <span>已用时间</span>
                <strong>{elapsedLabel}</strong>
              </div>
              <div className="training-monitor__metric">
                <span>本轮耗时</span>
                <strong>{epochElapsedLabel}</strong>
              </div>
              <div className="training-monitor__metric">
                <span>本轮剩余</span>
                <strong>{epochEtaLabel}</strong>
              </div>
            </div>

            <TrainingLossChart history={metricHistory} />

            <div className="training-monitor__dataset">
              <span>{groups.length} 组</span>
              <span>{totalFrames} 帧</span>
              <span>{totalTrain} train</span>
              <span>{totalVal} val</span>
              <span>{totalLabeled} labels</span>
            </div>

            <div className="package-meta-list training-monitor__meta-list">
              <div className="package-meta-item">
                <span>最新 Checkpoint</span>
                <strong>{latestCheckpoint}</strong>
              </div>
              <div className="package-meta-item">
                <span>目录状态</span>
                <strong>{getTrainingTargetLabel(target?.kind)}</strong>
              </div>
              <div className="package-meta-item">
                <span>训练日志</span>
                <strong>{trainingTask?.log_path ?? "待生成"}</strong>
              </div>
            </div>

            {trainingTask?.status === "failed" && trainingFailureDetail && (
              <details className="package-progress__details" open>
                <summary>错误详情</summary>
                <pre>{trainingFailureDetail}</pre>
                <div className="package-progress__detail-actions">
                  <button
                    className="ghost-button package-progress__copy-button"
                    onClick={() => onCopyTrainingErrorDetail(trainingFailureDetail)}
                    type="button"
                  >
                    复制报错
                  </button>
                </div>
                <div className="package-progress__detail-path">{trainingTask.log_path}</div>
              </details>
            )}
          </article>
        </section>

        <section className="entry-card entry-card--workspace">
          <div className="entry-card__title">训练设置</div>
          {trainingSettings ? (
            <>
              <div className="settings-grid">
                <LabeledInput label="Python" value={trainingSettings.python_bin} onChange={(value) => onSettingChange("python_bin", value)} />
                <LabeledInput
                  label="OpenPCDet Root"
                  value={trainingSettings.openpcdet_root}
                  onChange={(value) => onSettingChange("openpcdet_root", value)}
                />
                <ModelPresetSelect
                  label="Model Preset"
                  value={selectedModelPreset?.id ?? ""}
                  presets={modelPresets}
                  hint={
                    selectedModelPreset?.description ??
                    "选择已适配的 OpenPCDet 模型模板，会自动填写 Model Config。"
                  }
                  onChange={onSelectModelPreset}
                />
                <LabeledInput
                  label="Model Config"
                  value={trainingSettings.model_config_path}
                  onChange={(value) => onSettingChange("model_config_path", value)}
                />
                <LabeledInput
                  label="Dataset Config"
                  value={trainingSettings.dataset_config_path}
                  onChange={(value) => onSettingChange("dataset_config_path", value)}
                />
                <LabeledInput
                  label="Checkpoint"
                  value={trainingSettings.checkpoint_path}
                  onChange={(value) => onSettingChange("checkpoint_path", value)}
                />
                <LabeledNumberInput
                  label="Train Epochs"
                  value={trainArgs.epochs}
                  min={1}
                  onChange={(value) => onTrainingArgChange("epochs", value)}
                />
                <LabeledNumberInput
                  label="Batch Size"
                  value={trainArgs.batch_size}
                  min={1}
                  onChange={(value) => onTrainingArgChange("batch_size", value)}
                />
                <LabeledNumberInput
                  label="Workers"
                  value={trainArgs.workers}
                  min={0}
                  onChange={(value) => onTrainingArgChange("workers", value)}
                />
                <LabeledNumberInput
                  label="Log Interval"
                  value={trainArgs.logger_iter_interval}
                  min={1}
                  onChange={(value) => onTrainingArgChange("logger_iter_interval", value)}
                />
                <LabeledNumberInput
                  label="Save Every Steps"
                  value={trainArgs.ckpt_save_step_interval}
                  min={1}
                  onChange={(value) => onTrainingArgChange("ckpt_save_step_interval", value)}
                />
                <LabeledInput
                  label="Train Args"
                  value={trainingSettings.train_extra_args}
                  onChange={(value) => onSettingChange("train_extra_args", value)}
                />
              </div>
              <div className="button-row">
                <button className="secondary-button" disabled={!trainingSettingsDirty} onClick={onSaveSettings} type="button">
                  保存训练设置
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state">载入训练目录后可编辑 OpenPCDet 训练设置。</div>
          )}
        </section>

        <section className="entry-card package-gallery">
          <div className="package-gallery__header">
            <div className="entry-card__title">Group 预览</div>
            <div className="package-gallery__badge">{groups.length ? `${groups.length} Groups Ready` : "Awaiting Dataset"}</div>
          </div>
          {!groups.length ? (
            <div className="empty-state package-gallery__empty">选中导出目录后，这里会展示训练时会被聚合进去的每一个 group。</div>
          ) : (
            <div className="group-preview-grid group-preview-grid--full">
              {groups.map((group) => (
                <article className="group-preview-card" key={group.group_id}>
                  <div className="group-preview-card__title">{group.group_id}</div>
                  <div className="group-preview-card__meta">{group.dataset_path}</div>
                  <div className="group-preview-card__stats">
                    <span>{group.frame_count} 帧</span>
                    <span>{group.labeled_count} labels</span>
                    <span>{group.train_count} train</span>
                    <span>{group.val_count} val</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function TrainingLossChart({ history }: { history: TrainingMetricPoint[] }) {
  const recentHistory = history.slice(-120);
  const chartWidth = 760;
  const chartHeight = 240;
  const paddingTop = 18;
  const paddingRight = 14;
  const paddingBottom = 24;
  const paddingLeft = 40;
  const drawableWidth = chartWidth - paddingLeft - paddingRight;
  const drawableHeight = chartHeight - paddingTop - paddingBottom;
  const numericValues = recentHistory.flatMap((point) =>
    [point.loss, point.lossAvg].filter((value): value is number => value != null && Number.isFinite(value)),
  );

  const latestPoint = recentHistory[recentHistory.length - 1] ?? null;
  const bestAvgLoss = recentHistory.reduce<number | null>((best, point) => {
    if (point.lossAvg == null || !Number.isFinite(point.lossAvg)) {
      return best;
    }
    return best == null ? point.lossAvg : Math.min(best, point.lossAvg);
  }, null);

  if (!numericValues.length) {
    return (
      <section className="training-loss-chart training-loss-chart--empty">
        <div className="training-loss-chart__header">
          <div>
            <div className="training-loss-chart__eyebrow">损失曲线</div>
            <div className="training-loss-chart__title">等待训练日志</div>
          </div>
        </div>
        <div className="training-loss-chart__empty">训练开始输出 `Loss` 后，这里会实时显示折线。</div>
      </section>
    );
  }

  const rawMin = Math.min(...numericValues);
  const rawMax = Math.max(...numericValues);
  const paddedRange = rawMax - rawMin > 1e-9 ? rawMax - rawMin : Math.max(Math.abs(rawMax), 1) * 0.2;
  const minValue = Math.max(0, rawMin - paddedRange * 0.12);
  const maxValue = rawMax + paddedRange * 0.12;
  const totalRange = Math.max(maxValue - minValue, 1e-9);

  const toX = (index: number) => {
    if (recentHistory.length <= 1) {
      return paddingLeft + drawableWidth / 2;
    }
    return paddingLeft + (index / (recentHistory.length - 1)) * drawableWidth;
  };
  const toY = (value: number) => paddingTop + ((maxValue - value) / totalRange) * drawableHeight;
  const guideValues = [maxValue, maxValue - totalRange / 2, minValue];
  const lossPath = buildTrainingMetricPath(
    recentHistory.map((point, index) =>
      point.loss == null ? null : { x: toX(index), y: toY(point.loss) },
    ),
  );
  const avgPath = buildTrainingMetricPath(
    recentHistory.map((point, index) =>
      point.lossAvg == null ? null : { x: toX(index), y: toY(point.lossAvg) },
    ),
  );

  return (
    <section className="training-loss-chart">
      <div className="training-loss-chart__header">
        <div>
          <div className="training-loss-chart__eyebrow">损失曲线</div>
          <div className="training-loss-chart__title">最近 {recentHistory.length} 个训练点</div>
        </div>
        <div className="training-loss-chart__legend">
          <span className="training-loss-chart__legend-item training-loss-chart__legend-item--loss">Loss</span>
          <span className="training-loss-chart__legend-item training-loss-chart__legend-item--avg">Avg Loss</span>
        </div>
      </div>

      <div className="training-loss-chart__summary">
        <span>当前 Loss {formatMetricNumber(latestPoint?.loss ?? null)}</span>
        <span>当前 Avg {formatMetricNumber(latestPoint?.lossAvg ?? null)}</span>
        <span>最佳 Avg {formatMetricNumber(bestAvgLoss)}</span>
      </div>

      <div className="training-loss-chart__canvas">
        <svg aria-label="training loss chart" role="img" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
          {guideValues.map((value, index) => {
            const y = toY(value);
            return (
              <g key={`guide-${index}`}>
                <line className="training-loss-chart__guide" x1={paddingLeft} x2={chartWidth - paddingRight} y1={y} y2={y} />
                <text className="training-loss-chart__guide-label" x={8} y={y + 4}>
                  {formatMetricNumber(value)}
                </text>
              </g>
            );
          })}
          {avgPath && <path className="training-loss-chart__path training-loss-chart__path--avg" d={avgPath} />}
          {lossPath && <path className="training-loss-chart__path training-loss-chart__path--loss" d={lossPath} />}
        </svg>
      </div>

      <div className="training-loss-chart__footer">
        <span>{formatTrainingMetricPointLabel(recentHistory[0] ?? null)}</span>
        <span>{formatTrainingMetricPointLabel(latestPoint)}</span>
      </div>
    </section>
  );
}

function FieldSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (next: string) => void;
}) {
  return (
    <label className="field-group">
      <span className="field-label">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">-</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

function ModelPresetSelect({
  label,
  value,
  presets,
  hint,
  onChange,
}: {
  label: string;
  value: string;
  presets: OpenpcdetModelPreset[];
  hint?: string;
  onChange: (next: string) => void;
}) {
  return (
    <label className="field-group">
      <span className="field-label">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Custom</option>
        {presets.map((preset) => (
          <option key={preset.id} value={preset.id}>
            {preset.label}
          </option>
        ))}
      </select>
      {hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  type = "text",
  step,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  step?: string;
}) {
  return (
    <label className="field-group">
      <span className="field-label">{label}</span>
      <input step={step} type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function LabeledNumberInput({
  label,
  value,
  onChange,
  min,
}: {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  min?: number;
}) {
  return (
    <label className="field-group">
      <span className="field-label">{label}</span>
      <input
        min={min}
        type="number"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value === "" ? null : Number.parseInt(event.target.value, 10))}
      />
    </label>
  );
}

function VectorEditor({
  label,
  values,
  onChange,
}: {
  label: string;
  values: [number, number, number];
  onChange: (axis: number, value: string) => void;
}) {
  return (
    <div className="field-group">
      <span className="field-label">{label}</span>
      <div className="vector-row">
        {values.map((value, axis) => (
          <input
            key={`${label}-${axis}`}
            step="0.01"
            type="number"
            value={value}
            onChange={(event) => onChange(axis, event.target.value)}
          />
        ))}
      </div>
    </div>
  );
}

function StatChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat-chip">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function StatusDot({ reviewStatus }: { reviewStatus?: ReviewStatus }) {
  return <span className={`status-dot status-dot--${reviewStatus ?? "empty"}`} />;
}

function cloneAnnotation(annotation: FrameAnnotation): FrameAnnotation {
  return {
    ...annotation,
    boxes: annotation.boxes.map((box) => ({
      ...box,
      center_xyz: [...box.center_xyz] as [number, number, number],
      size_lwh: [...box.size_lwh] as [number, number, number],
    })),
  };
}

function normalizeClassDefinitions(classes: ClassDefinition[]): ClassDefinition[] {
  const source = Array.isArray(classes) ? classes : [];
  const normalized = source
    .map((item, index) => {
      const trimmedName = item?.name?.trim();
      if (!trimmedName) {
        return null;
      }
      const baseId = item?.id?.trim() || slugifyClassName(trimmedName) || `class_${index + 1}`;
      return {
        id: baseId,
        name: trimmedName,
        color: normalizeHexColor(item?.color),
        default_size: sanitizeDefaultSize(item?.default_size),
      };
    })
    .filter((item): item is ClassDefinition => item !== null);

  if (!normalized.length) {
    return DEFAULT_CLASS_DEFINITIONS.map((item) => ({
      ...item,
      default_size: [...item.default_size] as [number, number, number],
    }));
  }

  const seenIds = new Set<string>();
  return normalized.map((item, index) => {
    let nextId = item.id;
    let suffix = 2;
    while (seenIds.has(nextId.toLowerCase())) {
      nextId = `${item.id}_${suffix}`;
      suffix += 1;
    }
    seenIds.add(nextId.toLowerCase());
    return {
      ...item,
      id: nextId,
      default_size: [...item.default_size] as [number, number, number],
      color: item.color || DEFAULT_CLASS_DEFINITIONS[index % DEFAULT_CLASS_DEFINITIONS.length]?.color || "#58a6ff",
    };
  });
}

function countBoxClasses(boxes: AnnotationBox[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const box of boxes) {
    if (box.class_name) {
      counts[box.class_name] = (counts[box.class_name] ?? 0) + 1;
    }
  }
  return counts;
}

function applyFrameSummary(snapshot: WorkspaceSnapshot, summary: FrameSummary): WorkspaceSnapshot {
  const frames = snapshot.frames.map((item) => (item.frame_id === summary.frame_id ? summary : item));
  if (!frames.some((item) => item.frame_id === summary.frame_id)) {
    frames.push(summary);
    frames.sort((left, right) => left.frame_id.localeCompare(right.frame_id));
  }
  return {
    ...snapshot,
    frames,
    review_queue: frames
      .filter((item) => item.review_status === "unreviewed")
      .map((item) => item.frame_id),
  };
}

function collectFrameRange(frames: FrameSummary[], startId: string, endId: string): string[] {
  if (!startId || !endId) {
    return [];
  }
  const ids = frames.map((frame) => frame.frame_id);
  const startIndex = ids.indexOf(startId);
  const endIndex = ids.indexOf(endId);
  if (startIndex < 0 || endIndex < 0) {
    return [];
  }
  const from = Math.min(startIndex, endIndex);
  const to = Math.max(startIndex, endIndex);
  return ids.slice(from, to + 1);
}

function normalizeYaw(value: number) {
  let next = value;
  while (next > Math.PI) {
    next -= Math.PI * 2;
  }
  while (next < -Math.PI) {
    next += Math.PI * 2;
  }
  return next;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getNextGroupId(groups: { group_id: string }[]) {
  const maxIndex = groups.reduce((currentMax, group) => {
    const match = group.group_id.match(/group_(\d+)$/i);
    if (!match) {
      return currentMax;
    }
    return Math.max(currentMax, Number.parseInt(match[1], 10));
  }, 0);
  return `group_${String(maxIndex + 1).padStart(3, "0")}`;
}

function getPackageTaskStatusLabel(status: TaskRecord["status"]) {
  if (status === "pending") {
    return "准备中";
  }
  if (status === "running") {
    return "处理中";
  }
  if (status === "paused") {
    return "已暂停";
  }
  if (status === "succeeded") {
    return "已完成";
  }
  if (status === "cancelled") {
    return "已停止";
  }
  return "失败";
}

function getPackageTaskProgress(task: TaskRecord | null) {
  const source = task?.metadata?.progress;
  if (!source || typeof source !== "object" || Array.isArray(source)) {
    return null;
  }
  const raw = source as Record<string, unknown>;
  return {
    percent: toFiniteNumber(raw.percent),
    current: toFiniteNumber(raw.current),
    total: toFiniteNumber(raw.total),
    label: typeof raw.label === "string" ? raw.label : "",
    outputFrames: toFiniteNumber(raw.output_frames),
    groupCount: toFiniteNumber(raw.group_count),
    mode: raw.mode === "append" || raw.mode === "replace" ? raw.mode : undefined,
  };
}

function getTrainingTaskProgress(task: TaskRecord | null) {
  const source = task?.metadata?.progress;
  if (!source || typeof source !== "object" || Array.isArray(source)) {
    return null;
  }
  const raw = source as Record<string, unknown>;
  return {
    percent: toFiniteNumber(raw.percent),
    label: typeof raw.label === "string" ? raw.label : "",
    groupCount: toFiniteNumber(raw.group_count),
    frameCount: toFiniteNumber(raw.frame_count),
    trainCount: toFiniteNumber(raw.train_count),
    valCount: toFiniteNumber(raw.val_count),
    classCount: toFiniteNumber(raw.class_count),
    trainPercent: toFiniteNumber(raw.train_percent),
    epochPercent: toFiniteNumber(raw.epoch_percent),
    epoch: toFiniteNumber(raw.epoch),
    totalEpochs: toFiniteNumber(raw.total_epochs),
    iter: toFiniteNumber(raw.iter),
    itersPerEpoch: toFiniteNumber(raw.iters_per_epoch),
    loss: toFiniteNumber(raw.loss),
    lossAvg: toFiniteNumber(raw.loss_avg),
    lr: toFiniteNumber(raw.lr),
    elapsedSeconds: toFiniteNumber(raw.elapsed_seconds),
    etaSeconds: toFiniteNumber(raw.eta_seconds),
    epochElapsedSeconds: toFiniteNumber(raw.epoch_elapsed_seconds),
    epochEtaSeconds: toFiniteNumber(raw.epoch_eta_seconds),
    metricHistory: normalizeTrainingMetricHistory(raw.metric_history),
  };
}

function getTaskFailureDetail(task: TaskRecord | null) {
  const detail = task?.metadata?.error_detail;
  return typeof detail === "string" ? detail : "";
}

function formatTaskFailureLog(logText: string, fallback: string) {
  const lines = logText
    .split(/\r?\n/u)
    .map((line) => line.trimEnd())
    .filter((line) => line && !line.includes("@@progress@@"));
  if (!lines.length) {
    return fallback;
  }
  return lines.slice(-24).join("\n");
}

function getTaskStatusText(
  task: TaskRecord | null,
  progressLabel: string | undefined,
  fallbacks: { pending: string; running: string; paused: string; succeeded: string; failed: string; cancelled: string },
) {
  if (!task) {
    return "";
  }
  if (task.status === "failed") {
    return task.error || fallbacks.failed;
  }
  if (task.status === "cancelled") {
    return task.error || fallbacks.cancelled;
  }
  if (task.status === "succeeded") {
    return progressLabel || fallbacks.succeeded;
  }
  if (task.status === "paused") {
    return progressLabel || fallbacks.paused;
  }
  if (task.status === "running") {
    return progressLabel || fallbacks.running;
  }
  return progressLabel || fallbacks.pending;
}

function isTaskActive(task: TaskRecord | null | undefined) {
  return Boolean(task && (task.status === "pending" || task.status === "running" || task.status === "paused"));
}

function getTaskBooleanFlag(task: TaskRecord | null, key: string) {
  const progress = task?.metadata?.progress;
  if (!progress || typeof progress !== "object" || Array.isArray(progress)) {
    return false;
  }
  return Boolean((progress as Record<string, unknown>)[key]);
}

function getTaskStringMetadata(task: TaskRecord | null, key: string) {
  const value = task?.metadata?.[key];
  return typeof value === "string" ? value : "";
}

function parseTrainArgSettings(extraArgs: string) {
  return {
    epochs: parseTrainArgOption(extraArgs, "epochs"),
    workers: parseTrainArgOption(extraArgs, "workers"),
    batch_size: parseTrainArgOption(extraArgs, "batch_size"),
    logger_iter_interval: parseTrainArgOption(extraArgs, "logger_iter_interval"),
    ckpt_save_step_interval: parseTrainArgOption(extraArgs, "ckpt_save_step_interval"),
  };
}

function parseTrainArgOption(extraArgs: string, option: TrainArgOption) {
  const directMatch = extraArgs.match(new RegExp(`(?:^|\\s)--${option}=(\\d+)(?=\\s|$)`));
  if (directMatch) {
    return Number.parseInt(directMatch[1], 10);
  }
  const spacedMatch = extraArgs.match(new RegExp(`(?:^|\\s)--${option}\\s+(\\d+)(?=\\s|$)`));
  if (spacedMatch) {
    return Number.parseInt(spacedMatch[1], 10);
  }
  return null;
}

function updateTrainArgsOption(extraArgs: string, option: TrainArgOption, value: number | null) {
  const tokens = extraArgs.trim().length ? extraArgs.trim().split(/\s+/u) : [];
  const nextTokens: string[] = [];
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token === `--${option}`) {
      index += 1;
      continue;
    }
    if (token.startsWith(`--${option}=`)) {
      continue;
    }
    nextTokens.push(token);
  }
  if (value != null && Number.isFinite(value)) {
    nextTokens.push(`--${option}`, String(Math.max(0, value)));
  }
  return nextTokens.join(" ").trim();
}

function formatDuration(seconds: number | null) {
  if (seconds == null || !Number.isFinite(seconds) || seconds < 0) {
    return "估算中";
  }
  const totalSeconds = Math.max(0, Math.round(seconds));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, "0")}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${String(remainingSeconds).padStart(2, "0")}s`;
  }
  return `${remainingSeconds}s`;
}

function formatMetricNumber(value: number | null, digits = 4) {
  if (value == null || !Number.isFinite(value)) {
    return "-";
  }
  return value.toFixed(digits).replace(/0+$/u, "").replace(/\.$/u, "");
}

function normalizeTrainingMetricHistory(value: unknown): TrainingMetricPoint[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return null;
      }
      const raw = item as Record<string, unknown>;
      return {
        tsMs: toFiniteNumber(raw.ts_ms),
        epoch: toFiniteNumber(raw.epoch),
        totalEpochs: toFiniteNumber(raw.total_epochs),
        iter: toFiniteNumber(raw.iter),
        itersPerEpoch: toFiniteNumber(raw.iters_per_epoch),
        loss: toFiniteNumber(raw.loss),
        lossAvg: toFiniteNumber(raw.loss_avg),
        lr: toFiniteNumber(raw.lr),
        elapsedSeconds: toFiniteNumber(raw.elapsed_seconds),
        etaSeconds: toFiniteNumber(raw.eta_seconds),
      };
    })
    .filter((item): item is TrainingMetricPoint => item !== null)
    .filter((item) => item.loss != null || item.lossAvg != null);
}

function buildTrainingMetricPath(points: Array<{ x: number; y: number } | null>) {
  let path = "";
  let hasActiveSegment = false;
  for (const point of points) {
    if (!point) {
      hasActiveSegment = false;
      continue;
    }
    const command = hasActiveSegment ? "L" : "M";
    path += `${command}${point.x.toFixed(2)},${point.y.toFixed(2)} `;
    hasActiveSegment = true;
  }
  return path.trim();
}

function formatTrainingMetricPointLabel(point: TrainingMetricPoint | null) {
  if (!point) {
    return "等待训练";
  }
  const epochLabel =
    point.epoch != null && point.totalEpochs != null ? `Epoch ${point.epoch}/${point.totalEpochs}` : "Epoch -";
  const iterLabel =
    point.iter != null && point.itersPerEpoch != null ? `Iter ${point.iter}/${point.itersPerEpoch}` : "Iter -";
  return `${epochLabel}  ${iterLabel}`;
}

function normalizeInferenceBoxes(result: TrainingInferenceResult): AnnotationBox[] {
  const boxes = Array.isArray(result.boxes) ? result.boxes : [];
  return boxes.map((box, index) => ({
    box_id: `${result.frame_id}_pred_${index}`,
    class_name: box.class_name,
    center_xyz: box.center_xyz,
    size_lwh: box.size_lwh,
    yaw: box.yaw,
    score: box.score ?? null,
  }));
}

function buildModelTestClasses(boxes: AnnotationBox[]): ClassDefinition[] {
  const palette = ["#74c0ff", "#ff8c69", "#5ed6a8", "#f4b740", "#b08cff", "#ff5d8f"];
  const existingNames = new Set(DEFAULT_CLASS_DEFINITIONS.map((item) => item.name));
  const extras = boxes
    .map((box) => box.class_name)
    .filter((name, index, items) => Boolean(name) && items.indexOf(name) === index && !existingNames.has(name))
    .map((name, index) => ({
      id: slugifyClassName(name) || `pred_class_${index + 1}`,
      name,
      color: palette[index % palette.length],
      default_size: [0.3, 0.3, 0.4] as [number, number, number],
    }));
  return [...DEFAULT_CLASS_DEFINITIONS, ...extras];
}

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);
  if (!copied) {
    throw new Error("copy failed");
  }
}

function getTrainingTargetLabel(kind?: TrainingTargetInfo["kind"]) {
  if (kind === "training_group_root") {
    return "多组训练根目录";
  }
  if (kind === "training_dataset") {
    return "单组训练目录";
  }
  if (kind === "missing") {
    return "目录不存在";
  }
  if (kind === "unknown") {
    return "不是可训练目录";
  }
  return "未选择";
}

function toFiniteNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function createDraftClass(existing: ClassDefinition[]) {
  const nextIndex = existing.length + 1;
  const name = createUniqueClassName(existing, `Class_${nextIndex}`);
  const id = createUniqueClassId(existing, slugifyClassName(name) || `class_${nextIndex}`);
  const palette = ["#5AA9FF", "#FF7A59", "#5ED6A8", "#F4B740", "#B08CFF", "#FF5D8F"];
  return {
    id,
    name,
    color: palette[existing.length % palette.length],
    default_size: [0.3, 0.3, 0.4] as [number, number, number],
  };
}

function prepareClassesForSave(classes: ClassDefinition[]) {
  const normalized = normalizeClassDefinitions(classes);
  if (!normalized.length) {
    return { classes: [], error: "至少保留一个类别" };
  }
  const seenNames = new Set<string>();
  for (const item of normalized) {
    if (!item.name.trim()) {
      return { classes: [], error: "类别名称不能为空" };
    }
    const nameKey = item.name.trim().toLowerCase();
    if (seenNames.has(nameKey)) {
      return { classes: [], error: `类别名称重复: ${item.name}` };
    }
    seenNames.add(nameKey);
    if (!isFiniteVector3(item.default_size) || item.default_size.some((value) => value <= 0)) {
      return { classes: [], error: `默认尺寸无效: ${item.name}` };
    }
  }
  return { classes: normalized, error: null };
}

function createUniqueClassName(existing: ClassDefinition[], baseName: string) {
  const trimmed = baseName.trim() || "Class";
  const existingNames = new Set(existing.map((item) => item.name.trim().toLowerCase()));
  if (!existingNames.has(trimmed.toLowerCase())) {
    return trimmed;
  }
  let index = 2;
  let nextName = `${trimmed}_${index}`;
  while (existingNames.has(nextName.toLowerCase())) {
    index += 1;
    nextName = `${trimmed}_${index}`;
  }
  return nextName;
}

function createUniqueClassId(existing: ClassDefinition[], baseId: string) {
  const trimmed = (baseId.trim() || "class").toLowerCase();
  const existingIds = new Set(existing.map((item) => item.id.trim().toLowerCase()));
  if (!existingIds.has(trimmed)) {
    return trimmed;
  }
  let index = 2;
  let nextId = `${trimmed}_${index}`;
  while (existingIds.has(nextId)) {
    index += 1;
    nextId = `${trimmed}_${index}`;
  }
  return nextId;
}

function slugifyClassName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function normalizeHexColor(value: string | undefined | null) {
  const trimmed = value?.trim() ?? "";
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) {
    return trimmed.toUpperCase();
  }
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`.toUpperCase();
  }
  return "#58A6FF";
}

function sanitizeDefaultSize(value: ClassDefinition["default_size"] | number[]) {
  const fallback: [number, number, number] = [0.3, 0.3, 0.4];
  if (!Array.isArray(value) || value.length !== 3) {
    return fallback;
  }
  const normalized = value.map((item, index) => (Number.isFinite(Number(item)) ? Number(item) : fallback[index]));
  if (normalized.some((item) => item <= 0)) {
    return fallback;
  }
  return [normalized[0], normalized[1], normalized[2]] as [number, number, number];
}

function toEditableNumber(value: string, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function formatClassSize(size: [number, number, number]) {
  return size.map((value) => value.toFixed(2)).join(" · ");
}

function buildExportOutputPath(exportRoot: string, workspacePath: string) {
  const root = exportRoot.trim().replace(/[\\/]+$/, "");
  const leaf = getPathLeaf(workspacePath) || "workspace";
  return root ? `${root}/${leaf}` : leaf;
}

function getPathLeaf(path: string) {
  const normalized = path.trim().replace(/[\\/]+$/, "");
  if (!normalized) {
    return "";
  }
  const parts = normalized.split(/[\\/]+/);
  return parts[parts.length - 1] ?? "";
}

function isFiniteVector3(value: [number, number, number]) {
  return Number.isFinite(value[0]) && Number.isFinite(value[1]) && Number.isFinite(value[2]);
}

function estimateCenterZ(points: FrameData["points"], x: number, y: number, height: number) {
  let minDistance = Number.POSITIVE_INFINITY;
  let bestGround = 0;
  for (const point of points) {
    const dx = point.x - x;
    const dy = point.y - y;
    const distance = dx * dx + dy * dy;
    if (distance < minDistance && distance < 0.9) {
      minDistance = distance;
      bestGround = point.z;
    }
  }
  return bestGround + height * 0.5;
}

function classifyConeColors(
  points: PointRecord[],
  boxes: AnnotationBox[],
): AnnotationBox[] {
  // Classify cones by LiDAR intensity. At 905nm (Hesai OT128),
  // red paint reflects ~0.5 and blue ~0.25, so red cones have higher intensity.
  if (boxes.length === 0) return [];

  // Robust per-cone intensity: points strictly inside box, middle 50% in Z, median intensity
  const stats = boxes.map((box) => {
    const [cx, cy, cz] = box.center_xyz;
    const [l, w, h] = box.size_lwh;
    const zMin = cz - h * 0.25;
    const zMax = cz + h * 0.25;
    const inside = points.filter(
      (p) =>
        Math.abs(p.x - cx) <= l / 2 &&
        Math.abs(p.y - cy) <= w / 2 &&
        p.z >= zMin &&
        p.z <= zMax,
    );
    if (inside.length < 2) return { box, intensity: null as number | null };
    const sorted = inside.map((p) => p.intensity).sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    return { box, intensity: median };
  });

  const valid = stats.filter((s): s is { box: AnnotationBox; intensity: number } => s.intensity !== null);
  if (valid.length < 2) {
    return boxes.map((box) => ({ ...box, class_name: "RedCone" }));
  }

  const values = valid.map((v) => v.intensity);
  const threshold = kMeans2Threshold(values);

  // Sanity check: require the two clusters to be meaningfully separated
  const high = values.filter((v) => v > threshold);
  const low = values.filter((v) => v <= threshold);
  const meanHigh = high.length ? high.reduce((a, b) => a + b, 0) / high.length : 0;
  const meanLow = low.length ? low.reduce((a, b) => a + b, 0) / low.length : 0;
  const separation = (meanHigh - meanLow) / (Math.abs(meanHigh) + Math.abs(meanLow) + 1e-6);
  if (separation < 0.15 || high.length === 0 || low.length === 0) {
    // Not separable — likely all one color. Default to RedCone.
    return boxes.map((box) => ({ ...box, class_name: "RedCone" }));
  }

  const intensityMap = new Map<string, number>();
  for (const v of valid) intensityMap.set(v.box.box_id, v.intensity);

  return boxes.map((box) => {
    const i = intensityMap.get(box.box_id);
    // No interior points → can't tell, default RedCone
    if (i === undefined) return { ...box, class_name: "RedCone" };
    return { ...box, class_name: i >= threshold ? "RedCone" : "BlueCone" };
  });
}

function kMeans2Threshold(values: number[]): number {
  if (values.length < 2) return values[0] ?? 0;
  const sorted = [...values].sort((a, b) => a - b);
  let lo = sorted[0];
  let hi = sorted[sorted.length - 1];
  let mid = (lo + hi) / 2;
  for (let i = 0; i < 80; i++) {
    const lowGroup = values.filter((v) => v <= mid);
    const highGroup = values.filter((v) => v > mid);
    if (!lowGroup.length || !highGroup.length) break;
    const newLo = lowGroup.reduce((a, b) => a + b, 0) / lowGroup.length;
    const newHi = highGroup.reduce((a, b) => a + b, 0) / highGroup.length;
    const newMid = (newLo + newHi) / 2;
    if (Math.abs(newMid - mid) < 1e-4) break;
    mid = newMid;
    lo = newLo;
    hi = newHi;
  }
  return mid;
}

function buildConeColorClasses(boxes: AnnotationBox[]): ClassDefinition[] {
  const names = new Set(boxes.map((b) => b.class_name));
  const defs: ClassDefinition[] = [];
  if (names.has("RedCone")) defs.push({ id: "red_cone", name: "RedCone", color: "#ff3333", default_size: [0.228, 0.228, 0.325] });
  if (names.has("BlueCone")) defs.push({ id: "blue_cone", name: "BlueCone", color: "#3388ff", default_size: [0.228, 0.228, 0.325] });
  if (names.has("Cone")) defs.push({ id: "cone", name: "Cone", color: "#aaaaaa", default_size: [0.228, 0.228, 0.325] });
  return defs.length > 0 ? defs : [{ id: "cone", name: "Cone", color: "#aaaaaa", default_size: [0.228, 0.228, 0.325] }];
}

export default App;
