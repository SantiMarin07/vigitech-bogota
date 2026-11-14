// ===== Precios del cotizador (pesos colombianos) =====
// Fórmula: total = base + porCámara × cantidad
// Hasta 4 cámaras se muestra el precio; con "5 o más" cotiza un asesor.
// Para cambiar un precio, edita solo los números de "base" y "porCámara".

export const PRECIOS = {
  analoga: {
    opcion: 'Análoga', // texto del botón en el cotizador
    detalle: 'La más económica',
    nombre: 'Análogas (Turbo HD)', // va en el mensaje de WhatsApp
    corto: 'análogas Turbo HD', // va en la lista "incluye"
    base: 520000,
    porCámara: 160000,
    incluye: [
      'Grabador DVR con detección de movimiento',
      'Disco duro de 1 TB para videovigilancia',
      'Fuente de poder centralizada',
      'Cable UTP con video balun (hasta 20 m por cámara)',
      'Canaleta, caja de paso y conectores',
      'Instalación y app configurada en tu celular',
    ],
  },
  ip: {
    opcion: 'IP de cable',
    detalle: 'La mejor imagen',
    nombre: 'IP de cable (PoE)',
    corto: 'IP de cable',
    base: 960000,
    porCámara: 410000,
    incluye: [
      'Grabador NVR con puertos PoE',
      'Disco duro de 1 TB para videovigilancia',
      'Cable UTP cat5e (hasta 20 m por cámara)',
      'Canaleta, caja de paso y conectores',
      'Instalación y app configurada en tu celular',
    ],
  },
  wifi: {
    opcion: 'WiFi',
    detalle: 'Sin cable de video',
    nombre: 'WiFi',
    corto: 'WiFi',
    base: 60000,
    porCámara: 350000,
    incluye: [
      'Memoria microSD de 64 GB en cada cámara',
      'Soporte e instalación en pared o techo',
      'Conexión a tu red WiFi',
      'App configurada en tu celular',
    ],
  },
}

// Porcentaje del anticipo (0.5 = 50 %).
export const ANTICIPO = 0.5

export function calcularTotal(tipo, cantidad) {
  const p = PRECIOS[tipo]
  return p.base + p.porCámara * cantidad
}

// 1160000 -> "$1.160.000"
export function formatoPesos(n) {
  return '$' + Math.round(n).toLocaleString('es-CO').replace(/,/g, '.')
}
