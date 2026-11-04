import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-luxe flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="h-display text-[30vw] leading-none text-sand lg:text-[18vw]">404</p>
      <p className="-mt-6 font-display text-4xl">This page has gone out of season.</p>
      <Link to="/shop" className="btn btn-dark mt-10"><span>Back to the shop</span></Link>
    </div>
  )
}
