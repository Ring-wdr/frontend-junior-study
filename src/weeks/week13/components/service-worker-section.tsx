'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

type StrategyId =
  | 'cache-first'
  | 'network-first'
  | 'stale-while-revalidate'
  | 'network-only'
  | 'cache-only';

const lifecyclePhases = [
  { id: 'register', icon: '📝' },
  { id: 'install', icon: '📦' },
  { id: 'activate', icon: '✅' },
  { id: 'running', icon: '🏃' },
] as const;

const pwaComponents = [
  { id: 'manifest', icon: '📄' },
  { id: 'serviceWorker', icon: '⚙️' },
  { id: 'https', icon: '🔒' },
] as const;

export const ServiceWorkerSection = () => {
  const { t } = useTranslation('week13');
  const [activeStrategy, setActiveStrategy] =
    useState<StrategyId>('cache-first');

  const strategies: {
    id: StrategyId;
    name: string;
    desc: string;
    use: string;
  }[] = [
    {
      id: 'cache-first',
      name: t('serviceWorker.cacheStrategies.cacheFirst'),
      desc: t('serviceWorker.cacheStrategies.cacheFirstDesc'),
      use: t('serviceWorker.cacheStrategies.cacheFirstUse'),
    },
    {
      id: 'network-first',
      name: t('serviceWorker.cacheStrategies.networkFirst'),
      desc: t('serviceWorker.cacheStrategies.networkFirstDesc'),
      use: t('serviceWorker.cacheStrategies.networkFirstUse'),
    },
    {
      id: 'stale-while-revalidate',
      name: t('serviceWorker.cacheStrategies.staleWhileRevalidate'),
      desc: t('serviceWorker.cacheStrategies.staleWhileRevalidateDesc'),
      use: t('serviceWorker.cacheStrategies.staleWhileRevalidateUse'),
    },
    {
      id: 'network-only',
      name: t('serviceWorker.cacheStrategies.networkOnly'),
      desc: t('serviceWorker.cacheStrategies.networkOnlyDesc'),
      use: t('serviceWorker.cacheStrategies.networkOnlyUse'),
    },
    {
      id: 'cache-only',
      name: t('serviceWorker.cacheStrategies.cacheOnly'),
      desc: t('serviceWorker.cacheStrategies.cacheOnlyDesc'),
      use: t('serviceWorker.cacheStrategies.cacheOnlyUse'),
    },
  ];

  const strategyCode: Record<StrategyId, string> = {
    'cache-first': `// Cache First Strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Return cached response if available
      if (cached) return cached;

      // Otherwise fetch from network and cache
      return fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open('v1').then((cache) => {
          cache.put(event.request, clone);
        });
        return response;
      });
    })
  );
});`,
    'network-first': `// Network First Strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        const clone = response.clone();
        caches.open('v1').then((cache) => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => {
        // Fall back to cache if network fails
        return caches.match(event.request);
      })
  );
});`,
    'stale-while-revalidate': `// Stale While Revalidate Strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('v1').then((cache) => {
      return cache.match(event.request).then((cached) => {
        // Fetch in background
        const fetchPromise = fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });

        // Return cached immediately, update cache in background
        return cached || fetchPromise;
      });
    })
  );
});`,
    'network-only': `// Network Only Strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});`,
    'cache-only': `// Cache Only Strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request));
});`,
  };

  return (
    <SectionCard
      badge={{ label: t('serviceWorker.badge'), color: 'green' }}
      description={t('serviceWorker.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('serviceWorker.whatIs.title')}
          icon
          iconColor="blue"
        >
          <InfoBox variant="green" title={t('serviceWorker.whatIs.infoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('serviceWorker.whatIs.description')}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>{t('serviceWorker.whatIs.interceptRequests')}</li>
              <li>{t('serviceWorker.whatIs.cacheStorage')}</li>
              <li>{t('serviceWorker.whatIs.backgroundSync')}</li>
              <li>{t('serviceWorker.whatIs.pushNotifications')}</li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('serviceWorker.lifecycle.title')}
          icon
          iconColor="purple"
        >
          <DemoBox label={t('serviceWorker.lifecycle.label')}>
            <div className="grid grid-cols-2 sm:flex sm:items-start sm:justify-between gap-3 sm:gap-2">
              {lifecyclePhases.map((phase, idx) => (
                <div
                  key={phase.id}
                  className="flex items-start min-w-0 sm:flex-1"
                >
                  <div className="flex flex-col items-center min-w-0 flex-1">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl border-2 border-green-300">
                      {phase.icon}
                    </div>
                    <p className="text-xs font-bold mt-2 text-gray-800">
                      {t(`serviceWorker.lifecycle.${phase.id}`)}
                    </p>
                    <p className="text-[10px] text-gray-500 text-center mt-1 break-all sm:break-normal">
                      {t(`serviceWorker.lifecycle.${phase.id}Desc`)}
                    </p>
                  </div>
                  {idx < lifecyclePhases.length - 1 && (
                    <div className="hidden sm:block w-6 h-0.5 bg-green-300 mx-1 mt-6 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('serviceWorker.pwaComponents.title')}
          icon
          iconColor="green"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pwaComponents.map((item) => (
              <div
                key={item.id}
                className="bg-green-50 p-3 rounded border border-green-200 text-center"
              >
                <p className="text-2xl mb-2">{item.icon}</p>
                <p className="text-sm font-semibold text-green-900">
                  {t(`serviceWorker.pwaComponents.${item.id}`)}
                </p>
                <p className="text-xs text-green-700 mt-1">
                  {t(`serviceWorker.pwaComponents.${item.id}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection
          title={t('serviceWorker.cacheStrategies.title')}
          icon
          iconColor="orange"
        >
          <DemoBox label={t('serviceWorker.cacheStrategies.label')}>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {strategies.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveStrategy(s.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 ${
                      activeStrategy === s.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>

              {strategies
                .filter((s) => s.id === activeStrategy)
                .map((s) => (
                  <div
                    key={s.id}
                    className="bg-white p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900">{s.name}</h4>
                        <p className="text-sm text-gray-600">{s.desc}</p>
                      </div>
                      <span className="self-start shrink-0 text-xs bg-gray-100 px-2 py-1 rounded">
                        {s.use}
                      </span>
                    </div>
                    <CodeBlock code={strategyCode[s.id]} className="text-xs" />
                  </div>
                ))}
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('serviceWorker.registration.title')}
          icon
          iconColor="blue"
        >
          <CodeBlock
            code={`// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered:', registration.scope);

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New content available, prompt user to refresh
              console.log('New content available!');
            }
          }
        });
      });
    } catch (error) {
      console.error('SW registration failed:', error);
    }
  });
}`}
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('serviceWorker.workbox.title')}
          icon
          iconColor="red"
        >
          <InfoBox
            variant="purple"
            title={t('serviceWorker.workbox.infoTitle')}
          >
            <p className="text-sm mb-3">
              {t('serviceWorker.workbox.description')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`// Using Workbox for Service Worker
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst
} from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache build assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache images with Cache First
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// API calls with Network First
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 3,
  })
);`}
            className="text-xs mt-4"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
