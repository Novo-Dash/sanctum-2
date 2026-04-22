interface FinalCTAProps {
  onBookClick: () => void
}

export function FinalCTA({ onBookClick }: FinalCTAProps) {
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden py-24"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/video/video2-opt.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.70)', zIndex: 1 }} />
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 text-center" style={{ position: 'relative', zIndex: 2 }}>
        <img
          src="/logo-bjj.svg"
          alt="Sanctum BJJ"
          className="mx-auto mb-8"
          style={{ height: '72px', width: 'auto' }}
          loading="lazy"
          decoding="async"
        />

        <p className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
          <span className="block h-px w-8 bg-white opacity-30" aria-hidden="true" />
          Zero Risk
          <span className="block h-px w-8 bg-white opacity-30" aria-hidden="true" />
        </p>

        <h2
          id="final-cta-heading"
          className="text-fluid-section uppercase text-white mb-4"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
        >
          Your First Class is Free
        </h2>

        <p className="mb-10 text-fluid-sub text-white/50 max-w-lg mx-auto leading-relaxed">
          No experience needed. No contracts. Just show up and discover what
          Brazilian Jiu-Jitsu can do for you and your family.
        </p>

        <button
          type="button"
          onClick={onBookClick}
          className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[var(--color-accent)] px-8 text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_20px_rgba(var(--accent-rgb),0.40)] hover:bg-[var(--color-accent-hover)] hover:shadow-[0_6px_28px_rgba(var(--accent-rgb),0.55)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-text)]"
        >
          Claim Your Free Class
          <ArrowRight />
        </button>

        <p className="mt-6 text-sm text-white/25">
          Join 116+ members training in Miami
        </p>
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
