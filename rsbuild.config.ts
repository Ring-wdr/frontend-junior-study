import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginReact } from '@rsbuild/plugin-react';

const ReactCompilerConfig = {
  /* ... */
};

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [
    pluginReact(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      babelLoaderOptions(opts) {
        opts.plugins?.unshift([
          'babel-plugin-react-compiler',
          ReactCompilerConfig,
        ]);
      },
    }),
  ],
  output: {
    assetPrefix: './',
  },
  html: {
    title: 'Frontend Study | Deep JavaScript',
    favicon: './public/icon.png',
    meta: {
      description:
        'Interactive Deep JavaScript Study Materials. Visualizing Event Loop, Closures, Garbage Collection, and more.',
      'og:title': 'Frontend Study | Deep JavaScript',
      'og:description':
        'Interactive visualizers for advanced JavaScript concepts including Event Loop, Closures, and Maps/Sets.',
      'og:image': './public/og-image.png',
      'og:type': 'website',
      'twitter:card': 'summary_large_image',
      'twitter:image': './public/og-image.png',
    },
  },
});
