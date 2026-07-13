import { useRef, useState } from 'react'
import { Bold, Italic, List, ListOrdered, ImagePlus, X, Loader2 } from 'lucide-react'

type Props = {
  open: boolean
  pastaNome: string
  initialTitulo?: string
  initialConteudo?: string
  saving?: boolean
  onClose: () => void
  onSave: (titulo: string, conteudo: string) => void
}

const TOOLBAR_ITEMS = [
  { icon: Bold, cmd: 'bold', label: 'Negrito' },
  { icon: Italic, cmd: 'italic', label: 'Itálico' },
  { icon: List, cmd: 'insertUnorderedList', label: 'Lista' },
  { icon: ListOrdered, cmd: 'insertOrderedList', label: 'Lista numerada' },
]

export default function NoteEditorModal({
  open,
  pastaNome,
  initialTitulo = '',
  initialConteudo = '',
  saving = false,
  onClose,
  onSave,
}: Props) {
  const [titulo, setTitulo] = useState(initialTitulo)
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!open) return null

  const exec = (cmd: string) => {
    document.execCommand(cmd, false)
    editorRef.current?.focus()
  }

  const handleInsertImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      editorRef.current?.focus()
      document.execCommand('insertImage', false, reader.result as string)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleSave = () => {
    const conteudo = editorRef.current?.innerHTML ?? ''
    onSave(titulo.trim() || 'Sem título', conteudo)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <span className="text-xs text-muted-foreground">{pastaNome}</span>
          <button onClick={onClose} className="text-muted-foreground transition-colors hover:text-foreground">
            <X size={16} />
          </button>
        </div>

        <div className="px-5 pt-4">
          <input
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            placeholder="Título da anotação"
            className="w-full bg-transparent text-lg font-semibold text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="mt-3 flex items-center gap-0.5 border-y border-border px-5 py-2">
          {TOOLBAR_ITEMS.map(({ icon: Icon, cmd, label }) => (
            <button
              key={cmd}
              type="button"
              title={label}
              onMouseDown={e => {
                e.preventDefault()
                exec(cmd)
              }}
              className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              <Icon size={15} />
            </button>
          ))}
          <div className="mx-2 h-5 w-px bg-border" />
          <button
            type="button"
            title="Inserir imagem"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <ImagePlus size={15} />
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleInsertImage} />
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            data-placeholder="Escreva seu macete ou resumo..."
            dangerouslySetInnerHTML={{ __html: initialConteudo }}
            className="min-h-[200px] text-sm leading-relaxed text-foreground outline-none [&_img]:my-2 [&_img]:max-w-full [&_img]:rounded"
          />
        </div>

        <div className="flex justify-end gap-2 border-t border-border px-5 py-3">
          <button
            onClick={onClose}
            disabled={saving}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}
