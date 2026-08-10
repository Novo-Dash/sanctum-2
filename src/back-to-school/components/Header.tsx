import { HERO } from '../data'
import { CtaButton } from './CtaButton'

/** Fixed, 64px, one CTA. Never taller than a doorway lintel should be. */
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-sand/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-5 md:px-10">
        <a href="/" className="flex items-center gap-2.5" aria-label="Sanctum Jiu Jitsu Academy home">
          <img
            src="/imagens/bts/logo-ink.png"
            alt="Sanctum Jiu Jitsu Academy"
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
          />
          <span className="hidden text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-ink sm:inline">
            Sanctum Jiu Jitsu
          </span>
        </a>

        <CtaButton
          label={HERO.cta}
          className="!min-h-[42px] !px-4 !py-2.5 !text-[0.78rem] sm:!px-5 sm:!text-[0.86rem] md:!px-6 md:!text-[0.92rem]"
        />
      </div>
    </header>
  )
}
