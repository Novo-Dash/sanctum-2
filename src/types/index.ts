export interface Program {
  id: string
  title: string
  ageRange: string
  description: string
  bullets: string[]
  ctaLabel: string
  ctaTag: 'kids' | 'adults' | 'both'
}

export interface Testimonial {
  id: string
  name: string
  initial: string
  avatarColor: string
  rating: 5
  timeAgo: string
  text: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface ScheduleSlot {
  day: string
  time: string
  programType: 'kids' | 'adults' | 'all'
  label: string
}

export interface WhyUsItem {
  id: string
  title: string
  description: string
  icon: 'family' | 'expert' | 'safe' | 'levels'
}

export interface ModalStep {
  step: 'form' | 'loading' | 'success' | 'error'
}

export interface LeadFormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  programInterest: 'kids' | 'adults' | 'both'
  howDidYouHear: string
  website: string
}

export interface UTMParams {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
}
