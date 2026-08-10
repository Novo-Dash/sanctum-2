import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { ACADEMY_PHONE, ACADEMY_PHONE_HREF, displayName } from './schedule'
import type { Program } from './schedule'
import { formatPhoneInput, isStep1Valid } from './booking-form'
import type { ProgramsState } from './booking-form'
import type { BookingData } from './webhook'

const inputCls =
  'h-[48px] w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 text-base text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] transition-shadow'

interface Step1Props {
  data: BookingData
  programs: ProgramsState
  patch: (next: Partial<BookingData>) => void
  onNext: () => void
}

export function Step1Details({ data, programs, patch, onNext }: Step1Props) {
  const isKids = data.program?.audience === 'kids'
  const childRef = useRef<HTMLInputElement>(null)
  const childWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isKids) return
    childWrapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    childRef.current?.focus({ preventScroll: true })
  }, [isKids])

  const valid = isStep1Valid(data)

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        onNext()
      }}
    >
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          Step 1 of 2
        </p>
        <h3 className="mt-1 text-2xl font-bold text-[var(--color-text)]">Your details</h3>
      </header>

      <Field label="Your name">
        <input
          required
          value={data.name}
          onChange={(e) => patch({ name: e.target.value })}
          placeholder="Your full name"
          autoComplete="name"
          className={inputCls}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Email">
          <input
            required
            type="email"
            value={data.email}
            onChange={(e) => patch({ email: e.target.value })}
            placeholder="you@email.com"
            autoComplete="email"
            className={inputCls}
          />
        </Field>
        <Field label="Phone">
          <input
            required
            type="tel"
            value={data.phone}
            onChange={(e) => patch({ phone: formatPhoneInput(e.target.value) })}
            placeholder="(786) 000-0000"
            autoComplete="tel"
            className={inputCls}
          />
        </Field>
      </div>

      <fieldset className="flex flex-col gap-1.5">
        <legend className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          Program
        </legend>

        {programs.status === 'loading' && (
          <div
            role="status"
            className="mt-1 flex min-h-[6rem] flex-col items-center justify-center gap-2 text-[var(--color-text-muted)]"
          >
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-accent-subtle)] border-t-[var(--color-accent)]" />
            <p className="text-sm">Loading programs…</p>
          </div>
        )}

        {(programs.status === 'error' ||
          (programs.status === 'ready' && programs.programs.length === 0)) && (
          <p
            role="alert"
            className="mt-1 rounded-[var(--radius-sm)] bg-[var(--color-accent-subtle)] px-3 py-2 text-sm text-[var(--color-accent-dark)]"
          >
            We couldn't load our programs right now. Please call us at{' '}
            <a href={ACADEMY_PHONE_HREF} className="font-semibold underline">
              {ACADEMY_PHONE}
            </a>{' '}
            and we'll get you on the mats.
          </p>
        )}

        {programs.status === 'ready' && programs.programs.length > 0 && (
          <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {programs.programs.map((p) => (
              <ProgramOption
                key={p.calendar_id}
                program={p}
                checked={data.program?.calendar_id === p.calendar_id}
                onSelect={() =>
                  patch({
                    program: p,
                    // reset schedule + drop a stale child name on switch
                    date: null,
                    time: null,
                    ...(p.audience === 'kids' ? {} : { childName: '' }),
                  })
                }
              />
            ))}
          </div>
        )}
      </fieldset>

      {isKids && (
        <div ref={childWrapRef}>
          <Field label="Child's name">
            <input
              ref={childRef}
              required
              value={data.childName}
              onChange={(e) => patch({ childName: e.target.value })}
              placeholder="Who's training with us?"
              className={inputCls}
            />
          </Field>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={!valid}
        className={cn('mt-1 w-full', !valid && 'pointer-events-none opacity-40')}
      >
        Continue
      </Button>
      <p className="text-center text-xs text-[var(--color-text-muted)]">
        Free trial class · No commitment
      </p>
    </form>
  )
}

function ProgramOption({
  program,
  checked,
  onSelect,
}: {
  program: Program
  checked: boolean
  onSelect: () => void
}) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] border px-4 py-3 text-sm transition-colors',
        checked
          ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] text-[var(--color-text)]'
          : 'border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]'
      )}
    >
      <input type="radio" name="program" className="sr-only" checked={checked} onChange={onSelect} />
      <span
        aria-hidden
        className={cn(
          'grid h-[1.15rem] w-[1.15rem] shrink-0 place-items-center rounded-full border-2 transition-colors',
          checked ? 'border-[var(--color-accent)]' : 'border-[var(--color-border)]'
        )}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />}
      </span>
      <span className="font-medium">{displayName(program)}</span>
    </label>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-[var(--color-text)]">{label}</span>
      {children}
    </label>
  )
}
