import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const RtlSection = () => {
  const { t } = useTranslation('week14');
  const [isRtl, setIsRtl] = useState(false);

  return (
    <SectionCard
      badge={{ label: t('rtl.badge'), color: 'red' }}
      title={t('rtl.title')}
      description={t('rtl.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('rtl.languages.title')} icon iconColor="red">
          <InfoBox variant="red" title={t('rtl.languages.infoTitle')}>
            <p className="text-sm mb-3">
              {t('rtl.languages.infoText')}
            </p>
            <div className="flex flex-wrap gap-2">
              {(t('rtl.languages.list', { returnObjects: true }) as Array<{ lang: string; speakers: string }>).map((item) => (
                <div
                  key={item.lang}
                  className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs"
                >
                  {item.lang} ({item.speakers})
                </div>
              ))}
            </div>
          </InfoBox>
        </SubSection>

        <SubSection title={t('rtl.liveDemo.title')} icon iconColor="blue">
          <DemoBox label={t('rtl.liveDemo.label')}>
            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsRtl(false)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition ${
                    !isRtl
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  {t('rtl.liveDemo.ltr')}
                </button>
                <button
                  type="button"
                  onClick={() => setIsRtl(true)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition ${
                    isRtl
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  {t('rtl.liveDemo.rtl')}
                </button>
              </div>

              {/* Demo Card */}
              <div
                dir={isRtl ? 'rtl' : 'ltr'}
                className="bg-white p-4 rounded-lg border border-gray-200 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div>
                    <h4 className="font-bold">
                      {isRtl ? t('rtl.liveDemo.name.rtl') : t('rtl.liveDemo.name.ltr')}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {isRtl ? t('rtl.liveDemo.role.rtl') : t('rtl.liveDemo.role.ltr')}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {isRtl ? t('rtl.liveDemo.text.rtl') : t('rtl.liveDemo.text.ltr')}
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm"
                  >
                    {isRtl ? t('rtl.liveDemo.submit.rtl') : t('rtl.liveDemo.submit.ltr')} →
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm"
                  >
                    {isRtl ? t('rtl.liveDemo.cancel.rtl') : t('rtl.liveDemo.cancel.ltr')}
                  </button>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <code>dir="{isRtl ? 'rtl' : 'ltr'}"</code> - {t('rtl.liveDemo.note')}
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title={t('rtl.logicalProperties.title')} icon iconColor="green">
          <InfoBox variant="green" title={t('rtl.logicalProperties.infoTitle')}>
            <p className="text-sm mb-2">
              {t('rtl.logicalProperties.infoText')}
            </p>
          </InfoBox>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <h4 className="text-sm font-semibold text-red-800 mb-2">
                {t('rtl.logicalProperties.physical')}
              </h4>
              <div className="font-mono text-xs space-y-1 text-red-700">
                <div>margin-left: 1rem;</div>
                <div>padding-right: 1rem;</div>
                <div>text-align: left;</div>
                <div>border-left: 1px solid;</div>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <h4 className="text-sm font-semibold text-green-800 mb-2">
                {t('rtl.logicalProperties.logical')}
              </h4>
              <div className="font-mono text-xs space-y-1 text-green-700">
                <div>margin-inline-start: 1rem;</div>
                <div>padding-inline-end: 1rem;</div>
                <div>text-align: start;</div>
                <div>border-inline-start: 1px solid;</div>
              </div>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('rtl.mapping.title')} icon iconColor="purple">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">{t('rtl.mapping.headers.physical')}</th>
                  <th className="p-2 text-left">{t('rtl.mapping.headers.logical')}</th>
                  <th className="p-2 text-left">{t('rtl.mapping.headers.ltr')}</th>
                  <th className="p-2 text-left">{t('rtl.mapping.headers.rtl')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    physical: 'left',
                    logical: 'inline-start',
                    ltr: 'left',
                    rtl: 'right',
                  },
                  {
                    physical: 'right',
                    logical: 'inline-end',
                    ltr: 'right',
                    rtl: 'left',
                  },
                  {
                    physical: 'margin-left',
                    logical: 'margin-inline-start',
                    ltr: 'left',
                    rtl: 'right',
                  },
                  {
                    physical: 'padding-right',
                    logical: 'padding-inline-end',
                    ltr: 'right',
                    rtl: 'left',
                  },
                  {
                    physical: 'border-left',
                    logical: 'border-inline-start',
                    ltr: 'left',
                    rtl: 'right',
                  },
                  {
                    physical: 'text-align: left',
                    logical: 'text-align: start',
                    ltr: 'left',
                    rtl: 'right',
                  },
                ].map((row) => (
                  <tr key={row.physical} className="border-t">
                    <td className="p-2 font-mono text-xs text-red-600">
                      {row.physical}
                    </td>
                    <td className="p-2 font-mono text-xs text-green-600">
                      {row.logical}
                    </td>
                    <td className="p-2 text-xs">{row.ltr}</td>
                    <td className="p-2 text-xs">{row.rtl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title={t('rtl.tailwind.title')} icon iconColor="orange">
          <CodeBlock
            code={`// tailwind.config.js
module.exports = {
  // Enable RTL variants
  plugins: [
    require('tailwindcss-rtl'),
  ],
}

// Usage with RTL plugin
<div className="ms-4">   {/* margin-inline-start */}
<div className="me-4">   {/* margin-inline-end */}
<div className="ps-4">   {/* padding-inline-start */}
<div className="pe-4">   {/* padding-inline-end */}
<div className="start-0"> {/* inset-inline-start */}
<div className="end-0">   {/* inset-inline-end */}

// Or use built-in Tailwind v3+ logical properties
<div className="text-start">  {/* text-align: start */}
<div className="text-end">    {/* text-align: end */}
<div className="float-start"> {/* float: inline-start */}
<div className="float-end">   {/* float: inline-end */}`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('rtl.checklist.title')} icon iconColor="blue">
          <div className="space-y-2">
            {(t('rtl.checklist.items', { returnObjects: true }) as Array<{ item: string; done: boolean }>).map((check) => (
              <div
                key={check.item}
                className={`flex items-center gap-2 p-2 rounded ${
                  check.done ? 'bg-green-50' : 'bg-gray-50'
                }`}
              >
                <span className={check.done ? 'text-green-500' : 'text-gray-400'}>
                  {check.done ? '✓' : '○'}
                </span>
                <span
                  className={`text-sm ${check.done ? 'text-green-700' : 'text-gray-600'}`}
                >
                  {check.item}
                </span>
              </div>
            ))}
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
