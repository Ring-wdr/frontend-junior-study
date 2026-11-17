'use client';

import { Trans, useTranslation } from '@/i18n/client';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { TextList } from './text-list';

const COMPILE_CODE = `// Input
const styles = stylex.create({
  base: { color: 'red', padding: 8, fontSize: 16 },
  primary: { color: 'white', backgroundColor: 'blue' },
});
const props = stylex.props(styles.base, styles.primary);

// Output
const styles = {
  base: {
    kMwMTN: 'x1e2nbdu', // color
    kmVPX3: 'xe8ttls',  // padding
    kGuDYH: 'x1j61zf2', // fontSize
    $$css: true,
  },
  primary: {
    kMwMTN: 'x1awj2ng', // color: same key as base, so it replaces it
    kWkggS: 'x1t391ir', // backgroundColor
    $$css: true,
  },
};
const props = { className: 'xe8ttls x1j61zf2 x1awj2ng x1t391ir' };`;

const COMPILE_CSS = `/* Emitted stylesheet, sorted by priority */
.xe8ttls { padding: 8px }            /* 1000 */
.x1e2nbdu { color: red }             /* 3000 */
.x1j61zf2 { font-size: 16px }        /* 3000 */
.x1awj2ng { color: white }           /* 3000 */
.x1t391ir { background-color: blue } /* 3000 */`;

export const StylexSection = () => {
  const { t, raw } = useTranslation('week6');

  const basicUsageCode = `import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  button: {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  primary: {
    backgroundColor: 'blue',
    color: 'white',
  },
});

function Button({ children, variant = 'primary' }) {
  return (
    <button {...stylex.props(
      styles.button,
      variant === 'primary' && styles.primary
    )}>
      {children}
    </button>
  );
}`;

  const conditionalStylesCode = `import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  button: {
    backgroundColor: {
      default: 'lightblue',
      ':hover': 'blue',
      ':active': 'darkblue',
    },
    color: {
      default: 'black',
      ':hover': 'white',
    },
    transform: {
      default: 'scale(1)',
      ':active': 'scale(0.98)',
    },
  },
  responsive: {
    padding: {
      default: '8px 16px',
      '@media (min-width: 768px)': '12px 24px',
      '@media (min-width: 1024px)': '16px 32px',
    },
    fontSize: {
      default: '14px',
      '@media (min-width: 768px)': '16px',
    },
  },
});`;

  const themingCode = `// tokens.stylex.ts
import * as stylex from '@stylexjs/stylex';

export const colors = stylex.defineVars({
  primaryText: 'black',
  secondaryText: '#666',
  background: 'white',
  accent: 'blue',
});

export const spacing = stylex.defineVars({
  small: '4px',
  medium: '8px',
  large: '16px',
});

// themes.ts
import * as stylex from '@stylexjs/stylex';
import { colors } from './tokens.stylex';

const DARK = '@media (prefers-color-scheme: dark)';

export const darkTheme = stylex.createTheme(colors, {
  primaryText: { default: 'white', [DARK]: 'white' },
  secondaryText: { default: '#aaa', [DARK]: '#aaa' },
  background: { default: '#1a1a1a', [DARK]: '#1a1a1a' },
  accent: { default: 'lightblue', [DARK]: 'lightblue' },
});

// Usage in component
import { colors, spacing } from './tokens.stylex';
import { darkTheme } from './themes';

const styles = stylex.create({
  container: {
    color: colors.primaryText,
    backgroundColor: colors.background,
    padding: spacing.large,
  },
});

function App({ isDark }) {
  return (
    <div {...stylex.props(isDark && darkTheme, styles.container)}>
      Themed content
    </div>
  );
}`;

  const variantsCode = `import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  base: {
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
});

const colorVariants = stylex.create({
  primary: {
    backgroundColor: { default: 'blue', ':hover': 'darkblue' },
    color: 'white',
  },
  secondary: {
    backgroundColor: { default: 'gray', ':hover': 'darkgray' },
    color: 'white',
  },
  danger: {
    backgroundColor: { default: 'red', ':hover': 'darkred' },
    color: 'white',
  },
});

const sizeVariants = stylex.create({
  small: { padding: '8px 12px', fontSize: '14px' },
  medium: { padding: '12px 16px', fontSize: '16px' },
  large: { padding: '16px 24px', fontSize: '18px' },
});

type ButtonProps = {
  color?: keyof typeof colorVariants;
  size?: keyof typeof sizeVariants;
  children: React.ReactNode;
};

function Button({ color = 'primary', size = 'medium', children }: ButtonProps) {
  return (
    <button {...stylex.props(
      styles.base,
      colorVariants[color],
      sizeVariants[size]
    )}>
      {children}
    </button>
  );
}`;

  return (
    <SectionCard
      badge={{ label: t('stylex.badge'), color: 'blue' }}
      description={t('stylex.description')}
      testId="stylex-section"
    >
      <div className="space-y-8">
        <SubSection title={t('stylex.overview.title')} icon iconColor="blue">
          <p className="text-sm text-gray-700 mb-4">
            {t('stylex.overview.content')}
          </p>
        </SubSection>

        <SubSection title={t('stylex.features.title')} icon iconColor="blue">
          <InfoBox variant="blue" title={t('stylex.features.infoTitle')}>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>{t('stylex.features.atomic')}</strong>{' '}
                {t('stylex.features.atomicDesc')}
              </li>
              <li>
                <strong>{t('stylex.features.deterministic')}</strong>{' '}
                {t('stylex.features.deterministicDesc')}
              </li>
              <li>
                <strong>{t('stylex.features.typeSafe')}</strong>{' '}
                {t('stylex.features.typeSafeDesc')}
              </li>
              <li>
                <strong>{t('stylex.features.colocation')}</strong>{' '}
                {t('stylex.features.colocationDesc')}
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title={t('stylex.basicUsage.title')} icon iconColor="blue">
          <p className="text-sm text-gray-700 mb-4">
            <Trans
              i18nKey="stylex.basicUsage.content"
              t={t}
              components={{
                code: <code className="bg-gray-100 px-1 rounded" />,
              }}
            />
          </p>
          <CodeBlock code={basicUsageCode} language="tsx" className="text-xs" />
        </SubSection>

        <SubSection
          title={t('stylex.conditionalStyles.title')}
          icon
          iconColor="blue"
        >
          <p className="text-sm text-gray-700 mb-4">
            {t('stylex.conditionalStyles.content')}
          </p>
          <CodeBlock
            code={conditionalStylesCode}
            language="tsx"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('stylex.theming.title')} icon iconColor="blue">
          <p className="text-sm text-gray-700 mb-4">
            <Trans
              i18nKey="stylex.theming.content"
              t={t}
              components={{
                code: <code className="bg-gray-100 px-1 rounded" />,
              }}
            />
          </p>
          <CodeBlock code={themingCode} language="tsx" className="text-xs" />
        </SubSection>

        <SubSection title={t('stylex.variants.title')} icon iconColor="blue">
          <p className="text-sm text-gray-700 mb-4">
            {t('stylex.variants.content')}
          </p>
          <CodeBlock code={variantsCode} language="tsx" className="text-xs" />
        </SubSection>

        <SubSection title={t('stylex.comparison.title')} icon iconColor="blue">
          <InfoBox variant="gray" title={t('stylex.comparison.infoTitle')}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-2 px-3 font-semibold">
                      {t('stylex.comparison.headers.feature')}
                    </th>
                    <th className="py-2 px-3 font-semibold">
                      {t('stylex.comparison.headers.vanillaExtract')}
                    </th>
                    <th className="py-2 px-3 font-semibold">
                      {t('stylex.comparison.headers.stylex')}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">
                      {t('stylex.comparison.rows.cssOutput')}
                    </td>
                    <td className="py-2 px-3">
                      {t('stylex.comparison.rows.cssOutputVE')}
                    </td>
                    <td className="py-2 px-3">
                      {t('stylex.comparison.rows.cssOutputSX')}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">
                      {t('stylex.comparison.rows.fileExtension')}
                    </td>
                    <td className="py-2 px-3">
                      <code className="bg-gray-100 px-1 rounded">
                        {t('stylex.comparison.rows.fileExtensionVE')}
                      </code>
                    </td>
                    <td className="py-2 px-3">
                      <code className="bg-gray-100 px-1 rounded">
                        {t('stylex.comparison.rows.fileExtensionSX')}
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">
                      {t('stylex.comparison.rows.styleMerging')}
                    </td>
                    <td className="py-2 px-3">
                      {t('stylex.comparison.rows.styleMergingVE')}
                    </td>
                    <td className="py-2 px-3">
                      {t('stylex.comparison.rows.styleMergingSX')}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">
                      {t('stylex.comparison.rows.bundleSize')}
                    </td>
                    <td className="py-2 px-3">
                      {t('stylex.comparison.rows.bundleSizeVE')}
                    </td>
                    <td className="py-2 px-3">
                      {t('stylex.comparison.rows.bundleSizeSX')}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">
                      {t('stylex.comparison.rows.ecosystem')}
                    </td>
                    <td className="py-2 px-3">
                      {t('stylex.comparison.rows.ecosystemVE')}
                    </td>
                    <td className="py-2 px-3">
                      {t('stylex.comparison.rows.ecosystemSX')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </InfoBox>
        </SubSection>

        <SubSection title={t('stylex.compile.title')} icon iconColor="blue">
          <div className="space-y-3">
            <TextList items={raw('stylex.compile.steps')} ordered />
            <CodeBlock code={COMPILE_CODE} className="text-xs" />
            <CodeBlock code={COMPILE_CSS} language="css" className="text-xs" />
            <p className="text-sm text-gray-700">{t('stylex.compile.note')}</p>
          </div>
        </SubSection>

        <SubSection title={t('stylex.merge.title')} icon iconColor="blue">
          <TextList items={raw('stylex.merge.points')} />
        </SubSection>
      </div>
    </SectionCard>
  );
};
