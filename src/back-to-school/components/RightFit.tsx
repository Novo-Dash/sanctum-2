import { Check } from '@phosphor-icons/react'
import { CTA_BTS, RIGHT_FIT } from '../data'
import { CtaButton } from './CtaButton'
import { Divider, Tag, Tape } from './ui'

/**
 * The parent's own checklist, set on ruled lines: the school layer doing real
 * work instead of decorating. The arched photo on the left is the answer to
 * the questions on the right.
 */
export function RightFit() {
  return (
    <section className="bts-paper-grid py-20 md:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-[24rem] lg:sticky lg:top-28 lg:max-w-none">
            <div
              aria-hidden
              className="bts-arch bts-ink absolute inset-0 rotate-[3deg] bg-paper-raised"
            />
            <div className="bts-arch bts-ink relative -rotate-[1.5deg] bg-sand" data-bts-reveal>
              <div className="aspect-[4/5] w-full">
                <img
                  src="/imagens/bts/fit.webp"
                  alt="A young student focused during a Sanctum kids class"
                  width={900}
                  height={1180}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <Tape className="left-1/2 -top-3 z-10 -translate-x-1/2" rotate={5} />
            <Tag className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2 -rotate-[2deg]">
              Free trial class
            </Tag>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div data-bts-reveal>
            <Tag variant="paper">Is it for your child?</Tag>
          </div>

          <h2 className="bts-h2 mt-5 max-w-[20ch] text-ink" data-bts-lines>
            {RIGHT_FIT.headline}
          </h2>

          <p className="bts-lead mt-5 max-w-[52ch] text-body" data-bts-reveal>
            {RIGHT_FIT.lead}
          </p>

          <ul className="mt-9 border-t-2 border-sand" role="list">
            {RIGHT_FIT.questions.map((question) => (
              <li
                key={question}
                className="bts-rule flex items-start gap-4 py-4"
                data-bts-reveal
              >
                <span
                  aria-hidden
                  className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink bg-accent text-on-ink"
                >
                  <Check size={14} weight="bold" />
                </span>
                <span className="text-[1.02rem] leading-relaxed text-ink">{question}</span>
              </li>
            ))}
          </ul>

          <Divider className="my-8" />

          <p className="max-w-[54ch] text-[1.02rem] leading-relaxed text-body" data-bts-reveal>
            {RIGHT_FIT.closing[0]}
            <strong className="bts-mark font-semibold text-ink">{RIGHT_FIT.closing[1]}</strong>
            {RIGHT_FIT.closing[2]}
          </p>

          <div className="mt-9" data-bts-reveal>
            <CtaButton label={CTA_BTS} />
          </div>
        </div>
      </div>
    </section>
  )
}
