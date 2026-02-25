# Layout Patterns Guide

Common patterns and templates for organizing content in weekly pages.

## Table of Contents
1. [Page Structure Template](#page-structure-template)
2. [Section Organization Patterns](#section-organization-patterns)
3. [Badge Color Strategy](#badge-color-strategy)
4. [Content Grid Layouts](#content-grid-layouts)
5. [Common Section Types](#common-section-types) (including Type 6: Section with Interactive Visualizer)

---

## Page Structure Template

### Basic Page Template
```typescript
// src/page/weekN/page.tsx
import { PageLayout } from '../../../components';
import { Section1 } from './components/section1';
import { Section2 } from './components/section2';
import { Section3 } from './components/section3';

export const WeekNPage = () => {
  return (
    <PageLayout
      title="Week N: [Main Topic]"
      description="Brief description of what you'll learn this week"
      tabs={['all', 'section1', 'section2', 'section3']}
      sections={[
        { id: 'section1', component: <Section1 /> },
        { id: 'section2', component: <Section2 /> },
        { id: 'section3', component: <Section3 /> },
      ]}
      tabLabelMap={{
        section1: 'Topic 1',
        section2: 'Topic 2',
        section3: 'Topic 3',
      }}
    />
  );
};
```

### File Organization
```
src/page/weekN/
├── page.tsx                     # Main page component
├── README.md                    # Week notes and reference
└── components/
    ├── section1-section.tsx      # Section component (static content + visualizer embed)
    ├── section1-visualizer.tsx   # Interactive visualizer for section1
    ├── section2-section.tsx
    ├── section2-visualizer.tsx   # Interactive visualizer for section2
    ├── section3-section.tsx
    ├── section3-visualizer.tsx   # Interactive visualizer for section3
    └── [shared helpers]
```

**Naming Convention:**
- Section files: `[topic]-section.tsx`
- Visualizer files: `[concept]-visualizer.tsx`
- Each section has a paired visualizer file (1:1 mapping)

---

## Section Organization Patterns

### Pattern 1: Single Concept Section
Best for explaining one core concept with visual aids.

```typescript
<SectionCard
  badge={{ label: 'Core Concept', color: 'blue' }}
  title="Concept Name"
  description="What this concept does"
>
  <div className="space-y-8">
    <p className="text-sm text-gray-700">
      Introduction and overview of the concept.
    </p>

    <DemoBox>
      <ConceptVisualizer />
    </DemoBox>

    <InfoBox variant="blue" title="Key Points">
      <ul className="list-disc pl-5 space-y-1 text-sm">
        <li><strong>Point 1:</strong> Details</li>
        <li><strong>Point 2:</strong> Details</li>
      </ul>
    </InfoBox>

    <CodeBlock
      code={`// Real-world example`}
      className="text-xs"
    />
  </div>
</SectionCard>
```

### Pattern 2: Multiple Related Concepts
Best for categorizing several related topics.

```typescript
<SectionCard
  badge={{ label: 'Category', color: 'purple' }}
  title="Related Concepts"
  description="Multiple aspects of a topic"
>
  <div className="space-y-8">
    <SubSection title="Concept A" icon iconColor="purple">
      <div className="grid grid-cols-1 gap-6">
        <p className="text-sm text-gray-700">Explanation of A</p>
        <DemoBox><VisualizerA /></DemoBox>
      </div>
    </SubSection>

    <SectionDivider variant="line" />

    <SubSection title="Concept B" icon iconColor="blue">
      <div className="grid grid-cols-1 gap-6">
        <p className="text-sm text-gray-700">Explanation of B</p>
        <DemoBox><VisualizerB /></DemoBox>
      </div>
    </SubSection>
  </div>
</SectionCard>
```

### Pattern 3: Comparison/Contrast
Best for showing differences between approaches.

```typescript
<SectionCard
  badge={{ label: 'Comparison', color: 'green' }}
  title="Approaches Compared"
  description="Compare different solutions"
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h4 className="font-semibold mb-2">Approach A</h4>
      <p className="text-sm text-gray-700 mb-3">Description</p>
      <CodeBlock code={`// approach A code`} className="text-xs" />
    </div>
    <div>
      <h4 className="font-semibold mb-2">Approach B</h4>
      <p className="text-sm text-gray-700 mb-3">Description</p>
      <CodeBlock code={`// approach B code`} className="text-xs" />
    </div>
  </div>

  <InfoBox variant="orange" title="When to Use Each">
    <ul className="space-y-1 text-sm">
      <li><strong>Approach A:</strong> Best for situations X, Y, Z</li>
      <li><strong>Approach B:</strong> Better for scenarios A, B, C</li>
    </ul>
  </InfoBox>
</SectionCard>
```

### Pattern 4: Theory + Implementation
Best for concept-driven sections with code examples.

```typescript
<SectionCard
  badge={{ label: 'Implementation', color: 'indigo' }}
  title="Theory and Practice"
  description="Concept and real-world implementation"
>
  <div className="space-y-8">
    <SubSection title="The Concept" icon iconColor="indigo">
      <InfoBox variant="indigo" title="Definition">
        Detailed explanation of what this is
      </InfoBox>
    </SubSection>

    <SubSection title="Implementation" icon iconColor="purple">
      <div className="space-y-4">
        <CodeBlock code={`// Step 1: Setup`} className="text-xs" />
        <CodeBlock code={`// Step 2: Execute`} className="text-xs" />
        <CodeBlock code={`// Step 3: Verify`} className="text-xs" />
      </div>
    </SubSection>

    <SubSection title="Live Example" icon iconColor="pink">
      <DemoBox><WorkingExample /></DemoBox>
    </SubSection>
  </div>
</SectionCard>
```

---

## Badge Color Strategy

Choose badge colors to create visual coherence with content type and section theme:

### Color Meanings
- **Blue** - Core concepts, fundamentals, theory
- **Purple** - Design patterns, architecture, advanced concepts
- **Green** - Best practices, tips, optimization
- **Orange** - Important notes, warnings, critical concepts
- **Pink** - Creative patterns, specialized implementations
- **Indigo** - Structure, composition, architectural patterns
- **Teal** - Tools, utilities, practical implementations

### Weekly Theme Colors
- **Week 1** - Blue/Green (JavaScript fundamentals, best practices)
- **Week 2** - Purple/Indigo (Design patterns, OOP)
- **Week 3** - Blue/Pink (React patterns, component architecture)
- **Week 4+** - Match content topic

### Consistent Color Usage Within a Week
- Keep all section badges in the same color family
- Use different badge colors for different section categories
- Match icon colors to badge colors when possible

---

## Content Grid Layouts

### 2-Column Grid (Desktop, 1 Column Mobile)
```typescript
<ContentGrid
  columns="auto"
  items={[
    { title: 'Item 1', description: 'Details about item 1' },
    { title: 'Item 2', description: 'Details about item 2' },
    { title: 'Item 3', description: 'Details about item 3' },
    { title: 'Item 4', description: 'Details about item 4' },
  ]}
/>
```

### Full Width Single Column
```typescript
<ContentGrid
  columns={1}
  items={[
    { title: 'Item 1', description: 'Full width content' },
    { title: 'Item 2', description: 'Full width content' },
  ]}
/>
```

### Always 2 Columns
```typescript
<ContentGrid
  columns={2}
  items={[
    { title: 'Left', description: 'Left side content' },
    { title: 'Right', description: 'Right side content' },
  ]}
/>
```

---

## Common Section Types

### Type 1: Concept with Visualizer
**Use When:** Teaching a single concept with interactive visualization

**Structure:**
- Brief intro text
- Interactive demo (DemoBox)
- Key points (InfoBox)
- Code example (CodeBlock)

**Badge Color:** Blue or Purple
**Icon Color:** Match badge color

### Type 2: Design Pattern Section
**Use When:** Explaining a reusable pattern or approach

**Structure:**
- Pattern overview
- Multiple subsections (one per pattern)
  - Definition
  - Visualizer
  - Code example
  - Use cases (InfoBox)

**Badge Color:** Purple
**Icon Color:** Purple + secondary color for variations

### Type 3: Comparison Section
**Use When:** Showing pros/cons of different approaches

**Structure:**
- Grid with approach columns
- Each column:
  - Name/title
  - Description
  - Code example
  - Pros/cons
- Summary comparison (InfoBox)

**Badge Color:** Green or Orange
**Icon Color:** Match badge color

### Type 4: Complex Topic Section
**Use When:** Breaking down a complex topic into subtopics

**Structure:**
- Intro paragraph
- Multiple SubSections with dividers
- Each subsection:
  - Definition/explanation
  - Code or visualization
  - Related concepts (InfoBox)
  - Links to deeper content (CodeBlock reference)

**Badge Color:** Indigo or Blue
**Icon Color:** Varies per subsection

### Type 5: Hands-On Implementation
**Use When:** Teaching step-by-step implementation

**Structure:**
- Overview of what you'll build
- Subsection per step:
  - Step explanation
  - Code block
  - Result visualization (DemoBox)
- Full working example (DemoBox)

**Badge Color:** Green
**Icon Color:** Green + sequential colors

### Type 6: Section with Interactive Visualizer
**Use When:** Any section benefits from hands-on interactive demonstration

**Structure:**
- Concept explanation (SubSection with text/cards/tables)
- Interactive visualizer (SubSection + DemoBox + Visualizer component)
- Code implementation examples (SubSection with CodeBlock)
- Key notes (InfoBox)

```typescript
<SectionCard
  badge={{ label: t('section.badge'), color: 'blue' }}
  title={t('section.title')}
  description={t('section.description')}
>
  <div className="space-y-8">
    <SubSection title={t('section.conceptTitle')} icon iconColor="blue">
      {/* Concept explanation content */}
    </SubSection>

    <SubSection title="Interactive Demo" icon iconColor="blue">
      <DemoBox label="Interactive Demo">
        <ConceptVisualizer />
      </DemoBox>
    </SubSection>

    <SubSection title={t('section.codeTitle')} icon iconColor="purple">
      <DemoBox label={t('section.codeTitle')}>
        <CodeBlock code={t('section.code')} language="typescript" className="text-xs" />
      </DemoBox>
    </SubSection>

    <InfoBox variant="blue" title={t('section.noteTitle')}>
      {t('section.note')}
    </InfoBox>
  </div>
</SectionCard>
```

**Badge Color:** Any (match section topic)
**Icon Color:** Match badge color for concept, secondary for demo

---

## Spacing and Structure

### Within SectionCard
- Top-level space: `space-y-8` (32px between subsections)
- Within subsections: `space-y-4` or `space-y-6` (16-24px)
- Between SectionCards: Handled by PageLayout (24px)

### Grid Layouts
- Grid columns: `gap-6` (24px gap)
- In comparisons: `grid-cols-1 md:grid-cols-2` for responsive design

### Text Sizing
- Section description: `text-sm text-gray-700`
- InfoBox content: `text-sm`
- Code examples: `text-xs` (className on CodeBlock)
- Details/notes: `text-xs text-gray-600`

---

## Mobile Responsive Patterns

All patterns should be responsive:

- **Mobile** (< 768px): Stack content vertically
- **Tablet** (≥ 768px): 2-column layouts where appropriate
- **Desktop** (≥ 1024px): Full width with generous margins

Use Tailwind responsive prefixes:
- `grid-cols-1 md:grid-cols-2` for responsive grids
- `flex-col md:flex-row` for responsive flex
- `w-full md:w-1/2` for responsive widths
