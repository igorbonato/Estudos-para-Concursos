import { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
import { useConcurso } from '../../context/ConcursoContext'

export default function ConcursosSettings() {
  const { concursos, selectedConcurso, setSelectedConcurso, addConcurso, removeConcurso } = useConcurso()
  const [novoConcurso, setNovoConcurso] = useState('')

  const handleAdd = () => {
    if (!novoConcurso.trim()) return
    addConcurso(novoConcurso)
    setNovoConcurso('')
  }

  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">Meus Concursos</h2>
      <p className="-mt-2 text-xs text-muted-foreground">
        Essa lista alimenta o seletor de "Concurso Atual" no cabeçalho do app.
      </p>

      <div className="flex gap-2">
        <input
          value={novoConcurso}
          onChange={e => setNovoConcurso(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="ex: TRF3"
          className="flex-1 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/40"
        />
        <button
          onClick={handleAdd}
          disabled={!novoConcurso.trim()}
          className="flex flex-shrink-0 items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={15} />
          Adicionar
        </button>
      </div>

      {concursos.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Nenhum concurso cadastrado.
        </div>
      ) : (
        <div className="space-y-2">
          {concursos.map(c => (
            <div
              key={c}
              onClick={() => setSelectedConcurso(c)}
              className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                c === selectedConcurso ? 'border-primary/30 bg-primary/[0.06]' : 'border-border bg-card hover:border-primary/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">{c}</span>
                {c === selectedConcurso && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Atual
                  </span>
                )}
              </div>
              <button
                onClick={e => {
                  e.stopPropagation()
                  removeConcurso(c)
                }}
                className="text-muted-foreground transition-colors hover:text-danger"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
