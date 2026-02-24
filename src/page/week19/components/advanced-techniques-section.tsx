import { Atom, Code, Glasses, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const AdvancedTechniquesSection = () => {
  const { t } = useTranslation('week19');

  const postProcessingCode = `import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  DepthOfField,
  SMAA,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

function PostEffects() {
  return (
    <EffectComposer>
      {/* 블룸 효과 (빛 번짐) */}
      <Bloom
        luminanceThreshold={0.9}
        luminanceSmoothing={0.025}
        intensity={0.5}
      />

      {/* 색수차 */}
      <ChromaticAberration
        offset={[0.002, 0.002]}
        blendFunction={BlendFunction.NORMAL}
      />

      {/* 비네트 (가장자리 어두움) */}
      <Vignette eskil={false} offset={0.1} darkness={0.5} />

      {/* 피사계 심도 */}
      <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={2}
      />

      {/* 안티앨리어싱 */}
      <SMAA />
    </EffectComposer>
  );
}`;

  const shaderCode = `import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

// 커스텀 셰이더 머티리얼 정의
const WaveMaterial = shaderMaterial(
  // Uniforms
  { uTime: 0, uColor: [1.0, 0.0, 0.0] },
  // Vertex Shader
  \`
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(pos.x * 5.0 + uTime) * 0.1;
      pos.z += cos(pos.y * 5.0 + uTime) * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  \`,
  // Fragment Shader
  \`
    uniform vec3 uColor;
    varying vec2 vUv;

    void main() {
      gl_FragColor = vec4(uColor * vUv.x, 1.0);
    }
  \`
);

extend({ WaveMaterial });

function WavePlane() {
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry args={[5, 5, 32, 32]} />
      <waveMaterial ref={materialRef} uColor={[0.2, 0.5, 1.0]} />
    </mesh>
  );
}`;

  const physicsCode = `import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

function PhysicsScene() {
  return (
    <Physics gravity={[0, -9.81, 0]} debug>
      {/* 동적 물체 */}
      <RigidBody position={[0, 5, 0]} restitution={0.5}>
        <mesh>
          <sphereGeometry args={[0.5]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>

      {/* 여러 개의 박스 */}
      {Array.from({ length: 10 }).map((_, i) => (
        <RigidBody
          key={i}
          position={[Math.random() * 4 - 2, 10 + i * 2, Math.random() * 4 - 2]}
        >
          <mesh>
            <boxGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
      ))}

      {/* 정적 바닥 */}
      <RigidBody type="fixed">
        <CuboidCollider args={[10, 0.5, 10]} />
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[20, 1, 20]} />
          <meshStandardMaterial color="lightgray" />
        </mesh>
      </RigidBody>
    </Physics>
  );
}`;

  const xrCode = `import { XR, Controllers, Hands, VRButton } from "@react-three/xr";

function VRScene() {
  return (
    <>
      <VRButton />
      <Canvas>
        <XR>
          <Controllers />
          <Hands />

          {/* VR 환경 */}
          <Environment preset="sunset" background />

          {/* VR에서 상호작용 가능한 오브젝트 */}
          <Interactive onSelect={() => console.log("선택됨!")}>
            <mesh position={[0, 1, -2]}>
              <boxGeometry />
              <meshStandardMaterial color="blue" />
            </mesh>
          </Interactive>
        </XR>
      </Canvas>
    </>
  );
}`;

  const techniques = t('advancedTechniques.techniques', {
    returnObjects: true,
  }) as any[];
  const effects = t('advancedTechniques.effects', {
    returnObjects: true,
  }) as string[];

  return (
    <SectionCard
      badge={{ label: t('advancedTechniques.badge'), color: 'purple' }}
      title={t('advancedTechniques.title')}
      description={t('advancedTechniques.description')}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {techniques.map((tech: any, idx: number) => {
            const icons = [Sparkles, Code, Atom, Glasses];
            const IconComponent = icons[idx] || Sparkles;
            return (
              <div
                key={tech.name}
                className="bg-purple-50 p-3 rounded-lg text-center border border-purple-200"
              >
                <IconComponent className="w-5 h-5 mx-auto text-purple-600 mb-1" />
                <span className="text-xs font-bold block text-purple-800">
                  {tech.name}
                </span>
                <span className="text-xs text-gray-600">{tech.desc}</span>
              </div>
            );
          })}
        </div>

        <SubSection
          title={t('advancedTechniques.postTitle')}
          icon
          iconColor="purple"
        >
          <p className="text-sm text-gray-700 mb-3">
            {t('advancedTechniques.postDesc')}
          </p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
            {effects.map((effect: string, idx: number) => (
              <div
                key={idx}
                className="bg-purple-100 px-2 py-1 rounded text-center"
              >
                <span className="text-xs font-medium text-purple-800">
                  {effect}
                </span>
              </div>
            ))}
          </div>
          <CodeBlock
            code={postProcessingCode}
            language="tsx"
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('advancedTechniques.shaderTitle')}
          icon
          iconColor="pink"
        >
          <p className="text-sm text-gray-700 mb-3">
            {t('advancedTechniques.shaderDesc')}
          </p>
          <CodeBlock code={shaderCode} language="tsx" className="text-xs" />
          <InfoBox variant="purple" title={t('advancedTechniques.shaderNote')}>
            <p className="text-sm">{t('advancedTechniques.shaderNoteDesc')}</p>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('advancedTechniques.physicsTitle')}
          icon
          iconColor="orange"
        >
          <p className="text-sm text-gray-700 mb-3">
            {t('advancedTechniques.physicsDesc')}
          </p>
          <CodeBlock code={physicsCode} language="tsx" className="text-xs" />
        </SubSection>

        <SubSection
          title={t('advancedTechniques.xrTitle')}
          icon
          iconColor="blue"
        >
          <p className="text-sm text-gray-700 mb-3">
            {t('advancedTechniques.xrDesc')}
          </p>
          <CodeBlock code={xrCode} language="tsx" className="text-xs" />
        </SubSection>

        <InfoBox variant="blue" title={t('advancedTechniques.resourceTitle')}>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>
              <a
                href="https://docs.pmnd.rs/react-three-fiber"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                React Three Fiber Docs
              </a>
            </li>
            <li>
              <a
                href="https://github.com/pmndrs/drei"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Drei Components
              </a>
            </li>
            <li>
              <a
                href="https://thebookofshaders.com/"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Book of Shaders
              </a>
            </li>
            <li>
              <a
                href="https://github.com/pmndrs/react-three-rapier"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                React Three Rapier
              </a>
            </li>
          </ul>
        </InfoBox>
      </div>
    </SectionCard>
  );
};
