import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { UtilityTypeTransformer } from './utility-type-transformer';

export const UtilityTypesSection = () => {
  const { t } = useTranslation('week16');

  return (
    <SectionCard
      badge={{ label: t('utilityTypes.badge'), color: 'green' }}
      title={t('utilityTypes.title')}
      description={t('utilityTypes.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('utilityTypes.visualizer.title')}
          icon
          iconColor="green"
        >
          <DemoBox label={t('utilityTypes.visualizer.title')}>
            <UtilityTypeTransformer />
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('utilityTypes.objectTitle')}
          icon
          iconColor="green"
        >
          <p className="text-sm text-gray-600 mb-4">
            {t('utilityTypes.objectDesc')}
          </p>
          <CodeBlock
            code={`interface User {
  id: number;
  name: string;
  email: string;
}

// Partial<T> - 모든 속성을 선택적으로
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }

// Required<T> - 모든 속성을 필수로
interface Config {
  theme?: string;
  language?: string;
}
type RequiredConfig = Required<Config>;
// { theme: string; language: string; }

// Readonly<T> - 모든 속성을 읽기 전용으로
type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; ... }`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('utilityTypes.pickOmitTitle')}
          icon
          iconColor="blue"
        >
          <p className="text-sm text-gray-600 mb-4">
            {t('utilityTypes.pickOmitDesc')}
          </p>
          <CodeBlock
            code={`interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Pick<T, K> - 특정 속성만 선택
type PublicUser = Pick<User, "id" | "name">;
// { id: number; name: string; }

// Omit<T, K> - 특정 속성 제외
type UserWithoutPassword = Omit<User, "password">;
// { id: number; name: string; email: string; }`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('utilityTypes.recordTitle')}
          icon
          iconColor="purple"
        >
          <p className="text-sm text-gray-600 mb-4">
            {t('utilityTypes.recordDesc')}
          </p>
          <CodeBlock
            code={`// Record<K, V> - 키-값 매핑
type Role = "admin" | "user" | "guest";
type Permissions = Record<Role, string[]>;

const permissions: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
};`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('utilityTypes.extractExcludeTitle')}
          icon
          iconColor="orange"
        >
          <p className="text-sm text-gray-600 mb-4">
            {t('utilityTypes.extractExcludeDesc')}
          </p>
          <CodeBlock
            code={`type AllTypes = string | number | boolean | null;

// Extract<T, U> - T에서 U에 할당 가능한 타입만 추출
type StringOrNumber = Extract<AllTypes, string | number>;
// string | number

// Exclude<T, U> - T에서 U에 할당 가능한 타입 제외
type NonNullTypes = Exclude<AllTypes, null>;
// string | number | boolean`}
            language="typescript"
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('utilityTypes.functionTitle')}
          icon
          iconColor="blue"
        >
          <p className="text-sm text-gray-600 mb-4">
            {t('utilityTypes.functionDesc')}
          </p>

          <InfoBox variant="blue" title={t('utilityTypes.functionInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('utilityTypes.functionInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`function createUser(name: string, age: number): User {
  return { id: 1, name, email: "", password: "" };
}

// ReturnType<T> - 함수의 반환 타입 추출
type CreateUserReturn = ReturnType<typeof createUser>;
// User

// Parameters<T> - 함수의 매개변수 타입을 튜플로 추출
type CreateUserParams = Parameters<typeof createUser>;
// [string, number]

// 실용 예: 함수 래퍼 만들기
function withLogging<T extends (...args: any[]) => any>(fn: T) {
  return (...args: Parameters<T>): ReturnType<T> => {
    console.log("Called with:", args);
    return fn(...args);
  };
}`}
            language="typescript"
            className="mt-4 text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
