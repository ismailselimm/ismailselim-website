import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [variant, setVariant] = useState<'default' | 'hover' | 'view'>('default')
  const [hidden, setHidden] = useState(true)
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setSupported(mq.matches)
    document.documentElement.classList.toggle('has-custom-cursor', mq.matches)
    const handler = (e: MediaQueryListEvent) => {
      setSupported(e.matches)
      document.documentElement.classList.toggle('has-custom-cursor', e.matches)
    }
    mq.addEventListener('change', handler)
    return () => {
      mq.removeEventListener('change', handler)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  useEffect(() => {
    if (!supported) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      setHidden(false)
    }

    const handleEnter = () => setHidden(false)
    const handleLeave = () => setHidden(true)

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const interactive = t.closest('a, button, [data-cursor]')
      if (!interactive) {
        setVariant('default')
        return
      }
      const explicit = interactive.getAttribute('data-cursor')
      if (explicit === 'view') setVariant('view')
      else setVariant('hover')
    }

    let frame = 0
    const animate = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseenter', handleEnter)
    document.addEventListener('mouseleave', handleLeave)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseenter', handleEnter)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [supported])

  if (!supported) return null

  const ringSize = variant === 'view' ? 84 : variant === 'hover' ? 56 : 32
  const opacity = hidden ? 0 : 1

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{ opacity }}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-1.5 w-1.5 rounded-full bg-blood mix-blend-difference transition-opacity"
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          width: ringSize,
          height: ringSize,
          opacity,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-ink/70 transition-[width,height,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        {variant === 'view' && (
          <div className="absolute inset-0 flex items-center justify-center text-[10px] tracking-[0.2em] uppercase font-mono text-ink">
            View
          </div>
        )}
      </div>
    </>
  )
}
