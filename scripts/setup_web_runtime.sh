#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_DIR="${ROOT_DIR}/.conda-env"
ENV_FILE="${ROOT_DIR}/environment.web.yml"
OPENPCDET_DIR="${ROOT_DIR}/third_party/OpenPCDet"
OPENPCDET_REPO="${OPENPCDET_REPO:-https://github.com/open-mmlab/OpenPCDet.git}"
OPENPCDET_REF="${OPENPCDET_REF:-master}"
STATE_DIR="${ROOT_DIR}/.setup-state"
ENV_STATE_FILE="${STATE_DIR}/environment.sha256"
NPM_STATE_FILE="${STATE_DIR}/package-lock.sha256"
OPENPCDET_STATE_FILE="${STATE_DIR}/openpcdet.install"
ORIGINAL_PATH="${PATH}"

FORCE_ALL=0
FORCE_ENV=0
FORCE_NPM=0
FORCE_OPENPCDET=0
SKIP_BUILD=0

usage() {
  cat <<'EOF'
Usage:
  ./scripts/setup_web_runtime.sh
  ./scripts/setup_web_runtime.sh --force
  ./scripts/setup_web_runtime.sh --force-env
  ./scripts/setup_web_runtime.sh --force-openpcdet
  ./scripts/setup_web_runtime.sh --skip-build

Default behavior is incremental:
  - Reuse an existing .conda-env if it still imports the required modules
  - Reuse node_modules if package-lock.json has not changed
  - Reuse an existing OpenPCDet checkout unless forced
  - Rebuild the frontend only when sources changed
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --force)
      FORCE_ALL=1
      ;;
    --force-env)
      FORCE_ENV=1
      ;;
    --force-npm)
      FORCE_NPM=1
      ;;
    --force-openpcdet)
      FORCE_OPENPCDET=1
      ;;
    --skip-build)
      SKIP_BUILD=1
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
  shift
done

mkdir -p "${STATE_DIR}"

pick_solver() {
  if command -v mamba >/dev/null 2>&1; then
    printf '%s\n' "mamba"
    return 0
  fi
  if command -v conda >/dev/null 2>&1; then
    printf '%s\n' "conda"
    return 0
  fi
  return 1
}

has_conda() {
  command -v conda >/dev/null 2>&1
}

sha256_file() {
  sha256sum "$1" | awk '{print $1}'
}

state_matches() {
  local state_file="$1"
  local expected="$2"
  [[ -f "${state_file}" ]] && [[ "$(tr -d '\n' < "${state_file}")" == "${expected}" ]]
}

write_state() {
  local state_file="$1"
  local value="$2"
  printf '%s\n' "${value}" > "${state_file}"
}

run_gently() {
  if command -v ionice >/dev/null 2>&1 && command -v nice >/dev/null 2>&1; then
    ionice -c3 nice -n 10 "$@"
    return $?
  fi
  if command -v nice >/dev/null 2>&1; then
    nice -n 10 "$@"
    return $?
  fi
  "$@"
}

conda_base_prefix() {
  local conda_bin
  conda_bin="$(command -v conda 2>/dev/null || true)"
  if [[ -z "${conda_bin}" ]]; then
    return 1
  fi
  dirname "$(dirname "${conda_bin}")"
}

run_solver_cmd() {
  local status
  set +e
  "$@"
  status=$?
  set -e
  return "${status}"
}

sync_managed_env() {
  local action="$1"
  local solver="$2"
  shift 2

  echo "[bitfsd_annotator] ${action} managed runtime via ${solver}"
  local status=0
  run_solver_cmd run_gently "${solver}" env "${action}" "$@" || status=$?
  if [[ "${status}" -eq 0 ]]; then
    return 0
  fi

  if [[ "${solver}" == "mamba" ]] && has_conda; then
    if [[ "${status}" -eq 139 ]]; then
      echo "[bitfsd_annotator] mamba crashed with SIGSEGV during env ${action}; retrying with conda" >&2
    else
      echo "[bitfsd_annotator] mamba failed with exit code ${status} during env ${action}; retrying with conda" >&2
    fi
    status=0
    run_solver_cmd run_gently conda env "${action}" "$@" || status=$?
    return "${status}"
  fi

  return "${status}"
}

build_env_args() {
  local action="$1"
  local solver="$2"

  ENV_ARGS=(--prefix "${ENV_DIR}" --file "${ENV_FILE}")
  if [[ "${action}" == "update" ]]; then
    ENV_ARGS+=(--prune)
  fi

  if [[ "${solver}" == "mamba" ]]; then
    ENV_ARGS+=(--no-rc -y)
  else
    ENV_ARGS+=(--solver classic)
    if [[ "${action}" == "create" ]]; then
      ENV_ARGS+=(-y)
    fi
  fi
}

pick_compiler() {
  local pattern="$1"
  local candidate
  local -a candidates=()

  case "${pattern}" in
    cc)
      candidates=(
        "x86_64-conda-linux-gnu-cc"
        "x86_64-conda-linux-gnu-gcc"
        "cc"
        "gcc"
      )
      ;;
    c++)
      candidates=(
        "x86_64-conda-linux-gnu-c++"
        "x86_64-conda-linux-gnu-g++"
        "c++"
        "g++"
      )
      ;;
    g++)
      candidates=(
        "x86_64-conda-linux-gnu-g++"
        "g++"
      )
      ;;
    gcc)
      candidates=(
        "x86_64-conda-linux-gnu-gcc"
        "gcc"
      )
      ;;
    *)
      candidates=(
        "x86_64-conda-linux-gnu-${pattern}"
        "${pattern}"
      )
      ;;
  esac

  for candidate in "${candidates[@]}"; do
    if [[ -x "${ENV_DIR}/bin/${candidate}" ]]; then
      printf '%s\n' "${ENV_DIR}/bin/${candidate}"
      return 0
    fi
  done
}

cuda_version_from_nvcc() {
  local nvcc_bin="$1"
  "${nvcc_bin}" --version 2>/dev/null | sed -n 's/.*release \([0-9][0-9.]*\),.*/\1/p' | tail -n 1
}

torch_cuda_version() {
  "${PYTHON_BIN}" - <<'PY' 2>/dev/null
import torch

print(torch.version.cuda or "")
PY
}

select_cuda_home() {
  local desired_version="$1"
  local candidate nvcc_bin version system_nvcc
  local -a candidates=()

  if [[ -n "${CUDA_HOME:-}" ]]; then
    candidates+=("${CUDA_HOME}")
  fi
  candidates+=("/usr/local/cuda-${desired_version}" "/usr/local/cuda" "${ENV_DIR}")

  system_nvcc="$(env PATH="${ORIGINAL_PATH}" command -v nvcc 2>/dev/null || true)"
  if [[ -n "${system_nvcc}" ]]; then
    candidates+=("$(dirname "$(dirname "${system_nvcc}")")")
  fi

  for candidate in "${candidates[@]}"; do
    [[ -n "${candidate}" ]] || continue
    nvcc_bin="${candidate}/bin/nvcc"
    [[ -x "${nvcc_bin}" ]] || continue
    version="$(cuda_version_from_nvcc "${nvcc_bin}")"
    if [[ "${version}" == "${desired_version}" ]]; then
      printf '%s\n' "${candidate}"
      return 0
    fi
  done

  return 1
}

configure_cuda_toolchain() {
  local desired_version selected_cuda_home selected_cuda_version
  desired_version="$(torch_cuda_version || true)"

  if [[ -z "${desired_version}" ]]; then
    export PATH="${ENV_DIR}/bin:${ORIGINAL_PATH}"
    if [[ -x "${ENV_DIR}/bin/nvcc" ]]; then
      export CUDA_HOME="${ENV_DIR}"
      export CUDACXX="${ENV_DIR}/bin/nvcc"
    fi
    return 0
  fi

  selected_cuda_home="$(select_cuda_home "${desired_version}" || true)"
  if [[ -n "${selected_cuda_home}" ]]; then
    export CUDA_HOME="${selected_cuda_home}"
    export CUDACXX="${selected_cuda_home}/bin/nvcc"
    export PATH="${selected_cuda_home}/bin:${ENV_DIR}/bin:${ORIGINAL_PATH}"
    selected_cuda_version="$(cuda_version_from_nvcc "${CUDACXX}")"
    echo "[bitfsd_annotator] using CUDA toolkit ${selected_cuda_version} from ${CUDA_HOME}"
    return 0
  fi

  export PATH="${ENV_DIR}/bin:${ORIGINAL_PATH}"
  if [[ -x "${ENV_DIR}/bin/nvcc" ]]; then
    export CUDA_HOME="${ENV_DIR}"
    export CUDACXX="${ENV_DIR}/bin/nvcc"
  fi
  echo "[bitfsd_annotator] warning: could not find a CUDA toolkit matching torch ${desired_version}; build may fail" >&2
}

env_runtime_ready() {
  [[ -x "${ENV_DIR}/bin/python3" ]] || return 1
  [[ -x "${ENV_DIR}/bin/npm" ]] || return 1
  "${ENV_DIR}/bin/python3" - <<'PY' >/dev/null 2>&1
import importlib
for name in ("fastapi", "uvicorn", "numpy", "yaml", "rosbags", "torch", "torchvision", "easydict", "spconv"):
    importlib.import_module(name)
PY
}

node_modules_ready() {
  [[ -d "${ROOT_DIR}/node_modules" ]] || return 1
  run_gently "${NPM_BIN}" ls --prefix "${ROOT_DIR}" --depth=0 >/dev/null 2>&1
}

current_openpcdet_ref() {
  if [[ ! -d "${OPENPCDET_DIR}/.git" ]]; then
    return 1
  fi
  "${GIT_BIN}" -C "${OPENPCDET_DIR}" rev-parse --abbrev-ref HEAD 2>/dev/null || \
    "${GIT_BIN}" -C "${OPENPCDET_DIR}" rev-parse --short HEAD 2>/dev/null
}

openpcdet_repo_ready() {
  [[ -d "${OPENPCDET_DIR}/.git" ]] && [[ -f "${OPENPCDET_DIR}/tools/train.py" ]]
}

pcdet_import_uses_repo() {
  [[ -d "${OPENPCDET_DIR}" ]] || return 1
  "${PYTHON_BIN}" - "${OPENPCDET_DIR}" <<'PY' >/dev/null 2>&1
import sys
from pathlib import Path

root = Path(sys.argv[1]).resolve()
import pcdet
module_path = Path(pcdet.__file__).resolve()
if root not in module_path.parents:
    raise SystemExit(1)
PY
}

python_build_prereqs_ready() {
  "${PYTHON_BIN}" - <<'PY' >/dev/null 2>&1
import pkg_resources
import setuptools
import wheel
PY
}

legacy_setuptools_ready() {
  local develop_py="${ENV_DIR}/lib/python3.10/site-packages/setuptools/command/develop.py"
  [[ -f "${develop_py}" ]] || return 1
  ! grep -q -- '--use-pep517' "${develop_py}"
}

cached_legacy_setuptools_root() {
  local conda_base
  local candidate
  local develop_py
  conda_base="$(conda_base_prefix)" || return 1
  while IFS= read -r candidate; do
    develop_py="${candidate}/site-packages/setuptools/command/develop.py"
    if [[ -f "${develop_py}" ]] && ! grep -q -- '--use-pep517' "${develop_py}"; then
      printf '%s\n' "${candidate}"
    fi
  done < <(find "${conda_base}/pkgs" -maxdepth 1 -type d -name 'setuptools-*' | sort -V)
}

restore_legacy_setuptools_from_cache() {
  local cache_root
  local site_packages="${ENV_DIR}/lib/python3.10/site-packages"
  local egg_info
  cache_root="$(cached_legacy_setuptools_root | tail -n 1)" || return 1
  [[ -n "${cache_root}" ]] || return 1

  mkdir -p "${site_packages}"
  rm -rf "${site_packages}/setuptools" "${site_packages}/pkg_resources" "${site_packages}/_distutils_hack"
  find "${site_packages}" -maxdepth 1 -name 'setuptools-*.egg-info' -exec rm -rf {} +
  rm -f "${site_packages}/distutils-precedence.pth"

  cp -a "${cache_root}/site-packages/setuptools" "${site_packages}/"
  cp -a "${cache_root}/site-packages/pkg_resources" "${site_packages}/"
  cp -a "${cache_root}/site-packages/_distutils_hack" "${site_packages}/"
  cp -a "${cache_root}/site-packages/distutils-precedence.pth" "${site_packages}/"
  egg_info="$(find "${cache_root}/site-packages" -maxdepth 1 -name 'setuptools-*.egg-info' | head -n 1)"
  [[ -n "${egg_info}" ]] || return 1
  cp -a "${egg_info}" "${site_packages}/"
}

cached_pkg_resources_dir() {
  local conda_base
  conda_base="$(conda_base_prefix)" || return 1
  find "${conda_base}/pkgs" -maxdepth 3 -type d -path '*/site-packages/pkg_resources' | sort -V | tail -n 1
}

restore_pkg_resources_from_cache() {
  local cached_dir
  cached_dir="$(cached_pkg_resources_dir)" || return 1
  if [[ -z "${cached_dir}" || ! -d "${cached_dir}" ]]; then
    return 1
  fi
  mkdir -p "${ENV_DIR}/lib/python3.10/site-packages"
  cp -a "${cached_dir}" "${ENV_DIR}/lib/python3.10/site-packages/"
}

frontend_build_needed() {
  local dist_index="${ROOT_DIR}/dist/index.html"
  if [[ ! -f "${dist_index}" ]]; then
    return 0
  fi
  for path in "${ROOT_DIR}/src" "${ROOT_DIR}/public"; do
    if [[ -d "${path}" ]] && find "${path}" -type f -newer "${dist_index}" -print -quit | grep -q .; then
      return 0
    fi
  done
  local candidate
  for candidate in \
    "${ROOT_DIR}/index.html" \
    "${ROOT_DIR}/package.json" \
    "${ROOT_DIR}/package-lock.json" \
    "${ROOT_DIR}/vite.config.ts" \
    "${ROOT_DIR}/vite.config.js" \
    "${ROOT_DIR}/tsconfig.json"; do
    if [[ -f "${candidate}" && "${candidate}" -nt "${dist_index}" ]]; then
      return 0
    fi
  done
  return 1
}

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Missing environment file: ${ENV_FILE}" >&2
  exit 1
fi

if ! SOLVER="$(pick_solver)"; then
  echo "Need conda or mamba to create the managed runtime." >&2
  exit 1
fi

echo "[bitfsd_annotator] using solver: ${SOLVER}"
export CONDA_CHANNEL_PRIORITY=flexible
ENV_SPEC_HASH="$(sha256_file "${ENV_FILE}")"
NEED_ENV_SYNC=0
if [[ "${FORCE_ALL}" -eq 1 || "${FORCE_ENV}" -eq 1 ]]; then
  NEED_ENV_SYNC=1
elif ! env_runtime_ready; then
  NEED_ENV_SYNC=1
fi

if [[ "${NEED_ENV_SYNC}" -eq 1 ]]; then
  ENV_ACTION="create"
  ENV_SOLVER="${SOLVER}"
  if [[ -d "${ENV_DIR}" ]]; then
    ENV_ACTION="update"
    if [[ "${SOLVER}" == "mamba" ]] && has_conda; then
      ENV_SOLVER="conda"
      echo "[bitfsd_annotator] existing env detected; preferring conda for update because libmamba can crash on prefix updates" >&2
    fi
  fi
  build_env_args "${ENV_ACTION}" "${ENV_SOLVER}"
  sync_managed_env "${ENV_ACTION}" "${ENV_SOLVER}" "${ENV_ARGS[@]}"
  write_state "${ENV_STATE_FILE}" "${ENV_SPEC_HASH}"
elif ! state_matches "${ENV_STATE_FILE}" "${ENV_SPEC_HASH}"; then
  echo "[bitfsd_annotator] reusing existing managed runtime without solver refresh; use --force-env to apply ${ENV_FILE}"
  write_state "${ENV_STATE_FILE}" "${ENV_SPEC_HASH}"
else
  echo "[bitfsd_annotator] managed runtime already matches ${ENV_FILE}; skipping env sync"
fi

PYTHON_BIN="${ENV_DIR}/bin/python3"
NPM_BIN="${ENV_DIR}/bin/npm"
GIT_BIN="${ENV_DIR}/bin/git"
if [[ ! -x "${PYTHON_BIN}" ]]; then
  echo "Managed Python not found: ${PYTHON_BIN}" >&2
  exit 1
fi
if [[ ! -x "${NPM_BIN}" ]]; then
  echo "Managed npm not found: ${NPM_BIN}" >&2
  exit 1
fi
if [[ ! -x "${GIT_BIN}" ]]; then
  GIT_BIN="$(command -v git)"
fi

configure_cuda_toolchain
export PYTHONNOUSERSITE=1
if CC_BIN="$(pick_compiler cc)"; then
  export CC="${CC_BIN}"
fi
if CXX_BIN="$(pick_compiler c++)"; then
  export CXX="${CXX_BIN}"
elif CXX_BIN="$(pick_compiler g++)"; then
  export CXX="${CXX_BIN}"
fi

mkdir -p "${ROOT_DIR}/third_party"
if ! openpcdet_repo_ready; then
  echo "[bitfsd_annotator] cloning OpenPCDet (${OPENPCDET_REF})"
  run_gently "${GIT_BIN}" clone --branch "${OPENPCDET_REF}" --depth 1 "${OPENPCDET_REPO}" "${OPENPCDET_DIR}"
elif [[ "${FORCE_ALL}" -eq 1 || "${FORCE_OPENPCDET}" -eq 1 ]]; then
  echo "[bitfsd_annotator] refreshing OpenPCDet checkout"
  run_gently "${GIT_BIN}" -C "${OPENPCDET_DIR}" fetch --tags origin "${OPENPCDET_REF}" --depth 1 || true
  "${GIT_BIN}" -C "${OPENPCDET_DIR}" checkout "${OPENPCDET_REF}"
else
  CURRENT_OPENPCDET_REF="$(current_openpcdet_ref || true)"
  if [[ "${CURRENT_OPENPCDET_REF}" == "${OPENPCDET_REF}" ]]; then
    echo "[bitfsd_annotator] OpenPCDet checkout already present at ${CURRENT_OPENPCDET_REF}; skipping git sync"
  else
    echo "[bitfsd_annotator] OpenPCDet checkout present at ${CURRENT_OPENPCDET_REF:-unknown}; skipping git sync (use --force-openpcdet to refresh)"
  fi
fi

PACKAGE_LOCK_HASH="$(sha256_file "${ROOT_DIR}/package-lock.json")"
NEED_NPM_INSTALL=0
if [[ "${FORCE_ALL}" -eq 1 || "${FORCE_NPM}" -eq 1 ]]; then
  NEED_NPM_INSTALL=1
elif ! node_modules_ready; then
  NEED_NPM_INSTALL=1
elif [[ -f "${NPM_STATE_FILE}" ]] && ! state_matches "${NPM_STATE_FILE}" "${PACKAGE_LOCK_HASH}"; then
  NEED_NPM_INSTALL=1
fi

if [[ "${NEED_NPM_INSTALL}" -eq 1 ]]; then
  echo "[bitfsd_annotator] installing frontend dependencies"
  run_gently "${NPM_BIN}" ci --prefix "${ROOT_DIR}"
  write_state "${NPM_STATE_FILE}" "${PACKAGE_LOCK_HASH}"
elif ! state_matches "${NPM_STATE_FILE}" "${PACKAGE_LOCK_HASH}"; then
  echo "[bitfsd_annotator] reusing existing node_modules; use --force-npm to reinstall"
  write_state "${NPM_STATE_FILE}" "${PACKAGE_LOCK_HASH}"
else
  echo "[bitfsd_annotator] frontend dependencies already match package-lock.json; skipping npm ci"
fi

OPENPCDET_INSTALL_ID="$("${GIT_BIN}" -C "${OPENPCDET_DIR}" rev-parse HEAD 2>/dev/null || echo "${OPENPCDET_REF}")|${PYTHON_BIN}"
if pcdet_import_uses_repo && state_matches "${OPENPCDET_STATE_FILE}" "${OPENPCDET_INSTALL_ID}"; then
  echo "[bitfsd_annotator] OpenPCDet already installed in managed runtime; skipping editable install"
elif pcdet_import_uses_repo; then
  echo "[bitfsd_annotator] detected existing OpenPCDet editable install; recording current state"
  write_state "${OPENPCDET_STATE_FILE}" "${OPENPCDET_INSTALL_ID}"
else
  echo "[bitfsd_annotator] installing OpenPCDet in managed runtime"
  (
    cd "${OPENPCDET_DIR}"
    if ! legacy_setuptools_ready; then
      if restore_legacy_setuptools_from_cache && legacy_setuptools_ready && python_build_prereqs_ready; then
        echo "[bitfsd_annotator] restored legacy setuptools from local conda cache"
      elif restore_pkg_resources_from_cache && python_build_prereqs_ready; then
        echo "[bitfsd_annotator] restored pkg_resources from local conda cache"
      else
        echo "[bitfsd_annotator] installing legacy Python build prerequisites for OpenPCDet"
        run_gently "${PYTHON_BIN}" -m pip install --disable-pip-version-check "setuptools<80" wheel
      fi
    elif ! python_build_prereqs_ready; then
      if restore_pkg_resources_from_cache && python_build_prereqs_ready; then
        echo "[bitfsd_annotator] restored pkg_resources from local conda cache"
      else
        echo "[bitfsd_annotator] installing Python build prerequisites for OpenPCDet"
        run_gently "${PYTHON_BIN}" -m pip install --disable-pip-version-check "setuptools<80" wheel
      fi
    fi
    export MAX_JOBS="${MAX_JOBS:-1}"
    export CMAKE_BUILD_PARALLEL_LEVEL="${CMAKE_BUILD_PARALLEL_LEVEL:-1}"
    run_gently "${PYTHON_BIN}" setup.py develop --no-deps
  )
  write_state "${OPENPCDET_STATE_FILE}" "${OPENPCDET_INSTALL_ID}"
fi

echo "[bitfsd_annotator] validating runtime"
"${PYTHON_BIN}" "${ROOT_DIR}/scripts/check_runtime.py" --mode full

if [[ "${SKIP_BUILD}" -eq 1 ]]; then
  echo "[bitfsd_annotator] skipping frontend build by request"
elif frontend_build_needed; then
  echo "[bitfsd_annotator] building frontend"
  run_gently "${NPM_BIN}" run build --prefix "${ROOT_DIR}"
else
  echo "[bitfsd_annotator] frontend build artifacts are current; skipping build"
fi

echo "[bitfsd_annotator] setup complete"
