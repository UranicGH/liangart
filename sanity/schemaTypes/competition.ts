import { defineField, defineType } from 'sanity';

export const competition = defineType({
  name: 'competition',
  title: 'Competition / Award Program',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Competition Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'organizer', title: 'Organizer', type: 'string', description: 'Optional. Example: Alliance for Young Artists & Writers.' }),
    defineField({ name: 'website', title: 'Official Website', type: 'url' }),
    defineField({
      name: 'defaultLevel',
      title: 'Typical Competition Level',
      type: 'string',
      options: { list: ['Studio', 'Local', 'County', 'Regional', 'State', 'National', 'International'] },
      description: 'Optional default context. Individual awards can still specify their own level.',
    }),
    defineField({ name: 'logo', title: 'Logo / Mark', type: 'image', options: { hotspot: true }, description: 'Optional competition logo or mark.' }),
    defineField({ name: 'notes', title: 'Internal Notes', type: 'text', rows: 3, description: 'Keep this non-sensitive. The production dataset is configured for public reads.' }),
  ],
  orderings: [{ title: 'Name', name: 'name', by: [{ field: 'name', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'organizer', media: 'logo' },
  },
});
