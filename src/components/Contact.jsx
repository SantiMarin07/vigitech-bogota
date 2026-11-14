import { useRef, useState } from 'react'
import { enlaceWhatsApp, MENSAJE_VISITA, TELEFONO_VISIBLE } from '../config/negocio.js'
import './Contact.css'

export default function Contact() {
  const numeroRef = useRef(null)
  const [aviso, setAviso] = useState('')

  async function copiar() {
    try {
      await navigator.clipboard.writeText(TELEFONO_VISIBLE)
      setAviso('Número copiado.')
    } catch {
      // Sin acceso al portapapeles: se selecciona el número para copiarlo a mano.
      const rango = document.createRange()
      rango.selectNodeContents(numeroRef.current)
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(rango)
      setAviso('Número seleccionado: cópialo con tu teclado.')
    }
  }

  return (
    <div className="wrap">
      <div className="final" id="contacto">
        <div>
          <h2>Pide tu visita técnica gratis</h2>
          <p>Escríbenos por WhatsApp y cuadramos el día.</p>
        </div>
        <div>
          <div className="num">
            <output ref={numeroRef}>{TELEFONO_VISIBLE}</output>
            <a className="btn" href={enlaceWhatsApp(MENSAJE_VISITA)} target="_blank" rel="noopener">
              Abrir WhatsApp
            </a>
            <button type="button" className="btn ghost" onClick={copiar}>
              Copiar número
            </button>
          </div>
          <div className="copied" aria-live="polite">
            {aviso}
          </div>
        </div>
      </div>
    </div>
  )
}
