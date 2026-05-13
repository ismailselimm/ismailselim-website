import { useRef, useEffect, type ReactNode, type CSSProperties } from 'react'

type Props = {
  children: ReactNode
  as?: 'button' | 'a'
  href?: string
  onClick?: () => void
  className?: string
  strength?: number
  ariaLabel?: string
  style?: CSSProperties
}

export default function MagneticButton({
  children,
  as = 'button',
  href,
  onClick,
  className = '',
  strength = 0.35,
  ariaLabel,
  style,
}: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const innerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    const inner = innerRef.current
    if (!el || !inner) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let raf = 0
    let tx = 0, ty = 0, itx = 0, ity = 0
    let curX = 0, curY = 0, iCurX = 0, iCurY = 0

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      tx = x * strength
      ty = y * strength
      itx = x * strength * 0.5
      ity = y * strength * 0.5
    }
    const handleLeave = () => {
      tx = ty = itx = ity = 0
    }
    const tick = () => {
      curX += (tx - curX) * 0.18
      curY += (ty - curY) * 0.18
      iCurX += (itx - iCurX) * 0.22
      iCurY += (ity - iCurY) * 0.22
      el.style.transform = `translate3d(${curX}px, ${curY}px, 0)`
      inner.style.transform = `translate3d(${iCurX}px, ${iCurY}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [strength])

  const inner = (
    <span ref={innerRef} className="block will-change-transform">
      {children}
    </span>
  )

  if (as === 'a') {
    return (
      <a
        ref={(el) => {
          ref.current = el
        }}
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        onClick={onClick}
        className={`inline-block will-change-transform ${className}`}
        style={style}
      >
        {inner}
      </a>
    )
  }

  return (
    <button
      ref={(el) => {
        ref.current = el
      }}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`inline-block will-change-transform ${className}`}
      style={style}
    >
      {inner}
    </button>
  )
}
