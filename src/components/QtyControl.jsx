import { Minus, Plus } from 'lucide-react'

export default function QtyControl({ value, onChange, min = 1, max = 10, small = false }) {
  const h = small ? 'h-9' : 'h-12'
  return (
    <div className={`inline-flex ${h} items-center border border-ink/20`}>
      <button aria-label="Decrease quantity" onClick={() => onChange(value - 1)} disabled={value <= min && min > 0} className={`flex ${h} w-9 items-center justify-center transition-colors hover:bg-ink hover:text-bone disabled:opacity-30`}>
        <Minus size={14} />
      </button>
      <span className="w-8 text-center text-sm font-medium tabular-nums">{value}</span>
      <button aria-label="Increase quantity" onClick={() => onChange(value + 1)} disabled={value >= max} className={`flex ${h} w-9 items-center justify-center transition-colors hover:bg-ink hover:text-bone disabled:opacity-30`}>
        <Plus size={14} />
      </button>
    </div>
  )
}
