import { Check, Clock, Cpu, Globe, Shield, X, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

const conceptIconMap = {
  cpu: Cpu,
  zap: Zap,
  shield: Shield,
  globe: Globe,
};

export const WasmIntroSection = () => {
  const { t } = useTranslation('week18');
  const concepts = t('wasmIntro.concepts', { returnObjects: true }) as any[];
  const timeline = t('wasmIntro.timeline', { returnObjects: true }) as any[];
  const suitable = t('wasmIntro.useCases.suitable', {
    returnObjects: true,
  }) as string[];
  const unsuitable = t('wasmIntro.useCases.unsuitable', {
    returnObjects: true,
  }) as string[];

  return (
    <SectionCard
      badge={{ label: t('wasmIntro.badge'), color: 'purple' }}
      title={t('wasmIntro.title')}
      description={t('wasmIntro.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('wasmIntro.conceptsTitle')}
          icon
          iconColor="purple"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concepts.map((concept: any) => {
              const IconComponent =
                conceptIconMap[concept.icon as keyof typeof conceptIconMap] ||
                Cpu;
              return (
                <div
                  key={concept.title}
                  className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent className="w-5 h-5 text-purple-600" />
                    <h4 className="font-bold text-sm text-purple-800">
                      {concept.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600">{concept.desc}</p>
                </div>
              );
            })}
          </div>
        </SubSection>

        <SubSection title={t('wasmIntro.historyTitle')} icon iconColor="blue">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="space-y-3">
              {timeline.map((item: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold text-blue-700">
                      {item.year}
                    </span>
                  </div>
                  <span className="text-xs text-gray-700">{item.event}</span>
                </div>
              ))}
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('wasmIntro.comparisonTitle')}
          icon
          iconColor="green"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-sm text-gray-700 mb-2">
                JavaScript
              </h4>
              <CodeBlock
                code={`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}
console.time("JS");
fibonacci(40);
console.timeEnd("JS"); // ~1000ms+`}
                language="javascript"
                className="text-xs"
              />
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-bold text-sm text-orange-700 mb-2">
                C → WebAssembly
              </h4>
              <CodeBlock
                code={`int fibonacci(int n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}
// Wasm: ~100ms (약 10배 빠름)`}
                language="c"
                className="text-xs"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {t('wasmIntro.performanceNote')}
          </p>
        </SubSection>

        <SubSection
          title={t('wasmIntro.whenToUseTitle')}
          icon
          iconColor="orange"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-bold text-sm text-green-700 mb-2 flex items-center gap-2">
                <Check className="w-4 h-4" />
                {t('wasmIntro.suitableTitle')}
              </h4>
              <ul className="space-y-1">
                {suitable.map((item: string) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs text-green-700"
                  >
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-bold text-sm text-red-700 mb-2 flex items-center gap-2">
                <X className="w-4 h-4" />
                {t('wasmIntro.unsuitableTitle')}
              </h4>
              <ul className="space-y-1">
                {unsuitable.map((item: string) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs text-red-700"
                  >
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <InfoBox variant="blue" title={t('wasmIntro.keyPoint')}>
            <p className="text-sm leading-relaxed">
              {t('wasmIntro.keyPointDesc')}
            </p>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
