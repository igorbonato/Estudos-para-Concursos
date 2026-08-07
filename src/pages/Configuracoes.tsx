import { useState } from 'react'
import { SlidersHorizontal, Sparkles, Layers, ChevronDown } from 'lucide-react'
import GeneralSettings from '../components/configuracoes/GeneralSettings'
import AISettings from '../components/configuracoes/AISettings'
import ConcursosSettings from '../components/configuracoes/ConcursosSettings'
import { useScrollCollapse } from '../lib/useScrollCollapse'

type Categoria = 'geral' | 'ia' | 'concursos'

const CATEGORIAS: { id: Categoria; label: string; icon: React.ReactNode }[] = [
  { id: 'geral', label: 'Geral', icon: <SlidersHorizontal size={15} /> },
  { id: 'ia', label: 'Integrações (IA)', icon: <Sparkles size={15} /> },
  { id: 'concursos', label: 'Meus Concursos', icon: <Layers size={15} /> },
]

export default function Configuracoes() {
  const [categoria, setCategoria] = useState<Categoria>('geral')
  const { collapsed, onScroll, expand } = useScrollCollapse()
  const categoriaAtual = CATEGORIAS.find(c => c.id === categoria)

  return (
    <div className="flex h-full flex-col md:flex-row">
      <aside className="w-full flex-shrink-0 border-b border-border bg-card md:h-full md:w-56 md:border-b-0 md:border-r">
        <button
          onClick={expand}
          className={`w-full items-center justify-between gap-2.5 px-3 py-2.5 text-left text-sm font-medium text-secondary-foreground md:hidden ${
            collapsed ? 'flex' : 'hidden'
          }`}
        >
          <span className="flex items-center gap-2.5 truncate">
            {categoriaAtual?.icon}
            {categoriaAtual?.label}
          </span>
          <ChevronDown size={14} className="flex-shrink-0" />
        </button>

        <nav className={`flex-col gap-1 p-2 md:flex ${collapsed ? 'hidden' : 'flex'}`}>
          {CATEGORIAS.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoria(cat.id)}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                categoria === cat.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-secondary-foreground hover:bg-white/5'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 overflow-y-auto p-6" onScroll={onScroll}>
        {categoria === 'geral' && <GeneralSettings />}
        {categoria === 'ia' && <AISettings />}
        {categoria === 'concursos' && <ConcursosSettings />}
      </div>
    </div>
  )
}
