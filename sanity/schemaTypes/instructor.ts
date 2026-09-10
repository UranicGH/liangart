import { defineField, defineType } from 'sanity';

export const instructor = defineType({
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'publicTitle', title: 'Public Title', type: 'string', description: 'Optional. Example: Instructor.' }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', description: 'Lower numbers appear first on the About page.' }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 6, description: 'Leave blank until approved website copy is available.' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'credentials', title: 'Credentials / Education', type: 'array', of: [{ type: 'string' }], description: 'Optional concise items; only add verified information.' }),
    defineField({ name: 'specialties', title: 'Teaching Specialties', type: 'array', of: [{ type: 'string' }], description: 'Optional. Examples: watercolor, portfolio preparation, 2D animation, Spanish.' }),
  ],
  orderings: [{ title: 'Display order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }, { field: 'name', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'publicTitle', media: 'photo' } },
});
