# 📘 Guia de Estudo Direcionado e Prescritivo — Redes de Computadores (TRT 4ª Região)

> ## 📌 Status no Edital TRT4 nº 01/2026 (FCC)
> Legenda: **[A+T]** cai nos dois cargos · **[A]** só Analista TI (14) · **[T]** só Técnico TI (22). Referência completa: guia **Mapa do Edital 2026**.
>
> ✅ **Válido:** OSI **[T]**; TCP/IP, IPv4/IPv6, sub-redes **[A+T]** (CIDR explícito no [T]); comutação de circuitos/pacotes/células **[A]**; cabeamento estruturado e fibra **[A+T]** (NBR 14565:2019 no [A]); equipamentos de interconexão **[A+T]**; VLAN 802.1Q **[A+T]**; STP/RSTP, 802.1X, 802.3 **[A]**; topologias **[T]**; protocolos, portas, DHCP, DNS, e-mail, LDAP **[A]**; SNMP/MIB/QoS **[A]**; firewall, IDS/IPS, VPN e segurança Wi-Fi **[A+T]**.
>
> ⚠️ **Desatualizado:** Wi-Fi agora com ênfase em **802.11ac, 802.11ax (Wi-Fi 6/6E) e 802.11be (Wi-Fi 7)**. Ver o guia **DevOps, Infra e Redes 2026**.
>
> ❌ **Fora do edital 2026 (rebaixar):** roteamento OSPF/BGP/RIP (fica só o conceito de roteador), VoIP (SIP/H.323/RTP), e todo o bloco de **armazenamento** (RAID, SAN/NAS/DAS, Fibre Channel).
>
> 🆕 **Lacunas:** NAT, AAA, codificação de sinal **[T]**; web proxy, Apache/IIS, JBoss EAP **[A]**; monitoramento com Zabbix, Prometheus, Grafana, ELK e Fluentd **[A]**; proxy reverso, SSL offloading e balanceamento **[T]**. Ver o guia **DevOps, Infra e Redes 2026**.

---


> Gerado cruzando a seção "14. Redes de Computadores" do conteúdo programático oficial (`conteudo_programatico.md`) com as **1.268 questões** de Redes da FCC em `questoes_redes_pc_fcc.json`, pré-digeridas em 9 partes (`guia_estudos_subagentes/raw_md/28_redes_parteN_de_9.md`).
>
> **Esta é a segunda versão deste guia.** A primeira foi gerada quando o scraper ainda não tinha coletado o banco completo (cobria só ~585 questões, em 4 partes). Esta versão refaz o processo do zero sobre as 1.268 questões atuais — mais que o dobro de dados — então vários blocos foram reorganizados, aprofundados ou tiveram pegadinhas novas incorporadas.

**Recorte deste guia:** como nas versões anteriores, praticamente 100% do lote é aproveitável — não há tecnologia "estranha ao edital" para descartar. Uma fatia grande do banco (~35-40%) não é sobre a seção 14 propriamente, mas sobre **Armazenamento (RAID/SAN/NAS/Fibre Channel — seção 12)** e **Segurança da Informação (Firewall/VPN/IDS/IPS/ataques — seção 16)**, que aparecem misturadas por serem correlatas a infraestrutura de rede. O guia deixa isso explícito, com tags `[Armazenamento]`/`[Segurança]`/`[Sistemas Operacionais]`/`[Governança]`/`[Nuvem]`, para você direcionar cada bloco de estudo à seção certa do edital.

**Nota sobre qualidade dos dados — gabaritos a conferir:** os 9 resumos brutos sinalizaram um número relevante de questões cujo gabarito registrado diverge da literatura técnica consagrada ou dos próprios comentários da comunidade. As mais recorrentes/importantes:
- **HSDPA**: gabarito marca 100 Mbit/s; literatura consagrada aponta 14,4 Mbit/s (`856673`).
- **1000BASE-TX**: duas questões do mesmo lote se contradizem sobre a categoria exigida — uma exige CAT6+, outra aceita CAT5 (`500007` x `478718`).
- **Codecs VoIP**: gabarito registra G.711=8kbps/G.729=24kbps; literatura consagrada é o oposto, G.711=64kbps/G.729=8kbps (`908011`).
- **802.1p — nível de maior prioridade**: gabarito aponta "Aplicação Crítica"; a tabela padrão do PCP mostra Network Control (valor 7) como o mais alto (`1018515`).
- **Topologia**: cenário descrito claramente como barramento (IEEE 802.3, mestre único) tem gabarito "estrela" (`726437`); fibra ótica é associada a "anel" e par trançado a "barra", invertendo a prática comum (`841693`); topologia Malha é descrita como "baixo custo" quando a literatura a trata como a mais cara (`856049`, `839487`).
- **802.11n**: uma questão associa a taxa de 135 Mbps/canal à modulação DSSS em vez de OFDM (`859848`).
- **Mensagem inicial de host novo na rede**: gabarito já foi corrigido de ARP para DHCP em uma reaplicação (`566716`).
- **RAID e XOR**: questão associa o algoritmo XOR/ECC aos níveis 0, 1 e 2 — debatido nos comentários (`464063`).
- **SNMP**: variável de estado de enlace registrada como "admConnStatus"; literatura consagra `ifAdminStatus` (`369109`).
- Outras divergências pontuais estão documentadas dentro de cada `raw_md` (banda de telefonia fixa em `478732`; "gateway padrão" em `444497`; canal Wi-Fi não sobreposto em `444495`; CAT5e x CAT6a full-duplex em `463764`; classificação "rotina x projeto" em `578421`; DNS x proxy reverso em `462037`; wireless bridge x hub em `471458`).

Isso não invalida as regras deste guia — são exceções pontuais. Mas se uma questão de treino bater exatamente com um desses IDs e a resposta "óbvia" parecer errada, confira o `raw_md` de origem antes de assumir que você errou o conceito.

---

## 🧩 Redes — Fundamentos, Modelo OSI e TCP/IP

### 🎯 Assunto: Modelo OSI — Camadas, PDUs e Função de Cada Camada
**O que estudar obrigatoriamente:** as 7 camadas com seu PDU (bit→Física, quadro/frame→Enlace, pacote/datagrama→Rede, segmento→Transporte, dado/mensagem→Sessão/Apresentação/Aplicação); Física trata de bits brutos, voltagem, taxa de dados, modo simplex/half/full-duplex; Enlace monta o quadro (acrescenta MAC origem/destino, CRC/FCS), controla acesso ao meio e faz controle de fluxo nó-a-nó, subdividida em **LLC** (superior, controle de fluxo/multiplexação) e **MAC** (inferior, endereçamento físico); Rede roteia e isola a camada de Transporte do número/topologia de roteadores; Transporte segmenta/remonta, garante entrega sem erro/sequência/duplicação (é aqui que mora o TCP); Sessão controla diálogo/tokens/sincronização; Apresentação converte formato/sintaxe (ASCII/EBCDIC, JPEG, MPEG), comprime e criptografa. As camadas "ponta a ponta" (não repetidas em cada nó do caminho) são as 4 superiores (Transporte, Sessão, Apresentação, Aplicação); Física/Enlace/Rede operam em cada nó intermediário.

**Por que estudar isso:** é a base de praticamente toda questão de equipamentos, protocolos e troubleshooting do banco — aparece em todas as 9 partes, tipicamente pedindo para mapear um protocolo/equipamento/característica à camada correta, ou para identificar a camada "errada" entre 7 opções.

**Alerta de Pegadinha:** achar que existe "camada de transmissão" (não existe — são sempre as 7 nomeadas); trocar PDU entre camadas (frame não é datagrama, segmento não é mensagem); a FCC já classificou ICMP como camada de Transporte em algumas questões deste lote, mesmo a literatura o colocando em Rede — os próprios comentários contestam, mas o gabarito da banca é o que vale na prova; ARP também tem classificação inconsistente entre provas da FCC (ora Enlace, ora Rede) — não fixe uma regra absoluta sem olhar o contexto/ano da questão.

**Ação Prática:** monte uma tabela de 3 colunas (Camada / PDU / Protocolos e equipamentos típicos) e treine classificar 15 itens aleatórios (TCP, UDP, ARP, ICMP, SNMP, HTTP, hub, switch, roteador, bridge, gateway) até não hesitar — mas mantenha em mente que a FCC nem sempre segue a bibliografia mais consagrada nesse tema específico.

---

### 🎯 Assunto: Arquitetura TCP/IP — 4 Camadas e Mapeamento de Protocolos
**O que estudar obrigatoriamente:** as 4 camadas (Acesso à Rede/Interface de Rede, Internet, Transporte, Aplicação) e sua correspondência com o OSI (Internet=Rede; Aplicação do TCP/IP = fusão de Aplicação+Apresentação+Sessão do OSI); mnemônico "RITA" (Rede de acesso, Internet, Transporte, Aplicação); mapeamento por camada — Aplicação: HTTP, FTP, SMTP, DNS, Telnet, SNMP, POP, IMAP; Transporte: TCP, UDP; Internet: IP, ICMP, ARP, RARP, IGMP; Acesso à Rede: Ethernet, PPP, Frame Relay, ATM; TCP é orientado a conexão (three-way handshake SYN/SYN-ACK/ACK, controle de fluxo via campo window, retransmissão, SACK para confirmação seletiva de segmentos fora de ordem) e o handshake de 3 vias ocorre tanto ao **abrir** quanto ao **fechar** a conexão (FIN/FIN-ACK/ACK); UDP não é orientado a conexão, não garante entrega/ordem, não tem timeout/retransmissão — cabeçalho fixo de 8 bytes (portas de 16 bits + length + checksum); PPP é usado em conexões discadas (síncronas ou assíncronas), autentica e atribui IP.

**Por que estudar isso:** é o segundo padrão de pergunta mais recorrente do banco inteiro (todas as 9 partes), quase sempre em formato de associação protocolo→camada ou "qual das afirmações sobre TCP/UDP está correta".

**Alerta de Pegadinha:** achar que o modelo TCP/IP tem 7 camadas (são 4, às vezes contadas como 5 separando Física de Enlace); trocar a camada do IP (é 2 no TCP/IP: Internet) com a do TCP (é 3: Transporte); achar que o IP garante entrega — IP é *best-effort*, não confiável, sem conexão, e fragmentação é função dele (não do TCP); mapear FTP/SMTP/HTTP como Transporte em vez de Aplicação; em cenários VoIP, lembrar que UDP é o protocolo tolerante a perda para mídia em tempo real, TCP não.

**Ação Prática:** treine 20 associações protocolo→camada TCP/IP cronometradas, incluindo os "menos óbvios" (SNMP, RTP, LDAP, NTP), e escreva de próprio punho a diferença entre TCP e UDP nos 5 eixos (conexão, confiabilidade, ordem, controle de fluxo, uso típico).

---

### 🎯 Assunto: Comutação de Circuitos x Pacotes, e Tecnologias WAN (ATM/Frame Relay/MPLS)
**O que estudar obrigatoriamente:** comutação de **circuitos** exige estabelecimento de um caminho físico dedicado antes da transmissão (reserva de banda fixa via FDM/TDM), é menos tolerante a falha (falha de um nó é fatal), usada em telefonia fixa tradicional; comutação de **pacotes** não reserva banda previamente, usa transmissão *store-and-forward*, é mais tolerante a falhas (não depende de caminho fixo), pacotes podem chegar fora de ordem por rotas diferentes; **ATM** é orientado a conexão, célula de tamanho **fixo de 53 bytes** (5 cabeçalho + 48 payload), alta escalabilidade, usado em backbones de LAN e WAN; **Frame Relay** é evolução do X.25 mas sem controle de fluxo/erro embutido (por isso menor atraso), usa **DLCI** de 10 bits para identificar o circuito virtual, PVC tem capacidade contratada fixa; interoperabilidade FR↔ATM tem duas formas: *Network Interworking* (encapsula PVCs, usado quando ATM é o núcleo) e *Service Interworking* (converte protocolos, usado quando pontas usam tecnologias diferentes); **MPLS** opera na "camada 2,5", rótulo (label) de **20 bits** dentro de um shim header (Label 20 bits + EXP/QoS 3 bits + S/fim-de-pilha 1 bit + TTL 8 bits), análise completa do cabeçalho IP só ocorre na **borda** (LER) — no núcleo os LSR só leem o rótulo; roteamento pode ser hop-by-hop ou *explicit routing*; EtherType 0x8847 = MPLS unicast, 0x8848 = multicast.

**Por que estudar isso:** tema técnico recorrente (6+ partes do banco) que a FCC cobra com detalhe exato de campos/tamanhos, tipicamente testando se você sabe a diferença de paradigma circuito x pacote e os números exatos do cabeçalho MPLS.

**Alerta de Pegadinha:** achar que o rótulo MPLS tem 32 bits (são 20); achar que o núcleo MPLS analisa o cabeçalho IP completo (só a borda faz isso); inverter as vantagens de comutação de circuitos x pacotes (circuito = garantias/caminho fixo, pacote = tolerância a falha/eficiência de banda); confundir DLCI do Frame Relay com VCI/VPI do ATM.

**Ação Prática:** desenhe o shim header do MPLS com os 4 campos e seus tamanhos exatos, e monte uma tabela comparativa circuito x pacote x célula (ATM) com 5 características cada.

---

## 🧩 Cabeamento, Meios Físicos e Equipamentos de Interconexão

### 🎯 Assunto: Cabeamento Estruturado — Categorias, Normas e Elementos Funcionais
**O que estudar obrigatoriamente:** tabela de frequência por categoria — CAT3 (16MHz/10Mbps), CAT4 (20MHz), CAT5 (100MHz/100Mbps), CAT5e (100-125MHz/1Gbps), CAT6 (250MHz/1Gbps, 10Gbps só até ~55m), CAT6A (500MHz/10Gbps garantidos a 100m, blindagem individual por par reduz crosstalk), CAT7/7A (600-1000MHz), CAT8 (1600-2000MHz/40Gbps); norma **ABNT NBR 14565** (baseada na ISO/IEC 11801 e espelhando a ANSI/TIA/EIA-568-B) exige topologia estrela no cabeamento horizontal, distância máxima 90m + 10m de manobra = 100m; elementos funcionais para **edifícios comerciais**: CD (Distribuidor de Campus) → BD (Distribuidor de Edifício) → FD (Distribuidor de Piso) → TO (Tomada de Telecomunicações), com CP (Ponto de Consolidação) intermediário opcional; para **Data Center**: MD (Distribuidor Principal) → ZD (Distribuidor de Zona) → LDP → EO; recomendação mínima para Data Center é CAT6A/Classe EA (par trançado) + fibra OM3 (10G cobre / 40-100G fibra); classes de desempenho: Classe C=CAT3, D=CAT5e, E=CAT6, EA=CAT6A, F=CAT7; pinagem **T568B**: pino1-branco/laranja, 2-laranja, 3-branco/verde, 4-azul, 5-branco/azul, 6-verde, 7-branco/marrom, 8-marrom (pinos 1-2=TX, 3-6=RX); **T568A** troca os pares laranja↔verde (pino1-branco/verde, 2-verde, 3-branco/laranja, 6-laranja); cabo crossover inverte os pares laranja/verde entre as pontas; raio de curvatura mínimo de fibra: 10x o diâmetro sem tensão (15-20x sob tração); raio de UTP: 4x o diâmetro.

**Por que estudar isso:** tema muito numeroso e "decoreba de tabela" pura (aparece em todas as 9 partes, 5-15 questões cada) — alto retorno por tempo de estudo porque a regra é fechada e sempre cobrada com números exatos.

**Alerta de Pegadinha:** trocar a frequência MHz de uma categoria por outra (CAT6 x CAT6A é o par mais cobrado: ambos fazem 10Gbps, mas CAT6 só até 55m); trocar os nomes em português (Distribuidor de Zona etc.) pelas siglas em inglês da norma; achar que o limite de 100m é absoluto em qualquer cenário — pelo menos uma questão específica do lote cobrou 20m como máximo para um segmento sem uso de outros segmentos no mesmo andar, fugindo da regra geral; inverter os pares na pinagem 568A x 568B.

**Ação Prática:** decore a tabela CAT3 a CAT8 com MHz exatos, e as duas cadeias de elementos funcionais (comercial: CD-BD-FD-TO; data center: MD-ZD-LDP-EO) até recitar de cabeça; treine "traduzir" a pinagem 568A↔568B nos 8 pinos.

---

### 🎯 Assunto: Fibra Óptica e Padrões Físicos Ethernet
**O que estudar obrigatoriamente:** fibra **monomodo** (núcleo menor, 8-10µm, usa laser, maior alcance, usada em WAN/backbone/long-haul) x **multimodo** (núcleo maior, 50/62,5µm, usa LED, menor custo, típica de LAN) — pegadinha clássica é achar que "mono" implica núcleo maior (é o contrário); OM3 até 300m/10Gbps, OM4 até 550m/10Gbps, OM5 é a única com WDM (até 4 canais no mesmo par, 850-950nm); padrões 1000BASE — **SX** (multimodo, curto alcance ~550m, short-wave laser, opção de menor custo para 1Gbps), **LX** (mono ou multimodo, ~5km), **EX** (monomodo, 1310nm, ~40km), **ZX** (monomodo, 1550nm, ~70-80km), **T/TX** (par trançado CAT5e/CAT6, 100m); mnemônicos citados nos comentários: "Zebra 80km(ZX), Elefante 40m(EX), Lugar a 5km(LX)"; fibra óptica **não** é afetada por ruído eletromagnético; ATM/Ethernet 10Gigabit eliminou hub/repetidor/half-duplex/CSMA-CD, operando só full-duplex ponto a ponto; MTU/payload padrão de um frame Ethernet é 1.500 bytes (campo Dados entre 46-1500 bytes, frame mínimo total 64 bytes); no Gigabit Ethernet (1000Base-T) o quadro mínimo real transmitido é 520 bytes por causa do "carrier extension"; endereço MAC tem 48 bits/6 bytes (3 do fabricante + 3 sequenciais); FCS/CRC de 32 bits detecta erro na subcamada MAC.

**Por que estudar isso:** tema com muitos números exatos (nm, km, m, bits) cobrados literalmente — segunda maior fonte de "decoreba numérica" do banco depois do cabeamento de cobre.

**Alerta de Pegadinha:** confundir 1000BASE-SX/LX/EX/ZX pela distância e tipo de fibra; achar que existe contradição entre duas questões reais do banco sobre se 1000BASE-TX exige CAT5 ou CAT6+ (a literatura mais aceita é 1000BASE-T=CAT5e e 1000BASE-TX=CAT6, mas o próprio banco tem gabaritos conflitantes — ver nota geral no topo); achar que fibra "contrai" ao propagar pulsos de luz (na verdade eles se **expandem** — dispersão cromática).

**Ação Prática:** monte a tabela OM3/OM4/OM5 com alcance e capacidade WDM, e a tabela 1000BASE-SX/LX/EX/ZX/T com tipo de fibra e alcance exato, até recitar de cabeça.

---

### 🎯 Assunto: Equipamentos de Interconexão — Hub, Switch, Bridge, Roteador, Gateway
**O que estudar obrigatoriamente:** **hub** (Física, half-duplex, compartilha banda entre todas as portas simultaneamente, sempre faz flooding, nunca aprende MAC, pode ser passivo/ativo/inteligente); **bridge** (Enlace, transparente — estações não percebem sua existência —, só conecta redes do **mesmo** protocolo, isola tráfego entre segmentos); **switch** (Enlace, encaminha por MAC de destino, aprende endereços dinamicamente por porta, separa domínio de **colisão** por porta mas mantém o **mesmo** domínio de broadcast — só o roteador separa broadcast); switch **L3**/switch com roteamento sobe para a camada de Rede e faz roteamento inter-VLAN; modos de operação do switch: **cut-through** (retransmite assim que lê o cabeçalho/MAC destino, sem checar CRC — mais rápido, menos seguro, exige mesma velocidade nas portas), **store-and-forward** (recebe o quadro inteiro, verifica CRC antes de encaminhar), **fragment-free** (verifica só os 64 primeiros bytes); **roteador** (Rede, escolhe rota pela tabela de roteamento e máscara, interliga redes diferentes; roteador dinâmico considera congestionamento, estático só busca menor caminho); **gateway** atua em qualquer camada (inclusive Aplicação), converte protocolos **diferentes** e pode alterar o formato do pacote — diferente da bridge, que só liga redes do mesmo protocolo sem alterar nada.

**Por que estudar isso:** é a base de praticamente toda questão de topologia/diagrama do banco (todas as 9 partes) — muitas vezes cobrado via figura textualizada pedindo para identificar cada equipamento pela posição/função na rede.

**Alerta de Pegadinha:** achar que o switch separa domínio de broadcast (só o roteador separa); confundir bridge (mesmo protocolo, transparente, sem alterar pacote) com gateway (protocolos diferentes, altera formato, qualquer camada); achar que hub é "gerenciável" ou aprende endereços (é sempre passivo); atribuir ao switch a função de interligar redes **diferentes** (isso é do roteador); em questões de diagrama com múltiplos equipamentos em cascata, o elemento que "escolhe rota" só pode ser roteador mesmo que a posição sugira hub/switch.

**Ação Prática:** monte uma tabela (Equipamento / Camada OSI / Endereço usado para decidir / Altera o pacote? / Domínio que separa) para hub-bridge-switch-roteador-gateway, e treine reconhecer cada um em 5 diagramas de topologia diferentes.

---

### 🎯 Assunto: Switches Avançados — VLAN (802.1Q), STP/RSTP e LACP
**O que estudar obrigatoriamente:** **802.1Q** insere tag de VLAN no quadro Ethernet — tag total de **32 bits** (TPID 16 bits + TCI 16 bits, sendo TCI = Priority/802.1p 3 bits + CFI 1 bit + VLAN ID 12 bits) — até 4.096/4.094 VLANs; VLAN pode ser agrupada por porta, MAC ou IP/protocolo, e VLANs diferentes só se comunicam via roteador ou switch L3 (nunca switch L2 comum); **802.1Q nunca fez parte do 802.1D** — são padrões totalmente separados; **STP (802.1D)** elege root bridge pela **menor** prioridade de bridge (múltiplo de 4.096; empate = menor MAC), 5 estados de porta (Blocking, Listening, Learning, Forwarding, Disabled), custo por velocidade (10Mbps=100, 100Mbps=19, 1Gbps=4 — **não confundir com custo OSPF**, que é diferente: qualquer link ≥FastEthernet=1); algoritmo de Perlman: (1) elege root pelo menor ID, (2) cada bridge acha sua porta raiz de menor custo até a root, (3) cada LAN elege a bridge designada de menor custo, (4) portas raiz/designadas ficam em forwarding, as demais em blocking; **RSTP (802.1w)** reduz para **3 estados** (Discarding=Blocking+Disabled+Listening, Learning, Forwarding) e introduz **Edge Port** (porta de dispositivo final que vai direto a forwarding, sem esperar BPDUs); funções de porta no RSTP: Root, Designated, Alternate, Backup (diferente de "estado" de porta — são duas classificações distintas); **LACP (802.3ad)** tem modos **on** (estático, não fala LACP), **active** e **passive** (negociam) — combinar "on" com "active" **não forma** o agrupamento.

**Por que estudar isso:** um dos blocos mais consistentes do banco (7-10 questões por parte), sempre testando a distinção fina entre siglas parecidas: 802.1Q x 802.1D x 802.1w x 802.1p x 802.1X (cinco padrões quase idênticos no nome, funções totalmente diferentes).

**Alerta de Pegadinha:** misturar 802.1Q (VLAN) com 802.1D (STP) como se um dependesse do outro; misturar 802.1w (RSTP) com 802.1X (autenticação por porta/RADIUS); usar nomenclatura de estado do STP clássico (Blocking/Disabled) para descrever RSTP (que usa Discarding); achar que LACP "on"+"active" formam agregação; achar que o switch raiz do STP precisa da **maior** prioridade (é a menor).

**Ação Prática:** monte uma tabela das 5 siglas 802.1{Q,D,w,p,X} com uma linha de função cada; treine eleição de root bridge com 3 switches de prioridades diferentes; decore a estrutura exata da tag 802.1Q (TPID+TCI com seus subcampos).

---

### 🎯 Assunto: Redes sem Fio (802.11) — Padrões, Frequências, CSMA/CA
**O que estudar obrigatoriamente:** tabela de padrões — 802.11 original (1997, 2,4GHz, 2Mbps, DSSS/FHSS), **802.11b** (2,4GHz, DSSS, 11Mbps), **802.11a** (5GHz, OFDM, 54Mbps), **802.11g** (2,4GHz, OFDM/DSSS, 54Mbps, compatível com b), **802.11n**/Wi-Fi 4 (2,4 **e** 5GHz simultaneamente, MIMO com até 4 antenas, canais 20/40MHz, até 600Mbps), **802.11ac**/Wi-Fi 5 (5GHz, MU-MIMO, beamforming, >1-6Gbps), **802.11ax**/Wi-Fi 6 (2,4/5/6GHz, introduz **OFDMA**, MU-MIMO aprimorado e **TWT** — não abandona 2,4GHz nem se limita a ela); em rede mista, a velocidade cai para a do dispositivo **mais lento** presente; **CSMA/CA** via **DCF** (Distributed Coordination Function) é o mecanismo padrão contra colisão no ar — "Carrier Sense" é escutar o meio antes de transmitir, "Collision Avoidance" é o espaçamento/prioridade (IFS) que evita transmissão simultânea; RTS/CTS + **NAV** (Network Allocation Vector) reservam o meio; **PCF** permite controle por polling; classificação por alcance: **WPAN** (Bluetooth/802.15.1/ZigBee/IrDA/UWB), **WLAN** (Wi-Fi/802.11), **WMAN** (WiMAX/802.16, outdoor supera 60Mbit/s), **WWAN** (celular/LTE); modos de AP — **Root** (repassa wireless↔cabeada), **Repeater** (repassa entre APs), **Bridge** (une segmentos cabeados); campo **Beacon** do AP é consultado periodicamente pela estação em modo de economia de energia; campos To DS/From DS do frame indicam direção.

**Por que estudar isso:** bloco muito consistente (7-15 questões por parte), sempre cobrando a tabela exata de taxa/frequência/modulação por padrão — e a FCC já cobrou pelo menos uma associação pouco intuitiva (802.11n↔DSSS) que vale registrar como o gabarito oficial mesmo destoando da lógica usual (802.11n é OFDM).

**Alerta de Pegadinha:** confundir 802.15.1 (Bluetooth/WPAN) com 802.11 (Wi-Fi/WLAN) ou 802.16 (WiMAX/WMAN); achar que 802.11ax abandona ou se limita a 2,4GHz; esquecer que a velocidade da rede mista cai para o dispositivo mais lento; trocar unidades (Gbit/s por Mbit/s) em questões de throughput x distância.

**Ação Prática:** monte a tabela padrão→frequência→modulação→taxa máxima (b/a/g/n/ac/ax) e treine até recitar sem hesitar; memorize a hierarquia WPAN<WLAN<WMAN<WWAN por alcance crescente.

---

### 🎯 Assunto: Topologias de Rede
**O que estudar obrigatoriamente:** **barramento** (meio único compartilhado, atenuação limita alcance, arbitragem centralizada/distribuída — IEEE 802.3 clássico); **anel** (cada nó com duas conexões, token controla acesso — IEEE 802.5/FDDI; anel **unidirecional**: falha de 1 estação derruba tudo; anel **bidirecional**: uma quebra isolada não derruba a rede); **estrela** (nó central/switch, menor atraso que anel, falha do nó central pode tirar toda a rede do ar, falha de uma estação afeta só ela); **malha** (múltiplos caminhos, mais tolerante a falha, mas cara pelo crescimento exponencial de conexões); **híbrida** (ex.: backbone em estrela interligando redes em barramento); topologia lógica x física — um switch cria topologia lógica **e** física em estrela; um hub mantém topologia lógica em **barramento** mesmo com fiação física em estrela; **P2P** (peer-to-peer, sem cliente/servidor fixo, ex. Napster); **VSAT** (hub station coordena estações remotas via satélite, topologias malha/estrela).

**Por que estudar isso:** tema recorrente e simples, mas com armadilhas de gabarito documentadas neste banco (ver nota geral no topo sobre malha "barata" e fibra/par-trançado invertidos).

**Alerta de Pegadinha:** confundir topologia lógica com física (hub = física estrela, lógica barramento); achar que malha é topologia barata (é a mais cara pela quantidade de conexões, mas o banco já cobrou o contrário como gabarito); em cenários que descrevem claramente um barramento (mestre único, meio compartilhado), desconfiar se o gabarito registrado disser "estrela" — é uma divergência já documentada neste banco.

**Ação Prática:** desenhe as 5 topologias com o ponto de falha único de cada uma, e treine identificar topologia lógica x física em cenários com hub vs switch.

---

## 🧩 Endereçamento IP e Serviços de Rede

### 🎯 Assunto: Endereçamento IPv4 e Cálculo de Sub-redes (CIDR/VLSM)
**O que estudar obrigatoriamente:** fórmulas fixas — **hosts úteis = 2^(bits de host) − 2**; **nº de sub-redes = 2^(bits emprestados)**, sempre arredondando para a **próxima potência de 2** quando o enunciado pede "no mínimo N sub-redes" (ex.: pedir 5 ou 6 sub-redes exige 2³=8, não 5 ou 6); classes IPv4 pelos bits iniciais — A (0xxxxxxx, 1-126, /8), B (10xxxxxx, 128-191, /16), C (110xxxxx, 192-223, /24), D (1110xxxx, 224-239, multicast), E (1111xxxx, 240-255, reservado); dentro de uma classe C /24 puro só existem **2²¹** redes possíveis (não 2²⁴, pois os 3 bits fixos "110" não contam); tabela CIDR→máscara→hosts de cor: /24→.0→254, /25→.128→126, /26→.192→62, /27→.224→30, /28→.240→14, /29→.248→6, /30→.252→2; achar a "N-ésima sub-rede" de um bloco maior (passo a passo: calcular bits emprestados → somar ao prefixo → calcular tamanho de cada sub-rede 2^(32-novo prefixo) → enumerar sequencialmente); gateway padrão geralmente é o primeiro ou o último IP válido da sub-rede; rede ponto-a-ponto /30 tem exatamente 2 IPs utilizáveis; faixas privadas RFC 1918 — 10.0.0.0/8, **172.16.0.0/12** (172.16-172.31, atenção: 172.15.x.x já é público), 192.168.0.0/16 — mais 169.254.0.0/16 (APIPA, link-local automático); CIDR foi criado para mitigar o desperdício de endereços do esquema classful, principalmente na Classe B.

**Por que estudar isso:** é disparadamente o tema isolado mais recorrente de todo o banco de Redes — aparece com 6 a 15+ questões em **todas as 9 partes**, sempre em formato de cálculo numérico direto, às vezes combinado com IPv6 no mesmo enunciado (dual stack).

**Alerta de Pegadinha:** subestimar os bits emprestados ao arredondar "no mínimo N sub-redes" para baixo em vez de para cima; confundir "hosts úteis" (subtrai 2) com "endereços totais/nº de sub-redes" (não subtrai); ao pedir "até N endereços", buscar a menor potência de 2 **≥** N, não a mais próxima por baixo; errar a numeração de qual sub-rede é a "N-ésima" (a partir de 0 ou do endereço-base real do bloco, não de .0 absoluto); achar que 172.19.x.x e 172.15.x.x estão na mesma categoria (só 172.16-172.31 é privado); achar que 192.168.0.10 é "Classe B" pela aparência — é endereçamento privado formado por blocos Classe C.

**Ação Prática:** pratique 20-30 exercícios de cálculo de sub-rede cronometrado (classe B e C, blocos /21 a /30, nos dois sentidos — dado a máscara achar sub-redes/hosts, e dado o requisito achar a máscara) até resolver cada um em menos de 60 segundos, sempre confirmando a pergunta exata (hosts úteis? endereços totais? N-ésima sub-rede?) antes de decidir a fórmula.

---

### 🎯 Assunto: IPv6 — Cabeçalho, Endereçamento, Compressão e EUI-64
**O que estudar obrigatoriamente:** ordem exata do cabeçalho fixo de **40 bytes** — Version (4 bits) – Traffic Class (8 bits) – **Flow Label** (20 bits, suporte a QoS de fluxo) – **Payload Length** (16 bits) – **Next Header** (8 bits) – **Hop Limit** (8 bits, equivalente ao TTL, decrementado a cada roteador) – Source Address (128 bits) – Destination Address (128 bits); **não existe checksum** no cabeçalho IPv6 (assume meio confiável); compactação com "**::**" só pode ocorrer **uma única vez** em todo o endereço; **não existe broadcast em IPv6** — multicast (obrigatório, era opcional no IPv4) e anycast assumem essa função; escopos de multicast pelo 4º caractere do prefixo FFXY: 2=link-local (FF02::1=todos os nós, FF02::2=todos os roteadores, FF02::5/6=OSPF, FF02::9=RIP, FF02::A=EIGRP), 5=site-local, 8=organization-local, E=global; link-local unicast sempre **FE80::/10**; loopback = **::1**; ARP é substituído pelo **NDP** (Neighbor Discovery Protocol, roda sobre ICMPv6) — ICMPv6 também envia "Parameter Problem" ao **nó de origem** quando detecta cabeçalho/Next Header inválido; **fragmentação não é mais feita pelos roteadores** — passa a ser função dos hosts de origem via Path MTU Discovery; hierarquia antiga de roteamento usava campos TLA/NLA/SLA; endereço IPv4-mapeado usa prefixo **::FFFF:** seguido do IPv4 em hex; cálculo **EUI-64** a partir do MAC: (1) divide o MAC ao meio, (2) insere **FFFE** no meio, (3) inverte o **7º bit** (U/L bit) do primeiro byte, (4) prefixa com FE80:: (link-local) ou o prefixo de rede (unicast global); Multicast Listener Discovery (**MLD**) substitui o IGMP no IPv6; IPSec é **obrigatório** no IPv6 (era opcional no IPv4).

**Por que estudar isso:** bloco denso e técnico (6-8 questões por parte), cobrado com rigor de "decoreba de campo exato" — apareceu em todas as 9 partes, muitas vezes testando tamanhos exatos de campo em bits.

**Alerta de Pegadinha:** esquecer de inverter o 7º bit ou de inserir FFFE no EUI-64; usar "::" mais de uma vez; confundir os prefixos de escopo multicast (FF02 x FF05 x FF08 x FF0E) ou FE80::/10 com FC00::/7 (ULA) ou FF00::/8 (multicast); achar que o IPv6 tem broadcast; confundir Flow Label (20 bits, QoS) com Traffic Class (8 bits, DiffServ); achar que Hop Limit fragmenta pacotes (ele os **descarta** ao chegar a zero); achar que roteadores fragmentam pacotes IPv6 no meio do caminho.

**Ação Prática:** pratique o algoritmo EUI-64 completo com 5 endereços MAC diferentes até automatizar os 4 passos; decore a estrutura de 40 bytes do cabeçalho com o tamanho exato de cada campo; decore a tabela de escopos multicast.

---

### 🎯 Assunto: Portas TCP/UDP de Protocolos de Aplicação
**O que estudar obrigatoriamente:** tabela consolidada — **Telnet 23**, **SSH 22**, **SMTP 25** (servidor-servidor)/**587** (submissão cliente, STARTTLS, recomendado pelo CGI.br)/**465** (SMTPS, hoje considerado deprecated mas ainda cobrado em provas mais antigas), **DNS 53**, **HTTP 80**/**HTTPS 443**, **POP3 110**/**995** (POP3S), **IMAP 143**/**993** (IMAPS), **SNMP 161** (polling)/**162** (trap), **LDAP 389**/**636** (LDAPS), **CIFS/SMB 445** (diferente de NetBIOS, que usa 137/138/139), **NFS 2049**, **BGP 179/TCP**, **RabbitMQ/AMQP 5672**, **FTP 20** (dados)/**21** (controle)/**990** (FTPS); faixas de porta IANA/RFC 6335: sistema/*well-known* 0-1023, registradas 1024-49151, dinâmicas/privadas 49152-65535; TCP orientado a conexão (handshake, controle de fluxo, retransmissão), UDP não orientado a conexão; fragmentação é função do **IP** (Rede), segmentação é função do **TCP** (Transporte); verbos HTTP — PATCH altera parcial, PUT substitui integralmente; famílias de status HTTP — 2xx sucesso (201=Created), 3xx redirecionamento, 4xx erro cliente (403=Forbidden, 404=Not Found), 5xx erro servidor (500=Internal Server Error, 503 tipicamente associado a DDoS/indisponibilidade); OAuth 2.0 tem 4 papéis: Resource Owner, Client, Authorization Server, Resource Server (API que hospeda os dados protegidos).

**Por que estudar isso:** as portas exatas são cobradas de forma consistente e repetitiva em **todas as 9 partes** — é puro ganho de decoreba, sem ambiguidade de interpretação, e altíssimo retorno por tempo investido.

**Alerta de Pegadinha:** trocar a porta "insegura" pela "segura" de cada protocolo (110×995, 143×993, 25×587×465); esquecer que DHCP e SNMP são exclusivamente UDP, nunca TCP; inverter a direção do TRAP SNMP (sempre agente→gerente, porta 162); confundir porta de controle (21) com porta de dados (20) do FTP.

**Ação Prática:** monte um flashcard porta→protocolo→TCP/UDP para as ~20 portas listadas e treine até responder em menos de 3 segundos por porta.

---

### 🎯 Assunto: DHCP
**O que estudar obrigatoriamente:** sequência **DORA** — **D**iscover (cliente, broadcast) → **O**ffer (servidor) → **R**equest (cliente aceita, também broadcast) → **A**ck (servidor confirma); mensagens adicionais DECLINE, NAK, RELEASE, INFORM; portas **67/UDP** (servidor) e **68/UDP** (cliente) — nunca TCP; opções numeradas — Option 1=Subnet Mask, Option 3=Default Gateway, Option 4=Time Server, Option 5=Name Server/NetBIOS, Option 6=DNS Server, Option 7=Log Server/Syslog, Option 15=Domain Name; **DHCP Relay Agent** permite um único servidor atender múltiplas sub-redes (só precisa saber o IP do servidor DHCP para retransmitir o DISCOVER como unicast); mecanismo de **leasing** (arrendamento por tempo, renovação antes de expirar); DHCP é extensão do **BOOTP**, do ponto de vista do cliente, permitindo interoperar sem mudar o software de boot; permite alocação manual (por MAC reservado) ou automática/dinâmica (pool); no Windows Server, distribuição por classes/políticas fica em "Policies" no console DHCP; **DHCP Failover** (Windows Server 2008 R2+) reduz (não elimina) interrupções por falha do servidor.

**Por que estudar isso:** cobrado de forma consistente em todas as partes (3-5 questões cada), sempre no mesmo formato de ordenar DORA ou identificar porta/protocolo de transporte.

**Alerta de Pegadinha:** trocar a ordem das mensagens ou achar que DHCPREQUEST vem do servidor (vem sempre do cliente); inserir "porta 67/TCP" como distrator (é sempre UDP); confundir a mensagem correta de um host novo buscando servidor (é sempre DHCPDISCOVER, nunca "DHCPSEARCH", que não existe).

**Ação Prática:** decore o mnemônico DORA e as portas 67/68 UDP; treine reconhecer as opções DHCP mais cobradas (1, 3, 6, 7, 15) numa captura de tela simulada.

---

### 🎯 Assunto: DNS
**O que estudar obrigatoriamente:** tipos de registro — **A** (hostname→IPv4), **AAAA** (hostname→IPv6), **CNAME** (alias, múltiplos nomes no mesmo host), **MX** (servidor de e-mail do domínio), **SOA** (Start of Authority, responsável pela zona), **NS** (servidor autoritativo), **PTR** (resolução reversa, domínio especial **in-addr.arpa**), **TXT**/**SPF** (SPF é um registro TXT com lista de servidores autorizados a enviar e-mail pelo domínio), **HINFO**; **DKIM** é assinatura, não substitui SMTP; estrutura hierárquica: raiz → TLD (domínio de topo, ex. .com, gerenciado por servidor TLD) → domínio → subdomínio; três macrocomponentes: Domain Name Space/Resource Records, Name Servers, **Resolvers** (biblioteca vinculada à aplicação cliente, não um processo separado); registro de recurso tem 5 campos: Domínio/TTL/Classe(IN)/Tipo/Valor; três tipos de mensagem DNS: Consulta, Resposta e **Atualização** (RFC 2136, usada na troca **entre** servidores DNS); **BIND** é a implementação open-source mais usada; **DNSSEC**: servidor assina com chave **privada**, cliente autentica a zona com a chave **pública** correspondente; ataque de **DNS cache poisoning/spoofing** injeta dados falsos no cache de um resolver para redirecionar tráfego; papel do **ICANN** é gerenciar recursos críticos (nomes de domínio e IPs) — não cria padrões técnicos (isso é IETF); no **Registro.br**, nomes de domínio têm 2-26 caracteres (sem contar categoria), não podem começar/terminar com hífen.

**Por que estudar isso:** cobrado de forma pontual mas consistente em todas as partes (3-10 questões cada), com frequência cruzado com segurança de e-mail (SPF/DKIM) ou ataques (spoofing).

**Alerta de Pegadinha:** confundir SPF (registro TXT) com "protocolo próprio"; trocar o papel de A/AAAA/CNAME/MX entre si; achar que DNS serve só para mapear nome↔IP (é um banco hierárquico genérico); achar que os registros DNSSEC guardam só chaves públicas, ou que o cliente autentica com sua própria chave privada (é o servidor que assina com a privada dele).

**Ação Prática:** monte um mini-DNS de exemplo com um registro de cada tipo (A, AAAA, CNAME, MX, TXT/SPF, PTR) e explique a função de cada linha; treine a montagem de uma consulta reversa `X.X.X.X.in-addr.arpa`.

---

### 🎯 Assunto: E-mail — SMTP, POP3 e IMAP
**O que estudar obrigatoriamente:** **SMTP** transporta entre servidores (envio) e faz a submissão do cliente (porta 25 sem segurança / **587** com STARTTLS, recomendado pelo CGI.br em vez da 25 / 465 SMTPS legado); **POP3** baixa as mensagens e as remove do servidor por padrão (porta 110 / 995 com SSL) — vantagem é permitir leitura offline; **IMAP** mantém tudo no servidor, sincroniza múltiplas caixas e permite acesso multi-cliente/webmail sem download (porta 143 / 993 com SSL); **MIME** é o padrão que permite anexos em mensagens SMTP, que originalmente só suporta texto ASCII 7 bits; **relay aberto** mal configurado permite envio de spam para/de qualquer domínio (correção: restringir origem/destino); **spoofing de e-mail** explora a ausência de autenticação nos campos From/Reply-To/Return-Path do SMTP.

**Por que estudar isso:** tema recorrente em todas as 9 partes (5-9 questões cada), quase sempre pedindo a configuração "mais adequada" de portas/protocolos para um cenário de segurança ou bloqueio em firewall.

**Alerta de Pegadinha:** achar que POP3/IMAP têm "criptografia nativa" sem TLS explícito na porta padrão; confundir a porta de envio (SMTP) com a de recebimento (POP3/IMAP) num mesmo cenário; ao bloquear SMTP num firewall lembrar que a porta certa a bloquear pode ser 25 **ou** 587 dependendo do cenário (submissão x relay).

**Ação Prática:** para qualquer cenário de e-mail, separe mentalmente "enviar" (SMTP) de "receber" (POP3 ou IMAP) antes de escolher portas, e sempre prefira a variante criptografada quando o enunciado pedir "boas práticas" ou "segurança".

---

### 🎯 Assunto: LDAP
**O que estudar obrigatoriamente:** protocolo de acesso a diretório (RFC 2251/4510), versão **simplificada** do X.500/DAP (não confundir com X.509, que é de certificados), organiza dados em árvore hierárquica (**DIT** — Directory Information Tree), raiz tipicamente = componente de domínio (dc=); cada entrada tem **DN** (Distinguished Name) único, mas o identificador imutável usado internamente é o **entryUUID** (RFC 4530), pois o DN muda se o objeto mudar de posição na árvore; atributo `sn` = surname/sobrenome; atributo `userPassword` pode ter múltiplos valores em formatos diferentes (SHA1/MD5/CRYPT); operação **Bind** autentica a sessão (DN + senha + versão do protocolo); operação de busca (**Search**) pode ser restrita a um ramo específico (subtree), não precisa varrer a árvore inteira; formato **LDIF** para importar/exportar entradas, primeiro campo é sempre `dn`; comando `ldapadd` adiciona entradas em lote a partir de um LDIF; toda entrada tem uma object class *structural* e pode ter várias *auxiliary*; **OpenLDAP**: daemon `slapd` (autônomo, escuta porta **389**, ou 636 com TLS/LDAPS) e `slurpd` (replicação); arquivo de configuração `/etc/ldap/slapd.conf`; suporta SASL com mecanismo DIGEST-MD5; LDAP é o protocolo usado para consultar/administrar o **Active Directory**, via ADSI no Windows.

**Por que estudar isso:** citado explicitamente no edital e testado com boa densidade técnica no banco, sempre exigindo vocabulário exato da especificação (operações, estrutura de entrada, arquivos de configuração).

**Alerta de Pegadinha:** achar que LDAP é "mais completo" que o X.500 (é o oposto, é simplificado); achar que a topologia é barramento/anel (é sempre árvore); confundir Bind (autenticação) com outras operações (Search/Add/Modify); achar que o DN é o identificador permanente/imutável (é o entryUUID).

**Ação Prática:** decore o fluxo básico: conectar → Bind (autenticar) → Search/Modify → Unbind; escreva um DN de exemplo completo (`cn=usuario,ou=TI,dc=empresa,dc=com`) identificando cada componente.

---

### 🎯 Assunto: SNMP e Gerência de Redes (MIB, RMON, Netflow, FCAPS)
**O que estudar obrigatoriamente:** agente escuta **161/UDP** (polling: Get/GetNext/GetBulk/Set, sempre iniciado pelo **gerente**), trap chega na **162/UDP** (sempre iniciado pelo **agente**, assíncrono, para sinalizar evento/alarme — coldStart=reinício com config alterada, warmStart=reinício sem alteração); PDUs adicionais: **Inform** (comunicação gerente-gerente), **Report** (erros de processamento); **MIB** é a base de dados hierárquica de objetos gerenciáveis identificados por **OID** (não é um protocolo); **SMI** é a notação (baseada em ASN.1) que define a estrutura desses objetos; hierarquia da árvore: iso(1)→org(3)→dod(6)→internet(1)→**mgmt**(2)→**mib-2**(1), cujo primeiro grupo é "system"; **RMON1** opera só na camada MAC, **RMON2** estende a camadas de rede/superiores; **Netflow** funciona como cache de lookups, exporta dados de fluxo sem checar access-list a cada pacote; **FCAPS** (ISO 7498-4): as 5 áreas de gerenciamento — Falhas, Configuração, Contabilização (Accounting), Desempenho, Segurança; **Zabbix** é o gerente SNMP citado no edital que centraliza coleta (Zabbix Proxy redistribui carga em ambientes distribuídos; servidor Zabbix roda só em Unix/Linux, mas agentes existem para Windows também).

**Por que estudar isso:** citado explicitamente no edital (item 14, Monitoramento) e testado com boa densidade em todas as partes (6-13 questões cada); as ferramentas específicas do edital (Prometheus, Grafana, Fluentd) têm cobertura **praticamente nula** no banco de questões — reforce essas direto pela documentação oficial.

**Alerta de Pegadinha:** inverter a direção do Trap (é sempre agente→gerente); achar que Get-Request altera algum valor (só Set-Request altera); achar que MIB é um protocolo (é uma base de dados; quem acessa é o SNMP).

**Ação Prática:** monte a tabela PDU→direção (gerente→agente ou agente→gerente)→porta e treine identificar a direção certa de cada operação; complemente com leitura rápida da documentação de Prometheus/Grafana/Fluentd, já que o banco de questões não cobre essas ferramentas citadas no edital.

---

## 🧩 Roteamento, QoS e VoIP

### 🎯 Assunto: Roteamento — OSPF x BGP x RIP
**O que estudar obrigatoriamente:** **OSPF** é **IGP** (dentro do AS), link-state, algoritmo de **Dijkstra**, divide o domínio em áreas para reduzir LSAs/carga de CPU, permite balanceamento entre rotas de mesmo custo, adjacência via **multicast** (não broadcast), não obriga cada roteador a conhecer toda a topologia, roteamento por tipo de serviço (TOS); tipos de LSA — tipo 1 (router), tipo 2 (network, gerado pelo DR), tipos 3/4 (originados pelo ABR entre áreas), tipo 5 (rotas externas ao AS); 5 tipos de pacote OSPF: Hello, Database Description, Link State Request, Link State Update, Link State Acknowledgment; eleição do **DR** (Designated Router): maior prioridade de interface (empate: maior Router-ID; prioridade 0 exclui da eleição); **BGP** é **EGP** (entre ASs, roteamento **inter**domínio), usa **vetor de caminho/path vector** guiado por política administrativa (não Dijkstra, não contagem pura de saltos, embora a FCC já tenha usado "vetor distância" para descrevê-lo em outra prova), sessão **179/TCP unicast**, atributos principais **AS-PATH** e **NEXT-HOP** (entre os 7 da RFC 4271); iBGP usa endereços **unicast** para descobrir vizinhos dentro do AS (exige IGP/rota estática para alcançá-los), eBGP exige IP+AS do vizinho configurados manualmente; **RIP** é IGP, vetor-distância puro, métrica = contagem de saltos, **máximo 15 saltos** (16=infinito/inalcançável), broadcast periódico da tabela inteira (a cada 30s), convergência lenta, sem VLSM (RIPv1, classful) — **RIPv2** já suporta VLSM, indica next-hop e tem autenticação, mantendo o limite de 15 saltos; roteamento **intra**domínio ocorre dentro do AS (RIP/OSPF), **inter**domínio entre ASs (BGP).

**Por que estudar isso:** citado explicitamente no edital (Roteamento: OSPF/BGP) e cobrado de forma muito consistente em todas as 9 partes (4-6 questões cada), quase sempre em formato de asserção-razão testando se você sabe classificar IGP x EGP e o algoritmo correto de cada um.

**Alerta de Pegadinha:** classificar OSPF como EGP ou associá-lo a métrica de saltos (é IGP + Dijkstra); achar que BGP usa Dijkstra (usa política/vetor de caminho); inverter quem usa broadcast (RIP) e quem usa multicast (OSPF); confundir o custo OSPF (link ≥FastEthernet=1) com o custo STP (tabela por velocidade, diferente).

**Ação Prática:** monte uma tabela OSPF x BGP x RIP com colunas (IGP/EGP, algoritmo/métrica, porta/multicast, limite, uso típico) e treine até recitar de cabeça.

---

### 🎯 Assunto: QoS — DiffServ, IntServ, Campos e Métricas
**O que estudar obrigatoriamente:** campo **ToS/DiffServ (DS)** do cabeçalho IPv4 tem 8 bits — os **6 bits mais à esquerda formam o DSCP** (64 valores), os 2 restantes são **ECN**; tráfego VoIP marcado como **EF** (Expedited Forwarding), tráfego de controle como **CS6**; QoS de camada 2 (Ethernet) usa **802.1p** — campo **PCP** (Priority Code Point, 3 bits, dentro da tag 802.1Q) permite 8 níveis de prioridade (0-7), sendo **Network Control (valor 7)** o mais alto segundo a tabela padrão (atenção: uma questão do banco registrou "Aplicação Crítica" como o de maior prioridade — gabarito contestado, ver nota geral); **IntServ** usa **RSVP** para reservar recursos fim a fim por fluxo (alta granularidade); **DiffServ** classifica por classes agregadas, sem sinalização por fluxo (mais simples no núcleo); **LLQ** garante prioridade absoluta/baixa latência para voz, diferente de **CBWFQ** (classes com peso, sem prioridade estrita), WFQ e FIFO; definições exatas — **jitter** = variação do atraso entre pacotes do mesmo fluxo; **latência** = tempo total (propagação+transmissão+fila+processamento); **throughput** = taxa efetiva; **skew** = diferença de tempo de apresentação entre dois fluxos relacionados (ex. áudio e vídeo); **RFC 2544** define benchmarking de dispositivos de rede (throughput, latência, frame loss) com quadros de **tamanho variável** (64 a 1518 bytes), baseada na RFC 1242; **RFC 2889** estende para "taxa de endereçamento" (mapeamento um-para-muitos).

**Por que estudar isso:** citado explicitamente no edital (item "Qualidade: QoS") e cobrado com boa densidade técnica em quase todas as partes (4-6 questões cada), sempre testando números exatos de campos.

**Alerta de Pegadinha:** trocar 6 bits do DSCP por 4, ou confundir DSCP com ECN; achar que jitter é sinônimo de latência máxima; achar que RFC 2544 usa quadros de tamanho fixo (1500 bytes); confundir o campo TOS/DSCP (camada 3) com o PCP do 802.1p (camada 2) e com o Flow Label do IPv6 (cada um pertence a uma camada/padrão diferente).

**Ação Prática:** decore a divisão exata do byte ToS (6 bits DSCP + 2 bits ECN) e escreva de próprio punho as definições de jitter/latência/throughput/skew até conseguir explicar a diferença sem hesitar.

---

### 🎯 Assunto: VoIP — SIP, H.323, RTP/RTCP
**O que estudar obrigatoriamente:** **SIP** codifica mensagens em **texto ASCII** (ABNF), roda sobre TCP ou UDP (tipicamente porta **5060**), cuida exclusivamente da **sinalização** (não transporta mídia); mensagens/métodos: INVITE (inicia sessão), re-INVITE, ACK, CANCEL, BYE (encerra), OPTIONS, REGISTER; primeira mensagem enviada por quem atende a chamada é **200 OK**; componentes: servidor de redirecionamento e registrador; **H.323** codifica em **binário** (ASN.1), tem gerenciamento de falha nativo (registro em gatekeeper alternativo) e permite conferência multimídia nativamente — SIP não tem nenhum dos dois nativamente; **H.245** (parte do H.323) negocia taxa de bits/codecs; **H.235** é a extensão de segurança do H.323 (H.323 não cifra por padrão); no cenário Gatekeeper x Gateway: **Gatekeeper** gerencia banda/registro (função de controle), **Gateway** interliga a rede IP à rede telefônica tradicional (PSTN); **RTP** transporta o fluxo de mídia em tempo real (áudio/vídeo) sobre **UDP** — não garante entrega, ordem ou QoS; **RTCP** monitora a entrega e fornece controle/estatísticas — **pegadinha clássica é inverter as funções de RTP e RTCP**; campo **SSRC** (32 bits) do cabeçalho RTP identifica a fonte de sincronização; se áudio e vídeo forem usados na mesma conferência (RFC 3550), são transmitidos em **duas sessões RTP separadas**, não multiplexados num único canal; codecs: divergência de gabarito documentada no banco entre G.711/G.729 (ver nota geral no topo — literatura consagra G.711=64kbps, G.729=8kbps).

**Por que estudar isso:** citado explicitamente no edital (VoIP: SIP/RTP) e a comparação SIP x H.323 se repete quase identicamente em provas diferentes da FCC — altíssima taxa de repetição.

**Alerta de Pegadinha:** inverter as características de SIP e H.323 (é a pegadinha central e mais repetida do tema); atribuir ao SIP o transporte de mídia (é do RTP) ou ao RTP a sinalização (é do SIP); inverter RTP (dados) com RTCP (controle).

**Ação Prática:** decore a tabela de 4 linhas comparando SIP x H.323 (codificação, resolução de endereço, load balancing, gerência de falha) — é praticamente garantido que a questão reaparece nesse formato; escreva de próprio punho a diferença RTP x RTCP até não hesitar.

---

## 🧩 Armazenamento (edital seção 12 — via dados de Redes)

### 🎯 Assunto: RAID — Níveis, Fórmulas de Capacidade e Tolerância a Falha
**O que estudar obrigatoriamente:** **RAID 0** (striping, sem redundância, capacidade = n×d, mínimo 2 discos, qualquer falha é catastrófica); **RAID 1** (mirroring, capacidade = n×d/2, mínimo 2 discos sempre em número par, tolera falha de 1 disco do par); **RAID 3** (paridade dedicada byte-a-byte em 1 disco, discos giram em sincronia, mínimo 3); **RAID 4** (paridade dedicada em blocos, gargalo de escrita no disco de paridade, mínimo 3); **RAID 5** (paridade **distribuída** entre todos os discos, supera o gargalo do RAID 3/4, mínimo 3 discos, tolera 1 falha, permite hot-swap/rebuild); **RAID 6** (paridade dupla distribuída, mínimo 4 discos, tolera **2** falhas simultâneas — mas falha se um 3º disco cair antes da reconstrução, capacidade = (N-2)×d); **RAID 10/1+0** (espelha primeiro, depois faz striping dos pares — prioriza segurança, mínimo 4 discos em número par, tolera até 2 falhas desde que não sejam do mesmo par espelhado); **RAID 01/0+1** (strip primeiro, depois espelha — prioriza performance) — mnemônico dos comentários: "o primeiro número da sigla indica a operação de maior prioridade"; RAID por **software** consome ciclos de CPU do próprio SO e não é compatível com todos os níveis, ao contrário do RAID por **hardware**; nomenclatura em inglês cobrada literalmente: RAID 1=Mirroring/Duplexing, RAID 10=Very High Reliability+Performance, RAID 5=Independent Data Disk With Distributed Parity, RAID 0=Striped Disk Array No Fault Tolerance.

**Por que estudar isso:** é o tema isolado mais recorrente de todo o banco de Armazenamento — aparece com 6-15 questões por parte em praticamente todas as 9 partes — pertence à seção "12. Armazenamento" do edital, não à 14.

**Alerta de Pegadinha:** trocar o mínimo de discos por nível (0/1=2, 3/4/5=3, 6=4, 10=4 par); confundir paridade dedicada (RAID 3/4) com distribuída (RAID 5/6); achar que RAID 6 "nunca falha" (falha com 3 discos simultâneos); trocar a fórmula de capacidade do RAID 1 (é n×d/2, "multiplica depois divide por 2") com a do RAID 0 (é n×d, sem perda); confundir RAID 10 (mirror depois stripe, prioriza segurança) com RAID 01 (stripe depois mirror, prioriza performance).

**Ação Prática:** monte a tabela RAID 0/1/3/4/5/6/10/01 com 4 colunas (mínimo de discos, fórmula de capacidade útil, tolerância a falha simultânea, localização da paridade) e treine identificar o nível a partir de uma descrição de funcionamento em texto corrido (sem o nome), que é como a FCC costuma perguntar.

---

### 🎯 Assunto: SAN x NAS x DAS — Arquitetura, Protocolos e Desempenho
**O que estudar obrigatoriamente:** **SAN** = rede dedicada de alta performance, transferência em **blocos**, protocolos **Fibre Channel/iSCSI/SAS**, permite até boot do servidor pelo storage, pode ser virtualizada por software (SAN virtual); **NAS** = transferência por **arquivo**, protocolos **CIFS/SMB (445)** / **NFS (2049, stateless, usa RPC/XDR)**, tem **sistema operacional próprio embarcado**, transparente ao SO (parece disco local), gerenciável via navegador, permite acesso multiusuário; arquitetura NAS **scale-up** (aumenta recursos de um nó) x **scale-out** (agrega vários nós em cluster único, fracionamento + espelhamento/paridade, cresce sem downtime); **DAS** = conectado diretamente ao servidor (SATA/eSATA/USB/SCSI/IDE), sem rede, sem SO de gerenciamento próprio; vantagem exclusiva do SAN sobre o NAS: permitir **boot do servidor pelo próprio storage**; ordem de desempenho tipicamente cobrada: **DAS > SAN > NAS**; segurança de autenticação: **CIFS valida credenciais no servidor** (mais seguro), **NFS confia nos IDs de usuário/grupo enviados pelo cliente** (menos seguro); **NDMP** (Network Data Management Protocol, sobre TCP/IP) é o padrão de indústria para backup em ambiente NAS; **SDS** (Software Defined Storage) separa a camada de provisionamento/proteção de dados do hardware físico, combinando dispositivos em pools centralizados.

**Por que estudar isso:** segundo tema mais recorrente de Armazenamento no banco (6-12 questões por parte, em quase todas as 9 partes), sempre testando a troca proposital das definições entre os três.

**Alerta de Pegadinha:** trocar "nível de bloco" (SAN) por "nível de arquivo" (NAS); achar que NAS usa Fibre Channel (usa CIFS/NFS) ou que SAN usa CIFS/NFS (usa FC/iSCSI/SAS); confundir NAS ("**Network** attached storage") com "nominal attached storage" e DAS ("**Directly** attached storage") com "distributed attached storage" — truque de nomenclatura enganosa cobrado literalmente.

**Ação Prática:** monte a tabela SAN/NAS/DAS com colunas (nível de transferência, protocolo típico, tem SO próprio?, precisa de rede dedicada?, autenticação) e treine reconhecer qual é qual a partir de uma descrição de cenário.

---

### 🎯 Assunto: Fibre Channel — Camadas, Topologias e Protocolos de Transporte
**O que estudar obrigatoriamente:** pilha de 5 camadas — **FC-0** (física), **FC-1** (codificação 8b/10b), **FC-2** (a "camada de rede/transporte" do FC — endereçamento, estrutura de quadros/sequências/trocas, classes de serviço, controle de fluxo), **FC-3** (serviços comuns: striping, hunt groups, multicast), **FC-4** (mapeamento de protocolos de nível superior — **FCP** mapeia SCSI-3 aqui, sem exigir modificação no SCSI nem no FC); topologias — **point-to-point** (conexão dedicada, Porta_E), **arbitrated loop/FC-AL** (anel via Porta_NL, até **126 nós** — descontando o endereço reservado da Porta_FL para conexão opcional a switch), **switched fabric/FC-SW** (escala a milhares de portas via protocolo **FSPF**, interconecta switches por **ISL** — Inter-Switch Links, adicionar/remover nó não afeta tráfego de outros); tipos de porta no switched fabric: **N_Port** (nó↔fabric), **F_Port** (fabric↔nó), **E_Port** (fabric↔fabric, cascateamento); **FCoE** encapsula FC sobre **Ethernet** (curta distância/datacenter, switch Ethernet convergente); **FCIP** encapsula FC sobre **TCP/IP** via túnel ponto a ponto (longa distância, interliga SANs geograficamente distantes); **iFCP** é protocolo **gateway-to-gateway** (não end-to-end) que mapeia dispositivos FC via IP/Ethernet, substituindo a camada **FC-2** (não a FC-4); zoneamento em FC SAN restringe tráfego **RSCN** (Registered State Change Notification) como vantagem de segurança/organização.

**Por que estudar isso:** tema técnico específico mas muito recorrente (6-10 questões por parte) — a banca gosta de trocar a função entre camadas adjacentes ou entre os protocolos de encapsulamento (FCoE x FCIP x iFCP).

**Alerta de Pegadinha:** trocar a função de FC-2/FC-3/FC-4 entre si; confundir FCoE (Ethernet) com FCIP (IP/TCP) com iFCP (gateway-to-gateway); achar que iFCP substitui a FC-4 (substitui a FC-2); achar que FCP atua na FC-3 (atua na FC-4); confundir Porta_N (nó→switch), Porta_F (switch→nó) e Porta_E (switch↔switch).

**Ação Prática:** decore a pilha FC-0 a FC-4 com uma palavra-chave por camada; monte a tabela de tipos de porta (N/F/E/NL/FL) com sua função exata; escreva a diferença FCoE x FCIP x iFCP em uma frase cada.

---

## 🧩 Segurança da Informação (edital seção 16 — via dados de Redes)

### 🎯 Assunto: Firewall — Tipos, Arquiteturas e Políticas
**O que estudar obrigatoriamente:** **filtro de pacotes** (camadas 3/4, examina IP/porta, sem contexto de conexão); **stateful/inspeção de estados** (camada 4, rastreia o estado da conexão — só libera pacotes que combinam com uma conexão ativa conhecida); **proxy/gateway de aplicação** (camada 7, intermedia toda a comunicação — cliente nunca fala direto com o servidor —, faz cache, autenticação, substitui o IP de origem do pacote de saída pelo do próprio firewall); **WAF** (Web Application Firewall, inspeciona HTTP/HTTPS por assinatura, protege contra SQLi/XSS — diferente de IDS, que só detecta); **NGFW** se diferencia do firewall tradicional pela **Deep Packet Inspection (DPI)** e controle por aplicação — não por interface gráfica, redundância ou bloqueio de porta (isso já existe no tradicional); **proxy transparente** dispensa configuração manual no cliente (intercepta de forma imperceptível) — diferente de **proxy reverso**, que intercepta requisições vindas da Internet com destino à rede local, agindo como procurador do **servidor** (não do cliente), fazendo cache/balanceamento/proteção de servidores de origem; arquiteturas clássicas — **Dual-Homed Host** (duas interfaces, interna/externa, sem DMZ), **Screened Host** (firewall + bastion host), **Screened Subnet/"back-to-back"** (DMZ isolada entre rede interna e externa, exigindo que o tráfego atravesse **dois** firewalls); **bastion host** na DMZ pode funcionar como isca/honeypot; lista **branca** (whitelist) bloqueia tudo por padrão, só libera o explicitamente permitido — é mais segura que lista **negra** (blacklist), que permite tudo exceto o bloqueado; firewall não dispensa antivírus, e mesmo conexão discada precisa de firewall.

**Por que estudar isso:** tema muito recorrente no banco (10-15 questões por parte, em quase todas as 9 partes) — pertence à seção "16. Segurança da Informação" do edital, não à 14.

**Alerta de Pegadinha:** achar que qualquer firewall com interface gráfica/redundância é "NGFW" (o diferencial exclusivo é DPI); confundir a camada de atuação do filtro de pacotes (3/4) com a do proxy/WAF (7); achar que lista branca "deixa passar tudo exceto o bloqueado" (é o oposto); trocar Screened Subnet (DMZ com 2 firewalls) com Dual-Homed Host (2 interfaces, sem DMZ) ou Screened Host (bastion host); inverter inbound (entra, vindo de fora) com outbound (sai, indo para fora) numa regra de firewall.

**Ação Prática:** monte a tabela firewall tradicional x stateful x proxy/aplicação x NGFW x WAF, com a camada OSI de atuação de cada um; treine identificar qual tipo/arquitetura resolve cada cenário de ataque descrito.

---

### 🎯 Assunto: IDS, IPS, NAC e Ataques de Rede
**O que estudar obrigatoriamente:** **NIDS** monitora o segmento de rede via sensores em **modo promíscuo**, é passivo/invisível ao atacante (detecta **depois** da invasão), mas tem dificuldade com tráfego cifrado; **NIPS** é ativo/inline e **bloqueia** tráfego (portanto perceptível); **HIDS** monitora logs/eventos/arquivos de um host específico; arquitetura em camadas típica: IDS → IPS → Firewall → WAF; **NAC** tem dois eixos independentes que a banca gosta de embaralhar: **pre-admission x post-admission** (quando a política é aplicada — antes ou depois de conceder acesso) e **inline x out-of-band** (onde o dispositivo de decisão fica — dentro do fluxo de tráfego ou fora, comunicando-se com switches/roteadores/APs); modelo **Zero Trust Access (ZTA)** nega acesso por padrão, exige identidade/contexto; ataques — **SYN flood** (explora o three-way handshake, conexões semiabertas/half-open, associado a IP spoofing, mitigado por **SYN cookies** — só aloca recurso após o ACK final, não no SYN inicial); **Smurf** (ICMP com IP de origem falsificado, direcionado ao endereço de **broadcast** da rede, inundando o alvo real — mitigação: descartar pacotes destinados ao broadcast); **DNS cache poisoning/spoofing**; **sniffing** (modo promíscuo captura **todos** os pacotes do segmento, independente do destinatário) x **spoofing** (falsifica cabeçalho/origem) x **brute force** (tentativa e erro de credenciais); **Man in the Middle** (atacante intercepta e se posiciona entre cliente e servidor); **Worm** (autopropaga sozinho, faz cópias de si mesmo, sem hospedeiro) x **Trojan** (depende de execução pelo usuário e de um hospedeiro); **WannaCry** explorou a vulnerabilidade **EternalBlue** no protocolo **SMBv1** (mitigação: desativar SMBv1); **DoS** (um atacante) x **DDoS** (múltiplos atacantes coordenados); **Port mirroring/SPAN** + IDS é a combinação correta para espelhar tráfego para análise; port security (associar 1 MAC por porta) protege contra sniffing físico numa porta de switch.

**Por que estudar isso:** cobrado de forma muito consistente em todas as 9 partes (10-15 questões cada), frequentemente em cenários de "qual solução resolve este ataque descrito".

**Alerta de Pegadinha:** confundir os dois eixos do NAC (pre/post-admission não é o mesmo que inline/out-of-band); achar que NIDS bloqueia tráfego (só NIPS bloqueia); confundir Worm com Trojan.

**Ação Prática:** monte a matriz 2x2 do NAC (pre/post × inline/out-of-band) com um exemplo em cada célula; treine mapear um cenário de ataque descrito para a ferramenta de defesa correta (firewall/IDS/IPS/WAF/NAC).

---

### 🎯 Assunto: VPN e IPSec
**O que estudar obrigatoriamente:** **IPSec modo túnel** encapsula o pacote IP inteiro (inclusive cabeçalho original) sob um **novo cabeçalho IP** dos peers/gateways (uso site-to-site, entre gateways) — os IPs finais ficam ocultos no cabeçalho interno; **modo transporte** protege só o payload da camada de transporte, mantendo o cabeçalho IP original **visível** (uso host-a-host); **AH** (Authentication Header) garante autenticação e integridade **sem** confidencialidade; **ESP** (Encapsulating Security Payload) garante autenticação + integridade + **confidencialidade** (criptografia); protocolo **IKE** opera em duas fases: fase 1 estabelece canal seguro ISAKMP, fase 2 negocia os parâmetros da SA (Security Association); **VPN-SSL** é acessível via navegador comum usando HTTPS, **sem** cliente dedicado — diferente da VPN **IPSec**, que geralmente exige cliente instalado e opera na camada de Rede (3DES/AES, considerada mais forte que SSL, que opera na Aplicação com RC4); protocolos de tunelamento legados: **PPTP** (proprietário Microsoft, usa PPP+**MPPE** para criptografia), **L2TP** (substitui PPTP/L2F, encapsula quadros PPP/Ethernet dentro de datagramas **UDP**); tipos de VPN citados: **VLL** (Virtual Leased Line), **VPRN**, **VPDN**, **VPLS**; posicionamento típico: servidor VPN atrás do firewall, como recurso de intranet ligado à rede de perímetro/DMZ, com filtros de pacote configurados em ambas as interfaces.

**Por que estudar isso:** um dos temas de Segurança mais recorrentes do banco (5-8 questões por parte, em quase todas as partes), quase sempre testando a distinção túnel x transporte e AH x ESP.

**Alerta de Pegadinha:** achar que VPN-SSL exige cliente dedicado (é o contrário); trocar AH (só integridade/autenticidade) por ESP (tudo, inclusive confidencialidade); achar que o modo transporte também encapsula um novo cabeçalho IP (só o modo túnel faz isso); achar que VPN por si só garante estabilidade superior a uma linha dedicada (a real desvantagem da VPN é depender da qualidade da internet pública, gerando atrasos/desconexões).

**Ação Prática:** decore a frase-cola: "Túnel = novo cabeçalho IP, uso entre gateways; Transporte = sem novo cabeçalho, uso host-a-host. AH = só integridade/autenticidade; ESP = tudo, inclusive confidencialidade."

---

### 🎯 Assunto: Segurança em Redes sem Fio (WEP/WPA/WPA2/WPA3, 802.1X/EAP/RADIUS)
**O que estudar obrigatoriamente:** ordem de segurança crescente **WEP < WPA (TKIP) < WPA com AES < WPA2 (AES+CCMP) < WPA3**; **WEP** usa RC4 (chave tipicamente 5/16 bytes, mas o algoritmo RC4 suporta até 256 bytes/2048 bits — leia o enunciado com atenção ao que exatamente é perguntado), vulnerável porque o **IV tem só 24 bits** e se repete rapidamente, permitindo quebrar a chave; **WPA** (legado, subconjunto do 802.11i) usa **TKIP** (chaves temporárias/dinâmicas, trocadas a cada pacote) sobre RC4; **WPA2** (=802.11i completo) usa **CCMP baseado em AES** (chave de 128 a 256 bits) como diferencial obrigatório — TKIP ainda existe como suporte legado, mas **não** é o diferencial do WPA2; **WPA3** é o mais recomendado atualmente; cadeia de autenticação corporativa **802.1X/EAP**: fluxo suplicante ↔ EAPoL ↔ **autenticador** (o Access Point) ↔ 802.1X ↔ **servidor de autenticação** (RADIUS) — o suplicante é sempre o dispositivo cliente; **EAP** permite múltiplos métodos de autenticação junto ao RADIUS, definido dentro do padrão 802.1X; ataque de **desautenticação (Deauth)** explora quadros de gerenciamento não criptografados, mitigado pelo **802.11w** (Management Frame Protection); boas práticas (cartilha CERT.br): não aproximar AP de janelas, trocar SSID padrão, desabilitar WPS, posicionar AP perto do centro do prédio, segregar Wi-Fi em segmento próprio protegido por firewall (nunca conectar direto na rede interna) — desabilitar broadcast do SSID é aceito pela FCC como boa prática no gabarito, mesmo a literatura de segurança considerando isso pouco eficaz (SSID oculto não é senha).

**Por que estudar isso:** cruza Redes (802.11) com Segurança (criptografia/autenticação), recorrente em todas as 9 partes do banco (3-8 questões cada).

**Alerta de Pegadinha:** achar que o WPA2 usa TKIP como diferencial (usa CCMP/AES — TKIP é do WPA legado); trocar os papéis suplicante/autenticador/servidor de autenticação no fluxo 802.1X; confundir o algoritmo de criptografia (AES) com o protocolo de gerenciamento/troca de chaves (TKIP no WPA, CCMP no WPA2) — são papéis separados que a banca testa isoladamente.

**Ação Prática:** decore a linha do tempo WEP(RC4,IV 24bits,inseguro)→WPA(TKIP)→WPA2(CCMP/AES)→WPA3(mais recomendado), e o trio suplicante→autenticador(AP)→servidor RADIUS do 802.1X.

---

# ✅ Observações finais

- **Ferramentas de Monitoramento citadas no edital** (Prometheus, Grafana, Fluentd) seguem com cobertura praticamente nula no lote de questões, mesmo após dobrar o tamanho do banco — só Zabbix e, indiretamente, SNMP/RMON/Netflow aparecem com volume real. Reforce essas três ferramentas direto pela documentação oficial.
- **Computação em Nuvem** (seção 15 do edital) e **Governança de TI** (seção 17) aparecem só pontualmente dentro do lote de Redes (definição genérica de cloud computing, SDN/NFV, uma questão isolada de classificação "projeto x rotina") — não há volume suficiente para blocos prescritivos próprios aqui; use os guias/lotes dedicados a essas seções quando existirem.
- **Sistemas Operacionais em rede** (Windows Server — Active Directory, DirectAccess, DHCP Failover, comandos `route print`/`arp -a`/`ipconfig /all`; Linux — `ifconfig`/`ip route`, Docker networks, Nginx, OpenLDAP/slapd) aparece de forma dispersa mas não desprezível nas tags — se quiser cobertura dedicada, seria necessário o lote específico da seção "13. Sistemas Operacionais" do edital.
- **Gabaritos a conferir:** a lista completa de divergências entre gabarito registrado e literatura/comentários da comunidade, com o `id_questao` de cada uma, está detalhada na seção de abertura deste guia e, em maior detalhe ainda, dentro de cada `raw_md` de origem (seção "Pegadinhas / erros comuns" de cada parte).
- Os 9 resumos brutos que originaram este guia estão em `guia_estudos_subagentes/raw_md/28_redes_parte1_de_9.md` a `28_redes_parte9_de_9.md`, cada um citando centenas de `id_questao` reais como evidência — consulte-os para os exemplos completos por trás de cada regra resumida aqui.
