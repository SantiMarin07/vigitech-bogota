import { LUGARES } from '../config/lugares.js'
import './CameraCards.css'

// Tarjetas "Qué cubre cada cámara", generadas desde los datos de la escena activa.
export default function CameraCards({ lugar, escena, camaraSel, onSelectCamara, visorRef }) {
  const camaras = escena?.lugar === lugar ? escena.datos.camaras : []

  function elegir(i) {
    onSelectCamara(i)
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    visorRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
  }

  return (
    <section className="wrap section" aria-labelledby="h-cams">
      <div className="sec-h">
        <div className="eyebrow">Qué cubre cada cámara</div>
        <h2 id="h-cams">Cuatro puntos clave en tu {LUGARES[lugar].palabra}</h2>
      </div>
      <div className="cams">
        {camaras.map((c, i) => (
          <button
            key={`${lugar}-${i}`}
            type="button"
            className="cam"
            aria-pressed={camaraSel === i}
            onClick={() => elegir(i)}
          >
            <div className="n">
              <span>{i + 1}</span>
              {c.nombre}
            </div>
            <p>{c.desc}</p>
            <p className="why">{c.porQué}</p>
          </button>
        ))}
      </div>
    </section>
  )
}
