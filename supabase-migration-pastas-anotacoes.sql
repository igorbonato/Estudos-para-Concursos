-- Migration: torna assuntos_pastas.disciplina_id opcional (árvore de Cadernos
-- ainda não está vinculada a disciplinas/concursos) e adiciona created_at em
-- anotacoes (necessário para exibir a data nos cards de anotação).
--
-- Rode este script no SQL Editor do Supabase antes de testar o módulo de
-- Cadernos integrado.

ALTER TABLE assuntos_pastas ALTER COLUMN disciplina_id DROP NOT NULL;

ALTER TABLE anotacoes ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();
