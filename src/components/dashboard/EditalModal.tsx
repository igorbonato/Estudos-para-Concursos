import { useState } from 'react'
import { X, ChevronRight, ChevronDown } from 'lucide-react'
import { EDITAL_TRT4, type EditalBloco } from '../../data/editalTRT4'

type Props = {
  onClose: () => void
}

function BlocoAccordion({ bloco, defaultOpen }: { bloco: EditalBloco; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-lg border border-border">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-medium text-foreground"
      >
        {open ? (
          <ChevronDown size={14} className="flex-shrink-0 text-muted-foreground" />
        ) : (
          <ChevronRight size={14} className="flex-shrink-0 text-muted-foreground" />
        )}
        {bloco.titulo}
        <span className="ml-auto text-xs font-normal text-muted-foreground">{bloco.topicos.length} tópicos</span>
      </button>

      {open && (
        <div className="flex flex-wrap gap-1.5 border-t border-border px-3 py-2.5 pl-9">
          {bloco.topicos.map(topico => (
            <span
              key={topico}
              className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-secondary-foreground"
            >
              {topico}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function EditalModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Edital Verticalizado — {EDITAL_TRT4.concurso}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {EDITAL_TRT4.codigo} · {EDITAL_TRT4.cargo}
            </p>
          </div>
          <button onClick={onClose} className="flex-shrink-0 text-muted-foreground transition-colors hover:text-foreground">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto p-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Conhecimentos Específicos ({EDITAL_TRT4.especificos.length})
            </p>
            <div className="space-y-2">
              {EDITAL_TRT4.especificos.map((bloco, i) => (
                <BlocoAccordion key={bloco.titulo} bloco={bloco} defaultOpen={i === 0} />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Conhecimentos Gerais ({EDITAL_TRT4.gerais.length})
            </p>
            <div className="space-y-2">
              {EDITAL_TRT4.gerais.map(bloco => (
                <BlocoAccordion key={bloco.titulo} bloco={bloco} defaultOpen={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
