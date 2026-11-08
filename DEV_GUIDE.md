# 🛠️ Guía de Desarrollo - Portfolio

Esta guía técnica te ayudará a personalizar y mantener tu portfolio.

## 📋 Tabla de Contenidos

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración Inicial](#configuración-inicial)
- [Gestión de Contenido](#gestión-de-contenido)
  - [Información Personal](#información-personal)
  - [Experiencia Laboral](#experiencia-laboral)
  - [Educación](#educación)
  - [Credenciales](#credenciales)
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
│   ├── certifications/ # Insignias de certificaciones
│   └── projects/       # Imágenes de proyectos
├── src/
│   ├── components/     # Componentes Astro
│   ├── data/           # Datos de certificaciones y respaldo del blog
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
pnpm install --frozen-lockfile
```

### 2. Configurar tu dominio

Edita `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://tudominio.com/', // 👈 Cambia esto
  // Conservar las integraciones y políticas actuales del proyecto.
  // Tailwind usa @tailwindcss/vite; robots.txt está en public/robots.txt.
})
```

### 3. Configurar CNAME (GitHub Pages)

Edita `public/CNAME` con tu dominio:

```
tudominio.com
```

---

## 📝 Gestión de Contenido

El contenido personal y las traducciones están en:
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
  profileImage: '/agus.webp',  // Tu foto de perfil
  ogImage: '/og.jpg',          // Imagen para compartir en redes
  favicon: '/favicon.ico',     // Ícono del sitio
  
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

### 🏆 Credenciales

Un único enlace **Credenciales / Credentials** lleva a dos grupos: primero
**Certificaciones / Certifications**, para credenciales obtenidas mediante
exámenes de certificación; luego **Cursos e insignias / Courses & Badges**, para
formación, diplomaturas y logros de aprendizaje. La clasificación depende del
tipo de credencial. Se conservan los anchors `/#certificados` y
`/en/#certifications`.

#### Certificaciones

Edita el array tipado `certifications` en `src/data/certifications.ts` y guarda
las imágenes en `public/certifications/`. Por ejemplo, la credencial actual:

```typescript
{
  id: 'google-cloud-associate-cloud-engineer',
  title: 'Associate Cloud Engineer Certification',
  issuer: 'Google Cloud',
  issuedOn: '2026-09-04',
  expiresAt: '2029-09-04T00:00:00.000Z',
  image: '/certifications/google-cloud-associate-cloud-engineer.png',
  verificationUrl: 'https://www.credly.com/badges/8a67eb1e-099c-4708-a6ad-1c51245e0d53',
}
```

Usa un `id` único, `issuedOn` como fecha ISO `YYYY-MM-DD` y `expiresAt` como
fecha y hora ISO con zona horaria, verificadas con el emisor. Conserva el
instante exacto de vencimiento; no lo conviertas a una fecha sin hora.
`src/components/Certifications.astro` presenta las fechas en cada idioma y
actualiza el estado **Vigente / Active** o **Vencida / Expired** en el navegador.
El estado cambia a vencida en el instante UTC indicado por `expiresAt`. Un
temporizador actualiza la página al próximo vencimiento y también se revisa el
estado cuando vuelve a mostrarse o estar visible. No requiere recompilar el
sitio. Sin JavaScript, las fechas y el enlace de verificación siguen visibles.
Al renovar, actualiza las fechas y el enlace; las credenciales vencidas se
conservan.

#### Cursos e insignias

El array `PROJECTS` de `src/components/Projects.astro` conserva los cursos,
diplomaturas e insignias, con sus filtros, paginación y modal. Para agregar uno,
guarda su imagen en `public/webp_certs/`, define el proveedor en `TAGS` si es
necesario y añade una entrada:

```typescript
{
  title: "Nombre del curso",
  issuer: [TAGS.GOOGLE, TAGS.COURSERA],
  date: "1 Jan 2024",
  link: "https://link-al-certificado.com/verify/123",
  image: "/webp_certs/tu-certificado.webp",
  featured: true,
  categories: ["Cloud", "Python"],
}
```

`featured: true` lo incluye en la vista inicial de destacados. Usa las categorías
existentes (`Cloud`, `Backend`, `Python`, `Redes`, `Seguridad`, `Otros`) para que
funcionen los filtros. El componente ordena las entradas por fecha; usa fechas
con mes en inglés como en las entradas actuales. Los textos de ambos grupos se
editan en `src/i18n/translations/es.ts` y `en.ts`.

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
- `description`: Descripción completa con párrafos <p> y énfasis <strong> (se ve en el modal)
- `tags`: Array de tecnologías/herramientas usadas
- `image`: Ruta de la imagen (opcional, se muestra gradiente si no hay)
- `github`: URL del repositorio (opcional, muestra botón si existe)
- `demo`: URL de la demo/sitio (opcional, muestra botón si existe)

**Imágenes de proyectos:**
- Agregar en: `public/projects/`
- Formato recomendado: `.jpg`, `.png` o `.webp`
- Resolución sugerida: 1200x630px (ratio 16:9)

**Tips:**
- `description` admite párrafos `<p>` (opcional `class="mt-4"`) y énfasis `<strong>`
- El resto del HTML se trata como texto; cambiar el diseño en `MyProjects.astro`, no en las traducciones
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

La navegación es manual; los carousels no avanzan por temporizador:

- `Blog.astro` presenta un carousel en móvil, con flechas, indicadores y gestos
  horizontales. En escritorio muestra las tarjetas sin ese desplazamiento.
- `MyProjects.astro` adapta cuántos proyectos se ven al ancho disponible; las
  flechas, indicadores y gestos cambian de grupo.
- `Projects.astro` filtra los cursos e insignias por categoría y los pagina con
  flechas, indicadores o gestos. El filtro usa botones en escritorio y un
  selector en móvil.

Al cambiar de página, las tarjetas o grupos fuera de vista usan `inert` y
`aria-hidden` para que sus controles no reciban foco ni se anuncien como
contenido activo. Conserva este comportamiento al modificar la navegación, y
comprueba el teclado, los límites de página y los cambios de ancho con
`pnpm test:e2e`.

---

## 🌍 Internacionalización (i18n)

El portfolio genera español en `/` e inglés en `/en/`. Cada página obtiene su
idioma de `Astro.currentLocale` durante la compilación y pasa ese valor a
`useTranslations(currentLocale)`. No hay un estado de idioma del navegador que
vuelva a traducir la página.

### Archivos y contenido

- `src/i18n/languages.ts` define los idiomas y el predeterminado (`es`).
- `src/i18n/index.ts` exporta los diccionarios y `useTranslations`.
- `src/i18n/translations/es.ts` define la estructura y el contenido español.
- `src/i18n/translations/en.ts` aporta el inglés con `satisfies Translations`.
- `src/components/LanguageToggle.astro` contiene los enlaces nativos a las dos
  rutas, visibles como ES / EN sin depender de JavaScript; `Header.astro`
  incluye ese selector en escritorio y móvil.

Al modificar contenido, mantén la misma estructura de claves en los dos
idiomas y conserva los identificadores de datos compartidos. El tipado
comprueba la estructura, pero la calidad de la traducción y los textos largos
requieren revisión en ambas vistas.

### Añadir otro idioma

La implementación tiene varios puntos específicos de dos idiomas. Añadir un
tercero requiere revisar el registro de idiomas, diccionarios, configuración de
Astro y sitemap, nueva página y anchors, selector, navegación, HTML `lang`,
alternates SEO, formatos de fecha y pruebas. Crear sólo un archivo de traducción
no completa la integración.

La [documentación de i18n](src/i18n/README.md) explica el uso en componentes y la
lista de cambios necesaria para ampliar idiomas. Tras modificarlo, ejecuta
`pnpm build` y `pnpm test:e2e`, y revisa las rutas en escritorio y móvil.

---

## 🔍 SEO y Posicionamiento

El sitio genera dos páginas estáticas: español en `/` e inglés en `/en/`.
Consulta [SEO_GUIDE.md](SEO_GUIDE.md) para el mantenimiento y la revisión de
Search Console; las decisiones de CSP y hosting están en
[SECURITY.md](SECURITY.md).

### Implementación actual

- `src/components/SEO.astro` genera descripción, canonical por ruta,
  alternates `es-AR` / `en-US` / `x-default`, Open Graph y Twitter Cards.
- El JSON-LD contiene `Person`, `WebSite` y `ProfilePage`, con una
  `Organization` anidada en `Person.worksFor`.
- `Layout.astro` publica el título, y `Hero.astro` contiene el H1 de la página.
- `@astrojs/sitemap` genera el sitemap al compilar. `public/robots.txt` permite
  el rastreo y referencia `https://agusacevedo.com.ar/sitemap-index.xml`.
- El meta tag de Search Console está configurado en `SEO.astro`; la propiedad
  y su verificación efectiva se comprueban en Search Console.

### Editar metadatos

Actualiza `src/i18n/translations/es.ts` y `en.ts`:

```typescript
seo: {
  title: 'Tu Nombre | Tu Puesto',
  description: 'Descripción clara del perfil y del contenido visible',
  ogTitle: 'Título para compartir en redes',
  ogDescription: 'Descripción para compartir en redes',
}
```

`personal.ogImage` selecciona la imagen social; actualmente usa `/og.jpg`.
Si cambias la imagen, revisa su tipo y dimensiones declaradas en `SEO.astro`.
El campo existente `seo.keywords` no se publica como meta tag en el componente
actual; tampoco se generan tags de geolocalización.

Al cambiar de dominio, actualiza `site` en `astro.config.mjs`,
`personal.siteUrl` en **ambos idiomas**, `public/CNAME` y el sitemap indicado en
`public/robots.txt`. Revisa enlaces absolutos y redirecciones para mantener las
URLs coherentes. Al añadir idiomas o rutas, actualiza también los alternates de
`SEO.astro` y la configuración de sitemap.

### Verificar cambios

Ejecuta `pnpm build`, `pnpm test` y `pnpm test:e2e`. Revisa el HTML y los sitemaps
generados en `dist/`, y vuelve a comprobar las URLs públicas tras desplegar.
La guía [SEO_GUIDE.md](SEO_GUIDE.md) incluye las herramientas oficiales para
inspeccionar URLs, validar datos estructurados y medir el rendimiento. No se
presupone una puntuación de Lighthouse, una posición ni un plazo de indexación.

### Analítica

Agregar analítica requiere elegir qué datos y proveedor utilizar, además de
configurar una integración compatible con la CSP y el hosting. Los scripts
externos y las conexiones de recopilación no están autorizados por la política
actual. Sigue [SECURITY.md](SECURITY.md) antes de habilitar un proveedor; pegar
su snippet en el layout no basta.

---

## �🚀 Comandos

### Desarrollo

```bash
pnpm dev
```

Abre: `http://localhost:4321`

### Build

```bash
pnpm build
```

Genera el sitio en `dist/`

### Preview (ver el build localmente)

```bash
pnpm preview
```

### Verificación de tipos y pruebas

```bash
pnpm check
pnpm test
# Instalar navegadores una vez para ejecutar la validación completa.
pnpm exec playwright install --with-deps chromium firefox webkit
pnpm validate
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
- Build command: `pnpm build` o `pnpm build`
- Output directory: `dist`
- Node version: 24.22.1 (ver `.node-version`)

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
2. Revisa errores de TypeScript: `pnpm build`
3. Verifica versión de Node: `node --version` (debe coincidir con `.node-version`: 24.22.1)

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
