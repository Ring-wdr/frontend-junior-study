# Layout Patterns Guide

## Page Structure

A week page is `src/content/{ko,en}/week-N.mdx`. Nextra's docs theme supplies the sidebar (`_meta.ts`), the `h1` styling, the table of contents, and the prev/next links. The MDX supplies, in order:

1. Frontmatter: `title`, `description`, `namespace: weekN`
2. Imports of each section component from `'@/weeks/weekN/components/xxx-section'`
3. `# Title` and an intro paragraph (usually the description)
4. Per section: `## Localized Title [#slug]` then `<XxxSection />`

```mdx
## Event Loop Visualizer [#event-loop]

<EventLoopSection />
```

Keep slugs kebab-case, identical across locales, and stable (they are link targets). Put prose that needs translation in the dictionary and render it from the component; keep the MDX to headings and component tags.

## File Organization

```
src/content/ko/week-N.mdx
src/content/en/week-N.mdx
src/weeks/weekN/
├── README.md                    # optional week notes
└── components/
    ├── topic-section.tsx        # rendered under one MDX heading
    ├── topic-visualizer.tsx     # interactive demo used by the section
    └── ...
```

- Section files: `[topic]-section.tsx`, export `TopicSection`.
- Visualizer files: `[concept]-visualizer.tsx` (or `-demo.tsx`).
- All files kebab-case and start with `'use client'`.

## Section Patterns

The MDX heading is the section title, so a section component starts with the badge/description and goes straight to content.

### Pattern 1: Single Concept

```tsx
<SectionCard badge={{ label: t('a.badge'), color: 'blue' }} description={t('a.description')} testId="a-section">
  <div className="space-y-8">
    <p className="text-sm text-gray-700">{t('a.intro')}</p>
    <DemoBox>
      <AVisualizer />
    </DemoBox>
    <InfoBox variant="blue" title={t('a.keyPoints.title')}>
      <ul className="list-disc space-y-1 pl-5">
        {raw('a.keyPoints.items').map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </InfoBox>
    <CodeBlock code={A_CODE} language="ts" className="text-xs" />
  </div>
</SectionCard>
```

### Pattern 2: Multiple Related Concepts

One `SubSection` (h3) per concept, optionally separated by `<SectionDivider />`. Keep 2-4 subsections per section. If a section grows beyond that, split it into two MDX headings and two components.

### Pattern 3: Comparison

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <div className="min-w-0">{/* approach A + CodeBlock */}</div>
  <div className="min-w-0">{/* approach B + CodeBlock */}</div>
</div>
<InfoBox variant="orange" title={t('cmp.when.title')}>...</InfoBox>
```

Add `min-w-0` to grid/flex children that contain a `CodeBlock`, so the code scrolls instead of widening the column.

### Pattern 4: Theory, Demo, Code

`SubSection` (concept) -> `SubSection` + `DemoBox` (visualizer) -> `SubSection` + `CodeBlock` (implementation) -> `InfoBox` (takeaway). Place the visualizer after the explanation and before the code.

## Badge Color Strategy

- **blue** core concepts, fundamentals
- **purple** patterns, architecture, advanced
- **green** best practices, optimization
- **orange** important notes, warnings
- **pink** specialized or creative patterns
- **indigo** structure, composition
- **teal** tools, utilities
- **red** pitfalls, security
- **gray** neutral

Keep a week's badges within one or two families and match `SubSection` `iconColor` to the badge.

## Spacing

- Inside SectionCard: `space-y-8` between blocks, `space-y-4`/`space-y-6` inside subsections.
- Grids: `gap-3 sm:gap-4` (mobile) to `gap-6` (wide).
- Spacing between sections comes from the MDX headings; do not add outer margins.

## Narrow Column and Mobile

The docs layout puts content in a column beside the sidebar and TOC. On a phone it is about 343px wide; on desktop it is still narrower than a full page.

- Default to one column; use `md:grid-cols-2` at most. Avoid `grid-cols-3`+ unless items are tiny.
- Use `flex-wrap` for button groups and badges.
- No fixed widths wider than ~320px; prefer `w-full`, `max-w-full`, percentages.
- Animate with relative offsets (`x: '100%'`, `y: 8`), not large pixel distances.
- Check every section at 343px before finishing.
