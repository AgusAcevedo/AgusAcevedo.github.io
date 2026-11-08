# Internacionalización (i18n)

El portfolio genera dos páginas estáticas: `/` en español y `/en/` en inglés.
Astro determina el idioma a partir de la ruta durante la compilación. El idioma
no se obtiene de `localStorage`, de `navigator.language` ni de una redirección
automática del navegador.

## Archivos y responsabilidades

| Archivo | Función |
| --- | --- |
| `languages.ts` | Define los códigos admitidos, sus nombres y el idioma predeterminado (`es`). |
| `index.ts` | Exporta los diccionarios y `useTranslations(lang)`, con español como valor predeterminado. |
| `translations/es.ts` | Contenido y estructura de referencia. Exporta el tipo `Translations`. |
| `translations/en.ts` | Contenido en inglés, validado con `satisfies Translations`. |
| `../pages/index.astro`, `../pages/en/index.astro` | Componen las dos páginas. |
| `../components/LanguageToggle.astro` | Selector de idioma con enlaces nativos en la cabecera. |
| `../../astro.config.mjs` | Configura las rutas, el idioma predeterminado y los idiomas del sitemap. |

## Usar traducciones en un componente Astro

```astro
---
import { useTranslations } from '../i18n';
import type { Language } from '../i18n/languages';

const currentLocale = (Astro.currentLocale || 'es') as Language;
const t = useTranslations(currentLocale);
---

<h2>{t.experience.title}</h2>
```

Importa los módulos con la ruta relativa que corresponda al componente. No
consultes `window` en el frontmatter: se ejecuta durante la generación de la
página. `useTranslations()` sin argumento devuelve español; para una sección
compartida por ambas páginas, pasa el idioma de `Astro.currentLocale`.

El layout publica `lang="es-AR"` o `lang="en-US"` en el elemento `html`.
Cuando un script del navegador necesita distinguir el idioma de la página,
puede leer `document.documentElement.lang` o recibir etiquetas traducidas
mediante atributos `data-*`, como hacen los componentes existentes. No hay un
estado de idioma independiente de la ruta que deba sincronizarse.

## Selector de idioma

`Header.astro` incluye el selector en sus controles de escritorio y móvil. El
botón abre una lista de enlaces a `/` y `/en/`; el enlace activo usa
`aria-current="page"` y cada opción indica `lang` y `hreflang`.

El cambio de idioma navega a la otra página mediante un enlace normal. El
JavaScript del selector controla su apertura y el teclado; no reemplaza las
rutas ni vuelve a traducir el DOM. La preferencia de tema es independiente y
sí utiliza `localStorage`; no debe confundirse con el idioma.

## Añadir o modificar contenido

1. Edita la clave en `translations/es.ts`.
2. Añade la misma estructura con el texto en inglés en `translations/en.ts`.
3. Mantén los identificadores de los datos compartidos; traduce las etiquetas y
   el contenido que vea el visitante.
4. Ejecuta `pnpm build` para comprobar tipos y generar ambas páginas. Usa
   `pnpm test:e2e` sobre ese build para comprobar navegación y comportamiento.

El tipado detecta diferencias de estructura; no comprueba la calidad de una
traducción. Revisa visualmente las dos rutas, incluidos los textos largos y las
vistas móviles.

## Añadir otro idioma

La implementación actual está preparada para dos idiomas. Añadir un tercero
requiere revisar todos los puntos donde se enumeran, no sólo crear un archivo:

1. Registra el código en `languages.ts`, crea su diccionario y expórtalo desde
   `index.ts`.
2. Actualiza `astro.config.mjs`, tanto `i18n` como la configuración del sitemap.
3. Crea la página de la nueva ruta y adapta sus anchors y enlaces.
4. Añade el idioma y su destino a `LanguageToggle.astro` y revisa `Header.astro`.
5. Amplía la selección de idioma del HTML en `Layout.astro`, los alternates y
   locales sociales de `SEO.astro`, las fechas y los componentes que usan una
   condición de dos idiomas.
6. Amplía las pruebas de rutas, metadatos, selector, descargas y contenido sin
   JavaScript.

Las URLs canónicas y los alternates se construyen en `SEO.astro`; para su
mantenimiento, consulta también [la guía SEO](../../SEO_GUIDE.md).
