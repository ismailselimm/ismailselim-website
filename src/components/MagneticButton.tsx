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
    let tx = 0
    let ty = 0
    let itx = 0
    let ity = 0

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
      tx = 0
      ty = 0
      itx = 0
      ity = 0
    }
    const tick = () => {
      const cur = el.style.transform.match(/translate3d\(([-\d.]+)px, ([-\d.]+)px/)
      const curX = cur ? parseFloat(cur[1]) : 0
      const curY = cur ? parseFloat(cur[2]) : 0
      const nx = curX + (tx - curX) * 0.18
      const ny = curY + (ty - curY) * 0.18
      el.style.transform = `translate3d(${nx}px, ${ny}px, 0)`

      const iCur = inner.style.transform.match(/translate3d\(([-\d.]+)px, ([-\d.]+)px/)
      const iCurX = iCur ? parseFloat(iCur[1]) : 0
      const iCurY = iCur ? parseFloat(iCur[2]) : 0
      const inx = iCurX + (itx - iCurX) * 0.22
      const iny = iCurY + (ity - iCurY) * 0.22
      inner.style.transform = `translate3d(${inx}px, ${iny}px, 0)`
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
