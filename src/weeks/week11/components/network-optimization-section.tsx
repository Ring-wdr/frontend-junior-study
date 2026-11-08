'use client';

import { Cloud, Code2, Network, RefreshCw, Server, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

export function NetworkOptimizationSection() {
  const { t, raw } = useTranslation('week11');
  const [protocol, setProtocol] = useState<'h1' | 'h2'>('h1');
  const [requests, setRequests] = useState<
    {
      id: number;
      start: number;
      duration: number;
      status: 'pending' | 'active' | 'done';
    }[]
  >([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  const allDone =
    requests.length > 0 && requests.every((r) => r.status === 'done');
  const isRunning = isSimulating && !allDone;

  const startSimulation = () => {
    if (isRunning) return;
    setIsSimulating(true);
    setTotalTime(0);

    const initialRequests = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      start: 0,
      duration: 500 + Math.random() * 500,
      status: 'pending' as const,
    }));
    setRequests(initialRequests);
  };

  const selectProtocol = (next: 'h1' | 'h2') => {
    setProtocol(next);
    setIsSimulating(false);
    setRequests([]);
    setTotalTime(0);
  };

  useEffect(() => {
    if (!isSimulating || allDone) return;

    const maxConcurrent = protocol === 'h1' ? 6 : 20;
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      setTotalTime(Math.floor(elapsed));

      setRequests((prev) => {
        const settled = prev.map((req) =>
          req.status === 'active' && elapsed >= req.start + req.duration
            ? { ...req, status: 'done' as const }
            : req,
        );
        let activeCount = settled.filter((r) => r.status === 'active').length;
        return settled.map((req) => {
          if (req.status === 'pending' && activeCount < maxConcurrent) {
            activeCount++;
            return { ...req, status: 'active' as const, start: elapsed };
          }
          return req;
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isSimulating, allDone, protocol]);

  return (
    <div className="mt-4 space-y-6">
      <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
        {t('networkOptimization.description')}
      </p>

      {/* Visualizer */}
      <div className="bg-slate-900 rounded-xl p-3 sm:p-6 border border-slate-700 shadow-xl overflow-hidden">
        <div className="flex justify-between items-end gap-3 mb-6">
          <div>
            <h3 className="font-bold text-white flex items-center gap-2">
              <Network size={18} className="text-teal-400" />{' '}
              {t('networkOptimization.simulatorTitle')}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {t('networkOptimization.simulatorDesc')}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-white font-mono">
                {totalTime}ms
              </div>
              <div className="text-xs text-slate-500">
                {t('networkOptimization.totalLoadTime')}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-4 mb-4">
          <button
            type="button"
            onClick={() => selectProtocol('h1')}
            className={cn(
              `flex-1 min-w-0 px-2 py-2 rounded text-xs sm:text-sm font-bold transition-colors duration-200`,
              protocol === 'h1'
                ? 'bg-orange-500 text-white'
                : 'bg-slate-800 text-slate-400',
            )}
          >
            {t('networkOptimization.http1Queued')}
          </button>
          <button
            type="button"
            onClick={() => selectProtocol('h2')}
            className={cn(
              `flex-1 min-w-0 px-2 py-2 rounded text-xs sm:text-sm font-bold transition-colors duration-200`,
              protocol === 'h2'
                ? 'bg-teal-500 text-white'
                : 'bg-slate-800 text-slate-400',
            )}
          >
            {t('networkOptimization.http2Multiplexed')}
          </button>
          <button
            type="button"
            onClick={startSimulation}
            disabled={isRunning}
            aria-label={t('networkOptimization.startSimulation')}
            className="shrink-0 px-3 sm:px-4 bg-slate-700 text-white rounded hover:bg-slate-600 disabled:opacity-50"
          >
            <RefreshCw size={16} className={isRunning ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="h-[300px] bg-slate-800 rounded-lg relative overflow-y-auto p-3 sm:p-4 border border-slate-700">
          <div className="absolute top-0 left-0 w-full h-full flex pointer-events-none">
            <div className="w-[20%] border-r border-slate-700/50 h-full"></div>
            <div className="w-[20%] border-r border-slate-700/50 h-full"></div>
            <div className="w-[20%] border-r border-slate-700/50 h-full"></div>
            <div className="w-[20%] border-r border-slate-700/50 h-full"></div>
          </div>

          <div className="space-y-1">
            {requests.length === 0 && (
              <div className="text-center text-slate-500 py-20">
                {t('networkOptimization.clickPlayToStart')}
              </div>
            )}
            {requests.map((req) => {
              let width = 0;
              let left = 0;

              if (req.status === 'pending') {
                width = 0;
                left = 0;
              } else if (req.status === 'active') {
                const elapsedActive = totalTime - req.start;
                width = (Math.min(req.duration, elapsedActive) / 2000) * 100; // %
                left = (req.start / 2000) * 100; // %
              } else {
                width = (req.duration / 2000) * 100; // %
                left = (req.start / 2000) * 100; // %
              }

              return (
                <div
                  key={req.id}
                  className="h-2 w-full bg-slate-700/30 rounded-full relative overflow-hidden"
                >
                  {req.status !== 'pending' && (
                    <div
                      className={`absolute h-full rounded-full transition-all duration-75 ${
                        req.status === 'done' ? 'bg-teal-400' : 'bg-orange-400'
                      }`}
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        maxWidth: '100%',
                      }}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-2 text-xs text-slate-400 flex justify-between">
          <span>0ms</span>
          <span>1000ms</span>
          <span>2000ms+</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <Server className="text-blue-600" size={20} />
            <h3 className="font-bold text-gray-900">
              {t('networkOptimization.resourceHints.title')}
            </h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3">
              <code className="text-sm text-blue-600 font-medium">
                {t('networkOptimization.resourceHints.preconnect.name')}
              </code>
              <p className="text-xs text-gray-500 mt-1">
                {t('networkOptimization.resourceHints.preconnect.description')}
              </p>
              <div className="bg-gray-900 rounded p-2 mt-2 overflow-x-auto">
                <div className="overflow-hidden rounded-lg">
                  <CodeBlock
                    language="html"
                    code={`<link rel="preconnect"
      href="https://cdn.example.com" />`}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3">
              <code className="text-sm text-purple-600 font-medium">
                {t('networkOptimization.resourceHints.dnsPrefetch.name')}
              </code>
              <p className="text-xs text-gray-500 mt-1">
                {t('networkOptimization.resourceHints.dnsPrefetch.description')}
              </p>
            </div>

            <div className="bg-white rounded-lg p-3">
              <code className="text-sm text-green-600 font-medium">
                {t('networkOptimization.resourceHints.preload.name')}
              </code>
              <p className="text-xs text-gray-500 mt-1">
                {t('networkOptimization.resourceHints.preload.description')}
              </p>
            </div>

            <div className="bg-white rounded-lg p-3">
              <code className="text-sm text-orange-600 font-medium">
                {t('networkOptimization.resourceHints.prefetch.name')}
              </code>
              <p className="text-xs text-gray-500 mt-1">
                {t('networkOptimization.resourceHints.prefetch.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
          <div className="flex items-center gap-2 mb-3">
            <Cloud className="text-purple-600" size={20} />
            <h3 className="font-bold text-gray-900">
              {t('networkOptimization.cdnEdge.title')}
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {t('networkOptimization.cdnEdge.description')}
          </p>
          <div className="space-y-2">
            {raw('networkOptimization.cdnEdge.benefits').map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-sm">
                <Zap className="text-green-500" size={16} />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Vercel', 'Cloudflare', 'AWS CloudFront', 'Fastly'].map((cdn) => (
              <span
                key={cdn}
                className="px-2 py-1 bg-white rounded text-xs text-purple-600 border border-purple-200"
              >
                {cdn}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Code2 className="text-cyan-400" size={18} />
          <span className="text-cyan-400 text-sm font-medium">
            {t('networkOptimization.cacheControlTitle')}
          </span>
        </div>
        <div className="overflow-hidden rounded-lg">
          <CodeBlock
            language="javascript"
            code={`// 정적 자원 (JS, CSS, Images) - 장기 캐시 + 해시
Cache-Control: public, max-age=31536000, immutable

// HTML - 항상 재검증
Cache-Control: no-cache

// API 응답 - stale-while-revalidate
Cache-Control: max-age=60, stale-while-revalidate=3600

// 민감한 데이터 - 캐시 금지
Cache-Control: no-store, private`}
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw className="text-teal-600" size={20} />
          <h3 className="font-bold text-gray-900">
            {t('networkOptimization.http2http3.title')}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">
              {t('networkOptimization.http2http3.http2.title')}
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {raw('networkOptimization.http2http3.http2.features').map(
                (feature) => (
                  <li key={feature}>• {feature}</li>
                ),
              )}
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">
              {t('networkOptimization.http2http3.http3.title')}
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {raw('networkOptimization.http2http3.http3.features').map(
                (feature) => (
                  <li key={feature}>• {feature}</li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <Trans t={t} i18nKey="networkOptimization.staleWhileRevalidateInfo" />
      </div>
    </div>
  );
}
