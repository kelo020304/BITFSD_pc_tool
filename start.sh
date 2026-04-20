#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "[bitfsd_annotator] desktop mode has been retired; forwarding to web mode"
exec "${ROOT_DIR}/start_web.sh" "$@"
