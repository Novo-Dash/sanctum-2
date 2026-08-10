import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fbqTrack, ga4Event } from './analytics'

interface BookingContextValue {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>')
  return ctx
}

/** Anchor CTAs that should open the booking flow (belt & suspenders — the
 *  section buttons are wired through useBooking().openModal directly). */
const CTA_SELECTOR = 'a[href="#book"], a[href="#schedule"], a[href="#schedule-trial"]'

/**
 * Owns the modal open/close state. Every CTA on the page opens the same flow;
 * ViewContent/view_content fire on open (§7.3 / §7-bis.3).
 */
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => {
    setIsOpen(true)
    fbqTrack('ViewContent', { content_name: 'Trial Booking' })
    ga4Event('view_content', { content_name: 'Trial Booking' })
  }, [])

  const closeModal = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const target = e.target as Element | null
      const anchor = target?.closest?.(CTA_SELECTOR)
      if (!anchor) return
      e.preventDefault()
      openModal()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [openModal])

  const value = useMemo(() => ({ isOpen, openModal, closeModal }), [isOpen, openModal, closeModal])

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}
