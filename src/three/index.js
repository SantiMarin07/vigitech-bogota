// Punto de entrada del 3D. Simulator3D lo carga con import() para que three.js
// no se descargue con el resto de la página y no retrase la primera pintura.
export { PerspectiveCamera, WebGLRenderer } from 'three'
export { crearMundo } from './mundo.js'
export { orbitar, proyectar, renderizarVistas } from './vistas.js'
export { CAPA_CONOS } from './conos.js'
export { crearPreparador } from './preparar.js'
