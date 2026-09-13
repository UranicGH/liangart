import { defineField, defineType } from 'sanity';

export const student = defineType({
  name: 'student',
  title: 'Student',
  type: 'document',
  fields: [
    defineField({
      name: 'displayName',
      title: 'Student Name',
      description: 'Enter the name exactly as it should appear on the website (for example, “Grace L.”).',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Student Portrait (optional)',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional portrait shown with the student’s artwork.',
    }),
  ],
  preview: {
    select: { title: 'displayName', media: 'photo' },
    prepare({ title, media }) {
      return { title, subtitle: media ? 'Portrait added' : 'No portrait', media };
    },
  },
});
