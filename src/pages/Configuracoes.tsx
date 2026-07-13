import { useState } from 'react'
import { SlidersHorizontal, Sparkles, Layers } from 'lucide-react'
import GeneralSettings from '../components/configuracoes/GeneralSettings'
import AISettings from '../components/configuracoes/AISettings'
import ConcursosSettings from '../components/configuracoes/ConcursosSettings'

type Categoria = 'geral' | 'ia' | 'concursos'

const CATEGORIAS: { id: Categoria; label: string; icon: React.ReactNode }[] = [
  { id: 'geral', label: 'Geral', icon: <SlidersHorizontal size={15} /> },
  { id: 'ia', label: 'Integrações (IA)', icon: <Sparkles size={15} /> },
  { id: 'concursos', label: 'Meus Concursos', icon: <Layers size={15} /> },
]

export default function Configuracoes() {
  const [categoria, setCategoria] = useState<Categoria>('geral')

  return (
    <div className="flex h-full">
      <aside className="w-56 flex-shrink-0 border-r border-border bg-card p-2">
        <nav className="flex flex-col gap-1">
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

      <div className="flex-1 overflow-y-auto p-6">
        {categoria === 'geral' && <GeneralSettings />}
        {categoria === 'ia' && <AISettings />}
        {categoria === 'concursos' && <ConcursosSettings />}
      </div>
    </div>
  )
}
