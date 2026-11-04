import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { categories, finalPrice, products, sortOptions } from '../data/products'
import ProductCard from '../components/ProductCard'
import { Reveal, SplitHeading, ease } from '../components/Motion'
import { searchProducts } from '../components/SearchOverlay'

const allTypes = [...new Set(products.map((p) => p.type))].sort()
const allColors = [...new Map(products.flatMap((p) => p.colors).map((c) => [c.name, c])).values()]
const priceBands = [
  { id: 'all', label: 'Any price', test: () => true },
  { id: 'u5', label: 'Under Rs. 5,000', test: (v) => v < 5000 },
  { id: '5-15', label: 'Rs. 5,000 – 15,000', test: (v) => v >= 5000 && v <= 15000 },
  { id: 'o15', label: 'Over Rs. 15,000', test: (v) => v > 15000 },
]
const tagTitles = { new: 'New Arrivals', bestseller: 'Best Sellers', featured: 'The Featured Edit', seasonal: 'The Winter Edit', sale: 'Winter Sale' }

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || 'all'
  const tag = params.get('tag')
  const type = params.get('type')
  const q = params.get('q')
  const [sort, setSort] = useState('featured')
  const [colors, setColors] = useState([])
  const [band, setBand] = useState('all')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value == null || value === 'all') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const list = useMemo(() => {
    let r = q ? searchProducts(q) : products
    if (cat !== 'all') r = r.filter((p) => p.category === cat)
    if (tag === 'sale') r = r.filter((p) => p.salePrice)
    else if (tag) r = r.filter((p) => p.tags.includes(tag))
    if (type) r = r.filter((p) => p.type === type)
    if (colors.length) r = r.filter((p) => p.colors.some((c) => colors.includes(c.name)))
    const bandTest = priceBands.find((b) => b.id === band).test
    r = r.filter((p) => bandTest(finalPrice(p)))
    const sorted = [...r]
    if (sort === 'price-asc') sorted.sort((a, b) => finalPrice(a) - finalPrice(b))
    if (sort === 'price-desc') sorted.sort((a, b) => finalPrice(b) - finalPrice(a))
    if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating)
    if (sort === 'newest') sorted.sort((a, b) => Number(b.tags.includes('new')) - Number(a.tags.includes('new')))
    return sorted
  }, [q, cat, tag, type, colors, band, sort])

  const title = q ? `“${q}”` : tag ? tagTitles[tag] : type ? type : cat !== 'all' ? categories.find((c) => c.id === cat)?.label : 'Shop All'
  const activeCount = colors.length + (band !== 'all') + (type ? 1 : 0)
  const clearAll = () => { setColors([]); setBand('all'); setParam('type', null) }

  const filterPanel = (
    <div className="space-y-10">
      <div>
        <p className="eyebrow mb-4 text-smoke">Category</p>
        <div className="flex flex-wrap gap-2">
          {['all', ...allTypes].map((t) => (
            <button key={t} onClick={() => setParam('type', t)} className={`border px-3 py-1.5 text-xs transition-colors ${(type || 'all') === t ? 'border-ink bg-ink text-bone' : 'border-ink/15 hover:border-ink'}`}>
              {t === 'all' ? 'All types' : t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow mb-4 text-smoke">Colour</p>
        <div className="flex flex-wrap gap-3">
          {allColors.map((c) => {
            const on = colors.includes(c.name)
            return (
              <button key={c.name} title={c.name} aria-label={c.name} aria-pressed={on} onClick={() => setColors((cs) => (on ? cs.filter((x) => x !== c.name) : [...cs, c.name]))}
                className={`h-7 w-7 rounded-full ring-offset-2 ring-offset-bone transition-all ${on ? 'ring-1 ring-ink' : 'hover:ring-1 hover:ring-stone'}`}
                style={{ backgroundColor: c.hex, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.12)' }}
              />
            )
          })}
        </div>
      </div>
      <div>
        <p className="eyebrow mb-4 text-smoke">Price</p>
        <div className="space-y-2">
          {priceBands.map((b) => (
            <label key={b.id} className="flex cursor-pointer items-center gap-3 text-sm">
              <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${band === b.id ? 'border-ink' : 'border-ink/30'}`}>
                {band === b.id && <motion.span layoutId="band-dot" className="h-2 w-2 rounded-full bg-ink" />}
              </span>
              <input type="radio" name="band" className="sr-only" checked={band === b.id} onChange={() => setBand(b.id)} />
              {b.label}
            </label>
          ))}
        </div>
      </div>
      {activeCount > 0 && <button onClick={clearAll} className="link-underline text-xs font-semibold uppercase tracking-[0.18em]">Clear filters ({activeCount})</button>}
    </div>
  )

  return (
    <div className="container-luxe pb-24 pt-12 lg:pt-16">
      <div className="mb-10 border-b border-ink/10 pb-10">
        <Reveal><p className="eyebrow mb-4 text-smoke">AUREL / {cat === 'all' ? 'Shop' : cat}</p></Reveal>
        <SplitHeading key={title} text={title} as="h1" animateNow className="h-display text-6xl sm:text-7xl lg:text-8xl" />
        <LayoutGroup>
          <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto">
            {categories.map((c) => (
              <button key={c.id} onClick={() => setParam('cat', c.id)} className={`relative shrink-0 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ${cat === c.id ? 'text-bone' : 'hover:text-clay'}`}>
                {cat === c.id && <motion.span layoutId="shop-cat" className="absolute inset-0 bg-ink" transition={{ duration: 0.5, ease }} />}
                <span className="relative">{c.label}</span>
              </button>
            ))}
            {(tag || q) && (
              <button onClick={() => { const n = new URLSearchParams(params); n.delete('tag'); n.delete('q'); setParams(n) }} className="flex shrink-0 items-center gap-2 border border-ink/20 px-4 text-[11px] font-semibold uppercase tracking-[0.18em]">
                {q ? `Search: ${q}` : tagTitles[tag]} <X size={12} />
              </button>
            )}
          </div>
        </LayoutGroup>
      </div>

      <div className="mb-8 flex items-center justify-between gap-4">
        <button onClick={() => setFiltersOpen(true)} className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] lg:hidden">
          <SlidersHorizontal size={16} /> Filters {activeCount > 0 && `(${activeCount})`}
        </button>
        <p className="hidden text-sm text-smoke lg:block">{list.length} {list.length === 1 ? 'piece' : 'pieces'}</p>
        <label className="relative flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
          <span className="hidden sm:inline">Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="cursor-pointer appearance-none border border-ink/15 bg-transparent py-2.5 pl-4 pr-10 text-[11px] font-semibold uppercase tracking-[0.12em] outline-none hover:border-ink">
            {sortOptions.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-3" />
        </label>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block"><div className="sticky top-28">{filterPanel}</div></aside>
        <div className="lg:col-span-9">
          {list.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display text-4xl">No pieces match these filters.</p>
              <button onClick={() => { clearAll(); setParams({}) }} className="btn btn-dark mt-8"><span>Reset everything</span></button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:gap-x-6">
              <AnimatePresence mode="popLayout">
                {list.map((p, i) => (
                  <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5, ease }}>
                    <ProductCard product={p} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div className="fixed inset-0 z-[60] bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFiltersOpen(false)} />
            <motion.div className="fixed inset-x-0 bottom-0 z-[61] max-h-[85vh] overflow-y-auto bg-bone p-6 pb-10" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: 0.55, ease }} data-lenis-prevent>
              <div className="mb-8 flex items-center justify-between">
                <p className="font-display text-3xl">Filters</p>
                <button aria-label="Close filters" onClick={() => setFiltersOpen(false)}><X size={22} strokeWidth={1.4} /></button>
              </div>
              {filterPanel}
              <button onClick={() => setFiltersOpen(false)} className="btn btn-dark mt-10 w-full"><span>Show {list.length} results</span></button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
