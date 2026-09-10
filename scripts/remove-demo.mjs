import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2026-09-09' });

const demoWorkIds = [
  'demo-work-watercolor',
  'demo-work-colored-pencil',
  'demo-work-acrylic',
  'demo-work-animation',
];

const demoStudentIds = [
  'demo-student-a',
  'demo-student-b',
  'demo-student-c',
];

const demoCategoryIds = [
  'demo-category-watercolor',
  'demo-category-drawing',
  'demo-category-painting',
  'demo-category-2d-animation',
];

const demoCompetitionIds = [
  'demo-competition-regional-art',
  'demo-competition-state-exhibition',
  'demo-competition-animation-festival',
];

const demoDocumentIds = [...demoWorkIds, ...demoStudentIds, ...demoCategoryIds, ...demoCompetitionIds];

function collectAssetRefs(value, refs = new Set()) {
  if (!value || typeof value !== 'object') return refs;
  if (typeof value._ref === 'string' && value._ref.startsWith('image-')) refs.add(value._ref);
  if (Array.isArray(value)) {
    value.forEach((item) => collectAssetRefs(item, refs));
  } else {
    Object.values(value).forEach((item) => collectAssetRefs(item, refs));
  }
  return refs;
}

const documents = await client.getDocuments(demoDocumentIds);
const assetRefs = new Set();
documents.filter(Boolean).forEach((document) => collectAssetRefs(document, assetRefs));

let deletedDocuments = 0;
for (const id of [...demoWorkIds, ...demoStudentIds, ...demoCategoryIds, ...demoCompetitionIds]) {
  const existing = await client.getDocument(id);
  if (!existing) {
    console.log(`SKIP ${id}: not found`);
    continue;
  }
  await client.delete(id);
  deletedDocuments += 1;
  console.log(`DELETE ${id}`);
}

let deletedAssets = 0;
for (const assetId of assetRefs) {
  try {
    await client.delete(assetId);
    deletedAssets += 1;
    console.log(`DELETE ${assetId}`);
  } catch (error) {
    console.warn(`KEEP ${assetId}: still referenced or could not be deleted`);
    if (error?.message) console.warn(`  ${error.message}`);
  }
}

console.log(`\nRemoved ${deletedDocuments} demo documents and ${deletedAssets} unreferenced demo assets.`);
console.log('Core studio records, real competitions, real students, real work, tuition, FAQs, and settings were not touched.');
