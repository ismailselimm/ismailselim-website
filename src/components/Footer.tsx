import { useEffect, useState } from 'react'

export default function Footer() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat('tr-TR', {
          timeZone: 'Europe/Istanbul',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date()),
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="bg-ink text-bone px-5 pb-10 md:px-10">
      {/* Wordmark — mobilde stack, sm+'dan itibaren inline */}
      <div className="overflow-hidden border-t border-bone/15 pt-10">
        <div
          aria-hidden
          className="select-none text-center font-display leading-[0.95] tracking-[-0.04em]"
          style={{
            fontSize: 'clamp(44px, 9vw, 140px)',
            fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 400',
          }}
        >
          <span className="block sm:inline">İSMAİL</span>
          {' '}
          <span className="block sm:inline italic text-blood">SELİM</span>
          {' '}
          <span className="block sm:inline">GARİP</span>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-7 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-bone/50 md:flex-row md:justify-center md:gap-16 md:gap-y-0">
        <div>
          <div className="text-bone/35">© 2026</div>
          <div className="mt-1">Tüm hakları saklıdır</div>
        </div>
        <div>
          <div className="text-bone/35">İstanbul</div>
          <div className="mt-1 tabular-nums">{time}</div>
        </div>
        <div>
          <div className="text-bone/35">Yapım</div>
          <div className="mt-1">
            <a
              href="https://github.com/ismailselimm/ismailselim-website"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-link"
            >
              Açık kaynak ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
