export const BANCAS = ['FCC', 'Cebraspe', 'FGV', 'Vunesp', 'IBFC'] as const

export type CorrecaoGramatical = {
  original: string
  corrigido: string
  explicacao: string
}

export type RedacaoFeedback = {
  notaFinal: number
  notaMaxima: number
  correcoesGramaticais: CorrecaoGramatical[]
  fazer: string[]
  nuncaFazer: string[]
  redacaoNota1000: { titulo: string; texto: string }
}
