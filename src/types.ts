export type AnnotationSource = "manual" | "propagated" | "model";
export type ReviewStatus = "unreviewed" | "reviewed" | "rejected";
export type TaskKind =
  | "extract_pcd"
  | "package_groups"
  | "export_openpcdet"
  | "train_seed"
  | "train_openpcdet"
  | "infer_range";
export type TaskStatus = "pending" | "running" | "paused" | "succeeded" | "failed" | "cancelled";

export interface ClassDefinition {
  id: string;
  name: string;
  color: string;
  default_size: [number, number, number];
}

export interface WorkspaceSettings {
  python_bin: string;
  openpcdet_root: string;
  model_config_path: string;
  dataset_config_path: string;
  checkpoint_path: string;
  score_threshold: number;
  min_reviewed_for_training: number;
  train_extra_args: string;
  infer_extra_args: string;
}

export interface OpenpcdetModelPreset {
  id: string;
  label: string;
  model_name: string;
  description: string;
  model_config_path: string;
  dataset_config_path: string;
}

export interface AnnotationBox {
  box_id: string;
  class_name: string;
  center_xyz: [number, number, number];
  size_lwh: [number, number, number];
  yaw: number;
  score?: number | null;
}

export interface FrameAnnotation {
  frame_id: string;
  source: AnnotationSource;
  review_status: ReviewStatus;
  boxes: AnnotationBox[];
  updated_at_ms: number;
}

export interface FrameSummary {
  frame_id: string;
  source?: AnnotationSource | null;
  review_status?: ReviewStatus | null;
  box_count: number;
}

export interface PointRecord {
  x: number;
  y: number;
  z: number;
  intensity: number;
}

export interface FrameData {
  frame_id: string;
  points: PointRecord[];
  annotation: FrameAnnotation;
}

export interface TaskRecord {
  id: string;
  kind: TaskKind;
  status: TaskStatus;
  command: string;
  log_path: string;
  created_at_ms: number;
  started_at_ms?: number | null;
  finished_at_ms?: number | null;
  error?: string | null;
  metadata: Record<string, unknown>;
}

export interface WorkspaceSnapshot {
  workspace_path: string;
  frames: FrameSummary[];
  classes: ClassDefinition[];
  settings: WorkspaceSettings;
  review_queue: string[];
  tasks: TaskRecord[];
  class_totals?: Record<string, number>;
  checkpoint_candidates?: string[];
}

export interface WorkspaceGroupInfo {
  group_id: string;
  title: string;
  workspace_path: string;
  frame_count: number;
  annotated_count: number;
  reviewed_count: number;
  start_frame_id?: string | null;
  end_frame_id?: string | null;
  class_totals?: Record<string, number>;
}

export interface WorkspaceTargetInfo {
  kind: "empty" | "missing" | "workspace" | "group_root" | "unknown";
  path: string;
  groups: WorkspaceGroupInfo[];
  bag_path?: string | null;
  frame_step?: number | null;
  group_size?: number | null;
}

export interface ExportResult {
  output_dir: string;
  stdout: string;
}

export interface TrainingGroupInfo {
  group_id: string;
  title: string;
  dataset_path: string;
  frame_count: number;
  labeled_count: number;
  train_count: number;
  val_count: number;
}

export interface TrainingTargetInfo {
  kind: "empty" | "missing" | "training_dataset" | "training_group_root" | "unknown";
  path: string;
  groups: TrainingGroupInfo[];
  frame_count: number;
  train_count: number;
  val_count: number;
}

export interface TrainingSnapshot {
  root_path: string;
  target: TrainingTargetInfo;
  settings: WorkspaceSettings;
  tasks: TaskRecord[];
  model_presets: OpenpcdetModelPreset[];
  checkpoint_candidates: string[];
}

export interface ModelTestGroupInfo {
  group_id: string;
  title: string;
  source_kind: "workspace" | "training_dataset";
  source_path: string;
  frame_count: number;
}

export interface ModelTestTargetInfo {
  kind: "empty" | "missing" | "workspace" | "group_root" | "training_dataset" | "training_group_root" | "unknown";
  path: string;
  groups: ModelTestGroupInfo[];
  frame_count: number;
}

export interface ModelTestSnapshot {
  root_path: string;
  target: ModelTestTargetInfo;
  settings: WorkspaceSettings;
  model_presets: OpenpcdetModelPreset[];
  checkpoint_candidates: string[];
}

export interface TrainingFrameData {
  dataset_path: string;
  frame_id: string;
  points: PointRecord[];
}

export interface TrainingInferenceResult {
  frame_id: string;
  boxes: AnnotationBox[];
  inference_ms?: number | null;
  checkpoint_path?: string;
  model_config_path?: string;
}
