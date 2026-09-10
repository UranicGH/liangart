# Liang Art Studio — Astro + Sanity revamp (v9)

A flexible website and CMS for Liang Art Studio. Content semantics live in Sanity; visual presentation lives in Astro/CSS, so the gallery can be redesigned later without re-importing the artwork database.

## Stack

- Astro static frontend
- Sanity Studio embedded at `/admin`
- Sanity Content Lake + image CDN
- Cloudflare Pages-ready
- Local demo fallback before Sanity is configured

## Run locally

```bash
nvm use
npm install
npm run dev
```

Open `http://localhost:4321` for the public site and `http://localhost:4321/admin` for Sanity Studio.

## Content model

- **Student Work:** main artwork/thumbnail, optional animation URL, student, program, instructor(s), reusable category, medium/technique, completion date/year, optional public age/grade at completion, dimensions, approved description, optional artist statement, supporting student/process images, awards, homepage feature flag
- **Student:** public display name, artwork/name permission, optional public portrait with separate permission, status, optional studio start year
- **Student Work Category:** reusable categories administrators can add without code; prevents spelling variants from breaking gallery filters
- **Competition / Award Program:** reusable competition records for consistent award names, URLs, organizers and aggregation
- **Award:** placement, competition reference, division/category, level, date/year, result URL, primary certificate/award image, additional recognition media, and an explicit gallery-feature choice
- **Program:** Studio Art, Animation, Spanish, or future programs; instructor(s), approved copy, typical age range, schedule summary, enrollment status, registration note, ordering, primary-program flag
- **Instructor:** name, display order, optional approved biography/photo, credentials, teaching specialties
- **Tuition:** separate current/archived rate sheets per program and term
- **FAQ:** approved parent-facing questions/answers
- **Testimonial:** approved quotes with publication permission
- **Site Settings:** approved site copy, studio photo, WeChat QR, contact details, registration/maps links, hours, service areas, and optional SEO/share fields

Public student portraits, per-work supporting photos, age, grade and award images have explicit public-display controls.

See `docs/FLEXIBILITY.md`, `docs/V9-NOTES.md`, `docs/MIGRATION.md`, `docs/ADMIN-GUIDE.md`, and `docs/DATA-SAFETY.md`.

## Connect Sanity

1. Create/sign into Sanity and create a project with a public `production` dataset.
2. Copy `.env.example` to `.env`.
3. Add the real Sanity project ID to both project-ID variables.
4. Run `npx sanity login` once.
5. Restart `npm run dev` and open `/admin`.
6. Add local and production origins to Sanity CORS before deployment.

Seed or safely update the core studio/program structure:

```bash
npm run seed:content
```

## Optional demo Student Work

Core seeding intentionally does not create fake students or artwork. To evaluate the real CMS/gallery behavior:

```bash
npm run seed:demo
```

The demo creates published records clearly labeled `[Demo]`, including Studio Art, Animation, ages, reusable categories/competitions, awards, a student portrait, a certificate image, and an animation video link.

To reset the demo after updating versions:

```bash
npm run remove:demo
npm run seed:demo
```

To remove demo content when finished:

```bash
npm run remove:demo
```

The cleanup targets explicit demo IDs only.

## Existing site migration

Put the old site under `legacy/` so its HTML is `legacy/index.html` and its artwork files are in `legacy/images/`. Then run:

```bash
npm run migrate:legacy
```

Run `npm run migrate:legacy:check` first for a no-write file audit. Each legacy image is then uploaded into a **draft Studio Art work record**. Student, reusable category, title, age, awards and other metadata remain for administrator review before publication.

## Gallery interaction

When approved media exists, gallery cards show a student portrait at the bottom-left and a larger certificate/award image at the bottom-right. Certificate previews preserve the uploaded image's natural aspect ratio rather than forcing every certificate into the same shape.

On pointer/desktop devices, hovering the visual cluster gently enlarges the artwork while fading the supporting recognition media. On mobile, tapping a normal artwork opens the full artwork detail viewer, which provides the clearest useful form of enlargement on a touch interface.

## Build

```bash
npm run build
```

Output: `dist/`


## v10 visual refresh

v10 adds a more colorful creative-studio visual system while preserving the art-first gallery. It also aligns the embedded Studio configuration with the current `@sanity/astro` routing model. After running migration scripts, use `npm run dev` to serve both the public site and the embedded Studio locally; `/admin` exists on that local Astro server and, later, on the deployed revamp.
