import { defineField, defineType } from 'sanity';

export const instructor = defineType({
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'publicTitle', title: 'Public Title', type: 'string', description: 'Optional. Example: Instructor or Teacher.' }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 6, description: 'Leave blank until approved website copy is available.' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'name', subtitle: 'publicTitle', media: 'photo' } },
});
