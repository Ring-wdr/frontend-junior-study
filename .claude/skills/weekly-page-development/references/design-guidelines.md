# Design Guidelines

Visual and stylistic standards for consistent appearance across all weekly pages.

## Table of Contents
1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing System](#spacing-system)
4. [Visual Hierarchy](#visual-hierarchy)
5. [Component Styling](#component-styling)
6. [Accessibility](#accessibility)

---

## Color Palette

### Primary Colors (Badge & Component Colors)

#### Blue
- **Tailwind Classes:** `bg-blue-50`, `text-blue-700`, `border-blue-100`, `bg-blue-100`, `text-blue-600`
- **Use:** Core concepts, fundamentals, information
- **Example:** `<Badge color="blue">JavaScript Basics</Badge>`

#### Purple
- **Tailwind Classes:** `bg-purple-50`, `text-purple-700`, `border-purple-100`, `bg-purple-100`, `text-purple-600`
- **Use:** Design patterns, advanced concepts, OOP
- **Example:** `<Badge color="purple">Design Patterns</Badge>`

#### Green
- **Tailwind Classes:** `bg-green-50`, `text-green-700`, `border-green-100`, `bg-green-100`, `text-green-600`
- **Use:** Best practices, success, optimization, tips
- **Example:** `<Badge color="green">Best Practice</Badge>`

#### Orange
- **Tailwind Classes:** `bg-orange-50`, `text-orange-700`, `border-orange-100`, `bg-orange-100`, `text-orange-600`
- **Use:** Important notes, warnings, critical concepts
- **Example:** `<Badge color="orange">Important</Badge>`

#### Pink
- **Tailwind Classes:** `bg-pink-50`, `text-pink-700`, `border-pink-100`, `bg-pink-100`, `text-pink-600`
- **Use:** Creative patterns, specialized implementations
- **Example:** `<Badge color="pink">Advanced Pattern</Badge>`

#### Indigo
- **Tailwind Classes:** `bg-indigo-50`, `text-indigo-700`, `border-indigo-100`, `bg-indigo-100`, `text-indigo-600`
- **Use:** Structure, composition, architecture
- **Example:** `<Badge color="indigo">Architecture</Badge>`

#### Teal
- **Tailwind Classes:** `bg-teal-50`, `text-teal-700`, `border-teal-100`, `bg-teal-100`, `text-teal-600`
- **Use:** Tools, utilities, practical implementations
- **Example:** `<Badge color="teal">Tool</Badge>`

### Neutral Colors

- **Background:** `#F0F4F8` (bg-gradient equivalent, used in PageLayout)
- **Card Background:** `white` (bg-white)
- **Border:** `gray-200` for main borders, `gray-100` for subtle dividers
- **Text Primary:** `gray-900` for headings, strong text
- **Text Secondary:** `gray-700` for body text
- **Text Tertiary:** `gray-600` for muted text
- **Text Muted:** `gray-500` for labels, helper text

### Usage Rules

1. **One primary color per section** - Use one badge color for all subsections in a section
2. **Consistent theme** - Within a week, use colors from similar family (e.g., Blue + Green OR Purple + Indigo)
3. **Semantic meaning** - Match color to content meaning (Blue for basics, Orange for warnings, etc.)
4. **Contrast** - Always ensure sufficient contrast for accessibility (WCAG AA standard)

---

## Typography

### Font System

- **Font Family:** System font stack (sans-serif)
- **Web Safe:** `font-sans` (Tailwind default)

### Type Scales

#### Page Title
- **Size:** `text-4xl`
- **Weight:** `font-extrabold`
- **Letter Spacing:** `tracking-tight`
- **Example:** Week 2: Design Patterns

#### Page Subtitle/Description
- **Size:** `text-lg`
- **Weight:** `font-normal`
- **Color:** `text-gray-600`
- **Example:** "Learn about common design patterns"

#### Section Title (SectionCard)
- **Size:** `text-xl`
- **Weight:** `font-bold`
- **Color:** `text-gray-900`
- **Margin:** `mt-2` (below badge)

#### Subsection Title (SubSection)
- **Size:** `text-base` (default, no explicit class)
- **Weight:** `font-semibold`
- **Color:** `text-gray-900`

#### Body Text
- **Size:** `text-sm`
- **Weight:** `font-normal`
- **Color:** `text-gray-700`
- **Line Height:** Default (1.5)

#### Small Text/Labels
- **Size:** `text-xs`
- **Weight:** `font-normal` or `font-semibold`
- **Color:** `text-gray-600` or `text-gray-500`
- **Use:** Code block labels, badge text, helper text

#### Info Box Title
- **Size:** `text-sm` (inherited from body)
- **Weight:** `font-semibold`
- **Color:** Variant-specific (blue-900, green-900, etc.)

### Text Emphasis
- **Bold/Strong:** `<strong>` tag or `font-semibold` class
- **Italic:** `<em>` tag for emphasis
- **Code:** Inline code in CodeBlock components or backticks in markdown

---

## Spacing System

### Base Unit
All spacing follows an 8px grid system (Tailwind's default):
- `px-2` = 8px
- `px-3` = 12px
- `px-4` = 16px
- `px-6` = 24px
- `px-8` = 32px

### Vertical Spacing (Between Sections/Elements)

Within a SectionCard:
- **Between subsections:** `space-y-8` (32px)
- **Within subsections:** `space-y-4` or `space-y-6` (16-24px)
- **Between paragraphs:** Default (inherit from Tailwind)

Between elements:
- **Between SectionCards:** 24px (handled by PageLayout)
- **Between components in grid:** `gap-6` (24px)

### Horizontal Spacing (Padding)

- **SectionCard padding:** `p-6` (24px)
- **InfoBox padding:** `p-4` (16px)
- **DemoBox padding:** `p-4` (16px)
- **Code block padding:** `p-4` (16px)
- **Page side margins:** `px-6` (24px)

### Margin Conventions

- **Top margin:** Use sparingly; prefer bottom margin on preceding element
- **Bottom margin:** Primary spacing method
- **Use Tailwind classes:** `mb-2`, `mb-3`, `mb-4`, `mb-6`, `mb-8`

### Responsive Spacing

- **Mobile:** More compact spacing (16px between elements)
- **Tablet+:** Generous spacing (24-32px between elements)
- **Use:** `space-y-4 md:space-y-6`, `gap-4 md:gap-6`

---

## Visual Hierarchy

### Importance Levels

#### Level 1 (Highest Importance)
- **Page Title** - Largest, boldest
- **Section Badges** - Colored, prominent position
- **Section Titles** - Large, bold
- **Key Concepts** (in InfoBox) - Bold, colored background

#### Level 2 (Important)
- **Subsection Titles** - Medium size, bold
- **Subsection Icons** - Colored dots next to titles
- **Emphasized Text** - Bold within paragraphs
- **Code blocks** - Dark background, monospace, set apart

#### Level 3 (Supporting)
- **Body Text** - Standard gray
- **Descriptions** - Lighter gray
- **Helper Text** - Smaller, lighter gray

### Visual Emphasis Techniques

1. **Color** - Use badge/component colors to draw attention
2. **Size** - Larger text for more important content
3. **Weight** - Bold for emphasis, normal for body
4. **Position** - Top/left priority, important items first
5. **Background** - Colored boxes (InfoBox) for important info
6. **Whitespace** - Generous spacing emphasizes content blocks
7. **Icons** - Colored dots (SubSection icons) mark sections

### Content Organization Best Practices

1. **Lead with the most important information**
2. **Use InfoBox for key takeaways** - Visually separated from body text
3. **Organize subsections logically** - Simple to complex
4. **Provide visual breaks** - Use DemoBox, CodeBlock, dividers
5. **Limit info density** - Don't overcrowd sections

---

## Component Styling

### SectionCard
- **Background:** `bg-white`
- **Padding:** `p-6` (24px)
- **Border:** `border border-gray-200`
- **Rounded:** `rounded-lg`
- **Shadow:** Subtle shadow from Card component
- **Badge Position:** Top-left, above title

### InfoBox
- **Background:** Variant-specific (e.g., `bg-blue-50` for blue variant)
- **Border:** `border border-{variant}-100` on left
- **Padding:** `p-4` (16px)
- **Rounded:** `rounded-xl`
- **Title Weight:** `font-semibold`

### DemoBox
- **Background:** `bg-gray-50`
- **Border:** `border border-gray-200`
- **Padding:** `p-4` (16px)
- **Rounded:** `rounded-xl`
- **Label:** `text-xs font-semibold text-gray-500 uppercase`
- **Label Margin:** `mb-3` below label

### CodeBlock
- **Background:** `bg-gray-900`
- **Text Color:** `text-blue-100` (syntax-highlighted)
- **Padding:** `p-4` (16px)
- **Rounded:** `rounded-xl`
- **Font:** Monospace, `text-xs` or `text-sm`
- **Overflow:** Horizontal scroll on mobile

### SubSection
- **Title Weight:** `font-semibold`
- **Title Size:** Default (inherited)
- **Icon Size:** `w-1.5 h-1.5` (6x6px)
- **Icon Rounded:** `rounded-full`
- **Icon Margin:** `gap-2` from title

### SectionDivider (line variant)
- **Border:** `h-px bg-gray-100`
- **Margin:** `my-6` typically (but handled by space-y in parent)

---

## Accessibility

### Color Contrast
- **Primary text on white:** Minimum 4.5:1 ratio (WCAG AA)
- **Secondary text on white:** Minimum 3:1 ratio
- **Text on colored backgrounds:** Must meet 4.5:1 minimum

### ARIA Labels
- **Icons without text:** Add aria-label or title
- **Interactive elements:** Ensure proper semantic HTML
- **Code blocks:** Use `<pre>` or CodeBlock component with proper structure

### Text Readability
- **Line length:** Max ~65 characters per line (managed by max-width containers)
- **Line height:** 1.5 or greater (Tailwind default)
- **Font size:** Minimum 14px for body text (text-sm = 14px)

### Keyboard Navigation
- **Links and buttons:** Must be keyboard accessible
- **Tab order:** Logical, follows visual order
- **Focus indicators:** Visible outlines on focusable elements

### Color-Only Information
- **Never use color alone** to convey information
- **Combine with text or icons** for important messages
- **Example:** Use "Warning ⚠️" not just orange color

### Dark Mode Consideration
- **Current design:** Light mode only
- **Future compatibility:** Use semantic color names, avoid hardcoded colors
- **Text contrast:** Works in both light and dark themes

---

## Theme Variations (Future)

Current system uses light theme. When implementing dark mode:

1. **Inverse colors:** Light text on dark backgrounds
2. **Saturation:** Reduce saturation in dark mode
3. **Components:** Already use semantic Tailwind, easy to switch
4. **Testing:** Test all color combinations for accessibility

---

## Brand Guidelines Summary

- **Clean, minimal aesthetic** - Generous whitespace
- **Educational focus** - Clear hierarchy, easy to scan
- **Color for meaning** - Colors communicate content type
- **Consistency** - Same patterns across all weeks
- **Accessibility** - WCAG AA standard throughout
