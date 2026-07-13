const DISCIPLINAS = [
  { name: 'Português', progress: 75, color: '#a78bfa' },
  { name: 'Direito Constitucional', progress: 68, color: '#61dafb' },
  { name: 'Informática', progress: 55, color: '#22c55e' },
  { name: 'Direito Administrativo', progress: 42, color: '#3b82f6' },
  { name: 'Raciocínio Lógico', progress: 30, color: '#f59e0b' },
]

export default function DisciplineProgress() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Progresso por Disciplina</h2>
        <span className="text-xs text-muted-foreground">TRT4 – 4ª Região</span>
      </div>
      <div className="space-y-3">
        {DISCIPLINAS.map(d => (
          <div key={d.name}>
            <div className="mb-1 flex justify-between">
              <span className="text-xs text-foreground">{d.name}</span>
              <span className="font-mono text-xs" style={{ color: d.color }}>
                {d.progress}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${d.progress}%`, backgroundColor: d.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
