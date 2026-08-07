# 📘 Guia de Estudo Direcionado e Prescritivo — Raciocínio Lógico-Matemático (TRT 4ª Região)

> Gerado cruzando a seção "2. Raciocínio Lógico-Matemático" do conteúdo programático oficial (`conteudo_programatico.md`) com as **800 questões** de RLM da FCC em `questoes_rlm_fcc.json`, pré-digeridas em 5 partes (`guia_estudos_subagentes/raw_md/32..36_rlm_parteN_de_5.md`).

**Recorte deste guia:** o edital define "Raciocínio Lógico-Matemático" de forma **restrita** — só Aritmética básica (inteiros/racionais, divisibilidade, frações, razão/proporção/regra de três/porcentagem) e Lógica (estruturas lógicas, raciocínio verbal/sequencial/espacial/temporal, lógica proposicional). O banco de questões, por vir de um pool genérico de "Matemática para concursos", traz **muito conteúdo de Matemática pura fora deste edital** (Álgebra Linear, Geometria, Funções, Progressões, Probabilidade, Estatística, Matemática Financeira) — filtrado igual à rodada de TI (PHP/Delphi/React) e listado na seção final "Fora do escopo".

**Nota sobre qualidade dos dados:** os subagentes notaram que as **tags `assuntos` do banco às vezes enganam** — ex.: um problema de substituição simples de idade veio rotulado "Sistemas Lineares" (890745), um problema de puro raciocínio de pior caso veio rotulado "Análise Combinatória em Matemática" (566682), e um problema de divisibilidade veio rotulado "Progressão Aritmética" (556022). Não confie cegamente na tag — a classificação deste guia foi feita lendo o enunciado real. Também há **questões com enunciado ambíguo ou historicamente contestado** nos comentários (partilha de bens em `1956889`, votação em `1999220`, soma de 3 algarismos em `2107879`, "somente se" em `213476`) — trate-as como treino de técnica, não como gabarito 100% incontestável.

---

## 🧩 Aritmética

### 🎯 Assunto: Problemas Aritméticos com Sistema de Equações (preços, idades, combos)
**O que estudar obrigatoriamente:** nomear uma incógnita por item/pessoa e traduzir cada frase do enunciado em uma equação; resolver por **eliminação** (multiplicar uma equação por um fator que iguale o coeficiente de uma variável com a outra equação e subtrair) — mais rápido que isolar por substituição direta; em problemas de "combo com desconto" (leve o 4º pela metade, compre o par por preço fixo), separar as unidades vendidas **dentro do combo** das vendidas **avulsas** antes de multiplicar pelo preço cheio; em problemas de idade, atenção a "ainda não fez aniversário" (muda o ano de nascimento calculado).

**Por que estudar isso:** é o formato mais recorrente de todo o bloco de Aritmética — a FCC quase sempre embrulha a aritmética básica dentro de um probleminha de "história" com 2-3 incógnitas.

**Alerta de Pegadinha:** perguntar por uma variável diferente da que você acabou de calcular (ex.: pede "o número que deveria ter sido obtido", não o valor intermediário da conta); não separar unidades de combo das avulsas antes de aplicar o preço.

**Ação Prática:** quando a equação demorar para montar, **teste as alternativas** substituindo direto na condição do enunciado — é uma técnica de atalho citada repetidamente nos comentários e costuma ser mais rápida que álgebra pura em prova.

---

### 🎯 Assunto: Porcentagem — Aumentos e Descontos Sucessivos
**O que estudar obrigatoriamente:** percentuais sucessivos **nunca se somam, se multiplicam** como fatores — (1±p1)×(1±p2)×...; a base do percentual muda a cada etapa (não é sempre sobre o valor original); para **recuperar uma perda percentual** é preciso um ganho percentual **maior** que a perda (perder 20% exige +25% para voltar ao valor original, porque a base após a perda já é menor); técnica de **"atribuir 100 unidades"** ao total para trabalhar com números inteiros em vez de frações abstratas.

**Por que estudar isso:** um dos temas mais numerosos e recorrentes de todo o banco (15-20 questões por parte) — a FCC sempre oferece como distrator o resultado da soma simples das taxas.

**Alerta de Pegadinha:** somar as taxas em vez de multiplicar os fatores complementares (ex.: achar que 15%+20%=35% de desconto único); trocar o universo de referência em porcentagem aninhada ("% de X entre os Y" x "% dos Y que são X" são contas diferentes).

**Ação Prática:** para toda sequência de reajustes/descontos, escreva a expressão como produto de fatores decimais (nunca como soma de percentuais) antes de calcular, e confira sempre sobre qual base cada percentual está incidindo.

---

### 🎯 Assunto: Porcentagem "Por Dentro" x "Por Fora"
**O que estudar obrigatoriamente:** cálculo **"por fora"** = multiplicar direto pelo fator de acréscimo (preço final = base × (1+alíquota)); cálculo **"por dentro"** = o valor final **já contém** o percentual, então base = valor final ÷ (1 − alíquota) — usado em impostos embutidos no preço.

**Por que estudar isso:** tema técnico específico mas repetido no banco, sempre testando se o candidato aplica a fórmula errada por hábito (a "por fora" é mais intuitiva e mais usada por erro).

**Alerta de Pegadinha:** aplicar sempre a regra "por fora" (multiplicar) quando o enunciado descreve um imposto/desconto que já está embutido no valor final (que exige dividir pelo complemento).

**Ação Prática:** antes de calcular, pergunte "esse percentual já está dentro do valor dado, ou vai ser aplicado sobre ele?" — a resposta decide se você multiplica ou divide.

---

### 🎯 Assunto: Regra de Três Simples e Composta (Direta x Inversa)
**O que estudar obrigatoriamente:** para cada grandeza envolvida, identificar se ela é **diretamente** proporcional (aumenta junto) ou **inversamente** proporcional (aumenta, a outra diminui) à grandeza da incógnita **antes** de montar a proporção; para grandezas inversas, usar o macete **"tampa e multiplica"** (tampa a incógnita, multiplica as outras duas) ou inverter a coluna antes de multiplicar cruzado; em regra de três composta (3+ grandezas), tratar cada grandeza extra separadamente quanto a direta/inversa.

**Por que estudar isso:** um dos 2-3 temas mais recorrentes de todo o banco de Aritmética (12-20 questões por parte) — os próprios comentários da comunidade mostram que é o ponto de maior confusão, com usuários perguntando "por que essa coluna é direta?" mesmo depois de ver a resolução.

**Alerta de Pegadinha:** inverter a proporção quando a grandeza é inversa (mais crianças = menos dias de suprimento; mais trabalhadores = menos tempo) ou vice-versa — é o erro mais citado em todo o banco de RLM.

**Ação Prática:** antes de montar qualquer regra de três, pergunte explicitamente "se uma aumenta, a outra aumenta ou diminui?" para cada par de grandezas, e só então decida se inverte a coluna.

---

### 🎯 Assunto: Razão, Proporção e Divisão Proporcional
**O que estudar obrigatoriamente:** montar X=k·a, Y=k·b, Z=k·c, somar as partes (a+b+c) e resolver k = total ÷ soma das partes; **divisão inversamente proporcional** (ex.: "proporcional ao inverso do tempo de serviço") exige inverter a razão dada antes de montar (tempos 15 e 5 anos → razão 1/15 : 1/5 = 1:3, não 15:5); razão em cadeia com termo comum (ex. mulheres/crianças e depois homens/mulheres/crianças) resolve-se igualando o termo comum multiplicando uma das razões por um fator.

**Por que estudar isso:** citado explicitamente no edital (Razão, Proporção, Divisão Proporcional) e recorrente em todas as 5 partes do banco (8-20 questões cada).

**Alerta de Pegadinha:** esquecer de inverter a razão em divisão inversamente proporcional — é a pegadinha central e mais repetida deste tema específico.

**Ação Prática:** sempre que o enunciado disser "proporcional ao inverso de" ou "inversamente proporcional a", inverta a razão (troque numerador por denominador) antes de montar X=k·a.

---

### 🎯 Assunto: MMC — Coincidência de Eventos Periódicos
**O que estudar obrigatoriamente:** usar MMC quando a pergunta é **"quando"** ou **"quantas vezes"** dois ou mais eventos periódicos coincidem de novo (plantões, datas de aula, ciclistas voltando ao ponto de partida, músicas/slides terminando juntos); somar o MMC repetidamente à data-base para achar coincidências sucessivas; atenção a meses de 28/29/30/31 dias na contagem de dias corridos.

**Por que estudar isso:** presente de forma consistente em todas as 5 partes (4-8 questões cada), quase sempre em problemas de calendário/agenda/ciclos.

**Alerta de Pegadinha:** confundir com MDC (ver assunto seguinte) — é a troca mais citada em todo o banco; a primeira coincidência calculada às vezes não aparece nas alternativas porque a pergunta pede a segunda/terceira ocorrência, exigindo somar o MMC de novo.

**Ação Prática:** decore a frase-cola: "MMC = quando eventos periódicos **se encontram de novo**". Sempre que ler "a cada X dias" + "a cada Y dias" + "quando coincidem", é MMC.

---

### 🎯 Assunto: MDC — Agrupamento em Partes Iguais
**O que estudar obrigatoriamente:** usar MDC quando a pergunta pede o **maior** grupo/pacote/kit possível com quantidades **inteiras e iguais** de itens diferentes, sem sobra (caixas, embalagens, filas, convites); fatoração simultânea dos números envolvidos até não dar mais para dividir todos ao mesmo tempo.

**Por que estudar isso:** tão recorrente quanto MMC (4-8 questões por parte) e sistematicamente cobrado ao lado dele para testar se o candidato sabe diferenciar os dois contextos.

**Alerta de Pegadinha:** confundir com MMC — um comentário do próprio banco relata textualmente "e eu achando que era MMC" ao errar uma questão desse tipo; a troca é tão comum que a FCC conta com ela nos distratores.

**Ação Prática:** decore a frase-cola: "MDC = **repartir** igualmente, no **maior** tamanho possível, sem sobra". Sempre que ler "maior número de grupos iguais" ou "sem misturar/sem sobra", é MDC.

---

### 🎯 Assunto: Divisibilidade, Múltiplos, Divisores e Restos
**O que estudar obrigatoriamente:** critérios de divisibilidade (3, 4, 9, 12); número com exatamente 3 divisores positivos é sempre o **quadrado de um número primo**; resto de um produto grande por um divisor de 1 dígito — basta multiplicar os últimos algarismos dos fatores e tirar o resto disso; problemas de "múltiplo de X e de Y simultaneamente" (não "ou") exigem divisibilidade conjunta, geralmente resolvida com MMC.

**Por que estudar isso:** citado explicitamente no edital (Divisibilidade: múltiplos, divisores, problemas) e recorrente em toda parte do banco (5-6 questões cada).

**Alerta de Pegadinha:** interpretar "múltiplo de 3 ou de 5" como "múltiplo de 3 e de 5 ao mesmo tempo" (ou o inverso) — ler com atenção o conectivo do enunciado.

**Ação Prática:** para achar resto de produtos grandes, treine a técnica de multiplicar só os últimos algarismos e tirar o resto do resultado pequeno — economiza tempo de prova.

---

### 🎯 Assunto: Frações e Números Decimais em Cascata
**O que estudar obrigatoriamente:** técnica de **atribuir um valor fictício** (múltiplo dos denominadores envolvidos, ex. MMC deles) ao total desconhecido, transformando toda a cadeia de operações fracionárias em números inteiros manejáveis — essencial em problemas de retiradas/depósitos sucessivos ("retira 2/9, depois 3/7 do restante, depois deposita 4/5 do total retirado"); dízima periódica ↔ fração geratriz (0,4545...=45/99).

**Por que estudar isso:** presente em todas as 5 partes (6-15 questões cada), sempre testando se o candidato sabe identificar sobre **qual base** cada fração incide (o restante já reduzido, ou o total original).

**Alerta de Pegadinha:** aplicar a fração seguinte sobre a base errada (sobre o total original quando deveria ser sobre o que sobrou, ou vice-versa).

**Ação Prática:** ao ver uma cadeia de operações com frações, escolha um valor inicial hipotético múltiplo de todos os denominadores (ex. 120, 600, 900) e refaça a cadeia com esse número antes de generalizar a resposta.

---

### 🎯 Assunto: Expressões Numéricas e Potenciação
**O que estudar obrigatoriamente:** ordem de operações (PEMDAS) em expressões com parênteses/colchetes/chaves aninhados; potência com expoente negativo inverte a fração; raiz como potência fracionária.

**Por que estudar isso:** citado explicitamente no edital (potenciação, expressões numéricas) e presente de forma pontual mas certeira — descrito nos comentários como "questão grande que come tempo de prova" por causa do tamanho, não da dificuldade conceitual.

**Alerta de Pegadinha:** errar a ordem de resolução em expressões muito aninhadas por pressa, não por desconhecimento da regra.

**Ação Prática:** em expressões grandes, resolva de dentro para fora (parênteses → colchetes → chaves) anotando cada resultado parcial em vez de tentar de cabeça.

---

### 🎯 Assunto: Problemas de Trabalho Conjunto / Capacidade Operacional
**O que estudar obrigatoriamente:** quando duas pessoas/equipes trabalham juntas, atribuir um valor numérico conveniente ao total do serviço (100, ou o MMC dos tempos individuais) para achar a produção por hora/dia de cada um e depois somar; quando o serviço é **dividido** (não feito em conjunto) na razão inversa do tempo de serviço/idade, inverter a razão antes de repartir; técnica de "achar o ciclo comum" via MMC em vez de somar taxas fracionárias diretamente.

**Por que estudar isso:** aplicação prática combinada de regra de três composta + razão inversa + MMC, muito recorrente nas últimas partes do banco (10-15 questões).

**Alerta de Pegadinha:** somar diretamente frações de produtividade sem achar primeiro um denominador comum conveniente; esquecer de inverter a razão quando a divisão do trabalho é inversamente proporcional ao tempo de serviço/idade.

**Ação Prática:** para "A sozinho faz em X dias, B sozinho em Y dias, juntos em quanto tempo?", atribua o total de trabalho = MMC(X,Y), calcule a produção diária de cada um nesse total, some, e divida o total pela soma.

---

### 🎯 Assunto: Orientação Espacial e Temporal (Calendário, Dias da Semana, Direções)
**O que estudar obrigatoriamente:** para achar o dia da semana N dias/anos depois, soma-se 1 dia por ano normal e **2 dias por ano bissexto** (não 1); regra "se um dia da semana ocorreu **mais vezes** que outro no mês, o mês necessariamente começa nesse dia" (só vale quando o mês tem 31 dias e o dia se repete 5 vezes); contagem de intervalo: **"de X até Y"** inclui ambos os extremos (diferença +1), **"entre X e Y"** exclui ambos (diferença −1); em problemas de deslocamento com giros de 90°, separar a distância percorrida por eixo (direita/esquerda x cima/baixo) e somar/cancelar cada eixo isoladamente.

**Por que estudar isso:** citado explicitamente no edital (Orientação espacial, Orientação temporal) e recorrente (4-7 questões por parte).

**Alerta de Pegadinha:** aplicar a regra do "avança 1 dia" em ano bissexto (o certo é 2 dias); confundir "de...até" (inclusivo) com "entre...e" (exclusivo).

**Ação Prática:** para problemas de deslocamento, monte duas somas separadas (eixo horizontal e eixo vertical) antes de calcular a distância final — nunca tente resolver "de cabeça" sem separar os eixos.

---

## 🧩 Lógica

### 🎯 Assunto: Estruturas Lógicas — Cadeias de Comparação e Ordenação
**O que estudar obrigatoriamente:** montar a cadeia completa de desigualdades a partir das frases do enunciado (ex.: Otávio ≤ Márcia < Carlos ≤ Débora < Ana) e checar cada alternativa contra ela; **"não foi menor que"** / **"não teve nota maior que"** **permitem igualdade** — são diferentes de uma desigualdade estrita ("maior que", "menor que").

**Por que estudar isso:** aparece repetidas vezes no banco com a mesma armadilha central, inclusive a mesma questão reaproveitada mais de uma vez.

**Alerta de Pegadinha:** assumir que a ordem é sempre estrita quando o enunciado usa uma negação que permite empate ("não foi menor que" = "foi maior ou igual").

**Ação Prática:** ao montar a cadeia, use símbolos `<` e `≤` distintos conforme o enunciado permite ou não igualdade — não simplifique tudo para `<`.

---

### 🎯 Assunto: Relacionamentos e Associações — Tabela Lógica de Dedução
**O que estudar obrigatoriamente:** técnica universal (citada em quase todo comentário do banco) de montar uma **tabela pessoas × atributos** (cidade, profissão, transporte, cor etc.), marcando **X** para exclusão e **O** (ou V) para confirmação, e propagar cada nova confirmação como exclusão automática nas outras células da mesma linha/coluna; começar sempre pela pista **mais restritiva**, não pela primeira do enunciado; em mesas circulares/hexagonais, desenhar as pessoas nas **arestas**, não nos vértices, para não se confundir na visualização.

**Por que estudar isso:** um dos blocos mais numerosos e consistentes do banco inteiro (10-15 questões por parte) — mapeia diretamente para "Estruturas Lógicas: relações entre pessoas, lugares, objetos" do edital.

**Alerta de Pegadinha:** começar a tabela pela pista menos restritiva, gerando ambiguidade que só se resolve tarde; deixar-se distrair por um dado irrelevante citado só uma vez no enunciado (a FCC insere "dados-isca" propositalmente).

**Ação Prática:** antes de preencher a tabela, releia todas as pistas e numere-as da mais restritiva (elimina várias possibilidades de uma vez) para a mais vaga — comece pela mais restritiva.

---

### 🎯 Assunto: Diagramas de Venn (2 e 3 Conjuntos)
**O que estudar obrigatoriamente:** com 2 conjuntos, fórmula **|A|+|B|−total = interseção** quando todo mundo pertence a pelo menos um conjunto; com 3 conjuntos, preencher **da interseção tripla para fora**, subtraindo cada interseção do total do conjunto individual; quando a pergunta pede "nem A nem B", inverte-se: total − (|A|+|B|−|A∩B|); **atenção**: se o enunciado já vem com a palavra **"apenas"** (ex. "28 sofreram apenas queimaduras"), esse valor já está líquido e **não** se subtrai a interseção de novo.

**Por que estudar isso:** presente em todas as 5 partes do banco (6-8 questões cada), sempre com a mesma técnica mas números diferentes.

**Alerta de Pegadinha:** aplicar o macete "soma tudo menos o total" quando o enunciado já fala em "apenas X" (nesse caso o valor já vem líquido, aplicar o macete de novo duplica o erro); esquecer de descontar a interseção tripla duas vezes ao calcular as interseções duplas.

**Ação Prática:** antes de montar a conta, releia o enunciado e sublinhe se cada número dado é "total do conjunto" ou "apenas esse conjunto" — são bases de cálculo diferentes.

---

### 🎯 Assunto: Lógica Proposicional — Condicionais e Tabela-Verdade
**O que estudar obrigatoriamente:** a condicional "Se P então Q" só é **falsa** quando P é verdadeiro e Q é falso (V→F) — em todos os outros casos é verdadeira (mnemônico citado nos comentários como regra "Vera Fischer"); resolver questões de proposições compostas **de trás para frente**, partindo da proposição cujo valor lógico é conhecido com certeza e propagando; equivalências mais cobradas: **A→B ≡ ~B→~A** (contrapositiva) e **A→B ≡ ~A ∨ B**; interpretar corretamente **"P somente se Q"** como equivalente a "se P, então Q" (não o contrário — não confundir com "se e somente se").

**Por que estudar isso:** é o maior bloco de Lógica em várias partes do banco (até 25 questões numa única parte) — mapeia direto para "Lógica Proposicional: hipóteses, inferências, conclusões válidas" do edital.

**Alerta de Pegadinha:** achar que a condicional é falsa em outros casos além de V→F; trocar a direção de "somente se" (é uma das questões mais citadas como confusa nos comentários); em cadeias de condicionais, propagar na direção errada.

**Ação Prática:** para qualquer questão com várias proposições condicionais, comece pela afirmação cujo valor V/F é dado com certeza no enunciado (geralmente a última frase) e propague de trás para frente usando a contrapositiva.

---

### 🎯 Assunto: Negação de Proposições (De Morgan, Condicional, Quantificadores)
**O que estudar obrigatoriamente:** negação de **conjunção** ("P e Q") vira **disjunção** com ambas negadas ("~P ou ~Q"); negação de **disjunção** ("P ou Q") vira **conjunção** com ambas negadas ("~P e ~Q") — Leis de De Morgan; negação de **condicional** ("Se P então Q") vira **"P e não-Q"** (mantém a primeira, nega a segunda, troca "então" por "e" — mnemônico popular citado nos comentários como "regra do mané"); negação de quantificadores: **"Todo A é B"** → **"Algum A não é B"**; **"Nenhum A é B"** → **"Algum A é B"**; **"Algum A é B"** → **"Nenhum A é B"** (mnemônico **PEA**: Pelo menos um / Existe um que / Algum).

**Por que estudar isso:** é o segundo bloco mais denso de Lógica do banco (8-15 questões por parte), com regras fixas e mecânicas — alto retorno por tempo de estudo.

**Alerta de Pegadinha:** negar só uma das duas partes de uma proposição composta sem trocar o conectivo; negar "todo" como "nenhum" (errado) em vez de "algum...não"; negar "algum" como "todo" (errado) em vez de "nenhum".

**Ação Prática:** monte um cartão de referência com as 4 regras de negação (conjunção, disjunção, condicional, quantificador) e treine negar 5 frases de cada tipo até fazer de memória, sem precisar pensar na regra.

---

### 🎯 Assunto: Proposições Categóricas, Quantificadores e Silogismos
**O que estudar obrigatoriamente:** representar proposições categóricas ("Todo A é B", "Nenhum C é D", "Algum E é F") como diagramas de círculos (Euler-Venn lógico) com um conjunto contido, excluído ou sobreposto ao outro; encadear silogismos com conjuntos aninhados (A⊂B, D⊂A, C⊂D) desenhando o diagrama passo a passo.

**Por que estudar isso:** presente de forma consistente (8-10 questões por parte), frequentemente cruzado com negação de quantificadores.

**Alerta de Pegadinha:** inverter qual conjunto contém qual no diagrama (ex.: "todas as bailarinas são magras" significa que o conjunto bailarinas está **contido** no conjunto magras, não o contrário).

**Ação Prática:** para todo silogismo categórico, desenhe o diagrama de círculos antes de responder — não tente resolver só de cabeça, é fonte comum de inversão de conjuntos.

---

### 🎯 Assunto: Verdades e Mentiras
**O que estudar obrigatoriamente:** buscar a **contradição direta** entre duas falas (quando uma nega a outra) para fixar quem necessariamente mente, e então propagar essa informação para o resto do problema; em problemas de "soma máxima/mínima" envolvendo um mentiroso, somar tudo e ajustar descontando/somando o valor da mentira.

**Por que estudar isso:** tema clássico e recorrente do gênero "raciocínio lógico de concurso" (3-7 questões por parte).

**Alerta de Pegadinha:** tentar testar todas as combinações de verdadeiro/mentiroso por força bruta em vez de localizar primeiro a contradição direta entre duas falas, que geralmente resolve o problema mais rápido.

**Ação Prática:** releia todas as falas procurando duas que se contradigam diretamente — isso quase sempre fixa quem mente antes de qualquer outra dedução.

---

### 🎯 Assunto: Sequências Lógicas (Números, Letras, Figuras)
**O que estudar obrigatoriamente:** quando um padrão simples não se aplica, **decompor a sequência em duas subsequências entrelaçadas** (posições pares e posições ímpares), cada uma com seu próprio padrão (soma constante, alternância +n/−n, PA própria); para posição de item num ciclo periódico (letras, códigos), usar o **resto da divisão** pelo tamanho do ciclo em vez de escrever a sequência inteira; para "resultado final dado, ache o valor inicial", resolver **de trás para frente**, invertendo cada operação da receita.

**Por que estudar isso:** um dos temas mais numerosos de Lógica em todas as 5 partes (6-12 questões cada), sempre testando reconhecimento de padrão sob pressão de tempo.

**Alerta de Pegadinha:** tentar achar um único padrão contínuo numa sequência que na verdade é duas subsequências intercaladas; inverter a ordem das operações ao resolver "de trás para frente".

**Ação Prática:** ao travar numa sequência, teste separar os termos em posições pares e ímpares antes de desistir — é a técnica que resolve a maioria das sequências "impossíveis" do banco.

---

### 🎯 Assunto: Problemas com Dados, Figuras e Palitos de Fósforo
**O que estudar obrigatoriamente:** para quadriculados n×n, a fórmula de contagem de palitos usa (n+1) linhas de n palitos em cada direção; problemas de criptoaritmética (cada letra = um algarismo distinto) resolvem-se isolando primeiro o algarismo que se repete na própria equação (ex.: M+M=M implica M=0); problemas sem atalho algébrico (dobradura, coloração de arestas) resolvem-se por eliminação visual/desenho, não por fórmula.

**Por que estudar isso:** presente de forma consistente (4-9 questões por parte), tipicamente as questões que mais "assustam" por não terem fórmula pronta.

**Alerta de Pegadinha:** tentar decorar uma fórmula genérica para todo tipo de figura — muitos desses problemas exigem desenho/enumeração manual mesmo, não existe atalho universal.

**Ação Prática:** para problemas de figuras sem padrão óbvio, desenhe o caso pequeno (n=1, n=2) à mão e procure o incremento entre um caso e o próximo, em vez de tentar adivinhar a fórmula geral direto.

---

### 🎯 Assunto: Princípio da Casa dos Pombos e Contagem por Enumeração
**O que estudar obrigatoriamente:** para garantir uma condição ("no mínimo X itens da mesma cor/categoria"), sempre calcular o **pior cenário possível** — some tudo que pode ser retirado **sem** satisfazer a condição e **adicione 1**; para "quantidade mínima garantida por gaveta", divida o total de itens pelo total de gavetas (quociente = garantia mínima); problemas de contagem sem fórmula formal (quantas formas de trocar presentes sem repetir, quantas pinturas possíveis com restrição) resolvem-se por **enumeração direta e organizada** dos casos válidos, não por fórmula de combinatória.

**Por que estudar isso:** presente em todas as 5 partes do banco (5-6+ questões cada) — tema clássico de concurso, sempre no mesmo formato "quantos você precisa retirar/sortear para garantir X".

**Alerta de Pegadinha:** resolver pelo caso médio em vez do pior caso (subestima a quantidade necessária); assumir que "média" ou "no mínimo" garante um valor igual para **todos** os elementos (só garante que **algum** elemento atinge aquele valor).

**Ação Prática:** para toda questão "quantos para garantir X", escreva explicitamente o pior cenário (esgotar as categorias que NÃO servem primeiro) antes de somar +1 — não tente resolver de cabeça sem escrever o cenário.

---

# ✅ Fora do escopo (ignorado deliberadamente)

O banco de questões vem de um pool genérico de "Matemática para concursos" e contém bastante conteúdo que **não consta** na seção "2. Raciocínio Lógico-Matemático" deste edital (que é restrita a Aritmética básica + Lógica). Foi descartado, no mesmo espírito da filtragem aplicada ao lote de TI:

| Tema | Motivo da exclusão |
|---|---|
| **Álgebra Linear** (equações lineares, espaço vetorial, transformações lineares, autovalores/autovetores, regressão linear, séries temporais) | Não consta no edital — só "expressões numéricas" básicas estão listadas |
| **Matrizes, Determinantes e Sistemas Lineares** | Não consta no edital |
| **Geometria** (plana, espacial, analítica — áreas, perímetros, poliedros, elipse) | Não consta no edital |
| **Funções** (1º grau, exponencial, equações polinomiais) | Não consta no edital |
| **Progressões** (PA e PG) | Não consta no edital |
| **Probabilidade** (formal — urnas, dados, distribuições, filas M/M/1) | Não consta no edital |
| **Estatística** (média/moda/mediana/variância formal, desvio padrão) | Não consta no edital (mesmo aparecendo em problemas de idade misturados) |
| **Matemática Financeira** (juros simples/compostos, IPCA, depreciação) | Não consta no edital |
| **Análise Combinatória formal** (fórmulas de arranjo/combinação/permutação com repetição) | Não consta no edital — mas contagem informal por enumeração dentro de um problema de lógica **foi mantida** (ver "Casa dos Pombos e Contagem por Enumeração" acima) |
| **Produtos Notáveis e Fatoração** | Não consta no edital |

---

# ✅ Observações finais

- Os 5 resumos brutos que originaram este guia estão em `guia_estudos_subagentes/raw_md/32_rlm_parte1_de_5.md` a `36_rlm_parte5_de_5.md`, cada um citando dezenas de `id_questao` reais e técnicas de resolução passo a passo — consulte-os para os exemplos numéricos completos por trás de cada regra resumida aqui.
- Várias questões deste banco vêm com **enunciado corrompido por OCR** (símbolos de figuras/tabelas ausentes na transcrição) — quando isso ocorrer ao revisar uma questão específica, foque em entender a **técnica de resolução** descrita nos comentários, não em decifrar o texto literal truncado.
