import { useState } from 'react'
import { Plus } from '@phosphor-icons/react'
import { CTA_BTS, FAQ } from '../data'
import { CtaButton } from './CtaButton'
import { Tag } from './ui'

/**
 * Two columns: the section's own block stays with the reader on the left while
 * the answers run past on the right. One answer open at a time, each row a card
 * with its own stroke.
 */
export function CommonQuestions() {
  const [open, setOpen] = useState<string | null>(FAQ.items[0].q)

  return (
    <section className="bts-paper-grid py-20 md:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div data-bts-reveal>
              <Tag variant="paper">Parents ask</Tag>
            </div>

            <h2 className="bts-h2 mt-5 max-w-[14ch] text-ink" data-bts-lines>
              {FAQ.headline}
            </h2>

            <div className="mt-8" data-bts-reveal>
              <CtaButton label={CTA_BTS} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-7">
          {FAQ.items.map((item) => {
            const isOpen = open === item.q
            return (
              <div
                key={item.q}
                className={`bts-ink rounded-[var(--radius-card)] bg-paper-raised transition-shadow duration-200 ${
                  isOpen ? 'bts-pop-sm' : ''
                }`}
                data-bts-reveal
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : item.q)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-5 px-5 py-4 text-left md:px-6 md:py-5"
                  >
                    <span className="bts-h3 text-ink">{item.q}</span>
                    <span
                      aria-hidden
                      className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink transition-transform duration-300 ease-out ${
                        isOpen ? 'rotate-45 bg-accent text-on-ink' : 'bg-paper text-accent'
                      }`}
                    >
                      <Plus size={15} weight="bold" />
                    </span>
                  </button>
                </h3>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[58ch] px-5 pb-5 pr-10 text-[1rem] leading-relaxed text-body md:px-6 md:pb-6">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
