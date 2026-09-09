import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'studioName', title: 'Studio Name', type: 'string', validation: (Rule) => Rule.required(), initialValue: 'Liang Art Studio' }),
    defineField({ name: 'tagline', title: 'Homepage Tagline', type: 'string', initialValue: 'Learn how to draw from a professional.' }),
    defineField({ name: 'galleryIntro', title: 'Gallery Intro', type: 'text', rows: 2, initialValue: 'Check out featured student works from Liang Art Studio classes.' }),
    defineField({ name: 'aboutHeading', title: 'About Heading', type: 'string', initialValue: 'About Liang Art Studio' }),
    defineField({ name: 'aboutText', title: 'About Text', type: 'text', rows: 6, description: 'Use approved studio copy. Prefix suggested replacement copy with “[Draft]”.' }),
    defineField({ name: 'studioPhoto', title: 'Studio / About Photo', type: 'image', options: { hotspot: true }, description: 'Optional. Instructor portraits belong on Instructor records.' }),
    defineField({ name: 'wechatQr', title: 'WeChat QR Code', type: 'image' }),
    defineField({ name: 'contactText', title: 'Contact Instructions', type: 'text', rows: 4 }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'address', title: 'Studio Address', type: 'text', rows: 2 }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
  ],
});
