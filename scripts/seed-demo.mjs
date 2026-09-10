import fs from 'node:fs/promises';
import path from 'node:path';
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2026-09-09' });
const demoRoot = path.resolve('public', 'demo');

const requiredCoreIds = [
  'program-studio-art',
  'program-animation',
  'instructor-yolanda-liang',
  'instructor-paula-pelet-cruz',
];

const coreDocuments = await client.getDocuments(requiredCoreIds);
const missingCore = requiredCoreIds.filter((id, index) => !coreDocuments[index]);
if (missingCore.length) {
  console.error('Missing core studio content required by the demo seeder:');
  missingCore.forEach((id) => console.error(`  - ${id}`));
  console.error('\nRun `npm run seed:content` first, then rerun `npm run seed:demo`.');
  process.exit(1);
}

async function uploadDemoImage(filename) {
  const filePath = path.join(demoRoot, filename);
  await fs.access(filePath);
  const file = await fs.open(filePath, 'r');
  try {
    return await client.assets.upload('image', file.createReadStream(), {
      filename: `DEMO-${filename}`,
    });
  } finally {
    await file.close();
  }
}

const imageRef = (asset, alt) => ({
  _type: 'image',
  asset: { _type: 'reference', _ref: asset._id },
  alt,
});


const DEMO_CATEGORIES = [
  { id: 'demo-category-watercolor', name: '[Demo] Watercolor', slug: 'demo-watercolor', program: 'program-studio-art', displayOrder: 1 },
  { id: 'demo-category-drawing', name: '[Demo] Drawing', slug: 'demo-drawing', program: 'program-studio-art', displayOrder: 2 },
  { id: 'demo-category-painting', name: '[Demo] Painting', slug: 'demo-painting', program: 'program-studio-art', displayOrder: 3 },
  { id: 'demo-category-2d-animation', name: '[Demo] 2D Animation', slug: 'demo-2d-animation', program: 'program-animation', displayOrder: 4 },
];

for (const category of DEMO_CATEGORIES) {
  const existing = await client.getDocument(category.id);
  if (existing) {
    console.log(`KEEP ${category.id}: already exists`);
    continue;
  }
  await client.create({
    _id: category.id,
    _type: 'workCategory',
    name: category.name,
    slug: { _type: 'slug', current: category.slug },
    program: { _type: 'reference', _ref: category.program },
    displayOrder: category.displayOrder,
    showOnWebsite: true,
  });
  console.log(`CREATE ${category.id}`);
}

const DEMO_COMPETITIONS = [
  { id: 'demo-competition-regional-art', name: '[Demo] Regional Student Art Competition', defaultLevel: 'Regional' },
  { id: 'demo-competition-state-exhibition', name: '[Demo] State Art Exhibition', defaultLevel: 'State' },
  { id: 'demo-competition-animation-festival', name: '[Demo] Student Animation Festival', defaultLevel: 'Regional' },
];

for (const competition of DEMO_COMPETITIONS) {
  const existing = await client.getDocument(competition.id);
  if (existing) {
    console.log(`KEEP ${competition.id}: already exists`);
    continue;
  }
  await client.create({
    _id: competition.id,
    _type: 'competition',
    name: competition.name,
    defaultLevel: competition.defaultLevel,
    notes: '[Demo] Reusable competition record for demonstrating consistent award data.',
  });
  console.log(`CREATE ${competition.id}`);
}

const DEMO_STUDENTS = [
  {
    id: 'demo-student-a',
    displayName: '[Demo] Avery L.',
    status: 'Current student',
    photoAsset: 'student-portrait.svg',
  },
  {
    id: 'demo-student-b',
    displayName: '[Demo] Maya K.',
    status: 'Current student',
    photoAsset: 'art-3.svg',
  },
  {
    id: 'demo-student-c',
    displayName: '[Demo] Jordan P.',
    status: 'Current student',
    photoAsset: 'art-4.svg',
  },
];

for (const student of DEMO_STUDENTS) {
  const existing = await client.getDocument(student.id);
  if (existing) {
    console.log(`KEEP ${student.id}: already exists`);
    continue;
  }

  const photo = await uploadDemoImage(student.photoAsset);
  await client.create({
    _id: student.id,
    _type: 'student',
    displayName: student.displayName,
    permissionToPublish: true,
    photo: imageRef(photo, `${student.displayName} demo portrait placeholder`),
    photoPermissionToPublish: true,
    status: student.status,
    studioStartYear: 2024,
    bio: '[Demo] Optional approved public student note would appear here.',
  });
  console.log(`CREATE ${student.id}`);
}

const DEMO_WORKS = [
  {
    id: 'demo-work-watercolor',
    title: '[Demo] Watercolor Study',
    student: 'demo-student-a',
    program: 'program-studio-art',
    instructors: ['instructor-yolanda-liang'],
    imageAsset: 'art-1.svg',
    category: 'demo-category-watercolor',
    medium: 'Watercolor on paper',
    artworkDate: '2026-03-18',
    year: 2026,
    ageAtCompletion: 12,
    gradeAtCompletion: '6th grade',
    dimensions: { _type: 'object', width: 12, height: 16, unit: 'in' },
    featured: true,
    displayOrder: 1,
    description: '[Demo] This entry intentionally includes both optional supporting images: a student portrait and an award certificate, so you can evaluate how both appear in the detail view.',
    artistStatement: '[Demo] Optional student-written artist statement would appear here.',
    award: {
      competition: 'demo-competition-regional-art',
      awardName: '[Demo] Gold Award',
      division: 'Middle School · Watercolor',
      level: 'Regional',
      year: 2026,
      certificateAsset: 'award-certificate.svg',
    },
  },
  {
    id: 'demo-work-colored-pencil',
    title: '[Demo] Colored Pencil Study',
    student: 'demo-student-b',
    program: 'program-studio-art',
    instructors: ['instructor-yolanda-liang'],
    imageAsset: 'art-3.svg',
    category: 'demo-category-drawing',
    medium: 'Colored pencil',
    artworkDate: '2026-01-24',
    year: 2026,
    ageAtCompletion: 10,
    gradeAtCompletion: '5th grade',
    dimensions: { _type: 'object', width: 11, height: 14, unit: 'in' },
    featured: true,
    displayOrder: 2,
  },
  {
    id: 'demo-work-acrylic',
    title: '[Demo] Acrylic Painting',
    student: 'demo-student-a',
    program: 'program-studio-art',
    instructors: ['instructor-yolanda-liang'],
    imageAsset: 'art-2.svg',
    category: 'demo-category-painting',
    medium: 'Acrylic',
    artworkDate: '2025-11-08',
    year: 2025,
    ageAtCompletion: 11,
    gradeAtCompletion: '6th grade',
    dimensions: { _type: 'object', width: 16, height: 12, unit: 'in' },
    featured: true,
    displayOrder: 3,
    award: {
      competition: 'demo-competition-state-exhibition',
      awardName: '[Demo] Merit Award',
      division: 'Painting',
      level: 'State',
      year: 2025,
      certificateAsset: 'art-5.svg',
    },
  },
  {
    id: 'demo-work-animation',
    title: '[Demo] 2D Animation Short',
    student: 'demo-student-c',
    program: 'program-animation',
    instructors: ['instructor-paula-pelet-cruz'],
    imageAsset: 'art-4.svg',
    contextAsset: 'art-2.svg',
    category: 'demo-category-2d-animation',
    medium: 'Digital animation',
    artworkDate: '2026-05-02',
    year: 2026,
    ageAtCompletion: 14,
    gradeAtCompletion: '8th grade',
    featured: true,
    displayOrder: 4,
    videoUrl: 'https://www.youtube.com/',
    description: '[Demo] The thumbnail can open a hosted YouTube or Vimeo animation while the detail view keeps student and award information on the studio site.',
    contextCaption: '[Demo] Optional animation process or award photo.',
    award: {
      competition: 'demo-competition-animation-festival',
      awardName: '[Demo] Finalist',
      division: '2D Animation',
      level: 'Regional',
      year: 2026,
      certificateAsset: 'art-6.svg',
    },
  },
];

for (const work of DEMO_WORKS) {
  const existing = await client.getDocument(work.id);
  if (existing) {
    console.log(`KEEP ${work.id}: already exists`);
    continue;
  }

  const mainAsset = await uploadDemoImage(work.imageAsset);
  const contextAsset = work.contextAsset ? await uploadDemoImage(work.contextAsset) : null;
  const certificateAsset = work.award?.certificateAsset ? await uploadDemoImage(work.award.certificateAsset) : null;

  const awards = work.award
    ? [{
        _key: 'demo-award',
        _type: 'award',
        competition: { _type: 'reference', _ref: work.award.competition },
        awardName: work.award.awardName,
        featuredInGallery: true,
        division: work.award.division,
        level: work.award.level,
        year: work.award.year,
        certificateImage: certificateAsset ? imageRef(certificateAsset, `${work.award.awardName} demo certificate placeholder`) : undefined,
        certificateApprovedForPublication: Boolean(certificateAsset),
        notes: '[Demo] Optional internal/public award notes can be entered here.',
      }]
    : [];

  await client.create({
    _id: work.id,
    _type: 'artwork',
    title: work.title,
    student: { _type: 'reference', _ref: work.student },
    program: { _type: 'reference', _ref: work.program },
    instructors: work.instructors.map((ref, index) => ({ _key: `instructor-${index + 1}`, _type: 'reference', _ref: ref })),
    image: imageRef(mainAsset, `${work.title} demo artwork placeholder`),
    category: { _type: 'reference', _ref: work.category },
    medium: work.medium,
    artworkDate: work.artworkDate,
    year: work.year,
    ageAtCompletion: work.ageAtCompletion,
    showAgePublicly: true,
    gradeAtCompletion: work.gradeAtCompletion,
    showGradePublicly: true,
    dimensions: work.dimensions,
    featured: work.featured,
    displayOrder: work.displayOrder,
    description: work.description,
    artistStatement: work.artistStatement,
    videoUrl: work.videoUrl,
    studentContextImages: contextAsset ? [{ _key: 'demo-context-1', _type: 'object', image: imageRef(contextAsset, `${work.title} demo supporting image`), caption: work.contextCaption, approvedForPublication: true }] : [],
    awards,
  });
  console.log(`CREATE ${work.id}`);
}

console.log('\nDemo content seeded. Refresh the public site to see the examples.');
console.log('Everything created by this command is visibly labeled [Demo].');
console.log('When you are finished evaluating the layouts, run `npm run remove:demo`.');
