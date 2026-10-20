import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { postSchema } from './models/post';
import { marginaliaSchema } from './models/marginalia';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog/' }),
  schema: postSchema,
});

const marginalia = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/marginalia/' }),
  schema: marginaliaSchema,
});

export const collections = { blog, marginalia };
