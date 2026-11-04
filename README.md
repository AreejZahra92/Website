# AUREL — Premium Fashion E-Commerce (Frontend Prototype)

An animated, editorial fashion storefront built with React + Vite, Tailwind CSS, Framer Motion, GSAP ScrollTrigger and Lenis.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the build
```

Requires Node 18+. Product photos load from Unsplash, so you need an internet connection.

## What's inside

**Homepage:** moving announcement bar → transparent/sticky nav with mega-menu → 3-slide hero (curtain wipe, Ken Burns zoom, masked headline reveal, scroll parallax, rotating badge) → material ticker → New Arrivals (animated category tabs) → Women & Men showcases (parallax image + floating inset) → Featured (GSAP pinned horizontal scroll) → Winter Edit (expanding accordion panels) → full-bleed campaign banner (scroll-driven giant type) → Best Sellers (marquee header) → Winter Sale with live countdown → Newsletter → footer.

**Shopping:** product cards with hover image swap, zoom, quick-add size picker, colour swatches and wishlist hearts; add-to-cart "fly to bag" animation; cart drawer with free-delivery progress; full bag page with promo codes (`WELCOME10`, `AUREL20`); checkout with validation and order confirmation; product pages with gallery (thumbnails, swipe, hover zoom), colour/size selectors, size guide, quantity, accordions and related items; shop page with category, type, colour and price filters plus sorting; search overlay; wishlist; demo account. Cart, wishlist, account and promo code persist in localStorage.

**Motion & accessibility:** Lenis smooth scrolling synced with GSAP; IntersectionObserver-based reveals via Framer Motion `whileInView`; all motion respects `prefers-reduced-motion` (Lenis, GSAP effects and the preloader are skipped).

## Structure

```
src/
  data/products.js        # 20 products, collections, hero slides, helpers
  context/StoreContext    # cart, wishlist, toasts, drawers (localStorage)
  hooks/useSmoothScroll   # Lenis + ScrollTrigger
  components/             # Navbar, CartDrawer, SearchOverlay, ProductCard, Img, Motion helpers…
  sections/               # Homepage sections
  pages/                  # Home, Shop, ProductPage, Wishlist, Cart, Checkout, Account, NotFound
```

Photography: Unsplash (free under the Unsplash License). The `<Img>` component falls back to backup photos, then to a branded tile, so a failed image never shows a broken icon.
