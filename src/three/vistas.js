// Cámara orbital del visor, etiquetas flotantes y las 4 vistas del celular.

// Ubica la cámara del visor alrededor del centro (ángulos en grados).
export function orbitar(cam, az, el, dist, tx, ty, tz) {
  const a = (az * Math.PI) / 180
  const e = (el * Math.PI) / 180
  cam.position.set(
    tx + dist * Math.cos(e) * Math.sin(a),
    ty + dist * Math.sin(e),
    tz + dist * Math.cos(e) * Math.cos(a),
  )
  cam.lookAt(tx, ty, tz)
}

// Convierte un punto 3D en coordenadas de pantalla (para las etiquetas flotantes).
export function proyectar(v, cam, w, h) {
  const p = v.clone().project(cam)
  return { x: ((p.x + 1) / 2) * w, y: ((1 - p.y) / 2) * h, behind: p.z > 1 }
}

// Dibuja lo que ve cada cámara de la escena en su celda de la cuadrícula 2×2.
export function renderizarVistas(renderer, mundo, rects, canvasH) {
  renderer.setScissorTest(true)
  rects.forEach((rc, i) => {
    const c = mundo.camaras[i]
    if (!c) return
    const v = c.vista
    v.aspect = rc.w / rc.h
    v.fov = (2 * Math.atan(Math.tan((v.userData.fovH * Math.PI) / 360) / v.aspect) * 180) / Math.PI
    v.updateProjectionMatrix()
    const y = canvasH - rc.y - rc.h
    renderer.setViewport(rc.x, y, rc.w, rc.h)
    renderer.setScissor(rc.x, y, rc.w, rc.h)
    renderer.render(mundo.escena, v)
  })
  renderer.setScissorTest(false)
}
