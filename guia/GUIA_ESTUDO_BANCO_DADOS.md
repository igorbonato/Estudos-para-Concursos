# 📘 Guia de Estudo Direcionado e Prescritivo — Banco de Dados (TRT 4ª Região)

> Gerado cruzando a seção "9. Banco de Dados" do conteúdo programático oficial (`conteudo_programatico.md`) com **932 questões** de Banco de Dados da FCC em `questoes_banco_dados_fcc.json`, pré-digeridas em 7 partes (`guia_estudos_subagentes/raw_md/40_banco_de_dados_parteN_de_7.md`).

**Recorte deste guia:** o edital resume a seção a "Modelagem (relacional, ER), Linguagens (SQL, PL/SQL), SGBDs (Oracle 11g+, SQL Server, PostgreSQL, H2 Database), Business Intelligence (Data Warehouse, Data Mining, OLAP)". O banco real é consideravelmente mais amplo e mais granular: cobre sintaxe SQL exata (não só conceito) em 5 SGBDs distintos (Oracle, PostgreSQL, SQL Server, MySQL, H2/MS-Access), arquitetura interna de cada um (Oracle RMAN/AWR/tablespaces, SQL Server páginas/IAM/PFS, PostgreSQL VACUUM/pg_dump), modelagem ER com notação Crow's Foot detalhada, formas normais com exemplos numéricos, Big Data/NoSQL/ecossistema Hadoop-Spark, e um volume enorme de comparações "função X no SGBD A = função Y no SGBD B" que a FCC adora cobrar como distrator.

**Nota sobre gabaritos a conferir:** **este é, disparadamente, o lote com o maior volume de gabaritos contestados de todo o projeto** — mais de 25 casos individuais documentados nos 7 `raw_md` de origem, concentrados sobretudo nas partes 4, 5, 6 e 7. Muitos são claramente erros de registro na base (a resposta oficial cita um comando que nem existe em SQL), não divergências reais da banca — mas outros são debates genuínos entre gabarito e teoria. Os mais didáticos:
- **`MERGE` (comando SQL)**: em pelo menos duas questões (`853965`, `719379`) o gabarito registrado aponta uma alternativa com sintaxe inventada (`IFOPERATION`, `FROM...IF FOUND THEN`) em vez da sintaxe real `MERGE INTO destino USING origem ON (condição) WHEN MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT ...` — decore a sintaxe real, não a letra da base.
- **`PCTFREE` (Oracle)**: gabarito define o parâmetro como "número máximo de registros que admitem valores nulos" — definição inexistente; o `PCTFREE` real define a fração de espaço livre reservada em um bloco de dados (`481280`).
- **Estratégia Top-Down x Bottom-Up de projeto de BD**: gabarito rotula a definição clássica de Top-Down (partir de conceitos abstratos, especializar até entidades concretas) como "Bottom-Up" — o oposto da definição de Navathe (`400986`).
- **Tipos de dados espaciais do SQL Server 2008**: gabarito marca "latitude e longitude"; a resposta documentada pela Microsoft é `geography` e `geometry` (`303434`).
- **`DROP TABLE ... CASCADE`**: gabarito marca "RESTRICT ALL" (que na verdade *bloqueia* a remoção com dependências) em vez de `CASCADE` (`370975`).
- **Requisito de identificação para "adicionar usuário" no SQL Server 2008**: gabarito ignora a sintaxe real `sp_addrolemember` (`302261`).
- Dezenas de outros casos menores (definição de PL/SQL, comandos Oracle Form Builder, questões com erro de digitação da própria prova como "FUNCION" em vez de "FUNCTION") estão listados individualmente em cada `raw_md` — ao encontrar uma resposta "óbvia" que a base marca como errada, sempre vale checar os comentários antes de assumir erro próprio.

---

## 🧩 SQL — Fundamentos e Classificação de Comandos

### 🎯 Assunto: Classificação DDL/DML/DCL/DQL/TCL
**O que estudar obrigatoriamente:** é o tema isoladamente mais cobrado do banco inteiro. **DDL** = `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` (define estrutura); **DML** = `INSERT`, `UPDATE`, `DELETE`, `MERGE`, `CALL` (manipula dados — atenção: `MERGE` **parece** DDL mas é DML, pois combina INSERT/UPDATE/DELETE sobre linhas); **DCL** = `GRANT`, `REVOKE`, `DENY` (controle de acesso); **DQL** = `SELECT`; **TCL** = `COMMIT`, `ROLLBACK`, `SAVEPOINT`. Mnemônicos úteis: "CAD" para DDL (Create/Alter/Drop) e "SIUD" para DML (Select/Insert/Update/Delete). A FCC cobra sequências completas de classificação combinando 3-5 comandos de categorias diferentes na mesma questão, e também cobra o caso especial de gatilhos DDL no SQL Server 2012, que respondem a `CREATE`/`ALTER`/`DROP` **e também** a `GRANT`/`DENY`/`REVOKE`/`UPDATE STATISTICS` — a documentação da Microsoft trata esses últimos como eventos DDL disparadores de trigger mesmo sendo classicamente DCL.
**Por que estudar isso:** aparece em todas as 7 partes do lote, geralmente como a primeira pergunta mais "fácil" de cada prova — item de altíssimo retorno por tempo de estudo.
**Alerta de Pegadinha:** classificar `MERGE` como DDL (é DML); esquecer que `TRUNCATE` é DDL (não DML, apesar de "parecer" manipular dados); achar que `GRANT`/`REVOKE` nunca podem disparar trigger DDL no SQL Server.
**Ação Prática:** monte um cartão com os 5 grupos e recite de cabeça a classificação de 15 comandos embaralhados.

---

### 🎯 Assunto: DDL — CREATE/ALTER/DROP/TRUNCATE (sintaxe multi-SGBD)
**O que estudar obrigatoriamente:** `CREATE TABLE nome (coluna tipo [PRIMARY KEY], ...)` define colunas e restrições já na criação (a PK implica `NOT NULL` + `UNIQUE` implicitamente); `ALTER TABLE tabela ADD coluna tipo` acrescenta coluna; `ALTER TABLE tabela DROP COLUMN coluna` remove coluna; `ALTER TABLE tabela ADD PRIMARY KEY (colunas)` adiciona PK a tabela já existente. `TRUNCATE TABLE` remove **todas as linhas mantendo a estrutura**, sem `WHERE`, mais rápida que `DELETE` por não logar exclusão linha a linha e resetar índices/contadores; `DROP TABLE` remove a tabela inteira (estrutura + dados + índices + restrições); `DELETE FROM tabela WHERE condição` remove linhas com filtro opcional — os três nunca são intercambiáveis. Sintaxe de FK nomeada: `CONSTRAINT nome FOREIGN KEY (campo) REFERENCES tabela(campo) [ON DELETE/UPDATE CASCADE]` — `EXTENDS`, `FROM` ou `IMPLEMENTS` no lugar de `REFERENCES` são sempre inválidos. Renomear coluna/tabela varia por SGBD: Oracle/PostgreSQL `ALTER TABLE tab RENAME COLUMN antigo TO novo` e `RENAME TABLE old TO new`; MySQL `RENAME TABLE old TO new`; SQL Server `exec sp_rename 'old','new'`. Restrição `CHECK` adicionada a posteriori: `ALTER TABLE tab ADD CONSTRAINT nome CHECK (condição)`.
**Por que estudar isso:** a FCC testa a sintaxe **literal**, palavra por palavra — pequenos erros de digitação da própria banca já geraram questões contestadas (ex.: "FUNCION" em vez de "FUNCTION", parênteses sobrando em `CREATE TABLE`).
**Alerta de Pegadinha:** usar "DELETE TABLE" (não existe); achar que `TRUNCATE` permite `ROLLBACK` como o `DELETE`; confundir `ALTER COLUMN` (SQL Server) com `MODIFY` (Oracle) — cada SGBD tem sua própria sintaxe de alteração de tipo de coluna.
**Ação Prática:** escreva de memória a sintaxe completa de `CREATE TABLE` com PK, FK nomeada e `CHECK`; monte a tabela comparativa de renomeação de coluna/tabela por SGBD.

---

### 🎯 Assunto: DML — INSERT/UPDATE/DELETE (sintaxe e pegadinhas)
**O que estudar obrigatoriamente:** `INSERT INTO tabela (colunas) VALUES (valores)` sempre usa aspas simples para strings (inclusive CPF, que é texto, não número); omitir a palavra-chave `VALUES` invalida o comando. `UPDATE tabela SET coluna1=valor1, coluna2=valor2 WHERE condição` — múltiplas colunas separadas por vírgula, sem repetir `SET`; não existe `UPDATE FROM` nem `ALTER TABLE ... SET` para esse fim. `DELETE FROM tabela WHERE condição` **nunca** usa asterisco (`DELETE * FROM` é inválido em praticamente todo SGBD — `*` é exclusivo do `SELECT`); faltar o `FROM` também invalida o comando. Para copiar registros entre tabelas: `INSERT INTO destino (campos) SELECT campos FROM origem` (não existe comando `COPY` em SQL padrão, exceto como utilitário específico do PostgreSQL). Tentar `UPDATE` um campo FK para valor inexistente na tabela pai gera erro de violação ("foreign key constraint fails"). Comparação com nulo sempre usa `IS NULL`/`IS NOT NULL`, nunca `= NULL`.
**Por que estudar isso:** pegadinhas de sintaxe "quase certa" (asterisco no DELETE, aspas faltando, FROM ausente) são o tipo de erro mais barato de detectar e mais recorrente do banco inteiro.
**Alerta de Pegadinha:** `DELETE * FROM tabela`; esquecer aspas em campos VARCHAR numéricos (CPF); usar `AND` em vez de `OR` em condições de exclusão mútua (gera resultado vazio).
**Ação Prática:** escreva os 3 comandos DML básicos de memória com todos os erros clássicos marcados ao lado (o que NÃO fazer).

---

### 🎯 Assunto: DCL — GRANT/REVOKE/DENY e Propagação de Privilégios
**O que estudar obrigatoriamente:** `GRANT privilégio ON objeto TO usuário [WITH GRANT OPTION]` concede; `REVOKE privilégio ON objeto FROM usuário` retira uma concessão direta (mas o acesso pode **persistir** se o usuário herdar o mesmo privilégio de outro papel/grupo); `DENY privilégio TO usuário` (SQL Server) **bloqueia explicitamente** mesmo havendo concessão indireta via outro papel — é a diferença central REVOKE×DENY. Privilégios de **sistema** (`CREATE TABLE`, `CREATE SESSION`) usam `WITH ADMIN OPTION` para permitir repasse; privilégios de **objeto** (`SELECT`, `INSERT`) usam `WITH GRANT OPTION` — as duas cláusulas **não são intercambiáveis**. Sequência de criação de role: `CREATE ROLE nome; GRANT privilégio TO role; GRANT role TO usuário;`. No PostgreSQL, `GRANT ... TO PUBLIC` concede a **todos** os usuários. Se a conta concedente for excluída sem revogação prévia, os privilégios que ela repassou a terceiros **são afetados/revogados em cascata**. Propagação **horizontal** limita quantas contas um usuário com GRANT OPTION pode repassar; propagação **vertical** limita a profundidade da cadeia de repasses.
**Por que estudar isso:** distinção REVOKE×DENY e ADMIN OPTION×GRANT OPTION são pegadinhas centrais repetidas em praticamente todas as 7 partes.
**Alerta de Pegadinha:** achar que REVOKE bloqueia definitivamente mesmo com herança de outro papel (só DENY faz isso); trocar ADMIN OPTION (sistema) por GRANT OPTION (objeto); inventar sintaxe como "ADD PERMISSION" ou "CREATE GRANT".
**Ação Prática:** escreva a diferença REVOKE×DENY com um cenário de herança de papel; decore a sequência CREATE ROLE→GRANT privilégio→GRANT role.

---

## 🧩 SQL — Consultas (SELECT, Junções, Agregação, Subconsultas)

### 🎯 Assunto: SELECT, WHERE, LIKE, ORDER BY e DISTINCT
**O que estudar obrigatoriamente:** ordem sintática fixa: `SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY` — inverter `HAVING`/`ORDER BY` é erro cobrado como distrator. `LIKE` usa `%` (qualquer sequência, inclusive vazia) e `_` (exatamente um caractere) — `'A%S'` = começa com A e termina com S; `'_a%'` = segunda posição é "a"; `*` **não** é wildcard em SQL padrão (armadilha recorrente, sobretudo confundindo com regex). `SELECT DISTINCT coluna` remove duplicatas na listagem; `COUNT(DISTINCT coluna)` conta valores únicos — são usos diferentes da mesma palavra-chave. Alias com espaço/acentuação/palavra reservada exige aspas (`AS "Nome do Órgão"` ou `AS 'Ano < 2000'`); sem aspas, o parser tenta interpretar caracteres especiais como operadores e quebra a sintaxe. `WHERE campo IS NULL` (nunca `= NULL`). Comparar coluna `DATE`/`DATETIME` com string incompleta (`= '2024'`) é erro de tipo — usar `YEAR(coluna) = ano`, faixa completa ou `LIKE 'ano%'` conforme o SGBD.
**Por que estudar isso:** é o bloco de maior volume absoluto do lote — sintaxe básica de SELECT aparece testada com variações mínimas em centenas de questões.
**Alerta de Pegadinha:** usar `*` como wildcard do `LIKE`; esquecer aspas em alias com caracteres especiais; comparar data com string incompleta.
**Ação Prática:** pratique 10 padrões de `LIKE` combinando `%`/`_` em posições diferentes até automatizar a leitura.

---

### 🎯 Assunto: JOIN — Explícito, Implícito e Outer Join Proprietário Oracle
**O que estudar obrigatoriamente:** `INNER JOIN tabela ON chave1 = chave2` retorna só linhas com correspondência em ambos os lados; **sem `ON`**, um `INNER JOIN` se comporta como `CROSS JOIN` (produto cartesiano) — atenção que há questões da própria FCC com gabaritos divergentes sobre se isso é "erro de sintaxe" ou apenas "comportamento inesperado". Junção **implícita** (`FROM t1, t2 WHERE t1.pk = t2.fk`) é equivalente à explícita (`t1 JOIN t2 ON t1.pk = t2.fk`) — omitir a condição de igualdade no `WHERE` também gera produto cartesiano. `LEFT JOIN`/`LEFT OUTER JOIN` traz **todas** as linhas da tabela à esquerda mesmo sem correspondência (preenchendo com `NULL` as colunas da direita); `RIGHT JOIN` é o espelho; `CROSS JOIN` retorna N×M linhas sempre (produto cartesiano puro, sem condição). Sintaxe legada Oracle de outer join: `(+)` fica do lado da tabela que **pode não ter correspondência** — `WHERE e.id_dep = d.id_dep(+)` equivale a `LEFT JOIN departamentos d ON e.id_dep = d.id_dep`. No PostgreSQL, `INNER JOIN tabela USING (coluna)` é a forma abreviada quando o nome da coluna de junção é idêntico nas duas tabelas.
**Por que estudar isso:** JOIN é o segundo tema mais recorrente do banco, testado tanto na sintaxe (ON×USING×vírgula) quanto na semântica (INNER×LEFT×RIGHT×CROSS).
**Alerta de Pegadinha:** trocar a coluna de junção (`c.id = d.id` em vez de `c.id = d.fk_id`); esquecer a posição do `(+)` no Oracle; achar que `LEFT JOIN` e `RIGHT JOIN` produzem sempre resultados diferentes (produzem o mesmo, só invertendo a ordem das tabelas).
**Ação Prática:** reescreva a mesma consulta nas 3 formas (implícita, `INNER JOIN...ON`, Oracle `(+)`) para fixar a equivalência.

---

### 🎯 Assunto: GROUP BY, HAVING e Funções de Agregação
**O que estudar obrigatoriamente:** `WHERE` filtra linhas **antes** do agrupamento; `HAVING` filtra grupos **depois**, geralmente sobre resultado de função de agregação (`HAVING COUNT(*) > 100`) — usar `WHERE MAX(salario)>3000` é sempre erro de sintaxe. `COUNT(*)` conta todas as linhas (incluindo NULLs); `COUNT(coluna)` ignora NULLs daquela coluna; `SUM()`/`AVG()`/`MAX()`/`MIN()` seguem a semântica óbvia — a FCC troca essas funções sistematicamente entre alternativas ("pedir total, oferecer AVG"). Toda coluna no `SELECT` que não está em função de agregação deve aparecer no `GROUP BY`. `GROUP BY` sem função de agregação simplesmente distribui as linhas em grupos únicos por valor da coluna.
**Por que estudar isso:** distinção WHERE×HAVING é uma das pegadinhas mais repetidas do banco inteiro, presente em praticamente todas as 7 partes.
**Alerta de Pegadinha:** filtrar por agregação dentro do `WHERE`; trocar `SUM`/`COUNT`/`AVG` quando o enunciado pede especificamente "total"/"quantidade"/"média".
**Ação Prática:** escreva 3 exemplos de consulta com `GROUP BY`+`HAVING` a partir de cenários diferentes (contar, somar, tirar média por grupo).

---

### 🎯 Assunto: Subconsultas (Correlacionadas, EXISTS, IN, ALL/ANY)
**O que estudar obrigatoriamente:** subconsulta correlacionada usa alias da tabela externa dentro do `WHERE` da subconsulta interna: `SELECT * FROM func t1 WHERE salario > (SELECT AVG(salario) FROM func t2 WHERE t2.depto = t1.depto)` — compara cada linha contra a média do **próprio** grupo. `WHERE NOT EXISTS (subconsulta)` retorna linhas **sem** correspondência na subconsulta (inverter para `EXISTS` inverte o resultado). Comparação com agregado usando `ALL`: `WHERE valor < ALL (SELECT AVG(valor) FROM tabela)` — não existem funções `AVERAGE()`/`MEDIA()` em SQL padrão. Comparação de tuplas usa `IN`: `WHERE (salario, depto) IN (SELECT salario, depto FROM ...)`. Subconsulta escalar no próprio `SELECT` (`SELECT nome, (SELECT COUNT(*) FROM pedidos p WHERE p.cliente_id=c.id) FROM cliente c`) evita `JOIN`+`GROUP BY` quando só se precisa de um valor por linha externa — mas só funciona corretamente com **uma única tabela** no `FROM` externo, para não gerar produto cartesiano por múltiplas tabelas sem condição de junção.
**Por que estudar isso:** subconsultas correlacionadas são tema de alta recorrência e exigem raciocínio (não só decoreba) sobre a relação entre a consulta externa e a interna.
**Alerta de Pegadinha:** esquecer a correlação (alias da tabela externa) dentro da subconsulta; usar `AVERAGE`/`MEDIA` como se fossem funções reais; inverter `EXISTS`/`NOT EXISTS`.
**Ação Prática:** escreva uma subconsulta correlacionada do zero para "maior salário do próprio departamento" e depois reescreva com `ALL`.

---

### 🎯 Assunto: UNION/UNION ALL e Operadores de Conjunto
**O que estudar obrigatoriamente:** `UNION` combina o resultado de 2+ `SELECT`s com **mesmo número de colunas e tipos compatíveis na mesma ordem**, removendo duplicatas por padrão (executa um `DISTINCT` implícito no resultado final); `UNION ALL` mantém duplicatas (mais rápido, sem checagem de unicidade). `UNION` não garante ordenação — usar `ORDER BY` explícito no final quando a ordem importa. `UNION` **não é constraint** SQL (distinto de `FOREIGN KEY`/`NOT NULL`/`UNIQUE`/`PRIMARY KEY`/`CHECK`/`DEFAULT`, que são).
**Por que estudar isso:** confusão comum entre "UNION como operador de combinação de queries" e "constraint" é testada como pegadinha de classificação.
**Alerta de Pegadinha:** achar que `UNION` ordena automaticamente o resultado; esquecer que `UNION ALL` mantém duplicatas (ao contrário do `UNION` puro).
**Ação Prática:** escreva a diferença UNION×UNION ALL com um exemplo de linhas duplicadas.

---

### 🎯 Assunto: Funções de String, Data e Tratamento de NULL — Tabela de Equivalência entre SGBDs
**O que estudar obrigatoriamente:** é o tema mais denso de "decoreba comparativa" do banco — a FCC testa a função exata de cada SGBD como distrator sistemático. **Tratamento de NULL**: Oracle=`NVL(exp1,exp2)`; SQL Server=`ISNULL(exp1,exp2)`; MySQL=`IFNULL(exp1,exp2)`; padrão ANSI (todos os SGBDs)=`COALESCE(exp1,...,expN)` (aceita N argumentos, diferente do `NVL`, que aceita só 2). **Data atual**: Oracle=`SYSDATE`/`SYSTIMESTAMP` (data+hora); PostgreSQL=`NOW()`/`CURRENT_DATE`; MySQL=`NOW()`/`CURDATE()` (só data); SQL Server=`GETDATE()`/`SYSDATETIME()`; padrão ANSI=`CURRENT_DATE`/`CURRENT_TIMESTAMP`. **Autoincremento**: Oracle 12c+=`GENERATED BY DEFAULT AS IDENTITY` (antes, só via `SEQUENCE`+trigger); SQL Server=`IDENTITY`; MySQL=`AUTO_INCREMENT`; PostgreSQL=`SERIAL` (cria sequência internamente). **Substring**: Oracle/PostgreSQL=`SUBSTR` (índice baseado em **1**, não 0; posição 0 é tratada como 1); SQL Server=`SUBSTRING`/`RIGHT`/`LEFT`. **Arredondamento Oracle**: `ROUND(75.923,2)=75.92` (arredonda); `ROUND(75.923,-1)=80` (arredonda dígito à esquerda da vírgula); `TRUNC` só trunca sem arredondar. Outras: `INITCAP` (idêntica em Oracle/PostgreSQL, capitaliza 1ª letra de cada palavra); `MONTHS_BETWEEN`/`ADD_MONTHS` (Oracle, cálculo de meses); `STUFF` (SQL Server, remove+insere substring); `FORMAT()` (MySQL, formato numérico americano: vírgula=milhar, ponto=decimal).
**Por que estudar isso:** presente em todas as 7 partes — é o tipo de questão que a FCC usa para testar se o candidato sabe qual SGBD está sendo citado no enunciado, trocando a função certa pela de outro produto.
**Alerta de Pegadinha:** usar `NVL` fora do Oracle, `IFNULL` fora do MySQL; achar que `SUBSTR` usa índice 0 (usa 1); confundir `ROUND` com `TRUNC`.
**Ação Prática:** monte uma tabela de 5 linhas (NULL/data/autoincremento/substring/arredondamento) × 4 colunas (Oracle/PostgreSQL/SQL Server/MySQL) e memorize.

---

## 🧩 PL/SQL e Programação em Banco de Dados

### 🎯 Assunto: Blocos PL/SQL, Estruturas de Controle e Tipos de Dados
**O que estudar obrigatoriamente:** bloco PL/SQL: `DECLARE` (opcional) → `BEGIN...END` (obrigatório) → `EXCEPTION` (opcional, existe normalmente no Oracle 12c — cuidado com alternativas que negam sua existência). Laço contado: `FOR i IN 1..N LOOP ... END LOOP;` (não usa `STEP`/`BEGIN-END FOR`); laço genérico: `LOOP ... EXIT WHEN condição ... END LOOP;`. `CASE WHEN condição THEN valor ELSE valor END` equivale a `COALESCE`. `ELSIF` (não "ELSEIF") encadeia condições. Tipos: `NUMBER(p,s)` (p=precisão total, s=escala/casas decimais — `NUMBER(5,2)` = 5 dígitos totais, 2 após a vírgula); `VARCHAR2` (até 4000 caracteres padrão, até 32.767 no Oracle 12c com `MAX_STRING_SIZE=EXTENDED`) não completa com espaços, `CHAR` completa até o tamanho declarado (comparação `CHAR(10)`×`VARCHAR2(10)` com mesmo conteúdo textual pode dar diferente por causa do padding); `BOOLEAN`, `LONG RAW`. Lógica trivalorada com `NULL`: `A AND FALSE` é sempre `FALSE`; `A OR TRUE` é sempre `TRUE` (resultado determinado independente de A); nos demais casos envolvendo `NULL`, o resultado é `NULL`. Identificadores válidos: alfanuméricos, `_`, `$`, `#` (não aceitam `&`, hífen, `/`, espaço).
**Por que estudar isso:** base estrutural de todo PL/SQL, cobrada com simulação de execução passo a passo (a FCC gosta de pedir o resultado final de um bloco com variável sendo incrementada/decrementada).
**Alerta de Pegadinha:** achar que blocos Oracle 12c não têm `EXCEPTION`; confundir `CHAR` (completa com espaço) com `VARCHAR2` (não completa); achar que `NUMBER(5,2)` aceita 7 dígitos totais (aceita 5, sendo 2 decimais).
**Ação Prática:** simule manualmente a execução de um loop `FOR`/`LOOP...EXIT WHEN` de 5 iterações, anotando o valor da variável a cada passo.

---

### 🎯 Assunto: Cursores, Procedures e Functions
**O que estudar obrigatoriamente:** **Cursor** encapsula uma consulta para leitura linha a linha, evitando estouro de memória em resultados grandes; cursor **implícito** é gerado automaticamente por `SELECT INTO`. **Procedure** realiza uma ação (pode ter `INSERT`/`UPDATE`/`DELETE`, parâmetros de entrada/saída, sem retorno via `RETURN`); **Function** sempre calcula e devolve exatamente um valor escalar via `RETURN` (usável dentro de um comando SQL, ex. em `SELECT`). Chamada de procedure sem parâmetros: `CALL nome(...)` ou `EXEC nome`. `SELECT campo INTO variável FROM tabela WHERE condição` copia valor escalar para variável — erro de digitação no nome de uma coluna referenciada gera falha de **compilação** silenciosa, mesmo com o resto da lógica correta. `FORALL` (bulk DML) e `BULK COLLECT` (bulk SELECT) enviam lotes de comandos em uma única troca de contexto SQL↔PL/SQL, reduzindo drasticamente o overhead comparado a loops linha a linha (ganhos de mais de 7x relatados); `%BULK_ROWCOUNT` informa linhas afetadas por operação individual dentro do laço (diferente de `%ROWCOUNT`, que soma o total agregado). Ambas Procedures e Functions são pré-compiladas e armazenadas já compiladas no dicionário de dados.
**Por que estudar isso:** distinção Procedure×Function (retorno via RETURN) é testada repetidamente, junto com a sintaxe de bulk operations para desempenho.
**Alerta de Pegadinha:** achar que Function não pode ser chamada dentro de um SELECT; achar que Procedure sempre retorna valor; confundir `%BULK_ROWCOUNT` com `%ROWCOUNT`.
**Ação Prática:** escreva a diferença Procedure×Function em uma frase, com foco na obrigatoriedade do `RETURN`.

---

### 🎯 Assunto: Triggers
**O que estudar obrigatoriamente:** sintaxe completa: `CREATE [OR REPLACE] TRIGGER nome {BEFORE|AFTER|INSTEAD OF} evento ON tabela [FOR EACH ROW] [WHEN (condição)] BEGIN ... END;` — `INSTEAD OF` é usado **exclusivamente sobre VIEWs**, nunca sobre tabelas comuns. Trigger e o evento que o disparou formam **uma mesma transação** — distinto de Stored Procedure, que é passiva (precisa ser chamada explicitamente), enquanto trigger é ativa (disparada automaticamente pelo evento DML). Dentro do corpo, `:new.campo`/`:old.campo` (com dois-pontos) referenciam o valor novo/antigo da linha (sintaxe Oracle); padrão SQL usa `REFERENCING NEW ROW AS apelido` combinado com `SET apelido.campo = valor`. `FOR EACH ROW` dispara a ação **uma vez por linha afetada** (não uma vez para o comando inteiro) — só dispara quando ao menos uma linha é de fato afetada. `ALTER TRIGGER nome DISABLE/ENABLE` desabilita/reabilita sem excluir; `ALTER TABLE tabela DISABLE/ENABLE ALL TRIGGERS` afeta todos de uma tabela. Podem existir triggers sobre eventos **DDL** (`CREATE`/`ALTER`/`DROP`), não só DML. No PostgreSQL, quando uma trigger dispara outra em cascata, chama-se **cascading triggers** — sem limite de níveis pela própria engine (risco de recursividade).
**Por que estudar isso:** tema denso, com foco na sintaxe exata (BEFORE/AFTER/INSTEAD OF, FOR EACH ROW, WHEN) e no uso típico (manter contadores desnormalizados, auditoria, validação).
**Alerta de Pegadinha:** usar `INSTEAD OF` sobre tabela comum (só vale para views); achar que trigger e evento são transações separadas; confundir `:new`/`:old` com `REFERENCING NEW/OLD ROW AS`.
**Ação Prática:** escreva a sintaxe completa de uma trigger `AFTER INSERT FOR EACH ROW` que atualiza um contador em outra tabela.

---

### 🎯 Assunto: Packages, Exceptions, PRAGMA e Pacotes Built-in
**O que estudar obrigatoriamente:** packages têm 2 partes: **especificação** (interface pública — tipos, variáveis, exceções, cursores, assinaturas de subprogramas) e **corpo** (implementação — corpo opcional se a especificação não declarar nada que exija implementação). `PRAGMA AUTONOMOUS_TRANSACTION` trata a function/procedure como transação **independente** da transação principal — um `COMMIT` dentro dela não afeta transações abertas fora. `CASE WHEN...THEN` sem cobrir todos os valores gera exceção `CASE_NOT_FOUND` em tempo de execução (tratável com `EXCEPTION WHEN CASE_NOT_FOUND THEN`). Pacotes built-in do Oracle: `UTL_MAIL.SEND` envia e-mail (sem anexo, com `SENDER`/`RECIPIENTS`/`CC`/`BCC`/`SUBJECT`/`MESSAGE` nomeados) — `UTL_MAIL.SEND_ATTACH_RAW` é a variante com anexo.
**Por que estudar isso:** tema de nicho mas recorrente, especialmente a estrutura especificação×corpo de packages e o uso de `PRAGMA AUTONOMOUS_TRANSACTION`.
**Alerta de Pegadinha:** achar que packages sempre precisam de corpo; achar que `AUTONOMOUS_TRANSACTION` afeta a transação principal.
**Ação Prática:** escreva a diferença especificação×corpo de um package com um exemplo de cursor declarado na especificação.

---

## 🧩 Oracle — Arquitetura e Administração

### 🎯 Assunto: Arquitetura Interna, Processos e Dicionário de Dados
**O que estudar obrigatoriamente:** instância Oracle (SGA + processos em background) é distinta do banco de dados (arquivos físicos em disco). Banco = 1+ **tablespaces** (armazenamento lógico) compostos por **datafiles**; dentro de cada tablespace, estruturas lógicas (tabelas, índices) organizam-se em **segmentos** → **extensões** → **blocos** (o segmento, não o bloco, é a menor estrutura cujo tamanho é múltiplo do `DB_BLOCK_SIZE`). O dicionário de dados fica na tablespace **SYSTEM** (a mais crítica — se ficar indisponível, a instância aborta); `SYSAUX` guarda dados auxiliares, `UNDO` guarda dados de rollback, `TEMP` é usada para operações temporárias. **Redo Log Buffer** armazena alterações de DML para reconstrução em falha; processo **LGWR** grava esse buffer em disco a cada `COMMIT` (entre outros gatilhos). Contas administrativas padrão: **SYS** (dona do dicionário de dados, privilégio SYSDBA, nunca deve ser usada diretamente para operações rotineiras) e **SYSTEM** (funções administrativas gerais, mas não abre/fecha o banco nem faz backup/recover). O **listener** estabelece comunicação na conexão inicial, decidindo entre shared server (dispatcher) ou dedicated server. O otimizador (query optimizer) do 11g é composto, em ordem: transformador de consulta → estimador → gerador de plano, usando o dicionário de dados como fonte de estatísticas. `EXPLAIN PLAN FOR <sql>` grava o plano de execução na `PLAN_TABLE` para tuning.
**Por que estudar isso:** base estrutural para todo o restante de Oracle (backup, tuning, segurança) — presente em todas as 7 partes com muito detalhe.
**Alerta de Pegadinha:** achar que o bloco é a menor unidade de tamanho variável por segmento (é o segmento que varia em múltiplos do bloco); confundir SYS (dono do dicionário) com SYSTEM (administração geral); achar que Redo Log só guarda dado intermediário sem histórico.
**Ação Prática:** desenhe a hierarquia tablespace→datafile→segmento→extensão→bloco; escreva a diferença SYS×SYSTEM em uma frase.

---

### 🎯 Assunto: Backup, RMAN, Data Guard e Data Pump
**O que estudar obrigatoriamente:** **RMAN** é a ferramenta padrão de backup/recuperação física, mantendo metadados no controlfile (ou em catálogo de recuperação separado); componentes mínimos obrigatórios são só **target database + RMAN client** (Fast Recovery Area e Media Manager/SBT são opcionais); usa apenas 2 formatos — **image copies** e **backup sets** — e suporta paralelismo via múltiplos canais. **Hot backup** (inconsistente) é feito com o banco **aberto**, em modo ARCHIVELOG; **cold backup** (consistente) com o banco **fechado**. Script RMAN típico: `CONFIGURE CONTROLFILE AUTOBACKUP ON`, `CONFIGURE RETENTION POLICY TO RECOVERY WINDOW OF n DAYS`, `BACKUP INCREMENTAL LEVEL 0 DATABASE`. **Data Guard** (12c) tem a role **FarSync Standby**, um standby em cascata que repositoria archivelogs coordenando o primário com os demais standbys. **Data Pump/exp/imp** faz **backup lógico** (exportação de estrutura+dados via `.dmp`), distinto do backup físico do RMAN — Full Database Mode: `exp SYSTEM/senha PARFILE=arquivo.dat FULL=y GRANTS=y ROWS=y`. **Oracle Data Redaction** (Advanced Security) mascara dados sensíveis em tempo de execução da query (dado armazenado permanece inalterado) — diferente de TDE (que criptografa fisicamente em disco).
**Por que estudar isso:** RMAN e a distinção backup físico×lógico são cobrados com muito detalhe técnico em todas as partes com conteúdo Oracle.
**Alerta de Pegadinha:** achar que RMAN só tem 1 formato de backup; confundir hot backup (aberto) com cold backup (fechado); confundir Data Redaction (mascaramento em tempo de consulta) com TDE (criptografia física em disco).
**Ação Prática:** monte a tabela RMAN×Data Pump com a diferença física×lógica; escreva os componentes obrigatórios×opcionais do RMAN.

---

### 🎯 Assunto: Segurança Oracle — TDE, Advanced Security e Contas
**O que estudar obrigatoriamente:** **TDE** (Transparent Data Encryption, parte do Oracle Advanced Security) criptografa dados **automaticamente antes de gravar em disco** e decodifica antes de retornar à aplicação, de forma transparente — aplicável a nível de coluna ou de tablespace inteira. Autenticação de usuários Oracle: senha, sistema operacional hospedeiro, serviços de rede, ou **LDAP** (Lightweight Directory Access Protocol — cuidado com siglas inventadas como "Long Distance Authentication Protocol"). Advanced Security também suporta autenticação por certificado digital com **SSL** — atenção: o protocolo SSL foi formalmente descontinuado (RFC 7568), sendo **TLS** a resposta tecnicamente atualizada, mas algumas questões antigas ainda cobram SSL como resposta esperada. Diffie-Hellman serve apenas para **troca segura de chaves**, não para cifrar a conexão em si; Triple-DES e AES protegem a transmissão de dados.
**Por que estudar isso:** TDE é um dos recursos de segurança de banco mais cobrados do lote, cruzando com o tema geral de Segurança da Informação.
**Alerta de Pegadinha:** achar que TDE exige alteração na aplicação (é transparente); confundir Diffie-Hellman (troca de chave) com cifragem da conexão em si.
**Ação Prática:** escreva o que o TDE faz e em que 2 granularidades pode ser aplicado (coluna/tablespace).

---

### 🎯 Assunto: Tuning, Hints e Particionamento
**O que estudar obrigatoriamente:** hint de otimização insere-se como comentário especial logo após o `SELECT`: `/*+ FIRST_ROWS(n) */` — sem aspas, sintaxe exata. **AWR** (Automatic Workload Repository) coleta/mantém estatísticas via **snapshots** regulares (mnemônico: "AWR = snapshot"), base para tarefas automáticas de tuning. **SQL Tuning Advisor** analisa comandos de alta carga e gera recomendações (perfis SQL, análise de caminho de acesso); **SQL Access Advisor** foca estratégias de particionamento/índices; **ADDM** foca gargalos de CPU/memória/I/O — os três são distintos e não intercambiáveis. Particionamento de tabelas (10g+): **Range** (por intervalos, comum em datas), **Hash**, **Composite** (combina range+list/hash em sub-partições), **List** (valores explícitos por partição); 3 tipos de índice sobre tabelas particionadas: locais, particionados globais e **não particionados globais**. Seletividade de consulta (usada pelo otimizador) = registros que satisfazem a condição / total de registros — corresponde à operação de **Seleção** da álgebra relacional (não Projeção).
**Por que estudar isso:** tuning avançado é tema de nicho mas de alto retorno quando cai, pois costuma ser decoreba pura de nomes de ferramenta.
**Alerta de Pegadinha:** confundir SQL Tuning Advisor com SQL Access Advisor com ADDM; achar que existem só 2 tipos de índice em tabela particionada.
**Ação Prática:** monte a tabela dos 4 tipos de particionamento (Range/Hash/Composite/List) com um exemplo de uso de cada.

---

## 🧩 Outros SGBDs — PostgreSQL, SQL Server, MySQL, H2

### 🎯 Assunto: PostgreSQL — Comandos, Tipos e Administração
**O que estudar obrigatoriamente:** `VACUUM [ANALYZE] [tabela]` recupera espaço fragmentado por updates/deletes e atualiza estatísticas do otimizador — essencial para manter a marcação "all-visible" no Visibility Map e viabilizar index-only scans eficientes. `pg_dump` faz backup lógico de **um** banco; `pg_dumpall` faz backup do **cluster inteiro** (bancos+roles+tablespaces). `TRUNCATE TABLE` remove linhas sem `ROLLBACK` possível (diferente de `DELETE`). `CREATE MATERIALIZED VIEW` popula fisicamente no momento da criação; `REFRESH MATERIALIZED VIEW` atualiza depois. Tipos numéricos com tamanho exato: `smallint` (2 bytes), `integer` (4 bytes), `bigint` (8 bytes), `numeric`/`decimal` (precisão arbitrária); `serial`/`bigserial` são notação de conveniência para autoincremento (não tipos verdadeiros). `SELECT ... FOR UPDATE` bloqueia explicitamente linhas selecionadas. Extensões confiáveis (13+): `pgcrypto`, `tablefunc`, `hstore`. `FETCH FIRST n ROWS ONLY` (padrão SQL:2008) limita resultado. Índices **GiST** otimizam consultas espaciais (PostGIS) — B-tree não serve para dados espaciais não linearmente ordenáveis. Arquivo de configuração: `postgresql.conf`. `initdb` inicializa um cluster; `COPY TO`/`COPY FROM` exporta/importa dados de/para arquivo; `CREATE USER MAPPING FOR usuario SERVER nome` associa usuário a foreign server (Foreign Data Wrappers).
**Por que estudar isso:** PostgreSQL é o segundo SGBD mais cobrado do lote (65 questões só na tag específica), com muitos comandos administrativos de nicho testados literalmente.
**Alerta de Pegadinha:** confundir `pg_dump` (um banco) com `pg_dumpall` (cluster inteiro); achar que `VACUUM` só libera espaço sem afetar desempenho de índice.
**Ação Prática:** decore a diferença `pg_dump`×`pg_dumpall` e a função do `VACUUM` em relação ao Visibility Map.

---

### 🎯 Assunto: SQL Server — T-SQL, Arquitetura de Armazenamento e Administração
**O que estudar obrigatoriamente:** unidade fundamental de armazenamento é a **página** (8 KB, 128 páginas/MB) — não "cluster". Páginas **IAM** (Index Allocation Map) localizam extensões alocadas; páginas **PFS** (Page Free Space) registram % de ocupação de cada página. Arquivos: `.mdf` (dados principal), `.ndf` (dados secundário), `.ldf` (log). Tabela temporária **local** (`#nome`, só na sessão) × **global** (`##nome`, todas as conexões). `STUFF(string, início, tamanho, substituto)` remove e insere substring. `READ_COMMITTED_SNAPSHOT ON` habilita row versioning (reduz bloqueio leitor-escritor via TempDB, mais estrutural que `NOLOCK`, que permite dirty reads). Backup: `BACKUP DATABASE nome TO DISK='caminho' WITH DIFFERENTIAL` (RMAN é exclusivo Oracle). Adicionar usuário exige 3 passos: `CREATE LOGIN` (logon no servidor) → `CREATE USER ... FROM LOGIN` (mapeia ao banco) → `sp_addrolemember` para papéis `db_datareader`/`db_datawriter`. Tipos espaciais (2008+): `geometry` (coordenadas euclidianas) e `geography` (coordenadas do globo); `datetimeoffset` adiciona fuso horário (ISO 8601), diferente de `datetime2` (sem offset). `@@CONNECTIONS` conta tentativas de conexão desde o boot (não conexões simultâneas atuais).
**Por que estudar isso:** arquitetura de páginas/IAM/PFS e a sequência de criação de usuário são temas técnicos específicos com múltiplos gabaritos contestados na base — vale conferir a lógica, não decorar cegamente.
**Alerta de Pegadinha:** achar que `geography`/`geometry` são "latitude e longitude"; confundir `datetimeoffset` com `datetime2`; esquecer o 3º passo (`sp_addrolemember`) na criação de usuário.
**Ação Prática:** escreva os 3 passos de criação de usuário no SQL Server de memória, com o papel exato de cada comando.

---

### 🎯 Assunto: MySQL — Sintaxe, Privilégios e Storage Engines
**O que estudar obrigatoriamente:** controle de acesso em **2 estágios**: (1) autenticação de identidade (usuário/senha), (2) verificação de privilégio a cada comando, podendo consultar `tables_priv`/`columns_priv` para operações em tabelas específicas. Tabelas de sistema (5.7): `db` (privilégios por banco), `columns_priv` (por coluna), `procs_priv` (procedures/functions), `proxies_priv`. `LOCK TABLES`/`UNLOCK TABLES` bloqueiam explicitamente por sessão. Storage engines: **InnoDB** e BDB são "seguras com transação" (suportam `COMMIT`, recuperação); **MyISAM**, HEAP, ISAM, MERGE são "não seguras com transação" (mais rápidas, sem overhead transacional). `USE nome_bd` muda o banco corrente; `DESCRIBE`/`DESC tabela` exibe estrutura; `DROP DATABASE` apaga banco inteiro; `FLUSH PRIVILEGES` recarrega permissões após alteração manual nas tabelas de grant. Logs: slow query log (queries acima de `long_query_time` ou sem índice), log binário (todas as alterações, usado em replicação), log de erros.
**Por que estudar isso:** MySQL tem volume menor que Oracle/PostgreSQL/SQL Server no lote, mas os 2 estágios de controle de acesso e a distinção InnoDB×MyISAM aparecem repetidamente.
**Alerta de Pegadinha:** achar que MyISAM suporta transação (não suporta); confundir os 4 tipos de tabela de privilégio do MySQL 5.7.
**Ação Prática:** escreva os 2 estágios de controle de acesso do MySQL e quando cada um consulta `tables_priv`/`columns_priv`.

---

## 🧩 Modelagem de Dados — ER, Relacional e Normalização

### 🎯 Assunto: Modelagem ER — Entidades, Atributos e Cardinalidade
**O que estudar obrigatoriamente:** classificação de atributos por finalidade: **descritivo** (característica intrínseca), **nominativo** (além de descritivo, identifica/nomeia — ex.: CPF, matrícula), **referencial** (representa a ligação em um relacionamento) — cuidado com "normativo" usado por alguma banca como termo inexistente na literatura. Classificação por estrutura: **simples/atômico** (indivisível) × **composto** (decompõe em subpartes com significado próprio, ex.: Endereço→Rua/Cidade/CEP); **monovalorado** × **multivalorado** (múltiplos valores por entidade, ex.: Telefones de Contato); **armazenado** × **derivado** (calculado a partir de outro, ex.: Idade a partir de Data de Nascimento). **Atributo complexo** combina multivalorado E composto aninhados. Cardinalidade N:M: uma entidade de A **pode** (não "sempre deve") se associar a várias de B e vice-versa. **Papel** é a função que um conjunto de entidades desempenha dentro de um relacionamento — a mesma entidade pode assumir papéis distintos em relacionamentos distintos. Notação de Peter Chen: losango=relacionamento, retângulo=entidade, elipse=atributo.
**Por que estudar isso:** base conceitual de todo o bloco de modelagem, testada com terminologia precisa extraída literalmente de Navathe/Elmasri/Date.
**Alerta de Pegadinha:** trocar "nominativo" por "normativo"; achar que atributo multivalorado pode ter dois tipos de dados simultâneos (é um único tipo, múltiplos valores); confundir composto (subpartes com significado) com multivalorado (múltiplos valores do mesmo tipo).
**Ação Prática:** classifique 5 atributos reais (CPF, Endereço, Telefones, Idade, Salário) segundo as duas taxonomias (finalidade e estrutura).

---

### 🎯 Assunto: Entidade Fraca, Entidade Associativa e Relacionamentos Especiais
**O que estudar obrigatoriamente:** **entidade fraca** não tem atributos suficientes para formar PK própria — depende de um relacionamento identificador com uma entidade "forte"; sua PK é composta pela FK da entidade forte + um discriminador parcial (ex.: Volume de Processo = idProcesso + número sequencial do volume). Quando um relacionamento N:M precisa de atributos próprios (ex.: data da consulta) ou de se relacionar com terceiros, ele vira **entidade associativa** — o MER clássico não permite relacionamento entre relacionamentos. **Autorrelacionamento**/relacionamento **recursivo** liga uma entidade a ela mesma (ex.: Órgão Subordinante/Subordinado) — tipicamente 1:N para hierarquias. Um atributo que depende da **combinação** de duas entidades (não de nenhuma isoladamente — ex.: cargo de um funcionário numa empresa específica, alíquota por combinação contribuinte+imposto) vai **sempre** para a tabela associativa/relacionamento, nunca para uma das entidades-base. **Participação total** (linha dupla no diagrama): toda entidade do conjunto participa em pelo menos 1 relacionamento — distinta de "participa em todos os relacionamentos" (interpretação errada comum).
**Por que estudar isso:** confusão entidade fraca × entidade associativa × atributo do relacionamento é uma das pegadinhas mais recorrentes do banco inteiro, testada com dezenas de variações de cenário.
**Alerta de Pegadinha:** achar que qualquer entidade "dependente" é automaticamente fraca (às vezes é associativa); esquecer que atributo de combinação nunca fica isolado numa das entidades.
**Ação Prática:** para 3 cenários diferentes (Volume de Processo, Consulta Médica com data, Cargo por Funcionário-Empresa), classifique se a solução é entidade fraca, associativa, ou atributo do relacionamento.

---

### 🎯 Assunto: Notação Crow's Foot e Relacionamento Identificado × Não Identificado
**O que estudar obrigatoriamente:** notação "pé de galinha": círculo vazio + pé de galinha = **0:N** (zero ou mais); traço único + pé de galinha = **1:N** (um ou mais); traço único + círculo = **0:1**; traço duplo (dois traços perpendiculares) = **1:1 obrigatório**. Relacionamento **identificado** (identifying, linha **sólida**): a PK da entidade "pai" **compõe** a PK da entidade "filha". Relacionamento **não identificado** (non-identifying, linha **tracejada**): a FK do pai aparece na tabela filha mas **não integra** sua PK — é só mais um campo comum. Em relacionamento 1:N, a PK do lado "1" sempre vira FK no lado "N" (nunca o contrário) para garantir integridade referencial — a cardinalidade mínima (obrigatoriedade) é informação independente da máxima.
**Por que estudar isso:** é o tema mais repetido de todo o lote de modelagem (mais de 16 questões distintas testando essa notação especificamente) — altíssimo retorno por tempo de estudo.
**Alerta de Pegadinha:** trocar identificado (PK do pai compõe PK do filho) com não identificado (FK é só atributo comum); inverter qual símbolo Crow's Foot representa obrigatoriedade × opcionalidade.
**Ação Prática:** desenhe os 4 símbolos de cardinalidade Crow's Foot e rotule cada um; desenhe um relacionamento identificado e um não identificado lado a lado.

---

### 🎯 Assunto: Modelo Relacional — Chaves, Domínios e Integridade
**O que estudar obrigatoriamente:** **superchave** pode ser um **conjunto** de atributos; **chave candidata** é a superchave de tamanho mínimo; **chave primária** é a candidata escolhida — nenhuma delas tem limite numérico fixo de atributos. **Chave estrangeira** permite repetição livre e pode aceitar `NULL` (quem impede repetição é `UNIQUE`/`PRIMARY KEY`). **Domínio** é o conjunto de valores permitidos de um atributo — é **atômico** quando seus elementos são indivisíveis (não relacionado a limite de caracteres). Integridade **referencial**: FK deve corresponder a uma PK existente na tabela pai (ou ser `NULL`); `ON DELETE CASCADE` propaga exclusão do pai para os filhos automaticamente; sem `CASCADE`, a regra padrão `RESTRICT`/`NO ACTION` **bloqueia** a exclusão do pai se houver filhos. Relacionamento N:M nunca é implementado diretamente entre 2 tabelas físicas — sempre exige **tabela associativa** com PK composta pelas FKs das duas entidades originais, decompondo em dois relacionamentos 1:N (mnemônico: "duas tabelas N:M geram uma nova tabela 1:N"). `NULL` é ausência/desconhecimento de valor — não é 0 nem string vazia, e é ignorado por funções de agregação.
**Por que estudar isso:** consolida a base teórica que sustenta praticamente todas as questões de SQL/DDL de FK e de modelagem.
**Alerta de Pegadinha:** achar que FK não permite repetição (quem não permite é PK/UNIQUE); achar que N:M pode ser implementado sem tabela associativa; achar que `NULL` é sinônimo de zero.
**Ação Prática:** escreva o mnemônico "N:M vira 1:N + 1:N via tabela associativa" e aplique a um cenário próprio (ex.: Aluno-Disciplina).

---

### 🎯 Assunto: Formas Normais (1FN a BCNF)
**O que estudar obrigatoriamente:** **1FN**: atributos **atômicos**, sem grupos repetitivos/multivalorados/tabelas aninhadas — campo com múltiplos valores (`Telefone1, Telefone2...` ou uma célula com lista) viola a 1FN. **2FN**: 1FN + todo atributo não-chave depende **totalmente** da chave primária (sem dependência **parcial** de apenas parte de uma chave composta) — **só é relevante quando a PK é composta**; tabela com PK simples já satisfaz automaticamente a 2FN. **3FN**: 2FN + sem dependência **transitiva** entre atributos não-chave — um campo **calculado** a partir de outros dois atributos não-chave (ex.: `total = quantidade × preço`) é o exemplo clássico de violação. **BCNF** (3.5FN): mais restritiva que a 3FN — exige que **todo determinante seja uma superchave**. Teste rápido: "esse atributo depende de toda a chave, ou só de parte dela?" resolve a maioria das questões de 2FN; "esse atributo pode ser calculado a partir de outro não-chave?" resolve a maioria das de 3FN.
**Por que estudar isso:** é o tema de maior densidade de questões do lote inteiro de Banco de Dados — aparece com múltiplas variações em todas as 7 partes, geralmente com exemplo numérico de tabela para o candidato identificar a violação.
**Alerta de Pegadinha:** aplicar o teste de 2FN em tabela com chave simples (é sempre 2FN automaticamente); confundir dependência parcial (2FN) com dependência transitiva (3FN); achar que BCNF é "menos restritiva" ou "equivalente" à 2FN (é mais restritiva que a 3FN).
**Ação Prática:** pegue uma tabela com PK composta e um campo calculado, identifique a violação de 2FN e de 3FN separadamente, depois normalize até a 3FN.

---

### 🎯 Assunto: Álgebra Relacional e Arquitetura de Três Esquemas
**O que estudar obrigatoriamente:** modelo relacional = coleção de **tabelas** (relações), linhas = **tuplas**, colunas = **atributos**; álgebra relacional define operações (Seleção, Projeção, Junção, União etc.) que servem de base teórica para o SQL. **Arquitetura ANSI/SPARC de três esquemas**: nível **interno/físico** (estrutura de armazenamento, caminhos de acesso), nível **conceitual** (toda a estrutura do BD para a comunidade de usuários — entidades, tipos, relacionamentos, restrições, sem detalhes de armazenamento), nível **externo/de visão** (esquemas específicos por grupo de usuário). **Independência física de dados**: altera o esquema interno sem impactar o conceitual. **Independência lógica de dados**: altera o esquema conceitual sem impactar os esquemas externos/programas de aplicação (mais difícil de alcançar que a física). **Abstração de dados** é a característica que viabiliza ambas as independências. O catálogo/dicionário do SGBD armazena os **metadados** (estrutura de tabelas, tipos, restrições) — não os dados em si.
**Por que estudar isso:** tema conceitual clássico (Elmasri/Navathe/Date) testado com terminologia literal — decoreba de definição, mas de alto retorno.
**Alerta de Pegadinha:** atribuir características do nível de visão ao nível interno (ou vice-versa); trocar independência física com lógica.
**Ação Prática:** desenhe a pirâmide dos 3 esquemas (interno-conceitual-externo) com um exemplo de mudança que afeta só cada nível.

---

## 🧩 Transações, Concorrência, Recuperação e Índices

### 🎯 Assunto: Transações (ACID) e Controle de Concorrência
**O que estudar obrigatoriamente:** **ACID** = **A**tomicidade (tudo ou nada), **C**onsistência (estado válido antes/depois), **I**solamento (transações concorrentes não interferem entre si, como se fossem seriais), **D**urabilidade (mudanças de transação com `COMMIT` persistem mesmo com falha subsequente) — distratores clássicos trocam "Atomicidade" por "Atualização" e "Isolamento"/"Durabilidade" por "Autenticidade"/"Disponibilidade"/"Delegação". Alterações só ficam visíveis a outras sessões **após** `COMMIT` (propriedade de Isolamento). Bloqueio **compartilhado** (shared) permite só leitura simultânea; bloqueio **exclusivo** permite leitura e escrita, mas 1 transação por vez. Protocolo de bloqueio de **duas fases (2PL)**: fase de **crescimento** (só adquire bloqueios, não libera) → fase de **encolhimento** (só libera, não adquire novos). `SAVEPOINT nome` marca ponto de retorno; `ROLLBACK TO nome` desfaz só as operações posteriores ao savepoint (preservando o que veio antes); `COMMIT` confirma o que restou. **Starvation** (uma transação nunca avança porque outras sempre chegam e "furam a fila") é diferente de **deadlock** (espera circular entre 2+ transações).
**Por que estudar isso:** ACID e 2PL são temas-base testados em quase toda parte, com distratores de definição trocada como pegadinha central.
**Alerta de Pegadinha:** trocar Atomicidade/Durabilidade por sinônimos inventados; confundir fase de crescimento com encolhimento no 2PL; confundir starvation (sem espera circular) com deadlock (com espera circular).
**Ação Prática:** escreva as 4 letras do ACID com a definição exata de cada uma, sem olhar; desenhe o fluxo SAVEPOINT→ROLLBACK TO→COMMIT com 3 INSERTs.

---

### 🎯 Assunto: Recuperação de Falhas, Backup e Replicação
**O que estudar obrigatoriamente:** arquivos de log devem conter valores **antigos e novos** dos registros modificados, além de marcas de início/fim/commit/abort de cada transação — essenciais para `undo`/`redo`. **Recuperação adiada** (NO-UNDO/REDO): só grava no disco após o `COMMIT`; **recuperação imediata**: grava antes do commit, exigindo `UNDO` em falha. **Checkpoint**: registro no log indicando que transações encerradas antes daquele ponto já foram confirmadas — suspende novas transações temporariamente, força gravação de "dirty pages" e do próprio registro de checkpoint, acelerando a recuperação (evita reprocessar o log inteiro). Backup **diferencial**: salva o que mudou desde o último backup **completo**; backup **incremental**: salva o que mudou desde o último backup de **qualquer tipo** (restauração mais lenta, exige aplicar todos em sequência). Replicação **síncrona**: atualiza todas as réplicas na **mesma transação** (mais consistente, menor desempenho); **assíncrona**: propaga com atraso em transação separada (menor impacto, risco de desatualização temporária). Mais réplicas = maior disponibilidade e **menor** movimento de dados entre sites em leituras (dado mais provável de estar localmente disponível), mas maior custo de sincronização em escritas.
**Por que estudar isso:** distinção diferencial×incremental e síncrona×assíncrona são pegadinhas centrais, testadas com definição invertida como distrator.
**Alerta de Pegadinha:** trocar backup diferencial (sempre desde o completo) com incremental (desde o último de qualquer tipo); achar que réplicas em maior número aumentam o tráfego de leitura (aumentam disponibilidade e reduzem tráfego).
**Ação Prática:** escreva a diferença diferencial×incremental com um cenário de 3 backups consecutivos; escreva a diferença síncrona×assíncrona em termos de "mesma transação × transação separada".

---

### 🎯 Assunto: Índices e Views
**O que estudar obrigatoriamente:** índices em árvore **B+** são estruturas balanceadas (todos os caminhos raiz→folha têm o mesmo tamanho); ocupam espaço adicional além das tabelas, podem ser criados sobre qualquer tipo de atributo, uma tabela pode ter múltiplos índices, e são atualizados a **cada** operação relevante (não em intervalos fixos). Finalidade principal: **melhorar desempenho de consultas** — devem ser criados estrategicamente em colunas usadas em `WHERE`/`ORDER BY`/`GROUP BY`, não em todos os campos indiscriminadamente (custo de manutenção em cada escrita). **View** armazena apenas o **comando de criação** (definição da consulta) — os dados continuam fisicamente nas tabelas-base; funciona como mecanismo de autorização **discricionário**, restringindo colunas/tuplas visíveis a uma conta (ex.: esconder coluna de senha). **View materializada** (Oracle/PostgreSQL), ao contrário, armazena **fisicamente** o resultado — útil para performance em DW, exigindo `REFRESH` para atualizar.
**Por que estudar isso:** distinção view×view materializada e o papel de segurança discricionária das views são temas recorrentes.
**Alerta de Pegadinha:** achar que view guarda os dados fisicamente (só a materializada guarda); achar que índices são atualizados só periodicamente.
**Ação Prática:** escreva a diferença view×view materializada em uma frase, com foco em onde os dados ficam fisicamente.

---

## 🧩 Segurança em Banco de Dados

### 🎯 Assunto: Controle de Acesso, Criptografia e Prevenção a SQL Injection
**O que estudar obrigatoriamente:** **MAC** (Mandatory Access Control) é decidido pelo **sistema** (não pelo dono do recurso), baseado em nível de classificação do dado × nível de liberação do usuário; **DAC** (Discretionary) é decidido pelo **dono**; **RBAC** é baseado em papéis. **Controle de inferência** protege bancos estatísticos, impedindo que consultas agregadas revelem dados individuais confidenciais. Para proteger dados sensíveis simultaneamente **em repouso** e **em uso**: **TDE** (criptografa/descriptografa transparentemente arquivos em disco) + **mascaramento dinâmico** (ofusca valor no resultado da consulta conforme perfil do usuário, em tempo real) — mascaramento **estático** altera os dados permanentemente (perda irreversível do original). **SQL Injection** — técnica mais eficaz de prevenção: **prepared statements/parameterized queries** (o SGBD separa código de dado, tratando entrada do usuário sempre como valor literal) e stored procedures; validação por whitelist e escaping são defesas **secundárias**. Tipos de SQL Injection: **Filter Bypassing** (altera caracteres para burlar filtro), Poorly Filtered Strings (parâmetro não filtrado), Incorrect Type Handling, Signature Evasion, Blind SQL Injection. A técnica de negar acesso a certos usuários com `DENY` bloqueia mesmo com herança de outro papel (ver bloco de DCL).
**Por que estudar isso:** cruza diretamente com o eixo de Segurança da Informação do edital — tema de alto retorno por conectar dois blocos do concurso.
**Alerta de Pegadinha:** confundir MAC (decisão do sistema) com DAC (decisão do dono); achar que mascaramento estático e dinâmico são a mesma coisa; achar que escaping é defesa primária contra SQL Injection (é secundária).
**Ação Prática:** escreva a diferença TDE×mascaramento dinâmico (repouso×uso); escreva por que prepared statements resolvem SQL Injection na raiz.

---

## 🧩 Data Warehouse e Business Intelligence

### 🎯 Assunto: Modelagem Dimensional — Tabela Fato/Dimensão, Estrela e Floco de Neve
**O que estudar obrigatoriamente:** tabela **Fato** (central) contém métricas quantitativas (valor, quantidade, tempo) + FKs para as dimensões — sua PK é tipicamente a combinação das PKs de todas as dimensões relacionadas; tabelas **Dimensão** (periféricas) contêm atributos descritivos/qualitativos (nome, categoria, data), usadas para filtrar/agrupar. Esquema **estrela**: dimensões **desnormalizadas**, ligam-se **só** à tabela fato (nunca entre si), menos junções, mais redundância controlada. Esquema **floco de neve** (snowflake): dimensões **normalizadas até a 3FN** em subdimensões hierárquicas, mais junções, menos redundância — "snowflaking" é justamente esse processo de normalização. **Constelação de fatos**: mais de uma tabela fato compartilhando dimensões (dimensão conformada). Não há limite de tabelas dimensão por fato. Tabela fato do tipo **"cesta de mercado"** (market basket) agrega pares de produtos comprados juntos numa mesma transação — ligação direta com Data Mining (regras de associação).
**Por que estudar isso:** tema-base de todo o bloco de DW, testado em praticamente toda parte com foco na distinção estrela×floco de neve (redundância×normalização).
**Alerta de Pegadinha:** achar que dimensões se relacionam entre si no modelo estrela (só ocorre no floco de neve); trocar qual esquema é normalizado (floco de neve) e qual é desnormalizado (estrela).
**Ação Prática:** desenhe um esquema estrela simples (Vendas como fato, Produto/Tempo/Cliente como dimensões) e depois normalize uma dimensão para virar floco de neve.

---

### 🎯 Assunto: OLAP × OLTP e Operações sobre Cubos de Dados
**O que estudar obrigatoriamente:** **OLTP** captura transações em tempo real (INSERT/UPDATE/DELETE), foco **operacional**, não salva histórico, minimiza índices para não penalizar escrita; **OLAP** tem foco **gerencial/estratégico**, dados agregados/voláteis só no processo de carga, **mais** índices para otimizar consultas ad hoc, consultas podem levar horas. Operações sobre cubo: **drill-down** aumenta detalhe/diminui granularidade (desce na hierarquia, ex.: ano→mês); **roll-up**/drill-up é o inverso (agrega, sobe na hierarquia); **slice** fixa **uma** dimensão (corta em fatia, mesma perspectiva); **dice** fixa **múltiplas** dimensões (subcubo); **pivot**/rotation troca os eixos de visualização sem alterar o escopo dos dados; **drill-across** usa **mais de uma tabela fato** via dimensão conformada compartilhada (técnica de Kimball); **drill-through** muda de **dimensão** (não de nível de detalhe). Modelos de armazenamento de cubo: **MOLAP** (estrutura multidimensional própria pré-calculada, melhor desempenho, menor escalabilidade); **ROLAP** (lê/agrega direto do relacional via SQL, maior escalabilidade, menor desempenho); **HOLAP** (híbrido — lê do relacional, grava agregações em multidimensional); **DOLAP** (cubo parcial no desktop do usuário).
**Por que estudar isso:** operações OLAP são o tema mais repetido do bloco de BI, cobrado com cenários textuais que exigem identificar a operação certa sem citar o nome dela.
**Alerta de Pegadinha:** achar que drill-down diminui detalhe (aumenta); trocar slice (1 dimensão) com dice (2+ dimensões); confundir drill-across (múltiplas tabelas fato) com drill-through (muda de dimensão); achar que MOLAP lê direto do relacional (é o ROLAP que faz isso).
**Ação Prática:** monte a matriz das 7 operações OLAP (drill-down/roll-up/slice/dice/pivot/drill-across/drill-through) com definição de 1 linha cada; monte a tabela MOLAP×ROLAP×HOLAP×DOLAP com onde lê e onde grava.

---

### 🎯 Assunto: ETL (Extract, Transform, Load)
**O que estudar obrigatoriamente:** fluxo: **Extração** (fontes operacionais/OLTP, nunca do próprio DW) → **Staging Area** (área intermediária fora de acesso de usuários finais, não suporta queries diretas, usada para limpeza/validação) → **Transformação** (padroniza/enriquece/traduz valores codificados, gera surrogate keys — segundo Kimball, geração de surrogate keys pertenceria à etapa de Entrega/Delivery, não Transformação, mas a FCC costuma classificar como Transformação) → **Carga** (insere no DW, nunca nos sistemas operacionais de origem). Mnemônico "ELPE": Extrai, Limpa, Prepara, Entrega. A carga pode ocorrer em ciclos variáveis (não há regra fixa de "1x por semana"). **Master Data Management (MDM)** une dados de múltiplas fontes numa "visão única" — inclui ETL + data integration, distinto de Data Virtualization (mistura sem mover), Event Stream Processing (tempo real) e Data Quality.
**Por que estudar isso:** ETL é tema-âncora que conecta OLTP a DW/BI, testado com foco na ordem correta das fases e no que cada uma faz.
**Alerta de Pegadinha:** achar que a extração lê do próprio DW (é sempre da fonte operacional); achar que a Staging Area suporta consultas de usuário final.
**Ação Prática:** escreva o fluxo ELPE completo com um exemplo real de dado sendo padronizado na Transformação.

---

### 🎯 Assunto: Data Mining — Técnicas, CRISP-DM e Aplicações
**O que estudar obrigatoriamente:** técnicas **preditivas**: **classificação** (aprendizado supervisionado, categorias pré-definidas, ex.: adimplente/inadimplente), **regressão** (valor numérico contínuo), **detecção de desvios/anomalias**; técnicas **descritivas**: **clusterização** (agrupamento não supervisionado), **associação/coocorrência** ("quem compra X também compra Y" — exemplo clássico fraldas+cerveja), **padrões sequenciais** (sequência temporal de eventos). **CRISP-DM**, 6 fases em ordem: **Business Understanding** → **Data Understanding** → **Data Preparation** → **Modeling** → **Evaluation** → **Deployment** (mnemônico "Ei Ei PM Aí"). Data Mining descobre correlações/padrões **ocultos** em grandes volumes — usado em auditoria/investigação (clusterização + regras de associação detectam conluio entre empresas em licitações, ou fraude fiscal via relações entre pessoas/entidades/eventos).
**Por que estudar isso:** CRISP-DM e a distinção entre as técnicas preditivas/descritivas são cobradas em praticamente toda parte com boa densidade.
**Alerta de Pegadinha:** confundir classificação (supervisionado, categorias conhecidas) com clusterização (não supervisionado, grupos descobertos); errar a ordem das 6 fases do CRISP-DM.
**Ação Prática:** decore as 6 fases do CRISP-DM em ordem e escreva um exemplo de aplicação de cada técnica (classificação/regressão/associação/clusterização) num cenário de auditoria pública.

---

### 🎯 Assunto: Business Intelligence — Conceitos e Ferramentas
**O que estudar obrigatoriamente:** BI é a aplicação de técnicas analíticas sobre condições de negócio, de forma automatizada mas com interpretação humana, para melhorar tomada de decisão — não confundir com definições de frameworks de governança de TI (ex.: COBIT) que às vezes aparecem como distrator. Ordem típica de um pipeline de BI: **Sistemas OLTP** → ETL → **DW** → **Data Marts** (recorte por assunto/departamento) → **ferramentas OLAP** (análise), com gestão de metadados e administração transversal a todas as etapas. **Data Mart** pode ser construído **Top-Down** (a partir do DW corporativo já pronto) ou **Bottom-Up** (Kimball — Data Marts departamentais primeiro, ROI mais rápido, risco de inconsistência de metadados entre eles até consolidação futura). No Microsoft SQL Server 2012: **Power View** (apresentação/visualização interativa), **Power Pivot** (modelagem de dados em memória com relacionamentos/medidas/KPIs), Power Query (conexão/transformação), Power Map (mapas geoespaciais 3D).
**Por que estudar isso:** conecta os conceitos isolados de DW/OLAP/Data Mining/ETL num pipeline único — útil para responder questões de "ordene as etapas" ou "identifique o componente".
**Alerta de Pegadinha:** confundir a definição de BI com a de um framework de governança (COBIT); trocar Top-Down com Bottom-Up na construção de Data Marts.
**Ação Prática:** desenhe o pipeline completo OLTP→ETL→DW→Data Mart→OLAP com metadados/administração ao redor.

---

## 🧩 Big Data, NoSQL e Banco de Dados Distribuídos

### 🎯 Assunto: Big Data — 5 Vs e Ecossistema Hadoop/Spark
**O que estudar obrigatoriamente:** base mínima histórica = **3 Vs**: Volume, Velocidade, Variedade; conjunto completo = **5 Vs**, acrescentando **Veracidade** (confiabilidade/filtragem de dados falsos) e **Valor** (utilidade/retorno da coleta frente ao custo) — não confundir com termos inventados ("Versatilidade", "Volatilidade"). Ecossistema Hadoop/Spark: **HDFS** (armazenamento distribuído); **Spark Core** (processamento em memória, muito mais rápido que MapReduce, que é batch); **Spark Streaming** (tempo real via micro-batches, latência aceitável para ETL/logs); **Spark SQL** (dados estruturados via SQL/DataFrames); **MLlib** (machine learning); **GraphX** (grafos); **YARN** (gerenciador de recursos, não armazenamento). **Flink** processa em **true real-time** evento a evento (não micro-batch), com semântica **exactly-once** nativa — mais adequado a aplicações críticas (fraude, IoT) que o Spark Streaming. PySpark: sempre reduzir volume **antes** de converter para pandas (`df.limit(n).toPandas()`, nunca `.toPandas()` do DataFrame inteiro). Blockchain é adequado para **metadados**/trilha de auditoria imutável, não para dados brutos volumosos (vídeo em alta resolução, que deve ficar em HDFS); segurança do blockchain vem de criptografia **e** consenso descentralizado (PoW/PoS são mecanismos de consenso, não de criptografia).
**Por que estudar isso:** tema moderno crescente, com vocabulário técnico específico (a FCC testa a atribuição correta de cada característica a cada ferramenta do ecossistema).
**Alerta de Pegadinha:** achar que a base mínima de reconhecimento de Big Data já inclui os 5 Vs (a base histórica é só 3); confundir MapReduce (batch) com processamento em tempo real; trocar Spark Streaming (micro-batch) com Flink (true real-time).
**Ação Prática:** monte a tabela HDFS/Spark Core/Streaming/SQL/MLlib/GraphX/YARN com a função de cada componente; escreva a diferença Spark Streaming×Flink em uma frase.

---

### 🎯 Assunto: NoSQL — Tipos e Casos de Uso
**O que estudar obrigatoriamente:** **chave-valor**: recuperação por chave única, latência muito baixa, ideal para leituras repetitivas de indicadores já consolidados — não otimizado para junções complexas. **Documentos** (JSON/BSON): dados estruturados+não estruturados no mesmo registro, alta escalabilidade, ideal para combinar campos "certos" com "bagunçados". **Colunar**: voltado a agregações analíticas massivas (estilo OLAP). **Grafos**: nós+relacionamentos+propriedades, ideais para consultas profundas de vizinhança/caminhos entre entidades (ex.: investigação de fraude fiscal entre empresas/sócios), usando algoritmos como DFS/BFS. Apenas **chave-valor** e **documentos** também podem ser representados em formato linha/coluna tradicional — **grafos** usam estrutura de vértices/arestas incompatível com essa representação. Escalabilidade **horizontal** (scale-out, adicionar nós) é característica típica de NoSQL; bancos relacionais tradicionalmente escalam **verticalmente** (scale-up) — mas relacionais funcionam bem em nuvem (RDS) e suportam replicação automática, não sendo "incompatíveis" com nuvem.
**Por que estudar isso:** tema em ascensão, testado com cenário de aplicação ("qual tipo de NoSQL serve para X") mais do que definição pura.
**Alerta de Pegadinha:** achar que bancos orientados a grafos podem virar tabela linha/coluna; achar que escalabilidade horizontal é característica de relacional (é de NoSQL).
**Ação Prática:** para 4 cenários diferentes (cache de sessão, catálogo de produtos com campos variáveis, análise de fraude por rede de relacionamentos, dashboard analítico agregado), escolha o tipo de NoSQL/SGBD mais adequado.

---

### 🎯 Assunto: Banco de Dados Distribuídos e Paralelos — Fragmentação e Replicação
**O que estudar obrigatoriamente:** **fragmentação horizontal** divide **linhas/tuplas** (cada fragmento mantém todos os atributos, subconjunto de registros por predicado de seleção — pode haver sobreposição se o predicado mudar); **fragmentação vertical** divide **atributos/colunas** (mantém um `id_tupla`/tuple-id para permitir reconstrução — esse atributo é um artifício que tecnicamente **viola** a independência de dados, mas é necessário). **Replicação** mantém cópias idênticas em sites diferentes, aumentando **disponibilidade** (falha em 1 site não impede acesso via outro) — mais réplicas = mais paralelismo de leitura (várias consultas em paralelo), mas maior overhead de sincronização em escrita. **Redundância controlada**: o próprio SGBD/aplicação tem ciência da múltipla representação e garante sincronismo sozinho; **redundância não controlada**: essa responsabilidade cai sobre o usuário/aplicação externa. **Transparência de localização**: usuário não precisa saber em qual nó físico os dados residem.
**Por que estudar isso:** distinção fragmentação horizontal×vertical e replicação síncrona×assíncrona (ver bloco de Recuperação de Falhas) são as pegadinhas centrais do bloco de sistemas distribuídos.
**Alerta de Pegadinha:** trocar fragmentação horizontal (linhas) com vertical (colunas); achar que mais réplicas aumentam o tráfego de leitura entre sites (aumentam disponibilidade e paralelismo, reduzindo tráfego).
**Ação Prática:** desenhe um exemplo de fragmentação horizontal e um de vertical para a mesma tabela, mostrando como cada uma permite reconstruir o original.

---

# ✅ Observações finais

- **Este é o maior lote processado até agora neste projeto** (932 questões, 7 partes) e também o de maior densidade de gabaritos contestados — mais de 25 casos documentados individualmente nos `raw_md` de origem. Vários são erros claros de registro (a base cita um comando que não existe em nenhum SGBD real, como "IFOPERATION" ou "usradd"), não divergências genuínas de interpretação da banca — mas alguns são debates reais (ex.: Top-Down×Bottom-Up, RESTRICT×CASCADE). Ao estudar por questões antigas, sempre relia a explicação técnica dos comentários antes de assumir que errou por falta de conhecimento.
- O bloco de **SQL multi-SGBD** (Oracle/PostgreSQL/SQL Server/MySQL) é, disparadamente, o de maior volume do lote — a estratégia de estudo mais eficiente é montar uma única tabela de equivalência de funções (NULL/data/autoincremento/substring) e revisá-la seguidas vezes, já que a mesma pergunta se repete trocando só o SGBD citado.
- **Formas Normais** e **notação Crow's Foot/relacionamento identificado** são, respectivamente, os temas de maior densidade absoluta de questões em SQL/modelagem e em ER — priorize-os se o tempo de estudo for escasso.
- Pequenos vazamentos pontuais para outras áreas do edital aparecem no lote (Governança de TI — Spring/PDPJ, Eureka/Zuul/Flyway; Arquitetura de Software — JPA/Hibernate, arquitetura hexagonal; Segurança — SQL Injection, TDE, criptografia) — cobertos nos `raw_md` de origem com tags `[Área]`, mas sem volume suficiente para blocos prescritivos dedicados aqui.
- Os 7 resumos brutos que originaram este guia estão em `guia_estudos_subagentes/raw_md/40_banco_de_dados_parte1_de_7.md` a `parte7_de_7.md`, cada um citando todos os `id_questao` das 932 questões do lote como evidência — consulte-os para os exemplos completos, a sintaxe SQL exata de cada regra e a lista integral de gabaritos contestados por trás de cada resumo aqui.
