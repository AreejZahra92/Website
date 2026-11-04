import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { SectionHeader, ease } from '../components/Motion'

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'accessories', label: 'Accessories' },
]

export default function NewArrivals() {
  const [tab, setTab] = useState('all')
  const list = useMemo(() => {
    const fresh = products.filter((p) => p.tags.includes('new'))
    const base = tab === 'all' ? fresh : products.filter((p) => p.category === tab)
    // Prefer "new" items first, then fill to 8 from the category
    return [...base.filter((p) => p.tags.includes('new')), ...base.filter((p) => !p.tags.includes('new'))].slice(0, 8)
  }, [tab])

  return (
    <section className="container-luxe py-24 lg:py-36" id="new-arrivals">
      <SectionHeader
        eyebrow="Just Landed — Week 45"
        title="New Arrivals"
        action={
          <Link to="/shop?tag=new" className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em]">
            <span className="link-underline">View all new in</span>
            <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        }
      />

      <LayoutGroup>
        <div className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative shrink-0 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ${tab === t.id ? 'text-bone' : 'text-ink hover:text-clay'}`}
            >
              {tab === t.id && <motion.span layoutId="arrivals-pill" className="absolute inset-0 bg-ink" transition={{ duration: 0.6, ease }} />}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      </LayoutGroup>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease }}
          className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6"
        >
          {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
