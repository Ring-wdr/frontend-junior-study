import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module '@rstest/core' {
  interface Assertion<T = unknown>
    extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
}
