import { Backpack, Check, NotePencil } from '@phosphor-icons/react'
import { CTA_BTS, WHY } from '../data'
import { CtaButton } from './CtaButton'

/**
 * The first of two navy chapters: the page steps indoors while the parent reads
 * the reason to trust it. Six values as a two-column ruled list, not cards, so
 * nothing competes with the sentence above them.
 */
export function WhyJiuJitsu() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-28">
      {/* the school layer, at whisper volume: two objects, both fully in frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden text-on-ink opacity-[0.06] lg:block"
      >
        <Backpack size={200} weight="light" className="absolute right-[12%] top-16" />
        <NotePencil size={160} weight="light" className="absolute right-[6%] top-[19rem]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-10">
        <h2 className="bts-h2 max-w-[24ch] text-on-ink" data-bts-lines>
          {WHY.headline}
        </h2>

        <ul className="mt-12 grid gap-x-12 sm:grid-cols-2" role="list">
          {WHY.values.map((value) => (
            <li
              key={value}
              className="flex items-center gap-4 border-t border-on-ink/15 py-5"
              data-bts-reveal
            >
              <span
                aria-hidden
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-on-ink"
              >
                <Check size={15} weight="bold" />
              </span>
              <span className="text-[1.02rem] leading-snug text-on-ink">{value}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12" data-bts-reveal>
          <CtaButton label={CTA_BTS} variant="onink" />
        </div>
      </div>
    </section>
  )
}
