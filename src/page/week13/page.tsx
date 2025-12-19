import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { CombinedPatternSection } from './components/combined-pattern-section';
import { IndexedDBSection } from './components/indexeddb-section';
import { OfflineFirstSection } from './components/offline-first-section';
import { ServiceWorkerSection } from './components/service-worker-section';
import { WebWorkerSection } from './components/web-worker-section';

const tabs = [
  'all',
  'webworker',
  'serviceworker',
  'indexeddb',
  'offline',
  'combined',
] as const;
type Tab = (typeof tabs)[number];

const tabLabels: Record<Tab, string> = {
  all: 'All',
  webworker: 'Web Worker',
  serviceworker: 'Service Worker & PWA',
  indexeddb: 'IndexedDB',
  offline: 'Offline-First',
  combined: 'Combined Pattern',
};

const sections = [
  { id: 'webworker', component: <WebWorkerSection /> },
  { id: 'serviceworker', component: <ServiceWorkerSection /> },
  { id: 'indexeddb', component: <IndexedDBSection /> },
  { id: 'offline', component: <OfflineFirstSection /> },
  { id: 'combined', component: <CombinedPatternSection /> },
];

export default function Week13Page() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const filteredSections =
    activeTab === 'all' ? sections : sections.filter((s) => s.id === activeTab);

  return (
    <div className="min-h-screen bg-[#F0F4F8] font-sans text-gray-900 flex flex-col items-center">
      <header className="w-full max-w-3xl pt-12 pb-6 px-6 text-center">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-gray-900">
          Web Workers, PWA & IndexedDB
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Master parallel processing with Web Workers, build offline-capable PWAs
          with Service Workers, and leverage IndexedDB for client-side storage.
        </p>
      </header>
      <div className="sticky top-4 z-10 bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-gray-200 mb-8 flex gap-1 flex-wrap justify-center max-w-[95vw]">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
              activeTab === tab
                ? 'bg-gray-900 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100',
            )}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>
      <main className="w-full max-w-2xl px-6 pb-20 space-y-6">
        {filteredSections.map((section, idx) => (
          <div
            key={`${section.id}-${idx}`}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {section.component}
          </div>
        ))}
      </main>
    </div>
  );
}
