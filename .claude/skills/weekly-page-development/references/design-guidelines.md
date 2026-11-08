# Design Guidelines

Visual standards for week sections. Styling is Tailwind CSS v4. The page chrome (sidebar, navbar, `h1`/`h2`, TOC, prose typography) comes from `nextra-theme-docs`; these guidelines cover what section components render inside it.

## Color Palette

Badge colors (`src/components/ui/badge.tsx`) use `bg-{color}-50 text-{color}-700` (`gray` uses `bg-gray-100`):

| Color | Use |
|-------|-----|
| blue | core concepts, information |
| purple | patterns, architecture, advanced |
| green | best practice, success, optimization |
| orange | important notes, warnings |
| pink | specialized implementations |
| indigo | structure, composition |
| teal | tools, utilities |
| red | pitfalls, errors, security |
| gray | neutral |

InfoBox variants use `bg-{v}-50`, `border-{v}-100`, title `text-{v}-900`, body `text-{v}-800`.

Neutrals:
- Borders: `gray-200` (containers), `gray-100` (dividers)
- Text: `gray-900` headings/strong, `gray-700` body, `gray-600` descriptions, `gray-500` labels
- Surfaces: `white`, `gray-50` (DemoBox)

Rules:
1. One primary color per section; match SubSection `iconColor` to the badge.
2. Keep a week within one or two color families.
3. Color must match meaning, and never be the only signal (pair with text or an icon).

## Typography and Heading Order

| Element | Source | Style |
|---------|--------|-------|
| Page title `h1` | MDX `# Title` | Nextra theme |
| Section title `h2` | MDX `## Title [#slug]` | Nextra theme |
| SectionCard description | `description` prop | `text-sm sm:text-base text-gray-600` |
| SubSection title `h3` | `title` prop | `text-base font-semibold text-gray-900` |
| InfoBox title `h4` | `title` prop | `font-semibold`, variant color |
| Body | your markup | `text-sm text-gray-700` |
| Labels, helper text | your markup | `text-xs text-gray-500` |
| Code | `CodeBlock` | `className="text-xs"` |

Do not render `h1`/`h2` inside components; it breaks the TOC and heading order. Use `h4` or styled text for headings below an `h3`.

## Spacing

Tailwind's 4px scale.

- Between blocks in a section: `space-y-8`
- Within a subsection: `space-y-4` / `space-y-6`
- Grid gaps: `gap-2 sm:gap-4` for dense content, up to `gap-6`
- InfoBox / DemoBox padding: `p-3 sm:p-4`
- Prefer `gap`/`space-y` on the parent over margins on children.

## Visual Hierarchy

1. Badge and description lead the section.
2. SubSection titles with colored dots break it into scannable parts.
3. InfoBox for key takeaways, DemoBox for anything interactive, CodeBlock for code.
4. Order content simple to complex: explanation, demo, code, takeaway.

## Accessibility

- Text contrast at least 4.5:1 (WCAG AA). The 700/800/900 shades on 50 backgrounds meet this.
- Body text at least `text-sm` (14px).
- All interactive elements are real `<button type="button">`, `<input>`, or links, keyboard reachable with a visible focus state (`focus-visible:outline-*`).
- Icon-only buttons need `aria-label`.
- Live-changing status text in visualizers can use `aria-live="polite"`.
- Motion: `MotionConfig reducedMotion="user"` is global, so motion/react animations respect the OS setting automatically. For GSAP or CSS animations, check `prefers-reduced-motion` in an effect (`motion-safe:`/`motion-reduce:` variants for CSS).

## Theme

Section components are designed for the light palette above. Nextra provides the page theme; avoid hardcoded hex colors in components so they stay consistent with Tailwind tokens.
