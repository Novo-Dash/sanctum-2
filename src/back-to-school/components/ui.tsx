import { Asterisk, Star } from '@phosphor-icons/react'

/** The label that names a section, and the sticker that floats on a photo. */
export function Tag({
  children,
  variant = 'accent',
  className = '',
}: {
  children: React.ReactNode
  variant?: 'accent' | 'paper' | 'onink'
  className?: string
}) {
  const skin = variant === 'paper' ? 'bts-tag-paper' : variant === 'onink' ? 'bts-tag-onink' : ''
  return <span className={`bts-tag ${skin} ${className}`}>{children}</span>
}

/**
 * The two running ribbons. They carry only what the page can back up: the
 * campaign, the free trial, the age range of the kids calendars in GHL, and
 * where the academy is. They also do the job of a chapter divider.
 */
const RIBBON_A = ['Back to School', 'Free trial class', 'Ages 4 to 12', 'Sanctum Jiu Jitsu']
const RIBBON_B = ['Miami, FL', 'Kids Jiu-Jitsu', 'First class free', 'Back to School']

function RibbonTrack({ items }: { items: string[] }) {
  // rendered twice so the -50% loop is seamless
  const doubled = [...items, ...items, ...items, ...items]
  return (
    <div className="bts-ribbon__track" aria-hidden>
      {doubled.map((item, i) => (
        <span key={i} className="flex items-center gap-2.5">
          {item}
          <Asterisk size={14} weight="bold" className="opacity-70" />
        </span>
      ))}
    </div>
  )
}

export function Ribbons() {
  return (
    <div className="bts-ribbons" role="presentation">
      <div className="bts-ribbon bts-ribbon--a">
        <RibbonTrack items={RIBBON_A} />
      </div>
      <div className="bts-ribbon bts-ribbon--b">
        <RibbonTrack items={RIBBON_B} />
      </div>
    </div>
  )
}

/** The quiet divider, for a break inside a chapter. */
export function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`bts-divider ${className}`} role="presentation">
      <span className="bts-divider__mark">
        <Star size={16} weight="fill" />
      </span>
    </div>
  )
}

/** A strip of masking tape holding something to the page. */
export function Tape({ className = '', rotate = -4 }: { className?: string; rotate?: number }) {
  return (
    <span
      aria-hidden
      className={`bts-tape ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  )
}
