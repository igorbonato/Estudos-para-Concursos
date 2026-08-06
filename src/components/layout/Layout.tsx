import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const SIDEBAR_COLLAPSED_KEY = 'sidebar-collapsed'

export default function Layout() {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === '1')

  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, collapsed ? '1' : '0')
  }, [collapsed])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div
        className="flex-shrink-0 overflow-hidden transition-[width] duration-200 ease-in-out"
        style={{ width: collapsed ? 64 : 240 }}
      >
        <Sidebar collapsed={collapsed} onToggleCollapsed={() => setCollapsed(c => !c)} />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
