import { defineField, defineType } from 'sanity';

export const award = defineType({
  name: 'award',
  title: 'Award',
  type: 'object',
  fields: [
    defineField({
      name: 'competition',
      title: 'Competition / Award Program',
      type: 'reference',
      to: [{ type: 'competition' }],
      description: 'Use a reusable competition record so results aggregate consistently across students and years.',
    }),
    defineField({
      name: 'competitionNameOverride',
      title: 'Competition Name (one-off fallback)',
      type: 'string',
      description: 'Only use when creating a reusable Competition record would not make sense.',
    }),
    defineField({ name: 'awardName', title: 'Award / Placement', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'division', title: 'Division / Category', type: 'string', description: 'Optional. Example: Painting, Animation, Middle School, or a competition-specific division.' }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: { list: ['Studio', 'Local', 'County', 'Regional', 'State', 'National', 'International'] },
    }),
    defineField({ name: 'year', title: 'Year', type: 'number', validation: (Rule) => Rule.min(1990).max(2100) }),
    defineField({ name: 'date', title: 'Award Date', type: 'date' }),
    defineField({ name: 'featuredInGallery', title: 'Use This Award on Gallery Card', type: 'boolean', initialValue: false, description: 'When a work has multiple awards, use this to choose which award/certificate should represent it in the gallery.' }),
    defineField({
      name: 'certificateImage',
      title: 'Primary Certificate / Award Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional. This is the recognition image used beside the artwork in the gallery when publication is enabled. Landscape and portrait uploads are both supported.',
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'certificateApprovedForPublication',
      title: 'Publish Primary Award Image',
      type: 'boolean',
      initialValue: false,
      description: 'Enable only after checking the image for names, school information, addresses, QR codes, or other details that should not be public.',
    }),
    defineField({
      name: 'additionalAwardMedia',
      title: 'Additional Award / Recognition Images',
      type: 'array',
      description: 'Optional supporting media such as a medal/trophy, ceremony photo, or result screenshot. These appear only in the detail view.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
          defineField({ name: 'kind', title: 'Type', type: 'string', options: { list: ['Certificate', 'Medal / Trophy', 'Ceremony', 'Result Screenshot', 'Other'] }, initialValue: 'Other' }),
          defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          defineField({ name: 'approvedForPublication', title: 'Publish This Image', type: 'boolean', initialValue: false }),
        ],
        preview: { select: { title: 'caption', subtitle: 'kind', media: 'image' }, prepare: ({ title, subtitle, media }) => ({ title: title || subtitle || 'Award image', subtitle, media }) },
      }],
    }),
    defineField({ name: 'url', title: 'Competition / Result URL', type: 'url' }),
    defineField({ name: 'notes', title: 'Public Notes', type: 'text', rows: 2, description: 'Optional public-facing context. Avoid internal or sensitive notes in this public dataset.' }),
  ],
  preview: {
    select: { title: 'awardName', competition: 'competition.name', fallback: 'competitionNameOverride', division: 'division', media: 'certificateImage' },
    prepare({ title, competition, fallback, division, media }) {
      return { title, subtitle: [competition || fallback, division].filter(Boolean).join(' · '), media };
    },
  },
});
