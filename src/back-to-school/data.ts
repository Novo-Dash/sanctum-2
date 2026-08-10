/**
 * Every visible string of the campaign, verbatim from the client's copy deck
 * ("LP | Back to school — Modelo 1", Sanctum BJJ). Nothing here is invented:
 * no claims, no prices, no testimonials written by us. Kept in one file so the
 * copy can be diffed against the deck without reading the components.
 */

export const HERO = {
  headline: 'This school year, give your child confidence that goes beyond the classroom.',
  body: [
    'Children grow the most when they develop both body and character. ',
    'Sanctum BJJ',
    ' Back to School is the perfect opportunity for your child to develop lifelong values.',
  ] as const,
  cta: 'Book a free trial class',
}

/** The client wrote a different button label per section. Kept as written. */
export const CTA_BTS = 'Book a free back to school trial class'
export const CTA_SCHEDULE = 'SCHEDULE FREE BACK TO SCHOOL CLASS'

export const WHY = {
  headline:
    'Jiu-Jitsu is the safe choice for parents who want to reinforce the values already being taught at home.',
  values: [
    'Discipline that carries into school',
    'Respect for instructors, teammates, and others',
    'Confidence built through real progress',
    'Resilience after setbacks and challenges',
    'Emotional self-control under pressure',
    'Healthy habits that last for life',
  ],
}

export const STUDENTS = {
  headline: 'What some of Sanctum BJJ students are saying:',
}

export const SCHEDULE = {
  headline: 'How to get started?',
  steps: [
    { label: 'Step 1', text: 'Click the button and fill out the form.' },
    { label: 'Step 2', text: 'Choose your class type and pick a date & time on the calendar.' },
    { label: 'Step 3', text: "You'll get email and SMS confirmations with all the details." },
  ],
}

export const RIGHT_FIT = {
  headline: 'Is Brazilian Jiu-Jitsu the right fit for your child?',
  lead: "If you're looking for an activity that helps your child grow beyond the physical, the answer may be yes.",
  questions: [
    'Do you want your child to become more confident?',
    'Would you like them to develop more discipline and self-control?',
    'Are you looking for an activity that reinforces the values you teach at home?',
    'Do you want your child to learn how to handle challenges with resilience?',
    'Are you looking for a welcoming environment where they can make friends and have fun?',
  ],
  closing: [
    'If you answered ',
    'yes',
    ' to any of these questions, Brazilian Jiu-Jitsu could be exactly what your family is looking for.',
  ] as const,
}

export const INSIDE = {
  headline: 'Inside Sanctum BJJ',
}

export const FAQ = {
  headline: 'Common Questions',
  items: [
    {
      q: 'What is Sanctum BJJ Back to School?',
      a: 'Our Back to School program is the perfect opportunity for families to introduce their children to Brazilian Jiu-Jitsu with a free trial class and experience its benefits firsthand.',
    },
    {
      q: 'What is a trial class?',
      a: 'A trial class allows your child to experience a regular beginner-friendly class, meet the instructors, and see if Jiu-Jitsu is the right fit before enrolling.',
    },
    {
      q: 'Why should my child try a free class?',
      a: "It's a risk-free way to discover how Jiu-Jitsu can help your child build confidence while having fun.",
    },
    {
      q: 'Does my child need any prior experience?',
      a: 'Not at all. Our beginner-friendly classes are designed for children with no previous martial arts experience.',
    },
    {
      q: 'Is Jiu-Jitsu safe for kids?',
      a: "Yes. Children's classes are structured, supervised, and designed to teach techniques safely while respecting each child's age and development.",
    },
    {
      q: 'Will Jiu-Jitsu help my child with bullying?',
      a: 'Jiu-Jitsu helps children better prepare to deal with difficult situations while promoting respect and conflict avoidance.',
    },
    {
      q: 'How soon will I notice changes in my child?',
      a: 'Every child develops at their own pace, but many parents notice improvements after just a few weeks of consistent training.',
    },
  ],
}

export const FOOTER = {
  body: [
    'Sanctum BJJ',
    ' Back to School is the perfect opportunity to help your child start the new school year with more confidence. Click any button on this page to book a free trial class and experience the benefits of Brazilian Jiu-Jitsu firsthand.',
  ] as const,
  rights: '© 2026 All rights reserved.',
  by: 'Novo Dash',
}

/** The academy's own contact block and socials, as shipped on the main site. */
export const ACADEMY = {
  name: 'Sanctum Jiu Jitsu Academy',
  street: '12750 NW 17th St Unit 108',
  city: 'Miami, FL 33182',
  mapsUrl: 'https://maps.app.goo.gl/exKEsQ7as1skFAUw7',
  mapEmbed: 'https://maps.google.com/maps?q=Sanctum+BJJ+Miami&output=embed',
  phone: '+1 786 722 6008',
  phoneHref: 'tel:+17867226008',
  email: 'sanctumjiujitsu@gmail.com',
  instagram: 'https://www.instagram.com/sanctumjiujitsu?igsh=MTNjbHBzOG9oMWIzbQ==',
  facebook: 'https://www.facebook.com/profile.php?id=61575493373445',
  /** Google rating already published in the main site's structured data. */
  rating: '5.0',
  ratingCount: 23,
}

/** Real Google reviews, the same ones running on the academy's main site. */
export const REVIEWS = [
  {
    id: 'khrysselv',
    name: 'Khrysselv M.',
    text: "It's not only an academy, we are a family. My kids have grown so much since joining Sanctum, not just in Jiu-Jitsu, but in confidence and respect.",
  },
  {
    id: 'marina',
    name: 'Marina Q.',
    text: 'Sanctum has become an extension of our home. Professor Roosevelt and the whole team treat every student with care. Three years in and we keep coming back.',
  },
  {
    id: 'carlos',
    name: 'Carlos P.',
    text: 'My son has been training here for over a year. The improvement in his focus, discipline, and confidence has been remarkable. The coaches genuinely care.',
  },
  {
    id: 'ricky',
    name: 'Ricky M.',
    text: 'The balance of discipline and encouragement here is unlike any gym I have trained at. You feel challenged but never lost. This is the right place to grow.',
  },
  {
    id: 'sandra',
    name: 'Sandra L.',
    text: 'I was nervous to start but the environment here is incredibly welcoming. Professor Roosevelt takes his time with every beginner. Best decision I made this year.',
  },
  {
    id: 'ana',
    name: 'Ana B.',
    text: 'Fantastic academy. The classes are well structured for all levels and the community makes you feel at home from day one.',
  },
]

/** Photos of this academy only, re-cropped from the client's own gallery. */
export const GALLERY = [
  { src: '/imagens/bts/gal-1.webp', alt: 'A Sanctum coach guiding a young student on the mats' },
  { src: '/imagens/bts/gal-2.webp', alt: 'Kids class lined up in front of the Sanctum wall' },
  { src: '/imagens/bts/gal-3.webp', alt: 'Young students drilling together during a kids class' },
  { src: '/imagens/bts/gal-4.webp', alt: 'A Sanctum coach laughing with students after class' },
  { src: '/imagens/bts/gal-5.webp', alt: 'Parents watching a Sanctum kids class from the mat side' },
  { src: '/imagens/bts/gal-6.webp', alt: 'Two students practising a technique at Sanctum' },
]
