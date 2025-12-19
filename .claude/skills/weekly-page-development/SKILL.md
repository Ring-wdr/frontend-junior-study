---
name: weekly-page-development
description: Guide for developing consistent weekly page layouts using shared components (PageLayout, SectionCard, InfoBox, DemoBox, SubSection, etc.). Use when building a new week's educational content page to maintain visual consistency, proper component usage, and design guidelines across all pages. Includes component guides, layout patterns, and design system specifications.
---

# Weekly Page Development Guide

## Overview

This skill provides comprehensive guidance for developing new weekly education pages while maintaining consistent design, component usage, and visual hierarchy. It ensures all pages follow established patterns, leverage shared components effectively, and maintain a cohesive learning experience across weeks.

## Getting Started

### Page Structure

Every weekly page follows this proven architecture:

1. **Page Wrapper** - Use `PageLayout` component for consistent header, tabs, and section rendering
2. **Sections** - Organize content into logical `SectionCard` containers
3. **Content Organization** - Use appropriate content components (InfoBox, DemoBox, SubSection) within sections
4. **Styling** - Follow design guidelines for colors, spacing, and typography

### Typical Week Page Anatomy

```typescript
// src/page/weekN/page.tsx
export const WeekPage = () => {
  return (
    <PageLayout
      title="Week N: [Topic]"
      description="[Brief description of what you'll learn]"
      tabs={['all', 'section1', 'section2']}
      sections={[
        { id: 'section1', component: <Section1 /> },
        { id: 'section2', component: <Section2 /> },
      ]}
    />
  );
};
```

Each section is a separate component file organized in `src/page/weekN/components/`.

### Section Component Pattern

```typescript
// src/page/weekN/components/[topic]-section.tsx
import { SectionCard, InfoBox, DemoBox, SubSection } from '../../../components';

export const TopicSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Topic Category', color: 'blue' }}
      title="Section Title"
      description="Brief section description"
    >
      <div className="space-y-8">
        <SubSection title="Concept 1" icon iconColor="blue">
          {/* Content here */}
        </SubSection>
        {/* More content */}
      </div>
    </SectionCard>
  );
};
```

## Common Patterns

### Info Box Pattern

Use `InfoBox` for highlighting important concepts or key takeaways:

```typescript
<InfoBox variant="blue" title="Key Concept">
  <ul className="list-disc pl-5 space-y-1 text-sm">
    <li><strong>Point 1:</strong> Description</li>
    <li><strong>Point 2:</strong> Description</li>
  </ul>
</InfoBox>
```

Available variants: `blue`, `green`, `orange`, `red`, `purple`, `gray`

### Demo Box Pattern

Use `DemoBox` to indicate interactive demonstrations:

```typescript
<DemoBox>
  <YourVisualizerComponent />
</DemoBox>
```

### Sub Section Pattern

Use `SubSection` for organizing subsections within a larger section:

```typescript
<SubSection title="Topic" icon iconColor="blue">
  <div className="grid grid-cols-1 gap-6">
    {/* Content here */}
  </div>
</SubSection>
```

Available iconColors: `purple`, `blue`, `pink`, `green`, `orange`, `red`

### Code Examples Pattern

Use `CodeBlock` for displaying code snippets:

```typescript
import { CodeBlock } from '../../../components/ui/code-block';

<CodeBlock
  code={`const example = () => {
  // code here
};`}
  className="text-xs"
/>
```

## Design Reference

See [design-guidelines.md](references/design-guidelines.md) for:
- Color palette and usage rules
- Spacing and layout metrics
- Typography system
- Visual hierarchy guidelines

## Component Reference

See [components-guide.md](references/components-guide.md) for:
- Complete component API documentation
- Props and customization options
- Real-world usage examples for each component

## Layout Patterns

See [layout-patterns.md](references/layout-patterns.md) for:
- Page structure templates
- Section organization patterns
- Badge color selection guide
- Content grid layouts
- Common section configurations

## Section Template

Use the boilerplate section template in `assets/section-template/` as a starting point when creating new sections.

---

**Pro Tips:**
- Always use the color system consistently (badge colors should align with section theme)
- Keep sections between 2-4 major subsections for better readability
- Use DemoBox for every interactive component to clearly label it as interactive
- Organize content with SubSection + grid layouts for clean visual hierarchy
