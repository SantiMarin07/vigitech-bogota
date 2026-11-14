import { useRef } from 'react'
import { LUGARES, ORDEN_LUGARES } from '../config/lugares.js'
import './PlaceTabs.css'

const iconoProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const ICONOS = {
  local: (
    <svg {...iconoProps}>
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M4 9v11h16V9" />
      <path d="M3 9h18" />
      <path d="M10 20v-6h4v6" />
    </svg>
  ),
  oficina: (
    <svg {...iconoProps}>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
    </svg>
  ),
  casa: (
    <svg {...iconoProps}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  ),
  finca: (
    <svg {...iconoProps}>
      <path d="M2 20h20" />
      <path d="M4 20v-8l5-4 5 4v8" />
      <path d="M17 20v-5" />
      <circle cx="18" cy="9" r="3" />
    </svg>
  ),
}

export const ID_PANEL = 'panel-simulador'

export default function PlaceTabs({ lugar, onChange }) {
  const botones = useRef({})

  // Flechas, Inicio y Fin mueven el foco y eligen la pestaña (patrón WAI-ARIA tabs).
  function onKeyDown(e) {
    const i = ORDEN_LUGARES.indexOf(lugar)
    let siguiente = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') siguiente = (i + 1) % ORDEN_LUGARES.length
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') siguiente = (i - 1 + ORDEN_LUGARES.length) % ORDEN_LUGARES.length
    else if (e.key === 'Home') siguiente = 0
    else if (e.key === 'End') siguiente = ORDEN_LUGARES.length - 1
    if (siguiente == null) return
    e.preventDefault()
    const id = ORDEN_LUGARES[siguiente]
    onChange(id)
    botones.current[id]?.focus()
  }

  return (
    <div className="wrap">
      <div className="places" role="tablist" aria-label="Tipo de lugar" onKeyDown={onKeyDown}>
        {ORDEN_LUGARES.map((id) => {
          const activo = id === lugar
          return (
            <button
              key={id}
              ref={(el) => {
                botones.current[id] = el
              }}
              type="button"
              className="place"
              role="tab"
              id={`tab-${id}`}
              aria-selected={activo}
              aria-controls={ID_PANEL}
              tabIndex={activo ? 0 : -1}
              onClick={() => onChange(id)}
            >
              {ICONOS[id]}
              {LUGARES[id].etiqueta}
            </button>
          )
        })}
      </div>
    </div>
  )
}
