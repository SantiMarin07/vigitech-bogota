import { INSTAGRAM } from '../config/negocio.js'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        VigiTech Bogotá ·{' '}
        <a href={`https://www.instagram.com/${INSTAGRAM}/`} target="_blank" rel="noopener">
          @{INSTAGRAM}
        </a>{' '}
        · Cámaras de seguridad para locales, oficinas, casas y fincas
      </div>
    </footer>
  )
}
