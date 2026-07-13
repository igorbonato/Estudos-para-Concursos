import { createContext, useContext, useState, type ReactNode } from 'react'

export type Concurso = string

export const DEFAULT_CONCURSOS: Concurso[] = ['TRT4', 'SEFAZ-RS', 'PROCERGS', 'TJRS', 'TCE-RS']

type ConcursoContextValue = {
  concursos: Concurso[]
  selectedConcurso: Concurso
  setSelectedConcurso: (c: Concurso) => void
  addConcurso: (nome: string) => void
  removeConcurso: (nome: string) => void
  resetConcursos: () => void
}

const ConcursoContext = createContext<ConcursoContextValue | null>(null)

export function ConcursoProvider({ children }: { children: ReactNode }) {
  const [concursos, setConcursos] = useState<Concurso[]>(DEFAULT_CONCURSOS)
  const [selectedConcurso, setSelectedConcurso] = useState<Concurso>(DEFAULT_CONCURSOS[0])

  const addConcurso = (nome: string) => {
    const trimmed = nome.trim()
    if (!trimmed || concursos.includes(trimmed)) return
    setConcursos(prev => [...prev, trimmed])
  }

  const removeConcurso = (nome: string) => {
    setConcursos(prev => {
      const next = prev.filter(c => c !== nome)
      if (selectedConcurso === nome) setSelectedConcurso(next[0] ?? '')
      return next
    })
  }

  const resetConcursos = () => {
    setConcursos(DEFAULT_CONCURSOS)
    setSelectedConcurso(DEFAULT_CONCURSOS[0])
  }

  return (
    <ConcursoContext.Provider
      value={{ concursos, selectedConcurso, setSelectedConcurso, addConcurso, removeConcurso, resetConcursos }}
    >
      {children}
    </ConcursoContext.Provider>
  )
}

export function useConcurso() {
  const ctx = useContext(ConcursoContext)
  if (!ctx) throw new Error('useConcurso must be used within a ConcursoProvider')
  return ctx
}
