import './Installation.css'

const ico = {
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

const COLUMNAS = [
  {
    titulo: 'Con cada cámara',
    lead: 'Esto lleva cada punto que instalamos.',
    items: [
      {
        icono: (
          <svg {...ico}>
            <path d="M3 8h12l3 3v2l-3 3H3z" />
            <circle cx="9" cy="12" r="2.2" />
          </svg>
        ),
        titulo: 'Cámara con visión nocturna',
        texto: 'Para interior o exterior, según el punto.',
      },
      {
        icono: (
          <svg {...ico}>
            <path d="M4 12h4l2-3 4 6 2-3h4" />
          </svg>
        ),
        titulo: 'Cable UTP categoría 5e',
        texto: 'Señal estable aunque la cámara quede lejos del grabador.',
      },
      {
        icono: (
          <svg {...ico}>
            <rect x="3" y="9" width="18" height="6" rx="1" />
            <path d="M7 9v6M12 9v6M17 9v6" />
          </svg>
        ),
        titulo: 'Canaleta y caja de paso',
        texto: 'Cables protegidos y ordenados, sin nada colgando de la pared.',
      },
      {
        icono: (
          <svg {...ico}>
            <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
          </svg>
        ),
        titulo: 'Energía regulada',
        texto: 'Con conectores firmes para que la cámara no se apague.',
      },
    ],
  },
  {
    titulo: 'En el sistema',
    lead: 'Va una sola vez y controla todas las cámaras.',
    items: [
      {
        icono: (
          <svg {...ico}>
            <rect x="3" y="7" width="18" height="10" rx="2" />
            <circle cx="7" cy="12" r="1" />
            <path d="M11 12h6" />
          </svg>
        ),
        titulo: 'Grabador DVR o NVR',
        texto: 'Graba 24/7 y detecta movimiento de personas y vehículos.',
      },
      {
        icono: (
          <svg {...ico}>
            <ellipse cx="12" cy="6" rx="8" ry="3" />
            <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
          </svg>
        ),
        titulo: 'Disco duro para videovigilancia',
        texto: 'Hecho para grabar día y noche sin parar.',
      },
      {
        icono: (
          <svg {...ico}>
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M8 9h8M8 13h8M8 17h5" />
          </svg>
        ),
        titulo: 'Fuente de poder centralizada',
        texto: 'Una sola fuente protegida para todas las cámaras.',
      },
      {
        icono: (
          <svg {...ico}>
            <rect x="7" y="2" width="10" height="20" rx="2" />
            <path d="M11 18h2" />
          </svg>
        ),
        titulo: 'App configurada en tu celular',
        texto: 'Te enseñamos a ver en vivo y revisar grabaciones.',
      },
    ],
  },
]

// "Lo que instalamos en tu lugar"
export default function Installation() {
  return (
    <section className="wrap section" aria-labelledby="h-kit">
      <div className="sec-h">
        <div className="eyebrow">Materiales de calidad</div>
        <h2 id="h-kit">Lo que instalamos en tu lugar</h2>
        <p>
          No solo ponemos la cámara: cada punto queda con su cableado, protección y energía, para que grabe sin
          fallas.
        </p>
      </div>
      <div className="kit">
        {COLUMNAS.map((col) => (
          <div className="kit-col" key={col.titulo}>
            <h3>{col.titulo}</h3>
            <p className="lead">{col.lead}</p>
            <ul className="kit-list">
              {col.items.map((it) => (
                <li key={it.titulo}>
                  {it.icono}
                  <div>
                    <b>{it.titulo}</b>
                    <span>{it.texto}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
