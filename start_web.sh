#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_DIR="${ROOT_DIR}/.conda-env"
PYTHON_BIN="${ENV_DIR}/bin/python3"
NPM_BIN="${ENV_DIR}/bin/npm"
NPX_BIN="${ENV_DIR}/bin/npx"
CHECK_SCRIPT="${ROOT_DIR}/scripts/check_runtime.py"
SETUP_SCRIPT="${ROOT_DIR}/scripts/setup_web_runtime.sh"
ORIGINAL_PATH="${PATH}"

usage() {
  cat <<'EOF'
Usage:
  ./start_web.sh
  ./start_web.sh --dev
  ./start_web.sh --check

Managed runtime is expected at ./.conda-env.
Bootstrap it with:
  ./scripts/setup_web_runtime.sh
EOF
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
    echo "Using CUDA toolkit: ${selected_cuda_version} (${CUDA_HOME})"
    return 0
  fi

  export PATH="${ENV_DIR}/bin:${ORIGINAL_PATH}"
  if [[ -x "${ENV_DIR}/bin/nvcc" ]]; then
    export CUDA_HOME="${ENV_DIR}"
    export CUDACXX="${ENV_DIR}/bin/nvcc"
  fi
  echo "Warning: could not find a CUDA toolkit matching torch ${desired_version}; runtime may fail." >&2
}

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  usage
  exit 0
fi

if [[ ! -x "${PYTHON_BIN}" || ! -x "${NPM_BIN}" ]]; then
  echo "Managed runtime missing under ${ENV_DIR}." >&2
  echo "Run ${SETUP_SCRIPT} first." >&2
  exit 1
fi

if [[ ! -d "${ROOT_DIR}/node_modules" ]]; then
  echo "Frontend dependencies are missing under ${ROOT_DIR}/node_modules." >&2
  echo "Run ${SETUP_SCRIPT} first." >&2
  exit 1
fi

cd "${ROOT_DIR}"
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

if [[ "${1:-}" == "--check" ]]; then
  exec "${PYTHON_BIN}" "${CHECK_SCRIPT}" --mode full
fi

"${PYTHON_BIN}" "${CHECK_SCRIPT}" --mode web-start
echo "Using managed Python: ${PYTHON_BIN} ($("${PYTHON_BIN}" --version 2>&1))"

if [[ "${1:-}" == "--dev" ]]; then
  echo "=== Dev mode: starting Python backend + Vite dev server ==="
  echo "  Backend: http://127.0.0.1:8787"
  echo "  Frontend: http://localhost:1420"
  echo ""
  "${PYTHON_BIN}" -m uvicorn server:app --host 127.0.0.1 --port 8787 --reload &
  BACKEND_PID=$!
  trap 'kill ${BACKEND_PID} 2>/dev/null || true' EXIT
  sleep 1
  "${NPX_BIN}" vite --port 1420
  exit 0
fi

echo "=== Production mode ==="
if [[ ! -d "dist" || "src" -nt "dist" || "package-lock.json" -nt "dist" ]]; then
  echo "Building frontend..."
  "${NPM_BIN}" run build
fi
echo "  Open http://localhost:8787"
echo ""
exec "${PYTHON_BIN}" -m uvicorn server:app --host 0.0.0.0 --port 8787
