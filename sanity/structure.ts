import type { StructureResolver } from 'sanity/structure';

const singleton = (S: any, title: string, schemaType: string, documentId: string) =>
  S.listItem()
    .title(title)
    .id(schemaType)
    .child(S.document().schemaType(schemaType).documentId(documentId));

export const studioStructure: StructureResolver = (S) =>
  S.list()
    .title('Liang Art Studio')
    .items([
      S.documentTypeListItem('artwork').title('Student Work'),
      S.documentTypeListItem('student').title('Students'),
      S.divider(),
      S.documentTypeListItem('program').title('Programs'),
      S.documentTypeListItem('instructor').title('Instructors'),
      S.documentTypeListItem('tuition').title('Tuition'),
      S.divider(),
      singleton(S, 'Site Settings', 'siteSettings', 'siteSettings'),
    ]);
