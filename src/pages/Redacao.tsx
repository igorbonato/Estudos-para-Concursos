import { useState } from 'react'
import { REDACAO_FEEDBACK_MOCK, type RedacaoFeedback } from '../data/redacaoMock'
import EssayEditor from '../components/redacao/EssayEditor'
import FeedbackPanel from '../components/redacao/FeedbackPanel'

export default function Redacao() {
  const [banca, setBanca] = useState('')
  const [cargo, setCargo] = useState('')
  const [tema, setTema] = useState('')
  const [texto, setTexto] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [feedback, setFeedback] = useState<RedacaoFeedback | null>(null)

  const handleAnalyze = () => {
    if (!texto.trim() || !banca || !tema.trim() || loading) return

    setFeedback(null)
    setLoading(true)
    setLoadingMessage(`Montando prompt para a banca ${banca}...`)

    setTimeout(() => {
      setLoadingMessage('Enviando para análise da IA...')
    }, 1500)

    setTimeout(() => {
      setFeedback(REDACAO_FEEDBACK_MOCK)
      setLoading(false)
    }, 3000)
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
        <FeedbackPanel feedback={feedback} loading={loading} loadingMessage={loadingMessage} banca={banca} />
      </aside>
    </div>
  )
}
