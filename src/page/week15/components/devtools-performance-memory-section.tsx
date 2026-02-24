import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';

export const DevToolsPerformanceMemorySection = () => {
  const { t } = useTranslation('week15');
  const [activeMetric, setActiveMetric] = useState(0);

  const metrics = t('devtoolsPerformance.metrics', {
    returnObjects: true,
  }) as any[];
  const performanceMetrics = [
    { ...metrics[0], icon: '📊', color: 'green' },
    { ...metrics[1], icon: '⏱️', color: 'red' },
    { ...metrics[2], icon: '↔️', color: 'orange' },
    { ...metrics[3], icon: '📜', color: 'yellow' },
  ];

  return (
    <SectionCard
      badge={{ label: t('devtoolsPerformance.badge'), color: 'purple' }}
      title={t('devtoolsPerformance.title')}
      description={t('devtoolsPerformance.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('devtoolsPerformance.recordingTitle')}
          icon
          iconColor="purple"
        >
          <InfoBox
            variant="purple"
            title={t('devtoolsPerformance.recordingInfoTitle')}
          >
            <p className="text-sm leading-relaxed">
              {t('devtoolsPerformance.recordingInfoDesc')}
            </p>
          </InfoBox>

          <DemoBox label={t('devtoolsPerformance.recordingLabel')}>
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {performanceMetrics.map((metric, idx) => (
                  <button
                    key={metric.name}
                    type="button"
                    onClick={() => setActiveMetric(idx)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      activeMetric === idx
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {metric.icon} {metric.name}
                  </button>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">
                    {performanceMetrics[activeMetric].icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {performanceMetrics[activeMetric].name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {performanceMetrics[activeMetric].desc}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-green-50 p-2 rounded">
                    <span className="text-green-600 font-bold">Target: </span>
                    {performanceMetrics[activeMetric].target}
                  </div>
                  <div className="bg-red-50 p-2 rounded">
                    <span className="text-red-600 font-bold">Issue: </span>
                    {performanceMetrics[activeMetric].issue}
                  </div>
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('devtoolsPerformance.stepsTitle')}
          icon
          iconColor="blue"
        >
          <div className="space-y-3">
            {(
              t('devtoolsPerformance.recordingSteps', {
                returnObjects: true,
              }) as any[]
            ).map((item: any) => (
              <div
                key={item.step}
                className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg"
              >
                <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {item.step}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span>{['⏺️', '👆', '⏹️', '📈', '🔍'][item.step - 1]}</span>
                    <h5 className="font-medium text-gray-900">{item.title}</h5>
                  </div>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection
          title={t('devtoolsPerformance.memoryTitle')}
          icon
          iconColor="red"
        >
          <InfoBox
            variant="red"
            title={t('devtoolsPerformance.memoryInfoTitle')}
          >
            <p className="text-sm leading-relaxed">
              {t('devtoolsPerformance.memoryInfoDesc')}
            </p>
          </InfoBox>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {(
              t('devtoolsPerformance.memoryTools', {
                returnObjects: true,
              }) as any[]
            ).map((item: any, idx: number) => (
              <div
                key={item.title}
                className="bg-white p-3 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">
                    {['📸', '📊', '🎯', '🔗'][idx]}
                  </span>
                  <h5 className="font-bold text-sm text-gray-900">
                    {item.title}
                  </h5>
                </div>
                <p className="text-xs text-gray-500 mb-1">{item.desc}</p>
                <p className="text-xs text-blue-600">{item.use}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection
          title={t('devtoolsPerformance.leakPatternsTitle')}
          icon
          iconColor="orange"
        >
          <DemoBox label={t('devtoolsPerformance.leakPatternsLabel')}>
            <div className="space-y-3">
              {(
                t('devtoolsPerformance.leakPatterns', {
                  returnObjects: true,
                }) as any[]
              ).map((item: any) => (
                <div
                  key={item.pattern}
                  className="bg-white p-3 rounded-lg border border-gray-200"
                >
                  <h5 className="font-bold text-sm text-red-600 mb-1">
                    {item.pattern}
                  </h5>
                  <code className="text-xs text-gray-600 block bg-gray-50 p-1.5 rounded mb-1">
                    {item.code}
                  </code>
                  <p className="text-xs text-green-600">✓ Fix: {item.fix}</p>
                </div>
              ))}
            </div>
          </DemoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
