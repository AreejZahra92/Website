import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Plus } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { discountPct, finalPrice, formatPrice } from '../data/products'
import Img from './Img'
import { ease } from './Motion'
import { flyToBag } from './flyToBag'

export function Badge({ children, tone = 'light' }) {
  const tones = { light: 'bg-bone text-ink', dark: 'bg-ink text-bone', clay: 'bg-clay text-bone' }
  return <span className={`px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.18em] ${tones[tone]}`}>{children}</span>
}

export function ProductBadges({ product }) {
  const off = discountPct(product)
  return (
    <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
      {product.tags.includes('new') && <Badge>New</Badge>}
      {product.tags.includes('bestseller') && <Badge tone="dark">Best Seller</Badge>}
      {off > 0 && <Badge tone="clay">−{off}%</Badge>}
    </div>
  )
}

export default function ProductCard({ product, index = 0, aspect = 'aspect-[3/4]' }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore()
  const [hover, setHover] = useState(false)
  const [color, setColor] = useState(product.colors[0].name)
  const [showSizes, setShowSizes] = useState(false)
  const imgRef = useRef(null)
  const wished = inWishlist(product.id)

  const quickAdd = (size) => {
    flyToBag(imgRef.current, product.images[0])
    addToCart(product, { size, color })
    setShowSizes(false)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease, delay: (index % 4) * 0.09 }}
      className="group relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setShowSizes(false) }}
    >
      <div ref={imgRef} className={`relative ${aspect} overflow-hidden bg-sand`}>
        <Link to={`/product/${product.id}`} aria-label={product.name} className="absolute inset-0">
          <Img src={product.images[0]} alt={product.name} className="absolute inset-0" imgClassName="transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.07]" />
          <motion.div className="absolute inset-0" initial={false} animate={{ opacity: hover ? 1 : 0 }} transition={{ duration: 0.7, ease }}>
            <Img src={product.images[1]} alt="" className="absolute inset-0" imgClassName={`transition-transform duration-[1.6s] ease-luxe ${hover ? 'scale-100' : 'scale-110'}`} />
          </motion.div>
        </Link>

        <ProductBadges product={product} />

        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleWishlist(product)}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bone/80 backdrop-blur transition-colors hover:bg-bone"
        >
          <motion.span key={String(wished)} initial={{ scale: wished ? 0.4 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
            <Heart size={16} strokeWidth={1.6} className={wished ? 'fill-clay text-clay' : ''} />
          </motion.span>
        </motion.button>

        {/* Quick add — slides up on hover (desktop), toggled by + button on touch */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden lg:block">
          <div className={`translate-y-[120%] transition-transform duration-500 ease-luxe group-hover:translate-y-0`}>
            <AnimatePresence mode="wait" initial={false}>
              {showSizes ? (
                <motion.div key="sizes" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }} className="bg-bone/95 p-3 backdrop-blur">
                  <p className="eyebrow mb-2 text-[9.5px] text-smoke">Select size</p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((s) => (
                      <button key={s} onClick={() => quickAdd(s)} className="min-w-9 border border-ink/15 px-2 py-1.5 text-xs transition-colors hover:border-ink hover:bg-ink hover:text-bone">{s}</button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.button key="cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => (product.sizes.length === 1 ? quickAdd(product.sizes[0]) : setShowSizes(true))} className="btn btn-light w-full py-3.5">
                  <span className="flex items-center gap-2"><Plus size={14} /> Quick Add</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
        <button
          onClick={() => quickAdd(product.sizes[Math.min(2, product.sizes.length - 1)])}
          aria-label={`Add ${product.name} to bag`}
          className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-bone shadow-lg active:scale-90 lg:hidden"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-smoke">{product.type}</p>
          <Link to={`/product/${product.id}`} className="block truncate text-[15px] font-medium transition-colors hover:text-clay">{product.name}</Link>
        </div>
        <div className="shrink-0 text-right text-sm">
          <p className={`font-medium ${product.salePrice ? 'text-clay' : ''}`}>{formatPrice(finalPrice(product))}</p>
          {product.salePrice && <p className="text-xs text-smoke line-through">{formatPrice(product.price)}</p>}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        {product.colors.map((c) => (
          <button
            key={c.name}
            onClick={() => setColor(c.name)}
            aria-label={`Colour ${c.name}`}
            title={c.name}
            className={`h-4 w-4 rounded-full ring-offset-2 ring-offset-bone transition-all duration-300 ${color === c.name ? 'ring-1 ring-ink' : 'ring-1 ring-transparent hover:ring-stone'}`}
            style={{ backgroundColor: c.hex, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.12)' }}
          />
        ))}
        <span className="ml-1 text-[11px] text-smoke">{color}</span>
      </div>
    </motion.article>
  )
}
