import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import type { StudyCard } from '../../types/treinar'

type Props = {
  cards: StudyCard[]
  onDelete: (cardId: string) => Promise<void>
}

export default function FlashcardList({ cards, onDelete }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (deletingId) return
    setDeletingId(id)
    await onDelete(id)
    setDeletingId(null)
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border p-10 text-sm text-muted-foreground">
        Nenhum cartão neste deck.
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-2 pt-4">
      {cards.map(card => (
        <div
          key={card.id}
          className="flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-3"
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{card.termo}</p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{card.definicao}</p>
          </div>
          <button
            onClick={() => handleDelete(card.id)}
            disabled={deletingId === card.id}
            className="flex-shrink-0 text-muted-foreground transition-colors hover:text-danger disabled:cursor-wait"
          >
            {deletingId === card.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
          </button>
        </div>
      ))}
    </div>
  )
}
