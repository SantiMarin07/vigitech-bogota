import { useState } from 'react'
import { ANTICIPO, PRECIOS, calcularTotal, formatoPesos } from '../config/precios.js'
import { CONTACTOS, enlaceWhatsApp } from '../config/negocio.js'
import { LUGARES, ORDEN_LUGARES } from '../config/lugares.js'
import './QuoteForm.css'

const CANTIDADES = [
  { valor: 1, texto: '1' },
  { valor: 2, texto: '2' },
  { valor: 3, texto: '3' },
  { valor: 4, texto: '4' },
  { valor: 5, texto: '5 o más' },
]

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="#3DDC97"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function aviso(lugar, tipo, cantidad) {
  if (lugar === 'finca' && tipo === 'wifi')
    return 'En fincas la señal WiFi no suele llegar lejos. Te recomendamos IP de cable.'
  if (lugar === 'finca' && cantidad <= 4)
    return 'Las fincas grandes suelen necesitar más cámaras. Si es tu caso, elige "5 o más".'
  return ''
}

// El lugar viene de App (sincronizado con las pestañas); tipo y cantidad son locales.
export default function QuoteForm({ lugar, onChangeLugar }) {
  const [tipo, setTipo] = useState('analoga')
  const [cantidad, setCantidad] = useState(4)

  const p = PRECIOS[tipo]
  const conAsesor = cantidad >= 5
  const total = calcularTotal(tipo, cantidad)
  const camaras = cantidad === 1 ? ' cámara ' : ' cámaras '

  const mensajeCotizacion =
    `Hola VigiTech, coticé en su página: ${cantidad}${camaras}${p.nombre} para mi ${lugar}, ` +
    `precio estimado ${formatoPesos(total)}. Quiero agendar la visita técnica gratis.`
  const mensajeAsesor = `Hola VigiTech, necesito cotizar 5 o más cámaras ${p.corto} para mi ${lugar}. ¿Podemos agendar la visita técnica?`

  return (
    <section className="wrap section" aria-labelledby="h-quote" id="cotizador">
      <div className="sec-h">
        <div className="eyebrow">Cotizador</div>
        <h2 id="h-quote">Cotiza tu sistema en un minuto</h2>
        <p>Elige el lugar, el tipo de cámara y cuántas necesitas. Para 5 cámaras o más te atiende un asesor.</p>
      </div>

      <div className="quote">
        <form className="qform" noValidate onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend>1. ¿Dónde las vas a instalar?</legend>
            <div className="opts">
              {ORDEN_LUGARES.map((id) => (
                <div className="opt" key={id}>
                  <input
                    type="radio"
                    name="qplace"
                    id={`qp-${id}`}
                    value={id}
                    checked={lugar === id}
                    onChange={() => onChangeLugar(id)}
                  />
                  <label htmlFor={`qp-${id}`}>{LUGARES[id].etiqueta}</label>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>2. Tipo de cámara</legend>
            <div className="opts">
              {Object.entries(PRECIOS).map(([id, t]) => (
                <div className="opt" key={id}>
                  <input
                    type="radio"
                    name="qtype"
                    id={`qt-${id}`}
                    value={id}
                    checked={tipo === id}
                    onChange={() => setTipo(id)}
                  />
                  <label htmlFor={`qt-${id}`}>
                    {t.opcion}
                    <small>{t.detalle}</small>
                  </label>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>3. ¿Cuántas cámaras?</legend>
            <div className="opts">
              {CANTIDADES.map((c) => (
                <div className="opt" key={c.valor}>
                  <input
                    type="radio"
                    name="qn"
                    id={`qn-${c.valor}`}
                    value={c.valor}
                    checked={cantidad === c.valor}
                    onChange={() => setCantidad(c.valor)}
                  />
                  <label htmlFor={`qn-${c.valor}`}>{c.texto}</label>
                </div>
              ))}
            </div>
          </fieldset>

          <p className="qhint" aria-live="polite">
            {aviso(lugar, tipo, cantidad)}
          </p>
        </form>

        <div className="qres" aria-live="polite">
          {conAsesor ? (
            <div className="advisor">
              <div className="lbl">5 cámaras o más</div>
              <h3>Te cotiza un asesor</h3>
              <p>
                Para sistemas grandes revisamos distancias, puntos ciegos y el grabador que necesitas. Escríbenos y
                agendamos la visita técnica gratis.
              </p>
              <a className="btn" href={enlaceWhatsApp(mensajeAsesor)} target="_blank" rel="noopener">
                Hablar con un asesor por WhatsApp
              </a>
              <p className="small">
                También puedes llamar o escribir al {CONTACTOS.map((c) => c.visible).join(' o al ')}.
              </p>
            </div>
          ) : (
            <div className="price">
              <div className="lbl">Precio de lanzamiento · instalado</div>
              <div className="total">{formatoPesos(total)}</div>
              <div className="split">
                <span>Para empezar pagas el {Math.round(ANTICIPO * 100)}%</span>
                <b>{formatoPesos(total * ANTICIPO)}</b>
              </div>
              <ul>
                <li>
                  <Check />
                  <span>
                    {cantidad}
                    {camaras}
                    {p.corto}
                  </span>
                </li>
                {p.incluye.map((item) => (
                  <li key={item}>
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a className="btn" href={enlaceWhatsApp(mensajeCotizacion)} target="_blank" rel="noopener">
                Enviar esta cotización por WhatsApp
              </a>
              <p className="small">
                Precio estimado con hasta 20 m de cable por cámara. El valor final se confirma en la visita técnica
                gratis.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
