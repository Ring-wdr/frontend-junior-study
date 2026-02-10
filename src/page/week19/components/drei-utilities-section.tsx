import { useTranslation } from 'react-i18next';
import { Camera, Sun, Grid3x3, Type, Package } from 'lucide-react';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const DreiUtilitiesSection = () => {
  const { t } = useTranslation('week19');

  const cameraControlsCode = `import {
  OrbitControls,
  PerspectiveCamera,
  CameraShake,
} from "@react-three/drei";

function CameraSetup() {
  return (
    <>
      {/* 궤도 카메라 컨트롤 */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={20}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />

      {/* 카메라 흔들림 효과 */}
      <CameraShake
        intensity={0.5}
        decay
        decayRate={0.65}
      />
    </>
  );
}`;

  const environmentCode = `import { Environment, Sky, Stars } from "@react-three/drei";

function EnvironmentSetup() {
  return (
    <>
      {/* HDRI 환경 맵 */}
      <Environment
        preset="sunset" // city, sunset, dawn, night, warehouse, forest, apartment, studio, park, lobby
        background
      />

      {/* 또는 커스텀 HDRI */}
      <Environment files="/hdri/studio.hdr" />

      {/* 하늘 */}
      <Sky sunPosition={[100, 20, 100]} />

      {/* 별 */}
      <Stars radius={100} depth={50} count={5000} factor={4} />
    </>
  );
}`;

  const helpersCode = `import {
  Grid,
  GizmoHelper,
  GizmoViewport,
  Stats,
} from "@react-three/drei";

function DebugHelpers() {
  return (
    <>
      {/* 그리드 */}
      <Grid
        args={[10, 10]}
        cellSize={0.5}
        cellColor="gray"
        sectionSize={2}
        sectionColor="white"
        fadeDistance={25}
        infiniteGrid
      />

      {/* 축 표시 */}
      <axesHelper args={[5]} />

      {/* 뷰포트 기즈모 */}
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport />
      </GizmoHelper>

      {/* FPS 카운터 */}
      <Stats />
    </>
  );
}`;

  const textCode = `import { Text, Text3D, Html, Billboard } from "@react-three/drei";

function TextElements() {
  return (
    <>
      {/* 2D 텍스트 (빌보드) */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Hello R3F!
      </Text>

      {/* 3D 텍스트 */}
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.2}
      >
        3D Text
        <meshStandardMaterial color="gold" />
      </Text3D>

      {/* HTML 오버레이 */}
      <mesh position={[2, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial />
        <Html distanceFactor={10} position={[0, 1, 0]}>
          <div className="annotation">제품 정보</div>
        </Html>
      </mesh>
    </>
  );
}`;

  const modelCode = `import { useGLTF, Clone } from "@react-three/drei";

// GLTF 모델
function Robot() {
  const { scene, nodes, materials } = useGLTF("/models/robot.glb");

  return <primitive object={scene} scale={0.5} />;
}

// 모델 프리로드 (성능 최적화)
useGLTF.preload("/models/robot.glb");

// 모델 복제
function MultipleRobots() {
  const { scene } = useGLTF("/models/robot.glb");

  return (
    <>
      <Clone object={scene} position={[-2, 0, 0]} />
      <Clone object={scene} position={[0, 0, 0]} />
      <Clone object={scene} position={[2, 0, 0]} />
    </>
  );
}`;

  const categories = t('dreiUtilities.categories', { returnObjects: true }) as any[];

  return (
    <SectionCard
      badge={{ label: t('dreiUtilities.badge'), color: 'purple' }}
      title={t('dreiUtilities.title')}
      description={t('dreiUtilities.description')}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categories.map((cat: any, idx: number) => {
            const icons = [Camera, Sun, Grid3x3, Type, Package];
            const IconComponent = icons[idx] || Package;
            return (
              <div key={cat.name} className="bg-indigo-50 p-3 rounded-lg text-center border border-indigo-200">
                <IconComponent className="w-5 h-5 mx-auto text-indigo-600 mb-1" />
                <span className="text-xs font-bold block">{cat.name}</span>
                <span className="text-xs text-gray-600">{cat.desc}</span>
              </div>
            );
          })}
        </div>

        <SubSection title={t('dreiUtilities.cameraTitle')} icon iconColor="purple">
          <CodeBlock
            code={cameraControlsCode}
            language="tsx"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('dreiUtilities.environmentTitle')} icon iconColor="blue">
          <CodeBlock
            code={environmentCode}
            language="tsx"
            className="text-xs"
          />
          <InfoBox variant="blue" title={t('dreiUtilities.presetNote')}>
            <p className="text-sm">{t('dreiUtilities.presetList')}</p>
          </InfoBox>
        </SubSection>

        <SubSection title={t('dreiUtilities.helpersTitle')} icon iconColor="green">
          <CodeBlock
            code={helpersCode}
            language="tsx"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('dreiUtilities.textTitle')} icon iconColor="purple">
          <CodeBlock
            code={textCode}
            language="tsx"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('dreiUtilities.modelTitle')} icon iconColor="orange">
          <CodeBlock
            code={modelCode}
            language="tsx"
            className="text-xs"
          />
        </SubSection>

        <InfoBox variant="purple" title={t('dreiUtilities.tipTitle')}>
          <p className="text-sm">{t('dreiUtilities.tipDesc')}</p>
        </InfoBox>
      </div>
    </SectionCard>
  );
};
