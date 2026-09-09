import { defineField, defineType } from 'sanity';

export const student = defineType({
  name: 'student',
  title: 'Student',
  type: 'document',
  fields: [
    defineField({
      name: 'displayName',
      title: 'Public Display Name',
      description: 'Use the exact name that may appear publicly (for example, “Grace L.”).',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'permissionToPublish',
      title: 'Permission to Publish',
      description: 'Administrative confirmation that artwork/name may be shown publicly.',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['Current student', 'Former student'] },
      initialValue: 'Current student',
    }),
    defineField({ name: 'bio', title: 'Optional Public Note', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'displayName', permission: 'permissionToPublish' },
    prepare({ title, permission }) {
      return { title, subtitle: permission ? 'Approved for publication' : 'Publication permission not confirmed' };
    },
  },
});
