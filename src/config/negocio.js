// Datos de contacto del negocio. Cambia aquí el número y todos los botones se actualizan.

// Número en formato internacional, sin "+", espacios ni guiones (57 = Colombia).
export const WHATSAPP_NUMERO = '573209854151'

// Cómo se muestra el número en la página.
export const TELEFONO_VISIBLE = '320 985 4151'

export const INSTAGRAM = 'vigitechbogota'

// Mensaje de los botones "Pedir visita gratis" y "Abrir WhatsApp".
export const MENSAJE_VISITA = 'Hola VigiTech, quiero una visita técnica gratis'

// Arma el enlace de WhatsApp con el mensaje ya codificado.
export function enlaceWhatsApp(mensaje = '') {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base
}
