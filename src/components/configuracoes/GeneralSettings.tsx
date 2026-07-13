import { useState } from 'react'
import { Download, Trash2, Loader2 } from 'lucide-react'
import ToggleSwitch from '../ui/ToggleSwitch'
import { useConcurso } from '../../context/ConcursoContext'

export default function GeneralSettings() {
  const { concursos, selectedConcurso, resetConcursos } = useConcurso()
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleExport = () => {
    const data = { concursos, selectedConcurso }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'concurso-app-dados.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDelete = async () => {
    setDeleting(true)
    await resetConcursos()
    setDeleting(false)
    setConfirmingDelete(false)
  }

  return (
    <div className="max-w-xl space-y-8">
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-foreground">Tema</h2>
        <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
          <div>
            <p className="text-sm text-foreground">Dark Mode</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              O app usa tema escuro fixo — tema claro ainda não implementado.
            </p>
          </div>
          <ToggleSwitch defaultChecked disabled />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-foreground">
          Gerenciamento de Dados
        </h2>
        <div className="space-y-3 rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-foreground">Exportar Meus Dados em JSON</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Baixa seus concursos cadastrados em um arquivo .json.</p>
            </div>
            <button
              onClick={handleExport}
              className="flex flex-shrink-0 items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/30"
            >
              <Download size={14} />
              Exportar
            </button>
          </div>

          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-danger">Apagar Todos os Dados</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Restaura os concursos para o padrão de fábrica.</p>
              </div>
              {!confirmingDelete ? (
                <button
                  onClick={() => setConfirmingDelete(true)}
                  className="flex flex-shrink-0 items-center gap-1.5 rounded-md border border-danger/30 bg-danger/10 px-3 py-1.5 text-xs font-medium text-danger transition-colors hover:bg-danger/20"
                >
                  <Trash2 size={14} />
                  Apagar
                </button>
              ) : (
                <div className="flex flex-shrink-0 items-center gap-2">
                  <button
                    onClick={() => setConfirmingDelete(false)}
                    className="rounded-md px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center gap-1.5 rounded-md bg-danger px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deleting && <Loader2 size={13} className="animate-spin" />}
                    Confirmar
                  </button>
                </div>
              )}
            </div>
            {confirmingDelete && (
              <p className="mt-2 text-xs text-danger">Tem certeza? Essa ação não pode ser desfeita.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
