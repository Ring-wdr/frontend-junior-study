import { Trans, useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { DataFetchingVisualizer } from './data-fetching-visualizer';

export const DataFetchingSection = () => {
  const { t } = useTranslation('week5');
  return (
    <SectionCard
      badge={{ label: t('dataFetching.badge'), color: 'orange' }}
      title={t('dataFetching.title')}
      description={t('dataFetching.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('dataFetching.serverFetching.title')}
          icon
          iconColor="orange"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans t={t} i18nKey="dataFetching.serverFetching.intro" components={{ code: <code /> }} />
            </p>

            <InfoBox
              variant="orange"
              title={t('dataFetching.serverFetching.strategy.title')}
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <Trans
                    t={t}
                    i18nKey="dataFetching.serverFetching.strategy.static"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="dataFetching.serverFetching.strategy.dynamic"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="dataFetching.serverFetching.strategy.incremental"
                  />
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`// app/posts/page.js

// Static: fetched once at build time
async function getStaticPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache', // default
  });
  return res.json();
}

// Dynamic: fetched on every request
async function getDynamicPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'no-store',
  });
  return res.json();
}

// ISR: fetched, then revalidated every 10 seconds
async function getRevalidatedPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 10 }, // revalidate every 10 seconds
  });
  return res.json();
}

export default async function PostsPage() {
  const posts = await getRevalidatedPosts();
  return <div>{/* render posts */}</div>;
}`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <DataFetchingVisualizer />

        <SubSection
          title={t('dataFetching.clientLibraries.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('dataFetching.clientLibraries.intro')}
            </p>

            <div className="grid grid-cols-1 gap-4">
              <InfoBox
                variant="blue"
                title={t('dataFetching.clientLibraries.axios.title')}
              >
                <p className="text-sm text-gray-700 mb-2">
                  {t('dataFetching.clientLibraries.axios.description')}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                  <li>{t('dataFetching.clientLibraries.axios.simpleAPI')}</li>
                  <li>{t('dataFetching.clientLibraries.axios.noCaching')}</li>
                  <li>{t('dataFetching.clientLibraries.axios.manualError')}</li>
                  <li>{t('dataFetching.clientLibraries.axios.goodFor')}</li>
                </ul>
              </InfoBox>

              <InfoBox
                variant="red"
                title={t('dataFetching.clientLibraries.swr.title')}
              >
                <p className="text-sm text-gray-700 mb-2">
                  <Trans
                    t={t}
                    i18nKey="dataFetching.clientLibraries.swr.description"
                  />
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                  <li>{t('dataFetching.clientLibraries.swr.autoCaching')}</li>
                  <li>{t('dataFetching.clientLibraries.swr.hooksAPI')}</li>
                  <li>
                    {t('dataFetching.clientLibraries.swr.backgroundRefetch')}
                  </li>
                  <li>{t('dataFetching.clientLibraries.swr.greatFor')}</li>
                  <li>{t('dataFetching.clientLibraries.swr.smallerBundle')}</li>
                </ul>

                <CodeBlock
                  code={`import useSWR from 'swr';

function Profile() {
  const { data, error, isLoading } = useSWR(
    '/api/user',
    fetch
  );

  if (error) return <div>Failed</div>;
  if (isLoading) return <div>Loading...</div>;

  return <div>Hello {data.name}</div>;
}`}
                  className="text-xs mt-2"
                />
              </InfoBox>

              <InfoBox
                variant="orange"
                title={t('dataFetching.clientLibraries.reactQuery.title')}
              >
                <p className="text-sm text-gray-700 mb-2">
                  {t('dataFetching.clientLibraries.reactQuery.description')}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                  <li>
                    {t('dataFetching.clientLibraries.reactQuery.advancedCaching')}
                  </li>
                  <li>
                    {t(
                      'dataFetching.clientLibraries.reactQuery.optimisticUpdates'
                    )}
                  </li>
                  <li>
                    {t('dataFetching.clientLibraries.reactQuery.devTools')}
                  </li>
                  <li>
                    {t('dataFetching.clientLibraries.reactQuery.pagination')}
                  </li>
                  <li>
                    {t('dataFetching.clientLibraries.reactQuery.largerBundle')}
                  </li>
                </ul>

                <CodeBlock
                  code={`import { useQuery } from '@tanstack/react-query';

function Profile() {
  const {
    data,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await fetch('/api/user');
      return res.json();
    },
  });

  if (error) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <button onClick={() => refetch()}>Refetch</button>
    </div>
  );
}`}
                  className="text-xs mt-2"
                />
              </InfoBox>
            </div>

            <InfoBox
              variant="gray"
              title={t('dataFetching.clientLibraries.comparison.title')}
            >
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">
                        {t('dataFetching.clientLibraries.comparison.feature')}
                      </th>
                      <th className="text-left p-2">Axios</th>
                      <th className="text-left p-2">SWR</th>
                      <th className="text-left p-2">React Query</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">
                        {t('dataFetching.clientLibraries.comparison.bundleSize')}
                      </td>
                      <td className="p-2">~6KB</td>
                      <td className="p-2">~4KB</td>
                      <td className="p-2">~15KB</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">
                        {t('dataFetching.clientLibraries.comparison.caching')}
                      </td>
                      <td className="p-2">
                        {t('dataFetching.clientLibraries.comparison.no')}
                      </td>
                      <td className="p-2">
                        {t('dataFetching.clientLibraries.comparison.yes')}
                      </td>
                      <td className="p-2">
                        {t('dataFetching.clientLibraries.comparison.yesAdvanced')}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">
                        {t('dataFetching.clientLibraries.comparison.revalidation')}
                      </td>
                      <td className="p-2">
                        {t('dataFetching.clientLibraries.comparison.manual')}
                      </td>
                      <td className="p-2">
                        {t('dataFetching.clientLibraries.comparison.auto')}
                      </td>
                      <td className="p-2">
                        {t('dataFetching.clientLibraries.comparison.autoSmart')}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">
                        {t('dataFetching.clientLibraries.comparison.devTools')}
                      </td>
                      <td className="p-2">
                        {t('dataFetching.clientLibraries.comparison.no')}
                      </td>
                      <td className="p-2">
                        {t('dataFetching.clientLibraries.comparison.no')}
                      </td>
                      <td className="p-2">
                        {t('dataFetching.clientLibraries.comparison.yes')}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">
                        {t('dataFetching.clientLibraries.comparison.bestFor')}
                      </td>
                      <td className="p-2">
                        {t('dataFetching.clientLibraries.comparison.simple')}
                      </td>
                      <td className="p-2">
                        {t('dataFetching.clientLibraries.comparison.moderate')}
                      </td>
                      <td className="p-2">
                        {t('dataFetching.clientLibraries.comparison.complex')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('dataFetching.choosingStrategy.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <InfoBox
              variant="blue"
              title={t('dataFetching.choosingStrategy.useServer.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('dataFetching.choosingStrategy.useServer.static')}</li>
                <li>{t('dataFetching.choosingStrategy.useServer.seo')}</li>
                <li>{t('dataFetching.choosingStrategy.useServer.dbAPI')}</li>
                <li>
                  {t('dataFetching.choosingStrategy.useServer.zeroOverhead')}
                </li>
              </ul>
            </InfoBox>

            <InfoBox
              variant="purple"
              title={t('dataFetching.choosingStrategy.useClient.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('dataFetching.choosingStrategy.useClient.frequent')}</li>
                <li>
                  {t('dataFetching.choosingStrategy.useClient.userTrigger')}
                </li>
                <li>
                  {t('dataFetching.choosingStrategy.useClient.interactive')}
                </li>
                <li>
                  {t('dataFetching.choosingStrategy.useClient.backgroundSync')}
                </li>
              </ul>
            </InfoBox>

            <InfoBox
              variant="green"
              title={t('dataFetching.choosingStrategy.selectionGuide.title')}
            >
              <p className="text-sm text-gray-700 mb-2">
                <Trans
                  t={t}
                  i18nKey="dataFetching.choosingStrategy.selectionGuide.blog"
                />
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <Trans
                  t={t}
                  i18nKey="dataFetching.choosingStrategy.selectionGuide.dashboard"
                />
              </p>
              <p className="text-sm text-gray-700">
                <Trans
                  t={t}
                  i18nKey="dataFetching.choosingStrategy.selectionGuide.ecommerce"
                />
              </p>
            </InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
