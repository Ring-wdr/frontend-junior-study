import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const OfflineFirstSection = () => {
  const { t } = useTranslation('week13');
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
      badge={{ label: t('offlineFirst.badge'), color: 'orange' }}
      title={t('offlineFirst.title')}
      description={t('offlineFirst.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('offlineFirst.philosophy.title')}
          icon
          iconColor="blue"
        >
          <InfoBox
            variant="orange"
            title={t('offlineFirst.philosophy.infoTitle')}
          >
            <p className="text-sm leading-relaxed">
              <Trans t={t} i18nKey="offlineFirst.philosophy.description" />
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <Trans t={t} i18nKey="offlineFirst.philosophy.localFirst" />
              </li>
              <li>
                <Trans
                  t={t}
                  i18nKey="offlineFirst.philosophy.syncWhenPossible"
                />
              </li>
              <li>
                <Trans
                  t={t}
                  i18nKey="offlineFirst.philosophy.gracefulDegradation"
                />
              </li>
              <li>
                <Trans
                  t={t}
                  i18nKey="offlineFirst.philosophy.conflictResolution"
                />
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('offlineFirst.networkStatus.title')}
          icon
          iconColor="green"
        >
          <DemoBox label={t('offlineFirst.networkStatus.label')}>
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
                    {isOnline
                      ? t('offlineFirst.networkStatus.online')
                      : t('offlineFirst.networkStatus.offline')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isOnline
                      ? t('offlineFirst.networkStatus.onlineDesc')
                      : t('offlineFirst.networkStatus.offlineDesc')}
                  </p>
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  {t('offlineFirst.networkStatus.connectionHistory')}
                </p>
                {connectionHistory.length === 0 ? (
                  <p className="text-xs text-gray-400">
                    {t('offlineFirst.networkStatus.noHistory')}
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
                {t('offlineFirst.networkStatus.toggleMessage')}
              </p>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('offlineFirst.events.title')}
          icon
          iconColor="purple"
        >
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

        <SubSection
          title={t('offlineFirst.backgroundSync.title')}
          icon
          iconColor="orange"
        >
          <InfoBox
            variant="blue"
            title={t('offlineFirst.backgroundSync.infoTitle')}
          >
            <p className="text-sm">
              {t('offlineFirst.backgroundSync.description')}
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

        <SubSection
          title={t('offlineFirst.uxPrinciples.title')}
          icon
          iconColor="red"
        >
          <div className="grid grid-cols-1 gap-3">
            {[
              {
                icon: '📡',
                title: t('offlineFirst.uxPrinciples.clearStatus'),
                desc: t('offlineFirst.uxPrinciples.clearStatusDesc'),
              },
              {
                icon: '💾',
                title: t('offlineFirst.uxPrinciples.indicateCached'),
                desc: t('offlineFirst.uxPrinciples.indicateCachedDesc'),
              },
              {
                icon: '🔄',
                title: t('offlineFirst.uxPrinciples.retryOptions'),
                desc: t('offlineFirst.uxPrinciples.retryOptionsDesc'),
              },
              {
                icon: '⏱️',
                title: t('offlineFirst.uxPrinciples.queueActions'),
                desc: t('offlineFirst.uxPrinciples.queueActionsDesc'),
              },
              {
                icon: '⚠️',
                title: t('offlineFirst.uxPrinciples.conflictResolution'),
                desc: t('offlineFirst.uxPrinciples.conflictResolutionDesc'),
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

        <SubSection
          title={t('offlineFirst.architecture.title')}
          icon
          iconColor="green"
        >
          <DemoBox label={t('offlineFirst.architecture.label')}>
            <div className="flex flex-col items-center gap-2 py-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 bg-blue-100 rounded-lg border-2 border-blue-300 flex items-center justify-center text-sm font-medium text-blue-800">
                  {t('offlineFirst.architecture.uiLayer')}
                </div>
              </div>
              <div className="w-0.5 h-6 bg-gray-300" />
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 bg-purple-100 rounded-lg border-2 border-purple-300 flex items-center justify-center text-sm font-medium text-purple-800 text-center">
                  {t('offlineFirst.architecture.localStore')}
                </div>
                <span className="text-gray-400">←→</span>
                <div className="w-24 h-16 bg-green-100 rounded-lg border-2 border-green-300 flex items-center justify-center text-sm font-medium text-green-800 text-center">
                  {t('offlineFirst.architecture.syncLayer')}
                </div>
              </div>
              <div className="w-0.5 h-6 bg-gray-300" />
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 bg-orange-100 rounded-lg border-2 border-orange-300 flex items-center justify-center text-sm font-medium text-orange-800 text-center">
                  {t('offlineFirst.architecture.remoteServer')}
                </div>
              </div>
            </div>
            <div className="text-xs text-center text-gray-500 mt-2">
              {t('offlineFirst.architecture.flowDesc')}
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('offlineFirst.implementation.title')}
          icon
          iconColor="blue"
        >
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
