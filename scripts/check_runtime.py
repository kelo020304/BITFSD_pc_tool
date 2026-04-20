#!/usr/bin/env python3
"""Validate the managed web runtime for bitfsd-annotator."""

from __future__ import annotations

import argparse
import importlib
import json
import os
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any


ROOT_DIR = Path(__file__).resolve().parent.parent
ENV_DIR = ROOT_DIR / ".conda-env"
OPENPCDET_ROOT = ROOT_DIR / "third_party" / "OpenPCDet"
TARGET_OPENPCDET_REF = "master"
MIN_PYTHON = (3, 10)

if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))


@dataclass
class CheckResult:
    name: str
    level: str
    detail: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="check managed runtime for bitfsd-annotator")
    parser.add_argument("--mode", choices=["web-start", "full"], default="web-start")
    parser.add_argument("--json", action="store_true", help="emit machine-readable JSON")
    parser.add_argument("--require-gpu", action="store_true", help="fail if CUDA is unavailable")
    parser.add_argument("--openpcdet-root", default=str(OPENPCDET_ROOT))
    return parser.parse_args()


def run_command(command: list[str], cwd: Path | None = None) -> tuple[int, str]:
    try:
        completed = subprocess.run(
            command,
            cwd=str(cwd) if cwd else None,
            capture_output=True,
            text=True,
            check=False,
        )
    except FileNotFoundError:
        return 127, ""
    output = (completed.stdout or completed.stderr or "").strip()
    return completed.returncode, output


def import_module(name: str) -> tuple[bool, str]:
    try:
        module = importlib.import_module(name)
    except Exception as exc:
        return False, str(exc)
    version = getattr(module, "__version__", None)
    return True, f"version={version}" if version else "import ok"


def check_python(results: list[CheckResult]) -> None:
    if sys.version_info < MIN_PYTHON:
        results.append(CheckResult("python", "error", f"need >= {MIN_PYTHON[0]}.{MIN_PYTHON[1]}, got {sys.version.split()[0]}"))
        return
    results.append(CheckResult("python", "ok", sys.version.split()[0]))


def check_python_modules(results: list[CheckResult], modules: list[str]) -> None:
    for name in modules:
        ok, detail = import_module(name)
        results.append(CheckResult(name, "ok" if ok else "error", detail))


def check_node_tools(results: list[CheckResult]) -> None:
    node_bin = ENV_DIR / "bin" / "node"
    npm_bin = ENV_DIR / "bin" / "npm"
    if not node_bin.exists():
        results.append(CheckResult("node", "error", f"missing {node_bin}"))
    else:
        _, output = run_command([str(node_bin), "--version"])
        results.append(CheckResult("node", "ok", output or str(node_bin)))

    if not npm_bin.exists():
        results.append(CheckResult("npm", "error", f"missing {npm_bin}"))
    else:
        _, output = run_command([str(npm_bin), "--version"])
        results.append(CheckResult("npm", "ok", output or str(npm_bin)))

    node_modules = ROOT_DIR / "node_modules"
    package_lock = ROOT_DIR / "package-lock.json"
    if node_modules.exists():
        results.append(CheckResult("node_modules", "ok", str(node_modules)))
    else:
        detail = f"missing {node_modules}; run scripts/setup_web_runtime.sh"
        if package_lock.exists():
            results.append(CheckResult("node_modules", "error", detail))
        else:
            results.append(CheckResult("node_modules", "warning", detail))


def check_server_import(results: list[CheckResult]) -> None:
    try:
        import server  # noqa: F401
    except Exception as exc:
        results.append(CheckResult("server", "error", str(exc)))
        return
    results.append(CheckResult("server", "ok", "import ok"))


def check_openpcdet(results: list[CheckResult], openpcdet_root: Path, require_gpu: bool) -> None:
    if not openpcdet_root.exists():
        results.append(CheckResult("openpcdet_root", "error", f"missing {openpcdet_root}"))
        return
    results.append(CheckResult("openpcdet_root", "ok", str(openpcdet_root)))

    train_py = openpcdet_root / "tools" / "train.py"
    if not train_py.exists():
        results.append(CheckResult("openpcdet_train_py", "error", f"missing {train_py}"))
    else:
        results.append(CheckResult("openpcdet_train_py", "ok", str(train_py)))

    git_bin = shutil.which("git")
    if git_bin:
        current_ref = ""
        for command in (
            [git_bin, "symbolic-ref", "--short", "HEAD"],
            [git_bin, "describe", "--tags", "--exact-match"],
            [git_bin, "rev-parse", "--short", "HEAD"],
        ):
            code, output = run_command(command, cwd=openpcdet_root)
            if code == 0 and output:
                current_ref = output
                break
        level = "ok" if current_ref == TARGET_OPENPCDET_REF else "warning"
        results.append(CheckResult("openpcdet_ref", level, current_ref or "unknown ref"))

    for module_name in ["torch", "torchvision", "spconv", "easydict", "pcdet"]:
        ok, detail = import_module(module_name)
        results.append(CheckResult(module_name, "ok" if ok else "error", detail))

    torch_cuda_version = ""
    try:
        import torch
    except Exception as exc:
        results.append(CheckResult("torch_cuda", "error", str(exc)))
    else:
        torch_cuda_version = str(torch.version.cuda or "")
        if torch.cuda.is_available():
            device = torch.cuda.get_device_name(torch.cuda.current_device())
            results.append(CheckResult("torch_cuda", "ok", device))
        else:
            level = "error" if require_gpu else "warning"
            results.append(CheckResult("torch_cuda", level, "CUDA unavailable"))

    nvcc_bin = None
    cuda_home = os.environ.get("CUDA_HOME")
    if cuda_home:
        candidate = Path(cuda_home) / "bin" / "nvcc"
        if candidate.exists():
            nvcc_bin = str(candidate)
    if not nvcc_bin:
        nvcc_bin = shutil.which("nvcc")
    if not nvcc_bin:
        results.append(CheckResult("nvcc", "warning", "nvcc not found in CUDA_HOME/PATH"))
    else:
        _, output = run_command([nvcc_bin, "--version"])
        last_line = output.splitlines()[-1] if output else nvcc_bin
        results.append(CheckResult("nvcc", "ok", last_line))
        nvcc_version = ""
        if "release " in last_line:
          nvcc_version = last_line.split("release ", 1)[1].split(",", 1)[0].strip()
        if torch_cuda_version and nvcc_version:
            level = "ok" if torch_cuda_version == nvcc_version else "warning"
            results.append(CheckResult("cuda_match", level, f"torch {torch_cuda_version} / nvcc {nvcc_version}"))


def summarize(results: list[CheckResult], as_json: bool) -> int:
    counts = {"ok": 0, "warning": 0, "error": 0}
    for item in results:
        counts[item.level] = counts.get(item.level, 0) + 1
    has_error = counts["error"] > 0
    has_warning = counts["warning"] > 0

    payload = {
        "root_dir": str(ROOT_DIR),
        "env_dir": str(ENV_DIR),
        "results": [item.__dict__ for item in results],
        "summary": {
            "ok": counts["ok"],
            "warning": counts["warning"],
            "error": counts["error"],
            "verdict": "error" if has_error else ("warning" if has_warning else "ok"),
        },
    }

    if as_json:
        print(json.dumps(payload, indent=2, ensure_ascii=False))
        return 1 if has_error else 0

    use_color = sys.stdout.isatty()
    green = "\033[32m" if use_color else ""
    yellow = "\033[33m" if use_color else ""
    red = "\033[31m" if use_color else ""
    bold = "\033[1m" if use_color else ""
    reset = "\033[0m" if use_color else ""

    for item in results:
        print(f"[{item.level.upper():7}] {item.name}: {item.detail}")

    print()
    print(f"{bold}---- runtime check summary ----{reset}")
    print(f"  ok={counts['ok']}  warning={counts['warning']}  error={counts['error']}")
    if has_error:
        print(f"  {red}✗ 运行时自检失败，共 {counts['error']} 项阻塞。请查看上方标记为 ERROR 的条目。{reset}")
    elif has_warning:
        print(f"  {yellow}✓ 运行时可启动，但有 {counts['warning']} 项警告。{reset}")
    else:
        print(f"  {green}✓ 全部通过，运行时就绪。{reset}")
    return 1 if has_error else 0


def main() -> int:
    args = parse_args()
    results: list[CheckResult] = []

    check_python(results)
    check_python_modules(results, ["fastapi", "uvicorn", "numpy", "yaml", "rosbags"])
    check_server_import(results)
    check_node_tools(results)

    if args.mode == "full":
        check_openpcdet(results, Path(args.openpcdet_root).expanduser().resolve(), args.require_gpu)

    return summarize(results, args.json)


if __name__ == "__main__":
    raise SystemExit(main())
