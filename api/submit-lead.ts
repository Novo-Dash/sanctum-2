import type { VercelRequest, VercelResponse } from '@vercel/node'

const RATE_LIMIT_MAP = new Map<string, number>()
const RATE_LIMIT_MS = 5000

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? 'unknown'
  const lastSubmit = RATE_LIMIT_MAP.get(ip) ?? 0
  if (Date.now() - lastSubmit < RATE_LIMIT_MS) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' })
  }
  RATE_LIMIT_MAP.set(ip, Date.now())

  const webhookUrl = process.env.GHL_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('[submit-lead] GHL_WEBHOOK_URL not configured')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  const body = req.body as Record<string, unknown>

  // Honeypot check
  if (body.website) {
    return res.status(200).json({ success: true })
  }

  const payload = {
    first_name: body.firstName,
    last_name: body.lastName,
    phone: body.phone,
    email: body.email,
    source: 'sanctum-lp',
    tags: ['sanctum-lp'],
    custom_fields: {
      program_interest: body.programInterest,
      how_did_you_hear: body.howDidYouHear,
    },
    utm_source: body.utm_source,
    utm_medium: body.utm_medium,
    utm_campaign: body.utm_campaign,
    utm_term: body.utm_term,
    utm_content: body.utm_content,
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error('[submit-lead] GHL webhook error', response.status)
      return res.status(502).json({ error: 'Failed to submit. Please call us directly.' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[submit-lead] fetch error', err)
    return res.status(500).json({ error: 'Network error. Please try again.' })
  }
}
