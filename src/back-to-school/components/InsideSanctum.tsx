import { CTA_BTS, GALLERY, INSIDE } from '../data'
import { CtaButton } from './CtaButton'
import { Tag, Tape } from './ui'

/**
 * The room itself. An uneven grid, one frame arched, everything drawn with the
 * same ink stroke and taped down, so it reads as a wall of family photographs
 * rather than a tidy tile grid.
 */
export function InsideSanctum() {
  const [a, b, c, d, e, f] = GALLERY

  return (
    <section className="bg-paper-raised py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div data-bts-reveal>
          <Tag>Our mats</Tag>
        </div>
        <h2 className="bts-h2 mt-5 text-ink" data-bts-lines>
          {INSIDE.headline}
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-12 md:gap-6">
          <figure
            className="bts-arch bts-ink relative col-span-2 aspect-[3/4] -rotate-[1deg] bg-sand md:col-span-4"
            data-bts-reveal
          >
            <Photo photo={a} />
          </figure>

          <div className="col-span-2 flex flex-col gap-5 md:col-span-5 md:gap-6">
            <figure
              className="bts-ink relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] bg-sand"
              data-bts-reveal
            >
              <Photo photo={b} />
            </figure>
            <figure
              className="bts-ink relative aspect-[4/3] flex-1 overflow-hidden rounded-[var(--radius-card)] bg-sand"
              data-bts-reveal
            >
              <Photo photo={c} />
            </figure>
          </div>

          <figure
            className="bts-ink relative col-span-1 aspect-[3/4] rotate-[1.2deg] overflow-hidden rounded-[var(--radius-card)] bg-sand md:col-span-3 md:aspect-auto"
            data-bts-reveal
          >
            <Photo photo={d} />
          </figure>

          {/* bottom row: two different widths, one shared height so the row closes */}
          <figure
            className="bts-ink relative col-span-1 aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] bg-sand md:col-span-7 md:aspect-auto md:h-[22rem]"
            data-bts-reveal
          >
            <Photo photo={e} />
          </figure>

          <figure
            className="bts-ink relative col-span-2 aspect-[3/2] -rotate-[0.8deg] overflow-hidden rounded-[var(--radius-card)] bg-sand md:col-span-5 md:aspect-auto md:h-[22rem]"
            data-bts-reveal
          >
            <Tape className="left-8 -top-3" rotate={-6} />
            <Photo photo={f} />
          </figure>
        </div>

        <div className="mt-14 flex justify-center" data-bts-reveal>
          <CtaButton label={CTA_BTS} />
        </div>
      </div>
    </section>
  )
}

function Photo({ photo }: { photo: { src: string; alt: string } }) {
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
    />
  )
}
