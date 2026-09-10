import { defineField, defineType } from 'sanity';

export const student = defineType({
  name: 'student',
  title: 'Student',
  type: 'document',
  groups: [
    { name: 'public', title: 'Public Profile', default: true },
    { name: 'admin', title: 'Administrative' },
  ],
  fields: [
    defineField({
      name: 'displayName',
      title: 'Public Display Name',
      description: 'Use the exact name that may appear publicly (for example, “Grace L.”).',
      type: 'string',
      group: 'public',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'permissionToPublish',
      title: 'Permission to Publish Artwork / Name',
      description: 'Administrative confirmation that the student’s artwork and public display name may be shown on the website.',
      type: 'boolean',
      group: 'admin',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Optional Public Student Photo',
      type: 'image',
      group: 'public',
      options: { hotspot: true },
      description: 'Optional portrait or studio photo. Keep this separate from the artwork itself.',
    }),
    defineField({
      name: 'photoPermissionToPublish',
      title: 'Permission to Publish Student Photo',
      type: 'boolean',
      group: 'admin',
      initialValue: false,
      description: 'Separate confirmation for publishing an identifiable student photo. A photo is never shown publicly unless this is enabled.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'admin',
      options: { list: ['Current student', 'Former student'] },
      initialValue: 'Current student',
    }),
    defineField({ name: 'studioStartYear', title: 'Started at Liang Art Studio (year)', type: 'number', group: 'admin', validation: (Rule) => Rule.min(1990).max(2100), description: 'Optional. Useful for internal context and future student spotlights.' }),
    defineField({ name: 'bio', title: 'Optional Public Note', type: 'text', rows: 3, group: 'public', description: 'Only use approved public-facing text.' }),
  ],
  preview: {
    select: { title: 'displayName', permission: 'permissionToPublish', photoPermission: 'photoPermissionToPublish', media: 'photo' },
    prepare({ title, permission, photoPermission, media }) {
      const status = permission ? 'Artwork/name approved' : 'Artwork/name not approved';
      const photo = media ? (photoPermission ? 'photo approved' : 'photo not approved') : null;
      return { title, subtitle: [status, photo].filter(Boolean).join(' · '), media };
    },
  },
});
