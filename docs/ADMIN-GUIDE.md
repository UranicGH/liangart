# Liang Art Studio — Admin guide

This guide is written for a studio administrator who does **not** need access to the website code.

## Where to edit

When the website is deployed, open:

```text
https://liangartstudio.com/admin
```

Sign in with the Sanity account that has been invited to the Liang Art Studio project.

## Adding a new student work

1. Open **Student Work → All Student Work**.
2. Click **Create** and choose **Student Work**.
3. In **1. Basics**:
   - upload the artwork/animation thumbnail;
   - enter the work title;
   - choose the student;
   - choose the program (Studio Art or Animation);
   - choose the category;
   - leave **Show on Website** on unless the record should remain hidden;
   - optionally turn on **Featured on Homepage**.
4. In **2. Student & Photos**:
   - add age/grade at completion if known;
   - turn on the separate public-display switches only when approved;
   - add optional process/recognition photos and approve individual images for publication.
5. In **3. Awards**:
   - add the competition, award/placement, division, level and year when known;
   - upload the certificate/award image;
   - enable **Publish Primary Award Image** only after checking the image for information that should not be public;
   - if there are multiple awards, mark the one that should represent the work on the gallery card.
6. In **4. Optional Details**, add medium, completion date/year, dimensions, class/section, description, artist statement or animation/video URL when available.
7. Click **Publish** when ready.

You can publish a record and come back to add optional information later. Changes made later do not require touching the website code.

## Imported work

Legacy imports appear first under **Student Work → Needs Metadata Review**. It is fine to fill them out gradually.

For an imported work:

1. open the record;
2. replace the `[Draft]` title;
3. choose/create the student and confirm the student's publication permission;
4. choose a category;
5. add whatever other information is currently available;
6. turn off **Needs Metadata Review** when the basic record has been checked;
7. publish when it is appropriate for the public gallery.

Unknown optional information can remain blank and be added later.

## Hiding something without deleting it

Use **Show on Website** on the Student Work record. Turning it off keeps the record in Sanity while removing it from the public gallery after the site refreshes/rebuilds.

## Students

A Student record stores a **public display name**, not necessarily a legal name. The artwork/name permission and portrait permission are separate switches.

## Categories and competitions

Before creating a new category or competition, search the existing list first. Reusing the same record keeps filters and award counts consistent.
