import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BookOpen } from 'lucide-react'
import { GUIAS } from '../data/guias'

export default function Guias() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(GUIAS[0]?.slug ?? null)
  const selected = GUIAS.find(g => g.slug === selectedSlug) ?? null

  if (GUIAS.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
        Nenhum guia encontrado em <code className="mx-1 rounded bg-card px-1.5 py-0.5">guia/</code>.
      </div>
    )
  }

  return (
    <div className="flex h-full">
      <aside className="w-64 flex-shrink-0 overflow-y-auto border-r border-border bg-card lg:w-72 xl:w-80">
        <div className="px-3 pt-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Guias</p>
        </div>

        <nav className="flex flex-col gap-0.5 p-2">
          {GUIAS.map(guia => (
            <button
              key={guia.slug}
              onClick={() => setSelectedSlug(guia.slug)}
              className={`flex items-center gap-2 rounded px-3 py-2 text-left text-sm transition-colors ${
                guia.slug === selectedSlug
                  ? 'bg-primary/10 text-primary'
                  : 'text-secondary-foreground hover:bg-white/5'
              }`}
            >
              <BookOpen size={14} className="flex-shrink-0 opacity-70" />
              <span className="truncate">{guia.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 overflow-y-auto p-6 xl:p-8">
        {selected && (
          <div className="mx-auto max-w-3xl prose prose-invert prose-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{selected.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
