import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const projectId = env.PUBLIC_SANITY_PROJECT_ID || 'demo1234';
  const dataset = env.PUBLIC_SANITY_DATASET || 'production';

  return {
    site: 'https://liangartstudio.com',
    output: 'static',
    integrations: [
      sanity({
        projectId,
        dataset,
        apiVersion: '2026-09-09',
        useCdn: false,
        studioBasePath: '/admin',
        // Hash routing avoids static-host refresh 404s under /admin.
        studioRouterHistory: 'hash',
      }),
      react(),
    ],
  };
});
