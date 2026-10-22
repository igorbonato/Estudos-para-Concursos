# 📘 Guia de Estudo Direcionado e Prescritivo — Segurança da Informação: Atualizações 2026 (TRT 4ª Região)

> **Guia novo do Edital TRT4 nº 01/2026, seção 6.14.** **Complementa** o guia **Segurança da Informação** (que segue válido na maior parte) com o que entrou ou mudou de versão: OWASP Top 10:2025, ISO 27001:2022/2024, 27005:2022/2023, 27701, CIS v8, LGPD, ZTNA/NAC, criptografia pós-quântica, TLS 1.3, SDL/CLASP e hardening. Não vem do banco de questões. Itens ⚠️ **conferir** devem ser validados na fonte oficial (owasp.org, ABNT/ISO, NIST, texto da LGPD).

**Legenda:** **[A+T]** cai nos dois · **[A]** só Analista · **[T]** só Técnico.

---

## 🧩 Desenvolvimento Seguro

### 🎯 Assunto: OWASP Top 10:2025 [A+T] ⚠️ conferir
**O que estudar obrigatoriamente:** a lista **2025**, na ordem: **A01 Broken Access Control** (que agora absorve o **SSRF**); **A02 Security Misconfiguration** (subiu); **A03 Software Supply Chain Failures** (**nova**, amplia o antigo "componentes vulneráveis e desatualizados": dependências, build e distribuição); **A04 Cryptographic Failures**; **A05 Injection** (inclui XSS); **A06 Insecure Design**; **A07 Authentication Failures**; **A08 Software or Data Integrity Failures**; **A09 Security Logging & Alerting Failures**; **A10 Mishandling of Exceptional Conditions** (**nova**: tratamento inadequado de erros e exceções, *fail-open*, vazamento em mensagens de erro). Compare com a **2021**: A01 Broken Access Control, A02 Cryptographic Failures, A03 Injection, A04 Insecure Design, A05 Security Misconfiguration, A06 Vulnerable and Outdated Components, A07 Identification and Authentication Failures, A08 Software and Data Integrity Failures, A09 Security Logging and Monitoring Failures, A10 SSRF. **Programação defensiva**: validar toda entrada (lista de permitidos), codificar a saída conforme o contexto, usar consultas parametrizadas, aplicar privilégio mínimo, **falhar de forma segura** (*fail-safe/closed*), tratar exceções sem vazar detalhes, adotar padrões seguros e defesa em profundidade.
**Por que estudar isso:** é [A+T] e a versão mudou. A FCC cobra "qual categoria" e "o que é novo".
**Alerta de Pegadinha:** colocar SSRF como categoria própria na 2025 (foi incorporado ao A01); manter "Injection" em 3º lugar (na 2025 é o **A05**); esquecer as duas novas categorias (A03 supply chain e A10 exceções).
**Ação Prática:** escreva as duas listas lado a lado e marque com setas o que subiu, desceu, entrou e saiu.

---

### 🎯 Assunto: SDL, CLASP, Avaliação de Segurança de Aplicações e Hardening [T]
**O que estudar obrigatoriamente:** o **Microsoft SDL** (Security Development Lifecycle) traz segurança em todas as fases: treinamento → requisitos (de segurança e privacidade, limiares de bug) → **design** (modelagem de ameaças com **STRIDE**: *Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege*; redução da superfície de ataque) → implementação (ferramentas aprovadas, funções inseguras banidas, **SAST**) → verificação (**DAST**, *fuzzing*, revisão) → release (plano de resposta a incidentes, revisão final) → resposta. O **OWASP CLASP** (*Comprehensive, Lightweight Application Security Process*) é um conjunto de **atividades** de segurança atribuídas a **papéis** do projeto, organizado em **visões** (conceitos, papéis, avaliação de atividades, implementação de atividades e vulnerabilidades). **Avaliação de aplicações**: **SAST** (análise estática do código, caixa-branca, cedo no ciclo), **DAST** (aplicação em execução, caixa-preta), **IAST** (instrumentação em tempo de execução), **SCA** (dependências e licenças, liga com o A03:2025) e revisão de código. **Hardening**: reduzir a superfície de ataque (remover serviços e pacotes desnecessários, fechar portas, trocar senhas padrão, aplicar patches, privilégio mínimo, desativar protocolos legados como SMBv1, TLS 1.0/1.1 e Telnet), seguindo **benchmarks CIS** e guias STIG.
**Por que estudar isso:** são itens nominais do Técnico.
**Alerta de Pegadinha:** trocar SAST (código-fonte) por DAST (em execução); associar o CLASP à Microsoft (ele é da **OWASP**); incluir "auditoria" como letra do STRIDE.
**Ação Prática:** decore o STRIDE com a propriedade violada em cada letra: S → autenticação, T → integridade, R → não repúdio, I → confidencialidade, D → disponibilidade, E → autorização.

---

## 🧩 Normas e Frameworks

### 🎯 Assunto: ABNT NBR ISO/IEC 27001 (2022 + Amd 1:2024) e 27002:2022 [A+T]
**O que estudar obrigatoriamente:** a **27001** traz os **requisitos** do SGSI e é **certificável**, com as cláusulas **4 a 10** (contexto, liderança, planejamento, apoio, operação, avaliação de desempenho, melhoria). O **Anexo A** tem **93 controles** em **4 temas**: **Organizacionais (37)**, **Pessoas (8)**, **Físicos (14)** e **Tecnológicos (34)**. A versão de 2013 tinha 114 controles em 14 domínios. A **emenda de 2024** acrescentou às cláusulas 4.1 e 4.2 a consideração das **mudanças climáticas** como questão relevante. ⚠️ Confira na ABNT a edição exata a que o edital chama "27001:2024". São **11 controles novos**: inteligência de ameaças, segurança para uso de **serviços em nuvem**, prontidão de TIC para continuidade de negócios, monitoramento da segurança física, **gestão de configuração**, **exclusão de informação**, **mascaramento de dados**, **prevenção de vazamento de dados (DLP)**, atividades de **monitoramento**, **filtragem web** e **codificação segura**. A **27002:2022** traz as **diretrizes** de implementação (não é certificável) e classifica cada controle por **atributos**: tipo de controle (preventivo, detectivo, corretivo), propriedades de SI (C, I, D), conceitos de cibersegurança (identificar, proteger, detectar, responder, recuperar), capacidades operacionais e domínios de segurança.
**Por que estudar isso:** é [A+T]. Os números 93/4/37-8-14-34 e os 11 novos controles são cobrados direto.
**Alerta de Pegadinha:** responder "114 controles em 14 domínios" (é a 2013); dizer que a 27002 é certificável; confundir **requisitos** (27001) com **diretrizes** (27002).
**Ação Prática:** decore "93 = 37 + 8 + 14 + 34" e liste os 11 novos de memória.

---

### 🎯 Assunto: ISO/IEC 27005 (2022, ABNT 2023) e ISO/IEC 27701 [27005 = T · 27701 = A+T] ⚠️ conferir
**O que estudar obrigatoriamente:** a **27005** traz as diretrizes de **gestão de riscos** de SI e foi alinhada à 27001:2022 e à **ISO 31000**. Processo: estabelecimento do **contexto** → **avaliação de riscos** (identificação, análise e avaliação) → **tratamento** (**modificar**/mitigar, **reter**/aceitar, **evitar**, **compartilhar**/transferir) → aceitação → comunicação e consulta → monitoramento e análise crítica. Novidade da edição 2022: as **duas abordagens de identificação** de riscos, **baseada em eventos** (cenários estratégicos) e **baseada em ativos** (ativo, ameaça, vulnerabilidade), além do conceito de **cenários de risco**. A **27701** trata do **sistema de gestão da privacidade (PIMS)**. A edição **2019** [T] é uma **extensão** da 27001/27002 e define os papéis de **controlador** e **operador** de dados pessoais (mapeia bem para a LGPD). A edição **2025/2026** [A] passou a ser um **sistema de gestão independente**, certificável sem depender da 27001. Confira na ABNT a numeração que o edital chama de "27701:2026".
**Por que estudar isso:** os dois cargos cobram versões diferentes da 27701, e o Técnico cobra a 27005.
**Alerta de Pegadinha:** dizer que a 27005 é certificável (não é); tratar a 27701:2019 como norma independente (ela é extensão); confundir "reter" (aceitar o risco) com "evitar" (eliminar a atividade).
**Ação Prática:** escreva as 4 opções de tratamento com um exemplo de TI para cada.

---

### 🎯 Assunto: CIS Controls v8 [T]
**O que estudar obrigatoriamente:** são **18 controles** e **153 salvaguardas**, priorizados em **3 Implementation Groups**. O **IG1** é a "higiene cibernética essencial", com 56 salvaguardas e o mínimo para qualquer organização; o IG2 inclui o IG1 e o IG3 inclui o IG2. Lista: 1 Inventário de ativos; 2 Inventário de software; 3 Proteção de dados; 4 Configuração segura; 5 Gestão de contas; 6 Gestão de controle de acesso; 7 Gestão contínua de vulnerabilidades; 8 Gestão de logs de auditoria; 9 Proteção de e-mail e navegador; 10 Defesa contra malware; 11 Recuperação de dados; 12 Gestão da infraestrutura de rede; 13 Monitoramento e defesa de rede; 14 Conscientização e treinamento; 15 Gestão de provedores de serviço; 16 Segurança de software de aplicação; 17 Gestão de resposta a incidentes; 18 Testes de invasão. A v8 reorganizou os controles por **atividade**, e não por quem gerencia o dispositivo; a v7 tinha 20 controles.
**Por que estudar isso:** é item nominal do Técnico, com questões de "qual controle trata de X" e "o que é IG1".
**Alerta de Pegadinha:** responder que são 20 controles (é a v7); achar que o IG3 é o básico.
**Ação Prática:** memorize os 6 primeiros, que são a base de tudo: inventários, dados, configuração, contas e acesso.

---

### 🎯 Assunto: LGPD (Lei 13.709/2018) [A+T]
**O que estudar obrigatoriamente:** **art. 5º (conceitos)**: dado pessoal; dado pessoal **sensível** (origem racial ou étnica, convicção religiosa, opinião política, filiação sindical, saúde, vida sexual, dado genético ou biométrico); dado **anonimizado** (não é dado pessoal, salvo se for revertido); **controlador** (decide), **operador** (trata em nome do controlador), **encarregado** (canal com titulares e com a ANPD) e **ANPD**. **Art. 6º, 10 princípios**: finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação, responsabilização e prestação de contas. **Art. 7º, 10 bases legais** (consentimento é só **uma** delas): cumprimento de obrigação legal, execução de **políticas públicas** pela administração, estudos por órgão de pesquisa, contrato, **exercício regular de direitos em processo judicial**, proteção da vida, tutela da saúde, legítimo interesse e proteção do crédito. **Art. 11**: bases para dados sensíveis (mais restritas; não admitem legítimo interesse nem proteção do crédito). **Art. 18**: direitos do titular (confirmação, acesso, correção, anonimização ou eliminação, **portabilidade**, informação sobre compartilhamento, revogação do consentimento etc.). **Arts. 23 a 32**: tratamento pelo **poder público**, voltado ao interesse público e à finalidade pública. **Art. 46**: medidas de segurança, incluindo *privacy by design*. **Art. 48**: comunicação de **incidente** à ANPD e ao titular. **Art. 52**: sanções. A **multa** chega a **2% do faturamento, limitada a R$ 50 milhões por infração**, e **não se aplica a órgãos públicos**, que estão sujeitos às demais sanções (advertência, publicização, bloqueio, eliminação etc.).
**Por que estudar isso:** é [A+T], e o guia antigo só tratava a LGPD de forma indireta.
**Alerta de Pegadinha:** dizer que o consentimento é obrigatório para todo tratamento; achar que dado anonimizado é dado pessoal; aplicar multa a órgão público; achar que o legítimo interesse vale para dados sensíveis.
**Ação Prática:** decore os 10 princípios com o mnemônico **"FAN LiQ TraSe PreNã ResPo"** e liste as 10 bases do art. 7º.

---

## 🧩 Infraestrutura, Acesso e Criptografia

### 🎯 Assunto: Zero Trust, ZTNA, NAC e VPN-SSL [A+T]
**O que estudar obrigatoriamente:** **Zero Trust** (NIST SP 800-207): "nunca confie, sempre verifique". Não há confiança implícita por **localização na rede**. Cada acesso é avaliado por **identidade, dispositivo e contexto**, com privilégio mínimo e microssegmentação. Componentes: **PDP** (*Policy Decision Point*, formado por *policy engine* e *policy administrator*) e **PEP** (*Policy Enforcement Point*). O **ZTNA** (Zero Trust Network Access) dá acesso **por aplicação** (não à rede inteira), com verificação contínua, e as aplicações ficam **invisíveis** para quem não está autorizado. Isso o difere da **VPN** tradicional, que coloca o usuário "dentro" da rede. A **VPN-SSL/TLS** funciona via navegador (*clientless*, portal web) ou cliente, na porta 443, atravessando NAT e firewalls com facilidade. A **VPN IPSec** opera na camada de rede e é típica de *site-to-site*. O **NAC** (Network Access Control) avalia a **postura** do dispositivo (antivírus, patches) e a identidade **antes** de permitir o acesso à rede, normalmente com **802.1X** e RADIUS, podendo pôr o dispositivo em **quarentena** ou numa VLAN de remediação.
**Por que estudar isso:** ZTNA e NAC são novidades nominais do edital.
**Alerta de Pegadinha:** dizer que o ZTNA dá acesso amplo à rede após o login (isso é VPN); confundir NAC (controle de **admissão** na rede) com firewall (filtragem de tráfego).
**Ação Prática:** tabela VPN IPSec × VPN SSL × ZTNA (camada, granularidade, cliente, cenário típico).

---

### 🎯 Assunto: TLS 1.2 x TLS 1.3 e Limitações do SSL [A: 1.2 e 1.3 · T: 1.2]
**O que estudar obrigatoriamente:** o **TLS 1.2** (RFC 5246) tem handshake de **2 RTTs**, permite troca de chaves **RSA estática** (sem *forward secrecy*) ou (EC)DHE, e cifras CBC, AEAD (GCM) e hashes SHA-256. O **TLS 1.3** (RFC 8446) faz o handshake em **1 RTT** (com opção de **0-RTT**, sujeito a ataques de *replay*); só aceita (EC)DHE, o que torna a **forward secrecy obrigatória**; remove RSA estático, CBC, RC4, 3DES, MD5, SHA-1, compressão e renegociação; aceita só cifras **AEAD** (AES-GCM, ChaCha20-Poly1305), com **5 suítes**; e **cifra o certificado** durante o handshake. **Limitações históricas do SSL [A]**: o SSL 2.0 e o 3.0 são **proibidos** (RFC 6176 e RFC 7568). Ataques que marcaram época: **POODLE** (SSL 3.0, padding CBC), **BEAST** (TLS 1.0, CBC), **CRIME/BREACH** (compressão), **DROWN** (SSLv2), **FREAK/Logjam** (cifras "export" e DH fraco). O **Heartbleed** foi **bug do OpenSSL**, não do protocolo. O TLS 1.0 e o 1.1 foram descontinuados pela **RFC 8996 (2021)**.
**Por que estudar isso:** a diferença 1.2 × 1.3 é clássica, e o Analista cobra as limitações do SSL.
**Alerta de Pegadinha:** atribuir o Heartbleed ao protocolo TLS; dizer que o TLS 1.3 aceita RSA para troca de chaves; achar que o 0-RTT é totalmente seguro.
**Ação Prática:** liste 5 coisas que o TLS 1.3 **removeu** e 3 que ele **adicionou**.

---

### 🎯 Assunto: Criptografia: AES, RSA e Pós-Quântica [A+T; detalhes = T]
**O que estudar obrigatoriamente:** o **AES** é simétrico, com bloco de **128 bits** e chaves de **128, 192 e 256** bits (10, 12 e 14 rodadas). Modos: **GCM** (autenticado, AEAD), CBC (exige IV e não autentica) e ECB (inseguro, porque blocos iguais geram cifras iguais). O **RSA** é assimétrico, baseado na dificuldade de **fatorar** números grandes; usa-se ≥ 2048 bits, e ele serve para cifrar e para **assinar**. Na assinatura, o remetente usa a **chave privada** e o destinatário verifica com a **pública**. **Pós-quântica (PQC)**: o algoritmo de **Shor** quebraria RSA e ECC num computador quântico suficientemente grande. O de **Grover** reduz pela metade a força das cifras simétricas e dos hashes, e por isso se recomenda **AES-256**. O NIST padronizou, em **agosto de 2024**: **FIPS 203 ML-KEM** (ex-CRYSTALS-**Kyber**, encapsulamento de chaves), **FIPS 204 ML-DSA** (ex-CRYSTALS-**Dilithium**, assinatura) e **FIPS 205 SLH-DSA** (ex-**SPHINCS+**, assinatura baseada em hash). Há ainda o **FN-DSA** (Falcon) a caminho e o **HQC** (selecionado em 2025 como KEM reserva). A estratégia de transição é **híbrida** (clássico + PQC), com **agilidade criptográfica**. A ameaça "*harvest now, decrypt later*" (coletar agora para decifrar depois) justifica migrar antes.
**Por que estudar isso:** a pós-quântica é item explícito do Técnico, e AES/RSA caem nos dois cargos.
**Alerta de Pegadinha:** dizer que a computação quântica "quebra o AES" (ela apenas reduz a margem; o AES-256 continua adequado); confundir ML-KEM (troca de chaves) com ML-DSA (assinatura); dizer que se assina com a chave pública.
**Ação Prática:** cartão "Kyber → ML-KEM → FIPS 203 / Dilithium → ML-DSA → FIPS 204 / SPHINCS+ → SLH-DSA → FIPS 205".

---

### 🎯 Assunto: Antispam e Segurança de E-mail; WAF e UTM [A+T]
**O que estudar obrigatoriamente:** o **SPF** é um registro DNS TXT com a lista de servidores **autorizados a enviar** e-mails pelo domínio. O **DKIM** é uma **assinatura digital** no cabeçalho, com a chave pública publicada no DNS, e garante integridade e origem. O **DMARC** é uma política (`none`/`quarantine`/`reject`) que se apoia no SPF e/ou no DKIM, com **alinhamento** do domínio do `From` e envio de relatórios. Técnicas antispam: listas negras (RBL/DNSBL), *greylisting*, filtros bayesianos e reputação. O **WAF** atua na **camada 7** sobre HTTP (SQLi, XSS, regras OWASP CRS). Opera em modo positivo (lista de permitidos) ou negativo (assinaturas) e pode atuar como proxy reverso. O **UTM** concentra várias funções num só equipamento: firewall, IPS, antivírus, filtro web, VPN e antispam.
**Por que estudar isso:** antispam e WAF/UTM são itens nominais.
**Alerta de Pegadinha:** dizer que o SPF assina mensagens (quem assina é o DKIM); achar que o WAF substitui o firewall de rede.
**Ação Prática:** escreva os 3 registros DNS (SPF, DKIM, DMARC) de um domínio fictício.

---

# ✅ Observações finais

- Continue usando o guia **Segurança da Informação** para criptografia, firewall/DMZ, IDS/IPS, malware, Wi-Fi e continuidade. Este guia só cobre **o que mudou ou faltava**.
- A segurança na **PDPJ-Br** (ENSEC-PJ, Res. 396/2021 e Portaria 162/2021) e o **OAuth/RFC 9700** estão no guia **PDPJ-Br e Stack Java**.
