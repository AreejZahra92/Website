import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { FALLBACK_POOL, heroSlides, img } from '../data/products'
import { ease } from '../components/Motion'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'

const DURATION = 6500

function RotatingBadge() {
  const text = 'NEW SEASON • AUTUMN WINTER 2026 • '
  return (
    <div className="relative h-28 w-28 sm:h-36 sm:w-36">
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spinslow">
        <defs><path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
        <text fill="currentColor" fontSize="8.6" letterSpacing="2.4" fontFamily="Manrope" fontWeight="600">
          <textPath href="#circle">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-3xl italic">A</span>
    </div>
  )
}

export default function Hero() {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  const root = useRef(null)
  const media = useRef(null)
  const copy = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % heroSlides.length), DURATION)
    return () => clearTimeout(t)
  }, [index])

  // GSAP scroll parallax: image drifts slower than the page, copy fades & lifts away.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.to(media.current, { yPercent: 22, scale: 1.08, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to(copy.current, { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: '70% top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])

  const slide = heroSlides[index]

  return (
    <section ref={root} className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink text-bone">
      <div ref={media} className="absolute inset-0 will-change-transform">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)' }}
            exit={{ opacity: 0.6 }}
            transition={{ duration: 1.5, ease }}
          >
            <motion.img
              src={slide.image}
              alt=""
              className="h-full w-full object-cover object-[center_25%]"
              initial={{ scale: reduce ? 1 : 1.18 }}
              animate={{ scale: reduce ? 1 : 1.02 }}
              transition={{ duration: DURATION / 1000 + 1.5, ease: 'linear' }}
              fetchpriority="high"
              onError={(e) => { if (!e.currentTarget.dataset.fb) { e.currentTarget.dataset.fb = '1'; e.currentTarget.src = img(FALLBACK_POOL[index], 2000) } }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" />
      </div>

      <div ref={copy} className="container-luxe relative z-10 flex h-full flex-col justify-end pb-20 sm:pb-24 lg:pb-28">
        <AnimatePresence mode="wait">
          <motion.div key={index} exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}>
            <motion.p className="eyebrow mb-6 text-bone/80" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.3 }}>
              {slide.kicker}
            </motion.p>
            <h1 className="h-display text-[19vw] sm:text-[15vw] lg:text-[11.5vw]" aria-label={slide.title.join(' ')}>
              {slide.title.map((line, li) => (
                <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.12em]" aria-hidden>
                  <motion.span
                    className={`inline-block ${li === 1 ? 'pl-[8vw] italic' : ''}`}
                    initial={{ y: reduce ? 0 : '105%', opacity: reduce ? 0 : 1 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 1.3, ease, delay: 0.45 + li * 0.14 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <motion.p className="max-w-sm text-sm leading-relaxed text-bone/80 sm:text-base" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.85 }}>
                {slide.copy}
              </motion.p>
              <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 1 }}>
                <Link to={slide.cta.to} className="btn btn-light group">
                  <span className="flex items-center gap-3">{slide.cta.label} <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" /></span>
                </Link>
                <Link to="/shop?tag=new" className="btn btn-ghost-light"><span>New Arrivals</span></Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide progress */}
      <div className="absolute bottom-6 left-0 right-0 z-10">
        <div className="container-luxe flex items-center gap-4">
          {heroSlides.map((s, i) => (
            <button key={i} onClick={() => setIndex(i)} aria-label={`Show slide ${i + 1}`} className="group flex flex-1 flex-col gap-2 text-left sm:max-w-[180px]">
              <span className="relative block h-px w-full bg-bone/25">
                {i === index && (
                  <motion.span className="absolute inset-y-0 left-0 bg-bone" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: DURATION / 1000, ease: 'linear' }} />
                )}
                {i < index && <span className="absolute inset-0 bg-bone/70" />}
              </span>
              <span className={`hidden text-[10px] uppercase tracking-[0.2em] transition-opacity sm:block ${i === index ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'}`}>
                0{i + 1} — {s.kicker}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="absolute right-6 top-28 z-10 hidden text-bone md:block lg:right-12 lg:top-36">
        <RotatingBadge />
      </div>

      <motion.div className="absolute right-6 top-1/2 z-10 hidden flex-col items-center gap-3 text-bone/70 xl:flex lg:right-14" animate={{ y: reduce ? 0 : [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
        <span className="eyebrow [writing-mode:vertical-rl]">Scroll</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  )
}
