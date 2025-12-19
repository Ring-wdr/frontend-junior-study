import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { AppRouterVisualizer } from './app-router-visualizer';

export const AppRouterSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Next.js 13+', color: 'blue' }}
      title="Next.js App Router"
      description="The new file-system based router built on React Server Components."
    >
      <div className="space-y-8">
        <SubSection title="App Router Fundamentals" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              The <strong>App Router</strong> is Next.js's new file-system based
              routing system. Located in the <code>app/</code> directory, it
              replaces the old <code>pages/</code> directory. It's built on
              React Server Components and provides powerful features for modern
              web applications.
            </p>

            <InfoBox variant="blue" title="Key Files & Conventions">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <code>page.js/page.tsx</code>: Route segment's unique UI
                </li>
                <li>
                  <code>layout.js/layout.tsx</code>: Shared UI for segment and
                  children
                </li>
                <li>
                  <code>loading.js</code>: Loading UI (Suspense fallback)
                </li>
                <li>
                  <code>error.js</code>: Error boundary & error UI
                </li>
                <li>
                  <code>not-found.js</code>: Custom 404 not found UI
                </li>
                <li>
                  <code>route.js</code>: API endpoint (Route Handler)
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`// Folder structure
app/
├── layout.js          // Root layout
├── page.js            // Home route
├── dashboard/
│   ├── layout.js      // Dashboard layout (child)
│   ├── page.js        // /dashboard
│   ├── loading.js     // Loading UI for /dashboard
│   ├── error.js       // Error boundary
│   └── [id]/
│       └── page.js    // /dashboard/[id] (dynamic)
└── api/
    └── users/
        └── route.js   // API endpoint`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title="Layouts & Nested Routing" icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Layouts enable code sharing across routes. They don't re-render
              between navigation and preserve state. Nesting layouts creates a
              hierarchical UI structure.
            </p>

            <CodeBlock
              code={`// app/layout.js (Root Layout)
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>My App</title>
      </head>
      <body>
        <nav>Navigation</nav>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}

// app/dashboard/layout.js (Nested Layout)
export default function DashboardLayout({ children }) {
  return (
    <div>
      <aside>Sidebar</aside>
      <main>{children}</main>
    </div>
  );
}

// URL /dashboard shows: Nav > Sidebar + Main > Footer`}
              className="text-xs"
            />

            <InfoBox variant="green" title="Layout Benefits">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Code reuse across segments</li>
                <li>State persistence between route changes</li>
                <li>No unnecessary re-renders</li>
                <li>Hierarchical UI structure</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="Parallel Routes" icon iconColor="purple">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <strong>Parallel Routes</strong> let you render multiple
              components in the same layout simultaneously. Use them for
              multi-panel layouts or independent sections that update
              separately.
            </p>

            <CodeBlock
              code={`// Folder structure
app/
├── layout.js
└── dashboard/
    ├── layout.js
    ├── @main/
    │   └── page.js
    ├── @sidebar/
    │   └── page.js
    └── @analytics/
        └── page.js

// app/dashboard/layout.js
export default function DashboardLayout({ children, main, sidebar, analytics }) {
  return (
    <div>
      <section>{main}</section>
      <aside>{sidebar}</aside>
      <section>{analytics}</section>
    </div>
  );
}`}
              className="text-xs"
            />

            <InfoBox variant="purple" title="Use Cases">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Multi-panel dashboards</li>
                <li>Tabbed interfaces</li>
                <li>Analytics sidebars</li>
                <li>Independent sections with separate loading states</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title="Intercepting Routes & Modal Routing"
          icon
          iconColor="orange"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <strong>Intercepting Routes</strong> allow you to "intercept" a
              route from another part of your app and show it within the current
              layout. Perfect for modal dialogs or detail views.
            </p>

            <InfoBox variant="orange" title="Modal Routing Pattern">
              <p className="text-sm text-gray-700 mb-2">
                Intercept a route to show as a modal while keeping the
                background content in place. Maintains browser history
                naturally.
              </p>
            </InfoBox>

            <CodeBlock
              code={`// Folder structure
app/
├── photos/
│   ├── page.js              // Photo list
│   ├── [id]/
│   │   └── page.js          // Full photo page
│   └── @modal/(.)photo/
│       ├── @modal/
│       │   └── [id]/
│       │       └── page.js  // Modal component
│       └── default.js       // Empty state
└── layout.js                // Has @modal slot

// Behavior:
// - Link from /photos to /photos/123
//   Shows modal: background is /photos, modal shows /photos/123
//
// - Direct visit to /photos/123
//   Shows full page (no modal background)

// app/layout.js
export default function RootLayout({ children, modal }) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

// app/photos/@modal/(.)photo/[id]/page.js (Modal)
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PhotoModal({ params }) {
  const router = useRouter();

  return (
    <div className="modal-overlay" onClick={() => router.back()}>
      <div className="modal">
        <button onClick={() => router.back()}>Close</button>
        <img src={\`/photos/\${params.id}.jpg\`} />
      </div>
    </div>
  );
}`}
              className="text-xs"
            />

            <InfoBox variant="gray" title="Routing Syntax">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  <code>(.)</code>: Match segments on same level
                </li>
                <li>
                  <code>(..)</code>: Match segments up one level
                </li>
                <li>
                  <code>(...)</code>: Match segments up multiple levels
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <AppRouterVisualizer />

        <SubSection title="Route Groups" icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <strong>Route Groups</strong> are folders wrapped in parentheses
              that don't affect the URL structure. Use them to organize related
              routes or apply different layouts.
            </p>

            <CodeBlock
              code={`// Folder structure
app/
├── (marketing)/
│   ├── layout.js         // Marketing layout (nav, footer)
│   ├── page.js           // / (home)
│   ├── about/
│   │   └── page.js       // /about
│   └── contact/
│       └── page.js       // /contact
├── (dashboard)/
│   ├── layout.js         // Dashboard layout (different nav)
│   ├── page.js           // /dashboard
│   └── settings/
│       └── page.js       // /dashboard/settings
└── layout.js             // Root layout

// Each group has its own layout
// URL structure is flat (no /marketing, /dashboard in path)`}
              className="text-xs"
            />
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
