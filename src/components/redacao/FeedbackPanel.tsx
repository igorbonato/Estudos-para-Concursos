import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Loader2, CheckCircle2, XCircle, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'
import { NOTA_MINIMA_REDACAO, type CriterioNota, type RedacaoFeedback } from '../../types/redacao'

type Props = {
  feedback: RedacaoFeedback | null
  loading: boolean
  loadingMessage: string
  error?: string | null
  banca: string
}

function scoreColor(score: number, max: number) {
  const pct = score / max
  if (pct >= 0.8) return 'text-success'
  if (pct >= 0.6) return 'text-warning'
  return 'text-danger'
}

function formatNota(n: number) {
  return n.toFixed(2).replace('.', ',')
}

function labelNota(feedback: RedacaoFeedback) {
  // Redações antigas (0 a 100) não seguem a nota mínima do edital.
  if (feedback.notaMaxima !== 10) {
    const pct = feedback.notaFinal / feedback.notaMaxima
    return pct >= 0.8 ? 'Muito bom' : pct >= 0.6 ? 'Regular' : 'Precisa melhorar'
  }
  return feedback.notaFinal >= NOTA_MINIMA_REDACAO
    ? `Acima do mínimo do edital (${formatNota(NOTA_MINIMA_REDACAO)})`
    : `Abaixo do mínimo do edital (${formatNota(NOTA_MINIMA_REDACAO)}): eliminatória`
}

function CriteriosSection({ criterios }: { criterios: CriterioNota[] }) {
  const grupos = [...new Set(criterios.map(c => c.grupo))]

  return (
    <section>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-foreground">Nota por critério</h3>
      <div className="space-y-3">
        {grupos.map(grupo => {
          const itens = criterios.filter(c => c.grupo === grupo)
          const nota = itens.reduce((sum, c) => sum + c.nota, 0)
          const max = itens.reduce((sum, c) => sum + c.notaMaxima, 0)
          return (
            <div key={grupo} className="rounded-lg border border-border bg-card p-3">
              <div className="mb-2 flex items-baseline justify-between">
                <p className="text-xs font-semibold text-foreground">{grupo}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  {formatNota(nota)} / {formatNota(max)}
                </p>
              </div>
              <div className="space-y-2.5">
                {itens.map(c => (
                  <div key={c.criterio}>
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-xs text-secondary-foreground">{c.criterio}</p>
                      <p className={`font-mono text-xs ${scoreColor(c.nota, c.notaMaxima || 1)}`}>
                        {formatNota(c.nota)} / {formatNota(c.notaMaxima)}
                      </p>
                    </div>
                    <div className="mt-1 h-1 rounded-full bg-secondary">
                      <div
                        className={`h-full rounded-full ${scoreBarColor(c.nota, c.notaMaxima || 1)}`}
                        style={{ width: `${c.notaMaxima ? (c.nota / c.notaMaxima) * 100 : 0}%` }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{c.comentario}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function scoreBarColor(score: number, max: number) {
  const pct = score / max
  if (pct >= 0.8) return 'bg-success'
  if (pct >= 0.6) return 'bg-warning'
  return 'bg-danger'
}

export default function FeedbackPanel({ feedback, loading, loadingMessage, error, banca }: Props) {
  const [showExemplar, setShowExemplar] = useState(false)

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
        <Loader2 size={32} className="animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">{loadingMessage}</p>
      </div>
    )
  }

  if (error) {
    const isKeyMissing = error.toLowerCase().includes('configure sua chave')
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger/10 text-danger">
          <AlertTriangle size={22} />
        </div>
        <p className="text-sm font-medium text-foreground">Não foi possível analisar</p>
        <p className="text-xs leading-relaxed text-muted-foreground">{error}</p>
        {isKeyMissing && (
          <Link
            to="/configuracoes"
            className="rounded-md border border-primary/30 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
          >
            Ir para Configurações
          </Link>
        )}
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
          <span className="font-mono text-4xl font-bold text-foreground">
            {feedback.notaMaxima === 10 ? formatNota(feedback.notaFinal) : feedback.notaFinal}
          </span>
          <span className="mb-1 text-lg text-muted-foreground">/{feedback.notaMaxima}</span>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-secondary">
          <div
            className={`h-full rounded-full transition-all duration-700 ${scoreBarColor(feedback.notaFinal, feedback.notaMaxima)}`}
            style={{ width: `${(feedback.notaFinal / feedback.notaMaxima) * 100}%` }}
          />
        </div>
        <p className={`mt-2 text-xs font-medium ${scoreColor(feedback.notaFinal, feedback.notaMaxima)}`}>
          {labelNota(feedback)}
        </p>
      </div>

      {feedback.motivoNotaZero && (
        <div className="rounded-lg border border-danger/30 bg-danger/10 p-3 text-xs leading-relaxed text-danger">
          <strong>Nota zero:</strong> {feedback.motivoNotaZero}
        </div>
      )}

      {feedback.criterios && feedback.criterios.length > 0 && <CriteriosSection criterios={feedback.criterios} />}

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
            Redação Modelo
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
