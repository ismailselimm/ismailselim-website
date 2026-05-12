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
      {/* Giant wordmark */}
      <div className="border-t border-bone/15 pt-10">
        <div
          aria-hidden
          className="select-none whitespace-nowrap text-center font-display leading-none tracking-[-0.04em]"
          style={{
            fontSize: 'clamp(70px, 21vw, 360px)',
            fontVariationSettings: '"opsz" 144, "SOFT" 30, "wght" 400',
          }}
        >
          İSMAİL <span className="italic text-blood">SELİM</span> GARİP
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/50 md:grid-cols-4">
        <div>
          <div className="text-bone/35">© 2026</div>
          <div className="mt-1">Tüm hakları saklıdır</div>
        </div>
        <div>
          <div className="text-bone/35">İstanbul</div>
          <div className="mt-1 tabular-nums">{time}</div>
        </div>
        <div>
          <div className="text-bone/35">Build</div>
          <div className="mt-1">v2.0 / 2026.05</div>
        </div>
        <div className="text-right md:text-left">
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
