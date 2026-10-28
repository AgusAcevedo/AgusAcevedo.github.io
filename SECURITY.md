# Security and maintenance

This portfolio is a static Astro site deployed to GitHub Pages behind Cloudflare.
There is no application server, database, login, session, form submission, or
browser-side API request. Security depends on the generated HTML/assets, build
supply chain, GitHub account, and hosting configuration.

## Protections implemented in the repository

- Astro generates a Content Security Policy in both localized HTML pages. Scripts
  and stylesheets are limited to this origin and build-generated hashes. Inline
  event handlers, unapproved inline scripts, eval, browser network requests,
  frames, objects, form submissions, and base URL injection are blocked.
- `style-src-attr 'unsafe-inline'` is deliberately scoped to style attributes used
  for carousel transforms and theme state. It does not allow arbitrary script or
  stylesheet elements. Removing this exception requires changing those UI APIs.
- Fonts, the profile picture, certificates, project images, and issuer icons are
  local. Blog images are restricted to three explicit HTTPS image hosts and use
  `referrerpolicy="no-referrer"`. The document uses a strict referrer policy.
- The Dev.to feed is fetched once during a build with an eight-second timeout,
  a 512 KiB response limit, redirect rejection, schema/length checks, and HTTPS
  host allowlists. API strings are escaped by Astro. A validated public snapshot
  keeps the blog available during network/API failures. Articles refresh on builds.
- Translation emphasis and project descriptions are rendered as escaped values,
  not injected with `innerHTML`. JSON-LD escapes `<` to prevent script-tag breakout.
- Native dialogs, keyboard controls, reduced-motion handling, and explicit focus
  containment are covered by regression tests. Content and contact links remain
  available when JavaScript is disabled; interactive enhancements require JavaScript.
- Dependencies and the pnpm version are pinned; the lockfile is committed. CI uses
  Node from `.node-version`, audits all dependencies, builds both languages, and
  tests Chromium desktop/mobile, Firefox, and WebKit before deployment.
- Actions are pinned to verified full commit SHAs. The build has read-only token
  permissions and no persisted Git credentials. Only the deployment job on `main`
  receives `pages:write` and `id-token:write`. Pull requests do not deploy.
- Dependabot proposes weekly npm and Actions updates for review; it does not merge
  or deploy them automatically. TypeScript 7 is temporarily excluded because the
  latest stable `@astrojs/check` requires the TypeScript 5/6 API. TypeScript 6.0.3
  is the current supported stable choice; remove the exclusion when support lands.

The pnpm 12 lockfile is supported by Dependabot version updates. At the time of
this migration, GitHub dependency-graph detection and Dependabot security updates
do not fully support that lockfile format. The independent CI `pnpm audit` gate
therefore checks the complete lockfile and must remain enabled.

## Hosting settings pending in Cloudflare

GitHub Pages **does not apply `public/_headers`**. That file is a portable template
for hosts supporting it; it is not evidence of active HTTP protections on Pages.
The owner chose to defer Cloudflare changes during this implementation.

For the proxied `agusacevedo.com.ar` hostname, prepare these Response Header
Transform Rules (without replacing the Astro CSP):

| Header | Value |
| --- | --- |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=(), payment=(), usb=()` |
| `Content-Security-Policy` | `frame-ancestors 'none'` |

The frame-ancestors header is enforced alongside the document's full CSP meta
policy. Browsers do not enforce frame-ancestors from a meta element.

The observed HTTPS response has `Strict-Transport-Security: max-age=0`. After
confirming Cloudflare-to-origin **Full (strict)** TLS and HTTPS availability,
enable HSTS for the apex hostname. Start with `max-age=2592000` (30 days), then
increase after verifying the site and certificate renewal. Do not enable
`includeSubDomains` or preload without reviewing every affected subdomain.
Keep HTTP-to-HTTPS redirection. Do not weaken origin TLS validation.

Use long immutable caching only for fingerprinted `/_astro/*` assets. The CV,
`theme-init.js`, public images, and other stable filenames must remain refreshable.
Do not apply a year-long immutable policy to all PNG/WebP/JS files indiscriminately.

Verify final response headers with `curl -I https://agusacevedo.com.ar/` after
applying hosting settings. These changes require a separate authenticated
Cloudflare session; they are not activated by merging this PR.

## Verification and limits

Run with the supported Node version:

```sh
pnpm install --frozen-lockfile
pnpm audit --audit-level=low
pnpm exec playwright install --with-deps chromium firefox webkit
pnpm validate
```

The migration refreshed compatible transitive dependencies and removed the 16
reported toolchain advisories; the resulting audit reported zero advisories at
the time of validation. This is a point-in-time registry check, not proof that no
unknown vulnerabilities exist. A pattern scan of the full 56-commit text history
and current source found no credential-pattern matches; binary files and secrets
that do not match those patterns were outside that scan.

Automated accessibility checks supplement manual interaction tests and do not
constitute a complete WCAG certification or assistive-technology audit. Account
MFA, recovery methods, GitHub branch protection, Cloudflare WAF/TLS rules, and
hosting-only response headers must be reviewed in their authenticated dashboards.
