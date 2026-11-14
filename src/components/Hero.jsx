import { LUGARES } from '../config/lugares.js'
import './Hero.css'

export default function Hero({ lugar }) {
  return (
    <div className="wrap hero">
      <div className="eyebrow">Simulador 3D · Elige tu lugar</div>
      <h1>{LUGARES[lugar].titulo}</h1>
      <p>
        Gira la escena con el dedo o el mouse. Toca cada cámara para ver qué zona cubre y lo que verías en tu
        celular.
      </p>
    </div>
  )
}
