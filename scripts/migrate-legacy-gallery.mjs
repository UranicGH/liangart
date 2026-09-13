import fs from 'node:fs/promises';
import path from 'node:path';
import { getCliClient } from 'sanity/cli';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const positional = args.filter((arg) => !arg.startsWith('--'));
const legacyRoot = positional[0] ? path.resolve(positional[0]) : path.resolve('legacy');
const indexPath = path.join(legacyRoot, 'index.html');
const html = await fs.readFile(indexPath, 'utf8');
const matches = [...html.matchAll(/(?:src|href)=["']images\/([^"']+\.(?:jpe?g|png|webp))["']/gi)].map((match) => match[1]);
const filenames = [...new Set(matches)];

if (!filenames.length) {
  console.error(`No gallery images found in ${indexPath}`);
  process.exit(1);
}

let present = 0;
let missing = 0;
for (const filename of filenames) {
  try { await fs.access(path.join(legacyRoot, 'images', filename)); present += 1; }
  catch { missing += 1; }
}

console.log(`Found ${filenames.length} unique legacy gallery image references.`);
console.log(`Files present: ${present}; missing: ${missing}.`);
if (dryRun) {
  console.log('Dry run only: nothing was uploaded or changed.');
  process.exit(missing ? 2 : 0);
}

const client = getCliClient({ apiVersion: '2026-09-09' });
console.log('They will be created as DRAFT Studio Art documents so an administrator can add information over time before publishing.\n');

for (let i = 0; i < filenames.length; i += 1) {
  const filename = filenames[i];
  const filePath = path.join(legacyRoot, 'images', filename);
  try {
    await fs.access(filePath);
  } catch {
    console.warn(`SKIP ${filename}: file not found`);
    continue;
  }

  const safeId = filename.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const documentId = `drafts.legacy-${safeId}`;
  const existing = await client.getDocument(documentId);
  if (existing) {
    console.log(`SKIP ${filename}: draft already exists`);
    continue;
  }

  const file = await fs.open(filePath, 'r');
  try {
    const asset = await client.assets.upload('image', file.createReadStream(), { filename });
    await client.create({
      _id: documentId,
      _type: 'artwork',
      title: `[Draft] Untitled — ${filename}`,
      program: { _type: 'reference', _ref: 'program-studio-art' },
      image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
      featured: false,
      legacyFilename: filename,
    });
    console.log(`[${i + 1}/${filenames.length}] uploaded ${filename}`);
  } finally {
    await file.close();
  }
}

console.log('\nMigration complete. Open /admin, add the student/category/title metadata, confirm publication permission, and publish each reviewed artwork.');
