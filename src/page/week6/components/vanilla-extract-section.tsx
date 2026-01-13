import { Trans, useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const VanillaExtractSection = () => {
  const { t } = useTranslation('week6');

  const basicStyleCode = `// styles.css.ts
import { style, createTheme } from '@vanilla-extract/css';

// Define a theme with CSS variables
export const [themeClass, vars] = createTheme({
  color: {
    brand: 'blue',
    text: '#333',
  },
  space: {
    small: '4px',
    medium: '8px',
    large: '16px',
  },
});

// Create styles using the theme
export const container = style({
  backgroundColor: vars.color.brand,
  padding: vars.space.large,
  borderRadius: '8px',
});

export const button = style({
  color: vars.color.text,
  padding: \`\${vars.space.small} \${vars.space.medium}\`,
  border: 'none',
  cursor: 'pointer',
  ':hover': {
    opacity: 0.8,
  },
});`;

  const componentUsageCode = `// Button.tsx
import { button, themeClass } from './styles.css';

export function Button({ children }) {
  return (
    <div className={themeClass}>
      <button className={button}>{children}</button>
    </div>
  );
}`;

  const themeContractCode = `// contract.css.ts
import { createThemeContract, createTheme } from '@vanilla-extract/css';

// Define the shape of your theme (contract)
export const vars = createThemeContract({
  color: {
    brand: null,
    background: null,
  },
  font: {
    body: null,
  },
});

// Light theme
export const lightTheme = createTheme(vars, {
  color: {
    brand: 'blue',
    background: 'white',
  },
  font: {
    body: 'system-ui, sans-serif',
  },
});

// Dark theme
export const darkTheme = createTheme(vars, {
  color: {
    brand: 'lightblue',
    background: '#1a1a1a',
  },
  font: {
    body: 'system-ui, sans-serif',
  },
});`;

  const recipesCode = `// button.css.ts
import { recipe } from '@vanilla-extract/recipes';

export const button = recipe({
  base: {
    borderRadius: 6,
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
  },

  variants: {
    color: {
      primary: { background: 'blue', color: 'white' },
      secondary: { background: 'gray', color: 'white' },
      danger: { background: 'red', color: 'white' },
    },
    size: {
      small: { padding: '8px 12px', fontSize: '14px' },
      medium: { padding: '12px 16px', fontSize: '16px' },
      large: { padding: '16px 24px', fontSize: '18px' },
    },
  },

  compoundVariants: [
    {
      variants: { color: 'primary', size: 'large' },
      style: { boxShadow: '0 4px 12px rgba(0,0,255,0.3)' },
    },
  ],

  defaultVariants: {
    color: 'primary',
    size: 'medium',
  },
});

// Usage: button({ color: 'danger', size: 'large' })`;

  const sprinklesCode = `// sprinkles.css.ts
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';

const space = {
  none: 0,
  small: '4px',
  medium: '8px',
  large: '16px',
  xlarge: '32px',
};

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'flex', 'block', 'grid'],
    flexDirection: ['row', 'column'],
    padding: space,
    gap: space,
  },
  shorthands: {
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
  },
});

export const sprinkles = createSprinkles(responsiveProperties);

// Usage in .css.ts file:
// export const container = sprinkles({
//   display: 'flex',
//   flexDirection: { mobile: 'column', desktop: 'row' },
//   padding: 'large',
// });`;

  return (
    <SectionCard
      badge={{ label: t('vanillaExtract.badge'), color: 'purple' }}
      title={t('vanillaExtract.title')}
      description={t('vanillaExtract.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('vanillaExtract.overview.title')} icon iconColor="purple">
          <p className="text-sm text-gray-700 mb-4">
            {t('vanillaExtract.overview.content')}
          </p>
        </SubSection>

        <SubSection title={t('vanillaExtract.features.title')} icon iconColor="purple">
          <InfoBox variant="purple" title={t('vanillaExtract.features.infoTitle')}>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>{t('vanillaExtract.features.zeroRuntime')}</strong>{' '}
                {t('vanillaExtract.features.zeroRuntimeDesc')}
              </li>
              <li>
                <strong>{t('vanillaExtract.features.typeSafety')}</strong>{' '}
                {t('vanillaExtract.features.typeSafetyDesc')}
              </li>
              <li>
                <Trans
                  i18nKey="vanillaExtract.features.themingDesc"
                  t={t}
                  components={{ code: <code className="bg-gray-100 px-1 rounded" /> }}
                >
                  <strong>{t('vanillaExtract.features.theming')}</strong>{' '}
                </Trans>
              </li>
              <li>
                <strong>{t('vanillaExtract.features.sprinkles')}</strong>{' '}
                {t('vanillaExtract.features.sprinklesDesc')}
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title={t('vanillaExtract.basicUsage.title')} icon iconColor="purple">
          <p className="text-sm text-gray-700 mb-4">
            <Trans
              i18nKey="vanillaExtract.basicUsage.content"
              t={t}
              components={{ code: <code className="bg-gray-100 px-1 rounded" /> }}
            />
          </p>
          <div className="space-y-4">
            <CodeBlock code={basicStyleCode} language="tsx" className="text-xs" />
            <CodeBlock code={componentUsageCode} language="tsx" className="text-xs" />
          </div>
        </SubSection>

        <SubSection title={t('vanillaExtract.theming.title')} icon iconColor="purple">
          <p className="text-sm text-gray-700 mb-4">
            {t('vanillaExtract.theming.content')}
          </p>
          <CodeBlock code={themeContractCode} language="tsx" className="text-xs" />
        </SubSection>

        <SubSection title={t('vanillaExtract.recipes.title')} icon iconColor="purple">
          <p className="text-sm text-gray-700 mb-4">
            {t('vanillaExtract.recipes.content')}
          </p>
          <CodeBlock code={recipesCode} language="tsx" className="text-xs" />
        </SubSection>

        <SubSection title={t('vanillaExtract.sprinkles.title')} icon iconColor="purple">
          <p className="text-sm text-gray-700 mb-4">
            {t('vanillaExtract.sprinkles.content')}
          </p>
          <CodeBlock code={sprinklesCode} language="tsx" className="text-xs" />
        </SubSection>
      </div>
    </SectionCard>
  );
};
