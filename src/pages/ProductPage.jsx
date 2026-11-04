import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight, Heart, RotateCcw, Ruler, Star, Truck } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { discountPct, finalPrice, formatPrice, getProduct, products } from '../data/products'
import Img from '../components/Img'
import ProductCard, { Badge } from '../components/ProductCard'
import QtyControl from '../components/QtyControl'
import { Reveal, SectionHeader, ease } from '../components/Motion'
import { flyToBag } from '../components/flyToBag'
import NotFound from './NotFound'

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-ink/10">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between py-5 text-left text-[11px] font-semibold uppercase tracking-[0.18em]" aria-expanded={open}>
        {title}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.4, ease }}><ChevronDown size={16} /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden">
            <div className="pb-6 text-sm leading-relaxed text-smoke">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Gallery({ product }) {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(null)
  const n = product.images.length
  const go = (d) => setActive((a) => (a + d + n) % n)

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      <div className="no-scrollbar flex gap-3 overflow-x-auto lg:w-24 lg:flex-col">
        {product.images.map((src, i) => (
          <button key={i} onClick={() => setActive(i)} aria-label={`View image ${i + 1}`} className={`relative w-20 shrink-0 transition-opacity duration-500 lg:w-full ${active === i ? 'opacity-100' : 'opacity-45 hover:opacity-80'}`}>
            <Img src={src} alt="" className="aspect-[3/4]" />
            {active === i && <motion.span layoutId="thumb-line" className="absolute inset-x-0 -bottom-1.5 h-px bg-ink" />}
          </button>
        ))}
      </div>
      <div
        className="group relative aspect-[3/4] flex-1 cursor-zoom-in overflow-hidden bg-sand"
        onMouseMove={onMove}
        onMouseLeave={() => setZoom(null)}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); if (info.offset.x > 60) go(-1) }}
          >
            <div className="h-full w-full transition-transform duration-300 ease-out" style={zoom ? { transform: 'scale(1.9)', transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}>
              <Img src={product.images[active]} alt={product.name} className="h-full w-full" eager />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
          {[[-1, ChevronLeft, 'Previous image'], [1, ChevronRight, 'Next image']].map(([d, Icon, label]) => (
            <button key={d} onClick={() => go(d)} aria-label={label} className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-bone/85 backdrop-blur transition-colors hover:bg-ink hover:text-bone">
              <Icon size={18} />
            </button>
          ))}
        </div>
        <span className="absolute bottom-4 right-4 bg-bone/85 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] backdrop-blur">{active + 1} / {n}</span>
      </div>
    </div>
  )
}

export default function ProductPage() {
  const { id } = useParams()
  const product = getProduct(id)
  const { addToCart, toggleWishlist, inWishlist, setCartOpen } = useStore()
  const [color, setColor] = useState(product?.colors[0].name)
  const [size, setSize] = useState(product?.sizes.length === 1 ? product.sizes[0] : null)
  const [qty, setQty] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)
  const [guide, setGuide] = useState(false)
  const shake = useAnimationControls()
  const galleryRef = useRef(null)

  useEffect(() => {
    if (!product) return
    setColor(product.colors[0].name)
    setSize(product.sizes.length === 1 ? product.sizes[0] : null)
    setQty(1)
    setSizeError(false)
    document.title = `${product.name} — AUREL`
    return () => { document.title = 'AUREL — Modern Wardrobe' }
  }, [product])

  if (!product) return <NotFound />

  const wished = inWishlist(product.id)
  const off = discountPct(product)
  const related = products.filter((p) => p.id !== product.id && (p.category === product.category || p.type === product.type)).slice(0, 4)

  const add = () => {
    if (!size) {
      setSizeError(true)
      shake.start({ x: [0, -10, 10, -6, 6, 0], transition: { duration: 0.5 } })
      return
    }
    flyToBag(galleryRef.current, product.images[0])
    addToCart(product, { size, color, qty })
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="pb-10 pt-8 lg:pt-12">
      <div className="container-luxe">
        <nav className="mb-8 text-[11px] uppercase tracking-[0.16em] text-smoke">
          <Link to="/" className="hover:text-ink">Home</Link> / <Link to={`/shop?cat=${product.category}`} className="hover:text-ink">{product.category}</Link> / <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div ref={galleryRef} className="lg:col-span-7" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
            <Gallery key={product.id} product={product} />
          </motion.div>

          <motion.div className="lg:col-span-5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.15 }}>
            <div className="lg:sticky lg:top-28">
              <div className="mb-4 flex flex-wrap gap-2">
                {product.tags.includes('new') && <Badge tone="dark">New Arrival</Badge>}
                {product.tags.includes('bestseller') && <Badge tone="dark">Best Seller</Badge>}
                {off > 0 && <Badge tone="clay">Save {off}%</Badge>}
              </div>
              <p className="eyebrow mb-3 text-smoke">{product.type} — {product.category}</p>
              <h1 className="h-display text-5xl lg:text-6xl">{product.name}</h1>
              <div className="mt-4 flex items-center gap-3 text-sm">
                <span className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={13} className={i < Math.round(product.rating) ? 'fill-ink' : 'text-stone'} />)}</span>
                <span className="text-smoke">{product.rating} · {product.reviews} reviews</span>
              </div>
              <div className="mt-6 flex items-baseline gap-3">
                <span className={`text-2xl font-medium ${product.salePrice ? 'text-clay' : ''}`}>{formatPrice(finalPrice(product))}</span>
                {product.salePrice && <span className="text-base text-smoke line-through">{formatPrice(product.price)}</span>}
              </div>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-smoke">{product.description}</p>

              <div className="mt-8">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Colour — <span className="font-normal normal-case tracking-normal text-smoke">{color}</span></p>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button key={c.name} onClick={() => setColor(c.name)} aria-label={c.name} aria-pressed={color === c.name}
                      className={`relative h-9 w-9 rounded-full ring-offset-[3px] ring-offset-bone transition-all duration-300 ${color === c.name ? 'ring-1 ring-ink' : 'hover:ring-1 hover:ring-stone'}`}
                      style={{ backgroundColor: c.hex, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.12)' }}
                    />
                  ))}
                </div>
              </div>

              <motion.div className="mt-8" animate={shake}>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">Size {size && <span className="font-normal normal-case tracking-normal text-smoke">— {size}</span>}</p>
                  <button className="flex items-center gap-1.5 text-xs text-smoke underline-offset-4 hover:underline" onClick={() => setGuide((g) => !g)}>
                    <Ruler size={14} /> Size guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button key={s} onClick={() => { setSize(s); setSizeError(false) }}
                      className={`relative h-11 min-w-[52px] border px-3 text-sm transition-colors duration-300 ${size === s ? 'border-ink text-bone' : sizeError ? 'border-clay/60' : 'border-ink/15 hover:border-ink'}`}>
                      {size === s && <motion.span layoutId="size-pill" className="absolute inset-0 bg-ink" transition={{ duration: 0.4, ease }} />}
                      <span className="relative">{s}</span>
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {guide && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden">
                      <table className="mt-4 w-full border border-ink/10 text-left text-xs">
                        <thead className="bg-sand"><tr>{['Size', 'Chest (in)', 'Waist (in)', 'UK'].map((h) => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}</tr></thead>
                        <tbody>
                          {[['XS / 28', '32', '26', '6'], ['S / 30', '34–36', '28', '8'], ['M / 32', '38–40', '30–32', '10'], ['L / 34', '42', '34', '12'], ['XL / 36', '44', '36', '14'], ['XXL', '46', '38', '16']].map((r) => (
                            <tr key={r[0]} className="border-t border-ink/10">{r.map((c, i) => <td key={i} className="px-3 py-2 text-smoke">{c}</td>)}</tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>{sizeError && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 text-xs text-clay">Please select a size.</motion.p>}</AnimatePresence>
              </motion.div>

              <div className="mt-8 flex gap-3">
                <QtyControl value={qty} onChange={(v) => setQty(Math.max(1, v))} />
                <button onClick={add} className="btn btn-dark flex-1">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={added ? 'added' : 'add'} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.3 }}>
                      {added ? '✓ Added to bag' : `Add to bag — ${formatPrice(finalPrice(product) * qty)}`}
                    </motion.span>
                  </AnimatePresence>
                </button>
                <motion.button whileTap={{ scale: 0.85 }} onClick={() => toggleWishlist(product)} aria-label="Toggle wishlist" className={`flex h-12 w-12 shrink-0 items-center justify-center border transition-colors ${wished ? 'border-clay bg-clay text-bone' : 'border-ink/20 hover:border-ink'}`}>
                  <Heart size={18} strokeWidth={1.5} className={wished ? 'fill-bone' : ''} />
                </motion.button>
              </div>
              <AnimatePresence>
                {added && (
                  <motion.button initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} onClick={() => setCartOpen(true)} className="mt-3 w-full text-center text-xs underline underline-offset-4">
                    View bag & checkout
                  </motion.button>
                )}
              </AnimatePresence>

              <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-smoke">
                <p className="flex items-center gap-2"><Truck size={16} strokeWidth={1.4} /> Free delivery over Rs. 5,000</p>
                <p className="flex items-center gap-2"><RotateCcw size={16} strokeWidth={1.4} /> 30-day easy returns</p>
              </div>

              <div className="mt-8 border-t border-ink/10">
                <Accordion title="Details & composition" defaultOpen>
                  <ul className="list-inside list-disc space-y-1">{product.details.map((d) => <li key={d}>{d}</li>)}</ul>
                </Accordion>
                <Accordion title="Delivery & returns">
                  Standard delivery in 2–4 working days across Pakistan (free over Rs. 5,000). Express next-day delivery in Karachi, Lahore and Islamabad. Return unworn items within 30 days for a full refund or exchange.
                </Accordion>
                <Accordion title="Care">
                  Treat natural fibres gently: wash less, air more. Store knitwear folded and hang tailoring on shaped hangers to keep its form.
                </Accordion>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-luxe mt-28 lg:mt-40">
          <SectionHeader eyebrow="Complete the look" title="You may also like" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 lg:gap-x-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
      <Reveal className="h-10" />
    </div>
  )
}
