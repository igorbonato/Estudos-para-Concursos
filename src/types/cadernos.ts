export type PastaRow = {
  id: string
  disciplina_id: string | null
  parent_id: string | null
  nome: string
  ordem: number
}

export type PastaNode = PastaRow & { children: PastaNode[] }

export type Nota = {
  id: string
  pasta_id: string
  titulo: string
  conteudo: string | null
  created_at: string
}
