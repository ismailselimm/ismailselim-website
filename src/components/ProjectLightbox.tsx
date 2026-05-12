import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Project } from '../types'

type Props = {
  project: Project
  onClose: () => void
}

export default function ProjectLightbox({ project, onClose }: Props) {
  const [index, setIndex] = useState(0)
  const slides = project.gallery.length > 0 ? project.gallery : [project.cover]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % slides.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + slides.length) % slides.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [slides.length, onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[200] flex flex-col bg-ink/95 backdrop-blur-sm text-bone"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-full w-full flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <header className="flex items-center justify-between border-b border-bone/15 px-5 py-4 md:px-10">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone/50">{project.index}</span>
              <h2
                className="font-display text-2xl md:text-3xl"
                style={{ fontVariationSettings: '"opsz" 96, "SOFT" 30, "wght" 400' }}
              >
                {project.title}
              </h2>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-bone/40 md:inline">
                {project.year}
              </span>
            </div>
            <button
              onClick={onClose}
              data-cursor="hover"
              className="rounded-full border border-bone/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] hover:border-bone hover:bg-bone hover:text-ink transition-colors"
            >
              kapat ✕
            </button>
          </header>

          {/* Body */}
          <div className="flex flex-1 flex-col overflow-y-auto md:flex-row">
            {/* Gallery */}
            <div className="relative flex-1 overflow-hidden bg-ink-2">
              <div className="relative flex h-[55vh] items-center justify-center p-6 md:h-full">
                <img
                  key={slides[index]}
                  src={slides[index]}
                  alt={`${project.title} ${index + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {slides.length > 1 && (
                <>
                  <button
                    onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
                    data-cursor="hover"
                    aria-label="Önceki"
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-bone/30 px-3 py-2 font-mono text-xs hover:bg-bone hover:text-ink"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setIndex((i) => (i + 1) % slides.length)}
                    data-cursor="hover"
                    aria-label="Sonraki"
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-bone/30 px-3 py-2 font-mono text-xs hover:bg-bone hover:text-ink"
                  >
                    →
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.2em] text-bone/60">
                    {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                  </div>
                </>
              )}
            </div>

            {/* Details */}
            <aside className="w-full shrink-0 border-t border-bone/15 px-5 py-8 md:w-[380px] md:border-l md:border-t-0 md:px-8">
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45">Özet</div>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">{project.subtitle}</p>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45">Rol</div>
                  <p className="mt-2 text-[14.5px]">{project.role}</p>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45">Stack</div>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-bone/20 px-2.5 py-1 text-[12px] font-mono uppercase tracking-[0.15em]"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45">Notlar</div>
                  <p className="mt-2 text-[14px] leading-[1.65] text-bone/75">{project.description}</p>
                </div>
                {project.link && (
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-ink hover:bg-blood hover:text-bone transition-colors"
                  >
                    {project.link.label} →
                  </a>
                )}
              </div>
            </aside>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
