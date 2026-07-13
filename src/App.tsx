import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConcursoProvider } from './context/ConcursoContext'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Cadernos from './pages/Cadernos'
import Flashcards from './pages/Flashcards'
import Redacao from './pages/Redacao'
import Configuracoes from './pages/Configuracoes'

export default function App() {
  return (
    <ConcursoProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="cadernos" element={<Cadernos />} />
            <Route path="flashcards" element={<Flashcards />} />
            <Route path="redacao" element={<Redacao />} />
            <Route path="configuracoes" element={<Configuracoes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConcursoProvider>
  )
}
