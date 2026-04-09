#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_DIR="${ROOT_DIR}/.conda-env"
PKG_DIR="${ROOT_DIR}/.pkgconfig"

if [[ ! -x "${ENV_DIR}/bin/python3" ]]; then
  echo "缺少私有运行环境: ${ENV_DIR}" >&2
  echo "请先执行 conda create -y -p ${ENV_DIR} -c conda-forge python=3.11 webkit2gtk4.1 pkg-config c-compiler cxx-compiler rosbags" >&2
  exit 1
fi

export CONDA_PREFIX="${ENV_DIR}"
export PATH="${ENV_DIR}/bin:${PATH}"
export PKG_CONFIG_PATH="${PKG_DIR}:${ENV_DIR}/lib/pkgconfig:${ENV_DIR}/share/pkgconfig:${PKG_CONFIG_PATH:-}"
export LD_LIBRARY_PATH="${ENV_DIR}/lib:${LD_LIBRARY_PATH:-}"
export LIBRARY_PATH="${ENV_DIR}/lib:${LIBRARY_PATH:-}"
export CPATH="${ENV_DIR}/include:${CPATH:-}"
export CARGO_BUILD_JOBS="${CARGO_BUILD_JOBS:-4}"
export CC="${CC:-/usr/bin/gcc-10}"
export CXX="${CXX:-/usr/bin/g++-10}"
export PYTHON_BIN="${PYTHON_BIN:-${ENV_DIR}/bin/python3}"

export LD_LIBRARY_PATH="/usr/lib/x86_64-linux-gnu:/lib/x86_64-linux-gnu:${ENV_DIR}/lib:${LD_LIBRARY_PATH:-}"

SYSTEM_GL_PRELOAD="/usr/lib/x86_64-linux-gnu/libepoxy.so.0:/usr/lib/x86_64-linux-gnu/libGL.so.1:/usr/lib/x86_64-linux-gnu/libEGL.so.1:/usr/lib/x86_64-linux-gnu/libGLdispatch.so.0:/usr/lib/x86_64-linux-gnu/libGLX.so.0:/usr/lib/x86_64-linux-gnu/libX11.so.6:/usr/lib/x86_64-linux-gnu/libX11-xcb.so.1"

if [[ "${BITFSD_ANNOTATOR_SOFTWARE_RENDERING:-0}" == "1" ]]; then
  export LIBGL_ALWAYS_SOFTWARE=1
  export WEBKIT_DISABLE_COMPOSITING_MODE="${WEBKIT_DISABLE_COMPOSITING_MODE:-1}"
  export WEBKIT_DISABLE_DMABUF_RENDERER="${WEBKIT_DISABLE_DMABUF_RENDERER:-1}"
  export WEBKIT_DMABUF_RENDERER_FORCE_SHM="${WEBKIT_DMABUF_RENDERER_FORCE_SHM:-1}"
  unset WEBKIT_FORCE_COMPOSITING_MODE
  echo "[bitfsd_annotator] software rendering mode enabled (compositing disabled, dmabuf disabled, shm forced)"
else
  unset LIBGL_ALWAYS_SOFTWARE
  export WEBKIT_DISABLE_COMPOSITING_MODE="${WEBKIT_DISABLE_COMPOSITING_MODE:-0}"
  export WEBKIT_FORCE_COMPOSITING_MODE="${WEBKIT_FORCE_COMPOSITING_MODE:-1}"
  export WEBKIT_DISABLE_DMABUF_RENDERER="${WEBKIT_DISABLE_DMABUF_RENDERER:-1}"
  export WEBKIT_DMABUF_RENDERER_FORCE_SHM="${WEBKIT_DMABUF_RENDERER_FORCE_SHM:-1}"
  export LD_PRELOAD="${SYSTEM_GL_PRELOAD}${LD_PRELOAD:+:${LD_PRELOAD}}"
  echo "[bitfsd_annotator] hardware GL enabled (system GL preloaded, compositing forced on, dmabuf disabled, shm forced)"
fi

unset HTTP_PROXY HTTPS_PROXY ALL_PROXY http_proxy https_proxy all_proxy

cleanup_port() {
  local port="$1"
  local pids
  pids="$(lsof -tiTCP:${port} -sTCP:LISTEN 2>/dev/null || true)"
  if [[ -n "${pids}" ]]; then
    echo "[bitfsd_annotator] freeing port ${port}: ${pids}"
    kill ${pids} 2>/dev/null || true
    sleep 0.5
  fi
}

cleanup_port 1420
cleanup_port 1421

cd "${ROOT_DIR}"
exec npm run tauri dev
