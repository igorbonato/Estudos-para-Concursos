import { FileText, ChevronRight } from 'lucide-react'
import { EDITAL_TRT4 } from '../../data/editalTRT4'

type Props = {
  onOpen: () => void
  concluidos: Set<string>
}

export default function EditalCard({ onOpen, concluidos }: Props) {
  const blocos = [...EDITAL_TRT4.especificos, ...EDITAL_TRT4.gerais]
  const totalTopicos = blocos.reduce((sum, b) => sum + b.topicos.length, 0)
  const pct = totalTopicos ? Math.round((concluidos.size / totalTopicos) * 100) : 0

  return (
    <button
      onClick={onOpen}
      className="flex w-full items-center gap-4 rounded-lg border border-border bg-card p-5 text-left transition-colors hover:border-primary/40"
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#61dafb18] text-[#61dafb]">
        <FileText size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">
          Edital Verticalizado — {EDITAL_TRT4.concurso} {EDITAL_TRT4.edital.replace('Edital nº ', '')} ({EDITAL_TRT4.banca})
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Analista TI (14) + Técnico TI (22) · {blocos.length} blocos · {totalTopicos} tópicos · {pct}% estudado
        </p>
        <div className="mt-2 h-1 rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <ChevronRight size={16} className="flex-shrink-0 text-muted-foreground" />
    </button>
  )
}
