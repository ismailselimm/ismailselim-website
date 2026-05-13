import { useEffect, useRef } from 'react'
import { inView, animate } from 'motion'

type Options = {
  selector?: string
  distance?: number
  duration?: number
  stagger?: number
}

export function useRevealOnScroll<T extends HTMLElement>(opts: Options = {}) {
  const ref = useRef<T>(null)
  const { selector = '[data-line]', distance = 40, duration = 1.0, stagger = 0.07 } = opts

  useEffect(() => {
    const el = ref.current
    if (!el) return
    return inView(el, () => {
      animate(
        el.querySelectorAll<HTMLElement>(selector),
        { transform: [`translateY(${distance}px)`, 'translateY(0px)'], opacity: [0, 1] },
        { duration, delay: (i) => i * stagger, ease: [0.16, 1, 0.3, 1] },
      )
    })
  }, [selector, distance, duration, stagger])

  return ref
}
