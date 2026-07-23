-- Migration: adiciona coluna de ordem em assuntos_pastas para permitir
-- reordenar pastas/subpastas (drag and drop) dentro do mesmo pai.
-- O backfill preserva a ordem física atual das linhas (ctid) dentro de
-- cada grupo de irmãos, já que não existe created_at nessa tabela.
--
-- Rode este script no SQL Editor do Supabase antes de testar o rename/reorder
-- de pastas no módulo de Cadernos.

ALTER TABLE assuntos_pastas ADD COLUMN ordem integer NOT NULL DEFAULT 0;

WITH numeradas AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY parent_id ORDER BY ctid) - 1 AS nova_ordem
  FROM assuntos_pastas
)
UPDATE assuntos_pastas
SET ordem = numeradas.nova_ordem
FROM numeradas
WHERE assuntos_pastas.id = numeradas.id;
