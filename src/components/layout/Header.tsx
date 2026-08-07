import { Menu } from 'lucide-react'
import { useConcurso } from '../../context/ConcursoContext'

type HeaderProps = {
  onOpenMobileNav: () => void
}

export default function Header({ onOpenMobileNav }: HeaderProps) {
  const { concursos, selectedConcurso, setSelectedConcurso, loading } = useConcurso()

  return (
    <header className="flex h-header items-center justify-between border-b border-border bg-card px-3 sm:px-6">
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenMobileNav}
          aria-label="Abrir menu"
          className="mr-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-white/5 lg:hidden"
        >
          <Menu size={18} />
        </button>
        <span className="hidden text-sm text-muted-foreground sm:inline">Concurso Atual</span>
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="concurso-select"
          className="hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:block"
        >
          Concurso
        </label>
        <div className="relative">
          <select
            id="concurso-select"
            value={selectedConcurso?.id ?? ''}
            disabled={loading}
            onChange={e => {
              const found = concursos.find(c => c.id === e.target.value)
              if (found) setSelectedConcurso(found)
            }}
            className="cursor-pointer appearance-none rounded-md border border-primary/25 bg-primary/10 py-1.5 pl-3 pr-8 text-sm font-semibold text-primary outline-none disabled:cursor-wait disabled:opacity-60"
          >
            {loading && <option value="">Carregando...</option>}
            {concursos.map(c => (
              <option key={c.id} value={c.id} className="bg-card text-foreground">
                {c.nome}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="#61dafb"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/30 sm:px-3">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.4" />
            <path d="M8.5 8.5L11.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:inline">Buscar</span>
        </button>

        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground">
          U
        </div>
      </div>
    </header>
  )
}
