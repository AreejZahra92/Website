import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { finalPrice, getProduct } from '../data/products'

const StoreContext = createContext(null)

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — keep in memory */
  }
}

let toastId = 0

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load('aurel:cart', []))
  const [wishlist, setWishlist] = useState(() => load('aurel:wishlist', []))
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [toasts, setToasts] = useState([])
  const [bagPulse, setBagPulse] = useState(0)

  useEffect(() => save('aurel:cart', cart), [cart])
  useEffect(() => save('aurel:wishlist', wishlist), [wishlist])

  const toast = useCallback((message, image) => {
    const id = ++toastId
    setToasts((t) => [...t, { id, message, image }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800)
  }, [])

  const addToCart = useCallback(
    (product, { size, color, qty = 1 } = {}) => {
      const s = size ?? product.sizes[Math.min(2, product.sizes.length - 1)]
      const c = color ?? product.colors[0].name
      const key = `${product.id}|${s}|${c}`
      setCart((items) => {
        const found = items.find((i) => i.key === key)
        if (found) return items.map((i) => (i.key === key ? { ...i, qty: Math.min(10, i.qty + qty) } : i))
        return [...items, { key, id: product.id, size: s, color: c, qty }]
      })
      setBagPulse((n) => n + 1)
      toast(`${product.name} added to bag`, product.images[0])
    },
    [toast]
  )

  const updateQty = useCallback((key, qty) => {
    setCart((items) =>
      qty <= 0 ? items.filter((i) => i.key !== key) : items.map((i) => (i.key === key ? { ...i, qty: Math.min(10, qty) } : i))
    )
  }, [])

  const removeFromCart = useCallback((key) => setCart((items) => items.filter((i) => i.key !== key)), [])
  const clearCart = useCallback(() => setCart([]), [])

  const toggleWishlist = useCallback(
    (product) => {
      const has = wishlist.includes(product.id)
      toast(has ? `Removed from wishlist` : `${product.name} saved to wishlist`, product.images[0])
      setWishlist((list) => (has ? list.filter((id) => id !== product.id) : [...new Set([...list, product.id])]))
    },
    [toast, wishlist]
  )
  const inWishlist = useCallback((id) => wishlist.includes(id), [wishlist])

  const cartItems = useMemo(
    () => cart.map((i) => ({ ...i, product: getProduct(i.id) })).filter((i) => i.product),
    [cart]
  )
  const cartCount = cartItems.reduce((n, i) => n + i.qty, 0)
  const subtotal = cartItems.reduce((n, i) => n + finalPrice(i.product) * i.qty, 0)
  const savings = cartItems.reduce((n, i) => n + (i.product.price - finalPrice(i.product)) * i.qty, 0)

  const value = {
    cartItems, cartCount, subtotal, savings,
    addToCart, updateQty, removeFromCart, clearCart,
    wishlist, toggleWishlist, inWishlist,
    cartOpen, setCartOpen, searchOpen, setSearchOpen,
    toasts, toast, bagPulse,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
