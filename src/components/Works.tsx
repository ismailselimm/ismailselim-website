import { useEffect, useRef, useState } from 'react'
import { inView } from 'motion'
import { projects, otherWorkStats } from '../data/projects'
import type { Project } from '../types'
import Lightbox from './Lightbox'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import SectionHeader from './SectionHeader'

type LightboxState = {
  images: string[]
  startIndex: number
  title: string
} | null

const AUTOPLAY_MS = 2400
const POST_INTERACTION_PAUSE_MS = 5000

const ASPECT_MAP = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[16/10]',
  square: 'aspect-square',
} as const

export default function Works() {
  const ref = useRevealOnScroll<HTMLElement>({ distance: 50, stagger: 0.06 })
  const [lightbox, setLightbox] = useState<LightboxState>(null)

  return (
    <section
      ref={ref}
      id="works"
      className="relative bg-ink text-bone px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          number="02"
          title="Seçili Çalışmalar"
          meta="Öne çıkan 2 / 30+"
          tone="dark"
          className="mb-20 md:mb-32"
        />

        <div className="space-y-32 md:space-y-48">
          {projects.map((p, i) => (
            <FeaturedProject
              key={p.id}
              project={p}
              reverse={i % 2 === 1}
              onOpenGallery={(idx) => {
                if (!p.gallery || p.gallery.length === 0) return
                setLightbox({ images: p.gallery, startIndex: idx, title: p.title })
              }}
            />
          ))}
        </div>

        <div data-line className="mt-32 border-t border-bone/15 pt-14 opacity-0 md:mt-48">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45">
                Mobil uygulama
              </div>
              <div
                className="mt-3 font-display leading-none tracking-[-0.04em]"
                style={{
                  fontSize: 'clamp(56px, 10vw, 120px)',
                  fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 400',
                }}
              >
                {otherWorkStats.mobileApps.replace('+', '')}
                <span className="text-blood">+</span>
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45">
                Web sitesi
              </div>
              <div
                className="mt-3 font-display leading-none tracking-[-0.04em]"
                style={{
                  fontSize: 'clamp(56px, 10vw, 120px)',
                  fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 400',
                }}
              >
                {otherWorkStats.websites.replace('+', '')}
                <span className="text-blood">+</span>
              </div>
            </div>
            <div className="col-span-2 md:col-span-6 md:pt-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45">
                Notlar
              </div>
              <p className="mt-3 max-w-[460px] text-[14.5px] leading-[1.6] text-bone/70">
                {otherWorkStats.note}
              </p>
              <a
                href="#contact"
                data-cursor="hover"
                className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] underline-link"
              >
                Talep et / sor
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.startIndex}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  )
}

type FeaturedProps = {
  project: Project
  reverse: boolean
  onOpenGallery: (startIndex: number) => void
}

function FeaturedProject({ project, reverse, onOpenGallery }: FeaturedProps) {
  const aspect = project.coverAspect ?? 'square'
  const aspectClass = ASPECT_MAP[aspect]
  const fit = aspect === 'portrait' ? 'object-cover object-top' : 'object-cover'

  const images =
    project.gallery && project.gallery.length > 0 ? project.gallery : [project.cover]
  const hasGallery = images.length > 1

  const [activeIdx, setActiveIdx] = useState(0)
  const [hovering, setHovering] = useState(false)
  const pauseUntilRef = useRef(0)
  const stripRef = useRef<HTMLDivElement>(null)
  const articleRef = useRef<HTMLElement>(null)
  const inViewRef = useRef(false)

  // Pause autoplay when this card scrolls offscreen
  useEffect(() => {
    const el = articleRef.current
    if (!el) return
    return inView(el, () => {
      inViewRef.current = true
      return () => {
        inViewRef.current = false
      }
    })
  }, [])

  useEffect(() => {
    if (!hasGallery || hovering) return
    const id = window.setInterval(() => {
      if (!inViewRef.current) return
      if (Date.now() < pauseUntilRef.current) return
      setActiveIdx((i) => (i + 1) % images.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [hovering, hasGallery, images.length])

  // Scroll active thumb to center — STRIP'in kendi scroll'u, document'a dokunmuyor
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    // Strip horizontal olarak taşmıyorsa hiç scroll yapma
    if (strip.scrollWidth <= strip.clientWidth) return
    const active = strip.querySelector<HTMLElement>(`[data-idx="${activeIdx}"]`)
    if (!active) return
    const target = active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2
    strip.scrollTo({ left: target, behavior: 'smooth' })
  }, [activeIdx])

  const handleThumbClick = (i: number) => {
    setActiveIdx(i)
    pauseUntilRef.current = Date.now() + POST_INTERACTION_PAUSE_MS
  }

  return (
    <article ref={articleRef}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center md:gap-14">
        <div
          data-line
          className={`opacity-0 md:col-span-7 ${reverse ? 'md:order-2' : 'md:order-1'}`}
        >
          <div
            className="relative"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => onOpenGallery(activeIdx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onOpenGallery(activeIdx)
                }
              }}
              data-cursor="view"
              className={`group block w-full cursor-pointer overflow-hidden bg-bone/5 ${aspectClass}`}
              aria-label={`${project.title} galerisini aç`}
            >
              <div className="relative h-full w-full">
                {images.map((img, i) => (
                  <img
                    key={img}
                    src={img}
                    alt={`${project.title} ${i + 1}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className={`absolute inset-0 h-full w-full ${fit} transition-opacity duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      i === activeIdx ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}

                <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone mix-blend-difference md:left-5 md:top-5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-blood" />
                  <span>Yayında</span>
                </div>

                {hasGallery && (
                  <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.25em] text-bone mix-blend-difference md:right-5 md:top-5">
                    {String(activeIdx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                  </div>
                )}

                <div className="absolute right-4 bottom-3 z-20 font-mono text-[10px] uppercase tracking-[0.25em] text-bone mix-blend-difference md:right-5 md:bottom-5">
                  N° {project.index}
                </div>

                {/* Gradient gives thumb strip legibility on any image */}
                {hasGallery && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent md:h-40" />
                )}

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="flex flex-col items-center gap-2 text-bone">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                      {hasGallery ? `${images.length} görsel` : 'Önizleme'}
                    </span>
                    <span
                      className="font-display text-2xl italic md:text-3xl"
                      style={{ fontVariationSettings: '"opsz" 96, "SOFT" 100, "WONK" 1, "wght" 400' }}
                    >
                      {hasGallery ? 'galeriyi aç →' : 'siteyi aç →'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {hasGallery && (
              <div className="absolute inset-x-0 bottom-3 z-30 md:bottom-5">
                <div
                  ref={stripRef}
                  className="flex justify-start gap-1.5 overflow-x-auto scrollbar-hide px-3 md:gap-2 md:px-5 md:justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {images.map((img, i) => (
                    <button
                      key={img}
                      data-idx={i}
                      onClick={() => handleThumbClick(i)}
                      data-cursor="hover"
                      aria-label={`${i + 1}. görsele git`}
                      className={`relative aspect-[16/10] h-7 shrink-0 overflow-hidden bg-ink/40 backdrop-blur transition-all duration-500 md:h-10 ${
                        i === activeIdx
                          ? 'opacity-100 ring-2 ring-bone ring-offset-0'
                          : 'opacity-50 hover:opacity-90'
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasGallery && (
              <div className="pointer-events-none absolute right-4 bottom-12 z-20 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-bone/60 mix-blend-difference md:right-5 md:bottom-16">
                {hovering ? (
                  <>
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-bone" />
                    <span>duraklatıldı</span>
                  </>
                ) : (
                  <>
                    <span className="relative inline-flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blood opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blood" />
                    </span>
                    <span>oynatılıyor</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div
          data-line
          className={`opacity-0 md:col-span-5 ${reverse ? 'md:order-1' : 'md:order-2'}`}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood">
            {project.index} — Öne çıkan çalışma
          </div>

          <h3
            className="mt-5 font-display leading-[0.92] tracking-[-0.025em]"
            style={{
              fontSize: 'clamp(48px, 6vw, 90px)',
              fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 400',
            }}
          >
            {project.title}
          </h3>

          <p
            className="mt-4 italic text-bone/55"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 2vw, 24px)',
              fontVariationSettings: '"opsz" 96, "SOFT" 90, "WONK" 1, "wght" 380',
            }}
          >
            {project.tagline}
          </p>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/55">
            <span>{project.year}</span>
            <span className="text-bone/30">·</span>
            <span>{project.role}</span>
          </div>

          <p className="mt-7 max-w-[460px] text-[14.5px] leading-[1.6] text-bone/75">
            {project.description}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <ul className="mt-6 space-y-1.5 text-[13.5px] text-bone/65">
              {project.highlights.map((h, i) => (
                <li
                  key={i}
                  className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-px before:w-3 before:bg-blood/60"
                >
                  {h}
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-7 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-bone/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/75"
              >
                {s}
              </li>
            ))}
          </ul>

          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="group/cta mt-10 inline-flex items-center gap-3 border-b border-bone/30 pb-2 hover:border-blood"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.25em]">
              {project.link.label}
            </span>
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 group-hover/cta:translate-x-1.5"
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    </article>
  )
}
