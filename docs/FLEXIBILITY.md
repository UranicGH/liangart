# Keeping the site easy to redesign later

The CMS stores **meaning**, not layout.

Examples:

- Artwork stores the image, student, program, category, awards, dates, and other factual metadata.
- Programs store the program name, instructor, approved copy, and ordering.
- Tuition stores rate sheets and prices.
- Site Settings stores approved studio copy and contact information.

None of those records say things like “put this on the left,” “make this a large card,” or “use this color.” Those decisions live only in Astro components and CSS.

This means importing hundreds or thousands of artworks does **not** make a later visual redesign materially harder. A redesigned `ArtworkCard.astro`, gallery layout, homepage, or stylesheet can immediately render the same Sanity records in a different design.

## Presentation fields kept intentionally small

A few presentation-neutral editorial controls are useful:

- `featured`
- `displayOrder`
- `primaryProgram`
- `showOnWebsite`

These describe editorial importance, not a specific visual layout.

## Programs

The studio is modeled as one organization with multiple programs:

- Studio Art — primary program
- Animation — Paula Pelet Cruz
- Spanish — Paula Pelet Cruz

Studio Art can receive more homepage space today through `primaryProgram`, while Animation and Spanish remain fully modeled and can grow without a schema rewrite. Changing which program is primary later is a CMS edit, not a code migration.

## Copy rule

The starter follows this rule:

1. Reuse approved copy from the original Liang Art Studio site where it exists.
2. Use factual information supplied by the studio without adding marketing language.
3. Prefix suggested replacement copy with `[Draft]`.
4. Leave optional CMS text fields blank when no approved copy exists.
