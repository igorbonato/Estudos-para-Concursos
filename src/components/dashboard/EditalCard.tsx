import { FileText, ChevronRight } from 'lucide-react'
import { EDITAL_TRT4 } from '../../data/editalTRT4'

type Props = {
  onOpen: () => void
}

export default function EditalCard({ onOpen }: Props) {
  const totalBlocos = EDITAL_TRT4.especificos.length + EDITAL_TRT4.gerais.length

  return (
    <button
      onClick={onOpen}
      className="flex w-full items-center gap-4 rounded-lg border border-border bg-card p-5 text-left transition-colors hover:border-primary/40"
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#61dafb18] text-[#61dafb]">
        <FileText size={18} />
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">Edital Verticalizado — {EDITAL_TRT4.concurso} ({EDITAL_TRT4.codigo})</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {totalBlocos} blocos temáticos · {EDITAL_TRT4.cargo}
        </p>
      </div>

      <ChevronRight size={16} className="flex-shrink-0 text-muted-foreground" />
    </button>
  )
}
