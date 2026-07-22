export type EditalBloco = {
  titulo: string
  topicos: string[]
}

export type EditalCargo = {
  concurso: string
  cargo: string
  codigo: string
  especificos: EditalBloco[]
  gerais: EditalBloco[]
}

export const EDITAL_TRT4: EditalCargo = {
  concurso: 'TRT4',
  codigo: 'A14',
  cargo: 'Analista Judiciário, Área Apoio Especializado, Especialidade Tecnologia da Informação',
  especificos: [
    { titulo: 'Desenvolvimento Web', topicos: ['HTML5 e CSS3', 'XML e JSON'] },
    { titulo: 'Ambientes e Linguagens de Programação', topicos: ['Java', 'JavaScript', 'TypeScript', 'Angular', 'Python'] },
    { titulo: 'Ferramentas e Frameworks JavaScript', topicos: ['Node.js', 'Angular'] },
    { titulo: 'Bibliotecas de Componentes de Interface', topicos: ['Bootstrap', 'Angular Material', 'jQuery'] },
    {
      titulo: 'Frameworks Java',
      topicos: ['Jakarta EE 8', 'Hibernate', 'JPA 2.0', 'Spring / Spring Boot / Spring Cloud', 'Spring Eureka e Zuul', 'MapStruct'],
    },
    { titulo: 'Web Services e APIs', topicos: ['REST', 'SOAP', 'Swagger', 'JSON Web Tokens (JWT)'] },
    { titulo: 'Busca, Indexação e Análise de Dados', topicos: ['Elasticsearch', 'Logstash', 'Kibana'] },
    { titulo: 'Servidores de Aplicação', topicos: ['JBoss', 'Tomcat', 'WildFly'] },
    { titulo: 'Testes de Software', topicos: ['Cobertura de Código', 'Testes Unitários', 'Testes de Integração', 'JUnit', 'Mockito'] },
    {
      titulo: 'Arquitetura de Sistemas',
      topicos: ['Cliente/Servidor', 'Multicamadas', 'Hub', 'Web Server', 'Arquitetura Orientada a Serviços (SOA)', 'Mensageria e Webhooks'],
    },
    {
      titulo: 'Inteligência Artificial e Aprendizado de Máquina',
      topicos: [
        'Pré-processamento de Dados',
        'Modelos Preditivos (Supervisionados)',
        'Modelos Descritivos (Não Supervisionados)',
        'Avaliação de Modelos',
        'Python / scikit-learn / keras / pytorch',
      ],
    },
    {
      titulo: 'Banco de Dados',
      topicos: ['Modelo E-R', 'SQL e PL/SQL', 'Oracle', 'SQL Server', 'PostgreSQL', 'H2 Database', 'Data Warehouse, Data Mining e OLAP'],
    },
    {
      titulo: 'DevOps e DevSecOps',
      topicos: [
        'Kubernetes',
        'Docker',
        'Rancher',
        'Jenkins e Maven',
        'Git / GitLab / Gitflow',
        'Keycloak, SSO e OAuth2',
        'CI/CD',
        'Proxy Reverso, SSL Offloading e Balanceamento de Carga',
      ],
    },
    { titulo: 'Arquitetura de Computadores', topicos: ['Processador e Memória', 'Execução de Instruções e Paralelismo', 'Virtualização'] },
    {
      titulo: 'Sistemas de Armazenamento de Dados',
      topicos: [
        'Sistemas de Arquivos',
        'SAN (Zoning, Fabric, Fibre Channel)',
        'RAID',
        'Protocolos SMB e NFS',
        'Armazenamento por Objeto e Bloco',
        'Backup e VTL',
      ],
    },
    {
      titulo: 'Sistemas Operacionais',
      topicos: ['Gerência de Processos', 'Gerência de Memória', 'Windows (AD, RDS, WSUS, PowerShell)', 'Linux (systemd, LVM, iptables, bash)'],
    },
    {
      titulo: 'Redes de Computadores',
      topicos: [
        'Meios de Transmissão e VLAN',
        'TCP/IP v4 e v6',
        'Gerenciamento de Redes (SNMP, ICMP, QoS)',
        'Roteamento (OSPF, BGP)',
        'Protocolos de Aplicação (DNS, DHCP, LDAP, NTP, SMTP)',
        'Voz sobre IP (SIP, RTP)',
        'Monitoramento (Zabbix, Prometheus, Grafana)',
      ],
    },
    { titulo: 'Computação em Nuvem', topicos: ['Modelos de Serviço (IaaS, PaaS, SaaS)', 'Modelos de Implantação (NIST SP 800-145)'] },
    {
      titulo: 'Segurança da Informação',
      topicos: [
        'Segurança de Infraestrutura (Firewall, IPS, IDS, SIEM)',
        'Desenvolvimento Seguro (OWASP)',
        'Normas e Frameworks (ISO 27001/27002, CIS Controls)',
        'LGPD',
        'Malwares e Ataques Cibernéticos',
        'Criptografia e Certificação Digital',
      ],
    },
    { titulo: 'Gestão e Governança de TI', topicos: ['ITIL', 'COBIT', 'Métodos Ágeis'] },
  ],
  gerais: [
    {
      titulo: 'Português',
      topicos: [
        'Ortografia e Acentuação',
        'Pontuação e Crase',
        'Morfologia e Sintaxe',
        'Concordância e Regência',
        'Coesão e Coerência Textual',
        'Interpretação de Texto',
        'Figuras de Linguagem e Argumentação',
      ],
    },
    {
      titulo: 'Raciocínio Lógico-Matemático',
      topicos: ['Números e Operações', 'Razão, Proporção e Porcentagem', 'Estruturas Lógicas e Dedução', 'Raciocínio Sequencial e Espacial'],
    },
    {
      titulo: 'Legislação',
      topicos: [
        'Lei 8.112/1990',
        'Lei 9.784/1999',
        'Lei 8.429/1992 e Lei 14.230/2021 (Improbidade)',
        'Lei 14.133/2021 (Licitações)',
        'LGPD (Lei 13.709/2018)',
        'Lei 13.146/2015 (Inclusão da Pessoa com Deficiência)',
        'Regimento Interno do TRT4',
        'Resolução CNJ 400/2021',
      ],
    },
  ],
}
