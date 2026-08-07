import { useRef, useState, type UIEvent } from 'react'

export function useScrollCollapse(threshold = 8, topOffset = 24) {
  const [collapsed, setCollapsed] = useState(false)
  const lastScrollTop = useRef(0)

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    const delta = scrollTop - lastScrollTop.current

    if (scrollTop < topOffset) {
      setCollapsed(false)
    } else if (delta > threshold) {
      setCollapsed(true)
    } else if (delta < -threshold) {
      setCollapsed(false)
    }

    lastScrollTop.current = scrollTop
  }

  return { collapsed, onScroll, expand: () => setCollapsed(false) }
}
