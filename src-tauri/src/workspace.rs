use crate::models::{
    default_classes, AnnotationBox, AnnotationSource, ClassDefinition, FrameAnnotation, FrameData,
    FrameSummary, PredictionFrame, ReviewStatus, TaskRecord, WorkspaceSettings, WorkspaceSnapshot,
};
use crate::pcd::load_points_from_pcd;
use serde::de::DeserializeOwned;
use serde::Serialize;
use serde_json::json;
use std::collections::HashSet;
use std::fs;
use std::io::Write;
use std::path::{Path, PathBuf};

const META_DIR: &str = "meta";
const ANNOTATIONS_DIR: &str = "annotations";
const PCD_DIR: &str = "pcd";
const EXPORTS_DIR: &str = "exports";
const MODELS_DIR: &str = "models";
const TASKS_DIR: &str = "tasks";

pub fn open_workspace(workspace_path: &str) -> Result<WorkspaceSnapshot, String> {
    let workspace = workspace_root(workspace_path);
    ensure_workspace_structure(&workspace)?;

    let classes = load_classes(&workspace)?;
    let settings = load_settings(&workspace)?;
    let tasks = list_tasks(&workspace)?;
    let frames = scan_frames(&workspace)?;
    let review_queue = frames
        .iter()
        .filter(|frame| matches!(frame.review_status, Some(ReviewStatus::Unreviewed)))
        .map(|frame| frame.frame_id.clone())
        .collect();

    Ok(WorkspaceSnapshot {
        workspace_path: workspace.to_string_lossy().to_string(),
        frames,
        classes,
        settings,
        review_queue,
        tasks,
    })
}

pub fn load_frame(
    workspace_path: &str,
    frame_id: &str,
    max_points: Option<usize>,
    view_range: Option<Vec<f32>>,
) -> Result<FrameData, String> {
    let workspace = workspace_root(workspace_path);
    ensure_workspace_structure(&workspace)?;
    let points = load_points_from_pcd(
        &pcd_file(&workspace, frame_id),
        max_points,
        view_range.as_deref(),
    )?;
    let annotation = load_annotation_or_default(&workspace, frame_id)?;
    Ok(FrameData {
        frame_id: frame_id.to_string(),
        points,
        annotation,
    })
}

pub fn save_annotation(
    workspace_path: &str,
    annotation: FrameAnnotation,
) -> Result<FrameSummary, String> {
    let workspace = workspace_root(workspace_path);
    ensure_workspace_structure(&workspace)?;
    write_json(
        &annotation_file(&workspace, &annotation.frame_id),
        &annotation,
    )?;
    frame_summary_for(&workspace, &annotation.frame_id)
}

pub fn save_classes(
    workspace_path: &str,
    classes: Vec<ClassDefinition>,
) -> Result<Vec<ClassDefinition>, String> {
    let workspace = workspace_root(workspace_path);
    ensure_workspace_structure(&workspace)?;
    let normalized = normalize_classes(classes);
    write_json(&classes_file(&workspace), &normalized)?;
    Ok(normalized)
}

pub fn save_settings(
    workspace_path: &str,
    settings: WorkspaceSettings,
) -> Result<WorkspaceSettings, String> {
    let workspace = workspace_root(workspace_path);
    ensure_workspace_structure(&workspace)?;
    write_json(&settings_file(&workspace), &settings)?;
    Ok(settings)
}

pub fn batch_propagate(
    workspace_path: &str,
    source_frame_id: &str,
    start_frame_id: &str,
    end_frame_id: &str,
) -> Result<Vec<FrameSummary>, String> {
    let workspace = workspace_root(workspace_path);
    ensure_workspace_structure(&workspace)?;
    let source = load_annotation_or_default(&workspace, source_frame_id)?;
    if source.boxes.is_empty() {
        return Err("source frame has no boxes to propagate".to_string());
    }
    if source.review_status != ReviewStatus::Reviewed {
        return Err("source frame must be reviewed before propagation".to_string());
    }

    let frame_ids = scan_frame_ids(&workspace)?;
    let start_idx = frame_ids
        .iter()
        .position(|frame_id| frame_id == start_frame_id)
        .ok_or_else(|| format!("unknown start frame: {start_frame_id}"))?;
    let end_idx = frame_ids
        .iter()
        .position(|frame_id| frame_id == end_frame_id)
        .ok_or_else(|| format!("unknown end frame: {end_frame_id}"))?;
    let (from, to) = if start_idx <= end_idx {
        (start_idx, end_idx)
    } else {
        (end_idx, start_idx)
    };

    let mut summaries = Vec::new();
    for frame_id in frame_ids[from..=to]
        .iter()
        .filter(|frame_id| frame_id.as_str() != source_frame_id)
    {
        let propagated_boxes = source
            .boxes
            .iter()
            .enumerate()
            .map(|(index, item)| AnnotationBox {
                box_id: format!("{}_prop_{}_{}", frame_id, index, now_ms()),
                class_name: item.class_name.clone(),
                center_xyz: item.center_xyz,
                size_lwh: item.size_lwh,
                yaw: item.yaw,
                score: None,
            })
            .collect();
        let annotation = FrameAnnotation {
            frame_id: frame_id.clone(),
            source: AnnotationSource::Propagated,
            review_status: ReviewStatus::Unreviewed,
            boxes: propagated_boxes,
            updated_at_ms: now_ms(),
        };
        write_json(&annotation_file(&workspace, frame_id), &annotation)?;
        summaries.push(frame_summary_for(&workspace, frame_id)?);
    }

    Ok(summaries)
}

pub fn import_predictions(
    workspace_path: &str,
    predictions_path: &Path,
) -> Result<Vec<FrameSummary>, String> {
    let workspace = workspace_root(workspace_path);
    ensure_workspace_structure(&workspace)?;
    let predictions: Vec<PredictionFrame> = read_json(predictions_path)?;
    let frame_ids = scan_frame_ids(&workspace)?;
    let mut summaries = Vec::new();

    for prediction in predictions {
        if !frame_ids
            .iter()
            .any(|frame_id| frame_id == &prediction.frame_id)
        {
            continue;
        }

        let existing = load_annotation_or_default(&workspace, &prediction.frame_id)?;
        let protected = matches!(existing.source, AnnotationSource::Manual)
            && existing.review_status == ReviewStatus::Reviewed
            && !existing.boxes.is_empty();
        if protected {
            continue;
        }

        let annotation = FrameAnnotation {
            frame_id: prediction.frame_id.clone(),
            source: AnnotationSource::Model,
            review_status: ReviewStatus::Unreviewed,
            boxes: prediction
                .boxes
                .into_iter()
                .enumerate()
                .map(|(index, item)| AnnotationBox {
                    box_id: format!("{}_model_{}_{}", prediction.frame_id, index, now_ms()),
                    class_name: item.class_name,
                    center_xyz: item.center_xyz,
                    size_lwh: item.size_lwh,
                    yaw: item.yaw,
                    score: item.score,
                })
                .collect(),
            updated_at_ms: now_ms(),
        };
        write_json(
            &annotation_file(&workspace, &annotation.frame_id),
            &annotation,
        )?;
        summaries.push(frame_summary_for(&workspace, &annotation.frame_id)?);
    }

    Ok(summaries)
}

pub fn ensure_workspace_structure(workspace: &Path) -> Result<(), String> {
    fs::create_dir_all(workspace)
        .map_err(|err| format!("failed to create {}: {err}", workspace.display()))?;
    for relative in [PCD_DIR, ANNOTATIONS_DIR, META_DIR, EXPORTS_DIR, MODELS_DIR] {
        fs::create_dir_all(workspace.join(relative)).map_err(|err| {
            format!(
                "failed to create {}: {err}",
                workspace.join(relative).display()
            )
        })?;
    }
    fs::create_dir_all(tasks_dir(workspace))
        .map_err(|err| format!("failed to create {}: {err}", tasks_dir(workspace).display()))?;

    let _ = load_classes(workspace)?;
    if !settings_file(workspace).exists() {
        write_json(&settings_file(workspace), &default_settings())?;
    }
    Ok(())
}

pub fn list_tasks(workspace: &Path) -> Result<Vec<TaskRecord>, String> {
    let mut tasks = Vec::new();
    if !tasks_dir(workspace).exists() {
        return Ok(tasks);
    }
    for entry in fs::read_dir(tasks_dir(workspace))
        .map_err(|err| format!("failed to read {}: {err}", tasks_dir(workspace).display()))?
    {
        let entry = entry.map_err(|err| format!("failed to read task entry: {err}"))?;
        let path = entry.path();
        if path.extension().and_then(|ext| ext.to_str()) != Some("json") {
            continue;
        }
        if let Ok(task) = read_json::<TaskRecord>(&path) {
            tasks.push(task);
        }
    }
    tasks.sort_by(|left, right| right.created_at_ms.cmp(&left.created_at_ms));
    Ok(tasks)
}

pub fn task_file(workspace: &Path, task_id: &str) -> PathBuf {
    tasks_dir(workspace).join(format!("{task_id}.json"))
}

pub fn tasks_dir(workspace: &Path) -> PathBuf {
    workspace.join(META_DIR).join(TASKS_DIR)
}

pub fn workspace_root(path: &str) -> PathBuf {
    PathBuf::from(path)
}

pub fn pcd_dir(workspace: &Path) -> PathBuf {
    workspace.join(PCD_DIR)
}

pub fn exports_dir(workspace: &Path) -> PathBuf {
    workspace.join(EXPORTS_DIR)
}

pub fn models_dir(workspace: &Path) -> PathBuf {
    workspace.join(MODELS_DIR)
}

pub fn read_json<T: DeserializeOwned>(path: &Path) -> Result<T, String> {
    let content = fs::read_to_string(path)
        .map_err(|err| format!("failed to read {}: {err}", path.display()))?;
    serde_json::from_str(&content)
        .map_err(|err| format!("failed to parse {}: {err}", path.display()))
}

pub fn write_json<T: Serialize>(path: &Path, value: &T) -> Result<(), String> {
    let parent = path
        .parent()
        .ok_or_else(|| format!("invalid path {}", path.display()))?;
    fs::create_dir_all(parent)
        .map_err(|err| format!("failed to create {}: {err}", parent.display()))?;
    let mut file = fs::File::create(path)
        .map_err(|err| format!("failed to create {}: {err}", path.display()))?;
    let payload = serde_json::to_string_pretty(value)
        .map_err(|err| format!("failed to serialize {}: {err}", path.display()))?;
    file.write_all(payload.as_bytes())
        .map_err(|err| format!("failed to write {}: {err}", path.display()))
}

pub fn load_classes(workspace: &Path) -> Result<Vec<ClassDefinition>, String> {
    let path = classes_file(workspace);
    let normalized = if path.exists() {
        normalize_classes(read_json::<Vec<ClassDefinition>>(&path)?)
    } else {
        default_classes()
    };
    write_json(&path, &normalized)?;
    Ok(normalized)
}

pub fn load_settings(workspace: &Path) -> Result<WorkspaceSettings, String> {
    let mut settings: WorkspaceSettings = read_json(&settings_file(workspace))?;
    if settings.python_bin.trim().is_empty() || settings.python_bin.trim() == "python3" {
        settings.python_bin = bundled_python_bin();
    }
    Ok(settings)
}

pub fn update_checkpoint(workspace_path: &str, checkpoint_path: &str) -> Result<(), String> {
    let workspace = workspace_root(workspace_path);
    let mut settings = load_settings(&workspace)?;
    settings.checkpoint_path = checkpoint_path.to_string();
    write_json(&settings_file(&workspace), &settings)
}

pub fn default_settings() -> WorkspaceSettings {
    let openpcdet_root = PathBuf::from("/home/jiziheng/Music/fsd/OpenPCDet");
    let bundled_cfg_root = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../config/openpcdet");
    let model_cfg = bundled_cfg_root
        .join("cone_models/pointpillar_cone.yaml")
        .to_string_lossy()
        .to_string();
    let dataset_cfg = bundled_cfg_root
        .join("dataset_configs/cone_dataset.yaml")
        .to_string_lossy()
        .to_string();
    let root = if openpcdet_root.exists() {
        openpcdet_root.to_string_lossy().to_string()
    } else {
        String::new()
    };

    WorkspaceSettings {
        python_bin: bundled_python_bin(),
        openpcdet_root: root,
        model_config_path: model_cfg,
        dataset_config_path: dataset_cfg,
        checkpoint_path: String::new(),
        score_threshold: 0.3,
        min_reviewed_for_training: 16,
        train_extra_args: "--epochs 30 --workers 0".to_string(),
        infer_extra_args: String::new(),
    }
}

pub fn bundled_python_bin() -> String {
    let candidate = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../.conda-env/bin/python3");
    if candidate.exists() {
        candidate.to_string_lossy().to_string()
    } else {
        "python3".to_string()
    }
}

fn load_annotation_or_default(workspace: &Path, frame_id: &str) -> Result<FrameAnnotation, String> {
    let path = annotation_file(workspace, frame_id);
    if path.exists() {
        read_json(&path)
    } else {
        Ok(FrameAnnotation {
            frame_id: frame_id.to_string(),
            source: AnnotationSource::Manual,
            review_status: ReviewStatus::Unreviewed,
            boxes: Vec::new(),
            updated_at_ms: now_ms(),
        })
    }
}

fn frame_summary_for(workspace: &Path, frame_id: &str) -> Result<FrameSummary, String> {
    let path = annotation_file(workspace, frame_id);
    if path.exists() {
        let annotation: FrameAnnotation = read_json(&path)?;
        Ok(FrameSummary {
            frame_id: frame_id.to_string(),
            source: Some(annotation.source),
            review_status: Some(annotation.review_status),
            box_count: annotation.boxes.len(),
        })
    } else {
        Ok(FrameSummary {
            frame_id: frame_id.to_string(),
            source: None,
            review_status: None,
            box_count: 0,
        })
    }
}

fn scan_frames(workspace: &Path) -> Result<Vec<FrameSummary>, String> {
    scan_frame_ids(workspace)?
        .iter()
        .map(|frame_id| frame_summary_for(workspace, frame_id))
        .collect()
}

fn scan_frame_ids(workspace: &Path) -> Result<Vec<String>, String> {
    let mut frames = Vec::new();
    for entry in fs::read_dir(pcd_dir(workspace))
        .map_err(|err| format!("failed to read {}: {err}", pcd_dir(workspace).display()))?
    {
        let entry = entry.map_err(|err| format!("failed to read frame entry: {err}"))?;
        let path = entry.path();
        if path.extension().and_then(|ext| ext.to_str()) != Some("pcd") {
            continue;
        }
        if let Some(stem) = path.file_stem().and_then(|stem| stem.to_str()) {
            frames.push(stem.to_string());
        }
    }
    frames.sort();
    Ok(frames)
}

fn classes_file(workspace: &Path) -> PathBuf {
    workspace.join(META_DIR).join("classes.json")
}

fn settings_file(workspace: &Path) -> PathBuf {
    workspace.join(META_DIR).join("settings.json")
}

fn annotation_file(workspace: &Path, frame_id: &str) -> PathBuf {
    workspace
        .join(ANNOTATIONS_DIR)
        .join(format!("{frame_id}.json"))
}

fn pcd_file(workspace: &Path, frame_id: &str) -> PathBuf {
    workspace.join(PCD_DIR).join(format!("{frame_id}.pcd"))
}

fn now_ms() -> u64 {
    use std::time::{SystemTime, UNIX_EPOCH};
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|duration| duration.as_millis() as u64)
        .unwrap_or_default()
}

fn normalize_classes(classes: Vec<ClassDefinition>) -> Vec<ClassDefinition> {
    let defaults = default_classes();
    let palette: Vec<String> = defaults
        .iter()
        .map(|item| item.color.clone())
        .collect();
    let mut seen_ids = HashSet::new();
    let mut normalized = Vec::new();

    for (index, item) in classes.into_iter().enumerate() {
        let name = item.name.trim().to_string();
        if name.is_empty() {
            continue;
        }
        let base_id = if item.id.trim().is_empty() {
            let slug = slugify_class_name(&name);
            if slug.is_empty() {
                format!("class_{}", index + 1)
            } else {
                slug
            }
        } else {
            item.id.trim().to_lowercase()
        };
        let mut next_id = base_id.clone();
        let mut suffix = 2;
        while seen_ids.contains(&next_id) {
            next_id = format!("{base_id}_{suffix}");
            suffix += 1;
        }
        seen_ids.insert(next_id.clone());
        normalized.push(ClassDefinition {
            id: next_id,
            name,
            color: normalize_hex_color(
                &item.color,
                palette
                    .get(index % palette.len().max(1))
                    .cloned()
                    .unwrap_or_else(|| "#58A6FF".to_string()),
            ),
            default_size: normalize_default_size(item.default_size),
        });
    }

    if normalized.is_empty() {
        defaults
    } else {
        normalized
    }
}

fn slugify_class_name(value: &str) -> String {
    value
        .trim()
        .to_lowercase()
        .chars()
        .map(|ch| if ch.is_ascii_alphanumeric() { ch } else { '_' })
        .collect::<String>()
        .trim_matches('_')
        .to_string()
}

fn normalize_hex_color(value: &str, fallback: String) -> String {
    let trimmed = value.trim();
    if trimmed.len() == 7
        && trimmed.starts_with('#')
        && trimmed.chars().skip(1).all(|ch| ch.is_ascii_hexdigit())
    {
        return trimmed.to_uppercase();
    }
    if trimmed.len() == 4
        && trimmed.starts_with('#')
        && trimmed.chars().skip(1).all(|ch| ch.is_ascii_hexdigit())
    {
        let chars: Vec<char> = trimmed.chars().collect();
        return format!(
            "#{}{}{}{}{}{}",
            chars[1], chars[1], chars[2], chars[2], chars[3], chars[3]
        )
        .to_uppercase();
    }
    fallback
}

fn normalize_default_size(value: [f32; 3]) -> [f32; 3] {
    let fallback = [0.3, 0.3, 0.4];
    if value.iter().all(|item| item.is_finite() && *item > 0.0) {
        value
    } else {
        fallback
    }
}

pub fn settings_as_json(settings: &WorkspaceSettings) -> serde_json::Value {
    json!({
        "python_bin": settings.python_bin,
        "openpcdet_root": settings.openpcdet_root,
        "model_config_path": settings.model_config_path,
        "dataset_config_path": settings.dataset_config_path,
        "checkpoint_path": settings.checkpoint_path,
        "score_threshold": settings.score_threshold,
        "min_reviewed_for_training": settings.min_reviewed_for_training,
        "train_extra_args": settings.train_extra_args,
        "infer_extra_args": settings.infer_extra_args,
    })
}
