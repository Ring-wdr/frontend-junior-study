import { Activity, Check, Layers, MemoryStick, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const PerformanceSection = () => {
  const { t } = useTranslation('week19');

  const instancedMeshCode = `import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { InstancedMesh, Object3D } from "three";

// 인스턴싱 - 동일 오브젝트 대량 렌더링
function Particles({ count = 1000 }) {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  // 초기 위치 설정
  useMemo(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      dummy.position.set(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial color="white" />
    </instancedMesh>
  );
}`;

  const frameControlCode = `// Canvas에서 프레임 제어
<Canvas frameloop="demand">
  {/* invalidate()를 통해 수동으로 렌더링 요청 */}
</Canvas>

// 컴포넌트에서 프레임 제어
function ControlledAnimation() {
  const { invalidate } = useThree();

  useFrame((state, delta) => {
    // 필요할 때만 렌더링 요청
    if (needsUpdate) {
      invalidate();
    }
  }, 1); // 우선순위 설정 (숫자가 낮을수록 먼저 실행)

  return null;
}`;

  const memoryCode = `import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

function MemoryCleanup() {
  const { gl, scene } = useThree();

  useEffect(() => {
    return () => {
      // 씬 정리
      scene.traverse((object) => {
        if ("geometry" in object) {
          (object as any).geometry?.dispose();
        }
        if ("material" in object) {
          const material = (object as any).material;
          if (Array.isArray(material)) {
            material.forEach((m) => m.dispose());
          } else {
            material?.dispose();
          }
        }
      });

      // 렌더러 정리
      gl.dispose();
    };
  }, [gl, scene]);

  return null;
}`;

  const monitoringCode = `import { Perf } from "r3f-perf";
import { Stats } from "@react-three/drei";

function PerformanceMonitor() {
  return (
    <>
      {/* 상세 성능 정보 */}
      <Perf
        position="top-left"
        showGraph
        minimal={false}
        matrixUpdate={true}
        deepAnalyze={true}
      />

      {/* 간단한 FPS 표시 */}
      <Stats showPanel={0} className="stats" />
    </>
  );
}`;

  const checklist = t('performance.checklist', {
    returnObjects: true,
  }) as string[];
  const techniques = t('performance.techniques', {
    returnObjects: true,
  }) as any[];

  return (
    <SectionCard
      badge={{ label: t('performance.badge'), color: 'teal' }}
      title={t('performance.title')}
      description={t('performance.description')}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {techniques.map((tech: any, idx: number) => {
            const icons = [Layers, Zap, MemoryStick, Activity];
            const IconComponent = icons[idx] || Zap;
            return (
              <div
                key={tech.name}
                className="bg-teal-50 p-3 rounded-lg text-center border border-teal-200"
              >
                <IconComponent className="w-5 h-5 mx-auto text-teal-600 mb-1" />
                <span className="text-xs font-bold block text-teal-800">
                  {tech.name}
                </span>
                <span className="text-xs text-gray-600">{tech.desc}</span>
              </div>
            );
          })}
        </div>

        <SubSection
          title={t('performance.instanceTitle')}
          icon
          iconColor="blue"
        >
          <p className="text-sm text-gray-700 mb-3">
            {t('performance.instanceDesc')}
          </p>
          <CodeBlock
            code={instancedMeshCode}
            language="tsx"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('performance.frameTitle')} icon iconColor="green">
          <p className="text-sm text-gray-700 mb-3">
            {t('performance.frameDesc')}
          </p>
          <CodeBlock
            code={frameControlCode}
            language="tsx"
            className="text-xs"
          />
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-xs font-bold block">always</span>
              <span className="text-xs text-gray-600">
                {t('performance.frameAlways')}
              </span>
            </div>
            <div className="bg-green-100 p-2 rounded">
              <span className="text-xs font-bold block">demand</span>
              <span className="text-xs text-gray-600">
                {t('performance.frameDemand')}
              </span>
            </div>
            <div className="bg-orange-100 p-2 rounded">
              <span className="text-xs font-bold block">never</span>
              <span className="text-xs text-gray-600">
                {t('performance.frameNever')}
              </span>
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('performance.memoryTitle')}
          icon
          iconColor="orange"
        >
          <p className="text-sm text-gray-700 mb-3">
            {t('performance.memoryDesc')}
          </p>
          <CodeBlock code={memoryCode} language="tsx" className="text-xs" />
        </SubSection>

        <SubSection
          title={t('performance.monitorTitle')}
          icon
          iconColor="purple"
        >
          <CodeBlock code={monitoringCode} language="tsx" className="text-xs" />
        </SubSection>

        <InfoBox variant="green" title={t('performance.checklistTitle')}>
          <ul className="space-y-2">
            {checklist.map((item: string, idx: number) => (
              <li key={idx} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </InfoBox>
      </div>
    </SectionCard>
  );
};
