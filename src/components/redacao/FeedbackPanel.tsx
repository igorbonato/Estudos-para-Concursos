import { useState } from 'react'
import { Sparkles, Loader2, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react'
import type { RedacaoFeedback } from '../../data/redacaoMock'

type Props = {
  feedback: RedacaoFeedback | null
  loading: boolean
  loadingMessage: string
  banca: string
}

function scoreColor(score: number, max: number) {
  const pct = score / max
  if (pct >= 0.8) return 'text-success'
  if (pct >= 0.6) return 'text-warning'
  return 'text-danger'
}
function scoreBarColor(score: number, max: number) {
  const pct = score / max
  if (pct >= 0.8) return 'bg-success'
  if (pct >= 0.6) return 'bg-warning'
  return 'bg-danger'
}

export default function FeedbackPanel({ feedback, loading, loadingMessage, banca }: Props) {
  const [showExemplar, setShowExemplar] = useState(false)

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
        <Loader2 size={32} className="animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">{loadingMessage}</p>
      </div>
    )
  }

  if (!feedback) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles size={22} />
        </div>
        <p className="text-sm font-medium text-foreground">Correção por IA</p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Preencha banca, tema e sua redação, depois clique em{' '}
          <strong className="text-primary">"Analisar com IA"</strong> para receber um feedback estruturado.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 overflow-y-auto p-5">
      <div className="rounded-xl border border-primary/25 bg-gradient-to-br from-primary/[0.08] to-transparent p-5 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          Nota Final {banca && `· ${banca}`}
        </p>
        <div className="flex items-end justify-center gap-1">
          <span className="font-mono text-4xl font-bold text-foreground">{feedback.notaFinal}</span>
          <span className="mb-1 text-lg text-muted-foreground">/{feedback.notaMaxima}</span>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-secondary">
          <div
            className={`h-full rounded-full transition-all duration-700 ${scoreBarColor(feedback.notaFinal, feedback.notaMaxima)}`}
            style={{ width: `${(feedback.notaFinal / feedback.notaMaxima) * 100}%` }}
          />
        </div>
        <p className={`mt-2 text-xs font-medium ${scoreColor(feedback.notaFinal, feedback.notaMaxima)}`}>
          {feedback.notaFinal >= 80 ? 'Muito bom' : feedback.notaFinal >= 60 ? 'Regular' : 'Precisa melhorar'}
        </p>
      </div>

      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-foreground">
          Correções Gramaticais
        </h3>
        <div className="space-y-2">
          {feedback.correcoesGramaticais.map((c, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-3">
              <p className="text-xs text-danger line-through decoration-danger/60">{c.original}</p>
              <p className="mt-1.5 text-xs font-medium text-success">{c.corrigido}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{c.explicacao}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-foreground">O que FAZER</h3>
        <div className="space-y-1.5 rounded-lg border border-success/20 bg-success/[0.05] p-3">
          {feedback.fazer.map((item, i) => (
            <div key={i} className="flex gap-2">
              <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-success" />
              <p className="text-xs leading-relaxed text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-foreground">O que NUNCA fazer</h3>
        <div className="space-y-1.5 rounded-lg border border-danger/20 bg-danger/[0.05] p-3">
          {feedback.nuncaFazer.map((item, i) => (
            <div key={i} className="flex gap-2">
              <XCircle size={14} className="mt-0.5 flex-shrink-0 text-danger" />
              <p className="text-xs leading-relaxed text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-border">
        <button
          onClick={() => setShowExemplar(s => !s)}
          className="flex w-full items-center justify-between bg-card px-3 py-2.5 text-left"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
            Redação Nota 1000
          </span>
          {showExemplar ? (
            <ChevronUp size={14} className="text-muted-foreground" />
          ) : (
            <ChevronDown size={14} className="text-muted-foreground" />
          )}
        </button>
        {showExemplar && (
          <div className="space-y-3 bg-background p-4">
            <p className="text-sm font-semibold text-foreground">{feedback.redacaoNota1000.titulo}</p>
            {feedback.redacaoNota1000.texto.split('\n\n').map((paragrafo, i) => (
              <p key={i} className="text-xs leading-relaxed text-muted-foreground">
                {paragrafo}
              </p>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
