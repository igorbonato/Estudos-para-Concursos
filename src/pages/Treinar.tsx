import { useState } from 'react'
import { STUDY_SETS_MOCK, type StudySet } from '../data/treinarMock'
import CreateSetList from '../components/treinar/CreateSetList'
import StudySetList from '../components/treinar/StudySetList'
import StudySession from '../components/treinar/StudySession'

type Aba = 'criar' | 'praticar'

export default function Treinar() {
  const [sets, setSets] = useState<StudySet[]>(STUDY_SETS_MOCK)
  const [aba, setAba] = useState<Aba>('praticar')
  const [setSelecionado, setSetSelecionado] = useState<StudySet | null>(null)

  const handleCreate = (novoSet: StudySet) => {
    setSets(prev => [...prev, novoSet])
    setAba('praticar')
  }

  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-6 flex items-center gap-1 rounded-md border border-border p-1" style={{ width: 'fit-content' }}>
        <button
          onClick={() => setAba('criar')}
          className={`rounded px-4 py-1.5 text-sm font-medium transition-colors ${
            aba === 'criar' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Criar Nova Lista
        </button>
        <button
          onClick={() => {
            setAba('praticar')
            setSetSelecionado(null)
          }}
          className={`rounded px-4 py-1.5 text-sm font-medium transition-colors ${
            aba === 'praticar' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Praticar
        </button>
      </div>

      {aba === 'criar' && <CreateSetList onCreate={handleCreate} />}

      {aba === 'praticar' &&
        (setSelecionado ? (
          <StudySession set={setSelecionado} onExit={() => setSetSelecionado(null)} />
        ) : (
          <StudySetList sets={sets} onSelect={setSetSelecionado} />
        ))}
    </div>
  )
}
