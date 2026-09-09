import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
export const sanityConfigured = Boolean(projectId);

export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2026-09-09',
      useCdn: false,
    })
  : null;

const builder = sanityConfigured && client ? createImageUrlBuilder(client) : null;

export function sanityImageUrl(source: unknown, width = 1200) {
  if (!builder || !source) return '';
  return builder.image(source).width(width).fit('max').auto('format').url();
}
