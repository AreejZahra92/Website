import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { img } from '../data/products'
import Img from '../components/Img'
import { Reveal, SplitHeading, ease } from '../components/Motion'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [pref, setPref] = useState('Both')
  const [state, setState] = useState('idle') // idle | error | done

  const submit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setState('error')
    try { localStorage.setItem('aurel:newsletter', JSON.stringify({ email, pref })) } catch { /* ignore */ }
    setState('done')
  }

  return (
    <section className="container-luxe py-24 lg:py-36">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="relative hidden lg:col-span-5 lg:block">
          <Reveal y={60}>
            <Img src={img('1441984904996-e0b6ba687e04', 1000)} alt="" className="aspect-[4/5] w-[80%]" />
          </Reveal>
          <Reveal y={100} delay={0.15} className="absolute -bottom-12 right-0 w-[45%]">
            <Img src={img('1490481651871-ab68de25d43d', 700)} alt="" className="aspect-[3/4] shadow-2xl" />
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal><p className="eyebrow mb-6 text-smoke">The AUREL Letter</p></Reveal>
          <SplitHeading text="Join for 10% off your first order" className="h-display text-5xl sm:text-6xl lg:text-7xl" />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-smoke">Early access to drops, private sales and stories from the studio. One email a week, never more.</p>
          </Reveal>

          <Reveal delay={0.25} className="mt-10">
            <AnimatePresence mode="wait">
              {state === 'done' ? (
                <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="flex items-start gap-4 border border-ink/15 p-6">
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-bone">
                    <Check size={18} />
                  </motion.span>
                  <div>
                    <p className="font-display text-2xl">Welcome to AUREL.</p>
                    <p className="mt-1 text-sm text-smoke">Use code <strong className="text-ink">WELCOME10</strong> at checkout. We've noted {email}.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" exit={{ opacity: 0, y: -10 }} onSubmit={submit} noValidate>
                  <div className="mb-6 flex gap-2">
                    {['Women', 'Men', 'Both'].map((p) => (
                      <button type="button" key={p} onClick={() => setPref(p)} className={`border px-4 py-2 text-xs transition-colors duration-300 ${pref === p ? 'border-ink bg-ink text-bone' : 'border-ink/20 hover:border-ink'}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                  <div className={`group flex items-center border-b pb-3 transition-colors ${state === 'error' ? 'border-clay' : 'border-ink'}`}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setState('idle') }}
                      placeholder="Your email address"
                      aria-label="Email address"
                      className="w-full bg-transparent py-2 text-lg outline-none placeholder:text-stone"
                    />
                    <button type="submit" aria-label="Subscribe" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-bone transition-transform duration-500 hover:scale-110 hover:bg-clay">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  <AnimatePresence>
                    {state === 'error' && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-3 text-xs text-clay">
                        Please enter a valid email address.
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <p className="mt-4 text-[11px] text-smoke">By subscribing you agree to receive marketing emails. Unsubscribe anytime.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
