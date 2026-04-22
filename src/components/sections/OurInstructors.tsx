import { Section, Button } from '@/components/ui'

interface OurInstructorsProps {
  onBookClick: () => void
}

export function OurInstructors({ onBookClick }: OurInstructorsProps) {
  return (
    <Section id="our-instructors" aria-labelledby="instructors-heading">
      <div className="grid items-center gap-14 md:grid-cols-2">
        {/* Photo */}
        <div>
          <picture>
            <source srcSet="/professor.webp" type="image/webp" />
            <img
              src="/professor.png"
              alt="Prof. Roosevelt Souza, Black Belt and World Champion Head Coach at Sanctum BJJ Miami"
              className="w-full rounded-[var(--radius-lg)]"
              style={{ aspectRatio: '4/5', objectFit: 'cover', display: 'block' }}
              width={600}
              height={750}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Our Instructors
            </p>
            <h2
              id="instructors-heading"
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 3.5vw + 0.5rem, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              <span style={{ color: 'var(--color-accent)', display: 'block' }}>ROOSEVELT SOUZA</span>
              <span style={{ color: 'var(--color-text)', display: 'block' }}>our World Champion</span>
              <span style={{ color: 'var(--color-text)', display: 'block' }}>head coach</span>
            </h2>
          </div>

          <p className="text-fluid-body text-[var(--color-text-secondary)] leading-relaxed">
            Roosevelt Sousa is one of the leading names in today's heavyweight Jiu-Jitsu scene. An international athlete with titles from IBJJF, ADCC, and AJP, he built his career through discipline and perseverance. Before competing on the world stage, he sold water on the streets to fund his tournaments and overcame financial challenges to become a world champion. Today, beyond being an elite athlete, he's the Head Coach of Sanctum BJJ, known for being a present professor who inspires students of all levels both on and off the mat.
          </p>

          <div>
            <Button onClick={onBookClick} size="md">
              Train With Prof. Roosevelt
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </Section>
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
