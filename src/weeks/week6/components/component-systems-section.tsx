'use client';

import { useTranslation } from '@/i18n/client';
import {
  ContentGrid,
  InfoBox,
  SectionCard,
  SubSection,
} from '../../../components';
import { CodeTabs } from '../../../components/ui/code-tabs';
import { TextList } from './text-list';

const CODES = [
  `const buttonVariants = cva(
  'inline-flex items-center rounded-md px-4 py-2 text-sm',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        outline: 'border bg-background',
      },
      size: { default: 'h-9 px-4', sm: 'h-8 px-3' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

<Button variant="outline" size="sm" className="px-6" />
// class="inline-flex items-center rounded-md py-2 text-sm
//        border bg-background h-8 px-6"`,
  `:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
}`,
  `/* globals.css */
@import '@astryxdesign/core/reset.css';
@import '@astryxdesign/core/astryx.css';
@import '@astryxdesign/theme-neutral/theme.css';

// page.tsx
import { Button } from '@astryxdesign/core/Button';

export default function Page() {
  return <Button label="Hello Astryx" variant="primary" />;
}

// Eject one component's source when a theme is not enough
// $ astryx swizzle Button`,
  `@layer reset, theme, base, astryx-base, astryx-theme, components, utilities;

@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/preflight.css' layer(base);
@import '@astryxdesign/core/reset.css';
@import '@astryxdesign/core/astryx.css';
@import '@astryxdesign/theme-neutral/theme.css';
@import '@astryxdesign/core/tailwind-theme.css';
@import 'tailwindcss/utilities.css' layer(utilities);`,
];

export const ComponentSystemsSection = () => {
  const { t, raw } = useTranslation('week6');
  const rows = raw('componentSystems.compare.rows');

  return (
    <SectionCard
      badge={{ label: t('componentSystems.badge'), color: 'indigo' }}
      description={t('componentSystems.description')}
      testId="component-systems-section"
    >
      <div className="space-y-8">
        <SubSection
          title={t('componentSystems.layers.title')}
          icon
          iconColor="purple"
        >
          <ContentGrid items={raw('componentSystems.layers.items')} />
        </SubSection>

        <SubSection
          title={t('componentSystems.shadcn.title')}
          icon
          iconColor="purple"
        >
          <TextList items={raw('componentSystems.shadcn.points')} />
        </SubSection>

        <SubSection
          title={t('componentSystems.astryx.title')}
          icon
          iconColor="purple"
        >
          <TextList items={raw('componentSystems.astryx.points')} />
        </SubSection>

        <SubSection
          title={t('componentSystems.compare.title')}
          icon
          iconColor="purple"
        >
          <div className="not-prose overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[30rem] border-collapse text-left text-xs">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    {t('componentSystems.compare.headers.aspect')}
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    {t('componentSystems.compare.headers.shadcn')}
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    {t('componentSystems.compare.headers.astryx')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.aspect}
                    className="border-t border-gray-200 align-top text-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-3 py-2 font-semibold text-gray-900"
                    >
                      {row.aspect}
                    </th>
                    <td className="px-3 py-2">{row.shadcn}</td>
                    <td className="px-3 py-2">{row.astryx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection
          title={t('componentSystems.code.title')}
          icon
          iconColor="purple"
        >
          <CodeTabs
            items={raw('componentSystems.code.items')}
            codes={CODES}
            ariaLabel={t('componentSystems.code.ariaLabel')}
            testId="component-systems-code"
            language={['tsx', 'css', 'tsx', 'css']}
          />
        </SubSection>

        <InfoBox variant="purple" title={t('componentSystems.choose.title')}>
          {t('componentSystems.choose.content')}
        </InfoBox>
      </div>
    </SectionCard>
  );
};
