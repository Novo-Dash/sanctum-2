import { useCallback, useEffect, useRef, useState } from 'react'
import type { ModalTag } from '@/hooks/useModal'

interface OurClassesProps {
  onBookClick: (tag: ModalTag) => void
}

const PROGRAMS = [
  {
    id: 'kids-bjj',
    title: 'Kids',
    tag: 'kids' as ModalTag,
    bg: 'linear-gradient(160deg, #0F1A2E 0%, #0a0a0a 100%)',
    accent: '#1B3A8F',
    image: '/imagem/foto 3.png',
  },
  {
    id: 'adult-beginners',
    title: 'Adult\nBeginners',
    tag: 'adults' as ModalTag,
    bg: 'linear-gradient(160deg, #141414 0%, #0a0a0a 100%)',
    accent: '#1B3A8F',
    image: '/imagem/foto 4.png',
  },
  {
    id: 'adult-advanced',
    title: 'Adult\nAdvanced',
    tag: 'adults' as ModalTag,
    bg: 'linear-gradient(160deg, #0D1E45 0%, #0a0a0a 100%)',
    accent: '#2B4FD4',
    image: '/imagem/foto 5.png',
  },
  {
    id: 'self-defense',
    title: 'Self\nDefense',
    tag: 'both' as ModalTag,
    bg: 'linear-gradient(160deg, #0F0F0F 0%, #080808 100%)',
    accent: '#1B3A8F',
    image: '/imagem/foto 6.png',
  },
]

const GAP = 20 // px

export function OurClasses({ onBookClick }: OurClassesProps) {
  const handleBook = useCallback(
    (tag: ModalTag) => () => onBookClick(tag),
    [onBookClick]
  )

  const [page, setPage] = useState(0)
  const [vpWidth, setVpWidth] = useState(0)
  const viewportRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)

  const isMobile = vpWidth > 0 && vpWidth < 768
  const cardsPerPage = isMobile ? 1 : 2
  const totalPages = Math.ceil(PROGRAMS.length / cardsPerPage)
  const cardWidth = isMobile ? vpWidth : (vpWidth - GAP) / 2

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    setVpWidth(el.offsetWidth)
    const ro = new ResizeObserver(([entry]) => {
      setVpWidth(entry.contentRect.width)
      setPage(0)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const goTo = useCallback((p: number) => {
    setPage(Math.max(0, Math.min(totalPages - 1, p)))
  }, [totalPages])

  const getOffset = (p: number) => p * (cardWidth + GAP)

  return (
    <section id="our-classes" aria-labelledby="classes-heading" className="py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">

        {/* Header + arrows */}
        <div className="flex items-end justify-between mb-10">
          <h2
            id="classes-heading"
            className="uppercase text-[var(--color-text)]"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 3.5vw + 0.5rem, 4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Our Classes
          </h2>

          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] transition-all duration-200 hover:bg-[var(--color-text)] hover:text-white hover:border-[var(--color-text)] disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages - 1}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] transition-all duration-200 hover:bg-[var(--color-text)] hover:text-white hover:border-[var(--color-text)] disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Viewport — clips the sliding track */}
        <div
          ref={viewportRef}
          className="overflow-hidden"
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            const diff = touchStartX.current - e.changedTouches[0].clientX
            if (Math.abs(diff) > 50) goTo(diff > 0 ? page + 1 : page - 1)
          }}
        >
          {/* Sliding track */}
          <div
            className="flex"
            style={{
              gap: GAP,
              transform: `translateX(-${getOffset(page)}px)`,
              transition: 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform',
            }}
          >
            {PROGRAMS.map((prog) => (
              <button
                key={prog.id}
                type="button"
                onClick={handleBook(prog.tag)}
                className="group/card relative shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-2xl text-left"
                style={{
                  width: cardWidth > 0 ? cardWidth : `calc(50% - ${GAP / 2}px)`,
                  aspectRatio: '3/4',
                }}
                aria-label={`Book ${prog.title.replace('\n', ' ')} class`}
              >
                {/* Background */}
                <div className="absolute inset-0" style={{ background: prog.bg }} aria-hidden="true" />

                {/* Photo */}
                {prog.image && (
                  <img
                    src={prog.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                )}

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 opacity-90 transition-opacity duration-500 group-hover/card:opacity-100"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)' }}
                  aria-hidden="true"
                />

                {/* Accent glow */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-20"
                  style={{ background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${prog.accent}, transparent)` }}
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end gap-5 p-8 md:p-10">
                  <h3
                    className="uppercase text-white leading-none"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                      letterSpacing: '-0.5px',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {prog.title}
                  </h3>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/55 border-b border-white/25 pb-1 transition-colors duration-300 group-hover/card:border-[var(--color-accent)] group-hover/card:text-white/90">
                      Start Journey
                    </span>
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full -rotate-45 transition-transform duration-300 group-hover/card:rotate-0"
                      style={{ background: 'var(--color-accent)' }}
                      aria-hidden="true"
                    >
                      <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === page ? 24 : 8,
                background: i === page ? 'var(--color-text)' : 'var(--color-border)',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
