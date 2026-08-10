import { CalendarBlank, ChatCircleText, NotePencil } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { CTA_SCHEDULE, SCHEDULE } from '../data'
import { CtaButton } from './CtaButton'

const STEP_ICONS: Icon[] = [NotePencil, CalendarBlank, ChatCircleText]

/**
 * Three steps down one drawn line. The spine is an SVG path that draws itself
 * as the reader descends (motion.ts) — the only scrubbed animation on the page,
 * and it exists because the content is literally a sequence.
 */
export function HowToSchedule() {
  return (
    <section className="bg-paper-raised py-20 md:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="bts-h2 text-ink lg:sticky lg:top-28" data-bts-lines>
            {SCHEDULE.headline}
          </h2>
        </div>

        <div className="lg:col-span-8">
          <div className="relative md:mt-2">
          {/* the spine, behind the steps, desktop only */}
          <div
            aria-hidden
            data-bts-spine
            className="pointer-events-none absolute left-[1.65rem] top-4 hidden h-[calc(100%-3rem)] w-16 md:block"
          >
            <svg
              viewBox="0 0 64 400"
              preserveAspectRatio="none"
              className="h-full w-full"
              fill="none"
            >
              <path
                d="M32 0 C 32 120, 32 160, 32 200 C 32 240, 32 280, 32 400"
                stroke="var(--color-accent)"
                strokeOpacity="0.35"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <ol className="relative flex flex-col gap-10 md:gap-14" role="list">
            {SCHEDULE.steps.map((step, i) => {
              const StepIcon = STEP_ICONS[i]
              return (
                <li key={step.label} className="flex items-start gap-5 md:gap-8" data-bts-reveal>
                  <span
                    aria-hidden
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-sand bg-paper text-accent"
                  >
                    <StepIcon size={24} weight="regular" />
                  </span>
                  <div className="pt-1.5">
                    <p className="font-display text-[0.95rem] text-accent">{step.label}</p>
                    <p className="mt-1.5 max-w-[42ch] text-[1.12rem] leading-snug text-ink md:text-[1.3rem]">
                      {step.text}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
          </div>

          <div className="mt-14" data-bts-reveal>
            <CtaButton label={CTA_SCHEDULE} className="!text-[0.82rem] !tracking-[0.06em]" />
          </div>
        </div>
      </div>
    </section>
  )
}
