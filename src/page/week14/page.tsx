import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { AccessibilityBasicsSection } from './components/accessibility-basics-section';
import { AriaSection } from './components/aria-section';
import { FocusManagementSection } from './components/focus-management-section';
import { I18nBasicsSection } from './components/i18n-basics-section';
import { IntlApiSection } from './components/intl-api-section';
import { RtlSection } from './components/rtl-section';
import { SemanticHtmlSection } from './components/semantic-html-section';

const tabs = [
  'all',
  'wcag',
  'semantic',
  'aria',
  'focus',
  'i18n',
  'intl',
  'rtl',
] as const;
type Tab = (typeof tabs)[number];

const tabLabels: Record<Tab, string> = {
  all: 'All',
  wcag: 'WCAG Basics',
  semantic: 'Semantic HTML',
  aria: 'ARIA',
  focus: 'Focus Management',
  i18n: 'i18n Basics',
  intl: 'Intl API',
  rtl: 'RTL Support',
};

const sections = [
  { id: 'wcag', component: <AccessibilityBasicsSection /> },
  { id: 'semantic', component: <SemanticHtmlSection /> },
  { id: 'aria', component: <AriaSection /> },
  { id: 'focus', component: <FocusManagementSection /> },
  { id: 'i18n', component: <I18nBasicsSection /> },
  { id: 'intl', component: <IntlApiSection /> },
  { id: 'rtl', component: <RtlSection /> },
];

export default function Week14Page() {
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
          Accessibility & i18n
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Build inclusive web applications with proper accessibility (A11y) and
          internationalization (i18n) support for global audiences.
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
