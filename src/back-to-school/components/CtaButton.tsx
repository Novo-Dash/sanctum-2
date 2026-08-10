import { ArrowRight } from '@phosphor-icons/react'
import { useBooking } from '@/booking/booking-provider'

type Variant = 'primary' | 'onink'

/**
 * Every CTA on the page opens the same booking modal that the main site uses,
 * so ViewContent / Lead / Schedule fire from one place. Labels come from the
 * client's copy deck, unchanged. The arrow steps forward on hover and the
 * whole sticker presses into the page on click.
 */
export function CtaButton({
  label,
  variant = 'primary',
  className = '',
}: {
  label: string
  variant?: Variant
  className?: string
}) {
  const { openModal } = useBooking()

  return (
    <button
      type="button"
      onClick={openModal}
      className={`bts-cta ${variant === 'onink' ? 'bts-cta-onink' : 'bts-cta-primary'} ${className}`}
    >
      {label}
      <ArrowRight size={19} weight="bold" className="bts-cta__arrow shrink-0" aria-hidden />
    </button>
  )
}
