// @ts-check
import { fileURLToPath } from 'node:url';
import fumadocs from '@fumadocs/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const noExternal = ['react-syntax-highlighter'];
const repoSrc = fileURLToPath(new URL('../../src', import.meta.url));

export default defineConfig({
  output: 'static',
  integrations: [fumadocs({ components: './src/components/mdx.tsx' })],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { '@': repoSrc },
      dedupe: ['react', 'react-dom', 'lucide-react'],
    },
    ssr: {
      noExternal,
    },
    environments: {
      ssr: { optimizeDeps: { include: noExternal } },
      prerender: { resolve: { noExternal } },
    },
  },
});
