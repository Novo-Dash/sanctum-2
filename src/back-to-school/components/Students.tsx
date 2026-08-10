import { Star } from '@phosphor-icons/react'
import { CTA_BTS, REVIEWS, STUDENTS } from '../data'
import { CtaButton } from './CtaButton'
import { Tag } from './ui'

/**
 * Breadth without a marquee: a rail the visitor drags. Nothing loops on its
 * own, so the section stays still while it is being read.
 */
export function Students() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div data-bts-reveal>
          <Tag>Google reviews</Tag>
        </div>
        <h2 className="bts-h2 mt-5 max-w-[22ch] text-ink" data-bts-lines>
          {STUDENTS.headline}
        </h2>
      </div>

      <div
        className="bts-rail mt-12 flex snap-x gap-6 overflow-x-auto px-5 pb-6 pt-2 md:px-10"
        data-bts-reveal
      >
        {/* keeps the first card aligned with the headline on wide screens */}
        <div aria-hidden className="hidden shrink-0 xl:block xl:w-[max(0px,calc((100vw-1280px)/2))]" />

        {REVIEWS.map((review, i) => (
          <figure
            key={review.id}
            className={`bts-ink bts-pop flex w-[19rem] shrink-0 flex-col rounded-[var(--radius-card)] bg-paper-raised p-6 sm:w-[22rem] ${
              i % 2 === 0 ? 'rotate-[0.6deg]' : '-rotate-[0.7deg]'
            }`}
          >
            <div className="flex items-center gap-0.5 text-accent" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }, (_, s) => (
                <Star key={s} size={16} weight="fill" aria-hidden />
              ))}
            </div>

            <blockquote className="mt-4 flex-1 text-[0.98rem] leading-[1.62] text-body">
              {review.text}
            </blockquote>

            <figcaption className="mt-6 flex items-center gap-3 border-t-2 border-sand pt-4">
              <span
                aria-hidden
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-accent-wash font-display text-[1rem] text-accent"
              >
                {review.name.charAt(0)}
              </span>
              <span>
                <span className="block font-display text-[0.95rem] uppercase tracking-wide text-ink">
                  {review.name}
                </span>
                <span className="block text-[0.78rem] text-body/80">Google review</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="mt-8" data-bts-reveal>
          <CtaButton label={CTA_BTS} />
        </div>
      </div>
    </section>
  )
}
