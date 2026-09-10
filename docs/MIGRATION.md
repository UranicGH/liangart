# Migrating the current gallery

The old site stores gallery content directly in HTML. The migration script converts that image list into Sanity drafts. **You do not need all of the student/award metadata before running the import.**

## 1. Keep a copy of the current Sanity configuration

Do not overwrite your working `.env`. The migration uses the same project and `production` dataset already connected to `/admin`.

## 2. Prepare the legacy site folder

The importer expects:

```text
legacy/
  index.html
  images/
    IMG_4232.jpeg
    ...
```

The important pieces are the old `index.html` and the old `images/` directory. The other old pages are optional for this import.

If you still have a copy of the original website files, copy its `index.html` and `images/` folder into `legacy/`.

If the original version only exists in Git, restore/copy those files from the old branch/commit into `legacy/` rather than replacing the new Astro source.

## 3. Make sure the core CMS content exists

```bash
npm run seed:content
```

This ensures that the Studio Art program exists.

## 4. Remove demo records before importing real work

```bash
npm run remove:demo
```

This only targets the explicit demo IDs.

## 5. Dry-run the migration first

```bash
npm run migrate:legacy:check
```

This does **not** write to Sanity. It reports:

- how many unique artwork references were found in the old HTML;
- how many corresponding image files exist;
- how many are missing.

If your old site is somewhere other than `legacy/`, run the underlying migration with that path and `--dry-run`, for example:

```bash
npm run migrate:legacy -- /absolute/path/to/old-site --dry-run
```

Resolve missing files before the full import when possible.

## 6. Run the real import

```bash
npm run migrate:legacy
```

Or with another legacy folder:

```bash
npm run migrate:legacy -- /absolute/path/to/old-site
```

The migration:

1. reads the unique images referenced by the legacy gallery;
2. uploads each available image to Sanity Assets;
3. creates one **draft** Student Work record per image;
4. links each imported work to Studio Art;
5. leaves the title as a clearly marked `[Draft]` placeholder;
6. flags the record as **Needs Metadata Review**;
7. does not invent a student, category, age, medium, award or date.

The importer is rerunnable: it skips a legacy draft that already exists.

## 7. Review a small batch first

Open:

```text
/admin → Student Work → Needs Metadata Review
```

Review about 10–20 pieces before committing to entering all metadata. For each one, prioritize:

1. real work title (or an approved neutral title if the work was never named);
2. Student record/public display name;
3. publication permission;
4. Program;
5. Category;
6. award information and certificate, if applicable;
7. age/grade only if known and approved for public display;
8. medium/date/dimensions/artist statement when available.

You can leave optional fields blank, save the draft, close it, and return later.

## 8. Publish gradually

There is no requirement to finish the entire archive before publishing any work. Once a record is reviewed, clear **Needs Metadata Review** and publish it. Published works can still be edited later.

If you want a published record kept in the CMS but temporarily removed from the website, turn off **Show on Website**.

## Why imports are drafts

The old HTML contains images but not reliable structured metadata. Drafts prevent incomplete `[Draft]` titles or unreviewed student information from accidentally appearing on the public site.
