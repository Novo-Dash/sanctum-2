import {
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Phone,
} from '@phosphor-icons/react'
import { ACADEMY, CTA_BTS, FOOTER } from '../data'
import { CtaButton } from './CtaButton'

/**
 * Closing chapter: the same navy as the "why" section, so the page ends where
 * its argument began. Address, phone, email and socials come from the academy's
 * own records, not from anywhere else.
 */
export function SiteFooter() {
  return (
    <footer className="bg-ink pt-20 text-on-ink md:pt-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <p className="bts-h2 max-w-[24ch] text-on-ink" data-bts-lines>
          <span className="text-accent-wash">{FOOTER.body[0]}</span>
          {' Back to School is the perfect opportunity to help your child start the new school year with more confidence.'}
        </p>

        <p className="bts-lead mt-6 max-w-[46ch] text-on-ink-dim" data-bts-reveal>
          Click any button on this page to book a free trial class and experience the benefits of
          Brazilian Jiu-Jitsu firsthand.
        </p>

        <div className="mt-9" data-bts-reveal>
          <CtaButton label={CTA_BTS} variant="onink" />
        </div>

        <div className="mt-16 grid gap-10 border-t border-on-ink/15 pt-12 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <img
              src="/foto1.webp"
              alt={ACADEMY.name}
              width={72}
              height={72}
              loading="lazy"
              decoding="async"
              className="h-14 w-14 object-contain"
            />

            <ul className="mt-7 flex flex-col gap-5" role="list">
              <li>
                <a
                  href={ACADEMY.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4"
                >
                  <ContactIcon>
                    <MapPin size={17} weight="regular" />
                  </ContactIcon>
                  <span className="text-[0.98rem] leading-snug text-on-ink-dim transition-colors group-hover:text-on-ink">
                    {ACADEMY.street}
                    <br />
                    {ACADEMY.city}
                  </span>
                </a>
              </li>
              <li>
                <a href={ACADEMY.phoneHref} className="group flex items-center gap-4">
                  <ContactIcon>
                    <Phone size={17} weight="regular" />
                  </ContactIcon>
                  <span className="text-[0.98rem] text-on-ink-dim transition-colors group-hover:text-on-ink">
                    {ACADEMY.phone}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${ACADEMY.email}`} className="group flex items-center gap-4">
                  <ContactIcon>
                    <EnvelopeSimple size={17} weight="regular" />
                  </ContactIcon>
                  <span className="text-[0.98rem] text-on-ink-dim transition-colors group-hover:text-on-ink">
                    {ACADEMY.email}
                  </span>
                </a>
              </li>
            </ul>

            <div className="mt-8 flex gap-3">
              <Social href={ACADEMY.instagram} label="Sanctum BJJ on Instagram">
                <InstagramLogo size={19} weight="regular" />
              </Social>
              <Social href={ACADEMY.facebook} label="Sanctum BJJ on Facebook">
                <FacebookLogo size={19} weight="regular" />
              </Social>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="h-[260px] overflow-hidden rounded-card border border-on-ink/15 md:h-full md:min-h-[280px]">
              <iframe
                src={ACADEMY.mapEmbed}
                title={`${ACADEMY.name} location in Miami, FL`}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: 'block', filter: 'grayscale(35%) contrast(1.05)' }}
              />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-on-ink/15 py-6 text-[0.8rem] text-on-ink-dim/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{FOOTER.rights}</p>
          <p>
            By <span className="font-medium text-on-ink-dim">{FOOTER.by}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

function ContactIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-on-ink/10 text-on-ink transition-colors group-hover:bg-accent"
    >
      {children}
    </span>
  )
}

function Social({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-on-ink/20 text-on-ink-dim transition-colors hover:border-on-ink/50 hover:text-on-ink"
    >
      {children}
    </a>
  )
}
