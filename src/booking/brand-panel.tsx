import { ACADEMY_ADDRESS } from './schedule'

const POINTS = [
  'Your first class is free, no commitment',
  'All levels welcome, we start you from zero',
  'Train with a 2025 World Champion',
]

/**
 * Left column of the two-column layout — decorative/informational only, never a
 * second form. Shared by the modal and /book. Collapses to a compact logo +
 * title header on mobile. Sanctum identity: dark surface, blue accent.
 */
export function BrandPanel() {
  return (
    <aside className="relative shrink-0 overflow-hidden bg-[#0D0D0D] px-6 py-5 text-white md:px-8 md:py-9">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-[var(--color-accent)]/25 blur-[90px]" />
      </div>
      {/* blue accent rule */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-[var(--color-accent)]" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-3">
          <img
            src="/imagem/foto 2.webp"
            alt="Sanctum Jiu Jitsu Academy"
            className="h-12 w-auto shrink-0 object-contain"
          />
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-white/90">
            Sanctum Jiu Jitsu
          </span>
        </div>

        {/* desktop-only — keeps the mobile modal short */}
        <div className="hidden md:flex md:flex-1 md:flex-col">
          <h2 className="mt-9 text-[2rem] font-bold leading-[1.1] text-white">
            Book your free
            <br />
            trial class.
          </h2>
          <p className="mt-4 max-w-xs text-[0.95rem] leading-[1.6] text-white/65">
            Two quick steps: your details, then a time that works for you.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[0.92rem] leading-[1.5] text-white/85">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-accent)] text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>

          <address className="mt-auto pt-8 text-[0.85rem] not-italic leading-[1.6] text-white/50">
            {ACADEMY_ADDRESS.street}
            <br />
            {ACADEMY_ADDRESS.city}
          </address>
        </div>
      </div>
    </aside>
  )
}
