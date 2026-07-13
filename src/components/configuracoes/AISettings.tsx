import { useEffect, useState } from 'react'
import { KeyRound, ExternalLink } from 'lucide-react'

const STORAGE_KEY = 'concursoapp_gemini_api_key'

export default function AISettings() {
  const [apiKey, setApiKey] = useState('')
  const [savedJustNow, setSavedJustNow] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setApiKey(stored)
  }, [])

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, apiKey.trim())
    setSavedJustNow(true)
    setTimeout(() => setSavedJustNow(false), 2500)
  }

  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">Integração com Gemini</h2>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <KeyRound size={15} className="text-primary" />
          <label className="text-sm font-medium text-foreground">Chave de API do Google Gemini</label>
        </div>

        <div className="mt-3 flex gap-2">
          <input
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/40"
          />
          <button
            onClick={handleSave}
            disabled={!apiKey.trim()}
            className="flex-shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Salvar Chave
          </button>
        </div>

        {savedJustNow && <p className="mt-2 text-xs text-success">Chave salva neste navegador.</p>}

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Sua chave é salva apenas neste navegador (localStorage) e será usada futuramente para as chamadas de
          correção de redação via API do Gemini. Você pode gerar uma chave gratuita no{' '}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-primary hover:underline"
          >
            Google AI Studio
            <ExternalLink size={11} />
          </a>
          .
        </p>
      </div>
    </div>
  )
}
