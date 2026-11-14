import './Catalog.css'

const ico = {
  width: 44,
  height: 44,
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const Bala = ({ extra }) => (
  <svg {...ico}>
    <rect x="10" y="15" width="28" height="13" rx="4" />
    <path d="M8 13h32" />
    <circle cx="35" cy="21.5" r="3" />
    <path d="M18 28v6h-6v6" />
    {extra}
  </svg>
)

const Domo = ({ extra }) => (
  <svg {...ico}>
    <path d="M10 18h28" />
    <path d="M13 18a11 11 0 0 0 22 0" />
    <circle cx="24" cy="22" r="4" />
    <path d="M14 18v-4h20v4" />
    {extra}
  </svg>
)

const WifiInterior = () => (
  <svg {...ico}>
    <rect x="14" y="8" width="20" height="20" rx="10" />
    <circle cx="24" cy="18" r="4" />
    <path d="M16 40h16l-3-12h-10z" />
  </svg>
)

const WifiExterior = () => (
  <svg {...ico}>
    <rect x="10" y="16" width="26" height="12" rx="5" />
    <circle cx="31" cy="22" r="3" />
    <path d="M14 16l-3-7M30 16l3-7" />
    <path d="M16 28v6h-5v6" />
  </svg>
)

const TIPOS = [
  {
    badge: 'La más económica',
    titulo: 'Análogas',
    texto: 'Cámaras Turbo HD que graban en un DVR dentro de tu lugar. Son las más usadas en locales y casas.',
    modelos: [
      { icono: <Bala />, nombre: 'HiLook THC-B120 · Bala', specs: 'Full HD 1080p · visión nocturna 20 m · para exterior' },
      {
        icono: <Domo />,
        nombre: 'HiLook THC-T120 · Domo',
        specs: 'Full HD 1080p · visión nocturna 20 m · interior o exterior',
      },
    ],
    ventajas: ['El sistema más económico y muy confiable.', 'Graba 24/7 en el disco del DVR, aunque se caiga el internet.'],
    desventajas: ['Imagen Full HD, menos detalle que las IP.'],
    ideal: 'locales, tiendas y casas.',
  },
  {
    badge: 'La mejor imagen',
    titulo: 'IP de cable',
    texto: 'Cámaras de red que llevan video y energía por un solo cable (PoE) hasta un grabador NVR.',
    modelos: [
      {
        icono: <Bala extra={<path d="M28 36h10M33 31v10" />} />,
        nombre: 'HiLook IPC-B121H · Bala',
        specs: '2 MP · visión nocturna 30 m · IP67 · PoE',
      },
      {
        icono: <Domo extra={<path d="M8 38l4-4M40 38l-4-4" />} />,
        nombre: 'HiLook IPC-D121H · Domo',
        specs: '2 MP · visión nocturna 30 m · antivandálica IK10',
      },
    ],
    ventajas: ['Más nitidez para ver caras y placas.', 'Un solo cable para video y energía; llega lejos.'],
    desventajas: ['Es la opción más costosa.'],
    ideal: 'oficinas, fincas y bodegas grandes.',
  },
  {
    badge: 'Sin cable de video',
    titulo: 'WiFi',
    texto: 'Cámaras que se conectan a tu internet y graban en una memoria dentro de la cámara.',
    modelos: [
      {
        icono: <WifiInterior />,
        nombre: 'Ezviz H6c · Interior',
        specs: '4 MP · gira 360° y sigue el movimiento · habla y escucha',
      },
      {
        icono: <WifiExterior />,
        nombre: 'Ezviz H3c · Exterior',
        specs: '1080p · visión nocturna · detección inteligente de personas',
      },
    ],
    ventajas: ['Instalación rápida, sin pasar cable de video.', 'Ves y hablas desde la app del celular.'],
    desventajas: ['Necesita buena señal WiFi y un tomacorriente cerca.'],
    ideal: 'casas, apartamentos y locales pequeños.',
  },
]

export default function Catalog() {
  return (
    <section className="wrap section" aria-labelledby="h-types">
      <div className="sec-h">
        <div className="eyebrow">Las cámaras que usamos</div>
        <h2 id="h-types">Buenas, bonitas y a buen precio</h2>
        <p>
          Trabajamos con tres tipos de cámara. En la visita técnica te recomendamos la que mejor se ajusta a tu lugar
          y a tu presupuesto.
        </p>
      </div>
      <div className="types">
        {TIPOS.map((t) => (
          <article className="type" key={t.titulo}>
            <div className="type-h">
              <span className="badge">{t.badge}</span>
              <h3>{t.titulo}</h3>
              <p>{t.texto}</p>
            </div>
            <div className="models">
              {t.modelos.map((m) => (
                <div className="model" key={m.nombre}>
                  <div className="pic">{m.icono}</div>
                  <div>
                    <h4>{m.nombre}</h4>
                    <span>{m.specs}</span>
                  </div>
                </div>
              ))}
            </div>
            <ul className="pros">
              {t.ventajas.map((v) => (
                <li key={v}>
                  <span className="mk" aria-hidden="true">
                    +
                  </span>
                  <span className="sr-only">Ventaja: </span>
                  <span>{v}</span>
                </li>
              ))}
              {t.desventajas.map((v) => (
                <li key={v}>
                  <span className="mk c" aria-hidden="true">
                    −
                  </span>
                  <span className="sr-only">Desventaja: </span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
            <div className="ideal">
              <b>Ideal para:</b> {t.ideal}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
