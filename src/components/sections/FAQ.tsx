import { useState, useCallback } from 'react'
import { SectionHeader } from '@/components/ui'
import { faqItems } from '@/data/faq'

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <>
      <style>{`
        @keyframes faq-slide-left {
          from { background-position: 0 0; }
          to   { background-position: -32px 0; }
        }
        .faq-pattern-bg {
          background-color: #ffffff;
          background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px);
          background-size: 32px 32px;
          animation: faq-slide-left 6s linear infinite;
        }
      `}</style>

      <section
        id="common-questions"
        aria-labelledby="faq-heading"
        className="faq-pattern-bg py-24"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionHeader
            id="faq-heading"
            title="Common Questions"
            center
          />

          <div className="mx-auto max-w-3xl">
            <dl className="flex flex-col gap-3">
              {faqItems.map((item) => {
                const isOpen = openId === item.id
                return (
                  <div
                    key={item.id}
                    className={`rounded-[var(--radius-card)] border transition-colors duration-200 overflow-hidden ${
                      isOpen
                        ? 'border-[var(--color-accent)]/30 bg-[var(--color-bg)]'
                        : 'border-[var(--color-border)] bg-[var(--color-bg)]'
                    }`}
                  >
                    <dt>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-accent)] min-h-[56px]"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${item.id}`}
                        onClick={() => toggle(item.id)}
                      >
                        {item.question}
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                            isOpen
                              ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                              : 'border-[var(--color-border)] text-[var(--color-text-muted)]'
                          }`}
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                              style={{ transform: isOpen ? 'scaleY(0)' : 'scaleY(1)', transformOrigin: 'center', transition: 'transform 200ms ease-out' }}
                            />
                            <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </span>
                      </button>
                    </dt>
                    <dd
                      id={`faq-answer-${item.id}`}
                      hidden={!isOpen}
                      className="px-6 pb-5"
                    >
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {item.answer}
                      </p>
                    </dd>
                  </div>
                )
              })}
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
