'use client';

import {
  AlertTriangle,
  Code2,
  Eye,
  EyeOff,
  RefreshCw,
  Type,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';

export function FontOptimizationSection() {
  const { t } = useTranslation('week11');
  const [strategy, setStrategy] = useState<'swap' | 'block'>('swap'); // FOUT vs FOIT
  const [fontStatus, setFontStatus] = useState<'system' | 'loading' | 'custom'>(
    'system',
  );

  const simulateLoad = () => {
    setFontStatus('loading');

    setTimeout(() => {
      setFontStatus('custom');
    }, 1500);
  };

  return (
    <div className="mt-4 space-y-6">
      <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
        {t('fontOptimization.description')}
      </p>

      {/* Visualizer */}
      <div className="bg-amber-50 rounded-xl p-3 sm:p-6 border border-amber-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <div>
            <h3 className="font-bold text-amber-900 flex items-center gap-2">
              <Type size={18} className="text-amber-600" />{' '}
              {t('fontOptimization.simulatorTitle')}
            </h3>
            <p className="text-xs text-amber-700 mt-1">
              {t('fontOptimization.simulatorDesc')}
            </p>
          </div>
          <div className="flex bg-white p-1 rounded-lg border border-amber-100 shadow-sm">
            <button
              type="button"
              onClick={() => {
                setStrategy('swap');
                setFontStatus('system');
              }}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${strategy === 'swap' ? 'bg-amber-100 text-amber-800' : 'text-gray-500 hover:text-gray-800'}`}
            >
              {t('fontOptimization.displaySwap')}
            </button>
            <button
              type="button"
              onClick={() => {
                setStrategy('block');
                setFontStatus('system');
              }}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${strategy === 'block' ? 'bg-amber-100 text-amber-800' : 'text-gray-500 hover:text-gray-800'}`}
            >
              {t('fontOptimization.displayBlock')}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-amber-200 p-4 sm:p-8 min-h-[200px] flex flex-col justify-between relative overflow-hidden">
          <div className="mb-3 sm:mb-0 sm:absolute sm:top-4 sm:right-4 text-xs font-mono text-gray-400">
            {t('fontOptimization.status')}{' '}
            {fontStatus === 'loading'
              ? t('fontOptimization.downloadingFont')
              : fontStatus === 'custom'
                ? t('fontOptimization.customFontApplied')
                : t('fontOptimization.fallbackFont')}
          </div>

          <div>
            <h4
              className={`text-2xl sm:text-4xl font-bold mb-4
                        ${fontStatus === 'loading' && strategy === 'block' ? 'opacity-0' : 'opacity-100'}
                        ${fontStatus === 'custom' ? 'font-serif' : 'font-sans'}
                     `}
              style={{
                fontFamily:
                  fontStatus === 'custom'
                    ? '"Playfair Display", serif'
                    : 'sans-serif',
                transition: 'opacity 0.2s',
              }}
            >
              The Quick Brown Fox
            </h4>
            <p
              className={`text-base sm:text-lg leading-relaxed text-gray-700 max-w-xl
                        ${fontStatus === 'loading' && strategy === 'block' ? 'opacity-0' : 'opacity-100'}
                        ${fontStatus === 'custom' ? 'font-serif' : 'font-sans'}
                     `}
              style={{
                fontFamily:
                  fontStatus === 'custom'
                    ? '"Playfair Display", serif'
                    : 'sans-serif',
                transition: 'opacity 0.2s',
              }}
            >
              Web fonts allow designers to use typography that expresses their
              brand. However, incorrectly loading them can cause significant
              layout shifts or invisible text.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <button
              type="button"
              onClick={simulateLoad}
              disabled={fontStatus === 'loading' || fontStatus === 'custom'}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
            >
              <RefreshCw
                size={16}
                className={fontStatus === 'loading' ? 'animate-spin' : ''}
              />
              {fontStatus === 'custom'
                ? t('fontOptimization.resetToTryAgain')
                : t('fontOptimization.loadCustomFont')}
            </button>

            {fontStatus === 'custom' && (
              <div className="flex flex-wrap gap-4">
                <div className="sm:text-right">
                  <div className="text-xs text-gray-500">
                    {t('fontOptimization.uxImpact')}
                  </div>
                  <div
                    className={`text-sm font-bold flex items-center gap-1 sm:justify-end ${strategy === 'swap' ? 'text-amber-600' : 'text-red-600'}`}
                  >
                    {strategy === 'swap' ? (
                      <>
                        <Eye size={14} />{' '}
                        {t('fontOptimization.textAlwaysVisible')}
                      </>
                    ) : (
                      <>
                        <EyeOff size={14} />{' '}
                        {t('fontOptimization.textInvisible')}
                      </>
                    )}
                  </div>
                </div>
                <div className="sm:text-right">
                  <div className="text-xs text-gray-500">
                    {t('fontOptimization.clsImpact')}
                  </div>
                  <div
                    className={`text-sm font-bold flex items-center gap-1 sm:justify-end ${strategy === 'swap' ? 'text-amber-600' : 'text-green-600'}`}
                  >
                    {strategy === 'swap' ? (
                      <>
                        <AlertTriangle size={14} />{' '}
                        {t('fontOptimization.minorShift')}
                      </>
                    ) : (
                      <>
                        <Zap size={14} /> {t('fontOptimization.noShift')}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Hack to enable Reset */}
            {fontStatus === 'custom' && (
              <button
                type="button"
                onClick={() => setFontStatus('system')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-default"
              />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-red-200 bg-red-50 rounded-xl p-5">
          <h3 className="font-bold text-red-900 mb-3">
            {t('fontOptimization.foutFoit.title')}
          </h3>
          <div className="space-y-3 text-sm text-red-800">
            <div className="bg-white/70 rounded-lg p-3">
              <strong>{t('fontOptimization.foutFoit.fout.name')}</strong> (
              {t('fontOptimization.foutFoit.fout.fullName')})
              <p className="text-xs mt-1">
                {t('fontOptimization.foutFoit.fout.description')}
              </p>
            </div>
            <div className="bg-white/70 rounded-lg p-3">
              <strong>{t('fontOptimization.foutFoit.foit.name')}</strong> (
              {t('fontOptimization.foutFoit.foit.fullName')})
              <p className="text-xs mt-1">
                {t('fontOptimization.foutFoit.foit.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="border border-green-200 bg-green-50 rounded-xl p-5">
          <h3 className="font-bold text-green-900 mb-3">
            {t('fontOptimization.fontDisplayStrategy.title')}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <code className="text-xs bg-white px-2 py-1 rounded text-green-700">
                swap
              </code>
              <span className="text-green-800">
                {t('fontOptimization.fontDisplayStrategy.swap')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <code className="text-xs bg-white px-2 py-1 rounded text-green-700">
                optional
              </code>
              <span className="text-green-800">
                {t('fontOptimization.fontDisplayStrategy.optional')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <code className="text-xs bg-white px-2 py-1 rounded text-green-700">
                fallback
              </code>
              <span className="text-green-800">
                {t('fontOptimization.fontDisplayStrategy.fallback')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Code2 className="text-cyan-400" size={18} />
          <span className="text-cyan-400 text-sm font-medium">
            {t('fontOptimization.nextFontTitle')}
          </span>
        </div>
        <div className="overflow-hidden rounded-lg">
          <CodeBlock
            language="javascript"
            code={`import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// 자동 기능:
// ✓ 빌드 타임에 폰트 다운로드 (외부 요청 제거)
// ✓ 자동 self-hosting
// ✓ size-adjust로 CLS 최소화
// ✓ 자동 preload

export default function RootLayout({ children }) {
  return (
    <html className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}`}
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-5">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="text-amber-600" size={20} />
          {t('fontOptimization.optimizationTechniques.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">
              {t('fontOptimization.optimizationTechniques.preload.title')}
            </h4>
            <div className="bg-gray-900 rounded p-2 overflow-x-auto">
              <div className="overflow-hidden rounded-lg">
                <CodeBlock
                  language="html"
                  code={`<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>`}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">
              {t('fontOptimization.optimizationTechniques.subset.title')}
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              {t('fontOptimization.optimizationTechniques.subset.description')}
            </p>
            <div className="flex flex-wrap gap-2">
              {['latin', 'latin-ext', 'korean', 'digits'].map((subset) => (
                <span
                  key={subset}
                  className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
                >
                  {subset}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">
              {t('fontOptimization.optimizationTechniques.woff2.title')}
            </h4>
            <p className="text-sm text-gray-600">
              {t('fontOptimization.optimizationTechniques.woff2.description')}
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">
              {t('fontOptimization.optimizationTechniques.variable.title')}
            </h4>
            <p className="text-sm text-gray-600">
              {t(
                'fontOptimization.optimizationTechniques.variable.description',
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
        <AlertTriangle className="text-amber-600 shrink-0" size={20} />
        <div className="text-sm text-amber-800">
          {t('fontOptimization.koreanFontWarning')}
        </div>
      </div>
    </div>
  );
}
