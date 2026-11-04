import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { seasonal } from '../data/products'
import Img from '../components/Img'
import { SectionHeader, ease } from '../components/Motion'

// Expanding accordion panels on desktop, stacked cards on mobile.
export default function Seasonal() {
  const [active, setActive] = useState(0)
  return (
    <section className="container-luxe py-24 lg:py-36">
      <SectionHeader eyebrow="Autumn / Winter 2026" title="The Winter Edit" />
      <div className="flex flex-col gap-3 lg:h-[78vh] lg:flex-row">
        {seasonal.map((s, i) => {
          const isActive = active === i
          return (
            <motion.div
              key={s.title}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease, delay: i * 0.1 }}
              className={`relative h-[60vh] overflow-hidden transition-[flex-grow] duration-[900ms] ease-luxe sm:h-[70vh] lg:h-full ${isActive ? 'lg:flex-[3.2]' : 'lg:flex-[1]'}`}
            >
              <Link to={s.to} className="group absolute inset-0 block text-bone">
                <Img src={s.image} alt={s.title} className="absolute inset-0" imgClassName={`transition-transform duration-[1.6s] ease-luxe ${isActive ? 'scale-100' : 'scale-110'}`} />
                <div className={`absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'lg:opacity-70'}`} />
                <span className="absolute left-5 top-5 font-display text-xl italic">0{i + 1}</span>
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <p className={`eyebrow mb-3 text-bone/70 transition-all duration-700 ${isActive ? 'opacity-100' : 'lg:opacity-0'}`}>{s.label}</p>
                  <div className="flex items-end justify-between gap-4">
                    <h3 className={`h-display whitespace-nowrap text-5xl transition-all duration-700 ease-luxe lg:text-6xl ${isActive ? '' : 'lg:origin-bottom-left lg:-rotate-90 lg:translate-x-8 lg:-translate-y-2 lg:text-4xl'}`}>
                      {s.title}
                    </h3>
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bone text-ink transition-all duration-700 ${isActive ? 'scale-100 opacity-100' : 'lg:scale-50 lg:opacity-0'}`}>
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
