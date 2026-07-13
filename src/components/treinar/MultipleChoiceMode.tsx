import { useMemo, useState } from 'react'
import type { StudyCard } from '../../data/treinarMock'

type Props = {
  card: StudyCard
  allCards: StudyCard[]
  onAnswer: (correct: boolean) => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function MultipleChoiceMode({ card, allCards, onAnswer }: Props) {
  const [chosenId, setChosenId] = useState<string | null>(null)
  const [dontKnow, setDontKnow] = useState(false)
  const answered = chosenId !== null || dontKnow

  const options = useMemo(() => {
    const distractors = shuffle(allCards.filter(c => c.id !== card.id)).slice(0, 3)
    return shuffle([card, ...distractors])
  }, [card, allCards])

  const handleSelect = (optionId: string) => {
    if (answered) return
    setChosenId(optionId)
    setTimeout(() => onAnswer(optionId === card.id), 700)
  }

  const handleDontKnow = () => {
    if (answered) return
    setDontKnow(true)
    setTimeout(() => onAnswer(false), 700)
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 p-8">
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs font-semibold text-muted-foreground">Termo</p>
        <p className="mt-2 text-2xl font-semibold text-foreground">{card.termo}</p>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground">Selecione a definição correta</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {options.map(opt => {
            const isCorrect = opt.id === card.id
            const isChosen = opt.id === chosenId
            let stateClasses = 'border-border bg-card hover:border-primary/30'
            if (answered) {
              if (isCorrect) stateClasses = 'border-success/40 bg-success/10 text-success'
              else if (isChosen) stateClasses = 'border-danger/40 bg-danger/10 text-danger'
              else stateClasses = 'border-border bg-card opacity-50'
            }
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                disabled={answered}
                className={`rounded-lg border p-4 text-left text-sm text-foreground transition-colors ${stateClasses}`}
              >
                {opt.definicao}
              </button>
            )
          })}
        </div>
      </div>

      <button
        onClick={handleDontKnow}
        disabled={answered}
        className="text-center text-sm text-primary transition-opacity hover:opacity-80 disabled:opacity-40"
      >
        Não sabe a resposta?
      </button>
    </div>
  )
}
