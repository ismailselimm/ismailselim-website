import { useEffect, useRef } from 'react'
import { inView, animate } from 'motion'

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const cleanup = inView(el, () => {
      const lines = el.querySelectorAll<HTMLElement>('[data-line]')
      const photo = el.querySelector<HTMLElement>('[data-photo]')
      animate(
        lines,
        { transform: ['translateY(40px)', 'translateY(0px)'], opacity: [0, 1] },
        { duration: 1.0, delay: (i) => i * 0.08, ease: [0.16, 1, 0.3, 1] },
      )
      if (photo) {
        animate(
          photo,
          { transform: ['scale(0.9)', 'scale(1)'], opacity: [0, 1] },
          { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
        )
      }
    })
    return cleanup
  }, [])

  return (
    <section
      ref={ref}
      id="about"
      className="relative px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <h2
            data-line
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-mute opacity-0"
          >
            <span className="text-blood">§</span> 01 — Hakkımda
          </h2>
          <span data-line className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute opacity-0">
            ismailselim.dev
          </span>
        </div>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-12">
          {/* Pull quote */}
          <div className="md:col-span-7">
            <p
              data-line
              className="font-display text-[7vw] leading-[1.05] tracking-[-0.025em] opacity-0 md:text-[4.2vw] lg:text-[3.4vw]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "wght" 380' }}
            >
              <span className="block">İyi ürün, kod yazmaktan</span>
              <span
                className="block italic text-ink/55"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1, "wght" 360' }}
              >
                çok daha fazlasıdır.
              </span>
              <span className="block">Fikri,</span>
              <span className="block">
                kullanıcıyı, mağaza onayını,{' '}
                <span className="text-blood" style={{ fontVariationSettings: '"wght" 600' }}>
                  detayı
                </span>{' '}
                — hepsini birlikte düşünürüm.
              </span>
            </p>
          </div>

          {/* Photo + bio */}
          <div className="flex flex-col gap-8 md:col-span-5 md:gap-10">
            <div data-photo className="relative aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-sm bg-bone-2 opacity-0 md:ml-auto">
              <img
                src="/img/profile.png"
                alt="İsmail Selim Garip"
                className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-bone mix-blend-difference">
                <span>İSG / 2026</span>
                <span>● kayıtta</span>
              </div>
            </div>

            <div className="space-y-4 text-[15px] leading-[1.65] text-ink/75 md:max-w-[360px] md:ml-auto md:text-right">
              <p data-line className="opacity-0">
                Öğrencilikte mobil uygulama yapmaya başladım, birkaç uygulamayı App Store ve
                Google Play'de yayınladım. O günden beri Flutter ve Firebase ile çalışıyorum;
                arayüz tasarımından backend entegrasyonuna, mağaza yayınından güncellemeye
                kadar bütün süreçleri kendim yönetiyorum.
              </p>
              <p data-line className="opacity-0">
                Temiz kod, kullanıcı deneyimi ve performans benim için ayrı işler değil —
                aynı işin üç yüzü. Bir fikri alıp yayınlanmış, kullanılan, güncellenen bir
                ürüne dönüştürmeyi seviyorum.
              </p>
              <p data-line className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute opacity-0">
                <span className="text-blood">↳</span> Solo dev / freelance dostu
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
