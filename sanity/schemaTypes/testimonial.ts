import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 5, validation: (Rule) => Rule.required(), description: 'Use the person’s approved words; do not generate a testimonial.' }),
    defineField({ name: 'attribution', title: 'Public Attribution', type: 'string', validation: (Rule) => Rule.required(), description: 'Example: “Parent of a Studio Art student.” Avoid more identifying detail than necessary.' }),
    defineField({ name: 'program', title: 'Program', type: 'reference', to: [{ type: 'program' }] }),
    defineField({ name: 'permissionToPublish', title: 'Permission to Publish', type: 'boolean', initialValue: false, validation: (Rule) => Rule.required() }),
    defineField({ name: 'featured', title: 'Show on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', description: 'Lower numbers appear first.' }),
  ],
  orderings: [{ title: 'Display order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'attribution', quote: 'quote', permission: 'permissionToPublish' },
    prepare({ title, quote, permission }) {
      return { title, subtitle: `${permission ? 'Approved' : 'Not approved'} · ${quote || ''}` };
    },
  },
});
