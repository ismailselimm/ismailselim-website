type Props = {
  items: string[]
  variant?: 'default' | 'reverse'
}

export default function Marquee({ items, variant = 'default' }: Props) {
  const list = [...items, ...items, ...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-ink py-6 md:py-8">
      <div
        className="flex whitespace-nowrap will-change-transform animate-marquee"
        style={variant === 'reverse' ? { animationDirection: 'reverse' } : undefined}
      >
        {list.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="mx-6 flex items-center gap-6 font-display text-[8vw] leading-none tracking-[-0.02em] md:text-[6vw] lg:text-[5vw]"
            style={{ fontVariationSettings: '"opsz" 144, "wght" 380, "SOFT" 60' }}
          >
            <span className={i % 3 === 1 ? 'italic text-blood' : ''}>{label}</span>
            <span aria-hidden className="text-[3vw] md:text-[2.2vw]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
