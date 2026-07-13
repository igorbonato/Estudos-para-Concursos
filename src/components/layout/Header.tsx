import { useConcurso } from '../../context/ConcursoContext'

export default function Header() {
  const { concursos, selectedConcurso, setSelectedConcurso } = useConcurso()

  return (
    <header className="flex h-header items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Concurso Atual</span>
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="concurso-select"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Concurso
        </label>
        <div className="relative">
          <select
            id="concurso-select"
            value={selectedConcurso}
            onChange={e => setSelectedConcurso(e.target.value)}
            className="cursor-pointer appearance-none rounded-md border border-primary/25 bg-primary/10 py-1.5 pl-3 pr-8 text-sm font-semibold text-primary outline-none"
          >
            {concursos.map(c => (
              <option key={c} value={c} className="bg-card text-foreground">
                {c}
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

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/30">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.4" />
            <path d="M8.5 8.5L11.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          Buscar
        </button>

        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground">
          U
        </div>
      </div>
    </header>
  )
}
