type Props = {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
  accentColor?: string
  trend?: { value: string; up: boolean }
}

export default function StatCard({ icon, label, value, sub, accentColor = '#61dafb', trend }: Props) {
  return (
    <div className="relative flex flex-col gap-3 overflow-hidden rounded-lg border border-border bg-card p-5">
      <div
        className="absolute bottom-4 left-0 top-4 w-0.5 rounded-full"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex items-start justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
        >
          {icon}
        </div>
        {trend && (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              trend.up ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
            }`}
          >
            {trend.up ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>

      <div>
        <p className="font-mono text-2xl font-bold tracking-tight text-foreground">{value}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
        {sub && (
          <p className="mt-1 text-xs opacity-80" style={{ color: accentColor }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  )
}
