// Datos de contacto del negocio. Cambia aquí los números y todos los botones se actualizan.

// Números de contacto (WhatsApp y llamadas).
// - whatsapp: formato internacional, sin "+", espacios ni guiones (57 = Colombia).
// - visible: cómo se muestra en la página.
// El primero es el principal: lo usan "Pedir visita gratis" y el cotizador.
export const CONTACTOS = [
  { whatsapp: '573209854151', visible: '320 985 4151' },
  { whatsapp: '573157140768', visible: '315 714 0768' },
]

export const WHATSAPP_NUMERO = CONTACTOS[0].whatsapp
export const TELEFONO_VISIBLE = CONTACTOS[0].visible

export const INSTAGRAM = 'vigitechbogota'

// Mensaje de los botones "Pedir visita gratis" y "Abrir WhatsApp".
export const MENSAJE_VISITA = 'Hola VigiTech, quiero una visita técnica gratis'

// Arma el enlace de WhatsApp con el mensaje ya codificado (por defecto, al número principal).
export function enlaceWhatsApp(mensaje = '', numero = WHATSAPP_NUMERO) {
  const base = `https://wa.me/${numero}`
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base
}
