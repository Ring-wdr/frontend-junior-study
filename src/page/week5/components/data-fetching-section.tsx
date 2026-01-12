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
              <Trans
                t={t}
                i18nKey="dataFetching.serverFetching.intro"
                components={{ code: <code /> }}
              />
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

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            {t('dataFetching.visualizer.intro')}
          </p>
          <DataFetchingVisualizer />
        </div>

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
                    {t(
                      'dataFetching.clientLibraries.reactQuery.advancedCaching',
                    )}
                  </li>
                  <li>
                    {t(
                      'dataFetching.clientLibraries.reactQuery.optimisticUpdates',
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
                        {t(
                          'dataFetching.clientLibraries.comparison.bundleSize',
                        )}
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
                        {t(
                          'dataFetching.clientLibraries.comparison.yesAdvanced',
                        )}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">
                        {t(
                          'dataFetching.clientLibraries.comparison.revalidation',
                        )}
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
          title={t('dataFetching.suspensive.title')}
          icon
          iconColor="pink"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans
                t={t}
                i18nKey="dataFetching.suspensive.description"
                components={{ strong: <strong />, code: <code /> }}
              />
            </p>

            <InfoBox
              variant="purple"
              title={t('dataFetching.suspensive.packages.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  <Trans
                    t={t}
                    i18nKey="dataFetching.suspensive.packages.react"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="dataFetching.suspensive.packages.reactQuery"
                  />
                </li>
              </ul>
            </InfoBox>

            <InfoBox
              variant="green"
              title={t('dataFetching.suspensive.benefits.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  <Trans
                    t={t}
                    i18nKey="dataFetching.suspensive.benefits.declarative"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="dataFetching.suspensive.benefits.predictable"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="dataFetching.suspensive.benefits.composable"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="dataFetching.suspensive.benefits.integration"
                  />
                </li>
              </ul>
            </InfoBox>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-800">
                {t('dataFetching.suspensive.queryOptions.title')}
              </h4>
              <p className="text-sm text-gray-700">
                <Trans
                  t={t}
                  i18nKey="dataFetching.suspensive.queryOptions.description"
                  components={{ code: <code /> }}
                />
              </p>
              <CodeBlock
                code={`import { queryOptions } from '@suspensive/react-query'

// queryKey와 queryFn을 하나로 묶어 재사용
const userQueryOptions = (userId: number) =>
  queryOptions({
    queryKey: ['users', userId],
    queryFn: () => fetchUser(userId),
  })

// SuspenseQuery, useQuery, queryClient에서 직접 사용
queryClient.prefetchQuery(userQueryOptions(1))
queryClient.invalidateQueries(userQueryOptions(1))`}
                className="text-xs"
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-800">
                {t('dataFetching.suspensive.suspenseQuery.title')}
              </h4>
              <p className="text-sm text-gray-700">
                <Trans
                  t={t}
                  i18nKey="dataFetching.suspensive.suspenseQuery.description"
                  components={{ code: <code /> }}
                />
              </p>
              <CodeBlock
                code={`import { SuspenseQuery } from '@suspensive/react-query'
import { Suspense, ErrorBoundary } from '@suspensive/react'

const PostsPage = ({ userId }) => (
  <ErrorBoundary fallback={({ error }) => <>{error.message}</>}>
    <Suspense fallback="loading...">
      {/* Suspense 발생 여부가 명확하게 보임 */}
      <SuspenseQuery {...userQueryOptions(userId)}>
        {({ data: user }) => <UserProfile {...user} />}
      </SuspenseQuery>
      <SuspenseQuery
        {...postsQueryOptions(userId)}
        select={(posts) => posts.filter(p => p.isPublic)}
      >
        {({ data: posts }) =>
          posts.map(post => <PostItem key={post.id} {...post} />)
        }
      </SuspenseQuery>
    </Suspense>
  </ErrorBoundary>
)`}
                className="text-xs"
              />
            </div>

            <InfoBox
              variant="red"
              title={t('dataFetching.suspensive.errorBoundary.title')}
            >
              <p className="text-sm text-gray-700 mb-2">
                <Trans
                  t={t}
                  i18nKey="dataFetching.suspensive.errorBoundary.description"
                  components={{ code: <code /> }}
                />
              </p>
              <CodeBlock
                code={`import { ErrorBoundary } from '@suspensive/react'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'

// React Query 에러 리셋과 통합
const App = () => {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <ErrorBoundary
      onReset={reset}
      fallback={({ error, reset }) => (
        <button onClick={reset}>Try again: {error.message}</button>
      )}
    >
      <MyComponent />
    </ErrorBoundary>
  )
}`}
                className="text-xs mt-2"
              />
            </InfoBox>

            <InfoBox
              variant="gray"
              title={t('dataFetching.suspensive.comparison.title')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">
                    {t('dataFetching.suspensive.comparison.withHook')}
                  </p>
                  <CodeBlock
                    code={`// 이 컴포넌트가 Suspense를 발생시킬지
// 이름만 봐서는 알 수 없음
const PostsPage = ({ userId }) => (
  <Suspense fallback="loading...">
    <UserInfo userId={userId} />
    <PostList userId={userId} />
  </Suspense>
)

// 내부에서 useSuspenseQuery 사용
const UserInfo = ({ userId }) => {
  const { data } = useSuspenseQuery(...)
  return <Profile {...data} />
}`}
                    className="text-xs"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">
                    {t('dataFetching.suspensive.comparison.withSuspenseQuery')}
                  </p>
                  <CodeBlock
                    code={`// SuspenseQuery가 명시적으로 보임
// 어디서 Suspense가 발생하는지 명확
const PostsPage = ({ userId }) => (
  <Suspense fallback="loading...">
    <SuspenseQuery {...userQueryOptions(userId)}>
      {({ data }) => <Profile {...data} />}
    </SuspenseQuery>
    <SuspenseQuery {...postsQueryOptions(userId)}>
      {({ data }) => <PostList posts={data} />}
    </SuspenseQuery>
  </Suspense>
)`}
                    className="text-xs"
                  />
                </div>
              </div>
            </InfoBox>

            <InfoBox
              variant="orange"
              title={t('dataFetching.suspensive.deprecation.title')}
            >
              <p className="text-sm text-gray-700">
                <Trans
                  t={t}
                  i18nKey="dataFetching.suspensive.deprecation.description"
                  components={{ code: <code /> }}
                />
              </p>
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
