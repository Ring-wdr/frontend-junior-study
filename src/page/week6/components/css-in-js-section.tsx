import { useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const CssInJsSection = () => {
  const { t } = useTranslation('week6');
  return (
    <SectionCard
      badge={{ label: t('cssInJs.badge'), color: 'pink' }}
      title={t('cssInJs.title')}
      description={t('cssInJs.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('cssInJs.emotionStyled.title')}
          icon
          iconColor="pink"
        >
          <p className="text-sm text-gray-700 mb-4">
            {t('cssInJs.emotionStyled.content')}
          </p>
          <CodeBlock
            code={`import styled from '@emotion/styled';

type ButtonProps = {
  primary?: boolean;
};

const Button = styled.button<ButtonProps>\`
  padding: 10px 20px;
  border-radius: 4px;
  /* Dynamic styling based on props */
  background: \${props => props.primary ? 'hotpink' : 'white'};
  color: \${props => props.primary ? 'white' : 'hotpink'};
  border: 2px solid hotpink;

  &:hover {
    opacity: 0.8;
  }
\`;

render(<Button primary>Primary Button</Button>);`}
            language="tsx"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('cssInJs.prosCons.title')} icon iconColor="pink">
          <InfoBox variant="red" title={t('cssInJs.prosCons.infoTitle')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <strong>{t('cssInJs.prosCons.pros')}</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>{t('cssInJs.prosCons.prosItems.dynamic')}</li>
                  <li>{t('cssInJs.prosCons.prosItems.critical')}</li>
                  <li>{t('cssInJs.prosCons.prosItems.isolation')}</li>
                  <li>{t('cssInJs.prosCons.prosItems.theming')}</li>
                </ul>
              </div>
              <div>
                <strong>{t('cssInJs.prosCons.cons')}</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>
                    <strong>{t('cssInJs.prosCons.consItems.runtime')}</strong>{' '}
                    {t('cssInJs.prosCons.consItems.runtimeDesc')}
                  </li>
                  <li>{t('cssInJs.prosCons.consItems.bundle')}</li>
                  <li>{t('cssInJs.prosCons.consItems.ssr')}</li>
                </ul>
              </div>
            </div>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
