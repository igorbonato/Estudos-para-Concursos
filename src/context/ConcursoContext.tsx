import { createContext, useContext, useState, type ReactNode } from 'react'

export type Concurso = 'TRT4' | 'SEFAZ-RS' | 'PROCERGS' | 'TJRS' | 'TCE-RS'

export const CONCURSOS: Concurso[] = ['TRT4', 'SEFAZ-RS', 'PROCERGS', 'TJRS', 'TCE-RS']

type ConcursoContextValue = {
  selectedConcurso: Concurso
  setSelectedConcurso: (c: Concurso) => void
}

const ConcursoContext = createContext<ConcursoContextValue | null>(null)

export function ConcursoProvider({ children }: { children: ReactNode }) {
  const [selectedConcurso, setSelectedConcurso] = useState<Concurso>('TRT4')

  return (
    <ConcursoContext.Provider value={{ selectedConcurso, setSelectedConcurso }}>
      {children}
    </ConcursoContext.Provider>
  )
}

export function useConcurso() {
  const ctx = useContext(ConcursoContext)
  if (!ctx) throw new Error('useConcurso must be used within a ConcursoProvider')
  return ctx
}
