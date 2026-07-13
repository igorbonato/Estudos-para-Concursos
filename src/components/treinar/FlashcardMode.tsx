import { useEffect, useState } from 'react'
import { X, Check } from 'lucide-react'
import type { StudyCard } from '../../data/treinarMock'

type Props = {
  card: StudyCard
  onAnswer: (correct: boolean) => void
}

export default function FlashcardMode({ card, onAnswer }: Props) {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        setFlipped(f => !f)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const answer = (correct: boolean) => {
    if (!flipped) return
    onAnswer(correct)
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <div
        className="flip-card w-full cursor-pointer"
        style={{ maxWidth: '560px', height: '280px' }}
        onClick={() => setFlipped(f => !f)}
      >
        <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
          <div className="flip-card-front flex flex-col justify-between rounded-xl border border-border bg-card p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">Termo</span>
            <p className="text-center text-xl leading-relaxed text-foreground">{card.termo}</p>
            <span className="text-center text-xs text-muted-foreground">
              Pressione espaço ou clique no cartão para virá-lo
            </span>
          </div>
          <div className="flip-card-back flex flex-col justify-between rounded-xl border border-primary/30 bg-primary/[0.06] p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Definição</span>
            <p className="text-center text-sm leading-relaxed text-foreground">{card.definicao}</p>
            <span className="text-center text-xs text-muted-foreground">Como foi sua performance?</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => answer(false)}
          disabled={!flipped}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-danger/30 bg-danger/10 text-danger transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        >
          <X size={20} />
        </button>
        <button
          onClick={() => answer(true)}
          disabled={!flipped}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-success/30 bg-success/10 text-success transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Check size={20} />
        </button>
      </div>

      {!flipped && (
        <p className="text-xs text-muted-foreground">Vire o card para habilitar os botões de erro/acerto</p>
      )}
    </div>
  )
}
