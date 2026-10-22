export type Guia = {
  slug: string
  filename: string
  title: string
  content: string
}

const TITLES: Record<string, string> = {
  GUIA_ESTUDO_MAPA_EDITAL_2026: 'Mapa do Edital 2026',
  GUIA_ESTUDO_PORTUGUES: 'Língua Portuguesa',
  GUIA_ESTUDO_REDACAO_FCC: 'Redação FCC',
  GUIA_ESTUDO_RLM: 'Raciocínio Lógico-Matemático',
  GUIA_ESTUDO_LEGISLACAO_TRT4: 'Noções de Legislação',
  GUIA_ESTUDO_DIREITOS_HUMANOS: 'Direitos Humanos',
  GUIA_ESTUDO_PDPJ_JAVA: 'PDPJ-Br e Stack Java',
  GUIA_ESTUDO_LINGUAGENS_ANALISTA: 'Linguagens (Analista)',
  GUIA_ESTUDO_DIRECIONADO: 'Desenvolvimento de Software e Frameworks',
  GUIA_ESTUDO_BANCO_DADOS: 'Banco de Dados',
  GUIA_ESTUDO_IA_ENG_SOFTWARE_2026: 'IA, Engenharia de Software e Testes 2026',
  GUIA_ESTUDO_GESTAO_GOVERNANCA_2026: 'Gestão, Governança e Processos 2026',
  GUIA_ESTUDO_GOVERNANCA_TI: 'Governança de TI',
  GUIA_ESTUDO_SEGURANCA: 'Segurança da Informação',
  GUIA_ESTUDO_SEGURANCA_2026: 'Segurança 2026: atualizações',
  GUIA_ESTUDO_REDES: 'Redes de Computadores',
  GUIA_ESTUDO_DEVOPS_INFRA_2026: 'DevOps, Infra e Redes 2026',
  GUIA_ESTUDO_SISTEMAS_OPERACIONAIS: 'Sistemas Operacionais',
  GUIA_ESTUDO_ARQUITETURA_SOFTWARE: 'Arquitetura de Software',
  GUIA_ESTUDO_ARQUITETURA_COMPUTADORES: 'Arquitetura de Computadores (rebaixado)',
}

// Ordem de prioridade do edital TRT4 2026: Gerais, depois Específicos [A+T],
// e por último o que só serve de apoio.
const ORDER = Object.keys(TITLES)

function fallbackTitle(filename: string, content: string): string {
  const match = content.match(/—\s*(.+?)\s*\(TRT/)
  if (match) return match[1].trim()

  return filename
    .replace(/^GUIA_ESTUDO_/, '')
    .split('_')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ')
}

const modules = import.meta.glob('../../guia/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const GUIAS: Guia[] = Object.entries(modules)
  .map(([path, content]) => {
    const filename = path.split('/').pop()!.replace(/\.md$/, '')
    return {
      slug: filename,
      filename,
      title: TITLES[filename] ?? fallbackTitle(filename, content),
      content,
    }
  })
  .sort((a, b) => {
    const ia = ORDER.indexOf(a.filename)
    const ib = ORDER.indexOf(b.filename)
    if (ia === -1 && ib === -1) return a.title.localeCompare(b.title)
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })
