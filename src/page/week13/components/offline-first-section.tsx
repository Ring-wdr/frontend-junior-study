import { useEffect, useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const OfflineFirstSection = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionHistory, setConnectionHistory] = useState<
    { time: string; status: 'online' | 'offline' }[]
  >([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setConnectionHistory((prev) => [
        ...prev.slice(-4),
        { time: new Date().toLocaleTimeString(), status: 'online' },
      ]);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setConnectionHistory((prev) => [
        ...prev.slice(-4),
        { time: new Date().toLocaleTimeString(), status: 'offline' },
      ]);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <SectionCard
      badge={{ label: 'Strategy', color: 'orange' }}
      title="Offline-First Strategy"
      description="Design patterns for building reliable offline experiences"
    >
      <div className="space-y-8">
        <SubSection title="Offline-First Philosophy" icon iconColor="blue">
          <InfoBox variant="orange" title="Design for Offline First">
            <p className="text-sm leading-relaxed">
              Offline-first means designing your application to work{' '}
              <strong>without network connectivity by default</strong>. The
              network becomes an enhancement, not a requirement.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <strong>Local First:</strong> Store and read data locally
              </li>
              <li>
                <strong>Sync When Possible:</strong> Push changes when online
              </li>
              <li>
                <strong>Graceful Degradation:</strong> Clear offline indicators
              </li>
              <li>
                <strong>Conflict Resolution:</strong> Handle sync conflicts
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Network Status Detection" icon iconColor="green">
          <DemoBox label="Live Connection Monitor">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl border-4 transition-all ${
                    isOnline
                      ? 'bg-green-100 border-green-400'
                      : 'bg-red-100 border-red-400'
                  }`}
                >
                  {isOnline ? '🌐' : '📴'}
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {isOnline ? 'Online' : 'Offline'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isOnline
                      ? 'Connected to network'
                      : 'No network connection'}
                  </p>
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  Connection History
                </p>
                {connectionHistory.length === 0 ? (
                  <p className="text-xs text-gray-400">
                    Toggle your network connection to see events
                  </p>
                ) : (
                  <div className="space-y-1">
                    {connectionHistory.map((event, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs"
                      >
                        <span className="text-gray-400">{event.time}</span>
                        <span
                          className={`px-2 py-0.5 rounded ${
                            event.status === 'online'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-400 text-center">
                Try toggling your WiFi or using DevTools Network tab to simulate
                offline
              </p>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Online/Offline Events" icon iconColor="purple">
          <CodeBlock
            code={`// Basic online/offline detection
window.addEventListener('online', () => {
  console.log('Back online!');
  showToast('Connection restored');
  syncPendingChanges();
});

window.addEventListener('offline', () => {
  console.log('Gone offline');
  showToast('You are offline. Changes will sync when online.');
});

// Check current status
if (navigator.onLine) {
  console.log('Currently online');
} else {
  console.log('Currently offline');
}

// React hook for network status
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Background Sync" icon iconColor="orange">
          <InfoBox variant="blue" title="Service Worker Background Sync">
            <p className="text-sm">
              Background Sync allows you to defer actions until the user has
              stable connectivity. The Service Worker handles retry
              automatically.
            </p>
          </InfoBox>

          <CodeBlock
            code={`// Register a sync event from your app
async function saveForLater(data) {
  // Store in IndexedDB first
  await db.put('outbox', { id: Date.now(), data });

  // Register sync if supported
  if ('serviceWorker' in navigator && 'sync' in window.registration) {
    await navigator.serviceWorker.ready;
    await registration.sync.register('sync-outbox');
  }
}

// Service Worker: Handle sync event
// sw.js
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-outbox') {
    event.waitUntil(syncOutbox());
  }
});

async function syncOutbox() {
  const db = await openDB('app-db', 1);
  const items = await db.getAll('outbox');

  for (const item of items) {
    try {
      await fetch('/api/sync', {
        method: 'POST',
        body: JSON.stringify(item.data),
      });
      await db.delete('outbox', item.id);
    } catch (e) {
      // Will retry on next sync
      throw e;
    }
  }
}`}
            className="text-xs mt-4"
          />
        </SubSection>

        <SubSection title="Offline UX Principles" icon iconColor="red">
          <div className="grid grid-cols-1 gap-3">
            {[
              {
                icon: '📡',
                title: 'Clear Status Indicators',
                desc: 'Always show users when they are offline with visible banners or icons',
              },
              {
                icon: '💾',
                title: 'Indicate Cached Data',
                desc: 'Let users know when data is from cache vs fresh from server',
              },
              {
                icon: '🔄',
                title: 'Retry Options',
                desc: 'Provide manual retry buttons for failed operations',
              },
              {
                icon: '⏱️',
                title: 'Queue Actions',
                desc: 'Save offline actions and process them when back online',
              },
              {
                icon: '⚠️',
                title: 'Conflict Resolution',
                desc: 'Handle data conflicts gracefully (last-write-wins, merge, user choice)',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-gray-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="Offline-First Architecture" icon iconColor="green">
          <DemoBox label="Data Flow Pattern">
            <div className="flex flex-col items-center gap-2 py-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 bg-blue-100 rounded-lg border-2 border-blue-300 flex items-center justify-center text-sm font-medium text-blue-800">
                  UI Layer
                </div>
              </div>
              <div className="w-0.5 h-6 bg-gray-300" />
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 bg-purple-100 rounded-lg border-2 border-purple-300 flex items-center justify-center text-sm font-medium text-purple-800 text-center">
                  Local<br />Store
                </div>
                <span className="text-gray-400">←→</span>
                <div className="w-24 h-16 bg-green-100 rounded-lg border-2 border-green-300 flex items-center justify-center text-sm font-medium text-green-800 text-center">
                  Sync<br />Layer
                </div>
              </div>
              <div className="w-0.5 h-6 bg-gray-300" />
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 bg-orange-100 rounded-lg border-2 border-orange-300 flex items-center justify-center text-sm font-medium text-orange-800 text-center">
                  Remote<br />Server
                </div>
              </div>
            </div>
            <div className="text-xs text-center text-gray-500 mt-2">
              UI always reads from Local Store. Sync Layer handles server communication.
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Implementation Pattern" icon iconColor="blue">
          <CodeBlock
            code={`// Offline-first data layer
class OfflineFirstStore {
  constructor(dbName, storeName) {
    this.storeName = storeName;
    this.dbPromise = openDB(dbName, 1, {
      upgrade(db) {
        db.createObjectStore(storeName, { keyPath: 'id' });
        db.createObjectStore('_sync_queue', { keyPath: 'id' });
      },
    });
  }

  // Read always from local
  async get(id) {
    const db = await this.dbPromise;
    return db.get(this.storeName, id);
  }

  async getAll() {
    const db = await this.dbPromise;
    return db.getAll(this.storeName);
  }

  // Write locally + queue for sync
  async save(item) {
    const db = await this.dbPromise;
    const tx = db.transaction([this.storeName, '_sync_queue'], 'readwrite');

    // Save locally
    await tx.objectStore(this.storeName).put({
      ...item,
      _syncStatus: 'pending',
      _updatedAt: Date.now(),
    });

    // Queue for background sync
    await tx.objectStore('_sync_queue').put({
      id: \`\${this.storeName}-\${item.id}-\${Date.now()}\`,
      store: this.storeName,
      action: 'save',
      data: item,
    });

    await tx.done;

    // Trigger sync if online
    if (navigator.onLine) {
      this.syncNow();
    }
  }

  async syncNow() {
    const db = await this.dbPromise;
    const queue = await db.getAll('_sync_queue');

    for (const item of queue) {
      try {
        await fetch(\`/api/\${item.store}\`, {
          method: 'POST',
          body: JSON.stringify(item.data),
        });
        await db.delete('_sync_queue', item.id);
      } catch (e) {
        console.log('Sync failed, will retry:', e);
      }
    }
  }
}`}
            className="text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
