#!/bin/bash
# Trivy vulnerability scanner for all Ecossistema components
# Usage: ./trivy-scan.sh [--fix]

set -euo pipefail

REPORT_DIR="$(dirname "$0")/reports"
mkdir -p "$REPORT_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
FIX_MODE=${1:-""}

echo "═══════════════════════════════════════════════════════"
echo "  Trivy Security Scan — Ecossistema Digital"
echo "  Date: $(date)"
echo "═══════════════════════════════════════════════════════"

# ---------- Docker Images ----------
echo ""
echo "▶ Scanning Docker images..."

IMAGES=(
  "ecossistema-sgc-backend:latest"
  "ecossistema-si-backend:latest"
  "ecossistema-wn-backend:latest"
  "ecossistema-gpj-backend:latest"
  "ecossistema-sgc-frontend:latest"
  "ecossistema-si-frontend:latest"
  "ecossistema-wn-frontend:latest"
  "ecossistema-gpj-frontend:latest"
  "ecossistema-mobile:latest"
)

for IMAGE in "${IMAGES[@]}"; do
  echo "  Scanning image: $IMAGE"
  trivy image \
    --severity HIGH,CRITICAL \
    --format table \
    --output "$REPORT_DIR/image_${IMAGE//:/_}_$TIMESTAMP.txt" \
    "$IMAGE" 2>/dev/null || echo "  ⚠ Image $IMAGE not found locally, skipping"
done

# ---------- Filesystem (Java dependencies) ----------
echo ""
echo "▶ Scanning Java dependencies..."

JAVA_REPOS=(
  "ecossistema-sgc-backend"
  "ecossistema-si-backend"
  "ecossistema-wn-backend"
  "ecossistema-gpj-backend"
  "ecossistema-commons"
)

for REPO in "${JAVA_REPOS[@]}"; do
  REPO_PATH="../../$REPO"
  if [ -d "$REPO_PATH" ]; then
    echo "  Scanning $REPO..."
    trivy fs \
      --severity HIGH,CRITICAL \
      --format table \
      --output "$REPORT_DIR/deps_${REPO}_$TIMESTAMP.txt" \
      "$REPO_PATH"
  fi
done

# ---------- Filesystem (Node dependencies) ----------
echo ""
echo "▶ Scanning Node.js dependencies..."

NODE_REPOS=(
  "ecossistema-sgc-frontend"
  "ecossistema-si-frontend"
  "ecossistema-wn-frontend"
  "ecossistema-gpj-frontend"
  "ecossistema-mobile"
)

for REPO in "${NODE_REPOS[@]}"; do
  REPO_PATH="../../$REPO"
  if [ -d "$REPO_PATH" ]; then
    echo "  Scanning $REPO..."
    trivy fs \
      --severity HIGH,CRITICAL \
      --format table \
      --output "$REPORT_DIR/deps_${REPO}_$TIMESTAMP.txt" \
      "$REPO_PATH"
  fi
done

# ---------- IaC (Kubernetes/Docker Compose) ----------
echo ""
echo "▶ Scanning Infrastructure as Code..."

if [ -d "../../ecossistema-infra" ]; then
  trivy config \
    --severity HIGH,CRITICAL \
    --format table \
    --output "$REPORT_DIR/iac_infra_$TIMESTAMP.txt" \
    "../../ecossistema-infra"
fi

# ---------- Summary ----------
echo ""
echo "═══════════════════════════════════════════════════════"
echo "  Scan complete. Reports saved to: $REPORT_DIR/"
echo "═══════════════════════════════════════════════════════"

# Count critical findings
CRITICAL_COUNT=$(grep -r "CRITICAL" "$REPORT_DIR/"*_$TIMESTAMP.txt 2>/dev/null | wc -l || echo "0")
HIGH_COUNT=$(grep -r "HIGH" "$REPORT_DIR/"*_$TIMESTAMP.txt 2>/dev/null | wc -l || echo "0")

echo "  CRITICAL vulnerabilities: $CRITICAL_COUNT"
echo "  HIGH vulnerabilities: $HIGH_COUNT"

if [ "$CRITICAL_COUNT" -gt 0 ]; then
  echo ""
  echo "  ❌ CRITICAL vulnerabilities found! Review reports immediately."
  exit 1
fi

echo "  ✅ No CRITICAL vulnerabilities found."
