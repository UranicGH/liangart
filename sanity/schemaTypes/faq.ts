import { defineField, defineType } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 5, validation: (Rule) => Rule.required(), description: 'Use approved studio policy/information. Prefix suggested copy with “[Draft]”.' }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['Classes', 'Tuition', 'Registration', 'Competitions', 'Studio Policies', 'Other'] } }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', description: 'Lower numbers appear first.' }),
    defineField({ name: 'showOnWebsite', title: 'Show on Website', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Display order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }] }],
  preview: { select: { title: 'question', subtitle: 'category' } },
});
