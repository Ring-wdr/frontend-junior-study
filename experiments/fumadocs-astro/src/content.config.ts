import { metaLoader, pageLoader } from '@fumadocs/astro/loaders';
import { defineCollection } from 'astro:content';
import { pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'astro/zod';

export const collections = {
  docs: defineCollection({
    loader: pageLoader(),
    schema: pageSchema.extend({ namespace: z.string().optional() }),
  }),
  meta: defineCollection({ loader: metaLoader() }),
};
