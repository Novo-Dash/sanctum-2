/**
 * Per-page booking configuration.
 *
 * The booking module is shared by every entry of this project (the main landing
 * page, /book and the Back to School campaign). Only two things legitimately
 * differ between them: the `source` label both webhooks carry, and which
 * programs the visitor is offered. Everything else — payload shape, calendars,
 * tracking — stays identical, and the Webhook 2 contract is untouched.
 *
 * Defaults reproduce the main landing page exactly, so an entry that never
 * calls configureBooking() behaves as it always has.
 */

import type { Audience } from './schedule'

export interface BookingConfig {
  /** `source` field of Webhook 1 and Webhook 2. */
  source: string
  /** When set, only programs of this audience are offered (null = all). */
  audience: Audience | null
}

const config: BookingConfig = {
  source: 'Landing Page - Main',
  audience: null,
}

/** Call once at entry boot, before <BookingForm /> mounts. */
export function configureBooking(next: Partial<BookingConfig>): void {
  Object.assign(config, next)
}

export function bookingConfig(): Readonly<BookingConfig> {
  return config
}
