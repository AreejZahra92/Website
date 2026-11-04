import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Search, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { finalPrice, formatPrice, products } from '../data/products'
import { lockScroll } from '../hooks/useSmoothScroll'
import Img from './Img'
import { ease } from './Motion'

const trending = ['Overcoat', 'Silk dress', 'Leather', 'Denim', 'Knitwear', 'Sneaker']

export const searchProducts = (q) => {
  const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  return products.filter((p) => {
    const hay = `${p.name} ${p.type} ${p.category} ${p.description} ${p.colors.map((c) => c.name).join(' ')}`.toLowerCase()
    return terms.every((t) => hay.includes(t))
  })
}

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore()
  const [q, setQ] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const results = useMemo(() => searchProducts(q), [q])

  useEffect(() => {
    lockScroll(searchOpen)
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 250)
    const onKey = (e) => e.key === 'Escape' && setSearchOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen, setSearchOpen])

  const close = () => setSearchOpen(false)
  const submit = (e) => {
    e.preventDefault()
    if (!q.trim()) return
    navigate(`/shop?q=${encodeURIComponent(q.trim())}`)
    close()
  }

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-bone"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease }}
          data-lenis-prevent
        >
          <div className="container-luxe flex h-[72px] items-center justify-between lg:h-[84px]">
            <span className="font-display text-2xl tracking-[0.3em]">AUREL</span>
            <button aria-label="Close search" onClick={close} className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
              Close <X size={20} strokeWidth={1.4} />
            </button>
          </div>
          <div className="container-luxe flex-1 overflow-y-auto pb-16">
            <motion.form onSubmit={submit} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease }} className="mt-6 flex items-center gap-4 border-b border-ink pb-4 lg:mt-12">
              <Search size={28} strokeWidth={1.2} className="shrink-0" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search coats, dresses, leather…"
                className="w-full bg-transparent font-display text-3xl outline-none placeholder:text-stone sm:text-5xl lg:text-6xl"
              />
              {q && (
                <button type="submit" aria-label="See all results" className="shrink-0"><ArrowRight size={28} strokeWidth={1.2} /></button>
              )}
            </motion.form>

            {!q && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-10">
                <p className="eyebrow mb-5 text-smoke">Trending searches</p>
                <div className="flex flex-wrap gap-3">
                  {trending.map((t) => (
                    <button key={t} onClick={() => setQ(t)} className="border border-ink/20 px-5 py-2.5 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-bone">
                      {t}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {q && (
              <div className="mt-10">
                <p className="eyebrow mb-6 text-smoke">{results.length} {results.length === 1 ? 'result' : 'results'}</p>
                {results.length === 0 ? (
                  <p className="font-display text-3xl text-smoke">Nothing matched “{q}”. Try “coat” or “silk”.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
                    {results.slice(0, 10).map((p, i) => (
                      <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.6, ease }}>
                        <Link to={`/product/${p.id}`} onClick={close} className="group block">
                          <Img src={p.images[0]} alt={p.name} className="aspect-[3/4]" imgClassName="transition-transform duration-700 ease-luxe group-hover:scale-105" />
                          <p className="mt-3 text-sm font-medium">{p.name}</p>
                          <p className="text-sm text-smoke">{formatPrice(finalPrice(p))}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
