import type {
  ClassDefinition,
  ExportResult,
  FrameAnnotation,
  FrameData,
  FrameSummary,
  TaskRecord,
  TrainingSnapshot,
  TrainingTargetInfo,
  WorkspaceSettings,
  WorkspaceSnapshot,
  WorkspaceTargetInfo,
} from "./types";

// ---------------------------------------------------------------------------
// Detect runtime: Tauri (desktop) vs plain browser (web)
// ---------------------------------------------------------------------------

const IS_TAURI = typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

let tauriInvoke: ((cmd: string, args?: Record<string, unknown>) => Promise<unknown>) | null = null;

if (IS_TAURI) {
  import("@tauri-apps/api/core").then((mod) => {
    tauriInvoke = mod.invoke;
  });
}

// ---------------------------------------------------------------------------
// Unified call helper
// ---------------------------------------------------------------------------

const API_BASE = "/api";

async function call<T>(endpoint: string, args: Record<string, unknown> = {}): Promise<T> {
  if (IS_TAURI && tauriInvoke) {
    return tauriInvoke(`${endpoint}_cmd`, args) as Promise<T>;
  }
  const resp = await fetch(`${API_BASE}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`API error ${resp.status}: ${text}`);
  }
  return resp.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Public API (same signatures as before)
// ---------------------------------------------------------------------------

export function openWorkspace(workspacePath: string) {
  return call<WorkspaceSnapshot>("open_workspace", { workspace_path: workspacePath });
}

export function inspectWorkspaceTarget(path: string) {
  return call<WorkspaceTargetInfo>("inspect_workspace_target", { path });
}

export function inspectTrainingTarget(path: string) {
  return call<TrainingTargetInfo>("inspect_training_target", { path });
}

export function openTrainingRoot(rootPath: string) {
  return call<TrainingSnapshot>("open_training_root", { root_path: rootPath });
}

export function loadFrame(
  workspacePath: string,
  frameId: string,
  maxPoints = 180000,
  viewRange?: [number, number, number, number, number, number],
) {
  return call<FrameData>("load_frame", {
    workspace_path: workspacePath,
    frame_id: frameId,
    max_points: maxPoints,
    view_range: viewRange ?? null,
  });
}

export function saveAnnotation(workspacePath: string, annotation: FrameAnnotation) {
  return call<FrameSummary>("save_annotation", { workspace_path: workspacePath, annotation });
}

export function saveClasses(workspacePath: string, classes: ClassDefinition[]) {
  return call<ClassDefinition[]>("save_classes", { workspace_path: workspacePath, classes });
}

export function saveSettings(workspacePath: string, settings: WorkspaceSettings) {
  return call<WorkspaceSettings>("save_settings", { workspace_path: workspacePath, settings });
}

export function saveTrainingSettings(rootPath: string, settings: WorkspaceSettings) {
  return call<WorkspaceSettings>("save_training_settings", { root_path: rootPath, settings });
}

export function pickDirectory(_initialPath?: string | null): Promise<string | null> {
  // No native dialog in web mode — return null, UI uses text input instead
  if (!IS_TAURI) return Promise.resolve(null);
  return call<string | null>("pick_directory", { initialPath: _initialPath ?? null });
}

export function pickRosbagDirectory(_initialPath?: string | null): Promise<string | null> {
  if (!IS_TAURI) return Promise.resolve(null);
  return call<string | null>("pick_rosbag_directory", { initialPath: _initialPath ?? null });
}

export function listTasks(workspacePath: string) {
  return call<TaskRecord[]>("list_tasks", { workspace_path: workspacePath });
}

export function readTaskLog(logPath: string) {
  return call<string>("read_task_log", { log_path: logPath });
}

export function importPredictions(workspacePath: string, predictionsPath: string) {
  return call<FrameSummary[]>("import_predictions", {
    workspace_path: workspacePath,
    predictions_path: predictionsPath,
  });
}

export function exportOpenpcdet(
  workspacePath: string,
  options: {
    reviewedOnly?: boolean;
    annotatedOnly?: boolean;
    outputPath?: string;
    frameIds?: string[];
    pointsOnly?: boolean;
  } = {},
) {
  const args: Record<string, unknown> = {
    workspace_path: workspacePath,
    reviewed_only: options.reviewedOnly ?? false,
    annotated_only: options.annotatedOnly ?? false,
    output_path: options.outputPath ?? null,
    frame_ids: options.frameIds ?? null,
    points_only: options.pointsOnly ?? false,
  }
  return call<ExportResult>("export_openpcdet", {
    ...args,
  });
}

export function extractPcd(bagPath: string, workspacePath: string, topic?: string, frameStep = 5) {
  return call<TaskRecord>("extract_pcd", {
    bag_path: bagPath,
    workspace_path: workspacePath,
    topic: topic ?? null,
    frame_step: frameStep,
  });
}

export function packageGroups(
  bagPath: string,
  outputRoot: string,
  options: {
    topic?: string;
    frameStep?: number;
    groupSize?: number;
    replaceExisting?: boolean;
  } = {},
) {
  return call<TaskRecord>("package_groups", {
    bag_path: bagPath,
    output_root: outputRoot,
    topic: options.topic ?? null,
    frame_step: options.frameStep ?? 5,
    group_size: options.groupSize ?? 20,
    replace_existing: options.replaceExisting ?? true,
  });
}

export function trainSeed(workspacePath: string) {
  return call<TaskRecord>("train_seed", { workspace_path: workspacePath });
}

export function trainOpenpcdet(rootPath: string) {
  return call<TaskRecord>("train_openpcdet", { root_path: rootPath });
}

export function inferRange(workspacePath: string, frameIds: string[]) {
  return call<TaskRecord>("infer_range", { workspace_path: workspacePath, frame_ids: frameIds });
}
