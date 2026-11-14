// Carga diferida (lazy): cada escena se descarga solo cuando el usuario la elige.
const cargadores = {
  local: () => import('./local.js'),
  oficina: () => import('./oficina.js'),
  casa: () => import('./casa.js'),
  finca: () => import('./finca.js'),
}

export async function cargarEscena(lugar) {
  const mod = await cargadores[lugar]()
  return { lugar, datos: mod.default }
}
