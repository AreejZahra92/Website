import Hero from '../sections/Hero'
import NewArrivals from '../sections/NewArrivals'
import CollectionShowcase from '../sections/CollectionShowcase'
import Featured from '../sections/Featured'
import Seasonal from '../sections/Seasonal'
import Editorial from '../sections/Editorial'
import BestSellers from '../sections/BestSellers'
import Promo from '../sections/Promo'
import Newsletter from '../sections/Newsletter'
import Marquee from '../components/Marquee'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="border-b border-ink/10 bg-bone py-5">
        <Marquee
          fast
          items={['Wool', 'Silk', 'Leather', 'Linen', 'Cashmere', 'Denim', 'Merino']}
          separator="—"
          itemClassName="font-display text-2xl italic text-smoke sm:text-3xl"
        />
      </div>
      <NewArrivals />
      <CollectionShowcase which="women" />
      <CollectionShowcase which="men" reverse />
      <Featured />
      <Seasonal />
      <Editorial />
      <BestSellers />
      <Promo />
      <Newsletter />
    </>
  )
}
