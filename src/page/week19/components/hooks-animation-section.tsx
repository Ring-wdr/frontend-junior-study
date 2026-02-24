import { Download, Eye, RefreshCw, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const HooksAnimationSection = () => {
  const { t } = useTranslation('week19');

  const useFrameCode = `import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

function AnimatedBox() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // delta: 이전 프레임과의 시간 차이 (초)
    meshRef.current.rotation.y += delta;

    // state: R3F 상태 객체
    // state.clock - Three.js Clock
    // state.camera - 현재 카메라
    // state.gl - WebGL 렌더러
    // state.scene - Three.js Scene
    // state.mouse - 정규화된 마우스 좌표 (-1 ~ 1)

    // 시간 기반 애니메이션
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}`;

  const useThreeCode = `import { useThree } from "@react-three/fiber";

function CameraInfo() {
  const { camera, gl, scene, size, viewport } = useThree();

  console.log("Canvas 크기:", size.width, size.height);
  console.log("Viewport:", viewport.width, viewport.height);
  console.log("카메라 위치:", camera.position);

  return null;
}

// 특정 값만 구독 (성능 최적화)
function OptimizedComponent() {
  const camera = useThree((state) => state.camera);

  // camera가 변경될 때만 리렌더링
  return null;
}`;

  const useLoaderCode = `import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";

// 텍스처 로딩
function TexturedBox() {
  const texture = useLoader(TextureLoader, "/textures/wood.jpg");

  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// GLTF 모델 로딩
function Model() {
  const gltf = useLoader(GLTFLoader, "/models/robot.glb");

  return <primitive object={gltf.scene} />;
}

// Suspense와 함께 사용
function Scene() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Model />
    </Suspense>
  );
}`;

  const customHookCode = `import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MathUtils } from "three";

// 부드러운 값 변화
function useSmoothValue(target: number, smoothness = 0.1) {
  const current = useRef(target);

  useFrame(() => {
    current.current = MathUtils.lerp(current.current, target, smoothness);
  });

  return current;
}

// 사용 예시
function SmoothBox() {
  const [hovered, setHovered] = useState(false);
  const scale = useSmoothValue(hovered ? 1.5 : 1, 0.1);

  return (
    <mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={scale.current}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? "hotpink" : "royalblue"} />
    </mesh>
  );
}`;

  const hooks = t('hooksAnimation.hooks', { returnObjects: true }) as any[];

  return (
    <SectionCard
      badge={{ label: t('hooksAnimation.badge'), color: 'orange' }}
      title={t('hooksAnimation.title')}
      description={t('hooksAnimation.description')}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {hooks.map((hook: any, idx: number) => {
            const icons = [RefreshCw, Eye, Download];
            const colors = ['orange', 'blue', 'green'];
            const IconComponent = icons[idx] || RefreshCw;
            const color = colors[idx] || 'orange';
            return (
              <div
                key={hook.name}
                className={`bg-${color}-50 p-4 rounded-lg border border-${color}-200`}
                style={{
                  backgroundColor:
                    idx === 0 ? '#fff7ed' : idx === 1 ? '#eff6ff' : '#f0fdf4',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <IconComponent
                    className={`w-5 h-5 text-${color}-600`}
                    style={{
                      color:
                        idx === 0
                          ? '#ea580c'
                          : idx === 1
                            ? '#2563eb'
                            : '#16a34a',
                    }}
                  />
                  <h4 className="font-bold text-sm">{hook.name}</h4>
                </div>
                <p className="text-xs text-gray-600">{hook.desc}</p>
              </div>
            );
          })}
        </div>

        <SubSection title="useFrame" icon iconColor="orange">
          <p className="text-sm text-gray-700 mb-3">
            {t('hooksAnimation.useFrameDesc')}
          </p>
          <CodeBlock code={useFrameCode} language="tsx" className="text-xs" />
        </SubSection>

        <SubSection title="useThree" icon iconColor="blue">
          <p className="text-sm text-gray-700 mb-3">
            {t('hooksAnimation.useThreeDesc')}
          </p>
          <CodeBlock code={useThreeCode} language="tsx" className="text-xs" />
        </SubSection>

        <SubSection title="useLoader" icon iconColor="green">
          <p className="text-sm text-gray-700 mb-3">
            {t('hooksAnimation.useLoaderDesc')}
          </p>
          <CodeBlock code={useLoaderCode} language="tsx" className="text-xs" />
        </SubSection>

        <SubSection
          title={t('hooksAnimation.customHookTitle')}
          icon
          iconColor="purple"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-700">
              {t('hooksAnimation.customHookDesc')}
            </span>
          </div>
          <CodeBlock code={customHookCode} language="tsx" className="text-xs" />
        </SubSection>

        <InfoBox variant="blue" title={t('hooksAnimation.tipTitle')}>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{t('hooksAnimation.tips.0')}</li>
            <li>{t('hooksAnimation.tips.1')}</li>
            <li>{t('hooksAnimation.tips.2')}</li>
          </ul>
        </InfoBox>
      </div>
    </SectionCard>
  );
};
