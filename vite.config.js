import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// URL pública del sitio (sin "/" al final). Sirve para que la imagen de Open Graph
// sea absoluta (WhatsApp y Facebook la necesitan así).
// En Vercel se detecta sola. En otro hosting: SITE_URL=https://midominio.com npm run build
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/$/, '')

function urlDelSitio() {
  return {
    name: 'url-del-sitio',
    transformIndexHtml(html) {
      const extra = siteUrl
        ? `<meta property="og:url" content="${siteUrl}/" />\n    <link rel="canonical" href="${siteUrl}/" />`
        : ''
      return html.replaceAll('%SITE_URL%', siteUrl).replace('<!-- og:url -->', extra)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Rutas relativas: el mismo build funciona en Vercel y en GitHub Pages (/nombre-repo/).
  base: './',
  plugins: [react(), urlDelSitio()],
  build: {
    // three.js (~520 kB) va en su propio archivo y se carga después de la página.
    chunkSizeWarningLimit: 600,
  },
})
