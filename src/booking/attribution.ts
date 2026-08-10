/**
 * Marketing attribution (UTMs) — captured from the landing URL and attached to
 * Webhook 1 only (the CRM is where attribution lives; Webhook 2 has a critical
 * schema we don't touch). First-touch, persisted in sessionStorage.
 */

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
const STORAGE_KEY = 'nd_attribution'

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
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (isUsable(value)) out[key] = value.trim()
  }
  return out
}

/** Call once at app boot, before SPA navigation can wipe the query string. */
export function captureAttribution() {
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
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Record<string, string>
  } catch {
    // ignore and fall through to the live URL
  }
  return readFromUrl()
}
