import { useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui'

gsap.registerPlugin(ScrollTrigger)

interface HowToStartProps {
  onBookClick: () => void
}

const STEPS = [
  {
    number: '01',
    title: 'Fill Out\nthe Form',
    desc: 'Click the button and fill out the form.',
    bg: '#ffffff',
    text: '#0A0A0A',
    muted: '#525252',
    border: '1px solid #E5E5E5',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Choose Your\nClass & Time',
    desc: 'Choose your class type and pick a date & time on the calendar.',
    bg: '#1B3A8F',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.65)',
    border: 'none',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
  {
    number: '03',
    title: "You're\nAll Set",
    desc: "You'll get email and SMS confirmations with all the details.",
    bg: '#0A0A0A',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.50)',
    border: 'none',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
]

export function HowToStart({ onBookClick }: HowToStartProps) {
  const handleOpen = useCallback(() => onBookClick(), [onBookClick])
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef   = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null)
    if (cards.length < 2) return

    gsap.set(cards, { y: () => window.innerHeight })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${cards.length * window.innerHeight * 0.55}`,
          scrub: 1.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      cards.forEach((card, i) => {
        tl.to(card, { y: 0, ease: 'power2.out', duration: 1 }, i)

        if (i > 0) {
          tl.to(
            cards.slice(0, i),
            {
              scale: (_: number, el: Element) => {
                const idx = cards.indexOf(el as HTMLDivElement)
                return 1 - (i - idx) * 0.025
              },
              ease: 'power2.out',
              duration: 1,
            },
            i,
          )
        }
      })
    }, section)

    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="how-to-start"
      aria-labelledby="how-heading"
      className="relative overflow-hidden bg-[var(--color-surface-alt)]"
      style={{ minHeight: '100svh' }}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-24">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            <span className="block h-px w-8 bg-[var(--color-text-muted)] opacity-50" aria-hidden="true" />
            How It Works
            <span className="block h-px w-8 bg-[var(--color-text-muted)] opacity-50" aria-hidden="true" />
          </p>
          <h2
            id="how-heading"
            className="uppercase text-[var(--color-text)]"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-1px',
            }}
          >
            How to Get<br />Started?
          </h2>
        </div>

        {/* Stack wrapper */}
        <div style={{ position: 'relative', borderRadius: 20 }}>
          {STEPS.map((step, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              style={{
                position:        i === 0 ? 'relative' : 'absolute',
                top:             i === 0 ? undefined : 0,
                left:            i === 0 ? undefined : 0,
                right:           i === 0 ? undefined : 0,
                background:      step.bg,
                borderRadius:    20,
                border:          step.border,
                boxShadow:       '0 12px 48px rgba(0,0,0,0.10)',
                zIndex:          i + 1,
                transformOrigin: 'top center',
                padding:         '36px 40px',
                display:         'flex',
                flexDirection:   'column',
                gap:             40,
              }}
            >
              {/* Top row: number + icon */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 13,
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: step.muted,
                  }}
                >
                  {step.number}
                </span>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: step.text === '#ffffff'
                      ? 'rgba(255,255,255,0.12)'
                      : 'rgba(27,58,143,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: step.text === '#ffffff' ? '#fff' : 'var(--color-accent)',
                  }}
                >
                  {step.icon}
                </div>
              </div>

              {/* Bottom: title + desc + CTA on last */}
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 42,
                    fontWeight: 700,
                    lineHeight: 1.0,
                    color: step.text,
                    marginBottom: 12,
                    letterSpacing: '-0.5px',
                    textTransform: 'uppercase',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ color: step.muted, fontSize: '0.9375rem', lineHeight: 1.7, maxWidth: 560, fontFamily: 'var(--font-body)' }}>
                  {step.desc}
                </p>

                {i === STEPS.length - 1 && (
                  <div style={{ marginTop: 32 }}>
                    <Button variant="white" size="lg" onClick={handleOpen} className="!text-xs !px-4 md:!text-sm md:!px-8 whitespace-nowrap">
                      Schedule Free Trial Class
                      <ArrowRight />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
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
