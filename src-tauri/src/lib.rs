mod models;
mod pcd;
mod workspace;

use models::{FrameAnnotation, TaskKind, TaskRecord, TaskStatus, WorkspaceSettings};
use rfd::FileDialog;
use serde_json::json;
use std::fs::{self, File};
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};
use tauri::Manager;
use walkdir::WalkDir;
use workspace::{
    bundled_python_bin, ensure_workspace_structure, exports_dir, import_predictions, list_tasks,
    load_frame, models_dir, open_workspace, save_annotation, save_classes, save_settings,
    task_file, tasks_dir, update_checkpoint, workspace_root, write_json,
};

#[tauri::command]
fn open_workspace_cmd(workspace_path: String) -> Result<models::WorkspaceSnapshot, String> {
    open_workspace(&workspace_path)
}

#[tauri::command]
fn load_frame_cmd(
    workspace_path: String,
    frame_id: String,
    max_points: Option<usize>,
    view_range: Option<Vec<f32>>,
) -> Result<models::FrameData, String> {
    load_frame(&workspace_path, &frame_id, max_points, view_range)
}

#[tauri::command]
fn save_annotation_cmd(
    workspace_path: String,
    annotation: FrameAnnotation,
) -> Result<models::FrameSummary, String> {
    save_annotation(&workspace_path, annotation)
}

#[tauri::command]
fn save_classes_cmd(
    workspace_path: String,
    classes: Vec<models::ClassDefinition>,
) -> Result<Vec<models::ClassDefinition>, String> {
    save_classes(&workspace_path, classes)
}

#[tauri::command]
fn save_settings_cmd(
    workspace_path: String,
    settings: WorkspaceSettings,
) -> Result<WorkspaceSettings, String> {
    save_settings(&workspace_path, settings)
}

#[tauri::command]
fn pick_directory_cmd(initial_path: Option<String>) -> Result<Option<String>, String> {
    let dialog = seed_file_dialog(initial_path);
    Ok(dialog
        .pick_folder()
        .map(|path| path.to_string_lossy().to_string()))
}

#[tauri::command]
fn pick_rosbag_directory_cmd(initial_path: Option<String>) -> Result<Option<String>, String> {
    let dialog = seed_file_dialog(initial_path);
    Ok(dialog
        .pick_folder()
        .map(|path| path.to_string_lossy().to_string()))
}

#[tauri::command]
fn batch_propagate_cmd(
    workspace_path: String,
    source_frame_id: String,
    start_frame_id: String,
    end_frame_id: String,
) -> Result<Vec<models::FrameSummary>, String> {
    workspace::batch_propagate(
        &workspace_path,
        &source_frame_id,
        &start_frame_id,
        &end_frame_id,
    )
}

#[tauri::command]
fn list_tasks_cmd(workspace_path: String) -> Result<Vec<TaskRecord>, String> {
    let workspace = workspace_root(&workspace_path);
    ensure_workspace_structure(&workspace)?;
    list_tasks(&workspace)
}

#[tauri::command]
fn read_task_log_cmd(log_path: String) -> Result<String, String> {
    fs::read_to_string(&log_path).map_err(|err| format!("failed to read log {log_path}: {err}"))
}

#[tauri::command]
fn import_predictions_cmd(
    workspace_path: String,
    predictions_path: String,
) -> Result<Vec<models::FrameSummary>, String> {
    import_predictions(&workspace_path, Path::new(&predictions_path))
}

#[tauri::command]
fn export_openpcdet_cmd(
    workspace_path: String,
    output_path: Option<String>,
    reviewed_only: bool,
    annotated_only: Option<bool>,
    frame_ids: Option<Vec<String>>,
    points_only: Option<bool>,
) -> Result<serde_json::Value, String> {
    let workspace = workspace_root(&workspace_path);
    ensure_workspace_structure(&workspace)?;
    let output_dir = output_path
        .map(PathBuf::from)
        .unwrap_or_else(|| exports_dir(&workspace).join(format!("openpcdet_export_{}", now_ms())));
    let python_bin = bundled_python_bin();
    let script = scripts_dir().join("workspace_tools.py");
    let mut args = vec![
        script.to_string_lossy().to_string(),
        "export-openpcdet".to_string(),
        "--workspace".to_string(),
        workspace.to_string_lossy().to_string(),
        "--output".to_string(),
        output_dir.to_string_lossy().to_string(),
    ];
    if reviewed_only {
        args.push("--reviewed-only".to_string());
    }
    if annotated_only.unwrap_or(false) {
        args.push("--annotated-only".to_string());
    }
    if points_only.unwrap_or(false) {
        args.push("--points-only".to_string());
    }

    let frame_list_path = if let Some(frame_ids) = frame_ids {
        let path = workspace
            .join("meta")
            .join(format!("frame_list_{}.txt", now_ms()));
        fs::write(&path, frame_ids.join("\n"))
            .map_err(|err| format!("failed to write {}: {err}", path.display()))?;
        args.push("--frame-list".to_string());
        args.push(path.to_string_lossy().to_string());
        Some(path)
    } else {
        None
    };

    let output = Command::new(&python_bin)
        .args(&args)
        .output()
        .map_err(|err| format!("failed to execute export helper: {err}"))?;

    if let Some(path) = frame_list_path {
        let _ = fs::remove_file(path);
    }

    if !output.status.success() {
        return Err(String::from_utf8_lossy(&output.stderr).to_string());
    }

    Ok(json!({
        "output_dir": output_dir.to_string_lossy(),
        "stdout": String::from_utf8_lossy(&output.stdout).to_string(),
    }))
}

#[tauri::command]
fn extract_pcd_cmd(
    bag_path: String,
    workspace_path: String,
    topic: Option<String>,
) -> Result<TaskRecord, String> {
    let workspace = workspace_root(&workspace_path);
    ensure_workspace_structure(&workspace)?;
    let script = scripts_dir().join("workspace_tools.py");
    let mut args = vec![
        script.to_string_lossy().to_string(),
        "extract-pcd".to_string(),
        "--bag".to_string(),
        bag_path.clone(),
        "--workspace".to_string(),
        workspace_path.clone(),
    ];
    if let Some(topic) = topic {
        if !topic.trim().is_empty() {
            args.push("--topic".to_string());
            args.push(topic);
        }
    }

    spawn_task(
        workspace,
        TaskKind::ExtractPcd,
        bundled_python_bin(),
        args,
        None,
        json!({ "bag_path": bag_path, "workspace_path": workspace_path }),
        PostAction::None,
    )
}

#[tauri::command]
fn train_seed_cmd(workspace_path: String) -> Result<TaskRecord, String> {
    let workspace = workspace_root(&workspace_path);
    ensure_workspace_structure(&workspace)?;
    let snapshot = open_workspace(&workspace_path)?;
    let reviewed_count = snapshot
        .frames
        .iter()
        .filter(|frame| matches!(frame.review_status, Some(models::ReviewStatus::Reviewed)))
        .count();

    let settings = snapshot.settings;
    if settings.openpcdet_root.trim().is_empty() {
        return Err("OpenPCDet root is not configured".to_string());
    }
    if settings.model_config_path.trim().is_empty()
        || settings.dataset_config_path.trim().is_empty()
    {
        return Err("OpenPCDet model/dataset config paths are not configured".to_string());
    }

    let task_id = format!("train_seed_{}", now_ms());
    let export_dir = exports_dir(&workspace).join(&task_id);
    export_reviewed_sync(&workspace, &export_dir)?;
    let model_cfg = prepare_training_model_cfg(&workspace, &settings, &export_dir, &task_id)?;
    let dataset_cfg = models_dir(&workspace).join(format!("{task_id}_dataset.yaml"));
    let script = scripts_dir().join("openpcdet_train.py");

    let mut args = vec![
        script.to_string_lossy().to_string(),
        "--openpcdet-root".to_string(),
        settings.openpcdet_root.clone(),
        "--dataset-cfg".to_string(),
        dataset_cfg.to_string_lossy().to_string(),
        "--model-cfg".to_string(),
        model_cfg.to_string_lossy().to_string(),
        "--extra-tag".to_string(),
        task_id.clone(),
        "--python-bin".to_string(),
        settings.python_bin.clone(),
    ];
    args.extend(split_extra_args(&settings.train_extra_args));

    spawn_task(
        workspace.clone(),
        TaskKind::TrainSeed,
        settings.python_bin.clone(),
        args,
        None,
        json!({
            "task_id": task_id,
            "reviewed_count": reviewed_count,
            "warning": if reviewed_count < settings.min_reviewed_for_training {
                Some(format!(
                    "reviewed frame count {} is below recommended minimum {}",
                    reviewed_count, settings.min_reviewed_for_training
                ))
            } else {
                None::<String>
            },
            "export_dir": export_dir.to_string_lossy(),
            "model_config_path": model_cfg.to_string_lossy(),
        }),
        PostAction::UpdateCheckpoint {
            workspace_path: workspace_path.clone(),
            openpcdet_root: settings.openpcdet_root.clone(),
            task_id,
        },
    )
}

#[tauri::command]
fn infer_range_cmd(workspace_path: String, frame_ids: Vec<String>) -> Result<TaskRecord, String> {
    let workspace = workspace_root(&workspace_path);
    ensure_workspace_structure(&workspace)?;
    let snapshot = open_workspace(&workspace_path)?;
    let settings = snapshot.settings;
    if settings.openpcdet_root.trim().is_empty() {
        return Err("OpenPCDet root is not configured".to_string());
    }
    if settings.model_config_path.trim().is_empty() {
        return Err("Model config path is not configured".to_string());
    }
    if settings.checkpoint_path.trim().is_empty() {
        return Err("Checkpoint path is not configured".to_string());
    }
    if frame_ids.is_empty() {
        return Err("No frames selected for inference".to_string());
    }

    let task_id = format!("infer_range_{}", now_ms());
    let export_dir = exports_dir(&workspace).join(&task_id);
    export_frames_sync(&workspace, &export_dir, &frame_ids)?;
    let predictions_path = models_dir(&workspace).join(format!("{task_id}_predictions.json"));
    let script = scripts_dir().join("openpcdet_infer.py");

    let mut args = vec![
        script.to_string_lossy().to_string(),
        "--openpcdet-root".to_string(),
        settings.openpcdet_root.clone(),
        "--cfg-file".to_string(),
        settings.model_config_path.clone(),
        "--ckpt-file".to_string(),
        settings.checkpoint_path.clone(),
        "--points-dir".to_string(),
        export_dir.join("points").to_string_lossy().to_string(),
        "--output-json".to_string(),
        predictions_path.to_string_lossy().to_string(),
        "--score-thresh".to_string(),
        settings.score_threshold.to_string(),
    ];
    args.extend(split_extra_args(&settings.infer_extra_args));

    spawn_task(
        workspace,
        TaskKind::InferRange,
        settings.python_bin,
        args,
        None,
        json!({
            "task_id": task_id,
            "frame_ids": frame_ids,
            "predictions_path": predictions_path.to_string_lossy(),
        }),
        PostAction::ImportPredictions {
            workspace_path,
            predictions_path: predictions_path.to_string_lossy().to_string(),
        },
    )
}

#[derive(Clone)]
enum PostAction {
    None,
    ImportPredictions {
        workspace_path: String,
        predictions_path: String,
    },
    UpdateCheckpoint {
        workspace_path: String,
        openpcdet_root: String,
        task_id: String,
    },
}

fn spawn_task(
    workspace: PathBuf,
    kind: TaskKind,
    program: String,
    args: Vec<String>,
    cwd: Option<PathBuf>,
    metadata: serde_json::Value,
    post_action: PostAction,
) -> Result<TaskRecord, String> {
    ensure_workspace_structure(&workspace)?;
    let task_id = format!("{kind:?}_{}", now_ms()).to_lowercase();
    let log_path = tasks_dir(&workspace).join(format!("{task_id}.log"));
    let mut record = TaskRecord {
        id: task_id.clone(),
        kind,
        status: TaskStatus::Pending,
        command: format_command(&program, &args),
        log_path: log_path.to_string_lossy().to_string(),
        created_at_ms: now_ms(),
        started_at_ms: None,
        finished_at_ms: None,
        error: None,
        metadata,
    };
    write_json(&task_file(&workspace, &task_id), &record)?;

    let record_for_thread = record.clone();
    std::thread::spawn(move || {
        let mut running = record_for_thread;
        running.status = TaskStatus::Running;
        running.started_at_ms = Some(now_ms());
        let _ = write_json(&task_file(&workspace, &task_id), &running);

        let file = match File::create(&log_path) {
            Ok(file) => file,
            Err(err) => {
                running.status = TaskStatus::Failed;
                running.finished_at_ms = Some(now_ms());
                running.error = Some(format!("failed to create log file: {err}"));
                let _ = write_json(&task_file(&workspace, &task_id), &running);
                return;
            }
        };
        let stdout = match file.try_clone() {
            Ok(handle) => handle,
            Err(err) => {
                running.status = TaskStatus::Failed;
                running.finished_at_ms = Some(now_ms());
                running.error = Some(format!("failed to clone log handle: {err}"));
                let _ = write_json(&task_file(&workspace, &task_id), &running);
                return;
            }
        };

        let mut command = Command::new(&program);
        command.args(&args);
        if let Some(cwd) = &cwd {
            command.current_dir(cwd);
        }
        let status = command
            .stdout(Stdio::from(stdout))
            .stderr(Stdio::from(file))
            .status();

        let mut finished = running.clone();
        finished.finished_at_ms = Some(now_ms());
        match status {
            Ok(status) if status.success() => {
                finished.status = TaskStatus::Succeeded;
                match post_action {
                    PostAction::None => {}
                    PostAction::ImportPredictions {
                        workspace_path,
                        predictions_path,
                    } => match import_predictions(&workspace_path, Path::new(&predictions_path)) {
                        Ok(summaries) => {
                            finished.metadata["imported_frames"] = json!(summaries
                                .iter()
                                .map(|summary| summary.frame_id.clone())
                                .collect::<Vec<_>>());
                        }
                        Err(err) => {
                            finished.status = TaskStatus::Failed;
                            finished.error = Some(err);
                        }
                    },
                    PostAction::UpdateCheckpoint {
                        workspace_path,
                        openpcdet_root,
                        task_id,
                    } => match find_newest_checkpoint(Path::new(&openpcdet_root), &task_id) {
                        Some(checkpoint) => {
                            let checkpoint_str = checkpoint.to_string_lossy().to_string();
                            let _ = update_checkpoint(&workspace_path, &checkpoint_str);
                            finished.metadata["checkpoint_path"] = json!(checkpoint_str);
                        }
                        None => {
                            finished.metadata["checkpoint_path"] = json!(null);
                        }
                    },
                }
            }
            Ok(status) => {
                finished.status = TaskStatus::Failed;
                finished.error = Some(format!("process exited with status {status}"));
            }
            Err(err) => {
                finished.status = TaskStatus::Failed;
                finished.error = Some(format!("failed to start process: {err}"));
            }
        }
        let _ = write_json(&task_file(&workspace, &task_id), &finished);
    });

    record.status = TaskStatus::Pending;
    Ok(record)
}

fn export_reviewed_sync(workspace: &Path, export_dir: &Path) -> Result<(), String> {
    run_export_helper(workspace, export_dir, true, false, None)
}

fn export_frames_sync(
    workspace: &Path,
    export_dir: &Path,
    frame_ids: &[String],
) -> Result<(), String> {
    run_export_helper(workspace, export_dir, false, true, Some(frame_ids.to_vec()))
}

fn run_export_helper(
    workspace: &Path,
    export_dir: &Path,
    reviewed_only: bool,
    points_only: bool,
    frame_ids: Option<Vec<String>>,
) -> Result<(), String> {
    let script = scripts_dir().join("workspace_tools.py");
    let mut args = vec![
        script.to_string_lossy().to_string(),
        "export-openpcdet".to_string(),
        "--workspace".to_string(),
        workspace.to_string_lossy().to_string(),
        "--output".to_string(),
        export_dir.to_string_lossy().to_string(),
    ];
    if reviewed_only {
        args.push("--reviewed-only".to_string());
    }
    if points_only {
        args.push("--points-only".to_string());
    }

    let frame_list_path = if let Some(frame_ids) = frame_ids {
        let path = workspace
            .join("meta")
            .join(format!("frame_list_{}.txt", now_ms()));
        fs::write(&path, frame_ids.join("\n"))
            .map_err(|err| format!("failed to write {}: {err}", path.display()))?;
        args.push("--frame-list".to_string());
        args.push(path.to_string_lossy().to_string());
        Some(path)
    } else {
        None
    };

    let output = Command::new(bundled_python_bin())
        .args(&args)
        .output()
        .map_err(|err| format!("failed to execute export helper: {err}"))?;

    if let Some(path) = frame_list_path {
        let _ = fs::remove_file(path);
    }
    if !output.status.success() {
        return Err(String::from_utf8_lossy(&output.stderr).to_string());
    }
    Ok(())
}

fn prepare_training_model_cfg(
    workspace: &Path,
    settings: &WorkspaceSettings,
    export_dir: &Path,
    task_id: &str,
) -> Result<PathBuf, String> {
    let classes = workspace::load_classes(workspace)?;
    let dataset_cfg_path = PathBuf::from(&settings.dataset_config_path);
    let model_cfg_path = PathBuf::from(&settings.model_config_path);
    let dataset_yaml = fs::read_to_string(&dataset_cfg_path)
        .map_err(|err| format!("failed to read {}: {err}", dataset_cfg_path.display()))?;
    let mut dataset_value: serde_yaml::Value = serde_yaml::from_str(&dataset_yaml)
        .map_err(|err| format!("invalid dataset yaml: {err}"))?;
    if let serde_yaml::Value::Mapping(mapping) = &mut dataset_value {
        mapping.insert(
            serde_yaml::Value::String("DATA_PATH".to_string()),
            serde_yaml::Value::String(export_dir.to_string_lossy().to_string()),
        );
        mapping.insert(
            serde_yaml::Value::String("MAP_CLASS_TO_KITTI".to_string()),
            serde_yaml::Value::Mapping(
                classes
                    .iter()
                    .map(|class_def| {
                        (
                            serde_yaml::Value::String(class_def.name.clone()),
                            serde_yaml::Value::String("Pedestrian".to_string()),
                        )
                    })
                    .collect(),
            ),
        );
        if let Some(serde_yaml::Value::Mapping(augmentor)) =
            mapping.get_mut(&serde_yaml::Value::String("DATA_AUGMENTOR".to_string()))
        {
            if let Some(serde_yaml::Value::Sequence(items)) =
                augmentor.get_mut(&serde_yaml::Value::String("AUG_CONFIG_LIST".to_string()))
            {
                for item in items {
                    let serde_yaml::Value::Mapping(config) = item else {
                        continue;
                    };
                    let is_gt_sampling = config
                        .get(&serde_yaml::Value::String("NAME".to_string()))
                        .and_then(|value| value.as_str())
                        == Some("gt_sampling");
                    if !is_gt_sampling {
                        continue;
                    }

                    config.insert(
                        serde_yaml::Value::String("SAMPLE_GROUPS".to_string()),
                        serde_yaml::Value::Sequence(
                            classes
                                .iter()
                                .map(|class_def| {
                                    let sample_count =
                                        if class_def.name.to_ascii_lowercase().contains("big") {
                                            2
                                        } else {
                                            10
                                        };
                                    serde_yaml::Value::String(format!(
                                        "{}:{sample_count}",
                                        class_def.name
                                    ))
                                })
                                .collect(),
                        ),
                    );
                    config.insert(
                        serde_yaml::Value::String("PREPARE".to_string()),
                        serde_yaml::Value::Mapping(
                            [(
                                serde_yaml::Value::String("filter_by_min_points".to_string()),
                                serde_yaml::Value::Sequence(
                                    classes
                                        .iter()
                                        .map(|class_def| {
                                            serde_yaml::Value::String(format!(
                                                "{}:2",
                                                class_def.name
                                            ))
                                        })
                                        .collect(),
                                ),
                            )]
                            .into_iter()
                            .collect(),
                        ),
                    );
                }
            }
        }
    }
    let dataset_out = models_dir(workspace).join(format!("{task_id}_dataset.yaml"));
    fs::write(
        &dataset_out,
        serde_yaml::to_string(&dataset_value)
            .map_err(|err| format!("failed to serialize dataset yaml: {err}"))?,
    )
    .map_err(|err| format!("failed to write {}: {err}", dataset_out.display()))?;

    let model_yaml = fs::read_to_string(&model_cfg_path)
        .map_err(|err| format!("failed to read {}: {err}", model_cfg_path.display()))?;
    let mut model_value: serde_yaml::Value =
        serde_yaml::from_str(&model_yaml).map_err(|err| format!("invalid model yaml: {err}"))?;
    if let serde_yaml::Value::Mapping(root) = &mut model_value {
        root.insert(
            serde_yaml::Value::String("CLASS_NAMES".to_string()),
            serde_yaml::Value::Sequence(
                classes
                    .iter()
                    .map(|class_def| serde_yaml::Value::String(class_def.name.clone()))
                    .collect(),
            ),
        );
        let key = serde_yaml::Value::String("DATA_CONFIG".to_string());
        if let Some(serde_yaml::Value::Mapping(data_cfg)) = root.get_mut(&key) {
            data_cfg.insert(
                serde_yaml::Value::String("_BASE_CONFIG_".to_string()),
                serde_yaml::Value::String(dataset_out.to_string_lossy().to_string()),
            );
        }
        if let Some(serde_yaml::Value::Mapping(model_cfg)) =
            root.get_mut(&serde_yaml::Value::String("MODEL".to_string()))
        {
            if let Some(serde_yaml::Value::Mapping(dense_head)) =
                model_cfg.get_mut(&serde_yaml::Value::String("DENSE_HEAD".to_string()))
            {
                dense_head.insert(
                    serde_yaml::Value::String("ANCHOR_GENERATOR_CONFIG".to_string()),
                    serde_yaml::Value::Sequence(
                        classes
                            .iter()
                            .map(|class_def| {
                                serde_yaml::Value::Mapping(
                                    [
                                        (
                                            serde_yaml::Value::String("class_name".to_string()),
                                            serde_yaml::Value::String(class_def.name.clone()),
                                        ),
                                        (
                                            serde_yaml::Value::String("anchor_sizes".to_string()),
                                            serde_yaml::Value::Sequence(vec![
                                                serde_yaml::Value::Sequence(
                                                    class_def
                                                        .default_size
                                                        .iter()
                                                        .map(|value| {
                                                            serde_yaml::to_value(*value)
                                                                .unwrap_or(serde_yaml::Value::Null)
                                                        })
                                                        .collect(),
                                                ),
                                            ]),
                                        ),
                                        (
                                            serde_yaml::Value::String(
                                                "anchor_rotations".to_string(),
                                            ),
                                            serde_yaml::Value::Sequence(vec![
                                                serde_yaml::to_value(0.0_f32)
                                                    .unwrap_or(serde_yaml::Value::Null),
                                            ]),
                                        ),
                                        (
                                            serde_yaml::Value::String(
                                                "anchor_bottom_heights".to_string(),
                                            ),
                                            serde_yaml::Value::Sequence(vec![
                                                serde_yaml::to_value(0.0_f32)
                                                    .unwrap_or(serde_yaml::Value::Null),
                                            ]),
                                        ),
                                        (
                                            serde_yaml::Value::String("align_center".to_string()),
                                            serde_yaml::Value::Bool(false),
                                        ),
                                        (
                                            serde_yaml::Value::String(
                                                "feature_map_stride".to_string(),
                                            ),
                                            serde_yaml::to_value(2)
                                                .unwrap_or(serde_yaml::Value::Null),
                                        ),
                                        (
                                            serde_yaml::Value::String(
                                                "matched_threshold".to_string(),
                                            ),
                                            serde_yaml::to_value(0.35_f32)
                                                .unwrap_or(serde_yaml::Value::Null),
                                        ),
                                        (
                                            serde_yaml::Value::String(
                                                "unmatched_threshold".to_string(),
                                            ),
                                            serde_yaml::to_value(0.2_f32)
                                                .unwrap_or(serde_yaml::Value::Null),
                                        ),
                                    ]
                                    .into_iter()
                                    .collect(),
                                )
                            })
                            .collect(),
                    ),
                );
            }
        }
    }
    let model_out = models_dir(workspace).join(format!("{task_id}_model.yaml"));
    fs::write(
        &model_out,
        serde_yaml::to_string(&model_value)
            .map_err(|err| format!("failed to serialize model yaml: {err}"))?,
    )
    .map_err(|err| format!("failed to write {}: {err}", model_out.display()))?;
    Ok(model_out)
}

fn find_newest_checkpoint(openpcdet_root: &Path, task_id: &str) -> Option<PathBuf> {
    let output_root = openpcdet_root.join("output");
    if !output_root.exists() {
        return None;
    }

    let mut candidates: Vec<(std::time::SystemTime, PathBuf)> = WalkDir::new(output_root)
        .into_iter()
        .filter_map(Result::ok)
        .filter(|entry| entry.path().extension().and_then(|ext| ext.to_str()) == Some("pth"))
        .filter_map(|entry| {
            let path = entry.path().to_path_buf();
            let metadata = fs::metadata(&path).ok()?;
            let modified = metadata.modified().ok()?;
            Some((modified, path))
        })
        .collect();

    candidates.sort_by(|left, right| left.0.cmp(&right.0));
    candidates
        .iter()
        .rev()
        .find(|(_, path)| path.to_string_lossy().contains(task_id))
        .map(|(_, path)| path.clone())
        .or_else(|| candidates.into_iter().last().map(|(_, path)| path))
}

fn scripts_dir() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../scripts")
}

fn split_extra_args(value: &str) -> Vec<String> {
    value
        .split_whitespace()
        .filter(|part| !part.is_empty())
        .map(ToString::to_string)
        .collect()
}

fn format_command(program: &str, args: &[String]) -> String {
    std::iter::once(program.to_string())
        .chain(args.iter().cloned())
        .collect::<Vec<_>>()
        .join(" ")
}

fn seed_file_dialog(initial_path: Option<String>) -> FileDialog {
    let mut dialog = FileDialog::new();
    if let Some(initial_path) = initial_path.filter(|value| !value.trim().is_empty()) {
        let candidate = PathBuf::from(initial_path);
        let directory = if candidate.is_dir() {
            candidate
        } else {
            candidate
                .parent()
                .map(Path::to_path_buf)
                .unwrap_or(candidate)
        };
        dialog = dialog.set_directory(directory);
    }
    dialog
}

fn now_ms() -> u64 {
    use std::time::{SystemTime, UNIX_EPOCH};
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|duration| duration.as_millis() as u64)
        .unwrap_or_default()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            if let Some(webview) = app.get_webview_window("main") {
                webview.open_devtools();
                eprintln!("[bitfsd_annotator] opened devtools for main webview");
            }
            Ok(())
        })
        .on_page_load(|webview, payload| {
            eprintln!(
                "[bitfsd_annotator] page load {:?} {} ({})",
                payload.event(),
                payload.url(),
                webview.label()
            );
        })
        .invoke_handler(tauri::generate_handler![
            open_workspace_cmd,
            load_frame_cmd,
            save_annotation_cmd,
            save_classes_cmd,
            save_settings_cmd,
            pick_directory_cmd,
            pick_rosbag_directory_cmd,
            batch_propagate_cmd,
            list_tasks_cmd,
            read_task_log_cmd,
            import_predictions_cmd,
            export_openpcdet_cmd,
            extract_pcd_cmd,
            train_seed_cmd,
            infer_range_cmd,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
