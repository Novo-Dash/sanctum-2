import { useEffect } from 'react'
import { fbqTrack, ga4Event } from '@/booking/analytics'
import { BookingForm } from '@/booking/booking-form'
import { BrandPanel } from '@/booking/brand-panel'

/**
 * Standalone booking page — a direct destination for ads. No nav, no footer, no
 * links back. Renders the SAME <BookingForm /> as the modal, same two-column card.
 */
export function BookPage() {
  useEffect(() => {
    // No modal to open here, so the funnel starts on mount.
    fbqTrack('ViewContent', { content_name: 'Trial Booking' })
    ga4Event('view_content', { content_name: 'Trial Booking' })
  }, [])

  return (
    <main className="relative flex min-h-dvh flex-col items-center overflow-x-hidden bg-[var(--color-bg-subtle)] px-4 py-10 md:justify-center">
      {/* brand-tinted backdrop: blue glow under a radial mask */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[var(--color-accent)]/20 blur-[130px]" />
      </div>

      <div className="relative w-full max-w-[940px]">
        <div className="grid grid-cols-1 overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.5)] ring-1 ring-black/5 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
          <BrandPanel />
          <div className="min-h-0 px-6 py-7 md:px-8 md:py-9">
            <BookingForm />
          </div>
        </div>

        <p className="mt-5 flex items-center justify-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="absolute h-2 w-2 animate-ping rounded-full bg-[var(--color-accent)]/60" />
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          </span>
          Now enrolling · Miami, FL
        </p>
      </div>
    </main>
  )
}
