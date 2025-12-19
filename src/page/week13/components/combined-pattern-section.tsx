import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const CombinedPatternSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Advanced', color: 'red' }}
      title="Combined Pattern"
      description="Integrating Web Worker + Service Worker + IndexedDB"
    >
      <div className="space-y-8">
        <SubSection title="The Powerful Trio" icon iconColor="blue">
          <InfoBox variant="red" title="Production Architecture">
            <p className="text-sm leading-relaxed">
              The most powerful offline-capable web apps combine all three
              technologies. Each handles a specific concern:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <strong>Web Worker:</strong> CPU-intensive processing
              </li>
              <li>
                <strong>Service Worker:</strong> Network resilience & caching
              </li>
              <li>
                <strong>IndexedDB:</strong> Persistent data storage
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Architecture Overview" icon iconColor="purple">
          <DemoBox label="System Architecture">
            <div className="bg-white p-6 rounded-lg">
              <div className="flex flex-col gap-4">
                {/* Main Thread */}
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <p className="font-bold text-blue-800 text-sm mb-2">
                    Main Thread (UI)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                      React Components
                    </span>
                    <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                      User Interactions
                    </span>
                    <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                      State Management
                    </span>
                  </div>
                </div>

                {/* Connection lines */}
                <div className="flex justify-center gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-green-400" />
                    <span className="text-xs text-gray-500">postMessage</span>
                    <div className="w-0.5 h-4 bg-green-400" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-purple-400" />
                    <span className="text-xs text-gray-500">fetch events</span>
                    <div className="w-0.5 h-4 bg-purple-400" />
                  </div>
                </div>

                {/* Worker Threads */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                    <p className="font-bold text-green-800 text-sm mb-2">
                      Web Worker
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-green-100 px-2 py-1 rounded">
                        Heavy Processing
                      </span>
                      <span className="text-xs bg-green-100 px-2 py-1 rounded">
                        Data Transform
                      </span>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                    <p className="font-bold text-purple-800 text-sm mb-2">
                      Service Worker
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-purple-100 px-2 py-1 rounded">
                        Network Proxy
                      </span>
                      <span className="text-xs bg-purple-100 px-2 py-1 rounded">
                        Cache Strategy
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
                    IndexedDB
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="text-xs bg-orange-100 px-2 py-1 rounded">
                      User Data
                    </span>
                    <span className="text-xs bg-orange-100 px-2 py-1 rounded">
                      Sync Queue
                    </span>
                    <span className="text-xs bg-orange-100 px-2 py-1 rounded">
                      Files/Blobs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Real-World Examples" icon iconColor="green">
          <div className="grid grid-cols-1 gap-3">
            {[
              {
                icon: '🖼️',
                title: 'Offline Image Editor',
                features: [
                  'Web Worker: Apply filters, resize',
                  'IndexedDB: Store edited images',
                  'Service Worker: Offline access',
                ],
              },
              {
                icon: '📝',
                title: 'Offline Note-Taking App',
                features: [
                  'Web Worker: Full-text search indexing',
                  'IndexedDB: Store notes & attachments',
                  'Service Worker: Sync when online',
                ],
              },
              {
                icon: '📊',
                title: 'Data Visualization Dashboard',
                features: [
                  'Web Worker: Process large datasets',
                  'IndexedDB: Cache query results',
                  'Service Worker: API response caching',
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
                    <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="Image Processing Example" icon iconColor="orange">
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

        <SubSection title="Service Worker Integration" icon iconColor="red">
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

        <SubSection title="Best Practices" icon iconColor="purple">
          <div className="space-y-3">
            <InfoBox variant="blue" title="Communication Patterns">
              <ul className="text-sm space-y-1">
                <li>• Use Transferable Objects for large data</li>
                <li>• Implement request/response IDs for async handling</li>
                <li>• Consider Comlink for cleaner Worker APIs</li>
              </ul>
            </InfoBox>

            <InfoBox variant="green" title="Storage Strategy">
              <ul className="text-sm space-y-1">
                <li>• IndexedDB for structured data and blobs</li>
                <li>• Cache Storage for HTTP responses</li>
                <li>• Clear old data with versioned cleanups</li>
              </ul>
            </InfoBox>

            <InfoBox variant="purple" title="Error Handling">
              <ul className="text-sm space-y-1">
                <li>• Graceful fallbacks when Workers fail</li>
                <li>• Retry logic with exponential backoff</li>
                <li>• User feedback for long operations</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="Comlink for Cleaner APIs" icon iconColor="blue">
          <InfoBox variant="gray" title="Simplify Worker Communication">
            <p className="text-sm mb-2">
              Comlink makes Web Workers feel like local async functions.
            </p>
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
