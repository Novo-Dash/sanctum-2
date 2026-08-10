import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useBooking } from './booking-provider'
import { BookingForm } from './booking-form'
import { BrandPanel } from './brand-panel'

/**
 * Modal shell only — the right column renders the SAME <BookingForm /> that
 * /book renders. Two columns keep it short enough not to scroll; on a short
 * viewport only the right column scrolls, never the whole modal.
 *
 * Mobile: the panel stacks into a flex column (compact brand header pinned +
 * the form area as `flex-1 min-h-0 overflow-y-auto`) so the action button is
 * always reachable by scrolling. Height caps on `dvh` (not `vh`) to account
 * for the mobile browser address bar.
 */
export function BookingModal() {
  const { isOpen, closeModal } = useBooking()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [isOpen, closeModal])

  if (typeof document === 'undefined' || !isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (!panelRef.current?.contains(e.target as Node)) closeModal()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Book your free trial class"
        className="relative flex max-h-[90dvh] w-full max-w-[940px] flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white text-[var(--color-text)] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] md:grid md:max-h-[90vh] md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]"
      >
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-[var(--color-text)] shadow-md transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <BrandPanel />

        {/* only this column scrolls — never the whole modal */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-7 md:px-8 md:py-9">
          <BookingForm onClose={closeModal} />
        </div>
      </div>
    </div>,
    document.body
  )
}
