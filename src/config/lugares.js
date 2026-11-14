// Textos que cambian según el lugar elegido (pestañas, título, celular, cotizador).
export const LUGARES = {
  local: {
    etiqueta: 'Local',
    titulo: 'Así quedaría protegido tu negocio',
    palabra: 'negocio',
    celular: 'Mi negocio',
  },
  oficina: {
    etiqueta: 'Oficina',
    titulo: 'Así quedaría protegida tu oficina',
    palabra: 'oficina',
    celular: 'Mi oficina',
  },
  casa: {
    etiqueta: 'Casa',
    titulo: 'Así quedaría protegida tu casa',
    palabra: 'casa',
    celular: 'Mi casa',
  },
  finca: {
    etiqueta: 'Finca',
    titulo: 'Así quedaría protegida tu finca',
    palabra: 'finca',
    celular: 'Mi finca',
  },
}

export const ORDEN_LUGARES = ['local', 'oficina', 'casa', 'finca']

// Nota que va debajo del simulador.
export function notaEscena(lugar) {
  return lugar === 'finca'
    ? 'Ejemplo ilustrativo con 4 cámaras. Una finca grande suele necesitar más puntos: lo definimos en la visita técnica.'
    : 'Ejemplo ilustrativo. La ubicación exacta de cada cámara se define en la visita técnica.'
}
