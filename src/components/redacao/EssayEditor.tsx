import { Sparkles, Loader2 } from 'lucide-react'
import { BANCAS } from '../../types/redacao'

type Props = {
  banca: string
  setBanca: (v: string) => void
  cargo: string
  setCargo: (v: string) => void
  tema: string
  setTema: (v: string) => void
  texto: string
  setTexto: (v: string) => void
  loading: boolean
  onAnalyze: () => void
}

export default function EssayEditor({
  banca,
  setBanca,
  cargo,
  setCargo,
  tema,
  setTema,
  texto,
  setTexto,
  loading,
  onAnalyze,
}: Props) {
  const wordCount = texto.trim() ? texto.trim().split(/\s+/).length : 0
  const canAnalyze = Boolean(texto.trim() && banca && tema.trim()) && !loading

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="grid grid-cols-3 gap-3 border-b border-border p-6 pb-5">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Banca
          </label>
          <select
            value={banca}
            onChange={e => setBanca(e.target.value)}
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary/40"
          >
            <option value="">Selecione</option>
            {BANCAS.map(b => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Cargo
          </label>
          <input
            value={cargo}
            onChange={e => setCargo(e.target.value)}
            placeholder="ex: Analista Judiciário - TI"
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/40"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tema
          </label>
          <input
            value={tema}
            onChange={e => setTema(e.target.value)}
            placeholder="ex: Reforma administrativa no serviço público"
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/40"
          />
        </div>
      </div>

      <textarea
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder="Digite sua redação aqui...&#10;&#10;Dica: uma redação completa para concurso costuma ter entre 25 e 30 linhas."
        className="flex-1 resize-none bg-background p-8 text-sm leading-loose text-foreground outline-none placeholder:text-muted-foreground"
      />

      <div className="flex items-center justify-between border-t border-border bg-card px-6 py-3">
        <span className="font-mono text-xs text-muted-foreground">{wordCount} palavras</span>
        <button
          onClick={onAnalyze}
          disabled={!canAnalyze}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-secondary disabled:text-muted-foreground"
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Analisando...
            </>
          ) : (
            <>
              <Sparkles size={14} />
              Analisar com IA
            </>
          )}
        </button>
      </div>
    </div>
  )
}
