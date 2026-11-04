import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { Reveal, SplitHeading } from '../components/Motion'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'

// Pinned horizontal-scroll gallery on desktop (GSAP ScrollTrigger); swipeable row on touch.
export default function Featured() {
  const items = products.filter((p) => p.tags.includes('featured'))
  const section = useRef(null)
  const track = useRef(null)
  const bar = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const distance = () => track.current.scrollWidth - window.innerWidth + 48
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => bar.current && (bar.current.style.transform = `scaleX(${self.progress})`),
        },
      })
      return () => tween.scrollTrigger?.kill()
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={section} className="relative overflow-hidden bg-ink text-bone lg:h-screen">
      <div className="flex h-full flex-col justify-center py-20 lg:py-0">
        <div ref={track} className="no-scrollbar flex items-center gap-6 overflow-x-auto px-5 sm:px-8 lg:gap-10 lg:overflow-visible lg:px-12">
          <div className="w-[80vw] shrink-0 sm:w-[50vw] lg:w-[34vw] lg:pr-10">
            <Reveal><p className="eyebrow mb-6 text-bone/50">Featured — Curated by the studio</p></Reveal>
            <SplitHeading text="Pieces worth keeping" className="h-display text-6xl lg:text-[6.5vw]" />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-sm text-sm leading-relaxed text-bone/60">
                A tight edit of statement pieces — the coats, gowns and leather goods our customers return to season after season.
              </p>
              <Link to="/shop?tag=featured" className="btn btn-ghost-light group mt-10">
                <span className="flex items-center gap-3">Shop the edit <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          </div>
          {items.map((p, i) => (
            <div key={p.id} className={`w-[70vw] shrink-0 sm:w-[42vw] lg:w-[24vw] [&_.text-smoke]:text-bone/50 [&_.ring-offset-bone]:ring-offset-ink ${i % 2 ? 'lg:mt-24' : 'lg:-mt-16'}`}>
              <ProductCard product={p} index={i} />
            </div>
          ))}
          <div className="w-4 shrink-0 lg:w-12" />
        </div>
        <div className="container-luxe mt-10 hidden lg:block">
          <div className="h-px w-full bg-bone/15">
            <div ref={bar} className="h-full origin-left scale-x-0 bg-bone" />
          </div>
        </div>
      </div>
    </section>
  )
}
