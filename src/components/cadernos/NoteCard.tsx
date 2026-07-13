import type { Nota } from '../../types/cadernos'

type Props = {
  nota: Nota
  onClick: () => void
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim()
}

export default function NoteCard({ nota, onClick }: Props) {
  const preview = nota.conteudo ? stripHtml(nota.conteudo).slice(0, 120) : ''
  const data = new Date(nota.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/30"
    >
      <h3 className="line-clamp-1 text-sm font-semibold text-foreground">{nota.titulo}</h3>
      <p className="line-clamp-2 text-xs text-muted-foreground">{preview}</p>
      <span className="mt-auto pt-1 font-mono text-xs text-muted-foreground/80">{data}</span>
    </button>
  )
}
