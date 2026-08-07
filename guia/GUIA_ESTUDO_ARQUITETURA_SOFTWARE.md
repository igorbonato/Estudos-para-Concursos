# 📘 Guia de Estudo Direcionado e Prescritivo — Arquitetura de Software e Correlatos (TRT 4ª Região)

> Gerado a partir das **202 questões** rotuladas "Arquitetura de Software" dentro de `questoes_seguranca_informacao_and_arquitetura_software_fcc.json`, intercaladas com as de Segurança da Informação e pré-digeridas nas mesmas 5 partes usadas pelo `GUIA_ESTUDO_SEGURANCA_INFORMACAO.md` (`guia_estudos_subagentes/raw_md/37_seguranca_parteN_de_5.md`).

**Recorte deste guia — leia antes de estudar:** "Arquitetura de Software" **não é uma disciplina coesa** neste banco de questões — é o rótulo que o scraper/FCC usa para um bucket amplo de conhecimentos gerais de TI que não se encaixam em "Segurança da Informação". Na prática, as 202 questões cobrem pelo menos 6 áreas distintas do edital:

1. **Estilos e padrões arquiteturais** (SOA, microsserviços, MVC, arquitetura hexagonal, cliente-servidor) → mapeia à seção **7 (Arquitetura de Sistemas)** do edital.
2. **Padrões de projeto GoF e UML** → não tem seção própria no edital, mas é pré-requisito comum de concursos de TI e aparece nas seções de Frameworks Java/Desenvolvimento Web.
3. **Web Services, REST, SOAP/WSDL** → mapeia à seção **3 (APIs e Web Services)**.
4. **Metodologias e maturidade de processo** (CMMI, MPS.BR, PMBOK, BPMN, Scrum/XP) → mapeia à seção **17 (Governança de TI — Métodos Ágeis)** e não tem cobertura própria detalhada no edital além de "Métodos Ágeis".
5. **Fragmentos soltos de Redes, Banco de Dados, Sistemas Operacionais, Nuvem e sintaxe de linguagens de programação** (Java/PHP/TypeScript/C#/R, comandos Git, Docker, Oracle/MySQL) → já cobertos (ou serão cobertos) nos guias dedicados a essas seções; aqui eles só aparecem citados de forma pontual, sem repetir o conteúdo já tratado em `GUIA_ESTUDO_REDES.md` e `GUIA_ESTUDO_DIRECIONADO.md`.
6. **Acessibilidade web** (eMAG/WCAG) → correlato à seção de Desenvolvimento Web.

Este guia cobre os itens 1-3 e 6 em profundidade (onde há volume real e consistente) e o item 4 de forma mais resumida (citado no edital só como "Métodos Ágeis", sem detalhamento). O item 5 **não é repetido aqui** — veja os guias específicos.

---

## 🧩 Padrões de Projeto (GoF) e UML

### 🎯 Assunto: Padrões de Projeto GoF — As 3 Categorias
**O que estudar obrigatoriamente:** **criacionais** — Factory Method (delega a criação de objetos a subclasses/interfaces concretas, via classe abstrata, não método estático), Abstract Factory (interface para criar **famílias** de objetos relacionados sem especificar classes concretas), Builder (separa a **construção** de um objeto complexo de sua **representação**, permitindo gerar representações diferentes do mesmo processo — ex.: relatório em PDF/Excel/HTML), Prototype, Singleton; **estruturais** — Adapter (converte a interface de uma classe para a esperada pelo cliente, integra sistema legado sem modificá-lo), Bridge (separa **abstração** de **implementação**, permitindo variação independente — mais genérico que Adapter, útil para portar UI entre plataformas), Composite, Decorator (atribui responsabilidades dinamicamente a um objeto), Facade (simplifica um subsistema complexo), Flyweight (compartilhamento para suportar muitos objetos), Proxy; **comportamentais** — Observer (dependência um-para-muitos, notificação automática ao mudar estado), Strategy (família de algoritmos intercambiáveis encapsulados), Command, Iterator, Mediator (encapsula a interação entre um conjunto de objetos, acoplamento fraco, evita referências explícitas entre eles), Memento (salva/restaura estado de um objeto sem revelar detalhes de implementação), State, Template Method, Visitor, Chain of Responsibility, Interpreter; **Intercepting Filter** (não é GoF clássico, mas cobrado) intercepta/manipula requisições/respostas web de forma encadeada e plugável, típico da camada de apresentação Java EE.

**Por que estudar isso:** é o tema isolado mais recorrente de todo o lote "Arquitetura de Software" — a FCC descreve o padrão por extenso (intenção, estrutura) e pede o nome, ou dá o nome e pede a categoria.

**Alerta de Pegadinha:** classificar mal a categoria — **Decorator é ESTRUTURAL** (não comportamental), **Abstract Factory é CRIACIONAL** (não estrutural), **State é COMPORTAMENTAL** (não criacional); confundir Factory Method (resolve "qual classe instanciar") com Builder (resolve "como construir passo a passo uma representação complexa"); confundir Adapter (interfaces incompatíveis) com Bridge (abstração x implementação, mais amplo/planejado desde o início).

**Ação Prática:** monte a tabela das 23 padrões GoF em 3 colunas (criacional/estrutural/comportamental) e treine com o mnemônico "a Fábrica Abstrata Constrói um Protótipo Único" (criacionais) e "a Ponte Adaptada é Composta de Decorações na Fachada para o Peso Leve se aProximar" (estruturais) até recitar de cabeça; para cada padrão, escreva uma palavra-chave-gatilho (ex.: Builder=construção em etapas, Mediator=desacopla comunicação, Memento=salvar/restaurar estado).

---

### 🎯 Assunto: UML 2.5 — Diagramas, Relacionamentos e Requisitos
**O que estudar obrigatoriamente:** diagramas **estruturais** (Class, Object, Component, Composite Structure, Deployment, Package, Profile) x **comportamentais** (Use Case, Activity, State, Sequence, Communication, Timing, Interaction Overview); **agregação** = relação todo-parte com **vida independente**, notação losango **vazio** (ex.: "consiste em") x **composição** = todo-parte com **ciclo de vida dependente**, losango **preenchido** (destruir o todo destrói as partes); **encapsulamento** (getters/setters, "caixa preta") x **polimorfismo** (mesmo método, comportamentos diferentes em subclasses); Diagrama de Atividades representa a sequência lógica de um processo via fluxos de controle; **requisito funcional (RF)** = "o que" o sistema faz (testável ao "clicar um botão"); **requisito não funcional (RNF)** = "como"/restrição de qualidade (tempo de resposta, disponibilidade, privacidade); processo de elicitação e análise de requisitos: descoberta → classificação/organização → priorização/negociação → especificação; **Modelo de visões 4+1**: visão lógica (abstrações/objetos/classes), visão de processo (interações em tempo de execução, desempenho/disponibilidade), visão física/implantação (distribuição de componentes entre processadores), visão de desenvolvimento, e a visão +1 de casos de uso que amarra as demais.

**Por que estudar isso:** cobrado de forma consistente, testando tanto a classificação correta do diagrama (estrutural x comportamental) quanto a distinção fina agregação x composição.

**Alerta de Pegadinha:** confundir agregação (losango vazio, vida independente) com composição (losango preenchido, vida dependente); usar o "bizu" errado para RF x RNF ("se não dá pra clicar um botão para acionar, é RNF").

**Ação Prática:** classifique 10 diagramas UML aleatórios em estrutural/comportamental; desenhe um exemplo de agregação e um de composição com a notação correta do losango.

---

## 🧩 Estilos Arquiteturais e Web Services (edital seção 3 e 7)

### 🎯 Assunto: SOA — Conceitos, ESB e Evolução para Microsserviços
**O que estudar obrigatoriamente:** SOA promove **Separation of Concerns**, favorecendo reuso de serviços, integração com sistemas legados (via ESB/wrappers) e descoberta dinâmica (historicamente via **UDDI**) — **não é rígida** nem exige configuração manual obrigatória; componentes atuam como serviços interoperáveis, usáveis de forma independente ou recombinados; a fase de "Projeto Orientado a Serviços" no ciclo de vida SOA define as características a implementar; transição **SOA → microsserviços**: redistribuir a lógica de negócio em serviços **menores e autônomos**, favorecendo deploys independentes e maior resiliência — a granularidade em SOA tende a ser **menor número de serviços maiores**, em microsserviços **maior número de serviços menores**; microsserviços têm baixo acoplamento e usam troca de mensagens mais simples, enquanto SOA tradicionalmente integra via **ESB** (Enterprise Service Bus) — o ESB **não deve ser substituído** por um gateway centralizador de orquestração (isso vai contra a descentralização pretendida pelos microsserviços); SOA é uma **filosofia arquitetural**, não uma tecnologia nem metodologia — **cuidado para não confundir SOA (arquitetura) com SOAP (protocolo)**.

**Por que estudar isso:** mapeia diretamente à seção 7 do edital (Arquitetura orientada a serviços) e é o tema mais recorrente do bloco "estilos arquiteturais" — cobrado com cenários de modernização de sistemas legados do próprio Judiciário.

**Alerta de Pegadinha:** achar que SOA e microsserviços têm a mesma granularidade; confundir SOA (arquitetura) com SOAP (protocolo de mensagens); achar que substituir o ESB por um gateway centralizado é "modernizar" (é o oposto do princípio de descentralização dos microsserviços).

**Ação Prática:** escreva a diferença de granularidade SOA x microsserviços em uma frase; monte a tabela SOA (ESB, serviços maiores) x Microsserviços (API Gateway/Service Discovery, serviços menores autônomos).

---

### 🎯 Assunto: SOAP, WSDL e UDDI — Web Services Tradicionais
**O que estudar obrigatoriamente:** mensagem SOAP: elemento raiz **`<Envelope>`** (obrigatório), **`<Header>`** (opcional), **`<Body>`** (obrigatório, contém o payload) — **`<Fault>`** é filho do **`<Body>`**, **opcional**, e só pode aparecer **uma vez** por mensagem; mensagem SOAP **não** deve conter referência a DTD; **WSDL** descreve a interface/operações do serviço com 4 elementos: **`types`** (tipos de dados/XML Schema), **`message`** (entrada/saída), **`portType`** (agrupamento lógico de operações), **`binding`** (protocolo/formato de comunicação); **UDDI** publica/descobre serviços — as **3 especificações** que, com XML, fundamentam SOA em web services clássicos são **SOAP + WSDL + UDDI**; SOAP não exige obrigatoriamente HTTP como transporte, apesar de ser o mais comum; para integração crítica entre sistemas governamentais exigindo **WS-Security**, validação por esquema XML e transações, **SOAP 1.2** é a tecnologia adequada — OAuth não é protocolo de integração, JSON-RPC não tem essa robustez, HTTP/2 não tem WS-Security nativo.

**Por que estudar isso:** ainda muito cobrado em concursos públicos (sistemas legados governamentais usam SOAP extensivamente) — a FCC testa a estrutura exata da mensagem e os 4 elementos do WSDL.

**Alerta de Pegadinha:** achar que `<Fault>` é filho de `<Header>` ou pode aparecer mais de uma vez; trocar a função de `portType` com `binding`; achar que SOAP exige HTTP obrigatoriamente.

**Ação Prática:** escreva do zero um esqueleto de mensagem SOAP com Envelope/Header/Body/Fault; decore os 4 elementos do WSDL na ordem certa (types→message→portType→binding).

---

### 🎯 Assunto: REST/RESTful — Princípios e Boas Práticas
**O que estudar obrigatoriamente:** deve ser **stateless** (não mantém estado do cliente no servidor — cada requisição contém toda a informação necessária); usa métodos HTTP padrão (GET/POST/PUT/DELETE/PATCH) semanticamente; arquitetura cliente/servidor formada por clientes, servidores e **recursos** identificáveis por URI; requisitos adicionais: cache, interface uniforme, sistema em camadas, código sob demanda (opcional); para evoluir uma integração "tudo via POST com campo `acao`" para REST genuíno: modelar operações como recursos identificáveis por URI, usar verbos HTTP conforme semântica, manter statelessness; para operação **assíncrona** sem bloquear processamento: responder **202 Accepted** com cabeçalho **Location** apontando para endpoint de consulta de status — **não** 200 OK "pendente", nem 206 Partial Content, nem 201 Created; requisição SOAP equivale, em REST, à URL do próprio recurso (ex.: `GET/PUT/DELETE .../users/17689`), sem WSDL nem conexão persistente; REST é um **estilo arquitetural** que usa HTTP como protocolo de transporte — não confundir com "protocolo" em si.

**Por que estudar isso:** citado explicitamente no edital (item 3, REST) e cobrado com muita frequência em cenários de modernização de API — é o padrão de fato do mercado atual.

**Alerta de Pegadinha:** achar que 200/201/206 servem para "processando, consulte depois" (só 202 Accepted + Location é o padrão correto); achar que REST é sinônimo de HTTP/JSON (é um estilo arquitetural, mais amplo).

**Ação Prática:** treine identificar o código de status HTTP correto para 5 cenários diferentes (criação síncrona, criação assíncrona, atualização parcial, erro de permissão, recurso não encontrado).

---

### 🎯 Assunto: Microsserviços na Prática — Spring Cloud (Eureka, Zuul, Gateway)
**O que estudar obrigatoriamente:** **Eureka** é servidor de **service discovery** — registro e busca de serviços por nome lógico em vez de IP fixo (**não faz roteamento**, isso é do Gateway/Zuul; não faz configuração central, isso é do Config Server); `@EnableEurekaClient`/`@EnableEurekaServer` habilitam o papel de cliente/servidor Eureka numa aplicação Spring Boot; anotação `@LoadBalanced` no `RestTemplate` habilita balanceamento de carga ao chamar serviços registrados no Eureka; **Netflix Zuul** atua como **edge server** protegendo microsserviços expostos (autenticação/segurança) no Spring Cloud; em arquitetura com API Gateway + autenticação + Service Discovery + proxy reverso (Nginx/HAProxy), a prática correta é usar **tokens JWT** nas APIs REST para autenticação/autorização — rotas fixas, gateway "isento" de autenticação, ou proxy reverso "sem interferência" em balanceamento/cache contrariam o padrão; **message brokers** formam o backbone de comunicação compartilhada em arquiteturas cloud, suportando ponto-a-ponto (filas) e publish/subscribe.

**Por que estudar isso:** citado explicitamente no edital (Spring Cloud, Spring Eureka, Zuul) e cobrado com detalhe de anotação exata — complementa o bloco de Spring já coberto no `GUIA_ESTUDO_DIRECIONADO.md`.

**Alerta de Pegadinha:** achar que Eureka faz roteamento (é só descoberta); confundir a função de Zuul (edge server/gateway) com Eureka (registro).

**Ação Prática:** desenhe a arquitetura mínima API Gateway→Eureka→2 microsserviços→JWT, identificando o papel de cada componente.

---

### 🎯 Assunto: MVC e Arquitetura em Camadas / Hexagonal
**O que estudar obrigatoriamente:** **MVC** — fluxo padrão usuário → **Controller** → **Model** (acessa/manipula dados) → Controller → **View** → usuário; **Controller nunca é acessado diretamente por View**, e **View nunca acessa Model diretamente**; **arquitetura hexagonal (ports & adapters)** — para separar regras de negócio das tecnologias de persistência que variam (ex.: por SGBD), estrutura-se o domínio com **portas** (interfaces) e **adaptadores** específicos por tecnologia, mantendo as regras de negócio independentes — repositórios especializados por SGBD, DTOs "ricos" ou lógica concentrada em controllers/MVC tradicional **não** desacoplam de fato; **arquitetura cliente-servidor em 3 camadas**: modelo de "gerenciamento de dados distribuído" distribui a gerência de dados entre cliente e servidor; transação cliente-servidor: `BEGIN TRANSACTION` inicia, `COMMIT` (sucesso) ou `ROLLBACK` (desfaz) encerram, ou cancelamento por `TIMEOUT`.

**Por que estudar isso:** mapeia à seção 7 do edital (Arquitetura multicamadas) — cobrado tanto em nível teórico (MVC) quanto em cenários aplicados de refatoração (hexagonal).

**Alerta de Pegadinha:** permitir comunicação direta View↔Model no fluxo MVC (deve sempre passar pelo Controller); confundir "arquitetura em camadas/MVC comum" com "arquitetura hexagonal" quando o enunciado pede desacoplamento real entre domínio e tecnologia de persistência.

**Ação Prática:** desenhe o fluxo MVC completo com as setas na direção certa; escreva um exemplo de porta (interface) e 2 adaptadores diferentes (ex.: MySQL e PostgreSQL) implementando essa porta.

---

### 🎯 Assunto: Mensageria e Arquitetura Orientada a Eventos
**O que estudar obrigatoriamente:** para resiliência/escalabilidade, usar **fila intermediária (message broker)** para desacoplar produtores e consumidores — comunicação síncrona, "fire-and-forget" sem confirmação, ou processamento restrito a um único consumidor **contrariam** o padrão; no **RabbitMQ**, para garantir que mensagens não se percam em reinício do broker: habilitar **filas duráveis** (`durable=true`) e **mensagens persistentes** (`deliveryMode=2`) — retries no consumidor, TTL infinito ou banco externo **não resolvem** a persistência da fila em si; **webhook** é o mecanismo pelo qual um sistema indica endpoints a serem acionados quando eventos ocorrem (usado pela PDPJ-Br para notificar Tribunais); serviços de mensageria AWS por padrão de uso: streaming de ingestão contínua → **Kinesis**; notificação fan-out multi-protocolo (SMS/e-mail/push) → **SNS**; compatibilidade com sistemas legados JMS → **Amazon MQ** (SQS **não** atende fan-out multi-protocolo nem compatibilidade JMS).

**Por que estudar isso:** mapeia à seção 4 do edital (Elastic Stack) e ao item "Mensageria" da seção 7 — tema cada vez mais cobrado em arquiteturas modernas de integração.

**Alerta de Pegadinha:** achar que retries no consumidor resolvem persistência de fila (é preciso durable+persistent na fila/broker); confundir SNS (fan-out) com SQS (fila simples) com Amazon MQ (compatibilidade JMS legada).

**Ação Prática:** decore o par `queueDeclare(nome, true, false, false, null)` + `deliveryMode(2)` do RabbitMQ para fila durável+mensagem persistente; associe cada cenário AWS (streaming/fan-out/legado JMS) ao serviço correto.

---

## 🧩 Metodologias, Maturidade de Processo e Testes (correlato à Governança/Métodos Ágeis)

### 🎯 Assunto: Metodologias de Desenvolvimento — Cascata, XP, Scrum
**O que estudar obrigatoriamente:** **Cascata (Waterfall)** = ciclo sequencial em fases; **XP (Extreme Programming)** = práticas levadas ao extremo (pair programming, releases pequenos e frequentes, refatoração contínua, propriedade coletiva do código); **Scrum** = papéis/artefatos (Product Owner, Product Backlog, Sprint Backlog, Scrum Master, Sprint); **BPMN 2.0**: gateway **exclusivo** (símbolo **X**) segue apenas **um** caminho de saída; **inclusivo** (símbolo **O**) permite múltiplas condições avaliadas e múltiplos caminhos; **paralelo** (símbolo **+**) segue **todos** os caminhos simultaneamente; **baseado em evento** aguarda a ocorrência de um evento.

**Por que estudar isso:** citado no edital como "Métodos Ágeis" (seção 17, Governança de TI) — a FCC testa tanto o vocabulário de cada metodologia quanto a leitura de símbolos BPMN.

**Alerta de Pegadinha:** confundir o símbolo do gateway exclusivo (X, um caminho) com o inclusivo (O, múltiplos caminhos possíveis) com o paralelo (+, todos os caminhos).

**Ação Prática:** decore os 3 símbolos de gateway BPMN (X/O/+) com a regra de quantos caminhos cada um segue.

---

### 🎯 Assunto: CMMI-DEV v2.0 e MPS.BR — Níveis de Maturidade
**O que estudar obrigatoriamente:** **CMMI-DEV** — 5 níveis: **1 Inicial** (imprevisível) → **2 Gerenciado** (processos planejados/executados/medidos/controlados no nível de **PROJETO**, ainda não em toda a organização) → **3 Definido** (processos padronizados em toda a **ORGANIZAÇÃO**) → **4 Quantitativamente Gerenciado** (métricas estatísticas) → **5 Em Otimização** (melhoria contínua/inovação); categorias de área de processo: "**Doing**" abrange produção/compra/entrega de soluções de alta qualidade (não confundir com "Managing"); **MPS.BR (MR-MPS-SW:2021)** — níveis de capacidade **A a G** (do mais ao menos maduro): A Em Otimização, B Gerenciado Quantitativamente, C Totalmente Definido, D Definido, E Parcialmente Definido, **F Gerenciado** (execução planejada/monitorada, com verificação objetiva de que o processo é seguido), G Parcialmente Gerenciado; **PMBOK 6ª edição**: "Monitorar o Engajamento das Partes Interessadas" é o processo que adapta estratégias de engajamento e comunicação ao longo do projeto; **ISO/IEC/IEEE 12207:2017/2021**: agrupa os processos do ciclo de vida em **Agreement**, **Organizational Project-Enabling**, **Technical Management** e **Technical**.

**Por que estudar isso:** tema de "decoreba de nível/sigla" cobrado com regularidade — a pegadinha mais comum é trocar nível 2 (projeto) com nível 3 (organização) do CMMI.

**Alerta de Pegadinha:** trocar nível 2 (Gerenciado, escopo de PROJETO) com nível 3 (Definido, escopo de ORGANIZAÇÃO) do CMMI; inverter a ordem A-G do MPS.BR (A é o **mais** maduro, não o menos).

**Ação Prática:** decore a tabela CMMI 1-5 e MPS.BR A-G lado a lado, com a palavra-chave de escopo (projeto/organização) de cada nível intermediário.

---

### 🎯 Assunto: Testes de Software e Pentest
**O que estudar obrigatoriamente:** teste **unitário** x **integração** (custo maior, exige múltiplos módulos ativos) x **funcional** (valida contra o **SRS** — Software Requirement Specification); pentest **white-box/clear box** (acesso total a código/arquitetura) x **black-box/opaque box** (zero conhecimento, simula atacante externo) x **gray-box** (conhecimento/acesso parcial, reduz tempo de engenharia reversa); no Eclipse, executa-se teste JUnit via Run → Run As → JUnit Test, com a classe de teste herdando de `junit.framework.TestCase` e exigindo o `.jar` do JUnit no classpath; **Análise de Pontos de Função**: contagem de PF brutos soma **EE** (entradas), **SE** (saídas), **CE** (consultas), **ALI** (arquivos internos), **AIE** (interfaces externas), cada um ponderado pela tabela de complexidade baixa/média/alta.

**Por que estudar isso:** mapeia à seção 6 do edital (Testes de Software) — cobrado com detalhe de sintaxe/ferramenta (JUnit no Eclipse) além dos conceitos.

**Alerta de Pegadinha:** confundir teste funcional (valida contra requisitos/SRS) com teste unitário (valida uma unidade de código isolada).

**Ação Prática:** escreva a diferença unitário x integração x funcional em uma frase cada; decore as 5 siglas da Análise de Pontos de Função (EE/SE/CE/ALI/AIE).

---

## 🧩 Acessibilidade e Arquitetura de Informação (correlato ao Desenvolvimento Web)

### 🎯 Assunto: WCAG, eMAG e Boas Práticas de Acessibilidade Web
**O que estudar obrigatoriamente:** **WCAG** estrutura-se em 4 princípios (**POUR**): **P**erceptível, **O**perável, **C**ompreensível→Understandable, **R**obusto; **eMAG** (Modelo de Acessibilidade em Governo Eletrônico, versão 3.1) organiza recomendações em seções (marcação, comportamento, apresentação, formulários, multimídia, conteúdo/imagem); recomenda **âncoras** (`<a href="#id">`) para pular direto a blocos de conteúdo; desaconselha **Flash/animações, CAPTCHAs, tabelas para diagramação**, atualizações automáticas periódicas, elementos depreciados (frame/applet/blink/marquee/center/font); links adjacentes devem ser separados usando **listas** (`<ul><li>`), não espaços em branco; toda imagem deve ter atributo **`alt`**; para PDF digitalizado como imagem sem navegação por leitor de tela, a adequação exigida é converter para **PDF pesquisável com marcação semântica** (PDF tagueado) — não bastam índice HTML paralelo, assinatura ICP-Brasil isolada ou zoom; atalhos padrão de teclado do governo eletrônico: **Alt+1** conteúdo, **Alt+2** menu principal, **Alt+3** caixa de pesquisa; **Decreto 5.296/2004** exige símbolo de acessibilidade nas páginas de entrada de sítios acessíveis; métodos de inspeção de usabilidade sem participação do usuário: Percurso Cognitivo, Avaliação Heurística, Inspeção de Padrões.

**Por que estudar isso:** tema de nicho mas certo de aparecer em provas com perfil web/governo eletrônico — cobra trechos praticamente literais dos documentos oficiais.

**Alerta de Pegadinha:** achar que basta um índice HTML paralelo ou zoom para resolver acessibilidade de PDF digitalizado (precisa ser PDF tagueado/pesquisável); esquecer que CAPTCHA e tabelas de diagramação são **desaconselhados** pelo eMAG.

**Ação Prática:** decore os 4 princípios POUR e a lista de elementos/práticas desaconselhadas pelo eMAG; treine os 3 atalhos de teclado padrão (Alt+1/2/3).

---

### 🎯 Assunto: ERP, GED, Portais/Portlets e Arquitetura da Informação
**O que estudar obrigatoriamente:** **ERP** garante consistência das informações por integrar diferentes áreas/processos numa base única (gestão de projetos, processos, controle de qualidade, dados financeiros); **GED** (Gestão Eletrônica de Documentos) deve garantir **rastreabilidade/auditoria** de acesso aos documentos — **não pode** garantir "anonimato de acesso"; geração de PDF/A + assinatura corresponde ao processo de geração do documento com metadados padronizados e assinatura digital via certificado ICP-Brasil, podendo incluir timestamping; **Portlets** são componentes web reutilizáveis e "plugáveis" em portais corporativos, agregando fontes de conteúdo diversas; **Arquitetura da Informação** organiza elementos para tornar o conjunto compreensível ao usuário; **taxonomia** = estruturas classificatórias para organizar domínios de conhecimento; **Zachman Framework** organiza a arquitetura corporativa numa matriz de perguntas (What/How/Where/Who/When/Why) x perspectivas — a coluna **HOW** relaciona-se a **processos** (atenção: há questão com gabarito contestado nos comentários apontando Entity Relationship Model — ver nota abaixo).

**Por que estudar isso:** conceitos de nível gerencial cobrados com definições literais de material didático — não exigem profundidade técnica de implementação.

**Alerta de Pegadinha:** achar que GED pode garantir "anonimato de acesso" (deve garantir o oposto: rastreabilidade); no Zachman Framework, o gabarito da FCC para a coluna HOW é "Process Model" — mas há divergência documentada nos comentários da comunidade favorecendo "Entity Relationship Model"; decore a resposta esperada pela banca (Process Model).

**Ação Prática:** escreva a diferença ERP (integra processos internos) x GED (gerencia documentos com rastreabilidade) x Portal/Portlet (agrega conteúdo externo) em uma frase cada.

---

# ✅ Observações finais

- **Este guia é deliberadamente mais enxuto que o de Segurança da Informação** porque o volume real e consistente de "Arquitetura de Software" propriamente dita (SOA/REST/SOAP/GoF/UML/MVC) é menor que o de Segurança, e boa parte do restante do lote (fragmentos de Redes, Banco de Dados, Sistemas Operacionais, sintaxe de linguagens) já está coberta ou será coberta nos guias dedicados a essas seções — evitar duplicar conteúdo entre guias foi uma escolha deliberada.
- **Sintaxe de linguagens de programação** (Java, TypeScript, PHP, C#, R, jQuery, CSS3) e **comandos de banco de dados** (Oracle/MySQL/índices/formas normais) apareceram pontualmente sob o rótulo "Arquitetura de Software" neste banco — se você quiser reforço dedicado nesses tópicos, consulte `GUIA_ESTUDO_DIRECIONADO.md`, que já cobre Java/Spring/JPA com muito mais profundidade a partir de um lote de questões específico de programação.
- **Redes e infraestrutura** (OSPF/STP/HSRP/DiffServ/cabeamento) citadas sob esse mesmo rótulo já estão cobertas com muito mais detalhe em `GUIA_ESTUDO_REDES.md`.
- Os 5 resumos brutos que originaram este guia são os mesmos usados pelo `GUIA_ESTUDO_SEGURANCA_INFORMACAO.md` — `guia_estudos_subagentes/raw_md/37_seguranca_parte1_de_5.md` a `37_seguranca_parte5_de_5.md` — procure pelas tags `[Arquitetura de Software]` dentro deles para ver os `id_questao` reais por trás de cada regra resumida aqui.
