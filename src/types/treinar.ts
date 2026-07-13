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
