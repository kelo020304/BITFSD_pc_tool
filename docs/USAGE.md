# bitfsd-annotator 使用文档

本文档描述网页端的使用方式。环境部署参见 [README.md](../README.md)。

---

## 0. 术语

| 术语 | 含义 |
|---|---|
| bag | ROS2 rosbag2 目录，包含 `metadata.yaml` 与 `*.mcap` 或 `*.db3` |
| workspace | 标注任务输出根目录，包含若干 `group_*` |
| group | 分组目录，例如 `group_001`，默认 20 帧 |
| frame | 点云帧，由 `.pcd` 与 JSON 标注组成 |
| annotation | `group_xxx/frames/NNNNNNN.json`，存储该帧全部 3D 框 |
| export root | OpenPCDet 导出数据集根目录，可包含多个 group 的导出 |
| checkpoint | OpenPCDet 训练产物，`.pth` 文件 |

---

## 1. 总体流程

```text
rosbag2 →  [点云分包]  →  workspace/group_*  →  [标注]  →  3D 框
                                                    │
                                              [查看] 复核
                                                    │
                                              [导出 OpenPCDet]  →  export_root/group_*
                                                                        │
                                                                [模型训练]  →  *.pth
                                                                        │
                                                                [模型测试] / [锥桶颜色分析]
```

---

## 2. 启动与首页

```bash
./start_web.sh
# 浏览器访问 http://localhost:8787
```

首页包含两个区域：

- **工作区入口**：填写 Workspace 绝对路径，或点击"选择目录"。
  - 路径本身为 `group_xxx` 时，直接作为当前分组。
  - 路径为包含多个 `group_*` 的根目录时，出现分组下拉框。
- **六个模式卡片**：Package、Train、Test、Color、Annotate、Review。

---

## 3. 点云分包（Package）

作用：将 rosbag 按固定步长抽帧并切分为若干 `group_*`。

字段：

| 字段 | 说明 |
|---|---|
| Rosbag | ROS2 bag 目录路径，需包含 `metadata.yaml` |
| Topic | 点云话题名，例如 `/perception/lidar/non_ground` |
| Output Workspace | 分包输出根目录，生成 `group_001/`、`group_002/` … |
| Frame Step | 抽帧步长，默认 **5** |
| Group Size | 每组帧数，默认 **20** |

点击"开始分包"执行，进度实时显示。单组目录结构：

```text
group_003/
├── frames/
│   ├── 0000000.pcd
│   ├── 0000000.json
│   └── ...
├── classes.json
└── settings.json
```

---

## 4. 标注（Annotate）

作用：绘制 3D 锥桶框，写入 `group_xxx/frames/NNNNNNN.json`。

### 4.1 页面布局

- 左侧面板：标签页切换（Workspace / Classes / Frames / Export / Automation / OpenPCDet）。
- 中央 3D 视口：渲染当前帧点云与 3D 框。
- 右侧面板：当前帧标注列表。

顶部 HUD 四项指标：帧 ID、点数、标注框数、标注来源（`manual` / `auto`）。

### 4.2 快捷键

| 操作 | 键位 |
|---|---|
| 从点击位置建框 | 双击点云 |
| 旋转选中框 | Q / E |
| 删除选中框 | Del |
| 保存当前帧 | Ctrl + S |
| 切换前后帧 | ← / → |

双击后后端在点击位置附近执行局部聚类，生成带朝向的 box，并弹出类别选择菜单。

### 4.3 左侧标签页

- **Workspace**：当前工作区信息与快捷键提示。
- **Classes**：类别增删改，包括颜色与 LWH 默认尺寸，保存至 `classes.json`。
- **Frames**：分组全部帧列表与跳转入口，显示每帧审核状态。
- **Export**：导出 OpenPCDet 数据集，参见第 6 节。
- **Automation**：对当前帧调用模型执行自动打框。
- **OpenPCDet**：模型相关设置，包含 `model_config_path`、`checkpoint_path`、`score_threshold`、训练与推理额外参数。

### 4.4 审核状态

右侧面板顶部按钮为帧级审核状态：**待审核 / 已审核 / 驳回**。

- 默认 `unreviewed`。
- 标注确认无误后点击"已审核"。
- 标注不可用时点击"驳回"。
- OpenPCDet 导出时按 `Min Reviewed` 阈值过滤。

### 4.5 自动打框

前提条件：OpenPCDet 标签页已设置 `model_config_path` 与 `checkpoint_path`。

执行流程：Automation 标签页 → 点击 "Auto Label" → 后端推理当前帧 → 写回当前帧标注，`source = auto`。

后续人工编辑并保存后，`source` 恢复为 `manual`。

---

## 5. 查看（Review）

只读浏览模式：

- 仅加载包含标注的帧。
- 双击、拖动、旋转不写入磁盘。
- 右侧审核按钮可用，可在此模式下更新审核状态。

---

## 6. 导出 OpenPCDet 数据集（Export）

入口：标注模式左侧 Export 标签页。

字段：

| 字段 | 说明 |
|---|---|
| Export Root | 导出根目录，多组可共用，按分组建子目录 |
| Min Reviewed | 每组至少多少帧"已审核"方允许导出 |

点击"导出当前分组到 OpenPCDet 格式"。单组输出结构：

```text
<export_root>/
└── group_003/
    ├── points/
    │   └── 0000000.bin
    ├── labels/
    │   └── 0000000.txt
    └── ImageSets/
        ├── train.txt
        └── val.txt
```

---

## 7. 模型训练（Train）

入口：首页 → Train。

### 7.1 数据目录

- 单组训练：填写 `group_xxx` 目录，例如 `/sda1/fsd/cone_annoated/group_001`。
- 多组训练：填写 `export_root`，例如 `/sda1/fsd/cone_annoated`。运行时聚合样本，命名形如 `group_001__0000000`。

### 7.2 字段

| 字段 | 默认值 | 说明 |
|---|---|---|
| 数据目录 | — | 参见 7.1 |
| Dataset Config | `config/openpcdet/dataset_configs/cone_dataset.yaml` | 数据集定义 |
| Model Config | `config/openpcdet/cone_models/pointpillar_cone.yaml` | 模型结构 |
| Epochs | 80 | 训练轮数 |
| Batch Size | 4 | 单 GPU 批大小 |
| Workers | 4 | dataloader 线程数 |
| Logger Iter Interval | 50 | 日志打印间隔（iter） |
| Ckpt Save Step | 1 | 每多少 epoch 保存一次 checkpoint |

额外参数：标注模式 OpenPCDet 标签页中的 `train_extra_args` / `infer_extra_args`，以空格切分后追加至 `train.py` / `demo.py` 命令行。

### 7.3 执行

点击"开始训练"，页面下方出现任务面板：

- 实时日志流。
- loss / lr 曲线。
- 任务控制：停止（SIGINT）、强制结束（SIGKILL）、显示 log 绝对路径。

checkpoint 默认保存至 `third_party/OpenPCDet/output/<model>/<tag>/ckpt/*.pth`。

### 7.4 参数建议

- 样本量较少时（单组 20 帧级别）PointPillar 易欠拟合，建议样本量 >= 5 组。
- 6 GB 显存下 `Batch Size=4` 接近上限，超出易触发 OOM。
- 脚本不提供 GPU 调度，并发训练会产生显存竞争。
- 启动初期处于 build indice / cache 阶段，暂无日志输出属正常情况。

---

## 8. 模型测试（Test）

入口：首页 → Test。

字段：

| 字段 | 说明 |
|---|---|
| Export Root | 点云来源根目录 |
| Group | 子分组选择 |
| Checkpoint | `.pth` 路径 |
| Frame | 当前帧 |

点击 "Run Inference"：

- 3D 视口叠加显示预测框（半透明）与 GT 框（实心）。
- HUD 显示单帧推理耗时（ms）。

测试页不写入磁盘。若需将预测合入标注，使用 Automation / Auto Label。

---

## 9. 锥桶颜色分析（Color）

入口：首页 → Color。

作用：推理 Cone 位置，并根据每个 Cone 框内点的 range-normalized intensity 自动分类为红 / 蓝 / 未知。

字段：

| 字段 | 说明 |
|---|---|
| Root | 导出数据根目录 |
| Checkpoint | 训练产物 `.pth` |
| Intensity 阈值 | 默认值已提供，一般无需修改 |

按帧推理，结果仅展示，不写入磁盘。

---

## 10. 常见操作流程

### 10.1 标注一个分组

```
1. ./start_web.sh
2. 浏览器访问 http://localhost:8787
3. 填写 Workspace 路径；若为根目录则选择 group_xxx
4. 进入 Annotate
5. ← / → 翻帧，双击建框，Ctrl+S 保存
6. 逐帧点击"已审核"
```

### 10.2 训练一个模型

```
1. 将各 group 导出至同一 export_root
2. 首页 → Train
3. 数据目录填写 export_root
4. 按 7.2 调整参数
5. 点击"开始训练"，观察 loss / lr 曲线
6. 训练完成后通过 Test 页面验证
```

### 10.3 使用已训模型辅助标注

```
1. Annotate 模式 → OpenPCDet 标签页填写 model_config 与 checkpoint，保存
2. 切换至目标帧
3. Automation 标签页 → 点击 Auto Label
4. 人工检查并保存（Ctrl+S）
```

---

## 11. 故障排查

分层定位：

- 网页无法打开或 404：属于启动问题，参考 [README 第 7 节](../README.md#7-故障排查)，先执行 `./start_web.sh --check`。
- 页面顶部红条报错：后端错误信息已显示，可结合浏览器 DevTools 的 Console / Network 面板进一步定位。
- 训练 / 推理挂起：在训练面板查看 log 绝对路径，使用 `tail -f` 跟踪。
- 点云渲染黑屏或帧率偏低：单帧点数上限为 `FRAME_POINT_LIMIT = 260000`，超出部分会自动降采样；若仍偏低，说明 GPU 算力不足。

反馈问题时建议附带：

- 页面 URL（含 hash / query）。
- 后端日志（`start_web.sh` 终端输出）。
- 复现步骤（workspace、group、frame）。
