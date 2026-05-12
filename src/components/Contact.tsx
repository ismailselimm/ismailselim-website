import { useEffect, useRef, useState } from 'react'
import { inView, animate } from 'motion'
import MagneticButton from './MagneticButton'

const EMAIL = 'ismailselimgarip@gmail.com'

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ismailselimm/', handle: '@ismailselimm' },
  { label: 'GitHub', href: 'https://github.com/ismailselimm', handle: '@ismailselimm' },
  { label: 'Instagram', href: 'https://www.instagram.com/ismail.selimm/', handle: '@ismail.selimm' },
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const cleanup = inView(el, () => {
      const lines = el.querySelectorAll<HTMLElement>('[data-line]')
      animate(
        lines,
        { transform: ['translateY(50px)', 'translateY(0px)'], opacity: [0, 1] },
        { duration: 1.0, delay: (i) => i * 0.08, ease: [0.16, 1, 0.3, 1] },
      )
    })
    return cleanup
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // ignore
    }
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="relative bg-ink text-bone px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex items-baseline justify-between md:mb-20">
          <h2
            data-line
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/60 opacity-0"
          >
            <span className="text-blood">§</span> 04 — İletişim
          </h2>
          <span data-line className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40 opacity-0">
            yanıt 24 saat içinde
          </span>
        </div>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          <div className="md:col-span-8">
            <p
              data-line
              className="font-display text-[10vw] leading-[0.95] tracking-[-0.035em] opacity-0 md:text-[6vw] lg:text-[5.4vw]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "wght" 380' }}
            >
              <span className="block">Bir fikrin mi</span>
              <span
                className="block italic"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1, "wght" 400' }}
              >
                var?
              </span>
              <span className="block">
                <a
                  href={`mailto:${EMAIL}`}
                  data-cursor="hover"
                  className="underline-link text-blood"
                >
                  Konuşalım.
                </a>
              </span>
            </p>

            <div data-line className="mt-12 flex flex-wrap items-center gap-4 opacity-0">
              <MagneticButton
                as="a"
                href={`mailto:${EMAIL}?subject=Merhaba%20%C4%B0smail`}
                data-cursor="hover"
                className="group inline-flex items-center gap-3 rounded-full bg-bone px-6 py-3.5 text-ink hover:bg-blood hover:text-bone transition-colors duration-500"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em]">E-posta gönder</span>
                <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
              </MagneticButton>

              <button
                type="button"
                onClick={copy}
                data-cursor="hover"
                className="group inline-flex items-center gap-3 rounded-full border border-bone/30 px-6 py-3.5 hover:border-bone transition-colors"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
                  {copied ? 'Kopyalandı ✓' : 'E-postayı kopyala'}
                </span>
              </button>
            </div>

            <div data-line className="mt-8 font-mono text-[12px] tracking-[0.1em] text-bone/55 opacity-0">
              {EMAIL}
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4">
            <div data-line className="opacity-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45">
                Sosyal
              </div>
              <ul className="mt-6 space-y-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="group flex items-baseline justify-between gap-4 border-b border-bone/15 py-3 transition-colors hover:border-bone"
                    >
                      <span
                        className="font-display text-2xl transition-transform duration-500 group-hover:translate-x-1.5"
                        style={{ fontVariationSettings: '"opsz" 96, "SOFT" 30, "wght" 380' }}
                      >
                        {s.label}
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.15em] text-bone/55">
                        {s.handle} ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div data-line className="mt-12 opacity-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45">
                Konum
              </div>
              <div className="mt-4 text-[15px] leading-[1.55]">
                <p>İstanbul, Türkiye</p>
                <p className="text-bone/55">UTC +3 / GMT+3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
