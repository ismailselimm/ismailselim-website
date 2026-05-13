type Props = {
  number: string
  title: string
  meta: string
  tone?: 'light' | 'dark'
  className?: string
}

export default function SectionHeader({ number, title, meta, tone = 'light', className = '' }: Props) {
  const main = tone === 'dark' ? 'text-bone/60' : 'text-mute'
  const sub = tone === 'dark' ? 'text-bone/40' : 'text-mute'
  return (
    <div className={`mb-14 flex items-baseline justify-between md:mb-20 ${className}`}>
      <h2 data-line className={`font-mono text-[11px] uppercase tracking-[0.3em] opacity-0 ${main}`}>
        <span className="text-blood">§</span> {number} — {title}
      </h2>
      <span data-line className={`font-mono text-[10px] uppercase tracking-[0.3em] opacity-0 ${sub}`}>
        {meta}
      </span>
    </div>
  )
}
