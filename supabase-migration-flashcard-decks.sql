-- Migration: cria uma tabela dedicada para decks de flashcards (separada de
-- assuntos_pastas, que é o conceito usado pelo módulo de Cadernos) e liga
-- flashcards a ela via deck_id. disciplina_id vira opcional pelo mesmo motivo
-- que já tornamos assuntos_pastas.disciplina_id opcional: não existe CRUD de
-- disciplinas ainda.
--
-- Rode este script no SQL Editor do Supabase antes de testar o módulo Treinar
-- integrado.

CREATE TABLE flashcard_decks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL
);

ALTER TABLE flashcard_decks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_flashcard_decks" ON flashcard_decks
  FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);

ALTER TABLE flashcards ADD COLUMN deck_id uuid REFERENCES flashcard_decks (id) ON DELETE CASCADE;
ALTER TABLE flashcards ALTER COLUMN disciplina_id DROP NOT NULL;
