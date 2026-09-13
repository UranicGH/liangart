# Deployment and CMS rebuilds

## Public site

The Astro site is static and is deployed by Cloudflare Workers Builds from the `revamp` branch.

- Build: `npm run build`
- Deploy: `npx wrangler deploy` (configuration is stored in `wrangler.jsonc`)
- Build-time Sanity variables must be present in Cloudflare.

## Sanity Studio

Run `npm run cms:dev` for the local GUI. Run `npm run cms:deploy` to deploy the Studio to Sanity hosting. Put the resulting `https://...sanity.studio` URL in `PUBLIC_SANITY_STUDIO_URL` in Cloudflare build variables. `/admin` then redirects to the hosted Studio.

## Rebuild when Sanity content is published

Because Astro is statically generated, Sanity changes require a new Cloudflare build.

1. Cloudflare Worker > Settings > Builds > Deploy Hooks.
2. Create `Sanity publish` for branch `revamp` and copy the URL.
3. In sanity.io/manage > Liang Art Studio > API > Webhooks, create a document webhook.
4. URL: the Cloudflare Deploy Hook URL. Method: POST. Dataset: production.
5. Trigger on Create, Update, Delete. Do not enable drafts or versions.
6. Optional filter:

```groq
_type in ["artwork", "student", "program", "instructor", "tuition", "siteSettings", "workCategory", "competition", "faq", "testimonial"]
```

Now a publish/update/unpublish in Sanity triggers a Cloudflare rebuild.
