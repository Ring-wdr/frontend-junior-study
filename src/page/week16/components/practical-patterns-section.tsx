import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { DiscriminatedUnionVisualizer } from './discriminated-union-visualizer';

export const PracticalPatternsSection = () => {
  const { t } = useTranslation('week16');

  return (
    <SectionCard
      badge={{ label: t('practicalPatterns.badge'), color: 'pink' }}
      title={t('practicalPatterns.title')}
      description={t('practicalPatterns.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('practicalPatterns.typeGuardTitle')} icon iconColor="pink">
          <p className="text-sm text-gray-600 mb-4">{t('practicalPatterns.typeGuardDesc')}</p>
          <CodeBlock
            code={`// typeof 가드
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + value;
  }
  return padding + value;
}

// instanceof 가드
class Dog { bark() { console.log("Woof!"); } }
class Cat { meow() { console.log("Meow!"); } }

function speak(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}`}
            language="typescript"
            className="text-xs"
          />

          <InfoBox variant="purple" title={t('practicalPatterns.typeGuardInfoTitle')} className="mt-4">
            <p className="text-sm leading-relaxed">
              {t('practicalPatterns.typeGuardInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`// 사용자 정의 타입 가드 (is 키워드)
interface Fish { swim: () => void; }
interface Bird { fly: () => void; }

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // Fish로 타입 좁혀짐
  } else {
    pet.fly(); // Bird로 타입 좁혀짐
  }
}`}
            language="typescript"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection title={t('practicalPatterns.discriminatedTitle')} icon iconColor="purple">
          <p className="text-sm text-gray-600 mb-4">{t('practicalPatterns.discriminatedDesc')}</p>

          <DemoBox label={t('practicalPatterns.visualizer.title')}>
            <DiscriminatedUnionVisualizer />
          </DemoBox>

          <CodeBlock
            code={`// 판별 속성: type
interface Circle {
  type: "circle";
  radius: number;
}

interface Rectangle {
  type: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Rectangle;

function getArea(shape: Shape): number {
  switch (shape.type) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}`}
            language="typescript"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection title={t('practicalPatterns.exhaustiveTitle')} icon iconColor="orange">
          <p className="text-sm text-gray-600 mb-4">{t('practicalPatterns.exhaustiveDesc')}</p>

          <InfoBox variant="orange" title={t('practicalPatterns.exhaustiveInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('practicalPatterns.exhaustiveInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`// 철저한 검사 (Exhaustive Check)
function assertNever(x: never): never {
  throw new Error(\`Unexpected value: \${x}\`);
}

function getAreaExhaustive(shape: Shape): number {
  switch (shape.type) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default:
      // 새로운 Shape 추가 시 컴파일 에러 발생!
      return assertNever(shape);
  }
}`}
            language="typescript"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection title={t('practicalPatterns.brandingTitle')} icon iconColor="blue">
          <p className="text-sm text-gray-600 mb-4">{t('practicalPatterns.brandingDesc')}</p>

          <InfoBox variant="blue" title={t('practicalPatterns.brandingInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('practicalPatterns.brandingInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`// 문제: userId와 postId가 둘 다 string
function getPost(userId: string, postId: string) { /* ... */ }
getPost("post123", "user456"); // 순서 바뀌어도 에러 없음!

// 해결: 브랜드 타입
type UserId = string & { readonly brand: unique symbol };
type PostId = string & { readonly brand: unique symbol };

function createUserId(id: string): UserId {
  return id as UserId;
}

function createPostId(id: string): PostId {
  return id as PostId;
}

function getPostSafe(userId: UserId, postId: PostId) { /* ... */ }

const userId = createUserId("user456");
const postId = createPostId("post123");

getPostSafe(userId, postId); // OK
getPostSafe(postId, userId); // Error! 순서가 바뀌면 컴파일 에러`}
            language="typescript"
            className="mt-4 text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
