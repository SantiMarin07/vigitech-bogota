// Escena LOCAL / TIENDA: entrada, caja, pasillo y bodega.
// Coordenadas en metros. x: izquierda/derecha, y: altura, z: fondo (-) / calle (+).

const PROD = [0xe4573d, 0xf2b134, 0x2f9e6e, 0x3c7dd9, 0xe77fa8, 0xf5f5f2, 0x8e5bd6, 0x1fb5c9]

export default {
  nombre: 'Local',
  tamaño: 1,
  centro: [0.2, 0.3, -0.2],
  escalaCámara: 1.35,

  camaras: [
    {
      nombre: 'Entrada',
      pos: [-4.72, 2.7, 1.4],
      montaje: [-5.0, 2.7, 1.4],
      objetivo: [-1.5, 0.9, 3.7],
      recorte: [-5, 5, -4, 4],
      distanciaMáx: 6.5,
      fovH: 78,
      desc: 'Apunta a la puerta desde adentro, a la altura de la cara.',
      porQué: 'Quién entra, quién sale y a qué hora.',
    },
    {
      nombre: 'Caja',
      pos: [4.4, 2.0, -0.85],
      montaje: [4.4, 2.0, -1.12],
      objetivo: [3.0, 0.9, 2.5],
      recorte: [-5, 5, -1.2, 4],
      distanciaMáx: 7,
      fovH: 70,
      desc: 'Toma el mostrador, la registradora y al cliente que paga.',
      porQué: 'Cada venta queda grabada.',
    },
    {
      nombre: 'Pasillo',
      pos: [-2.3, 2.75, -3.72],
      montaje: [-2.3, 2.75, -4.0],
      objetivo: [-2.3, 0.4, 2.2],
      recorte: [-5, 1.5, -4, 4],
      distanciaMáx: 8,
      fovH: 62,
      desc: 'Recorre el pasillo entre los estantes de punta a punta.',
      porQué: 'Los estantes, sin puntos ciegos.',
    },
    {
      nombre: 'Bodega',
      pos: [4.55, 2.6, -3.72],
      montaje: [4.55, 2.6, -4.0],
      objetivo: [2.4, 0.3, -1.6],
      recorte: [1.5, 5, -4, -1.2],
      distanciaMáx: 6,
      fovH: 80,
      desc: 'Vigila la mercancía guardada y la puerta de la bodega.',
      porQué: 'Tu inventario, también de noche.',
    },
  ],

  // Recorrido de la persona naranja: [segundo, x, z]
  recorrido: [
    [0, -1.5, 6.8],
    [3.0, -1.5, 3.5],
    [6.5, -2.3, 1.2],
    [10.5, -2.3, -1.9],
    [12.5, -0.3, -1.6],
    [15.5, 2.5, 1.35],
    [22, 2.5, 1.35],
  ],

  construir(THREE, scene, K) {
    const box = K.box
    const r = K.rng(7)
    box(10.9, 0.4, 8.9, 0x16222f, 0, -0.2, 0)
    box(10.4, 0.05, 8.4, 0xcdd1d6, 0, 0, 0)
    const grid = new THREE.GridHelper(10.4, 13, 0xb3b9c1, 0xb3b9c1)
    grid.scale.z = 8.4 / 10.4
    grid.position.y = 0.028
    scene.add(grid)
    box(10.4, 0.06, 2.4, 0x5b6672, 0, -0.02, 5.4)

    // Muros, fachada de vidrio y puerta
    const wall = 0xe9ecef
    const low = 0xc9d0d8
    const frame = 0x3b4756
    box(10.4, 3, 0.2, wall, 0, 1.5, -4.1)
    box(0.2, 3, 8.6, wall, -5.1, 1.5, 0)
    box(0.2, 0.6, 8.6, low, 5.1, 0.3, 0)
    box(3.0, 0.6, 0.2, low, -3.7, 0.3, 4.1)
    box(6.0, 0.6, 0.2, low, 2.2, 0.3, 4.1)
    box(3.0, 2.4, 0.05, K.glass, -3.7, 1.8, 4.1)
    box(6.0, 2.4, 0.05, K.glass, 2.2, 1.8, 4.1)
    box(0.12, 3, 0.24, frame, -2.2, 1.5, 4.1)
    box(0.12, 3, 0.24, frame, -0.8, 1.5, 4.1)
    box(1.52, 0.14, 0.24, frame, -1.5, 2.93, 4.1)
    box(0.12, 3, 0.24, frame, -5.14, 1.5, 4.1)
    box(0.12, 3, 0.24, frame, 5.14, 1.5, 4.1)
    box(10.4, 0.12, 0.24, frame, 0, 3.0, 4.1)
    box(1.3, 0.02, 0.8, 0x2f3b4a, -1.5, 0.04, 3.5)

    // Bodega con cajas
    const part = 0xdde2e8
    box(0.3, 2.2, 0.15, part, 1.65, 1.1, -1.2)
    box(2.4, 2.2, 0.15, part, 4.0, 1.1, -1.2)
    box(1.0, 0.2, 0.15, part, 2.3, 2.1, -1.2)
    box(0.15, 2.2, 2.8, part, 1.5, 1.1, -2.6)
    const card = [0xc1915f, 0xad7f50, 0xcfa172]
    box(2.3, 0.12, 1.5, 0x8a6b4a, 3.8, 0.08, -3.1)
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        const n = 1 + Math.floor(r() * 3)
        for (let k = 0; k < n; k++) box(0.6, 0.5, 0.6, card[(i + j + k) % 3], 3.0 + i * 0.72, 0.4 + k * 0.52, -3.5 + j * 0.72)
      }
    }
    box(0.5, 1.9, 1.6, 0x6e7884, 1.95, 0.95, -3.0)
    for (let s = 0; s < 3; s++) {
      for (let q = 0; q < 3; q++) box(0.4, 0.35, 0.42, card[(s + q) % 3], 1.95, 0.4 + s * 0.6, -3.55 + q * 0.55)
    }

    // Góndolas con productos
    function gondola(cx, cz, len) {
      box(0.95, 0.12, len, 0x56606c, cx, 0.08, cz)
      box(0.06, 1.75, len, 0x56606c, cx, 0.9, cz)
      ;[0.45, 0.95, 1.45].forEach((y) => {
        box(0.95, 0.04, len, 0xf1f3f5, cx, y, cz)
        for (let z = cz - len / 2 + 0.2; z < cz + len / 2 - 0.1; z += 0.3) {
          ;[-1, 1].forEach((side) => {
            if (r() < 0.12) return
            const h = 0.22 + r() * 0.16
            box(0.3, h, 0.24, PROD[Math.floor(r() * PROD.length)], cx + side * 0.26, y + 0.02 + h / 2, z)
          })
        }
      })
    }
    gondola(-3.65, -0.6, 3.6)
    gondola(-0.95, -0.6, 3.6)

    // Estantería del fondo
    box(5.6, 1.9, 0.08, 0x56606c, -1.8, 0.95, -3.98)
    ;[0.5, 1.1, 1.7].forEach((y) => {
      box(5.6, 0.04, 0.5, 0xf1f3f5, -1.8, y, -3.72)
      for (let x = -4.45; x < 0.9; x += 0.32) {
        if (r() < 0.15) continue
        const h = 0.22 + r() * 0.18
        box(0.26, h, 0.3, PROD[Math.floor(r() * PROD.length)], x, y + 0.02 + h / 2, -3.72)
      }
    })

    // Nevera, mostrador y registradora
    box(1.0, 2.0, 0.7, 0xf4f6f8, -4.6, 1.0, 2.75)
    box(0.04, 1.7, 0.6, 0x9fd3ff, -4.08, 1.05, 2.75)
    box(2.6, 1.0, 0.8, 0x7a5a43, 3.1, 0.5, 2.3)
    box(2.8, 0.06, 0.95, 0x2e3946, 3.1, 1.03, 2.3)
    box(0.45, 0.12, 0.35, 0x1f2833, 2.5, 1.12, 2.45)
    box(0.42, 0.3, 0.05, 0x1f2833, 2.5, 1.36, 2.62)
    const cashier = K.person(0x4da3ff)
    cashier.position.set(3.4, 0, 3.15)
    cashier.rotation.y = Math.PI
  },
}
