// Escena FINCA: portón de entrada, casa principal, parqueadero, establo y corral con vacas.
// Cámaras en postes, cerca perimetral y árboles. Coordenadas en metros.

export default {
  nombre: 'Finca',
  tamaño: 3.4,
  centro: [0, 0.3, 0.5],
  escalaCámara: 2.6,
  escalaPersona: 1.2,

  camaras: [
    {
      nombre: 'Portón de entrada',
      pos: [3.9, 4.0, 11.4],
      montaje: [4.3, 4.0, 11.4],
      poste: true,
      objetivo: [0, 0.3, 15.8],
      recorte: [-18, 18, 6, 20.5],
      distanciaMáx: 16,
      fovH: 74,
      desc: 'Cubre el portón y la vía de llegada a la finca.',
      porQué: 'Placas y personas que entran o salen.',
    },
    {
      nombre: 'Casa principal',
      pos: [-11.6, 4.0, 3.0],
      montaje: [-12.0, 4.0, 3.3],
      poste: true,
      objetivo: [-9, 0.5, -2.2],
      recorte: [-18, 2, -15, 8],
      distanciaMáx: 16,
      fovH: 70,
      desc: 'Mira el corredor y la puerta de la casa.',
      porQué: 'La casa protegida aunque estés lejos.',
    },
    {
      nombre: 'Parqueadero',
      pos: [4.2, 4.0, -1.2],
      montaje: [4.6, 4.0, -1.0],
      poste: true,
      objetivo: [-1.5, 0.3, -4.2],
      recorte: [-18, 18, -10, 6],
      distanciaMáx: 16,
      fovH: 64,
      desc: 'Toma el camino interno y los carros parqueados.',
      porQué: 'Vehículos y maquinaria a la vista.',
    },
    {
      nombre: 'Establo y corral',
      pos: [10.0, 4.0, 7.0],
      montaje: [10.3, 4.0, 7.3],
      poste: true,
      objetivo: [10.5, 0.3, -2.0],
      recorte: [4, 18, -15, 8],
      distanciaMáx: 16,
      fovH: 76,
      desc: 'Vigila el ganado, el corral y el establo.',
      porQué: 'Tus animales y herramientas, cuidados.',
    },
  ],

  // Recorrido de la persona naranja: [segundo, x, z]
  recorrido: [
    [0, 0, 19.5],
    [4, 0, 14.5],
    [10, 0, 4.0],
    [13, -4.5, 1.5],
    [16.5, -9, -1.5],
    [24, -9, -1.5],
  ],

  construir(THREE, scene, K) {
    const box = K.box
    const cyl = K.cyl
    box(41, 0.5, 38, 0x16222f, 0, -0.27, 1.5)
    box(40, 0.05, 37, 0x7ba65f, 0, 0, 1.5) // pasto z -17..20
    const dirt = 0xb9946a
    box(4, 0.05, 40, 0x5c5348, 0, 0.007, 18.5, Math.PI / 2) // vía exterior (z ~18.5)
    box(3, 0.05, 13, dirt, 0, 0.007, 7.5) // camino portón -> centro
    box(11, 0.05, 3, dirt, -4.5, 0.007, 1.5)
    box(3, 0.05, 6, dirt, -9, 0.007, -1.0)
    box(7, 0.05, 5, 0xa8a39a, -1.5, 0.009, -4.0) // parqueadero

    // Cerca perimetral x -18..18, z -15..14 con portón x -2.5..2.5
    const post = 0x6b4a32
    function fenceLine(x1, z1, x2, z2) {
      const len = Math.hypot(x2 - x1, z2 - z1)
      const n = Math.max(1, Math.round(len / 3))
      for (let i = 0; i <= n; i++) {
        const t = i / n
        cyl(0.08, 1.4, post, x1 + (x2 - x1) * t, 0.7, z1 + (z2 - z1) * t, 6)
      }
      ;[0.6, 1.1].forEach((y) => {
        const o = box(len, 0.06, 0.06, 0x8a6a4f, (x1 + x2) / 2, y, (z1 + z2) / 2)
        o.rotation.y = -Math.atan2(z2 - z1, x2 - x1)
      })
    }
    fenceLine(-18, -15, 18, -15)
    fenceLine(-18, -15, -18, 14)
    fenceLine(18, -15, 18, 14)
    fenceLine(-18, 14, -2.8, 14)
    fenceLine(2.8, 14, 18, 14)
    box(0.7, 3.0, 0.7, 0xd8cfc2, -2.9, 1.5, 14)
    box(0.7, 3.0, 0.7, 0xd8cfc2, 2.9, 1.5, 14)
    box(6.5, 0.5, 0.5, 0x6b4a32, 0, 3.1, 14)
    box(0.06, 1.6, 2.6, 0x2e3946, -2.6, 0.9, 12.75) // hojas abiertas del portón
    box(0.06, 1.6, 2.6, 0x2e3946, 2.6, 0.9, 12.75)

    // Casa principal con techo
    box(9, 3.2, 7, 0xf1ece4, -9, 1.6, -6.5)
    const roofG = new THREE.ConeGeometry(6.6, 2.4, 4, 1)
    roofG.rotateY(Math.PI / 4)
    const roof = new THREE.Mesh(roofG, K.mat(0xb5523b))
    roof.scale.set(1.0, 1, 0.8)
    roof.position.set(-9, 4.4, -6.5)
    scene.add(roof)
    box(9, 0.15, 2.2, 0xc9c1b3, -9, 0.08, -1.9)
    ;[-13.2, -10.4, -7.6, -4.8].forEach((x) => box(0.25, 2.8, 0.25, 0xf1ece4, x, 1.4, -1.0))
    box(9.4, 0.2, 2.6, 0x8a4a35, -9, 2.9, -1.9)
    box(1.2, 2.2, 0.08, 0x5a4636, -9, 1.1, -2.98)
    ;[-12, -6].forEach((x) => box(1.4, 1.1, 0.08, 0x22344a, x, 1.7, -2.98))

    // Parqueadero
    K.car(-3.4, -4.2, 0x3c7dd9, 0)
    K.car(0.4, -4.2, 0xe9ecef)

    // Establo y corral
    box(8, 0.25, 6, 0x8a4a35, 11, 3.1, -9)
    ;[
      [7.2, -11.8],
      [14.8, -11.8],
      [7.2, -6.2],
      [14.8, -6.2],
      [11, -6.2],
      [11, -11.8],
    ].forEach((p) => box(0.3, 3.0, 0.3, 0x6b4a32, p[0], 1.5, p[1]))
    box(8, 2.6, 0.2, 0x9c6b48, 11, 1.3, -11.9)
    for (let i = 0; i < 4; i++) box(1.6, 0.6, 0.8, 0xc9a66b, 8.5 + i * 2.0, 0.3, -11.0) // pacas
    fenceLine(6, -3, 15, -3)
    fenceLine(6, 4, 15, 4)
    fenceLine(15, -3, 15, 4)
    fenceLine(6, -3, 6, -0.5)
    fenceLine(6, 1.5, 6, 4)

    function cow(x, z, ry, c) {
      const g = new THREE.Group()
      const b = new THREE.Mesh(K.unit, K.mat(c))
      b.scale.set(0.8, 0.8, 1.7)
      b.position.y = 1.0
      const h = new THREE.Mesh(K.unit, K.mat(c))
      h.scale.set(0.5, 0.5, 0.6)
      h.position.set(0, 1.3, 1.05)
      g.add(b, h)
      ;[
        [-0.28, 0.6],
        [0.28, 0.6],
        [-0.28, -0.6],
        [0.28, -0.6],
      ].forEach((p) => {
        const l = new THREE.Mesh(K.unit, K.mat(0x3a3a3a))
        l.scale.set(0.15, 0.6, 0.15)
        l.position.set(p[0], 0.3, p[1])
        g.add(l)
      })
      g.position.set(x, 0, z)
      g.rotation.y = ry
      scene.add(g)
    }
    cow(9, 0.5, 0.4, 0xf5f5f2)
    cow(11.5, 2.2, -1.2, 0x7a4e2d)
    cow(13, -1.2, 2.2, 0xf5f5f2)

    // Tanque de agua y árboles
    cyl(1.0, 1.6, 0x2e3946, -15, 0.8, -11, 18)
    ;[
      [-15, 4],
      [-12, 10],
      [14.5, 10.5],
      [15, -13],
      [5, 9],
      [-6, 9],
      [12.5, 9.5],
      [-16, -2],
      [16, 0],
      [4, -13],
      [-4, -13],
      [-14, 12],
    ].forEach((t, k) => K.tree(t[0], t[1], 1.4 + (k % 3) * 0.25))
  },
}
