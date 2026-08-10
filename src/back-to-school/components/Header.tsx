import { Star } from '@phosphor-icons/react'
import { ACADEMY, HERO } from '../data'
import { CtaButton } from './CtaButton'

/** A floating pill, one CTA, drawn with the same ink stroke as everything else. */
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-5 md:pt-4">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-3 rounded-full border-[2.5px] border-ink bg-paper-raised/95 pl-4 pr-2 backdrop-blur-md md:h-16 md:pl-6 md:pr-3">
        <a href="/" className="flex items-center gap-2.5" aria-label="Sanctum Jiu Jitsu Academy home">
          <img
            src="/imagens/bts/logo-ink.png"
            alt="Sanctum Jiu Jitsu Academy"
            width={40}
            height={40}
            className="h-8 w-8 object-contain md:h-9 md:w-9"
          />
          <span className="hidden font-display text-[0.95rem] uppercase tracking-[0.08em] text-ink sm:inline">
            Sanctum Jiu Jitsu
          </span>
        </a>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-1.5 lg:flex">
            <Star size={14} weight="fill" className="text-accent" aria-hidden />
            <span className="font-display text-[0.85rem] uppercase tracking-wide text-ink">
              {ACADEMY.rating} on Google
            </span>
          </span>

          <CtaButton
            label={HERO.cta}
            className="!min-h-[42px] !px-4 !py-2.5 !text-[0.78rem] !shadow-[3px_3px_0_var(--color-ink)] sm:!px-5 sm:!text-[0.86rem]"
          />
        </div>
      </div>
    </header>
  )
}
