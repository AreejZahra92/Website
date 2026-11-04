import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'
import { img } from '../data/products'
import Img from '../components/Img'
import { ease } from '../components/Motion'

const loadUser = () => { try { return JSON.parse(localStorage.getItem('aurel:user')) } catch { return null } }

export default function Account() {
  const { wishlist, cartCount } = useStore()
  const [user, setUser] = useState(loadUser)
  const [mode, setMode] = useState('in')
  const [form, setForm] = useState({ name: '', email: '' })
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError('Please enter a valid email.')
    const u = { name: form.name || form.email.split('@')[0], email: form.email }
    try { localStorage.setItem('aurel:user', JSON.stringify(u)) } catch { /* ignore */ }
    setUser(u)
  }
  const signOut = () => { try { localStorage.removeItem('aurel:user') } catch { /* ignore */ } setUser(null) }

  return (
    <div className="container-luxe grid min-h-[75vh] items-center gap-12 py-16 lg:grid-cols-2">
      <div className="hidden lg:block"><Img src={img('1445205170230-053b83016050', 1200)} alt="" className="aspect-[4/5]" /></div>
      <AnimatePresence mode="wait">
        {user ? (
          <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}>
            <p className="eyebrow mb-4 text-smoke">My Account</p>
            <h1 className="h-display text-6xl capitalize">Hello, {user.name}</h1>
            <p className="mt-3 text-sm text-smoke">{user.email}</p>
            <div className="mt-10 grid grid-cols-2 gap-4">
              <Link to="/wishlist" className="border border-ink/15 p-6 transition-colors hover:border-ink"><p className="font-display text-5xl">{wishlist.length}</p><p className="eyebrow mt-2 text-smoke">Wishlist</p></Link>
              <Link to="/cart" className="border border-ink/15 p-6 transition-colors hover:border-ink"><p className="font-display text-5xl">{cartCount}</p><p className="eyebrow mt-2 text-smoke">In your bag</p></Link>
            </div>
            <button onClick={signOut} className="btn btn-outline mt-10"><span>Sign out</span></button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }} className="max-w-md">
            <div className="mb-10 flex gap-6">
              {[['in', 'Sign in'], ['up', 'Create account']].map(([id, label]) => (
                <button type="button" key={id} onClick={() => setMode(id)} className={`relative pb-2 font-display text-3xl transition-colors ${mode === id ? '' : 'text-stone hover:text-smoke'}`}>
                  {label}
                  {mode === id && <motion.span layoutId="acct-line" className="absolute inset-x-0 bottom-0 h-px bg-ink" />}
                </button>
              ))}
            </div>
            {mode === 'up' && (
              <label className="mb-4 block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-smoke">Name</span>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-ink/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-ink" />
              </label>
            )}
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-smoke">Email</span>
              <input type="email" value={form.email} onChange={(e) => { setForm({ ...form, email: e.target.value }); setError('') }} className="w-full border border-ink/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-ink" />
            </label>
            {error && <p className="mt-2 text-xs text-clay">{error}</p>}
            <p className="mt-4 text-xs text-smoke">Demo account — no password needed; details are saved only in this browser.</p>
            <button className="btn btn-dark mt-8 w-full"><span>{mode === 'in' ? 'Sign in' : 'Create account'}</span></button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
