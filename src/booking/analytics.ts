/**
 * Tracking — Meta Pixel via fbq, GA4 + Google Ads via gtag. No GTM anywhere:
 * one path per event, or the platforms double-count — with ONE controlled
 * exception: every Meta event is mirrored server-side via /api/capi with the
 * SAME event_id, and Meta dedupes (spec §7.6). Every helper is guarded, so a
 * blank ID or blocked script is a silent no-op and never breaks the flow.
 *
 * IDs from novodash-tools.conversoes_tracking (Sanctum BJJ - Miami FL).
 */

import { getFbc, getFbp } from './fb'

/** Meta Pixel id — the SAME id as index.html's base snippet and api/capi.ts. */
export const PIXEL_ID = '2455099924870464'

export const GA4_ID = 'G-JFC4DENLZ2'
export const GOOGLE_ADS_ID = 'AW-16871202843'

const GADS_LEAD_LABEL = 'rc0BCIXi7tUcEJvA6Ow-'
const GADS_BOOKING_LABEL = 'Yiz0CIji7tUcEJvA6Ow-'

export const GADS_LEAD = GOOGLE_ADS_ID ? `${GOOGLE_ADS_ID}/${GADS_LEAD_LABEL}` : ''
export const GADS_BOOKING = GOOGLE_ADS_ID ? `${GOOGLE_ADS_ID}/${GADS_BOOKING_LABEL}` : ''

const CAPI_ENDPOINT = '/api/capi'

export interface IdentifyFields {
  name?: string
  email?: string
  phone?: string
}

/** Last identified visitor — enriches the following server-side events. PII
 *  travels in the clear ONLY to the first-party endpoint; SHA-256 happens
 *  there (§7.6.4). */
let identified: IdentifyFields = {}

function newEventId(): string {
  try {
    return crypto.randomUUID()
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`
  }
}

/**
 * Meta standard event — browser Pixel + CAPI mirror, same event_id (§7.6).
 * Allowed events: PageView, ViewContent, Lead, Schedule — no e-commerce.
 * The mirror goes out even when fbq is blocked: that's the case it covers.
 */
export function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const eventId = newEventId()
  if (typeof window.fbq === 'function') {
    window.fbq('track', event, params ?? {}, { eventID: eventId })
  }
  fetch(CAPI_ENDPOINT, {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event,
      event_id: eventId,
      params,
      url: window.location.href,
      fbp: getFbp(),
      fbc: getFbc(),
      user: identified,
    }),
  }).catch(() => {})
}

/** Advanced Matching (§7.6.4): remember the visitor for the mirrored events
 *  that follow, and hand the same fields to the Pixel (fbq hashes in-browser). */
export function identify(fields: IdentifyFields) {
  identified = { ...identified, ...fields }
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  const data: Record<string, string> = {}
  if (fields.email) data.em = fields.email.trim().toLowerCase()
  if (fields.phone) {
    const digits = fields.phone.replace(/\D/g, '')
    if (digits) data.ph = digits.length === 10 ? `1${digits}` : digits
  }
  if (fields.name) {
    const parts = fields.name.trim().toLowerCase().split(/\s+/)
    if (parts[0]) data.fn = parts[0]
    if (parts.length > 1) data.ln = parts.slice(1).join(' ')
  }
  if (Object.keys(data).length > 0) window.fbq('init', PIXEL_ID, data)
}

export function ga4Event(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  if (!GA4_ID) return
  window.gtag('event', event, params ?? {})
}

/** Google Ads conversion. No value/currency — the trial class is free. */
export function gtagConversion(sendTo: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  if (!sendTo) return
  window.gtag('event', 'conversion', { send_to: sendTo })
}

/** Enhanced Conversions — gtag hashes these itself before sending. */
export function setUserData(email: string, phoneE164: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('set', 'user_data', { email, phone_number: phoneE164 })
}
