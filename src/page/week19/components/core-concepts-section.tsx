import { Box, Lightbulb, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const CoreConceptsSection = () => {
  const { t } = useTranslation('week19');

  const canvasCode = `import { Canvas } from "@react-three/fiber";

<Canvas
  // 카메라 설정
  camera={{
    position: [0, 0, 5],
    fov: 75,
    near: 0.1,
    far: 1000,
  }}
  // 렌더러 설정
  gl={{
    antialias: true,
    alpha: true, // 투명 배경
    powerPreference: "high-performance",
  }}
  // 그림자 활성화
  shadows
  // DPR (Device Pixel Ratio)
  dpr={[1, 2]}
  // 프레임 루프 모드
  frameloop="demand" // "always" | "demand" | "never"
>
  {/* 3D 씬 내용 */}
</Canvas>`;

  const geometryCode = `// 기본 도형들
function Geometries() {
  return (
    <>
      {/* 박스 */}
      <mesh position={[-3, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* 구 */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* 원기둥 */}
      <mesh position={[3, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* 토러스 (도넛) */}
      <mesh position={[0, 2, 0]}>
        <torusGeometry args={[0.5, 0.2, 16, 100]} />
        <meshStandardMaterial color="purple" metalness={0.8} roughness={0.2} />
      </mesh>
    </>
  );
}`;

  const lightingCode = `function Lighting() {
  return (
    <>
      {/* 환경광 - 모든 방향에서 균일하게 */}
      <ambientLight intensity={0.3} />

      {/* 방향광 - 태양처럼 평행광 */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* 점광원 - 전구처럼 한 점에서 방사 */}
      <pointLight position={[0, 5, 0]} intensity={1} color="yellow" />

      {/* 스포트라이트 - 원뿔 형태 */}
      <spotLight
        position={[5, 5, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={1}
        castShadow
      />
    </>
  );
}`;

  const shadowCode = `function ShadowScene() {
  return (
    <Canvas shadows>
      {/* 그림자를 드리우는 광원 */}
      <directionalLight
        position={[5, 5, 5]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
      />

      {/* 그림자를 드리우는 오브젝트 */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>

      {/* 그림자를 받는 바닥 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
  );
}`;

  const lightTypes = t('coreConcepts.lightTypes', {
    returnObjects: true,
  }) as any[];

  return (
    <SectionCard
      badge={{ label: t('coreConcepts.badge'), color: 'purple' }}
      title={t('coreConcepts.title')}
      description={t('coreConcepts.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('coreConcepts.canvasTitle')}
          icon
          iconColor="purple"
        >
          <p className="text-sm text-gray-700 mb-3">
            {t('coreConcepts.canvasDesc')}
          </p>
          <CodeBlock code={canvasCode} language="tsx" className="text-xs" />
        </SubSection>

        <SubSection
          title={t('coreConcepts.geometryTitle')}
          icon
          iconColor="blue"
        >
          <p className="text-sm text-gray-700 mb-3">
            {t('coreConcepts.geometryDesc')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="bg-red-50 p-3 rounded-lg text-center border border-red-200">
              <Box className="w-8 h-8 mx-auto text-red-500 mb-1" />
              <span className="text-xs font-medium">boxGeometry</span>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center border border-green-200">
              <div className="w-8 h-8 mx-auto bg-green-500 rounded-full mb-1" />
              <span className="text-xs font-medium">sphereGeometry</span>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-200">
              <div className="w-6 h-8 mx-auto bg-blue-500 rounded mb-1" />
              <span className="text-xs font-medium">cylinderGeometry</span>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center border border-purple-200">
              <div className="w-8 h-8 mx-auto border-4 border-purple-500 rounded-full mb-1" />
              <span className="text-xs font-medium">torusGeometry</span>
            </div>
          </div>
          <CodeBlock code={geometryCode} language="tsx" className="text-xs" />
        </SubSection>

        <SubSection
          title={t('coreConcepts.lightingTitle')}
          icon
          iconColor="orange"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {lightTypes.map((light: any, idx: number) => (
              <div
                key={idx}
                className="bg-orange-50 p-3 rounded-lg text-center border border-orange-200"
              >
                {light.icon === 'sun' && (
                  <Sun className="w-6 h-6 mx-auto text-orange-500 mb-1" />
                )}
                {light.icon === 'lightbulb' && (
                  <Lightbulb className="w-6 h-6 mx-auto text-yellow-500 mb-1" />
                )}
                {light.icon === 'spotlight' && (
                  <Moon className="w-6 h-6 mx-auto text-orange-400 mb-1" />
                )}
                {light.icon === 'ambient' && (
                  <div className="w-6 h-6 mx-auto bg-gradient-to-r from-gray-300 to-gray-400 rounded-full mb-1" />
                )}
                <span className="text-xs font-bold block">{light.name}</span>
                <span className="text-xs text-gray-600">{light.desc}</span>
              </div>
            ))}
          </div>
          <CodeBlock code={lightingCode} language="tsx" className="text-xs" />
        </SubSection>

        <SubSection
          title={t('coreConcepts.shadowTitle')}
          icon
          iconColor="green"
        >
          <InfoBox variant="orange" title={t('coreConcepts.shadowNote')}>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <code className="bg-orange-100 px-1 rounded">shadows</code>{' '}
                {t('coreConcepts.shadowTip1')}
              </li>
              <li>
                <code className="bg-orange-100 px-1 rounded">castShadow</code>{' '}
                {t('coreConcepts.shadowTip2')}
              </li>
              <li>
                <code className="bg-orange-100 px-1 rounded">
                  receiveShadow
                </code>{' '}
                {t('coreConcepts.shadowTip3')}
              </li>
            </ul>
          </InfoBox>
          <CodeBlock code={shadowCode} language="tsx" className="text-xs" />
        </SubSection>
      </div>
    </SectionCard>
  );
};
