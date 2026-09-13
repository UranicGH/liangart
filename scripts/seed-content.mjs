import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2026-09-09' });

const documents = [
  {
    _id: 'instructor-yolanda-liang',
    _type: 'instructor',
    name: 'Yolanda Liang',
    publicTitle: 'Instructor',
    displayOrder: 1,
    bio: '[Draft] Add Yolanda Liang’s education, teaching experience, media specialties, competition mentorship, and approach to instruction.',
  },
  {
    _id: 'instructor-paula-pelet-cruz',
    _type: 'instructor',
    name: 'Paula Pelet Cruz',
    publicTitle: 'Instructor',
    displayOrder: 2,
    bio: '[Draft] Add Paula Pelet Cruz’s background in animation and Spanish instruction, relevant education or professional experience, and teaching approach.',
  },
  {
    _id: 'program-studio-art',
    _type: 'program',
    name: 'Studio Art',
    slug: { _type: 'slug', current: 'studio-art' },
    programType: 'Studio Art',
    instructor: { _type: 'reference', _ref: 'instructor-yolanda-liang' },
    primaryProgram: true,
    displayOrder: 1,
    summary: 'Learn how to draw from a professional.',
  },
  {
    _id: 'program-animation',
    _type: 'program',
    name: 'Animation',
    slug: { _type: 'slug', current: 'animation' },
    programType: 'Animation',
    instructor: { _type: 'reference', _ref: 'instructor-paula-pelet-cruz' },
    primaryProgram: false,
    displayOrder: 2,
    summary: '[Draft] Class details, schedule, age range, and tuition information will be added here.',
  },
  {
    _id: 'program-spanish',
    _type: 'program',
    name: 'Spanish',
    slug: { _type: 'slug', current: 'spanish' },
    programType: 'Spanish',
    instructor: { _type: 'reference', _ref: 'instructor-paula-pelet-cruz' },
    primaryProgram: false,
    displayOrder: 3,
    summary: '[Draft] Class details, schedule, age range, and tuition information will be added here.',
  },
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    studioName: 'Liang Art Studio',
    tagline: 'Learn how to draw from a professional.',
    galleryIntro: 'Check out featured student works from Liang Art Studio classes.',
    aboutHeading: 'About Liang Art Studio',
    aboutText: 'Liang Studio is committed to various art education and training. Yolanda Liang has been engaged in art education since graduating from a professional art school. Many children have won awards in county, state, and national visual art competitions and entered top universities such as the Ivy League schools.',
    contactText: 'Yolanda Liang can be reached through WeChat. Save or screenshot the code below, then scan in the WeChat app:',
  },
];

for (const document of documents) {
  const existing = await client.getDocument(document._id);
  if (existing) {
    console.log(`KEEP ${document._id}: already exists`);
    continue;
  }
  await client.create(document);
  console.log(`CREATE ${document._id}`);
}

// Safe, non-destructive defaults for projects seeded with earlier starter versions.
await client.patch('instructor-yolanda-liang').setIfMissing({ displayOrder: 1 }).commit();
await client.patch('instructor-paula-pelet-cruz').setIfMissing({ displayOrder: 2 }).commit();

console.log('\nCore studio content seeded/updated. Existing edited content was preserved. Review all [Draft] copy in /admin before launch.');
