// Conos de cobertura: el campo de visión de cada cámara proyectado sobre el piso.
import {
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  Shape,
  ShapeGeometry,
  Vector2,
  Vector3,
} from 'three'

// Los conos van en la capa 1: la cámara del visor la ve, las vistas del celular no.
export const CAPA_CONOS = 1

const ALTURA_PISO = 0.04

// Sutherland–Hodgman: recorta el polígono (puntos [x, z]) con el rectángulo [xMin, xMax, zMin, zMax].
export function recortarConRectangulo(poly, r) {
  const pruebas = [(p) => p[0] >= r[0], (p) => p[0] <= r[1], (p) => p[1] >= r[2], (p) => p[1] <= r[3]]
  const lineas = [
    [0, r[0]],
    [0, r[1]],
    [1, r[2]],
    [1, r[3]],
  ]
  let out = poly
  for (let e = 0; e < 4; e++) {
    const inp = out
    out = []
    if (!inp.length) break
    for (let i = 0; i < inp.length; i++) {
      const cur = inp[i]
      const prev = inp[(i + inp.length - 1) % inp.length]
      const ci = pruebas[e](cur)
      const pi = pruebas[e](prev)
      if (ci) {
        if (!pi) out.push(intersectar(prev, cur, lineas[e]))
        out.push(cur)
      } else if (pi) {
        out.push(intersectar(prev, cur, lineas[e]))
      }
    }
  }
  return out
}

function intersectar(a, b, linea) {
  const k = linea[0]
  const v = linea[1]
  const t = (v - a[k]) / (b[k] - a[k])
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

/**
 * Crea el cono verde de una cámara.
 * pos y objetivo son Vector3; recorte es [xMin, xMax, zMin, zMax].
 */
export function crearCono({ pos, objetivo, fovH, distanciaMax, recorte, color }) {
  const dir = objetivo.clone().sub(pos).normalize()
  const right = new Vector3().crossVectors(dir, new Vector3(0, 1, 0)).normalize()
  const up = new Vector3().crossVectors(right, dir).normalize()
  const th = Math.tan(MathUtils.degToRad(fovH / 2))
  const tv = th * 0.62
  const floorY = ALTURA_PISO

  // Las 4 esquinas del campo de visión, llevadas al piso (o hasta la distancia máxima).
  const pts = []
  ;[
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ].forEach((c) => {
    const ray = dir
      .clone()
      .addScaledVector(right, th * c[0])
      .addScaledVector(up, tv * c[1])
      .normalize()
    let p
    if (ray.y < 0) {
      const t = (floorY - pos.y) / ray.y
      p = t <= distanciaMax ? pos.clone().addScaledVector(ray, t) : pos.clone().addScaledVector(ray, distanciaMax)
    } else {
      p = pos.clone().addScaledVector(ray, distanciaMax)
    }
    pts.push([p.x, p.z])
  })

  const poly = recortarConRectangulo(pts, recorte)

  const grupo = new Group()
  grupo.position.copy(pos)
  const fanPos = []
  const edgePos = []
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i]
    const b = poly[(i + 1) % poly.length]
    fanPos.push(0, 0, 0, a[0] - pos.x, floorY - pos.y, a[1] - pos.z, b[0] - pos.x, floorY - pos.y, b[1] - pos.z)
    edgePos.push(a[0] - pos.x, floorY - pos.y, a[1] - pos.z, b[0] - pos.x, floorY - pos.y, b[1] - pos.z)
    edgePos.push(0, 0, 0, a[0] - pos.x, floorY - pos.y, a[1] - pos.z)
  }

  const fanG = new BufferGeometry()
  fanG.setAttribute('position', new Float32BufferAttribute(fanPos, 3))
  const fanM = new MeshBasicMaterial({ color, transparent: true, opacity: 0.1, side: DoubleSide, depthWrite: false })

  const shape = new Shape(poly.map((p) => new Vector2(p[0], -p[1])))
  const floorG = new ShapeGeometry(shape)
  floorG.rotateX(-Math.PI / 2)
  floorG.translate(-pos.x, floorY - pos.y, -pos.z)
  const floorM = new MeshBasicMaterial({ color, transparent: true, opacity: 0.3, side: DoubleSide, depthWrite: false })

  const edgeG = new BufferGeometry()
  edgeG.setAttribute('position', new Float32BufferAttribute(edgePos, 3))
  const edgeM = new LineBasicMaterial({ color, transparent: true, opacity: 0.75 })

  ;[new Mesh(fanG, fanM), new Mesh(floorG, floorM), new LineSegments(edgeG, edgeM)].forEach((o) => {
    o.layers.set(CAPA_CONOS)
    grupo.add(o)
  })
  grupo.layers.set(CAPA_CONOS)

  return { grupo, materiales: [fanM, floorM, edgeM], opacidadBase: [0.1, 0.3, 0.75] }
}
