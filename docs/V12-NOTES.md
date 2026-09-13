# v12 — Simpler CMS + mobile gutter cleanup

## Yolanda's normal workflow

The main Studio navigation is now intentionally short:

1. **Student Work** — upload/publish student work.
2. **Students** — create a student name and optional portrait once, then reuse it.
3. **Tuition** — maintain current tuition.
4. **Studio Setup** — less-frequent website setup (programs, instructors, categories, competitions, FAQs, website information).

## What was removed from the everyday workflow

The website no longer requires separate permission/show switches for student names, portraits, ages, grades, process photos, certificates, program visibility, categories, or FAQs. If a field is populated in a **published** document, it is treated as intended for the public site.

The only remaining artwork display switch is **Featured on Homepage**, because that is a real editorial choice.

Old permission/show fields already stored in Sanity are harmless. v12 simply ignores them, so no migration is required.

## Student Work minimum

Only the following are required for a new work:

- artwork image
- student

The title can be blank (the site displays `Untitled`). Studio Art is the default program. Category, age, grade, medium, dates, awards, photos, certificate, dimensions, artist statement and animation URL are optional and can be filled in later.

## Mobile layout

v12 uses a single responsive site gutter for the homepage Student Gallery, Tuition, faculty, header and footer. This replaces section-specific padding overrides that could leave full-width sections visually flush against the viewport.
