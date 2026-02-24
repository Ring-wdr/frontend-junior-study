import { Code, FileText, RefreshCw, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { TypeErrorDiscoveryVisualizer } from './type-error-discovery-visualizer';

const iconMap = {
  shield: Shield,
  code: Code,
  'file-text': FileText,
  'refresh-cw': RefreshCw,
};

export const WhyTypescriptSection = () => {
  const { t } = useTranslation('week16');
  const benefits = t('whyTypescript.benefits', {
    returnObjects: true,
  }) as any[];
  const whenItems = t('whyTypescript.whenItems', {
    returnObjects: true,
  }) as string[];

  return (
    <SectionCard
      badge={{ label: t('whyTypescript.badge'), color: 'blue' }}
      title={t('whyTypescript.title')}
      description={t('whyTypescript.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('whyTypescript.comparisonTitle')}
          icon
          iconColor="blue"
        >
          <DemoBox label={t('whyTypescript.comparisonLabel')}>
            <TypeErrorDiscoveryVisualizer />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('whyTypescript.benefitsTitle')}
          icon
          iconColor="blue"
        >
          <InfoBox variant="blue" title={t('whyTypescript.benefitsInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('whyTypescript.benefitsInfoDesc')}
            </p>
          </InfoBox>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {benefits.map((benefit: any) => {
              const IconComponent =
                iconMap[benefit.icon as keyof typeof iconMap];
              return (
                <div
                  key={benefit.title}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {IconComponent && (
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    )}
                    <h5 className="font-bold text-sm text-blue-800">
                      {benefit.title}
                    </h5>
                  </div>
                  <p className="text-xs text-gray-600">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </SubSection>

        <SubSection title={t('whyTypescript.whenTitle')} icon iconColor="green">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <ul className="space-y-2">
              {whenItems.map((item: string) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-green-800"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <CodeBlock
            code={`// JavaScript - 런타임에서야 오류 발견
function greet(name) {
  return "Hello, " + name.toUpperCase();
}
greet(123); // Runtime Error: name.toUpperCase is not a function

// TypeScript - 컴파일 타임에 오류 발견
function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}
greet(123); // Compile Error: Argument of type 'number' is not assignable`}
            language="typescript"
            className="mt-4 text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
