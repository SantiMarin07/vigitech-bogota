// Escena CASA: frente y portón, garaje con carro, sala y comedor, patio trasero.
// Coordenadas en metros. x: izquierda/derecha, y: altura, z: patio (-) / calle (+).

export default {
  nombre: 'Casa',
  tamaño: 1.32,
  centro: [0.25, 0.3, 0.0],
  escalaCámara: 1.4,

  camaras: [
    {
      nombre: 'Frente y portón',
      pos: [-4.88, 2.6, 2.95],
      montaje: [-5.05, 2.6, 2.75],
      objetivo: [0.4, 0.3, 5.6],
      recorte: [-5, 5.6, 2.6, 6.2],
      distanciaMáx: 10,
      fovH: 72,
      desc: 'Cubre la reja, la puerta peatonal y el jardín.',
      porQué: 'Ves quién toca o se acerca a tu casa.',
    },
    {
      nombre: 'Garaje',
      pos: [4.8, 2.4, -3.75],
      montaje: [4.8, 2.4, -3.95],
      objetivo: [3.6, 0.3, 2.2],
      recorte: [2, 5.6, -4, 6.2],
      distanciaMáx: 9,
      fovH: 72,
      desc: 'Mira el carro y la entrada vehicular.',
      porQué: 'Tu carro vigilado día y noche.',
    },
    {
      nombre: 'Sala y comedor',
      pos: [-4.75, 2.5, -3.65],
      montaje: [-5.0, 2.5, -3.65],
      objetivo: [-0.6, 0.4, 1.8],
      recorte: [-5, 2, -4, 2.6],
      distanciaMáx: 8,
      fovH: 76,
      desc: 'Toma la zona social y la puerta principal desde adentro.',
      porQué: 'Tranquilidad cuando no hay nadie en casa.',
    },
    {
      nombre: 'Patio trasero',
      pos: [-0.6, 2.5, -4.35],
      montaje: [-0.6, 2.5, -4.12],
      objetivo: [-0.6, 0.2, -6.5],
      recorte: [-5, 5.6, -6.6, -4.1],
      distanciaMáx: 6,
      fovH: 95,
      desc: 'Vigila el patio y la puerta de atrás.',
      porQué: 'Por donde menos te imaginas que entran.',
    },
  ],

  // Recorrido de la persona naranja: [segundo, x, z]
  recorrido: [
    [0, -0.5, 9.0],
    [3.0, -0.5, 6.4],
    [5.0, -0.5, 3.0],
    [6.5, -0.5, 1.6],
    [9.0, -2.6, 0.4],
    [12.0, -0.4, -2.5],
    [14.0, -2.1, -3.2],
    [14.6, -2.1, -4.1],
    [16.0, -2.1, -5.4],
    [22, -2.1, -5.4],
  ],

  construir(THREE, scene, K) {
    const box = K.box
    box(12.2, 0.4, 15.6, 0x16222f, 0.25, -0.2, -0.2)
    const grass = 0x6e9e5b
    const wood = 0xc9ae8c
    const conc = 0xb8bec6
    const stone = 0xc9c1b3
    const tile = 0xd9d3c7
    box(7.0, 0.05, 6.5, wood, -1.5, 0, -0.75) // casa x -5..2, z -4..2.5
    box(3.6, 0.05, 6.5, conc, 3.8, 0, -0.75) // garaje x 2..5.6
    box(4.0, 0.05, 3.7, grass, -3.0, 0, 4.35) // jardín izq x -5..-1
    box(1.0, 0.05, 3.7, stone, -0.5, 0, 4.35) // camino x -1..0
    box(2.6, 0.05, 3.7, grass, 1.3, 0, 4.35) // jardín der x 0..2.6
    box(3.0, 0.05, 3.7, conc, 4.1, 0, 4.35) // entrada carro x 2.6..5.6
    box(7.0, 0.05, 2.6, tile, -1.5, 0, -5.3) // patio x -5..2, z -6.6..-4
    box(3.6, 0.05, 2.6, grass, 3.8, 0, -5.3)
    box(10.6, 0.05, 1.6, 0x4a535e, 0.3, -0.01, 7.0) // calle

    const wall = 0xf1ece4
    const low = 0xd8cfc2
    const frame = 0x5a4636
    box(2.5, 2.8, 0.2, wall, -3.85, 1.4, -4.0) // muro trasero con puerta x -2.6..-1.6
    box(7.2, 2.8, 0.2, wall, 2.0, 1.4, -4.0)
    box(1.0, 0.6, 0.2, wall, -2.1, 2.5, -4.0)
    box(0.2, 2.8, 6.6, wall, -5.1, 1.4, -0.75)
    box(0.2, 2.6, 2.6, wall, 2.0, 1.3, -2.7) // división casa/garaje, puerta z -1.4..-0.6
    box(0.2, 2.6, 3.1, wall, 2.0, 1.3, 0.95)
    box(0.2, 0.6, 6.6, low, 5.6, 0.3, -0.75)
    box(4.1, 0.6, 0.2, low, -3.05, 0.3, 2.6) // fachada baja, puerta x -1..0
    box(2.0, 0.6, 0.2, low, 1.0, 0.3, 2.6)
    box(0.3, 2.8, 0.3, frame, -5.1, 1.4, 2.6) // pilar esquina
    box(0.12, 2.6, 0.24, frame, -1.0, 1.3, 2.6)
    box(0.12, 2.6, 0.24, frame, 0.0, 1.3, 2.6)
    box(1.1, 0.14, 0.24, frame, -0.5, 2.55, 2.6)
    box(0.15, 2.6, 0.24, frame, 2.0, 1.3, 2.6)
    box(0.15, 2.6, 0.24, frame, 5.6, 1.3, 2.6)
    box(3.75, 0.25, 0.24, frame, 3.8, 2.5, 2.6)

    // Reja frontal z 6.2 con puertas peatonal (x -1..0) y vehicular (x 2.6..5.6)
    const fence = 0x2e3946
    box(4.1, 0.5, 0.2, low, -3.05, 0.25, 6.2)
    box(2.6, 0.5, 0.2, low, 1.3, 0.25, 6.2)
    for (let x = -5.0; x <= 5.6; x += 0.5) {
      if (x > -1.05 && x < 0.05) continue
      box(0.05, 1.3, 0.05, fence, x, 1.0, 6.2)
    }
    box(10.6, 0.06, 0.06, fence, 0.3, 1.6, 6.2)

    // Sala
    box(0.9, 0.45, 2.2, 0x56708a, -4.45, 0.25, -0.5)
    box(0.25, 0.8, 2.2, 0x56708a, -4.85, 0.45, -0.5)
    box(0.6, 0.35, 1.0, 0x6b4e3a, -3.4, 0.2, -0.5)
    box(0.4, 0.5, 1.6, 0x3b4756, -2.1, 0.25, -0.5)
    box(0.06, 0.7, 1.2, 0x111820, -2.1, 0.85, -0.5)

    // Cocina y comedor
    box(2.5, 0.9, 0.6, 0xe9e4da, -0.15, 0.45, -3.6)
    box(2.6, 0.05, 0.65, 0x3b4756, -0.15, 0.92, -3.6)
    box(0.7, 1.8, 0.7, 0xf4f6f8, 1.55, 0.9, -3.55)
    box(1.4, 0.05, 0.9, 0x6b4e3a, -0.2, 0.75, -1.5)
    box(0.1, 0.72, 0.6, 0x6b4e3a, -0.8, 0.37, -1.5)
    box(0.1, 0.72, 0.6, 0x6b4e3a, 0.4, 0.37, -1.5)
    ;[
      [-0.6, -2.15],
      [0.2, -2.15],
      [-0.6, -0.85],
      [0.2, -0.85],
    ].forEach((p) => box(0.42, 0.45, 0.42, 0x8a6a4f, p[0], 0.23, p[1]))

    // Garaje
    K.car(3.8, -0.8, 0xc0392b)
    box(1.6, 1.8, 0.4, 0x8a96a5, 4.6, 0.9, -3.7)

    // Patio y jardín
    box(0.08, 1.8, 0.08, 0x8a96a5, -4.2, 0.9, -5.6)
    box(0.08, 1.8, 0.08, 0x8a96a5, 0.8, 0.9, -5.6)
    box(5.0, 0.02, 0.02, 0xededed, -1.7, 1.75, -5.6)
    box(1.0, 0.05, 0.6, 0x6b4e3a, -3.2, 0.7, -5.0)
    box(10.8, 1.8, 0.2, 0xb49a7e, 0.25, 0.9, -6.6)
    K.tree(-4.3, 5.5, 0.8)
    K.plant(1.2, 3.6)
    K.plant(-4.5, -4.9)
    K.plant(1.4, -4.6)
  },
}
