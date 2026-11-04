import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag, Truck, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { finalPrice, formatPrice } from '../data/products'
import { lockScroll } from '../hooks/useSmoothScroll'
import Img from './Img'
import { ease } from './Motion'
import QtyControl from './QtyControl'

export const FREE_SHIPPING = 5000

export function ShippingProgress({ subtotal }) {
  const pct = Math.min(100, (subtotal / FREE_SHIPPING) * 100)
  const left = FREE_SHIPPING - subtotal
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-xs text-smoke">
        <Truck size={14} strokeWidth={1.5} />
        {left > 0 ? <>You're <strong className="text-ink">{formatPrice(left)}</strong> away from free delivery</> : <>You've unlocked <strong className="text-ink">free delivery</strong></>}
      </p>
      <div className="h-[3px] w-full overflow-hidden bg-sand">
        <motion.div className="h-full bg-ink" initial={false} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease }} />
      </div>
    </div>
  )
}

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, cartCount, subtotal, updateQty, removeFromCart } = useStore()

  useEffect(() => {
    lockScroll(cartOpen)
    const onKey = (e) => e.key === 'Escape' && setCartOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cartOpen, setCartOpen])

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[81] flex w-full max-w-md flex-col bg-bone shadow-2xl"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.65, ease }}
            data-lenis-prevent
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="font-display text-3xl">Your Bag <span className="text-smoke">({cartCount})</span></h2>
              <button aria-label="Close bag" onClick={() => setCartOpen(false)} className="transition-transform duration-500 hover:rotate-90"><X size={22} strokeWidth={1.4} /></button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 0.7, ease }} className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sand">
                  <ShoppingBag size={28} strokeWidth={1.2} />
                </motion.div>
                <p className="font-display text-3xl">Your bag is empty</p>
                <p className="mt-2 text-sm text-smoke">Discover the new season and find something you'll love.</p>
                <Link to="/shop" onClick={() => setCartOpen(false)} className="btn btn-dark mt-8"><span>Start Shopping</span></Link>
              </div>
            ) : (
              <>
                <div className="px-6 pt-5"><ShippingProgress subtotal={subtotal} /></div>
                <ul className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
                  <AnimatePresence initial={false}>
                    {cartItems.map((item, i) => (
                      <motion.li
                        key={item.key}
                        layout
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.15 + i * 0.05, duration: 0.6, ease } }}
                        exit={{ opacity: 0, x: 60, height: 0, marginTop: 0, transition: { duration: 0.45, ease } }}
                        className="flex gap-4"
                      >
                        <Link to={`/product/${item.id}`} onClick={() => setCartOpen(false)} className="shrink-0">
                          <Img src={item.product.images[0]} alt={item.product.name} className="h-32 w-24" />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <Link to={`/product/${item.id}`} onClick={() => setCartOpen(false)} className="text-sm font-medium leading-snug hover:underline">{item.product.name}</Link>
                            <button onClick={() => removeFromCart(item.key)} aria-label={`Remove ${item.product.name}`} className="h-fit text-smoke hover:text-clay"><X size={16} /></button>
                          </div>
                          <p className="mt-1 text-xs text-smoke">{item.color} · Size {item.size}</p>
                          <div className="mt-auto flex items-end justify-between">
                            <QtyControl small value={item.qty} min={0} onChange={(v) => updateQty(item.key, v)} />
                            <div className="text-right text-sm">
                              {item.product.salePrice && <p className="text-xs text-smoke line-through">{formatPrice(item.product.price * item.qty)}</p>}
                              <p className="font-medium">{formatPrice(finalPrice(item.product) * item.qty)}</p>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="border-t border-ink/10 px-6 py-6">
                  <div className="mb-1 flex justify-between text-sm"><span>Subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
                  <p className="mb-5 text-xs text-smoke">Taxes and delivery calculated at checkout.</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/cart" onClick={() => setCartOpen(false)} className="btn btn-outline"><span>View Bag</span></Link>
                    <Link to="/checkout" onClick={() => setCartOpen(false)} className="btn btn-dark"><span>Checkout</span></Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
