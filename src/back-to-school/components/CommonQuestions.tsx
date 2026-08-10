import { useState } from 'react'
import { Plus } from '@phosphor-icons/react'
import { CTA_BTS, FAQ } from '../data'
import { CtaButton } from './CtaButton'

/** Seven answers, one open at a time, on a single readable column. */
export function CommonQuestions() {
  const [open, setOpen] = useState<string | null>(FAQ.items[0].q)

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[52rem] px-5 md:px-10">
        <h2 className="bts-h2 text-ink" data-bts-lines>
          {FAQ.headline}
        </h2>

        <div className="mt-10 border-t border-sand md:mt-12">
          {FAQ.items.map((item) => {
            const isOpen = open === item.q
            return (
              <div key={item.q} className="border-b border-sand" data-bts-reveal>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : item.q)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span className="bts-h3 text-ink">{item.q}</span>
                    <span
                      aria-hidden
                      className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-sand text-accent transition-transform duration-300 ease-out ${
                        isOpen ? 'rotate-45 bg-accent-wash' : ''
                      }`}
                    >
                      <Plus size={15} weight="regular" />
                    </span>
                  </button>
                </h3>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[58ch] pb-6 pr-12 text-[1rem] leading-relaxed text-body">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12" data-bts-reveal>
          <CtaButton label={CTA_BTS} />
        </div>
      </div>
    </section>
  )
}
