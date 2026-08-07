# 📘 Guia de Estudo Direcionado e Prescritivo — Arquitetura de Computadores (TRT 4ª Região)

> Gerado cruzando a seção "11. Arquitetura de Computadores" do conteúdo programático oficial (`conteudo_programatico.md`) com **315 questões** de Arquitetura de Computadores da FCC em `questoes_arquitetura_computadores_fcc.json`, pré-digeridas em 3 partes (`guia_estudos_subagentes/raw_md/41_arquitetura_computadores_parteN_de_3.md`).

**Recorte deste guia:** o edital resume a seção a "Processador, Memória principal, Memória secundária, Dispositivos de entrada, Dispositivos de saída, Paralelismo, Multiprocessamento, Virtualização". O banco real é muito mais técnico e numérico do que esse resumo sugere: quase um terço das questões são de **cálculo direto** (conversão entre bases, aritmética binária/hexadecimal, endereçamento de memória, potência de fonte, largura de banda de RAM) — não basta saber o conceito, é preciso saber calcular rápido e sem erro. O restante cobre hardware físico com riqueza de detalhe (placa-mãe, fonte, manutenção, periféricos), arquitetura de processador (RISC×CISC, pipeline, Von Neumann×Harvard) e um pouco de compiladores.

**Nota sobre gabaritos a conferir:** este é o lote com a **maior taxa de gabaritos contestados por questão** de todo o projeto — 18 casos documentados em apenas 315 questões (quase 6%), concentrados sobretudo em questões de **cálculo numérico verificável** (a matemática do comentário simplesmente bate diferente do gabarito registrado). Os mais didáticos, todos com prova matemática ou citação de fonte oficial nos comentários:
- **Multiplicação hexadecimal `1EF₁₆ × 8₁₀`**: gabarito registrado é `2F2`; o cálculo dígito a dígito com "vai um" em base 16 (feito de 3 formas independentes nos comentários) dá `F78₁₆` (`608580`).
- **Transistores por bit de cache L2**: gabarito registrado é "60 transistores"; a conta (60.000.000 transistores ÷ 8.388.608 bits) dá ≈7,15, mais perto de "6 transistores" (`379620`).
- **Capacidade do supercomputador Summit**: gabarito registrado confunde Peta com Exa (200 quatrilhões de operações/s = 200 **Peta**flops, não Exaflops) e erra a conversão de "250 mil HDs de X" por um fator de 10.000 (`1014714`).
- **Distância entre dois endereços hexadecimais** (`22FE4C - 22FE38`): gabarito registrado aponta 14 bytes; a subtração hexadecimal correta dá 20 bytes (`841074`).
- **Citação literal de Silberschatz** sobre sistema de computação de uso geral: o texto da questão bate palavra por palavra com uma alternativa, mas o gabarito registrado aponta outra (`494978`).
- **Tamanho da partição de sistema do Windows 7**: gabarito registrado é "1024 MB"; a documentação oficial da Microsoft citada nos comentários diz 100 MB (`413180`).
- **Capacidade de endereçamento de barramento de 16 bits**: gabarito registrado é "64M"; nenhum comentário sustenta esse valor — o cálculo direto dá 64K (ou 128K se o barramento de dados de 16 bits contar como palavra) (`1015547`).
- **Largura de banda DDR3-2133**: gabarito registrado é 14.900 MB/s; a fórmula padrão (clock × 8, usada e confirmada em várias outras questões do mesmo lote) dá 17.064 MB/s (`945741`).
- Outros 10 casos (compatibilidade de soquete via FSB, portas FireWire×eSATA, requisitos do Windows Server 2008 R2, entre outros) estão detalhados nos 3 `raw_md` de origem — ao estudar questões antigas de cálculo, sempre refaça a conta você mesmo antes de confiar na letra registrada como gabarito.

---

## 🧩 Sistemas de Numeração e Aritmética Binária

### 🎯 Assunto: Conversões entre Bases (Binário, Octal, Decimal, Hexadecimal)
**O que estudar obrigatoriamente:** é o subtema isolado mais cobrado do banco inteiro. Conversão **decimal→binário/hex**: divisões sucessivas pela base, lendo os restos de baixo para cima. Conversão **binário↔hexadecimal**: agrupar em blocos de **4 bits** (nibbles), completando com zeros à esquerda se necessário — cada dígito hex vale exatamente 4 bits (endereço de 8 dígitos hex = 32 bits; 16 dígitos hex = 64 bits). Conversão **binário↔octal**: agrupar em blocos de **3 bits**. Conversão **hex→decimal**: somar cada dígito × 16^posição (ex.: `2C4₁₆ = 2×16²+12×16¹+4×16⁰ = 708`). Números **fracionários**: parte inteira em potências positivas da base, parte fracionária em potências negativas (`101,101₂ = 5 + 0,625 = 5,625`). Conversão de **unidades de armazenamento** sempre em múltiplos de **1024** (2^10), nunca 1000: 1 TB = 1.048.576 MB = 1.073.741.824 KB; tabela completa Kilo=1.024, Mega=1.048.576, Giga=2^30, Tera=2^40, Peta=2^50, Exa=2^60. Bases não usuais também aparecem (ex.: base 62 para encurtadores de URL, usando 0-9+A-Z+a-z).
**Por que estudar isso:** maior volume absoluto de questões do banco e maior fonte de gabaritos contestados — dominar a técnica de conversão rápida (sem calculadora) é o item de maior retorno por tempo de estudo de todo o guia.
**Alerta de Pegadinha:** esquecer de completar nibbles incompletos com zero à esquerda; usar múltiplos de 1000 em vez de 1024 para armazenamento; confundir "ordem crescente" pedida no enunciado (crescente de quê? tempo? velocidade?).
**Ação Prática:** pratique 10 conversões decimal↔binário↔hex↔octal por dia até fazer de cabeça em menos de 15 segundos cada; memorize a tabela de potências de 2 até 2^20.

---

### 🎯 Assunto: Aritmética em Bases Não-Decimais e Representação com Sinal
**O que estudar obrigatoriamente:** soma/subtração/multiplicação em **binário e hexadecimal** seguem a mesma lógica de "vai um" da aritmética decimal, só que estourando na base correspondente (binário: 1+1=10 com carry; hexadecimal: soma que ultrapassa 15 gera carry) — o caminho mais seguro sob pressão é converter os operandos para decimal, operar, e reconverter. Operação lógica **XOR** bit a bit: bits iguais→0, bits diferentes→1. **Complemento de um (C1)**: apenas inverte todos os bits. **Complemento de dois (C2)**: inverte os bits e soma 1 — intervalo de representação **assimétrico** para N bits: de `-2^(N-1)` a `2^(N-1)-1` (para 16 bits: -32.768 a 32.767, não simétrico, pois o zero "consome" uma representação do lado positivo). **Sinal-magnitude**: troca só o bit de sinal, mantém a magnitude igual ao valor positivo. **Distância de Hamming**: número de posições em que duas palavras binárias de mesmo tamanho diferem entre si (contar bit a bit).
**Por que estudar isso:** testado com frequência em conjunto com a conversão de bases, e é onde mais aparecem gabaritos contestados por erro de cálculo do examinador.
**Alerta de Pegadinha:** achar que o intervalo do C2 é simétrico; confundir C1 (só inverte) com C2 (inverte e soma 1) com sinal-magnitude (só troca o bit de sinal).
**Ação Prática:** calcule o intervalo de C2 para 8, 16 e 32 bits de memória; pratique 5 somas e 5 multiplicações diretamente em hexadecimal sem converter para decimal.

---

### 🎯 Assunto: Endereçamento de Memória — Cálculo de Capacidade e Distância entre Endereços
**O que estudar obrigatoriamente:** regra central: barramento de endereço de **N bits** endereça **2^N bytes** de memória (cada endereço aponta para 1 byte) — N=30→1GB; N=32→4GB (mesmo que a RAM instalada seja menor); N=64→~16-18 Exabytes. Em questões com **sequência de endereços em hexadecimal**, a distância entre dois endereços (em bytes) é obtida por **subtração hexadecimal direta**, e essa distância indica o tamanho máximo que pode ser armazenado no endereço inicial antes de sobrepor o próximo — este é o padrão de questão com **mais gabaritos contestados** do lote inteiro (pelo menos 6 casos), então sempre refaça a subtração você mesmo. O tamanho do endereço em dígitos hex revela os bits do processador/barramento (8 dígitos=32 bits, 16 dígitos=64 bits) independentemente da RAM fisicamente instalada.
**Por que estudar isso:** é o tipo de questão numérica mais repetido e mais propenso a erro de gabarito na base — dominar o método (não decorar respostas) é essencial.
**Alerta de Pegadinha:** confundir bits do barramento com capacidade real de RAM instalada; errar a subtração hexadecimal por pressa.
**Ação Prática:** resolva 3 exercícios de subtração hexadecimal de endereços de memória, mostrando o cálculo completo cada vez.

---

## 🧩 Hierarquia de Memória

### 🎯 Assunto: Registrador, Cache (L1/L2/L3), RAM e ROM — Velocidade, Custo e Volatilidade
**O que estudar obrigatoriamente:** regra de ouro: quanto mais **próxima da CPU**, mais **rápida** e mais **cara por bit** é a memória, e **menor** sua capacidade — ordem de velocidade decrescente: **Registrador > Cache (L1>L2>L3) > RAM > SSD > HD > Disco Óptico**. **SRAM** (cache, registradores): mais rápida, mais cara, **não** precisa de refresh. **DRAM** (RAM principal): mais lenta, mais barata, **exige refresh periódico** do capacitor de cada célula. Cache em níveis: **L1** menor/mais rápida, embutida no núcleo; **L2** maior/mais lenta, por núcleo ou compartilhada conforme arquitetura; **L3** maior/mais lenta, tipicamente **compartilhada entre todos os núcleos**. **RAM** é volátil, acesso aleatório; **ROM** é não volátil, só leitura, armazena firmware permanente — memória principal = RAM + ROM (**não** inclui HD/SSD/CD/pendrive, que são secundária).
**Por que estudar isso:** base conceitual de todo o bloco de memória, testada em ambas as direções de pergunta (crescente/decrescente de velocidade, custo ou capacidade) — leia sempre com atenção o que exatamente está sendo ordenado.
**Alerta de Pegadinha:** achar que a memória secundária tem o maior custo por bit (é o oposto); trocar SRAM/DRAM; achar que L3 é mais rápida que L1.
**Ação Prática:** desenhe a pirâmide completa registrador→cache→RAM→secundária com 3 colunas (velocidade, custo, capacidade) crescente/decrescente em cada uma.

---

### 🎯 Assunto: Tipos de ROM Regravável (PROM/EPROM/EEPROM/Flash) e SSD/NAND
**O que estudar obrigatoriamente:** **PROM**: gravada uma única vez, não regravável. **EPROM**: regravável, mas precisa ser **retirada do circuito** e exposta a **luz ultravioleta** para apagar. **EEPROM** (Electrically-Erasable): apaga e regrava **eletricamente**, sem sair do circuito nem equipamento especial. **Memória Flash** é um subtipo de EEPROM que permite apagar/escrever **múltiplos endereços de uma vez** — base tecnológica de SSDs e pendrives. SSDs usam predominantemente flash **NAND** (não NOR), acesso sequencial em blocos (programação por página, mas exclusão só por **bloco inteiro**); célula flash tem **control gate** (comunica com o computador) e **floating gate** (armazena o dado). SSDs modernos usam **MLC** (2 bits/célula) ou **TLC** (3 bits/célula) — atenção: é "bits por célula", não "bytes por célula". SSD não tem partes móveis — mais silencioso, mais resistente a impacto, mas com **vida útil limitada** pelo número de gravações por célula (por isso não se desfragmenta SSD).
**Por que estudar isso:** tabela de memórias ROM regraváveis é decoreba de alto retorno, testada com frequência comparando as 3 tecnologias na mesma questão.
**Alerta de Pegadinha:** confundir EPROM (luz UV, sai do circuito) com EEPROM (elétrico, no circuito); trocar NAND por NOR nos SSDs; achar que SSD tem partes móveis.
**Ação Prática:** monte a tabela PROM/EPROM/EEPROM/Flash com o método de apagamento de cada uma.

---

### 🎯 Assunto: Memórias DDR — Padrões, Tensões, Vias e Cálculo de Largura de Banda
**O que estudar obrigatoriamente:** tensões decrescentes por geração (~0,3V a menos a cada uma): DDR=2,5V (184 vias) → DDR2=1,8V (240 vias) → DDR3=1,5V (240 vias) → DDR4=1,2V (288 vias) → DDR5=1,1V — gerações **fisicamente incompatíveis** entre si mesmo com vias parecidas. **Cálculo de largura de banda**: taxa (MB/s) = clock efetivo (MT/s) × **8 bytes** (barramento de 64 bits) — ex.: DDR3-1600 → 1600×8=12.800 MB/s. Nomenclatura comercial PC-xxxx = clock × 8 (DDR3-800 = PC3-6400). **Dual Channel**: dois módulos **idênticos** (tamanho/frequência/timing) abrem um segundo canal simultâneo RAM↔placa-mãe, podendo dobrar a taxa — a frequência do sistema **não** sobe para a maior instalada; roda na **menor frequência suportada** entre módulo e placa-mãe. SO-DIMM é a versão reduzida para notebooks.
**Por que estudar isso:** cálculo de largura de banda é fonte recorrente de gabarito contestado — sempre aplique a fórmula clock×8 você mesmo em vez de confiar cegamente no valor da alternativa "óbvia".
**Alerta de Pegadinha:** achar que módulos DDR2/DDR3 são fisicamente compatíveis (não são); achar que instalar módulo mais rápido que o suportado pela placa "não funciona" (funciona, só que na frequência mais baixa).
**Ação Prática:** calcule a largura de banda teórica de DDR4-3200 e converta para o nome comercial PC4-xxxx.

---

### 🎯 Assunto: Memória Virtual, Paginação/Segmentação, MMU e TLB
**O que estudar obrigatoriamente:** **paginação** divide processo/memória em blocos de tamanho **fixo** (fragmentação interna); **segmentação** em blocos de tamanho **variável** (fragmentação externa) — mnemônico "PF-SV" (Paginação-Fixo / Segmentação-Variável). **Memória virtual** permite executar processos maiores que a RAM física, usando disco como extensão — otimizar significa aumentar RAM física ou reduzir page faults, **nunca** desativar a memória virtual. **MMU** (Memory Management Unit) é hardware, geralmente na CPU, que traduz endereços virtuais/lógicos em físicos. **TLB** (Translation Lookaside Buffer) é cache associativa dentro da MMU que guarda traduções recentes, evitando consultar a tabela de páginas completa a cada acesso.
**Por que estudar isso:** tema que cruza diretamente com Sistemas Operacionais — a mesma base conceitual é cobrada nos dois blocos do edital.
**Alerta de Pegadinha:** trocar paginação (fixo) com segmentação (variável); achar que MMU é software.
**Ação Prática:** escreva a diferença paginação×segmentação em uma frase e desenhe o papel da TLB no fluxo de tradução de endereço.

---

## 🧩 Arquitetura de Processadores

### 🎯 Assunto: RISC × CISC × WISC
**O que estudar obrigatoriamente:** **CISC** (Complex Instruction Set): instruções de tamanho e tempo de execução **variáveis** (multiciclo), muitos modos de endereçamento, poucos registradores especializados, complexidade concentrada no **microprograma/hardware**, compilador mais simples — filosofia "hardware é mais rápido que software" (x86 é CISC por definição). **RISC** (Reduced Instruction Set): instruções de tamanho **fixo**, tipicamente **um ciclo** de execução, poucos modos de endereçamento, muitos registradores de propósito geral, forte ênfase em **pipeline**, complexidade transferida para o **compilador**. Processadores Intel modernos (6ª geração+) têm núcleo interno RISC com decodificador CISC na entrada (aceitam x86 CISC, processam internamente como RISC).
**Por que estudar isso:** tema-âncora de todo o bloco de processadores, testado em praticamente toda parte com o quadro-espelho completo de características trocadas como distrator.
**Alerta de Pegadinha:** atribuir características de RISC ao CISC e vice-versa (a FCC faz isso sistematicamente); achar que CISC é "superior" por ter mais instruções.
**Ação Prática:** monte a tabela RISC×CISC com 6 linhas (tamanho de instrução, ciclos, modos de endereçamento, registradores, onde está a complexidade, pipeline) e recite de memória.

---

### 🎯 Assunto: Arquitetura de Von Neumann × Harvard e Ciclo de Busca-Decodificação-Execução
**O que estudar obrigatoriamente:** **Von Neumann**: memória e barramento **únicos** para dados e instruções (não podem ser acessados simultaneamente) — típico de CISC. **Harvard**: memórias e barramentos **independentes** para instruções e dados, permitindo acesso simultâneo e viabilizando **pipelining** — típico de RISC/microcontroladores. Ciclo de busca-decodificação-execução (Tanenbaum), na ordem exata: 1) buscar instrução na memória e guardar no **IR** (Instruction Register); 2) atualizar o **PC** (Program Counter); 3) decodificar o tipo de instrução; 4) determinar onde está o operando; 5) buscar o operando; 6) **executar**; 7) voltar ao passo 1 — o primeiro passo é **sempre** buscar a instrução, nunca decodificar primeiro. Componentes centrais: **UC** (Unidade de Controle, busca/decodifica/comanda, não executa operações), **ULA** (executa aritmética/lógica), **Memória**, **E/S**, interligados por barramentos.
**Por que estudar isso:** base teórica testada com citação literal de livro-texto (Tanenbaum/Silberschatz) — decoreba de sequência exata, item de alto retorno.
**Alerta de Pegadinha:** achar que a ULA é parte da UC (é componente irmão, direto da CPU); trocar PC (próxima instrução) por IR (instrução atual); achar que Harvard usa cache diferente de Von Neumann (a diferença real é barramento/memória separados).
**Ação Prática:** escreva as 7 etapas do ciclo de instrução na ordem exata sem consultar; desenhe Von Neumann e Harvard lado a lado destacando os barramentos.

---

### 🎯 Assunto: Registradores e Componentes da CPU
**O que estudar obrigatoriamente:** **PC** (Program Counter/CI): contém o endereço da **próxima** instrução a ser buscada. **IR** (Instruction Register/RI): contém a **instrução atual**, já buscada/em execução. **MAR/REM** (Memory Address Register): contém o **endereço** a ser acessado na memória. **MBR/RDM** (Memory Buffer/Data Register): contém o **dado** a ser lido/escrito. **Acumulador**: registrador da ULA que guarda resultado de operações, evitando escritas constantes na memória. Registradores são unidades **internas à CPU** (não posições da RAM), usados para dar velocidade — a maioria das instruções opera em modo registrador-memória ou registrador-registrador.
**Por que estudar isso:** os 4 registradores-chave (PC/IR/MAR/MBR) aparecem em praticamente toda questão sobre ciclo de instrução — decoreba de alta recorrência.
**Alerta de Pegadinha:** trocar PC (próxima) com IR (atual); achar que registradores são endereços de RAM.
**Ação Prática:** desenhe o fluxo PC→barramento de endereço→MBR→IR→UC com os 4 registradores rotulados.

---

### 🎯 Assunto: Pipeline — Estágios e Cálculo de Ganho de Desempenho
**O que estudar obrigatoriamente:** pipeline divide a execução em estágios sobrepostos (enquanto uma instrução executa, a próxima já é buscada) — técnica viabilizada pela arquitetura de Harvard (barramentos separados evitam conflito de acesso simultâneo). 5 estágios clássicos RISC: **IF** (Instruction Fetch) → **ID** (Instruction Decode) → **EX** (Execution) → **MEM** (Memory access) → **WB** (Write Back). Cálculo de ganho: T1 = tempo sem pipeline (M instruções × tempo médio por instrução); T2 = tempo com pipeline de K estágios (≈[K+(M-1)]×ciclo, aproximando M×t para M≫K); ganho = T1/T2 — **o resultado é um número puro (razão), a unidade de tempo se cancela** na divisão.
**Por que estudar isso:** cálculo de ganho de pipeline é item certo em prova de arquitetura — fórmula simples de alto retorno.
**Alerta de Pegadinha:** atribuir unidade de tempo ao resultado do ganho (é adimensional); trocar a ordem dos 5 estágios IF-ID-EX-MEM-WB.
**Ação Prática:** calcule o ganho de um pipeline de 5 estágios com M=1.000.000 instruções, t_sem=6,5ns, t_com=2ns.

---

### 🎯 Assunto: Paralelismo e Multiprocessamento
**O que estudar obrigatoriamente:** **SISD** (um fluxo de instrução, um de dado — processador convencional); **SIMD** (uma instrução, múltiplos dados — vetorial/GPU); **MISD** (múltiplas instruções, um dado — raro); **MIMD** (múltiplas instruções, múltiplos dados — multiprocessadores) — a FCC frequentemente descreve uma sigla mas rotula com o nome de outra, invertendo a definição. **Multiprocessamento simétrico (SMP)**: processadores idênticos, sem hierarquia, compartilham memória e E/S, cada um autoprogramado. **Assimétrico (AMP)**: processador **mestre** controla estrutura de dados e distribui tarefas para processadores **escravos**. Com N processadores, o ganho de velocidade obtido é geralmente **menor que N** (não escala linearmente). **Superescalar**: múltiplas unidades funcionais, escalonamento estático **ou dinâmico**, várias instruções por ciclo. **VLIW** (Very Long Instruction Word): empacota múltiplas operações em uma única instrução longa, definida **estaticamente pelo compilador** (não dinamicamente) — confundir os dois é pegadinha central (uma descrição com escalonamento dinâmico é sempre superescalar, nunca VLIW).
**Por que estudar isso:** SIMD/MISD/SISD/MIMD e SMP×AMP são testados com definição invertida como distrator sistemático.
**Alerta de Pegadinha:** inverter SIMD com MIMD; achar que VLIW permite escalonamento dinâmico (é sempre estático); achar que N processadores dão ganho N×.
**Ação Prática:** escreva a matriz SISD/SIMD/MISD/MIMD (instrução única/múltipla × dado único/múltiplo) com um exemplo de cada.

---

## 🧩 Barramentos, E/S e Interrupções

### 🎯 Assunto: Barramentos e Padrões de Expansão (PCI, AGP, PCIe, ISA)
**O que estudar obrigatoriamente:** 3 tipos de barramento: **endereços** (unidirecional, CPU→memória), **dados** (bidirecional, transporta o dado), **controle** (bidirecional, sincroniza — sinais RD/WR). Padrões físicos: **ISA** (slot preto, 8/16 bits, 8MHz, obsoleto); **PCI** (slot branco, 32/64 bits, 33-133MHz, até 132MB/s); **AGP** (exclusivo para vídeo, 1X=266MB/s a 8X=2128MB/s); **PCI Express** (serial, em "lanes" x1 a x32) — mnemônico "dobra o x" para PCIe 4.0 (x1=2GB/s...x16=32GB/s) e "quadruplica o x" para PCIe 5.0 (x1=4GB/s...x16=64GB/s). **FSB** (Front Side Bus): liga processador ao chipset — mas o que garante **compatibilidade física** entre processador e placa-mãe é o tipo de **soquete** (socket), não o FSB.
**Por que estudar isso:** valores numéricos exatos de cada padrão são cobrados literalmente — a FCC troca taxas entre padrões como distrator.
**Alerta de Pegadinha:** achar que FSB determina compatibilidade (é o soquete); confundir taxas AGP com PCIe.
**Ação Prática:** monte a tabela ISA/PCI/AGP/PCIe com largura de barramento e taxa máxima de cada um.

---

### 🎯 Assunto: Interrupções, DMA e Métodos de Controle de E/S
**O que estudar obrigatoriamente:** 3 métodos clássicos de controle de E/S: **E/S programada/polling** (CPU testa periodicamente a disponibilidade do dispositivo — "pooling" é grafia incorreta usada por vezes pela própria FCC, mas o termo técnico é polling); **E/S por interrupção** (dispositivo avisa a CPU via IRQ quando termina, permitindo a CPU fazer outra coisa enquanto espera); **DMA** (Direct Memory Access — controlador lê/escreve direto na memória **sem intervenção da CPU** durante a transferência). Sequência típica de operação de E/S: aplicação → system call → driver → controlador → hardware, com interrupção sinalizando conclusão. Interrupções também tratam eventos como divisão por zero e acesso a memória protegida — não são exclusivas de RISC ou CISC.
**Por que estudar isso:** distinção dos 3 métodos de E/S é testada repetidamente, cruzando com o bloco de Sistemas Operacionais.
**Alerta de Pegadinha:** confundir DMA (sem CPU) com E/S por interrupção (CPU é avisada ao final, mas não controla a transferência em si).
**Ação Prática:** escreva a diferença dos 3 métodos de E/S em uma frase cada, com foco em "quem inicia" e "quem monitora".

---

## 🧩 Placa-mãe, Fonte de Alimentação e Boot

### 🎯 Assunto: Placa-mãe, Chipset e Componentes
**O que estudar obrigatoriamente:** **Northbridge** (ponte norte): liga CPU a RAM e barramentos rápidos (AGP/PCI) — hoje suas funções estão majoritariamente integradas ao processador. **Southbridge** (ponte sul): controla interfaces mais lentas (IDE, USB, teclado, mouse, seriais) — mnemônico "norte=cérebro, alta velocidade". **GPU**: processa vértices, aplica efeitos, rasteriza em pixels, usa **VRAM**. **PSU** (fonte): converte corrente **alternada (AC)** da tomada em **contínua (DC)** para os componentes — nunca o inverso. Portas identificáveis fisicamente: eSATA, FireWire (IEEE 1394, **não** "1334"), S/PDIF óptico/coaxial, saída 5.1. Processador instala-se em soquete **ZIF** (Zero Insertion Force — não precisa de força, só baixar a trava).
**Por que estudar isso:** identificação de componente por descrição/função é padrão recorrente de questão — decoreba de nomenclatura correta.
**Alerta de Pegadinha:** achar que PSU converte DC→AC (é o oposto); trocar a função Northbridge×Southbridge; grafar "IEEE 1334" (correto é 1394).
**Ação Prática:** desenhe a placa-mãe com Northbridge/Southbridge/CPU/RAM/slots rotulados e a função de cada chip.

---

### 🎯 Assunto: BIOS, POST, SETUP, CMOS e Sequência de Boot
**O que estudar obrigatoriamente:** **BIOS** é firmware fixo em ROM/flash; **POST** (Power-On Self-Test) é a rotina de autoteste de hardware (memória, teclado, vídeo) executada pela BIOS ao ligar; **SETUP** é a interface para o usuário alterar parâmetros, armazenados na **CMOS** (memória RAM volátil de baixo consumo, mantida por bateria própria — erro "CMOS Checksum" indica bateria descarregada). Sequência de boot: fonte estabiliza → chipset libera reset da CPU → CPU executa BIOS → POST → BIOS lê o **MBR** (Master Boot Record, setor zero, 512 bytes, também chamado trilha zero) → MBR identifica partição ativa → carrega o boot loader → kernel assume e carrega drivers essenciais → tela de logon.
**Por que estudar isso:** sequência de boot completa é testada com cobrança da ordem exata das etapas — item certo em provas de manutenção/suporte.
**Alerta de Pegadinha:** confundir BIOS (firmware) com CMOS (RAM volátil com bateria) — parâmetros de SETUP ficam na CMOS, não na BIOS; achar que MBR é sistema de arquivos (é estrutura de boot/partição).
**Ação Prática:** escreva a sequência de boot completa (fonte→BIOS→POST→MBR→boot loader→kernel) de memória.

---

### 🎯 Assunto: Fonte de Alimentação — Cálculo de Potência e PFC
**O que estudar obrigatoriamente:** cálculo de potência real: **Watts = Volts × Amperes**, somado por saída/trilho (ex.: 32A@3,3V + 35A@5V + 14A@12V = 105,6+175+168 ≈ 450W). Tensões ATX padrão: +12V, -12V, +5V, -5V, +3,3V — GPU e CPU normalmente alimentados pela saída de **+12V**. **PFC** (Power Factor Correction) ativo elimina a necessidade de chave seletora 110V/220V, com eficiência 95-99% (vs. 50-60% sem PFC, 70-80% com PFC passivo). **Nobreak**: capacidade informada em **VA** (Volt-Ampère), não Watts — a conversão depende do fator de potência (~0,65-0,7 para PCs); regra prática: dividir a capacidade em VA por 2 para estimar a carga real segura em Watts. Dimensionamento de fonte: somar consumo de todos componentes + margem de segurança (~30%).
**Por que estudar isso:** cálculo de potência de fonte é item numérico certo, testado repetidamente com a mesma fórmula.
**Alerta de Pegadinha:** confundir VA com Watts em nobreaks; esquecer a margem de segurança no dimensionamento de fonte.
**Ação Prática:** calcule a potência de uma fonte com 3 trilhos dados (amperagem × voltagem de cada) e dimensione uma fonte para um PC com CPU 125W + GPU 220W + periféricos.

---

## 🧩 Armazenamento Secundário

### 🎯 Assunto: HD, SSD e Interfaces (SATA, PATA, SAS)
**O que estudar obrigatoriamente:** HD tem braço mecânico com cabeça magnética sobre "platters" girando a 5.400-7.200 RPM (desktop) ou 10.000-15.000 RPM (SAS, uso corporativo). **SSD** é 100% eletrônico, sem partes móveis, mais silencioso, mais resistente a impacto. **PATA** (Parallel ATA, cabo flat 80 vias, sujeito a ruído) foi sucedido por **SATA** (Serial ATA, transmissão bit a bit, cabo fino blindado, sem ruído relevante) — **SATA não usa jumpers** de master/slave (cada porta aceita um único dispositivo; a numeração da porta define a ordem), diferente do IDE antigo. Cabos por padrão: SATA=15 pinos (dados), IDE=40 pinos, SCSI=50 pinos. Temperatura ideal de HD: 40-60°C (nunca perto de 95°C).
**Por que estudar isso:** distinção SATA×PATA×SAS e a ausência de jumpers no SATA são testadas repetidamente em cenários de manutenção.
**Alerta de Pegadinha:** achar que SATA usa jumpers como o IDE antigo; achar que SSD tem partes móveis ou "funciona como sistema magnético".
**Ação Prática:** escreva 3 diferenças técnicas entre PATA e SATA (transmissão, cabo, jumpers).

---

### 🎯 Assunto: Backup — Fitas LTO, Mídias Ópticas e Estratégias
**O que estudar obrigatoriamente:** Fitas **LTO** (Linear Tape-Open) para backup de grande volume: LTO-4 = 800GB nativos/1,6TB comprimido; LTO-6 = 2,5TB nativos/6,25TB comprimido — ambas suportam **WORM** (Write Once Read Many). Mídias ópticas (CD/DVD/Blu-ray) exigem gravador dedicado, capacidade real de dezenas de GB por camada no Blu-ray (não terabytes — capacidades infladas são distrator comum). HD externo (ex.: 10TB) supera mídia óptica em portabilidade/capacidade para backup completo de grande volume. Métodos de acesso a arquivo: **sequencial** (sem restrição de posição além do fim do arquivo anterior) × **direto/hashing** (chave mapeada via função de endereçamento para acesso direto ao registro).
**Por que estudar isso:** especificações reais de LTO e capacidades de mídia são cobradas literalmente, com valores inflados como distrator recorrente.
**Alerta de Pegadinha:** aceitar capacidades irreais de mídia óptica (ex.: "Blu-ray com 4,7TB por face" — isso é a capacidade do DVD em GB, não do Blu-ray em TB).
**Ação Prática:** decore as capacidades nativas/comprimidas de LTO-4 e LTO-6.

---

## 🧩 Manutenção de Hardware

### 🎯 Assunto: Diagnóstico de Defeitos e Boas Práticas de Montagem
**O que estudar obrigatoriamente:** bipes longos repetitivos ao ligar indicam problema de **encaixe de memória RAM** (não SSD, não boot) — conferir travas laterais dos módulos. Sintomas por componente: placa de vídeo falha sob carga pesada (jogos, capacitores desgastados); HD com problema não impede o POST mas trava o carregamento do SO; incompatibilidade de módulos de RAM causa falha de boot ao adicionar. **DOA** (Dead on Arrival): RAM é sensível a estática/picos de tensão (dano localizado, célula a célula); HD tem "defect map" que substitui setores defeituosos automaticamente. **"Smoke test"**: primeiro boot de PC recém-montado — momento crítico de risco. Ações de baixo risco: ligar com memória mal encaixada (só gera bipes, raramente queima). Ações de alto risco: trocar voltagem 110V/220V errada, trocar placas com PC ligado, rodar CPU sem cooler. Ferramentas de teste: `mdsched` (Win+R) testa RAM no Windows.
**Por que estudar isso:** cenários práticos de diagnóstico são testados com frequência em provas de perfil "Técnico/Analista de Suporte" — conectam sintoma a causa a ação corretiva.
**Alerta de Pegadinha:** achar que qualquer erro de montagem tem o mesmo risco de dano físico (ligar com RAM mal encaixada é seguro; trocar voltagem é perigoso).
**Ação Prática:** para 4 sintomas diferentes (bipes no boot, tela preta sob jogo, boot lento persistente, HD não detectado), escreva a causa provável e a ação corretiva.

---

## 🧩 Compiladores e Periféricos

### 🎯 Assunto: Compiladores, Montadores e Ligadores
**O que estudar obrigatoriamente:** cadeia de tradução: **Código Fonte → Compilador → Assembly → Montador/Assembler → Código Objeto → Linker/Ligador → Executável → Carregador/Loader → Memória**. Fases internas do compilador, em ordem: **Análise Léxica** (identifica tokens, ignora comentários/espaços) → **Análise Sintática** (organiza tokens em estrutura gramatical, gera árvore de derivação) → **Análise Semântica** (verifica compatibilidade de tipos, declaração única, uso antes de declarar). O **linker** resolve referências entre módulos, busca rotinas em bibliotecas, determina posições de memória e reporta labels não resolvidos. Compilação **JIT** (Just-In-Time, usada em Java/C#) traduz bytecode para código nativo em tempo de execução, na primeira chamada do método.
**Por que estudar isso:** tema pequeno mas cobrado de forma direta e literal — item de fácil memorização e alto acerto.
**Alerta de Pegadinha:** trocar as 3 fases de análise (léxica/sintática/semântica) entre si; achar que "compilação" já gera executável (faltam montagem e linkedição).
**Ação Prática:** escreva a cadeia completa fonte→executável com o nome de cada ferramenta em cada seta.

---

### 🎯 Assunto: Periféricos — Monitores, Impressoras, Áudio e Conectores
**O que estudar obrigatoriamente:** **LCD** com retroiluminação LED ≠ **OLED** (diodos geram luz própria, dispensam retroiluminação, permitem telas finas/flexíveis). Conectores de vídeo: **VGA** (analógico) × **DVI** (digital) × **HDMI** (vídeo+áudio digital em um cabo) — adaptador simples geralmente resolve incompatibilidade, sem precisar trocar o monitor. Conectores de áudio: **P2** (não "P12") verde para saída, rosa para microfone. Tipos de impressora: **laser** (tambor fotossensível + toner + fusor por calor), **jato de tinta** (cartuchos líquidos CMYK, boa para fotos), **matricial** (fita + agulhas, obsoleta), **térmica** (papel termossensível, papel degrada com luz/calor). `[cross-tópico]` resolução 8K = 7680×4320 (16× o Full HD).
**Por que estudar isso:** identificação de tecnologia por característica técnica é padrão recorrente — decoreba de vocabulário preciso.
**Alerta de Pegadinha:** confundir LCD com OLED/LED (LED é só o tipo de retroiluminação do LCD, não uma tecnologia de painel à parte); achar que trocar padrão de vídeo sempre exige trocar o monitor.
**Ação Prática:** monte a tabela dos 4 tipos de impressora com o mecanismo de impressão de cada uma.

---

# ✅ Observações finais

- Este é o lote com a **maior taxa de gabaritos contestados por questão** de todo o projeto (18 casos em 315 questões) — concentrados quase todos em **questões de cálculo** (hexadecimal, endereçamento, largura de banda, potência). Ao estudar por essas questões antigas, sempre refaça a conta você mesmo em vez de decorar a letra registrada como gabarito — em vários casos os próprios comentários da comunidade fazem o cálculo corretamente e discordam abertamente da base.
- O bloco de **cálculo numérico** (conversão de bases, endereçamento, largura de banda de memória, potência de fonte) é, disparadamente, o de maior volume e o que mais rende pontos por tempo de estudo, precisamente por ser treinável mecanicamente até virar automático.
- Pequenos vazamentos pontuais para outras áreas do edital aparecem no lote (Cloud Computing — arquitetura Google Cloud; Sistemas Distribuídos — RabbitMQ, Blockchain; Redes — cabos coaxiais, comutação por circuitos; DevOps — CI/CD com Docker/Jenkins; Sistemas Operacionais — sistemas de arquivos, comandos Linux) — cobertos nos `raw_md` de origem com tags `[Área]`, mas sem volume suficiente para blocos prescritivos dedicados aqui.
- Os 3 resumos brutos que originaram este guia estão em `guia_estudos_subagentes/raw_md/41_arquitetura_computadores_parte1_de_3.md` a `parte3_de_3.md`, cada um citando todos os `id_questao` das 315 questões do lote como evidência — consulte-os para os cálculos completos passo a passo e a lista integral de gabaritos contestados por trás de cada regra resumida aqui.
