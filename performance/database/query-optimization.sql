-- ═══════════════════════════════════════════════════════════════
-- Query Optimization Script — Ecossistema Digital
-- Run against each system's database to identify and fix slow queries
-- ═══════════════════════════════════════════════════════════════

-- ═══════ 1. Identify Slow Queries ═══════
-- Enable pg_stat_statements extension
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Top 20 slowest queries by total execution time
SELECT
    round(total_exec_time::numeric, 2) AS total_ms,
    calls,
    round(mean_exec_time::numeric, 2) AS mean_ms,
    round((100 * total_exec_time / sum(total_exec_time) OVER ())::numeric, 2) AS pct,
    left(query, 120) AS query_preview
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;

-- Queries with high mean execution time (> 100ms)
SELECT
    round(mean_exec_time::numeric, 2) AS mean_ms,
    calls,
    left(query, 150) AS query_preview
FROM pg_stat_statements
WHERE mean_exec_time > 100
ORDER BY mean_exec_time DESC;


-- ═══════ 2. Missing Index Detection ═══════
-- Tables with sequential scans (potential missing indexes)
SELECT
    schemaname,
    relname AS table_name,
    seq_scan,
    seq_tup_read,
    idx_scan,
    idx_tup_fetch,
    n_live_tup AS row_count,
    round(100.0 * seq_scan / NULLIF(seq_scan + idx_scan, 0), 1) AS seq_pct
FROM pg_stat_user_tables
WHERE seq_scan > 100
  AND n_live_tup > 1000
ORDER BY seq_tup_read DESC
LIMIT 20;


-- ═══════ 3. Recommended Indexes (SGC) ═══════

-- Cidadão search by name (frequently used in list screens)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cidadao_nome
    ON cidadao (lower(nome));

-- Cidadão search by passport number
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cidadao_passaporte
    ON cidadao (numero_passaporte);

-- Cidadão search by NIF
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cidadao_nif
    ON cidadao (nif) WHERE nif IS NOT NULL;

-- Processo by cidadao + estado (most common filter combo)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_processo_cidadao_estado
    ON processo (cidadao_id, estado);

-- Visto by cidadao + estado
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_visto_cidadao_estado
    ON visto (cidadao_id, estado);

-- Visto by tipo + estado (admin filtering)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_visto_tipo_estado
    ON visto (tipo, estado);

-- Agendamento by data_hora (calendar queries)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_agendamento_datahora
    ON agendamento (data_hora);

-- Agendamento by cidadao + estado
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_agendamento_cidadao_estado
    ON agendamento (cidadao_id, estado);

-- Agendamento conflict check (type + datetime + active states)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_agendamento_conflict
    ON agendamento (data_hora, tipo, estado)
    WHERE estado IN ('PENDENTE', 'CONFIRMADO');

-- Documento by processo
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_documento_processo
    ON documento (processo_id);

-- Notificacao by cidadao + read status
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_notificacao_cidadao_lida
    ON notificacao (cidadao_id, lida);


-- ═══════ 4. Recommended Indexes (WN) ═══════

-- Article by slug (unique lookups)
CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS idx_article_slug
    ON article (slug);

-- Article by status + published date (public listing)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_article_status_published
    ON article (status, published_at DESC)
    WHERE status = 'PUBLISHED';

-- Article by category
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_article_category
    ON article_category (category_id);

-- Article full-text search
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_article_fts
    ON article USING gin (to_tsvector('portuguese', coalesce(titulo,'') || ' ' || coalesce(resumo,'')));


-- ═══════ 5. Recommended Indexes (SI) ═══════

-- Page by slug
CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS idx_page_slug
    ON page (slug);

-- Event by date (calendar queries)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_event_date
    ON event (start_date DESC);

-- Event by status
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_event_status
    ON event (status);


-- ═══════ 6. Recommended Indexes (GPJ) ═══════

-- Task by sprint + status (board view)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_task_sprint_status
    ON task (sprint_id, status);

-- Task by assignee
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_task_assignee
    ON task (assignee_id);

-- TimeLog by task + date
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_timelog_task_date
    ON time_log (task_id, logged_date);


-- ═══════ 7. Table Statistics ═══════
-- Ensure statistics are up to date
ANALYZE;

-- Check bloat on large tables
SELECT
    schemaname,
    relname AS table_name,
    n_live_tup,
    n_dead_tup,
    round(100.0 * n_dead_tup / NULLIF(n_live_tup + n_dead_tup, 0), 1) AS dead_pct,
    last_vacuum,
    last_autovacuum
FROM pg_stat_user_tables
WHERE n_live_tup > 100
ORDER BY n_dead_tup DESC
LIMIT 20;
