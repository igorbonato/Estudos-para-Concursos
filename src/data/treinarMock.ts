export type StudyCard = {
  id: string
  termo: string
  definicao: string
}

export type StudySet = {
  id: string
  nome: string
  cards: StudyCard[]
}

export const STUDY_SETS_MOCK: StudySet[] = [
  {
    id: 'comandinhos-docker',
    nome: 'Comandinhos Docker',
    cards: [
      { id: 'd1', termo: 'docker images', definicao: 'mostra as imagens disponíveis no host' },
      { id: 'd2', termo: 'docker ps', definicao: 'lista contêineres em execução' },
      { id: 'd3', termo: 'docker ps -a', definicao: 'lista todos os contêineres (inclusive parados)' },
      { id: 'd4', termo: 'docker inspect', definicao: 'mostra informações detalhadas do Docker (versão, driver, etc.)' },
      { id: 'd5', termo: 'docker logs', definicao: 'exibe os logs de saída de um contêiner' },
      { id: 'd6', termo: 'docker exec', definicao: 'executa um comando dentro de um contêiner em execução' },
      { id: 'd7', termo: 'docker build', definicao: 'cria uma imagem a partir de um Dockerfile' },
      { id: 'd8', termo: 'docker run', definicao: 'cria e inicia um novo contêiner a partir de uma imagem' },
      { id: 'd9', termo: 'docker stop', definicao: 'para um contêiner em execução de forma graciosa' },
      { id: 'd10', termo: 'docker rm', definicao: 'remove um ou mais contêineres parados' },
    ],
  },
  {
    id: 'tipos-de-teste-de-software',
    nome: 'tipos de teste de software',
    cards: [
      { id: 't1', termo: 'Teste Unitário', definicao: 'valida a menor unidade de código isoladamente, geralmente uma função ou método' },
      { id: 't2', termo: 'Teste de Integração', definicao: 'verifica se módulos ou serviços diferentes funcionam corretamente quando combinados' },
      { id: 't3', termo: 'Teste de Regressão', definicao: 'garante que uma mudança recente não quebrou funcionalidades que já existiam' },
      { id: 't4', termo: 'Teste de Aceitação', definicao: 'confirma se o sistema atende aos requisitos do usuário/negócio antes da entrega' },
      { id: 't5', termo: 'Teste de Carga', definicao: 'avalia o comportamento do sistema sob um volume alto de usuários ou requisições' },
      { id: 't6', termo: 'Teste de Fumaça (Smoke)', definicao: 'checagem rápida e superficial para garantir que as funções críticas não estão quebradas' },
      { id: 't7', termo: 'Teste E2E (Ponta a Ponta)', definicao: 'simula o fluxo completo do usuário real, do início ao fim, em um ambiente próximo do de produção' },
      { id: 't8', termo: 'Teste de Mutação', definicao: 'introduz pequenas falhas propositais no código para medir a qualidade dos testes existentes' },
    ],
  },
  {
    id: 'fundamentos-de-redes',
    nome: 'Fundamentos de Redes',
    cards: [
      { id: 'r1', termo: 'TCP', definicao: 'protocolo de transporte orientado à conexão, garante entrega ordenada e confiável dos dados' },
      { id: 'r2', termo: 'UDP', definicao: 'protocolo de transporte sem conexão, mais rápido porém sem garantia de entrega' },
      { id: 'r3', termo: 'DNS', definicao: 'traduz nomes de domínio em endereços IP' },
      { id: 'r4', termo: 'DHCP', definicao: 'atribui endereços IP automaticamente aos dispositivos de uma rede' },
      { id: 'r5', termo: 'HTTP/HTTPS', definicao: 'protocolos de transferência de hipertexto; o HTTPS adiciona criptografia via TLS' },
      { id: 'r6', termo: 'Firewall', definicao: 'filtra o tráfego de rede com base em regras de segurança predefinidas' },
      { id: 'r7', termo: 'VPN', definicao: 'cria um túnel criptografado para acesso remoto seguro a uma rede privada' },
      { id: 'r8', termo: 'Switch', definicao: 'conecta dispositivos na mesma rede local e encaminha quadros com base no endereço MAC' },
      { id: 'r9', termo: 'Roteador', definicao: 'encaminha pacotes entre redes diferentes com base no endereço IP' },
    ],
  },
]
