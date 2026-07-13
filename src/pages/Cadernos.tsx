import { useState } from 'react'
import { Plus } from 'lucide-react'
import { PASTAS_MOCK, type Pasta, type Nota } from '../data/cadernosMock'
import NotesTree from '../components/cadernos/NotesTree'
import NotesGrid from '../components/cadernos/NotesGrid'
import NoteEditorModal from '../components/cadernos/NoteEditorModal'

function findPasta(pastas: Pasta[], id: string): Pasta | null {
  for (const pasta of pastas) {
    if (pasta.id === id) return pasta
    if (pasta.children) {
      const found = findPasta(pasta.children, id)
      if (found) return found
    }
  }
  return null
}

type ModalState = { open: boolean; pastaId: string | null; nota: Nota | null }

export default function Cadernos() {
  const [pastas, setPastas] = useState<Pasta[]>(PASTAS_MOCK)
  const [selectedPastaId, setSelectedPastaId] = useState<string>('joins')
  const [modal, setModal] = useState<ModalState>({ open: false, pastaId: null, nota: null })

  const selectedPasta = findPasta(pastas, selectedPastaId)
  const notas = selectedPasta?.notas ?? []

  const openNota = (pastaId: string, nota: Nota) => {
    setSelectedPastaId(pastaId)
    setModal({ open: true, pastaId, nota })
  }

  const openNovaAnotacao = () => {
    setModal({ open: true, pastaId: selectedPastaId, nota: null })
  }

  const closeModal = () => setModal({ open: false, pastaId: null, nota: null })

  const saveNota = (titulo: string, conteudo: string) => {
    if (!modal.pastaId) return

    setPastas(prev => {
      const clone = structuredClone(prev)
      const pasta = findPasta(clone, modal.pastaId!)
      if (!pasta) return prev

      if (!pasta.notas) pasta.notas = []

      if (modal.nota) {
        const idx = pasta.notas.findIndex(n => n.id === modal.nota!.id)
        if (idx !== -1) {
          pasta.notas[idx] = { ...pasta.notas[idx], titulo, conteudo }
        }
      } else {
        pasta.notas.unshift({
          id: `nota-${Date.now()}`,
          titulo,
          preview: conteudo.replace(/<[^>]+>/g, '').slice(0, 120),
          data: 'agora há pouco',
          conteudo,
        })
      }

      return clone
    })

    closeModal()
  }

  return (
    <div className="flex h-full">
      <aside className="w-72 flex-shrink-0 overflow-y-auto border-r border-border bg-card">
        <NotesTree
          pastas={pastas}
          selectedPastaId={selectedPastaId}
          onSelectPasta={setSelectedPastaId}
          onSelectNota={(pastaId, notaId) => {
            const pasta = findPasta(pastas, pastaId)
            const nota = pasta?.notas?.find(n => n.id === notaId)
            if (nota) openNota(pastaId, nota)
          }}
        />
      </aside>

      <div className="flex flex-1 flex-col overflow-y-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">{selectedPasta?.nome ?? 'Cadernos'}</h1>
          <button
            onClick={openNovaAnotacao}
            className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus size={15} />
            Nova Anotação
          </button>
        </div>

        <NotesGrid notas={notas} onOpenNota={nota => openNota(selectedPastaId, nota)} />
      </div>

      <NoteEditorModal
        open={modal.open}
        pastaNome={(modal.pastaId && findPasta(pastas, modal.pastaId)?.nome) ?? ''}
        initialTitulo={modal.nota?.titulo}
        initialConteudo={modal.nota?.conteudo}
        onClose={closeModal}
        onSave={saveNota}
      />
    </div>
  )
}
