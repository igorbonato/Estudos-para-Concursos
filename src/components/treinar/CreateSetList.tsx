import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import type { StudySet } from '../../data/treinarMock'

type Row = { id: string; termo: string; definicao: string }

const emptyRow = (): Row => ({ id: `row-${Date.now()}-${Math.random()}`, termo: '', definicao: '' })

type Props = {
  onCreate: (set: StudySet) => void
}

export default function CreateSetList({ onCreate }: Props) {
  const [titulo, setTitulo] = useState('')
  const [rows, setRows] = useState<Row[]>([emptyRow(), emptyRow()])

  const updateRow = (id: string, field: 'termo' | 'definicao', value: string) => {
    setRows(prev => prev.map(r => (r.id === id ? { ...r, [field]: value } : r)))
  }

  const addRow = () => setRows(prev => [...prev, emptyRow()])
  const removeRow = (id: string) => setRows(prev => (prev.length > 1 ? prev.filter(r => r.id !== id) : prev))

  const canCreate = titulo.trim().length > 0 && rows.some(r => r.termo.trim() && r.definicao.trim())

  const handleCreate = () => {
    const cards = rows
      .filter(r => r.termo.trim() && r.definicao.trim())
      .map(r => ({ id: r.id, termo: r.termo.trim(), definicao: r.definicao.trim() }))

    if (!titulo.trim() || cards.length === 0) return

    onCreate({ id: `set-${Date.now()}`, nome: titulo.trim(), cards })
    setTitulo('')
    setRows([emptyRow(), emptyRow()])
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-lg font-semibold text-foreground">Criar uma nova lista</h1>

      <input
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        placeholder="Título da lista"
        className="mb-4 w-full rounded-lg border border-border bg-card px-4 py-3 text-base font-medium text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/40"
      />

      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={row.id} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
            <span className="mt-2.5 w-5 flex-shrink-0 text-center text-xs text-muted-foreground">{i + 1}</span>
            <div className="flex-1">
              <input
                value={row.termo}
                onChange={e => updateRow(row.id, 'termo', e.target.value)}
                placeholder="frente"
                className="w-full rounded-md bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <span className="mt-1 block px-1 text-[10px] uppercase tracking-wider text-muted-foreground">Termo</span>
            </div>
            <div className="flex-1">
              <input
                value={row.definicao}
                onChange={e => updateRow(row.id, 'definicao', e.target.value)}
                placeholder="verso"
                className="w-full rounded-md bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <span className="mt-1 block px-1 text-[10px] uppercase tracking-wider text-muted-foreground">Definição</span>
            </div>
            <button
              onClick={() => removeRow(row.id)}
              disabled={rows.length <= 1}
              className="mt-2 flex-shrink-0 text-muted-foreground transition-colors hover:text-danger disabled:opacity-30"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addRow}
        className="mt-3 flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
      >
        <Plus size={15} />
        Adicionar linha
      </button>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleCreate}
          disabled={!canCreate}
          className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Criar Lista
        </button>
      </div>
    </div>
  )
}
