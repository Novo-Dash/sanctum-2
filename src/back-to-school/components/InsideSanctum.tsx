import { CTA_BTS, GALLERY, INSIDE } from '../data'
import { CtaButton } from './CtaButton'

/**
 * The room itself. An uneven mosaic, one frame arched, so the gallery reads as
 * a wall of family photographs rather than a grid of tiles.
 */
export function InsideSanctum() {
  const [a, b, c, d, e, f] = GALLERY

  return (
    <section className="bg-paper-raised py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <h2 className="bts-h2 text-ink" data-bts-lines>
          {INSIDE.headline}
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-12 md:gap-5">
          <figure className="bts-arch col-span-2 aspect-[3/4] bg-sand md:col-span-4" data-bts-reveal>
            <Photo photo={a} />
          </figure>

          <div className="col-span-2 flex flex-col gap-4 md:col-span-5 md:gap-5">
            <figure className="aspect-[3/2] overflow-hidden rounded-card bg-sand" data-bts-reveal>
              <Photo photo={b} />
            </figure>
            <figure
              className="aspect-[4/3] flex-1 overflow-hidden rounded-card bg-sand"
              data-bts-reveal
            >
              <Photo photo={c} />
            </figure>
          </div>

          <figure
            className="col-span-1 aspect-[3/4] overflow-hidden rounded-card bg-sand md:col-span-3 md:aspect-auto"
            data-bts-reveal
          >
            <Photo photo={d} />
          </figure>

          {/* bottom row: two different widths, one shared height so the row closes */}
          <figure
            className="col-span-1 aspect-[3/4] overflow-hidden rounded-card bg-sand md:col-span-7 md:aspect-auto md:h-[22rem]"
            data-bts-reveal
          >
            <Photo photo={e} />
          </figure>

          <figure
            className="col-span-2 aspect-[3/2] overflow-hidden rounded-card bg-sand md:col-span-5 md:aspect-auto md:h-[22rem]"
            data-bts-reveal
          >
            <Photo photo={f} />
          </figure>
        </div>

        <div className="mt-12" data-bts-reveal>
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
