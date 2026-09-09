# Liang Art Studio — Astro + Sanity revamp

A flexible website and CMS for Liang Art Studio. The frontend is intentionally separate from the content model so the visual design can be changed later without re-importing student work.

## Stack

- Astro static frontend
- Sanity Studio embedded at `/admin`
- Sanity Content Lake + image CDN
- Cloudflare Pages-ready
- Demo content automatically used until a Sanity project ID is configured

## Run locally immediately

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Content model

- **Student Work:** image/thumbnail, optional animation URL, student, program, category, medium, dates, class, description, awards, homepage feature flag
- **Student:** public display name + publication permission
- **Program:** Studio Art, Animation, Spanish, or future programs; instructor, approved copy, ordering, primary-program flag
- **Instructor:** name, optional public bio/photo
- **Tuition:** separate current/archived rate sheets per program and term
- **Site Settings:** approved homepage/gallery/About/contact copy, Yolanda Liang photo, WeChat QR, contact details

The frontend only publishes work whose linked student has `Permission to Publish = true`.

See `docs/FLEXIBILITY.md` for the design/content separation.

## Connect Sanity

1. Create/sign into Sanity and create a project with a public `production` dataset.
2. Copy `.env.example` to `.env`.
3. Add the project ID to the environment variables.
4. Add local and production origins to Sanity CORS.
5. Restart `npm run dev` and open `/admin`.

With a Sanity write token available, seed the studio/program structure:

```bash
SANITY_AUTH_TOKEN=your_token npm run seed:content
```

The seed preserves approved copy from the original site. Animation/Spanish placeholder descriptions are explicitly marked `[Draft]`.

See `docs/SETUP.md` for the full workflow.

## Existing site migration

Put the old site under `legacy/` so the old `index.html` is `legacy/index.html` and images are under `legacy/images/`. Run `seed:content` first so the Studio Art program exists, then:

```bash
SANITY_AUTH_TOKEN=your_token npm run migrate:legacy
```

The script uploads each legacy gallery image and creates a **draft Studio Art work record** flagged for metadata review. It does not publish anything automatically.

## Build

```bash
npm run build
```

Output: `dist/`
