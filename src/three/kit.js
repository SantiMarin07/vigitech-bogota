// Piezas básicas para armar las escenas: cajas, cilindros, personas, árboles, carros y matas.
import {
  BoxGeometry,
  CylinderGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshLambertMaterial,
  SphereGeometry,
  Vector3,
} from 'three'

// Números aleatorios con semilla: la escena sale igual cada vez que se carga.
export function rng(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function agregarLuces(scene) {
  scene.add(new HemisphereLight(0xeaf2ff, 0x2a3442, 0.9))
  const sun = new DirectionalLight(0xffffff, 0.55)
  sun.position.set(5, 10, 7)
  scene.add(sun)
  const fill = new DirectionalLight(0xbfd6ff, 0.3)
  fill.position.set(-8, 6, -4)
  scene.add(fill)
}

export function crearKit(scene) {
  const unit = new BoxGeometry(1, 1, 1)
  const mats = {}
  const mat = (c) => mats[c] || (mats[c] = new MeshLambertMaterial({ color: c }))
  const pick = (m) => (typeof m === 'number' ? mat(m) : m)

  function box(w, h, d, m, x, y, z, ry) {
    const o = new Mesh(unit, pick(m))
    o.scale.set(w, h, d)
    o.position.set(x, y, z)
    if (ry) o.rotation.y = ry
    scene.add(o)
    return o
  }

  function cylBetween(a, b, r, m) {
    const va = new Vector3().fromArray(a)
    const vb = new Vector3().fromArray(b)
    const g = new CylinderGeometry(r, r, va.distanceTo(vb), 10)
    const o = new Mesh(g, pick(m))
    o.position.copy(va).add(vb).multiplyScalar(0.5)
    o.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), vb.clone().sub(va).normalize())
    scene.add(o)
    return o
  }

  function cyl(r, h, m, x, y, z, seg) {
    const o = new Mesh(new CylinderGeometry(r, r, h, seg || 14), pick(m))
    o.position.set(x, y, z)
    scene.add(o)
    return o
  }

  function person(shirt, sc) {
    const g = new Group()
    const legs = new Mesh(new CylinderGeometry(0.17, 0.15, 0.8, 14), mat(0x26303c))
    legs.position.y = 0.42
    const torso = new Mesh(new CylinderGeometry(0.22, 0.2, 0.62, 14), mat(shirt))
    torso.position.y = 1.12
    const head = new Mesh(new SphereGeometry(0.15, 16, 12), mat(0xd9a889))
    head.position.y = 1.6
    const hair = new Mesh(new SphereGeometry(0.155, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat(0x2a1e18))
    hair.position.y = 1.62
    g.add(legs, torso, head, hair)
    if (sc) g.scale.setScalar(sc)
    scene.add(g)
    return g
  }

  function tree(x, z, s) {
    s = s || 1
    cyl(0.18 * s, 1.6 * s, 0x6b4a32, x, 0.8 * s, z, 8)
    const f = new Mesh(new SphereGeometry(1.2 * s, 12, 10), mat(0x3e7d45))
    f.position.set(x, 2.2 * s, z)
    f.scale.y = 1.15
    scene.add(f)
  }

  function car(x, z, color, ry) {
    const g = new Group()
    const body = new Mesh(unit, mat(color))
    body.scale.set(1.8, 0.6, 4.0)
    body.position.y = 0.55
    const cab = new Mesh(unit, mat(0x22344a))
    cab.scale.set(1.6, 0.5, 2.0)
    cab.position.set(0, 1.1, -0.2)
    g.add(body, cab)
    ;[
      [-0.85, 1.3],
      [0.85, 1.3],
      [-0.85, -1.3],
      [0.85, -1.3],
    ].forEach((p) => {
      const w = new Mesh(new CylinderGeometry(0.33, 0.33, 0.25, 14), mat(0x1a1f26))
      w.rotation.z = Math.PI / 2
      w.position.set(p[0], 0.33, p[1])
      g.add(w)
    })
    g.position.set(x, 0, z)
    g.rotation.y = ry || 0
    scene.add(g)
    return g
  }

  function plant(x, z) {
    cyl(0.2, 0.4, 0x8a6a4f, x, 0.2, z, 10)
    const f = new Mesh(new SphereGeometry(0.35, 10, 8), mat(0x3e7d45))
    f.position.set(x, 0.65, z)
    scene.add(f)
  }

  const glass = new MeshLambertMaterial({ color: 0x9fd3ff, transparent: true, opacity: 0.12, depthWrite: false })

  return { unit, mat, box, cyl, cylBetween, person, tree, car, plant, glass, rng }
}
