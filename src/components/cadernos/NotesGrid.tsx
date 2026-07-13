import { Loader2 } from 'lucide-react'
import type { Nota } from '../../types/cadernos'
import NoteCard from './NoteCard'

type Props = {
  notas: Nota[]
  loading: boolean
  onOpenNota: (nota: Nota) => void
}

export default function NotesGrid({ notas, loading, onOpenNota }: Props) {
  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border p-10 text-sm text-muted-foreground">
        <Loader2 size={16} className="animate-spin" />
        Carregando anotações...
      </div>
    )
  }

  if (notas.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border p-10 text-sm text-muted-foreground">
        Nenhuma anotação nesta pasta ainda.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {notas.map(nota => (
        <NoteCard key={nota.id} nota={nota} onClick={() => onOpenNota(nota)} />
      ))}
    </div>
  )
}
