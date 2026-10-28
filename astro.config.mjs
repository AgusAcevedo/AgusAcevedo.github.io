import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from "@astrojs/sitemap"
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

// Astro does not auto-hash dynamic set:html scripts. Hash the same trusted source
// imported by Layout so the early theme script stays permitted without unsafe-inline.
const themeInitHash = `sha256-${createHash('sha256')
  .update(readFileSync(new URL('./public/theme-init.js', import.meta.url)))
  .digest('base64')}`

// https://astro.build/config
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  markdown: { syntaxHighlight: false },
  build: { inlineStylesheets: 'never' },
  security: {
    csp: {
      directives: [
        "default-src 'none'",
        "base-uri 'none'",
        "object-src 'none'",
        "form-action 'none'",
        "frame-src 'none'",
        "connect-src 'none'",
        "font-src 'self'",
        "manifest-src 'self'",
        "img-src 'self' https://media2.dev.to https://media.dev.to https://dev-to-uploads.s3.amazonaws.com",
      ],
      scriptDirective: {
        hashes: [{ hash: themeInitHash, kind: 'element' }],
        resources: [{ resource: "'self'", kind: 'element' }, { resource: "'none'", kind: 'attribute' }],
      },
      styleDirective: {
        resources: [{ resource: "'self'", kind: 'element' }, { resource: "'unsafe-inline'", kind: 'attribute' }],
      },
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-AR',
          en: 'en-US',
        },
      },
      filter: (page) => !page.endsWith('/404/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: { host: '127.0.0.1', cors: false, fs: { strict: true } },
    build: { sourcemap: false },
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
