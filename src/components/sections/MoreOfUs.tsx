import { Section, SectionHeader, ImagePlaceholder } from '@/components/ui'

const GALLERY_IMAGES = [
  { id: 1, label: 'Kids BJJ class in session at Sanctum Academy Miami' },
  { id: 2, label: 'Adult training session at Sanctum Jiu Jitsu Miami' },
  { id: 3, label: 'Students and instructor on the mat at Sanctum BJJ' },
  { id: 4, label: 'Sanctum BJJ Academy training facility in Miami' },
  { id: 5, label: 'Prof. Roosevelt coaching a student at Sanctum' },
  { id: 6, label: 'Sanctum BJJ community photo — Miami family' },
]

export function MoreOfUs() {
  return (
    <Section id="more-of-us" aria-labelledby="gallery-heading" subtle>
      <SectionHeader
        id="gallery-heading"
        label="More of Us"
        title="Life at Sanctum"
        subtitle="See what training, community, and growth look like every single day."
        center
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {GALLERY_IMAGES.map((img) => (
          <ImagePlaceholder
            key={img.id}
            label={img.label}
            aspectRatio="4/3"
            className="w-full"
          />
        ))}
      </div>
    </Section>
  )
}
