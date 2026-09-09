# First-time setup

## 1. Protect the current site

In your existing `liangart` repository:

```bash
git checkout -b revamp
mkdir legacy
git mv index.html about.html tuition.html contact.html elements.html assets images legacy/
```

Keep `CNAME` at the repo root for now. Copy the files from this starter into the repo root and commit the branch.

## 2. Node vs. project dependencies

You do **not** need to reinstall Node.js every time you download a new revision of this project.

Node is installed once per computer (or once per Node version if you use `nvm`). This repo includes `.nvmrc` with Node 22 so you can run:

```bash
nvm install   # first time on a computer; downloads Node 22 only if it is missing
nvm use       # later shells; switches to the already-installed version
```

The project dependencies in `node_modules/` are different. They are intentionally not stored in Git or in the ZIP, so a newly extracted project folder normally needs:

```bash
npm install
```

once for that folder. After that, use:

```bash
npm run dev
```

## 3. Create/connect the Sanity project

Create a Sanity project and a public dataset named `production`, then copy the project ID.

## 4. Add environment variables

```bash
cp .env.example .env
```

Fill in:

```env
PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=xxxxxxxx
SANITY_STUDIO_DATASET=production
```

Project IDs and dataset names are public configuration, not secrets.

## 5. Log in to Sanity once on this computer

```bash
npx sanity login
```

This opens Sanity authentication in your browser. The local seed and migration commands use this authenticated CLI session, so you do not need to create or paste an API token for routine local setup.

## 6. Add CORS origins

In Sanity Manage → your project → API settings → CORS Origins:

- `http://localhost:4321` — Allow credentials
- `https://liangartstudio.com` — Allow credentials
- Add your temporary Cloudflare Pages preview domain later if administrators need to use Studio there.

## 7. Seed the studio structure

```bash
npm run seed:content
```

This creates, if they do not already exist:

- Yolanda Liang
- Paula Pelet Cruz
- Studio Art (primary program)
- Animation
- Spanish
- Site Settings using approved text from the original website, with “Teacher Liang” updated to “Yolanda Liang”

Instructor biography prompts and unapproved Animation/Spanish descriptions are explicitly marked `[Draft]`.

## 8. Start the editor

Restart the dev server and visit:

`http://localhost:4321/admin`

The CMS sections are:

- Student Work
- Students
- Programs
- Instructors
- Tuition
- Site Settings

The public gallery deliberately excludes any work whose linked student does not have **Permission to Publish** enabled.

## 9. Add tuition

Tuition is a normal collection rather than a singleton so each program can have its own current and archived rate sheets.

Create a Tuition document, choose its Program, enter the term and prices, and keep `Current Tuition` enabled for rate sheets that should appear publicly.

## 10. Add student work

In `/admin` → Student Work → Create:

- upload image/thumbnail
- title
- choose/create student
- choose program (`Studio Art` or `Animation` for gallery work)
- category + medium
- date/year
- optional animation/video URL
- optional awards
- optionally mark as Featured
- publish

Animation entries use the same student-work and award system as Studio Art. Their uploaded image is the gallery thumbnail; the optional video URL can link to YouTube/Vimeo/etc.

## 11. Cloudflare Pages deployment

Create a Cloudflare Pages project connected to the GitHub repo.

- Framework preset: Astro (or None)
- Build command: `npm run build`
- Build output directory: `dist`
- Add the four Sanity environment variables from `.env`

After the preview works, point `liangartstudio.com` at the Pages project.

## 12. Automatic rebuild after CMS edits

In Cloudflare Pages, create a Deploy Hook for the production branch. In Sanity, add a webhook that calls that hook when documents are created, updated, or deleted.

An administrator then only needs to click **Publish** in Sanity; they never need GitHub or Cloudflare for routine content changes.
