import { useEffect, useState } from 'react'

interface StickyCTABarProps {
  onBookClick: () => void
}

export function StickyCTABar({ onBookClick }: StickyCTABarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] bg-white/95 backdrop-blur-sm px-4 pt-3 safe-area-bottom"
      role="complementary"
      aria-label="Quick booking bar"
    >
      <button
        type="button"
        onClick={onBookClick}
        className="flex w-full h-[52px] items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] text-xs font-bold uppercase tracking-wide text-white shadow-[0_4px_20px_rgba(var(--accent-rgb),0.35)] hover:bg-[var(--color-accent-hover)] active:scale-[0.97] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 mb-3"
      >
        Free Class
        <ArrowRight />
      </button>
    </div>
  )
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3.75 9H14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 3.75L14.25 9 9 14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
