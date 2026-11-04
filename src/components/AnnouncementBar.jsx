import Marquee from './Marquee'

const messages = [
  'Free nationwide delivery on orders over Rs. 5,000',
  'Winter Edit — up to 30% off selected styles',
  'New arrivals every Friday',
  'Easy 30-day returns & exchanges',
  'Members get early access to the AW26 drop',
]

export default function AnnouncementBar() {
  return (
    <div className="relative z-50 bg-ink py-2.5 text-bone">
      <Marquee items={messages} itemClassName="text-[10.5px] font-medium uppercase tracking-[0.22em]" />
    </div>
  )
}
