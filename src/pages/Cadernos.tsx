import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { PastaRow, Nota } from '../types/cadernos'
import { buildPastaTree, findPastaNode } from '../lib/buildPastaTree'
import NotesTree from '../components/cadernos/NotesTree'
import NotesGrid from '../components/cadernos/NotesGrid'
import NoteEditorModal from '../components/cadernos/NoteEditorModal'

type ModalState = { open: boolean; nota: Nota | null; key: number }

export default function Cadernos() {
  const [pastas, setPastas] = useState<PastaRow[]>([])
  const [loadingPastas, setLoadingPastas] = useState(true)
  const [pastasError, setPastasError] = useState<string | null>(null)
  const [selectedPastaId, setSelectedPastaId] = useState<string | null>(null)

  const [notas, setNotas] = useState<Nota[]>([])
  const [loadingNotas, setLoadingNotas] = useState(false)
  const [notasError, setNotasError] = useState<string | null>(null)

  const [modal, setModal] = useState<ModalState>({ open: false, nota: null, key: 0 })
  const [savingNota, setSavingNota] = useState(false)

  const tree = useMemo(() => buildPastaTree(pastas), [pastas])
  const selectedPasta = selectedPastaId ? findPastaNode(tree, selectedPastaId) : null

  useEffect(() => {
    let active = true

    async function loadPastas() {
      setLoadingPastas(true)
      const { data, error } = await supabase.from('assuntos_pastas').select('*')
      if (!active) return

      if (error) {
        setPastasError(error.message)
      } else {
        const list = (data ?? []) as PastaRow[]
        setPastas(list)
        setPastasError(null)
        setSelectedPastaId(prev => prev ?? list.find(p => !p.parent_id)?.id ?? null)
      }
      setLoadingPastas(false)
    }

    loadPastas()
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!selectedPastaId) {
      setNotas([])
      return
    }

    let active = true

    async function loadNotas() {
      setLoadingNotas(true)
      const { data, error } = await supabase
        .from('anotacoes')
        .select('*')
        .eq('pasta_id', selectedPastaId)
        .order('created_at', { ascending: false })
      if (!active) return

      if (error) {
        setNotasError(error.message)
      } else {
        setNotas((data ?? []) as Nota[])
        setNotasError(null)
      }
      setLoadingNotas(false)
    }

    loadNotas()
    return () => {
      active = false
    }
  }, [selectedPastaId])

  const handleCreatePasta = async (nome: string, parentId: string | null) => {
    const irmaos = pastas.filter(p => p.parent_id === parentId)
    const ordem = irmaos.length ? Math.max(...irmaos.map(p => p.ordem)) + 1 : 0

    const { data, error } = await supabase
      .from('assuntos_pastas')
      .insert({ nome: nome.trim(), parent_id: parentId, disciplina_id: null, ordem })
      .select()
      .single()

    if (error) {
      setPastasError(error.message)
      return
    }

    setPastas(prev => [...prev, data as PastaRow])
    setSelectedPastaId((data as PastaRow).id)
  }

  const handleRenamePasta = async (id: string, novoNome: string) => {
    const nome = novoNome.trim()
    if (!nome) return

    const { data, error } = await supabase.from('assuntos_pastas').update({ nome }).eq('id', id).select().single()

    if (error) {
      setPastasError(error.message)
      return
    }

    setPastas(prev => prev.map(p => (p.id === id ? (data as PastaRow) : p)))
  }

  const handleReorderPasta = async (draggedId: string, targetId: string, position: 'before' | 'after') => {
    if (draggedId === targetId) return

    const dragged = pastas.find(p => p.id === draggedId)
    const target = pastas.find(p => p.id === targetId)
    if (!dragged || !target || dragged.parent_id !== target.parent_id) return

    const irmaos = pastas.filter(p => p.parent_id === dragged.parent_id).sort((a, b) => a.ordem - b.ordem)
    const semArrastada = irmaos.filter(p => p.id !== draggedId)
    const targetIndex = semArrastada.findIndex(p => p.id === targetId)
    const insertAt = position === 'before' ? targetIndex : targetIndex + 1
    semArrastada.splice(insertAt, 0, dragged)

    const atualizados = semArrastada
      .map((p, index) => ({ ...p, ordem: index }))
      .filter(p => p.ordem !== irmaos.find(o => o.id === p.id)?.ordem)

    if (atualizados.length === 0) return

    setPastas(prev => prev.map(p => atualizados.find(a => a.id === p.id) ?? p))

    const results = await Promise.all(
      atualizados.map(p => supabase.from('assuntos_pastas').update({ ordem: p.ordem }).eq('id', p.id)),
    )
    const failed = results.find(r => r.error)
    if (failed?.error) setPastasError(failed.error.message)
  }

  const handleDeletePasta = async (id: string) => {
    const { error: deleteError } = await supabase.from('assuntos_pastas').delete().eq('id', id)
    if (deleteError) {
      setPastasError(deleteError.message)
      return
    }

    const { data, error: fetchError } = await supabase.from('assuntos_pastas').select('*')
    if (fetchError) {
      setPastasError(fetchError.message)
      return
    }

    const list = (data ?? []) as PastaRow[]
    setPastas(list)
    setPastasError(null)

    if (selectedPastaId && !list.some(p => p.id === selectedPastaId)) {
      setSelectedPastaId(list.find(p => !p.parent_id)?.id ?? null)
    }
  }

  const openNota = (nota: Nota) => setModal(m => ({ open: true, nota, key: m.key + 1 }))
  const openNovaAnotacao = () => setModal(m => ({ open: true, nota: null, key: m.key + 1 }))
  const closeModal = () => setModal(m => ({ ...m, open: false }))

  const saveNota = async (titulo: string, conteudo: string) => {
    if (!selectedPastaId) return
    setSavingNota(true)

    if (modal.nota) {
      const { data, error } = await supabase
        .from('anotacoes')
        .update({ titulo, conteudo })
        .eq('id', modal.nota.id)
        .select()
        .single()
      if (error) {
        setNotasError(error.message)
        setSavingNota(false)
        return
      }
      setNotas(prev => prev.map(n => (n.id === modal.nota!.id ? (data as Nota) : n)))
    } else {
      const { data, error } = await supabase
        .from('anotacoes')
        .insert({ pasta_id: selectedPastaId, titulo, conteudo })
        .select()
        .single()
      if (error) {
        setNotasError(error.message)
        setSavingNota(false)
        return
      }
      setNotas(prev => [data as Nota, ...prev])
    }

    setSavingNota(false)
    closeModal()
  }

  return (
    <div className="flex h-full">
      <aside className="w-72 flex-shrink-0 overflow-y-auto border-r border-border bg-card">
        <NotesTree
          pastas={tree}
          loading={loadingPastas}
          selectedPastaId={selectedPastaId}
          onSelectPasta={setSelectedPastaId}
          onCreatePasta={handleCreatePasta}
          onDeletePasta={handleDeletePasta}
          onRenamePasta={handleRenamePasta}
          onReorderPasta={handleReorderPasta}
        />
      </aside>

      <div className="flex flex-1 flex-col overflow-y-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">{selectedPasta?.nome ?? 'Cadernos'}</h1>
          <button
            onClick={openNovaAnotacao}
            disabled={!selectedPastaId}
            className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={15} />
            Nova Anotação
          </button>
        </div>

        {pastasError && (
          <div className="mb-4 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
            {pastasError}
          </div>
        )}
        {notasError && (
          <div className="mb-4 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
            {notasError}
          </div>
        )}

        <NotesGrid notas={notas} loading={loadingNotas} onOpenNota={openNota} />
      </div>

      <NoteEditorModal
        key={modal.key}
        open={modal.open}
        pastaNome={selectedPasta?.nome ?? ''}
        initialTitulo={modal.nota?.titulo}
        initialConteudo={modal.nota?.conteudo ?? ''}
        saving={savingNota}
        onClose={closeModal}
        onSave={saveNota}
      />
    </div>
  )
}
