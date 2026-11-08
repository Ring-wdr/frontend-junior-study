---
name: weekly-page-development
description: Guide for building a week's educational page in the Next.js 16 + Nextra 4 docs site - an MDX page per locale (src/content/{ko,en}/week-N.mdx) whose sections are client components (SectionCard, SubSection, InfoBox, DemoBox, CodeBlock) with typed i18n and interactive motion/react visualizers. Use when adding or changing a week page, its section components, dictionaries, sidebar entries, or visualizers.
---

# Weekly Page Development Guide

The site is a Nextra 4 docs-theme app (Next.js 16, static export). A week page is an **MDX file per locale**; Nextra renders the page title, sidebar, and table of contents. Each `##` heading in the MDX is followed by one section component that renders the body.

There is no `page.tsx`, tab bar, or `PageLayout` per week anymore.

## Files for Week N

```
src/content/ko/week-N.mdx          # Korean page
src/content/en/week-N.mdx          # English page
src/content/{ko,en}/_meta.ts        # sidebar label: 'week-N': "Week N · Topic"
src/content/{ko,en}/index.mdx       # home page WeekCard entry
src/weeks/weekN/components/*.tsx    # section + visualizer components ('use client')
src/i18n/dictionaries/{ko,en}/weekN.json
src/i18n/messages.ts                # add weekN type
src/i18n/get-dictionary.ts          # add ko and en loaders
tests/en-messages.ts                # add en weekN for tests
```

## MDX Page

```mdx
---
title: "Topic Title"
description: "One-line summary of the week."
namespace: weekN
---

import { FirstSection } from '@/weeks/weekN/components/first-section';
import { SecondSection } from '@/weeks/weekN/components/second-section';

# Topic Title

One-line summary of the week.

## Localized Section Title [#first]

<FirstSection />

## Localized Section Title [#second]

<SecondSection />
```

- `namespace` names the dictionary that `src/app/[lang]/[[...mdxPath]]/page.tsx` loads into `I18nProvider`. Without it, `useTranslation('weekN')` throws.
- `## Title [#slug]` sets a stable anchor that is the same in both locales. Write the heading text in the page's language; it is the section title (feeds the TOC).
- The ko and en files have the same imports, slugs, and section order. Only the text differs.
- Home page: add `<WeekCard week={N} href="/ko/week-N" badge="N주차" title="..." description="..." />` inside `<WeekGrid>` in `src/content/ko/index.mdx` (and `/en/week-N` with "Week N" in the en file).

## Section Component

```tsx
'use client';

import { useTranslation } from '@/i18n/client';
import { DemoBox, InfoBox, SectionCard, SubSection } from '../../../components';
import { TopicVisualizer } from './topic-visualizer';

export const TopicSection = () => {
  const { t } = useTranslation('weekN');

  return (
    <SectionCard
      badge={{ label: t('topic.badge'), color: 'blue' }}
      description={t('topic.description')}
      testId="topic-section"
    >
      <div className="space-y-8">
        <SubSection title={t('topic.concept.title')} icon iconColor="blue">
          <p className="text-sm text-gray-700">{t('topic.concept.body')}</p>
        </SubSection>
        <SubSection title={t('topic.demo.title')} icon iconColor="blue">
          <DemoBox>
            <TopicVisualizer />
          </DemoBox>
        </SubSection>
        <InfoBox variant="blue" title={t('topic.note.title')}>
          {t('topic.note.body')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};
```

- Every component in `src/weeks/weekN/components/` starts with `'use client'`.
- `SectionCard` takes `badge`, `description`, `children`, `testId`. It has **no `title` prop**: the MDX `##` heading is the title. Do not repeat it inside the component.
- `SubSection` renders an `h3`; `InfoBox` titles render `h4`.
- Shared components: `src/components/*.tsx` (barrel `src/components/index.ts`); `Badge` and `CodeBlock` live in `src/components/ui/`.

## i18n in One Glance

```tsx
const { t, raw, locale } = useTranslation('weekN');
t('topic.badge');                       // string leaves only, typed from ko/weekN.json
t('topic.count', { count: 3 });         // "{{count}} items"
const steps = raw('topic.steps');       // typed array/object, no casts
<Trans t={t} i18nKey="topic.rich" components={{ code: <code /> }} />
```

Full workflow and new-namespace registration: [references/i18n-guide.md](references/i18n-guide.md).

## Animation and Rendering Rules

- Use `motion/react` (not `framer-motion`). The app is wrapped in `MotionConfig reducedMotion="user"` (`src/components/motion-provider.tsx`), so do not re-implement reduced-motion handling.
- Entrance animations: `initial` + `whileInView` + `viewport={{ once: true }}`. Do not animate entrances with `animate` on mount.
- The docs content column is narrow (about 343px on phones). Use relative distances (`%`, small `y` offsets, `x: '100%'`) and `flex-wrap`, never fixed pixel travel that assumes a wide page.
- GSAP: create tweens inside `gsap.context(() => { ... }, scopeRef)` in `useEffect`/`useLayoutEffect` and return `() => ctx.revert()`.
- Pages are prerendered statically: no `window`, `document`, `localStorage`, or `matchMedia` during render. Access them in effects or event handlers.

## References

- [components-guide.md](references/components-guide.md) - shared component APIs
- [layout-patterns.md](references/layout-patterns.md) - MDX structure, section patterns, badge colors, spacing
- [design-guidelines.md](references/design-guidelines.md) - colors, typography, accessibility
- [i18n-guide.md](references/i18n-guide.md) - typed dictionaries, `t`/`raw`/`Trans`, adding a namespace
- [visualizer-guide.md](references/visualizer-guide.md) - interactive visualizer patterns
- `assets/section-template/` - starter section components (basic, multiple subsections, comparison). Copy into `src/weeks/weekN/components/`, then replace `'weekN'`, the keys, and the visualizer imports with real ones (keys are type-checked against the ko dictionary).

## Checklist

1. MDX in both locales with `namespace: weekN`, matching slugs and imports.
2. Sidebar label in both `_meta.ts`; WeekCard in both `index.mdx`.
3. Dictionaries in `ko` and `en` with identical shape; registered in `messages.ts`, `get-dictionary.ts`, `tests/en-messages.ts`.
4. Components have `'use client'`, no `title` on `SectionCard`, a `testId` per section.
5. Verify: `bun run typecheck`, `bun run lint`, `bun run test`, then `bun run dev` (or `bun run build` + `bun run preview` for the static export).
