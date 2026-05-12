import Nav from './components/Nav'
import Cursor from './components/Cursor'
import SmoothScroll from './components/SmoothScroll'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Works from './components/Works'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

const marqueeItems = [
  'Flutter',
  'Firebase',
  'Dart',
  'Mobil',
  'Next.js',
  'TypeScript',
  'Tasarım',
  'App Store',
  'Google Play',
  'UI',
  'UX',
  'Performans',
]

export default function App() {
  return (
    <div className="relative grain">
      <SmoothScroll />
      <Cursor />
      <Nav />

      <main>
        <Hero />
        <Marquee items={marqueeItems} />
        <About />
        <Works />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
