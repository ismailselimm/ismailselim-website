import { useEffect, useRef } from 'react'
import { inView, animate } from 'motion'
import { experiences, education } from '../data/experience'

export default function Experience() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const cleanup = inView(el, () => {
      const lines = el.querySelectorAll<HTMLElement>('[data-line]')
      animate(
        lines,
        { transform: ['translateY(40px)', 'translateY(0px)'], opacity: [0, 1] },
        { duration: 0.9, delay: (i) => i * 0.06, ease: [0.16, 1, 0.3, 1] },
      )
    })
    return cleanup
  }, [])

  return (
    <section
      ref={ref}
      id="cv"
      className="relative px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <h2
            data-line
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-mute opacity-0"
          >
            <span className="text-blood">§</span> 03 — Özgeçmiş
          </h2>
          <span
            data-line
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute opacity-0"
          >
            2021 — şimdi
          </span>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
          {/* Experience timeline */}
          <div className="md:col-span-8">
            <h3
              data-line
              className="font-display text-[5.5vw] leading-[0.95] tracking-[-0.03em] opacity-0 md:text-[2.4vw]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 400' }}
            >
              Deneyim<span className="inline-block text-blood ml-[0.16em] translate-y-[0.08em]">.</span>
            </h3>

            <ol className="mt-10 relative border-l border-ink/15 pl-6 md:pl-10">
              {experiences.map((exp, i) => (
                <li
                  key={`${exp.company}-${i}`}
                  data-line
                  className="relative pb-12 opacity-0 last:pb-0"
                >
                  {/* Marker */}
                  <span
                    aria-hidden
                    className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-bone md:-left-[12px] md:h-4 md:w-4 ${
                      exp.current ? 'bg-blood' : 'bg-ink'
                    }`}
                  />
                  {exp.current && (
                    <span
                      aria-hidden
                      className="absolute -left-[14px] top-0.5 inline-flex h-5 w-5 animate-ping rounded-full bg-blood opacity-40 md:-left-[19px] md:h-7 md:w-7"
                    />
                  )}

                  <div className="flex items-baseline justify-between gap-4">
                    <h4
                      className="font-display text-[4vw] leading-[1.1] md:text-[1.8vw]"
                      style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 400' }}
                    >
                      {exp.company}
                      {exp.current && (
                        <span className="ml-3 align-middle rounded-full border border-blood px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-blood">
                          ŞU AN
                        </span>
                      )}
                    </h4>
                    <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-mute md:inline">
                      {exp.dateRange}
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="text-[15px] italic text-ink/70">{exp.title}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute md:hidden">
                      {exp.dateRange}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-1.5">
                    {exp.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="relative pl-5 text-[14.5px] leading-[1.55] text-ink/75 before:absolute before:left-0 before:top-2.5 before:h-px before:w-3 before:bg-ink/30"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>

          {/* Education */}
          <div className="md:col-span-4">
            <h3
              data-line
              className="font-display text-[5.5vw] leading-[0.95] tracking-[-0.03em] opacity-0 md:text-[2.4vw]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 400' }}
            >
              Eğitim<span className="inline-block text-blood ml-[0.16em] translate-y-[0.08em]">.</span>
            </h3>
            <ol className="mt-10 space-y-8">
              {education.map((edu, i) => (
                <li key={i} data-line className="opacity-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
                    {edu.dateRange}
                  </div>
                  <div
                    className="mt-2 font-display text-[3.8vw] leading-[1.1] md:text-[1.3vw]"
                    style={{ fontVariationSettings: '"opsz" 96, "SOFT" 30, "wght" 400' }}
                  >
                    {edu.school}
                  </div>
                  <div className="mt-1 text-[14.5px] italic text-ink/65">{edu.program}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
