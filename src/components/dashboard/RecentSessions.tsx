import { Loader2 } from 'lucide-react'
import type { RecentSessionItem } from '../../types/dashboard'

type Props = {
  sessions: RecentSessionItem[]
  loading: boolean
}

function formatDuracao(minutos: number): string {
  if (minutos < 60) return `${minutos}min`
  const horas = Math.floor(minutos / 60)
  const resto = minutos % 60
  return resto ? `${horas}h ${resto}min` : `${horas}h`
}

function formatData(iso: string): string {
  const data = new Date(iso)
  return `${data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}, ${data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
}

export default function RecentSessions({ sessions, loading }: Props) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-semibold text-foreground">Sessões Recentes</h2>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
          <Loader2 size={16} className="animate-spin" />
          Carregando...
        </div>
      ) : sessions.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Nenhuma sessão de estudo registrada ainda.</p>
      ) : (
        <div className="space-y-3">
          {sessions.map(s => (
            <div key={s.id} className="flex items-center gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-secondary text-xs font-bold text-primary">
                {s.titulo[0]?.toUpperCase() ?? '?'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{s.titulo}</p>
                <p className="text-xs text-muted-foreground">{formatData(s.data)}</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground">{formatDuracao(s.tempoGastoMinutos)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
