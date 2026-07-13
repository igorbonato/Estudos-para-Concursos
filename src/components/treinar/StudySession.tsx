import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import type { StudySet } from '../../types/treinar'
import FlashcardMode from './FlashcardMode'
import MultipleChoiceMode from './MultipleChoiceMode'

type Mode = 'cartoes' | 'multipla'

type Props = {
  set: StudySet
  onExit: () => void
}

export default function StudySession({ set, onExit }: Props) {
  const [mode, setMode] = useState<Mode>('cartoes')
  const [index, setIndex] = useState(0)
  const [scoreOk, setScoreOk] = useState(0)
  const [scoreFail, setScoreFail] = useState(0)

  const total = set.cards.length
  const finished = index >= total
  const current = set.cards[index]

  const handleAnswer = (correct: boolean) => {
    if (correct) setScoreOk(s => s + 1)
    else setScoreFail(s => s + 1)
    setIndex(i => i + 1)
  }

  const restart = () => {
    setIndex(0)
    setScoreOk(0)
    setScoreFail(0)
  }

  const switchMode = (m: Mode) => {
    setMode(m)
    restart()
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={15} />
          Escolher outra lista
        </button>

        <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
          <button
            onClick={() => switchMode('cartoes')}
            className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
              mode === 'cartoes' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Cartões
          </button>
          <button
            onClick={() => switchMode('multipla')}
            className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
              mode === 'multipla' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Múltipla Escolha
          </button>
        </div>
      </div>

      <div className="pt-4 text-center">
        <span className="font-mono text-sm text-foreground">
          {Math.min(index + 1, total)} de {total}
        </span>
        <span className="ml-2 text-sm text-muted-foreground">{set.nome}</span>
      </div>

      {mode === 'cartoes' && !finished && (
        <div className="flex items-center justify-between px-2 pt-2 text-xs">
          <span className="rounded-full border border-warning/30 bg-warning/10 px-2.5 py-1 font-medium text-warning">
            {scoreFail} Ainda aprendendo
          </span>
          <span className="rounded-full border border-success/30 bg-success/10 px-2.5 py-1 font-medium text-success">
            Sei {scoreOk}
          </span>
        </div>
      )}

      {finished ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
          <h2 className="text-lg font-semibold text-foreground">Sessão concluída!</h2>
          <p className="text-sm text-muted-foreground">
            {mode === 'cartoes'
              ? `Sei: ${scoreOk} · Ainda aprendendo: ${scoreFail}`
              : `Acertos: ${scoreOk} de ${total}`}
          </p>
          <div className="flex gap-3">
            <button
              onClick={restart}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Praticar de novo
            </button>
            <button
              onClick={onExit}
              className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Escolher outra lista
            </button>
          </div>
        </div>
      ) : mode === 'cartoes' ? (
        <FlashcardMode key={current.id} card={current} onAnswer={handleAnswer} />
      ) : (
        <MultipleChoiceMode key={current.id} card={current} allCards={set.cards} onAnswer={handleAnswer} />
      )}
    </div>
  )
}
