import { Trans, useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { ConcurrencyVisualizer } from './concurrency-visualizer';

export const ConcurrencySection = () => {
  const { t } = useTranslation('week5');
  return (
    <SectionCard
      badge={{ label: 'React 18', color: 'blue' }}
      title={t('concurrency.title')}
      description={t('concurrency.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('concurrency.whatIsConcurrent.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans t={t} i18nKey="concurrency.whatIsConcurrent.intro" />
            </p>
            <InfoBox
              variant="blue"
              title={t('concurrency.whatIsConcurrent.whyMatters.title')}
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <Trans
                    t={t}
                    i18nKey={
                      'concurrency.whatIsConcurrent.whyMatters.responsiveness'
                    }
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey={
                      'concurrency.whatIsConcurrent.whyMatters.interruptible'
                    }
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey={
                      'concurrency.whatIsConcurrent.whyMatters.seamlessUX'
                    }
                  />
                </li>
              </ul>
            </InfoBox>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <Trans
                  t={t}
                  i18nKey={'concurrency.whatIsConcurrent.beforeReact18'}
                />
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <Trans t={t} i18nKey={'concurrency.whatIsConcurrent.react18'} />
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('concurrency.useTransition.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans t={t} i18nKey="concurrency.useTransition.intro" components={{ code: <code /> }} />
            </p>

            <InfoBox
              variant="purple"
              title={t('concurrency.useTransition.api.title')}
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <Trans t={t} i18nKey="concurrency.useTransition.api.isPending" />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="concurrency.useTransition.api.startTransition"
                  />
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`import { useTransition, useState } from 'react';

export function SearchUsers() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;

    // Urgent: Update input immediately for responsiveness
    setInput(value);

    // Non-urgent: Filter large list in background
    startTransition(() => {
      const filtered = largeUserList.filter(user =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    });
  };

  return (
    <div>
      <input
        value={input}
        onChange={handleChange}
        placeholder="Search users..."
      />

      {isPending && <p>Searching...</p>}

      <ul>
        {results.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`}
              className="text-xs"
            />

            <InfoBox
              variant="gray"
              title={t('concurrency.useTransition.realWorldExample.title')}
            >
              <p className="text-sm text-gray-700">
                {t('concurrency.useTransition.realWorldExample.description')}
              </p>
            </InfoBox>
          </div>
        </SubSection>

        <ConcurrencyVisualizer />

        <SubSection
          title={t('concurrency.useDeferredValue.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans t={t} i18nKey="concurrency.useDeferredValue.intro" components={{ code: <code /> }} />
            </p>

            <InfoBox
              variant="purple"
              title={t('concurrency.useDeferredValue.whenToUse.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  {t(
                    'concurrency.useDeferredValue.whenToUse.expensiveComponent'
                  )}
                </li>
                <li>
                  {t('concurrency.useDeferredValue.whenToUse.prioritizeValue')}
                </li>
                <li>
                  {t(
                    'concurrency.useDeferredValue.whenToUse.cantWrapTransition'
                  )}
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`import { useDeferredValue, useState } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      {/* Results component with expensive rendering */}
      <ExpensiveResultsList query={deferredQuery} />
    </>
  );
}

// The input updates immediately (query),
// while the results update with deferred value (deferredQuery)`}
              className="text-xs"
            />

            <InfoBox
              variant="gray"
              title={t('concurrency.useDeferredValue.vsUseTransition.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  <Trans
                    t={t}
                    i18nKey="concurrency.useDeferredValue.vsUseTransition.useTransition"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="concurrency.useDeferredValue.vsUseTransition.useDeferredValue"
                  />
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('concurrency.automaticBatching.title')}
          icon
          iconColor="green"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans t={t} i18nKey="concurrency.automaticBatching.intro" />
            </p>

            <CodeBlock
              code={`// React 17: 2 re-renders
function handleClick() {
  setCount(c => c + 1);  // Re-render 1
  setFlag(f => !f);       // Re-render 2
}

// React 18: 1 re-render (Batched!)
function handleClick() {
  setCount(c => c + 1);  // Batched
  setFlag(f => !f);       // Batched - single re-render
}

// Also works in promises and timers
Promise.resolve().then(() => {
  setCount(c => c + 1);  // Batched
  setFlag(f => !f);       // Batched - single re-render
});

setTimeout(() => {
  setCount(c => c + 1);  // Batched
  setFlag(f => !f);       // Batched - single re-render
}, 1000);`}
              className="text-xs"
            />

            <InfoBox
              variant="green"
              title={t('concurrency.automaticBatching.performanceBenefits.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  {t(
                    'concurrency.automaticBatching.performanceBenefits.fewerRerenders'
                  )}
                </li>
                <li>
                  {t('concurrency.automaticBatching.performanceBenefits.automatic')}
                </li>
                <li>
                  {t('concurrency.automaticBatching.performanceBenefits.appliesTo')}
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="concurrency.automaticBatching.performanceBenefits.flushSync"
                  />
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('concurrency.otherFeatures.title')}
          icon
          iconColor="orange"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <InfoBox
                variant="blue"
                title={t('concurrency.otherFeatures.useId.title')}
              >
                <p className="text-sm text-gray-700 mb-2">
                  {t('concurrency.otherFeatures.useId.description')}
                </p>
                <CodeBlock
                  code={`const id = useId();
return <label htmlFor={id}>Name</label>;`}
                  className="text-xs"
                />
              </InfoBox>

              <InfoBox
                variant="purple"
                title={t('concurrency.otherFeatures.suspenseForData.title')}
              >
                <p className="text-sm text-gray-700 mb-2">
                  {t('concurrency.otherFeatures.suspenseForData.description')}
                </p>
              </InfoBox>

              <InfoBox
                variant="green"
                title={t('concurrency.otherFeatures.streamingHTML.title')}
              >
                <p className="text-sm text-gray-700 mb-2">
                  {t('concurrency.otherFeatures.streamingHTML.description')}
                </p>
              </InfoBox>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
