'use client';

import { motion } from 'motion/react';
import { ArrowDown, Code2, Image, Loader2, Monitor } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';

function LazyViewport() {
  const { t } = useTranslation('week11');
  const [items, setItems] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({ id: i + 1, loaded: false })),
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = Number(entry.target.getAttribute('data-id'));
          timers.push(
            setTimeout(() => {
              setItems((prev) =>
                prev.map((item) =>
                  item.id === id ? { ...item, loaded: true } : item,
                ),
              );
            }, 600),
          );
          observer.unobserve(entry.target);
        }
      },
      { root: container, rootMargin: '0px', threshold: 0.1 },
    );

    for (const el of container.querySelectorAll('.lazy-item')) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      for (const id of timers) clearTimeout(id);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto p-4 space-y-8 scroll-smooth"
    >
      <div className="text-center p-4 bg-gray-100 rounded-lg mb-8">
        <h4 className="font-bold text-gray-800">
          {t('lazyLoading.headingSection')}
        </h4>
        <p className="text-xs text-gray-500">{t('lazyLoading.aboveTheFold')}</p>
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          data-id={item.id}
          className={`lazy-item w-full aspect-video rounded-lg flex items-center justify-center transition-all duration-500 ease-out ${
            item.loaded
              ? 'bg-gradient-to-br from-cyan-500 to-blue-600 scale-100 opacity-100'
              : 'bg-gray-100 scale-95 opacity-50'
          }`}
        >
          {item.loaded ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="text-white flex flex-col items-center"
            >
              <Image size={32} />
              <span className="font-bold">
                {t('lazyLoading.imageN', { id: item.id })}
              </span>
            </motion.div>
          ) : (
            <div className="text-gray-400 flex flex-col items-center gap-2">
              <Loader2 size={24} className="animate-spin" />
              <span className="text-xs">
                {t('lazyLoading.waitingForScroll')}
              </span>
            </div>
          )}
        </div>
      ))}

      <div className="text-center p-8 text-gray-400 text-sm">
        {t('lazyLoading.endOfContent')}
      </div>
    </div>
  );
}

export function LazyLoadingSection() {
  const { t } = useTranslation('week11');
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="mt-4 space-y-6">
      <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
        {t('lazyLoading.description')}
      </p>

      {/* Visualizer */}
      <div className="bg-gray-900 rounded-xl p-3 sm:p-6 border border-gray-700 shadow-xl overflow-hidden flex flex-col items-center">
        <div className="w-full flex justify-between items-center gap-3 mb-6">
          <div>
            <h3 className="font-bold text-white flex items-center gap-2">
              <Monitor size={18} className="text-cyan-400" />{' '}
              {t('lazyLoading.simulatorTitle')}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {t('lazyLoading.simulatorDesc')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setResetKey((k) => k + 1)}
            className="shrink-0 px-3 py-1.5 bg-slate-700 text-slate-200 text-xs rounded hover:bg-slate-600"
          >
            {t('lazyLoading.resetDemo')}
          </button>
        </div>

        <div className="relative w-full max-w-sm h-[340px] sm:h-[400px] bg-white rounded-lg overflow-hidden border-4 border-slate-700 shadow-2xl">
          <LazyViewport key={resetKey} />

          {/* Visual Overlay for "Viewport" */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-[4px] border-cyan-500/30 rounded-lg">
            <div className="absolute top-2 right-2 bg-cyan-500/80 text-white text-[10px] px-2 py-1 rounded font-mono">
              {t('lazyLoading.viewport')}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Image className="text-blue-600" size={20} />
              <h4 className="font-bold text-gray-900">
                {t('lazyLoading.imageLazyLoading.title')}
              </h4>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
              <div className="overflow-hidden rounded-lg">
                <CodeBlock
                  language="html"
                  code={`<!-- Native lazy loading -->
<img
  src="hero.jpg"
  loading="lazy"
  alt="Hero"
/>

<!-- Next.js Image -->
<Image
  src="/hero.jpg"
  alt="Hero"
  loading="lazy"  // 기본값
/>`}
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Monitor className="text-purple-600" size={20} />
              <h4 className="font-bold text-gray-900">IntersectionObserver</h4>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
              <div className="overflow-hidden rounded-lg">
                <CodeBlock
                  language="javascript"
                  code={`const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadContent(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { rootMargin: '100px' }  // 미리 로드
);`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="text-gray-600" size={20} />
            <h4 className="font-bold text-gray-900">
              {t('lazyLoading.types.title')}
            </h4>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <h5 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <Image size={14} /> {t('lazyLoading.types.image.title')}
              </h5>
              <p className="text-xs text-gray-500">
                {t('lazyLoading.types.image.description')}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <h5 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <Code2 size={14} /> {t('lazyLoading.types.component.title')}
              </h5>
              <p className="text-xs text-gray-500">
                {t('lazyLoading.types.component.description')}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <h5 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <ArrowDown size={14} /> {t('lazyLoading.types.data.title')}
              </h5>
              <p className="text-xs text-gray-500">
                {t('lazyLoading.types.data.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
        <Trans t={t} i18nKey="lazyLoading.warning" />
      </div>
    </div>
  );
}
