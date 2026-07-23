import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { buildPastaTree } from '../lib/buildPastaTree'
import type { PastaNode } from '../types/cadernos'
import type { DisciplinaProgressItem, RecentSessionItem } from '../types/dashboard'
import StatCard from '../components/ui/StatCard'
import CalendarioEstudos from '../components/dashboard/CalendarioEstudos'
import RecentSessions from '../components/dashboard/RecentSessions'
import DisciplineProgress from '../components/dashboard/DisciplineProgress'
import EditalCard from '../components/dashboard/EditalCard'
import EditalModal from '../components/dashboard/EditalModal'

const DISCIPLINE_COLORS = ['#61dafb', '#3b82f6', '#a78bfa', '#f59e0b', '#22c55e']

function formatHoras(minutos: number): string {
  const horas = Math.floor(minutos / 60)
  const resto = minutos % 60
  return resto ? `${horas}h ${resto}m` : `${horas}h`
}

function collectIds(node: PastaNode): string[] {
  return [node.id, ...node.children.flatMap(collectIds)]
}

function toLocalDateKey(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA')
}

export default function Dashboard() {
  const [horasEstudadas, setHorasEstudadas] = useState<string | null>(null)
  const [diasConsecutivos, setDiasConsecutivos] = useState<number | null>(null)
  const [recentSessions, setRecentSessions] = useState<RecentSessionItem[]>([])
  const [loadingSessions, setLoadingSessions] = useState(true)

  const [flashcardsCount, setFlashcardsCount] = useState<number | null>(null)

  const [redacoesCount, setRedacoesCount] = useState<number | null>(null)
  const [redacoesMedia, setRedacoesMedia] = useState<number | null>(null)

  const [disciplinaProgress, setDisciplinaProgress] = useState<DisciplinaProgressItem[]>([])
  const [loadingDisciplinas, setLoadingDisciplinas] = useState(true)

  const [editalOpen, setEditalOpen] = useState(false)

  const refetchSessoes = async () => {
    setLoadingSessions(true)
    const { data, error } = await supabase
      .from('sessoes_estudo')
      .select('id, titulo, tempo_gasto_minutos, data')
      .order('data', { ascending: false })

    if (!error) {
      const rows = data ?? []

      const inicioDoMes = new Date()
      inicioDoMes.setDate(1)
      inicioDoMes.setHours(0, 0, 0, 0)
      const totalMinutosMes = rows
        .filter(r => new Date(r.data) >= inicioDoMes)
        .reduce((sum, r) => sum + r.tempo_gasto_minutos, 0)
      setHorasEstudadas(formatHoras(totalMinutosMes))

      const diasComSessao = new Set(rows.map(r => toLocalDateKey(r.data)))
      let streak = 0
      const cursor = new Date()
      while (diasComSessao.has(cursor.toLocaleDateString('en-CA'))) {
        streak += 1
        cursor.setDate(cursor.getDate() - 1)
      }
      setDiasConsecutivos(streak)

      setRecentSessions(
        rows.slice(0, 5).map(r => ({
          id: r.id,
          titulo: r.titulo ?? 'Sessão de estudo',
          data: r.data,
          tempoGastoMinutos: r.tempo_gasto_minutos,
        })),
      )
    }
    setLoadingSessions(false)
  }

  const refetchFlashcards = async () => {
    const { count, error } = await supabase.from('flashcards').select('*', { count: 'exact', head: true })
    if (!error) setFlashcardsCount(count ?? 0)
  }

  const refetchRedacoes = async () => {
    const { count, error: countError } = await supabase
      .from('redacoes')
      .select('*', { count: 'exact', head: true })
    if (!countError) setRedacoesCount(count ?? 0)

    const { data, error } = await supabase.from('redacoes').select('nota_ia')
    if (!error) {
      const notas = (data ?? []).map(r => r.nota_ia).filter((n): n is number => n != null)
      setRedacoesMedia(notas.length ? notas.reduce((sum, n) => sum + n, 0) / notas.length : null)
    }
  }

  const refetchDisciplinas = async () => {
    setLoadingDisciplinas(true)
    const [{ data: pastasData, error: pastasError }, { data: notasData, error: notasError }] = await Promise.all([
      supabase.from('assuntos_pastas').select('id, disciplina_id, parent_id, nome, ordem'),
      supabase.from('anotacoes').select('id, pasta_id'),
    ])

    if (!pastasError && !notasError) {
      const tree = buildPastaTree(pastasData ?? [])
      const notas = notasData ?? []

      const counts = tree.map(root => {
        const ids = new Set(collectIds(root))
        return { root, count: notas.filter(n => ids.has(n.pasta_id)).length }
      })
      const max = Math.max(1, ...counts.map(c => c.count))

      setDisciplinaProgress(
        counts.map((c, i) => ({
          id: c.root.id,
          nome: c.root.nome,
          progresso: (c.count / max) * 100,
          color: DISCIPLINE_COLORS[i % DISCIPLINE_COLORS.length],
        })),
      )
    }
    setLoadingDisciplinas(false)
  }

  useEffect(() => {
    refetchSessoes()
    refetchFlashcards()
    refetchRedacoes()
    refetchDisciplinas()
  }, [])

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Bom dia, candidato 👋</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Terça-feira, 13 de julho de 2026 · TRT4 em 42 dias
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          accentColor="#61dafb"
          value={horasEstudadas ?? '—'}
          label="Horas Estudadas"
          sub="Este mês"
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 5.5V9.5L11.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        />
        <StatCard
          accentColor="#3b82f6"
          value={flashcardsCount != null ? String(flashcardsCount) : '—'}
          label="Flashcards Revisados"
          sub="Total acumulado"
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 8h8M5 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        />
        <StatCard
          accentColor="#a78bfa"
          value={redacoesCount != null ? String(redacoesCount) : '—'}
          label="Redações Corrigidas"
          sub={redacoesMedia != null ? `Média: ${redacoesMedia.toFixed(1)}/100` : 'Sem redações ainda'}
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 14l1.5-5L13 3l2 2-7.5 7.5L4 14z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M11 5l2 2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          }
        />
        <StatCard
          accentColor="#f59e0b"
          value={diasConsecutivos != null ? String(diasConsecutivos) : '—'}
          label="Dias Consecutivos"
          sub="Sequência atual"
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2L11 7h5l-4 3 1.5 5L9 12.5 4.5 15 6 10 2 7h5L9 2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </div>

      <EditalCard onOpen={() => setEditalOpen(true)} />

      <CalendarioEstudos onSessionLogged={refetchSessoes} />

      <div className="grid grid-cols-2 gap-4">
        <RecentSessions sessions={recentSessions} loading={loadingSessions} />
        <DisciplineProgress items={disciplinaProgress} loading={loadingDisciplinas} />
      </div>

      {editalOpen && <EditalModal onClose={() => setEditalOpen(false)} />}
    </div>
  )
}
