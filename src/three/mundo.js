// Arma una escena completa a partir de los datos de src/scenes/*.js:
// geometría, 4 cámaras con su cono, la persona que camina y las cámaras de las vistas del celular.
import {
  Color,
  ConeGeometry,
  CylinderGeometry,
  GridHelper,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Vector3,
} from 'three'
import { agregarLuces, crearKit } from './kit.js'
import { crearCono } from './conos.js'
import { fusionarEstaticos } from './fusion.js'

const ACENTO = 0x3ddc97
const FONDO = 0x0b1420

// Clases de three que las escenas pueden usar en construir(THREE, scene, K).
// Si una escena nueva necesita otra clase, impórtala arriba y agrégala aquí.
const THREE = { ConeGeometry, GridHelper, Group, Mesh }

export function crearMundo(datos) {
  const escena = new Scene()
  escena.background = new Color(FONDO)
  agregarLuces(escena)
  const K = crearKit(escena)
  datos.construir(THREE, escena, K)

  const visitante = K.person(0xf08a4b, datos.escalaPersona || 1)
  const white = K.mat(0xf4f6f8)
  const dark = K.mat(0x111820)
  const ledMat = new MeshBasicMaterial({ color: ACENTO })
  const cs = datos.escalaCámara

  const camaras = datos.camaras.map((d, idx) => {
    const pos = new Vector3().fromArray(d.pos)
    const objetivo = new Vector3().fromArray(d.objetivo)

    // Cuerpo de la cámara
    const g = new Group()
    const body = new Mesh(K.unit, white)
    body.scale.set(0.22, 0.2, 0.46)
    body.position.z = 0.06
    const hood = new Mesh(K.unit, white)
    hood.scale.set(0.28, 0.035, 0.52)
    hood.position.set(0, 0.12, 0.1)
    const lensG = new CylinderGeometry(0.08, 0.08, 0.04, 20)
    lensG.rotateX(Math.PI / 2)
    const lens = new Mesh(lensG, dark)
    lens.position.z = 0.3
    const led = new Mesh(new SphereGeometry(0.028, 10, 8), ledMat)
    led.position.set(0.075, -0.06, 0.31)
    g.add(body, hood, lens, led)
    g.scale.setScalar(cs)
    g.position.copy(pos)
    g.lookAt(objetivo)
    escena.add(g)

    // Brazo de montaje y base (o poste en la finca)
    K.cylBetween(d.montaje, d.pos, (0.035 * cs) / 1.35, 0xc4cbd3)
    if (d.poste) {
      K.cylBetween([d.montaje[0], 0, d.montaje[2]], [d.montaje[0], d.montaje[1] + 0.2, d.montaje[2]], 0.09, 0x8a96a5)
    } else {
      const plate = new Mesh(new CylinderGeometry(0.11, 0.11, 0.03, 18), K.mat(0xc4cbd3))
      plate.position.fromArray(d.montaje)
      plate.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), pos.clone().sub(plate.position).normalize())
      escena.add(plate)
    }

    // Cámara virtual para la vista del celular
    const dir = objetivo.clone().sub(pos).normalize()
    const vista = new PerspectiveCamera(56, 16 / 9, 0.05, 200)
    vista.position.copy(pos).addScaledVector(dir, 0.45 * cs)
    vista.lookAt(objetivo)
    vista.userData.fovH = d.fovH

    // Cono de cobertura
    const cono = crearCono({
      pos,
      objetivo,
      fovH: d.fovH,
      distanciaMax: d.distanciaMáx,
      recorte: d.recorte,
      color: ACENTO,
    })
    escena.add(cono.grupo)

    return {
      id: idx + 1,
      nombre: d.nombre,
      vista,
      led,
      cono: cono.grupo,
      materiales: cono.materiales,
      opacidadBase: cono.opacidadBase,
      etiquetaEn: pos.clone().add(new Vector3(0, 0.33 * cs, 0)),
    }
  })

  // Une lo estático (se llama en otra tarea, después de crear el mundo).
  // Quedan sueltos: la persona que camina, los LEDs y los conos (capa 1).
  let optimizado = false
  function optimizar() {
    if (optimizado) return
    optimizado = true
    const dinamicos = new Set()
    visitante.traverse((o) => dinamicos.add(o))
    camaras.forEach((c) => dinamicos.add(c.led))
    fusionarEstaticos(escena, (o) => dinamicos.has(o) || (o.layers.mask & 1) === 0)
  }

  // s: tamaño del cono (0..1). enfasis: 1 normal, >1 resaltado, <1 atenuado.
  function revelar(i, s, enfasis) {
    const c = camaras[i]
    const v = Math.max(0.0001, Math.min(1, s))
    c.cono.visible = s > 0.001
    c.cono.scale.setScalar(v)
    const e = enfasis == null ? 1 : enfasis
    c.materiales.forEach((m, k) => {
      m.opacity = c.opacidadBase[k] * e * Math.min(1, s * 1.5)
    })
  }

  // Recorrido de la persona: puntos [segundo, x, z].
  const P = datos.recorrido
  function personaEn(t) {
    let i = 0
    if (t <= P[0][0]) return { x: P[0][1], z: P[0][2], walking: false, dir: 0 }
    while (i < P.length - 1 && t > P[i + 1][0]) i++
    if (i >= P.length - 1) {
      const l = P[P.length - 1]
      return { x: l[1], z: l[2], walking: false, dir: Math.PI }
    }
    const a = P[i]
    const b = P[i + 1]
    const u = (t - a[0]) / (b[0] - a[0])
    const dx = b[1] - a[1]
    const dz = b[2] - a[2]
    const moving = Math.abs(dx) + Math.abs(dz) > 0.01
    return { x: a[1] + dx * u, z: a[2] + dz * u, walking: moving, dir: moving ? Math.atan2(dx, dz) : Math.PI }
  }

  let ultimaDir = 0
  function moverPersona(t) {
    const s = personaEn(t)
    visitante.position.set(s.x, s.walking ? Math.abs(Math.sin(t * 9)) * 0.04 : 0, s.z)
    if (s.walking) ultimaDir = s.dir
    visitante.rotation.y = ultimaDir
    return s
  }

  function parpadearLeds(t) {
    const on = Math.floor(t * 2) % 2 === 0
    camaras.forEach((c) => {
      c.led.visible = on
    })
  }

  // Libera de la GPU todas las geometrías y materiales de la escena.
  function liberar() {
    const geos = new Set()
    const mats = new Set()
    escena.traverse((o) => {
      if (o.geometry) geos.add(o.geometry)
      if (o.material) [].concat(o.material).forEach((m) => mats.add(m))
    })
    geos.forEach((g) => g.dispose())
    mats.forEach((m) => m.dispose())
  }

  return {
    escena,
    camaras,
    tamaño: datos.tamaño,
    centro: datos.centro,
    finRecorrido: P[P.length - 2][0],
    optimizar,
    revelar,
    moverPersona,
    parpadearLeds,
    liberar,
  }
}
