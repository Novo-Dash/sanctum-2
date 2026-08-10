import { useBooking } from '@/booking/booking-provider'

type Variant = 'primary' | 'onink' | 'quiet'

const VARIANT_CLASS: Record<Variant, string> = {
  primary: 'bts-cta-primary',
  onink: 'bts-cta-onink',
  quiet: 'bts-cta-quiet',
}

/**
 * Every CTA on the page opens the same booking modal that the main site uses,
 * so ViewContent / Lead / Schedule fire from one place. Labels come from the
 * client's copy deck, unchanged.
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
    <button type="button" onClick={openModal} className={`bts-cta ${VARIANT_CLASS[variant]} ${className}`}>
      {label}
    </button>
  )
}
