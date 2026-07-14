import { Loader2 } from 'lucide-react'
import { useConcurso } from '../../context/ConcursoContext'
import type { DisciplinaProgressItem } from '../../types/dashboard'

type Props = {
  items: DisciplinaProgressItem[]
  loading: boolean
}

export default function DisciplineProgress({ items, loading }: Props) {
  const { selectedConcurso } = useConcurso()

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Progresso por Disciplina</h2>
        {selectedConcurso && <span className="text-xs text-muted-foreground">{selectedConcurso.nome}</span>}
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
          <Loader2 size={16} className="animate-spin" />
          Carregando...
        </div>
      ) : items.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          Crie pastas em Cadernos para ver o progresso aqui.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map(d => (
            <div key={d.id}>
              <div className="mb-1 flex justify-between">
                <span className="text-xs text-foreground">{d.nome}</span>
                <span className="font-mono text-xs" style={{ color: d.color }}>
                  {Math.round(d.progresso)}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${d.progresso}%`, backgroundColor: d.color }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
