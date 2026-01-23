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
      sitemap: 'https://agustinacevedo.me/sitemap-index.xml',
    }),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-AR',
          en: 'en-US',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://agustinacevedo.me/',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false
    }
  }
})
