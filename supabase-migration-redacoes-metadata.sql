-- Migration: adiciona metadados (tema, banca, cargo) à tabela redacoes,
-- necessários para o módulo de Redação com IA real. concurso_id já existia
-- e é preenchido com o "Concurso Atual" selecionado no Header.
--
-- Rode este script no SQL Editor do Supabase antes de testar o módulo de
-- Redação integrado.

ALTER TABLE redacoes ADD COLUMN IF NOT EXISTS tema text;
ALTER TABLE redacoes ADD COLUMN IF NOT EXISTS banca text;
ALTER TABLE redacoes ADD COLUMN IF NOT EXISTS cargo text;
