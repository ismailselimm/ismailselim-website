import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'doldurkabi',
    index: '01',
    title: 'DoldurKabı',
    tagline: 'Türkiye\'nin hayvan sever platformu',
    year: '2024 — Halen',
    role: 'Kurucu & Tek Geliştirici',
    stack: ['Flutter', 'Firebase', 'Next.js', 'TypeScript', 'Google Maps'],
    status: 'live',
    description:
      'Sokak hayvanlarına yardım etmek isteyenler için kurduğum sosyal fayda odaklı platform. Harita üzerinde besleme noktaları, kayıp/sahiplendirme ilanları, veteriner paneli, topluluk paylaşımları. Mobil uygulama, web sitesi ve admin panelini tek elden tasarladım, geliştirdim, yayına aldım.',
    highlights: [
      'Mobil (Flutter) + web (Next.js) + admin paneli',
      'Veteriner CRM, sahiplendirme, kayıp ilanları, harita',
      '700+ statik SEO sayfası, 250+ URL sitemap',
    ],
    cover: '/portfolio/doldurkabi/01.jpg',
    coverAspect: 'landscape',
    gallery: [
      '/portfolio/doldurkabi/01.jpg',
      '/portfolio/doldurkabi/02.jpg',
      '/portfolio/doldurkabi/03.jpg',
      '/portfolio/doldurkabi/04.jpg',
      '/portfolio/doldurkabi/05.jpg',
      '/portfolio/doldurkabi/06.jpg',
      '/portfolio/doldurkabi/07.jpg',
      '/portfolio/doldurkabi/08.jpg',
      '/portfolio/doldurkabi/09.jpg',
      '/portfolio/doldurkabi/10.jpg',
      '/portfolio/doldurkabi/11.jpg',
    ],
    link: { label: 'doldurkabi.com', href: 'https://doldurkabi.com/' },
  },
  {
    id: 'temizlikexpress',
    index: '02',
    title: 'TemizlikExpress',
    tagline: 'Temizliğe dair her şey',
    year: '2024',
    role: 'Geliştirici',
    stack: ['Mobil', 'Web', 'Marketplace', 'Çoklu Şehir'],
    status: 'live',
    description:
      '81 ilde çalışan, müşterilerle onaylı temizlik hizmet sağlayıcılarını buluşturan marketplace platformu. Ev ve ofis temizliği, halı yıkama, böcek ilaçlama gibi servislerin gezinti–karşılaştırma–rezervasyon akışı.',
    highlights: [
      'Çoklu kategori marketplace',
      '81 il kapsamı, hizmet sağlayıcı paneli',
      'Müşteri tarafı rezervasyon akışı',
    ],
    cover: '/portfolio/temizlikexpress/app.png',
    coverAspect: 'portrait',
    link: { label: 'temizlikexpress.com', href: 'https://temizlikexpress.com/' },
  },
]

export const otherWorkStats = {
  mobileApps: '10+',
  websites: '20+',
  note:
    'Yukarıdaki ikisi öne çıkanlar. Geliştirdiğim diğer mobil uygulamalar ve web siteleri talep üzerine birebir paylaşılabilir.',
}
