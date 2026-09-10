# v8 pre-migration CMS audit

This version intentionally locks the data concepts that would be expensive or messy to normalize after hundreds of real artwork records exist. Purely visual changes remain independent.

## Changes worth making before import

### Reusable Student Work Categories

Artwork categories are now references to `workCategory` documents rather than free-form strings. Administrators can still create categories without touching code, but the gallery no longer accumulates variants such as `Watercolor`, `Water Color`, and `watercolor`.

Medium/technique remains free-form because it is naturally more descriptive and less useful as a rigid filter taxonomy.

### Reusable Competitions

Awards can reference a `competition` document. This makes award names, organizer information, official URLs, logos, and future aggregate counts consistent across years and students. A one-off fallback name remains available for unusual cases.

### Award representation

An award can have:

- a primary certificate/award image used for the gallery recognition thumbnail
- additional approved recognition media for the detail view
- a `featuredInGallery` flag so administrators can choose which award represents a work when the work has multiple awards

### Student/process media

Per-work student/process media is now an array rather than a single image. Every image has its own public-display permission control.

### Public age and grade

Age and grade are stored at the work level but are returned to the public site only when their respective public-display flags are enabled.

### Local/SEO settings

Site Settings can store approved service areas, hours summary, Google Maps/business URL, registration/inquiry URL, optional SEO description/title, and a social-share image. These can be wired into richer local-search/structured-data features without changing imported artwork.

## Deliberately not over-modeled yet

These can be added later without requiring artwork re-imports:

- structured weekly class schedules / seat capacity
- registration/payment system
- Chinese-language translations
- events/exhibitions
- student spotlight/profile pages
- automatically generated achievement dashboards

The existing records contain enough stable identifiers to add those features later.
