import { useEffect, useRef } from 'react'
import { BookingModal } from '@/booking/booking-modal'
import { BookingProvider } from '@/booking/booking-provider'
import { CommonQuestions } from './components/CommonQuestions'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowToSchedule } from './components/HowToSchedule'
import { InsideSanctum } from './components/InsideSanctum'
import { RightFit } from './components/RightFit'
import { SiteFooter } from './components/SiteFooter'
import { Students } from './components/Students'
import { WhyJiuJitsu } from './components/WhyJiuJitsu'
import { initMotion } from './motion'

export function BackToSchoolPage() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!root.current) return
    return initMotion(root.current)
  }, [])

  return (
    <BookingProvider>
      <div ref={root} className="bg-paper">
        <Header />

        <main id="bts-main">
          <Hero />
          <WhyJiuJitsu />
          <Students />
          <HowToSchedule />
          <RightFit />
          <InsideSanctum />
          <CommonQuestions />
        </main>

        <SiteFooter />
        <BookingModal />
      </div>
    </BookingProvider>
  )
}
