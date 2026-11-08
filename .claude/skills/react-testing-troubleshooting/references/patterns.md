# React Testing Patterns & Examples

Patterns for Rstest + React Testing Library tests of week section components and visualizers. Components render English via the fallback i18n set in `rstest.setup.ts`.

## Table of Contents

1. [Section Rendering](#section-rendering)
2. [Toggle and Tab Interactions](#toggle-and-tab-interactions)
3. [Code Block Content](#code-block-content)
4. [Component State Reset](#component-state-reset)
5. [Timer-Driven Flows](#timer-driven-flows)
6. [Project Setup Files](#project-setup-files)

## Section Rendering

```tsx
import { afterEach, describe, expect, it } from '@rstest/core';
import { cleanup, render, screen, within } from '@testing-library/react';
import { OptimizationSection } from '@/weeks/week1/components/optimization-section';

describe('OptimizationSection', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders badge and description from the en dictionary', () => {
    render(<OptimizationSection />);

    const section = screen.getByTestId('optimization-section');
    expect(within(section).getByText('Advanced')).toBeInTheDocument();
    expect(
      within(section).getByText(
        'Visualize how V8 optimizes objects with consistent shapes.',
      ),
    ).toBeInTheDocument();
  });

  it('renders the embedded demo', () => {
    render(<OptimizationSection />);

    const section = screen.getByTestId('optimization-section');
    expect(within(section).getByTestId('v8-good-pattern')).toBeInTheDocument();
  });
});
```

The section title ("V8 Hidden Classes") is the MDX `##` heading and is not rendered by the component; do not assert it here.

Reading expectations from the dictionary keeps tests in sync with copy changes:

```tsx
import week1 from '@/i18n/dictionaries/en/week1.json';

expect(within(section).getByText(week1.optimization.badge)).toBeInTheDocument();
```

## Toggle and Tab Interactions

```tsx
import userEvent from '@testing-library/user-event';
import week1 from '@/i18n/dictionaries/en/week1.json';

it('switches content on click', async () => {
  const user = userEvent.setup();
  render(<AdvancedDataStructureSection />);

  const section = screen.getByTestId('advanced-data-structure-section');
  await user.click(
    within(section).getByRole('button', {
      name: week1.advancedDataStructure.tabs.weak,
    }),
  );

  expect(section.textContent).toContain('WeakMap');
});
```

## Code Block Content

`CodeBlock` splits code into highlighted spans. Check text on a container:

```tsx
const section = screen.getByTestId('scope-closure-section');
expect(section.textContent).toContain('function createCounter');
```

## Component State Reset

```tsx
it('resets to the initial state', () => {
  render(<V8HiddenClassDemo />);

  fireEvent.click(screen.getByTestId('v8-good-pattern'));
  expect(screen.getAllByText('HC1')).toHaveLength(3);

  fireEvent.click(screen.getByTestId('v8-reset'));
  expect(screen.queryByText('HC1')).not.toBeInTheDocument();
});
```

## Timer-Driven Flows

```tsx
import { afterEach, expect, it, rs } from '@rstest/core';
import { act, fireEvent, render, screen } from '@testing-library/react';

afterEach(() => {
  rs.useRealTimers();
});

it('advances through phases', () => {
  rs.useFakeTimers();
  render(<ErrorClassificationVisualizer />);

  fireEvent.click(screen.getAllByRole('button')[0]);
  act(() => {
    rs.advanceTimersByTime(2500);
  });

  expect(screen.getByRole('button', { name: /reset/i })).toBeEnabled();
});
```

Without fake timers, use `await waitFor(() => ..., { timeout: 3000 })`.

## Project Setup Files

### rstest.config.ts

```ts
import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rstest/core';

export default defineConfig({
  plugins: [pluginReact()],
  testEnvironment: 'jsdom',
  setupFiles: ['./rstest.setup.ts'],
  resolve: { alias: { '@': './src' } },
});
```

### rstest.setup.ts

```ts
import { expect } from '@rstest/core';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { setFallbackI18n } from './src/i18n/client';
import { enMessages } from './tests/en-messages';

expect.extend(jestDomMatchers);

setFallbackI18n({ locale: 'en', messages: enMessages });
```

### tests/en-messages.ts

Maps every namespace to its English JSON. When adding `weekN`, import `../src/i18n/dictionaries/en/weekN.json` and add `weekN` to `enMessages`; otherwise `useTranslation('weekN')` throws in tests.

To test Korean output for one case, wrap the component in a provider:

```tsx
import { I18nProvider } from '@/i18n/client';
import week1Ko from '@/i18n/dictionaries/ko/week1.json';

render(
  <I18nProvider locale="ko" messages={{ week1: week1Ko }}>
    <OptimizationSection />
  </I18nProvider>,
);
```

## Query Patterns Reference

| Problem | Pattern |
|---------|---------|
| Text split by syntax highlighting | `container.textContent` contains, or function matcher |
| Many similar elements | `within(screen.getByTestId('x-section'))` |
| Button with icon + text | `getByRole('button', { name: /text/i })` |
| No unique accessible name | `data-testid` on the element |
| Timer-driven state | `rs.useFakeTimers()` + `act(() => rs.advanceTimersByTime(ms))` |
| Missing namespace in tests | add it to `tests/en-messages.ts` |
