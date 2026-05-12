import { useEffect, useRef, useState } from 'react'
import { inView, animate } from 'motion'
import { projects } from '../data/projects'
import type { Project } from '../types'
import ProjectLightbox from './ProjectLightbox'

export default function Works() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState<Project | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const cleanup = inView(el, () => {
      const lines = el.querySelectorAll<HTMLElement>('[data-line]')
      animate(
        lines,
        { transform: ['translateY(60px)', 'translateY(0px)'], opacity: [0, 1] },
        { duration: 1.0, delay: (i) => i * 0.06, ease: [0.16, 1, 0.3, 1] },
      )
    })
    return cleanup
  }, [])

  const isEmpty = projects.length === 0

  return (
    <section
      ref={ref}
      id="works"
      className="relative bg-ink text-bone px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex items-baseline justify-between md:mb-20">
          <h2
            data-line
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/60 opacity-0"
          >
            <span className="text-blood">§</span> 02 — Seçili Çalışmalar
          </h2>
          <span data-line className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40 opacity-0">
            {isEmpty ? 'Yeni vitrin hazırlanıyor' : `${projects.length} proje`}
          </span>
        </div>

        {isEmpty ? (
          <div data-line className="opacity-0">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-8">
                <p
                  className="font-display text-[8vw] leading-[1.02] tracking-[-0.03em] md:text-[5vw]"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80, "wght" 360' }}
                >
                  <span className="block">Yeni vitrin</span>
                  <span
                    className="block italic text-bone/55"
                    style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1' }}
                  >
                    hazırlanıyor.
                  </span>
                </p>
                <p className="mt-8 max-w-md text-[15px] leading-[1.6] text-bone/65">
                  Eski projeleri arşivledim; yenilerini özenle seçiyorum.
                  Görmek istediğin bir şey varsa{' '}
                  <a href="#contact" className="text-bone underline-link">
                    mesaj at
                  </a>
                  , birebir paylaşırım.
                </p>
              </div>

              <div className="md:col-span-4 md:flex md:items-end md:justify-end">
                <div className="flex flex-col gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/50">
                  <div className="flex items-center justify-between gap-10 border-b border-bone/15 pb-3">
                    <span>Durum</span>
                    <span className="flex items-center gap-2 text-bone">
                      <span className="relative inline-flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blood opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-blood" />
                      </span>
                      Hazırlanıyor
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-10 border-b border-bone/15 pb-3">
                    <span>Beklenen</span>
                    <span className="text-bone">Yakında</span>
                  </div>
                  <div className="flex items-center justify-between gap-10">
                    <span>Talep</span>
                    <a href="#contact" className="text-bone underline-link">Yaz / Sor</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ul
            className="relative divide-y divide-bone/10 border-y border-bone/10"
            onMouseLeave={() => setHoverIndex(null)}
          >
            {projects.map((p, i) => (
              <li
                key={p.id}
                data-line
                className="group relative opacity-0"
                onMouseEnter={() => setHoverIndex(i)}
              >
                <button
                  data-cursor="view"
                  onClick={() => setActive(p)}
                  className="flex w-full items-baseline justify-between gap-6 py-7 text-left transition-colors md:py-10"
                >
                  <div className="flex items-baseline gap-5 md:gap-8">
                    <span className="font-mono text-[11px] tracking-[0.25em] text-bone/50">{p.index}</span>
                    <h3
                      className="font-display text-[8.5vw] leading-[0.95] tracking-[-0.02em] md:text-[4.6vw] lg:text-[4vw] transition-all duration-500 group-hover:translate-x-2"
                      style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 380' }}
                    >
                      {p.title}
                    </h3>
                  </div>
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45 md:block">
                    {p.year} · {p.role}
                  </span>
                </button>

                {/* Floating preview image, follows hover */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute right-[8vw] top-1/2 hidden h-[22vw] w-[18vw] -translate-y-1/2 overflow-hidden bg-bone-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:block ${
                    hoverIndex === i
                      ? 'opacity-100 scale-100 rotate-0'
                      : 'opacity-0 scale-90 rotate-3'
                  }`}
                >
                  <img
                    src={p.cover}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {active && <ProjectLightbox project={active} onClose={() => setActive(null)} />}
    </section>
  )
}
