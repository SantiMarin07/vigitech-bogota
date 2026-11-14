// Optimización: une en una sola malla por material todo lo que no se mueve.
// La escena se ve igual, pero cada vista dibuja ~30 piezas en vez de ~300,
// lo que aliviana mucho el trabajo en celulares de gama baja.
import { Mesh } from 'three'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export function fusionarEstaticos(escena, esDinamico) {
  escena.updateMatrixWorld(true)
  const porMaterial = new Map()
  const quitar = []
  const originales = new Set()

  escena.traverse((o) => {
    if (!o.isMesh || esDinamico(o)) return
    const g = o.geometry.clone().applyMatrix4(o.matrixWorld)
    if (!porMaterial.has(o.material)) porMaterial.set(o.material, [])
    porMaterial.get(o.material).push(g)
    quitar.push(o)
    originales.add(o.geometry)
  })

  quitar.forEach((o) => o.parent.remove(o))
  originales.forEach((g) => g.dispose())

  porMaterial.forEach((geos, material) => {
    const unida = BufferGeometryUtils.mergeBufferGeometries(geos)
    geos.forEach((g) => g.dispose())
    if (unida) escena.add(new Mesh(unida, material))
  })
}
