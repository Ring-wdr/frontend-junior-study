# Components Guide

Complete reference for all shared components used in weekly pages.

## Table of Contents
1. [PageLayout](#pagelayout)
2. [SectionCard](#sectioncard)
3. [InfoBox](#infobox)
4. [DemoBox](#demobox)
5. [SubSection](#subsection)
6. [ContentGrid](#contentgrid)
7. [SectionDivider](#sectiondivider)
8. [CodeBlock](#codeblock)

---

## PageLayout

**Purpose:** Main page wrapper that provides consistent header, tab navigation, and section rendering for all weekly pages.

**Location:** `src/components/page-layout.tsx`

**Props:**
- `title` (string, required) - Page title (e.g., "Week 2: Design Patterns")
- `description` (string, required) - Brief page description
- `tabs` (string[], required) - Array of tab IDs. Use `'all'` to show all sections without filtering
- `sections` (Section[], required) - Array of section objects with `id` and `component` properties
- `tabLabelMap?` (Record<string, string>, optional) - Custom labels for tabs (if not provided, uses tab ID capitalized)

**Usage:**
```typescript
<PageLayout
  title="Week 2: Design Patterns"
  description="Learn about common design patterns in software"
  tabs={['all', 'creational', 'structural', 'behavioral']}
  sections={[
    { id: 'creational', component: <CreationPatternsSection /> },
    { id: 'structural', component: <StructuralPatternsSection /> },
    { id: 'behavioral', component: <BehavioralPatternsSection /> },
  ]}
  tabLabelMap={{ creational: 'Creation', structural: 'Structural', behavioral: 'Behavioral' }}
/>
```

**Features:**
- Sticky tab navigation
- Animated section transitions
- Responsive design
- Back to Dashboard link

---

## SectionCard

**Purpose:** Container for a major section within a page, with badge, title, and description.

**Location:** `src/components/section-card.tsx`

**Props:**
- `badge?` (object, optional)
  - `label` (string) - Badge text
  - `color?` (BadgeColor) - Badge color: `'blue'`, `'purple'`, `'green'`, `'orange'`, `'pink'`, `'indigo'`, `'teal'`
  - `className?` (string) - Additional CSS classes
- `title` (string, required) - Section title
- `description` (string, required) - Brief section description
- `children` (ReactNode, required) - Section content
- `testId?` (string, optional) - Test ID for testing

**Usage:**
```typescript
<SectionCard
  badge={{ label: 'Design Patterns', color: 'purple' }}
  title="Creation Patterns"
  description="Patterns focused on object creation mechanisms"
>
  {/* Section content here */}
</SectionCard>
```

**Styling Notes:**
- Uses Card component from ui/card.tsx for consistent styling
- 6px padding, white background, subtle border and shadow
- Badge appears above title with 2px bottom margin

---

## InfoBox

**Purpose:** Highlighted box for important concepts, key takeaways, or additional information.

**Location:** `src/components/info-box.tsx`

**Props:**
- `variant?` (InfoBoxVariant, optional) - Color theme: `'blue'`, `'green'`, `'orange'`, `'red'`, `'purple'`, `'gray'` (default: `'blue'`)
- `title?` (string, optional) - Box title
- `children` (ReactNode, required) - Box content
- `className?` (string, optional) - Additional CSS classes

**Available Variants:**
- `blue` - Information/concepts
- `green` - Tips/best practices
- `orange` - Important notes/warnings
- `red` - Errors/pitfalls to avoid
- `purple` - Theory/advanced concepts
- `gray` - General information/neutral

**Usage:**
```typescript
<InfoBox variant="orange" title="Core Concepts">
  <ul className="list-disc pl-5 space-y-1 text-sm">
    <li><strong>Single Responsibility:</strong> A class should have one reason to change</li>
    <li><strong>Open-Closed:</strong> Open for extension, closed for modification</li>
  </ul>
</InfoBox>
```

**Styling Notes:**
- Rounded corners (xl), 4px padding, left border
- Background, border, text colors match variant
- Title is bold if provided

---

## DemoBox

**Purpose:** Container indicating an interactive demonstration or visualizer component.

**Location:** `src/components/demo-box.tsx`

**Props:**
- `children` (ReactNode, required) - Interactive component to display
- `label?` (string, optional) - Custom label text (default: `'Interactive Demo'`)

**Usage:**
```typescript
<DemoBox>
  <YourVisualizerComponent />
</DemoBox>
```

**Styling Notes:**
- Light gray background (bg-gray-50)
- 4px padding, rounded corners (xl), subtle border
- Label in uppercase, small text, gray color
- Always use for interactive/animated components

---

## SubSection

**Purpose:** Subsection within a larger section, with optional icon indicator.

**Location:** `src/components/sub-section.tsx`

**Props:**
- `title` (string, required) - Subsection title
- `icon?` (boolean, optional) - Show colored dot indicator (default: `false`)
- `iconColor?` (string, optional) - Icon color: `'purple'`, `'blue'`, `'pink'`, `'green'`, `'orange'`, `'red'` (default: `'purple'`)
- `children` (ReactNode, required) - Subsection content
- `className?` (string, optional) - Additional CSS classes
- `divider?` (boolean, optional) - Show divider above section (default: `false`)

**Usage:**
```typescript
<SubSection title="Singleton Pattern" icon iconColor="purple">
  <div className="grid grid-cols-1 gap-6">
    <div>
      <p className="text-sm text-gray-700">Description here</p>
    </div>
  </div>
</SubSection>
```

**Styling Notes:**
- Title is bold, medium size
- Icon is small (1.5x1.5) rounded dot
- When used with divider, includes top border

---

## ContentGrid

**Purpose:** Grid layout for displaying items with title and description.

**Location:** `src/components/content-grid.tsx`

**Props:**
- `items` (ContentItem[], required) - Array of `{ title: string, description: string }` objects
- `columns?` (`'auto'` | `1` | `2`, optional) - Grid columns (default: `'auto'`)
  - `'auto'`: Responsive (1 column on mobile, 2 on desktop)
  - `1`: Always single column
  - `2`: Always two columns
- `className?` (string, optional) - Additional CSS classes

**Usage:**
```typescript
<ContentGrid
  items={[
    { title: 'Concept 1', description: 'Description of first concept' },
    { title: 'Concept 2', description: 'Description of second concept' },
  ]}
  columns="auto"
/>
```

**Styling Notes:**
- 4px gap between items
- Each item has 3px padding, left-aligned
- Title is bold, small, gray-900
- Description is xs text, gray-500

---

## SectionDivider

**Purpose:** Visual separator between sections.

**Location:** `src/components/section-divider.tsx`

**Props:**
- `variant?` (`'line'` | `'spacing'`, optional) - Divider style (default: `'line'`)
  - `'line'`: 1px border
  - `'spacing'`: 4px gap (spacing only, no visible line)
- `className?` (string, optional) - Additional CSS classes

**Usage:**
```typescript
<SectionDivider variant="line" />
```

**Styling Notes:**
- Light gray color (bg-gray-100 or border-gray-100)
- Subtle visual separation
- Use between SubSections in a SectionCard

---

## CodeBlock

**Purpose:** Display formatted code snippets with syntax highlighting.

**Location:** `src/components/ui/code-block.tsx`

**Props:**
- `code` (string, required) - Code content to display
- `className?` (string, optional) - Additional CSS classes for sizing

**Usage:**
```typescript
<CodeBlock
  code={`const example = () => {
  console.log('Hello, World!');
};`}
  className="text-xs"
/>
```

**Styling Notes:**
- Dark background (bg-gray-900)
- Syntax highlighting with color-coded elements
- Monospace font
- Can be sized with `className="text-xs"` or `text-sm`
- Responsive with horizontal scroll on small screens

---

## Component Combinations

### Typical Section Structure
```typescript
<SectionCard badge={{ label: 'Topic', color: 'blue' }} title="Title" description="Description">
  <div className="space-y-8">
    <SubSection title="Concept 1" icon iconColor="blue">
      <p>Content</p>
      <DemoBox><Component /></DemoBox>
    </SubSection>

    <SectionDivider variant="line" />

    <SubSection title="Concept 2" icon iconColor="blue">
      <InfoBox variant="blue" title="Key Point">
        Content
      </InfoBox>
    </SubSection>
  </div>
</SectionCard>
```

### Content with Code Examples
```typescript
<SectionCard badge={{ label: 'Code', color: 'green' }} title="Implementation" description="How to code this">
  <div className="space-y-6">
    <InfoBox title="Pattern">
      Pattern explanation
    </InfoBox>
    <CodeBlock code={`// code example`} className="text-xs" />
  </div>
</SectionCard>
```
