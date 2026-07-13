import { useState } from 'react'
import { Trash2, Plus, Loader2 } from 'lucide-react'
import { useConcurso } from '../../context/ConcursoContext'

export default function ConcursosSettings() {
  const { concursos, loading, error, selectedConcurso, setSelectedConcurso, addConcurso, removeConcurso } =
    useConcurso()
  const [novoConcurso, setNovoConcurso] = useState('')
  const [adding, setAdding] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const handleAdd = async () => {
    if (!novoConcurso.trim() || adding) return
    setAdding(true)
    await addConcurso(novoConcurso)
    setAdding(false)
    setNovoConcurso('')
  }

  const handleRemove = async (id: string) => {
    if (removingId) return
    setRemovingId(id)
    await removeConcurso(id)
    setRemovingId(null)
  }

  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">Meus Concursos</h2>
      <p className="-mt-2 text-xs text-muted-foreground">
        Essa lista alimenta o seletor de "Concurso Atual" no cabeçalho do app.
      </p>

      {error && (
        <div className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">{error}</div>
      )}

      <div className="flex gap-2">
        <input
          value={novoConcurso}
          onChange={e => setNovoConcurso(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="ex: TRF3"
          disabled={adding}
          className="flex-1 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/40 disabled:opacity-60"
        />
        <button
          onClick={handleAdd}
          disabled={!novoConcurso.trim() || adding}
          className="flex flex-shrink-0 items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {adding ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Adicionando...
            </>
          ) : (
            <>
              <Plus size={15} />
              Adicionar
            </>
          )}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-border p-8 text-sm text-muted-foreground">
          <Loader2 size={16} className="animate-spin" />
          Carregando concursos...
        </div>
      ) : concursos.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Nenhum concurso cadastrado.
        </div>
      ) : (
        <div className="space-y-2">
          {concursos.map(c => (
            <div
              key={c.id}
              onClick={() => setSelectedConcurso(c)}
              className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                c.id === selectedConcurso?.id
                  ? 'border-primary/30 bg-primary/[0.06]'
                  : 'border-border bg-card hover:border-primary/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">{c.nome}</span>
                {c.id === selectedConcurso?.id && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Atual
                  </span>
                )}
              </div>
              <button
                onClick={e => {
                  e.stopPropagation()
                  handleRemove(c.id)
                }}
                disabled={removingId === c.id}
                className="text-muted-foreground transition-colors hover:text-danger disabled:cursor-wait"
              >
                {removingId === c.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
