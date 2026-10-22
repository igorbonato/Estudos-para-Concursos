# ConcursoApp - Documentação de Contexto (AI Prompt)

## 🎯 Objetivo do Projeto

Plataforma web pessoal de gestão de estudos focada em alta produtividade e preparação para concursos públicos da área de TI (TRT4, SEFAZ, etc.). O sistema não terá múltiplos usuários dinâmicos (uso estritamente pessoal).

## 📄 Edital de Referência (TRT4 2026)

* **Edital TRT4 nº 01/2026 (FCC)** substitui o de 2022. Fonte completa: `TRT4_2026_TI_atualizacao_projeto.md`; resumo e mapeamento em `guia/GUIA_ESTUDO_MAPA_EDITAL_2026.md`.
* O candidato faz **dois cargos** no mesmo dia (31/01/2027): Técnico TI (22, manhã) e Analista TI (14, tarde).
* Todo material de estudo usa a legenda **[A+T]** (cai nos dois), **[A]** (só Analista) e **[T]** (só Técnico).
* Dados do app: edital verticalizado em `src/data/editalTRT4.ts`, plano de 14 semanas (15h/semana) em `src/data/planoEstudos.ts`, blocos de estudo e cores em `src/data/blocosEstudo.ts`. A redação usa a grade FCC (0–10, mínimo 6,00) em `src/lib/gemini.ts`.

## 🛠️ Stack Tecnológico

* **Front-end:** React (Vite) com TypeScript.
* **Estilização:** Tailwind CSS (Foco em Dark Mode, cores exatas baseadas no Figma).
* **Back-end / Banco de Dados:** Supabase (PostgreSQL).
* **Integração de IA:** Google Gemini API (para correção de redações).
* **Deploy:** Vercel.

## 📐 Regras de Arquitetura e UI (Para a IA)

* **Modularidade:** Sempre gere componentes React pequenos, isolados e reutilizáveis (ex: `<StatCard />`, `<StudyTimer />`, `<AlertPanel />`). Não crie arquivos monolíticos.
* **Estilo Visual:** O design utiliza um tema escuro (Dark Mode) inspirado nas cores do React (fundos em azul escuro profundo, detalhes e glows em ciano vibrante). Siga estritamente as imagens de referência.
* **Gerenciamento de Estado:** O estado global mais importante é o "Concurso Atual" (selecionado no Header). A mudança desse estado deve refletir na filtragem de todos os dados da aplicação.
* **Navegação (Sidebar):** O menu lateral deve conter seções distintas e separadas para: Dashboard, Cadernos (Anotações), Flashcards e Redação.

## 📌 Funcionalidades Principais (Core)

1. **Dashboard Central:** Exibição de horas estudadas na semana, flashcards revisados e média de redações.
2. **Sistema de Alertas de Revisão:** Painel que verifica a `ultima_revisao` de cada disciplina. Se passar de X dias (ex: 15 dias), exibe um alerta vermelho para revisão imediata, com opção de ligar/desligar notificações.
3. **Módulo de Anotações (Árvore Hierárquica):** Interface similar à um explorador de arquivos (ex: VS Code). Deve permitir a criação de uma hierarquia infinita: Disciplina > Assunto > Subassunto (ex: Português > Morfologia > Crase). Ao clicar no último nível, abre-se o editor Rich Text para os resumos e "macetes".
4. **Módulo de Flashcards (Menu Separado):** Área dedicada no menu principal para revisão e criação de flashcards (Estilo Quizlet), com botões de dificuldade (Fácil, Médio, Difícil) para cálculo de repetição espaçada.
5. **Módulo de Redação com IA (Menu Separado):** Área dedicada no menu principal com um campo de texto (textarea). Envia o conteúdo para a API do Gemini simular a correção de uma banca examinadora, retornando nota e feedback estruturado.

## 🗄️ Estrutura de Banco de Dados (Draft Supabase)

**Tabelas Principais (Relacionais):**

* `concursos`
  * id (UUID, PK)
  * nome (String - ex: "TRT4")
  * data_prova (Date)

* `disciplinas`
  * id (UUID, PK)
  * concurso_id (UUID, FK)
  * nome (String)
  * ultima_revisao (Timestamp)

* `assuntos_pastas` (Nova tabela para criar a hierarquia de anotações)
  * id (UUID, PK)
  * disciplina_id (UUID, FK)
  * parent_id (UUID, FK - Auto-relacionamento para subpastas. Null = pasta raiz)
  * nome (String - ex: "Morfologia" ou "Crase")

* `anotacoes`
  * id (UUID, PK)
  * pasta_id (UUID, FK - Referência à tabela assuntos_pastas)
  * titulo (String)
  * conteudo (HTML/JSON do Rich Text)

* `sessoes_estudo`
  * id (UUID, PK)
  * disciplina_id (UUID, FK)
  * tempo_gasto_minutos (Int)
  * data (Timestamp)

* `flashcards`
  * id (UUID, PK)
  * disciplina_id (UUID, FK)
  * pergunta (Text)
  * resposta (Text)
  * proxima_revisao (Timestamp)
  * facilidade_fator (Float - para repetição espaçada)

* `redacoes`
  * id (UUID, PK)
  * concurso_id (UUID, FK)
  * texto_original (Text)
  * nota_ia (Float)
  * feedback_estruturado_ia (JSON)
