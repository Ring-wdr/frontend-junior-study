import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';

export const DevToolsSourcesNetworkSection = () => {
  const { t } = useTranslation('week15');
  const [selectedBreakpoint, setSelectedBreakpoint] = useState(0);

  const bpTypes = t('devtoolsSources.breakpointTypes', { returnObjects: true }) as any[];
  const breakpointTypes = [
    { ...bpTypes[0], icon: '🔴' },
    { ...bpTypes[1], icon: '🟡' },
    { ...bpTypes[2], icon: '🌐' },
    { ...bpTypes[3], icon: '🔧' },
    { ...bpTypes[4], icon: '👆' },
  ];

  return (
    <SectionCard
      badge={{ label: t('devtoolsSources.badge'), color: 'green' }}
      title={t('devtoolsSources.title')}
      description={t('devtoolsSources.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('devtoolsSources.breakpointsTitle')} icon iconColor="green">
          <InfoBox variant="green" title={t('devtoolsSources.breakpointsInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('devtoolsSources.breakpointsInfoDesc')}
            </p>
          </InfoBox>

          <DemoBox label={t('devtoolsSources.breakpointsLabel')}>
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {breakpointTypes.map((bp, idx) => (
                  <button
                    key={bp.name}
                    type="button"
                    onClick={() => setSelectedBreakpoint(idx)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedBreakpoint === idx
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {bp.icon} {bp.name}
                  </button>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">
                    {breakpointTypes[selectedBreakpoint].icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {breakpointTypes[selectedBreakpoint].name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {breakpointTypes[selectedBreakpoint].desc}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">How:</span>
                    <span className="text-gray-700">
                      {breakpointTypes[selectedBreakpoint].how}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">Tip:</span>
                    <span className="text-gray-700">
                      {breakpointTypes[selectedBreakpoint].tip}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title={t('devtoolsSources.debugControlTitle')} icon iconColor="blue">
          <div className="grid grid-cols-3 gap-3">
            {(t('devtoolsSources.debugControls', { returnObjects: true }) as any[]).map((control: any, idx: number) => (
              <div
                key={control.name}
                className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center"
              >
                <span className="text-2xl">{['▶️', '⏭️', '⬇️', '⬆️', '⏸️', '🔄'][idx]}</span>
                <p className="font-medium text-sm mt-1">{control.name}</p>
                <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded border mt-1 inline-block">
                  {control.shortcut}
                </kbd>
                <p className="text-[10px] text-gray-500 mt-1">{control.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('devtoolsSources.scopeWatchTitle')} icon iconColor="purple">
          <DemoBox label={t('devtoolsSources.scopeWatchLabel')}>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h5 className="font-bold text-sm text-gray-900 mb-2">
                  {t('devtoolsSources.scopePanelTitle')}
                </h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {(t('devtoolsSources.scopeItems', { returnObjects: true }) as any[]).map((item: any) => (
                    <li key={item.label}>• <strong>{item.label}</strong> {item.desc}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h5 className="font-bold text-sm text-gray-900 mb-2">
                  {t('devtoolsSources.watchPanelTitle')}
                </h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {(t('devtoolsSources.watchItems', { returnObjects: true }) as string[]).map((item: string, idx: number) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title={t('devtoolsSources.networkTitle')} icon iconColor="orange">
          <InfoBox variant="orange" title={t('devtoolsSources.networkInfoTitle')}>
            <p className="text-sm">
              {t('devtoolsSources.networkInfoDesc')}
            </p>
          </InfoBox>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {(t('devtoolsSources.networkFeatures', { returnObjects: true }) as any[]).map((item: any) => (
              <div
                key={item.label}
                className="bg-white p-3 rounded-lg border border-gray-200"
              >
                <h5 className="font-bold text-sm text-orange-600">
                  {item.label}
                </h5>
                <p className="text-xs text-gray-500 mb-2">{item.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {item.check.map((c: string) => (
                    <span
                      key={c}
                      className="text-[10px] bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('devtoolsSources.asyncTitle')} icon iconColor="red">
          <InfoBox variant="blue">
            <p className="text-sm">
              {t('devtoolsSources.asyncDesc')}
            </p>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
