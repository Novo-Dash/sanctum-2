import {
  Backpack,
  Barbell,
  Handshake,
  Heart,
  Medal,
  ShieldCheck,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { CTA_BTS, GALLERY, WHY } from '../data'
import { CtaButton } from './CtaButton'
import { Tag, Tape } from './ui'

/** One icon per value, all in the single accent so the colour lock holds. */
const VALUE_ICONS: Icon[] = [Backpack, Handshake, Medal, ShieldCheck, Heart, Barbell]

/**
 * The first navy chapter: the page steps indoors while the parent reads the
 * reason to trust it. Six values, each pinned to a real photo of this academy,
 * taped to a squared page.
 */
export function WhyJiuJitsu() {
  return (
    <section className="bts-paper-grid-ink relative overflow-hidden bg-ink py-20 md:py-28">
      <div className="relative mx-auto max-w-[1280px] px-5 md:px-10">
        <div data-bts-reveal>
          <Tag variant="onink">Why Jiu-Jitsu?</Tag>
        </div>

        <h2 className="bts-h2 mt-5 max-w-[22ch] text-on-ink" data-bts-lines>
          {WHY.headline}
        </h2>

        <ul className="mt-16 grid gap-y-16 gap-x-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {WHY.values.map((value, i) => {
            const ValueIcon = VALUE_ICONS[i]
            const photo = GALLERY[i]
            return (
              <li key={value} className="relative" data-bts-reveal>
                <div
                  className={`bts-arch bts-ink relative bg-sand ${i % 2 === 0 ? 'rotate-[1deg]' : '-rotate-[1.2deg]'}`}
                >
                  <div className="aspect-[4/5] w-full">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <Tape className="left-1/2 -top-3 -translate-x-1/2" rotate={i % 2 === 0 ? -5 : 4} />

                <div className="relative -mt-9 ml-2 mr-4 flex items-center gap-3 rounded-[var(--radius-card)] border-[2.5px] border-ink bg-paper-raised px-3.5 py-3 shadow-[4px_4px_0_var(--color-accent)]">
                  <span
                    aria-hidden
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border-2 border-ink bg-accent text-on-ink"
                  >
                    <ValueIcon size={18} weight="bold" />
                  </span>
                  <span className="text-[0.95rem] font-semibold leading-tight text-ink">
                    {value}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="mt-16 flex justify-center" data-bts-reveal>
          <CtaButton label={CTA_BTS} variant="onink" />
        </div>
      </div>
    </section>
  )
}
