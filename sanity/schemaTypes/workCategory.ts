import { defineField, defineType } from 'sanity';

export const workCategory = defineType({
  name: 'workCategory',
  title: 'Student Work Category',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Category Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 80 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'program', title: 'Program', type: 'reference', to: [{ type: 'program' }], description: 'Optional. Associate the category with a program when useful.' }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', description: 'Lower numbers appear first when categories are listed.' }),
  ],
  orderings: [{ title: 'Display order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }, { field: 'name', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', program: 'program.name' },
    prepare({ title, program }) { return { title, subtitle: program || 'All programs' }; },
  },
});
