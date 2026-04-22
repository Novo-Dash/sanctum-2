import { useCallback } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import {
  Hero,
  OurClasses,
  Testimonials,
  HowToStart,
  OurSchedule,
  OurInstructors,
  MoreOfUs,
  FAQ,
  FinalCTA,
  StickyCTABar,
} from '@/components/sections'
import { BookingModal } from '@/components/sections/BookingModal'
import UxModeWrapper from '@/components/UxModeWrapper'
import { useModal } from '@/hooks/useModal'
import { useScrollDepth } from '@/hooks/useScrollDepth'
import type { ModalTag } from '@/hooks/useModal'
import type { UxTokens } from '@/components/UxModeWrapper'

const SANCTUM_TOKENS: UxTokens = {
  maxWidth: '1440px',
  contentWidth: '1280px',
  gutter: '80px (px-20 desktop) / 24px (px-6 mobile)',
  sectionPy: '96px desktop / 64px mobile',
  h1: 'Strait 800 · 56px / 40px mobile',
  h2: 'Inter 700 · 40px / 32px mobile',
  h3: 'Inter 600 · 24px / 20px mobile',
  body: 'Inter 400 · 16px',
  label: 'Inter 600 · 12px uppercase',
  colors: [
    { hex: '#1B3A8F', label: 'accent (blue)' },
    { hex: '#2B4FD4', label: 'accent-hover' },
    { hex: '#0F1117', label: 'text' },
    { hex: '#6B7280', label: 'text-muted' },
    { hex: '#F7F8FA', label: 'bg-subtle' },
    { hex: '#E5E7EB', label: 'border' },
    { hex: '#DC2626', label: 'danger' },
  ],
  extras: [
    { key: 'radius-md', value: '16px' },
    { key: 'radius-lg', value: '24px' },
    { key: 'shadow-md', value: '0 4px 16px rgba(0,0,0,.08)' },
    { key: 'touch-min', value: '44×44px' },
    { key: 'font-display', value: 'Strait (Google Fonts)' },
  ],
}

function LandingPage() {
  const { isOpen, defaultTag, open, close } = useModal()
  useScrollDepth()

  const handleBookClick = useCallback(
    (tag?: ModalTag) => {
      open(tag ?? null)
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout')
      }
    },
    [open]
  )

  const handleOpenWithTag = useCallback(
    (tag: ModalTag) => {
      handleBookClick(tag)
    },
    [handleBookClick]
  )

  return (
    <div className="grain">
      <Navbar onBookClick={() => handleBookClick()} />

      <main>
        <Hero onBookClick={() => handleBookClick()} />
        <OurClasses onBookClick={handleOpenWithTag} />
        <Testimonials />
        <HowToStart onBookClick={() => handleBookClick()} />
        <OurSchedule />
        <OurInstructors onBookClick={() => handleBookClick()} />
        <MoreOfUs onBookClick={() => handleBookClick()} />
        <FAQ />
        <FinalCTA onBookClick={() => handleBookClick()} />
      </main>

      <Footer />

      <BookingModal isOpen={isOpen} defaultTag={defaultTag} onClose={close} />
      <StickyCTABar onBookClick={() => handleBookClick()} />
    </div>
  )
}

export default function App() {
  const path = window.location.pathname

  if (path === '/ux') {
    return (
      <UxModeWrapper tokens={SANCTUM_TOKENS} cleanPath="/" primaryColor="#1B3A8F">
        <LandingPage />
      </UxModeWrapper>
    )
  }

  return <LandingPage />
}
