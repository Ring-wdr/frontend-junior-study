import type { NextConfig } from 'next';
import nextra from 'nextra';
import { defaultLocale, locales } from './src/i18n/config';

const withNextra = nextra({
  contentDirBasePath: '/',
  defaultShowCopyCode: true,
  unstable_shouldAddLocaleToLinks: true,
});

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/frontend-junior-study',
  trailingSlash: true,
  images: { unoptimized: true },
  reactCompiler: true,
  i18n: {
    locales: [...locales],
    defaultLocale,
  },
};

export default withNextra(nextConfig);
