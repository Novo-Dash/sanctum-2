import { ArrowRight, CalendarBlank, ChatCircleText, NotePencil } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { CTA_SCHEDULE, SCHEDULE } from '../data'
import { CtaButton } from './CtaButton'
import { Tag } from './ui'

const STEP_ICONS: Icon[] = [NotePencil, CalendarBlank, ChatCircleText]

/**
 * Three cards on a squared page, each numbered, with an arrow pointing to the
 * next one. The arrows are the whole reason this is a grid and not a list:
 * the content is a sequence, so the layout has to move forward.
 */
export function HowToSchedule() {
  return (
    <section className="bts-paper-grid bg-paper-raised py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div data-bts-reveal>
          <Tag>Three steps</Tag>
        </div>

        <h2 className="bts-h2 mt-5 text-ink" data-bts-lines>
          {SCHEDULE.headline}
        </h2>

        <ol className="mt-14 grid gap-8 md:grid-cols-3 md:gap-5 lg:gap-8" role="list">
          {SCHEDULE.steps.map((step, i) => {
            const StepIcon = STEP_ICONS[i]
            const last = i === SCHEDULE.steps.length - 1
            return (
              <li key={step.label} className="relative" data-bts-reveal>
                <div className="bts-ink bts-pop h-full rounded-[var(--radius-card)] bg-paper px-6 pb-7 pt-9">
                  <span
                    aria-hidden
                    className="absolute -top-5 left-6 grid h-11 w-11 place-items-center rounded-full border-[2.5px] border-ink bg-accent font-display text-[1.35rem] leading-none text-on-ink shadow-[3px_3px_0_var(--color-ink)]"
                  >
                    {i + 1}
                  </span>

                  <span
                    aria-hidden
                    className="grid h-12 w-12 place-items-center rounded-[12px] border-2 border-ink bg-accent-wash text-accent"
                  >
                    <StepIcon size={24} weight="bold" />
                  </span>

                  <p className="mt-5 font-display text-[1rem] uppercase tracking-wide text-accent">
                    {step.label}
                  </p>
                  <p className="mt-2 text-[1.08rem] leading-snug text-ink">{step.text}</p>
                </div>

                {!last && (
                  <span
                    aria-hidden
                    className="absolute -right-[1.15rem] top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border-[2.5px] border-ink bg-paper-raised text-ink md:grid lg:-right-[1.6rem]"
                  >
                    <ArrowRight size={16} weight="bold" />
                  </span>
                )}
              </li>
            )
          })}
        </ol>

        <div className="mt-14" data-bts-reveal>
          <CtaButton label={CTA_SCHEDULE} className="!text-[0.9rem]" />
        </div>
      </div>
    </section>
  )
}
