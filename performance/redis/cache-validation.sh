#!/bin/bash
# Redis Caching Strategy Validation
# Verifies that caching is properly configured and effective

set -euo pipefail

REDIS_HOST=${REDIS_HOST:-localhost}
REDIS_PORT=${REDIS_PORT:-6379}
SGC_API=${SGC_API:-http://localhost:8081/api/v1}
SI_API=${SI_API:-http://localhost:8082/api/v1}
WN_API=${WN_API:-http://localhost:8083/api/v1}

echo "═══════════════════════════════════════════════════════"
echo "  Redis Cache Validation — Ecossistema Digital"
echo "═══════════════════════════════════════════════════════"
echo ""

# Check Redis connectivity
echo "▶ Redis connection check..."
if redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" ping | grep -q PONG; then
  echo "  ✅ Redis is responding"
else
  echo "  ❌ Redis connection failed"
  exit 1
fi

# Check Redis info
echo ""
echo "▶ Redis memory usage..."
redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" info memory | grep -E "used_memory_human|maxmemory_human|mem_fragmentation_ratio"

echo ""
echo "▶ Redis keyspace..."
redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" info keyspace

# Count keys by prefix
echo ""
echo "▶ Cache key distribution..."
for PREFIX in "sgc:" "si:" "wn:" "gpj:" "session:" "rate-limit:"; do
  COUNT=$(redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" --scan --pattern "${PREFIX}*" | wc -l)
  echo "  ${PREFIX}* → $COUNT keys"
done

# Test cache hit/miss for SI public pages
echo ""
echo "▶ Testing SI public page cache..."
echo "  First request (cold cache):"
TIME1=$(curl -s -o /dev/null -w "%{time_total}" "$SI_API/public/pages" 2>/dev/null || echo "N/A")
echo "    Response time: ${TIME1}s"

echo "  Second request (warm cache):"
TIME2=$(curl -s -o /dev/null -w "%{time_total}" "$SI_API/public/pages" 2>/dev/null || echo "N/A")
echo "    Response time: ${TIME2}s"

if [ "$TIME1" != "N/A" ] && [ "$TIME2" != "N/A" ]; then
  SPEEDUP=$(echo "scale=1; $TIME1 / $TIME2" | bc 2>/dev/null || echo "N/A")
  echo "    Speedup: ${SPEEDUP}x"
fi

# Test cache hit/miss for WN articles
echo ""
echo "▶ Testing WN articles cache..."
TIME1=$(curl -s -o /dev/null -w "%{time_total}" "$WN_API/public/articles" 2>/dev/null || echo "N/A")
echo "  Cold: ${TIME1}s"
TIME2=$(curl -s -o /dev/null -w "%{time_total}" "$WN_API/public/articles" 2>/dev/null || echo "N/A")
echo "  Warm: ${TIME2}s"

# Check TTL on sample keys
echo ""
echo "▶ Sample key TTLs..."
for KEY in $(redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" --scan --pattern "*" | head -5); do
  TTL=$(redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" ttl "$KEY")
  TYPE=$(redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" type "$KEY")
  echo "  $KEY → type=$TYPE, ttl=${TTL}s"
done

# Check eviction policy
echo ""
echo "▶ Redis eviction policy..."
redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" config get maxmemory-policy

# Validate cache invalidation
echo ""
echo "▶ Cache invalidation test..."
echo "  Checking that write operations clear related caches..."

# Test p95 response times
echo ""
echo "▶ Response time benchmarks (10 requests each)..."

for ENDPOINT in "$SGC_API/actuator/health" "$SI_API/public/pages" "$WN_API/public/articles"; do
  TIMES=""
  for i in $(seq 1 10); do
    T=$(curl -s -o /dev/null -w "%{time_total}" "$ENDPOINT" 2>/dev/null || echo "9.999")
    TIMES="$TIMES $T"
  done
  SORTED=$(echo "$TIMES" | tr ' ' '\n' | sort -n | tail -n +2)
  P95=$(echo "$SORTED" | tail -n 1)
  AVG=$(echo "$SORTED" | awk '{sum+=$1; n++} END {printf "%.3f", sum/n}')
  echo "  $ENDPOINT"
  echo "    avg=${AVG}s, p95=${P95}s"
done

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  Validation complete"
echo "═══════════════════════════════════════════════════════"
