import { useState } from 'react'
import { X, ChevronRight, ChevronDown, Check } from 'lucide-react'
import {
  EDITAL_TRT4,
  ALCANCE_LABEL,
  chaveTopico,
  topicoVisivel,
  type Alcance,
  type EditalBloco,
  type FiltroCargo,
} from '../../data/editalTRT4'

type Props = {
  onClose: () => void
  concluidos: Set<string>
  onToggle: (chave: string) => void
}

const ALCANCE_STYLE: Record<Alcance, string> = {
  AT: 'border-primary/30 bg-primary/10 text-primary',
  A: 'border-[#a78bfa]/30 bg-[#a78bfa]/10 text-[#a78bfa]',
  T: 'border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]',
}

const FILTROS: { id: FiltroCargo; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'A', label: 'Analista (14)' },
  { id: 'T', label: 'Técnico (22)' },
]

function AlcanceBadge({ alcance }: { alcance: Alcance }) {
  return (
    <span className={`flex-shrink-0 rounded border px-1.5 py-px font-mono text-[10px] font-semibold ${ALCANCE_STYLE[alcance]}`}>
      {ALCANCE_LABEL[alcance]}
    </span>
  )
}

type BlocoProps = {
  bloco: EditalBloco
  filtro: FiltroCargo
  defaultOpen: boolean
  concluidos: Set<string>
  onToggle: (chave: string) => void
}

function BlocoAccordion({ bloco, filtro, defaultOpen, concluidos, onToggle }: BlocoProps) {
  const [open, setOpen] = useState(defaultOpen)
  const topicos = bloco.topicos.filter(t => topicoVisivel(t, filtro))
  if (topicos.length === 0) return null

  const feitos = topicos.filter(t => concluidos.has(chaveTopico(bloco, t))).length

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
        <span className="min-w-0 flex-1 truncate">{bloco.titulo}</span>
        <span className={`flex-shrink-0 font-mono text-xs font-normal ${feitos === topicos.length ? 'text-success' : 'text-muted-foreground'}`}>
          {feitos}/{topicos.length}
        </span>
      </button>

      {open && (
        <ul className="space-y-0.5 border-t border-border px-2 py-2">
          {topicos.map(topico => {
            const chave = chaveTopico(bloco, topico)
            const feito = concluidos.has(chave)
            return (
              <li key={chave}>
                <button
                  onClick={() => onToggle(chave)}
                  className="flex w-full items-start gap-2.5 rounded px-2 py-1.5 text-left transition-colors hover:bg-white/5"
                >
                  <span
                    className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border ${
                      feito ? 'border-success bg-success text-background' : 'border-border'
                    }`}
                  >
                    {feito && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span className={`flex-1 text-xs leading-relaxed ${feito ? 'text-muted-foreground line-through' : 'text-secondary-foreground'}`}>
                    {topico.texto}
                  </span>
                  <AlcanceBadge alcance={topico.alcance} />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default function EditalModal({ onClose, concluidos, onToggle }: Props) {
  const [filtro, setFiltro] = useState<FiltroCargo>('todos')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-6">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-lg border border-border bg-card">
        <div className="border-b border-border p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Edital Verticalizado — {EDITAL_TRT4.concurso} · {EDITAL_TRT4.edital} ({EDITAL_TRT4.banca})
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {EDITAL_TRT4.cargos.map(c => `${c.nome} (${c.codigo}, ${c.turno.toLowerCase()})`).join(' · ')}
              </p>
            </div>
            <button onClick={onClose} className="flex-shrink-0 text-muted-foreground transition-colors hover:text-foreground">
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {FILTROS.map(f => (
              <button
                key={f.id}
                onClick={() => setFiltro(f.id)}
                className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                  filtro === f.id
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {f.label}
              </button>
            ))}
            <span className="ml-auto flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <AlcanceBadge alcance="AT" /> nos dois
              <AlcanceBadge alcance="A" /> Analista
              <AlcanceBadge alcance="T" /> Técnico
            </span>
          </div>
        </div>

        <div className="space-y-5 overflow-y-auto p-5">
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Provas e notas</p>
            <ul className="space-y-1 text-xs leading-relaxed text-secondary-foreground">
              {EDITAL_TRT4.provas.map(p => (
                <li key={p.nome}>
                  <span className="text-foreground">{p.nome}</span> · {p.questoes} {p.questoes === '1' ? 'texto' : 'questões'} · peso {p.peso}
                </li>
              ))}
              {EDITAL_TRT4.regras.map(r => (
                <li key={r} className="text-muted-foreground">
                  • {r}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Conhecimentos Específicos (peso 2)
            </p>
            <div className="space-y-2">
              {EDITAL_TRT4.especificos.map((bloco, i) => (
                <BlocoAccordion
                  key={bloco.id}
                  bloco={bloco}
                  filtro={filtro}
                  defaultOpen={i === 0}
                  concluidos={concluidos}
                  onToggle={onToggle}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Conhecimentos Gerais (peso 1)
            </p>
            <div className="space-y-2">
              {EDITAL_TRT4.gerais.map(bloco => (
                <BlocoAccordion
                  key={bloco.id}
                  bloco={bloco}
                  filtro={filtro}
                  defaultOpen={false}
                  concluidos={concluidos}
                  onToggle={onToggle}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
