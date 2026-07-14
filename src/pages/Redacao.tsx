import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { analisarRedacao, GeminiKeyMissingError } from '../lib/gemini'
import type { RedacaoFeedback } from '../types/redacao'
import { useConcurso } from '../context/ConcursoContext'
import EssayEditor from '../components/redacao/EssayEditor'
import FeedbackPanel from '../components/redacao/FeedbackPanel'

export default function Redacao() {
  const { selectedConcurso } = useConcurso()

  const [banca, setBanca] = useState('')
  const [cargo, setCargo] = useState('')
  const [tema, setTema] = useState('')
  const [texto, setTexto] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [feedback, setFeedback] = useState<RedacaoFeedback | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!texto.trim() || !banca || !tema.trim() || loading) return

    if (!selectedConcurso) {
      setError('Selecione um "Concurso Atual" no cabeçalho antes de analisar sua redação.')
      setFeedback(null)
      return
    }

    setError(null)
    setFeedback(null)
    setLoading(true)
    setLoadingMessage(`Montando prompt para a banca ${banca}...`)

    try {
      setLoadingMessage('Enviando para análise da IA...')
      const result = await analisarRedacao({ banca, cargo, tema, texto })

      setLoadingMessage('Salvando resultado...')
      const { error: insertError } = await supabase.from('redacoes').insert({
        concurso_id: selectedConcurso.id,
        tema,
        banca,
        cargo,
        texto_original: texto,
        nota_ia: result.notaFinal,
        feedback_estruturado_ia: result,
      })
      if (insertError) throw new Error(insertError.message)

      setFeedback(result)
    } catch (e) {
      setError(e instanceof GeminiKeyMissingError ? e.message : e instanceof Error ? e.message : 'Erro ao analisar a redação.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full">
      <EssayEditor
        banca={banca}
        setBanca={setBanca}
        cargo={cargo}
        setCargo={setCargo}
        tema={tema}
        setTema={setTema}
        texto={texto}
        setTexto={setTexto}
        loading={loading}
        onAnalyze={handleAnalyze}
      />

      <aside className="w-[380px] flex-shrink-0 overflow-y-auto border-l border-border bg-card">
        <FeedbackPanel
          feedback={feedback}
          loading={loading}
          loadingMessage={loadingMessage}
          error={error}
          banca={banca}
        />
      </aside>
    </div>
  )
}
