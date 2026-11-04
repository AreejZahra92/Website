import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { img } from '../data/products'
import Img from '../components/Img'
import { CurtainReveal, Reveal, SplitHeading } from '../components/Motion'

const endsAt = (() => {
  const d = new Date()
  d.setDate(d.getDate() + 3)
  d.setHours(23, 59, 59, 0)
  return d.getTime()
})()

function useCountdown(target) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const diff = Math.max(0, target - now)
  return {
    Days: Math.floor(diff / 86400000),
    Hours: Math.floor((diff / 3600000) % 24),
    Mins: Math.floor((diff / 60000) % 60),
    Secs: Math.floor((diff / 1000) % 60),
  }
}

export default function Promo() {
  const time = useCountdown(endsAt)
  const reduce = useReducedMotion()
  return (
    <section className="relative overflow-hidden bg-clay text-bone">
      <div className="container-luxe grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <div className="relative z-10 order-2 lg:order-1">
          <Reveal><p className="eyebrow mb-6 text-bone/70">Limited time — Winter Sale</p></Reveal>
          <SplitHeading text="Up to 30% off the season's icons" className="h-display text-6xl sm:text-7xl lg:text-8xl" />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-bone/75">Overcoats, silk and leather at their best prices of the year. Ends Sunday at midnight — while sizes last.</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex gap-3 sm:gap-5">
            {Object.entries(time).map(([label, v]) => (
              <div key={label} className="min-w-[68px] border border-bone/25 px-3 py-4 text-center sm:min-w-[84px]">
                <motion.span key={v} initial={{ y: reduce ? 0 : -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="block font-display text-4xl tabular-nums sm:text-5xl">
                  {String(v).padStart(2, '0')}
                </motion.span>
                <span className="text-[9.5px] uppercase tracking-[0.2em] text-bone/60">{label}</span>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.4} className="mt-10">
            <Link to="/shop?tag=sale" className="btn btn-light"><span>Shop the Sale</span></Link>
          </Reveal>
        </div>

        <div className="relative order-1 lg:order-2">
          <CurtainReveal className="ml-auto aspect-[4/5] w-[85%]">
            <Img src={img('1483985988355-763728e1935b', 1200)} alt="Winter sale" className="h-full w-full" />
          </CurtainReveal>
          <div className="absolute -left-2 bottom-10 w-[38%] animate-floaty shadow-2xl sm:left-0">
            <Img src={img('1584917865442-de89df76afd3', 700)} alt="" className="aspect-square" />
          </div>
          <motion.div
            className="absolute -top-6 left-[8%] flex h-28 w-28 items-center justify-center rounded-full bg-bone text-center text-ink shadow-xl sm:h-36 sm:w-36"
            initial={{ scale: 0, rotate: -40 }}
            whileInView={{ scale: 1, rotate: -12 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.6 }}
          >
            <span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em]">Up to</span>
              <span className="block font-display text-5xl leading-none sm:text-6xl">30%</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em]">Off</span>
            </span>
          </motion.div>
        </div>
      </div>
      {/* Floating decorative rings */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] animate-floaty rounded-full border border-bone/10" />
      <div className="pointer-events-none absolute -bottom-52 left-1/3 h-[420px] w-[420px] animate-floaty rounded-full border border-bone/10 [animation-delay:-3s]" />
    </section>
  )
}
