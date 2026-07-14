import { useEffect, useState } from 'react'
import { CalendarClock, Plus, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { CronogramaItem } from '../../types/dashboard'
import AddMetaModal from './AddMetaModal'

type Props = {
  onSessionLogged: () => void
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

function addDaysIso(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function formatDuracao(minutos: number): string {
  if (minutos < 60) return `${minutos} min`
  const horas = Math.floor(minutos / 60)
  const resto = minutos % 60
  return resto ? `${horas}h ${resto}min` : `${horas}h`
}

function formatDiaLabel(dataIso: string): string {
  const hoje = todayIso()
  const amanha = addDaysIso(1)
  if (dataIso === hoje) return 'Hoje'
  if (dataIso === amanha) return 'Amanhã'
  const [ano, mes, dia] = dataIso.split('-').map(Number)
  const d = new Date(ano, mes - 1, dia)
  const weekday = d.toLocaleDateString('pt-BR', { weekday: 'short' })
  return `${weekday} · ${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}`
}

export default function CronogramaSemanal({ onSessionLogged }: Props) {
  const [itens, setItens] = useState<CronogramaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const loadItens = async () => {
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('cronograma')
      .select('*')
      .gte('data_prevista', todayIso())
      .lte('data_prevista', addDaysIso(6))
      .order('data_prevista', { ascending: true })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setItens((data ?? []) as CronogramaItem[])
      setError(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadItens()
  }, [])

  const handleCreate = async (input: { titulo: string; duracao_minutos: number; data_prevista: string }) => {
    const { data, error: insertError } = await supabase.from('cronograma').insert(input).select().single()
    if (insertError) {
      setError(insertError.message)
      return false
    }

    const item = data as CronogramaItem
    if (item.data_prevista >= todayIso() && item.data_prevista <= addDaysIso(6)) {
      setItens(prev => [...prev, item].sort((a, b) => a.data_prevista.localeCompare(b.data_prevista)))
    }
    setError(null)
    return true
  }

  const handleToggle = async (item: CronogramaItem) => {
    if (togglingId) return
    setTogglingId(item.id)
    const novoStatus = !item.status

    const { error: updateError } = await supabase
      .from('cronograma')
      .update({ status: novoStatus })
      .eq('id', item.id)

    if (updateError) {
      setError(updateError.message)
      setTogglingId(null)
      return
    }

    setItens(prev => prev.map(i => (i.id === item.id ? { ...i, status: novoStatus } : i)))

    if (novoStatus) {
      const { error: sessaoError } = await supabase.from('sessoes_estudo').insert({
        titulo: item.titulo,
        tempo_gasto_minutos: item.duracao_minutos,
      })
      if (!sessaoError) onSessionLogged()
    }

    setTogglingId(null)
  }

  const grupos = itens.reduce<Record<string, CronogramaItem[]>>((acc, item) => {
    ;(acc[item.data_prevista] ??= []).push(item)
    return acc
  }, {})

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarClock size={15} className="text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Cronograma da Semana</h2>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
        >
          <Plus size={13} />
          Adicionar Meta
        </button>
      </div>

      {error && (
        <div className="mb-3 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
          <Loader2 size={16} className="animate-spin" />
          Carregando...
        </div>
      ) : itens.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          Nenhuma meta para os próximos dias. Adicione uma acima.
        </p>
      ) : (
        <div className="space-y-4">
          {Object.entries(grupos).map(([dataIso, itensDoDia]) => (
            <div key={dataIso}>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {formatDiaLabel(dataIso)}
              </p>
              <div className="space-y-1.5">
                {itensDoDia.map(item => (
                  <label
                    key={item.id}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-white/5"
                  >
                    <input
                      type="checkbox"
                      checked={item.status}
                      disabled={togglingId === item.id}
                      onChange={() => handleToggle(item)}
                      className="h-4 w-4 flex-shrink-0 cursor-pointer accent-primary"
                    />
                    <span
                      className={`flex-1 text-sm ${item.status ? 'text-muted-foreground line-through' : 'text-foreground'}`}
                    >
                      {item.titulo}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {formatDuracao(item.duracao_minutos)}
                    </span>
                    {togglingId === item.id && <Loader2 size={13} className="animate-spin text-muted-foreground" />}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && <AddMetaModal onClose={() => setShowModal(false)} onCreate={handleCreate} />}
    </div>
  )
}
