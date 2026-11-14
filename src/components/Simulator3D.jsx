import { useEffect, useRef, useState } from 'react'
import PhoneLiveView from './PhoneLiveView.jsx'
import { ID_PANEL } from './PlaceTabs.jsx'
import { LUGARES, notaEscena } from '../config/lugares.js'
import './Simulator3D.css'

const AZ_INICIAL = 38
const ZOOM_MIN = 0.5
const ZOOM_MAX = 1.5
const PASO_ZOOM = 0.12
const COLOR_CELULAR = 0x0e1724

const dos = (n) => (n < 10 ? '0' : '') + n
function horaActual() {
  const d = new Date()
  return `${dos(d.getDate())}/${dos(d.getMonth() + 1)}/${d.getFullYear()} ${dos(d.getHours())}:${dos(d.getMinutes())}:${dos(d.getSeconds())}`
}

// La elegida se ilumina (1.4), las demás se atenúan (0.3). null = todas normales.
function resaltar(mundo, sel) {
  mundo.camaras.forEach((_, k) => mundo.revelar(k, 1, sel == null ? 1 : k === sel ? 1.4 : 0.3))
}

const iconoZoom = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round',
  'aria-hidden': true,
}

export default function Simulator3D({ lugar, escena, camaraSel, onSelectCamara, visorRef }) {
  const canvasRef = useRef(null)
  const pinsRef = useRef([])
  const gridRef = useRef(null)
  const gridCanvasRef = useRef(null)
  const cellsRef = useRef([])
  const clocksRef = useRef([])

  const motorRef = useRef(null) // módulo src/three/index.js ya cargado
  const mundoRef = useRef(null) // escena 3D activa
  const vistaRef = useRef({ az: AZ_INICIAL, el: 52, zoom: 1, drag: null, idle: 0 })
  const selRef = useRef(camaraSel) // última cámara elegida, para aplicarla al construir una escena

  const [motorListo, setMotorListo] = useState(false)
  const [fallo, setFallo] = useState(false)

  // 1) Monta three.js una sola vez: renderers, loop, eventos y observadores.
  useEffect(() => {
    const visor = visorRef.current
    const canvas = canvasRef.current
    const grid = gridRef.current
    const gridCanvas = gridCanvasRef.current
    const st = vistaRef.current
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    let cancelado = false
    let limpiar = () => {}

    function montar(T) {
      let renderer
      try {
        renderer = new T.WebGLRenderer({ canvas, antialias: true })
      } catch {
        setFallo(true)
        return
      }
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      renderer.setPixelRatio(dpr)
      const visorListo = T.crearPreparador(renderer)
      const cam = new T.PerspectiveCamera(32, 1, 0.1, 500)
      cam.layers.enable(T.CAPA_CONOS)

      // El renderer del celular se crea la primera vez que el celular aparece en pantalla.
      let r2 = null // null: sin crear · false: no se pudo crear
      let celularListo = null
      function crearRendererCelular() {
        try {
          r2 = new T.WebGLRenderer({ canvas: gridCanvas, antialias: true })
        } catch {
          r2 = false
          return
        }
        r2.setPixelRatio(dpr)
        r2.setClearColor(COLOR_CELULAR, 1)
        celularListo = T.crearPreparador(r2)
        medirCelular()
      }

      // Medidas: se leen solo al cambiar de tamaño, nunca en cada cuadro.
      let W = 1
      let H = 1
      let GW = 1
      let GH = 1
      let celdas = []
      function medirVisor() {
        W = visor.clientWidth
        H = visor.clientHeight
        renderer.setSize(W, H, false)
        cam.aspect = W / H
        cam.updateProjectionMatrix()
      }
      function medirCelular() {
        GW = grid.clientWidth
        GH = grid.clientHeight
        const g = grid.getBoundingClientRect()
        celdas = cellsRef.current.map((el) => {
          const r = el.getBoundingClientRect()
          return { x: r.left - g.left, y: r.top - g.top, w: r.width, h: r.height }
        })
        if (r2) r2.setSize(GW, GH, false)
      }
      function medir() {
        medirVisor()
        medirCelular()
      }

      // Girar arrastrando. En celular, si el gesto es vertical se deja hacer scroll.
      function onDown(e) {
        st.drag = { x: e.clientX, y: e.clientY, az: st.az, el: st.el, id: e.pointerId, moved: false }
      }
      function onMove(e) {
        const d = st.drag
        if (!d || e.pointerId !== d.id) return
        const dx = e.clientX - d.x
        const dy = e.clientY - d.y
        if (e.pointerType === 'touch' && !d.moved && Math.abs(dy) > Math.abs(dx)) return
        if (Math.abs(dx) + Math.abs(dy) > 3) {
          d.moved = true
          try {
            canvas.setPointerCapture(d.id)
          } catch {
            /* el puntero ya no existe */
          }
        }
        st.az = d.az - dx * 0.35
        st.el = Math.max(22, Math.min(80, d.el + dy * 0.25))
        st.idle = 0
      }
      function onUp() {
        st.drag = null
      }
      canvas.addEventListener('pointerdown', onDown)
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
      window.addEventListener('pointercancel', onUp)

      // Pausa el render del visor y del celular cuando no están en pantalla.
      let visorVisible = true
      let celularVisible = false
      const io = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((en) => {
            if (en.target === visor) visorVisible = en.isIntersecting
            else celularVisible = en.isIntersecting
          })
        },
        { rootMargin: '100px 0px' },
      )
      io.observe(visor)
      io.observe(grid)
      const ro = new ResizeObserver(medir)
      ro.observe(visor)
      ro.observe(grid)
      medir()

      const t0 = performance.now()
      let last = t0
      let cuadros = 0
      let ultimaHora = ''
      let raf = 0

      function frame(now) {
        raf = requestAnimationFrame(frame)
        const dt = Math.min(0.05, (now - last) / 1000)
        last = now
        const mundo = mundoRef.current
        if (!mundo || (!visorVisible && !celularVisible)) return
        cuadros++

        st.idle += dt
        if (!reduce && !st.drag && st.idle > 3) st.az += dt * 5
        const t = ((now - t0) / 1000) % (mundo.finRecorrido + 3)
        mundo.moverPersona(reduce ? mundo.finRecorrido : t)
        mundo.parpadearLeds(now / 1000)

        if (visorVisible && visorListo(mundo.escena, cam, now)) {
          const c = mundo.centro
          const dist = 25 * mundo.tamaño * Math.max(1, 1.15 / cam.aspect) * st.zoom
          T.orbitar(cam, st.az, st.el, dist, c[0], c[1], c[2])
          renderer.render(mundo.escena, cam)
          // Etiquetas movidas con transform: no obliga a recalcular el diseño de la página.
          mundo.camaras.forEach((cm, i) => {
            const pin = pinsRef.current[i]
            if (!pin) return
            const p = T.proyectar(cm.etiquetaEn, cam, W, H)
            pin.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) translate(-50%, -110%)`
            pin.hidden = p.behind
            pin.dataset.pos = '1' // ya tiene posición: se puede mostrar
          })
        }

        if (celularVisible) {
          // Se crea en un cuadro distinto al primero del visor para repartir el trabajo.
          if (r2 === null) {
            if (cuadros > 1) crearRendererCelular()
            return
          }
          if (!r2 || !celularListo(mundo.escena, cam, now)) return
          r2.clear()
          T.renderizarVistas(r2, mundo, celdas, GH)
          r2.setViewport(0, 0, GW, GH)
          const hora = horaActual()
          if (hora !== ultimaHora) {
            ultimaHora = hora
            clocksRef.current.forEach((el) => {
              if (el) el.textContent = hora
            })
          }
        }
      }
      raf = requestAnimationFrame(frame)

      motorRef.current = T
      setMotorListo(true)

      limpiar = () => {
        cancelAnimationFrame(raf)
        canvas.removeEventListener('pointerdown', onDown)
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onUp)
        io.disconnect()
        ro.disconnect()
        renderer.dispose()
        if (r2) r2.dispose()
      }
    }

    // three.js se descarga cuando la página ya cargó y el navegador está libre,
    // así el texto y los botones aparecen primero.
    function arrancar() {
      import('../three/index.js')
        .then((T) => {
          // Crear el renderer en otra tarea, separada de la descarga de three.js.
          setTimeout(() => {
            if (!cancelado) montar(T)
          }, 0)
        })
        .catch(() => {
          if (!cancelado) setFallo(true)
        })
    }
    let espera = 0
    const programar = () => {
      espera = window.requestIdleCallback
        ? window.requestIdleCallback(arrancar, { timeout: 1500 })
        : window.setTimeout(arrancar, 200)
    }
    if (document.readyState === 'complete') programar()
    else window.addEventListener('load', programar, { once: true })

    return () => {
      cancelado = true
      window.removeEventListener('load', programar)
      if (window.cancelIdleCallback) window.cancelIdleCallback(espera)
      else window.clearTimeout(espera)
      limpiar()
      motorRef.current = null
    }
  }, [visorRef])

  // 2) Construye la escena del lugar elegido y libera la anterior al cambiar.
  useEffect(() => {
    if (!motorListo || !escena) return
    const mundo = motorRef.current.crearMundo(escena.datos)
    const st = vistaRef.current
    st.az = AZ_INICIAL
    st.el = escena.lugar === 'finca' ? 48 : 52
    st.zoom = 1
    st.idle = 0
    // Unir las piezas estáticas en otra tarea, para no hacer una sola tarea larga.
    const espera = setTimeout(() => {
      mundo.optimizar()
      resaltar(mundo, selRef.current)
      mundoRef.current = mundo
    }, 0)
    return () => {
      clearTimeout(espera)
      if (mundoRef.current === mundo) mundoRef.current = null
      mundo.liberar()
    }
  }, [escena, motorListo])

  // 3) Resalta la cámara elegida y atenúa las demás.
  useEffect(() => {
    selRef.current = camaraSel
    if (mundoRef.current) resaltar(mundoRef.current, camaraSel)
    vistaRef.current.idle = 0
  }, [camaraSel])

  const camaras = escena?.lugar === lugar ? escena.datos.camaras : null
  const listo = !fallo && motorListo && camaras

  function zoom(delta) {
    const st = vistaRef.current
    st.zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, st.zoom + delta))
  }

  return (
    <>
      <div className="wrap sim" id={ID_PANEL} role="tabpanel" aria-labelledby={`tab-${lugar}`}>
        <div className="viewer" ref={visorRef}>
          <canvas
            ref={canvasRef}
            className="viewer-canvas"
            role="img"
            aria-label="Escena en 3D con cuatro cámaras de seguridad y sus zonas de cobertura en verde"
          />
          <div className="pins">
            {listo &&
              camaras.map((c, i) => (
                <button
                  key={`${lugar}-${i}`}
                  ref={(el) => {
                    pinsRef.current[i] = el
                  }}
                  type="button"
                  className="pin"
                  aria-pressed={camaraSel === i}
                  onClick={() => onSelectCamara(camaraSel === i ? null : i)}
                >
                  <span className="sr-only">Cámara </span>
                  <i>{i + 1}</i> {c.nombre}
                </button>
              ))}
          </div>
          {!listo && (
            <div className="loading">{fallo ? 'No se pudo cargar la escena 3D.' : 'Cargando escena…'}</div>
          )}
          <div className="hint">Arrastra para girar</div>
          <div className="zoom">
            <button type="button" aria-label="Acercar" onClick={() => zoom(-PASO_ZOOM)}>
              <svg {...iconoZoom}>
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button type="button" aria-label="Alejar" onClick={() => zoom(PASO_ZOOM)}>
              <svg {...iconoZoom}>
                <path d="M5 12h14" />
              </svg>
            </button>
          </div>
          <div className="chips" role="group" aria-label="Elegir cámara">
            <button
              type="button"
              className="chip"
              aria-pressed={camaraSel == null}
              onClick={() => onSelectCamara(null)}
            >
              Todas
            </button>
            {camaras?.map((c, i) => (
              <button
                key={`${lugar}-${i}`}
                type="button"
                className="chip"
                aria-pressed={camaraSel === i}
                onClick={() => onSelectCamara(i)}
              >
                {i + 1} {c.nombre}
              </button>
            ))}
          </div>
        </div>

        <PhoneLiveView
          titulo={LUGARES[lugar].celular}
          camaras={camaras}
          camaraSel={camaraSel}
          onSelectCamara={onSelectCamara}
          gridRef={gridRef}
          canvasRef={gridCanvasRef}
          cellsRef={cellsRef}
          clocksRef={clocksRef}
        />
      </div>
      <div className="wrap">
        <p className="note">{notaEscena(lugar)}</p>
      </div>
    </>
  )
}
