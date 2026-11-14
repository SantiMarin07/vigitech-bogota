// Escena OFICINA: entrada, recepción, puestos de trabajo y sala de juntas de vidrio.
// Coordenadas en metros. x: izquierda/derecha, y: altura, z: fondo (-) / calle (+).

export default {
  nombre: 'Oficina',
  tamaño: 1,
  centro: [0.2, 0.3, -0.2],
  escalaCámara: 1.35,

  camaras: [
    {
      nombre: 'Entrada',
      pos: [4.2, 2.45, -0.8],
      montaje: [4.2, 2.45, -1.0],
      objetivo: [3.25, 0.8, 3.9],
      recorte: [-5, 5, -1, 4],
      distanciaMáx: 6.5,
      fovH: 62,
      desc: 'Mira la puerta principal de frente.',
      porQué: 'Registro de quién llega y a qué hora.',
    },
    {
      nombre: 'Recepción',
      pos: [-4.72, 2.7, 2.9],
      montaje: [-5.0, 2.7, 2.9],
      objetivo: [1.8, 0.8, 2.4],
      recorte: [-5, 5, -1, 4],
      distanciaMáx: 9,
      fovH: 52,
      desc: 'Cubre el mostrador de recepción y la zona de espera.',
      porQué: 'Atención a visitantes y paquetes que llegan.',
    },
    {
      nombre: 'Puestos de trabajo',
      pos: [-2.1, 2.75, -3.72],
      montaje: [-2.1, 2.75, -4.0],
      objetivo: [-2.1, 0.4, 2.2],
      recorte: [-5, 1, -4, 4],
      distanciaMáx: 8,
      fovH: 74,
      desc: 'Toma todos los escritorios desde el fondo.',
      porQué: 'Equipos y computadores siempre vigilados.',
    },
    {
      nombre: 'Sala de juntas',
      pos: [4.55, 2.5, -3.72],
      montaje: [4.55, 2.5, -4.0],
      objetivo: [2.6, 0.4, -1.4],
      recorte: [1, 5, -4, -1],
      distanciaMáx: 6,
      fovH: 82,
      desc: 'Vigila la sala de reuniones y su puerta.',
      porQué: 'Control de un espacio de acceso restringido.',
    },
  ],

  // Recorrido de la persona naranja: [segundo, x, z]
  recorrido: [
    [0, 3.25, 6.8],
    [3.0, 3.25, 3.6],
    [5.0, 2.0, 3.3],
    [8.0, 2.0, 3.3],
    [9.5, 0.2, 3.3],
    [12.0, 0.2, 0.0],
    [13.5, 1.8, -0.5],
    [14.5, 1.8, -1.5],
    [15.5, 2.6, -2.0],
    [22, 2.6, -2.0],
  ],

  construir(THREE, scene, K) {
    const box = K.box
    box(10.9, 0.4, 8.9, 0x16222f, 0, -0.2, 0)
    box(10.4, 0.05, 8.4, 0xb9c2cc, 0, 0, 0)
    box(10.4, 0.06, 2.4, 0x5b6672, 0, -0.02, 5.4)
    const wall = 0xeceef1
    const low = 0xc9d0d8
    const frame = 0x3b4756
    box(10.4, 3, 0.2, wall, 0, 1.5, -4.1)
    box(0.2, 3, 8.6, wall, -5.1, 1.5, 0)
    box(0.2, 0.6, 8.6, low, 5.1, 0.3, 0)

    // Fachada con puerta en x 2.5..4.0
    box(7.7, 0.6, 0.2, low, -1.35, 0.3, 4.1)
    box(1.2, 0.6, 0.2, low, 4.6, 0.3, 4.1)
    box(7.7, 2.4, 0.05, K.glass, -1.35, 1.8, 4.1)
    box(1.2, 2.4, 0.05, K.glass, 4.6, 1.8, 4.1)
    box(0.12, 3, 0.24, frame, 2.5, 1.5, 4.1)
    box(0.12, 3, 0.24, frame, 4.0, 1.5, 4.1)
    box(1.6, 0.14, 0.24, frame, 3.25, 2.93, 4.1)
    box(0.12, 3, 0.24, frame, -5.14, 1.5, 4.1)
    box(0.12, 3, 0.24, frame, 5.14, 1.5, 4.1)
    box(10.4, 0.12, 0.24, frame, 0, 3.0, 4.1)
    box(1.3, 0.02, 0.8, 0x2f3b4a, 3.25, 0.04, 3.5)

    // Sala de juntas de vidrio (x 1..5, z -4..-1), puerta x 1.3..2.3
    box(2.7, 2.6, 0.05, K.glass, 3.65, 1.3, -1.0)
    box(0.3, 2.6, 0.05, K.glass, 1.15, 1.3, -1.0)
    box(0.05, 2.6, 3.0, K.glass, 1.0, 1.3, -2.5)
    box(4.0, 0.08, 0.1, frame, 3.0, 2.6, -1.0)
    box(0.1, 0.08, 3.0, frame, 1.0, 2.6, -2.5)
    box(0.08, 2.6, 0.08, frame, 1.0, 1.3, -1.0)
    box(0.08, 2.6, 0.08, frame, 2.3, 1.3, -1.0)
    box(0.08, 2.6, 0.08, frame, 1.3, 1.3, -1.0)
    box(2.4, 0.06, 1.1, 0x6b4e3a, 3.1, 0.75, -2.6)
    box(0.1, 0.72, 0.8, 0x2e3946, 2.2, 0.37, -2.6)
    box(0.1, 0.72, 0.8, 0x2e3946, 4.0, 0.37, -2.6)
    ;[
      [2.5, -3.4],
      [3.6, -3.4],
      [2.5, -1.8],
      [3.6, -1.8],
    ].forEach((p) => box(0.5, 0.5, 0.5, 0x2e3946, p[0], 0.25, p[1]))
    box(0.06, 0.9, 1.5, 0x1f2833, 4.95, 1.5, -2.6) // pantalla

    // Recepción
    box(2.2, 1.1, 0.6, 0xf1f3f5, 1.8, 0.55, 2.6)
    box(2.4, 0.05, 0.75, 0x6b4e3a, 1.8, 1.12, 2.6)
    box(0.6, 0.75, 1.2, 0xf1f3f5, 0.65, 0.38, 2.0)
    const rec = K.person(0x4da3ff)
    rec.position.set(1.8, 0, 1.95)
    box(0.5, 0.33, 0.05, 0x1f2833, 1.5, 1.32, 2.4)

    // Puestos de trabajo
    function desk(x, z, worker) {
      box(1.5, 0.05, 0.8, 0xf1f3f5, x, 0.75, z)
      box(1.5, 0.7, 0.05, 0x8a96a5, x, 0.37, z - 0.37)
      box(0.55, 0.35, 0.05, 0x1f2833, x, 1.0, z - 0.25)
      box(0.06, 0.2, 0.06, 0x1f2833, x, 0.85, z - 0.25)
      box(0.5, 0.08, 0.5, 0x2e3946, x, 0.48, z + 0.55)
      box(0.5, 0.55, 0.06, 0x2e3946, x, 0.8, z + 0.8)
      if (worker) {
        const p = K.person(worker, 0.82)
        p.position.set(x, 0.08, z + 0.55)
        p.rotation.y = Math.PI
      }
    }
    desk(-3.6, -1.6, 0x8e5bd6)
    desk(-3.6, 1.0, null)
    desk(-0.6, -1.6, null)
    desk(-0.6, 1.0, 0xe4573d)

    // Archivo y plantas
    ;[-4.5, -3.6].forEach((x) => box(0.8, 1.3, 0.5, 0x8a96a5, x, 0.65, -3.72))
    K.plant(-4.6, 3.4)
    K.plant(0.4, -3.6)
    K.plant(4.6, 3.2)
  },
}
