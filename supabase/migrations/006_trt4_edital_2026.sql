-- Migration: Edital TRT4 nº 01/2026 (FCC). Fixa a data das provas objetivas e
-- da redação (31/01/2027, Porto Alegre) no concurso TRT4, criando-o se ainda
-- não existir.
--
-- Rode este script no SQL Editor do Supabase para a contagem regressiva do
-- Dashboard usar a data oficial.

UPDATE concursos SET data_prova = '2027-01-31' WHERE nome = 'TRT4';

INSERT INTO concursos (nome, data_prova)
SELECT 'TRT4', '2027-01-31'
WHERE NOT EXISTS (SELECT 1 FROM concursos WHERE nome = 'TRT4');
