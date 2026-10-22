export const BANCAS = ['FCC', 'Cebraspe', 'FGV', 'Vunesp', 'IBFC'] as const

export type CorrecaoGramatical = {
  original: string
  corrigido: string
  explicacao: string
}

export type CriterioNota = {
  grupo: string
  criterio: string
  nota: number
  notaMaxima: number
  comentario: string
}

export type RedacaoFeedback = {
  notaFinal: number
  notaMaxima: number
  // Ausente em redações corrigidas antes da grade FCC 2026.
  criterios?: CriterioNota[]
  motivoNotaZero?: string
  correcoesGramaticais: CorrecaoGramatical[]
  fazer: string[]
  nuncaFazer: string[]
  // Nome mantido por compatibilidade com o JSON já salvo em redacoes.
  redacaoNota1000: { titulo: string; texto: string }
}

// Nota mínima da redação no edital TRT4 2026 (0 a 10).
export const NOTA_MINIMA_REDACAO = 6
