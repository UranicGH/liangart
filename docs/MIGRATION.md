# Migrating the legacy gallery

The legacy importer converts the old hard-coded image gallery into Sanity draft Student Work records. You do **not** need all metadata before importing.

> If you already completed the migration, do not run it again for v12. v12 works with the existing records and simply ignores the old permission/show fields.

## Expected legacy folder

```text
legacy/
  index.html
  images/
    ...
```

Run a no-write audit first:

```bash
npm run migrate:legacy:check
```

Then import:

```bash
npm run migrate:legacy
```

The importer uploads each legacy gallery image and creates a draft Studio Art record. It does not invent student names, category, age, medium, awards or dates.

## After import

Review records gradually. The most useful fields are:

1. student;
2. title, if known;
3. program/category;
4. age/grade when completed, if known;
5. medium/date;
6. award and certificate information;
7. optional portrait/process images.

Unknown fields can remain blank. Publish the works you are comfortable displaying; all optional metadata can be added later.
