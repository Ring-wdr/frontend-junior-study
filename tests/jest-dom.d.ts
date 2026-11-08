import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module '@rstest/core' {
  // biome-ignore lint/suspicious/noExplicitAny: must match the `T = any` default declared by @rstest/core
  interface Assertion<T = any> extends TestingLibraryMatchers<unknown, T> {}
}

declare global {
  namespace jest {
    // biome-ignore lint/correctness/noUnusedVariables: type parameters must match @rstest/core's JestAssertion usage
    interface Matchers<R = void, T = unknown>
      extends TestingLibraryMatchers<unknown, R> {}
  }
}
