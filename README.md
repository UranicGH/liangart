## v13 gallery behavior

- The four lead artworks on the homepage are selected randomly from all published student work on each page load. There is no auto-advancing timer, so the page remains calm while still feeling fresh on return visits and refreshes.
- The full Student Gallery defaults to **Most recent**, using completion date first, completion year second, and Sanity creation date only as a fallback.
- Visitors can also sort the gallery by **Oldest** or **Student A–Z**. Award status and age remain filters rather than duplicate sort options.

# Liang Art Studio — Astro + Sanity revamp (v12)

A flexible website and straightforward CMS for Liang Art Studio. Content lives in Sanity; visual presentation lives in Astro/CSS, so the site can keep changing without re-importing student work.

## Stack

- Astro static frontend
- Sanity Studio as the browser-based CMS
- Sanity Content Lake + image CDN
- Cloudflare Worker static deployment
- Sanity → Cloudflare deploy hook for content-triggered rebuilds

## Run locally

```bash
nvm use
npm install
npm run dev
```

Public site: `http://localhost:4321`

CMS:

```bash
npm run cms:dev
```

Sanity Studio normally opens at `http://localhost:3333`.

## Simple CMS workflow

Yolanda's normal Studio navigation is intentionally short:

- **Student Work** — upload/publish artwork or animation thumbnails
- **Students** — student display name + optional portrait
- **Tuition** — current tuition sheets
- **Studio Setup** — programs, instructors, categories, competitions, FAQs and website information

If a published field is filled in, the site treats it as intended to be public. v12 removes the separate permission/show checkboxes for student names, portraits, ages, grades, certificates, process photos, programs, categories and FAQs.

The one artwork display toggle that remains is **Featured on Homepage**.

### Student Work fields

Only two fields are required:

- artwork image
- student

Everything else can be added later:

- title (blank becomes `Untitled`)
- program (defaults to Studio Art)
- category
- age / grade when the work was completed
- medium / technique
- completion date or year
- instructor(s)
- dimensions
- description / artist statement
- student/process photos
- awards and certificate images
- animation/video URL
- homepage feature toggle

Published records can be edited at any time, so incomplete metadata is fine.

## Connect Sanity

1. Copy `.env.example` to `.env`.
2. Add the real Sanity project ID/dataset.
3. Run `npx sanity login` once.
4. Run `npm run cms:dev` locally.
5. Run `npx sanity@latest deploy --url <studio-hostname> --title "Liang Art Studio"` to host the GUI.
6. Set `PUBLIC_SANITY_STUDIO_URL` locally and in Cloudflare so `/admin` redirects to the hosted Studio.

Core studio records can be safely seeded/updated with:

```bash
npm run seed:content
```

## Existing gallery migration

The legacy importer creates draft Studio Art records and uploads the old gallery images. Existing migrated records do **not** need to be re-imported for v12; old permission/show fields are simply ignored.

See `docs/MIGRATION.md` and `docs/ADMIN-GUIDE.md`.

## Build / deployment

```bash
npm run build
```

Output: `dist/`.

Cloudflare deployment configuration is stored in `wrangler.jsonc`. The public site is static, so Sanity publishing should trigger a Cloudflare rebuild through a Deploy Hook/webhook pair.

## Mobile layout

v12 uses one shared responsive gutter across the header, homepage Student Gallery, homepage Tuition, faculty section and footer. Full-width colored/background sections keep their visual treatment while their contents remain inset and centered on phones.
