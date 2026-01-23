# Sistema de Internacionalización (i18n)

Este proyecto usa un sistema de i18n simple basado en TypeScript para manejar traducciones.

## Estructura

```
src/i18n/
├── languages.ts           # Definición de idiomas soportados
├── index.ts              # Funciones helper para usar traducciones
└── translations/
    ├── es.ts            # Traducciones en español
    └── en.ts            # Traducciones en inglés
```

## Cómo usar en un componente Astro

```astro
---
import { useTranslations } from '../i18n';

// Obtener traducciones (por defecto usa español)
const t = useTranslations();

// O especificar idioma
const t = useTranslations('en');
---

<h1>{t.hero.greeting}</h1>
<p>{t.hero.description}</p>
```

## Cómo usar con estado del navegador

El componente `LanguageToggle` guarda el idioma en `localStorage` y detecta automáticamente el idioma del navegador.

Para usar el idioma guardado en tus componentes:

```astro
---
import { useTranslations } from '../i18n';

// En el frontmatter del componente
const lang = typeof window !== 'undefined' 
  ? (localStorage.getItem('language') || 'es')
  : 'es';

const t = useTranslations(lang as 'es' | 'en');
---
```

## Para componentes con JavaScript

```javascript
// Obtener idioma actual
const currentLang = localStorage.getItem('language') || 'es';

// Importar traducciones
import { translations } from './i18n';
const t = translations[currentLang];

console.log(t.hero.greeting); // "Hola, soy" o "Hi, I'm"
```

## Agregar nuevas traducciones

1. Agregar el texto en `src/i18n/translations/es.ts`
2. Agregar la traducción en `src/i18n/translations/en.ts`
3. TypeScript te avisará si falta alguna traducción

Ejemplo:

```typescript
// es.ts
export const es = {
  // ... existing translations
  newSection: {
    title: 'Nuevo título',
    description: 'Nueva descripción',
  },
}

// en.ts
export const en: Translations = {
  // ... existing translations
  newSection: {
    title: 'New title',
    description: 'New description',
  },
}
```

## Botón de cambio de idioma

El componente `LanguageToggle` está incluido en el Layout y aparece como un botón flotante en la esquina inferior derecha.

- Click para cambiar entre ES/EN
- Guarda la preferencia en localStorage
- Detecta automáticamente el idioma del navegador la primera vez

## Próximos pasos

Para implementar completamente el i18n en todos los componentes:

1. Actualizar cada componente para usar `useTranslations()`
2. Reemplazar textos hardcodeados con referencias a las traducciones
3. Considerar usar rutas con prefijo de idioma (`/es/`, `/en/`) para mejor SEO

### Ejemplo de migración de un componente:

**Antes:**
```astro
<h2>Experiencia laboral</h2>
```

**Después:**
```astro
---
import { useTranslations } from '../i18n';
const t = useTranslations();
---

<h2>{t.experience.title}</h2>
```
