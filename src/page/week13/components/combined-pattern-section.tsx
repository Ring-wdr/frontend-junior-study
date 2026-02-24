import { Trans, useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const CombinedPatternSection = () => {
  const { t } = useTranslation('week13');

  return (
    <SectionCard
      badge={{ label: t('combined.badge'), color: 'red' }}
      title={t('combined.title')}
      description={t('combined.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('combined.trio.title')} icon iconColor="blue">
          <InfoBox variant="red" title={t('combined.trio.infoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('combined.trio.description')}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <Trans t={t} i18nKey="combined.trio.webWorker" />
              </li>
              <li>
                <Trans t={t} i18nKey="combined.trio.serviceWorker" />
              </li>
              <li>
                <Trans t={t} i18nKey="combined.trio.indexedDB" />
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('combined.architecture.title')}
          icon
          iconColor="purple"
        >
          <DemoBox label={t('combined.architecture.label')}>
            <div className="bg-white p-6 rounded-lg">
              <div className="flex flex-col gap-4">
                {/* Main Thread */}
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <p className="font-bold text-blue-800 text-sm mb-2">
                    {t('combined.architecture.mainThread')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                      {t('combined.architecture.reactComponents')}
                    </span>
                    <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                      {t('combined.architecture.userInteractions')}
                    </span>
                    <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                      {t('combined.architecture.stateManagement')}
                    </span>
                  </div>
                </div>

                {/* Connection lines */}
                <div className="flex justify-center gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-green-400" />
                    <span className="text-xs text-gray-500">
                      {t('combined.architecture.postMessage')}
                    </span>
                    <div className="w-0.5 h-4 bg-green-400" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-purple-400" />
                    <span className="text-xs text-gray-500">
                      {t('combined.architecture.fetchEvents')}
                    </span>
                    <div className="w-0.5 h-4 bg-purple-400" />
                  </div>
                </div>

                {/* Worker Threads */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                    <p className="font-bold text-green-800 text-sm mb-2">
                      {t('combined.architecture.webWorker')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-green-100 px-2 py-1 rounded">
                        {t('combined.architecture.heavyProcessing')}
                      </span>
                      <span className="text-xs bg-green-100 px-2 py-1 rounded">
                        {t('combined.architecture.dataTransform')}
                      </span>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                    <p className="font-bold text-purple-800 text-sm mb-2">
                      {t('combined.architecture.serviceWorker')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-purple-100 px-2 py-1 rounded">
                        {t('combined.architecture.networkProxy')}
                      </span>
                      <span className="text-xs bg-purple-100 px-2 py-1 rounded">
                        {t('combined.architecture.cacheStrategy')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Storage */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-orange-400" />
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200 max-w-xs mx-auto">
                  <p className="font-bold text-orange-800 text-sm mb-2 text-center">
                    {t('combined.architecture.indexedDB')}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="text-xs bg-orange-100 px-2 py-1 rounded">
                      {t('combined.architecture.userData')}
                    </span>
                    <span className="text-xs bg-orange-100 px-2 py-1 rounded">
                      {t('combined.architecture.syncQueue')}
                    </span>
                    <span className="text-xs bg-orange-100 px-2 py-1 rounded">
                      {t('combined.architecture.filesBlobs')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('combined.realWorldExamples.title')}
          icon
          iconColor="green"
        >
          <div className="grid grid-cols-1 gap-3">
            {[
              {
                icon: '🖼️',
                title: t('combined.realWorldExamples.imageEditor'),
                features: [
                  t('combined.realWorldExamples.imageEditorFeature1'),
                  t('combined.realWorldExamples.imageEditorFeature2'),
                  t('combined.realWorldExamples.imageEditorFeature3'),
                ],
              },
              {
                icon: '📝',
                title: t('combined.realWorldExamples.noteTaking'),
                features: [
                  t('combined.realWorldExamples.noteTakingFeature1'),
                  t('combined.realWorldExamples.noteTakingFeature2'),
                  t('combined.realWorldExamples.noteTakingFeature3'),
                ],
              },
              {
                icon: '📊',
                title: t('combined.realWorldExamples.dashboard'),
                features: [
                  t('combined.realWorldExamples.dashboardFeature1'),
                  t('combined.realWorldExamples.dashboardFeature2'),
                  t('combined.realWorldExamples.dashboardFeature3'),
                ],
              },
            ].map((example) => (
              <div
                key={example.title}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{example.icon}</span>
                  <h4 className="font-bold text-gray-900">{example.title}</h4>
                </div>
                <ul className="space-y-1">
                  {example.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-green-500 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection
          title={t('combined.imageProcessing.title')}
          icon
          iconColor="orange"
        >
          <CodeBlock
            code={`// Main thread: Coordinate everything
class ImageProcessor {
  constructor() {
    this.worker = new Worker('./image-worker.js');
    this.db = null;
    this.init();
  }

  async init() {
    // Initialize IndexedDB
    this.db = await openDB('image-app', 1, {
      upgrade(db) {
        db.createObjectStore('images', { keyPath: 'id' });
        db.createObjectStore('processed', { keyPath: 'id' });
      },
    });
  }

  async processImage(file) {
    const id = \`img-\${Date.now()}\`;

    // Store original in IndexedDB
    await this.db.put('images', {
      id,
      blob: file,
      status: 'processing',
    });

    // Send to Web Worker for processing
    const arrayBuffer = await file.arrayBuffer();
    this.worker.postMessage(
      { type: 'process', id, buffer: arrayBuffer },
      [arrayBuffer] // Transfer, don't copy
    );

    return new Promise((resolve) => {
      this.worker.onmessage = async (e) => {
        if (e.data.id === id) {
          // Store processed result
          await this.db.put('processed', {
            id,
            blob: new Blob([e.data.buffer]),
            processedAt: Date.now(),
          });
          resolve(id);
        }
      };
    });
  }
}

// image-worker.js
self.onmessage = async (e) => {
  const { type, id, buffer } = e.data;

  if (type === 'process') {
    // Heavy image processing (grayscale example)
    const data = new Uint8ClampedArray(buffer);
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = data[i + 1] = data[i + 2] = avg;
    }

    self.postMessage(
      { id, buffer: data.buffer },
      [data.buffer]
    );
  }
};`}
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('combined.serviceWorkerIntegration.title')}
          icon
          iconColor="red"
        >
          <CodeBlock
            code={`// sw.js - Service Worker for the combined app
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';

// Precache app shell and workers
precacheAndRoute([
  ...self.__WB_MANIFEST,
  { url: '/image-worker.js', revision: '1' },
]);

// Cache API responses
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [{
      // Custom plugin: Store API data in IndexedDB for offline
      cacheWillUpdate: async ({ response }) => {
        if (response.ok) {
          const data = await response.clone().json();
          // Store in IndexedDB for more complex querying
          const db = await openDB('api-cache-db', 1);
          await db.put('responses', {
            url: response.url,
            data,
            timestamp: Date.now(),
          });
        }
        return response;
      },
    }],
  })
);

// Handle background sync for uploads
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-images') {
    event.waitUntil(syncPendingImages());
  }
});

async function syncPendingImages() {
  const db = await openDB('image-app', 1);
  const pending = await db.getAllFromIndex('processed', 'synced', false);

  for (const image of pending) {
    try {
      await fetch('/api/upload', {
        method: 'POST',
        body: image.blob,
      });
      await db.put('processed', { ...image, synced: true });
    } catch (e) {
      throw e; // Will retry
    }
  }
}`}
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('combined.bestPractices.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-3">
            <InfoBox
              variant="blue"
              title={t('combined.bestPractices.communication')}
            >
              <ul className="text-sm space-y-1">
                <li>{t('combined.bestPractices.communicationItem1')}</li>
                <li>{t('combined.bestPractices.communicationItem2')}</li>
                <li>{t('combined.bestPractices.communicationItem3')}</li>
              </ul>
            </InfoBox>

            <InfoBox
              variant="green"
              title={t('combined.bestPractices.storage')}
            >
              <ul className="text-sm space-y-1">
                <li>{t('combined.bestPractices.storageItem1')}</li>
                <li>{t('combined.bestPractices.storageItem2')}</li>
                <li>{t('combined.bestPractices.storageItem3')}</li>
              </ul>
            </InfoBox>

            <InfoBox
              variant="purple"
              title={t('combined.bestPractices.errorHandling')}
            >
              <ul className="text-sm space-y-1">
                <li>{t('combined.bestPractices.errorHandlingItem1')}</li>
                <li>{t('combined.bestPractices.errorHandlingItem2')}</li>
                <li>{t('combined.bestPractices.errorHandlingItem3')}</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title={t('combined.comlink.title')} icon iconColor="blue">
          <InfoBox variant="gray" title={t('combined.comlink.infoTitle')}>
            <p className="text-sm mb-2">{t('combined.comlink.description')}</p>
          </InfoBox>

          <CodeBlock
            code={`// worker.js with Comlink
import * as Comlink from 'comlink';

const api = {
  async processData(data) {
    // Heavy computation...
    return result;
  },

  async analyzeImage(buffer) {
    // Image analysis...
    return { width, height, colors };
  },
};

Comlink.expose(api);

// main.js - Use worker like a regular module
import * as Comlink from 'comlink';

const worker = new Worker('./worker.js');
const api = Comlink.wrap(worker);

// Call worker functions like regular async functions!
const result = await api.processData(myData);
const analysis = await api.analyzeImage(imageBuffer);`}
            className="text-xs mt-4"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
