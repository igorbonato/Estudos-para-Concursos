import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'

export type Concurso = {
  id: string
  nome: string
  data_prova: string | null
}

const DEFAULT_CONCURSO_NAMES = ['TRT4', 'SEFAZ-RS', 'PROCERGS', 'TJRS', 'TCE-RS']

type ConcursoContextValue = {
  concursos: Concurso[]
  loading: boolean
  error: string | null
  selectedConcurso: Concurso | null
  setSelectedConcurso: (c: Concurso) => void
  addConcurso: (nome: string) => Promise<void>
  removeConcurso: (id: string) => Promise<void>
  resetConcursos: () => Promise<void>
}

const ConcursoContext = createContext<ConcursoContextValue | null>(null)

export function ConcursoProvider({ children }: { children: ReactNode }) {
  const [concursos, setConcursos] = useState<Concurso[]>([])
  const [selectedConcurso, setSelectedConcurso] = useState<Concurso | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)
      const { data, error } = await supabase.from('concursos').select('*').order('nome')
      if (!active) return

      if (error) {
        setError(error.message)
      } else {
        const list = (data ?? []) as Concurso[]
        setConcursos(list)
        setSelectedConcurso(prev => prev ?? list[0] ?? null)
        setError(null)
      }
      setLoading(false)
    }

    load()
    return () => {
      active = false
    }
  }, [])

  const addConcurso = async (nome: string) => {
    const trimmed = nome.trim()
    if (!trimmed || concursos.some(c => c.nome === trimmed)) return

    const { data, error } = await supabase.from('concursos').insert({ nome: trimmed }).select().single()
    if (error) {
      setError(error.message)
      return
    }
    setConcursos(prev => [...prev, data as Concurso])
    setError(null)
  }

  const removeConcurso = async (id: string) => {
    const { error } = await supabase.from('concursos').delete().eq('id', id)
    if (error) {
      setError(error.message)
      return
    }
    setConcursos(prev => {
      const next = prev.filter(c => c.id !== id)
      setSelectedConcurso(sel => (sel?.id === id ? next[0] ?? null : sel))
      return next
    })
    setError(null)
  }

  const resetConcursos = async () => {
    setLoading(true)
    const { error: deleteError } = await supabase.from('concursos').delete().not('id', 'is', null)
    if (deleteError) {
      setError(deleteError.message)
      setLoading(false)
      return
    }

    const { data, error: insertError } = await supabase
      .from('concursos')
      .insert(DEFAULT_CONCURSO_NAMES.map(nome => ({ nome })))
      .select()

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    const list = (data ?? []) as Concurso[]
    setConcursos(list)
    setSelectedConcurso(list[0] ?? null)
    setError(null)
    setLoading(false)
  }

  return (
    <ConcursoContext.Provider
      value={{
        concursos,
        loading,
        error,
        selectedConcurso,
        setSelectedConcurso,
        addConcurso,
        removeConcurso,
        resetConcursos,
      }}
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
