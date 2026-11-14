// Prepara (compila) los shaders de una escena de a poco: como máximo un shader nuevo
// por cuadro. En three r128 compilar obliga a esperar a la GPU; hacerlo todo de una vez
// congela la página unos cientos de milisegundos en celulares. Repartido, no se nota.
export function crearPreparador(renderer) {
  // En producción no se leen los errores de compilación (esa lectura también espera a la GPU).
  renderer.debug.checkShaderErrors = import.meta.env.DEV
  let escenaPreparada = null
  let luces = []
  let pendientes = []

  // Devuelve true cuando la escena ya se puede dibujar sin compilar nada más.
  return function estaLista(escena, camara) {
    if (escena !== escenaPreparada) {
      escenaPreparada = escena
      luces = escena.children.filter((o) => o.isLight)
      pendientes = escena.children.filter((o) => !o.isLight)
    }
    if (!pendientes.length) return true

    // Compila objeto por objeto (con las luces de la escena) hasta que aparezca un shader nuevo.
    const todos = escena.children
    const antes = renderer.info.programs.length
    try {
      while (pendientes.length && renderer.info.programs.length === antes) {
        escena.children = luces.concat(pendientes.shift())
        renderer.compile(escena, camara)
      }
    } finally {
      escena.children = todos
    }
    return false
  }
}
