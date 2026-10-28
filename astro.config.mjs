import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from "@astrojs/sitemap"

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
