import './FAQ.css'

const PREGUNTAS = [
  {
    p: '¿Se graba si se va el internet?',
    r: 'Con cámaras análogas o IP de cable, sí: graban en el disco del grabador que queda en tu lugar. El internet solo se necesita para verlas desde el celular. Las WiFi graban en su memoria, pero necesitan la red para enviarte alertas.',
  },
  {
    p: '¿Qué cámara me conviene?',
    r: 'Para un local o una casa, las análogas son las más económicas. Si necesitas ver caras o placas con detalle, o hay distancias largas como en una finca, te conviene IP de cable. Si no quieres pasar cables, las WiFi son la opción más rápida.',
  },
  {
    p: '¿Cuánto se demora la instalación?',
    r: 'Un sistema de 4 cámaras normalmente queda listo en un día. En la visita técnica te confirmamos el tiempo.',
  },
  {
    p: '¿Puedo ver las cámaras desde varios celulares?',
    r: 'Sí. Configuramos la app en tu celular y en el de las personas que tú digas.',
  },
  {
    p: '¿Puedo agregar más cámaras después?',
    r: 'Sí, mientras el grabador tenga canales libres. Te cotizamos cada cámara adicional.',
  },
]

export default function FAQ() {
  return (
    <section className="wrap section" aria-labelledby="h-faq">
      <div className="sec-h">
        <h2 id="h-faq">Preguntas frecuentes</h2>
      </div>
      <div className="faq">
        {PREGUNTAS.map((q) => (
          <details key={q.p}>
            <summary>{q.p}</summary>
            <p>{q.r}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
