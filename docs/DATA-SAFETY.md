# Public-dataset data safety

The current Sanity project is designed to work on Sanity's free plan, which uses public datasets. Treat every **published field stored in this dataset** as information that should be safe to expose publicly, even if the Liang Art Studio frontend does not display that field.

## Appropriate for this CMS

- approved public student display name
- artwork and animation thumbnails
- approved student portrait/process images
- age or grade at the time of the work when approved for public display
- artwork title, medium, dimensions and date/year
- awards, certificates and result URLs after review
- instructor/program/tuition/site information

## Do not store here

- birth dates
- legal names when different from the approved public display name
- home addresses
- parent phone numbers or email addresses
- school names unless deliberately intended for public display and separately approved
- medical or other sensitive information
- signed releases/consent forms
- private administrative notes
- payment information

If Liang Art Studio later needs a private student-management/CRM system, use a private datastore or upgrade/configure a system intended for private records rather than extending this public content dataset with sensitive information.
