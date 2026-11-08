---
name: react-testing-troubleshooting
description: Guide for fixing React Testing Library failures in this project's Rstest (jsdom) component tests for week sections and visualizers. Use when tests fail due to DOM query problems, text split by syntax highlighting, motion/react animation styles, i18n text or missing namespaces, async timers, or test pollution. Covers rs.mock for motion/react, English fallback i18n, scoped within() queries, and data-testid setup.
---

# React Testing Troubleshooting

## Setup in This Project

- Runner: Rstest (`rstest.config.ts`, `testEnvironment: 'jsdom'`, alias `@` -> `./src`).
- Run: `bun run test` (all), `bun run test tests/week1` (a path), `bun run test:watch`.
- Imports: `import { afterEach, describe, expect, it, rs, test } from '@rstest/core';` (not `jest` / `vi`).
- Tests live in `tests/weekN/**/*.test.tsx` or next to the component (`src/weeks/weekN/components/*.test.tsx`).
- `rstest.setup.ts` extends jest-dom matchers and calls `setFallbackI18n({ locale: 'en', messages: enMessages })` from `tests/en-messages.ts`. Components render **English** text without an `I18nProvider`.
- Week components are `'use client'` React components; render them directly. The MDX page, Nextra layout, and section `h2` headings are not part of a component test.

## Common Issues

### 1. Section title not found

`SectionCard` has no `title` prop: the title is the `##` heading in the MDX file. A test like `getByText('V8 Hidden Classes')` against a section component fails unless the component itself renders that text. Assert on the badge, description, `SubSection` titles (`h3`), or content instead:

```tsx
const section = screen.getByTestId('optimization-section');
expect(within(section).getByText('Advanced')).toBeInTheDocument();
expect(within(section).getByRole('heading', { level: 3, name: /Key Takeaway/i })).toBeInTheDocument();
```

### 2. i18n errors or Korean/key text

- `i18n namespace "weekN" is not loaded.` - the namespace is missing from `tests/en-messages.ts`. Import `src/i18n/dictionaries/en/weekN.json` there and add it to `enMessages`.
- The rendered text is a raw key (`topic.badge`) - the key is missing in `en/weekN.json`. `t()` returns the key for unknown paths.
- `Missing i18n key "weekN:..."` - `raw()` path does not exist in the English dictionary.
- Expected strings come from `src/i18n/dictionaries/en/weekN.json`, not ko.

### 3. Syntax-highlighted code split across nodes

`CodeBlock` (react-syntax-highlighter) splits code into many `<span>`s, so `getByText('const foo = "bar"')` fails. Match on the container's text:

```tsx
const section = screen.getByTestId('topic-section');
expect(section.textContent).toContain('const foo');
```

or a function matcher: `getByText((_, el) => el?.tagName === 'CODE' && !!el.textContent?.includes('foo'))`.

### 4. motion/react styles or exit animations

Components import `motion/react`, which re-exports `framer-motion`. Usually no mock is needed. If inline animation styles (`opacity: 0`, transforms) or `AnimatePresence` exits get in the way, mock the module the component imports:

```tsx
import type { ComponentProps, ReactNode } from 'react';

rs.mock('motion/react', async () => {
  const actual = await rs.importActual<typeof import('motion/react')>('motion/react');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }: ComponentProps<'div'>) => {
        // biome-ignore lint: drop animation styles
        const { style, ...divProps } = props;
        return <div {...divProps}>{children}</div>;
      },
    },
  };
});
```

Older tests mock `'framer-motion'` with the same shape; prefer `'motion/react'` for new tests. Elements using `whileInView` stay at their `initial` state in jsdom (nothing scrolls into view); assert on presence and text, not on visibility styles.

### 5. Unscoped queries matching too much

Scope to the section's `testId`:

```tsx
const section = screen.getByTestId('async-section');
within(section).getAllByRole('button');
```

Give every `SectionCard` a `testId`, and add `data-testid` to visualizer controls that have no unique accessible name.

### 6. Test pollution

```tsx
afterEach(() => {
  cleanup();
  rs.clearAllMocks();
});
```

Restore real timers in `afterEach` if a test used fake timers (`rs.useRealTimers()`).

### 7. Timers and async steps

For `setTimeout`/`setInterval`-driven visualizers use fake timers, or `waitFor` with a longer timeout:

```tsx
rs.useFakeTimers();
fireEvent.click(screen.getByRole('button', { name: /run/i }));
act(() => {
  rs.advanceTimersByTime(2000);
});
expect(screen.getByText(/done/i)).toBeInTheDocument();
```

### 8. Button names split by markup

`<button><Play /> Run</button>` still has the accessible name `Run`; prefer `getByRole('button', { name: /run/i })`. For names built from several nodes, fall back to `getAllByRole('button').find((b) => b.textContent?.includes('...'))`.

### 9. Browser APIs missing in jsdom

`matchMedia`, `ResizeObserver`, `IntersectionObserver`, canvas, and WebGL are absent or partial. Stub them in the test file (`rs.stubGlobal('ResizeObserver', class { observe() {} unobserve() {} disconnect() {} })`) rather than changing the component. Components must not touch these during render anyway (pages are statically prerendered).

## More Patterns

See [references/patterns.md](references/patterns.md) for full examples: section rendering, tabs/toggles, state reset, timer-driven flows, and the project's test setup files.

## Checklist

1. Import test APIs from `@rstest/core`; use `rs.*` for mocks and timers.
2. New namespace added to `tests/en-messages.ts`; expectations use English strings.
3. Query inside `within(screen.getByTestId('...-section'))`.
4. Do not assert the MDX section title from a component test.
5. `cleanup()` in `afterEach`.
