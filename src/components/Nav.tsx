import { useEffect, useState } from 'react'

const links = [
  { label: 'Hakkımda', href: '#about' },
  { label: 'Çalışmalar', href: '#works' },
  { label: 'Yetkinlik', href: '#stack' },
  { label: 'Özgeçmiş', href: '#cv' },
  { label: 'İletişim', href: '#contact' },
]

export default function Nav() {
  const [time, setTime] = useState<string>('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const tick = () => {
      const fmt = new Intl.DateTimeFormat('tr-TR', {
        timeZone: 'Europe/Istanbul',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      setTime(fmt.format(new Date()))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10">
        <a
          href="#hero"
          className="group flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em]"
        >
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blood opacity-50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blood" />
          </span>
          <span>İSG / 2026</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="underline-link font-mono text-[11px] uppercase tracking-[0.18em]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]">
          <span className="hidden sm:inline-block text-mute">İSTANBUL —</span>
          <span className="tabular-nums">{time}</span>
        </div>
      </div>
    </header>
  )
}
