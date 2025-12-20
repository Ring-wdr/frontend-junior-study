import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { AppRouterSection } from './components/app-router-section';
import { ConcurrencySection } from './components/concurrency-section';
import { DataFetchingSection } from './components/data-fetching-section';
import { OptimizationSection } from './components/optimization-section';
import { React19Section } from './components/react19-section';

const tabs = [
  'all',
  'react-18',
  'react-19',
  'app-router',
  'data',
  'optimization',
] as const;
type Tab = (typeof tabs)[number];

const sections = [
  { id: 'react-18', component: <ConcurrencySection /> },
  { id: 'react-19', component: <React19Section /> },
  { id: 'app-router', component: <AppRouterSection /> },
  { id: 'data', component: <DataFetchingSection /> },
  { id: 'optimization', component: <OptimizationSection /> },
];

export default function Week5Page() {
  const { t } = useTranslation('week5');
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const filteredSections =
    activeTab === 'all' ? sections : sections.filter((s) => s.id === activeTab);

  const getTabLabel = (tab: Tab) => {
    switch (tab) {
      case 'all':
        return t('tabs.all');
      case 'react-18':
        return t('tabs.react18');
      case 'react-19':
        return t('tabs.react19');
      case 'app-router':
        return t('tabs.appRouter');
      case 'data':
        return t('tabs.data');
      case 'optimization':
        return t('tabs.optimization');
      default:
        return tab;
    }
  };

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
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
              activeTab === tab
                ? 'bg-gray-900 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100',
            )}
          >
            {getTabLabel(tab)}
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
