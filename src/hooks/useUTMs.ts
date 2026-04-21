import { useEffect, useRef } from 'react'
import type { UTMParams } from '@/types'

const UTM_KEYS: (keyof UTMParams)[] = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
]

export function useUTMs(): UTMParams {
  const utms = useRef<UTMParams>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const stored = sessionStorage.getItem('sanctum_utms')

    if (stored) {
      utms.current = JSON.parse(stored) as UTMParams
      return
    }

    const captured: UTMParams = {
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
    }

    let hasAny = false
    for (const key of UTM_KEYS) {
      const val = params.get(key) ?? ''
      captured[key] = val
      if (val) hasAny = true
    }

    if (hasAny) {
      sessionStorage.setItem('sanctum_utms', JSON.stringify(captured))
      utms.current = captured
    }
  }, [])

  return utms.current
}
