import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui'
import { useUTMs } from '@/hooks/useUTMs'
import type { ModalTag } from '@/hooks/useModal'
import type { LeadFormData } from '@/types'

interface BookingModalProps {
  isOpen: boolean
  defaultTag: ModalTag
  onClose: () => void
}

type Step = 'form' | 'loading' | 'success' | 'error'

const INITIAL_FORM: LeadFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  programInterest: 'both',
  howDidYouHear: '',
  website: '',
}

let lastSubmitTime = 0

export function BookingModal({ isOpen, defaultTag, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>('form')
  const [form, setForm] = useState<LeadFormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({})
  const utms = useUTMs()
  const overlayRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setStep('form')
      setForm({ ...INITIAL_FORM, programInterest: defaultTag ?? 'both' })
      setErrors({})
      setTimeout(() => firstInputRef.current?.focus(), 100)
    }
  }, [isOpen, defaultTag])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose()
    },
    [onClose]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setForm((prev) => ({ ...prev, [name]: value }))
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    },
    []
  )

  function validate(): boolean {
    const next: typeof errors = {}
    if (!form.firstName.trim()) next.firstName = 'Required'
    if (!form.lastName.trim()) next.lastName = 'Required'
    if (!form.phone.trim()) next.phone = 'Required'
    if (!form.email.trim() || !form.email.includes('@')) next.email = 'Valid email required'
    if (Object.keys(next).length > 0) {
      setErrors(next)
      return false
    }
    return true
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (form.website) return

      const now = Date.now()
      if (now - lastSubmitTime < 5000) return
      lastSubmitTime = now

      if (!validate()) return

      setStep('loading')

      try {
        const response = await fetch('/api/submit-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            email: form.email,
            programInterest: form.programInterest,
            howDidYouHear: form.howDidYouHear,
            website: form.website,
            ...utms,
          }),
        })

        if (!response.ok) throw new Error('Submit failed')

        setStep('success')

        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead')
        }
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'Lead', { event_category: 'booking_modal' })
        }
      } catch {
        setStep('error')
      }
    },
    [form, utms]
  )

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm p-0 md:items-center md:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Reserve Your Free Class"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-t-[var(--radius-lg)] md:rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-lg)]">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-[44px] w-[44px] items-center justify-center rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="px-7 pb-8 pt-7">
          {step === 'form' && (
            <>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-1">
                First class on us
              </p>
              <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">
                Reserve Your Free Class
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mb-7">
                No experience needed. No commitment.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ display: 'none' }}
                  autoComplete="off"
                />

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FieldGroup
                      label="First Name"
                      error={errors.firstName}
                    >
                      <input
                        ref={firstInputRef}
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        autoComplete="given-name"
                        required
                        className={inputClass(!!errors.firstName)}
                        placeholder="Sofia"
                      />
                    </FieldGroup>

                    <FieldGroup label="Last Name" error={errors.lastName}>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                        required
                        className={inputClass(!!errors.lastName)}
                        placeholder="Smith"
                      />
                    </FieldGroup>
                  </div>

                  <FieldGroup label="Phone" error={errors.phone}>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      required
                      className={inputClass(!!errors.phone)}
                      placeholder="(786) 000-0000"
                    />
                  </FieldGroup>

                  <FieldGroup label="Email" error={errors.email}>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                      className={inputClass(!!errors.email)}
                      placeholder="sofia@email.com"
                    />
                  </FieldGroup>

                  <FieldGroup label="Program Interest">
                    <select
                      name="programInterest"
                      value={form.programInterest}
                      onChange={handleChange}
                      className={inputClass(false)}
                    >
                      <option value="kids">Kids BJJ</option>
                      <option value="adults">Adults BJJ</option>
                      <option value="both">Both</option>
                    </select>
                  </FieldGroup>

                  <FieldGroup label="How did you hear about us? (optional)">
                    <select
                      name="howDidYouHear"
                      value={form.howDidYouHear}
                      onChange={handleChange}
                      className={inputClass(false)}
                    >
                      <option value="">Select an option</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="google">Google Search</option>
                      <option value="google_maps">Google Maps</option>
                      <option value="friend">Friend or Family</option>
                      <option value="other">Other</option>
                    </select>
                  </FieldGroup>

                  <Button type="submit" className="w-full mt-2" size="lg">
                    Reserve My Free Class
                  </Button>

                  <p className="text-center text-xs text-[var(--color-text-muted)]">
                    By submitting, you agree to be contacted about your class.
                  </p>
                </div>
              </form>
            </>
          )}

          {step === 'loading' && (
            <div className="flex flex-col items-center gap-5 py-12">
              <LoadingSpinner />
              <p className="text-base font-medium text-[var(--color-text-muted)]">
                Reserving your spot...
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center gap-5 py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <circle cx="16" cy="16" r="16" fill="#16a34a" opacity="0.15" />
                  <path d="M10 16l4 4 8-8" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">
                You&apos;re in!
              </h2>
              <p className="text-base text-[var(--color-text-muted)]">
                We&apos;ll be in touch shortly to confirm your free class.
              </p>
              <Button onClick={onClose} variant="secondary" size="md">
                Close
              </Button>
            </div>
          )}

          {step === 'error' && (
            <div className="flex flex-col items-center gap-5 py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <circle cx="16" cy="16" r="16" fill="#dc2626" opacity="0.15" />
                  <path d="M11 11l10 10M21 11L11 21" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">
                Something went wrong
              </h2>
              <p className="text-base text-[var(--color-text-muted)]">
                Please call us directly and we&apos;ll get you set up.
              </p>
              <a
                href="tel:+17867226008"
                className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 text-base font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
              >
                Call (786) 722-6008
              </a>
              <button
                type="button"
                onClick={() => setStep('form')}
                className="text-sm text-[var(--color-text-muted)] underline hover:text-[var(--color-accent)] h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-sm"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FieldGroup({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[var(--color-text)]">{label}</label>
      {children}
      {error && (
        <p className="text-xs text-[var(--color-danger)]" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function inputClass(hasError: boolean) {
  return `h-[48px] w-full rounded-[var(--radius-sm)] border ${
    hasError ? 'border-[var(--color-danger)]' : 'border-[var(--color-border)]'
  } bg-[var(--color-bg)] px-4 text-base text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] transition-shadow`
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="16" stroke="var(--color-border)" strokeWidth="4" />
      <path
        d="M20 4a16 16 0 0 1 16 16"
        stroke="var(--color-accent)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}
