import { defineField, defineType } from 'sanity';

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Program Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'programType',
      title: 'Program Category',
      type: 'string',
      description: 'Optional free-form grouping. This is not used to control layout.',
    }),
    defineField({ name: 'instructor', title: 'Instructor', type: 'reference', to: [{ type: 'instructor' }] }),
    defineField({
      name: 'primaryProgram',
      title: 'Primary Studio Program',
      type: 'boolean',
      description: 'Use this to give the studio’s main program greater prominence without hard-coding a specific program into the website.',
      initialValue: false,
    }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', description: 'Lower numbers appear first.' }),
    defineField({ name: 'summary', title: 'Program Summary', type: 'text', rows: 4, description: 'Leave blank, use approved existing copy, or prefix suggested copy with “[Draft]”.' }),
    defineField({ name: 'details', title: 'Additional Details', type: 'text', rows: 8, description: 'Optional. Scheduling, ages, prerequisites, or other approved information.' }),
    defineField({ name: 'featuredImage', title: 'Program Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'showOnWebsite', title: 'Show on Website', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Display order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', instructor: 'instructor.name', primary: 'primaryProgram', media: 'featuredImage' },
    prepare({ title, instructor, primary, media }) {
      return { title, subtitle: [primary ? 'Primary program' : null, instructor].filter(Boolean).join(' · '), media };
    },
  },
});
