import { Star } from '@phosphor-icons/react'
import { ACADEMY, HERO } from '../data'
import { CtaButton } from './CtaButton'

/**
 * Editorial hero: the promise runs wide across the top, then the page splits
 * into the parent's reasons on the left and the doorway on the right. Two
 * arched frames, the small one stepping in front of the tall one, so the
 * composition reads as an entrance rather than a photo block.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-32 lg:min-h-[100dvh] lg:pt-[7.5rem] lg:pb-20">
      {/* the sanctuary light: one soft wash behind the arches, no mesh gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-accent/[0.07] blur-[90px]"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-10">
        <h1 className="bts-h1 text-ink" data-bts-lines="immediate">
          {HERO.headline}
        </h1>

        <div className="mt-9 grid items-start gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 lg:pt-2">
            <p className="bts-lead max-w-[46ch] text-body" data-bts-reveal="immediate">
              {HERO.body[0]}
              <span className="font-semibold text-accent">{HERO.body[1]}</span>
              {HERO.body[2]}
            </p>

            <div className="mt-8" data-bts-reveal="immediate">
              <CtaButton label={HERO.cta} />
            </div>

            <div
              className="mt-7 flex items-center gap-3 text-[0.9rem] text-body"
              data-bts-reveal="immediate"
            >
              <span className="flex items-center gap-0.5 text-accent" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={15} weight="fill" />
                ))}
              </span>
              <span>
                {ACADEMY.rating} on Google · {ACADEMY.ratingCount} reviews
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-[30rem] lg:mr-0 lg:max-w-none">
              <div
                className="bts-arch relative aspect-[3/4] w-[86%] bg-sand lg:w-[70%]"
                data-bts-reveal="immediate"
                data-bts-parallax="0.06"
              >
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

              <div
                className="bts-arch absolute -bottom-6 right-0 aspect-[3/4] w-[42%] border-4 border-paper bg-sand lg:-bottom-8 lg:right-[6%] lg:w-[36%]"
                data-bts-reveal="immediate"
                data-bts-parallax="-0.05"
              >
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
          </div>
        </div>
      </div>
    </section>
  )
}
