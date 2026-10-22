# 📘 Guia de Estudo Direcionado e Prescritivo — IA, Engenharia de Software e Testes: Atualizações 2026 (TRT 4ª Região)

> **Guia novo do Edital TRT4 nº 01/2026.** Cobre as lacunas das seções **6.1 (Processo e engenharia de software)**, **6.2 (Qualidade e testes) [T]** e **6.7 (Inteligência Artificial) [A]**: engenharia de requisitos, UML 2.5.1, ágeis, metodologias tradicionais, low-code/no-code, assistentes de IA, JUnit 6, Mockito, cobertura, aprendizado de máquina, redes neurais e LLMs. Não vem do banco de questões. Para o seu perfil (AI-900, pós em Ciência de Dados e IA, UML, Scrum/Kanban e TDD na prática), quase tudo aqui é **só questões**. Use o guia para revisar a **terminologia** que a FCC usa.

**Legenda:** **[A+T]** cai nos dois · **[A]** só Analista · **[T]** só Técnico.

---

## 🧩 Engenharia de Software

### 🎯 Assunto: Engenharia de Requisitos [A+T]
**O que estudar obrigatoriamente:** **requisitos funcionais** (o que o sistema faz) × **não funcionais** (como faz, ou restrições de qualidade: desempenho, segurança, usabilidade, disponibilidade; a ISO/IEC **25010** traz o modelo de qualidade). Há também requisitos de **domínio** e de **negócio**, e requisitos de **usuário** (alto nível) × de **sistema** (detalhados). **Processo** (Sommerville): **elicitação/descoberta** → **análise** (negociação e priorização) → **especificação** (documento ou backlog) → **validação** → **gerenciamento** (mudanças e **rastreabilidade**, com a matriz de rastreabilidade). **Técnicas de elicitação**: entrevistas (abertas ou fechadas), questionários, **workshops/JAD**, *brainstorming*, **prototipação**, **observação/etnografia**, análise de documentos, cenários e casos de uso. **Validação**: revisões, protótipos e geração de casos de teste. Verifica-se validade, consistência, completude, realismo e verificabilidade. **Histórias de usuário**: "Como <papel>, quero <ação> para <benefício>", com os critérios **INVEST** (Independente, Negociável, Valiosa, Estimável, Small/pequena, Testável) e **critérios de aceitação** (no BDD, em Gherkin: *Dado / Quando / Então*). Priorização **MoSCoW**: *Must, Should, Could, Won't*.
**Por que estudar isso:** é [A+T] e não tinha bloco próprio nos guias anteriores.
**Alerta de Pegadinha:** classificar "o sistema deve responder em 2 s" como funcional; confundir **validação** de requisitos (são os requisitos certos?) com **verificação**; achar que a etnografia é uma entrevista.
**Ação Prática:** escreva 3 histórias INVEST com critérios Gherkin para o "protocolo de petição".

---

### 🎯 Assunto: UML 2.5.1 [A+T]
**O que estudar obrigatoriamente:** são **14 diagramas**. Os **7 estruturais** são **classes**, **objetos**, **componentes**, **implantação**, **pacotes**, **estrutura composta** e **perfil**. Os **7 comportamentais** são **casos de uso**, **atividades** e **máquina de estados**, mais os **4 de interação**: **sequência**, **comunicação**, **visão geral de interação** e **tempo** (*timing*). **Relacionamentos de classe**: associação (com multiplicidade e navegabilidade); **agregação** (losango **vazado**, a parte existe sem o todo); **composição** (losango **cheio**, a parte morre com o todo e só pode estar em **um** todo); **generalização** (seta vazada fechada); **realização** (tracejada com seta vazada, para interfaces); **dependência** (tracejada com seta aberta). Visibilidade: `+` público, `-` privado, `#` protegido, `~` pacote. **Casos de uso**: **«include»** é **obrigatório**, com a seta do base para o incluído; **«extend»** é **opcional/condicional**, com a seta da extensão para o base (*extension points*). Também existe generalização entre atores e entre casos de uso. **Sequência**: linhas de vida, mensagens síncronas (seta cheia) e assíncronas (seta aberta), retorno (tracejada) e **fragmentos combinados** (`alt` = alternativa, `opt` = opcional, `loop`, `par` = paralelo, `ref`).
**Por que estudar isso:** é [A+T] e é tema clássico da FCC, que já cobrava a 2.5.
**Alerta de Pegadinha:** inverter a direção das setas do include e do extend; confundir agregação com composição; contar 13 diagramas (a UML 2.0 tinha 13; o diagrama de perfil entrou na 2.2).
**Ação Prática:** decore "7 estruturais + 7 comportamentais (4 de interação)" e desenhe um exemplo de `alt` num diagrama de sequência.

---

### 🎯 Assunto: Métodos Ágeis: Scrum (Guia 2020), Kanban e XP [A+T]
**O que estudar obrigatoriamente:** **Scrum Guide 2020**. São **3 responsabilidades** (*accountabilities*, não mais "papéis"): **Product Owner**, **Scrum Master** e **Developers** (o termo "time de desenvolvimento" deixou de existir; o **Scrum Team** inteiro é auto**gerenciável**). São **5 eventos**: a **Sprint** (até 1 mês, é o contêiner dos outros), a **Sprint Planning** (até 8 h numa sprint de 1 mês, respondendo *por quê*, *o quê* e *como*), a **Daily Scrum** (15 min, para os Developers), a **Sprint Review** (até 4 h) e a **Sprint Retrospective** (até 3 h). São **3 artefatos** com seus **compromissos**: **Product Backlog → Meta do Produto**, **Sprint Backlog → Meta da Sprint** e **Incremento → Definição de Pronto**. **Kanban**: visualizar o fluxo, **limitar o WIP**, gerenciar o fluxo, políticas explícitas, sistema **puxado** (*pull*), métricas de ***lead time*** (do pedido à entrega) × ***cycle time*** (do início do trabalho à entrega), *throughput* e **CFD** (diagrama de fluxo cumulativo). Não prescreve iterações nem papéis. **XP**: **valores** (comunicação, simplicidade, *feedback*, coragem, respeito) e **práticas** (programação em **pares**, **TDD**, **integração contínua**, **refatoração**, *releases* pequenas, propriedade coletiva do código, ritmo sustentável/40 horas, *planning game*, design simples, padrões de codificação, metáfora, cliente presente).
**Por que estudar isso:** é [A+T] e tem cobrança alta, com versões antigas do Scrum Guide como pegadinha.
**Alerta de Pegadinha:** usar termos de versões antigas do Scrum Guide ("auto-organizável", "time de desenvolvimento", três perguntas obrigatórias na Daily); dizer que o Kanban exige sprints; confundir lead time com cycle time.
**Ação Prática:** decore "3-5-3" e os *timeboxes*: 1 mês, 8 h, 15 min, 4 h, 3 h.

---

### 🎯 Assunto: Metodologias Tradicionais, Ciclo de Vida e Padrões de Projeto [T]
**O que estudar obrigatoriamente:** **cascata** (fases sequenciais: requisitos, projeto, implementação, testes, implantação; adequada a requisitos estáveis); **modelo em V** (cada fase de desenvolvimento tem um nível de teste correspondente); **incremental** (entregas parciais); **prototipação** (descartável ou evolutiva); **espiral** (Boehm, **orientado a riscos**, com 4 quadrantes por ciclo: objetivos, análise de riscos, desenvolvimento e planejamento); **RUP** (4 **fases**: concepção, elaboração, construção e transição, mais disciplinas iterativas; é guiado por casos de uso e centrado na arquitetura). **Orientação a objetos**: classes, interfaces, herança, encapsulamento, pacotes, **sobrecarga** (mesmo nome, parâmetros diferentes, resolvida em **compilação**) × **sobrescrita** (mesma assinatura na subclasse, resolvida em **execução**, por polimorfismo dinâmico). **Padrões de projeto** (GoF): veja o guia **Arquitetura de Software**, bloco de Padrões GoF.
**Por que estudar isso:** são itens exclusivos do Técnico.
**Alerta de Pegadinha:** dizer que a espiral é orientada a documentos (ela é orientada a **riscos**); trocar as fases do RUP (*concepção → elaboração → construção → transição*).
**Ação Prática:** escreva uma linha de "quando usar" para cascata, V, incremental, espiral e RUP.

---

### 🎯 Assunto: Low-code/No-code e Assistentes de IA no Desenvolvimento [A+T]
**O que estudar obrigatoriamente:** **low-code**: plataformas visuais (arrastar e soltar, modelos, conectores) que **reduzem** a codificação e ainda permitem código para extensões (OutSystems, Mendix, Power Apps). O público é o desenvolvedor profissional e o desenvolvedor cidadão. **No-code**: zero código, voltado ao **desenvolvedor cidadão** (*citizen developer*) do negócio. Vantagens: velocidade, prototipação e redução do *backlog* de TI. Riscos: ***vendor lock-in***, escalabilidade e desempenho, **shadow IT** (aplicações fora da governança de TI), segurança e LGPD, manutenção e integração. Por isso exigem **governança** (centro de excelência, ambientes separados, políticas de dados). **Assistentes de IA** (GitHub Copilot, assistentes em IDE e *chat*): geração e completação de código, explicação, testes, refatoração, documentação e revisão. Boas práticas: **revisão humana obrigatória** (o código gerado é responsabilidade de quem o integra), testes automatizados, SAST/SCA no pipeline, **não enviar código ou dados sigilosos** a serviços sem contrato adequado, verificar **licenças** do código sugerido e desconfiar de **alucinações** (APIs e pacotes inexistentes, o chamado *slopsquatting*, ligado ao A03:2025 da cadeia de suprimentos). No Judiciário, o uso de IA é regulado pelo CNJ (contexto: resolução sobre IA no Poder Judiciário; não está na lista do edital).
**Por que estudar isso:** são itens novos e [A+T]. A FCC tende a cobrar **vantagens × riscos** e **boas práticas**.
**Alerta de Pegadinha:** dizer que low-code elimina a necessidade de governança de TI; dizer que o código gerado por IA dispensa revisão ou testes.
**Ação Prática:** escreva uma lista de 5 vantagens e 5 riscos para cada um (low-code e assistentes de IA).

---

## 🧩 Qualidade e Testes [T]

### 🎯 Assunto: Tipos de Teste, Cobertura de Código e Manutenção/Depuração [T]
**O que estudar obrigatoriamente:** **níveis**: **unitário** (unidade isolada, com dependências substituídas por *mocks*), **integração** (interação entre componentes, banco e APIs), **sistema/funcional** (requisitos funcionais, caixa-preta) e **aceitação** (usuário). Na **pirâmide de testes**, há muitos unitários, menos de integração e poucos E2E/UI. **Técnicas**: **caixa-branca** (estrutura interna, cobertura) × **caixa-preta** (partição de equivalência, valor-limite, tabela de decisão) e **regressão**. Dublês de teste: *dummy*, *stub* (resposta fixa), *fake*, ***mock*** (verifica interações) e *spy*. **Cobertura de código**: de **instruções/linhas**, de **decisão/ramos** (cada `if` verdadeiro e falso), de **condição**, **MC/DC** e de **caminhos**. A hierarquia é: 100% de ramos ⇒ 100% de instruções, mas **não o contrário**. Ferramenta Java: **JaCoCo**. Cobertura alta **não garante** ausência de defeitos (ela mede o que foi **executado**, não o que foi **verificado**). **TDD**: *red → green → refactor*. **Manutenção**: **corretiva**, **adaptativa** (mudança de ambiente), **perfectiva/evolutiva** (melhoria) e **preventiva**. **Depuração**: reproduzir → isolar (*breakpoints*, *watch*, *step into/over/out*, logs) → corrigir → teste de regressão.
**Por que estudar isso:** item 6.2 do Técnico, que tem o bloco inteiro de qualidade.
**Alerta de Pegadinha:** dizer que 100% de cobertura de instruções garante 100% de ramos (é o inverso); confundir *stub* com *mock*; classificar adaptação a um novo SO como manutenção perfectiva (é **adaptativa**).
**Ação Prática:** para um método com dois `if` independentes, conte os casos de teste mínimos para 100% de instruções, de ramos e de caminhos.

---

### 🎯 Assunto: JUnit 6 (Jupiter) e Migração a partir do JUnit 5 [T] ⚠️ conferir
**O que estudar obrigatoriamente:** a **arquitetura** (desde o 5) tem três partes: **JUnit Platform** (lança testes na JVM e é a base das IDEs e do Maven Surefire), **JUnit Jupiter** (o modelo de programação e extensão atual) e **JUnit Vintage** (roda testes do JUnit 3 e 4). **Anotações**: `@Test`, `@BeforeEach`/`@AfterEach`, `@BeforeAll`/`@AfterAll` (métodos **static**, salvo com `@TestInstance(Lifecycle.PER_CLASS)`), `@DisplayName`, `@Disabled`, `@Nested`, `@Tag`, `@RepeatedTest`, `@Timeout` e `@ParameterizedTest` com `@ValueSource`, `@CsvSource`, `@CsvFileSource`, `@MethodSource` e `@EnumSource`, além de `@ExtendWith` (extensões). **Asserções**: `assertEquals(esperado, atual)`, `assertThrows`, `assertAll` (agrupa e relata todas as falhas), `assertTimeout`, e premissas `assumeTrue`. **JUnit 4 → 5**: `@Before` → `@BeforeEach`, `@BeforeClass` → `@BeforeAll`, `@Ignore` → `@Disabled`, `@RunWith` → `@ExtendWith`, `@Category` → `@Tag`, `@Rule` → extensões. **JUnit 6** (lançado no **fim de 2025**): baseline **Java 17**; **versão unificada** (Platform, Jupiter e Vintage passam todos a 6.x); anotações de nulidade **JSpecify**; suporte a funções `suspend` do Kotlin; nova implementação de CSV para `@CsvSource`/`@CsvFileSource`; **remoção de APIs obsoletas**; **Vintage** e alguns módulos legados obsoletos ou removidos. **Migração 5 → 6**: subir para Java 17+, atualizar o BOM ou as dependências para 6.x, eliminar o uso de APIs obsoletas do 5 e revisar as dependências do Vintage. As **anotações e os pacotes `org.junit.jupiter.*` continuam os mesmos**. Confira as notas oficiais de lançamento.
**Por que estudar isso:** é item nominal do Técnico ("JUnit 6; migração a partir do JUnit 5").
**Alerta de Pegadinha:** dizer que o JUnit 6 trocou o pacote `org.junit.jupiter` (não trocou); usar `@BeforeAll` não-`static` sem `PER_CLASS`; inverter a ordem `esperado, atual`.
**Ação Prática:** escreva um teste parametrizado com `@CsvSource` e um `assertThrows` para uma exceção de negócio.

---

### 🎯 Assunto: Mockito [T]
**O que estudar obrigatoriamente:** criação de *mocks* com `mock(Classe.class)` ou `@Mock` (com `@ExtendWith(MockitoExtension.class)`); `@InjectMocks` (injeta os mocks na classe sob teste); `@Spy` (objeto real com stubs parciais); `@Captor`/`ArgumentCaptor`. **Stubbing**: `when(mock.metodo(arg)).thenReturn(valor)`/`.thenThrow(...)`; em métodos `void` e em *spies*, `doReturn`/`doThrow`/`doNothing().when(mock).metodo()`. **Verificação**: `verify(mock).metodo()`, `verify(mock, times(2))`, `never()`, `atLeastOnce()`, `verifyNoMoreInteractions`. **Matchers**: `any()`, `eq()`, `anyString()`. Se um argumento usa matcher, **todos** os argumentos devem usar. **Strict stubs**: o MockitoExtension acusa stubs não usados (`UnnecessaryStubbingException`). O **Mockito 5** usa o *inline mock maker* por padrão (permite mockar classes e métodos `final`); métodos estáticos se mockam com `mockStatic`.
**Por que estudar isso:** item nominal do Técnico, que costuma vir em código.
**Alerta de Pegadinha:** misturar valor literal com matcher na mesma chamada; usar `when(...)` em método `void` (o certo é `doThrow().when()`); confundir `@Mock` (falso) com `@Spy` (real).
**Ação Prática:** teste um `ProcessoService` com o repositório mockado: *stub* do `findById`, `verify` do `save` e `ArgumentCaptor` do objeto salvo.

---

## 🧩 Inteligência Artificial [A]

### 🎯 Assunto: Aprendizado de Máquina [A]
**O que estudar obrigatoriamente:** **paradigmas**: **supervisionado** (dados rotulados; **classificação** com classe discreta e **regressão** com valor contínuo), **não supervisionado** (sem rótulo: **agrupamento** com k-means, hierárquico e DBSCAN; redução de dimensionalidade com **PCA**; regras de associação com Apriori), semissupervisionado e **por reforço** (agente, ambiente, recompensa e política). **Algoritmos**: regressão linear; **regressão logística** (é de **classificação**, apesar do nome); árvores de decisão (entropia/ganho de informação, Gini); **random forest** (*bagging* de árvores); ***boosting*** (AdaBoost, Gradient Boosting, XGBoost: modelos sequenciais que corrigem os erros anteriores); SVM (margem máxima, *kernel*); **k-NN** (preguiçoso, baseado em distância, exige normalização); **Naive Bayes** (supõe independência condicional). **Avaliação**: treino/validação/teste e **validação cruzada k-fold**; ***overfitting*** (vai bem no treino e mal no teste; alta variância) × *underfitting* (alto viés); regularização **L1** (Lasso, zera pesos e seleciona atributos) e **L2** (Ridge). **Métricas de classificação**: **matriz de confusão**; **acurácia**; **precisão** = VP/(VP+FP) ("dos que previ positivos, quantos são?"); ***recall*/sensibilidade** = VP/(VP+FN) ("dos positivos reais, quantos achei?"); **F1** (média harmônica dos dois); **ROC/AUC**. **Métricas de regressão**: MAE, MSE, RMSE e R². **Pré-processamento**: tratamento de ausentes, *one-hot encoding*, normalização e padronização, desbalanceamento (SMOTE, pesos) e **vazamento de dados** (*data leakage*).
**Por que estudar isso:** está no Analista e o candidato domina. Basta fixar fórmulas e termos em português.
**Alerta de Pegadinha:** classificar a regressão logística como regressão; trocar precisão por recall; usar acurácia em base desbalanceada (99% de negativos dá 99% de acurácia "de graça").
**Ação Prática:** a partir de uma matriz de confusão (VP = 40, FP = 10, FN = 20, VN = 30), calcule acurácia (0,70), precisão (0,80), recall (≈0,67) e F1 (≈0,73).

---

### 🎯 Assunto: Redes Neurais e Aprendizado Profundo [A]
**O que estudar obrigatoriamente:** **perceptron** (soma ponderada + bias + função de ativação). Um perceptron único só resolve problemas **linearmente separáveis** (não resolve o **XOR**), e por isso existe o **MLP**, com camadas ocultas. **Funções de ativação**: sigmoide (0 a 1), tanh (−1 a 1), **ReLU** (max(0, x), a padrão nas camadas ocultas) e **softmax** (distribuição de probabilidades na saída multiclasse). **Treinamento**: função de perda (MSE na regressão, entropia cruzada na classificação) → ***backpropagation*** (regra da cadeia) → **gradiente descendente** (taxa de aprendizado; variantes SGD, *mini-batch* e Adam). Termos: **época**, *batch* e iteração. Problemas e soluções: **gradiente que desaparece** (com sigmoide/tanh em redes profundas; ReLU, LSTM e conexões residuais resolvem) e **overfitting** (**dropout**, *early stopping*, regularização, *data augmentation*). **Arquiteturas**: **CNN** (convolução + *pooling*, para imagens), **RNN/LSTM/GRU** (sequências; a LSTM tem portas de esquecimento, entrada e saída), *autoencoders* e **Transformers** (veja o próximo bloco).
**Por que estudar isso:** item nominal do Analista.
**Alerta de Pegadinha:** dizer que um perceptron simples resolve o XOR; usar softmax em camada oculta; dizer que o dropout é aplicado na inferência.
**Ação Prática:** explique em 5 linhas por que a ReLU mitigou o gradiente que desaparece.

---

### 🎯 Assunto: IA Generativa e Grandes Modelos de Linguagem (LLMs) [A]
**O que estudar obrigatoriamente:** **Transformer** ("*Attention Is All You Need*", 2017): o mecanismo de **autoatenção** (*self-attention*, com Q, K e V) relaciona todos os *tokens* entre si e permite paralelismo. A arquitetura pode ser *encoder* (BERT, para compreensão), *decoder* (GPT, para geração autorregressiva) ou *encoder-decoder* (T5). Conceitos: ***token*** (subpalavra), ***embeddings*** (vetores semânticos), **janela de contexto** e geração autorregressiva (prevê o próximo token). Parâmetros de amostragem: **temperatura** (alta = mais aleatório e criativo) e *top-p*/*top-k*. **Ciclo de treinamento**: **pré-treinamento** autossupervisionado em grandes corpora → ***fine-tuning*** supervisionado e de instruções → **alinhamento** (RLHF, por *feedback* humano, ou variações como DPO). **Uso**: **engenharia de prompt** (*zero-shot*, *few-shot*, ***chain-of-thought***, papel e formato de saída) e **RAG** (*Retrieval-Augmented Generation*: recupera documentos relevantes por busca vetorial de embeddings e os injeta no prompt, reduzindo alucinação e trazendo conhecimento atualizado **sem retreinar**). Também entram agentes e uso de ferramentas (*function calling*). **Riscos**: **alucinação**, viés, ***prompt injection***, vazamento de dados, direitos autorais e explicabilidade. Por isso valem supervisão humana e governança. **Outros modelos generativos**: **GANs** (gerador × discriminador), **VAEs** e **modelos de difusão** (ruído → imagem; Stable Diffusion).
**Por que estudar isso:** item novo do Analista. A FCC tende a cobrar conceitos (RAG, fine-tuning, alucinação, temperatura).
**Alerta de Pegadinha:** dizer que o RAG retreina o modelo; associar temperatura alta a respostas mais determinísticas; dizer que o BERT é um modelo gerador autorregressivo.
**Ação Prática:** explique a um colega leigo, em 6 linhas, a diferença entre *fine-tuning* e RAG e quando usar cada um.

---

# ✅ Observações finais

- **Para o Técnico** valem: requisitos, UML, ágeis, low-code, assistentes de IA, metodologias tradicionais, OO, padrões e todo o bloco de testes. A IA (ML, redes neurais e LLMs) é **só do Analista**.
- CMMI v3.0, ISO 12207:2021, MR-MPS-SW 2024 e BPMN estão no guia **Gestão, Governança e Processos 2026**.
