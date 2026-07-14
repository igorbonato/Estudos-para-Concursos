export type CronogramaItem = {
  id: string
  titulo: string
  data_prevista: string
  duracao_minutos: number
  status: boolean
}

export type DisciplinaProgressItem = {
  id: string
  nome: string
  progresso: number
  color: string
}

export type RecentSessionItem = {
  id: string
  titulo: string
  data: string
  tempoGastoMinutos: number
}
