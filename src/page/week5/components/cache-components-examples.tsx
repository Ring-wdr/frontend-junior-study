import type { HighlighterCore } from 'shiki/core';
import { CheckCircle2, Sparkles, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createHighlighter } from 'shiki';
import { ShikiMagicMove } from 'shiki-magic-move/react';
import 'shiki-magic-move/style.css';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

type ExampleKey = 'cache-boundary' | 'dynamic-rendering' | 'revalidation';
type ExampleMode = 'bad' | 'good';

const exampleCode: Record<
  ExampleKey,
  { bad: string; good: string }
> = {
  'cache-boundary': {
    bad: `// Bad: cache policy is scattered across the request
async function getProduct(id: string) {
  const res = await fetch(\`https://api.example.com/products/\${id}\`, {
    cache: 'force-cache',
    next: {
      revalidate: 3600,
      tags: [\`product-\${id}\`],
    },
  });

  return res.json();
}`,
    good: `// Good: cache policy lives on the reusable unit
import { cacheLife, cacheTag } from 'next/cache';

async function getProduct(id: string) {
  'use cache';
  cacheLife('hours');
  cacheTag(\`product-\${id}\`);

  const res = await fetch(\`https://api.example.com/products/\${id}\`);
  return res.json();
}`,
  },
  'dynamic-rendering': {
    bad: `// Bad: dynamic data blocks the entire page
export default async function ProductPage() {
  const stats = await fetch('https://api.example.com/live-stats', {
    cache: 'no-store',
  }).then((res) => res.json());

  return (
    <main>
      <Hero />
      <LiveStats stats={stats} />
    </main>
  );
}`,
    good: `// Good: keep the shell static, stream the dynamic island
import { Suspense } from 'react';

async function LiveStatsPanel() {
  const stats = await fetch('https://api.example.com/live-stats').then((res) =>
    res.json(),
  );

  return <LiveStats stats={stats} />;
}

export default function ProductPage() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<LiveStatsSkeleton />}>
        <LiveStatsPanel />
      </Suspense>
    </main>
  );
}`,
  },
  revalidation: {
    bad: `// Bad: invalidate an entire route when one product changes
'use server';

import { revalidatePath } from 'next/cache';

export async function updateProduct(id: string) {
  await db.products.update(id);
  revalidatePath('/products');
}`,
    good: `// Good: invalidate the exact cached unit
'use server';

import { revalidateTag } from 'next/cache';

export async function updateProduct(id: string) {
  await db.products.update(id);
  revalidateTag(\`product-\${id}\`, 'max');
}`,
  },
};

const exampleKeys: ExampleKey[] = [
  'cache-boundary',
  'dynamic-rendering',
  'revalidation',
];

export const CacheComponentsExamples = () => {
  const { t } = useTranslation('week5');
  const [activeExample, setActiveExample] =
    useState<ExampleKey>('cache-boundary');
  const [activeMode, setActiveMode] = useState<ExampleMode>('good');
  const [highlighter, setHighlighter] = useState<HighlighterCore>();

  useEffect(() => {
    let mounted = true;

    async function setupHighlighter() {
      const nextHighlighter = await createHighlighter({
        themes: ['github-dark-default'],
        langs: ['tsx', 'typescript', 'javascript'],
      });

      if (mounted) {
        setHighlighter(nextHighlighter);
      }
    }

    setupHighlighter();

    return () => {
      mounted = false;
    };
  }, []);

  const entry = exampleCode[activeExample];
  const activeCode = entry[activeMode];
  const isBad = activeMode === 'bad';

  return (
    <div className="space-y-4 rounded-2xl border border-purple-200 bg-linear-to-br from-purple-50 via-white to-blue-50 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h4 className="text-base font-bold text-gray-900">
            {t('dataFetching.cacheComponents.examples.title')}
          </h4>
          <p className="mt-1 text-sm text-gray-600 max-w-2xl">
            {t('dataFetching.cacheComponents.examples.description')}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-purple-700 shadow-sm ring-1 ring-purple-200">
          <Sparkles className="h-3.5 w-3.5" />
          {t('dataFetching.cacheComponents.examples.badge')}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {exampleKeys.map((key) => (
          <button
            type="button"
            key={key}
            onClick={() => setActiveExample(key)}
            className={cn(
              'rounded-full border px-3 py-2 text-xs font-semibold transition-colors',
              activeExample === key
                ? 'border-purple-500 bg-purple-600 text-white'
                : 'border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:text-purple-700',
            )}
          >
            {t(`dataFetching.cacheComponents.examples.items.${key}.tab`)}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-100 pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            {isBad ? (
              <XCircle className="h-4 w-4 text-red-500" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            )}
            <span
              className={cn(
                'text-sm font-semibold',
                isBad ? 'text-red-700' : 'text-green-700',
              )}
            >
              {isBad
                ? t('dataFetching.cacheComponents.examples.badTitle')
                : t('dataFetching.cacheComponents.examples.goodTitle')}
            </span>
          </div>

          <div className="inline-flex w-fit rounded-full bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setActiveMode('bad')}
              className={cn(
                'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                isBad
                  ? 'bg-red-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-red-600',
              )}
            >
              {t('dataFetching.cacheComponents.examples.viewBad')}
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('good')}
              className={cn(
                'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                !isBad
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-green-700',
              )}
            >
              {t('dataFetching.cacheComponents.examples.viewGood')}
            </button>
          </div>
        </div>

        <p className="mb-3 mt-4 text-sm font-medium text-gray-900">
          {t(
            `dataFetching.cacheComponents.examples.items.${activeExample}.${activeMode}Label`,
          )}
        </p>

        <div
          className={cn(
            'overflow-hidden rounded-xl border',
            isBad ? 'border-red-200 bg-red-50/30' : 'border-green-200 bg-green-50/30',
          )}
        >
          {highlighter ? (
            <ShikiMagicMove
              lang="tsx"
              theme="github-dark-default"
              highlighter={highlighter}
              code={activeCode}
              className="text-sm px-4 py-3"
              options={{ duration: 700, stagger: 0.35 }}
            />
          ) : (
            <CodeBlock code={activeCode} language="tsx" className="text-xs" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            {t('dataFetching.cacheComponents.examples.whyTitle')}
          </div>
          <p className="mt-2 text-sm text-blue-950">
            {t(
              `dataFetching.cacheComponents.examples.items.${activeExample}.why`,
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-purple-200 bg-purple-50/80 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-purple-700">
            {t('dataFetching.cacheComponents.examples.takeawayTitle')}
          </div>
          <p className="mt-2 text-sm font-medium text-purple-950">
            {t(
              `dataFetching.cacheComponents.examples.items.${activeExample}.takeaway`,
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
