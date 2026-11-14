import { useRef, useState } from 'react'
import { CONTACTOS, enlaceWhatsApp, MENSAJE_VISITA } from '../config/negocio.js'
import './Contact.css'

export default function Contact() {
  const numerosRef = useRef([])
  const [aviso, setAviso] = useState('')

  async function copiar(i) {
    const { visible } = CONTACTOS[i]
    try {
      await navigator.clipboard.writeText(visible)
      setAviso(`Número ${visible} copiado.`)
    } catch {
      // Sin acceso al portapapeles: se selecciona el número para copiarlo a mano.
      const rango = document.createRange()
      rango.selectNodeContents(numerosRef.current[i])
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
          <div className="numeros">
            {CONTACTOS.map((c, i) => (
              <div className="num" key={c.whatsapp}>
                <output
                  ref={(el) => {
                    numerosRef.current[i] = el
                  }}
                >
                  {c.visible}
                </output>
                <a
                  className="btn"
                  href={enlaceWhatsApp(MENSAJE_VISITA, c.whatsapp)}
                  target="_blank"
                  rel="noopener"
                  aria-label={`Abrir WhatsApp al ${c.visible}`}
                >
                  Abrir WhatsApp
                </a>
                <button
                  type="button"
                  className="btn ghost"
                  aria-label={`Copiar número ${c.visible}`}
                  onClick={() => copiar(i)}
                >
                  Copiar número
                </button>
              </div>
            ))}
          </div>
          <div className="copied" aria-live="polite">
            {aviso}
          </div>
        </div>
      </div>
    </div>
  )
}
