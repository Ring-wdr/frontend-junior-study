import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { AdvancedStateSection } from './components/advanced-state-section';
import { ContextSection } from './components/context-section';
import { FluxReduxSection } from './components/flux-redux-section';
import { MiddlewareSection } from './components/middleware-section';
import { ModernStateSection } from './components/modern-state-section';

const tabs = [
  'all',
  'flux-redux',
  'middleware',
  'modern',
  'advanced',
  'context',
] as const;
type Tab = (typeof tabs)[number];

const sections = [
  { id: 'flux-redux', component: <FluxReduxSection /> },
  { id: 'middleware', component: <MiddlewareSection /> },
  { id: 'modern', component: <ModernStateSection /> },
  { id: 'advanced', component: <AdvancedStateSection /> },
  { id: 'context', component: <ContextSection /> },
];

export default function Week4Page() {
  const { t } = useTranslation('week4');
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const filteredSections =
    activeTab === 'all' ? sections : sections.filter((s) => s.id === activeTab);

  const getTabLabel = (tab: Tab) => {
    switch (tab) {
      case 'all':
        return t('tabs.all');
      case 'flux-redux':
        return t('tabs.fluxRedux');
      case 'middleware':
        return t('tabs.middleware');
      case 'modern':
        return t('tabs.modern');
      case 'advanced':
        return t('tabs.advanced');
      case 'context':
        return t('tabs.context');
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
          ← {t('common:navigation.backToDashboard')}
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
