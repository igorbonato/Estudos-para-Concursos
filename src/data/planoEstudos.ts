import type { BlocoEstudoId } from './blocosEstudo'

export type SessaoPlano = {
  dia: number // 0 = segunda ... 6 = domingo
  bloco: BlocoEstudoId
  assunto: string
  minutos: number
}

export type SemanaPlano = {
  numero: number
  inicio: string // segunda-feira (YYYY-MM-DD)
  fase: 1 | 2 | 3 | 4
  meta: string
  sessoes: SessaoPlano[]
}

export type FasePlano = {
  numero: 1 | 2 | 3 | 4
  titulo: string
  periodo: string
  foco: string
}

export const DATA_PROVA_TRT4 = '2027-01-31'

export const FASES: FasePlano[] = [
  {
    numero: 1,
    titulo: 'Base',
    periodo: '26/10 a 29/11/2026',
    foco: 'Português, RLM, legislação e Java/Spring/PDPJ-Br',
  },
  {
    numero: 2,
    titulo: 'Infra e normas',
    periodo: '30/11/2026 a 03/01/2027',
    foco: 'Redes, SO, segurança, governança e Direitos Humanos; uma redação por semana; pausa nas festas',
  },
  {
    numero: 3,
    titulo: 'Questões e simulados',
    periodo: '04/01 a 24/01/2027',
    foco: 'Questões FCC por assunto (TRTs, TRF4 2025), caderno de erros e 2 simulados de 4h com redação à mão',
  },
  {
    numero: 4,
    titulo: 'Reta final',
    periodo: '25/01 a 30/01/2027',
    foco: 'Revisão leve. Nada de conteúdo novo',
  },
]

type S = [dia: number, bloco: BlocoEstudoId, assunto: string, minutos: number]

function semana(numero: number, inicio: string, fase: SemanaPlano['fase'], meta: string, sessoes: S[]): SemanaPlano {
  return {
    numero,
    inicio,
    fase,
    meta,
    sessoes: sessoes.map(([dia, bloco, assunto, minutos]) => ({ dia, bloco, assunto, minutos })),
  }
}

// Carga-base: 2h nos dias úteis + 2h30 no sábado e no domingo = 15h/semana.
export const PLANO_TRT4: SemanaPlano[] = [
  // ── Fase 1 ────────────────────────────────────────────────────────────────
  semana(1, '2026-10-26', 1, 'Fazer a inscrição nos dois cargos (Técnico de manhã, Analista à tarde). Java para quem vem do C# e Regimento Interno.', [
    [0, 'P', 'Concordância verbal e nominal', 120],
    [1, 'J', 'Java para quem vem do C#: sintaxe, tipos primitivos e de referência, OO', 120],
    [2, 'R', 'Estruturas lógicas, dedução e verdades/mentiras', 120],
    [3, 'J', 'Spring Boot: IoC/DI, starters, anotações e configuração', 120],
    [4, 'L', 'Regimento Interno TRT4: estrutura e órgãos (leitura 1)', 120],
    [5, 'P', 'Regência nominal/verbal e crase', 90],
    [5, 'R', 'Razões, proporções, divisão proporcional e regra de três', 60],
    [6, 'J', 'JPA 2.0 e Hibernate 5+: mapeamento, ciclo de vida, consultas', 90],
    [6, 'L', 'Resolução CNJ 400/2021 (sustentabilidade)', 60],
  ]),
  semana(2, '2026-11-02', 1, 'Microsserviços da PDPJ-Br e autenticação (Keycloak/OAuth2). Pontuação.', [
    [0, 'P', 'Pontuação: vírgula e demais sinais', 120],
    [1, 'J', 'PDPJ-Br: microsserviços, Service Discovery (Eureka), API Gateway (Zuul)', 120],
    [2, 'R', 'Porcentagem, acréscimos e descontos sucessivos', 120],
    [3, 'J', 'SSO, Keycloak, OAuth2 (RFC 6749) e boas práticas (RFC 9700)', 120],
    [4, 'L', 'Regimento Interno TRT4: competências e funcionamento (leitura 2)', 120],
    [5, 'P', 'Pronomes, colocação pronominal e vozes do verbo', 90],
    [5, 'R', 'Inteiros, racionais, frações, múltiplos e divisores', 60],
    [6, 'J', 'Hibernate Envers, Flyway, MapStruct e H2 Database', 90],
    [6, 'L', 'Resolução CNJ 351/2020 (assédio moral, sexual e discriminação)', 60],
  ]),
  semana(3, '2026-11-09', 1, 'Estatística (média, mediana, dispersão) é conteúdo novo do RLM. Mensageria e contêineres da PDPJ.', [
    [0, 'P', 'Interpretação, denotação/conotação, intertextualidade, contexto histórico', 120],
    [1, 'J', 'RabbitMQ, evento negocial, webhooks e APIs reversas', 120],
    [2, 'R', 'Estatística: média simples e ponderada, moda e mediana', 120],
    [3, 'J', 'Docker, Kubernetes, Rancher; CI/CD e deploy na PDPJ-Br', 120],
    [4, 'L', 'Resolução CSJT 360/2023 (violência, assédio e discriminação na JT)', 120],
    [5, 'P', 'Coordenação, subordinação e conectivos', 90],
    [5, 'R', 'Dispersão: amplitude, desvio médio, variância e desvio padrão', 60],
    [6, 'J', 'Normativos: Portarias CNJ 253/2020, 284/2021 e 131/2021', 90],
    [6, 'L', 'Código de Conduta TRT4 (Portaria 4.573/2023, compilada 2025)', 60],
  ]),
  semana(4, '2026-11-16', 1, 'Primeira redação FCC corrigida no app. Versões novas: Jakarta EE 11, JPA 3.2, Hibernate 7.', [
    [0, 'P', 'Correlação de tempos e modos; flexão nominal e verbal', 120],
    [1, 'J', 'Jakarta EE 8 x 11, Jakarta Persistence 3.2 e Hibernate ORM 7.x', 120],
    [2, 'R', 'Gráficos e tabelas: histogramas, setores e infográficos', 120],
    [3, 'J', 'Normativos: Res. CNJ 396/2021 (ENSEC-PJ), Portaria 162/2021, Res. 443/2022', 120],
    [4, 'L', 'Regimento Interno TRT4: revisão e questões', 120],
    [5, 'P', 'Redação 1: dissertativa FCC, 20 a 30 linhas, corrigir no app', 90],
    [5, 'R', 'Sequências lógicas; orientação espacial e temporal', 60],
    [6, 'J', 'MoReq-Jus 2ª ed. (Res. CNJ 522/2023) e Res. CNJ 574/2024', 90],
    [6, 'L', 'Código de Conduta TRT4: questões', 60],
  ]),
  semana(5, '2026-11-23', 1, 'Inscrição termina em 25/11 e o pagamento em 26/11. Fechar a Fase 1 com questões FCC.', [
    [0, 'P', 'Formação de palavras, sinonímia/antonímia, ortografia e acentuação', 120],
    [1, 'J', 'Java: exceções, coleções, bibliotecas e acesso a banco', 120],
    [2, 'R', 'Lógica proposicional: negação e equivalências', 120],
    [3, 'J', 'JUnit 6 (Jupiter), Mockito e cobertura de código [T]', 120],
    [4, 'L', 'Legislação: revisão geral e questões', 120],
    [5, 'P', 'Redação oficial e reescrita de frases (equivalência de estruturas)', 90],
    [5, 'R', 'Questões FCC mistas de RLM', 60],
    [6, 'J', 'Questões FCC de Java/Spring (TRTs)', 90],
    [6, 'L', 'Revisão: Res. CNJ 400/2021 e 351/2020', 60],
  ]),

  // ── Fase 2 ────────────────────────────────────────────────────────────────
  semana(6, '2026-11-30', 2, 'Início de infra: TCP/IP e protocolos. Começa o bloco de Direitos Humanos. Uma redação por semana a partir de agora.', [
    [0, 'N', 'TCP/IP, IPv4/IPv6, endereçamento e sub-redes (CIDR)', 120],
    [1, 'S', 'Princípios de SI; ISO/IEC 27001:2024 e 27002:2022', 120],
    [2, 'N', 'Protocolos: TCP, UDP, ARP, DNS, DHCP, HTTP, SMTP/POP/IMAP, LDAP, SSH', 120],
    [3, 'S', 'OWASP Top 10:2025, desenvolvimento seguro e programação defensiva', 120],
    [4, 'L', 'DH: evolução, fundamentos, gerações e características; tratados x CF/88', 120],
    [5, 'P', 'Redação 2 (tema de interesse geral)', 90],
    [5, 'P', 'Questões FCC de Português', 60],
    [6, 'N', 'SO: processos, threads, escalonamento, deadlock e starvation', 90],
    [6, 'Q', 'Questões: C#/.NET e banco de dados', 60],
  ]),
  semana(7, '2026-12-07', 2, 'Camada física/enlace, criptografia e governança do TRT4 (modelo de governança e PDTIC).', [
    [0, 'N', 'Interconexão, cabeamento (NBR 14565:2019), fibra, VLAN 802.1Q, STP/RSTP', 120],
    [1, 'S', 'Criptografia, hashes, certificados, ICP, TLS 1.2/1.3', 120],
    [2, 'N', 'SO: memória, paginação, memória virtual e E/S', 120],
    [3, 'S', 'COBIT 2019 [A]; modelo de governança de TIC e PDTIC 2024-2026 do TRT4', 120],
    [4, 'L', 'DH: DUDH, PIDCP, PIDESC e protocolos facultativos', 120],
    [5, 'P', 'Redação 3', 90],
    [5, 'P', 'Questões FCC de Português', 60],
    [6, 'N', 'Linux (Red Hat/Oracle Linux): comandos, permissões, systemd', 90],
    [6, 'Q', 'Questões: engenharia de software, UML e ágil', 60],
  ]),
  semana(8, '2026-12-14', 2, 'Wi-Fi novo (802.11be), Windows Server 2025 e PMBOK 8ª edição.', [
    [0, 'N', 'Wi-Fi 802.11ac/ax/be; 802.1X; família 802.3', 120],
    [1, 'S', 'Firewall, WAF, UTM, DMZ, IDS/IPS/SIEM, VPN e ZTNA', 120],
    [2, 'N', 'Windows Server 2019/2022/2025, Active Directory, PowerShell, WSUS', 120],
    [3, 'S', 'PMBOK 8ª edição [A]', 120],
    [4, 'L', 'DH: sistema interamericano (CADH, Comissão, Corte, San Salvador)', 120],
    [5, 'P', 'Redação 4', 90],
    [5, 'P', 'Questões FCC de Português', 60],
    [6, 'N', 'Gerência e monitoramento: SNMP, QoS, Zabbix, Prometheus, Grafana, ELK', 90],
    [6, 'Q', 'Questões: front-end, REST e XML', 60],
  ]),
  semana(9, '2026-12-21', 2, 'Semana de festas: carga reduzida (sem estudo em 24 e 25/12).', [
    [0, 'N', 'NAT, IPSec, AAA, proxy reverso, SSL offloading e balanceamento', 120],
    [1, 'S', 'ITIL Version 5 [A]', 120],
    [2, 'L', 'DH: CERD, CEDAW, crianças, PcD, povos indígenas, meio ambiente', 120],
    [5, 'P', 'Redação 5', 90],
    [6, 'N', 'Servidores de aplicação e web: JBoss/WildFly, Apache, IIS', 90],
    [6, 'S', 'LGPD (Lei 13.709/2018)', 60],
  ]),
  semana(10, '2026-12-28', 2, 'Semana de festas: carga reduzida (sem estudo em 31/12 e 01/01). Fecha DH e modelos de processo.', [
    [0, 'N', 'Revisão de redes e questões FCC', 120],
    [1, 'S', 'CMMI v3.0, ISO/IEC/IEEE 12207:2021 e MR-MPS-SW 2024', 120],
    [2, 'L', 'DH: TPI, Carta da ONU/CIJ, Res. CNJ 492/2023, CSJT 368/2023, grupos vulneráveis', 120],
    [5, 'P', 'Redação 6', 90],
    [5, 'N', 'Questões de sistemas operacionais', 60],
    [6, 'S', 'Ataques, malware, controle de acesso (RBAC, MFA) e questões', 120],
  ]),

  // ── Fase 3 ────────────────────────────────────────────────────────────────
  semana(11, '2027-01-04', 3, 'Só questões FCC por assunto. Montar o caderno de erros.', [
    [0, 'P', 'Questões FCC de Português (TRTs, TRF4 2025) e caderno de erros', 120],
    [1, 'J', 'Questões: PDPJ-Br, Java e Spring', 120],
    [2, 'N', 'Questões de redes', 120],
    [3, 'S', 'Questões de segurança', 120],
    [4, 'Q', 'Questões: SQL, PL/SQL, PostgreSQL 15-18, Oracle 19c', 120],
    [5, 'P', 'Redação 7', 90],
    [5, 'R', 'Questões de RLM', 60],
    [6, 'R', 'Questões de estatística e lógica', 90],
    [6, 'Q', 'Questões: IA/ML/LLMs, low-code e assistentes de IA', 60],
  ]),
  semana(12, '2027-01-11', 3, 'Convocação sai em 11/01: conferir o local. Simulado 1 no sábado.', [
    [0, 'P', 'Questões FCC de Português', 120],
    [1, 'N', 'Questões de sistemas operacionais', 120],
    [2, 'S', 'Questões de governança (PMBOK, ITIL, COBIT, CMMI)', 120],
    [3, 'Q', 'Questões: web, arquiteturas e eng. de software', 120],
    [4, 'R', 'Questões de RLM', 120],
    [5, 'X', 'Simulado 1: 60 questões e redação à mão, em 4h e sem relógio', 240],
    [6, 'Q', 'Correção do simulado 1 e caderno de erros', 60],
  ]),
  semana(13, '2027-01-18', 3, 'Revisão dos erros e Simulado 2 no sábado.', [
    [0, 'P', 'Revisão do caderno de erros de Português', 120],
    [1, 'J', 'Revisão: PDPJ-Br e normativos CNJ', 120],
    [2, 'R', 'Revisão do caderno de erros de RLM', 120],
    [3, 'Q', 'Revisão do caderno de erros dos Específicos', 120],
    [4, 'N', 'Revisão rápida de redes/SO', 60],
    [4, 'S', 'Revisão rápida de segurança/governança', 60],
    [5, 'X', 'Simulado 2: 60 questões e redação à mão, em 4h e sem relógio', 240],
    [6, 'P', 'Correção do simulado 2 e reescrita da redação', 60],
  ]),

  // ── Fase 4 ────────────────────────────────────────────────────────────────
  semana(14, '2027-01-25', 4, 'Revisão leve, nada novo. Prova no domingo, 31/01, em Porto Alegre (Técnico de manhã, Analista à tarde).', [
    [0, 'P', 'Revisão leve: resumos de Português', 60],
    [1, 'L', 'Legislação e DH: flashcards', 60],
    [2, 'J', 'PDPJ-Br e normativos: flashcards', 60],
    [3, 'N', 'Redes/SO: resumos', 60],
    [4, 'S', 'Segurança/governança: resumos', 60],
    [5, 'P', 'Leitura leve; separar documentos e caneta preta transparente', 60],
  ]),
]

export function dataDaSessao(semana: SemanaPlano, dia: number): string {
  const [y, m, d] = semana.inicio.split('-').map(Number)
  return new Date(y, m - 1, d + dia).toLocaleDateString('en-CA')
}

export function minutosDaSemana(semana: SemanaPlano): number {
  return semana.sessoes.reduce((sum, s) => sum + s.minutos, 0)
}

// Semana que contém a data (ou a primeira/última se a data estiver fora do plano).
export function indiceSemanaAtual(hoje: Date = new Date()): number {
  const chave = hoje.toLocaleDateString('en-CA')
  for (let i = PLANO_TRT4.length - 1; i >= 0; i--) {
    if (chave >= PLANO_TRT4[i].inicio) return i
  }
  return 0
}

export function horasPlanejadasPorBloco(): Record<BlocoEstudoId, number> {
  const total = {} as Record<BlocoEstudoId, number>
  for (const s of PLANO_TRT4.flatMap(w => w.sessoes)) {
    total[s.bloco] = (total[s.bloco] ?? 0) + s.minutos / 60
  }
  return total
}
