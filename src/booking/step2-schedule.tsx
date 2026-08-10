import { useCallback, useEffect } from 'react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import {
  ACADEMY_PHONE,
  ACADEMY_PHONE_HREF,
  formatDateLong,
  formatTimeLabel,
  getFirstBookableDate,
  getTimesForDay,
} from './schedule'
import type { SlotMap } from './schedule'
import { Calendar } from './calendar'
import type { BookingData } from './webhook'

interface Step2Props {
  data: BookingData
  patch: (next: Partial<BookingData>) => void
  onBack: () => void
  onConfirm: () => void
}

export function Step2Schedule({ data, patch, onBack, onConfirm }: Step2Props) {
  const program = data.program
  // Slots arrived WITH the program in the single get_programs call (§5.1) —
  // no second fetch, no second wait.
  const slots = program?.slots ?? {}
  const slotsError = program?.slots_error ?? null

  /** Selecting a day auto-picks its time when there is exactly one. */
  const selectDate = useCallback(
    (date: Date, map: SlotMap) => {
      const times = getTimesForDay(map, date)
      patch({ date, time: times.length === 1 ? times[0] : null })
    },
    [patch]
  )

  // Entering the step: open the calendar on the first available date and
  // preselect it; a single available time comes preselected too (§2).
  useEffect(() => {
    if (!program || data.date) return
    const first = getFirstBookableDate(slots)
    if (first) selectDate(first, slots)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program])

  if (!program) return null

  const times = data.date ? getTimesForDay(slots, data.date) : []
  const firstBookable = getFirstBookableDate(slots)
  const noAvailability = slotsError !== null || !firstBookable
  const canConfirm = !!data.date && !!data.time

  return (
    <div className="flex flex-col">
      <Header onBack={onBack} />

      {!noAvailability ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-[minmax(0,1fr)_10.5rem]">
          <Calendar
            slots={slots}
            selected={data.date}
            onSelect={(date) => selectDate(date, slots)}
            initialMonth={data.date ?? firstBookable}
          />

          <div className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              {data.date ? formatDateLong(data.date) : 'Pick a date'}
            </p>
            <div className="mt-2 flex flex-col gap-2 sm:max-h-[15.5rem] sm:overflow-y-auto sm:pr-1">
              {times.length === 0 && (
                <p className="text-sm text-[var(--color-text-muted)]">
                  No times left on this day.
                </p>
              )}
              {times.map((t) => {
                const active = data.time === t
                return (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={active}
                    onClick={() => patch({ time: t })}
                    className={cn(
                      'rounded-[var(--radius-sm)] border px-4 py-2.5 text-sm font-medium tabular-nums transition-colors',
                      active
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                        : 'border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] hover:border-[var(--color-accent)]'
                    )}
                  >
                    {formatTimeLabel(t)}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <p className="py-10 text-center text-[0.95rem] text-[var(--color-text-secondary)]">
          No times are available right now. Give us a call at{' '}
          <a
            href={ACADEMY_PHONE_HREF}
            className="font-semibold text-[var(--color-accent)] underline"
          >
            {ACADEMY_PHONE}
          </a>{' '}
          and we'll get you on the mats.
        </p>
      )}

      <Button
        type="button"
        size="lg"
        onClick={onConfirm}
        disabled={!canConfirm}
        className={cn('mt-5 w-full', !canConfirm && 'pointer-events-none opacity-40')}
      >
        {canConfirm && data.date && data.time
          ? `Confirm ${formatDateLong(data.date)}, ${formatTimeLabel(data.time)}`
          : 'Confirm my trial class'}
      </Button>
    </div>
  )
}

function Header({ onBack }: { onBack: () => void }) {
  return (
    <header className="mb-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="grid h-7 w-7 place-items-center rounded-full text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-accent-subtle)] hover:text-[var(--color-text)]"
          aria-label="Back to your details"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          Step 2 of 2
        </p>
      </div>
      <h3 className="mt-1 text-2xl font-bold text-[var(--color-text)]">Pick a date &amp; time</h3>
    </header>
  )
}
