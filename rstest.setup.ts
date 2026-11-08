import { expect } from '@rstest/core';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { setFallbackI18n } from './src/i18n/client';
import { enMessages } from './tests/en-messages';

expect.extend(jestDomMatchers);

setFallbackI18n({ locale: 'en', messages: enMessages });

class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

if (!('IntersectionObserver' in globalThis)) {
  Object.assign(globalThis, { IntersectionObserver: NoopObserver });
}

if (!('ResizeObserver' in globalThis)) {
  Object.assign(globalThis, { ResizeObserver: NoopObserver });
}

if (!('matchMedia' in globalThis)) {
  Object.assign(globalThis, {
    matchMedia: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      dispatchEvent: () => false,
    }),
  });
}
