/**
 * Booking schedule — types + pure date/time helpers.
 *
 * The program list does NOT live here (spec §5): programs AND their slots come
 * live from GHL in one call (get_programs via n8n, §5.1 — see
 * webhook.fetchPrograms). A `Program` is the object n8n delivers. This module
 * keeps only what GHL can't know: per-academy exceptions and fixed constants.
 */

export type Audience = 'adults' | 'kids'

/** A program exactly as n8n returns it (§5.1). None of this is hand-written. */
export interface Program {
  calendar_id: string // matches the calendar in Webhook 2 (rename-proof)
  name: string // GHL calendar name = `program` field of Webhook 1
  audience: Audience // comes from the calendar group in GHL
  duration_minutes: number | null
  capacity: number
  slots: SlotMap // "YYYY-MM-DD" -> ["HH:MM", ...] local wall-clock
  slots_error: string | null
}

/** { "YYYY-MM-DD": ["HH:MM", ...] } — local wall-clock, no fallback agenda. */
export type SlotMap = Record<string, string[]>

/**
 * Exceptions, and ONLY exceptions. Key = calendar_id.
 *   label -> display alias when the GHL name doesn't fit the public
 *   hide  -> not shown on the page (e.g. 1:1, private assessment)
 * A calendar without an entry here shows normally, under its own GHL name.
 * Starts EMPTY on a new academy; only filled when someone asks.
 */
export const PROGRAM_OVERRIDES: Record<string, { label?: string; hide?: true }> = {}

/** Display alias is visual only — webhooks always carry the raw GHL name. */
export function displayName(program: Program): string {
  return PROGRAM_OVERRIDES[program.calendar_id]?.label ?? program.name
}

/** Fixed across academies. */
export const BOOKING_RANGE_DAYS = 14

export const ACADEMY_ADDRESS = {
  street: '12750 NW 17th St Unit 108',
  city: 'Miami, FL 33182',
  mapsUrl: 'https://maps.app.goo.gl/exKEsQ7as1skFAUw7',
}

export const ACADEMY_PHONE = '(786) 722-6008'
export const ACADEMY_PHONE_HREF = 'tel:+17867226008'

/* ------------------------------------------------------------------ *
 * Date helpers — all LOCAL, never toISOString()
 * ------------------------------------------------------------------ */

/** `YYYY-MM-DD` from local y/m/d. toISOString() would shift the day. */
export function isoDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function getBookingWindow() {
  const now = new Date()
  const min = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const max = new Date(min)
  max.setDate(max.getDate() + BOOKING_RANGE_DAYS)
  return { min, max }
}

export function getTimesForDay(slots: SlotMap, date: Date): string[] {
  return slots[isoDate(date)] ?? []
}

export function isDateBookable(slots: SlotMap, date: Date): boolean {
  const { min, max } = getBookingWindow()
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  if (day < min || day > max) return false
  return getTimesForDay(slots, day).length > 0
}

export function getFirstBookableDate(slots: SlotMap): Date | null {
  const { min, max } = getBookingWindow()
  for (let d = new Date(min); d <= max; d.setDate(d.getDate() + 1)) {
    if (getTimesForDay(slots, d).length > 0) {
      return new Date(d.getFullYear(), d.getMonth(), d.getDate())
    }
  }
  return null
}

/** "18:00" -> "6:00 PM". Produces `appointment_time` (n8n Luxon needs 12h + AM/PM). */
export function formatTimeLabel(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${String(m).padStart(2, '0')} ${suffix}`
}

export function formatDateLong(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
