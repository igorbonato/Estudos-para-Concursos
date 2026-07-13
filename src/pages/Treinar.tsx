import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { StudySet } from '../types/treinar'
import CreateSetList from '../components/treinar/CreateSetList'
import StudySetList from '../components/treinar/StudySetList'
import StudySession from '../components/treinar/StudySession'

type Aba = 'criar' | 'praticar'

type DeckRow = {
  id: string
  nome: string
  flashcards: { id: string; pergunta: string; resposta: string }[] | null
}

export default function Treinar() {
  const [sets, setSets] = useState<StudySet[]>([])
  const [loadingSets, setLoadingSets] = useState(true)
  const [setsError, setSetsError] = useState<string | null>(null)
  const [createError, setCreateError] = useState<string | null>(null)
  const [aba, setAba] = useState<Aba>('praticar')
  const [setSelecionado, setSetSelecionado] = useState<StudySet | null>(null)

  useEffect(() => {
    let active = true

    async function loadSets() {
      setLoadingSets(true)
      const { data, error } = await supabase
        .from('flashcard_decks')
        .select('id, nome, flashcards(id, pergunta, resposta)')
      if (!active) return

      if (error) {
        setSetsError(error.message)
      } else {
        const rows = (data ?? []) as DeckRow[]
        setSets(
          rows.map(row => ({
            id: row.id,
            nome: row.nome,
            cards: (row.flashcards ?? []).map(c => ({ id: c.id, termo: c.pergunta, definicao: c.resposta })),
          })),
        )
        setSetsError(null)
      }
      setLoadingSets(false)
    }

    loadSets()
    return () => {
      active = false
    }
  }, [])

  const handleCreate = async (nome: string, cards: { termo: string; definicao: string }[]): Promise<boolean> => {
    setCreateError(null)

    const { data: deck, error: deckError } = await supabase
      .from('flashcard_decks')
      .insert({ nome })
      .select()
      .single()

    if (deckError) {
      setCreateError(deckError.message)
      return false
    }

    const { data: cardRows, error: cardsError } = await supabase
      .from('flashcards')
      .insert(cards.map(c => ({ deck_id: deck.id, pergunta: c.termo, resposta: c.definicao })))
      .select()

    if (cardsError) {
      setCreateError(cardsError.message)
      await supabase.from('flashcard_decks').delete().eq('id', deck.id)
      return false
    }

    const newSet: StudySet = {
      id: deck.id,
      nome: deck.nome,
      cards: (cardRows ?? []).map(c => ({ id: c.id, termo: c.pergunta, definicao: c.resposta })),
    }
    setSets(prev => [...prev, newSet])
    setAba('praticar')
    return true
  }

  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-6 flex items-center gap-1 rounded-md border border-border p-1" style={{ width: 'fit-content' }}>
        <button
          onClick={() => setAba('criar')}
          className={`rounded px-4 py-1.5 text-sm font-medium transition-colors ${
            aba === 'criar' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Criar Nova Lista
        </button>
        <button
          onClick={() => {
            setAba('praticar')
            setSetSelecionado(null)
          }}
          className={`rounded px-4 py-1.5 text-sm font-medium transition-colors ${
            aba === 'praticar' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Praticar
        </button>
      </div>

      {setsError && (
        <div className="mb-4 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
          {setsError}
        </div>
      )}

      {aba === 'criar' && <CreateSetList onCreate={handleCreate} error={createError} />}

      {aba === 'praticar' &&
        (setSelecionado ? (
          <StudySession set={setSelecionado} onExit={() => setSetSelecionado(null)} />
        ) : (
          <StudySetList sets={sets} loading={loadingSets} onSelect={setSetSelecionado} />
        ))}
    </div>
  )
}
