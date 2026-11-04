import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { getProduct } from '../data/products'
import ProductCard from '../components/ProductCard'
import { SplitHeading, ease } from '../components/Motion'

export default function Wishlist() {
  const { wishlist } = useStore()
  const items = wishlist.map(getProduct).filter(Boolean)
  return (
    <div className="container-luxe min-h-[70vh] pb-28 pt-12 lg:pt-16">
      <p className="eyebrow mb-4 text-smoke">Saved for later</p>
      <SplitHeading text="Wishlist" as="h1" animateNow className="h-display text-6xl sm:text-7xl lg:text-8xl" />
      <p className="mt-4 text-sm text-smoke">{items.length} saved {items.length === 1 ? 'piece' : 'pieces'} — kept on this device.</p>

      {items.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease }} className="mt-20 flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sand"><Heart size={26} strokeWidth={1.2} /></div>
          <p className="font-display text-4xl">Nothing saved yet</p>
          <p className="mt-2 max-w-sm text-sm text-smoke">Tap the heart on any piece to keep it here for later.</p>
          <Link to="/shop" className="btn btn-dark mt-8"><span>Explore the collection</span></Link>
        </motion.div>
      ) : (
        <motion.div layout className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => (
              <motion.div key={p.id} layout exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.45, ease }}>
                <ProductCard product={p} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
