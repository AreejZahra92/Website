import { motion, useReducedMotion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

// Fade + slide-up reveal triggered when entering the viewport (IntersectionObserver under the hood).
export function Reveal({ children, delay = 0, y = 40, className = '', as = 'div', once = true, amount = 0.25 }) {
  const reduce = useReducedMotion()
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: reduce ? 0.3 : 1, ease, delay }}
    >
      {children}
    </Comp>
  )
}

// Staggered word-by-word heading reveal with a masked slide-up.
export function SplitHeading({ text, className = '', delay = 0, stagger = 0.06, as = 'h2', animateNow = false }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  const Tag = motion[as]
  const container = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }
  const word = {
    hidden: reduce ? { opacity: 0 } : { y: '110%' },
    show: { y: '0%', opacity: 1, transition: { duration: 1.1, ease } },
  }
  const triggerProps = animateNow
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.5 } }
  return (
    <Tag className={className} variants={container} {...triggerProps} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <motion.span className="inline-block" variants={word}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

// Image that unveils with a curtain wipe when scrolled into view.
export function CurtainReveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.4, ease, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.8, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export function SectionHeader({ eyebrow, title, action, light = false, className = '' }) {
  return (
    <div className={`mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between ${className}`}>
      <div>
        <Reveal>
          <p className={`eyebrow mb-4 ${light ? 'text-bone/60' : 'text-smoke'}`}>{eyebrow}</p>
        </Reveal>
        <SplitHeading text={title} className={`h-display text-5xl sm:text-6xl lg:text-7xl ${light ? 'text-bone' : ''}`} />
      </div>
      {action && <Reveal delay={0.2}>{action}</Reveal>}
    </div>
  )
}
