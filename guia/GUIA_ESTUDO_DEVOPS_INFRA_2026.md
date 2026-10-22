# 📘 Guia de Estudo Direcionado e Prescritivo — DevOps, Nuvem, Infraestrutura e Redes: Atualizações 2026 (TRT 4ª Região)

> **Guia novo do Edital TRT4 nº 01/2026.** Cobre as lacunas das seções **6.9 (DevOps/DevSecOps)**, **6.13 (Nuvem) [T]**, **6.11 (SO: versões novas) [A]** e **6.12 (Redes: itens novos)**, que os guias **Redes**, **Sistemas Operacionais** e **Desenvolvimento de Software** não cobriam ou cobriam com versões antigas. Não vem do banco de questões. Itens ⚠️ **conferir** citam versões recentes. Para o seu perfil (Docker, Jenkins, Git, CI/CD e Grafana na prática), as partes de DevOps são **só questões**.

**Legenda:** **[A+T]** cai nos dois · **[A]** só Analista · **[T]** só Técnico.

---

## 🧩 DevOps, CI/CD e Gestão de Configuração

### 🎯 Assunto: Git, GitHub, GitLab e Gitflow [A+T; Gitflow e Wiki = T]
**O que estudar obrigatoriamente:** os **três estados** do Git são *working directory* → *staging area* (`git add`) → repositório (`git commit`). `merge` preserva o histórico (pode ser *fast-forward* ou criar um *merge commit*); `rebase` **reescreve** o histórico, deixando-o linear (nunca faça rebase de branch pública). Também caem `cherry-pick`, `stash`, `tag` (leve × anotada), `revert` (cria um commit inverso e é seguro em branch compartilhada) × `reset` (`--soft` mantém o *staging*, `--mixed` é o padrão e mantém o *working dir*, `--hard` descarta tudo) e `fetch` (só baixa) × `pull` (= fetch + merge). **Gitflow**: `main`/`master` (produção, com *tags*), `develop` (integração), `feature/*` (sai de e volta para `develop`), `release/*` (sai de `develop`, vai para `main` **e** `develop`) e `hotfix/*` (sai de **`main`**, volta para `main` **e** `develop`). A alternativa é o *trunk-based development*. **GitLab** reúne repositório, *merge requests*, **issues/boards** (gerenciamento de tarefas), **Wiki** por projeto (também um repositório Git) e o **GitLab CI/CD** nativo. **GitHub** tem *pull requests*, Actions, Issues e Projects.
**Por que estudar isso:** Git cai nos dois cargos e Gitflow é item explícito do Técnico.
**Alerta de Pegadinha:** criar o hotfix a partir de `develop` (o certo é a partir de `main`); dizer que `git fetch` altera a branch local; usar `reset --hard` em histórico compartilhado em vez de `revert`.
**Ação Prática:** desenhe o Gitflow com uma release e um hotfix simultâneos.

---

### 🎯 Assunto: Gestão de Configuração, CI/CD, Jenkins, Maven, CircleCI, GitLab CI e Selenium [A: ferramentas · T: conceitos]
**O que estudar obrigatoriamente:** a **gestão de configuração** tem 4 atividades: identificação dos **itens de configuração**, **controle de mudanças** (*baselines*), **registro e relato de status** e **auditoria**. Uma *baseline* é uma versão formalmente aprovada que só muda por controle de mudanças. **CI** é integrar e testar automaticamente a cada *commit*. **Continuous Delivery** deixa o artefato sempre pronto, com o deploy em produção feito por decisão **manual**; **Continuous Deployment** faz o deploy **automático**. **Jenkins**: servidor de automação Java com controller/agents e **plugins**. O pipeline como código fica no `Jenkinsfile`, na sintaxe **declarativa** (`pipeline { agent any; stages { stage('Build') { steps { ... } } }; post { always { ... } } }`) ou na **scripted** (`node { }`, em Groovy). **Maven**: arquivo `pom.xml`, coordenadas **groupId:artifactId:version**, **ciclo de vida padrão** `validate → compile → test → package → verify → install → deploy` (rodar uma fase executa todas as anteriores; `install` copia para o repositório **local** `~/.m2`, e `deploy`, para o **remoto**), **escopos** `compile` (padrão), `provided` (o container fornece, como servlet-api), `runtime`, `test` e `system`, versões **SNAPSHOT** (em desenvolvimento) e o Maven Central. **CircleCI**: `.circleci/config.yml` com *jobs*, *workflows*, *executors* (docker, machine) e **orbs** (pacotes reutilizáveis). **GitLab CI**: `.gitlab-ci.yml` com `stages`, jobs, **runners**, `artifacts` × `cache`, `rules`/`only` e *environments*. **Selenium**: automação de **navegador** para testes funcionais e de interface. O **WebDriver** é a API e o protocolo W3C; usa localizadores (id, name, CSS, XPath) e esperas explícitas e implícitas. O **Grid** executa em paralelo e distribuído, e o **IDE** faz gravação e reprodução.
**Por que estudar isso:** o Analista cita as ferramentas nominalmente, e o Técnico cobra os conceitos.
**Alerta de Pegadinha:** dizer que `mvn package` instala no repositório local (quem faz isso é o `install`); confundir Continuous Delivery com Continuous Deployment; dizer que o Selenium faz teste unitário.
**Ação Prática:** escreva um `Jenkinsfile` declarativo com os estágios build, test (JUnit) e deploy, e um `.gitlab-ci.yml` equivalente.

---

## 🧩 Contêineres e Nuvem

### 🎯 Assunto: Docker e Kubernetes (com Rancher) [A+T via PDPJ · T via Nuvem]
**O que estudar obrigatoriamente:** **Docker**: a **imagem** é imutável e feita de **camadas**; o **contêiner** é a instância em execução de uma imagem. Ele **compartilha o kernel** do host, o que o difere da VM, que tem SO próprio. Instruções do Dockerfile: `FROM`, `RUN` (executa no build e cria uma camada), `COPY` × `ADD` (o ADD também baixa URLs e extrai tar), `CMD` (comando padrão, sobrescrevível) × `ENTRYPOINT` (executável fixo; o CMD vira argumento dele), `ENV`, `ARG` (só no build), `EXPOSE` (apenas documenta a porta, não publica), `WORKDIR`, `USER`, `VOLUME`. Também caem *multi-stage build*, **volumes** × *bind mounts*, redes `bridge` (padrão), `host`, `none` e `overlay` (Swarm), e o **Docker Compose**. **Kubernetes**: o **plano de controle** tem `kube-apiserver`, **etcd** (estado do cluster), `kube-scheduler` e `kube-controller-manager`; nos **nós** rodam `kubelet`, `kube-proxy` e o runtime (containerd). Objetos: **Pod** (menor unidade; 1 ou mais contêineres que compartilham rede e IP), ReplicaSet, **Deployment** (*rolling update* e *rollback*), **StatefulSet** (identidade e armazenamento estáveis, para bancos), **DaemonSet** (um pod por nó, para agentes de log e monitoramento), Job/CronJob, **Service** (`ClusterIP` padrão interno, `NodePort`, `LoadBalancer`, `ExternalName`), **Ingress** (roteamento HTTP L7, usa um *ingress controller*), **ConfigMap** × **Secret** (o Secret é só **base64**, não é cifrado por padrão), Namespace e **PV/PVC**. Também caem *probes* (*liveness*, *readiness*, *startup*) e o HPA (autoescala). **Rancher** (SUSE) é a plataforma de **gestão multi-cluster** de Kubernetes, com UI, RBAC, catálogo e as distribuições RKE2/K3s.
**Por que estudar isso:** é [A+T] pela PDPJ-Br e [T] pela seção de Nuvem.
**Alerta de Pegadinha:** dizer que o `EXPOSE` publica a porta no host (quem publica é o `-p`); dizer que o Secret é criptografado por padrão; confundir *liveness* (reinicia o contêiner) com *readiness* (tira o pod do balanceamento).
**Ação Prática:** escreva um Deployment com 3 réplicas, um Service ClusterIP e um Ingress para uma API Spring Boot.

---

### 🎯 Assunto: Computação em Nuvem e Serverless [T]
**O que estudar obrigatoriamente:** o **NIST SP 800-145** define **5 características** (autoatendimento sob demanda, amplo acesso à rede, **pool de recursos**, **elasticidade rápida** e **serviço medido**), **3 modelos de serviço** (IaaS, PaaS, SaaS) e **4 modelos de implantação** (**privada**, **comunitária**, **pública** e **híbrida**). Na **responsabilidade compartilhada**, quanto mais alto o modelo (IaaS → PaaS → SaaS), menos o cliente gerencia. Mas **dados e identidades são sempre do cliente**. **Serverless**: o provedor gerencia servidores e escala, a cobrança é **por execução** e o modelo é orientado a eventos. **FaaS** são funções efêmeras e sem estado (AWS Lambda, Azure Functions), com o problema do *cold start*. **BaaS** são backends gerenciados. O **Serverless Framework** é uma ferramenta *open source* que define funções, eventos e recursos num `serverless.yml` e faz o deploy para vários provedores (é infraestrutura como código).
**Por que estudar isso:** é item exclusivo do Técnico (6.13 e "noções de serverless" em 6.1).
**Alerta de Pegadinha:** dizer que serverless "não tem servidor" (tem, mas é gerenciado pelo provedor); classificar elasticidade como modelo de serviço; esquecer a nuvem **comunitária**.
**Ação Prática:** tabela IaaS × PaaS × SaaS com "quem gerencia o quê" (rede, SO, runtime, aplicação, dados).

---

### 🎯 Assunto: Proxy Reverso, SSL Offloading e Balanceamento de Carga [T]
**O que estudar obrigatoriamente:** o **proxy direto** (*forward*) fica do lado do **cliente** (controle e cache de saída, e anonimiza o cliente). O **proxy reverso** fica do lado do **servidor** e recebe as requisições em nome dos *backends* (Nginx, HAProxy, Apache `mod_proxy`, IIS ARR), oferecendo ocultação dos servidores, cache, compressão, WAF e roteamento. No **SSL/TLS offloading** (terminação), o proxy ou balanceador decifra o TLS e encaminha em HTTP para o backend, aliviando a CPU dos servidores e centralizando os certificados. No **bridging** (re-encryption), ele decifra, inspeciona e cifra de novo. No **passthrough**, ele repassa o TLS sem decifrar (atua em L4 e não inspeciona). O **balanceamento L4** (TCP/UDP, por IP e porta) é mais rápido; o **L7** (HTTP) roteia por URL, cabeçalho ou cookie. Algoritmos: **round robin**, ponderado, **least connections**, **IP hash** e menor tempo de resposta. Completam o tema: *health checks*, **sessões persistentes (sticky)** e alta disponibilidade (ativo-ativo × ativo-passivo, VRRP).
**Por que estudar isso:** são itens nominais do Técnico.
**Alerta de Pegadinha:** dizer que, no passthrough, o balanceador inspeciona o HTTP; confundir proxy direto com reverso; achar que o offloading cifra a comunicação até o backend.
**Ação Prática:** escreva um bloco `upstream` do Nginx com 3 servidores, `least_conn` e terminação TLS.

---

## 🧩 Sistemas Operacionais: Versões do Edital 2026 [A]

### 🎯 Assunto: Windows Server 2022 e 2025; Windows 10/11; AD, PowerShell e WSUS ⚠️ conferir
**O que estudar obrigatoriamente:** o **Windows Server 2022** trouxe o ***Secured-core server*** (TPM 2.0, *Secure Boot*, VBS/HVCI), **TLS 1.3 habilitado por padrão**, **DNS sobre HTTPS** no cliente, **SMB com AES-256**, **SMB over QUIC** e *hotpatching* (nas edições Azure). O **Windows Server 2025** trouxe *hotpatching* também **on-premises** (via Azure Arc), o **SMB over QUIC** em todas as edições e um **AD DS** com novo nível funcional, páginas de banco de 32k, maior segurança LDAP e **dMSA** (*delegated Managed Service Accounts*). Também melhorou o **Windows LAPS** e o desempenho de NVMe e Hyper-V. Edições: Standard × Datacenter, além da instalação **Server Core** (sem GUI, menor superfície de ataque). Base que continua: **AD DS** (floresta, domínio, OU, **GPO** com a ordem **LSDOU**: Local, Site, Domínio, OU), funções FSMO, catálogo global e Kerberos; **PowerShell** (cmdlets **Verbo-Substantivo**, pipeline de **objetos**, `Get-Help`, `Get-Command`, `Get-Member`, *execution policy*, *remoting* com `Enter-PSSession`/`Invoke-Command`); **WSUS** (aprovação de atualizações, grupos de computadores, GPO apontando para o servidor, sincronização com o Microsoft Update). Windows 11: requisitos (TPM 2.0, *Secure Boot*), BitLocker e Windows Hello.
**Por que estudar isso:** o guia de SO vai só até o Server 2019, e o edital cita 2019, 2022 e 2025.
**Alerta de Pegadinha:** errar a ordem de aplicação de GPO (LSDOU: a **OU** prevalece, por ser aplicada por último); dizer que o PowerShell trafega texto no pipeline (ele trafega objetos .NET).
**Ação Prática:** liste 3 novidades do 2022 e 3 do 2025 e confira na documentação da Microsoft ("What's new in Windows Server").

---

### 🎯 Assunto: Linux Red Hat e Oracle Linux [A]
**O que estudar obrigatoriamente:** família RPM: **`dnf`** (sucessor do `yum`; `dnf install`/`update`/`remove`/`search`/`info`/`history`/`module`) e `rpm -qa`/`-qi`/`-ql`/`-qf`. Serviços com **systemd**: `systemctl start`/`stop`/`enable`/`status`, alvos `multi-user.target` × `graphical.target` e logs com `journalctl -u <unidade>`. Firewall com **firewalld**: `firewall-cmd --add-service=http --permanent` e depois `--reload`; zonas. **SELinux**: modos `enforcing`/`permissive`/`disabled`; `getenforce`, `setenforce 0|1`, `/etc/selinux/config`; contextos (`ls -Z`, `restorecon`, `semanage`). Rede com `nmcli`. Armazenamento com **LVM** (PV → VG → LV) e XFS como sistema de arquivos padrão. **RHEL**: `subscription-manager`. **Oracle Linux**: compatível binariamente com o RHEL, oferece o kernel **UEK** (*Unbreakable Enterprise Kernel*) além do RHCK, e o **Ksplice** (atualização do kernel **sem reboot**). Usuários: `useradd`, `usermod -aG`, `passwd`, `/etc/passwd`, `/etc/shadow`, `sudo` e `/etc/sudoers` (editado com `visudo`).
**Por que estudar isso:** o edital do Analista especifica Red Hat e Oracle Linux, que são distros da família RPM.
**Alerta de Pegadinha:** usar `apt` em RHEL; esquecer o `--permanent` (sem ele, a regra some no reload); dizer que `setenforce 0` desativa o SELinux (ele só passa para **permissive**).
**Ação Prática:** escreva a sequência para publicar o Apache num RHEL: instalar, habilitar, liberar no firewalld e ajustar o SELinux.

---

## 🧩 Redes: Itens Novos ou Atualizados

### 🎯 Assunto: Wi-Fi 5, 6/6E e 7 (802.11ac/ax/be) e 802.1X [A; ax = T]
**O que estudar obrigatoriamente:**

| Padrão | Nome | Faixas | Destaques |
|---|---|---|---|
| **802.11ac** | Wi-Fi 5 | **só 5 GHz** | canais de até 160 MHz, **256-QAM**, MU-MIMO **só downlink** (wave 2) |
| **802.11ax** | Wi-Fi 6 / **6E** | 2,4 e 5 GHz (o **6E** adiciona **6 GHz**) | **OFDMA**, MU-MIMO up e down, **1024-QAM**, **TWT** (economia de bateria), **BSS coloring**; WPA3 obrigatório na certificação |
| **802.11be** | Wi-Fi 7 | 2,4, 5 e 6 GHz | canais de **320 MHz**, **4096-QAM**, **MLO** (*Multi-Link Operation*: vários enlaces e faixas ao mesmo tempo), multi-RU |

O acesso ao meio é **CSMA/CA**, e não CSMA/CD. O **802.1X** é o controle de acesso **por porta**, com três papéis: **suplicante** (cliente), **autenticador** (switch ou AP) e **servidor de autenticação** (RADIUS). Usa **EAP**, e o **EAPOL** é o EAP sobre a LAN, entre suplicante e autenticador. Métodos: EAP-TLS (certificado nos dois lados), PEAP e EAP-TTLS (túnel TLS). **Família 802.3**: 802.3u (100 Mb/s), 802.3z (1 Gb/s em fibra), 802.3ab (1000BASE-T), 802.3ae (10 Gb/s) e PoE: **802.3af** (15,4 W), **802.3at** (PoE+, 30 W) e **802.3bt** (60 a 90 W). **STP (802.1D)**: eleição da **root bridge** pelo menor Bridge ID (prioridade + MAC); estados *blocking*, *listening*, *learning* e *forwarding*; convergência de 30 a 50 s. **RSTP (802.1w)**: estados *discarding*, *learning* e *forwarding*; papéis *root*, *designated*, *alternate* e *backup*; convergência rápida.
**Por que estudar isso:** o guia de Redes não tem o 802.11be e trata o 802.11ax de forma superficial.
**Alerta de Pegadinha:** dizer que o 802.11ac opera em 2,4 GHz; atribuir a OFDMA ao Wi-Fi 5; confundir o autenticador (switch ou AP) com o servidor de autenticação (RADIUS).
**Ação Prática:** decore a tabela acima. É a questão mais provável de Wi-Fi.

---

### 🎯 Assunto: NAT, AAA e Codificação de Sinal [T]
**O que estudar obrigatoriamente:** **NAT**: **estático** (1 IP privado ↔ 1 IP público fixo, usado para publicar servidores), **dinâmico** (um *pool* de IPs públicos) e **PAT/NAT overload** (muitos IPs privados ↔ 1 público, diferenciados por **porta**; é o NAT doméstico). O NAT quebra a conectividade fim a fim e atrapalha o IPSec AH. As faixas privadas são as da **RFC 1918** (10/8, 172.16/12, 192.168/16). **AAA**: **Autenticação** (quem é), **Autorização** (o que pode) e ***Accounting*/Auditoria** (o que fez). O **RADIUS** usa **UDP** 1812/1813, junta autenticação e autorização e cifra **só a senha**. O **TACACS+** (Cisco) usa **TCP 49**, **separa** as três funções e cifra o **pacote inteiro**, por isso é preferido para administrar equipamentos. **Codificação de linha**: **NRZ-L** e **NRZ-I** (sem transição garantida, perdem o sincronismo em sequências longas); **Manchester** (transição **no meio** de cada bit, autossincronizante, usada no **Ethernet 10 Mb/s**); **Manchester diferencial** (Token Ring); **AMI bipolar**; **4B/5B** (com MLT-3 no **100BASE-TX**); **8B/10B** (Gigabit em fibra); **PAM-5** (**1000BASE-T**).
**Por que estudar isso:** são itens nominais do Técnico, ausentes dos guias anteriores.
**Alerta de Pegadinha:** dizer que o RADIUS usa TCP; dizer que o PAT usa um IP público por host; atribuir o Manchester ao Fast Ethernet.
**Ação Prática:** desenhe o sinal Manchester e o NRZ-I para os bits `1011 0001`.

---

### 🎯 Assunto: Servidores Web e de Aplicação: Apache, IIS, JBoss EAP/WildFly [A; JBoss/WildFly = A+T]
**O que estudar obrigatoriamente:** **Apache HTTP Server**: `httpd.conf`, **VirtualHost** (por nome ou por IP), módulos (`mod_ssl`, `mod_proxy`, `mod_rewrite`), `.htaccess`, **MPMs** (`prefork` com processos, `worker` com threads e `event`), logs `access_log`/`error_log` no *Combined Log Format*. **IIS**: sites, **bindings** (protocolo + IP + porta + host), ***application pools*** (isolamento de processo w3wp.exe), `web.config` e **ARR** + URL Rewrite para proxy reverso. **JBoss EAP** (a versão com suporte Red Hat) e **WildFly** (a comunitária, *upstream*): servidores **Jakarta EE completos**, enquanto o Tomcat é só um contêiner web. Modos **standalone** (`standalone.xml`) × **domain** (gestão centralizada de vários servidores com *domain controller* e *host controllers*). Organizados em **subsistemas** (Undertow como web server, datasources, messaging, security/Elytron), com porta HTTP **8080**, console de administração na **9990**, CLI `jboss-cli.sh` e implantação na pasta `deployments/` (marcadores `.dodeploy`/`.deployed`) ou via CLI. Também entra o gerenciamento de usuários (`add-user.sh`) e os logs (`server.log`).
**Por que estudar isso:** itens nominais em Redes [A] e em Web [T], ausentes dos guias com esse detalhe.
**Alerta de Pegadinha:** dizer que o WildFly é a versão paga (a com suporte é o EAP); confundir o modo domain com cluster (domain é **gestão** centralizada; cluster é **alta disponibilidade**).
**Ação Prática:** escreva um VirtualHost Apache com `ProxyPass` para um WildFly na 8080.

---

### 🎯 Assunto: Monitoramento e Logs: Zabbix, Prometheus, Grafana, ELK e Fluentd [A; ELK = T]
**O que estudar obrigatoriamente:** **Zabbix**: arquitetura com server, banco, frontend, **proxy** (para sites remotos) e **agent** (modo **passivo**, em que o server consulta, ou **ativo**, em que o agent envia). Conceitos: **itens** (métricas), **triggers** (expressões de alerta), **actions**, **templates**, **hosts**. Também coleta via SNMP, IPMI e JMX. **Prometheus**: modelo **pull** (raspa o endpoint `/metrics`), **exporters** (node_exporter), séries temporais com **labels**, a linguagem de consulta **PromQL**, o **Alertmanager** (deduplica e roteia alertas) e o **Pushgateway** (para jobs curtos que não podem ser raspados). **Grafana**: visualização e *dashboards* sobre várias fontes de dados (Prometheus, Elasticsearch, Zabbix, Loki); não armazena métricas. **ELK**: **E**lasticsearch (busca e indexação; índice → **shards** primários e **réplicas**, documentos JSON, índice invertido, API REST), **L**ogstash (pipeline **input → filter (grok, mutate) → output**) e **K**ibana (visualização e descoberta). Com os **Beats** (coletores leves, como o Filebeat), vira o Elastic Stack. **Fluentd**: coletor de logs da CNCF, a "camada unificada de logging", com plugins de input, filter e output. O **Fluent Bit** é a versão leve. EFK é a pilha Elasticsearch + Fluentd + Kibana, comum em Kubernetes. **SNMP**: agente e gerente, **MIB/OID**, portas **161** (consultas) e **162** (traps); v1/v2c usam *community* em texto claro, e a **v3** tem autenticação e criptografia (USM).
**Por que estudar isso:** o Analista cita todas as ferramentas nominalmente, e o Técnico cobra o ELK.
**Alerta de Pegadinha:** dizer que o Prometheus usa *push* por padrão; achar que o Grafana coleta métricas; trocar as portas do SNMP; dizer que o Logstash armazena e indexa (quem faz isso é o Elasticsearch).
**Ação Prática:** desenhe duas pilhas, "métricas" (exporter → Prometheus → Alertmanager / Grafana) e "logs" (Filebeat/Fluentd → Logstash → Elasticsearch → Kibana).

---

# ✅ Observações finais

- **Rebaixados** do edital antigo nesta área: VoIP, roteamento OSPF/BGP/RIP, armazenamento (RAID/SAN/Fibre Channel) e virtualização (Hyper-V/VMware/KVM).
- Para o **Técnico**: este guia vale em Git/Gitflow/GitLab, CI/CD, Docker/K8s, Nuvem, proxy reverso, NAT/AAA/codificação, Wi-Fi 6, JBoss/WildFly e ELK. Windows Server, Linux, Zabbix/Prometheus e o 802.11be são **só do Analista**.
