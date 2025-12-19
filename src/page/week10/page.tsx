import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { EasingSection } from './components/easing-section';
import { GsapBasicsSection } from './components/gsap-basics-section';
import { IntroSection } from './components/intro-section';
import { PerformanceSection } from './components/performance-section';
import { ScrollTriggerSection } from './components/scroll-trigger-section';
import { SvgAnimationSection } from './components/svg-animation-section';

const tabs = [
  'all',
  'intro',
  'basics',
  'easing',
  'scroll',
  'svg',
  'performance',
] as const;
type Tab = (typeof tabs)[number];

const sections = [
  { id: 'intro', component: <IntroSection /> },
  { id: 'basics', component: <GsapBasicsSection /> },
  { id: 'easing', component: <EasingSection /> },
  { id: 'scroll', component: <ScrollTriggerSection /> },
  { id: 'svg', component: <SvgAnimationSection /> },
  { id: 'performance', component: <PerformanceSection /> },
];

export default function Week10Page() {
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
          Animation w/ GSAP
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          GSAP와 ScrollTrigger를 활용한 고성능 웹 애니메이션 및 인터랙티브
          스토리텔링
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
            {tab === 'all'
              ? 'All'
              : tab === 'intro'
                ? 'Why Animation'
                : tab === 'basics'
                  ? 'GSAP Basics'
                  : tab === 'easing'
                    ? 'Easing'
                    : tab === 'scroll'
                      ? 'ScrollTrigger'
                      : tab === 'svg'
                        ? 'SVG Draw'
                        : 'Performance'}
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
