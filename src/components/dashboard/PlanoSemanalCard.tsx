import { useState } from 'react'
import { ChevronLeft, ChevronRight, ListChecks, Loader2, CalendarPlus, Check } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { BLOCO_POR_ID, BLOCOS_ESTUDO } from '../../data/blocosEstudo'
import {
  DATA_PROVA_TRT4,
  FASES,
  PLANO_TRT4,
  dataDaSessao,
  horasPlanejadasPorBloco,
  indiceSemanaAtual,
  minutosDaSemana,
  type SemanaPlano,
} from '../../data/planoEstudos'

type Props = {
  onCronogramaAlterado: () => void
}

const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

function formatHoras(minutos: number): string {
  const h = Math.floor(minutos / 60)
  const m = minutos % 60
  return m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`
}

function formatDiaMes(iso: string): string {
  const [, m, d] = iso.split('-')
  return `${d}/${m}`
}

function tituloSessao(bloco: string, assunto: string): string {
  return `${bloco} — ${assunto}`
}

export default function PlanoSemanalCard({ onCronogramaAlterado }: Props) {
  const [indice, setIndice] = useState(indiceSemanaAtual)
  const [lancando, setLancando] = useState(false)
  const [mensagem, setMensagem] = useState<{ tipo: 'ok' | 'erro'; texto: string } | null>(null)
  const [mostrarHoras, setMostrarHoras] = useState(false)

  const semana = PLANO_TRT4[indice]
  const fase = FASES.find(f => f.numero === semana.fase)!
  const fim = dataDaSessao(semana, 6)

  const mudarSemana = (delta: number) => {
    setIndice(i => Math.min(PLANO_TRT4.length - 1, Math.max(0, i + delta)))
    setMensagem(null)
  }

  // Insere as sessões da semana no cronograma, pulando as que já existem
  // (mesmo título na mesma data) para o botão poder ser clicado de novo.
  const lancarNoCalendario = async (s: SemanaPlano) => {
    setLancando(true)
    setMensagem(null)

    const linhas = s.sessoes.map(sessao => ({
      titulo: tituloSessao(BLOCO_POR_ID[sessao.bloco].nome, sessao.assunto),
      data_prevista: dataDaSessao(s, sessao.dia),
      duracao_minutos: sessao.minutos,
    }))

    const { data: existentes, error: fetchError } = await supabase
      .from('cronograma')
      .select('titulo, data_prevista')
      .gte('data_prevista', s.inicio)
      .lte('data_prevista', dataDaSessao(s, 6))

    if (fetchError) {
      setMensagem({ tipo: 'erro', texto: fetchError.message })
      setLancando(false)
      return
    }

    const jaLancadas = new Set((existentes ?? []).map(e => `${e.data_prevista}|${e.titulo}`))
    const novas = linhas.filter(l => !jaLancadas.has(`${l.data_prevista}|${l.titulo}`))

    if (novas.length === 0) {
      setMensagem({ tipo: 'ok', texto: 'Esta semana já está no calendário.' })
      setLancando(false)
      return
    }

    const { error: insertError } = await supabase.from('cronograma').insert(novas)
    if (insertError) {
      setMensagem({ tipo: 'erro', texto: insertError.message })
    } else {
      setMensagem({ tipo: 'ok', texto: `${novas.length} sessões adicionadas ao calendário.` })
      onCronogramaAlterado()
    }
    setLancando(false)
  }

  const horasPorBloco = horasPlanejadasPorBloco()
  const sessoesPorDia = DIAS.map((_, dia) => semana.sessoes.filter(s => s.dia === dia))

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2">
          <ListChecks size={15} className="mt-0.5 flex-shrink-0 text-primary" />
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-foreground">
              Plano TRT4 · Semana {semana.numero}/{PLANO_TRT4.length}
              <span className="ml-2 font-normal text-muted-foreground">
                {formatDiaMes(semana.inicio)} a {formatDiaMes(fim)}
              </span>
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Fase {fase.numero} — {fase.titulo}: {fase.foco}
            </p>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-1">
          <button
            onClick={() => mudarSemana(-1)}
            disabled={indice === 0}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground disabled:opacity-30"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={() => {
              setIndice(indiceSemanaAtual())
              setMensagem(null)
            }}
            className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            Atual
          </button>
          <button
            onClick={() => mudarSemana(1)}
            disabled={indice === PLANO_TRT4.length - 1}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground disabled:opacity-30"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <p className="mb-3 rounded-md border border-primary/20 bg-primary/[0.05] px-3 py-2 text-xs leading-relaxed text-foreground">
        <span className="font-semibold text-primary">Meta da semana:</span> {semana.meta}
      </p>

      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
        {sessoesPorDia.map((sessoes, dia) => (
          <div key={dia} className="rounded-md border border-border bg-background p-2">
            <p className="mb-1 text-[11px] font-semibold uppercase text-muted-foreground">
              {DIAS[dia]} {formatDiaMes(dataDaSessao(semana, dia))}
            </p>
            {dataDaSessao(semana, dia) === DATA_PROVA_TRT4 ? (
              <p className="text-[11px] font-semibold text-danger">PROVA: Técnico de manhã, Analista à tarde</p>
            ) : sessoes.length === 0 ? (
              <p className="text-[11px] text-muted-foreground/60">Folga</p>
            ) : (
              <ul className="space-y-1">
                {sessoes.map((s, i) => (
                  <li key={i} className="flex gap-1.5 text-[11px] leading-snug text-secondary-foreground">
                    <span
                      className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: BLOCO_POR_ID[s.bloco].cor }}
                    />
                    <span>
                      {s.assunto} <span className="text-muted-foreground">· {formatHoras(s.minutos)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <div className="flex flex-col justify-between gap-2 rounded-md border border-border bg-background p-2">
          <p className="text-[11px] text-muted-foreground">
            Total da semana: <span className="font-mono text-foreground">{formatHoras(minutosDaSemana(semana))}</span>
          </p>
          <button
            onClick={() => lancarNoCalendario(semana)}
            disabled={lancando}
            className="flex items-center justify-center gap-1.5 rounded-md bg-primary px-2 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {lancando ? <Loader2 size={12} className="animate-spin" /> : <CalendarPlus size={12} />}
            Lançar no calendário
          </button>
        </div>
      </div>

      {mensagem && (
        <p className={`mt-2 flex items-center gap-1.5 text-xs ${mensagem.tipo === 'ok' ? 'text-success' : 'text-danger'}`}>
          {mensagem.tipo === 'ok' && <Check size={12} />}
          {mensagem.texto}
        </p>
      )}

      <button
        onClick={() => setMostrarHoras(m => !m)}
        className="mt-3 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
      >
        {mostrarHoras ? 'Ocultar' : 'Ver'} horas planejadas por bloco
      </button>
      {mostrarHoras && (
        <ul className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
          {BLOCOS_ESTUDO.map(b => (
            <li key={b.id} className="flex items-center gap-2 text-xs text-secondary-foreground">
              <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: b.cor }} />
              <span className="flex-1">{b.nome}</span>
              <span className="font-mono text-muted-foreground">
                {(horasPorBloco[b.id] ?? 0).toFixed(1).replace('.0', '')}h{b.horasMeta != null && ` / ${b.horasMeta}h`}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
