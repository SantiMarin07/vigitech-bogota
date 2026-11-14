import './PhoneLiveView.css'

// Celular con la cuadrícula 2×2. Simulator3D dibuja cada vista en el canvas de fondo
// y escribe la hora en cada celda; aquí solo va el HTML.
export default function PhoneLiveView({
  titulo,
  camaras,
  camaraSel,
  onSelectCamara,
  gridRef,
  canvasRef,
  cellsRef,
  clocksRef,
}) {
  return (
    <div className="phone">
      <div className="screen">
        <div className="sbar">
          <span>VigiTech</span>
          <span className="live">
            <span />
            EN VIVO
          </span>
        </div>
        <div className="ptitle">{titulo}</div>
        <div className="sub">Así se ve en tu celular</div>
        <div className="vistas" ref={gridRef}>
          <canvas ref={canvasRef} aria-hidden="true" />
          {[0, 1, 2, 3].map((i) => {
            const c = camaras?.[i]
            return (
              <button
                key={i}
                ref={(el) => {
                  cellsRef.current[i] = el
                }}
                type="button"
                className="cell"
                aria-pressed={camaraSel === i}
                onClick={() => onSelectCamara(i)}
              >
                <span className="sr-only">Ver cámara </span>
                <span className="lab">
                  <span className="r" />
                  <span className="t">{c ? `${i + 1} · ${c.nombre}` : `${i + 1}`}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="clk"
                  ref={(el) => {
                    clocksRef.current[i] = el
                  }}
                />
              </button>
            )
          })}
        </div>
        <div className="stat">
          <div>
            <span>Cámaras en línea</span>
            <b>4 de 4</b>
          </div>
          <div>
            <span>Grabación</span>
            <b>24/7</b>
          </div>
        </div>
      </div>
    </div>
  )
}
