import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import StatCard from '../components/ui/StatCard'
import CronogramaSemanal from '../components/dashboard/CronogramaSemanal'
import RecentSessions from '../components/dashboard/RecentSessions'
import DisciplineProgress from '../components/dashboard/DisciplineProgress'

function formatHoras(minutos: number): string {
  const horas = Math.floor(minutos / 60)
  const resto = minutos % 60
  return resto ? `${horas}h ${resto}m` : `${horas}h`
}

export default function Dashboard() {
  const [horasEstudadas, setHorasEstudadas] = useState<string | null>(null)

  const refetchHoras = async () => {
    const inicioDoMes = new Date()
    inicioDoMes.setDate(1)
    inicioDoMes.setHours(0, 0, 0, 0)

    const { data, error } = await supabase
      .from('sessoes_estudo')
      .select('tempo_gasto_minutos')
      .gte('data', inicioDoMes.toISOString())

    if (!error) {
      const totalMinutos = (data ?? []).reduce((sum, r) => sum + r.tempo_gasto_minutos, 0)
      setHorasEstudadas(formatHoras(totalMinutos))
    }
  }

  useEffect(() => {
    refetchHoras()
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
          value="1.247"
          label="Flashcards Revisados"
          sub="Total acumulado"
          trend={{ value: '8%', up: true }}
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 8h8M5 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        />
        <StatCard
          accentColor="#a78bfa"
          value="8"
          label="Redações Corrigidas"
          sub="Média: 7.4 / 10"
          trend={{ value: '2', up: true }}
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
          value="14"
          label="Dias Consecutivos"
          sub="Sequência atual"
          trend={{ value: '3', up: true }}
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

      <div className="grid grid-cols-2 gap-4">
        <CronogramaSemanal onSessionLogged={refetchHoras} />
        <RecentSessions />
      </div>

      <DisciplineProgress />
    </div>
  )
}
