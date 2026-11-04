import { prefersReducedMotion } from '../hooks/useSmoothScroll'

// Clones the product image and flies it in an arc into the shopping-bag icon.
export function flyToBag(sourceEl, imageSrc) {
  if (!sourceEl || prefersReducedMotion()) return
  const target = document.getElementById('bag-anchor')
  if (!target) return
  const from = sourceEl.getBoundingClientRect()
  const to = target.getBoundingClientRect()
  const size = Math.min(from.width, 160)

  const ghost = document.createElement('img')
  ghost.src = imageSrc
  Object.assign(ghost.style, {
    position: 'fixed',
    left: `${from.left + from.width / 2 - size / 2}px`,
    top: `${from.top + from.height / 2 - size * 0.65}px`,
    width: `${size}px`,
    height: `${size * 1.3}px`,
    objectFit: 'cover',
    zIndex: 9999,
    pointerEvents: 'none',
    boxShadow: '0 20px 50px rgba(0,0,0,.25)',
  })
  document.body.appendChild(ghost)

  const dx = to.left + to.width / 2 - (from.left + from.width / 2)
  const dy = to.top + to.height / 2 - (from.top + from.height / 2) + size * 0.15

  const anim = ghost.animate(
    [
      { transform: 'translate(0,0) scale(1)', opacity: 1, borderRadius: '0px' },
      { transform: `translate(${dx * 0.45}px, ${dy * 0.25 - 120}px) scale(.6)`, opacity: 1, borderRadius: '8px', offset: 0.5 },
      { transform: `translate(${dx}px, ${dy}px) scale(.08)`, opacity: 0.4, borderRadius: '50%' },
    ],
    { duration: 900, easing: 'cubic-bezier(.5,0,.3,1)' }
  )
  anim.onfinish = () => ghost.remove()
}
