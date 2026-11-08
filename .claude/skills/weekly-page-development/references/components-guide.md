# Components Guide

Shared components for week sections. Import from `'../../../components'` (barrel `src/components/index.ts`) inside `src/weeks/weekN/components/`, or with the `@/components/...` alias.

| Component | File | Renders |
|-----------|------|---------|
| SectionCard | `src/components/section-card.tsx` | section wrapper (badge + description + body) |
| SubSection | `src/components/sub-section.tsx` | `h3` + content |
| InfoBox | `src/components/info-box.tsx` | colored callout, `h4` title |
| DemoBox | `src/components/demo-box.tsx` | labeled container for interactive demos |
| ContentGrid | `src/components/content-grid.tsx` | title/description grid |
| SectionDivider | `src/components/section-divider.tsx` | line or spacer |
| CodeBlock | `src/components/ui/code-block.tsx` | syntax-highlighted code |
| Badge | `src/components/ui/badge.tsx` | colored pill (used by SectionCard) |
| WeekCard / WeekGrid | `src/components/week-card.tsx` | home page week links (MDX only) |

Page title, sidebar, TOC, and section `h2` headings come from Nextra and the MDX file, not from components.

## SectionCard

Wrapper for the body of one `## Heading [#slug]` in the MDX.

```ts
interface SectionCardProps {
  badge?: { label: string; color?: BadgeColor; className?: string };
  description?: string;
  children: ReactNode;
  testId?: string; // set on the root as data-testid
}
```

- No `title` prop. The MDX heading directly above `<XxxSection />` is the title.
- `BadgeColor`: `blue`, `purple`, `green`, `orange`, `pink`, `indigo`, `teal`, `red`, `gray`.
- It is a plain block (`mt-4`), not a bordered card; the docs column supplies the page frame.

```tsx
<SectionCard
  badge={{ label: t('patterns.badge'), color: 'purple' }}
  description={t('patterns.description')}
  testId="patterns-section"
>
  {/* body */}
</SectionCard>
```

## SubSection

```ts
interface SubSectionProps {
  title: string;
  icon?: boolean;          // colored dot before the title
  iconColor?: 'purple' | 'blue' | 'pink' | 'green' | 'orange' | 'red'; // default purple
  children: ReactNode;
  className?: string;
  divider?: boolean;       // <hr> above the section
}
```

Renders `<section><h3>title</h3>{children}</section>`. Use it for subtopics inside a SectionCard so the heading order is h2 (MDX) then h3.

## InfoBox

```ts
interface InfoBoxProps {
  variant?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'gray'; // default blue
  title?: string;   // rendered as h4
  children: ReactNode;
  className?: string;
}
```

Variant meaning: blue = information, green = tips/best practice, orange = important note, red = pitfall, purple = theory/advanced, gray = neutral.

## DemoBox

```ts
interface DemoBoxProps {
  children: ReactNode;
  label?: string; // default 'Interactive Demo'
}
```

Wrap every interactive or animated component in a DemoBox. It has `overflow-hidden`, so content wider than the column is clipped rather than scrolling the page.

## ContentGrid

```ts
interface ContentGridProps {
  items: { title: string; description: string }[];
  columns?: 'auto' | 1 | 2; // 'auto' and 2: 1 column on mobile, 2 from md
  className?: string;
}
```

Pair with `raw('topic.items')` when the items come from the dictionary.

## SectionDivider

`variant?: 'line' | 'spacing'` (default `line`), `className?`. Use between SubSections when `space-y-*` alone is not enough.

## CodeBlock

```ts
interface CodeBlockProps {
  code: string;
  language?: string;        // default 'javascript'
  className?: string;
  showLineNumbers?: boolean;
}
```

Uses react-syntax-highlighter (Prism, vscDarkPlus). It is `not-prose` and scrolls horizontally, so long lines do not widen the column. Do not translate code.

## WeekCard / WeekGrid

Used only in `src/content/{ko,en}/index.mdx`:

```mdx
<WeekGrid>
  <WeekCard week={N} href="/en/week-N" badge="Week N" title="Topic" description="Summary." />
</WeekGrid>
```

`href` includes the locale prefix.

## Typical Composition

```tsx
<SectionCard badge={{ label: t('x.badge'), color: 'blue' }} description={t('x.description')} testId="x-section">
  <div className="space-y-8">
    <SubSection title={t('x.concept.title')} icon iconColor="blue">
      <p className="text-sm text-gray-700">{t('x.concept.body')}</p>
    </SubSection>
    <SubSection title={t('x.demo.title')} icon iconColor="blue">
      <DemoBox>
        <XVisualizer />
      </DemoBox>
    </SubSection>
    <SubSection title={t('x.code.title')} icon iconColor="purple">
      <CodeBlock code={X_CODE} language="tsx" className="text-xs" />
    </SubSection>
    <InfoBox variant="green" title={t('x.tip.title')}>
      {t('x.tip.body')}
    </InfoBox>
  </div>
</SectionCard>
```
