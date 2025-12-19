import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { DataFetchingVisualizer } from './data-fetching-visualizer';

export const DataFetchingSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Data', color: 'orange' }}
      title="Data Fetching Strategies"
      description="SSR, ISR with extended fetch, and Client-side options (SWR, React Query)."
    >
      <div className="space-y-8">
        <SubSection title="Server-Side Fetching" icon iconColor="orange">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              In Next.js App Router, data fetching uses the standard Web{' '}
              <code>fetch</code> API,{' '}
              <strong>extended with caching and revalidation</strong> options.
              This replaces the old <code>getStaticProps</code> and{' '}
              <code>getServerSideProps</code> patterns.
            </p>

            <InfoBox variant="orange" title="Fetch Caching Strategy">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Static (cache: 'force-cache'):</strong> Data is
                  fetched at build time and reused indefinitely
                </li>
                <li>
                  <strong>Dynamic (cache: 'no-store'):</strong> Data is fetched
                  on every request (like SSR)
                </li>
                <li>
                  <strong>Incremental (next.revalidate):</strong> Data is cached
                  but revalidated after a set duration (like ISR)
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
          title="Client-Side Fetching Libraries"
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              For client components, use specialized libraries designed for
              managing server state, caching, and automatic revalidation. Each
              has different trade-offs.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <InfoBox variant="blue" title="Axios">
                <p className="text-sm text-gray-700 mb-2">
                  A lightweight HTTP client library for making requests.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                  <li>Simple Promise-based API</li>
                  <li>No built-in caching or state management</li>
                  <li>Manual error handling</li>
                  <li>Good for simple requests or API integration</li>
                </ul>
              </InfoBox>

              <InfoBox variant="red" title="SWR">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Stale-While-Revalidate:</strong> Lightweight data
                  fetching library from Vercel.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                  <li>Automatic caching and revalidation</li>
                  <li>React hooks-based API</li>
                  <li>Background refetching</li>
                  <li>Great for simple to moderate apps</li>
                  <li>Smaller bundle than React Query (~4KB)</li>
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

              <InfoBox variant="orange" title="React Query (TanStack Query)">
                <p className="text-sm text-gray-700 mb-2">
                  Powerful server state management for complex applications.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                  <li>Advanced caching & background sync</li>
                  <li>Optimistic updates</li>
                  <li>DevTools for debugging</li>
                  <li>Pagination & infinite queries</li>
                  <li>Larger bundle (~15KB) but more features</li>
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

            <InfoBox variant="gray" title="Comparison Table">
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Feature</th>
                      <th className="text-left p-2">Axios</th>
                      <th className="text-left p-2">SWR</th>
                      <th className="text-left p-2">React Query</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Bundle Size</td>
                      <td className="p-2">~6KB</td>
                      <td className="p-2">~4KB</td>
                      <td className="p-2">~15KB</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Caching</td>
                      <td className="p-2">No</td>
                      <td className="p-2">Yes</td>
                      <td className="p-2">Yes (Advanced)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Revalidation</td>
                      <td className="p-2">Manual</td>
                      <td className="p-2">Auto</td>
                      <td className="p-2">Auto (Smart)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">DevTools</td>
                      <td className="p-2">No</td>
                      <td className="p-2">No</td>
                      <td className="p-2">Yes</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">Best For</td>
                      <td className="p-2">Simple</td>
                      <td className="p-2">Moderate</td>
                      <td className="p-2">Complex</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="Choosing the Right Strategy" icon iconColor="purple">
          <div className="space-y-4">
            <InfoBox variant="blue" title="Use Server Fetching when...">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Data doesn't change frequently (static content)</li>
                <li>You need SEO optimization</li>
                <li>Building pages with databases or APIs</li>
                <li>Want zero client-side overhead</li>
              </ul>
            </InfoBox>

            <InfoBox variant="purple" title="Use Client Fetching when...">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Data updates frequently (real-time dashboards)</li>
                <li>User needs to trigger fetches (search, pagination)</li>
                <li>Building interactive features</li>
                <li>Needing background sync and caching</li>
              </ul>
            </InfoBox>

            <InfoBox variant="green" title="Selection Guide">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Blog/Content sites:</strong> Server fetching with ISR
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Real-time dashboards:</strong> React Query or SWR
              </p>
              <p className="text-sm text-gray-700">
                <strong>E-commerce product pages:</strong> Server fetching + SWR
                for reviews/ratings
              </p>
            </InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
