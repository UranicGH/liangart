import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';
import { studioStructure } from './sanity/structure';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'demo1234';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'liang-art-studio',
  title: 'Liang Art Studio',
  projectId,
  dataset,
  basePath: '/admin',
  plugins: [structureTool({ structure: studioStructure })],
  schema: { types: schemaTypes },
});
