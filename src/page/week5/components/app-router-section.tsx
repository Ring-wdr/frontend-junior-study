import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const AppRouterSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Next.js 13', color: 'blue' }}
      title="Next.js App Router"
      description="The new file-system based router built on React Server Components."
    >
      <div className="space-y-8">
        <SubSection title="File Conventions" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              The App Router uses a folder-based hierarchy inside the{' '}
              <code>app</code> directory. Special filenames define the UI.
            </p>
            <InfoBox variant="gray" title="Special Files">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <code>page.js</code>: The UI for a route.
                </li>
                <li>
                  <code>layout.js</code>: Shared UI for a segment and its
                  children.
                </li>
                <li>
                  <code>loading.js</code>: Loading UI (Suspense boundary).
                </li>
                <li>
                  <code>error.js</code>: Error UI (Error boundary).
                </li>
                <li>
                  <code>route.js</code>: API endpoint (Route Handler).
                </li>
              </ul>
            </InfoBox>
            <CodeBlock
              code={`// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

// app/page.js
export default function Page() {
  return <h1>Hello, Next.js!</h1>;
}`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title="Advanced Routing" icon iconColor="blue">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoBox variant="blue" title="Parallel Routes">
                <p className="text-sm text-gray-700 mb-2">
                  Render multiple pages in the same layout simultaneously using
                  "slots" (e.g. <code>@dashboard</code>, <code>@team</code>).
                </p>
              </InfoBox>
              <InfoBox variant="blue" title="Intercepting Routes">
                <p className="text-sm text-gray-700 mb-2">
                  Load a route from another part of the app within the current
                  layout (e.g., opening a photo in a modal while keeping the
                  feed visible).
                </p>
              </InfoBox>
            </div>
            <p className="text-sm text-gray-700 mt-2">
              Combined, these enable powerful patterns like{' '}
              <strong>Modal Routing</strong>.
            </p>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
