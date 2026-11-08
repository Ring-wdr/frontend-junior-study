import { toFumadocsSource } from '@fumadocs/astro/source';
import { getCollection } from 'astro:content';
import { loader } from 'fumadocs-core/source';
import { i18n } from '~/lib/i18n';

export const source = loader({
  source: toFumadocsSource(
    await getCollection('docs'),
    await getCollection('meta'),
  ),
  baseUrl: '/docs',
  i18n,
});
