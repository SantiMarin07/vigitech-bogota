# VigiTech Bogotá · Página web

Página de VigiTech Bogotá (instalación de cámaras de seguridad) con simulador 3D, cotizador y contacto por WhatsApp.

Hecha con **React + Vite** (JavaScript) y **three.js 0.128** para el 3D. Sin otras librerías.

## Correrla en tu computador

Necesitas [Node.js](https://nodejs.org) 20 o más reciente.

```bash
npm install        # solo la primera vez
npm run dev        # abre http://localhost:5173
```

Otros comandos:

```bash
npm run build      # genera la versión final en la carpeta dist/
npm run preview    # muestra esa versión final en http://localhost:4173
npm run lint       # revisa el código
```

## Publicarla gratis en Vercel

1. Crea una cuenta en [github.com](https://github.com) y otra en [vercel.com](https://vercel.com) (puedes entrar a Vercel con tu cuenta de GitHub).
2. En GitHub crea un repositorio nuevo, por ejemplo `vigitech-bogota`.
3. Sube **el contenido de esta carpeta** (`vigitech-bogota`) a ese repositorio:
   ```bash
   git init
   git add .
   git commit -m "Página VigiTech Bogotá"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/vigitech-bogota.git
   git push -u origin main
   ```
4. En Vercel: **Add New… → Project**, elige el repositorio y pulsa **Import**.
5. Vercel detecta Vite solo. Deja los valores que propone:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Pulsa **Deploy**. En un minuto te da una dirección tipo `https://vigitech-bogota.vercel.app`.
7. Cada vez que hagas `git push` con cambios, Vercel publica la nueva versión sola.

Si subes la carpeta `Camaras` completa en vez de `vigitech-bogota`, en el paso 5 cambia **Root Directory** a `vigitech-bogota`.

Para usar un dominio propio (por ejemplo `vigitechbogota.com`): en Vercel, **Settings → Domains**.

### GitHub Pages (alternativa)

El build usa rutas relativas, así que también funciona en GitHub Pages. Compila con la dirección final para que la imagen al compartir funcione:

```bash
SITE_URL=https://TU-USUARIO.github.io/vigitech-bogota npm run build
```

y publica la carpeta `dist/`.

## Dónde cambiar cada cosa

| Qué | Archivo |
| --- | --- |
| **Precios** del cotizador (`base` y `porCámara`), anticipo y lo que incluye cada tipo | `src/config/precios.js` |
| **Número de WhatsApp**, número visible, Instagram y mensaje de "Pedir visita" | `src/config/negocio.js` |
| Títulos por lugar ("Así quedaría protegida tu casa"…), nota bajo el simulador | `src/config/lugares.js` |
| Cámaras de cada escena: nombre, descripción, "por qué", posición, ángulo | `src/scenes/local.js`, `oficina.js`, `casa.js`, `finca.js` |
| Catálogo (modelos, ventajas, desventajas, "Ideal para") | `src/components/Catalog.jsx` |
| "Lo que instalamos en tu lugar" | `src/components/Installation.jsx` |
| "Cómo trabajamos" (4 pasos) | `src/components/HowWeWork.jsx` |
| Preguntas frecuentes | `src/components/FAQ.jsx` |
| Textos del inicio, cotizador y contacto | `src/components/Hero.jsx`, `QuoteForm.jsx`, `Contact.jsx` |
| Título y descripción para Google y al compartir | `index.html` |
| Imagen al compartir (1200×630) | `public/og-image.jpg` |
| Colores y tipografías | `src/index.css` (variables al inicio) |

Fórmula del cotizador: **total = base + porCámara × cantidad**. Con "5 o más" no se muestra precio: cotiza un asesor.

## Cómo está organizado

```
src/
  App.jsx            Estado compartido: lugar elegido y cámara seleccionada
  components/        Una sección por archivo (.jsx + .css)
  config/            Precios, datos del negocio y textos por lugar
  scenes/            Las 4 escenas 3D (datos + geometría). Se cargan solo al elegirlas
  three/             Lógica 3D: armar escenas, conos de cobertura, vistas del celular
```

- three.js se descarga después de que la página carga, para que el texto aparezca primero.
- El render se pausa cuando el visor y el celular no están en pantalla.
- Al cambiar de escena se libera la memoria de la anterior.
- Respeta "reducir movimiento" del sistema: sin giro automático ni persona caminando.
