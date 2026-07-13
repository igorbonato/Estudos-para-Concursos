-- ConcursoApp — schema inicial do Supabase (PostgreSQL)
-- Uso estritamente pessoal (sem multiusuário): RLS ativado em todas as tabelas
-- com policies permissivas liberando acesso total para os papéis anon/authenticated.

-- =========================================================
-- concursos
-- =========================================================
CREATE TABLE concursos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  data_prova date
);

ALTER TABLE concursos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_concursos" ON concursos
  FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);

-- =========================================================
-- disciplinas
-- =========================================================
CREATE TABLE disciplinas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  concurso_id uuid NOT NULL REFERENCES concursos (id) ON DELETE CASCADE,
  nome text NOT NULL,
  ultima_revisao timestamptz
);

ALTER TABLE disciplinas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_disciplinas" ON disciplinas
  FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);

-- =========================================================
-- assuntos_pastas (hierarquia infinita de anotações: Disciplina > Assunto > Subassunto)
-- =========================================================
CREATE TABLE assuntos_pastas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  disciplina_id uuid REFERENCES disciplinas (id) ON DELETE CASCADE,
  parent_id uuid REFERENCES assuntos_pastas (id) ON DELETE CASCADE,
  nome text NOT NULL
);

ALTER TABLE assuntos_pastas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_assuntos_pastas" ON assuntos_pastas
  FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);

-- =========================================================
-- anotacoes
-- =========================================================
CREATE TABLE anotacoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pasta_id uuid NOT NULL REFERENCES assuntos_pastas (id) ON DELETE CASCADE,
  titulo text NOT NULL,
  conteudo text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE anotacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_anotacoes" ON anotacoes
  FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);

-- =========================================================
-- sessoes_estudo
-- =========================================================
CREATE TABLE sessoes_estudo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  disciplina_id uuid NOT NULL REFERENCES disciplinas (id) ON DELETE CASCADE,
  tempo_gasto_minutos integer NOT NULL,
  data timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE sessoes_estudo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_sessoes_estudo" ON sessoes_estudo
  FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);

-- =========================================================
-- flashcards
-- =========================================================
CREATE TABLE flashcards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  disciplina_id uuid NOT NULL REFERENCES disciplinas (id) ON DELETE CASCADE,
  pergunta text NOT NULL,
  resposta text NOT NULL,
  proxima_revisao timestamptz,
  facilidade_fator real DEFAULT 2.5
);

ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_flashcards" ON flashcards
  FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);

-- =========================================================
-- redacoes
-- =========================================================
CREATE TABLE redacoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  concurso_id uuid NOT NULL REFERENCES concursos (id) ON DELETE CASCADE,
  texto_original text NOT NULL,
  nota_ia real,
  feedback_estruturado_ia jsonb
);

ALTER TABLE redacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_redacoes" ON redacoes
  FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);
