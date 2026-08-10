import { useState } from 'react'
import { cn } from '@/lib/utils'
import { formatMonthYear, getBookingWindow, isDateBookable, isSameDay } from './schedule'
import type { SlotMap } from './schedule'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

/** Leading blanks + the days of `month`, as a flat grid. */
function buildGrid(month: Date): (Date | null)[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells: (Date | null)[] = Array(first.getDay()).fill(null)
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(month.getFullYear(), month.getMonth(), d))
  }
  return cells
}

interface CalendarProps {
  slots: SlotMap
  selected: Date | null
  onSelect: (date: Date) => void
  initialMonth: Date
}

export function Calendar({ slots, selected, onSelect, initialMonth }: CalendarProps) {
  const [month, setMonth] = useState(
    () => new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1)
  )
  const { min, max } = getBookingWindow()

  const canGoBack = month > new Date(min.getFullYear(), min.getMonth(), 1)
  const canGoForward = month < new Date(max.getFullYear(), max.getMonth(), 1)
  const shift = (delta: number) =>
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1))

  return (
    <div>
      <div className="flex items-center justify-between">
        <NavArrow dir="prev" disabled={!canGoBack} onClick={() => shift(-1)} />
        <span className="text-base font-bold text-[var(--color-text)]">
          {formatMonthYear(month)}
        </span>
        <NavArrow dir="next" disabled={!canGoForward} onClick={() => shift(1)} />
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d, i) => (
          <span
            key={`${d}-${i}`}
            className="grid h-7 place-items-center text-[0.68rem] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]"
          >
            {d}
          </span>
        ))}

        {buildGrid(month).map((date, i) => {
          if (!date) return <span key={`blank-${i}`} />
          const bookable = isDateBookable(slots, date)
          const isSelected = !!selected && isSameDay(selected, date)
          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={!bookable}
              aria-pressed={isSelected}
              onClick={() => onSelect(date)}
              className={cn(
                'grid h-9 place-items-center rounded-lg text-[0.9rem] tabular-nums transition-colors',
                isSelected && 'bg-[var(--color-accent)] font-semibold text-white',
                !isSelected &&
                  bookable &&
                  'text-[var(--color-text)] hover:bg-[var(--color-accent-subtle)]',
                !bookable && 'cursor-not-allowed text-[var(--color-text-muted)]/50'
              )}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function NavArrow({
  dir,
  disabled,
  onClick,
}: {
  dir: 'prev' | 'next'
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? 'Previous month' : 'Next month'}
      className={cn(
        'grid h-8 w-8 place-items-center rounded-full text-[var(--color-text)] transition-colors',
        disabled
          ? 'cursor-not-allowed text-[var(--color-text-muted)]/50'
          : 'hover:bg-[var(--color-accent-subtle)]'
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className={cn('h-4 w-4', dir === 'prev' && 'rotate-180')}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  )
}
