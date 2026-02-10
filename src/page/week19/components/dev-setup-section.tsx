import { useTranslation } from 'react-i18next';
import { Terminal, FolderTree, Play } from 'lucide-react';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const DevSetupSection = () => {
  const { t } = useTranslation('week19');

  const installCode = `# Vite + React + TypeScript
npm create vite@latest my-r3f-project -- --template react-ts
cd my-r3f-project

# 핵심 의존성 설치
npm install three @react-three/fiber

# 유틸리티 라이브러리 (권장)
npm install @react-three/drei

# TypeScript 타입
npm install -D @types/three`;

  const structureCode = `src/
├── components/
│   └── Scene/
│       ├── index.tsx
│       ├── Lighting.tsx
│       ├── Camera.tsx
│       └── Models/
│           └── Box.tsx
├── hooks/
│   └── useAnimation.ts
├── App.tsx
└── main.tsx`;

  const firstSceneCode = `// App.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  );
}

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        {/* 조명 */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* 3D 오브젝트 */}
        <Box />

        {/* 카메라 컨트롤 */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}`;

  return (
    <SectionCard
      badge={{ label: t('devSetup.badge'), color: 'blue' }}
      title={t('devSetup.title')}
      description={t('devSetup.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('devSetup.installTitle')} icon iconColor="blue">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">{t('devSetup.installSteps')}</span>
          </div>
          <CodeBlock
            code={installCode}
            language="bash"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('devSetup.structureTitle')} icon iconColor="purple">
          <div className="flex items-center gap-2 mb-3">
            <FolderTree className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">{t('devSetup.recommendedStructure')}</span>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <pre className="text-xs text-green-400 font-mono">{structureCode}</pre>
          </div>
        </SubSection>

        <SubSection title={t('devSetup.firstSceneTitle')} icon iconColor="green">
          <div className="flex items-center gap-2 mb-3">
            <Play className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">{t('devSetup.basicExample')}</span>
          </div>
          <CodeBlock
            code={firstSceneCode}
            language="tsx"
            className="text-xs"
          />
        </SubSection>

        <InfoBox variant="green" title={t('devSetup.tipTitle')}>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{t('devSetup.tips.0')}</li>
            <li>{t('devSetup.tips.1')}</li>
            <li>{t('devSetup.tips.2')}</li>
          </ul>
        </InfoBox>
      </div>
    </SectionCard>
  );
};
