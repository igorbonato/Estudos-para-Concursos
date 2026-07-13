import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
  return (
    <div
      className="h-screen overflow-hidden bg-background"
      style={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        gridTemplateRows: '56px 1fr',
      }}
    >
      <div style={{ gridRow: '1 / 3', gridColumn: '1 / 2' }}>
        <Sidebar />
      </div>

      <div style={{ gridRow: '1 / 2', gridColumn: '2 / 3' }}>
        <Header />
      </div>

      <main className="overflow-y-auto bg-background" style={{ gridRow: '2 / 3', gridColumn: '2 / 3' }}>
        <Outlet />
      </main>
    </div>
  )
}
