# v10 notes

## Visual direction

v10 moves away from the very restrained gallery look toward a creative-studio identity that still feels credible to parents and adult learners. It uses a warm neutral base, Fraunces display type, Manrope UI/body type, and a restrained palette of coral, gold, mint, indigo and violet. Color is used as an accent and wayfinding device rather than as a childish theme.

Program cards now get subtle program-specific color identities while remaining part of one Liang Art Studio brand. Student work remains visually dominant. Awards retain their gold recognition treatment.

## Embedded Studio

`sanity.config.ts` no longer declares its own `/admin` basePath. The current `@sanity/astro` integration owns the embedded Studio mount via `studioBasePath: '/admin'` in `astro.config.mjs`.

After migration or any terminal script, start/restart the local Astro server with `npm run dev`, then open the exact local URL printed by Astro and append `/admin`. Migration commands modify Sanity data only; they do not start a web server or deploy the new site.
