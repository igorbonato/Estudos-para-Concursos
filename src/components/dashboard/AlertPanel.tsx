import ToggleSwitch from '../ui/ToggleSwitch'

const OVERDUE = [
  { name: 'Direito Administrativo', days: 5, color: '#ef4444' },
  { name: 'Informática', days: 3, color: '#f59e0b' },
  { name: 'Português', days: 1, color: '#f59e0b' },
]

export default function AlertPanel() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path
              d="M7.5 1.5C4.18629 1.5 1.5 4.18629 1.5 7.5C1.5 10.8137 4.18629 13.5 7.5 13.5C10.8137 13.5 13.5 10.8137 13.5 7.5C13.5 4.18629 10.8137 1.5 7.5 1.5Z"
              stroke="#f59e0b"
              strokeWidth="1.3"
            />
            <path d="M7.5 4.5V7.5L9.5 9" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <h2 className="text-sm font-semibold text-foreground">Alertas de Revisão</h2>
        </div>
        <ToggleSwitch defaultChecked label="Notificações" />
      </div>

      <div className="space-y-2">
        {OVERDUE.map(item => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-md px-3 py-2.5"
            style={{ backgroundColor: `${item.color}0d`, border: `1px solid ${item.color}25` }}
          >
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-foreground">{item.name}</span>
            </div>
            <span
              className="rounded px-2 py-0.5 text-xs font-medium"
              style={{ backgroundColor: `${item.color}20`, color: item.color }}
            >
              {item.days}d atrasado
            </span>
          </div>
        ))}
      </div>

      <button className="mt-3 w-full rounded-md border border-primary/15 bg-primary/[0.06] py-2 text-xs text-primary transition-colors hover:bg-primary/10">
        Ver todas as revisões pendentes →
      </button>
    </div>
  )
}
