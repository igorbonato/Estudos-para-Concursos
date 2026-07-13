import type { Nota } from '../../data/cadernosMock'
import NoteCard from './NoteCard'

type Props = {
  notas: Nota[]
  onOpenNota: (nota: Nota) => void
}

export default function NotesGrid({ notas, onOpenNota }: Props) {
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
