# 📘 Guia de Estudo Direcionado e Prescritivo — Sistemas Operacionais (TRT 4ª Região)

> ## 📌 Status no Edital TRT4 nº 01/2026 (FCC)
> Legenda: **[A+T]** cai nos dois cargos · **[A]** só Analista TI (14) · **[T]** só Técnico TI (22). Referência completa: guia **Mapa do Edital 2026**.
>
> ✅ **Válido, todo [A]:** processos e threads, escalonamento, comunicação e sincronização, deadlock e starvation; memória (segmentação, paginação, memória virtual); E/S; Linux (comandos, permissões, usuários, systemd, pacotes RPM/DNF); Active Directory, PowerShell, WSUS; Windows 10/11.
>
> ⚠️ **Desatualizado:** o edital pede **Windows Server 2019, 2022 e 2025** (este guia vai até 2019) e **Red Hat / Oracle Linux** (priorize RPM/DNF/systemd e deixe APT e YaST em segundo plano). Ver o guia **DevOps, Infra e Redes 2026**.
>
> ✅ **Containers (Docker/Kubernetes):** valem como **[A+T]** pela PDPJ-Br, e Nuvem/IaaS/PaaS/SaaS e serverless como **[T]**.
>
> ⬇️ **Rebaixar:** Hyper-V, VMware, Xen, KVM, RDS/RemoteApp/App-V, failover cluster/NLB, sistemas de arquivos ReiserFS/JFS.
>
> ⚠️ O **Técnico não tem SO** no edital. Este guia inteiro serve só ao Analista.

---


> Gerado cruzando a seção "13. Sistemas Operacionais" do conteúdo programático oficial (`conteudo_programatico.md`) com **621 questões** de Sistemas Operacionais da FCC em `questoes_sistemas_operacionais_fcc.json`, pré-digeridas em 5 partes (`guia_estudos_subagentes/raw_md/39_sistemas_operacionais_parteN_de_5.md`).

**Recorte deste guia:** o edital resume a seção em "Conceitos Gerais (processos, threads, escalonamento, memória virtual, paginação, segmentação), Windows (10+, AD, RDS, Failover Cluster, WSUS, PowerShell) e Linux (RPM, DEB, Systemd, LVM, IPTables, Bash, Python)". O banco real é mais amplo e mais "histórico" do que esse resumo sugere: cobre praticamente toda a linha Windows Server desde 2003 até 2019 e Windows desktop de XP a 11, um volume enorme de comandos e sintaxe exata de Linux/Unix (não só conceito), virtualização Microsoft e VMware/Xen/KVM/containers em profundidade, e Cloud Computing (NIST SP 800-145). Active Directory sozinho é o subtema mais cobrado do banco inteiro.

**Nota sobre gabaritos a conferir:** este é, disparadamente, o lote com mais divergências documentadas de gabarito entre todos os já processados neste projeto — a Parte 3/5 tem uma seção dedicada no `raw_md` listando **15 casos** de gabarito que contradiz a própria explicação dos comentários da questão. Os mais relevantes, distribuídos pelas 5 partes:
- **Suspensão de processo com `Ctrl+Z`**: duas questões quase idênticas (`566714`, `444500`) têm gabarito registrado apontando teclas/sequências sem sentido técnico ("Alt+z", "Alt+F7, Ctrl+c"), enquanto todos os comentários confirmam `Ctrl+Z` (suspende) + `bg`/`fg` (retoma) como a resposta tecnicamente correta.
- **Permissão simbólica `rw-r--r--`**: gabarito aponta uma letra que não corresponde à decomposição correta (dono=rw-, grupo=r--, outros=r--) feita nos próprios comentários (`613083`).
- **`uname -a`**: gabarito registrado cita um comando inexistente ("kernel -x"), enquanto todos os comentários confirmam `uname -a` como a resposta certa (`784412`).
- **WoW64 x UAC**: gabarito marca UAC, mas o enunciado e todos os comentários descrevem exclusivamente o WoW64 (camada de emulação de 32 bits em Windows 64 bits) (`586687`).
- **VMware — função do DRS**: gabarito atribui ao DRS uma função que tecnicamente pertence ao DPM (Distributed Power Management), e mesmo assim aplicada a hosts, não a VMs (`998273`).
- **"Virtualização completa" — definição**: gabarito marca "emulação de hardware" como definição de virtualização completa; comentários com fonte técnica defendem "replicação de hardware" (`854148`).
- **YaST x "Control Center"**: gabarito marca "Control Center" para a ferramenta de instalação/configuração do openSUSE/SUSE, mas é o YaST — confirmado por todos os comentários e pela documentação oficial do projeto (`302263`).
- **Integração Samba 4 como Domain Controller do AD**: gabarito considera essa integração "impossível", afirmação tecnicamente questionável já que o Samba 4 foi desenhado para prover essa função (`494995`).
- Outros casos pontuais (requisitos do Windows Server 2016 trocados entre alternativas, comando `dsadd user` marcado como errado em favor de "usradd" inexistente, SSD/Trim trocado por Blu-ray) estão listados em detalhe nos `raw_md` de origem — vale a pena reler a lógica técnica em vez de decorar cegamente a letra creditada nessas questões específicas.

---

## 🧩 Windows Server — Active Directory

### 🎯 Assunto: AD DS — Estrutura Lógica e Física, Schema e Catálogo Global
**O que estudar obrigatoriamente:** a estrutura lógica do AD segue **Floresta > Árvore(s) de Domínio > Domínio > Unidades Organizacionais**; a física é **Domain Controllers + Sites**. O **Schema** é único por floresta (não por domínio), define classes de objetos/atributos/restrições/formato de nomes, é replicado para todos os DCs mas só alterado no DC designado **Schema Master**. O **Catálogo Global** permite localizar objetos independentemente do domínio que os contém (não é "local" nem restrito a administradores) — em modelo de domínio único, todos os DCs podem ser catálogo global, dispensando planejamento de posicionamento. Cada objeto de segurança recebe **SID e GUID exclusivos**; ao excluir e recriar uma conta com o mesmo nome, ela **não herda** permissões/grupos da conta antiga (o SID é novo). GPOs se aplicam na ordem **Sites → Domínios → OUs**; uma diretiva que precise atingir todos os domínios de uma floresta deve ser configurada no nível de **Site**. O Global Catalog Server resolve o **UPN** (`usuario@dominio.com`) no logon quando o DC local não conhece a conta. AD CS emite/gerencia certificados com registro automático e verificação via OCSP.
**Por que estudar isso:** Active Directory é o subtema isolado mais cobrado do banco inteiro de Sistemas Operacionais, presente em praticamente todas as 5 partes com dezenas de questões.
**Alerta de Pegadinha:** achar que o Schema pode variar por domínio dentro da mesma floresta (é único por floresta); achar que o Catálogo Global é "local"; esquecer que GPO de escopo de floresta inteira vai no nível de Site, não de Domínio; achar que uma conta recriada herda o SID/permissões da conta antiga.
**Ação Prática:** desenhe a hierarquia Floresta→Árvore→Domínio→OU (lógica) e DC+Sites (física) lado a lado; escreva de memória "GPO: Site→Domínio→OU" três vezes.

---

### 🎯 Assunto: AD DS — Arquivos Internos, KRBTGT, Grupos Administrativos e Escopo
**O que estudar obrigatoriamente:** o banco de dados do AD é o **NTDS.dit** (`%SystemRoot%\NTDS\`), acompanhado de `Edb.log`/`Edb.chk` (transações/checkpoint) e `Res1.log`/`Res2.log` (reserva de espaço para gravação segura com disco cheio). A conta **KRBTGT** é criada automaticamente na criação do domínio e cifra o TGT (Ticket-Granting Ticket) do Kerberos com chave derivada de sua própria senha. Os **4 grupos administrativos** confidenciais: Administradores de Domínio (**global**, por domínio), Administradores (**domínio local**, BUILTIN, todo computador da floresta), Administradores de Esquema (**universal**, domínio raiz, mexe no schema) e Administradores Corporativos/Enterprise Admins (**universal**, domínio raiz, qualquer tarefa em qualquer lugar da floresta). O **escopo de um grupo** (local/global/universal) é escolhido explicitamente na criação — **não** é definido pelo container onde o grupo é criado. Grupos de **segurança** concedem acesso a recursos; grupos de **distribuição** só servem para e-mail, sem função de segurança.
**Por que estudar isso:** decoreba de tabela de alta recorrência — a FCC embaralha sistematicamente escopo, container e poder de cada grupo administrativo em quase toda parte do lote.
**Alerta de Pegadinha:** confundir os 4 grupos administrativos entre si; achar que o escopo do grupo é definido pelo container "Usuários"; confundir grupo de segurança com grupo de distribuição; trocar NTDS.dit por Edb.log ou vice-versa.
**Ação Prática:** monte a tabela dos 4 grupos administrativos com 3 colunas (escopo, container, poder); decore a localização e função de cada um dos 5 arquivos do AD DS.

---

### 🎯 Assunto: AD DS — GPO, Comandos de Linha (dsadd/dsmod/dsacls) e Serviços Relacionados
**O que estudar obrigatoriamente:** `dsadd ou "ou=Nome,dc=dominio,dc=com,dc=br"` cria uma OU via linha de comando; `dsmod` **modifica** atributos de objetos já existentes (mnemônico "mod = modificar"); `dsacls objeto /G usuario:permissões` concede ACEs na ACL de um objeto (outros parâmetros: `/E` edita, `/P` substitui, `/R` revoga, `/D` nega). Comandos PowerShell equivalentes: `New-ADOrganizationalUnit` (cria OU), `Get-ADOrganizationalUnit` (consulta), `New-ADGroup`, `Set-ADUser`. Os **5 serviços do AD**: **AD DS** (Domain Services — armazena objetos de rede, login único), **AD CS** (Certificate Services), **AD FS** (Federation Services — SSO web entre organizações), **AD LDS** (Lightweight Directory Services — diretório sem exigir domain controller completo), **AD RMS** (Rights Management Services — controle de acesso a documentos). "ADSS"/"Active Directory Sites and Services" **não** é um serviço da mesma categoria, é apenas um console MMC. Um pré-requisito obrigatório para instalar o AD é o **DNS** disponível (DHCP é só opcional).
**Por que estudar isso:** os 5 serviços do AD e os comandos `ds*` aparecem repetidamente como "identifique o serviço certo pela descrição" — item de alto retorno por decoreba de tabela.
**Alerta de Pegadinha:** trocar as siglas ADCS/ADFS/ADDS/ADLDS/ADRMS entre si; achar que "ADSS" é um serviço válido; confundir `dsadd` (cria) com `dsmod` (modifica).
**Ação Prática:** monte a tabela dos 5 serviços do AD com a função de cada um em uma frase; pratique escrever a sintaxe de `dsadd ou` e `dsacls /G` de memória.

---

### 🎯 Assunto: AD DS — Recursos Avançados (RODC, Lixeira, Domínio Offline, Último Logon)
**O que estudar obrigatoriamente:** o **RODC** (Read-Only Domain Controller) nunca pode ser o primeiro DC de uma floresta. A **Lixeira do AD**, uma vez habilitada, é **irreversível** (não pode ser desabilitada de volta), não exige senha para ativar, e pode ficar instável até todos os DCs da floresta replicarem a mudança; por padrão objetos ficam retidos por 180 dias. O **ingresso em domínio offline** (Windows Server 2008 R2+) permite que um computador entre no domínio sem estar conectado durante a implantação, via arquivo XML gerado pelos administradores — o computador efetivamente ingressa quando **iniciado pela primeira vez**, não "sempre que acessado". O recurso de **último logon interativo** registra 4 componentes: total de falhas de logon, total de falhas após sucesso, horário da última falha e horário do último sucesso — **não registra o IP** de origem (isso exige consulta aos logs de segurança). Ativar o usuário Administrador local nas estações **contraria** boas práticas de segurança do AD.
**Por que estudar isso:** recursos "avançados" do AD que aparecem como distinção fina entre alternativas plausíveis — testam se o candidato conhece o comportamento exato, não só o nome do recurso.
**Alerta de Pegadinha:** achar que a Lixeira do AD pode ser revertida; achar que domínio offline associa "sempre que acessado" (é na primeira inicialização); achar que o último logon registra IP do invasor.
**Ação Prática:** escreva as 4 informações exatas registradas pelo "último logon interativo"; decore que a Lixeira do AD é uma via de mão única.

---

## 🧩 Windows Server — Infraestrutura, Clustering e Atualizações

### 🎯 Assunto: Instalação, Requisitos e Server Core (2008 a 2019)
**O que estudar obrigatoriamente:** o Windows Server 2012/2012 R2 pode instalar em modo **Server Core** (mínimo, menor superfície de ataque, recomendado pela Microsoft, configurado via `sconfig.cmd`) ou **Server With a GUI** (completo); requisito mínimo absoluto de disco é **32 GB**, com espaço **extra** exigido se a RAM ultrapassar 16 GB (paginação/hibernação/dump). Requisitos do **Windows Server 2016**: adaptador de armazenamento **PCI Express**, discos **não-PATA/IDE**, processador **1,4 GHz e 64 bits** (atenção ao gabarito contestado `854145` — decore o conteúdo técnico correto, não necessariamente a letra creditada na base). O **WDS** (Windows Deployment Services) distribui/implanta imagens de instalação pela rede via boot PXE, substituindo o antigo RIS.
**Por que estudar isso:** a FCC transcreve quase literalmente a documentação Microsoft de requisitos por versão, trocando os números entre alternativas como distrator central.
**Alerta de Pegadinha:** trocar o requisito de disco de 32 GB (Server 2012) por outros valores (16/48/64/128 GB); achar que Server Core é a instalação completa (é o oposto — é a mínima).
**Ação Prática:** monte uma tabela de requisitos mínimos (RAM/disco/processador) por versão de Windows Server citada no lote (2008/2012/2016/2019).

---

### 🎯 Assunto: WSUS, Failover Cluster, NLB e Alta Disponibilidade
**O que estudar obrigatoriamente:** o **WSUS** tem modo **Autônomo** (padrão — cada servidor gerencia individualmente idiomas/grupos/aprovações) e modo **Réplica** (copia configurações de um WSUS principal); usa hash **SHA-256** para verificar integridade. Cmdlet `Get-WsusClassification | ... | Set-WsusClassification -Disable` desabilita uma categoria de atualização sem removê-la. No **Windows Server 2003**, dois tipos de clustering: **Serviço de Cluster/Failover** (aplicações **stateful** como bancos de dados, foco em **disponibilidade**) e **NLB/Equilíbrio de Carga de Rede** (aplicações **stateless** como web/FTP/proxy, foco em **escalabilidade**). Três configurações de cluster HA com 2 nós: **Ativo/Passivo** (secundário só assume na falha), **Ativo/Standby** (espera ativa, sincronizado, failover instantâneo) e **Ativo/Ativo** (ambos processam simultaneamente, com balanceamento). O **SMB 3.0** (Server 2012+), núcleo do Scale-Out File Server, trouxe Transparent Failover, Scale Out, Multichannel, Direct, Encryption.
**Por que estudar isso:** confusão clássica entre "disponibilidade" (Failover Cluster) e "escalabilidade" (NLB) é testada repetidamente, junto com os detalhes operacionais do WSUS.
**Alerta de Pegadinha:** trocar o propósito de NLB (escalabilidade, stateless) com Failover Cluster (disponibilidade, stateful); confundir modo Autônomo com Réplica do WSUS.
**Ação Prática:** escreva a diferença NLB×Failover Cluster com um exemplo de aplicação para cada; decore os 3 modelos de cluster HA de 2 nós.

---

### 🎯 Assunto: Terminal Services / RDS, RemoteApp e App-V
**O que estudar obrigatoriamente:** o serviço de Terminal Services é o `Termsrv.exe`, cada conexão recebe um `SessionID` exclusivo. O **Agente de Conexão de Área de Trabalho Remota** (RD Connection Agent/antigo TS Session Broker) reconecta sessões desconectadas ao mesmo host de farm e balanceia carga entre hosts. **RemoteApp** integra aplicações remotas com a área de trabalho local; o **Gateway de Serviços de Terminal** permite acesso remoto via HTTPS amigável a firewalls. `quser` (query user) exibe informações de sessões em um RDS Host — equivalente Windows do `who`/`w` do Linux. Antes de instalar o **App-V Management Server** é preciso criar uma OU dedicada, grupos "AppV Administrators"/"AppV Users" e uma conta de teste de domínio.
**Por que estudar isso:** RDS/Terminal Services é citado explicitamente no edital (Windows — Remote Desktop Services) e aparece com detalhamento técnico de arquitetura em várias questões.
**Alerta de Pegadinha:** confundir Agente de Conexão com "drive migration" (nome sem sentido usado como distrator no gabarito contestado `369116`); esquecer que cada sessão RDS tem `SessionID` próprio.
**Ação Prática:** escreva o papel do RD Connection Agent em uma frase; decore o comando `quser` como equivalente do `who`/`w` Linux.

---

## 🧩 Windows Desktop (XP a 11) — Administração e Segurança

### 🎯 Assunto: Ferramentas Administrativas e Comandos de Prompt/PowerShell
**O que estudar obrigatoriamente:** comandos de prompt recorrentes: `gpupdate /force` (aplica GPO imediatamente, sem esperar o ciclo de 90 min), `net user`/`net user /add` (gestão de contas locais), `ATTRIB +R/+H/+S/+A` (atributos de arquivo — R=Read-only), `assoc` (associações de extensão↔programa), `shutdown -s -t N` (desliga em N **segundos**, `-r` reinicia), `subst` (associa pasta a letra de unidade virtual — não confundir com `attrib`), `sfc` (verifica integridade de arquivos protegidos), `chkdsk` (analisa disco), `cmdkey` (credenciais em cache), `fc` (compara dois arquivos), `driverquery -v`, `robocopy /e` (copia subpastas **incluindo** vazias, diferente de `/s`). PowerShell: `Start-Process Powershell -verb runAs` (abre como admin), `Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First N`, `Enter-PSSession` (sessão remota), `Get-AppxPackage *nome* | Remove-AppxPackage`. Regedit tem **5 hives**: HKEY_CLASSES_ROOT, HKEY_CURRENT_USER, HKEY_LOCAL_MACHINE, HKEY_USERS, HKEY_CURRENT_CONFIG. O Kernel-Power ID 41 (Visualizador de Eventos) indica reinício sem clean shutdown (queda de energia/falha de hardware).
**Por que estudar isso:** volume altíssimo de comandos testados por sintaxe exata (não só conceito) — a FCC troca flags plausíveis como distrator principal.
**Alerta de Pegadinha:** achar que `shutdown -s -t 300` desliga em 300 minutos (são segundos); achar que `-s` reinicia (desliga; `-r` reinicia); confundir `subst` com `attrib`; achar que `ATTRIB +R` define "leitura e gravação" (é somente leitura).
**Ação Prática:** monte um cartão com os 15 comandos de prompt/PowerShell mais citados e a função exata de cada um; treine identificar qual comando gerou uma saída dada.

---

### 🎯 Assunto: NTFS, Permissões e Compartilhamento
**O que estudar obrigatoriamente:** o dono de um arquivo NTFS recém-criado recebe por padrão **Controle Total** (mnemônico "NTFS = coNTrole Total"). Permissões NTFS padrão: Controle Total, Modificar, Ler & Executar, **Listar Conteúdo de Pastas** (só lista nomes, não abre arquivos — distinta de "Ler", que permite abrir), Leitura, Gravação. Quando permissões NTFS **e** de compartilhamento se aplicam a um recurso via rede, prevalece a **mais restritiva** das duas combinadas; localmente, **só NTFS** vale. O **ReFS** (Server 2012+) é mais resiliente a danos mas **não suporta** compactação/criptografia/cotas (recursos exclusivos do NTFS). `convert unidade: /fs:ntfs` converte FAT/FAT32 para NTFS preservando dados, de forma **irreversível** sem reformatação. Compartilhamento de pasta pública ativado no Windows 10 libera acesso a **qualquer um na rede** (não só grupo doméstico); criptografia padrão de compartilhamento é **128 bits** (não 256).
**Por que estudar isso:** distinção fina entre permissões parecidas ("Listar Conteúdo" x "Ler") e a regra de prevalência NTFS×compartilhamento são testadas repetidamente com pequenas variações de cenário.
**Alerta de Pegadinha:** confundir "Listar Conteúdo de Pastas" com "Ler"; esquecer que localmente só NTFS vale; achar que o ReFS suporta os mesmos recursos do NTFS.
**Ação Prática:** escreva a regra de prevalência NTFS×compartilhamento (local vs. rede) em uma frase; monte a tabela das permissões NTFS padrão em ordem de restrição crescente.

---

### 🎯 Assunto: Segurança Nativa do Windows (Defender, Sandbox, WDAC/AppLocker, RDP/NLA)
**O que estudar obrigatoriamente:** **Windows Defender Antivírus** verifica arquivos/corrige ameaças/gera relatórios nativamente. **Windows Sandbox** (Pro/Enterprise) executa apps em ambiente isolado/descartável (tudo apagado ao fechar) — distinto de Área de Trabalho Virtual (compartilha riscos do SO). **WDAC** é recomendado quando todos os dispositivos já são Windows 10 1903+/11/Server 2016+ e o foco é segurança uniforme; **AppLocker** (desde Windows 7) é preferível em **ambiente misto de versões**, com políticas diferenciadas por usuário/grupo. Para RDP seguro, garantir apenas conexões com **NLA** (Network Level Authentication) habilitadas. Restringir acesso a pasta sigilosa: Propriedades > Segurança > Editar, ajustando ACL por usuário (não só Compartilhamento Avançado). Os 3 tipos de conta no Windows 7: Padrão, Administrador, Convidado.
**Por que estudar isso:** cenários de "qual ferramenta de segurança usar" são recorrentes, testando a diferença fina entre soluções parecidas (WDAC×AppLocker, Sandbox×VM).
**Alerta de Pegadinha:** achar que WDAC é a opção certa em ambiente misto (é AppLocker); achar que RDP seguro dispensa NLA.
**Ação Prática:** escreva o critério de decisão WDAC×AppLocker em uma frase (versão uniforme vs. ambiente misto).

---

## 🧩 Linux — Comandos, Permissões e Usuários

### 🎯 Assunto: Comandos Essenciais e Manipulação de Arquivos
**O que estudar obrigatoriamente:** `ls -la` (lista tudo incluindo ocultos, com permissões/tamanho/dono); `ls -i`/`ls -li` (número de inode); `df -h`/`du -ahc` (espaço livre por partição × espaço usado por arquivo/diretório — **não confundir os dois**); `cp -p` (preserva atributos); `tar -xvzf` (extrai gzip); `dd if=/of=/conv=noerror,sync` (copia disco bit a bit); `grep -i` (case-insensitive); `find . -name` × `find / -name` (busca relativa × absoluta); `apropos`/`man -k` (busca por palavra-chave, equivalente a `man -f`/`whatis`); `stat` (mostra campos do inode: Type, User, Blockcount, entre outros); `mount -t <tipo>` (especifica sistema de arquivos); `blkid` (identifica partição/UUID); `who`/`w`/`whoami` (usuários logados); `top` (dinâmico) × `ps` (estático — foto do momento); `Ctrl+Z` (suspende, SIGTSTP) + `bg`/`fg` (retoma em background/foreground); `kill -9`/SIGKILL (força encerramento, não pode ser ignorado) × `kill -15`/SIGTERM (pede educadamente) × `killall` (mata por **nome**, não PID).
**Por que estudar isso:** é o bloco de maior volume absoluto do lote inteiro — Linux sozinho responde por 208 das 621 questões, com foco em sintaxe exata de comando, não conceito abstrato.
**Alerta de Pegadinha:** trocar `du` por `df` (e vice-versa); achar que `ps` atualiza dinamicamente (é `top` que faz isso); confundir `kill` (por PID) com `killall` (por nome); esquecer que `Ctrl+Z` **suspende**, não mata (quem mata é `kill -9` ou `Ctrl+C`/SIGINT).
**Ação Prática:** monte uma tabela dos 20 comandos mais citados com sintaxe exata e uma frase de função; pratique decompor uma saída de `ls -la`/`stat` campo a campo.

---

### 🎯 Assunto: Permissões (chmod/umask), Usuários e Arquivos de Autenticação
**O que estudar obrigatoriamente:** notação octal do `chmod`: r=4, w=2, x=1, somados por classe (dono-grupo-outros) — `754` = `rwxr-xr--`, `644` = `rw-r--r--`, `700` = `rwx------`. **`umask`** define a máscara **padrão para novos** arquivos/diretórios (diferente de `chmod`, que altera arquivo já existente) — calcula-se subtraindo a permissão desejada da máxima (**777** para diretórios, **666** para arquivos); `umask 077` restringe novos diretórios só ao dono. `useradd -g grupo -s shell -d home -c comentário -e data_expiração -m` (cria home); `usermod -a -G grupo` (adiciona a grupo suplementar **sem remover** dos demais); `passwd` (usuário troca a própria senha) × `passwd -l/-u/-e` (bloqueia/desbloqueia/força expiração) × `chage` (root define expiração) × `chfn` (campo GECOS). `/etc/passwd` guarda `nome:senha:UID:GID:gecos:home:shell` (campo senha = "x" indica hash real em `/etc/shadow`, acessível só ao root); grupos têm equivalente `/etc/group`/`/etc/gshadow`. **SELinux** implementa MAC (Mandatory Access Control), **complementar** ao DAC tradicional (`chmod`/`chown`), restringe até o root quando a política nega. **PAM** (`retry=N minlen=N difok=N`) configura política de senha centralizada. `sudo` (controlado por `/etc/sudoers`) permite execução privilegiada mediante autenticação.
**Por que estudar isso:** conjunto de comandos com maior densidade de repetição quase idêntica no lote (dezenas de variações da mesma pergunta sobre chmod/umask/useradd) — item de altíssimo retorno.
**Alerta de Pegadinha:** confundir `chmod` (altera existente) com `umask` (define padrão de novos); trocar `/etc/passwd` (metadados) com `/etc/shadow` (hash de senha) ou inverter `/etc/group`/`/etc/gshadow`; achar que SELinux é um firewall de rede.
**Ação Prática:** pratique conversão simbólica↔octal em 5 exemplos até automatizar; calcule `umask` a partir de uma permissão-alvo dada.

---

## 🧩 Linux — Pacotes, Boot e Processos

### 🎯 Assunto: Gerenciamento de Pacotes (RPM/YUM/DNF/APT/dpkg/YaST)
**O que estudar obrigatoriamente:** família **Debian/Ubuntu**: `dpkg -r` (remove mantendo config) × `dpkg -P`/Purge (remove tudo); `apt-get update` (atualiza lista) × `apt-get upgrade` (atualiza pacotes instalados) × `apt-get install` × `apt-get remove` (mantém config) × `apt-get purge` (remove config também). Família **Red Hat/CentOS/Fedora**: `yum install/remove/check-update`, sucedido por `dnf` (mais moderno, mesma lógica); `rpm -i` (instala novo) × `rpm -U`/Upgrade (instala **ou** atualiza, maiúsculo, case-sensitive) × `rpm -F` (só atualiza se já existir versão anterior) × `rpm -q -a` (lista tudo instalado) × `rpm -e` (desinstala); flags úteis: `--excludedocs` (sem documentação), `--ignoreos` (ignora incompatibilidade de SO). Outras famílias: **YaST/Zypper** (SUSE/openSUSE), **Pacman** (Arch). Legado: `up2date --nox` (Red Hat Network sem GUI).
**Por que estudar isso:** a banca sempre indica a distribuição-base no enunciado (pista definitiva) e testa se o candidato sabe o gerenciador correto para cada família — erro clássico é trocar `apt-get` por `yum`.
**Alerta de Pegadinha:** usar `yum` em contexto Debian ou `apt-get` em contexto Red Hat; confundir `rpm -U` (maiúsculo, upgrade-or-install) com `-u` minúsculo (não existe com esse efeito); confundir `remove` (mantém config) com `purge` (remove config).
**Ação Prática:** monte a tabela família-de-distro→gerenciador-padrão (Debian→APT/dpkg, RedHat→YUM/DNF/RPM, SUSE→YaST/Zypper, Arch→Pacman) e memorize.

---

### 🎯 Assunto: Boot, Runlevels, GRUB e Systemd
**O que estudar obrigatoriamente:** runlevels SysV: **0**=halt, **1**(ou S)=monousuário/manutenção (sem rede), **2**=multiusuário sem rede, **3**=multiusuário texto com rede, **4**=indefinido/customizável, **5**=multiusuário gráfico (X), **6**=reboot. O **GRUB** suporta múltiplos SOs e sistemas de arquivos, concorrente histórico do LILO. No **RHEL 7+**, o **systemd** substituiu o `init`, trazendo paralelização de boot, ativação sob demanda, controle de processos; `systemctl enable --now serviço` combina habilitação futura + início imediato; `systemctl status/restart/enable` gerenciam serviços (substituindo `service`/`chkconfig`). Estrutura padrão de diretórios (FHS): `/bin` (binários para qualquer usuário), `/sbin` (binários de administração, root — `fdisk`, `route`), `/boot` (bootloader), `/etc` (configuração), `/dev` (dispositivos), `/proc` (sistema de arquivos **virtual**, arquivos de 0 bytes, dados do kernel em tempo real — não confundir com `/dev`).
**Por que estudar isso:** runlevels e FHS são decoreba pura de altíssima recorrência — a FCC ainda cobra fortemente o modelo SysV clássico apesar do edital citar Systemd.
**Alerta de Pegadinha:** trocar runlevel 1 (monousuário) com 0 (halt) ou 3 (multiusuário com rede); confundir `/bin` com `/sbin`; confundir `/proc` (virtual) com `/dev` (dispositivos reais).
**Ação Prática:** decore a tabela de runlevels 0-6 completa; monte a lista dos diretórios FHS mais cobrados com um exemplo de arquivo/comando típico de cada.

---

### 🎯 Assunto: Processos no Linux (ps/top/kill/nice/renice) e Bash Scripting
**O que estudar obrigatoriamente:** `ps aux`/`ps -ef` (todos os processos de todos os usuários); opções combináveis do `ps`: `a` (todos os usuários do terminal), `x` (sem terminal controlador), `u` (usuário+hora), `f` (árvore pai/filho), `e` (variáveis de ambiente). `nice` define prioridade **antes** do processo iniciar (faixa -20 a +19); `renice` altera prioridade de processo **já em execução** — fórmula PR = 20 + NI. Sinais: SIGKILL (`kill -9`, força, não pode ser ignorado), SIGTERM (`kill -15`, pede encerramento), SIGHUP (`kill -1`, recarrega config), SIGTSTP (`Ctrl+Z`, suspende). Shebang `#!/bin/bash` na primeira linha de script; `chmod +x script && ./script` para executar; aspas simples (literal) × aspas duplas (interpola variáveis) × crases/`$(...)` (executa e captura saída); aritmética em bash usa `$((expressão))`, não `c++` nem concatenação de string.
**Por que estudar isso:** pares de comandos "quase sinônimos" (nice/renice, kill/killall) são a armadilha mais repetida do bloco de processos Linux.
**Alerta de Pegadinha:** confundir `nice` (antes de iniciar) com `renice` (processo já rodando); achar que `Ctrl+Z` mata o processo (suspende); achar que bash não diferencia aspas simples de duplas (diferencia).
**Ação Prática:** escreva a fórmula PR=20+NI e calcule 3 exemplos; pratique um script bash simples com shebang, parâmetros posicionais (`$1`/`$2`) e captura de saída via `$(...)`.

---

## 🧩 Linux — Sistemas de Arquivos e Rede

### 🎯 Assunto: Sistemas de Arquivos Linux (Ext2/3/4, XFS, ReiserFS, JFS) e LVM
**O que estudar obrigatoriamente:** **Ext3** adiciona journaling ao Ext2 (compatível); **ReiserFS** também faz journaling mas é **incompatível** com ext2; **Ext4** adiciona alocação postergada (delayed allocation), maior capacidade (16 TiB por arquivo) e journaling de **dados e metadados** (mais confiável que JFS2, que journala só metadados); Ext4 permite habilitar TRIM para SSDs e desabilitar journaling. **XFS** (padrão do RHEL 7+, substituindo Ext4): nativo 64 bits, blocos de tamanho **variável**, bom para arquivos grandes, journaling **lógico**, só redimensiona para **aumentar**. Sistema de arquivos padrão por versão RHEL: 5→Ext3, 6→Ext4, 7+→XFS. **LVM**: `pvcreate` (cria Physical Volume) → `vgcreate` (agrupa PVs em Volume Group) → `lvcreate -L tamanho -n nome vg` (cria Logical Volume) → `lvdisplay` (detalhes) — partições físicas viram **volumes físicos**, não "lógicos"; fronteiras de LV não precisam alinhar com partições físicas. `/etc/fstab` controla montagem automática no boot (sintaxe NFS: `servidor:/caminho /ponto/local nfs opções`).
**Por que estudar isso:** comparação entre sistemas de arquivos (journaling, compatibilidade, limite de tamanho) é testada de forma cruzada e repetida — item de alto retorno por tabela de memorização.
**Alerta de Pegadinha:** achar que XFS usa blocos de tamanho fixo (é variável — isso é pegadinha, pois paginação de memória usa fixo, mas XFS é variável); confundir Ext3 (compatível com ext2) com ReiserFS (incompatível); chamar partição física de "volume lógico" no LVM.
**Ação Prática:** monte a tabela Ext2/Ext3/Ext4/XFS/ReiserFS/JFS com journaling/compatibilidade/limite de tamanho; escreva o fluxo LVM completo de memória (pvcreate→vgcreate→lvcreate→lvdisplay).

---

### 🎯 Assunto: Rede e Serviços Linux (iptables, netstat/ip, NFS, Samba, SSH, Apache)
**O que estudar obrigatoriamente:** `iptables -A INPUT -s IP -j ACCEPT` (adiciona regra à chain INPUT; alvos válidos são ACCEPT/DROP/REJECT, **não** "ALLOW"). `netstat -a` (todas conexões) `-t` (TCP) `-u` (UDP) `-r` (tabela de roteamento) `-l` (sockets em escuta); `ip link set eth0 up/down` é o comando **moderno**, substituindo `ifconfig eth0 up/down` (obsoleto mas ainda cobrado); `ifconfig -a` mostra até interfaces inativas. **NFS**: compartilhamento configurado em `/etc/exports` (sintaxe `/diretório *(ro)` ou `(rw)`); `no_root_squash` é a opção **perigosa** que permite root remoto alterar qualquer arquivo (padrão remapeia root para `nfsnobody`). **Samba** implementa SMB/CIFS para interoperabilidade Linux↔Windows, configurado em `/etc/samba/smb.conf`. **SSH**: `ssh usuario@IP` ou `-l usuario`; `ssh-keygen -t rsa` gera par de chaves. **Apache**: `apachectl -k graceful` reinicia sem abortar conexões ativas; arquivo principal `/etc/httpd/conf/httpd.conf` (RHEL) ou `/etc/apache2/ports.conf` (Debian, portas). **OpenLDAP**: `/etc/openldap/ldap.conf` configura o **cliente** (o daemon do servidor é `slapd`).
**Por que estudar isso:** bloco denso de sintaxe exata de comandos de rede/serviço — a FCC testa flag por flag, não apenas o conceito do protocolo.
**Alerta de Pegadinha:** usar "ALLOW" como alvo do iptables (não existe — é ACCEPT); confundir `netstat -r` (rotas) com `-a` (conexões); achar que `no_root_squash` é uma opção segura.
**Ação Prática:** escreva a sintaxe completa de uma regra iptables e de uma linha de `/etc/exports`; decore os arquivos de configuração de Samba/Apache/OpenLDAP.

---

## 🧩 Processos, Threads, Escalonamento e Sincronização

### 🎯 Assunto: Processos, Threads, IPC e PCB
**O que estudar obrigatoriamente:** os 3 estados clássicos de processo: **Executando, Bloqueado (Esperando/Blocked), Pronto (Ready)** (variações acadêmicas acrescentam Novo e Terminado). O **PCB** (Process Control Block) contém estado, informações de contabilização, contador de programa e informações de escalonamento (prioridade, ponteiros de fila). Itens **privados** de thread: contador de programa, registradores, pilha, estado; itens **compartilhados** entre threads do mesmo processo: espaço de endereçamento, arquivos abertos, variáveis globais — threads não geram novo PCB, tornando a troca de contexto entre threads mais **rápida** que entre processos. **IPC** ocorre via memória compartilhada ou troca de mensagens (DMA/interrupções/memória virtual **não** são mecanismos de IPC). **Pipe** é um pseudoarquivo para comunicação entre 2 processos (um escreve, outro lê). **Race condition** ocorre quando processos acessam variável compartilhada sem sincronização (ex.: spool de impressão). **Mutex** é semáforo binário (sem contagem) para exclusão mútua em seções críticas. Reentrância permite que um único código na memória seja compartilhado por múltiplos usuários, cada um com seus próprios dados.
**Por que estudar isso:** base conceitual clássica (Tanenbaum/Silberschatz) cobrada em todas as 5 partes, com foco em vocabulário técnico preciso.
**Alerta de Pegadinha:** achar que threads geram novo PCB; achar que DMA/interrupções são mecanismos de IPC; confundir mutex (binário) com semáforo contável.
**Ação Prática:** desenhe o PCB com seus 4 campos principais; escreva a diferença threads×processos em termos de compartilhamento de memória e custo de troca de contexto.

---

### 🎯 Assunto: Escalonamento de CPU e de Disco
**O que estudar obrigatoriamente:** escalonamento **preemptivo** (SO pode retirar a CPU do processo, ex.: por quantum expirado ou processo de maior prioridade) × **não-preemptivo** (processo roda até terminar ou bloquear por E/S, sem interrupção). **Round-Robin**: fila circular FIFO com **quantum/time-slice** fixo definido **pelo sistema** — é um dos algoritmos mais **antigos e simples**, não "moderno". **FCFS**: simples, mas desempenho ruim sob carga alta. **SJF/SRT**: baseados em tempo de execução estimado/restante. Critérios de avaliação: **Utilização de CPU**, **Throughput** (processos concluídos por unidade de tempo — não é "tempo de espera"), **Turnaround** (tempo total desde submissão até conclusão), **Waiting time** (tempo só na fila de prontos), **Response time**. Escalonadores por prazo: **longo prazo** (job scheduler, controla grau de multiprogramação), **curto prazo** (CPU scheduler), **médio prazo** (swapping). Escalonamento de disco: **FCFS** (simples, ruim sob carga), **SSTF** (atende o pedido mais próximo, pode gerar starvation), **SCAN**/elevador (variância semelhante ao SSTF, sem inanição, atende tudo em um sentido antes de inverter).
**Por que estudar isso:** tema-base testado com definições precisas — a FCC inventa nomes parecidos ("Threadout") como distratores de Turnaround/Throughput.
**Alerta de Pegadinha:** achar que Round-Robin é "moderno" ou que o quantum é definido pelo usuário; confundir Turnaround (tempo total) com Waiting time (só fila); achar que SCAN tem variância maior que SSTF (é semelhante, mas sem starvation).
**Ação Prática:** escreva a definição exata de Turnaround×Waiting time×Throughput; compare FCFS×SSTF×SCAN quanto a starvation.

---

### 🎯 Assunto: Deadlock e Starvation
**O que estudar obrigatoriamente:** as **4 condições necessárias e simultâneas** para deadlock (mnemônico **ENPE**): **E**xclusão mútua (recurso não compartilhável), **N**ão-preempção (recurso só liberado voluntariamente), **P**osse e espera (mantém recurso enquanto aguarda outro), **E**spera circular (cadeia fechada P1→P2→...→Pn→P1). Sem compartilhamento de recursos entre processos concorrentes, **não há como formar deadlock**, mesmo que outras condições estejam presentes. **Starvation** (inanição) ocorre quando um processo **nunca progride** por ser perpetuamente preterido — **sem** bloqueio circular, diferente de deadlock (onde os processos estão efetivamente **bloqueados**); políticas **não-preemptivas** têm maior chance de causar starvation. Tratamentos de deadlock incluem o **algoritmo do avestruz** (ignorar completamente, assumindo que é raro o bastante para não valer o custo de prevenção/detecção) e recuperação por eliminação de processos (quebra espera circular, mas processos eliminados **não podem ser recuperados** — fatos independentes, não uma justificativa da outra).
**Por que estudar isso:** tema cobrado em quase toda parte do lote, testando tanto as 4 condições quanto a distinção fina deadlock×starvation.
**Alerta de Pegadinha:** confundir deadlock (bloqueio mútuo circular) com starvation (sem bloqueio circular, só baixa prioridade); achar que basta 3 das 4 condições para deadlock (precisa das 4 simultaneamente).
**Ação Prática:** desenhe um ciclo de espera circular P1→P2→P3→P1 rotulando cada uma das 4 condições; escreva a diferença deadlock×starvation em uma frase.

---

## 🧩 Gerência de Memória

### 🎯 Assunto: Paginação, Segmentação, MMU e TLB
**O que estudar obrigatoriamente:** **paginação** divide memória lógica e física em blocos de tamanho **fixo** (páginas/molduras), gerando fragmentação **interna**; **segmentação** divide em blocos de tamanho **variável** (baseados na lógica do programa), gerando fragmentação **externa** — troca clássica de "fixo"/"variável" entre as duas. A **MMU** (Memory Management Unit) é dispositivo de **hardware** (não software), geralmente integrado à CPU, que traduz endereços virtuais em físicos. O **TLB** (Translation Lookaside Buffer) é uma memória associativa pequena e rápida dentro da MMU que guarda traduções frequentes. **Memória virtual desvincula** (não "vincula") o endereçamento do programa dos endereços físicos, permitindo processos maiores que a RAM disponível — combinação de hardware (MMU) e rotinas do SO, com função também de proteção entre processos. **Localidade espacial** = tendência de referenciar endereços próximos entre si (distinta da temporal, que é reuso do mesmo endereço ao longo do tempo).
**Por que estudar isso:** erro mais repetido de todo o bloco de memória do lote — a banca sistematicamente inverte "fixo"/"variável" entre paginação e segmentação.
**Alerta de Pegadinha:** trocar paginação (fixo) por segmentação (variável); achar que MMU é software; achar que memória virtual "vincula" endereços físicos e lógicos.
**Ação Prática:** escreva as diferenças paginação×segmentação em uma tabela de 2 colunas (tamanho de bloco, tipo de fragmentação).

---

### 🎯 Assunto: Memória Virtual, Swapping, Thrashing e Algoritmos de Substituição de Página
**O que estudar obrigatoriamente:** **swapping** move processos **inteiros** entre memória principal e disco (swap-out/swap-in), distinto de paginação (move **páginas** individuais). **Thrashing** é excesso de page faults quando processos têm poucas páginas residentes — resolvido reduzindo o número de páginas por processo (não é a mesma coisa que fragmentação interna, que é estrutural). Algoritmos de substituição de página: **FIFO** (substitui a mais antiga, sofre a **anomalia de Belady**), **NRU** (4 classes via bits Referência/Modificação, classe 0 é candidata prioritária), **CLOCK** (lista circular com bit de uso, avança "ponteiro"), **LRU** (substitui a menos recentemente usada, boa aderência à localidade temporal), **MRU** (oposto do LRU). No Windows, `pagefile.sys` é a extensão em disco da RAM; RAM acima de 16 GB exige espaço extra para paginação/hibernação (`hiberfil.sys`)/dump. **Compactação de memória** (juntar processos em bloco contíguo) resolve fragmentação externa acumulada, mas é cara em CPU.
**Por que estudar isso:** algoritmos de substituição de página são tema certo em praticamente toda prova de SO — decoreba de comportamento específico de cada algoritmo.
**Alerta de Pegadinha:** confundir swapping (processo inteiro) com paginação (páginas); achar que FIFO considera uso da página (não considera — é sua fraqueza); trocar NRU/CLOCK/LRU nas descrições.
**Ação Prática:** monte a tabela FIFO/NRU/CLOCK/LRU/MRU com o critério de substituição de cada um; explique a anomalia de Belady em uma frase.

---

## 🧩 Kernel, Sistemas de Arquivos Genéricos e Estrutura de SO

### 🎯 Assunto: Arquitetura em Camadas, Microkernel e Modos de Execução
**O que estudar obrigatoriamente:** em SO estruturado em **camadas**, cada camada só usa funções de camadas **inferiores** (nunca superiores); a camada mais **baixa** interage com o hardware, a mais **alta** define a interface para aplicações; desvantagem central é a perda de eficiência ao aumentar o número de camadas. A abordagem **microkernel** remove componentes não essenciais do kernel para espaço de usuário, oferecendo **maior** modularidade (não menor) — cada serviço roda isolado e pode ser atualizado independentemente. Modo **kernel** (privilegiado, executa instruções privilegiadas incluindo interrupção de timer) × modo **usuário** (aplicações). **Firmware** é software embarcado em flash/EEPROM/ROM para iniciar/operar dispositivos — **pode sim** ser atualizado. Shell é a camada mais próxima do usuário (interpreta comandos, ex. bash), kernel é a mais próxima do hardware.
**Por que estudar isso:** conceitos clássicos de estrutura de SO cobrados com cenários de "identifique a camada/abordagem certa" — testam entendimento de trade-offs, não só definição.
**Alerta de Pegadinha:** achar que microkernel tem menor modularidade (é maior); inverter qual camada fala com hardware/aplicação; achar que firmware não pode ser atualizado.
**Ação Prática:** desenhe a pilha de camadas hardware→kernel→shell→aplicação; escreva a vantagem central do microkernel em uma frase.

---

### 🎯 Assunto: Sistemas de Arquivos — Conceitos Genéricos (Alocação, Diretórios, NTFS)
**O que estudar obrigatoriamente:** métodos de alocação de espaço em disco: **contígua** (fragmentação externa), **encadeada** (só acesso sequencial eficiente), **indexada** (overhead do bloco de índices); gerenciamento de espaço livre usa **mapas de bits** e **listas encadeadas** (não "vetores de strings"). Camadas de um sistema de arquivos, do programa ao hardware: **sistema de arquivos lógico** (metadados/FCBs) → **módulo de organização** (blocos lógicos↔físicos) → **sistema de arquivos básico** (leitura/gravação de blocos + buffers) → **controle de I/O** (drivers). Estruturas de diretório: um nível, dois níveis, árvore, grafo acíclico (detecção de ciclos), grafo geral (permite ciclos via links simbólicos, exige coleta de lixo). **NTFS** armazena tudo em **atributos** por arquivo (cabeçalho+dados, não alocação tabular como FAT); usa MFT e árvore B+; suporta journaling, EFS (criptografia), compactação, cotas; volumes até 32 caracteres de nome, arquivos até 255.
**Por que estudar isso:** consolida a teoria clássica de sistemas de arquivos (Silberschatz/Tanenbaum) que serve de base para as questões específicas de Linux/Windows.
**Alerta de Pegadinha:** achar que gerenciamento de espaço livre usa "vetores de strings" (é mapas de bits/listas encadeadas); inverter a ordem das 4 camadas de sistema de arquivos.
**Ação Prática:** escreva as 4 camadas de sistema de arquivos em ordem, do programa ao hardware; compare alocação contígua×encadeada×indexada quanto ao tipo de fragmentação/overhead.

---

## 🧩 Virtualização

### 🎯 Assunto: Hyper-V (Microsoft)
**O que estudar obrigatoriamente:** `BCDEDIT /SET {GUID} HYPERVISORLAUNCHTYPE OFF` desabilita o hipervisor numa entrada de boot (necessário para coexistir com outros hypervisors). VHDX precisa de controladora **SCSI** para redimensionar (IDE só serve para boot em VMs Geração 1). VLANs no Hyper-V configuram-se no **vSwitch** (Hyper-V Virtual Switch). **VID** (Virtual Infrastructure Driver) gerencia partição/memória/processador da VM (não confundir com VDI). **Live Migration** move VMs em execução entre nós de failover cluster sem downtime, exigindo storage compartilhado (SAN); **Quick Migration** é a alternativa mais lenta; **CSV** (Cluster Shared Volumes) permite múltiplos nós acessarem o mesmo LUN simultaneamente. **Memória Dinâmica** (Dynamic Memory, desde SP1 do Server 2008 R2) realoca RAM entre VMs conforme demanda; **Smart Paging** (2012+) garante boot confiável com RAM abaixo do mínimo via arquivo de paginação temporário. Recursos de rede: **Jumbo Frames** (~9000 bytes, menos overhead), **TCP Chimney** (offload de TCP/IP para hardware), **VMQ** (DMA direto para memória da VM). Virtualização aninhada permite que uma VM rode seu próprio hipervisor.
**Por que estudar isso:** Hyper-V é citado indiretamente no edital (Windows Server) e tem cobertura muito detalhada e técnica em todas as 5 partes.
**Alerta de Pegadinha:** confundir VID com VDI; achar que IDE serve para redimensionar VHDX (precisa de SCSI); confundir Live Migration (sem downtime, cluster) com Quick Migration (mais lenta).
**Ação Prática:** monte a tabela de recursos do Hyper-V por versão de Windows Server (2008/2008 R2/2012) com o que cada versão introduziu (Live Migration, CSV, Dynamic Memory, Smart Paging).

---

### 🎯 Assunto: VMware, Xen, KVM e Conceitos Gerais de Virtualização
**O que estudar obrigatoriamente:** **ESX/ESXi** é hipervisor **tipo 1** (bare-metal, sem SO hospedeiro, servidores de grande porte) — diferente de Workstation/Fusion/Player (**tipo 2**, sobre SO hospedeiro). **vMotion** faz migração ao vivo entre hosts sem interrupção; vSphere 6 ampliou o RTT suportado em migrações de longa distância (até 100ms). **DRS** (Distributed Resource Scheduler) balanceia carga entre hosts; **DPM** (Distributed Power Management) otimiza consumo de energia dos **hosts** (não das VMs — atenção ao gabarito contestado `998273`). Virtualização **total/completa** (VMware): SO convidado **não** modificado, hypervisor intercepta instruções sensíveis, mais overhead. **Paravirtualização** (Xen, historicamente): SO convidado **modificado** para chamar diretamente o hypervisor, menos overhead, melhor desempenho — ambos evoluíram incorporando características um do outro. Virtualização baseada em **containers** tem o melhor desempenho pois compartilha a camada de system calls do SO hospedeiro (exige mesmo SO). Virtual SMP do VMware ESX suporta até **8 vCPUs** por VM (não 4). Consolidação de servidores, hypervisor (camada entre hardware e VMs) e isolamento entre VMs são os conceitos centrais.
**Por que estudar isso:** distinção VMware×Xen (total×para) e tipo 1×tipo 2 de hipervisor são testadas de forma cruzada e repetida em quase toda parte.
**Alerta de Pegadinha:** achar que ESX/ESXi é tipo 2; trocar a função do DRS (balanceamento) com DPM (energia); achar que paravirtualização não exige modificar o SO convidado (exige — é justamente sua característica).
**Ação Prática:** escreva a diferença tipo 1×tipo 2 de hipervisor com 2 exemplos de cada; compare virtualização total×paravirtualização×containers quanto a modificação do SO convidado e desempenho.

---

### 🎯 Assunto: Containers — Docker e Kubernetes
**O que estudar obrigatoriamente:** falha de container Docker por falta de permissão em volume montado do host resolve-se ajustando **permissões no host** (não reiniciando daemon nem reconstruindo imagem). **Kubernetes** orquestra/agenda múltiplos containers de **vários runtimes**, não só Docker. Hooks de ciclo de vida: **PostStart** (executa após criação, sem garantia de ordem com ENTRYPOINT) × **PreStop** (executa antes da terminação, deve concluir antes do SIGTERM). Componentes Docker: **Docker Daemon** (recebe comandos via CLI/API REST), **Docker Engine** (motor de criação), **Docker Registry** (repositório de imagens), **Docker Hub** (SaaS público), **Docker Swarm** (clustering/scheduling nativo), **Dockerfile** (receita de imagem), **Docker Desktop** (app GUI multiplataforma). **Rancher** administra/monitora containers Docker/Kubernetes em produção.
**Por que estudar isso:** tema moderno crescente, com terminologia específica testada por "identifique o componente pela descrição".
**Alerta de Pegadinha:** achar que Kubernetes só orquestra Docker; confundir os 7 componentes do ecossistema Docker entre si (Daemon×Engine×Registry×Hub×Swarm).
**Ação Prática:** monte a tabela dos 7 componentes Docker com a função de cada um; escreva a diferença PostStart×PreStop.

---

## 🧩 Cloud Computing

### 🎯 Assunto: NIST SP 800-145 — Características, Modelos de Serviço e Implantação
**O que estudar obrigatoriamente:** **5 características essenciais**: On-demand self-service, Broad network access, Resource pooling, Rapid elasticity, Measured service. **3 modelos de serviço** (camadas crescentes de abstração): **IaaS** (infraestrutura — controle sobre SO/storage/apps, hardware do provedor), **PaaS** (plataforma de desenvolvimento — cuidado com a palavra "infraestrutura" no enunciado induzindo a marcar IaaS quando a resposta é PaaS), **SaaS** (software pronto ao usuário final, sem gerência de infraestrutura, "camada mais externa"). **4 modelos de implantação**: Private, Community, Public, Hybrid — nuvem **híbrida** combina pública+privada; **multicloud** usa múltiplas nuvens públicas sem exigir componente privado (não confundir os dois). Exemplos de mercado: IaaS=AWS/infra bruta; PaaS=Google App Engine/Windows Azure; SaaS=Office 365/Google Docs/SharePoint/Skype.
**Por que estudar isso:** a FCC cita a definição literal do NIST SP 800-145 e pede para identificar o modelo/característica — decoreba de alta recorrência em todas as 5 partes.
**Alerta de Pegadinha:** marcar IaaS só porque o enunciado usa a palavra "infraestrutura" quando descreve ambiente de desenvolvimento (é PaaS); confundir híbrida com multicloud.
**Ação Prática:** decore as 5+3+4 categorias do NIST SP 800-145; treine classificar 5 descrições de serviço real (Office 365, AWS EC2, Google App Engine etc.) no modelo correto.

---

### 🎯 Assunto: Estratégias de Disponibilidade, Escalabilidade e Ferramentas de Nuvem
**O que estudar obrigatoriamente:** múltiplas **AZs dentro de uma única região** oferecem latência baixa o suficiente para replicação **síncrona** e RPO zero — múltiplas **regiões** distantes aumentam a latência (replicação geralmente assíncrona), mas protegem contra desastre regional. **Auto-escalabilidade** (HPA/Cluster Autoscaler no Kubernetes) ajusta pods/nós dinamicamente conforme carga — resolve picos previsíveis melhor que escalonamento manual. **CDN** aproxima o usuário de um data center geograficamente próximo, otimizando balanceamento/compactação/TLS. **Scale-up** (vertical, mais recursos num único nó, limitado por SMP) × **scale-out** (horizontal, mais nós, mais flexível). Ferramentas específicas: **Azure Data Factory** (integração/orquestração de dados on-premises↔nuvem).
**Por que estudar isso:** cenários de arquitetura de alta disponibilidade em nuvem exigem raciocínio sobre trade-offs (latência×proteção contra desastre), não só definição.
**Alerta de Pegadinha:** achar que múltiplas regiões distantes reduzem latência para replicação síncrona (é o oposto — múltiplas AZs numa região é que permitem isso).
**Ação Prática:** escreva a diferença AZs-múltiplas-numa-região×múltiplas-regiões quanto a latência/RPO/proteção contra desastre.

---

# ✅ Observações finais

- Este é o lote com **maior volume de gabaritos contestados** entre todos os processados neste projeto — a Parte 3/5 sozinha lista 15 casos numa seção dedicada do `raw_md`. Ao estudar por questões antigas deste banco, sempre releia a lógica técnica dos comentários da comunidade em vez de memorizar cegamente a letra creditada como "gabarito", especialmente em questões sobre comandos de sintaxe exata (`Ctrl+Z`, `uname -a`, `dsadd`, `fc`, `subst`).
- O banco cobre uma quantidade grande de versões **legadas** de Windows Server (2003, 2008, 2008 R2) e Windows desktop (XP, Vista, 7) ao lado de versões atuais (2016, 2019, 10, 11) — vale treinar identificar pela versão citada no enunciado qual comportamento/requisito/recurso se aplica, já que a resposta muda conforme a versão.
- Pequenos vazamentos pontuais para outras áreas do edital aparecem no lote (Governança de TI — Resolução CNJ 182/2013 sobre papéis de contratação; Redes — LACP, portas, full-duplex; Arquitetura de Computadores — conversão hexadecimal, unidade de controle; Apache/JMeter/servidores de aplicação) — cobertos nos `raw_md` de origem com tags `[Área]`, mas sem volume suficiente para blocos prescritivos dedicados aqui.
- Os 5 resumos brutos que originaram este guia estão em `guia_estudos_subagentes/raw_md/39_sistemas_operacionais_parte1_de_5.md` a `parte5_de_5.md`, cada um citando todos os `id_questao` das 621 questões do lote como evidência — consulte-os para os exemplos completos e a lista integral de gabaritos contestados por trás de cada regra resumida aqui.
