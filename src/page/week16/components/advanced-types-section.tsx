import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { TypeSetVisualizer } from './type-set-visualizer';

export const AdvancedTypesSection = () => {
  const { t } = useTranslation('week16');

  return (
    <SectionCard
      badge={{ label: t('advancedTypes.badge'), color: 'purple' }}
      title={t('advancedTypes.title')}
      description={t('advancedTypes.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('advancedTypes.unionTitle')} icon iconColor="purple">
          <p className="text-sm text-gray-600 mb-4">{t('advancedTypes.unionDesc')}</p>
          <CodeBlock
            code={`// 기본 유니온
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 42; // OK

// 실용적인 예: API 응답
type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string };

function handleResponse(res: ApiResponse<User>) {
  if (res.status === "success") {
    console.log(res.data); // User 타입
  } else {
    console.log(res.error); // string 타입
  }
}`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('advancedTypes.intersectionTitle')} icon iconColor="blue">
          <p className="text-sm text-gray-600 mb-4">{t('advancedTypes.intersectionDesc')}</p>
          <CodeBlock
            code={`interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

// 두 인터페이스를 모두 만족
type Person = HasName & HasAge;

const person: Person = {
  name: "Alice",
  age: 25, // 두 속성 모두 필수
};`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Union & Intersection Visualizer" icon iconColor="purple">
          <DemoBox label={t('advancedTypes.visualizer.title')}>
            <TypeSetVisualizer />
          </DemoBox>
        </SubSection>

        <SubSection title={t('advancedTypes.literalTitle')} icon iconColor="pink">
          <p className="text-sm text-gray-600 mb-4">{t('advancedTypes.literalDesc')}</p>
          <CodeBlock
            code={`// 문자열 리터럴
type Direction = "up" | "down" | "left" | "right";
let move: Direction = "up"; // OK
move = "diagonal"; // Error!

// 숫자 리터럴
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

// as const - 리터럴 타입으로 추론
const config = {
  endpoint: "/api/users",
  method: "GET",
} as const;
// config.method의 타입: "GET" (string이 아님)`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('advancedTypes.narrowingTitle')} icon iconColor="green">
          <p className="text-sm text-gray-600 mb-4">{t('advancedTypes.narrowingDesc')}</p>

          <InfoBox variant="green" title={t('advancedTypes.narrowingInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('advancedTypes.narrowingInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`// typeof 가드
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + value; // padding은 number
  }
  return padding + value; // padding은 string
}

// in 연산자 가드
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim(); // Fish
  } else {
    animal.fly(); // Bird
  }
}`}
            language="typescript"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection title={t('advancedTypes.assertionTitle')} icon iconColor="orange">
          <p className="text-sm text-gray-600 mb-4">{t('advancedTypes.assertionDesc')}</p>
          <CodeBlock
            code={`// as 키워드
const input = document.getElementById("myInput") as HTMLInputElement;
input.value = "Hello";

// Non-null assertion (!)
function processValue(value: string | null) {
  console.log(value!.toUpperCase()); // value가 null이 아님을 확신
}`}
            language="typescript"
            className="text-xs"
          />

          <InfoBox variant="orange" title="Warning" className="mt-4">
            <p className="text-sm leading-relaxed">
              {t('advancedTypes.assertionWarning')}
            </p>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
