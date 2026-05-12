import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  images: string[]
  startIndex: number
  title: string
  onClose: () => void
}

export default function Lightbox({ images, startIndex, title, onClose }: Props) {
  const [idx, setIdx] = useState(startIndex)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 240)
  }

  const next = () => setIdx((i) => (i + 1) % images.length)
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length)

  return createPortal(
    <div
      className={`fixed inset-0 z-[200] flex flex-col bg-ink/96 backdrop-blur-sm text-bone transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Header */}
      <header
        className="flex shrink-0 items-center justify-between border-b border-bone/15 px-5 py-4 md:px-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone/55">
            {String(idx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
          <h2
            className="font-display text-xl md:text-2xl"
            style={{ fontVariationSettings: '"opsz" 96, "SOFT" 30, "wght" 400' }}
          >
            {title}
          </h2>
        </div>
        <button
          onClick={handleClose}
          data-cursor="hover"
          className="rounded-full border border-bone/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink"
          aria-label="Kapat"
        >
          kapat ✕
        </button>
      </header>

      {/* Image stage */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden p-4 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={images[idx]}
          src={images[idx]}
          alt={`${title} ${idx + 1}`}
          className="max-h-full max-w-full select-none object-contain"
          draggable={false}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              data-cursor="hover"
              aria-label="Önceki"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-bone/30 bg-ink/40 px-3.5 py-2.5 font-mono text-sm text-bone backdrop-blur transition-colors hover:bg-bone hover:text-ink md:left-6"
            >
              ←
            </button>
            <button
              onClick={next}
              data-cursor="hover"
              aria-label="Sonraki"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-bone/30 bg-ink/40 px-3.5 py-2.5 font-mono text-sm text-bone backdrop-blur transition-colors hover:bg-bone hover:text-ink md:right-6"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Thumb strip */}
      {images.length > 1 && (
        <div
          className="shrink-0 border-t border-bone/15 px-3 py-3 md:px-6 md:py-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {images.map((img, i) => (
              <button
                key={img}
                onClick={() => setIdx(i)}
                aria-label={`${i + 1}. görsele git`}
                className={`relative h-14 w-24 shrink-0 overflow-hidden bg-bone/5 transition-all md:h-16 md:w-28 ${
                  idx === i
                    ? 'opacity-100 ring-2 ring-bone'
                    : 'opacity-50 hover:opacity-90'
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>,
    document.body,
  )
}
