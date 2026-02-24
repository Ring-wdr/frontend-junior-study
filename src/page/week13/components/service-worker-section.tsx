import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const ServiceWorkerSection = () => {
  const { t } = useTranslation('week13');
  const [activeStrategy, setActiveStrategy] = useState<string>('cache-first');

  const strategies = [
    {
      id: 'cache-first',
      name: t('serviceWorker.cacheStrategies.cacheFirst'),
      desc: t('serviceWorker.cacheStrategies.cacheFirstDesc'),
      use: t('serviceWorker.cacheStrategies.cacheFirstUse'),
      color: 'blue',
    },
    {
      id: 'network-first',
      name: t('serviceWorker.cacheStrategies.networkFirst'),
      desc: t('serviceWorker.cacheStrategies.networkFirstDesc'),
      use: t('serviceWorker.cacheStrategies.networkFirstUse'),
      color: 'green',
    },
    {
      id: 'stale-while-revalidate',
      name: t('serviceWorker.cacheStrategies.staleWhileRevalidate'),
      desc: t('serviceWorker.cacheStrategies.staleWhileRevalidateDesc'),
      use: t('serviceWorker.cacheStrategies.staleWhileRevalidateUse'),
      color: 'purple',
    },
    {
      id: 'network-only',
      name: t('serviceWorker.cacheStrategies.networkOnly'),
      desc: t('serviceWorker.cacheStrategies.networkOnlyDesc'),
      use: t('serviceWorker.cacheStrategies.networkOnlyUse'),
      color: 'orange',
    },
    {
      id: 'cache-only',
      name: t('serviceWorker.cacheStrategies.cacheOnly'),
      desc: t('serviceWorker.cacheStrategies.cacheOnlyDesc'),
      use: t('serviceWorker.cacheStrategies.cacheOnlyUse'),
      color: 'red',
    },
  ];

  const strategyCode: Record<string, string> = {
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
      badge={{ label: 'PWA', color: 'green' }}
      title="Service Worker & PWA"
      description="Build offline-capable web applications with programmable proxy"
    >
      <div className="space-y-8">
        <SubSection title="What is Service Worker?" icon iconColor="blue">
          <InfoBox variant="green" title="Programmable Network Proxy">
            <p className="text-sm leading-relaxed">
              Service Worker is a script that runs in the background, separate
              from the web page. It acts as a{' '}
              <strong>programmable proxy layer</strong> between your app and the
              network.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <strong>Intercept Requests:</strong> Handle fetch events for
                custom responses
              </li>
              <li>
                <strong>Cache Storage:</strong> Store and serve cached resources
              </li>
              <li>
                <strong>Background Sync:</strong> Queue requests when offline
              </li>
              <li>
                <strong>Push Notifications:</strong> Receive push messages
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Service Worker Lifecycle" icon iconColor="purple">
          <DemoBox label="Lifecycle Visualization">
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
              {[
                {
                  step: 'Register',
                  icon: '📝',
                  desc: 'navigator.serviceWorker.register()',
                },
                { step: 'Install', icon: '📦', desc: 'Pre-cache assets' },
                { step: 'Activate', icon: '✅', desc: 'Clean old caches' },
                { step: 'Running', icon: '🏃', desc: 'Handle fetch events' },
              ].map((phase, idx) => (
                <div key={phase.step} className="flex items-center">
                  <div className="flex flex-col items-center min-w-[80px]">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl border-2 border-green-300">
                      {phase.icon}
                    </div>
                    <p className="text-xs font-bold mt-2 text-gray-800">
                      {phase.step}
                    </p>
                    <p className="text-[10px] text-gray-500 text-center mt-1">
                      {phase.desc}
                    </p>
                  </div>
                  {idx < 3 && <div className="w-8 h-0.5 bg-green-300 mx-1" />}
                </div>
              ))}
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="PWA Components" icon iconColor="green">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-50 p-3 rounded border border-green-200 text-center">
              <p className="text-2xl mb-2">📄</p>
              <p className="text-sm font-semibold text-green-900">
                manifest.json
              </p>
              <p className="text-xs text-green-700 mt-1">App metadata</p>
            </div>
            <div className="bg-green-50 p-3 rounded border border-green-200 text-center">
              <p className="text-2xl mb-2">⚙️</p>
              <p className="text-sm font-semibold text-green-900">
                Service Worker
              </p>
              <p className="text-xs text-green-700 mt-1">Offline logic</p>
            </div>
            <div className="bg-green-50 p-3 rounded border border-green-200 text-center">
              <p className="text-2xl mb-2">🔒</p>
              <p className="text-sm font-semibold text-green-900">HTTPS</p>
              <p className="text-xs text-green-700 mt-1">Secure origin</p>
            </div>
          </div>
        </SubSection>

        <SubSection title="Cache Strategies" icon iconColor="orange">
          <DemoBox label="Interactive Strategy Explorer">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {strategies.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveStrategy(s.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
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
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900">{s.name}</h4>
                        <p className="text-sm text-gray-600">{s.desc}</p>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {s.use}
                      </span>
                    </div>
                    <CodeBlock code={strategyCode[s.id]} className="text-xs" />
                  </div>
                ))}
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Registration Example" icon iconColor="blue">
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

        <SubSection title="Workbox (Recommended)" icon iconColor="red">
          <InfoBox variant="purple" title="Production-Ready PWA">
            <p className="text-sm mb-3">
              Workbox provides a declarative API for common caching patterns,
              precaching, routing, and more. Highly recommended for production.
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
