# 📘 Guia de Estudo Direcionado e Prescritivo — Segurança da Informação (TRT 4ª Região)

> Gerado cruzando a seção "16. Segurança da Informação" do conteúdo programático oficial (`conteudo_programatico.md`) com **451 questões** de Segurança da Informação da FCC em `questoes_seguranca_informacao_and_arquitetura_software_fcc.json`, pré-digeridas em 5 partes (`guia_estudos_subagentes/raw_md/37_seguranca_parteN_de_5.md`).

**Recorte deste guia:** o arquivo-fonte mistura duas disciplinas do scraper — "Segurança da Informação" (451 questões, corpo deste guia) e "Arquitetura de Software" (202 questões, um bucket muito mais amplo que na prática cobre GoF, SOA/REST, UML, metodologias de processo e fragmentos soltos de Redes/Banco de Dados/linguagens de programação). O conteúdo de Arquitetura de Software foi separado no guia irmão `GUIA_ESTUDO_ARQUITETURA_SOFTWARE.md`. Aqui só entra conteúdo core de Segurança, com tags `[Governança]`/`[Redes]`/`[Sistemas Operacionais]` nos poucos pontos que vazam para outras seções do edital.

**Nota sobre gabaritos a conferir:** este é o lote com mais divergências documentadas de todos os já processados — a FCC decorou muitos números de norma/cláusula/CNJ, e há vários casos de gabarito contestado pelos próprios comentaristas. Os mais relevantes:
- **Criptografia assimétrica (asserção-razão)**: uma questão dá como correta a afirmação de que cifrar com chave privada permite ao **destinatário** decifrar — logicamente incoerente com o próprio conceito de assimetria, mas é o gabarito registrado (`1061759`).
- **Certificado A3 x A4**: enunciado pedindo certificado de 2048 bits tem gabarito A3, mas a tabela oficial ICP-Brasil vincula 2048 bits ao tipo A4 (`948806`).
- **Zachman Framework**: coluna HOW — gabarito aponta Process Model, comunidade defende Entity Relationship Model (`2010298`).
- **Backup para perda acidental (não desastre)**: gabarito aponta driver externo via eSATA como resposta esperada, contrariando a boa prática de backup remoto — controverso nos comentários (`889982`).
- **WAF x NGFW**: gabarito mantém "só o WAF analisa HTTP/HTTPS" mesmo com NGFW moderno também fazendo DPI de aplicação — decore a resposta esperada pela banca (`3170483`).
- **Controle de acesso "procedimental" x "convencional"**: mesma descrição, gabarito oficial diverge da leitura da maioria dos comentaristas (`3738025`).
- Outras divergências pontuais (fluxo senha+token rotulado "OAuth" em vez de MFA em `2098317`) estão detalhadas dentro de cada `raw_md`.

---

## 🧩 Criptografia — Simétrica, Assimétrica, Hash e Assinatura Digital

### 🎯 Assunto: Criptografia Simétrica x Assimétrica — Algoritmos e Garantias
**O que estudar obrigatoriamente:** simétrica usa **uma única chave** para cifrar/decifrar — algoritmos: **DES/3DES** (bloco 64 bits, chave 56/112-168 bits), **AES** (bloco **fixo em 128 bits**, chave 128/192/256 bits — pegadinha clássica é trocar bloco por chave), **IDEA** (64/128), **Blowfish** (64/32-448), **RC4/RC5/RC6**, **CAST**, **Twofish** — garante **confidencialidade** (e integridade básica, mas não autenticidade/não-repúdio sozinha); assimétrica usa **par de chaves** (pública/privada) — algoritmos terminados em "SA" ou similares: **RSA**, **DSA**, **ECDSA/ECC**, **Diffie-Hellman**, **ElGamal** — mais lenta, mas é a única que garante **autenticidade** sozinha; regra de ouro cobrada em dezenas de questões: **cifrar com a chave PÚBLICA do destinatário → confidencialidade** (só ele decifra com a privada dele); **cifrar com a chave PRIVADA do emissor → autenticidade/não-repúdio** (qualquer um verifica com a pública dele, mas só ele poderia ter cifrado); **envelope digital** (criptografia híbrida): a mensagem é cifrada com uma chave simétrica de sessão (AES), e essa chave é cifrada com a chave pública do destinatário — o destinatário usa sua chave privada para recuperar a chave AES e só então decifra a mensagem; princípio de **Kerckhoff**: o algoritmo deve ser público, só a chave é secreta.

**Por que estudar isso:** é a base conceitual de praticamente todo o bloco de criptografia (dezenas de questões em todas as 5 partes) — a FCC testa tanto a classificação simétrica/assimétrica de algoritmos quanto a lógica de "qual chave cifra, qual chave decifra, para qual finalidade".

**Alerta de Pegadinha:** trocar bloco por chave no AES (bloco é sempre 128 bits fixo); achar que criptografia simétrica garante autenticidade (só a assimétrica garante sozinha); inverter a regra de cifrar com pública/privada (confidencialidade usa a pública do **destinatário**, autenticidade usa a privada do **emissor** — nunca o contrário); confundir "chave privada" (assimétrica) com "chave secreta" compartilhada (simétrica) — a FCC às vezes usa "chave privada" de forma imprecisa para descrever DES/RC4 em enunciados antigos; achar que WannaCry usa RSA para cifrar os arquivos (usa **AES-128 simétrico**; RSA só protege a chave em algumas implementações).

**Ação Prática:** monte a tabela de algoritmos com 2 colunas (Simétricos: DES/3DES/AES/IDEA/Blowfish/RC4-5-6 | Assimétricos: RSA/DSA/ECDSA/Diffie-Hellman/ElGamal) com bloco/chave de cada um; escreva de próprio punho a frase "cifra com pública do destinatário = sigilo; cifra com privada do emissor = autoria" até virar automático.

---

### 🎯 Assunto: Funções Hash — Algoritmos, Tamanhos e Conversão Hex↔Bits
**O que estudar obrigatoriamente:** hash garante **apenas integridade** (não confidencialidade, não autenticidade sozinho); tabela de tamanhos — **MD5** = 128 bits = 32 caracteres hex; **SHA-1** = 160 bits = 40 hex (bloco de processamento 512 bits); **SHA-256** = 256 bits = 64 hex (8 palavras de 32 bits); **SHA-512** = 512 bits = 128 hex (8 palavras de 64 bits, bloco de 1024 bits); regra de conversão: **1 dígito hexadecimal = 4 bits** — dado o número de caracteres hex de um hash, multiplique por 4 para achar o tamanho em bits e identificar o algoritmo; SHA-256 é mais **lento** que SHA-1 (mas mais seguro); hash é usado em blockchain, assinatura digital e computação forense (calcular hash de um arquivo de prova para detectar alteração futura por comparação).

**Por que estudar isso:** tema de "decoreba numérica pura" cobrado repetidamente em todas as 5 partes — a FCC gosta de dar uma string hexadecimal e pedir para identificar o algoritmo pelo tamanho.

**Alerta de Pegadinha:** esquecer a conversão hex×4=bits e errar a identificação do algoritmo; achar que hash garante confidencialidade ou autenticidade; achar que SHA-256 é mais rápido que SHA-1 (é mais lento, mais seguro).

**Ação Prática:** treine identificar o algoritmo a partir da contagem de caracteres de 5 hashes de exemplo (32/40/64/128 hex) sem calculadora, só de cabeça.

---

### 🎯 Assunto: Assinatura Digital, Certificado Digital e a Tríade CID+AN
**O que estudar obrigatoriamente:** mnemônico "**PARA NUNCA MAIS ERRAR**": **certificado digital = C.I.A** (Confidencialidade + Integridade + Autenticidade); **assinatura digital = I.N.A** (Integridade + Não-repúdio + Autenticidade — **nunca** confidencialidade); **hash isolado = só Integridade**; processo de assinatura (DOC-ICP-15): (1) gerar hash do documento, (2) cifrar o hash com a **chave privada do signatário** (nunca a pública), (3) associar documento+assinatura; verificação: o destinatário recalcula o hash do documento recebido e **decifra a assinatura com a chave pública do signatário** (do certificado), comparando os dois hashes — se iguais, íntegro e autoria confirmada; ciclo de vida da assinatura (ICP-Brasil): Criação → Verificação/Validação → Armazenamento → Revalidação; **carimbo do tempo** (Autoridade de Carimbo do Tempo — ACT) é o recurso necessário para auditar uma assinatura anos depois mesmo com certificado expirado/revogado — consultar OCSP/LCR no futuro não resolve, pois o certificado pode já estar fora das bases ativas; tríade CID + Autenticidade + Não-repúdio (mnemônico **DICAN**: Disponibilidade, Integridade, Confidencialidade, Autenticidade, Não-repúdio); mecanismo x atributo: hash→Integridade, criptografia→Confidencialidade, assinatura digital→Autenticidade+Não-repúdio, certificado digital→identidade/autenticidade.

**Por que estudar isso:** é o tema-âncora de todo o bloco de criptografia (cobrado em praticamente toda parte do banco), sempre testando a associação exata mecanismo→garantia.

**Alerta de Pegadinha:** achar que assinatura digital garante confidencialidade (garante I.N.A, não C); trocar chave pública/privada no processo de cifrar/decifrar da assinatura; achar que consultar OCSP/LCR no futuro resolve o problema de validação de assinatura antiga (só o carimbo do tempo resolve).

**Ação Prática:** decore o mnemônico C.I.A (certificado) x I.N.A (assinatura) x integridade-só (hash); desenhe o fluxo completo cifrar→transmitir→decifrar→comparar hash de uma assinatura digital do zero.

---

### 🎯 Assunto: ICP-Brasil — Tipos de Certificado, AC/AR e Cadeia de Confiança
**O que estudar obrigatoriamente:** série **A** (assinatura/autenticidade, tipos A1-A4) x série **S** (sigilo/cifração, tipos S1-S4) x série **T** (carimbo do tempo); **A1/S1** — geração por **software**, chave mínima 1024 bits, armazenamento em HD/pendrive, validade **1 ano**; **A2/S2** — software, armazenamento em cartão/token, validade **2 anos**; **A3/S3** — geração e armazenamento em **hardware** (cartão/token/nuvem), validade **até 5 anos**, usado no Conectividade Social ICP da Caixa; **A4/S4** — hardware, chave mínima **2048 bits**, validade **até 6 anos**; **AC-Raiz** credencia as demais **ACs**, que (junto com as **ARs** — Autoridades de Registro, interface entre usuário e AC, fazem validação/identificação presencial) emitem certificados a usuários finais — a **AC-Raiz não emite certificados diretamente aos usuários**; validade jurídica garantida pela **MP 2.200-2/2001**; certificado **EV SSL** (Extended Validation) exige verificação mais rigorosa (registro legal da empresa, endereço físico); ao clicar no cadeado do navegador exibem-se dados do certificado (emissor, validade, cadeia) — **nunca** a chave privada.

**Por que estudar isso:** decoreba de tabela pura, cobrado com muita frequência e de forma quase idêntica em todas as 5 partes — altíssimo retorno por tempo de estudo.

**Alerta de Pegadinha:** trocar validade/mídia entre os tipos A1-A4/S1-S4 (a banca já tem gabarito controverso registrado entre A3 e A4 para 2048 bits — ver nota geral); achar que a AC-Raiz emite certificados diretamente; achar que se exibe a chave privada ao clicar no cadeado.

**Ação Prática:** monte a tabela A1/A2/A3/A4 (e espelhe para S1-S4) com 3 colunas — mídia de geração, tamanho mínimo de chave, validade — até recitar de cabeça.

---

### 🎯 Assunto: TLS/SSL — Estrutura, Handshake e Hardening
**O que estudar obrigatoriamente:** TLS tem duas camadas — **Handshake Protocol** (negocia parâmetros: cipher suite, compressão, troca de chaves via **Diffie-Hellman**, autentica o servidor) e **Record Protocol** (aplica os parâmetros negociados: fragmentação, compactação, criptografia simétrica dos dados); SSL antigo usa MAC simples (vulnerável a colisão), TLS usa **HMAC** (mais seguro); tipos de SSL record: CHANGE_CIPHER_SPEC, ALERT, HANDSHAKE, APPLICATION_DATA; modelo híbrido do HTTPS: assimétrica estabelece a chave de sessão simétrica com segurança, simétrica (AES) cifra o conteúdo, certificado (validado por AC) autentica o servidor; **SSL Offloading**: **SSL Termination** (cliente↔LB criptografado, LB↔backend em texto claro) x **SSL Bridging** (criptografado ponta a ponta, LB descriptografa/inspeciona e recriptografa uma nova conexão até o backend); hardening moderno: **TLS 1.3** com CA pública confiável, desabilitar SSL 2.0/3.0 e TLS 1.0/1.1 (previne downgrade attack), **HSTS** com includeSubDomains, restringir `ssl_protocols` a TLSv1.2/1.3, nunca usar RC4; vulnerabilidade **Drown** explora servidores que ainda suportam SSLv2 junto de TLS, quebrando a criptografia mesmo em certificados compartilhados — mitigação: desabilitar SSLv2.

**Por que estudar isso:** tema técnico denso cobrado com regularidade — testa tanto a arquitetura conceitual (Handshake x Record) quanto boas práticas modernas de hardening.

**Alerta de Pegadinha:** inverter as camadas Handshake (assimétrica) e Record (simétrica); confundir SSL Termination com SSL Bridging (Termination para no LB em texto claro; Bridging recriptografa até o backend); achar que qualquer HTTPS "moderno" ainda aceita SSL 2.0/3.0.

**Ação Prática:** desenhe o fluxo completo de um handshake TLS (ClientHello→ServerHello→troca de chaves DH→certificado→chave de sessão→dados cifrados) do zero.

---

## 🧩 Autenticação, Autorização e Controle de Acesso

### 🎯 Assunto: OAuth 2.0 — Papéis, Grants e Diferença para OpenID Connect
**O que estudar obrigatoriamente:** OAuth2 é protocolo de **autorização** (delega acesso), **não** de autenticação; 4 papéis: **Resource Owner** (dono do recurso/usuário), **Client** (aplicação), **Authorization Server** (autentica e emite tokens), **Resource Server** (API protegida, contém os dados); 4 tipos de concessão (**grants**): **authorization code**, **implicit** (obsoleto/inseguro), **resource owner password credentials**, **client credentials**; parâmetro **scope** define os recursos/permissões solicitados; **refresh token** é emitido **só** pelo Authorization Server, nunca circula com o Resource Server; um único Authorization Server pode emitir tokens aceitos por vários Resource Servers; **OpenID Connect (OIDC)** é a camada de **autenticação** sobre o OAuth2 — o artefato que prova criptograficamente a autenticação é o **ID Token** (um JWT assinado pelo IdP), diferente do Access Token (autoriza API, não prova identidade); fluxo recomendado atual: **Authorization Code + PKCE** (substitui o Implicit Grant, considerado inseguro); Keycloak pode atuar como Authorization Server OAuth2; no Judiciário, a Portaria CNJ 253/2020 art. 11 exige acesso a microsserviços da PDPJ-Br via OAuth2 provido pelo SSO da própria PDPJ-Br.

**Por que estudar isso:** tema muito recorrente e moderno, testado com detalhe de nomenclatura exata dos 4 papéis e dos 4 grants — a FCC insere nomes de grant "quase certos mas inventados" como distratores.

**Alerta de Pegadinha:** confundir OAuth2 (autorização) com autenticação; achar que o Refresh Token é emitido pelo Resource Server; usar nomes de grant inventados (a banca testa se você sabe os 4 nomes exatos); confundir Access Token (autoriza) com ID Token (autentica, é do OIDC).

**Ação Prática:** desenhe o fluxo Authorization Code + PKCE do zero, identificando em qual passo cada um dos 4 papéis entra em ação.

---

### 🎯 Assunto: MFA — Fatores, Resistência a Phishing e SSO/SAML
**O que estudar obrigatoriamente:** 3 categorias de fator: **algo que você sabe** (senha/PIN/frase de segurança), **algo que você tem** (token/smart card/dispositivo), **algo que você é** (biometria) — **não existe** um quarto fator "algo que você imagina"; autenticação de 2 fatores exige **categorias diferentes** (token + senha, nunca senha + frase de segurança, que são as duas "algo que sabe"); para resistência a phishing/replay, certificado digital em hardware criptográfico (token/smart card, PKI/FIDO2) com PIN local é **superior** a TOTP (pode ser digitado em site clonado) e SMS OTP (vulnerável a SIM swapping); **RBAC** (Role Based Access Control) atribui permissões a **papéis**, não diretamente a usuários — um usuário pode ter vários papéis; RBAC não é exclusivo de ambientes Microsoft/AD; RBAC + **Segregation of Duties (SoD)** mitiga fraude por excesso de privilégio; **SAML** é o protocolo XML que habilita **SSO** entre Provedor de Identidade (IdP) e Provedor de Serviço (SP) — **OAuth não é SSO**, é delegação de autorização; 802.1X: fluxo suplicante → **autenticador** (Access Point/switch) → servidor **RADIUS** (servidor de autenticação); falha de autenticação em rede corporativa tipicamente é configuração incorreta do servidor RADIUS.

**Por que estudar isso:** cobrado com boa densidade em todas as partes, cruzando conceitos de autenticação clássica (fatores) com arquiteturas modernas (OAuth/SAML/RBAC).

**Alerta de Pegadinha:** inventar um "quarto fator" de MFA; achar que 2 itens da mesma categoria (2 senhas) contam como MFA; achar que SAML e OAuth são a mesma coisa ou que OAuth implementa SSO; achar que RBAC é exclusivo de AD/Microsoft.

**Ação Prática:** monte a tabela sabe/tem/é com 3 exemplos cada; escreva a diferença SAML (SSO/autenticação) x OAuth2 (autorização) em uma frase cada.

---

### 🎯 Assunto: Revogação de Tokens, JWT e Segurança de API REST
**O que estudar obrigatoriamente:** claim `aud` (audience) do JWT define o destinatário/público-alvo do token — diferente de `iss` (emissor), `sub` (assunto), `exp`/`iat`/`nbf` (marcos temporais), `jti` (ID único anti-replay); para revogar tokens comprometidos sem quebrar o modelo stateless/escalável: access tokens de **curta duração** + refresh tokens + **claim de versão de credencial** (invalidada quando a versão muda) — evita consultar banco a cada requisição; API REST para dados sigilosos deve usar **JWT**, nunca Basic Auth em texto claro nem cookies não criptografados; reutilização prolongada de token OAuth2 sem rotação se corrige **reduzindo o tempo de vida do token + rotação periódica + validação de escopo por cliente** (não com JWS de payload isolado, TLS 1.3 ou CAPTCHA); **OWASP API Security Top 10 (2023)**: trocar `{documentId}` na URL sem validar permissão do usuário sobre aquele objeto = **BOLA/IDOR** (Broken Object Level Authorization) — diferente de **BFLA** (Broken Function Level Authorization, trata de função/endpoint, não objeto específico); rate limiting tradicional (por IP/requisição HTTP) pode ser burlado via **batching de queries GraphQL** — correção: aplicar limite no nível lógico da operação (ex.: contabilizar cada par usuário/senha processado dentro de requisições compostas).

**Por que estudar isso:** tema moderno e recorrente, especialmente no contexto de arquiteturas de microsserviços do próprio Judiciário (PDPJ-Br) — a FCC já cobra OWASP API Top 10 2023 diretamente.

**Alerta de Pegadinha:** confundir BOLA (objeto específico) com BFLA (função/endpoint); achar que rate limit por IP resolve abuso via GraphQL batching; confundir claim `aud` com `iss`/`sub`.

**Ação Prática:** escreva a diferença BOLA x BFLA com um exemplo de URL para cada; decore os 5 claims JWT mais cobrados (iss/sub/aud/exp/jti).

---

## 🧩 Infraestrutura de Segurança — Firewall, IDS/IPS, WAF e Arquiteturas de Perímetro

### 🎯 Assunto: Firewall — Stateless x Stateful, Proxy e UTM
**O que estudar obrigatoriamente:** firewall **stateless**/filtro de pacotes opera nas camadas 3/4, decide por IP/porta/interface/direção, **sem** rastrear estado da conexão — por isso **não** é eficiente contra SYN-flood; firewall **stateful inspection** mantém tabela de estados das conexões e usa isso para decidir sobre pacotes subsequentes; **proxy/gateway de aplicação** (camada 7) intermedia toda a comunicação, faz cache/autenticação, substitui o IP de origem do pacote de saída; **UTM** (Unified Threat Management) integra firewall+antivírus+IDS/IPS+VPN+antispam+filtro de conteúdo em um único appliance com gestão **centralizada** (nunca descentralizada), podendo ser baseado em identidade de usuário (não só IP); **WAF** inspeciona tráfego HTTP/HTTPS especificamente (camada 7), mitigando SQLi/XSS/sequestro de sessão/adulteração de URL — protege a identidade do **servidor**; **NGFW** se diferencia do firewall tradicional por **IPS integrado + Deep Packet Inspection (DPI)**, não por interface gráfica, backup ou bloqueio de porta isolado; políticas **default deny** (bloqueia tudo não permitido, mais seguro) x **default permit** (libera tudo não proibido).

**Por que estudar isso:** tema-base de todo o bloco de infraestrutura, cobrado em praticamente todas as 5 partes — a FCC gosta de descrever comportamentos e pedir para identificar qual tipo exato de firewall/dispositivo está sendo descrito.

**Alerta de Pegadinha:** achar que firewall stateless bloqueia SYN-flood (não bloqueia — precisa de stateful); achar que UTM é "descentralizado" (é centralizado); trocar quem o WAF protege (o servidor, não o cliente); achar que NGFW = firewall com interface bonita (o diferencial é DPI+IPS).

**Ação Prática:** monte a tabela firewall stateless x stateful x proxy x UTM x WAF x NGFW com a camada OSI de atuação e o que cada um **não** faz.

---

### 🎯 Assunto: Arquiteturas de DMZ — Dual-Homed, Screened Host, Screened Subnet
**O que estudar obrigatoriamente:** **Bastion Host** fica no lado público (DMZ), recebe/distribui serviços expostos (ex.: SMTP), funciona como application gateway/proxy — **não** é honeypot nem fica isolado da DMZ; **Dual-Homed Host** usa um único host com **duas interfaces de rede** (interna/externa), roteamento desabilitado, tudo passa pelo proxy do host; **Screened Host** combina **firewall + bastion host** (um único roteador de triagem); **Screened Subnet** cria **DMZ com dois firewalls** (um entre internet e DMZ, outro entre DMZ e rede interna) — regra: liberar só o tráfego necessário da internet para a DMZ, e só o tráfego essencial da DMZ para a rede interna, nunca liberar tudo em nenhuma ponta.

**Por que estudar isso:** cobrado de forma consistente com nomes muito parecidos entre si — clássico tema de "decorar 3 arquiteturas com nomes quase idênticos".

**Alerta de Pegadinha:** confundir as 3 arquiteturas entre si (Dual-Homed = 1 host/2 interfaces; Screened Host = firewall+bastion; Screened Subnet = 2 firewalls com DMZ); achar que Bastion Host serve para backup.

**Ação Prática:** desenhe as 3 topologias de firewall com o número exato de firewalls/interfaces de cada uma.

---

### 🎯 Assunto: IDS x IPS x NIDS/HIDS x EDR/XDR/SIEM/SOAR
**O que estudar obrigatoriamente:** **IDS** é passivo, opera **fora de linha** (out-of-band), só gera alarme/log — **não bloqueia**; **IPS** é ativo, opera **em linha** (inline), bloqueia proativamente, pode resetar conexões e até corrigir CRC de pacotes; detecção por **assinatura** (padrões conhecidos) x **anomalia** (perfil de comportamento — identifica ataques novos mas gera mais falsos positivos); **NIDS** (baseado em rede) não analisa tráfego **criptografado**, tem dificuldade em redes com switch, não confirma se o ataque foi bem-sucedido, mas é difícil de detectar pelo atacante; **HIDS** monitora um host específico; **NBA** (Network Behavior Analysis) examina padrões de tráfego incomuns (ex.: DDoS); **SIEM** coleta/agrega/correlaciona logs — ferramenta **passiva** de alerta; **EDR** foca em **endpoint**, com detecção comportamental e resposta automatizada (isolamento, kill de processo, forense em memória/disco); **XDR** amplia a correlação para múltiplos vetores (rede, servidor, cloud workload), não só endpoint; **SOAR** automatiza resposta via **playbooks** multi-etapa, exige SOC maduro; modelos de IA em EDR detectam zero-day por desvio/similaridade comportamental, não por hash de assinatura.

**Por que estudar isso:** tema muito recorrente (praticamente toda parte do banco) — a FCC gosta de descrever as 4-5 ferramentas (SIEM/EDR/XDR/SOAR/IDS/IPS) em itens numerados e pedir a correspondência exata.

**Alerta de Pegadinha:** achar que IDS bloqueia tráfego (só IPS bloqueia); achar que NIDS analisa tráfego criptografado; confundir SIEM (passivo) com SOAR (automação ativa via playbook) com EDR (foco endpoint) com XDR (múltiplos vetores).

**Ação Prática:** monte a matriz das 6 ferramentas (IDS/IPS/NIDS/SIEM/EDR/XDR/SOAR) com colunas: inline?, bloqueia?, escopo (endpoint/rede/múltiplo), requer SOC maduro?.

---

## 🧩 Malware, Ataques e Engenharia Social

### 🎯 Assunto: Taxonomia de Malware (Cartilha CERT.br)
**O que estudar obrigatoriamente:** **vírus** depende de arquivo hospedeiro/execução do usuário para se propagar (vírus de boot ataca o MBR/setor de inicialização); **worm** se autorreplica e propaga **automaticamente pela rede**, explorando vulnerabilidade, **sem** ação do usuário; **trojan** (cavalo de troia) se disfarça de programa legítimo, executa função maliciosa oculta — subtipos: **Downloader** (baixa outros códigos maliciosos), **Dropper** (código já embutido), **Backdoor** (garante retorno futuro sem repetir invasão), **Clicker** (redireciona navegação/simula cliques), além de DoS/Destrutivo/Proxy/Spy/Banker; **ransomware** criptografa dados e exige resgate — subtipos **Locker** (bloqueia o equipamento) e **Crypto** (criptografa dados, mantém acesso ao equipamento); **rootkit** esconde a presença de um invasor **já dentro do sistema** (grampeia funções do SO, esconde processos do Gerenciador de Tarefas); **bot/botnet** é a máquina "zumbi" controlada remotamente, usada em DDoS coordenado; **spyware/keylogger** monitora e envia dados sem se autorreplicar como vírus; **adware** exibe propagandas; RAT (Remote Access Trojan) combina trojan+backdoor; análise **dinâmica** (executa e observa comportamento) x **estática** (examina código sem executar).

**Por que estudar isso:** tema-base de todo o bloco de ameaças, cobrado em praticamente toda parte, frequentemente via exercício de correlação/matching entre nome e comportamento.

**Alerta de Pegadinha:** confundir worm (autopropaga sozinho) com vírus (precisa de hospedeiro/execução); achar que rootkit "invade" (ele **esconde** um acesso já obtido, não é o vetor de invasão); trocar Locker com Crypto ransomware.

**Ação Prática:** monte um mnemônico próprio associando ação→efeito para os 8 tipos principais (vírus, worm, trojan, ransomware, rootkit, bot, spyware, adware) e treine reconhecer o tipo a partir de um cenário narrado.

---

### 🎯 Assunto: Ataques de Rede — DoS/DDoS, Spoofing, MITM
**O que estudar obrigatoriamente:** **SYN Flood** explora o three-way handshake TCP incompleto (SYN sem ACK final), esgotando o buffer de conexões — tipicamente combinado com **IP Spoofing** para o atacante não receber as respostas SYN-ACK e dificultar rastreio; **DDoS** usa múltiplos hosts comprometidos (**botnet**) simultaneamente contra um único alvo; ataque **Smurf** usa pacotes ICMP em **broadcast** com IP de origem falsificado, fazendo todas as respostas inundarem a vítima; taxonomia de floods: Syn Flood, Zombie Flood (conexões sem spoofing, mais difícil de mitigar), ICMP Flood, Service/Non-Service Port Flood; ataques **passivos** só capturam informação sem alterar o fluxo (varredura de portas, sniffing) x ataques **ativos** modificam/criam fluxo (SQLi, MITM, Smurf, DNS spoofing); **ARP Spoofing/Poisoning** intercepta/modifica tráfego entre dois dispositivos na rede local, mitigado por **Dynamic ARP Inspection (DAI)** em switches gerenciáveis; **e-mail spoofing** falsifica o campo `From:` do cabeçalho SMTP; mitigação de DDoS: rate-limiting/ACLs, distribuição via GSLB/Anycast, **Sink Hole** (null-routing, descarta tráfego ao alvo) x **Black Hole** (clean-pipe/traffic-scrubbing, filtra e retorna tráfego legítimo — as definições são frequentemente invertidas nos comentários, atenção à nomenclatura exata do CERT.br).

**Por que estudar isso:** cobrado com muita regularidade, exigindo tanto reconhecer o ataque a partir de uma descrição narrativa quanto a mecânica técnica exata.

**Alerta de Pegadinha:** trocar Sink Hole com Black Hole; achar que SYN flood usa UDP (é TCP, explorando o handshake); confundir ataque passivo com ativo.

**Ação Prática:** escreva a definição de Sink Hole x Black Hole em uma frase cada até não errar mais; treine reconhecer 5 ataques a partir de cenários narrados sem o nome técnico citado.

---

### 🎯 Assunto: Ataques a Aplicações Web e Engenharia Social
**O que estudar obrigatoriamente:** **XSS** (Cross-Site Scripting) injeta script malicioso via parâmetro de URL não validado, executando no navegador da vítima para roubar cookies/sessão; prevenção de **SQL Injection**: validação de entrada do lado do **servidor** com whitelist (validação client-side sozinha **não** é suficiente); gerenciamento de sessão seguro: usar só mecanismos padrão (não aceitar ID de sessão pré-configurado — ataque de **sessão fixada**), expirar sessões inativas, usar one-way hash em perguntas de segurança; **Defacement** (desfiguração de página) explora erro de aplicação/vulnerabilidade de servidor/senha furtada de administração; **Rogue Access Points** mitigados por **WIPS** (Wireless Intrusion Prevention System); **força bruta** = tentativa e erro de credenciais (dicionários, listas, substituições óbvias); **phishing** combina engenharia social + técnica (link falso) para obter dados — **spearphishing** é direcionado; **scareware** = pop-up alarmista simulando antivírus, induzindo download de "solução" falsa — ação correta é fechar e ativar bloqueador; **golpe de antecipação de recursos** (advance fee fraud / golpe do precatório) = promessa de benefício futuro mediante pagamento adiantado; treinamento/conscientização contínua é a medida **primária** contra phishing/engenharia social — não bloqueio de redes sociais, troca trimestral de senha isolada ou antispyware isolado.

**Por que estudar isso:** tema recorrente, frequentemente apresentado como notícia/cenário longo em português (às vezes traduzido do inglês), exigindo reconhecer o nome técnico a partir do comportamento descrito.

**Alerta de Pegadinha:** achar que validação client-side de formulário previne SQLi (precisa ser no servidor); confundir phishing com scareware; achar que bloqueio de rede social é medida eficaz contra phishing (treinamento contínuo é a resposta esperada).

**Ação Prática:** pratique identificar, a partir de 5 cenários narrados sem o nome técnico, qual ataque está descrito (XSS, SQLi, sessão fixada, defacement, phishing).

---

### 🎯 Assunto: EDR/XDR contra Zero-Day e Resposta a Incidentes (SOC)
**O que estudar obrigatoriamente:** para ransomware que explora zero-day e passa por antivírus baseado em **assinatura**, a solução é uma plataforma EDR/XDR com **detecção comportamental**, resposta automatizada (isolamento/kill de processo), monitoramento de chamadas de sistema, controle de USB e análise forense em memória/disco; **análise heurística** examina comportamento/estrutura para identificar ameaças novas/ofuscadas, diferente da comparação de hash com base de assinaturas; triagem de incidentes (SOC): diante de múltiplos alertas simultâneos, prioriza-se **exfiltração ativa de dados para C2 conhecido** — primeira ação técnica é **isolar a estação** (contenção), preservando evidências voláteis — nunca desligar servidores abruptamente nem fazer backup completo antes de desconectar; diante de atividade anômala no SIEM, a ação prioritária é **analisar os logs correlacionados** para identificar a origem, não reiniciar sistemas nem notificar todos os funcionários; sequência de resposta pós-ransomware (com backups já isolados): notificar stakeholders → ativar plano de contingência → restaurar backups → testar/validar → retorno ao normal; diante de ransomware com backup disponível, a ação correta é **restaurar do backup mais recente**, **nunca pagar o resgate**.

**Por que estudar isso:** cruza tecnologia de defesa moderna com processo de resposta a incidentes — tema aplicado, com cenários realistas, muito valorizado pela FCC em provas recentes.

**Alerta de Pegadinha:** achar que EDR é "só antivírus melhorado" (o diferencial é resposta automatizada + comportamental); pagar resgate ou desligar servidores abruptamente aparecem como distratores tentadores — nunca são a resposta certa.

**Ação Prática:** memorize a sequência de resposta a incidente (identificar → conter → coletar evidências → erradicar → recuperar → lições aprendidas) e aplique a um cenário de ransomware do zero.

---

## 🧩 Normas de Segurança da Informação (Família ISO 27000, CIS, NIST, OWASP)

### 🎯 Assunto: ISO/IEC 27001 (2013 e 2024) — SGSI e Controles do Anexo A
**O que estudar obrigatoriamente:** ISO 27001 traz os **requisitos** de um SGSI (Sistema de Gestão de Segurança da Informação), aplicável a qualquer organização independente de tipo/tamanho; cláusula **4.3** (definir escopo): considerar partes interessadas, interfaces/dependências externas, questões internas/externas (4.1); cláusula **5.2/5.3** (versão 2013) / **liderança**: a **Alta Direção** estabelece a política de SI, atribui responsabilidade/autoridade e cobra relato de desempenho do SGSI — **não é atribuição exclusiva da área de TI**; cláusula **6.1.2** (2024): avaliação de riscos deve ser **repetível**, produzindo resultados coerentes/válidos/comparáveis entre unidades e ciclos, com critérios uniformes; cláusula **7.3**: pessoas sob controle da organização devem estar cientes da política de SI e das implicações da não conformidade; **9.2** (auditoria interna): deve considerar resultados de auditorias anteriores; Anexo A — controle **A.7.2.2** (RH): treinamento/conscientização; **A.11.2.4**: manutenção correta de equipamentos; **A.13.1.3**: segregação de redes em domínios de confiança; **A.14.1.3**: proteção de transações cobre TODOS os riscos (transmissões incompletas, alteração não autorizada, divulgação não autorizada, duplicação/reapresentação); **A.16.1.7**: evidências devem considerar papéis/responsabilidades das pessoas envolvidas.

**Por que estudar isso:** a FCC cobra o **número exato da cláusula/controle**, não só o conceito — é o tema mais "decoreba de artigo" de todo o edital de Segurança.

**Alerta de Pegadinha:** achar que a área de TI (não a Alta Direção) é responsável pela política de SI; confundir 27001 (requisitos de SGSI) com 27002 (diretrizes de implementação dos mesmos controles).

**Ação Prática:** monte uma "cola" com os números de cláusula/controle mais cobrados (4.3, 5.2/5.3, 6.1.2, 7.3, 9.2, A.7.2.2, A.11.2.4, A.13.1.3, A.14.1.3, A.16.1.7) e o verbo-chave de cada um.

---

### 🎯 Assunto: ISO/IEC 27002 (2013 e 2022) — Diretrizes de Implementação
**O que estudar obrigatoriamente:** é um **catálogo de referência de controles** com orientações de implementação, apoiando o SGSI da 27001 (não define requisitos de SGSI); controles-chave — **5.1.1/5.1**: política de SI deve contemplar estratégia do negócio, regulamentações/legislação/contratos e ambiente de ameaças; **5.9** (2022, ex-8.1.1): inventário de ativos deve indicar propriedade/responsável e dados armazenados; **5.12** (2022, ex-8.2.1): classificação da informação — responsabilidade do **proprietário**, processo contínuo revisado conforme mudança de sensibilidade, **não** deriva do controle de acesso já configurado; **5.26** (2022): resposta a incidentes — diante de incidente ativo com risco de propagação, a ação prioritária é **contenção** (isolar preservando estado forense), **antes** de notificar ANPD/titulares (LGPD) ou restaurar backup; **6.2.2** (trabalho remoto, 2013): considera segurança física do local/ambiente e licenciamento de software em equipamento particular; **8.1.4/9.2.3**: gerenciamento de direitos de acesso privilegiados evita uso não autorizado de IDs de administrador genérico; **9.4** (controle de acesso): aviso de acesso autorizado, não transmitir senha em texto claro, restringir tempo de conexão; **12.1.4**: separação de ambientes dev/teste/produção; **12.2** (proteção contra malware): política formal proibindo software não autorizado; usar **2+ fornecedores diferentes** de antimalware aumenta eficácia (12.2.1); **14.2.1** (desenvolvimento seguro): considera segurança no ambiente de dev, metodologia, requisitos de projeto, controle de versões; **14.2.9**: testes de aceitação durante **todo** o ciclo, não só quando "pronto".

**Por que estudar isso:** segunda norma mais cobrada (junto com a 27001), com o mesmo padrão de decoreba de número de controle — muitas questões citam o texto quase literal da norma.

**Alerta de Pegadinha:** achar que um único antimalware é suficiente (norma recomenda 2+ fornecedores); achar que classificação de informação deriva do controle de acesso (é o contrário: a classificação orienta o controle de acesso).

**Ação Prática:** monte a mesma "cola" de números de controle da 27002 (5.1.1, 5.9, 5.12, 5.26, 6.2.2, 9.2.3, 9.4, 12.1.4, 12.2, 14.2.1, 14.2.9) com o verbo-chave de cada.

---

### 🎯 Assunto: ISO 27005, ISO 31000 — Gestão de Riscos
**O que estudar obrigatoriamente:** processo de identificação de riscos: ativos → ameaças → controles existentes → vulnerabilidades → consequências; entrada do processo de avaliação: critérios básicos, escopo, limites, organização do processo; opções de **tratamento de risco** (27005): **modificação** (mitigar), **retenção** (aceitar), **ação de evitar** (eliminar causa), **compartilhamento** (transferir a terceiros/seguro) — **não existe "eliminação de risco"** como opção formal; critérios de aceitação podem variar por classe de risco (ex.: não conformidade legal pode ser sempre inaceitável); análise **qualitativa** (mais simples/barata, escala Pequena/Média/Grande) é usada primeiro, depois **quantitativa** (mais específica, usa dados históricos); alinhamento PDCA x gestão de risco: **Planejar** = contexto+avaliação+plano de tratamento+aceitação; **Executar** = implementar tratamento; **Verificar** = monitoramento contínuo; **Agir** = manter/melhorar; **ISO 31000**: avaliação de risco é processo global (identificação+análise+avaliação), sistemático/iterativo/colaborativo — pode resultar em "não fazer mais nada", considerar tratamento, reconsiderar objetivos, ou manter controles existentes; matriz de risco: **impacto crítico pesa mais que probabilidade alta** (impacto crítico + probabilidade média supera impacto baixo + probabilidade alta); fórmula clássica: **ativo + ameaça + vulnerabilidade = risco**; matriz probabilidade×impacto direciona a resposta (alta prob./alto impacto→ação imediata; baixa prob./alto impacto→plano de contingência; alta prob./baixo impacto→monitoramento; baixa/baixo→só em caso de ocorrência).

**Por que estudar isso:** cobrado com boa densidade, cruzando o vocabulário formal da norma com exercícios práticos de matriz de risco.

**Alerta de Pegadinha:** inventar "eliminação de risco" como opção da 27005; priorizar por probabilidade em vez de impacto na matriz de risco.

**Ação Prática:** pratique classificar 5 cenários de risco na matriz probabilidade×impacto e decidir a resposta correta (ação imediata/contingência/monitoramento/reativo).

---

### 🎯 Assunto: Outras Normas ISO Correlatas (27017, 27035, 27701, 22301)
**O que estudar obrigatoriamente:** **ISO/IEC 27017:2016** trata de controles específicos para **nuvem** (responsabilidade compartilhada); **ISO/IEC 27035-1/3** trata do processo estruturado de **gestão de incidentes** — Ponto de Contato (PoC) recebe/assegura relato rápido; fases: identificação → avaliação/qualificação → coleta de inteligência de ameaças → contenção/erradicação/recuperação → análise → relatório; eventos detectados internamente por IDS/IPS, antivírus e SIEM (não por ferramentas de contenção como Metasploit); para migração à nuvem pública + gestão de incidentes, a combinação correta é **27017 + 27035-1** (não 27001/27002/27005 isoladas); **ISO/IEC 27701:2019** (SGPI, extensão da 27001 para privacidade) exige **Avaliação de Impacto à Privacidade (PIA)** sempre que há mudança significativa no tratamento de dados pessoais, mesmo em organização só local; item 7.2.8 recomenda manter inventário/lista de atividades de tratamento de dados pessoais; **ISO 22301** (continuidade de negócios) — cláusula **4.2**: determinar partes interessadas relevantes e requisitos; cláusula **8.4.4.3**: cada Plano de Continuidade deve incluir propósito/escopo, papéis, ações, ativação, interdependências, relatório, evacuação, recursos; caso WannaCry no NHS: impacto minimizado com plano de resposta focado em recuperação de sistemas críticos + backups regulares; **ISO 22313:2015** detalha os elementos do SGCN (planejamento operacional, BIA, avaliação de riscos, estratégias, exercícios/testes).

**Por que estudar isso:** conjunto de normas "satélite" da 27001/27002, cada uma cobrindo um nicho específico (nuvem, incidentes, privacidade, continuidade) — a banca gosta de pedir a combinação certa de 2 normas para um cenário composto.

**Alerta de Pegadinha:** confundir ISO 22301 (continuidade) com 27005 (riscos) e 27035 (incidentes) quanto a qual documento define partes interessadas/tratamento de risco/fases de resposta.

**Ação Prática:** monte uma tabela de 6 linhas (27001/27002/27005/27017/27035/27701/22301) com "o que cada norma resolve" em uma frase.

---

### 🎯 Assunto: CIS Controls v8/v8.1 e NIST SSDF
**O que estudar obrigatoriamente:** **Control 1** (Inventário de Ativos): salvaguardas mapeadas ao NIST CSF — inventário detalhado=Identificar; tratar ativo não autorizado=Responder; ferramenta de descoberta ativa=Detectar; logs DHCP para atualizar inventário=Identificar; descoberta passiva=Detectar; **Control 2** (Inventário de Software): operacionalizado via **allowlisting** de aplicações — é prática de segurança, não produto; **Control 3** (Data Protection): prioriza mapear/classificar fluxos de dados sensíveis e criptografar em trânsito/repouso, **antes** de segmentação de rede ou hardening genérico; **Control 18** (Penetration Testing): corrigir achados=Proteger; validar medidas=Proteger; pentest interno periódico=Identificar; **NIST Secure Software Development Framework (SSDF) v1.1**, prática **PS.1**: armazenar código em repositórios protegidos, controlar versões, assinar commits, criptografar para proteger integridade de executáveis.

**Por que estudar isso:** citado explicitamente no edital (Desenvolvimento Seguro: OWASP, NIST SSDF; Normas: CIS Controls v8) — a banca já testa o mapeamento fino entre controle numerado e função do NIST CSF (Identificar/Proteger/Detectar/Responder/Recuperar).

**Alerta de Pegadinha:** achar que allowlisting é um produto (é uma prática); achar que Data Protection prioriza segmentação de rede antes de classificar/criptografar dados.

**Ação Prática:** memorize os Controls 1, 2, 3 e 18 do CIS v8 e pratique mapear cada salvaguarda numerada à função do NIST CSF correta.

---

### 🎯 Assunto: OWASP Top 10 (2021) e OWASP API Security Top 10 (2023)
**O que estudar obrigatoriamente:** ordem 2021 — **A01 Broken Access Control** (subiu da 5ª posição de 2017 — exemplo: falta de restrição em POST/PUT/DELETE); **A02 Falhas Criptográficas**; **A03 Injeção** (caiu da 1ª posição de 2017); **A04 Design Inseguro** (categoria nova — mitigado por um ciclo SSDLC completo com padrões arquiteturais/testes de abuso, não só firewall reativo); **A05 Configuração Incorreta**; **A06 Componentes Vulneráveis e Desatualizados**; **A07 Falhas de Identificação e Autenticação**; **A09 Falhas de Log e Monitoramento**; adotar o OWASP Top 10 como guia de desenvolvimento é a prática mais **eficaz e sistemática** contra vulnerabilidades comuns (mais completo que MFA/HTTPS isolados); **OWASP API Security Top 10 (2023)**: já detalhado no bloco de segurança de API (BOLA/BFLA, rate limiting).

**Por que estudar isso:** citado explicitamente no edital e cobrado com boa frequência — atenção: quem estudou a versão 2017 tende a errar (Injeção não é mais #1).

**Alerta de Pegadinha:** marcar "Injeção" como #1 por hábito da versão 2017 — na edição 2021 o #1 é Broken Access Control.

**Ação Prática:** decore a ordem 2021 completa (A01 a A10) e associe cada posição a um exemplo prático de vulnerabilidade.

---

## 🧩 Continuidade de Negócios, Backup e Gestão de Incidentes

### 🎯 Assunto: RTO x RPO e Plano de Continuidade de Negócios (PCN)
**O que estudar obrigatoriamente:** **RTO** (Recovery Time Objective) = tempo tolerável entre interrupção e restauração **total** do serviço; **RPO** (Recovery Point Objective) = perda tolerável de **dados**, diretamente ligado à **frequência de backup** (aumentar a frequência reduz o RPO); **BIA** (Business Impact Analysis) identifica processos essenciais e avalia impactos financeiro/operacional de interrupções, subsidiando o PCN; PCN se subdivide em **4 planos**: **Plano de Contingência/Emergência** (último recurso, ações mais imediatas), **PAC — Plano de Administração/Gerenciamento de Crises** (funções/responsabilidades das equipes), **PRD — Plano de Recuperação de Desastres** (retomada dos níveis originais), **PCO — Plano de Continuidade Operacional** (restabelece ativos que suportam a operação, ex.: queda de internet); segundo a ISO 22301, os planos devem conter papéis/responsabilidades, processo de ativação, gestão de impactos imediatos, comunicação com stakeholders e processo de retorno à normalidade — regras de proteção CID pertencem à 27002, **não** ao PCN; o PCN **não** é responsabilidade exclusiva da área de TI, deve ser revisado periodicamente.

**Por que estudar isso:** tema muito recorrente, frequentemente combinado com exercícios numéricos de cálculo de RTO a partir de um cenário com múltiplas etapas de recuperação.

**Alerta de Pegadinha:** inverter RTO (tempo) e RPO (dados/frequência de backup); trocar a ordem/função dos 4 subplanos do PCN; achar que o PCN é responsabilidade só da TI.

**Ação Prática:** pratique um exercício numérico de RTO combinando backup+replicação+ativação de contingência com múltiplas etapas cronometradas, escolhendo sempre o caminho que minimiza simultaneamente indisponibilidade e perda de dados.

---

### 🎯 Assunto: Backup — Tipos, Restauração e Boas Práticas
**O que estudar obrigatoriamente:** **completo** — copia tudo, desmarca o atributo de arquivo, mais fácil de localizar, processo mais demorado; **incremental** — copia só o que mudou desde o **último backup de qualquer tipo**, desmarca o atributo (por isso encadeia), restauração exige o completo **+ todos os incrementais** (mais lenta, mais espaço economizado); **diferencial** — copia o que mudou desde o **último completo**, **não desmarca** o atributo (por isso sempre compara com o completo), restauração exige só o completo **+ o último diferencial** (mais rápida que incremental, ocupa mais espaço que incremental); mnemônico: "diFerencial → more Fast; incrementaL → more sLow"; **incremental contínuo/progressivo** automatiza a recuperação via software, tornando-a tão rápida quanto a de um completo, armazenando menos dados que os três tipos anteriores; testes periódicos de backup confirmam que os dados **podem efetivamente ser recuperados**, não só que o agendamento roda; dados sigilosos em backup devem ser **criptografados**; política de backup deve definir quem executa backup/restore, proteção física, e **redundância em locais diferentes** (backup para recuperação de desastre deve replicar em local remoto/nuvem).

**Por que estudar isso:** é o tema isolado mais recorrente de todo o banco de Segurança (a FCC reutiliza literalmente a mesma frase-armadilha em várias provas diferentes) — altíssimo retorno.

**Alerta de Pegadinha:** trocar o que o diferencial precisa (completo+último diferencial) pelo que o incremental precisa (completo+todos os incrementais); achar que backup local rápido (ex.: eSATA) é sempre pior que backup remoto — o banco já teve gabarito controverso priorizando velocidade local para perda "acidental" (não "desastre") — ver nota geral no topo.

**Ação Prática:** decore a frase-cola "diferencial = completo + ÚLTIMO diferencial (rápido); incremental = completo + TODOS os incrementais (lento)" até nunca mais hesitar.

---

## 🧩 Segurança de Redes sem Fio, VPN e Segmentação

### 🎯 Assunto: WEP/WPA/WPA2/WPA3 e Autenticação Wi-Fi Corporativa
**O que estudar obrigatoriamente:** **WEP** usa **RC4** (inseguro); **WPA** usa **TKIP** (chave temporária, trocada por pacote); **WPA2** usa **CCMP baseado em AES** como diferencial — **melhoria central sobre o WPA é justamente a troca do TKIP pelo AES**; SSID = identificador de até 32 caracteres em cada pacote de dados; ordem de segurança crescente **WEP < WPA < WPA2 < WPA3**.

**Por que estudar isso:** tema cruzado entre Redes e Segurança, cobrado de forma consistente — ver também o bloco de Segurança sem Fio do `GUIA_ESTUDO_REDES.md` para detalhes de 802.1X/EAP/RADIUS já cobertos lá.

**Alerta de Pegadinha:** achar que WPA2 usa TKIP como diferencial central (usa AES/CCMP).

**Ação Prática:** decore a linha do tempo WEP(RC4)→WPA(TKIP)→WPA2(AES/CCMP)→WPA3.

---

### 🎯 Assunto: VPN — SSL x IPSec
**O que estudar obrigatoriamente:** **VPN-SSL** não exige software especializado no cliente, acessível via navegador comum (HTML5) — muito usada em teletrabalho; **VPN-IPSec** tradicional exige cliente dedicado; protocolos de tunelamento: **PPTP** e **L2TP com IPSec**; VPN deve garantir confidencialidade + autenticação + integridade via criptografia por tunelamento; SA (Security Association) do IPSec é identificada por **3 parâmetros**: **SPI** (Security Parameter Index), endereço IP de destino, identificador do protocolo (**AH=51** ou **ESP=50**) — não confundir com "SPD" (Security Policy Data), distrator plausível mas incorreto.

**Por que estudar isso:** complementa o bloco de VPN/IPSec já coberto no `GUIA_ESTUDO_REDES.md` — aqui o foco é a identificação formal da SA e a comparação SSL x IPSec do ponto de vista de usabilidade.

**Alerta de Pegadinha:** achar que a SA do IPSec é identificada por "SPD" (não existe esse parâmetro — é SPI+IP destino+protocolo).

**Ação Prática:** decore os 3 parâmetros exatos que identificam uma SA IPSec.

---

## 🧩 Segurança em Nuvem e DevSecOps

### 🎯 Assunto: Segurança em Nuvem — IAM, KMS e Segregação
**O que estudar obrigatoriamente:** proteção de dados em repouso em nuvem pública exige **segregação de rede** (VPC/VNet) + **KMS** (gerenciamento de chaves) + **IAM** com princípio do **menor privilégio** em todos os recursos; modelo maduro integrado: IAM com políticas granulares de least privilege + segregação de funções, monitoramento centralizado (CloudTrail/Monitor/Cloud Logging) com análise contínua, criptografia em trânsito/repouso com chaves gerenciadas pela própria organização (não só pelo provedor).

**Por que estudar isso:** citado no edital (Computação em Nuvem) e cobrado em cenários de arquitetura moderna — cruza com Governança de acesso.

**Alerta de Pegadinha:** achar que só criptografia (sem IAM/segregação) é suficiente para proteger dados em nuvem.

**Ação Prática:** monte a checklist de 3 pilares (segregação de rede, KMS, IAM/least privilege) para qualquer cenário de dados sensíveis em nuvem.

---

### 🎯 Assunto: DevSecOps, Zero Trust e Segurança de Pipeline CI/CD
**O que estudar obrigatoriamente:** **Zero Trust Architecture (ZTA)** segue "nunca confiar, sempre verificar", com monitoramento contínuo — **não é sinônimo** de Defesa em Profundidade; **Defesa em Profundidade** = múltiplas camadas de controles heterogêneos e sobrepostos (físicos, técnicos, administrativos), de modo que a falha de uma camada seja contida pela próxima — não é uma única solução "impenetrável" nem foco só em perímetro; para cenário IoT sensível, ZTA+DevSecOps combina **ZTNA** e **CASB** (segmentar rede, restringir movimento lateral), MFA para todos os acessos, scanners de vulnerabilidade automatizados no pipeline CI/CD, monitoramento contínuo via SIEM; credenciais sensíveis em Kubernetes devem ser **Secret**, nunca embutidas no Dockerfile, gravadas na imagem, passadas como ARG de build ou guardadas em **ConfigMap** (destinado a configuração não sensível); em GitOps, revisar/aprovar mudanças via pull request corresponde à atividade de **auditoria** no processo de gerenciamento de configuração; integridade de webhook (ex.: GitLab CI/CD) se corrige habilitando **verificação de assinatura (token)**, não com proxy reverso/balanceador/SSL offloading isolados.

**Por que estudar isso:** tema moderno crescente em provas recentes, cruzando segurança clássica com práticas de desenvolvimento ágil/nuvem.

**Alerta de Pegadinha:** achar que Zero Trust e Defesa em Profundidade são a mesma coisa; guardar segredo em ConfigMap em vez de Secret.

**Ação Prática:** escreva a diferença Zero Trust x Defesa em Profundidade em duas frases; decore Secret (sensível) x ConfigMap (não sensível) no Kubernetes.

---

## 🧩 Governança de Segurança no Judiciário (CNJ) — Complementar à Seção 17 do Edital

### 🎯 Assunto: Normativos CNJ de Segurança da Informação
**O que estudar obrigatoriamente:** **Resolução CNJ nº 396/2021** institui a **ENSEC-PJ** (Estratégia Nacional de Segurança Cibernética do Poder Judiciário), tratando segurança da informação de forma ampla (não só segurança lógica) e também gestão de usuários/identidades/acessos/privilégios; art. 18 trata da **Rede Nacional de Cooperação do Judiciário** em segurança cibernética, ampliando parcerias com Executivo/Legislativo/MP/polícia judiciária/setor privado/academia; **Resolução CNJ nº 370/2021** institui a **ENTIC-JUD**, exigindo Plano de Transformação Digital por órgão (perspectivas Sociedade, Aprendizado e Crescimento, Processos Internos); **Portaria CNJ nº 131/2021** institui o **Grupo Revisor de Código-Fonte** (testes de qualidade de código, garantias operacionais); **Portaria CNJ nº 162/2021** exige **ETIR** (Equipe de Tratamento e Resposta a Incidentes) em todos os órgãos do Judiciário, **exceto o STF**; **Ato TRT-GP nº 118/2018** classifica riscos institucionais em Operacional, Comunicação, Conformidade e Estratégico.

**Por que estudar isso:** decoreba de número de norma específica do Judiciário — não é dedutível por lógica, é conhecimento literal exigido, e tende a aparecer em provas de tribunais com boa frequência.

**Alerta de Pegadinha:** trocar os números das Resoluções/Portarias entre si (370 x 396 x 131 x 162); achar que a ETIR é obrigatória para o STF também (é a exceção).

**Ação Prática:** monte um cartão de memorização com "número → norma → o que institui" para as 4 normas CNJ listadas, e revise-o nos últimos dias antes da prova.

---

# ✅ Observações finais

- **LGPD** (Lei nº 13.709/2018) aparece de forma indireta neste lote (referências à necessidade de notificação à ANPD/titulares em resposta a incidentes, PIA na ISO 27701) mas sem volume suficiente para um bloco prescritivo dedicado — como está citada explicitamente no edital (seção 16 e também na Legislação), vale complementar com uma leitura direta da lei e de questões específicas de LGPD se houver lote disponível.
- **Blockchain**, **eMAG/PDF tagueado** e **governança de IA generativa** aparecem de forma pontual mas são temas em ascensão em provas recentes — vale uma leitura complementar de material atualizado, já que o volume no banco ainda é baixo.
- O conteúdo rotulado como "Arquitetura de Software" no arquivo-fonte (202 questões) foi extraído para o guia irmão `GUIA_ESTUDO_ARQUITETURA_SOFTWARE.md` — mas atenção: esse rótulo é usado pela FCC/scraper como um bucket amplo que também cobre Redes, Banco de Dados, Governança/Processos, Nuvem, linguagens de programação e Sistemas Operacionais, então parte do conteúdo mais técnico específico dessas áreas já está coberto (ou será coberto) nos guias dedicados a elas.
- Os 5 resumos brutos que originaram este guia estão em `guia_estudos_subagentes/raw_md/37_seguranca_parte1_de_5.md` a `37_seguranca_parte5_de_5.md`, cada um citando centenas de `id_questao` reais como evidência — consulte-os para os exemplos completos por trás de cada regra resumida aqui.
