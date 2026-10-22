# 📘 Guia de Estudo Direcionado e Prescritivo — Linguagens de Programação do Analista (TRT 4ª Região · Edital 2026)

> **Guia novo do Edital TRT4 nº 01/2026, seção 6.4 [A].** O edital do Analista pede **"conhecimento profundo"** de **Visual Basic, Delphi, PHP, Python, C, Java e C#**, além do arcabouço **.NET**. No edital antigo, a maioria dessas linguagens tinha sido **descartada** (ver a tabela "Fora do escopo" do guia **Desenvolvimento de Software**, já corrigida). Os resumos brutos descartados na época (`16_php.md`, partes de Delphi, C e C#) voltam a ser úteis. Este guia foca no que a FCC cobra: **trace de código**, sintaxe, tipos, literais e strings, operadores e precedência, OO e exceções. Não vem do banco processado.
>
> **Para o Técnico [T]:** as linguagens dele são Java, Python, JavaScript, TypeScript e Angular (seção 6.4 [T]). Deste guia, valem os blocos **Fundamentos comuns** e **Python**.

**Legenda:** **[A+T]** cai nos dois · **[A]** só Analista · **[T]** só Técnico.

---

## 🧩 Fundamentos comuns [A+T]

### 🎯 Assunto: Compilação × Interpretação, Estrutura de Programa e Execução
**O que estudar obrigatoriamente:** **C** e **Delphi** são compiladas para **código nativo**. **Java** compila para **bytecode** (`.class`), executado pela **JVM**, que interpreta e compila com JIT. **C#/VB.NET** compilam para **CIL/MSIL** (num *assembly* `.dll`/`.exe`), executado pelo **CLR** com **JIT**, e o AOT também é possível. **Python** e **PHP** são interpretadas (o CPython compila para *bytecode* `.pyc` e o interpreta; o PHP usa *opcache* e tem JIT desde a versão 8). **Pontos de entrada**: em C, `int main(void)`; em Java, `public static void main(String[] args)`; em C#, `static void Main(string[] args)` ou *top-level statements*; em Delphi, o bloco `begin ... end.` do `.dpr`; em Python, `if __name__ == "__main__":`. Fases do compilador: análise **léxica** (*tokens*) → **sintática** (árvore) → **semântica** (tipos) → geração de código intermediário → otimização → código-objeto, seguidas da **ligação** (*linker*).
**Por que estudar isso:** é [A+T] ("estrutura de programa, compilação e execução").
**Alerta de Pegadinha:** dizer que Java é "interpretado puro" ou "compilado para nativo"; dizer que o C# roda direto no processador sem o CLR.
**Ação Prática:** uma linha por linguagem: "fonte → artefato → quem executa".

---

### 🎯 Assunto: Literais, Strings, Operadores e Precedência [A; operadores = A+T]
**O que estudar obrigatoriamente:** **literais inteiros**: hexadecimal `0x1F`, binário `0b101` (Java 7+, C# 7+, Python), **octal** `017` em **C e Java** (zero à esquerda: **`010 == 8`**!), enquanto no Python 3 o octal é `0o17` e `017` é **erro**. O separador `_` vale em Java, C# e Python (`1_000_000`). Sufixos: `L` (long), `f`/`F` (float), `d`, `m` (decimal em C#). **Strings**: em **Java**, `String` é **imutável**, há o *string pool*, `==` compara **referência** e `equals` compara **conteúdo**; `StringBuilder` serve para concatenação em laço. Em **C#**, `string` também é imutável, mas **`==` compara conteúdo** (operador sobrecarregado); há literais *verbatim* `@"C:\pasta"`, interpolação `$"{x}"` e *raw strings* `"""..."""`. Em **C**, a string é um `char[]` terminado em **`'\0'`**, então `strlen("abc") == 3` e `sizeof("abc") == 4`. Em **Python**, `str` é imutável e há *f-strings* `f"{x}"`, *slicing* `s[1:3]`, `s[::-1]` e `*` para repetir. Em **PHP**, aspas **duplas interpolam** variáveis (`"Olá $nome"`) e **simples não**, e a concatenação é feita com **`.`**. No **Delphi**, as strings usam aspas **simples**, a concatenação é com `+` e o **índice começa em 1**. **Precedência** (C/Java/C#): unários (`!`, `++`, `--`) > multiplicativos > aditivos > *shifts* > relacionais > igualdade > `&` > `^` > `|` > **`&&` > `||`** > ternário > atribuição. **Pré × pós-incremento**: em Java e C#, `x = 5; y = x++ + ++x;` dá `y = 5 + 7 = 12` e `x = 7` (em C, modificar `x` duas vezes na mesma expressão é **comportamento indefinido**). **Divisão inteira**: `7 / 2 == 3` em C, Java e C# (com int); em Python 3, `7 / 2 == 3.5` e `7 // 2 == 3`. O sinal do resto também difere: `-7 % 3` dá `-1` em C e Java e `2` em Python. **Curto-circuito**: `&&`/`||` em C, Java e C#; `and`/`or` em Python; `AndAlso`/`OrElse` em VB.NET (`And`/`Or` **não** fazem curto-circuito); no Delphi, o `and`/`or` faz curto-circuito por padrão (diretiva `{$B-}`).
**Por que estudar isso:** são as questões de **trace** favoritas da FCC, e "Literais e strings" é item explícito do [A].
**Alerta de Pegadinha:** `010` em Java vale 8; `==` entre `String` em Java compara referência; o resto negativo muda entre as linguagens; `And` do VB não faz curto-circuito.
**Ação Prática:** escreva 10 *snippets* de trace (um por pegadinha acima) e resolva sem rodar. Depois confira rodando.

---

## 🧩 Linguagens do Analista [A]

### 🎯 Assunto: C
**O que estudar obrigatoriamente:** tipos (`char`, `int`, `float`, `double`, modificadores `unsigned`/`long`/`short`) e `sizeof`. **Ponteiros**: `&` (endereço), `*` (desreferência), aritmética de ponteiros (`p + 1` avança `sizeof(*p)` bytes) e **arrays que decaem para ponteiro** (`a[i] == *(a + i)`). **Passagem** é sempre **por valor**: para alterar uma variável do chamador, passe um ponteiro (`void troca(int *a, int *b)`). Memória dinâmica: `malloc`/`calloc`/`realloc`/`free` (vazamento × *dangling pointer*). `struct`, `typedef`, `enum`, `union`. Pré-processador: `#include`, `#define` (macro sem tipagem; cuidado com parênteses: `#define SQ(x) x*x`, e `SQ(1+2)` dá `1+2*1+2 = 5`). `switch` **com *fall-through*** se faltar `break`. `printf` com `%d`, `%f`, `%c`, `%s`, `%p`, `%x`. Não há `bool` nativo antes do C99 (`<stdbool.h>`); `0` é falso e qualquer outro valor é verdadeiro.
**Por que estudar isso:** é "conhecimento profundo" no [A], e a FCC adora trace com ponteiros e macros.
**Alerta de Pegadinha:** a macro sem parênteses; o `switch` sem `break`; `if (x = 0)` (atribuição, sempre falsa); o `sizeof` de um array passado como parâmetro (dá o tamanho do **ponteiro**).
**Ação Prática:** faça o trace de um programa com `troca(&a, &b)`, um laço com `p++` sobre um array e uma macro sem parênteses.

---

### 🎯 Assunto: Java (complemento ao guia Desenvolvimento de Software) e Python
**O que estudar obrigatoriamente:** **Java**: tipos primitivos (`byte` 8, `short` 16, `int` 32, `long` 64, `float` 32, `double` 64, `char` 16 bits Unicode, `boolean`) × **referência**. *Wrappers*, *autoboxing* e o cache de `Integer` (−128 a 127, por isso `Integer a = 127, b = 127; a == b` dá `true`, mas com `128` dá `false`). *Casting* com promoção (`byte + byte` resulta em `int`). Exceções **checadas** (`Exception`, que exige `throws`/`try`) × **não checadas** (`RuntimeException`) × `Error`; `finally` sempre executa; *try-with-resources* (`AutoCloseable`). Coleções: `List`/`ArrayList`, `Set`/`HashSet`, `Map`/`HashMap` (o contrato `equals`/`hashCode`). Acesso a banco com **JDBC** (`DriverManager` → `Connection` → `PreparedStatement` → `ResultSet`). **Python**: tipagem **dinâmica e forte** (`"1" + 1` dá **TypeError**); `list` (mutável), `tuple` (imutável), `dict`, `set`; *slicing*; *list/dict comprehensions*; `is` (identidade) × `==` (igualdade); **argumento padrão mutável** (`def f(x, l=[])` acumula entre chamadas!); `*args`/`**kwargs`; funções de primeira classe e `lambda`; *generators* com `yield`; decoradores; `with` (gerenciador de contexto); exceções com `try/except/else/finally` (o `else` roda se **não** houve exceção); classes com `self`, `__init__`, herança múltipla com MRO e métodos "privados" por convenção (`_x`, ou `__x` com *name mangling*).
**Por que estudar isso:** o Java é [A+T] e o Python é [A] e [T].
**Alerta de Pegadinha:** o cache de `Integer`; o padrão mutável em Python; achar que o `else` do `try` roda quando há exceção; dizer que Python é fracamente tipado.
**Ação Prática:** trace de 3 snippets Python (padrão mutável, `is` × `==`, *slicing* negativo) e 3 Java (cache de Integer, `finally` com `return`, *overload* × *override*).

---

### 🎯 Assunto: C# e o Arcabouço .NET (revisão rápida para o seu perfil)
**O que estudar obrigatoriamente:** você domina na prática. Revise a **terminologia de prova**: **CLR** (máquina virtual: JIT, **GC** geracional 0/1/2, segurança de tipos); **CIL/MSIL**; **assembly** (unidade de implantação e versionamento, com **manifesto** e metadados); **CTS** (sistema comum de tipos) e **CLS** (subconjunto para interoperabilidade entre linguagens); **BCL/FCL**. **Tipos de valor** (`struct`, `enum` e primitivos, na *stack* ou *inline*) × **de referência** (`class`, `string`, `array`, `delegate`, no *heap*); *boxing*/*unboxing*. Parâmetros `ref` (precisa estar inicializado), `out` (o método deve atribuir) e `in` (somente leitura). Propriedades, indexadores, **delegates** e **eventos**, **LINQ** (execução **adiada**), `async`/`await` com `Task`, `IDisposable` + `using`, *nullable reference types* e `record`. **Linha do tempo**: .NET Framework (só Windows, até o 4.8.x) → .NET Core → **.NET 5+** (unificado e multiplataforma), com versões **LTS** nas pares (6, 8, 10). **ASP.NET Core**: *middleware pipeline*, injeção de dependência nativa (tempos de vida `Singleton`, `Scoped` e `Transient`), Kestrel, *Minimal APIs* × *Controllers*, Razor Pages e Blazor.
**Por que estudar isso:** é [A] (C#, .NET e ASP.NET Core), e o perfil é forte: **só questões**.
**Alerta de Pegadinha:** dizer que `string` é tipo de valor; confundir `ref` com `out`; dizer que o LINQ executa na declaração da consulta.
**Ação Prática:** 20 questões FCC de C#/.NET e anote só os erros de terminologia.

---

### 🎯 Assunto: Visual Basic (VB6 e VB.NET)
**O que estudar obrigatoriamente:** declaração `Dim x As Integer` (com `Option Explicit On`, toda variável precisa ser declarada; `Option Strict` impede conversões implícitas que estreitam o tipo). **Não diferencia maiúsculas de minúsculas**. **Arrays**: `Dim a(5) As Integer` cria **6 elementos** (índices 0 a 5, porque o número é o **limite superior**). `Sub` (sem retorno) × `Function` (com retorno; em VB6, o retorno é feito atribuindo ao nome da função). **Passagem padrão**: **`ByRef` no VB6** e **`ByVal` no VB.NET**. Concatenação com **`&`** (o `+` também concatena strings, mas é ambíguo com números). `\` é a divisão **inteira**, `/` é a divisão real, `Mod` dá o resto e `^` é a potência. Comparação com `=` (o mesmo símbolo da atribuição), diferente com `<>`. `And`/`Or` **sem** curto-circuito; `AndAlso`/`OrElse` **com** curto-circuito (só no VB.NET). Laços `For i = 1 To 10 Step 2 ... Next`, `Do While ... Loop`, `Do ... Loop Until`, `For Each`. Comentário com `'`. `Select Case` (sem *fall-through*). Erros: `On Error GoTo`/`Resume Next` (VB6) × `Try/Catch/Finally` (VB.NET).
**Por que estudar isso:** é "conhecimento profundo" do [A]. A FCC já cobrou VB em TRTs.
**Alerta de Pegadinha:** `Dim a(5)` tem 6 posições; a passagem padrão difere entre VB6 e VB.NET; `And` avalia os dois lados.
**Ação Prática:** trace de um `For ... Step -1` com `\` e `Mod`, e de uma `Sub` com `ByRef` em VB6.

---

### 🎯 Assunto: Delphi (Object Pascal)
**O que estudar obrigatoriamente:** **arquivos**: `.dpr` (projeto/programa), `.pas` (*unit*), `.dfm` (formulário VCL), `.dcu` (unit compilada). **Estrutura da unit**: `unit Nome;` → `interface` (declarações públicas e `uses`) → `implementation` (código; outro `uses` é possível) → `initialization`/`finalization` (opcionais) → `end.`. Atribuição com **`:=`** e comparação com **`=`**; diferente com `<>`. Blocos `begin ... end;`. Seções `var`, `const`, `type`. `procedure` (sem retorno) × `function` (com retorno, via a variável implícita **`Result`** ou o nome da função). Parâmetros por valor (padrão), `var` (por referência), `const` e `out`. Operadores: `div` (divisão inteira), `mod` e `/` (real); lógicos `and`, `or`, `not`, `xor`. **Strings com índice 1** (`s[1]` é o primeiro caractere) e aspas simples. **Classes**: `type TPessoa = class(TObject)` com seções `private`, `protected`, `public` e **`published`** (visível no *Object Inspector*, com RTTI); `constructor Create`/`destructor Destroy`; métodos `virtual`/`dynamic` + `override`, `overload`, `abstract`; **propriedades** `property Nome: string read FNome write SetNome;`. Liberação manual com `Free`/`FreeAndNil` (não há GC para objetos, apenas contagem de referências para strings e interfaces). Exceções: `try ... except on E: Exception do ... end;` e `try ... finally ... end;` (são **blocos distintos**, sem `except` e `finally` juntos no mesmo `try`). Componentes e bancos: **VCL** (Windows) × **FireMonkey/FMX** (multiplataforma); `TTable`/`TQuery`/`TDataSource` (BDE, legado) e **FireDAC** (atual).
**Por que estudar isso:** é "conhecimento profundo" do [A]. Os `raw_md` de Delphi descartados no guia antigo voltam a ser úteis.
**Alerta de Pegadinha:** strings começando em 0; confundir `:=` com `=`; usar `except` e `finally` no mesmo bloco `try`; dizer que `published` é igual a `public` (a diferença é a RTTI e o Object Inspector).
**Ação Prática:** escreva uma unit com uma classe, uma propriedade com `write` por método e um `try/finally` com `Free`.

---

### 🎯 Assunto: PHP (8.x)
**O que estudar obrigatoriamente:** variáveis com **`$`**, tipagem dinâmica (com *type declarations* e `declare(strict_types=1)`). **`==` (com coerção) × `===` (valor e tipo)**. No PHP 8 mudou a comparação string × número: `0 == "abc"` passou a ser **false** (era `true` no 7). **Arrays** ordenados e associativos (`['a' => 1]`), com `count`, `array_push`, `in_array`, `array_key_exists`, `foreach ($arr as $k => $v)`. **Superglobais**: `$_GET`, `$_POST`, `$_REQUEST`, `$_SESSION`, `$_COOKIE`, `$_SERVER`, `$_FILES`, `$_ENV`, `$GLOBALS`. **Sessões**: `session_start()` antes de qualquer saída, depois `$_SESSION['x']` e `session_destroy()`. `include` (gera *warning* se faltar o arquivo) × `require` (gera **erro fatal**), e as versões `_once`. Concatenação com **`.`**; aspas duplas interpolam e simples não; *heredoc*/*nowdoc*. Operadores `??` (*null coalescing*), `?->` (*nullsafe*, PHP 8) e `<=>` (*spaceship*). **PHP 8.x**: `match` (comparação **estrita** e retorna valor), *named arguments*, *constructor property promotion*, *union types*, *attributes* `#[...]`, `enum` (8.1), propriedades `readonly` (8.1) e JIT. **Banco** com **PDO** e *prepared statements* (`$stmt = $pdo->prepare('... WHERE id = :id'); $stmt->execute(['id' => $id]);`), que previnem SQL injection. Saída com `echo` × `print` (o print retorna 1); `htmlspecialchars` contra XSS.
**Por que estudar isso:** é "conhecimento profundo" do [A], e o `16_php.md` descartado no guia antigo traz o material de questões.
**Alerta de Pegadinha:** `include` × `require`; aspas simples não interpolam; a mudança de `0 == "abc"` no PHP 8; `session_start()` depois de já ter enviado saída.
**Ação Prática:** trace de 5 comparações com `==` e `===` no PHP 8 e escreva um login com PDO e *prepared statement*.

---

# ✅ Observações finais

- **Prioridade dentro do bloco** (o perfil já é forte em C# e Java): **PHP → Delphi → VB → C → Python** em teoria rápida, e depois questões FCC de cada uma (há bastante material em provas de TRTs anteriores).
- O "acesso a banco de dados" [A+T] é: JDBC (Java), ADO.NET/EF (C#), PDO (PHP), FireDAC (Delphi) e DB-API (Python, `cursor.execute(sql, params)`).
