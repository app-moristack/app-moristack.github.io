# MoriStack

Marketing website for **MoriStack**, a freelance web development studio based in Mauritius.

A fully static React single-page application. There is no backend, no database and no
server-side code — it builds to plain files and deploys to GitHub Pages.

---

## Quick start

```bash
npm install
cp .env.example .env      # optional, for local overrides
npm run dev               # http://localhost:5173
```

## Commands

| Command                 | What it does                                            |
| ----------------------- | ------------------------------------------------------- |
| `npm run dev`           | Dev server with hot reload                              |
| `npm run build`         | Type check, production build to `dist/`, SPA `404.html` |
| `npm run preview`       | Serve the built `dist/` locally                         |
| `npm run lint`          | ESLint                                                  |
| `npm run lint:fix`      | ESLint with autofix                                     |
| `npm run typecheck`     | TypeScript, strict mode                                 |
| `npm run test`          | Vitest suite once                                       |
| `npm run test:watch`    | Vitest in watch mode                                    |
| `npm run test:coverage` | Vitest with a coverage report                           |
| `npm run format`        | Prettier write                                          |
| `npm run format:check`  | Prettier check                                          |
| `npm run validate`      | `lint` + `typecheck` + `test`                           |
| `npm run icons`         | Regenerate favicons and the OG image from the logo      |
| `npm run analyze`       | Build and write a bundle treemap to `dist/stats.html`   |

## Environment variables

Every variable is compiled into the public JavaScript bundle. **Only ever put public
values in a `VITE_*` variable** — anything here is visible to anyone who views the site.

| Variable                       | Required | Purpose                                                                                        |
| ------------------------------ | -------- | ---------------------------------------------------------------------------------------------- |
| `VITE_BASE_PATH`               | no       | Deployment base. `/` for a custom domain, `/<repo-name>/` for a project page. Defaults to `/`. |
| `VITE_SITE_URL`                | no       | Absolute origin used for canonical URLs and social share tags.                                 |
| `VITE_CONTACT_FORM_ACCESS_KEY` | no       | Web3Forms access key. Overrides the committed default; public by design.                       |
| `VITE_CONTACT_FORM_ENDPOINT`   | no       | Only to use another provider. Defaults to the Web3Forms endpoint.                              |
| `VITE_WHATSAPP_NUMBER`         | no       | Digits only, e.g. `2305xxxxxxx`. Enables WhatsApp links when set.                              |
| `VITE_PHONE`                   | no       | Public phone number, international format. Enables phone links when set.                       |

Copy `.env.example` to `.env` for local development. `.env` is gitignored — never commit it.

## Contact form (Web3Forms)

The site has no backend, so the quote form posts to [Web3Forms](https://web3forms.com):
free, 250 submissions/month, no credit card. An access key is already committed as the
default, so the form works out of the box.

**To use a different key** (for example after rotating it), get a new one by entering
your email at [web3forms.com](https://web3forms.com) and either put it in `.env` for
local work:

```
VITE_CONTACT_FORM_ACCESS_KEY=your-key-here
```

or add it as a **repository variable** for deploys: GitHub → Settings → Secrets and
variables → Actions → **Variables** → `VITE_CONTACT_FORM_ACCESS_KEY`. A variable, not
a secret — Web3Forms states the key is public and safe in client-side code, and every
`VITE_*` value ends up in the bundle regardless.

**To use another provider** (Formspree, FormSubmit, something self-hosted), set
`VITE_CONTACT_FORM_ENDPOINT` to its URL. `src/lib/formProvider.ts` detects the provider
from the URL and adapts the request; anything unrecognised is sent JSON and judged on
its status code.

### Two behaviours worth knowing about

Both are covered by tests in `src/lib/formProvider.test.ts`, because both cause silent
data loss if they regress:

- **Web3Forms answers HTTP 200 with `success: false`** when it rejects a submission, so
  a 2xx status is not proof of delivery. The response body is inspected as well.
- **Web3Forms does not answer a CORS preflight.** Its request must stay a "simple" one:
  `FormData` with no explicit `Content-Type`. Sending
  `Content-Type: application/json` triggers a preflight and the browser blocks the
  submission before it leaves the page.

### Why the form cannot be tested by automation

`api.web3forms.com` sits behind **Cloudflare bot protection**. Automated and headless
browsers get a `403` with a "Just a moment..." challenge page, and challenge pages carry
no CORS headers — so in the browser console it surfaces as a misleading
`No 'Access-Control-Allow-Origin' header` error rather than as the 403 it really is.

Real visitors in a real browser are unaffected. But it does mean the delivery path
cannot be covered by an end-to-end test: **verify the form by hand after changing it.**
Everything up to the network call is unit-tested; only the final hop is manual.

If genuine visitors ever report the same failure, switch provider by setting
`VITE_CONTACT_FORM_ENDPOINT` — [FormSubmit](https://formsubmit.co) needs no signup and
is not behind a challenge; the generic JSON path already supports it.

**If the form is not configured**, it validates normally and then tells the visitor
plainly that it is not connected, offering `moristack@gmail.com` instead. It never
pretends a submission succeeded.

Spam and abuse handling, all client-side:

- An off-screen honeypot field that real visitors never see.
- A minimum fill time — anything submitted in under 4 seconds is rejected.
- Duplicate-submission protection keyed on email, project type and message.

Client-side validation catches mistakes and reduces spam. It is **not** a security
control: anyone can post to the endpoint directly, so rely on the provider's own spam
filtering and never treat submitted content as trusted.

## Deploying to GitHub Pages

A workflow at `.github/workflows/deploy.yml` runs on every push to `main`. It installs
dependencies with `npm ci`, lints, type checks, tests, builds, checks the build output,
then deploys `dist/`. A failing lint, type error or test blocks the deploy.

**One-time setup:**

1. Create an empty repository on GitHub — do not add a README or `.gitignore`.
2. Add the remote and push:
   ```bash
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
3. Go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Add the form endpoint under **Settings → Secrets and variables → Actions →
   Variables** as `VITE_CONTACT_FORM_ACCESS_KEY` — optional, a working key is already
   committed (see the contact form section above).
5. Push to `main`, or run the workflow manually from the **Actions** tab.

The site then appears at `https://<user>.github.io/<repo>/`.

The base path comes from `actions/configure-pages`, which emits `/<repo>` for a project
page but `/` for a user page or custom domain. `normalizeBasePath()` in
`vite.config.ts` accepts either form, so the same workflow covers a project page, a
user page and a custom domain, and the repository name is never hard-coded. That
normaliser is covered by `src/lib/basePath.test.ts`, and the workflow's verify step
fails the build if a doubled slash ever reaches an asset URL.

Node's version is pinned in `.nvmrc` and read by both the workflow and `nvm use`, so
CI and local builds use the same runtime.

### Custom domain

1. In **Settings → Pages → Custom domain**, enter your domain and save. Tick
   **Enforce HTTPS** once the certificate is issued.
2. At your DNS provider:
   - **Apex domain** (`moristack.mu`) — four `A` records to `185.199.108.153`,
     `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - **Subdomain** (`www.moristack.mu`) — one `CNAME` to `<user>.github.io`.
3. Add a repository variable `VITE_SITE_URL` with the new origin, e.g.
   `https://moristack.mu`, so canonical and social URLs are correct.
4. Nothing else to edit — `robots.txt` and `sitemap.xml` are generated at build time
   from `VITE_SITE_URL` and the base path by `scripts/generate-seo-files.mjs`.

GitHub Pages writes a `CNAME` file into the branch when you save the custom domain.
Because this repo deploys via an artifact rather than a branch, add `public/CNAME`
containing just the domain if you want it preserved across deploys.

### Routing

Routing uses `HashRouter`, so URLs look like `/#/services`. GitHub Pages serves static
files only and cannot rewrite unknown paths, and hash routes are never sent to the
server — so refreshing any internal route works, and deep links cannot 404. The build
also copies `index.html` to `404.html`, so even a non-hash path such as
`/services` loads the app shell instead of GitHub's error page.

## Replacing the logo

The supplied logo lives at `public/brand/moristack-logo.png` (square PNG, 512px or
larger). To change it:

```bash
# replace public/brand/moristack-logo.png, then
npm run icons
```

That regenerates every derived asset — `favicon-32/192/512.png`,
`apple-touch-icon.png`, `logo-mark.webp`, `logo-mark.png` and the 1200×630
`og-image.png`. The script applies a circular alpha mask, because the supplied artwork
is a circular badge on an opaque square and the corners would otherwise show as black.

Every use of the mark in the UI goes through `src/components/ui/Logo.tsx`, so nothing
else needs editing.

## Central configuration

Business details live in exactly one place: **`src/data/site.config.ts`**. Name, email,
location, navigation, social links, response time and the form endpoint are all there.
Content lives in typed data files beside it:

- `src/data/services.ts` — the six services and their full page copy
- `src/data/projects.ts` — portfolio entries
- `src/data/content.ts` — benefits, process steps, technologies, about points

To add a portfolio project, add an entry to `projects.ts`. The filters, cards and
counts follow automatically.

## SEO limitations of a static SPA

Being honest about what a client-rendered site on GitHub Pages can and cannot do:

- **Per-route metadata is set with JavaScript.** `src/components/Seo.tsx` updates the
  title, description, canonical, Open Graph and Twitter tags on navigation. Google
  executes JavaScript and will see them. Many social scrapers (WhatsApp, and some
  Facebook and LinkedIn paths) do **not** — they read the raw HTML and will show the
  homepage title and image for every link.
- **Hash routes are not separate URLs to crawlers.** `/#/services` is a fragment of
  `/`, so it is generally not indexed as its own page. `sitemap.xml` lists the hash
  URLs for completeness, but do not expect independent rankings per route.
- **No server rendering**, so there is no HTML for a crawler that does not run scripts.

If per-route search and social previews become important, the fix is to prerender at
build time or move to a host that can rewrite paths to `index.html` (which also removes
the need for hash routing). Both are changes to the build and hosting, not to the
application code.

## Recommended security headers

GitHub Pages cannot set custom response headers. If the site later moves to a host that
can (Cloudflare Pages, Netlify, nginx), these are a good baseline:

```
Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; connect-src 'self' https://formspree.io; frame-ancestors 'none'; base-uri 'self'; object-src 'none'
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
X-Frame-Options: DENY
```

Note that `style-src 'unsafe-inline'` is required by Tailwind's runtime-injected styles
and inline `style` attributes used for logo sizing.

## Project structure

```
.github/workflows/deploy.yml   Build, validate and deploy to GitHub Pages
public/
  brand/                       Logo master plus generated icons and OG image
  site.webmanifest             robots.txt / sitemap.xml are generated into dist/
scripts/
  generate-icons.mjs           Derives all icons from the supplied logo
  spa-fallback.mjs             Copies index.html to 404.html after build
  generate-seo-files.mjs       Writes robots.txt and sitemap.xml for the deploy URL
src/
  components/
    contact/                   ContactForm, ContactFields, FormStatus
    home/                      Hero, ProblemsWeSolve, RestaurantShowcase,
                               DeviceMockup, WhyChooseUs, ProcessTimeline,
                               FeaturedWork, Technologies
    layout/                    Header, Footer, RootLayout
    three/                     HeroVisual (gating), HeroScene (lazy 3D)
    ui/                        Button, Section, Field, Logo, Reveal,
                               ServiceCard, ProjectCard, SocialIcon
    CallToAction.tsx  ErrorBoundary.tsx  Seo.tsx
  data/                        site.config.ts, services.ts, projects.ts, content.ts
  hooks/                       useReducedMotion
  lib/                         cn, contactSchema, submitContact, formFields
  pages/                       Home, Services, Work, About, Contact, Privacy, NotFound
  styles/theme.css             Tailwind v4 theme tokens from the logo palette
  test/                        Vitest setup and render helpers
  App.tsx  main.tsx
```

## Performance notes

- Every route is lazy-loaded, so the first paint only ships the homepage.
- The Three.js hero is dynamically imported **after idle**, and only on devices that
  pass a capability check (viewport above 767px, more than 4 CPU cores, no
  `save-data`, working WebGL). Everywhere else a pure-CSS fallback is shown and
  three.js is never downloaded.
- The scene pauses when the browser tab is hidden and stops animating under
  `prefers-reduced-motion`.
- Vendor code is split into `react`, `router`, `motion`, `forms` and `three` chunks.
- `npm run analyze` writes a bundle treemap to `dist/stats.html`. It is deliberately
  opt-in: the treemap is around 1MB and must never be published with the site.

## Known limitations

- **Social share previews per route** — see the SEO section above.
- **No CMS.** Content changes mean editing a typed data file and redeploying. This is
  deliberate: it keeps the site static, free to host and impossible to break at runtime.
- **Portfolio entries are concepts.** Every project in `projects.ts` is marked
  `Concept`. No client names, testimonials or business results are claimed anywhere.
- **Project screenshots are placeholders.** Cards show a "Screenshot coming soon"
  state until real images are added to `public/` and referenced from `projects.ts`.
- **No response headers** on GitHub Pages, as noted above.
- **Form delivery depends on Web3Forms**, a third party. Their free tier has a monthly
  submission limit, and submissions pass through their systems — which is why the
  privacy policy says so explicitly.

## Remaining TODOs

All are marked with `TODO` in `src/data/site.config.ts`:

- [x] Contact form connected to Web3Forms with a committed access key (250 submissions/month).
- [ ] Add real social media URLs (currently `null`, so the links are hidden rather than broken).
- [ ] Add `VITE_PHONE` and `VITE_WHATSAPP_NUMBER` if you want phone and WhatsApp links.
- [ ] Set `VITE_SITE_URL` once the domain is decided — robots and sitemap follow it automatically.
- [ ] Add real project screenshots and promote any real client work from `Concept` to `Client Project`.
