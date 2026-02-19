#!/bin/bash
# ============================================================
# Ecossistema — OpenAPI Client Generation Script
# Fetches specs from running backends and generates TS clients
# ============================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SPECS_DIR="${SCRIPT_DIR}/specs"
CONFIGS_DIR="${SCRIPT_DIR}/configs"
GENERATED_DIR="${SCRIPT_DIR}/generated"

# Backend ports
declare -A SERVICES=(
  [sgc]=8081
  [si]=8082
  [wn]=8083
  [gpj]=8084
)

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[OK]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
err()  { echo -e "${RED}[ERROR]${NC} $1"; }

# ---- Step 1: Download specs ----
echo "=== Step 1: Downloading OpenAPI specs ==="
mkdir -p "${SPECS_DIR}"

for svc in "${!SERVICES[@]}"; do
  port="${SERVICES[$svc]}"
  url="http://localhost:${port}/v3/api-docs"
  output="${SPECS_DIR}/${svc}-openapi.json"

  echo -n "  Fetching ${svc} (port ${port})... "
  if curl -sf --max-time 10 "${url}" -o "${output}" 2>/dev/null; then
    log "saved to ${output}"
  else
    warn "Service ${svc} not reachable at ${url} — skipping"
  fi
done

# ---- Step 2: Generate TypeScript clients ----
echo ""
echo "=== Step 2: Generating TypeScript-Angular clients ==="

# Check for openapi-generator-cli
if command -v openapi-generator-cli &>/dev/null; then
  GENERATOR="openapi-generator-cli"
elif command -v npx &>/dev/null; then
  GENERATOR="npx @openapitools/openapi-generator-cli"
else
  err "openapi-generator-cli not found. Install: npm install -g @openapitools/openapi-generator-cli"
  exit 1
fi

for svc in "${!SERVICES[@]}"; do
  spec="${SPECS_DIR}/${svc}-openapi.json"
  config="${CONFIGS_DIR}/${svc}.json"

  if [ ! -f "${spec}" ]; then
    warn "No spec for ${svc} — skipping generation"
    continue
  fi

  echo -n "  Generating @ecossistema/${svc}-client... "
  ${GENERATOR} generate -c "${config}" --skip-validate-spec 2>/dev/null
  log "done"
done

# ---- Step 3: Post-process ----
echo ""
echo "=== Step 3: Post-processing ==="

for svc in "${!SERVICES[@]}"; do
  client_dir="${GENERATED_DIR}/${svc}-client"
  if [ -d "${client_dir}" ]; then
    # Ensure package.json exists
    if [ ! -f "${client_dir}/package.json" ]; then
      cat > "${client_dir}/package.json" <<EOF
{
  "name": "@ecossistema/${svc}-client",
  "version": "1.0.0",
  "description": "Generated TypeScript-Angular client for ${svc^^} backend API",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "peerDependencies": {
    "@angular/core": "^18.0.0",
    "@angular/common": "^18.0.0",
    "rxjs": "^7.0.0"
  },
  "keywords": ["ecossistema", "angular", "openapi", "${svc}"],
  "license": "UNLICENSED"
}
EOF
    fi
    log "${svc}-client ready"
  fi
done

echo ""
echo "=== Generation complete ==="
echo "Generated clients in: ${GENERATED_DIR}"
echo ""
echo "Usage in Angular frontends:"
echo "  1. Add path alias to tsconfig.json:"
echo "     \"@ecossistema/${svc}-client\": [\"path/to/generated/${svc}-client/src\"]"
echo "  2. Import generated services in your components/services"
