# Mantenimiento SEO del portfolio

Esta guía describe lo que genera el código y cómo revisarlo. La verificación de
propiedad, los envíos de sitemap y el estado de indexación se comprueban en las
cuentas correspondientes; no se deducen de los archivos del repositorio.

## Implementación actual

| Elemento | Fuente |
| --- | --- |
| Rutas en español `/` e inglés `/en/` | `src/pages/`, i18n de `astro.config.mjs` |
| Título y descripción por idioma | `src/i18n/translations/es.ts` y `en.ts`; `Layout.astro` y `SEO.astro` |
| Canonical de cada ruta y alternates `es-AR`, `en-US`, `x-default` | `src/components/SEO.astro` |
| Open Graph y Twitter Cards | `SEO.astro`; textos `seo.ogTitle` y `seo.ogDescription`, imagen `personal.ogImage` |
| JSON-LD `Person`, `WebSite` y `ProfilePage` | `SEO.astro`; `Organization` aparece dentro de `Person.worksFor` |
| Sitemap generado al compilar | `@astrojs/sitemap` en `astro.config.mjs` |
| Permiso de rastreo y referencia al sitemap | `public/robots.txt` |
| Meta tag de verificación de Search Console | `SEO.astro` |

Las URLs públicas actuales son `https://agusacevedo.com.ar/` y
`https://agusacevedo.com.ar/en/`. El índice del sitemap está en
`https://agusacevedo.com.ar/sitemap-index.xml`.

El campo `seo.keywords` existe en las traducciones, pero el componente actual no
lo publica como meta tag. No se generan metadatos de geolocalización ni un schema
`EducationalOrganization`.

## Cambiar contenido, dominio o idiomas

- Escribe títulos y descripciones claros que correspondan al contenido visible.
  Actualiza ambos archivos de traducciones cuando cambie el perfil.
- Revisa `personal.ogImage` en ambos idiomas; el valor actual es `/og.jpg`. Al
  sustituir la imagen, comprueba también su tipo y dimensiones declaradas en
  `SEO.astro`.
- Al cambiar de dominio, actualiza `site` en `astro.config.mjs`,
  `personal.siteUrl` en ambos idiomas, `public/CNAME` y la referencia de sitemap
  en `public/robots.txt`. Revisa también enlaces absolutos y redirecciones del
  hosting para evitar señales inconsistentes.
- Al añadir una ruta o idioma, actualiza las páginas, los alternates de
  `SEO.astro` y la configuración del sitemap. Cada versión debe referenciarse a
  sí misma y a las otras versiones con URLs completas, según la [guía de
  versiones localizadas de Google](https://developers.google.com/search/docs/specialty/international/localized-versions).
- Conserva el canonical correspondiente a cada versión traducida. Evita que la
  página inglesa apunte como canonical a la española; consulta las [reglas de
  canonicalización](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## Revisar después de un cambio

1. Ejecuta `pnpm build`, `pnpm test` y `pnpm test:e2e` con las versiones de Node y
   pnpm indicadas en el repositorio.
2. Inspecciona `dist/index.html` y `dist/en/index.html`: un título, descripción,
   canonical propio, alternates recíprocos y JSON-LD coherente con el perfil.
   Confirma que el contenido principal y los enlaces existen sin JavaScript.
3. Revisa `dist/sitemap-index.xml` y los sitemaps que referencia. Las URLs deben
   corresponder al dominio y las rutas publicadas. `robots.txt` debe permitir
   las páginas que quieras que se rastreen.
4. Tras publicar, abre ambas URLs, `robots.txt`, el sitemap y la imagen social.
   Comprueba las respuestas del hosting y las redirecciones, además del HTML.
5. Usa [Schema Markup Validator](https://validator.schema.org/) para revisar
   JSON-LD y [Rich Results Test](https://search.google.com/test/rich-results) para
   las funciones de Google compatibles. Un schema válido no implica que se
   mostrará un resultado enriquecido.
6. Mide las URLs publicadas con [PageSpeed Insights](https://pagespeed.web.dev/).
   Guarda la fecha, dispositivo y resultados observados para comparar cambios;
   el framework por sí solo no establece una puntuación de rendimiento.

## Search Console e indexación

En [Google Search Console](https://search.google.com/search-console), comprueba
que tienes acceso a la propiedad correcta y que la verificación elegida está
vigente. El meta tag presente en el código no confirma el estado del panel.

Envía `https://agusacevedo.com.ar/sitemap-index.xml` en el informe de sitemaps y
revisa los errores que comunique. Google explica que [enviar un sitemap es una
señal, no una garantía de rastreo](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

Usa [Inspección de URLs](https://support.google.com/webmasters/answer/9012289)
para consultar cada versión, ver el canonical elegido por Google y probar la
URL publicada. Cuando sea necesario, puedes solicitar un nuevo rastreo desde
esa herramienta. La [solicitud de indexación](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
no garantiza inclusión ni una fecha de aparición en los resultados.

Si una página no aparece, empieza por las razones del informe: acceso HTTP,
redirecciones, bloqueo de rastreo, `noindex`, canonical y contenido publicado.
Registra qué cambio hiciste y verifica su efecto; evita plazos o posiciones
prometidas.

## Analítica y hosting

La analítica es una decisión separada de Search Console. No pegues scripts de
Google Analytics, Plausible u otro proveedor sin revisar la integración: la CSP
actual restringe scripts y bloquea las conexiones del navegador con
`connect-src 'none'`. Deben decidirse los proveedores, datos recogidos, permisos
de CSP y ajustes del hosting antes de habilitarlos.

[SECURITY.md](SECURITY.md) documenta la CSP y las inyecciones de Cloudflare, así
como las cabeceras que requieren configuración en el hosting. GitHub Pages no
aplica `public/_headers`; ese archivo se conserva como plantilla para hosts
compatibles.
