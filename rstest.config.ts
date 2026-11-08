import { defineConfig } from '@rstest/core';

export default defineConfig({
  testEnvironment: 'jsdom',
  setupFiles: ['./rstest.setup.ts'],
  resolve: {
    alias: { '@': './src' },
  },
  tools: {
    swc: {
      jsc: { transform: { react: { runtime: 'automatic' } } },
    },
    rspack: {
      optimization: { sideEffects: false },
    },
  },
});
