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
      S.documentTypeListItem('tuition').title('Tuition'),
      S.divider(),
      S.listItem()
        .title('Studio Setup')
        .child(
          S.list()
            .title('Studio Setup')
            .items([
              S.documentTypeListItem('program').title('Programs'),
              S.documentTypeListItem('instructor').title('Instructors'),
              S.documentTypeListItem('workCategory').title('Artwork Categories'),
              S.documentTypeListItem('competition').title('Competitions / Award Programs'),
              S.documentTypeListItem('faq').title('FAQs'),
              singleton(S, 'Website Information', 'siteSettings', 'siteSettings'),
            ])
        ),
    ]);
