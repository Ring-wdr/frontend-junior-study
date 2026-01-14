import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { TypeAnnotationPlayground } from './type-annotation-playground';

export const TypeBasicsSection = () => {
  const { t } = useTranslation('week16');
  const primitiveTypes = t('typeBasics.primitiveTypes', { returnObjects: true }) as any[];
  const comparison = t('typeBasics.comparison', { returnObjects: true }) as any[];

  return (
    <SectionCard
      badge={{ label: t('typeBasics.badge'), color: 'blue' }}
      title={t('typeBasics.title')}
      description={t('typeBasics.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('typeBasics.primitiveTitle')} icon iconColor="blue">
          <p className="text-sm text-gray-600 mb-4">{t('typeBasics.primitiveDesc')}</p>
          <div className="grid grid-cols-2 gap-2">
            {primitiveTypes.map((item: any) => (
              <div
                key={item.type}
                className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center justify-between"
              >
                <div>
                  <code className="text-sm font-bold text-blue-600">{item.type}</code>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <code className="text-xs bg-white px-2 py-1 rounded text-gray-600">
                  {item.example}
                </code>
              </div>
            ))}
          </div>

          <CodeBlock
            code={`// 기본 원시 타입 선언
const name: string = "Alice";
const age: number = 25;
const isActive: boolean = true;
const nothing: null = null;
const notDefined: undefined = undefined;`}
            language="typescript"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection title={t('typeBasics.arrayTitle')} icon iconColor="purple">
          <p className="text-sm text-gray-600 mb-4">{t('typeBasics.arrayDesc')}</p>
          <CodeBlock
            code={`// 배열 타입 - 두 가지 표기법
const numbers: number[] = [1, 2, 3];
const strings: Array<string> = ["a", "b", "c"];

// 튜플 - 고정 길이와 타입
const point: [number, number] = [10, 20];
const entry: [string, number] = ["age", 25];

// 읽기 전용 배열
const readonlyArr: readonly number[] = [1, 2, 3];`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('typeBasics.objectTitle')} icon iconColor="blue">
          <p className="text-sm text-gray-600 mb-4">{t('typeBasics.objectDesc')}</p>
          <CodeBlock
            code={`// interface - 확장 가능한 객체 타입 정의
interface User {
  name: string;
  age: number;
  email?: string;        // 선택적 속성
  readonly id: number;   // 읽기 전용
}

// type alias - 타입에 이름 붙이기
type Point = {
  x: number;
  y: number;
};

// 인라인 객체 타입
const user: { name: string; age: number } = {
  name: "Alice",
  age: 25,
};`}
            language="typescript"
            className="text-xs"
          />

          <InfoBox variant="blue" title={t('typeBasics.interfaceVsTypeInfoTitle')} className="mt-4">
            <p className="text-sm leading-relaxed">
              {t('typeBasics.interfaceVsTypeInfoDesc')}
            </p>
          </InfoBox>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2 font-medium text-gray-700">Feature</th>
                  <th className="text-left p-2 font-medium text-indigo-600">interface</th>
                  <th className="text-left p-2 font-medium text-purple-600">type</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row: any) => (
                  <tr key={row.feature} className="border-b border-gray-100">
                    <td className="p-2 text-gray-600">{row.feature}</td>
                    <td className="p-2 text-indigo-600">{row.interface}</td>
                    <td className="p-2 text-purple-600">{row.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title={t('typeBasics.functionTitle')} icon iconColor="green">
          <p className="text-sm text-gray-600 mb-4">{t('typeBasics.functionDesc')}</p>
          <CodeBlock
            code={`// 함수 선언
function add(a: number, b: number): number {
  return a + b;
}

// 화살표 함수
const multiply = (a: number, b: number): number => a * b;

// 함수 타입 표현
type MathOperation = (a: number, b: number) => number;
const divide: MathOperation = (a, b) => a / b;

// 선택적 매개변수와 기본값
function greet(name: string, greeting: string = "Hello"): string {
  return \`\${greeting}, \${name}!\`;
}

// 나머지 매개변수
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('typeBasics.visualizer.title')} icon iconColor="blue">
          <DemoBox label={t('typeBasics.visualizer.title')}>
            <TypeAnnotationPlayground />
          </DemoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
