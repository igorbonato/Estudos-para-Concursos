// Edital TRT4 nº 01/2026 (FCC) — Analista Judiciário TI (cód. 14) e Técnico
// Judiciário TI (cód. 22). Fonte: TRT4_2026_TI_atualizacao_projeto.md.
//
// alcance: 'AT' = cai nos dois cargos · 'A' = só Analista · 'T' = só Técnico.

export type Alcance = 'AT' | 'A' | 'T'

export type EditalTopico = {
  texto: string
  alcance: Alcance
}

export type EditalBloco = {
  id: string
  titulo: string
  topicos: EditalTopico[]
}

export type CargoEdital = {
  codigo: string
  nome: string
  remuneracao: string
  turno: string
}

export const ALCANCE_LABEL: Record<Alcance, string> = {
  AT: 'A+T',
  A: 'A',
  T: 'T',
}

type T = [Alcance, string]

function bloco(id: string, titulo: string, topicos: T[]): EditalBloco {
  return { id, titulo, topicos: topicos.map(([alcance, texto]) => ({ alcance, texto })) }
}

export const EDITAL_TRT4 = {
  concurso: 'TRT4',
  edital: 'Edital nº 01/2026',
  banca: 'FCC',
  dataProva: '2027-01-31',
  cargos: [
    { codigo: '14', nome: 'Analista Judiciário – TI', remuneracao: 'R$ 16.040,88', turno: 'Tarde' },
    { codigo: '22', nome: 'Técnico Judiciário – TI', remuneracao: 'R$ 9.776,71', turno: 'Manhã' },
  ] satisfies CargoEdital[],
  provas: [
    { nome: 'Conhecimentos Gerais', questoes: '30', peso: '1' },
    { nome: 'Conhecimentos Específicos', questoes: '30', peso: '2' },
    { nome: 'Redação (dissertativo-argumentativa, 20 a 30 linhas)', questoes: '1', peso: '—' },
  ],
  regras: [
    'Nota objetiva = (Gerais × 1 + Específicos × 2) / 3, com mínimo de 6,00',
    'A redação só é corrigida até a 400ª posição na objetiva, em cada cargo; mínimo de 6,00',
    'Nota final = objetiva ponderada + redação',
    'Desempate: Específicos → Português → redação → idade',
    '4h no total (objetiva + redação), sem relógio, saída só após 3h',
  ],
  gerais: [
    bloco('g-port', 'Língua Portuguesa', [
      ['AT', 'Redação Oficial'],
      ['AT', 'Ortografia e acentuação'],
      ['AT', 'Emprego do sinal indicativo de crase'],
      ['AT', 'Compreensão e interpretação de textos de gêneros variados'],
      ['AT', 'Relação do texto com seu contexto histórico'],
      ['AT', 'Denotação e conotação'],
      ['AT', 'Discurso direto, indireto e indireto livre'],
      ['AT', 'Intertextualidade'],
      ['AT', 'Figuras de linguagem'],
      ['AT', 'Morfossintaxe'],
      ['AT', 'Elementos estruturais e processos de formação de palavras'],
      ['AT', 'Sinonímia e antonímia'],
      ['AT', 'Pontuação'],
      ['AT', 'Pronomes'],
      ['AT', 'Concordância nominal e verbal'],
      ['AT', 'Flexão nominal e verbal'],
      ['AT', 'Vozes do verbo'],
      ['AT', 'Correlação de tempos e modos verbais'],
      ['AT', 'Regência nominal e verbal'],
      ['AT', 'Coordenação e subordinação'],
      ['AT', 'Conectivos'],
      ['AT', 'Redação: frases corretas/incorretas, reorganização de orações e períodos, equivalência de estruturas'],
    ]),
    bloco('g-rlm', 'Matemática e Raciocínio Lógico', [
      ['AT', 'Estrutura lógica de relações arbitrárias; dedução de novas informações'],
      ['AT', 'Raciocínio verbal, matemático e sequencial; orientação espacial e temporal'],
      ['AT', 'Formação de conceitos; discriminação de elementos'],
      ['AT', 'Processo lógico: hipóteses → conclusões válidas'],
      ['AT', 'Inteiros e racionais: operações, potenciação, expressões numéricas'],
      ['AT', 'Múltiplos e divisores; problemas'],
      ['AT', 'Frações e operações'],
      ['AT', 'Razões e proporções; divisão proporcional; regra de três simples'],
      ['AT', 'Porcentagem, acréscimos e descontos'],
      ['AT', 'Estatística: moda, mediana, média simples e ponderada'],
      ['AT', 'Dispersão: desvio médio, amplitude, variância, desvio padrão'],
      ['AT', 'Leitura e interpretação de gráficos (histogramas, setores, infográficos) e tabelas'],
    ]),
    bloco('g-leg', 'Noções de Legislação', [
      ['AT', 'Resolução CNJ nº 400/2021 – sustentabilidade no Poder Judiciário'],
      ['AT', 'Código de Conduta e Valores Éticos do TRT4 – Portaria GP 4.573/2023 (compilada com a 2.808/2025)'],
      ['AT', 'Regimento Interno do TRT4 – atualizado até a RA nº 31/2026 (Assento Regimental 04/2026)'],
      ['AT', 'Resolução CSJT nº 360/2023 – violência, assédio e discriminação na JT'],
      ['AT', 'Resolução CNJ nº 351/2020 – assédio moral, sexual e discriminação'],
    ]),
    bloco('g-dh', 'Noções de Direitos Humanos', [
      ['AT', 'Evolução histórica; fundamentos filosóficos'],
      ['AT', 'Fontes, classificação, princípios, características e gerações'],
      ['AT', 'Interpretação dos tratados; colisão entre direitos humanos'],
      ['AT', 'Tratados de DH em face da CF/88; controle de convencionalidade'],
      ['AT', 'Declaração Universal dos Direitos Humanos'],
      ['AT', 'PIDCP e protocolos facultativos'],
      ['AT', 'PIDESC e protocolos facultativos'],
      ['AT', 'Convenção sobre a eliminação da discriminação racial'],
      ['AT', 'CEDAW e protocolo facultativo'],
      ['AT', 'Convenção sobre os direitos da criança e protocolos'],
      ['AT', 'Convenção sobre os direitos da pessoa com deficiência e protocolo'],
      ['AT', 'Convenção do patrimônio mundial, cultural e natural'],
      ['AT', 'Convenção sobre a diversidade biológica'],
      ['AT', 'Declaração da ONU sobre os direitos dos povos indígenas'],
      ['AT', 'Declaração Americana, Convenção Americana e Protocolo de San Salvador'],
      ['AT', 'Comissão e Corte Interamericana: composição, funcionamento, atribuições, decisões'],
      ['AT', 'Mecanismos de proteção nacional e internacional'],
      ['AT', 'Grupos vulneráveis'],
      ['AT', 'Resolução CNJ nº 492/2023 – perspectiva de gênero'],
      ['AT', 'Resolução CSJT nº 368/2023 – equidade de raça, gênero e diversidade'],
      ['AT', 'Tribunal Penal Internacional: Estatuto de Roma (Decreto 4.388/2002)'],
      ['AT', 'Carta da ONU e Estatuto da Corte Internacional de Justiça (Decreto 19.841/1945)'],
    ]),
  ],
  especificos: [
    bloco('e-proc', 'Processo e engenharia de software', [
      ['AT', 'CMMI v3.0 – domínio Development'],
      ['AT', 'ABNT NBR ISO/IEC/IEEE 12207:2021'],
      ['AT', 'MR-MPS-SW versão 2024'],
      ['AT', 'UML 2.5.1'],
      ['AT', 'BPMN'],
      ['AT', 'Métodos ágeis (Scrum, Kanban, XP)'],
      ['T', 'Metodologias tradicionais; ciclo de vida; análise, projeto e implementação'],
      ['AT', 'Engenharia de requisitos'],
      ['A', 'Engenharia de software (geral)'],
      ['AT', 'Low-code e no-code'],
      ['AT', 'Assistentes de IA no desenvolvimento de software'],
      ['T', 'Orientação a objetos: classes, interfaces, herança, encapsulamento, sobrecarga/sobrescrita'],
      ['T', 'Padrões de projeto'],
      ['T', 'Noções de serverless e cloud computing'],
    ]),
    bloco('e-test', 'Qualidade e testes', [
      ['T', 'Cobertura de código; testes unitários, de integração e funcionais'],
      ['T', 'JUnit 6 (Jupiter; migração a partir do JUnit 5)'],
      ['T', 'Mockito'],
      ['T', 'Manutenção de sistemas: diagnóstico, depuração, metodologias de teste'],
      ['T', 'Versionamento com Git e GitHub'],
    ]),
    bloco('e-gov', 'Gestão e governança de TI', [
      ['A', 'PMBOK 8ª edição'],
      ['A', 'ITIL Version 5'],
      ['A', 'COBIT 2019'],
      ['AT', 'Modelo de Governança de TIC do TRT4'],
      ['AT', 'PDTIC 2024-2026 do TRT4'],
    ]),
    bloco('e-prog', 'Programação', [
      ['A', '"Conhecimento profundo": Visual Basic, Delphi, PHP, Python, C, Java, C#; .NET'],
      ['T', 'Java, Python, JavaScript, TypeScript, Angular; Hibernate, Spring Boot; Eclipse, VS Code'],
      ['AT', 'Sintaxe, palavras-chave, estrutura de programa, compilação e execução'],
      ['AT', 'Tipos primitivos (T: e de referência); declaração e inicialização de variáveis'],
      ['A', 'Literais e strings'],
      ['AT', 'Operadores e precedência; controle de fluxo e repetição (T: seleção, estruturas de dados)'],
      ['A', 'Classes, interfaces, métodos; encapsulamento, packages, sobrecarga e sobrescrita'],
      ['AT', 'Bibliotecas e componentes; exceções; acesso a banco de dados'],
    ]),
    bloco('e-bd', 'Banco de dados', [
      ['A', 'Modelo Entidade-Relacionamento'],
      ['A', 'Normalização'],
      ['A', 'SQL: DML, DDL, DCL'],
      ['A', 'Gerência de transações'],
      ['A', 'SQL e PL/SQL'],
      ['A', 'PostgreSQL 15 a 18 (migração e compatibilidade com 14)'],
      ['A', 'Oracle 19c'],
      ['AT', 'H2 Database; PostgreSQL (contexto PDPJ)'],
      ['T', 'Elasticsearch, Logstash e Kibana'],
    ]),
    bloco('e-web', 'Desenvolvimento web e mobile', [
      ['AT', 'HTML5, CSS3'],
      ['A', 'Bootstrap 5'],
      ['T', 'Bootstrap, Angular Material, jQuery'],
      ['A', 'Web Services REST'],
      ['T', 'APIs REST, OpenAPI/Swagger, JWT'],
      ['AT', 'JavaScript; TypeScript'],
      ['A', 'React, React Native, Angular, jQuery, Node.js, Vue.js'],
      ['T', 'JSF, jQuery, Node.js, React, Vue.js, Angular; PWA'],
      ['A', 'Python, JSP, JSF, ASP.NET Core, .NET'],
      ['AT', 'XML: declaração, elementos, atributos; XML Schema'],
      ['A', 'Servidor de aplicações; servidor web'],
      ['A', 'Internet, extranet, intranet e portal'],
      ['T', 'JBoss e WildFly'],
    ]),
    bloco('e-ia', 'Inteligência Artificial', [
      ['A', 'Aprendizado de máquina'],
      ['A', 'Redes neurais'],
      ['A', 'IA generativa e LLMs'],
    ]),
    bloco('e-arq', 'Arquiteturas', [
      ['AT', 'Multicamadas, cliente-servidor, objetos distribuídos'],
      ['A', 'SOA – conceitos e fundamentos'],
    ]),
    bloco('e-devops', 'DevOps e DevSecOps', [
      ['A', 'Jenkins, Maven, CircleCI, Git, GitHub, GitLab CI/CD, Selenium, testes automatizados'],
      ['T', 'Gestão de configuração; versionamento, merge, branch, pipeline'],
      ['T', 'GitLab (repositório com Wiki); Gitflow'],
      ['T', 'CI/CD e gerenciamento de tarefas'],
      ['T', 'Proxy reverso; SSL offloading; balanceamento de carga'],
    ]),
    bloco('e-pdpj', 'Arquitetura da PDPJ-Br', [
      ['AT', 'Java; arquitetura distribuída de microsserviços'],
      ['AT', 'API RESTful; JSON'],
      ['T', 'Jakarta EE 8 (legado) e Jakarta EE 11'],
      ['AT', 'Spring Framework, Spring Cloud, Spring Boot, Eureka, Zuul, MapStruct, Swagger'],
      ['AT', 'Service Discovery; API Gateway'],
      ['AT', 'JPA 2.0; Hibernate 5+; Hibernate Envers; Flyway'],
      ['AT', 'Noções de Jakarta Persistence 3.2 e Hibernate ORM 7.x'],
      ['AT', 'PostgreSQL; H2 Database'],
      ['AT', 'SSO; Keycloak; OAuth2 (RFC 6749); boas práticas OAuth 2.0 (RFC 9700)'],
      ['AT', 'Message broker; RabbitMQ; evento negocial; webhook; APIs reversas'],
      ['AT', 'Git; clusters; Docker; Kubernetes; Rancher'],
      ['AT', 'Deploy; Continuous Delivery e Continuous Integration'],
    ]),
    bloco('e-so', 'Sistemas operacionais', [
      ['A', 'Processos e threads: CPU, comunicação, sincronização, deadlock, starvation'],
      ['A', 'Memória: alocação, segmentação, memória virtual, paginação'],
      ['A', 'Entrada e saída: armazenamento secundário e terciário'],
      ['A', 'Linux (Red Hat e Oracle Linux): instalação, administração, comandos'],
      ['A', 'Windows 11/10; Windows Server 2019, 2022 e 2025'],
      ['A', 'Active Directory; PowerShell; WSUS'],
    ]),
    bloco('e-redes', 'Redes de computadores', [
      ['T', 'Modelo de referência OSI'],
      ['AT', 'TCP/IP; IPv4 e IPv6; segmentação e endereçamento (T: CIDR)'],
      ['A', 'Tipos e meios de transmissão; circuitos, pacotes e células'],
      ['A', 'PAN, LAN, MAN, WAN, WPAN, WLAN, WMAN, WWAN'],
      ['T', 'Tipos e topologias de redes'],
      ['A', 'TCP, UDP, IPSec, ARP, SSH, SMTP, HTTP, FTP, LDAP, DNS, DHCP, POP, IMAP'],
      ['AT', 'Gateways, hubs, repetidores, bridges, switches, roteadores'],
      ['AT', 'Cabeamento estruturado (A: ABNT NBR 14565:2019)'],
      ['AT', 'Fibras ópticas monomodo e multimodo'],
      ['AT', 'VLAN – IEEE 802.1Q'],
      ['A', 'IEEE 802.1X; família 802.3; STP e RSTP'],
      ['A', 'Wireless 802.11: ênfase 802.11ac, ax e be'],
      ['T', 'Wireless 802.11 e 802.11ax (Wi-Fi 6/6E)'],
      ['T', 'Codificação de sinal; NAT; AAA; IPSec; gerenciamento e diagnóstico'],
      ['A', 'Serviços: e-mail, DNS, DHCP, Web Proxy'],
      ['A', 'JBoss EAP/WildFly, Apache HTTP Server, IIS; logs; usuários'],
      ['A', 'SNMP, MIBs; níveis de serviço; QoS; métricas de desempenho'],
      ['A', 'Zabbix, Elasticsearch, Logstash, Kibana, Grafana, Prometheus, Fluentd'],
    ]),
    bloco('e-nuvem', 'Nuvem', [
      ['T', 'Arquitetura e computação em nuvem; pública e privada'],
      ['T', 'IaaS, PaaS, SaaS; implantação em nuvem e contêineres'],
      ['T', 'Kubernetes, Docker, Serverless Framework'],
    ]),
    bloco('e-seg', 'Segurança da informação', [
      ['AT', 'Confidencialidade, integridade, disponibilidade'],
      ['AT', 'ABNT NBR ISO/IEC 27001:2024 e 27002:2022'],
      ['AT', 'ISO/IEC 27701 (A: 2026 · T: 2019)'],
      ['T', 'ISO/IEC 27005:2023; CIS Controls v8'],
      ['AT', 'LGPD – Lei 13.709/2018'],
      ['AT', 'OWASP Top 10:2025; desenvolvimento seguro; programação defensiva'],
      ['T', 'SDL, CLASP; avaliação de segurança de aplicações; hardening'],
      ['T', 'Gestão de riscos; continuidade de negócios; resposta a incidentes'],
      ['AT', 'Firewall, WAF, UTM, DMZ, Proxy, NAC, antivírus, antispam'],
      ['AT', 'IDS e IPS (T: SIEM)'],
      ['AT', 'Monitoramento de tráfego; sniffer; análise de pacotes'],
      ['AT', 'Wi-Fi: EAP, WEP/WPA (legados), WPA2, WPA3'],
      ['AT', 'VPN, VPN-SSL, ZTNA'],
      ['AT', 'DoS, DDoS e códigos maliciosos (T: lista detalhada de malwares e ataques)'],
      ['T', 'Teste de intrusão e análise de vulnerabilidades; backup e recuperação'],
      ['AT', 'Criptografia simétrica/assimétrica (T: AES, RSA, pós-quântica); hashes; certificados (T: ICP)'],
      ['AT', 'Autenticação, autorização, auditoria; RBAC; MFA'],
      ['A', 'TLS 1.2 e 1.3; limitações históricas do SSL'],
      ['T', 'TLS 1.2'],
    ]),
    bloco('e-norm', 'Normativos da PDPJ-Br', [
      ['AT', 'MoReq-Jus – 2ª edição'],
      ['AT', 'Resolução CNJ nº 574/2024 – dados judiciais públicos e portal unificado'],
      ['AT', 'Resolução CNJ nº 522/2023 – institui o MoReq-Jus'],
      ['AT', 'Resolução CNJ nº 443/2022 – PDPJ-Br em concursos e capacitações'],
      ['AT', 'Resolução CNJ nº 396/2021 – ENSEC-PJ'],
      ['AT', 'Portaria CNJ nº 284/2021 – governança e gestão da PDPJ-Br'],
      ['AT', 'Portaria CNJ nº 162/2021 – protocolos e manuais da ENSEC-PJ'],
      ['AT', 'Portaria CNJ nº 131/2021 – Grupo Revisor de Código-Fonte'],
      ['AT', 'Portaria CNJ nº 253/2020 – critérios técnicos de desenvolvimento na PDPJ-Br'],
    ]),
    bloco('e-ing', 'Inglês técnico', [['AT', 'Leitura e interpretação de textos técnicos']]),
  ],
}

export type FiltroCargo = 'todos' | 'A' | 'T'

export function topicoVisivel(topico: EditalTopico, filtro: FiltroCargo): boolean {
  return filtro === 'todos' || topico.alcance === 'AT' || topico.alcance === filtro
}

export function chaveTopico(bloco: EditalBloco, topico: EditalTopico): string {
  return `${bloco.id}|${topico.texto}`
}
