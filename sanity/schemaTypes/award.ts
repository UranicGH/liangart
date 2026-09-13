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
      description: 'Choose an existing competition, or create a new one from this field.',
    }),
    defineField({
      name: 'competitionNameOverride',
      title: 'Competition Name (if not in the list)',
      type: 'string',
      description: 'Only use this for a one-off competition you do not want to save as a reusable record.',
    }),
    defineField({ name: 'awardName', title: 'Award / Placement', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'division', title: 'Division / Category', type: 'string', description: 'Optional. Example: Painting, Animation, Middle School.' }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: { list: ['Studio', 'Local', 'County', 'Regional', 'State', 'National', 'International'] },
    }),
    defineField({ name: 'year', title: 'Year', type: 'number', validation: (Rule) => Rule.min(1990).max(2100) }),
    defineField({ name: 'date', title: 'Award Date', type: 'date' }),
    defineField({
      name: 'certificateImage',
      title: 'Certificate / Award Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional. If present, this certificate is shown with the artwork. When there are multiple awards, the first award with a certificate is used on the gallery card.',
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({
      name: 'additionalAwardMedia',
      title: 'Additional Award Photos (optional)',
      type: 'array',
      description: 'Optional supporting images such as a trophy, medal, ceremony photo, or result screenshot.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
          defineField({ name: 'kind', title: 'Type', type: 'string', options: { list: ['Certificate', 'Medal / Trophy', 'Ceremony', 'Result Screenshot', 'Other'] }, initialValue: 'Other' }),
          defineField({ name: 'caption', title: 'Caption', type: 'string' }),
        ],
        preview: { select: { title: 'caption', subtitle: 'kind', media: 'image' }, prepare: ({ title, subtitle, media }) => ({ title: title || subtitle || 'Award image', subtitle, media }) },
      }],
    }),
    defineField({ name: 'url', title: 'Competition / Result URL', type: 'url' }),
  ],
  preview: {
    select: { title: 'awardName', competition: 'competition.name', fallback: 'competitionNameOverride', division: 'division', media: 'certificateImage' },
    prepare({ title, competition, fallback, division, media }) {
      return { title, subtitle: [competition || fallback, division].filter(Boolean).join(' · '), media };
    },
  },
});
