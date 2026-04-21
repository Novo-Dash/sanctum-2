import { useEffect } from 'react'

const DEPTHS = [25, 50, 75, 90]
const fired = new Set<number>()

export function useScrollDepth() {
  useEffect(() => {
    function handleScroll() {
      const scrolled =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

      for (const depth of DEPTHS) {
        if (scrolled >= depth && !fired.has(depth)) {
          fired.add(depth)
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'scroll_depth', { depth_percentage: depth })
          }
          if (typeof window.fbq === 'function') {
            window.fbq('trackCustom', 'ScrollDepth', { depth })
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}
