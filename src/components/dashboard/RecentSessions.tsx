const RECENT_SESSIONS = [
  { discipline: 'Direito Constitucional', date: 'Hoje, 09:30', duration: '1h 45min', cards: 32 },
  { discipline: 'Raciocínio Lógico', date: 'Ontem, 20:15', duration: '55min', cards: 18 },
  { discipline: 'Português', date: '11 Jul, 18:00', duration: '1h 10min', cards: 25 },
]

export default function RecentSessions() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-semibold text-foreground">Sessões Recentes</h2>
      <div className="space-y-3">
        {RECENT_SESSIONS.map(s => (
          <div key={s.discipline} className="flex items-center gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-secondary text-xs font-bold text-primary">
              {s.discipline[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{s.discipline}</p>
              <p className="text-xs text-muted-foreground">
                {s.date} · {s.duration}
              </p>
            </div>
            <span className="font-mono text-xs text-muted-foreground">{s.cards} cards</span>
          </div>
        ))}
      </div>
    </div>
  )
}
