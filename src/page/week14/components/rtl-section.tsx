import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const RtlSection = () => {
  const [isRtl, setIsRtl] = useState(false);

  return (
    <SectionCard
      badge={{ label: 'RTL', color: 'red' }}
      title="RTL (Right-to-Left) 지원"
      description="아랍어, 히브리어 등 RTL 언어를 위한 필수 기능"
    >
      <div className="space-y-8">
        <SubSection title="RTL이 필요한 언어" icon iconColor="red">
          <InfoBox variant="red" title="RTL Languages">
            <p className="text-sm mb-3">
              약 4억 명 이상의 사용자가 RTL 언어를 사용합니다. 글로벌 서비스라면
              반드시 고려해야 합니다.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { lang: 'Arabic (العربية)', speakers: '310M+' },
                { lang: 'Hebrew (עברית)', speakers: '9M+' },
                { lang: 'Persian (فارسی)', speakers: '110M+' },
                { lang: 'Urdu (اردو)', speakers: '70M+' },
              ].map((item) => (
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

        <SubSection title="Interactive: LTR vs RTL" icon iconColor="blue">
          <DemoBox label="Toggle Direction">
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
                  LTR (English)
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
                  RTL (العربية)
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
                      {isRtl ? 'محمد أحمد' : 'John Doe'}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {isRtl ? 'مطور واجهة أمامية' : 'Frontend Developer'}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {isRtl
                    ? 'هذا مثال على النص العربي الذي يُقرأ من اليمين إلى اليسار.'
                    : 'This is an example of text that reads from left to right.'}
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm"
                  >
                    {isRtl ? 'إرسال' : 'Submit'} →
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm"
                  >
                    {isRtl ? 'إلغاء' : 'Cancel'}
                  </button>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <code>dir="{isRtl ? 'rtl' : 'ltr'}"</code> - 텍스트 방향, margin,
                padding, 정렬 모두 변경됨
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="CSS Logical Properties" icon iconColor="green">
          <InfoBox variant="green" title="Direction-Agnostic CSS">
            <p className="text-sm mb-2">
              CSS Logical Properties를 사용하면 LTR/RTL을 자동으로 처리합니다.
              <code>left/right</code> 대신 <code>start/end</code>를 사용하세요.
            </p>
          </InfoBox>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <h4 className="text-sm font-semibold text-red-800 mb-2">
                ✗ Physical (Avoid)
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
                ✓ Logical (Use)
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

        <SubSection title="Logical Properties 매핑" icon iconColor="purple">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Physical</th>
                  <th className="p-2 text-left">Logical</th>
                  <th className="p-2 text-left">LTR</th>
                  <th className="p-2 text-left">RTL</th>
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

        <SubSection title="Tailwind CSS RTL 지원" icon iconColor="orange">
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

        <SubSection title="RTL 구현 체크리스트" icon iconColor="blue">
          <div className="space-y-2">
            {[
              { item: '<html dir="rtl" lang="ar"> 설정', done: true },
              { item: 'CSS Logical Properties 사용', done: true },
              { item: '아이콘 방향 미러링 (←→ 화살표 등)', done: true },
              { item: '양방향 텍스트(Bidi) 처리', done: false },
              { item: '숫자/전화번호는 LTR 유지', done: true },
              { item: '애니메이션 방향 반전', done: false },
            ].map((check) => (
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
