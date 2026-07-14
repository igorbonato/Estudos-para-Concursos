import { useEffect, useMemo, useRef, useState } from 'react'
import { CalendarClock, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { CronogramaItem } from '../../types/dashboard'
import AddMetaModal from './AddMetaModal'

type Props = {
  onSessionLogged: () => void
}

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const DISCIPLINA_COLORS: Record<string, string> = {
  Português: '#a78bfa',
  'Direito Constitucional': '#61dafb',
  Informática: '#22c55e',
  'Direito Administrativo': '#3b82f6',
  'Raciocínio Lógico': '#f59e0b',
}
const DEFAULT_COLOR = '#61dafb'

function colorFor(titulo: string): string {
  return DISCIPLINA_COLORS[titulo] ?? DEFAULT_COLOR
}

function dateKey(d: Date): string {
  return d.toLocaleDateString('en-CA')
}

function formatDuracaoCompacta(minutos: number): string {
  if (minutos < 60) return `${minutos}min`
  const horas = Math.floor(minutos / 60)
  const resto = minutos % 60
  return resto ? `${horas}h${resto}` : `${horas}h`
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function CalendarioEstudos({ onSessionLogged }: Props) {
  const [mesAtual, setMesAtual] = useState(() => {
    const d = new Date()
    d.setDate(1)
    return d
  })
  const [itens, setItens] = useState<CronogramaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const togglingRef = useRef<string | null>(null)
  const [modalData, setModalData] = useState<string | null>(null)

  const year = mesAtual.getFullYear()
  const month = mesAtual.getMonth()

  const cells = useMemo(() => {
    const firstOfMonth = new Date(year, month, 1)
    const gridStart = new Date(year, month, 1 - firstOfMonth.getDay())
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(gridStart)
      d.setDate(gridStart.getDate() + i)
      return d
    })
  }, [year, month])

  const loadItens = async () => {
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('cronograma')
      .select('*')
      .gte('data_prevista', dateKey(cells[0]))
      .lte('data_prevista', dateKey(cells[41]))
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month])

  const itensPorDia = itens.reduce<Record<string, CronogramaItem[]>>((acc, item) => {
    ;(acc[item.data_prevista] ??= []).push(item)
    return acc
  }, {})

  const handleCreate = async (input: { titulo: string; duracao_minutos: number; data_prevista: string }) => {
    const { data, error: insertError } = await supabase.from('cronograma').insert(input).select().single()
    if (insertError) {
      setError(insertError.message)
      return false
    }
    const item = data as CronogramaItem
    if (item.data_prevista >= dateKey(cells[0]) && item.data_prevista <= dateKey(cells[41])) {
      setItens(prev => [...prev, item])
    }
    setError(null)
    return true
  }

  const handleToggle = async (item: CronogramaItem, e: React.MouseEvent) => {
    e.stopPropagation()
    if (togglingRef.current) return
    togglingRef.current = item.id
    setTogglingId(item.id)
    const novoStatus = !item.status

    const { error: updateError } = await supabase.from('cronograma').update({ status: novoStatus }).eq('id', item.id)

    if (updateError) {
      setError(updateError.message)
      togglingRef.current = null
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

    togglingRef.current = null
    setTogglingId(null)
  }

  const hoje = dateKey(new Date())

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarClock size={15} className="text-primary" />
          <h2 className="text-sm font-semibold text-foreground">
            {capitalize(mesAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }))}
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMesAtual(new Date(year, month - 1, 1))}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={() => {
              const d = new Date()
              d.setDate(1)
              setMesAtual(d)
            }}
            className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            Hoje
          </button>
          <button
            onClick={() => setMesAtual(new Date(year, month + 1, 1))}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-3 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
          <Loader2 size={16} className="animate-spin" />
          Carregando...
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-7 gap-1.5">
            {WEEKDAYS.map(w => (
              <div key={w} className="pb-1 text-center text-xs font-semibold uppercase text-muted-foreground">
                {w}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {cells.map(cell => {
              const key = dateKey(cell)
              const isCurrentMonth = cell.getMonth() === month
              const isToday = key === hoje
              const itensDoDia = itensPorDia[key] ?? []
              const visiveis = itensDoDia.slice(0, 2)
              const extras = itensDoDia.length - visiveis.length

              return (
                <button
                  key={key}
                  onClick={() => setModalData(key)}
                  className={`flex min-h-[84px] flex-col items-stretch gap-1 rounded-md border p-1.5 text-left transition-colors ${
                    isCurrentMonth ? 'border-border bg-background' : 'border-border/50 bg-background/40'
                  } hover:border-primary/30`}
                >
                  <span
                    className={`text-xs ${
                      isToday
                        ? 'flex h-5 w-5 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground'
                        : isCurrentMonth
                          ? 'text-foreground'
                          : 'text-muted-foreground/50'
                    }`}
                  >
                    {cell.getDate()}
                  </span>

                  <div className="flex flex-col gap-0.5">
                    {visiveis.map(item => (
                      <span
                        key={item.id}
                        onClick={e => handleToggle(item, e)}
                        title={`${item.titulo} · ${formatDuracaoCompacta(item.duracao_minutos)}`}
                        className={`truncate rounded px-1 py-0.5 text-[10px] font-medium text-white ${
                          item.status ? 'opacity-40 line-through' : ''
                        } ${togglingId === item.id ? 'pointer-events-none animate-pulse' : ''}`}
                        style={{ backgroundColor: colorFor(item.titulo) }}
                      >
                        {item.titulo} · {formatDuracaoCompacta(item.duracao_minutos)}
                      </span>
                    ))}
                    {extras > 0 && <span className="px-1 text-[10px] text-muted-foreground">+{extras} mais</span>}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {modalData && (
        <AddMetaModal initialData={modalData} onClose={() => setModalData(null)} onCreate={handleCreate} />
      )}
    </div>
  )
}
