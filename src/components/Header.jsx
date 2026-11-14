import { enlaceWhatsApp, MENSAJE_VISITA } from '../config/negocio.js'
import './Header.css'

function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#13202F" stroke="#22344A" strokeWidth="2" />
      <circle cx="32" cy="32" r="15" fill="none" stroke="#3DDC97" strokeWidth="5" />
      <circle cx="32" cy="32" r="5" fill="#fff" />
    </svg>
  )
}

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <div className="brand">
          <Logo />
          <div>
            Vigi<b>Tech</b> <small>BOGOTÁ</small>
          </div>
        </div>
        <a className="btn" href={enlaceWhatsApp(MENSAJE_VISITA)} target="_blank" rel="noopener">
          Pedir visita gratis
        </a>
      </div>
    </header>
  )
}
