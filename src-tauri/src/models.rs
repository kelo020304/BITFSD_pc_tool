use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum AnnotationSource {
    Manual,
    Propagated,
    Model,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum ReviewStatus {
    Unreviewed,
    Reviewed,
    Rejected,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ClassDefinition {
    pub id: String,
    pub name: String,
    pub color: String,
    pub default_size: [f32; 3],
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WorkspaceSettings {
    pub python_bin: String,
    pub openpcdet_root: String,
    pub model_config_path: String,
    pub dataset_config_path: String,
    pub checkpoint_path: String,
    pub score_threshold: f32,
    pub min_reviewed_for_training: usize,
    pub train_extra_args: String,
    pub infer_extra_args: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AnnotationBox {
    pub box_id: String,
    pub class_name: String,
    pub center_xyz: [f32; 3],
    pub size_lwh: [f32; 3],
    pub yaw: f32,
    pub score: Option<f32>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FrameAnnotation {
    pub frame_id: String,
    pub source: AnnotationSource,
    pub review_status: ReviewStatus,
    pub boxes: Vec<AnnotationBox>,
    pub updated_at_ms: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FrameSummary {
    pub frame_id: String,
    pub source: Option<AnnotationSource>,
    pub review_status: Option<ReviewStatus>,
    pub box_count: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PointRecord {
    pub x: f32,
    pub y: f32,
    pub z: f32,
    pub intensity: f32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FrameData {
    pub frame_id: String,
    pub points: Vec<PointRecord>,
    pub annotation: FrameAnnotation,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum TaskKind {
    ExtractPcd,
    ExportOpenpcdet,
    TrainSeed,
    InferRange,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum TaskStatus {
    Pending,
    Running,
    Succeeded,
    Failed,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TaskRecord {
    pub id: String,
    pub kind: TaskKind,
    pub status: TaskStatus,
    pub command: String,
    pub log_path: String,
    pub created_at_ms: u64,
    pub started_at_ms: Option<u64>,
    pub finished_at_ms: Option<u64>,
    pub error: Option<String>,
    pub metadata: Value,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WorkspaceSnapshot {
    pub workspace_path: String,
    pub frames: Vec<FrameSummary>,
    pub classes: Vec<ClassDefinition>,
    pub settings: WorkspaceSettings,
    pub review_queue: Vec<String>,
    pub tasks: Vec<TaskRecord>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PredictionBox {
    pub class_name: String,
    pub center_xyz: [f32; 3],
    pub size_lwh: [f32; 3],
    pub yaw: f32,
    pub score: Option<f32>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PredictionFrame {
    pub frame_id: String,
    pub boxes: Vec<PredictionBox>,
}

pub fn default_classes() -> Vec<ClassDefinition> {
    vec![
        ClassDefinition {
            id: "cone_blue".to_string(),
            name: "Cone_Blue".to_string(),
            color: "#0066FF".to_string(),
            default_size: [0.228, 0.228, 0.325],
        },
        ClassDefinition {
            id: "cone_red".to_string(),
            name: "Cone_Red".to_string(),
            color: "#FF3030".to_string(),
            default_size: [0.228, 0.228, 0.325],
        },
    ]
}
