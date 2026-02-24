import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const DevToolsElementsConsoleSection = () => {
  const { t } = useTranslation('week15');
  const [activeTab, setActiveTab] = useState(0);

  const features = t('devtoolsElements.features', {
    returnObjects: true,
  }) as any;
  const elementFeatures = [
    {
      title: features.domInspection.title,
      icon: '🔍',
      description: features.domInspection.description,
      items: features.domInspection.items,
    },
    {
      title: features.cssDebugging.title,
      icon: '🎨',
      description: features.cssDebugging.description,
      items: features.cssDebugging.items,
    },
    {
      title: features.layoutAnalysis.title,
      icon: '📐',
      description: features.layoutAnalysis.description,
      items: features.layoutAnalysis.items,
    },
    {
      title: features.accessibility.title,
      icon: '♿',
      description: features.accessibility.description,
      items: features.accessibility.items,
    },
  ];

  return (
    <SectionCard
      badge={{ label: t('devtoolsElements.badge'), color: 'blue' }}
      title={t('devtoolsElements.title')}
      description={t('devtoolsElements.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('devtoolsElements.elementsTitle')}
          icon
          iconColor="blue"
        >
          <DemoBox label={t('devtoolsElements.featureExplorer')}>
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {elementFeatures.map((feature, idx) => (
                  <button
                    key={feature.title}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      activeTab === idx
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {feature.icon} {feature.title}
                  </button>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">
                    {elementFeatures[activeTab].icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {elementFeatures[activeTab].title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {elementFeatures[activeTab].description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {elementFeatures[activeTab].items.map((item: string) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-blue-500 mt-0.5">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('devtoolsElements.consoleTitle')}
          icon
          iconColor="green"
        >
          <InfoBox
            variant="green"
            title={t('devtoolsElements.consoleInfoTitle')}
          >
            <p className="text-sm leading-relaxed mb-3">
              {t('devtoolsElements.consoleInfoDesc')}
            </p>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <CodeBlock
              code={`// console.table - 배열/객체를 테이블로 표시
const users = [
  { name: 'Alice', age: 25, role: 'Developer' },
  { name: 'Bob', age: 30, role: 'Designer' },
];
console.table(users);

// console.dir - DOM 요소의 속성 확인
console.dir(document.body);

// console.trace - 호출 스택 추적
function outer() {
  function inner() {
    console.trace('Call stack');
  }
  inner();
}
outer();

// %c 스타일 로그
console.log('%cWarning!', 'color: red; font-size: 20px');

// console.group - 로그 그룹화
console.group('User Info');
console.log('Name: Alice');
console.log('Age: 25');
console.groupEnd();`}
              language="javascript"
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('devtoolsElements.consoleCommandsTitle')}
          icon
          iconColor="purple"
        >
          <DemoBox label={t('devtoolsElements.consoleCommandsLabel')}>
            <div className="grid grid-cols-2 gap-3">
              {(
                t('devtoolsElements.consoleCommands', {
                  returnObjects: true,
                }) as any[]
              ).map((item: any) => (
                <div
                  key={item.cmd}
                  className="bg-white p-3 rounded-lg border border-gray-200"
                >
                  <code className="text-purple-600 text-sm font-mono font-bold">
                    {item.cmd}
                  </code>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  <code className="text-[10px] text-gray-400 mt-1 block font-mono">
                    {item.example}
                  </code>
                </div>
              ))}
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('devtoolsElements.shortcutsTitle')}
          icon
          iconColor="orange"
        >
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {(
                t('devtoolsElements.shortcuts', {
                  returnObjects: true,
                }) as any[]
              ).map((shortcut: any) => (
                <div key={shortcut.key} className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-white text-xs font-mono rounded border border-gray-300 shadow-sm">
                    {shortcut.key}
                  </kbd>
                  <span className="text-xs text-gray-600">
                    {shortcut.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
