import { defineField, defineType } from 'sanity';

export const tuition = defineType({
  name: 'tuition',
  title: 'Tuition',
  type: 'document',
  fields: [
    defineField({ name: 'program', title: 'Program', type: 'reference', to: [{ type: 'program' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'term', title: 'Term', type: 'string', description: 'Example: Fall 2026', validation: (Rule) => Rule.required() }),
    defineField({ name: 'current', title: 'Current Tuition', type: 'boolean', description: 'Current rate sheets appear on the public tuition page.', initialValue: true }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', description: 'Lower numbers appear first.' }),
    defineField({ name: 'effectiveDate', title: 'Effective Date', type: 'date' }),
    defineField({ name: 'lastUpdated', title: 'Last Updated', type: 'date' }),
    defineField({ name: 'classCount', title: 'Classes per Semester', type: 'number', validation: (Rule) => Rule.positive().integer() }),
    defineField({
      name: 'plans',
      title: 'Tuition Plans',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Plan Name', type: 'string', description: 'Example: One Hour Classes', validation: (Rule) => Rule.required() }),
            defineField({ name: 'durationMinutes', title: 'Class Duration (minutes)', type: 'number', validation: (Rule) => Rule.positive().integer() }),
            defineField({ name: 'semesterPrice', title: 'Semester Price ($)', type: 'number', validation: (Rule) => Rule.required().min(0) }),
            defineField({ name: 'regularPrice', title: 'Regular / Reference Price ($)', type: 'number', description: 'Optional; used to calculate savings.' }),
            defineField({ name: 'note', title: 'Plan Note', type: 'string' }),
          ],
          preview: { select: { title: 'label', price: 'semesterPrice' }, prepare: ({ title, price }) => ({ title, subtitle: `$${price ?? 0} / semester` }) },
        },
      ],
    }),
    defineField({ name: 'notes', title: 'Tuition Notes', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'registrationCta', title: 'Registration Button Text', type: 'string', initialValue: 'Contact Us' }),
  ],
  preview: {
    select: { term: 'term', program: 'program.name', current: 'current' },
    prepare({ term, program, current }) {
      return { title: [program, term].filter(Boolean).join(' — '), subtitle: current ? 'Current' : 'Archived' };
    },
  },
});
