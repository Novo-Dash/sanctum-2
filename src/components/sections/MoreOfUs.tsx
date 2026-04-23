import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface MoreOfUsProps {
  onBookClick?: () => void
}

const col1Images = [
  { src: '/imagens/gallery/1.webp',   alt: 'Sanctum BJJ training 1' },
  { src: '/imagens/gallery/2.webp',   alt: 'Sanctum BJJ training 2' },
  { src: '/imagens/gallery/3.webp',   alt: 'Sanctum BJJ training 3' },
  { src: '/imagens/gallery/4.webp',   alt: 'Sanctum BJJ training 4' },
  { src: '/imagens/gallery/5.webp',   alt: 'Sanctum BJJ training 5' },
  { src: '/imagens/gallery/6.webp',   alt: 'Sanctum BJJ training 6' },
  { src: '/imagens/gallery/7.webp',   alt: 'Sanctum BJJ training 7' },
  { src: '/imagens/gallery/8.webp',   alt: 'Sanctum BJJ training 8' },
  { src: '/imagens/gallery/9.webp',   alt: 'Sanctum BJJ training 9' },
]

const col2Images = [
  { src: '/imagens/gallery/10.webp',  alt: 'Sanctum BJJ class 1' },
  { src: '/imagens/gallery/11.webp',  alt: 'Sanctum BJJ class 2' },
  { src: '/imagens/gallery/12.webp',  alt: 'Sanctum BJJ class 3' },
  { src: '/imagens/gallery/13.webp',  alt: 'Sanctum BJJ class 4' },
  { src: '/imagens/gallery/14.webp',  alt: 'Sanctum BJJ class 5' },
  { src: '/imagens/gallery/15.webp',  alt: 'Sanctum BJJ class 6' },
  { src: '/imagens/gallery/16.webp',  alt: 'Sanctum BJJ class 7' },
  { src: '/imagens/gallery/17.webp',  alt: 'Sanctum BJJ class 8' },
  { src: '/imagens/gallery/18.webp',  alt: 'Sanctum BJJ class 9' },
]

function ArrowIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

function CarouselColumn({ images, colRef, index }: { images: typeof col1Images; colRef: React.RefObject<HTMLDivElement | null>; index: number }) {
  const doubled = [...images, ...images]

  return (
    <div className="sanctum-carousel-container">
      <div ref={colRef} className={`sanctum-carousel-track sanctum-track-${index}`}>
        {doubled.map((img, i) => (
          <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
            <img
              className="sanctum-carousel-img"
              src={img.src}
              alt={img.alt}
              width={280}
              height={380}
              loading="lazy"
              decoding="async"
              style={{ objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function MoreOfUs({ onBookClick }: MoreOfUsProps) {
  const sectionRef  = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const ctaRef      = useRef<HTMLButtonElement>(null)
  const col1Ref     = useRef<HTMLDivElement>(null)
  const col2Ref     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const c1 = col1Ref.current
    const c2 = col2Ref.current
    if (!c1 || !c2) return

    // Desktop only: GSAP vertical scroll
    if (!window.matchMedia('(max-width: 767px)').matches) {
      const a1 = gsap.to(c1, { y: '-50%', duration: 18, ease: 'none', repeat: -1 })
      gsap.set(c2, { y: '-50%' })
      const a2 = gsap.to(c2, { y: '0%', duration: 24, ease: 'none', repeat: -1 })
      return () => { a1.kill(); a2.kill() }
    }
    // Mobile: handled by CSS animation
  }, [])

  useEffect(() => {
    const section  = sectionRef.current
    const headline = headlineRef.current
    const cta      = ctaRef.current
    if (!section || !headline || !cta) return

    gsap.set(headline, { x: -60, opacity: 0 })
    gsap.set(cta, { opacity: 0 })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        gsap.timeline()
          .to(headline, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
          .to(cta, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.4')
      },
      { threshold: 0.15 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const handleMouseEnter = () => gsap.globalTimeline.timeScale(0.3)
  const handleMouseLeave = () => gsap.globalTimeline.timeScale(1)

  return (
    <>
      <style>{`
        .sanctum-gallery-inner {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          align-items: flex-start;
          min-height: 0;
        }
        @media (min-width: 768px) {
          .sanctum-gallery-inner {
            flex-direction: row;
            align-items: center;
            gap: 4rem;
            min-height: 720px;
          }
        }
        .sanctum-gallery-left {
          width: 100%;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (min-width: 768px) {
          .sanctum-gallery-left {
            width: 40%;
          }
        }
        /* Mobile: rows of horizontal images */
        .sanctum-gallery-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow: hidden;
          height: auto;
          padding: 0;
        }
        .sanctum-carousel-container {
          overflow: hidden;
          width: 100%;
          position: relative;
        }
        .sanctum-carousel-track {
          display: flex;
          flex-direction: row;
          gap: 8px;
          width: max-content;
          will-change: transform;
        }
        .sanctum-carousel-img {
          object-fit: cover;
          display: block;
          width: 220px;
          height: 150px;
          border-radius: 12px;
          flex-shrink: 0;
        }
        /* Desktop: columns of vertical images */
        @media (min-width: 768px) {
          .sanctum-gallery-right {
            flex-direction: row;
            gap: 1rem;
            height: 520px;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%);
            mask-image: linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%);
          }
          .sanctum-carousel-container {
            flex: 1;
            height: 100%;
          }
          .sanctum-carousel-track {
            flex-direction: column;
            width: 100%;
          }
          .sanctum-carousel-img {
            width: 100%;
            height: 300px;
            flex-shrink: unset;
          }
        }
        @media (min-width: 1024px) {
          .sanctum-gallery-right {
            gap: 3rem;
            height: 720px;
          }
          .sanctum-carousel-img {
            height: 380px;
          }
        }
        .sanctum-section-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--color-accent);
          margin-bottom: 1rem;
        }
        .sanctum-section-label::before,
        .sanctum-section-label::after {
          content: '';
          display: block;
          height: 1px;
          width: 2.5rem;
          background-color: var(--color-accent);
        }
        .sanctum-gallery-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          width: fit-content;
          margin-top: 2rem;
          background-color: var(--color-accent);
          color: #ffffff;
          font-family: var(--font-body);
          font-weight: 600;
          padding: 14px 32px;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 13px;
          border: none;
          cursor: pointer;
          transition: background-color 200ms ease-out;
        }
        .sanctum-gallery-btn:hover {
          background-color: var(--color-accent-hover);
        }
        @media (max-width: 767px) {
          @keyframes gallery-scroll-left {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes gallery-scroll-right {
            from { transform: translateX(-50%); }
            to   { transform: translateX(0%); }
          }
          .sanctum-track-1 {
            animation: gallery-scroll-left 18s linear infinite;
          }
          .sanctum-track-2 {
            animation: gallery-scroll-right 24s linear infinite;
          }
        }
      `}</style>

      <section
        id="more-of-us"
        ref={sectionRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ backgroundColor: '#ffffff', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 80px' }}>
          <div className="sanctum-gallery-inner">

            {/* Left: text + CTA */}
            <div className="sanctum-gallery-left">
              <p className="sanctum-section-label">Gallery</p>
              <h2
                ref={headlineRef}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  textTransform: 'uppercase',
                  color: 'var(--color-text)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                  margin: '0.75rem 0 0',
                  fontWeight: 800,
                }}
              >
                WELCOME TO<br />SANCTUM
              </h2>
              <button
                ref={ctaRef}
                onClick={onBookClick}
                className="sanctum-gallery-btn"
              >
                BOOK YOUR FREE TRIAL CLASS
                <ArrowIcon />
              </button>
            </div>

            {/* Right: infinite vertical carousel */}
            <div className="sanctum-gallery-right">
              <CarouselColumn images={col1Images} colRef={col1Ref} index={1} />
              <CarouselColumn images={col2Images} colRef={col2Ref} index={2} />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
