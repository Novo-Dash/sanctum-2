import { CalendarBlank, ChatCircleText, NotePencil } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { CTA_SCHEDULE, SCHEDULE } from '../data'
import { CtaButton } from './CtaButton'
import { Tag } from './ui'

const STEP_ICONS: Icon[] = [NotePencil, CalendarBlank, ChatCircleText]
const SPARKS = Array.from({ length: 14 }, (_, i) => i)

/**
 * A drawn timeline over three cards. The line fills as the reader descends and
 * the third node goes off when it arrives, because the content is a sequence
 * with a finish: the class is booked.
 */
export function HowToSchedule() {
  return (
    <section className="bts-paper-grid overflow-hidden bg-paper-raised py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div data-bts-reveal>
          <Tag>Three steps</Tag>
        </div>

        <h2 className="bts-h2 mt-5 text-ink" data-bts-lines>
          {SCHEDULE.headline}
        </h2>

        {/* the timeline, desktop only: three nodes on one filling line */}
        <div className="relative mt-16 hidden h-12 md:block" data-bts-track>
          <div className="bts-track mx-[16.6%]">
            <span className="bts-track__fill" data-bts-fill />
          </div>

          <div className="relative grid grid-cols-3">
            {SCHEDULE.steps.map((step, i) => (
              <div key={step.label} className="flex justify-center">
                <span
                  className="relative grid h-12 w-12 place-items-center rounded-full border-[3px] border-ink bg-accent font-display text-[1.4rem] leading-none text-on-ink shadow-[3px_3px_0_var(--color-ink)]"
                  aria-hidden
                >
                  {i + 1}
                  {i === SCHEDULE.steps.length - 1 &&
                    SPARKS.map((s) => (
                      <span
                        key={s}
                        className={`bts-spark ${s % 2 === 0 ? 'bg-accent' : 'bg-paper-raised'}`}
                      />
                    ))}
                </span>
              </div>
            ))}
          </div>
        </div>

        <ol className="mt-10 grid gap-8 md:mt-8 md:grid-cols-3 md:gap-5 lg:gap-8" role="list">
          {SCHEDULE.steps.map((step, i) => {
            const StepIcon = STEP_ICONS[i]
            return (
              <li key={step.label} className="relative" data-bts-reveal>
                <div className="bts-ink bts-pop h-full rounded-[var(--radius-card)] bg-paper px-6 pb-7 pt-9 md:pt-7">
                  {/* the number rides the timeline at md and up */}
                  <span
                    aria-hidden
                    className="absolute -top-5 left-6 grid h-11 w-11 place-items-center rounded-full border-[2.5px] border-ink bg-accent font-display text-[1.35rem] leading-none text-on-ink shadow-[3px_3px_0_var(--color-ink)] md:hidden"
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
              </li>
            )
          })}
        </ol>

        <div className="mt-14 flex justify-center" data-bts-reveal>
          <CtaButton label={CTA_SCHEDULE} className="!text-[0.9rem]" />
        </div>
      </div>
    </section>
  )
}
