import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { BrowserRenderingSection } from './components/browser-rendering-section';
import { BundleSizeSection } from './components/bundle-size-section';
import { CodeSplittingSection } from './components/code-splitting-section';
import { CoreWebVitalsSection } from './components/core-web-vitals-section';
import { DevToolsSection } from './components/devtools-section';
import { FontOptimizationSection } from './components/font-optimization-section';
import { ImageOptimizationSection } from './components/image-optimization-section';
import { LazyLoadingSection } from './components/lazy-loading-section';
import { NetworkOptimizationSection } from './components/network-optimization-section';

const tabs = [
  'all',
  'vitals',
  'rendering',
  'devtools',
  'splitting',
  'lazy',
  'images',
  'fonts',
  'network',
  'bundle',
] as const;
type Tab = (typeof tabs)[number];

const sections = [
  { id: 'vitals', component: <CoreWebVitalsSection /> },
  { id: 'rendering', component: <BrowserRenderingSection /> },
  { id: 'devtools', component: <DevToolsSection /> },
  { id: 'splitting', component: <CodeSplittingSection /> },
  { id: 'lazy', component: <LazyLoadingSection /> },
  { id: 'images', component: <ImageOptimizationSection /> },
  { id: 'fonts', component: <FontOptimizationSection /> },
  { id: 'network', component: <NetworkOptimizationSection /> },
  { id: 'bundle', component: <BundleSizeSection /> },
];

export default function Week11Page() {
  const { t } = useTranslation('week11');
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
          {t('header.backToDashboard')}
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-gray-900">
          {t('header.title')}
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          {t('header.description')}
        </p>
      </header>

      <div className="sticky top-4 z-10 bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-gray-200 mb-8 flex gap-1 flex-wrap justify-center max-w-[95vw]">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap',
              activeTab === tab
                ? 'bg-gray-900 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100',
            )}
          >
            {t(`tabs.${tab}`)}
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
