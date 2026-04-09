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
  exportOpenpcdet,
  inferRange,
  inspectTrainingTarget,
  inspectWorkspaceTarget,
  listTasks,
  loadFrame,
  openTrainingRoot,
  openWorkspace,
  packageGroups,
  pickDirectory,
  pickRosbagDirectory,
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
  ReviewStatus,
  TaskRecord,
  TrainingSnapshot,
  TrainingTargetInfo,
  WorkspaceSettings,
  WorkspaceTargetInfo,
  WorkspaceSnapshot,
} from "./types";

type NoticeTone = "info" | "success" | "error";
type AppScreen = "home" | "workspace" | "package" | "training";
type WorkspaceMode = "annotate" | "review";
type LeftPanelTab = "workspace" | "classes" | "frames" | "export" | "automation" | "openpcdet";

interface Notice {
  tone: NoticeTone;
  text: string;
}

const LAST_WORKSPACE_KEY = "bitfsd-annotator:last-workspace";
const LAST_PACKAGE_BAG_KEY = "bitfsd-annotator:last-package-bag";
const LAST_PACKAGE_OUTPUT_KEY = "bitfsd-annotator:last-package-output";
const LAST_EXPORT_KEY = "bitfsd-annotator:last-export";
const LAST_TRAINING_ROOT_KEY = "bitfsd-annotator:last-training-root";
const FRAME_POINT_LIMIT = 260000;
const PACKAGE_FRAME_STEP = 5;
const PACKAGE_GROUP_SIZE = 20;
// Match the existing labelCloud workspace defaults used for cone annotation.
const DEFAULT_VIEW_RANGE: [number, number, number, number, number, number] = [-15, -25, -2, 50, 25, 2];
const DEFAULT_CLASS_DEFINITIONS: ClassDefinition[] = [
  { id: "cone_blue", name: "Cone_Blue", color: "#0066FF", default_size: [0.228, 0.228, 0.325] },
  { id: "cone_red", name: "Cone_Red", color: "#FF3030", default_size: [0.228, 0.228, 0.325] },
];

function App() {
  const [workspaceInput, setWorkspaceInput] = useState(() => localStorage.getItem(LAST_WORKSPACE_KEY) ?? "");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [workspaceTarget, setWorkspaceTarget] = useState<WorkspaceTargetInfo | null>(null);
  const [packageBagInput, setPackageBagInput] = useState(() => localStorage.getItem(LAST_PACKAGE_BAG_KEY) ?? "");
  const [packageOutputInput, setPackageOutputInput] = useState(() => localStorage.getItem(LAST_PACKAGE_OUTPUT_KEY) ?? "");
  const [packageTopicInput, setPackageTopicInput] = useState("");
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
  const [trainingTaskId, setTrainingTaskId] = useState<string | null>(null);
  const [trainingTask, setTrainingTask] = useState<TaskRecord | null>(null);
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
  const [pendingClassChoice, setPendingClassChoice] = useState<{ boxId: string; x: number; y: number } | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoadingWorkspace, setIsLoadingWorkspace] = useState(false);
  const [isLoadingFrame, setIsLoadingFrame] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [hoverWorld, setHoverWorld] = useState<[number, number, number] | null>(null);
  const handledTaskTerminalRef = useRef<string | null>(null);
  const handledPackageTaskTerminalRef = useRef<string | null>(null);
  const handledTrainingTaskTerminalRef = useRef<string | null>(null);

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
  const currentBoxes = frameData?.annotation.boxes ?? [];
  const selectedBoxes = useMemo(() => {
    if (!frameData) {
      return [];
    }
    return frameData.annotation.boxes.filter((item) => selectedBoxIds.includes(item.box_id));
  }, [frameData, selectedBoxIds]);
  const classUsage = useMemo(() => {
    const counts = new Map<string, number>();
    for (const box of currentBoxes) {
      counts.set(box.class_name, (counts.get(box.class_name) ?? 0) + 1);
    }
    return counts;
  }, [currentBoxes]);
  const selectedTask = useMemo(
    () => snapshot?.tasks.find((task) => task.id === selectedTaskId) ?? null,
    [selectedTaskId, snapshot?.tasks],
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
    if (openedTrainingRoot && value.trim() !== openedTrainingRoot) {
      setOpenedTrainingRoot("");
      setTrainingSnapshot(null);
      setTrainingSettingsDraft(null);
      setTrainingSettingsDirty(false);
      setTrainingTaskId(null);
      setTrainingTask(null);
    }
  }, [openedTrainingRoot]);

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
        if (trainingTaskId && !nextSnapshot.tasks.some((task) => task.id === trainingTaskId)) {
          setTrainingTaskId(nextSnapshot.tasks[0]?.id ?? null);
        }
        if (!trainingTaskId) {
          const runningTask =
            nextSnapshot.tasks.find((task) => task.kind === "train_openpcdet" && (task.status === "pending" || task.status === "running")) ??
            nextSnapshot.tasks.find((task) => task.kind === "train_openpcdet") ??
            null;
          setTrainingTask(runningTask);
          setTrainingTaskId(runningTask?.id ?? null);
        } else {
          setTrainingTask(nextSnapshot.tasks.find((task) => task.id === trainingTaskId) ?? null);
        }
      });
    },
    [trainingSettingsDirty, trainingTaskId],
  );

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
          const runningTask =
            tasks.find((task) => task.kind === "train_openpcdet" && (task.status === "pending" || task.status === "running")) ??
            null;
          const latestTask = tasks.find((task) => task.kind === "train_openpcdet") ?? null;
          const nextTask = exactMatch ?? runningTask ?? latestTask;
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
    const summary = await saveAnnotation(openedWorkspacePath, {
      ...frameData.annotation,
      updated_at_ms: Date.now(),
    });
    setSnapshot((current) => (current ? applyFrameSummary(current, summary) : current));
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

  const handleEnterPackager = useCallback(() => {
    setAppScreen("package");
  }, []);

  const handleEnterTraining = useCallback(() => {
    setAppScreen("training");
  }, []);

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
      const task = await trainOpenpcdet(targetPath);
      setTrainingTaskId(task.id);
      setTrainingTask(task);
      pushNotice("info", "OpenPCDet 训练任务已启动");
      await loadTrainingSnapshot(targetPath, false);
    } catch (error) {
      reportError(error);
    }
  };

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
      const task = await inferRange(openedWorkspacePath, frameRangeIds);
      setSelectedTaskId(task.id);
      pushNotice("info", `inference started on ${frameRangeIds.length} frames`);
      await loadSnapshot(openedWorkspacePath, false);
    } catch (error) {
      reportError(error);
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
        onBack={handleBackFromTraining}
        onOpenTrainingRoot={() => void handleOpenTrainingRoot()}
        onPickTrainingRoot={() => void handlePickTrainingRoot()}
        onRootChange={handleTrainingRootChange}
        onSaveSettings={() => void handleSaveTrainingSettings()}
        onSettingChange={updateTrainingSettingField}
        onStartTraining={() => void handleStartTraining()}
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
              {availableClasses.map((classDef) => (
                <div className="stat-chip" key={classDef.id}>
                  <span>{classDef.name}</span>
                  <strong style={{ color: classDef.color }}>{classUsage.get(classDef.name) ?? 0}</strong>
                </div>
              ))}
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
        {notice && <div className={`notice notice--${notice.tone}`}>{notice.text}</div>}

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

        {notice && <div className={`notice notice--${notice.tone}`}>{notice.text}</div>}

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

        <div className="entry-mode-grid entry-mode-grid--quad">
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

function PackageScreen({
  notice,
  bagInput,
  outputInput,
  topicInput,
  packageTargetInfo,
  packageTask,
  onBack,
  onBagChange,
  onOutputChange,
  onTopicChange,
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
  onBack: () => void;
  onBagChange: (value: string) => void;
  onOutputChange: (value: string) => void;
  onTopicChange: (value: string) => void;
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

        {notice && <div className={`notice notice--${notice.tone}`}>{notice.text}</div>}

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
                  {progress?.label ??
                    (packageTask.status === "failed"
                      ? packageTask.error || "分包失败"
                      : packageTask.status === "succeeded"
                        ? "分包完成"
                        : "任务已启动，正在读取 bag")}
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
              每 {PACKAGE_FRAME_STEP} 帧取 1 帧，每 {PACKAGE_GROUP_SIZE} 帧分成一组，适合多人并行标注。
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
  trainingSettings,
  trainingSettingsDirty,
  onBack,
  onRootChange,
  onPickTrainingRoot,
  onOpenTrainingRoot,
  onSettingChange,
  onSaveSettings,
  onStartTraining,
}: {
  notice: Notice | null;
  trainingRootInput: string;
  trainingTarget: TrainingTargetInfo | null;
  trainingSnapshot: TrainingSnapshot | null;
  trainingTask: TaskRecord | null;
  trainingSettings: WorkspaceSettings | null;
  trainingSettingsDirty: boolean;
  onBack: () => void;
  onRootChange: (value: string) => void;
  onPickTrainingRoot: () => void;
  onOpenTrainingRoot: () => void;
  onSettingChange: (field: keyof WorkspaceSettings, value: string | number) => void;
  onSaveSettings: () => void;
  onStartTraining: () => void;
}) {
  const target = trainingSnapshot?.target ?? trainingTarget;
  const groups = target?.groups ?? [];
  const totalFrames = target?.frame_count ?? groups.reduce((sum, group) => sum + group.frame_count, 0);
  const totalTrain = target?.train_count ?? groups.reduce((sum, group) => sum + group.train_count, 0);
  const totalVal = target?.val_count ?? groups.reduce((sum, group) => sum + group.val_count, 0);
  const totalLabeled = groups.reduce((sum, group) => sum + group.labeled_count, 0);
  const progress = getTrainingTaskProgress(trainingTask);
  const isTraining = trainingTask?.status === "pending" || trainingTask?.status === "running";
  const checkpointPath = trainingSettings?.checkpoint_path?.trim() ?? "";

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

        {notice && <div className={`notice notice--${notice.tone}`}>{notice.text}</div>}

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
              <button className="secondary-button" disabled={isTraining || !trainingSettings} onClick={onStartTraining} type="button">
                {isTraining ? "训练中..." : "开始训练"}
              </button>
            </div>
            {trainingTask && (
              <div className={`package-progress package-progress--${trainingTask.status}`}>
                <div className="package-progress__header">
                  <div>
                    <div className="package-progress__eyebrow">训练进度</div>
                    <div className="package-progress__status">{getPackageTaskStatusLabel(trainingTask.status)}</div>
                  </div>
                  <div className="package-progress__percent">
                    {progress?.percent != null
                      ? `${Math.round(progress.percent)}%`
                      : trainingTask.status === "succeeded"
                        ? "100%"
                        : trainingTask.status === "failed"
                          ? "ERR"
                          : "..."}
                  </div>
                </div>
                <div className="package-progress__bar">
                  <div
                    className={`package-progress__fill ${
                      progress?.percent == null && isTraining ? "is-indeterminate" : ""
                    }`}
                    style={progress?.percent != null ? { width: `${clamp(progress.percent, 0, 100)}%` } : undefined}
                  />
                </div>
                <div className="package-progress__label">
                  {progress?.label ??
                    (trainingTask.status === "failed"
                      ? trainingTask.error || "训练失败"
                      : trainingTask.status === "succeeded"
                        ? "训练完成"
                        : "正在准备训练任务")}
                </div>
                <div className="package-progress__stats">
                  {progress?.frameCount != null && <span>{progress.frameCount} 帧</span>}
                  {progress?.groupCount != null && <span>{progress.groupCount} 组</span>}
                  {progress?.trainCount != null && <span>{progress.trainCount} train</span>}
                  {progress?.valCount != null && <span>{progress.valCount} val</span>}
                  {progress?.classCount != null && <span>{progress.classCount} 类</span>}
                </div>
              </div>
            )}
            <div className="entry-card__path">
              训练前会把样本重命名成 `group_xxx__frame_id`，避免不同组里的 `0000000.npy` 冲突。
            </div>
            <div className="entry-card__path">{trainingSnapshot?.root_path || trainingRootInput || "No training root selected"}</div>
          </article>

          <article className="entry-card package-pane package-pane--summary">
            <div className="entry-card__title">数据概览</div>
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
                <span>Train</span>
                <strong>{totalTrain}</strong>
              </div>
              <div className="entry-stat">
                <span>Val</span>
                <strong>{totalVal}</strong>
              </div>
            </div>
            <div className="package-meta-list">
              <div className="package-meta-item">
                <span>标注文件</span>
                <strong>{totalLabeled}</strong>
              </div>
              <div className="package-meta-item">
                <span>最新 Checkpoint</span>
                <strong>{checkpointPath || "训练成功后自动回填"}</strong>
              </div>
              <div className="package-meta-item">
                <span>目录状态</span>
                <strong>{getTrainingTargetLabel(target?.kind)}</strong>
              </div>
            </div>
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
  if (status === "succeeded") {
    return "已完成";
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
  };
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

export default App;
