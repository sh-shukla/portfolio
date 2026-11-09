#!/usr/bin/env bash
# Renders the resume to the PDF the site serves. Requires uv (brew install uv).
set -euo pipefail
cd "$(dirname "$0")"
# WeasyPrint needs Pango/GObject (brew install pango); point dyld at Homebrew's libs.
export DYLD_FALLBACK_LIBRARY_PATH="/opt/homebrew/lib:${DYLD_FALLBACK_LIBRARY_PATH:-}"
uv run --with weasyprint python -m weasyprint index.html ../public/Shashank_Shukla_DevOps_Resume.pdf
echo "Rendered ../public/Shashank_Shukla_DevOps_Resume.pdf"
