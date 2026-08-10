import { Star } from '@phosphor-icons/react'
import { ACADEMY, HERO } from '../data'
import { CtaButton } from './CtaButton'
import { Tag, Tape } from './ui'

/**
 * Two columns, locked: the parent's argument on the left, the doorway on the
 * right. Nothing crosses the gutter, and the whole thing closes inside the
 * first screen. The condensed display face is what makes a 12-word headline
 * fit its own half of the page.
 */
export function Hero() {
  return (
    <section className="bts-paper-grid relative overflow-hidden pt-24 pb-14 md:pt-28 lg:flex lg:min-h-[100dvh] lg:items-center lg:pt-24 lg:pb-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-accent/[0.06] blur-[90px]"
      />

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-14">
        {/* ── left: the argument ─────────────────────────────────────────── */}
        <div className="lg:max-w-[34rem]">
          <div data-bts-reveal="immediate">
            <Tag>Back to School</Tag>
          </div>

          <h1 className="bts-h1 mt-5 text-ink" data-bts-lines="immediate">
            This school year, give your child{' '}
            <span className="relative inline-block whitespace-nowrap">
              confidence
              {/* The ellipse has to be noticeably wider and taller than the word:
                  its curve pulls in at the ends, so a tight box would cross the
                  outer letters. */}
              {/* Below sm the word already fills the line, so there is no room
                  to draw around it without clipping at the viewport edge. */}
              <svg
                aria-hidden
                viewBox="0 0 532 102"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -inset-x-9 -inset-y-1 hidden h-[calc(100%+8px)] w-[calc(100%+72px)] text-accent sm:block"
              >
                <ellipse
                  cx="266"
                  cy="51"
                  rx="263"
                  ry="47"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  transform="rotate(-1.4 266 51)"
                />
              </svg>
            </span>{' '}
            that goes beyond the classroom.
          </h1>

          <p className="bts-lead mt-6 max-w-[40ch] text-body" data-bts-reveal="immediate">
            {HERO.body[0]}
            <span className="font-semibold text-accent">{HERO.body[1]}</span>
            {HERO.body[2]}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4" data-bts-reveal="immediate">
            <CtaButton label={HERO.cta} />
            <Tag variant="paper">First class free</Tag>
          </div>

          <div
            className="mt-7 inline-flex items-center gap-2.5 rounded-full border-[2.5px] border-ink bg-paper-raised px-4 py-2"
            data-bts-reveal="immediate"
          >
            <span className="flex items-center gap-0.5 text-accent" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={14} weight="fill" />
              ))}
            </span>
            <span className="flex items-center gap-2 font-display text-[0.9rem] uppercase tracking-wide text-ink">
              {ACADEMY.rating} on Google
              <span aria-hidden className="h-1 w-1 rounded-full bg-ink/45" />
              {ACADEMY.ratingCount} reviews
            </span>
          </div>
        </div>

        {/* ── right: the doorway ─────────────────────────────────────────── */}
        <div className="lg:justify-self-end" data-bts-reveal="immediate">
          <div className="relative mx-auto w-full max-w-[24rem] lg:mx-0 lg:max-w-[26rem]">
            {/* the sheet of paper behind, tilted the other way */}
            <div
              aria-hidden
              className="bts-arch bts-ink absolute inset-0 -rotate-[3deg] bg-paper-raised"
            />

            <div className="bts-arch bts-ink relative rotate-[1.4deg] bg-sand">
              <div className="aspect-[4/5] w-full">
                <img
                  src="/imagens/bts/hero-a.webp"
                  alt="Two young students training together in a Sanctum kids class"
                  width={1000}
                  height={1320}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <Tape className="left-1/2 -top-3 z-10 -translate-x-1/2" rotate={-3} />

            <Tag className="absolute left-1 top-8 z-10 -rotate-[6deg] sm:-left-6">
              Kids 4 to 12
            </Tag>

            {/* the small arch stepping in front */}
            <div className="bts-arch bts-ink absolute -bottom-8 -left-4 z-10 w-[38%] -rotate-[4deg] bg-sand sm:-left-8">
              <div className="aspect-[3/4] w-full">
                <img
                  src="/imagens/bts/hero-b.webp"
                  alt="Kids practising a technique on the mats at Sanctum"
                  width={760}
                  height={950}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="absolute -bottom-5 right-2 z-10 flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-paper-raised px-3.5 py-1.5 shadow-[3px_3px_0_var(--color-ink)]">
              <span className="flex items-center gap-0.5 text-accent" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={11} weight="fill" />
                ))}
              </span>
              <span className="font-display text-[0.78rem] uppercase tracking-wide text-ink">
                {ACADEMY.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
