export type BlocoEstudoId = 'P' | 'R' | 'L' | 'J' | 'N' | 'S' | 'Q' | 'X'

export type BlocoEstudo = {
  id: BlocoEstudoId
  nome: string
  cor: string
  horasMeta: number | null
}

// Blocos do plano de estudo do edital TRT4 2026 (seção 8 do documento de
// atualização). horasMeta = carga total prevista até a prova; null = sem meta
// própria (simulados misturam todos os blocos).
export const BLOCOS_ESTUDO: BlocoEstudo[] = [
  { id: 'P', nome: 'Português e Redação', cor: '#a78bfa', horasMeta: 45 },
  { id: 'R', nome: 'Raciocínio Lógico', cor: '#f59e0b', horasMeta: 25 },
  { id: 'L', nome: 'Legislação e Direitos Humanos', cor: '#ec4899', horasMeta: 25 },
  { id: 'J', nome: 'Java, Spring e PDPJ-Br', cor: '#61dafb', horasMeta: 35 },
  { id: 'N', nome: 'Redes e Sistemas Operacionais', cor: '#3b82f6', horasMeta: 30 },
  { id: 'S', nome: 'Segurança e Governança', cor: '#22c55e', horasMeta: 25 },
  { id: 'Q', nome: 'Revisão por Questões', cor: '#94a3b8', horasMeta: 15 },
  { id: 'X', nome: 'Simulado', cor: '#ef4444', horasMeta: null },
]

export const BLOCO_POR_ID = Object.fromEntries(BLOCOS_ESTUDO.map(b => [b.id, b])) as Record<BlocoEstudoId, BlocoEstudo>

const DEFAULT_COLOR = '#61dafb'

// Títulos do cronograma seguem o padrão "<bloco> — <assunto>"; a cor vem do bloco.
export function corDoTitulo(titulo: string): string {
  const nomeBloco = titulo.split(' — ')[0].trim()
  return BLOCOS_ESTUDO.find(b => b.nome === nomeBloco)?.cor ?? DEFAULT_COLOR
}
