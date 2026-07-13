import { useState } from 'react'
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText } from 'lucide-react'
import type { Pasta } from '../../data/cadernosMock'

type Props = {
  pastas: Pasta[]
  selectedPastaId: string | null
  onSelectPasta: (pastaId: string) => void
  onSelectNota: (pastaId: string, notaId: string) => void
}

export default function NotesTree({ pastas, selectedPastaId, onSelectPasta, onSelectNota }: Props) {
  return (
    <nav className="flex flex-col gap-0.5 p-2">
      {pastas.map(pasta => (
        <TreeNode
          key={pasta.id}
          pasta={pasta}
          depth={0}
          selectedPastaId={selectedPastaId}
          onSelectPasta={onSelectPasta}
          onSelectNota={onSelectNota}
        />
      ))}
    </nav>
  )
}

function TreeNode({
  pasta,
  depth,
  selectedPastaId,
  onSelectPasta,
  onSelectNota,
}: {
  pasta: Pasta
  depth: number
  selectedPastaId: string | null
  onSelectPasta: (pastaId: string) => void
  onSelectNota: (pastaId: string, notaId: string) => void
}) {
  const [expanded, setExpanded] = useState(depth < 1)
  const hasContent = (pasta.children?.length ?? 0) > 0 || (pasta.notas?.length ?? 0) > 0
  const isSelected = pasta.id === selectedPastaId
  const indent = 12 + depth * 16

  return (
    <div>
      <button
        onClick={() => {
          onSelectPasta(pasta.id)
          if (hasContent) setExpanded(e => !e)
        }}
        className={`flex w-full items-center gap-1.5 rounded py-1.5 pr-2 text-left text-sm transition-colors ${
          isSelected ? 'bg-primary/10 text-primary' : 'text-secondary-foreground hover:bg-white/5'
        }`}
        style={{ paddingLeft: indent }}
      >
        {hasContent ? (
          expanded ? (
            <ChevronDown size={14} className="flex-shrink-0 opacity-70" />
          ) : (
            <ChevronRight size={14} className="flex-shrink-0 opacity-70" />
          )
        ) : (
          <span className="w-3.5 flex-shrink-0" />
        )}
        {expanded ? (
          <FolderOpen size={15} className="flex-shrink-0" />
        ) : (
          <Folder size={15} className="flex-shrink-0" />
        )}
        <span className="truncate">{pasta.nome}</span>
      </button>

      {expanded && (
        <div>
          {pasta.children?.map(child => (
            <TreeNode
              key={child.id}
              pasta={child}
              depth={depth + 1}
              selectedPastaId={selectedPastaId}
              onSelectPasta={onSelectPasta}
              onSelectNota={onSelectNota}
            />
          ))}
          {pasta.notas?.map(nota => (
            <button
              key={nota.id}
              onClick={() => onSelectNota(pasta.id, nota.id)}
              className="flex w-full items-center gap-1.5 rounded py-1.5 pr-2 text-left text-sm text-muted-foreground transition-colors hover:bg-white/5"
              style={{ paddingLeft: indent + 20 }}
            >
              <FileText size={14} className="flex-shrink-0" />
              <span className="truncate">{nota.titulo}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
