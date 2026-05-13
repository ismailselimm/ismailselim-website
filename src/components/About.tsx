import { useEffect } from 'react'
import { inView, animate } from 'motion'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import SectionHeader from './SectionHeader'

export default function About() {
  const ref = useRevealOnScroll<HTMLElement>({ distance: 40, stagger: 0.08 })

  // Photo gets its own scale-in animation alongside the default reveal
  useEffect(() => {
    const el = ref.current
    if (!el) return
    return inView(el, () => {
      const photo = el.querySelector<HTMLElement>('[data-photo]')
      if (!photo) return
      animate(
        photo,
        { transform: ['scale(0.9)', 'scale(1)'], opacity: [0, 1] },
        { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
      )
    })
  }, [ref])

  return (
    <section
      ref={ref}
      id="about"
      className="relative px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionHeader number="01" title="Hakkımda" meta="ismailselim.dev" />

        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:items-center md:gap-12">
          {/* Pull quote */}
          <div className="md:col-span-7">
            <p
              data-line
              className="font-display text-[5.5vw] leading-[1.08] tracking-[-0.025em] opacity-0 md:text-[3.2vw] lg:text-[2.6vw]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "wght" 380' }}
            >
              <span className="block">İyi ürün, kod yazmaktan</span>
              <span
                className="block italic text-ink/55"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1, "wght" 360' }}
              >
                çok daha fazlasıdır.
              </span>
              <span className="block">Fikir, kullanıcı,</span>
              <span className="block">
                mağaza onayı ve{' '}
                <span className="text-blood" style={{ fontVariationSettings: '"wght" 600' }}>
                  detay
                </span>{' '}
                — aynı işin parçaları.
              </span>
            </p>
          </div>

          {/* Photo + bio */}
          <div className="flex flex-col gap-8 md:col-span-5 md:gap-10">
            <div data-photo className="relative mx-auto aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-sm bg-bone-2 opacity-0 md:mx-0 md:ml-auto md:max-w-[260px]">
              <img
                src="/img/profile.png"
                alt="İsmail Selim Garip"
                className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                loading="lazy"
              />
            </div>

            <div className="space-y-4 text-[14.5px] leading-[1.65] text-ink/75 md:max-w-[360px] md:ml-auto md:text-right">
              <p data-line className="opacity-0">
                Öğrencilik döneminde mobil geliştirmeye başladım. Bugüne kadar
                App Store ve Google Play'de 10'u aşkın uygulamayı yayına aldım;
                aktif olarak yenilerini de yayınlamaya devam ediyorum.
              </p>
              <p data-line className="opacity-0">
                Arayüzden backend mimarisine, mağaza onayından sürüm yönetimine kadar
                bir ürünün her aşamasında sorumluluk alıyorum. Temiz kod,
                kullanıcı deneyimi ve performans birbirinden ayrı değil — aynı
                disiplinin parçaları.
              </p>
              <p data-line className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute opacity-0">
                <span className="text-blood">↳</span> Web & mobil — uçtan uca
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
