import { Trans, useTranslation } from 'react-i18next';
import { InfoBox, SectionCard } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const DslSection = () => {
  const { t } = useTranslation('week1');

  return (
    <SectionCard
      badge={{ label: t('dsl.badge'), color: 'teal' }}
      title={t('dsl.title')}
      description={t('dsl.description')}
      testId="dsl-section"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div>
          <InfoBox variant="blue" className="bg-teal-50 border-teal-100 h-full">
            <div>
              <h4 className="font-bold text-teal-900 mb-2">
                {t('dsl.whatIsDsl.title')}
              </h4>
              <p className="text-sm text-teal-800 mb-4">
                {t('dsl.whatIsDsl.description')}
              </p>
              <ul className="list-disc list-inside text-sm text-teal-800 space-y-2">
                <li>
                  <Trans t={t} i18nKey="dsl.whatIsDsl.internal" />
                </li>
                <li>
                  <Trans t={t} i18nKey="dsl.whatIsDsl.external" />
                </li>
              </ul>
            </div>
          </InfoBox>
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {t('dsl.examples.reactJsx')}
            </span>
            <CodeBlock
              language="jsx"
              code={`// JSX is a DSL for defining UI structure
// It gets transpiled to regular JS calls:
// React.createElement('div', ...)`}
            />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {t('dsl.examples.sql')}
            </span>
            <CodeBlock
              language="sql"
              code={`SELECT id, name FROM users
WHERE active = true;`}
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
};
