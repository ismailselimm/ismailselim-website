import { useState, type FormEvent } from 'react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import SectionHeader from './SectionHeader'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maneoaav'

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ismailselimm/', handle: '@ismailselimm' },
  { label: 'GitHub', href: 'https://github.com/ismailselimm', handle: '@ismailselimm' },
  { label: 'Instagram', href: 'https://www.instagram.com/ismail.selimm/', handle: '@ismail.selimm' },
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const ref = useRevealOnScroll<HTMLElement>({ distance: 50, stagger: 0.08 })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          _replyto: email,
          _subject: subject || `Site üzerinden mesaj — ${name}`,
          message,
        }),
      })
      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'mt-2 w-full border-0 border-b border-bone/25 bg-transparent px-0 py-2.5 text-[15px] text-bone outline-none transition-colors placeholder:text-bone/35 focus:border-blood'
  const labelCls = 'font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45'

  return (
    <section
      ref={ref}
      id="contact"
      className="relative bg-ink text-bone px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader
          number="04"
          title="İletişim"
          meta="yanıt 24 saat içinde"
          tone="dark"
          className="mb-12 md:mb-20"
        />

        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          <div className="md:col-span-8">
            <p
              data-line
              className="font-display text-[7.5vw] leading-[0.95] tracking-[-0.035em] opacity-0 md:text-[4.4vw] lg:text-[4vw]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "wght" 380' }}
            >
              <span className="block">Bir fikrin mi</span>
              <span
                className="block italic"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1, "wght" 400' }}
              >
                var?
              </span>
              <span className="block text-blood">Konuşalım</span>
            </p>

            <form data-line onSubmit={submit} className="mt-12 max-w-[520px] space-y-7 opacity-0">
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={labelCls}>
                    Ad
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelCls}>
                    E-posta
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className={labelCls}>
                  Konu <span className="text-bone/30">(opsiyonel)</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={inputCls}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className={labelCls}>
                  Mesaj
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* Formspree honeypot — spam botlar bunu dolduracağı için işleme alınmaz */}
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  data-cursor="hover"
                  className="group inline-flex items-center gap-3 rounded-full bg-bone px-6 py-3.5 text-ink transition-colors duration-500 hover:bg-blood hover:text-bone disabled:cursor-wait disabled:opacity-60"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
                    {status === 'loading' ? 'Gönderiliyor…' : 'Mesajı gönder'}
                  </span>
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>

                {status === 'success' && (
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300">
                    ✓ İletildi — kısa zamanda dönerim
                  </span>
                )}
                {status === 'error' && (
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blood">
                    ✕ Hata oluştu — tekrar dener misin?
                  </span>
                )}
              </div>
            </form>
          </div>

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
