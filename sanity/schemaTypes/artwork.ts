import { defineField, defineType } from 'sanity';

export const artwork = defineType({
  name: 'artwork',
  title: 'Student Work',
  type: 'document',
  groups: [
    { name: 'display', title: '1. Basics', default: true },
    { name: 'studentContext', title: '2. Student & Photos' },
    { name: 'awards', title: '3. Awards' },
    { name: 'details', title: '4. Optional Details' },
    { name: 'migration', title: 'Import Review' },
  ],
  fields: [
    defineField({
      name: 'image',
      title: 'Artwork / Thumbnail Image',
      type: 'image',
      group: 'display',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string', description: 'Describe the work for accessibility.' }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'title', title: 'Work Title', type: 'string', group: 'display', validation: (Rule) => Rule.required() }),
    defineField({ name: 'student', title: 'Student', type: 'reference', to: [{ type: 'student' }], group: 'display', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'program',
      title: 'Program',
      type: 'reference',
      to: [{ type: 'program' }],
      group: 'display',
      description: 'Examples: Studio Art or Animation.',
    }),
    defineField({ name: 'instructors', title: 'Instructor(s)', type: 'array', of: [{ type: 'reference', to: [{ type: 'instructor' }] }], group: 'details', description: 'Optional. Useful if a student worked with a specific instructor or multiple instructors.' }),
    defineField({ name: 'showOnWebsite', title: 'Show on Website', type: 'boolean', group: 'display', initialValue: true, description: 'Turn this off to keep a published record in the CMS without showing it in the public gallery.' }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', group: 'display', initialValue: false }),
    defineField({ name: 'displayOrder', title: 'Featured Display Order', description: 'Lower numbers appear first. Leave blank for automatic ordering.', type: 'number', group: 'display' }),

    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'workCategory' }], group: 'display', description: 'Reusable CMS category. Administrators can create new categories without changing code.', validation: (Rule) => Rule.required() }),
    defineField({ name: 'medium', title: 'Medium / Technique', type: 'string', group: 'details' }),
    defineField({ name: 'artworkDate', title: 'Completion Date', type: 'date', group: 'details' }),
    defineField({ name: 'year', title: 'Completion Year', description: 'Useful when the exact date is unknown.', type: 'number', group: 'details', validation: (Rule) => Rule.min(1990).max(2100) }),
    defineField({ name: 'className', title: 'Class / Section', type: 'string', group: 'details' }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      group: 'details',
      fields: [
        defineField({ name: 'width', title: 'Width', type: 'number', validation: (Rule) => Rule.positive() }),
        defineField({ name: 'height', title: 'Height', type: 'number', validation: (Rule) => Rule.positive() }),
        defineField({ name: 'unit', title: 'Unit', type: 'string', options: { list: ['in', 'cm'] }, initialValue: 'in' }),
      ],
    }),
    defineField({ name: 'description', title: 'Work Description', type: 'text', rows: 4, group: 'details', description: 'Optional approved factual description. Do not add generated marketing copy unless prefixed “[Draft]”.' }),
    defineField({ name: 'artistStatement', title: 'Artist Statement', type: 'text', rows: 5, group: 'details', description: 'Optional statement from the student about the work. Particularly useful for featured or award-winning pieces.' }),
    defineField({ name: 'videoUrl', title: 'Animation / Video URL', type: 'url', group: 'details', description: 'Optional. Use for animation hosted on YouTube, Vimeo, or another approved service; the uploaded image acts as its gallery thumbnail.' }),

    defineField({ name: 'ageAtCompletion', title: 'Student Age at Completion', type: 'number', group: 'studentContext', validation: (Rule) => Rule.integer().min(3).max(100), description: 'Optional. Store the age for this specific work rather than a birthdate.' }),
    defineField({ name: 'showAgePublicly', title: 'Show Age Publicly', type: 'boolean', group: 'studentContext', initialValue: false, description: 'Age is not returned to the public website unless this is enabled.' }),
    defineField({ name: 'gradeAtCompletion', title: 'Grade at Completion', type: 'string', group: 'studentContext', description: 'Optional. Example: 7th grade. Avoid storing school name unless there is a clear reason and permission.' }),
    defineField({ name: 'showGradePublicly', title: 'Show Grade Publicly', type: 'boolean', group: 'studentContext', initialValue: false, description: 'Grade is not returned to the public website unless this is enabled.' }),
    defineField({
      name: 'studentContextImages',
      title: 'Student / Process Photos for This Work',
      type: 'array',
      group: 'studentContext',
      description: 'Optional photos of the student creating, presenting, or receiving recognition for this work. Each image has its own public-display control.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
          defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          defineField({ name: 'approvedForPublication', title: 'Publish This Image', type: 'boolean', initialValue: false }),
        ],
        preview: { select: { title: 'caption', media: 'image', approved: 'approvedForPublication' }, prepare: ({ title, media, approved }) => ({ title: title || 'Student / process image', subtitle: approved ? 'Approved for website' : 'Not public', media }) },
      }],
    }),

    defineField({ name: 'awards', title: 'Awards', type: 'array', of: [{ type: 'award' }], group: 'awards' }),

    defineField({ name: 'legacyFilename', title: 'Legacy Filename', type: 'string', group: 'migration', readOnly: true, hidden: ({ value }) => !value }),
    defineField({ name: 'needsMetadataReview', title: 'Needs Metadata Review', type: 'boolean', group: 'migration', initialValue: false, description: 'Imported works stay in the review queue until this is turned off. You can save partial information and come back later.' }),
  ],
  orderings: [
    { title: 'Newest', name: 'newest', by: [{ field: 'artworkDate', direction: 'desc' }, { field: '_createdAt', direction: 'desc' }] },
    { title: 'Featured order', name: 'featuredOrder', by: [{ field: 'displayOrder', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', student: 'student.displayName', media: 'image', featured: 'featured', needsReview: 'needsMetadataReview', age: 'ageAtCompletion' },
    prepare({ title, student, media, featured, needsReview, age }) {
      const flags = [age ? `Age ${age}` : null, featured ? 'Featured' : null, needsReview ? 'Needs review' : null].filter(Boolean).join(' · ');
      return { title, subtitle: [student, flags].filter(Boolean).join(' — '), media };
    },
  },
});
