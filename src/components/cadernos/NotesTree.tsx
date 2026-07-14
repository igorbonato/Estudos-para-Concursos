import { useState } from 'react'
import { ChevronRight, ChevronDown, Folder, FolderOpen, Plus, Trash2, Check, X, Loader2 } from 'lucide-react'
import type { PastaNode } from '../../types/cadernos'

type Props = {
  pastas: PastaNode[]
  loading: boolean
  selectedPastaId: string | null
  onSelectPasta: (pastaId: string) => void
  onCreatePasta: (nome: string, parentId: string | null) => Promise<void>
  onDeletePasta: (id: string) => Promise<void>
}

export default function NotesTree({
  pastas,
  loading,
  selectedPastaId,
  onSelectPasta,
  onCreatePasta,
  onDeletePasta,
}: Props) {
  const [addingRoot, setAddingRoot] = useState(false)
  const [novoNome, setNovoNome] = useState('')
  const [creating, setCreating] = useState(false)

  const handleCreate = async () => {
    if (!novoNome.trim() || creating) return
    setCreating(true)
    await onCreatePasta(novoNome, null)
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
              onCreatePasta={onCreatePasta}
              onDeletePasta={onDeletePasta}
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
  onCreatePasta,
  onDeletePasta,
}: {
  pasta: PastaNode
  depth: number
  selectedPastaId: string | null
  onSelectPasta: (pastaId: string) => void
  onCreatePasta: (nome: string, parentId: string | null) => Promise<void>
  onDeletePasta: (id: string) => Promise<void>
}) {
  const [expanded, setExpanded] = useState(depth < 1)
  const [addingChild, setAddingChild] = useState(false)
  const [childNome, setChildNome] = useState('')
  const [creatingChild, setCreatingChild] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const hasChildren = pasta.children.length > 0
  const isSelected = pasta.id === selectedPastaId
  const indent = 12 + depth * 16

  const handleCreateChild = async () => {
    if (!childNome.trim() || creatingChild) return
    setCreatingChild(true)
    await onCreatePasta(childNome, pasta.id)
    setCreatingChild(false)
    setChildNome('')
    setAddingChild(false)
    setExpanded(true)
  }

  const handleDelete = async () => {
    if (deleting) return
    setDeleting(true)
    await onDeletePasta(pasta.id)
    setDeleting(false)
    setConfirmingDelete(false)
  }

  return (
    <div>
      <div className="group flex items-center rounded transition-colors hover:bg-white/5">
        <button
          onClick={() => {
            onSelectPasta(pasta.id)
            if (hasChildren) setExpanded(e => !e)
          }}
          className={`flex flex-1 items-center gap-1.5 py-1.5 text-left text-sm transition-colors ${
            isSelected ? 'text-primary' : 'text-secondary-foreground'
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

        {confirmingDelete ? (
          <div className="flex flex-shrink-0 items-center gap-1 pr-2">
            {deleting ? (
              <Loader2 size={13} className="animate-spin text-muted-foreground" />
            ) : (
              <>
                <button
                  onClick={handleDelete}
                  title="Confirmar exclusão"
                  className="text-danger transition-colors hover:opacity-70"
                >
                  <Check size={13} />
                </button>
                <button
                  onClick={() => setConfirmingDelete(false)}
                  title="Cancelar"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X size={13} />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-shrink-0 items-center gap-1.5 pr-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => setAddingChild(a => !a)}
              title="Nova subpasta"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Plus size={13} />
            </button>
            <button
              onClick={() => setConfirmingDelete(true)}
              title="Excluir pasta"
              className="text-muted-foreground transition-colors hover:text-danger"
            >
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </div>

      {addingChild && (
        <div className="flex items-center gap-1 py-1" style={{ paddingLeft: indent + 20 }}>
          <input
            autoFocus
            value={childNome}
            onChange={e => setChildNome(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCreateChild()}
            placeholder="Nome da subpasta"
            disabled={creatingChild}
            className="w-full rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
          />
          <button
            onClick={handleCreateChild}
            disabled={!childNome.trim() || creatingChild}
            className="flex-shrink-0 rounded-md bg-primary p-1 text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            {creatingChild ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
          </button>
        </div>
      )}

      {expanded && hasChildren && (
        <div>
          {pasta.children.map(child => (
            <TreeNode
              key={child.id}
              pasta={child}
              depth={depth + 1}
              selectedPastaId={selectedPastaId}
              onSelectPasta={onSelectPasta}
              onCreatePasta={onCreatePasta}
              onDeletePasta={onDeletePasta}
            />
          ))}
        </div>
      )}
    </div>
  )
}
