import { Trans, useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { AppRouterVisualizer } from './app-router-visualizer';

export const AppRouterSection = () => {
  const { t } = useTranslation('week5');
  return (
    <SectionCard
      badge={{ label: t('appRouter.badge'), color: 'blue' }}
      title={t('appRouter.title')}
      description={t('appRouter.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('appRouter.fundamentals.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans t={t} i18nKey="appRouter.fundamentals.intro" components={{ code: <code /> }} />
            </p>

            <InfoBox
              variant="blue"
              title={t('appRouter.fundamentals.keyFiles.title')}
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <Trans t={t} i18nKey="appRouter.fundamentals.keyFiles.page" components={{ code: <code /> }} />
                </li>
                <li>
                  <Trans t={t} i18nKey="appRouter.fundamentals.keyFiles.layout" components={{ code: <code /> }} />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="appRouter.fundamentals.keyFiles.loading"
                    components={{ code: <code /> }}
                  />
                </li>
                <li>
                  <Trans t={t} i18nKey="appRouter.fundamentals.keyFiles.error" components={{ code: <code /> }} />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="appRouter.fundamentals.keyFiles.notFound"
                    components={{ code: <code /> }}
                  />
                </li>
                <li>
                  <Trans t={t} i18nKey="appRouter.fundamentals.keyFiles.route" components={{ code: <code /> }} />
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

        <SubSection title={t('appRouter.layouts.title')} icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('appRouter.layouts.intro')}
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

            <InfoBox
              variant="green"
              title={t('appRouter.layouts.benefits.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('appRouter.layouts.benefits.codeReuse')}</li>
                <li>{t('appRouter.layouts.benefits.statePersistence')}</li>
                <li>{t('appRouter.layouts.benefits.noRerenders')}</li>
                <li>{t('appRouter.layouts.benefits.hierarchical')}</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('appRouter.parallelRoutes.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans t={t} i18nKey="appRouter.parallelRoutes.intro" />
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

            <InfoBox
              variant="purple"
              title={t('appRouter.parallelRoutes.useCases.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('appRouter.parallelRoutes.useCases.dashboards')}</li>
                <li>{t('appRouter.parallelRoutes.useCases.tabs')}</li>
                <li>{t('appRouter.parallelRoutes.useCases.analyticsSidebars')}</li>
                <li>
                  {t('appRouter.parallelRoutes.useCases.independentSections')}
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('appRouter.interceptingRoutes.title')}
          icon
          iconColor="orange"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans t={t} i18nKey="appRouter.interceptingRoutes.intro" />
            </p>

            <InfoBox
              variant="orange"
              title={t('appRouter.interceptingRoutes.modalPattern.title')}
            >
              <p className="text-sm text-gray-700 mb-2">
                {t('appRouter.interceptingRoutes.modalPattern.description')}
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

            <InfoBox
              variant="gray"
              title={t('appRouter.interceptingRoutes.syntax.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  <Trans
                    t={t}
                    i18nKey="appRouter.interceptingRoutes.syntax.sameLevel"
                    components={{ code: <code /> }}
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="appRouter.interceptingRoutes.syntax.oneUp"
                    components={{ code: <code /> }}
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="appRouter.interceptingRoutes.syntax.multiple"
                    components={{ code: <code /> }}
                  />
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <AppRouterVisualizer />

        <SubSection
          title={t('appRouter.routeGroups.title')}
          icon
          iconColor="green"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans t={t} i18nKey="appRouter.routeGroups.intro" />
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
