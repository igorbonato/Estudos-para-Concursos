-- Migration: cria a tabela cronograma (metas de estudo agendadas) e ajusta
-- sessoes_estudo pra aceitar sessões geradas a partir de uma meta concluída
-- (sem depender de disciplina_id, já que não há CRUD de disciplinas ainda).
--
-- Rode este script no SQL Editor do Supabase antes de testar o cronograma
-- de estudos integrado.

CREATE TABLE cronograma (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  data_prevista date NOT NULL,
  duracao_minutos integer NOT NULL,
  status boolean NOT NULL DEFAULT false
);

ALTER TABLE cronograma ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_cronograma" ON cronograma
  FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);

ALTER TABLE sessoes_estudo ALTER COLUMN disciplina_id DROP NOT NULL;
ALTER TABLE sessoes_estudo ADD COLUMN IF NOT EXISTS titulo text;
