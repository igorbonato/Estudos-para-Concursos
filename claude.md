# ConcursoApp - Documentação de Contexto (AI Prompt)

## 🎯 Objetivo do Projeto
Plataforma web pessoal de gestão de estudos focada em alta produtividade e preparação para concursos públicos da área de TI (TRT4, SEFAZ, etc.). O sistema não terá múltiplos usuários dinâmicos (uso estritamente pessoal).

## 🛠️ Stack Tecnológico
* **Front-end:** React (Vite) com TypeScript.
* **Estilização:** Tailwind CSS (Foco em Dark Mode, cores exatas baseadas no Figma).
* **Back-end / Banco de Dados:** Supabase (PostgreSQL).
* **Integração de IA:** Google Gemini API (para correção de redações).
* **Deploy:** Vercel.

## 📐 Regras de Arquitetura e UI (Para a IA)
* **Modularidade:** Sempre gere componentes React pequenos, isolados e reutilizáveis (ex: `<StatCard />`, `<StudyTimer />`, `<AlertPanel />`). Não crie arquivos monolíticos.
* **Estilo Visual:** O design utiliza um tema escuro (Dark Mode) inspirado nas cores do React (fundos em azul escuro profundo, detalhes e glows em ciano vibrante). Siga estritamente as imagens de referência do Figma fornecidas na pasta `/design`.
* **Gerenciamento de Estado:** O estado global mais importante é o "Concurso Atual" (selecionado no Header). A mudança desse estado deve refletir na filtragem de todos os dados do Dashboard.

## 📌 Funcionalidades Principais (Core)
1. **Dashboard Central:** Exibição de horas estudadas na semana, flashcards revisados e média de redações.
2. **Sistema de Alertas de Revisão:** Painel que verifica a `ultima_revisao` de cada disciplina. Se passar de X dias (ex: 15 dias), exibe um alerta vermelho para revisão imediata, com opção de ligar/desligar notificações.
3. **Visão da Disciplina (Tabs):**
   * **Anotações:** Editor Rich Text para resumos e "macetes" de questões.
   * **Flashcards (Estilo Quizlet):** Cartões frente/verso com botões de dificuldade (Fácil, Médio, Difícil) para cálculo de repetição espaçada.
   * **Redação (IA):** Área de texto (textarea) que envia o conteúdo para a API do Gemini simular a correção de uma banca examinadora, retornando nota e feedback estruturado.

## 🗄️ Estrutura de Banco de Dados (Draft Supabase)

**Tabelas Principais (Relacionais):**

* `concursos`
  - id (UUID, PK)
  - nome (String - ex: "TRT4")
  - data_prova (Date)

* `disciplinas`
  - id (UUID, PK)
  - concurso_id (UUID, FK)
  - nome (String)
  - ultima_revisao (Timestamp)

* `sessoes_estudo`
  - id (UUID, PK)
  - disciplina_id (UUID, FK)
  - tempo_gasto_minutos (Int)
  - data (Timestamp)

* `flashcards`
  - id (UUID, PK)
  - disciplina_id (UUID, FK)
  - pergunta (Text)
  - resposta (Text)
  - proxima_revisao (Timestamp)
  - facilidade_fator (Float - para repetição espaçada)

* `anotacoes`
  - id (UUID, PK)
  - disciplina_id (UUID, FK)
  - conteudo (HTML/JSON do Rich Text)

* `redacoes`
  - id (UUID, PK)
  - concurso_id (UUID, FK)
  - texto_original (Text)
  - nota_ia (Float)
  - feedback_estruturado_ia (JSON)
