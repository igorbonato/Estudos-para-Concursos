import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'

const DISCIPLINAS = ['Português', 'Direito Constitucional', 'Informática', 'Direito Administrativo', 'Raciocínio Lógico']

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

type Props = {
  onClose: () => void
  onCreate: (input: { titulo: string; duracao_minutos: number; data_prevista: string }) => Promise<boolean>
}

export default function AddMetaModal({ onClose, onCreate }: Props) {
  const [titulo, setTitulo] = useState(DISCIPLINAS[0])
  const [minutos, setMinutos] = useState(30)
  const [data, setData] = useState(todayIso())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    if (minutos <= 0 || !data || saving) return
    setSaving(true)
    setError(null)
    const success = await onCreate({ titulo, duracao_minutos: minutos, data_prevista: data })
    setSaving(false)
    if (success) onClose()
    else setError('Não foi possível salvar a meta. Tente novamente.')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Adicionar Meta de Estudo</h3>
          <button onClick={onClose} className="text-muted-foreground transition-colors hover:text-foreground">
            <X size={16} />
          </button>
        </div>

        {error && (
          <div className="mb-3 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Disciplina
            </label>
            <select
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary/40"
            >
              {DISCIPLINAS.map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tempo (minutos)
            </label>
            <input
              type="number"
              min={1}
              value={minutos}
              onChange={e => setMinutos(Number(e.target.value))}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary/40"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Data
            </label>
            <input
              type="date"
              value={data}
              onChange={e => setData(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary/40"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={saving}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving || minutos <= 0 || !data}
            className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}
