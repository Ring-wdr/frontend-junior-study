import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { E2ETestingSection } from './components/e2e-testing-section';
import { IntegrationTestingSection } from './components/integration-testing-section';
import { MockingBestPracticesSection } from './components/mocking-best-practices-section';
import { TestingFundamentalsSection } from './components/testing-fundamentals-section';
import { UnitTestingSection } from './components/unit-testing-section';
import { VitestSetupSection } from './components/vitest-setup-section';

const tabs = [
  'all',
  'fundamentals',
  'unit',
  'integration',
  'vitest',
  'e2e',
  'best-practices',
] as const;
type Tab = (typeof tabs)[number];

const sections = [
  { id: 'fundamentals', component: <TestingFundamentalsSection /> },
  { id: 'unit', component: <UnitTestingSection /> },
  { id: 'integration', component: <IntegrationTestingSection /> },
  { id: 'vitest', component: <VitestSetupSection /> },
  { id: 'e2e', component: <E2ETestingSection /> },
  { id: 'best-practices', component: <MockingBestPracticesSection /> },
];

export default function Week8Page() {
  const { t } = useTranslation('week8');
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const filteredSections =
    activeTab === 'all' ? sections : sections.filter((s) => s.id === activeTab);

  const getTabLabel = (tab: Tab): string => {
    switch (tab) {
      case 'all':
        return t('tabs.all');
      case 'fundamentals':
        return t('tabs.fundamentals');
      case 'unit':
        return t('tabs.unit');
      case 'integration':
        return t('tabs.integration');
      case 'vitest':
        return t('tabs.vitest');
      case 'e2e':
        return t('tabs.e2e');
      case 'best-practices':
        return t('tabs.bestPractices');
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
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap',
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
