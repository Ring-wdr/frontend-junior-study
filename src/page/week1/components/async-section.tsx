import { useTranslation } from 'react-i18next';
import { ContentGrid, SectionCard, SectionDivider } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { AbortControllerDemo } from './abort-controller-demo';
import { PromiseVisualizer } from './promise-visualizer';

export const AsyncSection = () => {
  const { t } = useTranslation('week1');

  return (
    <SectionCard
      badge={{ label: t('async.badge'), color: 'orange' }}
      title={t('async.title')}
      description={t('async.description')}
      testId="async-section"
    >
      <PromiseVisualizer />

      <SectionDivider
        variant="line"
        className="my-6 border-t border-gray-100"
      />

      <ContentGrid
        columns={2}
        items={[
          {
            title: t('async.promiseAll.title'),
            description: t('async.promiseAll.description'),
          },
          {
            title: t('async.promiseAllSettled.title'),
            description: t('async.promiseAllSettled.description'),
          },
          {
            title: t('async.promiseRace.title'),
            description: t('async.promiseRace.description'),
          },
          {
            title: t('async.promiseAny.title'),
            description: t('async.promiseAny.description'),
          },
        ]}
      />

      <div className="mt-8">
        <h4 className="font-bold text-gray-900 mb-3">
          {t('async.withResolvers.title')}
        </h4>
        <p className="text-sm text-gray-600 mb-3">
          {t('async.withResolvers.description')}
        </p>
        <CodeBlock
          code={`const { promise, resolve, reject } = Promise.withResolvers();

// Resolve from outside
setTimeout(() => resolve('Done!'), 1000);

promise.then(console.log); // 'Done!' after 1s`}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold text-gray-900 text-sm mb-2">
            {t('async.promiseResolve.title')}
          </h4>
          <p className="text-xs text-gray-500 mb-2">
            {t('async.promiseResolve.description')}
          </p>
          <CodeBlock
            code={`Promise.resolve(42)
  .then(x => x * 2)
  .then(console.log); // 84`}
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm mb-2">
            {t('async.promiseReject.title')}
          </h4>
          <p className="text-xs text-gray-500 mb-2">
            {t('async.promiseReject.description')}
          </p>
          <CodeBlock
            code={`Promise.reject('Error!')
  .catch(console.error);
// 'Error!'`}
          />
        </div>
      </div>

      <SectionDivider
        variant="line"
        className="my-8 border-t border-gray-100"
      />

      <div>
        <h4 className="font-bold text-gray-900 mb-3 text-red-600">
          {t('async.abortController.title')}
        </h4>
        <p className="text-sm text-gray-600 mb-6">
          {t('async.abortController.description')}
        </p>
        <AbortControllerDemo />
      </div>
    </SectionCard>
  );
};
