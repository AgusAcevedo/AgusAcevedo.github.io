# 🚀 Guía SEO - Cómo aparecer en Google

Esta guía te ayudará a hacer que tu portfolio aparezca en Google y otros buscadores.

## ✅ Problemas SEO Corregidos

### 1. **URL Inconsistente (CRÍTICO)** ✅
- **Problema:** `astro.config.mjs` tenía `agustinacevedo.me` pero traducciones `agusacevedo.com.ar`
- **Solución:** Unificado todo a `https://agusacevedo.com.ar/`
- **Archivos modificados:**
  - `astro.config.mjs` - URL del sitio corregida
  - Sitemap ahora apunta al dominio correcto

### 2. **Sitemap Mejorado** ✅
- **Agregado:** `changefreq: 'weekly'`, `priority: 1.0`, `lastmod: new Date()`
- **Ubicación:** `https://agusacevedo.com.ar/sitemap-index.xml`
- **Idiomas:** Correctamente configurado para ES/EN con hreflang

### 3. **Meta Tags Geo** ✅
- **Agregado:** Tags de geolocalización (Buenos Aires, Argentina)
- **Beneficio:** Mejor ranking en búsquedas locales
- **Archivo:** `src/components/SEO.astro`

### 4. **H1 Semántico** ✅
- **Agregado:** H1 oculto visualmente pero visible para buscadores
- **Ubicación:** `index.astro` (ES) y `en/index.astro` (EN)
- **Contenido:** "{Nombre} - {Puesto} | Portfolio Profesional"

### 5. **Headers de Seguridad** ✅
- **Creado:** `public/_headers` para GitHub Pages
- **Incluye:** X-Frame-Options, CSP, Cache-Control optimizado
- **Beneficio:** Mejor ranking SEO (Google premia sitios seguros)

### 6. **Archivo de Verificación** ✅
- **Creado:** `public/google-site-verification.html`
- **Uso:** Para verificar propiedad en Google Search Console

---

## 📝 Pasos Siguientes para Indexación

### **Paso 1: Google Search Console** (OBLIGATORIO)

1. Ve a: https://search.google.com/search-console
2. Click en "Agregar propiedad"
3. Selecciona "Prefijo de URL": `https://agusacevedo.com.ar`
4. Elige método de verificación:

**Opción A: Archivo HTML (Recomendado)**
```bash
# Google te dará un archivo como: google1234567890abcdef.html
# Descárgalo y ponlo en: public/google1234567890abcdef.html
# Luego build y deploy
npm run build
git add public/google1234567890abcdef.html
git commit -m "Add Google Search Console verification"
git push
```

**Opción B: Meta Tag**
```astro
<!-- En src/components/SEO.astro, después de la línea 79 -->
<meta name="google-site-verification" content="TU_CODIGO_AQUI" />
```

5. **Verificar** en Search Console
6. **Enviar sitemap:**
   - En Search Console → "Sitemaps"
   - Agregar: `https://agusacevedo.com.ar/sitemap-index.xml`
   - Click "Enviar"

### **Paso 2: Solicitar Indexación Manual** (IMPORTANTE)

1. En Google Search Console, ve a "Inspección de URLs"
2. Ingresa: `https://agusacevedo.com.ar`
3. Click "Solicitar indexación"
4. Repite para: `https://agusacevedo.com.ar/en/`

**Tiempo estimado:** 2-7 días para aparecer en Google

### **Paso 3: Bing Webmaster Tools**

1. Ve a: https://www.bing.com/webmasters
2. Agrega tu sitio: `https://agusacevedo.com.ar`
3. Verificación (puedes importar desde Google Search Console)
4. Enviar sitemap: `https://agusacevedo.com.ar/sitemap-index.xml`

### **Paso 4: Schema.org Validation**

Valida tus structured data:
1. Ve a: https://validator.schema.org/
2. Pega tu URL: `https://agusacevedo.com.ar`
3. Verifica que no haya errores

También prueba:
- https://search.google.com/test/rich-results (Rich Results Test)
- https://search.google.com/test/mobile-friendly (Mobile-Friendly Test)

---

## 🔍 SEO On-Page Implementado

### ✅ **Meta Tags Esenciales**
```astro
✓ Title tag único por página
✓ Meta description (155-160 caracteres)
✓ Meta keywords
✓ Canonical URLs
✓ Hreflang tags (ES/EN)
✓ Robots meta (index, follow)
```

### ✅ **Open Graph (Redes Sociales)**
```astro
✓ og:type, og:url, og:title
✓ og:description, og:image
✓ og:locale (es_AR / en_US)
✓ og:site_name
✓ Image dimensions (1200x630)
```

### ✅ **Twitter Cards**
```astro
✓ twitter:card (summary_large_image)
✓ twitter:title, twitter:description
✓ twitter:image con alt text
```

### ✅ **Schema.org Structured Data**
```json
✓ Person schema (con jobTitle, skills, etc)
✓ WebSite schema
✓ Organization schema (employer)
✓ EducationalOrganization schema
```

### ✅ **Technical SEO**
```
✓ Sitemap XML multi-idioma
✓ robots.txt configurado
✓ Canonical tags
✓ Hreflang tags (ES ↔ EN)
✓ Mobile responsive
✓ HTTPS enabled
✓ Fast loading (Astro SSG)
✓ Semantic HTML (H1, sections, nav)
```

---

## 📊 Monitoreo y Análisis

### Google Analytics 4 (Opcional pero recomendado)

1. Crea cuenta en: https://analytics.google.com/
2. Crea propiedad para tu sitio
3. Obtén el ID de medición (G-XXXXXXXXXX)
4. Agrega en `src/layouts/Layout.astro` (antes de `</head>`):

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

### Alternativa: Plausible Analytics (Privacy-friendly)

```astro
<script defer data-domain="agusacevedo.com.ar" src="https://plausible.io/js/script.js"></script>
```

---

## 🎯 Optimizaciones de Contenido

### Keywords Detectadas en tu Portfolio:
```
- Cloud Engineer
- Platform Engineer
- DevOps
- AWS, Azure, Google Cloud
- Kubernetes, Docker
- Terraform, Ansible
- Python, Bash
- Grafana, Prometheus
- Buenos Aires, Argentina
```

### Tips para Mejor Ranking:

1. **Blog (Ya implementado con Dev.to)** ✅
   - Publica regularmente sobre temas técnicos
   - Usa las keywords mencionadas arriba
   - Comparte en LinkedIn (generas backlinks)

2. **LinkedIn Integration**
   - Agrega link a tu portfolio en tu perfil de LinkedIn
   - Publica posts mencionando proyectos de tu portfolio
   - Esto genera backlinks valiosos

3. **GitHub README**
   - En tu perfil de GitHub, agrega link al portfolio
   - En repos importantes, menciona el portfolio

4. **Proyectos con URLs**
   - Si tus proyectos están en GitHub, agrégalos al portfolio
   - Google valora sitios con muchos links externos de calidad

---

## 🚀 Performance SEO

### Core Web Vitals (Ya optimizados)
```
✓ LCP (Largest Contentful Paint) - Astro SSG
✓ FID (First Input Delay) - JavaScript mínimo
✓ CLS (Cumulative Layout Shift) - Diseño estático
✓ Mobile responsive
✓ Lazy loading de imágenes
✓ Webp format para imágenes
```

### Lighthouse Score Expected:
- Performance: 95-100
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 95-100

Verifica en: https://pagespeed.web.dev/

---

## ⏱️ Timeline de Indexación

### **Primeras 24-48 horas:**
- Google descubre tu sitio (si enviaste a Search Console)
- Crawling inicial

### **2-7 días:**
- Primera indexación
- Aparición en búsquedas de marca: "Agustin Acevedo"

### **2-4 semanas:**
- Indexación completa de todas las secciones
- Aparición en búsquedas genéricas: "cloud engineer buenos aires"

### **1-3 meses:**
- Ranking estabilizado
- Mejora progresiva según backlinks y contenido

---

## 🔗 Backlinks Strategy (Importante para SEO)

### 1. Perfiles Profesionales
```
✓ LinkedIn - Agrega URL en "Website"
✓ GitHub - Agrega en perfil y repos
□ Dev.to - Agrega en perfil
□ Twitter/X - Agrega en bio
□ Stack Overflow - Agrega en perfil
```

### 2. Comunidades Tech
- Publica en Dev.to y referencia tu portfolio
- Responde en Stack Overflow, agrega link si es relevante
- Participa en foros de DevOps/Cloud (Reddit r/devops, r/aws)

### 3. Directorios
- https://www.bestfolios.com/
- https://www.awwwards.com/
- https://github.com/emmabostian/developer-portfolios

---

## 📋 Checklist Final

Antes de considerar el SEO "completo", verifica:

- [ ] Google Search Console verificado
- [ ] Sitemap enviado a Google
- [ ] Sitemap enviado a Bing
- [ ] Indexación manual solicitada para ambas URLs (ES/EN)
- [ ] Schema.org validado sin errores
- [ ] Mobile-friendly test pasado
- [ ] Rich results test pasado
- [ ] Lighthouse score > 90 en SEO
- [ ] Links en LinkedIn y GitHub agregados
- [ ] Al menos 3 artículos publicados en Dev.to

---

## 🆘 Troubleshooting

### "Mi sitio no aparece después de 2 semanas"

1. Verifica en Search Console: "Cobertura" → revisa errores
2. Verifica que `robots.txt` permita indexación
3. Verifica que no haya `noindex` en meta tags
4. Solicita indexación manual de nuevo
5. Revisa que CNAME esté configurado correctamente

### "Aparezco en Google pero con descripción incorrecta"

- Google tarda en actualizar snippets (1-4 semanas)
- Fuerza re-crawl en Search Console
- Verifica que meta description esté bien escrita

### "No aparezco en búsquedas genéricas"

- Normal al principio (falta autoridad)
- Necesitas backlinks de calidad
- Publica contenido regularmente en Dev.to
- Comparte portfolio en LinkedIn

---

## 📚 Recursos Útiles

- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Schema.org Validator](https://validator.schema.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools) (Gratis, excelente)

---

## 🎉 Próximos Pasos INMEDIATOS

1. **HOY:**
   ```bash
   npm run build
   git add .
   git commit -m "feat: optimize SEO - fix URLs, add geo tags, improve metadata"
   git push
   ```

2. **HOY (después del deploy):**
   - Registra sitio en Google Search Console
   - Verifica propiedad
   - Envía sitemap

3. **ESTA SEMANA:**
   - Solicita indexación manual
   - Registra en Bing Webmaster Tools
   - Agrega links en LinkedIn/GitHub
   - Valida Schema.org

4. **PRÓXIMAS 2 SEMANAS:**
   - Publica 2-3 artículos en Dev.to sobre tus proyectos
   - Monitorea indexación en Search Console
   - Revisa errores en Coverage report

---

¿Dudas? Cualquier cosa pregunta! 🚀
