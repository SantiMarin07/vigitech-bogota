import './HowWeWork.css'

const PASOS = [
  { titulo: 'Escríbenos', texto: 'Cuéntanos qué lugar quieres proteger y cuántas cámaras tienes en mente.' },
  { titulo: 'Visita técnica gratis', texto: 'Vamos al lugar, miramos los mejores puntos y te damos el precio exacto.' },
  { titulo: 'Pagas el 50%', texto: 'Con eso compramos tus equipos y agendamos el día de la instalación.' },
  {
    titulo: 'Instalamos y pagas el resto',
    texto: 'Dejamos todo funcionando, te enseñamos la app y pagas el otro 50%.',
  },
]

export default function HowWeWork() {
  return (
    <section className="wrap section" aria-labelledby="h-steps">
      <div className="sec-h">
        <div className="eyebrow">Cómo trabajamos</div>
        <h2 id="h-steps">De tu mensaje a tus cámaras funcionando</h2>
      </div>
      <ol className="steps">
        {PASOS.map((p) => (
          <li key={p.titulo}>
            <h3>{p.titulo}</h3>
            <p>{p.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
