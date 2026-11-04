import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { ease } from './Motion'

export default function Toasts() {
  const { toasts } = useStore()
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[90] flex w-[92%] max-w-sm -translate-x-1/2 flex-col gap-2 sm:left-auto sm:right-6 sm:translate-x-0" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.5, ease }}
            className="pointer-events-auto flex items-center gap-3 bg-ink p-3 pr-5 text-bone shadow-2xl"
          >
            {t.image ? <img src={t.image} alt="" className="h-12 w-10 bg-smoke object-cover" onError={(e) => (e.currentTarget.style.visibility = 'hidden')} /> : null}
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bone text-ink"><Check size={12} strokeWidth={3} /></span>
            <p className="text-xs leading-snug">{t.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
