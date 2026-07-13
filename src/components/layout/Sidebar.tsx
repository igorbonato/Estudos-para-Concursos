import { NavLink } from 'react-router-dom'

type NavItemProps = {
  to: string
  icon: React.ReactNode
  label: string
  end?: boolean
}

function NavItem({ to, icon, label, end }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors duration-150 ${
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-secondary-foreground hover:bg-white/5'
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  )
}

export default function Sidebar() {
  return (
    <aside className="flex h-full flex-col overflow-hidden border-r border-border bg-card">
      <div className="flex h-header items-center gap-2 border-b border-border px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-primary to-accent">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="8" cy="8" r="2" fill="white" />
          </svg>
        </div>
        <span className="text-sm font-semibold">ConcursoApp</span>
      </div>

      <nav className="flex flex-col gap-1 px-2 pt-4">
        <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Geral
        </p>
        <NavItem
          to="/"
          end
          label="Dashboard"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.8" />
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4" />
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4" />
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.8" />
            </svg>
          }
        />
        <NavItem
          to="/cadernos"
          label="Cadernos"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 2h10a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          }
        />
        <NavItem
          to="/flashcards"
          label="Flashcards"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="3" width="10" height="7" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
              <rect x="4" y="6" width="10" height="7" rx="1.3" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          }
        />
        <NavItem
          to="/redacao"
          label="Redação"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M11.5 1.5l3 3L5 14H2v-3z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </nav>

      <nav className="mt-auto flex flex-col gap-1 px-2 pb-4">
        <NavItem
          to="/configuracoes"
          label="Configurações"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="2.3" stroke="currentColor" strokeWidth="1.3" />
              <path
                d="M8 1.5v1.4M8 13.1v1.4M14.5 8h-1.4M2.9 8H1.5M12.5 3.5l-1 1M4.5 11.5l-1 1M12.5 12.5l-1-1M4.5 4.5l-1-1"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          }
        />
      </nav>
    </aside>
  )
}
