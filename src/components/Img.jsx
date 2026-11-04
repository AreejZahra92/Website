import { useState } from 'react'
import { FALLBACK_POOL, img } from '../data/products'

// Image with a shimmer skeleton while loading and a fallback chain,
// so the layout never shows a broken-image icon.
export default function Img({ src, alt, className = '', imgClassName = '', eager = false, ...rest }) {
  const [attempt, setAttempt] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const current = attempt === 0 ? src : attempt <= FALLBACK_POOL.length ? img(FALLBACK_POOL[attempt - 1], 1000) : null

  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      {!loaded && <div className="skeleton absolute inset-0" />}
      {current ? (
        <img
          key={current}
          src={current}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(false)
            setAttempt((a) => a + 1)
          }}
          className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
          {...rest}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sand to-stone">
          <span className="font-display text-6xl italic text-ink/30">A</span>
        </div>
      )}
    </div>
  )
}
