import type { Testimonial } from '@/types'
import { testimonials } from '@/data/testimonials'
import { SectionHeader } from '@/components/ui'

// Duplicate for seamless infinite loop
const ITEMS = [...testimonials, ...testimonials]

export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="py-24 bg-[var(--color-surface-alt)] overflow-hidden">

      {/* Header */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 testimonials-header">
        <SectionHeader
          id="testimonials-heading"
          label="Testimonials"
          title="What People Say About Us"
          center
        />
      </div>

      {/* Carousel — full bleed */}
      <div className="relative">
        {/* Edge fades */}
        <div
          className="pointer-events-none absolute left-0 inset-y-0 w-32 z-10"
          style={{ background: 'linear-gradient(to right, var(--color-surface-alt) 0%, transparent 100%)' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 inset-y-0 w-32 z-10"
          style={{ background: 'linear-gradient(to left, var(--color-surface-alt) 0%, transparent 100%)' }}
          aria-hidden="true"
        />

        {/* Scrolling track */}
        <div
          className="reviews-track flex gap-5"
          style={{ width: 'max-content', padding: '8px 0 12px', animation: 'reviews-scroll 50s linear infinite' }}
          aria-hidden="true"
        >
          {ITEMS.map((t, i) => (
            <ReviewCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes reviews-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .reviews-track:hover {
          animation-play-state: paused;
        }
        @media (max-width: 767px) {
          .testimonials-header h2 {
            font-size: clamp(1rem, 5.5vw, 2rem);
            white-space: nowrap;
          }
        }
      `}</style>
    </section>
  )
}

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <article
      className="flex flex-col gap-3 rounded-xl bg-white p-5 shrink-0"
      style={{
        width: 312,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
        border: '1px solid #e8eaed',
      }}
    >
      {/* Header row */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white text-sm font-medium select-none"
          style={{ background: t.avatarColor, fontFamily: 'Google Sans, Roboto, sans-serif' }}
          aria-hidden="true"
        >
          {t.initial}
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="truncate text-[#202124] text-sm font-medium"
            style={{ fontFamily: 'Google Sans, Roboto, sans-serif' }}
          >
            {t.name}
          </p>
          <p
            className="text-[#70757a]"
            style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11 }}
          >
            Local Guide
          </p>
        </div>

        <GoogleLogoIcon size={18} />
      </div>

      {/* Stars + date */}
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} size={14} />
          ))}
        </div>
        <span
          className="text-[#70757a]"
          style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12 }}
        >
          {t.timeAgo}
        </span>
      </div>

      {/* Text */}
      <p
        className="text-[#3c4043] leading-relaxed"
        style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13, lineHeight: 1.6 }}
      >
        {t.text}
      </p>
    </article>
  )
}

function StarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z"
        fill="#FBBC04"
      />
    </svg>
  )
}

function GoogleLogoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}
