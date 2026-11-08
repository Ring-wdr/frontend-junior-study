'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const WebVitalsSection = () => {
  const { t, raw } = useTranslation('week15');
  const [selectedVital, setSelectedVital] = useState(0);

  const vitalsList = raw('webVitals.vitals');
  const vitals = [
    { ...vitalsList[0], icon: '🖼️' },
    { ...vitalsList[1], icon: '👆' },
    { ...vitalsList[2], icon: '↔️' },
    { ...vitalsList[3], icon: '⚡' },
    { ...vitalsList[4], icon: '🌐' },
  ];

  return (
    <SectionCard
      badge={{ label: t('webVitals.badge'), color: 'blue' }}
      description={t('webVitals.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('webVitals.introTitle')} icon iconColor="blue">
          <InfoBox variant="blue" title={t('webVitals.introInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('webVitals.introInfoDesc')}
            </p>
          </InfoBox>
        </SubSection>

        <SubSection title={t('webVitals.metricsTitle')} icon iconColor="purple">
          <DemoBox label={t('webVitals.metricsLabel')}>
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {vitals.map((vital, idx) => (
                  <button
                    key={vital.name}
                    type="button"
                    onClick={() => setSelectedVital(idx)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedVital === idx
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {vital.icon} {vital.name}
                  </button>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{vitals[selectedVital].icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {vitals[selectedVital].name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {vitals[selectedVital].fullName}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3">
                  {vitals[selectedVital].desc}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-green-50 p-2 rounded text-center">
                    <span className="text-xs text-green-600 font-bold">
                      {t('webVitals.goodLabel')}
                    </span>
                    <p className="text-sm text-green-800">
                      {vitals[selectedVital].good}
                    </p>
                  </div>
                  <div className="bg-red-50 p-2 rounded text-center">
                    <span className="text-xs text-red-600 font-bold">
                      {t('webVitals.poorLabel')}
                    </span>
                    <p className="text-sm text-red-800">
                      {vitals[selectedVital].poor}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <h5 className="text-xs font-bold text-gray-700 mb-2">
                    {t('webVitals.improvementLabel')}
                  </h5>
                  <ul className="space-y-1">
                    {vitals[selectedVital].improve.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-gray-600 flex items-start gap-1"
                      >
                        <span className="text-blue-500">→</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('webVitals.collectionTitle')}
          icon
          iconColor="green"
        >
          <CodeBlock
            code={`// 1. web-vitals 라이브러리 설치
npm install web-vitals

// 2. 측정 및 로깅
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,  // 'good' | 'needs-improvement' | 'poor'
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  });

  // Beacon API로 전송 (페이지 이탈 시에도 전송 보장)
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/analytics', body);
  } else {
    fetch('/analytics', { body, method: 'POST', keepalive: true });
  }
}

// 모든 Core Web Vitals 측정
onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);

// 3. Sentry와 연동
import * as Sentry from '@sentry/react';
import { onLCP, onINP, onCLS } from 'web-vitals';

function sendToSentry(metric) {
  Sentry.setMeasurement(metric.name, metric.value, 'millisecond');
}

onLCP(sendToSentry);
onINP(sendToSentry);
onCLS(sendToSentry);`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('webVitals.environmentTitle')}
          icon
          iconColor="orange"
        >
          <InfoBox variant="orange" title={t('webVitals.environmentInfoTitle')}>
            <p className="text-sm">{t('webVitals.environmentInfoDesc')}</p>
          </InfoBox>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <h5 className="font-bold text-sm text-blue-800 mb-2">
                {t('webVitals.labDataTitle')}
              </h5>
              <ul className="text-xs text-blue-700 space-y-1">
                {(
                  raw('webVitals.labDataItems')
                ).map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <h5 className="font-bold text-sm text-green-800 mb-2">
                {t('webVitals.fieldDataTitle')}
              </h5>
              <ul className="text-xs text-green-700 space-y-1">
                {(
                  raw('webVitals.fieldDataItems')
                ).map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('webVitals.dashboardTitle')} icon iconColor="red">
          <div className="space-y-3">
            {(raw('webVitals.dashboards')).map(
              (item) => (
                <div
                  key={item.tool}
                  className="bg-white p-3 rounded-lg border border-gray-200 flex flex-wrap items-center justify-between gap-x-3 gap-y-1"
                >
                  <div className="min-w-0">
                    <h5 className="font-bold text-sm text-gray-900">
                      {item.tool}
                    </h5>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <span className="text-xs text-blue-500">{item.link}</span>
                </div>
              ),
            )}
          </div>
        </SubSection>

        <SubSection
          title={t('webVitals.priorityTitle')}
          icon
          iconColor="purple"
        >
          <DemoBox label={t('webVitals.priorityLabel')}>
            <div className="space-y-2">
              {(
                raw('webVitals.priorities')
              ).map((item) => (
                <div
                  key={item.priority}
                  className="flex items-center gap-3 bg-gray-50 p-2 rounded"
                >
                  <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {item.priority}
                  </span>
                  <span className="text-sm text-gray-700 flex-1">
                    {item.action}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      item.impact === 'High'
                        ? 'bg-red-100 text-red-700'
                        : item.impact === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {item.impact}
                  </span>
                </div>
              ))}
            </div>
          </DemoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
