import { Link } from 'react-router-dom'
import { ArrowUpRight, CreditCard, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { scrollToTop } from '../hooks/useSmoothScroll'
import { Reveal } from './Motion'

const perks = [
  { icon: Truck, title: 'Free Delivery', copy: 'On all orders over Rs. 5,000' },
  { icon: RotateCcw, title: '30-Day Returns', copy: 'Easy exchanges, no questions' },
  { icon: ShieldCheck, title: 'Secure Checkout', copy: 'Encrypted, protected payments' },
  { icon: CreditCard, title: 'Pay Your Way', copy: 'Cards, wallets & cash on delivery' },
]

const cols = [
  { title: 'Shop', links: [['New Arrivals', '/shop?tag=new'], ['Women', '/shop?cat=women'], ['Men', '/shop?cat=men'], ['Accessories', '/shop?cat=accessories'], ['Sale', '/shop?tag=sale']] },
  { title: 'Help', links: [['My Account', '/account'], ['My Bag', '/cart'], ['Wishlist', '/wishlist'], ['Delivery & Returns', '/account'], ['Size Guide', '/shop']] },
  { title: 'Follow', links: [['Instagram', 'https://instagram.com'], ['TikTok', 'https://tiktok.com'], ['Pinterest', 'https://pinterest.com'], ['YouTube', 'https://youtube.com']] },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <div className="border-b border-bone/10">
        <div className="container-luxe grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, copy }, i) => (
            <Reveal key={title} delay={i * 0.08} className="flex items-start gap-4">
              <Icon size={22} strokeWidth={1.2} className="mt-0.5 shrink-0 text-stone" />
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-xs text-bone/50">{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="container-luxe grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-display text-4xl leading-tight lg:text-5xl">Clothes made slowly,<br /><em className="text-stone">worn for years.</em></p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-bone/50">AUREL designs considered essentials in natural fibres — cut with care, finished by hand and made to outlast trends.</p>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="lg:col-span-2">
            <p className="eyebrow mb-5 text-bone/40">{c.title}</p>
            <ul className="space-y-3 text-sm">
              {c.links.map(([label, to]) => (
                <li key={label}>
                  {to.startsWith('http') ? (
                    <a href={to} target="_blank" rel="noreferrer" className="link-underline text-bone/80 hover:text-bone">{label}</a>
                  ) : (
                    <Link to={to} className="link-underline text-bone/80 hover:text-bone">{label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="lg:col-span-1 lg:text-right">
          <button onClick={() => scrollToTop(false)} className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-bone/70 hover:text-bone">
            Top <ArrowUpRight size={14} className="-rotate-45 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden">
        <p className="h-display -mb-[0.18em] whitespace-nowrap text-center text-[27vw] leading-none text-bone/[0.06]">AUREL</p>
      </div>

      <div className="border-t border-bone/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-[11px] text-bone/40 sm:flex-row">
          <p>© 2026 AUREL Studio. A frontend prototype — no real orders are placed.</p>
          <p>Photography via Unsplash</p>
        </div>
      </div>
    </footer>
  )
}
