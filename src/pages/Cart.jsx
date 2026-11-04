import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { finalPrice, formatPrice } from '../data/products'
import Img from '../components/Img'
import QtyControl from '../components/QtyControl'
import { SplitHeading, ease } from '../components/Motion'
import { FREE_SHIPPING, ShippingProgress } from '../components/CartDrawer'

export const PROMOS = { WELCOME10: 0.1, AUREL20: 0.2 }

export function useTotals() {
  const { subtotal } = useStore()
  const [code, setCode] = useState(() => { try { return localStorage.getItem('aurel:promo') || '' } catch { return '' } })
  const rate = PROMOS[code] || 0
  const discount = Math.round(subtotal * rate)
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : 250
  const apply = (c) => { setCode(c); try { localStorage.setItem('aurel:promo', c) } catch { /* ignore */ } }
  return { subtotal, code, discount, shipping, total: subtotal - discount + shipping, apply }
}

export function OrderSummary({ cta }) {
  const { savings } = useStore()
  const { subtotal, code, discount, shipping, total, apply } = useTotals()
  const [input, setInput] = useState('')
  const [msg, setMsg] = useState(null)
  const submit = (e) => {
    e.preventDefault()
    const c = input.trim().toUpperCase()
    if (PROMOS[c]) { apply(c); setMsg({ ok: true, text: `${c} applied — ${PROMOS[c] * 100}% off` }); setInput('') }
    else setMsg({ ok: false, text: 'That code isn’t valid. Try WELCOME10.' })
  }
  return (
    <div className="bg-sand/60 p-6 lg:p-8">
      <p className="mb-6 font-display text-3xl">Order Summary</p>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        {savings > 0 && <div className="flex justify-between text-clay"><span>Sale savings</span><span>−{formatPrice(savings)}</span></div>}
        {discount > 0 && (
          <div className="flex justify-between text-clay">
            <span className="flex items-center gap-2">Promo {code} <button onClick={() => { apply(''); setMsg(null) }} aria-label="Remove promo"><X size={12} /></button></span>
            <span>−{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between"><span>Delivery</span><span>{shipping ? formatPrice(shipping) : 'Free'}</span></div>
      </div>
      <form onSubmit={submit} className="mt-6 flex border-b border-ink/30">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Promo code" className="flex-1 bg-transparent py-3 text-sm uppercase outline-none placeholder:normal-case placeholder:text-smoke" />
        <button className="text-[11px] font-semibold uppercase tracking-[0.18em]">Apply</button>
      </form>
      {msg && <p className={`mt-2 text-xs ${msg.ok ? 'text-moss' : 'text-clay'}`}>{msg.text}</p>}
      <div className="mt-6 flex justify-between border-t border-ink/15 pt-5 text-lg font-medium"><span>Total</span><span>{formatPrice(total)}</span></div>
      <p className="mb-6 text-xs text-smoke">Including GST</p>
      {cta}
    </div>
  )
}

export default function Cart() {
  const { cartItems, cartCount, subtotal, updateQty, removeFromCart } = useStore()
  return (
    <div className="container-luxe min-h-[70vh] pb-28 pt-12 lg:pt-16">
      <SplitHeading text="Shopping Bag" as="h1" animateNow className="h-display text-6xl sm:text-7xl lg:text-8xl" />
      <p className="mt-4 text-sm text-smoke">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>

      {cartItems.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease }} className="mt-20 flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sand"><ShoppingBag size={26} strokeWidth={1.2} /></div>
          <p className="font-display text-4xl">Your bag is empty</p>
          <Link to="/shop" className="btn btn-dark mt-8"><span>Continue shopping</span></Link>
        </motion.div>
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-8"><ShippingProgress subtotal={subtotal} /></div>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              <AnimatePresence initial={false}>
                {cartItems.map((item) => (
                  <motion.li key={item.key} layout exit={{ opacity: 0, x: -40, height: 0 }} transition={{ duration: 0.45, ease }} className="flex gap-5 overflow-hidden py-6">
                    <Link to={`/product/${item.id}`} className="shrink-0"><Img src={item.product.images[0]} alt={item.product.name} className="h-40 w-28 sm:h-48 sm:w-36" /></Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-smoke">{item.product.type}</p>
                          <Link to={`/product/${item.id}`} className="mt-1 block font-display text-2xl hover:text-clay">{item.product.name}</Link>
                          <p className="mt-1 text-sm text-smoke">{item.color} · Size {item.size}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.key)} className="h-fit text-xs text-smoke underline-offset-4 hover:text-clay hover:underline">Remove</button>
                      </div>
                      <div className="mt-auto flex items-end justify-between pt-4">
                        <QtyControl value={item.qty} onChange={(v) => updateQty(item.key, Math.max(1, v))} />
                        <div className="text-right">
                          {item.product.salePrice && <p className="text-xs text-smoke line-through">{formatPrice(item.product.price * item.qty)}</p>}
                          <p className="font-medium">{formatPrice(finalPrice(item.product) * item.qty)}</p>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <OrderSummary cta={<Link to="/checkout" className="btn btn-dark w-full"><span>Proceed to checkout</span></Link>} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
