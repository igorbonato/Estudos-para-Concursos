import { useCallback, useState } from 'react'

const STORAGE_KEY = 'concursoapp_edital_trt4_2026_progresso'

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

function save(set: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
  } catch {
    // sem storage disponível: o progresso vale só para esta sessão
  }
}

// Tópicos do edital marcados como estudados (salvos no navegador).
export function useEditalProgresso() {
  const [concluidos, setConcluidos] = useState<Set<string>>(load)

  const toggle = useCallback((chave: string) => {
    setConcluidos(prev => {
      const next = new Set(prev)
      if (next.has(chave)) next.delete(chave)
      else next.add(chave)
      save(next)
      return next
    })
  }, [])

  return { concluidos, toggle }
}
