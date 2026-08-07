# 📘 Guia de Estudo Direcionado e Prescritivo — Desenvolvimento de Software, Frameworks e Frontend (TRT 4ª Região)

> Gerado cruzando as seções "1. Desenvolvimento Web", "2. Frameworks Java", "3. APIs e Web Services", "4. Elastic Stack", "6. Testes de Software" e "8. Inteligência Artificial e Machine Learning" do conteúdo programático oficial (`conteudo_programatico.md`) com questões da FCC em `questoes_tech_fcc.json`, pré-digeridas em 18 resumos (`guia_estudos_subagentes/raw_md/01_programacao_parte1_de_9.md` a `18_estrutura_dados_algoritmos.md`).

**Recorte deste guia:** os resumos de questões fornecidos cobrem, com profundidade, as áreas **1. Desenvolvimento Web, 2. Frameworks Java, 3. APIs e Web Services e 9. Banco de Dados** do edital (mais um pouco de 6. Testes de Software e 8. IA/ML). As áreas **Redes, Sistemas Operacionais, Segurança da Informação, Computação em Nuvem, Governança de TI, Arquitetura de Computadores e a maior parte de DevOps** praticamente não apareciam no lote de questões originalmente analisado — todas elas já ganharam guias dedicados próprios neste mesmo diretório (`GUIA_ESTUDO_REDES.md`, `GUIA_ESTUDO_SISTEMAS_OPERACIONAIS.md`, `GUIA_ESTUDO_SEGURANCA.md`, `GUIA_ESTUDO_GOVERNANCA_TI.md`, `GUIA_ESTUDO_ARQUITETURA_COMPUTADORES.md`, `GUIA_ESTUDO_BANCO_DADOS.md`), gerados depois deste com um pipeline mais rigoroso. As únicas lacunas remanescentes do edital sem cobertura em nenhum guia (Armazenamento SAN/RAID, Testes de Software além de JUnit/Mockito, DevOps além de menções pontuais, Inglês Técnico) seguem listadas ao final.

**Critério de corte:** qualquer tecnologia/linguagem presente nas questões mas ausente do edital foi descartada por completo (ver seção final "Fora do escopo"). Isso inclui, notavelmente, **PHP** (arquivo inteiro `16_php.md` ignorado) e **React/React Native/Vue.js** (o edital só cita Angular).

**Nota sobre metodologia (diferença em relação aos guias mais recentes):** este foi o primeiro guia produzido neste projeto, a partir de `questoes_tech_fcc.json` — um arquivo sem campo `disciplina`/`assuntos` por questão, ao contrário de todos os `questoes_*_fcc.json` usados depois. Por isso os 18 `raw_md` de origem foram montados por amostragem/curadoria temática, não com a verificação exaustiva de cobertura (cada `id_questao` citado e conferido programaticamente) nem o rastreamento de gabaritos contestados que os guias posteriores (Segurança, Governança de TI, Sistemas Operacionais, Banco de Dados, Arquitetura de Computadores) passaram a ter. O conteúdo abaixo é confiável como direcionamento de estudo, mas não tem a mesma garantia de cobertura total do banco nem sinalização de gabaritos duvidosos — se isso for importante, vale reprocessar este tópico do zero com o pipeline atual.

---

## 🧩 Desenvolvimento Web — Java e Orientação a Objetos

### 🎯 Assunto: Java – Sobrecarga (Overload) x Sobrescrita (Override)

**O que estudar obrigatoriamente:** diferença exata entre sobrecarga (mesmo nome, parâmetros diferentes, resolvida em compilação, pode estar na mesma classe) e sobrescrita (`@Override`, mesma assinatura, ocorre entre superclasse e subclasse, resolvida em runtime/polimorfismo). Regra de que **o tipo de retorno não faz parte da assinatura do método** em Java — dois métodos com mesmos parâmetros e retornos diferentes geram erro de compilação, não sobrecarga válida.

**Por que estudar isso:** é o tema mais recorrente de todo o banco de questões de programação (aparece em praticamente todas as 9 partes do arquivo de "Programação"). A FCC monta o enunciado descrevendo um comportamento e pede para identificar se é sobrecarga ou sobrescrita, ou insere um erro de compilação disfarçado de sobrecarga válida.

**Alerta de Pegadinha:** trocar a definição das duas nas alternativas (dizer que herança com mesma assinatura é "sobrecarga", ou que parâmetros diferentes na mesma classe é "sobrescrita"). Duas classes com métodos de mesmos parâmetros e retornos diferentes = **erro de compilação**, não sobrecarga (armadilha clássica citada em `03_programacao_parte3_de_9.md`).

**Ação Prática:** monte você mesmo pares de métodos (mesma classe/parâmetros diferentes vs. subclasse/mesma assinatura) e classifique cada um antes de checar a resposta. Treine identificar isso em trechos de código com formatação ruim (a banca reaproveita provas com OCR degradado).

---

### 🎯 Assunto: Java – Interfaces, Classes Abstratas e Herança

**O que estudar obrigatoriamente:** regras de interface (métodos implicitamente `public abstract`, atributos `public static final`, sem construtor); novidade do Java 8 (`default` e `static` methods em interface); regra de que **método privado não pode ser abstrato** (`private abstract` é combinação proibida); `super`; por que atributos/métodos `private` não são herdados; diferença entre interface (não tem atributos de instância nem construtor) e classe abstrata (pode ter ambos e métodos concretos).

**Por que estudar isso:** cobrado em quase todas as partes do banco, geralmente em questões "aponte a alternativa correta/incorreta" sobre OO. A FCC gosta de testar a regra da versão do Java (interface só com métodos abstratos era verdade até o Java 7; desde o Java 8 existem `default`/`static`).

**Alerta de Pegadinha:** afirmar "interface pode ter método com corpo" sem contexto de versão gera ambiguidade — preste atenção ao ano/contexto da questão. Alternativas com interface tendo construtor ou atributo `private` são sempre erradas. "Classe abstrata só pode ter métodos abstratos" também é armadilha (pode ter métodos concretos).

**Ação Prática:** escreva uma interface Java com `default` e `static` method e compile mentalmente; liste em uma tabela o que cada um (interface Java 7, interface Java 8+, classe abstrata) permite ou proíbe.

---

### 🎯 Assunto: Java – Modificadores de Acesso e Modificadores de Comportamento

**O que estudar obrigatoriamente:** separar **especificadores de acesso** (`public`/`private`/`protected`/default-pacote) de **modificadores que alteram comportamento** (`static`, `final`, `abstract`, `native`, `synchronized`, `volatile`, `transient`, `strictfp`). Diferença de `protected` em Java (classe + subclasse + **mesmo pacote**) versus `protected` em UML (só classe + subclasse).

**Por que estudar isso:** a FCC cobra essa distinção "especificador x modificador" de formas contraditórias em diferentes provas — é preciso saber a categoria de cada palavra-chave de cor, não só o efeito.

**Alerta de Pegadinha:** tratar `protected` do Java como idêntico ao `protected` de UML (Java libera acesso por pacote também, UML não). Confundir a categoria (dizer que `static` é um "especificador de acesso").

**Ação Prática:** monte uma tabela de duas colunas — "Especificadores de acesso" vs. "Modificadores" — e classifique cada palavra-chave Java nela até fazer de cabeça sem errar.

---

### 🎯 Assunto: Java – Tipos Primitivos, Trace de Código e Operadores

**O que estudar obrigatoriamente:** faixa de valores dos 8 tipos primitivos (`byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`) e por que `short` vai até 32767; curto-circuito `&&`/`||` vs. avaliação completa `&`/`|`; pré/pós-incremento (`x++` vs `++x`) em expressões compostas; truncamento `double`→`int`; promoção numérica automática (ex.: operação com `long` promove todo o resultado a `long`); `Math.ceil`/`Math.floor`/`Math.round`.

**Por que estudar isso:** questões de "teste de mesa" (simular execução linha a linha) são as mais trabalhosas e recorrentes do banco — aparecem em praticamente toda parte do arquivo de programação, testando se você realmente executa o código mentalmente em vez de "achar" a resposta.

**Alerta de Pegadinha:** off-by-one em limites de loop/array (`array[tamanho]` em vez de `array[tamanho-1]`); trocar `&&` por `&` (ou `||` por `|`) mudando se a segunda condição é sempre avaliada; ordem de avaliação em `cont1 += cont3++`; mnemônico `Math.ceil` = CÉU (arredonda pra cima), `Math.floor` = CHÃO (pra baixo).

**Ação Prática:** pegue trechos de loop com incremento não-unitário e módulo (`%`) e faça o trace completo em papel, anotando o valor de cada variável a cada iteração, antes de olhar a resposta.

---

### 🎯 Assunto: Estruturas de Dados e Algoritmos (Busca, Ordenação, Recursão, Pilha)

**O que estudar obrigatoriamente:** busca sequencial x busca binária (reconhecer pelo cálculo de ponto médio `m=(i+f)/2` e a exigência de vetor ordenado); bubble sort e insertion sort implementados em Java com lacunas para completar; recursão (caso base, chamada a si mesma, por que a versão recursiva sem memoização é mais lenta que a iterativa — ex. Fibonacci); pilha (`push`/`pop`, semântica LIFO, `pop` remove e retorna o topo).

**Por que estudar isso:** é competência de programação transversal a Java/Python cobrada junto com sintaxe de linguagem — a FCC pede para completar lacunas de código ou identificar o algoritmo a partir do trecho, não decorar nomes.

**Alerta de Pegadinha:** off-by-one nos limites do laço (`j < tamanho` em vez de `j < tamanho - 1`, furando o array na última comparação); sinal de incremento/decremento trocado como condição de parada errada; nomes de algoritmo inventados ("Cookie sort", "Hash sort") como distrator — só existem bubble, selection, insertion, merge, quick, heap, counting, radix, bucket; achar que `pop()` só consulta sem remover.

**Ação Prática:** implemente busca binária, bubble sort e insertion sort do zero em Java sem consultar nada, prestando atenção especial às condições de parada (`<=` vs `<`, `tamanho` vs `tamanho-1`).

---

## 🧩 Frameworks Java (Jakarta EE, Spring, JPA/Hibernate)

### 🎯 Assunto: Spring Framework / Spring Boot / Spring Cloud

**O que estudar obrigatoriamente:** `@SpringBootApplication`, `SpringApplication.run(Classe.class, args)`; injeção de dependência (`@Component`, `@Autowired`); `@RestController`, `@RequestMapping`, `@RequestParam`; Spring Data `CrudRepository`; Spring Cloud — Eureka Server (`@EnableEurekaServer`, porta padrão 8761), Zuul (`@EnableZuulProxy`), Spring Cloud Gateway, Config Server (Git/JDBC/filesystem); conceito de "fat JAR" e `application.properties`.

**Por que estudar isso:** é o segundo tema mais cobrado do banco (atrás só de OO em Java), presente em quase toda parte do arquivo de programação — a FCC testa reconhecimento exato de anotação, não só o conceito de Spring.

**Alerta de Pegadinha:** anotações inventadas mas plausíveis (`@EnableNetflixEureka`, `@Obsolete`) no lugar das reais (`@EnableEurekaServer`); confundir a porta/dependência do Eureka; misturar Eureka (service discovery) com Zuul (gateway/proxy) nas descrições.

**Ação Prática:** memorize uma "cola" com as anotações-chave (`@SpringBootApplication`, `@RestController`, `@Autowired`, `@EnableEurekaServer`, `@EnableZuulProxy`) e o que cada uma faz — a banca troca por nomes inventados semelhantes, então reconhecimento rápido do nome exato é o que decide a questão.

---

### 🎯 Assunto: Jakarta EE – Servlet / JSP / JSF / EJB

**O que estudar obrigatoriamente:** ciclo de vida do Servlet (`init`→`service`→`destroy`, `doGet`/`doPost`); os 9 objetos implícitos do JSP (`page`, `config`, `request`, `response`, `out`, `session`, `application`, `pageContext`, `exception`) agrupados por categoria (servlet, I/O, contextuais, erro); as 4 tags JSP — scriptlet `<% %>` (executa, não imprime), expressão `<%= %>` (imprime valor), diretiva `<%@ %>` (page/include/taglib), declaração `<%! %>`; EL `${}` e JSTL `<c:forEach>`; `request.getParameter()` (form, retorna String) x `request.getAttribute()` (repassado via `forward`, retorna `Object`, exige cast) x `getParameterValues()` (checkbox/múltiplos valores); arquivos de config `web.xml`/`faces-config.xml`; anotações EJB (`@Stateless`, `@Stateful`, `@Remote`, `@EJB`) e JSF (`@ManagedBean`, `@SessionScoped`) sem confundir com as de JPA (`@Entity`) — são de frameworks diferentes dentro do Jakarta EE.

**Por que estudar isso:** "Jakarta EE 8" no edital é guarda-chuva amplo, e o banco de questões mostra que a FCC historicamente cobra Servlet/JSP com muito detalhe de sintaxe e ciclo de vida — é um dos blocos mais densos do banco inteiro.

**Alerta de Pegadinha:** trocar `<%` (scriptlet) por `<%=` (expressão) quando o enunciado pede para imprimir um valor; esquecer o cast obrigatório em `getAttribute()` (retorna `Object`); afirmar que Tomcat suporta EJB nativamente (falso — Tomcat é *web container* puro; JBoss/WildFly/GlassFish são *servidor de aplicação completo*); misturar anotação de EJB com anotação de JPA na mesma questão.

**Ação Prática:** decore a tabela completa de tags JSP e a lista dos 9 objetos implícitos por categoria; treine identificar, em um trecho de código, se cada linha usa `getParameter` ou `getAttribute` e por quê.

---

### 🎯 Assunto: JPA / Hibernate

**O que estudar obrigatoriamente:** `EntityManager` x `EntityManagerFactory` (retorno de `Persistence.createEntityManagerFactory(...)`); `persistence.xml`/persistence-unit; anotações `@Entity`, `@Id`, `@GeneratedValue`, `@Column`, `@Transient`, `@Embeddable`, `@MappedSuperclass`; relacionamentos `@OneToMany`/`@ManyToOne`/`@ManyToMany` e qual lado leva `mappedBy` (lado "não-dono"); `FetchType.LAZY` (padrão) x `EAGER`; ciclo de vida da entidade (transient → managed/persistent → detached) e que `persist()`/`save()` só emite o INSERT no flush/commit, não na chamada; Criteria API (`Restrictions.eq/like/gt/ne`), HQL básico (SELECT geralmente omitido); `hibernate.hbm2ddl.auto` (Hibernate puro) x `spring.jpa.hibernate.ddl-auto` (Spring Boot); comportamento de coleções — remover uma **entidade** da coleção não a apaga do banco por padrão (só com cascade); isso só ocorre automaticamente com **value types**.

**Por que estudar isso:** é o maior bloco temático do arquivo de Banco de Dados (~18 questões só nessa parte), com nível de detalhe de API real (nomes de classe/método exatos), não conceito superficial.

**Alerta de Pegadinha:** cardinalidade invertida (confundir "1 departamento tem muitos funcionários" com o inverso); `mappedBy` no lado dono errado; trocar `hibernate.hbm2ddl.auto` por `spring.jpa.hibernate.ddl-auto` no contexto errado (Hibernate puro vs. Spring Boot); achar que ORM funciona com qualquer tipo de banco (é sempre relacional); nomes de classe inventados (`Constraint`, `FetchMode`, `Filter`) no lugar de `Restrictions`; atribuir retorno de `EntityManagerFactory` a variável do tipo `EntityManager`.

**Ação Prática:** desenhe o ciclo `novo → persist() → managed → detached` com uma seta indicando exatamente em que ponto o SQL é de fato emitido; treine identificar qual lado de um `@OneToMany`/`@ManyToOne` deveria ter `mappedBy` a partir da descrição da regra de negócio.

---

### 🎯 Assunto: JDBC

**O que estudar obrigatoriamente:** fluxo `Class.forName("driver")` (lança `ClassNotFoundException`) → `DriverManager.getConnection(...)` (lança `SQLException`); `Statement` x `PreparedStatement` (placeholder `?`, indexação começa em **1**, não em 0) x `ResultSet` (`rs.next()` para percorrer); `execute()` (qualquer SQL) x `executeQuery()` (SELECT, retorna `ResultSet`) x `executeUpdate()` (INSERT/UPDATE/DELETE, retorna `int` de linhas afetadas).

**Por que estudar isso:** é um padrão que se repete em pelo menos 7 questões do arquivo de Banco de Dados isoladamente — a FCC tem uma "resposta padrão" preferida (a dupla `ClassNotFoundException` + `SQLException`) para qualquer trecho de conexão.

**Alerta de Pegadinha:** nomes de exceção inventados e plausíveis (`DriverException`, `JDBCException`, `MySQLException`) no lugar das reais; métodos inexistentes em `ResultSet` (`getValue()`) no lugar de `getString()`/`getInt()`; trocar `executeQuery` por `executeUpdate`; esquecer que o índice do parâmetro em `setInt(1, x)` começa em 1.

**Ação Prática:** decore a dupla `ClassNotFoundException`+`SQLException` como "resposta padrão FCC" para trecho de conexão; escreva de memória um `PreparedStatement` completo com `?`, `setInt`/`setString` e `executeQuery`/`executeUpdate` corretos.

---

### 🎯 Assunto: MapStruct

**O que estudar obrigatoriamente:** `@Mapper` (marca a interface do mapeador) x `@Mapping` (mapeamento de campo específico, ex. `source`/`target`).

**Por que estudar isso:** citado explicitamente no edital (item 2, Frameworks Java) e aparece pontualmente nas questões — tema pequeno mas de cobrança certeira/decoreba.

**Alerta de Pegadinha:** trocar o papel de `@Mapper` e `@Mapping` entre si.

**Ação Prática:** escreva uma interface MapStruct mínima de memória com `@Mapper` na interface e `@Mapping(source=..., target=...)` em um método.

---

### 🎯 Assunto: Servidores de Aplicação (Tomcat, JBoss, WildFly)

**O que estudar obrigatoriamente:** distinção **Web/Servlet Container** (Tomcat — só Servlet/JSP, sem EJB nativo) x **Servidor de Aplicação Java EE completo** (JBoss/WildFly, GlassFish — suportam EJB); estrutura básica do WildFly/JBoss (arquivos de configuração como `standalone.conf`/`domain.conf` ficam em `bin/`).

**Por que estudar isso:** aparece repetidamente como pegadinha isolada em quase toda parte do banco — a FCC gosta de reafirmar (errado) que o Tomcat suporta EJB para testar se você decorou a distinção.

**Alerta de Pegadinha:** afirmar que Tomcat é "servidor de aplicação completo" ou que suporta EJB nativamente (falso); confundir onde ficam os arquivos de configuração do JBoss/WildFly (ficam em `bin/`, não em `config/`). Note que o edital só cita **JBoss, Tomcat e WildFly** — GlassFish/WebLogic/WebSphere podem aparecer como distratores nas alternativas, mas não precisam ser estudados a fundo.

**Ação Prática:** monte a frase-cola "Tomcat = container web puro; JBoss/WildFly = servidor de aplicação completo com suporte a EJB" e aplique em toda questão que mencionar esses nomes.

---

### 🎯 Assunto: JUnit / Mockito

**O que estudar obrigatoriamente:** anotações `@Test`, `@Before`/`@After`, `@BeforeClass`/`@AfterClass`; assinatura completa de `assertEquals(esperado, atual, [delta])` — ordem dos parâmetros importa, e o `delta` (terceiro parâmetro) define a margem de erro aceita em comparações de ponto flutuante; Mockito básico (`thenReturn`, verificar se a configuração do mock é coerente com o assert esperado).

**Por que estudar isso:** citado explicitamente no edital (item 6, Testes de Software) e aparece de forma consistente (2-3 questões por parte) no banco.

**Alerta de Pegadinha:** inverter a ordem de `assertEquals(esperado, atual)` nas alternativas; delta igual a `0.0` torna a comparação estrita (pode fazer um teste "certo" falhar por divisão inteira, ex. `2.0` esperado vs. `2` retornado); mock configurado para retornar `false` enquanto o teste espera sucesso — nesse caso **o teste falha, não o código de produção** (armadilha de interpretação, não de sintaxe).

**Ação Prática:** ao ler uma questão de Mockito, separe mentalmente "o que o mock foi configurado para retornar" de "o que o assert espera" antes de decidir se o teste passa ou falha.

---

## 🧩 Python e IA/ML

### 🎯 Assunto: Python — Sintaxe e Bibliotecas de Dados

**O que estudar obrigatoriamente:** sintaxe fundamental (`def`, indentação, `for x in lista`, `try/except` sem `catch`); operador ternário correto (`valor_se_verdadeiro if condição else valor_se_falso` — **não existe** `condição ? valor : valor` em Python); `and`/`or`/`not` (não `&&`/`||`); `set` para deduplicação com custo O(1) médio; `sorted(reverse=True)`; `json.loads`; pandas (`groupby().mean()`, média ponderada, filtros); scikit-learn (`train_test_split`, métricas precision/recall/F1); name mangling (`__atributo`); case sensitivity rigorosa (ex.: `train_test_split` correto, `test_train_split` não existe).

**Por que estudar isso:** Python é citado explicitamente no edital (Desenvolvimento Web, IA/ML e também Linux) e é o terceiro tema mais cobrado do arquivo de programação (~8-10 questões por parte).

**Alerta de Pegadinha:** usar sintaxe de outra linguagem disfarçada de Python nas alternativas (`&&`, `Contains()`); inventar métodos com nome quase certo mas capitalização errada (a banca conta com o candidato "reconhecer por cima"); confundir o ternário do Python com o de Java/C.

**Ação Prática:** reescreva de cabeça, em Python puro, um trecho equivalente de Java com `if/else`, laço e tratamento de exceção — é o melhor treino para não "vazar" sintaxe de outra linguagem.

---

### 🎯 Assunto: IA/ML — Conceitos de Avaliação e Ferramentas

**O que estudar obrigatoriamente:** overfitting; métricas de classificação (precision, recall, F1) e de regressão; curva ROC; `train_test_split` do scikit-learn; existência das ferramentas citadas no edital — Scikit-Learn, Keras, PyTorch (mesmo que superficialmente).

**Por que estudar isso:** citado explicitamente no edital (item 8) mas a cobertura no banco de questões fornecido é leve (aparece via scikit-learn dentro das questões de Python, não como bloco temático próprio) — trate como lacuna a reforçar direto pelo edital/documentação oficial das ferramentas, não só pelas questões.

**Alerta de Pegadinha:** erro de grafia/capitalização no nome de função do scikit-learn (`train_test_split`) usado como distrator.

**Ação Prática:** como o banco de questões tem pouca amostra aqui, complemente com leitura da documentação oficial do scikit-learn (função `train_test_split`, `classification_report`) e definições de overfitting/curva ROC — não dá para ser prescritivo em pegadinhas específicas com os dados disponíveis.

---

## 🧩 Frontend (HTML5, CSS3, JavaScript, Angular)

### 🎯 Assunto: HTML5 — Semântica e Acessibilidade

**O que estudar obrigatoriamente:** tags semânticas (`<nav>`, `<aside>`, `<header>`, `<footer>`, `<section>`/`<article>`, `<figure>`/`<figcaption>`, `<dl>`/`<dt>`/`<dd>`, `<pre>`); tags novas de mídia (`<video>`/`<source>`/`<track>`, `<audio>`, `<canvas>`, `<datalist>`); atributos novos de `<input>` (`pattern`, `placeholder`, `type=tel/email/date`); os **4 princípios WCAG (POUR)**: Perceptível, Operável, Compreensível, Robusto.

**Por que estudar isso:** tema muito recorrente nos três arquivos de "Arquitetura Web/APIs" — a FCC cobra tanto a lista de tags novas quanto os princípios WCAG com trocas de palavra sutis.

**Alerta de Pegadinha:** confundir `pattern` (regex de validação, sem JS) com `placeholder` (texto de dica) — aparecem juntos como distratores; WCAG com opções de nome "quase certo" mas inventadas; tags obsoletas do HTML4 (`<frame>`, `<font>`, `<center>`, `<acronym>`, `<applet>`, `<big>`) misturadas com válidas como se ainda existissem.

**Ação Prática:** decore os 4 princípios WCAG na ordem POUR e a lista de tags HTML5 novas vs. removidas — são itens de memorização direta, não de raciocínio.

---

### 🎯 Assunto: CSS3 — Seletores, Box Model e Responsividade

**O que estudar obrigatoriamente:** seletores avançados (`:not()`, `::first-letter`, `::selection`, `:only-child`, `:hover`, `:focus`); seletores de atributo (`[attr]`, `[attr~=]`, `[attr^=]`, `[attr$=]`, `[attr*=]`); combinadores (`+`, `>`, espaço); `box-sizing` (`content-box` padrão x `border-box`); shorthand de `margin`/`padding` (4/3/2 valores); `float` x `display:flex`; media queries (`@media`) e unidades responsivas (`vw`/`vh`); prefixos de vendor (`-webkit-` = Chrome/Safari/Opera, `-moz-` = Firefox).

**Por que estudar isso:** é o tema mais numeroso dos três arquivos de "Arquitetura Web/APIs" (14-20 questões por arquivo) — a FCC costuma pedir para aplicar o seletor a um trecho de HTML real, não só reconhecer a sintaxe.

**Alerta de Pegadinha:** confundir `#` (id) com `.` (classe) nos seletores; trocar `padding` (interna) com `margin` (externa); atribuir prefixo de vendor ao navegador errado; achar que `*` de DTD ou `:nth-child` seguem a mesma base de índice de outros contextos (cuidado com base 0 x base 1, ex. `:eq()` do jQuery é 0-indexed).

**Ação Prática:** pegue um trecho de HTML real e aplique manualmente 5 seletores CSS diferentes (incluindo um de atributo e um pseudo-elemento) antes de checar contra ferramenta/gabarito.

---

### 🎯 Assunto: JavaScript e Manipulação de DOM

**O que estudar obrigatoriamente:** os 4 métodos reais de seleção (`getElementById`, `getElementsByTagName`, `getElementsByClassName`, `getElementsByName` — sempre no plural exceto o primeiro); `querySelector`; `innerHTML` x `.value`; `classList.toggle`; `appendChild`/`createElement`; `childNodes`/`firstChild` (índice baseado em 0); `==` x `===` (tipo importa no segundo); `for...in` (propriedades) x `for...of` (valores iteráveis); `JSON.stringify`/`JSON.parse` e tipos válidos em JSON (string, number, object, array, boolean, null — **não** existe function/date/undefined em JSON).

**Por que estudar isso:** presente de forma constante em quase todo arquivo do banco — é testado tanto isoladamente quanto misturado com JSP/Java (ex.: JS validando formulário que será processado por Servlet).

**Alerta de Pegadinha:** métodos inventados mas plausíveis (`getElementByType`, `getElementbyId` sem "s"); confundir `.css()`/`.html()` (jQuery) com `.style`/`.innerHTML` (JS puro) na mesma alternativa; usar `getElementById("#id")` (o `#` é sintaxe de CSS/jQuery, não de `getElementById`); oferecer `function`/`date`/`undefined` como tipo JSON válido.

**Ação Prática:** memorize os 4 métodos DOM nativos com plural certo e treine reescrever um trecho jQuery em JS vanilla puro (e vice-versa) até não hesitar.

---

### 🎯 Assunto: jQuery

**O que estudar obrigatoriamente:** seletores (`#id`, `.class`), `.val()`, `.addClass()`, `.hide()`/`.fadeIn()`/`.delay()`, `.html()`, `slideToggle()`, `:odd`/`:even` (índice começa em **0**, então índice 0 é considerado par/`:even`).

**Por que estudar isso:** citado no edital (Bibliotecas) e casado quase sempre com Bootstrap no mesmo enunciado no arquivo de Frontend.

**Alerta de Pegadinha:** confundir `.html()` (jQuery) com `innerHTML` (JS puro); erro de base em `:odd`/`:even` (índice 0 é par, gera confusão).

**Ação Prática:** liste os pares "método jQuery → equivalente JS vanilla" (`.val()`↔`.value`, `.html()`↔`.innerHTML`, `.addClass()`↔`.classList.add()`) e treine a tradução nos dois sentidos.

---

### 🎯 Assunto: TypeScript

**O que estudar obrigatoriamente:** tipagem de array `T[]` x `Array<T>`; tuplas (`[tipo1, tipo2]`); `enum` (usa `=` entre propriedade e valor) x `class`/interface (usa `:` para tipagem); união de tipos `A|B`; parâmetro opcional `?`; retorno `void`.

**Por que estudar isso:** citado no edital (Linguagens) e testado no arquivo de Frontend com ~8 questões, sempre pela diferença sintática fina entre construções parecidas.

**Alerta de Pegadinha:** confundir a sintaxe de `enum` (`=`) com a de `class`/tipagem (`:`); oferecer `push()` (JS/TS correto) misturado com `append()` (Python, errado) como distrator de método de array.

**Ação Prática:** escreva o mesmo dado como array (`T[]`), `Array<T>`, tupla e `enum`, comparando a sintaxe lado a lado.

---

### 🎯 Assunto: Angular / Angular Material

**O que estudar obrigatoriamente:** interpolação `{{ }}`; `app-root`; diretivas (`ng-bind`, `ng-model` — versões antigas/AngularJS às vezes aparecem misturadas); import de módulos (`@angular/material`); uso de Service Worker para PWA (cache de recursos, funcionamento offline — **SSR/Angular Universal e `localStorage` não resolvem** esse requisito).

**Por que estudar isso:** é o único framework SPA citado no edital (nem React nem Vue constam) — qualquer questão sobre "framework JS de frontend" do concurso real vai ser sobre Angular.

**Alerta de Pegadinha:** nomes de import/caminho inventados no Angular Material (`ButtonModule` com caminho errado); confundir Service Worker com SSR como solução de "funcionar offline".

**Ação Prática:** treine a sintaxe de import ES6 de módulos Angular (`import { X } from '@angular/...'`) e o conceito de Service Worker como proxy cache entre navegador e rede.

---

### 🎯 Assunto: Node.js

**O que estudar obrigatoriamente:** `require()` (padrão CommonJS do Node); módulo `http`; `EventEmitter` (base do padrão publisher/subscriber); `npm`; rota básica Express (`app.post(req, res)`).

**Por que estudar isso:** citado explicitamente no edital (Frameworks JavaScript) e testado no arquivo de Frontend com ~6 questões.

**Alerta de Pegadinha:** confundir `require` (CommonJS/Node) com `import`/`from` (ES6/módulo de browser) como se fossem intercambiáveis em todo contexto.

**Ação Prática:** escreva um mini-servidor HTTP Node com `require('http')` e uma rota Express básica de memória.

---

### 🎯 Assunto: Bootstrap

**O que estudar obrigatoriamente:** grid system e breakpoints (`sm≥576px`, `md≥768px`, `lg≥992px`, `xl≥1200px` — mobile-first, "a partir de X"); `container`/`container-fluid`; `d-flex`; `collapse`; `tooltip`; `pagination`; cálculo de largura `col-X` = X/12 × 100%; data-attributes (`data-toggle="collapse"` x `data-toggle="tooltip"`).

**Por que estudar isso:** citado no edital (Bibliotecas) e é o tema **isolado mais cobrado** de todo o arquivo de Frontend (~14 questões) — decoreba de tabela de breakpoints compensa muito.

**Alerta de Pegadinha:** trocar `col-sm/md/lg/xl` entre si ou inverter a lógica mobile-first ("a partir de" x "menor que"); confundir `data-toggle="collapse"` com `data-toggle="tooltip"` em enunciados quase idênticos.

**Ação Prática:** decore a tabela de breakpoints Bootstrap de cor (`xs<576, sm≥576, md≥768, lg≥992, xl≥1200`) e pratique calcular `col-X` para valores comuns (4, 6, 8, 12).

---

## 🧩 XML, APIs e Web Services

### 🎯 Assunto: XML / DTD / XSD

**O que estudar obrigatoriamente:** cardinalidade DTD — `?` (zero ou uma), `*` (zero ou muitas), `+` (uma ou muitas), `,` (sequência), `|` (escolha); sintaxe `<!ELEMENT>`/`<!ATTLIST>` e os três tipos de atributo `#REQUIRED`/`#IMPLIED`/`#FIXED`; sintaxe XSD (`xs:element`, `xs:attribute`, `xs:complexType`) e facets de `xs:restriction` (`pattern`, `length`, `minInclusive`/`maxInclusive`, `enumeration`) — **não confundir sintaxe DTD com XSD na mesma alternativa**; regras de "well-formed XML" (um único elemento raiz, tags sempre fechadas, sem sobreposição, case sensitive).

**Por que estudar isso:** citado no edital (item 1, Tecnologias — XML) e é um dos temas mais numerosos nos três arquivos de Frontend/Arquitetura Web (7-13 questões cada).

**Alerta de Pegadinha:** `*` do DTD significa "zero ou **muitas**", não "zero ou uma" (isso é `?`) — pegadinha clássica e muito repetida; misturar sintaxe DTD (`<!ELEMENT>`) com XSD (`xs:element`) na mesma alternativa; inverter a regra HTML (tolerante, não case sensitive) com XML (case sensitive, rígido).

**Ação Prática:** monte a tabela de cardinalidade DTD (`A` uma vez, `A+` uma-ou-mais, `A?` zero-ou-uma, `A*` zero-ou-muitas) e treine ler DTDs simples até reconhecer os símbolos automaticamente, sem precisar pensar.

---

### 🎯 Assunto: JSON

**O que estudar obrigatoriamente:** `JSON.stringify`/`JSON.parse`; tipos de dado válidos em JSON (string, number, object, array, boolean, null).

**Por que estudar isso:** citado no edital (Tecnologias) e recorrente como bloco próprio (~7 questões) no primeiro arquivo de Arquitetura Web.

**Alerta de Pegadinha:** oferecer `function`, `date` ou `undefined` como tipo JSON válido (nenhum dos três existe em JSON puro).

**Ação Prática:** escreva um objeto JSON com todos os 6 tipos válidos representados e confirme que consegue nomear os 3 tipos inválidos de cabeça.

---

### 🎯 Assunto: REST / SOAP / Swagger-OpenAPI / JWT / Webhooks

**O que estudar obrigatoriamente:** diferenças estruturais entre REST (JSON/XML sem envelope fixo), SOAP (envelope/body XML) e a existência do WSDL como descrição de serviço SOAP; anotações Swagger/OpenAPI (**`@Operation`/`@Parameter` são OpenAPI 3 — versão atual; `@ApiOperation`/`@ApiParam` são Swagger 2, versão antiga**); estrutura de URL base do Swagger (host + basePath + schemes); JWT tem 3 partes (header/payload/signature) e **apenas `typ` e `alg` ficam no header** (`iss`, `exp`, `sub`, `aud`, `jti` pertencem ao payload); Webhook como alternativa a polling (servidor notifica o cliente via callback HTTP, em vez do cliente consultar periodicamente).

**Por que estudar isso:** citado explicitamente no edital (item 3) e testado com bom volume (~8 questões) no primeiro arquivo de Arquitetura Web — a FCC mistura versão antiga/nova das anotações Swagger de propósito.

**Alerta de Pegadinha:** usar anotação Swagger 2 (`@ApiOperation`) quando a questão pede OpenAPI 3 (`@Operation`) ou vice-versa; colocar campos do payload JWT (`exp`, `sub`) como se fossem do header; confundir estrutura de mensagem SOAP com REST/XML-RPC.

**Ação Prática:** monte uma tabela "Swagger 2 x OpenAPI 3" com as anotações equivalentes lado a lado, e memorize que o header do JWT só tem `typ` + `alg`.

---

## 🧩 Elastic Stack (cobertura leve — reforçar pelo edital)

### 🎯 Assunto: Elastic Stack (Elasticsearch, Logstash, Kibana)

**O que estudar obrigatoriamente:** o fluxo padrão Filebeat (coleta) → Logstash (processa) → Elasticsearch (indexa) → Kibana (visualiza).

**Por que estudar isso:** citado explicitamente no edital como item próprio (item 4), mas no banco de questões fornecido aparece só en passant, dentro do arquivo de Arquitetura Web (uma menção ao fluxo, sem bloco próprio) — trate como lacuna de dados, não como tema pequeno de verdade.

**Alerta de Pegadinha:** não há amostra suficiente no banco fornecido para mapear pegadinhas específicas da FCC neste tema.

**Ação Prática:** como há poucos dados de questões, complemente estudando a documentação oficial do Elastic Stack diretamente (o papel de cada componente no pipeline: coleta → processamento → indexação → visualização).

---

## 🧩 Fundamentos de Linguagens e Paradigmas

### 🎯 Assunto: Tipagem, Paradigmas e Fases de Compilação

**O que estudar obrigatoriamente:** tipagem estática x dinâmica x forte x fraca (são **dois eixos independentes** — Python/Ruby são dinâmicas **e fortes**, não é a mesma coisa); paradigmas (procedural, funcional, lógico, orientado a objetos); passagem de parâmetro por valor x por referência; fases de compilação (análise léxica → sintática → semântica); assinatura de método em Java **não inclui** modificador de visibilidade nem tipo de retorno.

**Por que estudar isso:** aparece de forma recorrente no arquivo "Outros/Diversos" como fundamento teórico que sustenta as questões de Java/Python/JS do resto do banco — a FCC gosta de testar a teoria da linguagem isoladamente, sem código.

**Alerta de Pegadinha:** tratar "fracamente tipada" como sinônimo de "dinamicamente tipada" (são eixos diferentes — dá pra ser dinâmica e forte ao mesmo tempo, como Python); achar que assinatura de método em Java inclui a visibilidade.

**Ação Prática:** monte uma matriz 2×2 (estática/dinâmica × forte/fraca) e posicione Java, Python, JavaScript e C nela — é o jeito mais rápido de nunca mais confundir os dois eixos.

---

# ✅ Fora do escopo (ignorado deliberadamente)

As tecnologias abaixo aparecem nas questões do banco, mas **não constam no edital do TRT4** e foram descartadas por completo, conforme a regra de filtragem estrita:

| Tecnologia/Linguagem | Onde apareceria | Motivo da exclusão |
|---|---|---|
| **PHP** (superglobais, arrays, PDO, sessões) | Arquivo `16_php.md` inteiro + trechos em `13_banco_de_dados` e `15_outros` | Não consta em nenhum item do edital |
| **Delphi/VCL** (TTable, TQuery, componentes, .pas/.dfm/.dpr) | Partes 8/9 de programação | Não consta no edital |
| **Ruby / Ruby on Rails** | Arquivo `15_outros_diversos.md` | Não consta no edital |
| **C e C++** (ponteiros, STL, `#define`) | Partes 2, 5, 7, 8 de programação | Não consta no edital (só Java/JS/TS/Python/Angular estão listados) |
| **C# / .NET / VB.NET / ADO.NET / EF Core** | Partes 4, 5, 8, 9 e `13_banco_de_dados` | Não consta no edital |
| **Objective-C** | Parte 5 de programação | Não consta no edital |
| **VBScript** | Arquivo `15_outros_diversos.md` | Não consta no edital |
| **React / React Native / Vue.js** | Partes 1, 2 de programação e `17_frontend_frameworks.md` | Edital cita só **Angular** em Frameworks/Linguagens JS |
| **Java Swing/AWT** (JButton, layouts desktop) | Partes 4, 8 de programação | Edital é focado em Desenvolvimento **Web**, sem menção a GUI desktop |
| **Struts2 / JBoss Seam** | Arquivo `15_outros_diversos.md` e parte 7 | Frameworks de terceiros, não fazem parte da spec "Jakarta EE 8" citada no edital |
| **GlassFish / WebLogic / WebSphere** | Diversas partes (como contraste a Tomcat/JBoss) | Edital cita só **JBoss, Tomcat e WildFly** como servidores de aplicação |

---

# ⚠️ Áreas do edital sem dados suficientes neste guia

O banco de questões usado para *este* guia (`questoes_tech_fcc.json`) era fortemente concentrado em Desenvolvimento/Frameworks/APIs/Banco de Dados — por isso, quando ele foi escrito, várias áreas do edital ficaram sem cobertura. A maior parte delas **já foi processada depois, cada uma com seu próprio lote de questões e guia dedicado** (pipeline mais rigoroso, com verificação exaustiva de cobertura e sinalização de gabaritos contestados):

- ~~Redes de Computadores~~ → `GUIA_ESTUDO_REDES.md`
- ~~Sistemas Operacionais~~ → `GUIA_ESTUDO_SISTEMAS_OPERACIONAIS.md`
- ~~Segurança da Informação~~ → `GUIA_ESTUDO_SEGURANCA.md`
- ~~Governança de TI~~ → `GUIA_ESTUDO_GOVERNANCA_TI.md`
- ~~Arquitetura de Computadores~~ → `GUIA_ESTUDO_ARQUITETURA_COMPUTADORES.md`
- ~~Banco de Dados~~ (versão aprofundada, substitui a cobertura leve deste guia) → `GUIA_ESTUDO_BANCO_DADOS.md`
- ~~Arquitetura de Software~~ (padrões GoF, SOA/microsserviços, REST/SOAP) → `GUIA_ESTUDO_ARQUITETURA_SOFTWARE.md`

As lacunas que **ainda restam sem guia dedicado**, por falta de um `questoes_*_fcc.json` próprio (exigiriam rodar o `scraper.py` para coletar um lote específico antes de gerar um guia direcionado):

- **Computação em Nuvem** como tópico isolado (IaaS/PaaS/SaaS, modelos NIST) — hoje só aparece de forma esparsa dentro de outros guias (Sistemas Operacionais, Governança de TI)
- **Armazenamento** (sistemas de arquivos, SAN, RAID, backup) como bloco próprio — parte já tratada dentro de Sistemas Operacionais e Banco de Dados
- **DevOps/DevSecOps** (Docker, Kubernetes, Jenkins, Git/GitFlow, Keycloak/OAuth2, CI/CD, proxy reverso/load balancing) — citado en passant em vários guias, mas sem volume suficiente para um bloco prescritivo próprio
- **Testes de Software** além de JUnit/Mockito (cobertura de código, estratégias de teste)
- **Elastic Stack**, **Servidores de Aplicação** e **IA/ML** como blocos aprofundados — este guia já traz uma cobertura leve de cada um acima, mas rasa
- **Inglês Técnico**
