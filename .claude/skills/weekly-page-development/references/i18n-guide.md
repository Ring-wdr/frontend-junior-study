# i18n Guide

The app uses a small typed i18n layer in `src/i18n/` (no i18next). Locales: `ko` (default) and `en`. The locale comes from the URL (`/ko/...`, `/en/...`).

## How a Page Gets Its Messages

1. The MDX frontmatter declares `namespace: weekN`.
2. `src/app/[lang]/[[...mdxPath]]/page.tsx` calls `getDictionary(lang, namespace)` on the server and passes the result to `<I18nProvider locale messages>`.
3. Client components read it with `useTranslation('weekN')`. Using a namespace the page did not load throws `i18n namespace "weekN" is not loaded.`

Only one namespace is loaded per page, so a week's components use only their own `weekN` namespace.

## Files

```
src/i18n/
├── client.tsx          # I18nProvider, useTranslation, useLocale, Trans, setFallbackI18n
├── config.ts           # locales, defaultLocale, isLocale
├── messages.ts         # Messages type: one entry per namespace (typed from ko JSON)
├── get-dictionary.ts   # server-only loaders per locale and namespace
├── types.ts            # Path / StringPath / PathValue helpers
└── dictionaries/
    ├── ko/weekN.json   # source of truth for key shape
    └── en/weekN.json   # must have the same shape
```

## Using Translations

```tsx
'use client';

import { Trans, useTranslation } from '@/i18n/client';

export const TopicSection = () => {
  const { t, raw, locale } = useTranslation('weekN');
  const steps = raw('topic.steps');

  return (
    <SectionCard
      badge={{ label: t('topic.badge'), color: 'blue' }}
      description={t('topic.description')}
      testId="topic-section"
    >
      <p>{t('topic.summary', { count: steps.length })}</p>
      <ul>
        {steps.map((step) => (
          <li key={step.title}>{step.title}</li>
        ))}
      </ul>
      <Trans t={t} i18nKey="topic.rich" components={{ code: <code /> }} />
    </SectionCard>
  );
};
```

### `t(key, values?)`

- `key` is typed: only dot paths that end at a **string** in `dictionaries/ko/weekN.json` compile (array items use numeric segments, e.g. `'topic.items.0'`).
- Interpolation uses `{{name}}` in JSON and the second argument: `t('topic.summary', { count: 3 })`.
- An unknown key at runtime returns the key itself.

### `raw(key)`

- Returns the value at any path (arrays, objects) with its JSON type, e.g. `raw('topic.steps')` is `{ title: string; desc: string }[]`.
- Do not cast the result (`as any[]`, `as string[]`) and do not use `t(key, { returnObjects: true })`; that API does not exist.
- Throws `Missing i18n key` if the path is absent.

### `Trans`

- For strings containing tags: `"Use <code>useEffect</code> for <strong>side effects</strong>."`
- `br`, `strong`, `b`, `i`, `em`, `code` render as plain HTML without configuration. Pass `components` to style them or to map custom tags: `components={{ code: <code className="..." />, hl: <span className="text-blue-600" /> }}`.
- Unknown tags without a matching component are left as literal text.
- Use `t()` for strings with no tags.

### `locale`

Use it for locale-dependent formatting (`toLocaleString(locale)`) or links (`/${locale}/week-3`). `useLocale()` returns the same value.

## Adding a New Namespace (weekN)

1. Create `src/i18n/dictionaries/ko/weekN.json` and `src/i18n/dictionaries/en/weekN.json` with identical keys.
2. In `src/i18n/messages.ts` add `weekN: typeof import('./dictionaries/ko/weekN.json');`.
3. In `src/i18n/get-dictionary.ts` add a loader under both `ko` and `en`:
   ```ts
   weekN: () => import('./dictionaries/ko/weekN.json').then((m) => m.default),
   ```
   The `loaders` object `satisfies Loaders`, so an `en` file whose shape differs from `ko` fails `bun run typecheck`.
4. In `tests/en-messages.ts` import `en/weekN.json` and add it to the exported messages so tests can render the section.
5. Set `namespace: weekN` in both MDX files.

## Key Naming

Group keys by section, then element: `eventLoop.badge`, `eventLoop.description`, `eventLoop.queue.title`. Lists that components map over should be arrays of objects read with `raw`.

The section title lives in the MDX heading, not the dictionary. A `title` key for the section is not needed.

## What Not to Translate

- Proper nouns and library names (React, Next.js, TypeScript, WCAG).
- Code inside `CodeBlock`.
- Visualizer labels may stay in English (most existing visualizers are hardcoded); if translated, use the week namespace like any section.

## Tests

`rstest.setup.ts` calls `setFallbackI18n({ locale: 'en', messages: enMessages })`, so components render English text without a provider. Assert against the strings in `dictionaries/en/weekN.json`.
