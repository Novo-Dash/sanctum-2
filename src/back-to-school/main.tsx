import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './bts.css'
import { captureAttribution } from '@/booking/attribution'
import { captureFbclid } from '@/booking/fb'
import { configureBooking } from '@/booking/config'
import { BackToSchoolPage } from './BackToSchoolPage'

// Runs at boot, before anything can strip the query string.
captureAttribution()
captureFbclid()

// Same webhooks, same calendars, same payload contract as the main site. Only
// the source label and the offered programs differ: this campaign is written
// for parents, so it books the kids calendars.
configureBooking({
  source: 'Landing Page - Back to School',
  audience: 'kids',
})

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <BackToSchoolPage />
  </StrictMode>
)
