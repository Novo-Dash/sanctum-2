/**
 * Marketing attribution (UTMs + click ids + landing URL) — captured from the
 * landing URL and attached to Webhook 1 only (the CRM is where attribution
 * lives; Webhook 2 has a critical schema we don't touch). First-touch,
 * persisted in sessionStorage: params only store when the URL carries at
 * least one; landing_url/landing_referrer store on the session's first visit
 * even without any param.
 */

const PARAM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'fbclid',
  'gclid',
]
const STORAGE_KEY = 'nd_attribution'
const LANDING_KEY = 'nd_landing'
const LANDING_URL_MAX = 1000

/** GHL merge tags that never got substituted must not be stored. */
function isUsable(value: string | null): value is string {
  if (!value) return false
  const v = value.trim()
  return v.length > 0 && !v.includes('{{') && !v.includes('}}')
}

function readFromUrl(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const out: Record<string, string> = {}
  for (const key of PARAM_KEYS) {
    const value = params.get(key)
    if (isUsable(value)) out[key] = value.trim()
  }
  return out
}

/** Never strip the query string (it is the part that matters); cut from the end. */
function readLanding(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const out: Record<string, string> = {}
  out.landing_url = window.location.href.slice(0, LANDING_URL_MAX)
  if (isUsable(document.referrer)) out.landing_referrer = document.referrer
  return out
}

/** Call once at app boot, before SPA navigation can wipe the query string. */
export function captureAttribution() {
  try {
    if (!window.sessionStorage.getItem(LANDING_KEY)) {
      window.sessionStorage.setItem(LANDING_KEY, JSON.stringify(readLanding()))
    }
  } catch {
    // private mode / storage blocked — getAttribution() falls back to the URL
  }
  const fromUrl = readFromUrl()
  if (Object.keys(fromUrl).length === 0) return // no clobber on direct traffic
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return // first-touch wins
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl))
  } catch {
    // private mode / storage blocked — getAttribution() falls back to the URL
  }
}

export function getAttribution(): Record<string, string> {
  let params: Record<string, string> | null = null
  let landing: Record<string, string> | null = null
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (raw) params = JSON.parse(raw) as Record<string, string>
  } catch {
    // ignore and fall through to the live URL
  }
  try {
    const raw = window.sessionStorage.getItem(LANDING_KEY)
    if (raw) landing = JSON.parse(raw) as Record<string, string>
  } catch {
    // ignore and fall through to the live URL
  }
  const out = { ...(params ?? readFromUrl()), ...(landing ?? readLanding()) }
  if (out.landing_url) out.landing_url = out.landing_url.slice(0, LANDING_URL_MAX)
  return out
}

const META_SOURCES = new Set(['facebook', 'fb', 'instagram', 'ig', 'meta'])

/**
 * Dynamic CRM source: fbclid or a Meta utm_source -> "Landing Page - Meta
 * Ads"; gclid or a google utm_source (any medium, GMB counts as Google) ->
 * "Landing Page - Google"; otherwise the academy's fixed label.
 */
export function getSourceLabel(fallback: string): string {
  const attribution = getAttribution()
  const utmSource = (attribution.utm_source ?? '').trim().toLowerCase()
  if (attribution.fbclid || META_SOURCES.has(utmSource)) return 'Landing Page - Meta Ads'
  if (attribution.gclid || utmSource.includes('google')) return 'Landing Page - Google'
  return fallback
}
