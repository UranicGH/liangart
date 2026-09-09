import { defineField, defineType } from 'sanity';

export const award = defineType({
  name: 'award',
  title: 'Award',
  type: 'object',
  fields: [
    defineField({ name: 'competition', title: 'Competition', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'awardName', title: 'Award / Placement', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: { list: ['Studio', 'Local', 'County', 'Regional', 'State', 'National', 'International'] },
    }),
    defineField({ name: 'year', title: 'Year', type: 'number', validation: (Rule) => Rule.min(1990).max(2100) }),
    defineField({ name: 'date', title: 'Award Date', type: 'date' }),
    defineField({ name: 'url', title: 'Competition / Result URL', type: 'url' }),
    defineField({ name: 'notes', title: 'Notes', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'awardName', subtitle: 'competition' },
  },
});
