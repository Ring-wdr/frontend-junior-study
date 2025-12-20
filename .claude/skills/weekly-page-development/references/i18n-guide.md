# i18n (Internationalization) Guide

This project uses `i18next` and `react-i18next` for multi-language support (Korean and English).

## Supported Languages

- **Korean (ko)** - Default language
- **English (en)**

## Translation File Location

```
src/i18n/locales/
├── ko/
│   ├── common.json
│   ├── week1.json through week15.json
└── en/
    ├── common.json
    ├── week1.json through week15.json
```

## Using Translations in Components

### Basic Usage

```typescript
import { useTranslation } from 'react-i18next';

export const MySection = () => {
  const { t } = useTranslation('week1'); // namespace: week1

  return (
    <SectionCard
      title={t('eventLoop.title')}
      description={t('eventLoop.description')}
    >
      {/* content */}
    </SectionCard>
  );
};
```

### Namespaces

Translations are organized by namespace:
- `common` - Shared UI elements and navigation
- `week1` through `week15` - Week-specific content

## Translation Key Naming Convention

Follow this pattern for consistency:

```
[namespace].[section].[element]

Examples:
- common.navigation.backToDashboard
- week1.eventLoop.title
- week1.eventLoop.description
```

## Section Component Pattern with i18n

```typescript
// src/page/weekN/components/[topic]-section.tsx
import { useTranslation } from 'react-i18next';
import { SectionCard, InfoBox, DemoBox, SubSection } from '../../../components';

export const TopicSection = () => {
  const { t } = useTranslation('weekN');

  return (
    <SectionCard
      badge={{ label: t('sectionName.badge'), color: 'blue' }}
      title={t('sectionName.title')}
      description={t('sectionName.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('concept1.title')} icon iconColor="blue">
          {t('concept1.content')}
        </SubSection>
      </div>
    </SectionCard>
  );
};
```

## Common Translation Examples

**Navigation (common.json):**
```json
{
  "navigation": {
    "backToDashboard": "← 대시보드로 돌아가기"
  }
}
```

**Week Header (weekN.json):**
```json
{
  "header": {
    "title": "Week 1: Event Loop",
    "description": "Understand how JavaScript handles async operations"
  },
  "sectionName": {
    "badge": "Core Concept",
    "title": "Event Loop Visualizer",
    "description": "Step through the Event Loop..."
  }
}
```

## Key Patterns

### 1. Simple Text (Badges and Labels)

```typescript
const { t } = useTranslation('weekX');

badge={{ label: t('section.badge'), color: 'blue' }}
title={t('section.title')}
description={t('section.description')}
```

### 2. SubSection Titles

```typescript
<SubSection title={t('subsection.title')} icon iconColor="blue">
  {/* content */}
</SubSection>
```

### 3. Rich Text with HTML Tags (Trans Component)

Use the `Trans` component when your translation strings contain HTML tags like `<strong>`, `<code>`, `<em>`, etc.

#### Basic Trans Usage

```typescript
import { Trans, useTranslation } from 'react-i18next';

export const MySection = () => {
  const { t } = useTranslation('week5');

  return (
    <div>
      <Trans t={t} i18nKey="concurrency.whatIsConcurrent.intro" />
    </div>
  );
};
```

#### Trans with Custom Components

When your translation contains HTML tags that need custom rendering:

```typescript
<Trans
  t={t}
  i18nKey="react19.useActionState.intro"
  components={{ code: <code /> }}
/>
```

#### Translation JSON with Trans

```json
{
  "concurrency": {
    "whatIsConcurrent": {
      "intro": "This is <strong>concurrent rendering</strong>, which allows React to <code>pause</code> and <code>resume</code> work."
    }
  }
}
```

The HTML tags in the JSON (`<strong>`, `<code>`, etc.) will be rendered as actual HTML elements in the component.

#### Important Notes on Trans

- Only use `Trans` when your text contains formatting tags
- For plain text without formatting, use the simple `t()` function instead
- Always pass the `t` function: `t={t}`
- Always specify the key: `i18nKey="..."`
- For custom tags, pass them in the `components` prop
- Common tags: `<strong>`, `<code>`, `<em>`, `<span>`, `<a>`

## What Should NOT Be Translated

- **Proper nouns:** React, Next.js, TypeScript, JavaScript, Redux, Webpack, ARIA, WCAG, HTML, CSS, etc.
- **Code blocks:** Never translate content within `<CodeBlock />` components
- **Technical library names:** Keep as-is for clarity

## Translation Workflow

1. **Create or update translation files** in `src/i18n/locales/[lang]/[namespace].json`
2. **Import translation hook** in your component:
   ```typescript
   import { useTranslation } from 'react-i18next';
   ```
3. **Get the translation function** for your namespace:
   ```typescript
   const { t } = useTranslation('weekN');
   ```
4. **Use `t()` for simple text:**
   ```typescript
   {t('key.path')}
   ```
5. **Use `Trans` component for text with HTML tags:**
   ```typescript
   <Trans t={t} i18nKey="key.path" />
   ```

## Pro Tips

- Keep translation keys hierarchical and descriptive
- Maintain consistency in naming across all translation files
- Test both Korean and English versions when making changes
- Use meaningful variable names in translation keys (e.g., `eventLoop.title` not `week1.s1.t`)
