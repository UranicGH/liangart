import { defineField, defineType } from 'sanity';


export const artwork = defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  groups: [
    { name: 'display', title: 'Display', default: true },
    { name: 'details', title: 'Artwork Details' },
    { name: 'awards', title: 'Awards' },
    { name: 'migration', title: 'Migration' },
  ],
  fields: [
    defineField({
      name: 'image',
      title: 'Artwork Image',
      type: 'image',
      group: 'display',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string', description: 'Describe the artwork for accessibility.' }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'title', title: 'Artwork Title', type: 'string', group: 'display', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'student',
      title: 'Student',
      type: 'reference',
      to: [{ type: 'student' }],
      group: 'display',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'program',
      title: 'Program',
      type: 'reference',
      to: [{ type: 'program' }],
      group: 'display',
      description: 'Examples: Studio Art or Animation.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      group: 'display',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Featured Display Order',
      description: 'Lower numbers appear first. Leave blank for automatic ordering.',
      type: 'number',
      group: 'display',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'details',
      description: 'Free-form so new program categories can be added without changing the schema. Examples: Drawing, Watercolor, 2D Animation.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'medium', title: 'Medium', type: 'string', group: 'details' }),
    defineField({ name: 'artworkDate', title: 'Artwork Date', type: 'date', group: 'details' }),
    defineField({
      name: 'year',
      title: 'Artwork Year',
      description: 'Useful when the exact date is unknown.',
      type: 'number',
      group: 'details',
      validation: (Rule) => Rule.min(1990).max(2100),
    }),
    defineField({ name: 'className', title: 'Class / Section', type: 'string', group: 'details' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, group: 'details' }),
    defineField({ name: 'videoUrl', title: 'Animation / Video URL', type: 'url', group: 'details', description: 'Optional. Use for animation work hosted on YouTube, Vimeo, or another approved service; the uploaded image acts as its gallery thumbnail.' }),
    defineField({ name: 'awards', title: 'Awards', type: 'array', of: [{ type: 'award' }], group: 'awards' }),
    defineField({
      name: 'legacyFilename',
      title: 'Legacy Filename',
      type: 'string',
      group: 'migration',
      readOnly: true,
      hidden: ({ value }) => !value,
    }),
    defineField({
      name: 'needsMetadataReview',
      title: 'Needs Metadata Review',
      type: 'boolean',
      group: 'migration',
      initialValue: false,
    }),
  ],
  orderings: [
    { title: 'Newest', name: 'newest', by: [{ field: 'artworkDate', direction: 'desc' }, { field: '_createdAt', direction: 'desc' }] },
    { title: 'Featured order', name: 'featuredOrder', by: [{ field: 'displayOrder', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'title',
      student: 'student.displayName',
      media: 'image',
      featured: 'featured',
      needsReview: 'needsMetadataReview',
    },
    prepare({ title, student, media, featured, needsReview }) {
      const flags = [featured ? 'Featured' : null, needsReview ? 'Needs review' : null].filter(Boolean).join(' · ');
      return { title, subtitle: [student, flags].filter(Boolean).join(' — '), media };
    },
  },
});
