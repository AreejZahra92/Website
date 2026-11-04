import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { collections } from '../data/products'
import Img from './Img'
import { ease } from './Motion'
import { lockScroll } from '../hooks/useSmoothScroll'

const nav = [
  { label: 'New In', to: '/shop?tag=new' },
  {
    label: 'Women', to: '/shop?cat=women', mega: 'women',
    links: [['Dresses', 'Dresses'], ['Outerwear', 'Outerwear'], ['Tailoring', 'Tailoring'], ['Knitwear', 'Knitwear'], ['Trousers', 'Trousers']],
  },
  {
    label: 'Men', to: '/shop?cat=men', mega: 'men',
    links: [['Tailoring', 'Tailoring'], ['Outerwear', 'Outerwear'], ['Shirts', 'Shirts'], ['Denim', 'Denim'], ['T-Shirts', 'T-Shirts'], ['Knitwear', 'Knitwear']],
  },
  { label: 'Accessories', to: '/shop?cat=accessories' },
  { label: 'Sale', to: '/shop?tag=sale' },
]

export default function Navbar() {
  const { cartCount, wishlist, setCartOpen, setSearchOpen, bagPulse } = useStore()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mega, setMega] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > 400 && y > last + 2)
      if (y < last - 2) setHidden(false)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMega(null)
  }, [pathname])

  useEffect(() => lockScroll(mobileOpen), [mobileOpen])

  const transparent = isHome && !scrolled && !mega
  const tone = transparent ? 'text-bone' : 'text-ink'
  const activeMega = nav.find((n) => n.mega === mega)

  return (
    <>
      <motion.header
        className={`sticky top-0 z-40 transition-colors duration-500 ${isHome ? '-mb-[72px] lg:-mb-[84px]' : ''} ${
          transparent ? 'bg-transparent' : 'bg-bone/90 backdrop-blur-xl border-b border-ink/5'
        }`}
        animate={{ y: hidden && !mega ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease }}
        onMouseLeave={() => setMega(null)}
      >
        <div className={`container-luxe flex h-[72px] items-center justify-between lg:h-[84px] ${tone}`}>
          <div className="flex flex-1 items-center gap-8">
            <button aria-label="Open menu" className="lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu size={22} strokeWidth={1.4} />
            </button>
            <nav className="hidden items-center gap-8 lg:flex">
              {nav.map((n) => (
                <Link
                  key={n.label}
                  to={n.to}
                  onMouseEnter={() => setMega(n.mega ?? null)}
                  className={`link-underline text-[11px] font-semibold uppercase tracking-[0.2em] ${n.label === 'Sale' ? 'text-clay' : ''}`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link to="/" className="font-display text-[30px] font-medium tracking-[0.32em] lg:text-[34px]" aria-label="AUREL home">
            AUREL
          </Link>

          <div className="flex flex-1 items-center justify-end gap-4 sm:gap-6">
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className="transition-opacity hover:opacity-60">
              <Search size={20} strokeWidth={1.4} />
            </button>
            <Link to="/account" aria-label="Account" className="hidden transition-opacity hover:opacity-60 sm:block">
              <User size={20} strokeWidth={1.4} />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative transition-opacity hover:opacity-60">
              <Heart size={20} strokeWidth={1.4} />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-clay px-1 text-[9px] font-bold text-bone">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button id="bag-anchor" aria-label="Shopping bag" onClick={() => setCartOpen(true)} className="relative transition-opacity hover:opacity-60">
              <motion.span key={bagPulse} className="block" initial={{ scale: 1 }} animate={{ scale: bagPulse ? [1, 1.35, 0.9, 1] : 1 }} transition={{ duration: 0.6, delay: 0.75 }}>
                <ShoppingBag size={20} strokeWidth={1.4} />
              </motion.span>
              {cartCount > 0 && (
                <span className={`absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold ${transparent ? 'bg-bone text-ink' : 'bg-ink text-bone'}`}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {activeMega && (
            <motion.div
              key={activeMega.mega}
              initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.55, ease }}
              className="absolute inset-x-0 top-full hidden border-b border-ink/5 bg-bone lg:block"
            >
              <div className="container-luxe grid grid-cols-12 gap-10 py-12">
                <div className="col-span-3">
                  <p className="eyebrow mb-6 text-smoke">Shop {activeMega.label}</p>
                  <ul className="space-y-3">
                    <li><Link to={activeMega.to} className="font-display text-2xl italic hover:text-clay">View All</Link></li>
                    {activeMega.links.map(([label, type], i) => (
                      <motion.li key={label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.04, duration: 0.5, ease }}>
                        <Link to={`/shop?cat=${activeMega.mega}&type=${encodeURIComponent(type)}`} className="font-display text-2xl hover:text-clay">
                          {label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-3">
                  <p className="eyebrow mb-6 text-smoke">Edits</p>
                  <ul className="space-y-3 text-sm text-smoke">
                    <li><Link to="/shop?tag=new" className="link-underline">New Arrivals</Link></li>
                    <li><Link to="/shop?tag=bestseller" className="link-underline">Best Sellers</Link></li>
                    <li><Link to="/shop?tag=seasonal" className="link-underline">The Winter Edit</Link></li>
                    <li><Link to="/shop?tag=sale" className="link-underline">Sale</Link></li>
                  </ul>
                </div>
                {[collections[activeMega.mega].image, collections[activeMega.mega].detail].map((src, i) => (
                  <Link key={i} to={activeMega.to} className="group col-span-3">
                    <Img src={src} alt="" className="aspect-[4/5]" imgClassName="transition-transform duration-[1.2s] ease-luxe group-hover:scale-105" />
                    <p className="eyebrow mt-3">{i === 0 ? 'The New Season' : 'Wardrobe Essentials'}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 z-[60] bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.aside
              className="fixed inset-y-0 left-0 z-[61] flex w-[88%] max-w-sm flex-col bg-bone"
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.6, ease }}
              data-lenis-prevent
            >
              <div className="flex h-[72px] items-center justify-between border-b border-ink/10 px-6">
                <span className="font-display text-2xl tracking-[0.3em]">AUREL</span>
                <button aria-label="Close menu" onClick={() => setMobileOpen(false)}><X size={22} strokeWidth={1.4} /></button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 py-8">
                {nav.map((n, i) => (
                  <motion.div key={n.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease }}>
                    <Link to={n.to} className={`block border-b border-ink/10 py-4 font-display text-4xl ${n.label === 'Sale' ? 'text-clay' : ''}`}>
                      {n.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-10 space-y-4 text-sm text-smoke">
                  <Link to="/wishlist" className="flex items-center gap-3"><Heart size={18} strokeWidth={1.4} /> Wishlist ({wishlist.length})</Link>
                  <Link to="/account" className="flex items-center gap-3"><User size={18} strokeWidth={1.4} /> Account</Link>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
