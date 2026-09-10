# Keeping the site easy to redesign later

The CMS stores **meaning**, not layout.

Examples:

- Student Work stores the image/video, student, program, age at completion, category, dimensions, awards, supporting media, dates, and other factual metadata.
- Programs store the program name, instructor(s), parent-facing logistics, approved copy, and ordering.
- Instructor records store biographies, photos, credentials, specialties, and display order.
- Tuition stores rate sheets and prices.
- FAQs and testimonials store approved reusable content.
- Site Settings stores approved studio copy and contact information.

None of those records say things like “put this on the left,” “make this a large card,” “overlap these thumbnails,” or “use this color.” Those decisions live only in Astro components and CSS.

This means importing hundreds or thousands of artworks does **not** make a later visual redesign materially harder. A redesigned `ArtworkCard.astro`, gallery layout, homepage, or stylesheet can immediately render the same Sanity records in a different design.

## Student-work detail model

The gallery grid remains artwork-first. Richer context is available in the detail view:

- student public display name
- age/grade at completion when supplied
- medium/technique
- dimensions
- instructor(s)
- approved work description
- optional student artist statement
- awards and competition details
- optional approved student portrait/process imagery
- optional approved certificate/award imagery
- animation/video link when applicable

This presentation can change later without changing the stored records.

## Presentation fields kept intentionally small

A few presentation-neutral editorial controls are useful:

- `featured`
- `displayOrder`
- `primaryProgram`
- `showOnWebsite`

These describe editorial importance, not a specific visual layout.

## Programs

The studio is modeled as one organization with multiple programs:

- Studio Art — primary program, Yolanda Liang
- Animation — Paula Pelet Cruz
- Spanish — Paula Pelet Cruz

Studio Art can receive more homepage space today through `primaryProgram`, while Animation and Spanish remain fully modeled and can grow without a schema rewrite. Changing which program is primary later is a CMS edit, not a code migration.

## Copy rule

The starter follows this rule:

1. Reuse approved copy from the original Liang Art Studio site where it exists.
2. Use factual information supplied by the studio without adding marketing language.
3. Prefix suggested replacement copy with `[Draft]`.
4. Leave optional CMS text fields blank when no approved copy exists.
5. Testimonials must use the actual speaker's approved words; the CMS explicitly says not to generate them.
