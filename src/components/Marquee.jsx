// Infinite horizontal ticker. Content is duplicated so the -50% loop is seamless.
export default function Marquee({ items, className = '', itemClassName = '', separator = '✦', fast = false, reverse = false }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className={`flex items-center whitespace-nowrap ${itemClassName}`}>
          {t}
          <span className="mx-6 opacity-50 sm:mx-10">{separator}</span>
        </span>
      ))}
    </div>
  )
  return (
    <div className={`group flex overflow-hidden ${className}`}>
      <div
        className={`flex w-max ${fast ? 'animate-marquee-fast' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  )
}
