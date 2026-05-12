import { useEffect, useRef } from 'react'
import { animate, stagger } from 'motion'
import MagneticButton from './MagneticButton'

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const words = el.querySelectorAll<HTMLElement>('[data-reveal-word]')
    const meta = el.querySelectorAll<HTMLElement>('[data-reveal-meta]')
    const cta = el.querySelector<HTMLElement>('[data-reveal-cta]')
    const grid = el.querySelectorAll<HTMLElement>('[data-reveal-grid]')

    if (words.length === 0) return

    animate(
      words,
      { transform: ['translateY(50px)', 'translateY(0px)'], opacity: [0, 1] },
      { duration: 1.0, delay: stagger(0.08, { startDelay: 0.2 }), ease: [0.16, 1, 0.3, 1] },
    )
    animate(
      meta,
      { opacity: [0, 1], transform: ['translateY(8px)', 'translateY(0px)'] },
      { duration: 0.8, delay: stagger(0.04, { startDelay: 1.0 }), ease: [0.16, 1, 0.3, 1] },
    )
    animate(
      grid,
      { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
      { duration: 0.9, delay: stagger(0.08, { startDelay: 1.4 }), ease: [0.16, 1, 0.3, 1] },
    )
    if (cta) {
      animate(
        cta,
        { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
        { duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] },
      )
    }
  }, [])

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative min-h-screen overflow-hidden pt-28 md:pt-32"
    >
      {/* Top editorial strip */}
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10">
        <div
          data-reveal-meta
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute opacity-0"
        >
          Portföy <span className="mx-2 text-blood">●</span> İstanbul, Türkiye
        </div>
        <div
          data-reveal-meta
          className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-mute opacity-0 sm:block"
        >
          Mobil Mühendis · Flutter / Firebase
        </div>
      </div>

      {/* Main display headline */}
      <div className="mx-auto mt-14 max-w-[1600px] px-5 md:mt-20 md:px-10">
        <h1 className="font-display text-balance text-[8.5vw] leading-[1.05] tracking-[-0.03em] md:text-[6.4vw] lg:text-[5.8vw]">
          <span data-reveal-word className="inline-block opacity-0">Mobil</span>{' '}
          <span
            data-reveal-word
            className="inline-block italic opacity-0 wonk"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 90, "WONK" 1, "wght" 380' }}
          >
            ürünleri
          </span>
          <br />
          <span data-reveal-word className="inline-block opacity-0">fikirden</span>{' '}
          <span
            data-reveal-word
            className="inline-block opacity-0"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 700' }}
          >
            mağazaya
          </span>
          <br />
          <span data-reveal-word className="inline-block opacity-0">tek elden</span>{' '}
          <span
            data-reveal-word
            className="inline-block italic opacity-0"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "wght" 400' }}
          >
            kuruyorum<span className="inline-block not-italic text-blood ml-[0.16em] translate-y-[0.08em]">.</span>
          </span>
        </h1>
      </div>

      {/* Sub-line + CTAs */}
      <div className="mx-auto mt-12 flex max-w-[1600px] flex-col gap-7 px-5 md:mt-16 md:flex-row md:items-end md:justify-between md:px-10">
        <p
          data-reveal-meta
          className="max-w-md text-[14.5px] leading-[1.55] text-ink/70 opacity-0 md:text-[15.5px]"
        >
          Web ve mobil tarafta uçtan uca ürün geliştiren bir yazılım geliştiricisiyim.
          Tasarımdan kodlamaya, mağaza yayınından bakım sürecine kadar bir ürünü
          baştan sona kurarım. Şu an <span className="text-ink underline-link">BaremCars</span>
          {' '}bünyesinde aktif olarak çalışıyorum.
        </p>

        <div
          data-reveal-cta
          className="flex flex-wrap items-center gap-4 opacity-0"
        >
          <MagneticButton
            as="a"
            href="#contact"
            data-cursor="hover"
            className="group relative inline-flex items-center gap-3 rounded-full border border-ink bg-ink px-6 py-3.5 text-bone hover:bg-blood hover:border-blood transition-colors duration-500"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em]">Konuşalım</span>
            <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#works"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 px-2 py-3.5"
            strength={0.2}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] underline-link">Çalışmaları gör</span>
          </MagneticButton>
        </div>
      </div>

      {/* Bottom editorial info grid */}
      <div className="mx-auto mt-16 max-w-[1600px] border-t border-ink/15 px-5 md:mt-24 md:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 py-7 md:grid-cols-3 md:gap-x-10">
          <div data-reveal-grid className="opacity-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">Şu an</div>
            <div className="mt-2 text-[15px] leading-tight">
              <span className="block">BaremCars</span>
              <span className="block text-ink/60">Tam zamanlı görevdeyim</span>
            </div>
          </div>
          <div data-reveal-grid className="opacity-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">Konum</div>
            <div className="mt-2 text-[15px] leading-tight">
              <span className="block">İstanbul, Türkiye</span>
              <span className="block text-ink/60">41° 0' N, 28° 58' E</span>
            </div>
          </div>
          <div data-reveal-grid className="opacity-0 col-span-2 md:col-span-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">Alan</div>
            <div className="mt-2 text-[15px] leading-tight">
              <span className="block">Web ve mobil ürün geliştirme</span>
              <span className="block text-ink/60">Tasarımdan yayına, uçtan uca</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-5 right-5 hidden flex-col items-center gap-3 md:right-10 md:flex">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute"
          style={{ writingMode: 'vertical-rl' }}
        >
          kaydır
        </span>
        <span aria-hidden className="h-12 w-px bg-ink/30">
          <span className="block h-3 w-px animate-[bounce_1.5s_ease-in-out_infinite] bg-ink" />
        </span>
      </div>
    </section>
  )
}
