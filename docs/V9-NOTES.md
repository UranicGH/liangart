# v9 — migration-ready visual/admin pass

## Gallery recognition layout

The student portrait is placed at the bottom-left of the artwork and the primary certificate/award image at the bottom-right. The certificate is intentionally larger and preserves the uploaded image's natural aspect ratio.

This placement was chosen because both supporting items read as a balanced recognition frame around the artwork. A diagonal top/bottom arrangement creates more visual motion, but it also competes with top badges and produces less predictable composition across hundreds of differently cropped artworks.

Desktop hover enlarges the artwork and nearly fades the supporting media. On touch devices, tapping the artwork opens the full artwork/detail viewer.

## Visual direction

The palette remains warm and gallery-like, but the typography and UI are younger:

- Manrope for navigation, labels, metadata, cards and prices
- Instrument Serif only for major editorial headings
- lighter warm-white background
- muted blue studio accent
- muted brass reserved for awards/achievement
- less card chrome and less decorative serif usage

The goal is a middle ground between an old-fashioned private studio and a generic modern SaaS/education template.

## Admin improvements

Student Work now has a simpler hierarchy:

- Needs Metadata Review
- Featured on Homepage
- All Student Work

Artwork editing groups are numbered:

1. Basics
2. Student & Photos
3. Awards
4. Optional Details
5. Import Review

A `Show on Website` switch allows a published CMS record to be hidden without deleting or unpublishing it.

## Migration safety

`npm run migrate:legacy:check` performs a dry run: it counts legacy image references and verifies that the referenced image files exist, without uploading or changing Sanity.

The real importer continues to create drafts and sets `Needs Metadata Review`, so missing optional metadata can be completed later.
