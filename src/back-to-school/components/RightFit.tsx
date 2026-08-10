import { Check } from '@phosphor-icons/react'
import { CTA_BTS, RIGHT_FIT } from '../data'
import { CtaButton } from './CtaButton'

/**
 * The parent's own checklist, set on ruled lines: the school layer doing real
 * work instead of decorating. The arched photo on the left is the answer to
 * the questions on the right.
 */
export function RightFit() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div
            className="bts-arch mx-auto aspect-[3/4] w-full max-w-[26rem] bg-sand lg:sticky lg:top-28 lg:max-w-none"
            data-bts-reveal
          >
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

        <div className="lg:col-span-7">
          <h2 className="bts-h2 max-w-[20ch] text-ink" data-bts-lines>
            {RIGHT_FIT.headline}
          </h2>

          <p className="bts-lead mt-5 max-w-[52ch] text-body" data-bts-reveal>
            {RIGHT_FIT.lead}
          </p>

          <ul className="mt-9" role="list">
            {RIGHT_FIT.questions.map((question) => (
              <li
                key={question}
                className="bts-rule flex items-start gap-4 py-4 first:border-t first:border-sand first:pt-0"
                data-bts-reveal
              >
                <Check
                  size={18}
                  weight="regular"
                  className="mt-1 shrink-0 text-accent"
                  aria-hidden
                />
                <span className="text-[1.02rem] leading-relaxed text-ink">{question}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-[54ch] text-[1.02rem] leading-relaxed text-body" data-bts-reveal>
            {RIGHT_FIT.closing[0]}
            <strong className="font-semibold text-ink">{RIGHT_FIT.closing[1]}</strong>
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
