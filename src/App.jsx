import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import SearchOverlay from './components/SearchOverlay'
import Toasts from './components/Toasts'
import { ease } from './components/Motion'
import { prefersReducedMotion, scrollToTop, useSmoothScroll } from './hooks/useSmoothScroll'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/ProductPage'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import NotFound from './pages/NotFound'

function Preloader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1900)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink text-bone" exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 1, ease }}>
      <div className="overflow-hidden">
        <motion.p className="font-display text-6xl tracking-[0.4em] sm:text-8xl" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, ease, delay: 0.1 }}>
          AUREL
        </motion.p>
      </div>
      <motion.span className="absolute bottom-12 h-px w-40 origin-left bg-bone/70" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.6, ease }} />
    </motion.div>
  )
}

function PageTransition({ children }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.25 } }} exit={{ opacity: 0, transition: { duration: 0.35 } }}>
        {children}
      </motion.div>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[95] origin-bottom bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.75, ease } }}
        exit={{ scaleY: 0 }}
        style={{ transformOrigin: 'top' }}
      />
    </>
  )
}

export default function App() {
  useSmoothScroll()
  const location = useLocation()
  const [loading, setLoading] = useState(() => {
    if (prefersReducedMotion()) return false
    try { return !sessionStorage.getItem('aurel:intro') } catch { return true }
  })

  const finishIntro = () => {
    try { sessionStorage.setItem('aurel:intro', '1') } catch { /* ignore */ }
    setLoading(false)
  }

  return (
    <>
      <AnimatePresence>{loading && <Preloader onDone={finishIntro} />}</AnimatePresence>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            scrollToTop(true)
            requestAnimationFrame(() => ScrollTrigger.refresh())
          }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
            <Route path="/product/:id" element={<PageTransition><ProductPage /></PageTransition>} />
            <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
            <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
            <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
            <Route path="/account" element={<PageTransition><Account /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <Toasts />
    </>
  )
}
