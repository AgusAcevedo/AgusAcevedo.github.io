import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import robotsTxt from "astro-robots-txt"
import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  integrations: [
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
      sitemap: 'https://agusacevedo.com.ar/sitemap-index.xml',
    }),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-AR',
          en: 'en-US',
        },
      },
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://agusacevedo.com.ar/',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false
    }
  }
})
