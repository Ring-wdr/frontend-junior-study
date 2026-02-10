import { useTranslation } from 'react-i18next';
import { Box, Layers, RefreshCw, Palette } from 'lucide-react';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

const featureIconMap = {
  box: Box,
  layers: Layers,
  refresh: RefreshCw,
  palette: Palette,
};

export const R3fIntroSection = () => {
  const { t } = useTranslation('week19');
  const features = t('r3fIntro.features', { returnObjects: true }) as any[];
  const advantages = t('r3fIntro.advantages', { returnObjects: true }) as any[];

  const threeJsCode = `// Three.js - 명령형 방식
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: "orange" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  renderer.render(scene, camera);
}
animate();

// 정리 코드도 직접 작성해야 함
geometry.dispose();
material.dispose();`;

  const r3fCode = `// React Three Fiber - 선언적 방식
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function RotatingBox() {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function App() {
  return (
    <Canvas>
      <ambientLight />
      <RotatingBox />
    </Canvas>
  );
}
// 컴포넌트 언마운트 시 자동 정리!`;

  return (
    <SectionCard
      badge={{ label: t('r3fIntro.badge'), color: 'pink' }}
      title={t('r3fIntro.title')}
      description={t('r3fIntro.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('r3fIntro.featuresTitle')} icon iconColor="pink">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature: any) => {
              const IconComponent = featureIconMap[feature.icon as keyof typeof featureIconMap] || Box;
              return (
                <div
                  key={feature.title}
                  className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-100"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent className="w-5 h-5 text-pink-600" />
                    <h4 className="font-bold text-sm text-pink-800">{feature.title}</h4>
                  </div>
                  <p className="text-xs text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </SubSection>

        <SubSection title={t('r3fIntro.comparisonTitle')} icon iconColor="purple">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-sm text-gray-700 mb-2">Three.js ({t('r3fIntro.imperative')})</h4>
              <CodeBlock
                code={threeJsCode}
                language="javascript"
                className="text-xs"
              />
            </div>
            <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
              <h4 className="font-bold text-sm text-pink-700 mb-2">React Three Fiber ({t('r3fIntro.declarative')})</h4>
              <CodeBlock
                code={r3fCode}
                language="jsx"
                className="text-xs"
              />
            </div>
          </div>
        </SubSection>

        <SubSection title={t('r3fIntro.advantagesTitle')} icon iconColor="green">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2 font-semibold">{t('r3fIntro.table.feature')}</th>
                  <th className="text-left p-2 font-semibold">Three.js</th>
                  <th className="text-left p-2 font-semibold">React Three Fiber</th>
                </tr>
              </thead>
              <tbody>
                {advantages.map((adv: any, idx: number) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-2 font-medium">{adv.feature}</td>
                    <td className="p-2 text-gray-600">{adv.threejs}</td>
                    <td className="p-2 text-pink-700">{adv.r3f}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SubSection>

        <InfoBox variant="blue" title={t('r3fIntro.keyPoint')}>
          <p className="text-sm leading-relaxed">
            {t('r3fIntro.keyPointDesc')}
          </p>
        </InfoBox>
      </div>
    </SectionCard>
  );
};
