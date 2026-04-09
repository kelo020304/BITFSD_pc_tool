# bitfsd-annotator

本项目用于点云分包、人工标注、结果复核以及 OpenPCDet 数据导出。

## 1. 功能

- 从 `bag / mcap` 提取点云并按组输出
- 在标注界面加载指定分组进行标注与复核
- 将标注结果导出为 OpenPCDet 数据目录
- 在界面中配置 OpenPCDet 训练与推理参数

## 2. 环境要求

推荐系统：`Linux / Ubuntu`

基础依赖：

- `Node.js >= 18`
- `npm`
- `Rust` / `cargo`
- `conda` 或 `miniconda`
- `gcc-10`
- `g++-10`
- `lsof`

Ubuntu 参考安装：

```bash
sudo apt update
sudo apt install -y gcc-10 g++-10 lsof curl build-essential
curl https://sh.rustup.rs -sSf | sh
source "$HOME/.cargo/env"
```

校验命令：

```bash
node --version
npm --version
cargo --version
conda --version
gcc-10 --version
g++-10 --version
```

> Note
> 以下命令默认在 `tools/bitfsd_annotator` 目录执行。

## 3. 安装

### 3.1 安装前端依赖

```bash
cd tools/bitfsd_annotator
npm install
```

### 3.2 创建项目环境

项目使用仓库内的 `.conda-env` 作为运行环境：

```bash
conda create -y -p ./.conda-env -c conda-forge \
  python=3.11 \
  webkit2gtk4.1 \
  pkg-config \
  c-compiler \
  cxx-compiler \
  rosbags
```

安装网页模式后端依赖：

```bash
./.conda-env/bin/python3 -m pip install fastapi uvicorn
```

### 3.3 构建校验

```bash
./.conda-env/bin/python3 --version
npm run build
```

## 4. 启动

### 4.1 桌面版

```bash
./start.sh
```

`start.sh` 会自动：

- 注入 `.conda-env`
- 配置 `pkg-config`、库路径和编译器
- 清理 `1420 / 1421` 端口
- 启动 `tauri dev`

> Note
> 首次启动需要编译前端和 Rust，耗时较长属于正常现象。

### 4.2 网页版

开发模式：

```bash
./start_web.sh --dev
```

地址：

- 前端：`http://localhost:1420`
- 后端：`http://127.0.0.1:8787`

普通模式：

```bash
./start_web.sh
```

地址：

- `http://localhost:8787`

> Important
> 修改 `server.py` 后需重启网页后端进程。

## 5. 基本流程

推荐顺序：

1. 启动工具
2. 执行分包
3. 进入标注页
4. 打开目标分组
5. 标注并保存
6. 导出 OpenPCDet 数据

### 5.1 标注操作视频
> [!NOTE]
> 建议先查看该视频，再进行首次标注操作。

- 操作演示视频  
![cone annotate demo](assets/videos/cone_annotate.gif)



## 6. 分包

在分包页填写：

- `ROS2 Bag`：原始 `bag / mcap` 路径
- `保存目录`：分包输出根目录
- `Topic`：点云话题；可留空自动检测

点击“分包成组”后，系统会：

- 读取点云消息
- 按设定规则抽帧
- 输出 `group_001`、`group_002` 等分组目录
- 在左侧面板显示实时进度

若输出目录已存在分组，将弹出确认框：

- 确认：删除旧分组后重建
- 取消：保留旧分组，并继续追加新的 `group_XXX`

## 7. 标注

### 7.1 打开工作区

进入标注页后不会自动加载旧点云，需要手动执行：

1. 选择工作区目录
2. 选择目标分组
3. 点击“打开”

> Important
> 当前逻辑为“进入空工作台后再手动打开”，不会复用上一次已加载的点云。

### 7.2 常用操作

- 双击画面：新建框
- 双击后直接弹出类别选择
- `Delete / Backspace`：删除当前框
- `Ctrl + S`：保存当前帧

### 7.3 标注页结构

标注页顶部为横向选项卡：

- `工作区`
- `帧`
- `导出`
- `自动`
- `模型`

`帧` 页签支持：

- 按帧号过滤
- 仅查看待审核帧
- 切换当前帧

## 8. 导出

进入 `导出` 页签后：

1. 选择导出根目录
2. 执行导出

导出目录将自动按当前组名创建子目录：

```text
/export_root/group_001
/export_root/group_002
```

> Note
> 输入框表示“导出根目录”，不是最终输出目录。

## 9. OpenPCDet

如需使用训练或自动标注，请在 `模型` 页签配置：

- `Python`
- `OpenPCDet Root`
- `Model Config`
- `Dataset Config`
- `Checkpoint`

本项目不负责安装以下依赖：

- CUDA
- PyTorch
- OpenPCDet

## 10. 目录说明

```text
bitfsd_annotator/
├── src/               # React 前端
├── src-tauri/         # Tauri 配置
├── scripts/           # 分包、导出、训练脚本
├── server.py          # 网页版后端
├── start.sh           # 桌面版启动脚本
├── start_web.sh       # 网页版启动脚本
├── package.json       # 前端依赖
└── .conda-env/        # 项目运行环境
```

## 11. 常见问题

### 11.1 缺少 `.conda-env`

执行：

```bash
conda create -y -p ./.conda-env -c conda-forge \
  python=3.11 \
  webkit2gtk4.1 \
  pkg-config \
  c-compiler \
  cxx-compiler \
  rosbags
```

### 11.2 网页版提示 Python 不兼容

要求：

- Python `3.11+`
- 已安装 `fastapi`
- 已安装 `uvicorn`
- 可导入 `server.py`

建议使用：

```bash
./.conda-env/bin/python3 -m pip install fastapi uvicorn
PYTHON_BIN=./.conda-env/bin/python3 ./start_web.sh --dev
```

### 11.3 修改后界面未更新

- 前端变更：刷新页面
- 后端变更：重启 `./start_web.sh --dev`
- 桌面版变更：重启 `./start.sh`

### 11.4 分包目录已有旧结果

当前行为：

- 可删除旧结果后重建
- 可保留旧结果并继续追加

### 11.5 进入标注页后未自动加载点云

这是当前设计。需手动选择工作区、分组并点击“打开”。

## 12. 命令速查

安装：

```bash
cd tools/bitfsd_annotator
npm install
conda create -y -p ./.conda-env -c conda-forge \
  python=3.11 \
  webkit2gtk4.1 \
  pkg-config \
  c-compiler \
  cxx-compiler \
  rosbags
./.conda-env/bin/python3 -m pip install fastapi uvicorn
```

桌面版：

```bash
./start.sh
```

网页版开发模式：

```bash
./start_web.sh --dev
```

前端构建校验：

```bash
npm run build
```
