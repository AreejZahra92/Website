import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import Marquee from '../components/Marquee'
import { Reveal } from '../components/Motion'

export default function BestSellers() {
  const items = [...products].filter((p) => p.tags.includes('bestseller')).sort((a, b) => b.reviews - a.reviews).slice(0, 8)
  return (
    <section className="py-24 lg:py-36">
      <Marquee
        items={['Best Sellers', 'Most Loved', 'Back in Stock', 'Customer Favourites']}
        separator="✶"
        className="mb-16 border-y border-ink/10 py-6 lg:mb-24"
        itemClassName="h-display text-5xl italic sm:text-7xl lg:text-8xl"
      />
      <div className="container-luxe">
        <Reveal className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2 text-sm text-smoke">
            <span className="flex text-ink">{[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-ink" />)}</span>
            Rated 4.8 / 5 from 3,200+ verified reviews
          </p>
          <Link to="/shop?tag=bestseller" className="link-underline w-fit text-[11px] font-semibold uppercase tracking-[0.2em]">Shop all best sellers</Link>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {items.map((p, i) => (
            <div key={p.id} className="relative">
              <span className="pointer-events-none absolute -left-1 -top-6 z-10 font-display text-5xl italic text-ink/15 lg:-top-8 lg:text-6xl">{String(i + 1).padStart(2, '0')}</span>
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
