import { Layers, Loader2 } from 'lucide-react'
import type { StudySet } from '../../types/treinar'

type Props = {
  sets: StudySet[]
  loading: boolean
  onSelect: (set: StudySet) => void
}

export default function StudySetList({ sets, loading, onSelect }: Props) {
  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border p-10 text-sm text-muted-foreground">
        <Loader2 size={16} className="animate-spin" />
        Carregando listas...
      </div>
    )
  }

  if (sets.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border p-10 text-sm text-muted-foreground">
        Nenhuma lista disponível ainda. Crie uma em "Criar Nova Lista".
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {sets.map(set => (
        <button
          key={set.id}
          onClick={() => onSelect(set)}
          className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5 text-left transition-colors hover:border-primary/30"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Layers size={17} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{set.nome}</h3>
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">{set.cards.length} cartas</p>
          </div>
        </button>
      ))}
    </div>
  )
}
