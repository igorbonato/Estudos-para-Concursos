# 📘 Guia de Estudo Direcionado e Prescritivo — PDPJ-Br, Stack Java e Normativos CNJ (TRT 4ª Região · Edital 2026)

> **Guia novo do Edital TRT4 nº 01/2026.** Cobre as seções **6.10 (Arquitetura da PDPJ-Br) [A+T]** e **6.15 (Normativos da PDPJ-Br) [A+T]**, mais a parte Java/Spring da seção 6.4. Diferente dos guias anteriores, ele **não foi gerado a partir de um banco de questões FCC processado**: é material de base montado sobre o texto do edital, as especificações oficiais (Jakarta EE, RFCs, documentação Spring/Hibernate) e os normativos do CNJ. Os itens marcados com **⚠️ conferir** citam versões recentes ou detalhes de normativos que você deve validar lendo o texto oficial.
>
> **Por que este bloco é o mais importante do edital:** é **[A+T]** (cai nas duas provas), faz parte dos Específicos (peso 2) e é a única área em que o perfil .NET do candidato tem lacuna real. A estratégia é **mapear o que você já sabe em .NET para o equivalente Java/Spring**, em vez de estudar do zero.

**Legenda:** **[A+T]** cai nos dois · **[A]** só Analista · **[T]** só Técnico.

---

## 🧩 Ponte .NET → Java (aceleração para o seu perfil)

### 🎯 Assunto: Tabela de Equivalências C#/.NET ↔ Java/Spring [A+T]
**O que estudar obrigatoriamente:** memorize a tabela abaixo. Ela converte 5 anos de experiência em pontos de prova.

| Você já usa (.NET) | Equivalente na PDPJ-Br (Java) | Diferença que a FCC pode cobrar |
|---|---|---|
| ASP.NET Core | **Spring Boot** (Spring MVC / WebFlux) | Boot = autoconfiguração + starters + servidor embutido (Tomcat por padrão) |
| DI nativo (`IServiceCollection`) | **Spring IoC Container** (`@Component`, `@Service`, `@Repository`, `@Autowired`) | Escopo padrão do bean é **singleton**; `prototype`, `request`, `session` são opcionais |
| `appsettings.json` | `application.properties` / `application.yml` + **profiles** (`spring.profiles.active`) | |
| Entity Framework Core | **JPA** (especificação) + **Hibernate** (implementação) | JPA é **interface/spec**; Hibernate é o **provedor**. EF não tem essa separação |
| EF Migrations | **Flyway** (`V1__descricao.sql`) | Flyway trabalha com SQL versionado e uma tabela de histórico |
| AutoMapper | **MapStruct** | MapStruct gera o código **em tempo de compilação** (annotation processor), sem reflexão |
| Swashbuckle | **springdoc-openapi / Swagger** | |
| `[ApiController]` + `[HttpGet]` | `@RestController` + `@GetMapping` | `@Controller` + `@ResponseBody` = `@RestController` |
| NuGet / `.csproj` | **Maven** (`pom.xml`) / Gradle | |
| Ocelot / YARP | **Zuul** (legado) / Spring Cloud Gateway | |
| Consul | **Eureka** (Service Discovery) | |
| MassTransit + RabbitMQ | **Spring AMQP** + RabbitMQ | |
| xUnit + Moq | **JUnit 6** + **Mockito** [T] | |
| `namespace` | `package` | Em Java, o pacote deve casar com a estrutura de diretórios |
| Propriedades `{ get; set; }` | getters/setters (ou Lombok / `record`) | Java não tem propriedades na linguagem |

**Por que estudar isso:** o edital lista exatamente essa stack. A FCC cobra "qual anotação/ferramenta faz X", e você já conhece o X.
**Alerta de Pegadinha:** dizer que JPA "é um framework ORM" quando a alternativa diferencia **especificação (JPA)** de **implementação (Hibernate, EclipseLink)**; achar que bean Spring é criado por requisição (o padrão é singleton).
**Ação Prática:** suba um Spring Boot mínimo com um `@RestController`, uma entidade JPA com H2 e uma migração Flyway. São duas horas que valem mais que dez de leitura.

---

## 🧩 Arquitetura da PDPJ-Br (seção 6.10) [A+T]

### 🎯 Assunto: O que é a PDPJ-Br e qual é sua arquitetura
**O que estudar obrigatoriamente:** a **Plataforma Digital do Poder Judiciário (PDPJ-Br)** foi instituída pela **Res. CNJ 335/2020** como política de governança e gestão do processo judicial eletrônico. Ela mantém o **PJe** como sistema prioritário e cria um ambiente comum, de código aberto e colaborativo, em que os tribunais desenvolvem e compartilham **módulos/microsserviços** (o "marketplace" da plataforma). A arquitetura de referência (Portaria CNJ 253/2020, ver abaixo) é: **Java**; **microsserviços** distribuídos e independentes; comunicação por **API RESTful + JSON**; **Spring Boot/Spring Cloud**; descoberta de serviços (**Eureka**) e ponto único de entrada (**API Gateway/Zuul**); persistência **JPA/Hibernate** em **PostgreSQL**; autenticação centralizada com **SSO/Keycloak/OAuth2**; integração assíncrona por **RabbitMQ**, eventos negociais e webhooks; empacotamento em **Docker** e orquestração em **Kubernetes** gerenciado por **Rancher**; versionamento **Git** e **CI/CD**.
**Por que estudar isso:** é o "porquê" de todo o bloco 6.10. Questões de cenário costumam descrever a plataforma e pedir o componente certo.
**Alerta de Pegadinha:** confundir PDPJ-Br (a **plataforma**) com PJe (um **sistema** que roda nela); achar que a PDPJ é monolítica ou proprietária (é de microsserviços e código aberto).
**Ação Prática:** desenhe de memória o diagrama: cliente → API Gateway → (Eureka) → microsserviços → PostgreSQL / RabbitMQ, com Keycloak ao lado emitindo tokens.

---

### 🎯 Assunto: Microsserviços, Service Discovery e API Gateway (Spring Cloud, Eureka, Zuul) [A+T]
**O que estudar obrigatoriamente:** **Service Discovery**: cada instância se **registra** no **Eureka Server** e envia *heartbeats* (renovação a cada 30 s por padrão). Quem chama consulta o registro (descoberta **client-side**) e balanceia a carga (historicamente com **Ribbon**, hoje com Spring Cloud LoadBalancer). O Eureka tem **modo de autopreservação**: se muitos heartbeats falham de uma vez, ele **não expulsa** instâncias, supondo falha de rede. **API Gateway**: ponto único de entrada que faz roteamento, autenticação, rate limiting, CORS e agregação. O **Zuul 1** (Netflix) é baseado em **filtros** dos tipos `pre`, `route`, `post` e `error`, e é **bloqueante** (servlet). Está em manutenção; o sucessor no ecossistema Spring é o **Spring Cloud Gateway** (reativo, WebFlux). Outros padrões de Spring Cloud: **Config Server** (configuração centralizada), **circuit breaker** (Hystrix, legado → **Resilience4j**) e **OpenFeign** (cliente HTTP declarativo).
**Por que estudar isso:** o edital cita Eureka e Zuul nominalmente, e a FCC adora "qual componente é responsável por...".
**Alerta de Pegadinha:** dizer que o Eureka roteia requisições (quem roteia é o **gateway**; o Eureka só mantém o **registro**); achar que o Zuul 1 é reativo; confundir circuit breaker com load balancer.
**Ação Prática:** escreva, em 3 linhas cada, o papel de Eureka, Zuul/Gateway, Config Server, Resilience4j e Feign.

---

### 🎯 Assunto: Spring Framework e Spring Boot [A+T]
**O que estudar obrigatoriamente:** **IoC/DI**: o container cria e injeta os *beans*. Injeção por **construtor** é a recomendada (permite campos `final` e facilita teste); também existem por setter e por campo (`@Autowired`). Estereótipos: `@Component` (genérico), `@Service`, `@Repository` (traduz exceções de persistência) e `@Controller`/`@RestController`. `@Configuration` + `@Bean` declaram beans manualmente. **Spring Boot**: `@SpringBootApplication` = `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan`. **Starters** (`spring-boot-starter-web`, `-data-jpa`, `-security`, `-test`) trazem dependências coerentes. A **autoconfiguração** é condicional (`@ConditionalOnClass` etc.). O servidor vem **embutido** (Tomcat por padrão; Jetty e Undertow são opcionais) e gera um JAR executável. **Actuator** expõe endpoints de saúde e métricas (`/actuator/health`). REST: `@GetMapping`, `@PostMapping`, `@PathVariable`, `@RequestParam`, `@RequestBody`, `ResponseEntity`. **Spring Data JPA**: interfaces `JpaRepository<T, ID>`, com consultas derivadas do nome do método (`findByNomeAndAtivoTrue`) e `@Query`. **Transações**: `@Transactional`, com propagação padrão `REQUIRED`. Ela só funciona via **proxy**, então chamada interna (`this.metodo()`) **não** abre transação.
**Por que estudar isso:** é o framework central da PDPJ e aparece em praticamente toda prova FCC de TRT com Java.
**Alerta de Pegadinha:** `@Transactional` em método `private` ou chamado de dentro da mesma classe (não funciona); achar que `@SpringBootApplication` inclui `@EnableWebMvc`; confundir `@RequestParam` (query string) com `@PathVariable` (segmento da URL).
**Ação Prática:** monte um cartão com as 3 anotações que compõem `@SpringBootApplication` e os 4 estereótipos.

---

### 🎯 Assunto: Persistência: JPA 2.0, Hibernate 5+, Envers e Flyway [A+T]
**O que estudar obrigatoriamente:** **JPA**: `@Entity`, `@Table`, `@Id`, `@GeneratedValue` (estratégias `IDENTITY`, `SEQUENCE`, `TABLE` e `AUTO`; no PostgreSQL prefira `SEQUENCE`), `@Column`, relacionamentos `@OneToMany`/`@ManyToOne`/`@OneToOne`/`@ManyToMany`, com `mappedBy` no lado **inverso** (o dono da FK é o lado `@ManyToOne`). **Fetch padrão**: `*ToOne` = **EAGER**, `*ToMany` = **LAZY**. Isso gera o problema **N+1** e a `LazyInitializationException` fora da sessão; a solução é `JOIN FETCH` ou `@EntityGraph`. **Ciclo de vida** da entidade: *new/transient* → *managed* (`persist`) → *detached* (fim do contexto ou `detach`) → *removed* (`remove`). `merge` reanexa um objeto *detached*. O **contexto de persistência** é o cache de 1º nível, e o *dirty checking* grava as alterações no `flush`/`commit`. Consultas: **JPQL** (sobre **entidades**, não tabelas), Criteria API, `@NamedQuery` e SQL nativo. Herança: `SINGLE_TABLE` (padrão), `JOINED`, `TABLE_PER_CLASS`. **Hibernate Envers**: auditoria/versionamento de entidades. Anote com `@Audited`; ele cria tabelas `<entidade>_AUD` e a tabela de revisões `REVINFO`, e a consulta ao histórico é feita via `AuditReader`. **Flyway**: migrações versionadas `V<versão>__<descricao>.sql` (dois *underscores*), repetíveis `R__<descricao>.sql` (rodam quando o checksum muda), histórico na tabela `flyway_schema_history`. Comandos: `migrate`, `info`, `validate`, `baseline`, `repair` e `clean`. Alterar uma migração já aplicada **quebra a validação de checksum**.
**Por que estudar isso:** o edital lista JPA 2.0, Hibernate 5+, Envers e Flyway nominalmente. É o tópico mais "decoreba de anotação" da plataforma.
**Alerta de Pegadinha:** achar que JPQL usa nomes de **tabelas**; inverter o fetch padrão; editar a `V1__` já aplicada em vez de criar `V2__`; esquecer que `mappedBy` fica no lado **sem** FK.
**Ação Prática:** escreva um par `Processo` 1→N `Movimentacao` com o `mappedBy` certo e marque `@Audited` em `Processo`. Depois liste as tabelas que o Envers cria.

---

### 🎯 Assunto: Jakarta EE 8 x 11, Jakarta Persistence 3.2 e Hibernate ORM 7.x ⚠️ conferir
**O que estudar obrigatoriamente:** **Linha do tempo**: Java EE 8 → **Jakarta EE 8** (2019, mesma API, ainda com pacotes **`javax.*`**) → **Jakarta EE 9** (2020, a **troca de namespace** para **`jakarta.*`**, que quebra a compatibilidade binária) → EE 10 (2022, Core Profile) → **Jakarta EE 11** (2025, **Java 17+**, inclui **Jakarta Data 1.0**, suporte a *records*, Concurrency com *virtual threads*, remoção de dependências do SecurityManager). O edital trata a **EE 8 como legado** e a **EE 11 como atual [T]**. **Jakarta Persistence 3.2** (parte da EE 11): *records* como `@Embeddable`, novos recursos de JPQL (`UNION`/`INTERSECT`/`EXCEPT`, `||`, `CAST`, `LEFT`/`RIGHT`, `REPLACE`), `EntityManagerFactory.runInTransaction()`/`callInTransaction()`, configuração programática (`PersistenceConfiguration`) e preferência por `java.time` (os tipos `Date`/`Calendar` ficam obsoletos). **Hibernate ORM 7.x** implementa a Persistence 3.2, exige Java 17, foi **relicenciado para Apache 2.0** e traz os **Hibernate Data Repositories** (Jakarta Data). O 6.x já tinha trocado o motor de consultas (SQM). O edital pede "noções… preservadas as versões dos normativos PDPJ": a PDPJ referencia **JPA 2.0/Hibernate 5+**, e as versões novas entram como evolução.
**Por que estudar isso:** a FCC gosta de cobrar a mudança `javax` → `jakarta` e "a partir de qual versão".
**Alerta de Pegadinha:** dizer que a Jakarta EE 8 já usa `jakarta.*` (só a partir da EE 9); confundir Jakarta Data (repositórios padronizados) com Spring Data.
**Ação Prática:** faça uma linha do tempo EE 8 → 9 → 10 → 11 com uma novidade por versão.

---

### 🎯 Assunto: MapStruct, Swagger/OpenAPI e JSON [A+T]
**O que estudar obrigatoriamente:** **MapStruct**: interface anotada com `@Mapper` (e `componentModel = "spring"` para virar bean). O **annotation processor** gera a implementação **em tempo de compilação**: é rápido, *type-safe* e **sem reflexão**. Use `@Mapping(source = "...", target = "...")` para nomes diferentes, `ignore = true` e `expression`/`qualifiedByName` para conversões. **Swagger/OpenAPI**: OpenAPI é a **especificação** (antes chamada "Swagger Specification", hoje OpenAPI 3.x). Swagger é o **conjunto de ferramentas** (Swagger UI, Editor, Codegen). No Spring, use **springdoc-openapi**, que gera `/v3/api-docs` e a Swagger UI. Abordagens *code-first* x *contract/design-first*. **JSON**: tipos string, number, boolean, null, object e array; **não há** comentários, datas ou `undefined`, e as chaves vão entre **aspas duplas**. Jackson é a biblioteca padrão do Spring.
**Por que estudar isso:** MapStruct e Swagger aparecem nominalmente. A distinção OpenAPI (spec) × Swagger (ferramentas) é pegadinha clássica.
**Alerta de Pegadinha:** dizer que o MapStruct usa reflexão em tempo de execução; tratar OpenAPI e Swagger como sinônimos estritos; achar que JSON aceita aspas simples ou vírgula final.
**Ação Prática:** escreva um `@Mapper` de `ProcessoEntity` → `ProcessoDTO` com um campo renomeado e outro ignorado.

---

### 🎯 Assunto: PostgreSQL (15 a 18) e H2 Database [A+T] / versões [A] ⚠️ conferir
**O que estudar obrigatoriamente:** **H2**: banco Java, leve, nos modos **em memória** (`jdbc:h2:mem:testdb`, some ao fechar), **embutido** (arquivo, mesmo processo) e **servidor** (TCP). Tem *console web* e **modos de compatibilidade** (`MODE=PostgreSQL`). É típico de **testes** e desenvolvimento, não de produção. **PostgreSQL** (SGBD da PDPJ): MVCC, `SERIAL`/`IDENTITY`, `SEQUENCE`, `JSONB` com índice GIN, schemas, `EXPLAIN ANALYZE`, `VACUUM`/autovacuum (por causa do MVCC). **Versões [A]**: **15**: comando `MERGE`; o schema `public` perde o `CREATE` para `PUBLIC` por padrão. **16**: replicação lógica a partir de *standby*, view `pg_stat_io`, construtores SQL/JSON. **17**: `JSON_TABLE` e funções SQL/JSON (`JSON_EXISTS`, `JSON_QUERY`, `JSON_VALUE`), `MERGE ... RETURNING`, **backup incremental** (`pg_basebackup --incremental` + `pg_combinebackup`). **18**: **I/O assíncrono**, função `uuidv7()`, colunas geradas **virtuais** como padrão, autenticação **OAuth**, *skip scan* em B-tree, `RETURNING OLD/NEW`, `pg_upgrade` preservando estatísticas e autenticação MD5 obsoleta. **Migração a partir da 14**: troca de versão **major** exige `pg_upgrade` (ou `pg_dump`/`pg_restore`, ou replicação lógica); troca **minor** é só atualizar os binários.
**Por que estudar isso:** o edital do Analista cita as versões 15 a 18 e a migração da 14. H2 + PostgreSQL vale para os dois cargos pelo contexto PDPJ.
**Alerta de Pegadinha:** achar que upgrade de versão major se faz só trocando binário; dizer que H2 em memória persiste dados entre execuções.
**Ação Prática:** monte uma tabela "versão → 2 novidades" (15 a 18) e revise na semana da prova.

---

### 🎯 Assunto: Autenticação: SSO, Keycloak, OAuth 2.0 (RFC 6749) e boas práticas (RFC 9700) [A+T]
**O que estudar obrigatoriamente:** **RFC 6749**. Papéis: *resource owner* (usuário), *client* (aplicação), *authorization server* (o Keycloak) e *resource server* (a API). Clientes **confidenciais** (guardam segredo) x **públicos** (SPA, mobile). Concessões originais: **authorization code**, **implicit**, **resource owner password credentials (ROPC)** e **client credentials** (máquina a máquina), além de *refresh token*. OAuth 2.0 é de **autorização**; quem traz identidade (`id_token`) é o **OpenID Connect**. **RFC 9700 (BCP 240, jan/2025, boas práticas de segurança do OAuth 2.0)**: **PKCE** para **todos** os clientes que usam authorization code; **não usar** o implicit grant (tokens na URL vazam); **ROPC proibido** (*MUST NOT*); **comparação exata** de `redirect_uri`; tokens **restritos ao remetente** (*sender-constrained*, via mTLS RFC 8705 ou **DPoP** RFC 9449); **rotação de refresh token** (ou sender-constraint) para clientes públicos; restrição de **audiência** e privilégio mínimo nos escopos; defesa contra *mix-up* (parâmetro `iss`, RFC 9207). **Keycloak**: IdP *open source*. **Realm** é o espaço isolado de usuários e configurações; **clients** são as aplicações; há *roles* de realm e de client, grupos, **user federation** (LDAP/AD), **identity brokering** (login com outro IdP) e protocolos **OIDC** e **SAML 2.0**. Ele emite tokens **JWT**. O **SSO** permite logar uma vez e acessar vários sistemas da plataforma.
**Por que estudar isso:** você usa Keycloak na prática. Só falta a teoria das RFCs, que a FCC cobra com afirmações "deve/não deve".
**Alerta de Pegadinha:** achar que OAuth 2.0 autentica usuário (quem faz isso é o OIDC); considerar o implicit "recomendado para SPA" (era em 2012; hoje é authorization code + PKCE); achar que a RFC 9700 só "recomenda" evitar ROPC (ela **proíbe**).
**Ação Prática:** liste os 4 grants da RFC 6749 e, ao lado de cada um, o veredito da RFC 9700 (usar / usar com PKCE / não usar).

---

### 🎯 Assunto: Mensageria e Webhooks: Message Broker, RabbitMQ, Evento Negocial e APIs Reversas [A+T]
**O que estudar obrigatoriamente:** um **message broker** desacopla produtor e consumidor no tempo e no espaço, trazendo comunicação assíncrona, absorção de picos e resiliência. **RabbitMQ** implementa o **AMQP 0-9-1**. O **produtor publica numa *exchange***, nunca direto na fila, e a exchange roteia para **filas** por meio de *bindings* e *routing keys*. Tipos de exchange: **direct** (routing key exata), **fanout** (todas as filas ligadas, ou seja, broadcast), **topic** (padrões com `*` = uma palavra e `#` = zero ou mais) e **headers**. Confiabilidade: **ack** manual do consumidor, filas e mensagens **duráveis/persistentes**, *publisher confirms*, **DLX** (*dead letter exchange*) para mensagens rejeitadas ou expiradas, `prefetch` (QoS). **Evento negocial**: fato de negócio relevante já ocorrido (ex.: "processo distribuído", "petição protocolada") que outros módulos consomem. Nomeie no passado. **Webhook**: callback HTTP em que o sistema **chama** uma URL registrada pelo interessado quando o evento ocorre. É o mecanismo de "**API reversa**": em vez de o cliente fazer *polling*, o servidor empurra a notificação. Boas práticas: assinar o payload (HMAC), garantir idempotência e fazer retentativas.
**Por que estudar isso:** é item nominal da PDPJ, e você usa RabbitMQ na prática. Revise só a terminologia AMQP.
**Alerta de Pegadinha:** dizer que o produtor publica direto na fila (no AMQP ele publica na exchange; a *default exchange* só dá essa impressão); confundir fanout com topic; achar que webhook exige *polling*.
**Ação Prática:** desenhe o fluxo "processo distribuído" com uma exchange topic, duas filas e um webhook para um sistema externo.

---

### 🎯 Assunto: Git, Clusters, Docker, Kubernetes, Rancher e CI/CD na PDPJ-Br [A+T]
**O que estudar obrigatoriamente:** visão PDPJ: cada microsserviço vira uma **imagem Docker**, roda em **cluster Kubernetes**, e o **Rancher** gerencia os clusters (multi-cluster, RBAC, catálogo de apps, RKE2/K3s). O **CI** compila, testa e gera a imagem a cada *push*. O **CD** (Continuous **Delivery**) deixa o artefato pronto para produção, com liberação manual; o Continuous **Deployment** publica automaticamente. Detalhes de Docker/Kubernetes estão no guia **DevOps, Infra e Redes 2026**.
**Por que estudar isso:** o edital agrupa esses itens na arquitetura da plataforma. A FCC cobra o papel de cada peça.
**Alerta de Pegadinha:** tratar Rancher como alternativa ao Kubernetes (ele **gerencia** clusters Kubernetes); confundir Continuous Delivery com Continuous Deployment.
**Ação Prática:** escreva o pipeline da PDPJ em 6 passos, do *commit* ao *deploy* no cluster.

---

## 🧩 Normativos da PDPJ-Br (seção 6.15) [A+T]

> Estes normativos são **memorização pura**. Leia o texto integral no site do CNJ (atos normativos) e transforme cada um em 3 a 5 flashcards no app (Treinar). Abaixo está o "o que cada um faz" para você não confundir na prova. Detalhes de artigos ⚠️ conferem-se no texto.

### 🎯 Assunto: Mapa dos Normativos (o que cada número faz)
**O que estudar obrigatoriamente:**

| Normativo | Assunto (memorize a associação número → tema) |
|---|---|
| **Res. CNJ 335/2020** (contexto, fora da lista) | Institui a **PDPJ-Br** e mantém o PJe como sistema prioritário |
| **Portaria CNJ 252/2020** (contexto) | Modelo de **governança e gestão** da PDPJ-Br |
| **Portaria CNJ 253/2020** | **Critérios e diretrizes técnicas** para desenvolvimento de módulos e serviços na PDPJ-Br (a "stack" da seção 6.10) |
| **Portaria CNJ 284/2021** | **Altera a Portaria 252/2020** (governança e gestão da PDPJ-Br) |
| **Portaria CNJ 131/2021** | **Grupo Revisor de Código-Fonte** da PDPJ-Br e do PJe |
| **Res. CNJ 396/2021** | **ENSEC-PJ**: Estratégia Nacional de Segurança Cibernética do Poder Judiciário |
| **Portaria CNJ 162/2021** | **Protocolos e manuais** da ENSEC-PJ |
| **Res. CNJ 443/2022** | Conteúdo da PDPJ-Br em **concursos e capacitações de TIC** (o motivo de este bloco estar no edital) |
| **Res. CNJ 522/2023** | Institui o **MoReq-Jus** e sua **obrigatoriedade** |
| **MoReq-Jus 2ª edição** | Modelo de **requisitos** para sistemas de gestão de **processos e documentos** do Judiciário |
| **Res. CNJ 574/2024** | **Acesso a dados judiciais públicos**, **serviços privados** na PDPJ-Br e **portal unificado** |

**Por que estudar isso:** a FCC cobra "a Portaria X trata de..." e troca os números entre si.
**Alerta de Pegadinha:** confundir 252 (governança) com 253 (critérios técnicos); 396 (ENSEC-PJ, a **estratégia**) com 162 (**protocolos/manuais** da estratégia); 522 (MoReq-Jus) com 574 (dados públicos).
**Ação Prática:** crie no app um deck "Normativos PDPJ" com frente = número e verso = tema, e revise até zerar os erros.

---

### 🎯 Assunto: Portaria CNJ 253/2020: Diretrizes Técnicas de Desenvolvimento ⚠️ conferir
**O que estudar obrigatoriamente:** é a portaria que "explica" a seção 6.10. Estabelece que módulos e serviços da PDPJ-Br sejam **microsserviços** em **Java**, expostos por **APIs REST** documentadas (Swagger/OpenAPI), com autenticação centralizada no **SSO da plataforma (Keycloak)**, persistência preferencial em **PostgreSQL**, integração por **mensageria (RabbitMQ)**, entrega em **contêineres** orquestrados (Kubernetes/Rancher), código em **repositório Git** sob governança do CNJ, **código aberto** e reaproveitável entre tribunais, e submissão do código à revisão (ver Portaria 131/2021). Confira no texto a lista exata de tecnologias e versões.
**Por que estudar isso:** questões de cenário ("um tribunal deseja desenvolver um módulo para a PDPJ-Br; segundo as diretrizes, deve...").
**Alerta de Pegadinha:** alternativa que permite banco proprietário, autenticação própria por módulo ou comunicação direta com o banco de outro microsserviço (cada serviço deve ter seus dados e falar por API).
**Ação Prática:** leia a portaria e risque, na lista da seção 6.10 do edital, cada tecnologia que aparece nela.

---

### 🎯 Assunto: ENSEC-PJ (Res. 396/2021) e seus Protocolos (Portaria 162/2021) ⚠️ conferir
**O que estudar obrigatoriamente:** a **Res. 396/2021** institui a Estratégia Nacional de Segurança Cibernética do Poder Judiciário, com objetivos de tornar o Judiciário mais seguro e resiliente, de governança e de cooperação entre tribunais. Ela prevê estruturas como o **Comitê de Segurança da Informação** e a **Equipe de Tratamento e Resposta a Incidentes de Segurança Cibernética (ETIR)** em cada órgão, além de capacitação e conscientização. A **Portaria 162/2021** aprova os **protocolos**: **Prevenção de Incidentes Cibernéticos**, **Gerenciamento de Crises Cibernéticas** e **Investigação de Ilícitos Cibernéticos**, além de **manuais** de referência (proteção de infraestruturas críticas de TIC, prevenção e mitigação de ameaças, gestão de identidades etc.). Confira a lista e as siglas oficiais no texto.
**Por que estudar isso:** liga Segurança da Informação (6.14) aos normativos (6.15). A FCC pode misturar as duas seções.
**Alerta de Pegadinha:** atribuir os protocolos à própria Res. 396 (eles estão na **Portaria 162**); confundir a ETIR com o Comitê de Segurança da Informação.
**Ação Prática:** faça um mapa mental "ENSEC-PJ → estruturas → 3 protocolos → manuais".

---

### 🎯 Assunto: Grupo Revisor de Código-Fonte (Portaria 131/2021) e Res. 443/2022
**O que estudar obrigatoriamente:** a **Portaria 131/2021** cria o **Grupo Revisor de Código-Fonte**, que analisa o código submetido à PDPJ-Br e ao PJe (qualidade, segurança, aderência aos padrões arquiteturais) antes da incorporação à plataforma. A **Res. 443/2022** determina que concursos e capacitações de servidores de TIC do Judiciário incluam **conteúdo sobre a PDPJ-Br**, e é por isso que você está estudando este guia. ⚠️ Confira composição e competências no texto.
**Por que estudar isso:** são normativos curtos que rendem questões diretas.
**Alerta de Pegadinha:** achar que o Grupo Revisor desenvolve os módulos (ele **revisa**).
**Ação Prática:** 2 flashcards por normativo: "o que institui" e "a quem se aplica".

---

### 🎯 Assunto: MoReq-Jus 2ª Edição (Res. 522/2023) ⚠️ conferir
**O que estudar obrigatoriamente:** o **MoReq-Jus** (Modelo de Requisitos para Sistemas Informatizados de Gestão de Processos e Documentos do Poder Judiciário) define os **requisitos** que um sistema de gestão processual/documental (GestDoc) deve atender para garantir **autenticidade, integridade, confiabilidade e preservação** dos documentos ao longo do tempo. A 2ª edição foi instituída como **obrigatória** pela **Res. 522/2023**. Núcleo de conteúdo: captura e registro; **classificação** (plano de classificação e **tabela de temporalidade**, ligados às Tabelas Processuais Unificadas); avaliação e **destinação** (eliminação ou guarda permanente); **preservação digital** e repositório arquivístico digital confiável; **metadados**; segurança, controle de acesso e **trilhas de auditoria**; assinatura digital. Os requisitos são graduados por obrigatoriedade (ex.: obrigatório / altamente desejável / facultativo). Contexto: gestão documental e de memória do Judiciário (Proname).
**Por que estudar isso:** é um tema arquivístico, estranho para quem é de TI, e por isso mesmo é o tipo de questão que derruba concorrente.
**Alerta de Pegadinha:** tratar o MoReq-Jus como sistema (é um **modelo de requisitos**); confundir tabela de temporalidade (prazos de guarda e destinação) com plano de classificação (organização dos documentos).
**Ação Prática:** leia o sumário do MoReq-Jus 2ª ed. e escreva uma frase por capítulo.

---

### 🎯 Assunto: Resolução CNJ 574/2024: Dados Públicos, Serviços Privados e Portal Unificado ⚠️ conferir
**O que estudar obrigatoriamente:** segundo a ementa do edital, trata do **acesso a dados judiciais públicos**, da oferta de **serviços privados** integrados à **PDPJ-Br** e de um **portal unificado** de acesso. Leia o texto integral focando em: quais dados são considerados públicos e como são disponibilizados (APIs, limites e condições); requisitos para empresas privadas oferecerem serviços na plataforma (credenciamento, segurança, LGPD); e o papel do portal unificado. Essa é a norma mais recente da lista e tende a ser cobrada com literalidade.
**Por que estudar isso:** é norma nova (2024), não aparece em material antigo e cai nos dois cargos.
**Alerta de Pegadinha:** afirmar que dados com segredo de justiça ou dados pessoais sensíveis entram no "acesso público"; contradições com a LGPD costumam ser a alternativa errada.
**Ação Prática:** leia a resolução duas vezes (na Fase 1 e na Fase 4) e grife prazos, competências e vedações.

---

# ✅ Observações finais

- Ordem de estudo recomendada (Fase 1, ~35h): **Ponte .NET→Java → Spring Boot → JPA/Hibernate/Envers/Flyway → Eureka/Zuul → Keycloak/OAuth → RabbitMQ/webhooks → Jakarta EE 11/JPA 3.2 → normativos**.
- Para o seu perfil, pule teoria de microsserviços, REST, Docker e Git: faça **só questões**.
- Os normativos devem ser **relidos na Fase 4** (memorização de curto prazo).
- Itens ⚠️ citam detalhes que devem ser conferidos no texto oficial (site do CNJ, documentação Jakarta/Hibernate/PostgreSQL, RFCs no rfc-editor.org).
