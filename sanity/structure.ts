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
      S.listItem()
        .title('Student Work')
        .child(
          S.list()
            .title('Student Work')
            .items([
              S.listItem()
                .title('Needs Metadata Review')
                .child(
                  S.documentList()
                    .title('Needs Metadata Review')
                    .schemaType('artwork')
                    .filter('_type == "artwork" && needsMetadataReview == true')
                ),
              S.listItem()
                .title('Featured on Homepage')
                .child(
                  S.documentList()
                    .title('Featured on Homepage')
                    .schemaType('artwork')
                    .filter('_type == "artwork" && featured == true')
                ),
              S.documentTypeListItem('artwork').title('All Student Work'),
            ])
        ),
      S.documentTypeListItem('student').title('Students'),
      S.divider(),
      S.documentTypeListItem('program').title('Programs'),
      S.documentTypeListItem('instructor').title('Instructors'),
      S.documentTypeListItem('workCategory').title('Student Work Categories'),
      S.documentTypeListItem('competition').title('Competitions / Award Programs'),
      S.documentTypeListItem('tuition').title('Tuition'),
      S.divider(),
      S.documentTypeListItem('faq').title('FAQs'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.divider(),
      singleton(S, 'Site Settings', 'siteSettings', 'siteSettings'),
    ]);
