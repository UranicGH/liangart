# Migrating the current gallery

The old site stores gallery content directly in HTML. The migration script converts that image list into Sanity drafts.

Expected legacy layout:

```text
legacy/
  index.html
  about.html
  tuition.html
  contact.html
  images/
    IMG_4232.jpeg
    ...
```

## Before migration

Run the content seed first:

```bash
SANITY_AUTH_TOKEN=... npm run seed:content
```

This ensures the Studio Art program exists so migrated work can be linked to it.

## Why drafts?

The old HTML contains images but not reliable structured metadata for student name, category, date, medium, award, or publication permission. Guessing those fields would create bad data.

The migration therefore:

1. extracts unique image filenames referenced by the old gallery HTML;
2. uploads the files to Sanity Assets;
3. creates one **draft** Student Work document per image;
4. links each imported item to the Studio Art program;
5. flags each document with `Needs Metadata Review`;
6. leaves publication to an administrator after the correct student and metadata have been added.

Draft titles are clearly prefixed `[Draft]`.

## Run it

Create a Sanity API token with write access, then:

```bash
SANITY_AUTH_TOKEN=... npm run migrate:legacy
```

If the legacy folder is somewhere else:

```bash
SANITY_AUTH_TOKEN=... node scripts/migrate-legacy-gallery.mjs /path/to/legacy
```

Never commit the write token.
