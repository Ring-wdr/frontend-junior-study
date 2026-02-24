import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { GenericTypeFlowVisualizer } from './generic-type-flow-visualizer';

export const GenericsSection = () => {
  const { t } = useTranslation('week16');

  return (
    <SectionCard
      badge={{ label: t('generics.badge'), color: 'blue' }}
      title={t('generics.title')}
      description={t('generics.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('generics.whyTitle')} icon iconColor="blue">
          <p className="text-sm text-gray-600 mb-4">{t('generics.whyDesc')}</p>
          <CodeBlock
            code={`// any를 사용하면 타입 정보 손실
function identity(arg: any): any {
  return arg;
}
const result = identity("hello"); // result의 타입: any

// 제네릭 사용 - 타입 정보 보존
function identityGeneric<T>(arg: T): T {
  return arg;
}
const result2 = identityGeneric("hello"); // result2의 타입: string
const result3 = identityGeneric(42);      // result3의 타입: number`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('generics.basicTitle')} icon iconColor="blue">
          <p className="text-sm text-gray-600 mb-4">
            {t('generics.basicDesc')}
          </p>
          <CodeBlock
            code={`// 기본 제네릭 함수
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNum = first([1, 2, 3]);       // number | undefined
const firstStr = first(["a", "b", "c"]); // string | undefined

// 여러 타입 매개변수
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p = pair("hello", 42); // [string, number]`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('generics.visualizer.title')}
          icon
          iconColor="blue"
        >
          <DemoBox label={t('generics.visualizer.title')}>
            <GenericTypeFlowVisualizer />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('generics.constraintTitle')}
          icon
          iconColor="green"
        >
          <p className="text-sm text-gray-600 mb-4">
            {t('generics.constraintDesc')}
          </p>

          <InfoBox variant="green" title={t('generics.constraintInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('generics.constraintInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`// extends로 제약 추가
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length); // length 속성 보장됨
  return arg;
}

logLength("hello");   // OK - string has length
logLength([1, 2, 3]); // OK - array has length
logLength(123);       // Error! number doesn't have length`}
            language="typescript"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection title={t('generics.keyofTitle')} icon iconColor="purple">
          <p className="text-sm text-gray-600 mb-4">
            {t('generics.keyofDesc')}
          </p>
          <CodeBlock
            code={`// 객체의 키만 허용
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 25 };

const name = getProperty(user, "name"); // string
const age = getProperty(user, "age");   // number
getProperty(user, "email");             // Error! "email"은 User의 키가 아님`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('generics.interfaceTitle')} icon iconColor="blue">
          <p className="text-sm text-gray-600 mb-4">
            {t('generics.interfaceDesc')}
          </p>
          <CodeBlock
            code={`// 제네릭 인터페이스
interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "hello" };
const numberBox: Box<number> = { value: 42 };

// 제네릭 타입 별칭 (기본값 포함)
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

const success: Result<number> = { success: true, data: 42 };
const failure: Result<number> = {
  success: false,
  error: new Error("Something went wrong")
};`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
