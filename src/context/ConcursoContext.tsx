import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'

export type Concurso = {
  id: string
  nome: string
  data_prova: string | null
}

const DEFAULT_CONCURSOS: Omit<Concurso, 'id'>[] = [
  { nome: 'TRT4', data_prova: '2027-01-31' }, // Edital nº 01/2026 (FCC)
  { nome: 'SEFAZ-RS', data_prova: null },
  { nome: 'PROCERGS', data_prova: null },
  { nome: 'TJRS', data_prova: null },
  { nome: 'TCE-RS', data_prova: null },
]

type ConcursoContextValue = {
  concursos: Concurso[]
  loading: boolean
  error: string | null
  selectedConcurso: Concurso | null
  setSelectedConcurso: (c: Concurso) => void
  addConcurso: (nome: string) => Promise<void>
  removeConcurso: (id: string) => Promise<void>
  updateDataProva: (id: string, dataProva: string | null) => Promise<void>
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

  const updateDataProva = async (id: string, dataProva: string | null) => {
    const { data, error } = await supabase
      .from('concursos')
      .update({ data_prova: dataProva })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      setError(error.message)
      return
    }

    setConcursos(prev => prev.map(c => (c.id === id ? (data as Concurso) : c)))
    setSelectedConcurso(sel => (sel?.id === id ? (data as Concurso) : sel))
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
      .insert(DEFAULT_CONCURSOS)
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
        updateDataProva,
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
