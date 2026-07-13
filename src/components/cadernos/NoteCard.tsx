import type { Nota } from '../../data/cadernosMock'

type Props = {
  nota: Nota
  onClick: () => void
}

export default function NoteCard({ nota, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/30"
    >
      <h3 className="line-clamp-1 text-sm font-semibold text-foreground">{nota.titulo}</h3>
      <p className="line-clamp-2 text-xs text-muted-foreground">{nota.preview}</p>
      <span className="mt-auto pt-1 font-mono text-xs text-muted-foreground/80">{nota.data}</span>
    </button>
  )
}
