import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { editorial } from '../data/products'
import Img from '../components/Img'
import { Reveal } from '../components/Motion'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'

// Full-bleed campaign banner: parallax background, scroll-driven giant type, floating inset frame.
export default function Editorial() {
  const root = useRef(null)
  const bg = useRef(null)
  const lineA = useRef(null)
  const lineB = useRef(null)
  const inset = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true }
      gsap.fromTo(bg.current, { yPercent: -15, scale: 1.15 }, { yPercent: 15, scale: 1, ease: 'none', scrollTrigger: st })
      gsap.fromTo(lineA.current, { xPercent: 10 }, { xPercent: -25, ease: 'none', scrollTrigger: st })
      gsap.fromTo(lineB.current, { xPercent: -25 }, { xPercent: 5, ease: 'none', scrollTrigger: st })
      gsap.fromTo(inset.current, { yPercent: 30, rotate: 4 }, { yPercent: -30, rotate: -3, ease: 'none', scrollTrigger: { ...st, scrub: 1.2 } })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="grain relative h-[110vh] min-h-[640px] overflow-hidden bg-ink text-bone">
      <div ref={bg} className="absolute inset-0 will-change-transform">
        <Img src={editorial.image} alt="AUREL campaign" className="h-full w-full" imgClassName="object-[center_30%]" />
      </div>
      <div className="absolute inset-0 bg-ink/45" />

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-2 overflow-hidden">
        <p ref={lineA} className="h-display whitespace-nowrap text-[22vw] leading-none text-bone/90 lg:text-[16vw]">The Art of Less</p>
        <p ref={lineB} className="h-display whitespace-nowrap pl-[20vw] text-[22vw] italic leading-none text-transparent [-webkit-text-stroke:1px_rgba(244,241,236,.7)] lg:text-[16vw]">
          Campaign No.7
        </p>
      </div>

      <div ref={inset} className="absolute right-[6%] top-[14%] hidden w-[18vw] max-w-[260px] shadow-2xl md:block">
        <Img src={editorial.inset} alt="" className="aspect-[3/4]" />
        <p className="eyebrow mt-3 text-[9.5px] text-bone/70">Look 14 — Editorial Knit Set</p>
      </div>

      <div className="container-luxe absolute inset-x-0 bottom-0 pb-14 lg:pb-20">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-md">
            <p className="eyebrow mb-4 text-bone/60">The Campaign — AW26</p>
            <p className="font-display text-3xl leading-snug lg:text-4xl">Shot in the dunes outside Karachi, a study in texture, restraint and quiet confidence.</p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/shop?tag=seasonal" className="btn btn-light"><span>Discover the Campaign</span></Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
