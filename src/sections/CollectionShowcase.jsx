import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import { collections, products } from '../data/products'
import Img from '../components/Img'
import ProductCard from '../components/ProductCard'
import { Reveal, SplitHeading } from '../components/Motion'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'

// Large editorial panel with a parallax image + 4 curated products.
export default function CollectionShowcase({ which = 'women', reverse = false }) {
  const c = collections[which]
  const items = products.filter((p) => p.category === which).slice(0, 4)
  const root = useRef(null)
  const imgWrap = useRef(null)
  const floatImg = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(imgWrap.current, { yPercent: -12 }, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.fromTo(floatImg.current, { yPercent: 40 }, { yPercent: -40, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 } })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className={`py-16 lg:py-24 ${which === 'men' ? 'bg-sand/60' : ''}`}>
      <div className={`container-luxe grid items-start gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className={`relative lg:sticky lg:top-28 lg:col-span-6 ${reverse ? 'lg:order-2' : ''}`}>
          <Link to={`/shop?cat=${which}`} className="group relative block aspect-[4/5] overflow-hidden">
            <div ref={imgWrap} className="absolute -inset-y-[14%] inset-x-0">
              <Img src={c.image} alt={`${c.title} collection`} className="h-full w-full" imgClassName="transition-transform duration-[1.6s] ease-luxe group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-bone sm:p-10">
              <div>
                <p className="eyebrow mb-3 text-bone/70">The Collection</p>
                <SplitHeading text={c.title} as="h2" className="h-display text-7xl sm:text-8xl lg:text-[9rem]" />
              </div>
              <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-bone/60 transition-all duration-500 group-hover:rotate-45 group-hover:bg-bone group-hover:text-ink">
                <ArrowUpRight size={20} strokeWidth={1.4} />
              </span>
            </div>
          </Link>
          <div ref={floatImg} className={`absolute -bottom-10 hidden w-40 shadow-2xl xl:block ${reverse ? '-left-14' : '-right-14'}`}>
            <Img src={c.detail} alt="" className="aspect-[3/4]" />
          </div>
        </div>

        <div className={`lg:col-span-6 ${reverse ? 'lg:order-1' : ''}`}>
          <Reveal>
            <p className="eyebrow mb-4 text-smoke">{which === 'women' ? '01 — Womenswear' : '02 — Menswear'}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-10 max-w-md font-display text-3xl leading-snug lg:text-4xl">{c.subtitle}.</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:gap-x-6">
            {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
          <Reveal className="mt-12">
            <Link to={`/shop?cat=${which}`} className="btn btn-outline"><span>Shop all {c.title.toLowerCase()}</span></Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
