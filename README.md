# bitfsd-annotator

点云分包、标注、复核、OpenPCDet 导出与训练的一体化网页工具。
前端、FastAPI 后端、OpenPCDet 训练共享同一受管 conda 环境 `.conda-env`。

本文档描述环境部署。使用说明见 [docs/USAGE.md](docs/USAGE.md)。

---

## 1. 功能

- 按固定步长从 ROS2 bag 抽帧并分组打包。
- 浏览器内完成 3D 锥桶框标注与复核。
- 一键导出 OpenPCDet 格式数据集。
- 页面发起 OpenPCDet 训练与单帧推理。
- 提供锥桶颜色分析与已训模型快速测试。

---

## 2. 前提

| 项 | 要求 |
|---|---|
| 系统 | Ubuntu 22.04 / 24.04 |
| GPU | NVIDIA GPU，驱动兼容 CUDA 11.8（驱动版本 >= 520） |
| 磁盘 | 仓库目录可用空间 >= 20 GiB |
| 内存 | >= 8 GiB |
| conda | 已安装 `conda` 或 `mamba`，推荐 [miniforge](https://github.com/conda-forge/miniforge) |
| 网络 | 可访问 `github.com`、`conda.anaconda.org`、`pypi.org` |

执行 `./scripts/doctor.sh` 可自动核验以上条件。

---

## 3. 首次部署

```bash
git clone <repo_url> bitfsd_annotator
cd bitfsd_annotator

./scripts/doctor.sh            # 宿主机体检，不执行安装动作
./scripts/setup_web_runtime.sh # 创建 .conda-env 并构建前端
```

`setup_web_runtime.sh` 执行步骤：

1. 在 `./.conda-env` 创建 Python 3.10 + PyTorch 2.1.2 + CUDA 11.8 + spconv-cu118。
2. 拉取 `third_party/OpenPCDet`，切换至 `OPENPCDET_REF`（默认 `master`）。
3. 在受管环境执行 `python setup.py develop` 安装 OpenPCDet。
4. 执行 `npm ci` 安装前端依赖。
5. 运行 `scripts/check_runtime.py --mode full` 自检。
6. 执行 `npm run build` 构建前端。

初次部署耗时约 20–40 分钟，主要分布在 conda 解析、PyTorch 下载、spconv 与 OpenPCDet 编译。

---

## 4. 启动

```bash
./start_web.sh            # 生产模式，http://localhost:8787
./start_web.sh --dev      # 开发模式，前端 :1420 热重载 + 后端 :8787
./start_web.sh --check    # 仅执行运行时自检
```

`start_web.sh` 启动前会自动执行一次轻量 `check_runtime`。

---

## 5. 增量更新

`git pull` 后：

- 仅前端（`src/**`）或后端 Python（`server.py` / `scripts/**`）变更：执行 `./start_web.sh`。
- `environment.web.yml` 变更：执行 `./scripts/setup_web_runtime.sh`，脚本自动同步 `.conda-env`。
- `package-lock.json` 变更：同上，脚本依据 sha256 状态文件判断是否重跑 `npm ci`。
- 无法判断变更范围时：直接执行 `./scripts/setup_web_runtime.sh`，未变化步骤将被跳过。

强制刷新：

```bash
./scripts/setup_web_runtime.sh --force           # 全量重建
./scripts/setup_web_runtime.sh --force-env       # 仅重建 conda 环境
./scripts/setup_web_runtime.sh --force-npm       # 仅重装 node_modules
./scripts/setup_web_runtime.sh --force-openpcdet # 仅刷新 OpenPCDet 并重新编译
./scripts/setup_web_runtime.sh --skip-build      # 跳过前端构建
```

---

## 6. 目录结构

```text
bitfsd_annotator/
├── environment.web.yml             # 受管 conda 环境定义
├── start_web.sh                    # 启动入口
├── server.py                       # FastAPI 后端
├── src/                            # 前端源码（React + three.js）
├── config/openpcdet/               # 训练 / 推理默认配置
├── scripts/
│   ├── doctor.sh                   # 宿主机体检
│   ├── setup_web_runtime.sh        # 一键初始化与增量更新
│   ├── check_runtime.py            # 运行时自检
│   ├── openpcdet_train.py
│   ├── openpcdet_infer.py
│   ├── workspace_tools.py
│   └── point_cloud_utils.py
├── docs/
│   └── USAGE.md                    # 使用文档
├── third_party/OpenPCDet/          # 由 setup 脚本自动拉取
├── .conda-env/                     # 受管运行时，勿提交
├── .setup-state/                   # 增量状态文件
└── dist/                           # 前端构建产物
```

---

## 7. 故障排查

### 7.1 `doctor.sh` 报 `driver_cuda < 11.8`

```bash
sudo ubuntu-drivers autoinstall
sudo reboot
```

升级至 >= 520 系列后重新执行 `./scripts/doctor.sh`。

### 7.2 `doctor.sh` 报告 `conda / mamba` 缺失

```bash
wget https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh
bash Miniforge3-Linux-x86_64.sh
```

安装完成后重新打开终端。

### 7.3 `setup_web_runtime.sh` 中途失败

- 网络超时：重新执行 `./scripts/setup_web_runtime.sh`，增量机制从失败点继续。
- 编译阶段 OOM：脚本已设置 `MAX_JOBS=1`。释放其他进程占用的内存后重新执行。
- `libmamba` 崩溃：脚本会自动回退至 `conda`；若仍失败，执行 `./scripts/setup_web_runtime.sh --force-env`。

### 7.4 启动后提示 `CUDA unavailable`

```bash
./start_web.sh --check
```

检查输出中的 `torch_cuda` 项。若 `nvidia-smi` 正常而 `torch.cuda.is_available()` 为 `False`，通常为驱动与 CUDA 11.8 不兼容，需升级驱动。

### 7.5 环境损坏后的重置

```bash
rm -rf .conda-env .setup-state
./scripts/setup_web_runtime.sh
```

`.conda-env` 完全由 `environment.web.yml` 生成，删除重建安全。

### 7.6 锁定 OpenPCDet 至指定 tag

```bash
OPENPCDET_REF=v0.6.0 ./scripts/setup_web_runtime.sh --force-openpcdet
```

默认 `OPENPCDET_REF=master`。

### 7.7 端口占用

```bash
ss -lntp | grep -E '8787|1420'
```

生产端口 `8787` 定义于 `start_web.sh` 末行；开发模式 vite 端口 `1420`。

---

## 8. 最短部署路径

```bash
git clone <repo_url> bitfsd_annotator
cd bitfsd_annotator
./scripts/doctor.sh
./scripts/setup_web_runtime.sh
./start_web.sh
# 浏览器访问 http://localhost:8787
# 使用方式参见 docs/USAGE.md
```
