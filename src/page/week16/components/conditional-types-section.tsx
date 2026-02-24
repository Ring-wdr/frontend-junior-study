import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { ConditionalTypeFlowchart } from './conditional-type-flowchart';

export const ConditionalTypesSection = () => {
  const { t } = useTranslation('week16');

  return (
    <SectionCard
      badge={{ label: t('conditionalTypes.badge'), color: 'purple' }}
      title={t('conditionalTypes.title')}
      description={t('conditionalTypes.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('conditionalTypes.basicTitle')}
          icon
          iconColor="purple"
        >
          <p className="text-sm text-gray-600 mb-4">
            {t('conditionalTypes.basicDesc')}
          </p>
          <CodeBlock
            code={`// T extends U ? X : Y
// "T가 U에 할당 가능하면 X, 아니면 Y"

type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"
type C = IsString<"hello">; // "yes" - 리터럴 타입도 string에 할당 가능`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('conditionalTypes.visualizer.title')}
          icon
          iconColor="purple"
        >
          <DemoBox label={t('conditionalTypes.visualizer.title')}>
            <ConditionalTypeFlowchart />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('conditionalTypes.distributiveTitle')}
          icon
          iconColor="blue"
        >
          <p className="text-sm text-gray-600 mb-4">
            {t('conditionalTypes.distributiveDesc')}
          </p>

          <InfoBox
            variant="purple"
            title={t('conditionalTypes.distributiveInfoTitle')}
          >
            <p className="text-sm leading-relaxed">
              {t('conditionalTypes.distributiveInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`type ToArray<T> = T extends any ? T[] : never;

// 유니온의 각 멤버에 분배 적용
type Result = ToArray<string | number>;
// string[] | number[] (not (string | number)[])

// 분배 방지하려면 튜플로 감싸기
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type Result2 = ToArrayNonDist<string | number>;
// (string | number)[]`}
            language="typescript"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection
          title={t('conditionalTypes.inferTitle')}
          icon
          iconColor="pink"
        >
          <p className="text-sm text-gray-600 mb-4">
            {t('conditionalTypes.inferDesc')}
          </p>

          <InfoBox variant="blue" title={t('conditionalTypes.inferInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('conditionalTypes.inferInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`// 배열 요소 타입 추출
type ElementType<T> = T extends (infer E)[] ? E : never;

type A = ElementType<string[]>;  // string
type B = ElementType<number[]>;  // number
type C = ElementType<string>;    // never

// 함수 반환 타입 추출 (ReturnType 구현)
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Promise 내부 타입 추출 (Awaited 구현)
type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;

type D = MyAwaited<Promise<Promise<string>>>; // string`}
            language="typescript"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection
          title={t('conditionalTypes.customTitle')}
          icon
          iconColor="orange"
        >
          <p className="text-sm text-gray-600 mb-4">
            {t('conditionalTypes.customDesc')}
          </p>
          <CodeBlock
            code={`// 첫 번째 매개변수 타입 추출
type FirstParam<T> = T extends (first: infer F, ...rest: any[]) => any
  ? F
  : never;

type F = FirstParam<(a: string, b: number) => void>; // string

// 깊은 Partial
type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

// 깊은 Readonly
type DeepReadonly<T> = T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
