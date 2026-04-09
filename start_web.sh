#!/bin/bash
# Start bitfsd-annotator in web mode (no Tauri required)
# Usage: ./start_web.sh [--dev]

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "${ROOT_DIR}"

pick_python() {
    local candidates=()
    local py

    if [ -n "${PYTHON_BIN:-}" ]; then
        candidates+=("${PYTHON_BIN}")
    fi
    if [ -x "${ROOT_DIR}/.conda-env/bin/python3" ]; then
        candidates+=("${ROOT_DIR}/.conda-env/bin/python3")
    fi
    if command -v python3.11 >/dev/null 2>&1; then
        candidates+=("python3.11")
    fi
    if command -v python3 >/dev/null 2>&1; then
        candidates+=("python3")
    fi

    for py in "${candidates[@]}"; do
        if "${py}" - <<'PY' >/dev/null 2>&1
import sys
if sys.version_info < (3, 11):
    raise SystemExit(1)
import fastapi  # noqa: F401
import uvicorn  # noqa: F401
import server  # noqa: F401
PY
        then
            printf '%s\n' "${py}"
            return 0
        fi
    done

    return 1
}

if ! PYTHON_BIN="$(pick_python)"; then
    echo "No compatible Python runtime found for web mode." >&2
    echo "Need Python 3.11+ with fastapi and uvicorn installed, and it must be able to import server.py." >&2
    echo "You can override the interpreter with PYTHON_BIN=/path/to/python3 ./start_web.sh --dev" >&2
    exit 1
fi

echo "Using backend Python: ${PYTHON_BIN} ($("${PYTHON_BIN}" --version 2>&1))"

if [ "${1:-}" = "--dev" ]; then
    echo "=== Dev mode: starting Python backend + Vite dev server ==="
    echo "  Backend: http://127.0.0.1:8787"
    echo "  Frontend: http://localhost:1420"
    echo ""
    "${PYTHON_BIN}" -m uvicorn server:app --host 127.0.0.1 --port 8787 --reload &
    BACKEND_PID=$!
    trap "kill $BACKEND_PID 2>/dev/null" EXIT
    sleep 1
    npx vite --port 1420
else
    echo "=== Production mode ==="
    # Build frontend if dist/ doesn't exist or is older than src/
    if [ ! -d "dist" ] || [ "src" -nt "dist" ]; then
        echo "Building frontend..."
        npx vite build
    fi
    echo "  Open http://localhost:8787"
    echo ""
    "${PYTHON_BIN}" -m uvicorn server:app --host 0.0.0.0 --port 8787
fi
