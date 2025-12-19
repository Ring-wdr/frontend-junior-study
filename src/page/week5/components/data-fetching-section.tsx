import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const DataFetchingSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Data', color: 'orange' }}
      title="Data Fetching Strategies"
      description="SSR, ISR with extended fetch, and Client-side options (SWR, React Query)."
    >
      <div className="space-y-8">
        <SubSection
          title="Server-Side Fetching (Next.js)"
          icon
          iconColor="orange"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              In App Router, data fetching is built on the standard Web{' '}
              <code>fetch</code> API, extended with caching and revalidation.
            </p>
            <CodeBlock
              code={`// Static Data (Default) - like getStaticProps
fetch('https://api.example.com', { cache: 'force-cache' });

// Dynamic Data - like getServerSideProps
fetch('https://api.example.com', { cache: 'no-store' });

// Revalidated Data (ISR) - like getStaticProps with revalidate
fetch('https://api.example.com', { next: { revalidate: 10 } });`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title="Client-Side Fetching" icon iconColor="red">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              For client components, external libraries are recommended for
              handling state, caching, and revalidation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoBox variant="gray" title="Axios">
                <p className="text-xs text-gray-700">
                  Simple HTTP client. No built-in caching or state management.
                  Good for simple requests.
                </p>
              </InfoBox>
              <InfoBox variant="red" title="SWR">
                <p className="text-xs text-gray-700">
                  Lightweight. "Stale-while-revalidate" strategy. Great for
                  simple data syncing.
                </p>
              </InfoBox>
              <InfoBox variant="orange" title="React Query">
                <p className="text-xs text-gray-700">
                  Powerful server state manager. Caching, optimistic updates,
                  devtools. Standard for complex apps.
                </p>
              </InfoBox>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
