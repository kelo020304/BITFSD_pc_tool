#!/usr/bin/env bash
# Host preflight for bitfsd-annotator.
# Runs BEFORE scripts/setup_web_runtime.sh. Does not require .conda-env.
# Exits 0 if host is ready, 1 if any blocking check fails.

set -uo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

C_RESET=$'\033[0m'
C_RED=$'\033[31m'
C_GREEN=$'\033[32m'
C_YELLOW=$'\033[33m'
C_BOLD=$'\033[1m'

if [[ ! -t 1 ]]; then
  C_RESET=""; C_RED=""; C_GREEN=""; C_YELLOW=""; C_BOLD=""
fi

ERRORS=()
WARNINGS=()

MIN_DRIVER_CUDA_MAJOR=11
MIN_DRIVER_CUDA_MINOR=8
MIN_FREE_DISK_GB=20
MIN_RAM_GB=8

print_ok() {
  printf "  ${C_GREEN}[ OK ]${C_RESET} %-22s %s\n" "$1" "$2"
}

print_warn() {
  printf "  ${C_YELLOW}[WARN]${C_RESET} %-22s %s\n" "$1" "$2"
  WARNINGS+=("$1: $2")
}

print_err() {
  printf "  ${C_RED}[FAIL]${C_RESET} %-22s %s\n" "$1" "$2"
  ERRORS+=("$1: $2")
}

section() {
  printf "\n${C_BOLD}== %s ==${C_RESET}\n" "$1"
}

check_os() {
  section "操作系统"
  if [[ ! -f /etc/os-release ]]; then
    print_warn "os-release" "无法读取 /etc/os-release；已测试平台为 Ubuntu 22.04 / 24.04"
    return
  fi
  # shellcheck disable=SC1091
  . /etc/os-release
  local pretty="${PRETTY_NAME:-${NAME:-unknown}}"
  case "${ID:-}" in
    ubuntu)
      case "${VERSION_ID:-}" in
        22.04|24.04)
          print_ok "distro" "${pretty}"
          ;;
        *)
          print_warn "distro" "${pretty}（仅在 Ubuntu 22.04 / 24.04 上测试过）"
          ;;
      esac
      ;;
    *)
      print_warn "distro" "${pretty}（仅在 Ubuntu 上测试过，conda 环境可能仍可用）"
      ;;
  esac

  local kernel
  kernel="$(uname -r 2>/dev/null || echo unknown)"
  print_ok "kernel" "${kernel}"
}

check_shell_tools() {
  section "基础工具"
  local tool
  for tool in bash git curl tar awk sed grep sha256sum; do
    if command -v "${tool}" >/dev/null 2>&1; then
      print_ok "${tool}" "$(command -v "${tool}")"
    else
      print_err "${tool}" "未安装；建议 sudo apt install ${tool}"
    fi
  done

  # gcc on host is not strictly required (conda env ships its own),
  # but missing it often signals an un-provisioned dev machine.
  if command -v gcc >/dev/null 2>&1; then
    print_ok "gcc (host)" "$(gcc -dumpversion 2>/dev/null || echo present)"
  else
    print_warn "gcc (host)" "宿主机未安装 gcc；conda 环境自带 gcc 11，通常也能跑"
  fi
}

check_conda() {
  section "conda / mamba"
  local found=0
  if command -v mamba >/dev/null 2>&1; then
    print_ok "mamba" "$(command -v mamba)"
    found=1
  fi
  if command -v conda >/dev/null 2>&1; then
    local ver
    ver="$(conda --version 2>/dev/null || echo conda)"
    print_ok "conda" "${ver}"
    found=1
  fi
  if [[ "${found}" -eq 0 ]]; then
    print_err "conda/mamba" "两者都没装。推荐安装 miniforge：https://github.com/conda-forge/miniforge"
  fi
}

parse_cuda_major_minor() {
  # echoes "MAJOR MINOR" or nothing
  local text="$1"
  local ver
  ver="$(printf '%s' "${text}" | grep -oE '[0-9]+\.[0-9]+' | head -n 1 || true)"
  if [[ -z "${ver}" ]]; then
    return 1
  fi
  printf '%s %s\n' "${ver%%.*}" "${ver##*.}"
}

check_nvidia() {
  section "NVIDIA 驱动 / GPU"
  if ! command -v nvidia-smi >/dev/null 2>&1; then
    print_err "nvidia-smi" "未找到。请先安装 NVIDIA 驱动（ubuntu-drivers autoinstall 或官方 .run 包）"
    return
  fi

  local smi_out
  if ! smi_out="$(nvidia-smi 2>&1)"; then
    print_err "nvidia-smi" "执行失败；请检查驱动是否正常（重启 / dkms 状态）"
    return
  fi

  local driver_ver
  driver_ver="$(printf '%s' "${smi_out}" | sed -n 's/.*Driver Version: \([0-9.]*\).*/\1/p' | head -n 1)"
  if [[ -n "${driver_ver}" ]]; then
    print_ok "driver" "${driver_ver}"
  else
    print_warn "driver" "无法解析驱动版本"
  fi

  local driver_cuda
  driver_cuda="$(printf '%s' "${smi_out}" | sed -n 's/.*CUDA Version: \([0-9.]*\).*/\1/p' | head -n 1)"
  if [[ -z "${driver_cuda}" ]]; then
    print_warn "driver_cuda" "nvidia-smi 没有报告 CUDA Version；驱动可能过旧"
  else
    local parsed major minor
    if parsed="$(parse_cuda_major_minor "${driver_cuda}")"; then
      major="${parsed%% *}"
      minor="${parsed##* }"
      if (( major > MIN_DRIVER_CUDA_MAJOR )) || \
         (( major == MIN_DRIVER_CUDA_MAJOR && minor >= MIN_DRIVER_CUDA_MINOR )); then
        print_ok "driver_cuda" "${driver_cuda}（兼容 CUDA 11.8 运行时）"
      else
        print_err "driver_cuda" "${driver_cuda} < 11.8；请升级 NVIDIA 驱动到 >= 450.80.02 / 一般 >= 520 系列"
      fi
    else
      print_warn "driver_cuda" "无法解析 CUDA Version: ${driver_cuda}"
    fi
  fi

  local gpu_line
  gpu_line="$(nvidia-smi --query-gpu=name,memory.total --format=csv,noheader 2>/dev/null | head -n 1 || true)"
  if [[ -n "${gpu_line}" ]]; then
    print_ok "gpu" "${gpu_line}"
  fi
}

check_disk() {
  section "磁盘空间"
  local avail_kb avail_gb
  avail_kb="$(df -Pk "${ROOT_DIR}" | awk 'NR==2 {print $4}')"
  if [[ -z "${avail_kb}" ]]; then
    print_warn "disk" "无法读取 ${ROOT_DIR} 的可用空间"
    return
  fi
  avail_gb=$(( avail_kb / 1024 / 1024 ))
  if (( avail_gb >= MIN_FREE_DISK_GB )); then
    print_ok "free space" "${avail_gb} GiB @ ${ROOT_DIR}"
  else
    print_err "free space" "只剩 ${avail_gb} GiB @ ${ROOT_DIR}；需要 >= ${MIN_FREE_DISK_GB} GiB（.conda-env 约 10GB+）"
  fi
}

check_ram() {
  section "内存"
  local mem_kb mem_gb
  mem_kb="$(awk '/^MemTotal:/ {print $2}' /proc/meminfo 2>/dev/null || echo 0)"
  if [[ "${mem_kb}" -le 0 ]]; then
    print_warn "ram" "无法读取 /proc/meminfo"
    return
  fi
  mem_gb=$(( mem_kb / 1024 / 1024 ))
  if (( mem_gb >= MIN_RAM_GB )); then
    print_ok "ram" "${mem_gb} GiB"
  else
    print_warn "ram" "仅 ${mem_gb} GiB；spconv 编译与训练建议 >= ${MIN_RAM_GB} GiB"
  fi
}

check_network() {
  section "网络（只做联通性提示，不强制）"
  local host
  for host in github.com conda.anaconda.org pypi.org; do
    if curl -fsI --max-time 5 "https://${host}" >/dev/null 2>&1; then
      print_ok "${host}" "可访问"
    else
      print_warn "${host}" "5s 内无响应；setup 脚本拉依赖时可能会失败"
    fi
  done
}

check_repo_state() {
  section "仓库状态"
  if [[ -d "${ROOT_DIR}/.git" ]]; then
    local branch sha
    branch="$(git -C "${ROOT_DIR}" rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown)"
    sha="$(git -C "${ROOT_DIR}" rev-parse --short HEAD 2>/dev/null || echo unknown)"
    print_ok "git checkout" "${branch} @ ${sha}"
  else
    print_warn "git checkout" "${ROOT_DIR} 不是 git 仓库；请确认是 git clone 下来的"
  fi

  if [[ -f "${ROOT_DIR}/environment.web.yml" ]]; then
    print_ok "environment.web.yml" "存在"
  else
    print_err "environment.web.yml" "缺失；项目目录不完整"
  fi

  if [[ -x "${ROOT_DIR}/scripts/setup_web_runtime.sh" ]]; then
    print_ok "setup script" "scripts/setup_web_runtime.sh"
  else
    print_err "setup script" "scripts/setup_web_runtime.sh 不可执行；尝试 chmod +x"
  fi
}

printf "${C_BOLD}bitfsd-annotator host doctor${C_RESET}\n"
printf "  repo: %s\n" "${ROOT_DIR}"

check_os
check_shell_tools
check_conda
check_nvidia
check_disk
check_ram
check_repo_state
check_network

section "总结"
if (( ${#ERRORS[@]} == 0 )); then
  if (( ${#WARNINGS[@]} == 0 )); then
    printf "  ${C_GREEN}✓ 宿主机检查全部通过${C_RESET}\n"
  else
    printf "  ${C_GREEN}✓ 宿主机可以继续 setup${C_RESET}（${#WARNINGS[@]} 个警告，不阻塞）\n"
  fi
  printf "  下一步：${C_BOLD}./scripts/setup_web_runtime.sh${C_RESET}\n"
  exit 0
fi

printf "  ${C_RED}✗ ${#ERRORS[@]} 个阻塞项需要先修掉：${C_RESET}\n"
for item in "${ERRORS[@]}"; do
  printf "    - %s\n" "${item}"
done
printf "  修完后重新执行：${C_BOLD}./scripts/doctor.sh${C_RESET}\n"
exit 1
