import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website Information',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Website Text', default: true },
    { name: 'contact', title: 'Contact & Location' },
    { name: 'advanced', title: 'Advanced / Search' },
  ],
  fields: [
    defineField({ name: 'studioName', title: 'Studio Name', type: 'string', group: 'basic', validation: (Rule) => Rule.required(), initialValue: 'Liang Art Studio' }),
    defineField({ name: 'tagline', title: 'Homepage Tagline', type: 'string', group: 'basic', initialValue: 'Learn how to draw from a professional.' }),
    defineField({ name: 'galleryIntro', title: 'Gallery Intro', type: 'text', group: 'basic', rows: 2, initialValue: 'Check out featured student works from Liang Art Studio classes.' }),
    defineField({ name: 'aboutHeading', title: 'About Heading', type: 'string', group: 'basic', initialValue: 'About Liang Art Studio' }),
    defineField({ name: 'aboutText', title: 'About Text', type: 'text', group: 'basic', rows: 6 }),
    defineField({ name: 'studioPhoto', title: 'Studio / About Photo', type: 'image', group: 'basic', options: { hotspot: true } }),

    defineField({ name: 'wechatQr', title: 'WeChat QR Code', type: 'image', group: 'contact' }),
    defineField({ name: 'contactText', title: 'Contact Instructions', type: 'text', group: 'contact', rows: 4 }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contact' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', group: 'contact' }),
    defineField({ name: 'address', title: 'Studio Address', type: 'text', group: 'contact', rows: 2 }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url', group: 'contact' }),
    defineField({ name: 'registrationUrl', title: 'Registration / Inquiry URL', type: 'url', group: 'contact' }),
    defineField({ name: 'googleMapsUrl', title: 'Google Maps / Business URL', type: 'url', group: 'contact' }),
    defineField({ name: 'hoursSummary', title: 'Studio Hours / Availability', type: 'string', group: 'contact' }),
    defineField({ name: 'serviceAreas', title: 'Areas Served', type: 'array', group: 'contact', of: [{ type: 'string' }] }),

    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'advanced', description: 'Optional. Leave blank to use the normal studio/page title.' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', group: 'advanced', rows: 3 }),
    defineField({ name: 'socialShareImage', title: 'Social / Search Share Image', type: 'image', group: 'advanced', options: { hotspot: true } }),
  ],
});
