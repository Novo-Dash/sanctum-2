/**
 * Motion for the Back to School route — GSAP 3 + ScrollTrigger, MOTION_INTENSITY 5.
 *
 * Every animation here has a job, and only four exist:
 *   1. Hero headline rises out of a mask  -> hierarchy: the promise to the parent lands first.
 *   2. Sections fade/rise on entry        -> storytelling: the page arrives at reading pace.
 *   3. Hero arches drift on scroll        -> depth: the doorway keeps its dimension.
 *   4. The steps spine draws itself       -> progression: three steps, in order.
 *
 * No preloader, no pinning, no scroll hijack, no magnetic cursor: the brief is
 * calm, and a page for anxious parents should not perform.
 *
 * Nothing animates layout properties — transform and opacity only. Reduced
 * motion gets the finished page instantly via the matchMedia branch below.
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DUR = { fast: 0.4, base: 0.7, slow: 1.1 }
const EASE = { out: 'power3.out', expo: 'expo.out' }
const STAGGER = { tight: 0.05, base: 0.09 }

/** Wraps every word in a mask so the line can rise out of nothing. */
function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.btsSplit === 'done') {
    return Array.from(el.querySelectorAll<HTMLElement>('.bts-word > span'))
  }
  const source = Array.from(el.childNodes)
  const frag = document.createDocumentFragment()

  const pushText = (text: string) => {
    for (const word of text.split(/(\s+)/)) {
      if (!word) continue
      if (/^\s+$/.test(word)) {
        frag.appendChild(document.createTextNode(' '))
        continue
      }
      const outer = document.createElement('span')
      outer.className = 'bts-word'
      const inner = document.createElement('span')
      inner.textContent = word
      outer.appendChild(inner)
      frag.appendChild(outer)
    }
  }

  for (const node of source) {
    if (node.nodeType === Node.TEXT_NODE) {
      pushText(node.textContent ?? '')
    } else if (node instanceof HTMLElement) {
      // Inline emphasis (the accented brand name, the circled word) rides along
      // unmasked: the annotation drawn around it must not be clipped.
      const outer = document.createElement('span')
      outer.className = 'bts-word bts-word--free'
      const inner = node.cloneNode(true) as HTMLElement
      inner.style.display = 'inline-block'
      outer.appendChild(inner)
      frag.appendChild(outer)
      frag.appendChild(document.createTextNode(' '))
    }
  }

  el.replaceChildren(frag)
  el.dataset.btsSplit = 'done'
  return Array.from(el.querySelectorAll<HTMLElement>('.bts-word > span'))
}

/** Scatters the third node's confetti once the timeline reaches it. */
function burst(sparks: HTMLElement[]) {
  sparks.forEach((spark, i) => {
    const angle = ((i / sparks.length) * 360 - 90) * (Math.PI / 180)
    const distance = 42 + (i % 3) * 18
    gsap.fromTo(
      spark,
      { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 },
      {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotation: 200,
        scale: 0.3,
        opacity: 0,
        duration: 0.85 + (i % 4) * 0.09,
        ease: 'power2.out',
      }
    )
  })
}

/** Everything visible, no movement: the reduced-motion and failure state. */
function showEverything(root: ParentNode) {
  root.querySelectorAll<HTMLElement>('[data-bts-reveal]').forEach((el) => {
    el.style.opacity = '1'
    el.style.transform = 'none'
  })
  root.querySelectorAll<HTMLElement>('.bts-word > span').forEach((el) => {
    el.style.transform = 'none'
  })
  root.querySelectorAll<HTMLElement>('[data-bts-fill]').forEach((fill) => {
    fill.style.transform = 'scaleX(1)'
  })
  root.querySelectorAll<HTMLElement>('.bts-spark').forEach((spark) => {
    spark.style.opacity = '0'
  })
}

/** Call once the page is mounted. Returns the teardown. */
export function initMotion(root: HTMLElement): () => void {
  try {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: reduce)', () => {
      showEverything(root)
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      /* 1. Headlines rise out of their mask. The hero plays on load; the rest
            play when they reach the reading line. */
      root.querySelectorAll<HTMLElement>('[data-bts-lines]').forEach((el) => {
        const words = splitWords(el)
        const immediate = el.dataset.btsLines === 'immediate'
        // The CSS start state is translateY(105%), which GSAP resolves to a px
        // offset. Restate it as yPercent so the tween has something to undo.
        gsap.set(words, { yPercent: 105, y: 0 })
        gsap.to(words, {
          yPercent: 0,
          duration: DUR.slow,
          ease: EASE.expo,
          stagger: STAGGER.tight,
          delay: immediate ? 0.15 : 0,
          scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 88%', once: true },
        })
      })

      /* 2. Section content arrives. Batched so a grid of six values is one
            tween, not six triggers. */
      const revealables = gsap.utils.toArray<HTMLElement>('[data-bts-reveal]')
      gsap.set(revealables, { opacity: 0, y: 26 })

      const immediateReveals = revealables.filter((el) => el.dataset.btsReveal === 'immediate')
      if (immediateReveals.length > 0) {
        gsap.to(immediateReveals, {
          opacity: 1,
          y: 0,
          duration: DUR.base,
          ease: EASE.out,
          stagger: STAGGER.base,
          delay: 0.3,
        })
      }

      ScrollTrigger.batch('[data-bts-reveal]:not([data-bts-reveal="immediate"])', {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: DUR.base,
            ease: EASE.out,
            stagger: STAGGER.base,
            overwrite: true,
          }),
      })

      /* 3. Depth on the hero arches — a few percent, nothing showy. */
      gsap.utils.toArray<HTMLElement>('[data-bts-parallax]').forEach((el) => {
        const depth = Number(el.dataset.btsParallax) || 0.12
        gsap.to(el, {
          yPercent: -depth * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      })

      /* 4. The spine of "How to get started" draws as the reader descends. */
      root.querySelectorAll<SVGPathElement>('[data-bts-spine] path').forEach((path) => {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: path.closest('[data-bts-spine]') as Element,
            start: 'top 75%',
            end: 'bottom 65%',
            scrub: 0.6,
          },
        })
      })

      /* 5. The hero arch cycles through the academy's own frames, so the
            doorway is never the same photo twice on a second visit. */
      root.querySelectorAll<HTMLElement>('[data-bts-carousel]').forEach((box) => {
        const slides = Array.from(box.querySelectorAll<HTMLElement>('.bts-slide'))
        if (slides.length < 2) return
        gsap.set(slides, { opacity: 0 })
        gsap.set(slides[0], { opacity: 1 })
        const tl = gsap.timeline({ repeat: -1 })
        slides.forEach((slide, i) => {
          const next = slides[(i + 1) % slides.length]
          tl.to(slide, { opacity: 0, duration: 1.1, ease: 'power2.inOut' }, '+=3.4').to(
            next,
            { opacity: 1, duration: 1.1, ease: 'power2.inOut' },
            '<'
          )
        })
      })

      /* 6. The small arch breathes. It is the only perpetual motion on the
            page and it is barely there on purpose. */
      gsap.utils.toArray<HTMLElement>('[data-bts-sway]').forEach((el, i) => {
        gsap.to(el, {
          y: -9,
          rotation: 1.1,
          duration: 3.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.4,
        })
      })

      /* 7. The steps timeline fills as the reader descends, and the third
            node goes off when it arrives: the sequence has a finish line. */
      root.querySelectorAll<HTMLElement>('[data-bts-track]').forEach((track) => {
        const fill = track.querySelector<HTMLElement>('[data-bts-fill]')
        const sparks = Array.from(track.querySelectorAll<HTMLElement>('.bts-spark'))
        if (!fill) return
        let fired = false
        gsap.to(fill, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: track,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.5,
            onUpdate: (self) => {
              if (!fired && self.progress > 0.98) {
                fired = true
                burst(sparks)
              }
            },
          },
        })
      })

      return () => {
        showEverything(root)
      }
    })

    // Late-loading images change every trigger's position.
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    void document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      window.removeEventListener('load', onLoad)
      mm.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  } catch (error) {
    // A page that renders nothing is worse than a page that does not animate.
    console.warn('[bts] motion failed to start, showing the static page', error)
    showEverything(root)
    return () => {}
  }
}

/** Called after the gallery/photos settle so triggers re-measure. */
export function refreshMotion() {
  ScrollTrigger.refresh()
}
