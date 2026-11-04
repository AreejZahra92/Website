import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Lock } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../data/products'
import Img from '../components/Img'
import { ease } from '../components/Motion'
import { OrderSummary } from './Cart'

const Field = ({ label, error, ...props }) => (
  <label className="block">
    <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-smoke">{label}</span>
    <input {...props} className={`w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-ink ${error ? 'border-clay' : 'border-ink/20'}`} />
    {error && <span className="mt-1 block text-xs text-clay">{error}</span>}
  </label>
)

export default function Checkout() {
  const { cartItems, clearCart } = useStore()
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: 'Karachi' })
  const [pay, setPay] = useState('cod')
  const [errors, setErrors] = useState({})
  const [order, setOrder] = useState(null)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const place = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (form.phone.replace(/\D/g, '').length < 10) errs.phone = 'Enter a valid phone number'
    if (!form.address.trim()) errs.address = 'Required'
    setErrors(errs)
    if (Object.keys(errs).length) return
    setOrder({ no: `AU-${Math.floor(100000 + Math.random() * 899999)}`, items: cartItems.length, name: form.name.split(' ')[0] })
    clearCart()
  }

  if (order) {
    return (
      <div className="container-luxe flex min-h-[75vh] flex-col items-center justify-center py-24 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }} className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-ink text-bone"><Check size={30} /></motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease }} className="h-display text-6xl lg:text-7xl">Thank you, {order.name}.</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 text-sm text-smoke">Order <strong className="text-ink">{order.no}</strong> is confirmed. This is a demo — no payment was taken.</motion.p>
        <Link to="/" className="btn btn-dark mt-10"><span>Back to home</span></Link>
      </div>
    )
  }

  if (!cartItems.length) {
    return (
      <div className="container-luxe flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="font-display text-4xl">There's nothing to check out yet.</p>
        <Link to="/shop" className="btn btn-dark mt-8"><span>Shop the collection</span></Link>
      </div>
    )
  }

  return (
    <div className="container-luxe pb-28 pt-12 lg:pt-16">
      <h1 className="h-display mb-12 text-6xl lg:text-7xl">Checkout</h1>
      <form onSubmit={place} noValidate className="grid gap-12 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-7">
          <section>
            <p className="eyebrow mb-5">1 — Contact</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" value={form.name} onChange={set('name')} error={errors.name} autoComplete="name" />
              <Field label="Phone" value={form.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" placeholder="03XX XXXXXXX" />
              <div className="sm:col-span-2"><Field label="Email" type="email" value={form.email} onChange={set('email')} error={errors.email} autoComplete="email" /></div>
            </div>
          </section>
          <section>
            <p className="eyebrow mb-5">2 — Delivery</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2"><Field label="Street address" value={form.address} onChange={set('address')} error={errors.address} autoComplete="street-address" /></div>
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-smoke">City</span>
                <select value={form.city} onChange={set('city')} className="w-full border border-ink/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-ink">
                  {['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Hyderabad', 'Sukkur', 'Peshawar', 'Quetta'].map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
            </div>
          </section>
          <section>
            <p className="eyebrow mb-5">3 — Payment</p>
            <div className="space-y-3">
              {[['cod', 'Cash on delivery', 'Pay when your order arrives'], ['card', 'Credit / debit card', 'Card entry is disabled in this demo']].map(([id, title, sub]) => (
                <label key={id} className={`flex cursor-pointer items-center gap-4 border p-4 transition-colors ${pay === id ? 'border-ink' : 'border-ink/15'}`}>
                  <input type="radio" name="pay" className="sr-only" checked={pay === id} onChange={() => setPay(id)} />
                  <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${pay === id ? 'border-ink' : 'border-ink/30'}`}>{pay === id && <span className="h-2 w-2 rounded-full bg-ink" />}</span>
                  <span><span className="block text-sm font-medium">{title}</span><span className="text-xs text-smoke">{sub}</span></span>
                </label>
              ))}
            </div>
            <AnimatePresence>
              {pay === 'card' && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-3 flex items-center gap-2 text-xs text-smoke">
                  <Lock size={12} /> Payments aren’t connected in this prototype — your order will be confirmed without charging.
                </motion.p>
              )}
            </AnimatePresence>
          </section>
        </div>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <ul className="mb-6 space-y-4">
              {cartItems.map((i) => (
                <li key={i.key} className="flex items-center gap-4">
                  <div className="relative"><Img src={i.product.images[0]} alt="" className="h-20 w-16" /><span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] text-bone">{i.qty}</span></div>
                  <div className="flex-1 text-sm"><p className="font-medium">{i.product.name}</p><p className="text-xs text-smoke">{i.color} · {i.size}</p></div>
                  <p className="text-sm">{formatPrice((i.product.salePrice ?? i.product.price) * i.qty)}</p>
                </li>
              ))}
            </ul>
            <OrderSummary cta={<button type="submit" className="btn btn-dark w-full"><span className="flex items-center gap-2"><Lock size={13} /> Place order</span></button>} />
          </div>
        </div>
      </form>
    </div>
  )
}
