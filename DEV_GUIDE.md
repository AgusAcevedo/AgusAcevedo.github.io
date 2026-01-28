# 🛠️ Guía de Desarrollo - Portfolio

Esta guía técnica te ayudará a personalizar y mantener tu portfolio.

## 📋 Tabla de Contenidos

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración Inicial](#configuración-inicial)
- [Gestión de Contenido](#gestión-de-contenido)
  - [Información Personal](#información-personal)
  - [Experiencia Laboral](#experiencia-laboral)
  - [Educación](#educación)
  - [Certificados](#certificados)
  - [Stack Tecnológico](#stack-tecnológico)
  - [Proyectos](#proyectos)
  - [Blog](#blog)
- [Personalización Avanzada](#personalización-avanzada)
- [Internacionalización (i18n)](#internacionalización-i18n)
- [SEO y Posicionamiento](#seo-y-posicionamiento)
- [Comandos](#comandos)

---

## 🏗️ Estructura del Proyecto

```
/
├── public/              # Archivos estáticos
│   ├── webp_certs/     # Imágenes de certificados
│   └── projects/       # Imágenes de proyectos
├── src/
│   ├── components/     # Componentes Astro
│   ├── i18n/          # Traducciones (ES/EN)
│   │   └── translations/
│   │       ├── es.ts  # 🔥 ARCHIVO PRINCIPAL DE CONTENIDO (Español)
│   │       └── en.ts  # 🔥 ARCHIVO PRINCIPAL DE CONTENIDO (Inglés)
│   ├── layouts/       # Layouts de página
│   ├── pages/         # Páginas del sitio
│   └── styles/        # Estilos globales
└── astro.config.mjs   # Configuración de Astro
```

---

## ⚙️ Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
# o
pnpm install
```

### 2. Configurar tu dominio

Edita `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://tudominio.com/', // 👈 Cambia esto
  integrations: [tailwind(), robotsTxt()],
})
```

### 3. Configurar CNAME (GitHub Pages)

Edita `public/CNAME` con tu dominio:

```
tudominio.com
```

---

## 📝 Gestión de Contenido

**IMPORTANTE:** Todo el contenido editable está en:
- **Español:** `src/i18n/translations/es.ts`
- **Inglés:** `src/i18n/translations/en.ts`

### 🙋 Información Personal

Edita la sección `personal` en `es.ts`:

```typescript
personal: {
  name: 'Tu Nombre Completo',
  firstName: 'Tu',
  lastName: 'Nombre',
  email: 'tu@email.com',
  phone: '+54 11 1234-5678', // Opcional
  location: 'Ciudad, País',
  jobTitle: 'Tu Título Profesional',
  currentCompany: 'Tu Empresa Actual',
  
  // URLs
  siteUrl: 'https://tudominio.com/',
  linkedin: 'https://linkedin.com/in/tuusuario',
  github: 'https://github.com/tuusuario',
  twitter: 'https://twitter.com/tuusuario', // Opcional
  
  // Imágenes
  profileImage: '/me.png',     // Tu foto de perfil
  ogImage: '/agus.webp',       // Imagen para compartir en redes
  favicon: '/favicon.svg',     // Ícono del sitio
  
  // Educación principal
  university: 'Tu Universidad',
  degree: 'Tu Carrera',
  
  // Skills (para SEO)
  skills: [
    'Skill 1',
    'Skill 2',
    'Skill 3',
    // ... más skills
  ],
  
  // Color principal del tema (en hexadecimal)
  themeColor: '#7c3aed', // Violeta por defecto
}
```

### 💼 Experiencia Laboral

Edita la sección `experience.jobs` en `es.ts`:

```typescript
experience: {
  title: 'Experiencia laboral',
  present: 'Actualidad',
  jobs: [
    {
      date: 'Mes Año - Presente',
      title: 'Tu Puesto',
      company: 'Nombre de la Empresa',
      description: 'Descripción detallada de tus responsabilidades...',
      link: 'https://empresa.com', // Opcional
    },
    {
      date: 'Mes Año - Mes Año',
      title: 'Puesto Anterior',
      company: 'Empresa Anterior',
      description: 'Descripción...',
      link: '', // Sin link
    },
    // ... más trabajos
  ],
}
```

**Tips:**
- Ordena los trabajos del más reciente al más antiguo
- Usa "Presente" o "Actualidad" para trabajos actuales
- El link es opcional (déjalo vacío `''` si no quieres)

### 🎓 Educación

Edita la sección `education.items` en `es.ts`:

```typescript
education: {
  title: 'Educación',
  items: [
    {
      institution: 'Nombre de la Institución',
      degree: 'Título/Grado Obtenido',
      field: 'Campo de Estudio',
      date: 'Año Inicio - Año Fin',
    },
    {
      institution: 'Otra Institución',
      degree: 'Otro Título',
      field: 'Otro Campo',
      date: '2020 - 2024 (en curso)', // Para estudios en progreso
    },
    // ... más educación
  ],
}
```

### 🏆 Certificados

Los certificados están **hardcodeados** en `src/components/Projects.astro`.

#### Agregar un nuevo certificado:

1. **Agrega la imagen** en `public/webp_certs/`

2. **Define el tag** (si es nuevo proveedor):

```typescript
// En Projects.astro, línea ~15
const TAGS = {
  // ... tags existentes
  TU_PROVEEDOR: {
    name: "Nombre del Proveedor",
    class: "bg-[#COLOR] text-white",
    icon: IconoComponente, // Importa un ícono si lo tienes
  },
};
```

3. **Agrega el certificado al array** `PROJECTS`:

```typescript
const PROJECTS = [
  // ... certificados existentes
  {
    title: "Nombre del Certificado",
    issuer: [TAGS.TU_PROVEEDOR], // Puede ser múltiple: [TAGS.GOOGLE, TAGS.COURSERA]
    date: "1 Ene 2024",
    link: "https://link-al-certificado.com/verify/123",
    image: "/webp_certs/tu-certificado.webp",
    cl: "no-oculto", // "no-oculto" = destacado, "hidden" = oculto por defecto
  },
];
```

**Estructura completa:**
- `title`: Nombre del certificado
- `issuer`: Array de tags (puede ser múltiple para co-branded)
- `date`: Fecha de obtención (formato libre)
- `link`: URL de verificación del certificado
- `image`: Ruta relativa desde `public/`
- `cl`: 
  - `"no-oculto"` = Se muestra en la vista inicial (destacados)
  - `"hidden"` = Se muestra solo al expandir "Ver más"

**Tips:**
- Usa formato `.webp` para mejor compresión
- Ordena los certificados por fecha (más recientes primero)
- Usa `cl: "no-oculto"` para los más importantes (6-8 certificados)

### 🛠️ Stack Tecnológico

El stack está en `src/components/Stack.astro`.

**Estructura actual:**

```astro
<article class="grid grid-cols-3 md:grid-cols-4 gap-6 lg:grid-cols-5">
  <div class="flex-item">
    <h4 class="font-semibold text-xl text-yellow-400">Categoría</h4>
    <ul>
      <li>Tecnología 1</li>
      <li>Tecnología 2</li>
      <li>Tecnología 3</li>
    </ul>
  </div>
  <!-- ... más categorías -->
</article>
```

**Para agregar/modificar:**

1. Edita directamente `src/components/Stack.astro`
2. Cada `<div class="flex-item">` es una categoría
3. Categorías actuales:
   - OS
   - Container
   - DB
   - Scripting
   - Clouds
   - IAT (Infrastructure as Code Tools)
   - Monitoring
   - CI/CD

**Tips:**
- Mantén 3-5 items por categoría para mejor legibilidad
- El grid es responsive: 3 cols (móvil), 4 cols (tablet), 5 cols (desktop)

### 🚀 Proyectos

Edita la sección `myProjects.items` en `es.ts`:

```typescript
myProjects: {
  title: 'Mis Proyectos',
  viewDetails: 'Ver detalles',
  closeModal: 'Cerrar',
  viewOnGithub: 'Ver en GitHub',
  viewDemo: 'Ver Demo',
  items: [
    {
      id: 'identificador-unico', // Único, sin espacios (usa kebab-case)
      title: 'Nombre del Proyecto',
      shortDescription: 'Descripción breve que se ve en la card (2-3 líneas)',
      description: `
        <p>Descripción completa del proyecto que se muestra en el modal.</p>
        <p class="mt-4"><strong>Características principales:</strong></p>
        <ul class="list-disc list-inside mt-2 space-y-1">
          <li>Característica 1</li>
          <li>Característica 2</li>
          <li>Característica 3</li>
        </ul>
        <p class="mt-4"><strong>Tecnologías utilizadas:</strong></p>
        <p>Descripción de las tecnologías y por qué las elegiste.</p>
      `,
      tags: ['Docker', 'Kubernetes', 'Python'], // Array de tecnologías
      image: '/projects/nombre-proyecto.jpg', // Opcional
      github: 'https://github.com/usuario/repo', // Opcional
      demo: 'https://demo.com', // Opcional
    },
    // ... más proyectos
  ],
}
```

**Campos:**
- `id`: Identificador único (usado internamente)
- `title`: Título del proyecto
- `shortDescription`: Descripción corta para la card
- `description`: Descripción completa con HTML (se ve en el modal al hacer click)
- `tags`: Array de tecnologías/herramientas usadas
- `image`: Ruta de la imagen (opcional, se muestra gradiente si no hay)
- `github`: URL del repositorio (opcional, muestra botón si existe)
- `demo`: URL de la demo/sitio (opcional, muestra botón si existe)

**Imágenes de proyectos:**
- Agregar en: `public/projects/`
- Formato recomendado: `.jpg`, `.png` o `.webp`
- Resolución sugerida: 1200x630px (ratio 16:9)

**Tips:**
- Usa HTML en `description` para mejor formato
- Clases de Tailwind funcionan dentro de `description`
- Máximo 4-6 proyectos destacados para mejor UX

### 📝 Blog (Dev.to)

El blog se integra automáticamente con **Dev.to API**.

#### Configuración:

**1. Cambiar username:**

Edita `src/components/Blog.astro`, línea ~15:

```javascript
const DEVTO_USERNAME = 'tuusuario'; // 👈 Cambia esto
```

**2. Configurar cantidad de artículos:**

En la misma línea del fetch:

```javascript
const response = await fetch(
  `https://dev.to/api/articles?username=${DEVTO_USERNAME}&per_page=6` // 👈 Cambia el número
);
```

**3. Traducciones:**

Edita en `es.ts` y `en.ts`:

```typescript
blog: {
  title: 'Blog',
  read: 'Leer artículo',
  viewMore: 'Ver más artículos en Dev.to',
  noArticles: 'No hay artículos disponibles por el momento.',
}
```

**Características:**
- Se actualiza automáticamente cuando publicas en Dev.to
- No requiere autenticación (API pública)
- Muestra imagen, título, descripción, tags y tiempo de lectura
- Carousel en móvil, grid en desktop
- Si hay error o no hay artículos, muestra mensaje amigable

**Para usar otro blog:**

Si no usas Dev.to, edita `src/components/Blog.astro` y cambia:
- La URL del fetch (línea ~30)
- El mapeo de datos (líneas ~40-60)
- Ajusta según la estructura de tu API

---

## 🎨 Personalización Avanzada

### Cambiar colores del tema

**1. Color principal (violeta):**

Edita `src/i18n/translations/es.ts`:

```typescript
personal: {
  themeColor: '#7c3aed', // 👈 Cambia este hex
}
```

**2. Colores en componentes:**

Busca y reemplaza `violet` por tu color en:
- `src/components/*.astro`
- `src/styles/global.css`

**Colores de Tailwind disponibles:**
- `violet` (actual)
- `blue`
- `green`
- `red`
- `purple`
- `pink`
- `yellow`
- etc.

### Cambiar fuente

**1. Instalar nueva fuente:**

```bash
npm install @fontsource-variable/nombre-fuente
```

**2. Importar en Layout:**

Edita `src/layouts/Layout.astro`:

```typescript
import "@fontsource-variable/nombre-fuente";
```

**3. Actualizar CSS:**

En el mismo archivo, sección `<style>`:

```css
body {
  font-family: "Nombre Fuente Variable", system-ui, sans-serif;
}
```

### Modificar animaciones

Las animaciones están en `src/styles/global.css`:

```css
@keyframes fadeIn { /* ... */ }
@keyframes slideUp { /* ... */ }

.reveal-on-scroll {
  /* Animación de aparición al hacer scroll */
}
```

Para cambiar velocidad/efecto, modifica los valores de:
- `duration`
- `timing-function`
- `delay`

### Grid de secciones

La mayoría de las secciones usan grids responsivos:

```astro
<!-- 1 col (móvil), 2 cols (tablet), 3 cols (desktop) -->
<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
```

Para cambiar:
- `md:grid-cols-2` → cantidad en tablet (768px+)
- `lg:grid-cols-3` → cantidad en desktop (1024px+)

### Carousels

Hay 3 carousels en el sitio:

1. **Blog** (móvil solamente)
2. **Proyectos** (full responsive)
3. **Certificados** (full responsive)

Configuración en cada componente:
- Auto-avance cada 5 segundos
- Navegación con flechas
- Indicadores de página (dots)

Para modificar velocidad del auto-avance, busca:

```javascript
setInterval(() => {
  // lógica del carousel
}, 5000); // 👈 5000ms = 5 segundos
```

---

## 🌍 Internacionalización (i18n)

El sitio soporta **Español** (default) e **Inglés**.

### Estructura:

```
/                   → Español (default)
/en/               → Inglés
```

### Archivos de traducción:

- `src/i18n/translations/es.ts` → Todo el contenido en español
- `src/i18n/translations/en.ts` → Todo el contenido en inglés

### Agregar un idioma nuevo:

1. **Crear archivo de traducción:**

```bash
cp src/i18n/translations/es.ts src/i18n/translations/fr.ts
```

2. **Traducir el contenido** en el nuevo archivo

3. **Crear página:**

```bash
mkdir src/pages/fr
cp src/pages/en/index.astro src/pages/fr/index.astro
```

4. **Actualizar imports:**

En `src/pages/fr/index.astro`:

```typescript
import { fr } from '@/i18n/translations/fr';
const t = fr;
```

5. **Actualizar navegación:**

Agrega el selector de idioma en `src/components/Header.astro`

### Sincronizar traducciones:

**IMPORTANTE:** Al agregar contenido nuevo en español, recuerda:

1. Agregar la misma estructura en `en.ts`
2. Traducir todos los textos
3. Mantener las mismas `id` y `keys` en ambos archivos

**Ejemplo:**

```typescript
// es.ts
myProjects: {
  title: 'Mis Proyectos',
  items: [
    { id: 'proyecto-1', title: 'Proyecto 1', ... }
  ]
}

// en.ts
myProjects: {
  title: 'My Projects', // 👈 Traducido
  items: [
    { id: 'proyecto-1', title: 'Project 1', ... } // 👈 Mismo ID
  ]
}
```

---

## � SEO y Posicionamiento

El sitio está completamente optimizado para SEO. Aquí está todo lo que necesitas saber:

### ✅ SEO Implementado

El portfolio incluye:
- ✅ Meta tags completos (title, description, keywords)
- ✅ Open Graph para redes sociales (Facebook, Twitter)
- ✅ Schema.org structured data (Person, WebSite)
- ✅ Sitemap XML multi-idioma con hreflang
- ✅ robots.txt configurado
- ✅ Canonical URLs
- ✅ Tags de geolocalización (Buenos Aires, Argentina)
- ✅ H1 semántico (oculto visualmente, visible para buscadores)
- ✅ Headers de seguridad (_headers)

### 📝 Configuración SEO

**Archivo principal:** `src/i18n/translations/es.ts` (y `en.ts`)

```typescript
seo: {
  title: 'Tu Nombre | Tu Puesto',
  description: 'Descripción de 150-160 caracteres optimizada para buscadores',
  keywords: 'keyword1, keyword2, keyword3, ...',
  ogTitle: 'Título para redes sociales',
  ogDescription: 'Descripción para cuando se comparte en redes',
}
```

**Tips para mejorar SEO:**

1. **Title**: Máximo 60 caracteres, incluye tu nombre y puesto
2. **Description**: 150-160 caracteres, natural y descriptivo
3. **Keywords**: 10-15 keywords relevantes, separadas por comas
4. **OG Tags**: Pueden ser diferentes del title/description normal

### 🚀 Hacer que tu sitio aparezca en Google

**Lee la guía completa:** [`SEO_GUIDE.md`](./SEO_GUIDE.md)

**Pasos rápidos:**

1. **Google Search Console** (OBLIGATORIO):
   - Ve a: https://search.google.com/search-console
   - Agrega tu sitio
   - Verifica propiedad (descarga archivo HTML y ponlo en `public/`)
   - Envía sitemap: `https://tudominio.com/sitemap-index.xml`

2. **Solicita indexación manual:**
   - En Search Console → "Inspección de URLs"
   - Ingresa tu URL y solicita indexación
   - Hazlo para ambas versiones (ES y EN)

3. **Agrega backlinks:**
   - LinkedIn: Agrega URL en tu perfil
   - GitHub: Agrega en perfil y repos importantes
   - Dev.to: Agrega en perfil
   - Comparte en redes sociales

**Tiempo esperado:** 2-7 días para aparecer en Google

### 🛠️ Herramientas de Verificación

Antes de deployar, verifica:

- **Schema Validator**: https://validator.schema.org/
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **PageSpeed Insights**: https://pagespeed.web.dev/

### 📊 Google Analytics (Opcional)

Para trackear visitas, agrega en `src/layouts/Layout.astro` (antes de `</head>`):

```astro
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Obtén tu ID en: https://analytics.google.com/

### 🔧 Configuración Avanzada

**Cambiar URLs del sitio:**

Edita `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://tudominio.com/', // 👈 Tu URL
  // ...
})
```

Y en `src/i18n/translations/es.ts`:

```typescript
personal: {
  siteUrl: 'https://tudominio.com/', // 👈 Debe coincidir
  // ...
}
```

**IMPORTANTE:** Ambas URLs deben ser **exactamente iguales** o el SEO fallará.

---

## �🚀 Comandos

### Desarrollo

```bash
npm run dev
# o
pnpm dev
```

Abre: `http://localhost:4321`

### Build

```bash
npm run build
# o
pnpm build
```

Genera el sitio en `dist/`

### Preview (ver el build localmente)

```bash
npm run preview
# o
pnpm preview
```

### Linting

```bash
npm run lint
# o
pnpm lint
```

---

## 📦 Deployment

### GitHub Pages

1. **Configurar GitHub Actions:**

El repo ya tiene `.github/workflows/deploy.yml` configurado.

2. **Configurar en GitHub:**
   - Ve a: Settings → Pages
   - Source: GitHub Actions
   - Listo! 🎉

3. **Push a main:**

```bash
git add .
git commit -m "Update content"
git push origin main
```

Se deployará automáticamente.

### Otros servicios

- **Vercel:** `vercel deploy`
- **Netlify:** Conecta el repo y listo
- **Cloudflare Pages:** Conecta el repo

**Build settings:**
- Build command: `npm run build` o `pnpm build`
- Output directory: `dist`
- Node version: 18+

---

## 🐛 Troubleshooting

### Error: Images not loading

Verifica que las rutas sean relativas a `public/`:

```typescript
image: '/projects/mi-imagen.jpg'  // ✅ Correcto
image: 'public/projects/mi-imagen.jpg'  // ❌ Incorrecto
```

### Error: Translation not found

Verifica que la key existe en ambos archivos (`es.ts` y `en.ts`).

### Carousel no funciona

1. Verifica que tienes suficientes items (mínimo 3)
2. Revisa la consola del navegador para errores
3. Limpia cache del navegador

### Build falla

1. Verifica que todas las imágenes referenciadas existen
2. Revisa errores de TypeScript: `npm run build`
3. Verifica versión de Node: `node --version` (debe ser 18+)

---

## 📚 Recursos

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Dev.to API](https://developers.forem.com/api)
- [TypeScript](https://www.typescriptlang.org/docs)

---

## 💡 Tips y Buenas Prácticas

1. **Optimiza las imágenes:**
   - Usa `.webp` para mejor compresión
   - Reduce resolución a lo necesario
   - Usa herramientas como [Squoosh](https://squoosh.app/)

2. **SEO:**
   - Completa todos los campos de `personal` para mejor SEO
   - Usa descripciones descriptivas y naturales
   - Incluye keywords relevantes en el contenido

3. **Performance:**
   - No agregues demasiados certificados destacados (6-8 máximo)
   - Limita proyectos a 4-6 para mejor UX
   - Usa lazy loading para imágenes (ya implementado)

4. **Mantenimiento:**
   - Actualiza dependencias regularmente: `npm update`
   - Revisa errores en consola del navegador
   - Testea en diferentes dispositivos y navegadores

5. **Git:**
   - Haz commits frecuentes con mensajes descriptivos
   - Usa branches para features grandes
   - Testea antes de hacer push a main

---

¿Preguntas? Abre un issue en el repositorio.

**¡Feliz coding! 🚀**
