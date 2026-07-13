import { useState } from 'react'
import { ChevronRight, ChevronDown, Folder, FolderOpen, Plus, Loader2 } from 'lucide-react'
import type { PastaNode } from '../../types/cadernos'

type Props = {
  pastas: PastaNode[]
  loading: boolean
  selectedPastaId: string | null
  onSelectPasta: (pastaId: string) => void
  onCreatePasta: (nome: string) => Promise<void>
}

export default function NotesTree({ pastas, loading, selectedPastaId, onSelectPasta, onCreatePasta }: Props) {
  const [addingRoot, setAddingRoot] = useState(false)
  const [novoNome, setNovoNome] = useState('')
  const [creating, setCreating] = useState(false)

  const handleCreate = async () => {
    if (!novoNome.trim() || creating) return
    setCreating(true)
    await onCreatePasta(novoNome)
    setCreating(false)
    setNovoNome('')
    setAddingRoot(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between px-3 pt-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Pastas</p>
        <button
          onClick={() => setAddingRoot(a => !a)}
          className="text-muted-foreground transition-colors hover:text-primary"
          title="Nova pasta"
        >
          <Plus size={15} />
        </button>
      </div>

      {addingRoot && (
        <div className="flex items-center gap-1 px-2 pt-2">
          <input
            autoFocus
            value={novoNome}
            onChange={e => setNovoNome(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCreate()}
            placeholder="Nome da pasta"
            disabled={creating}
            className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
          />
          <button
            onClick={handleCreate}
            disabled={!novoNome.trim() || creating}
            className="flex-shrink-0 rounded-md bg-primary p-1.5 text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            {creating ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 p-6 text-sm text-muted-foreground">
          <Loader2 size={15} className="animate-spin" />
          Carregando...
        </div>
      ) : pastas.length === 0 ? (
        <p className="p-4 text-xs text-muted-foreground">Nenhuma pasta ainda. Crie a primeira acima.</p>
      ) : (
        <nav className="flex flex-col gap-0.5 p-2">
          {pastas.map(pasta => (
            <TreeNode
              key={pasta.id}
              pasta={pasta}
              depth={0}
              selectedPastaId={selectedPastaId}
              onSelectPasta={onSelectPasta}
            />
          ))}
        </nav>
      )}
    </div>
  )
}

function TreeNode({
  pasta,
  depth,
  selectedPastaId,
  onSelectPasta,
}: {
  pasta: PastaNode
  depth: number
  selectedPastaId: string | null
  onSelectPasta: (pastaId: string) => void
}) {
  const [expanded, setExpanded] = useState(depth < 1)
  const hasChildren = pasta.children.length > 0
  const isSelected = pasta.id === selectedPastaId
  const indent = 12 + depth * 16

  return (
    <div>
      <button
        onClick={() => {
          onSelectPasta(pasta.id)
          if (hasChildren) setExpanded(e => !e)
        }}
        className={`flex w-full items-center gap-1.5 rounded py-1.5 pr-2 text-left text-sm transition-colors ${
          isSelected ? 'bg-primary/10 text-primary' : 'text-secondary-foreground hover:bg-white/5'
        }`}
        style={{ paddingLeft: indent }}
      >
        {hasChildren ? (
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

      {expanded && hasChildren && (
        <div>
          {pasta.children.map(child => (
            <TreeNode
              key={child.id}
              pasta={child}
              depth={depth + 1}
              selectedPastaId={selectedPastaId}
              onSelectPasta={onSelectPasta}
            />
          ))}
        </div>
      )}
    </div>
  )
}
