import { MousePointer, Move, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const InteractionSection = () => {
  const { t } = useTranslation('week19');

  const pointerEventsCode = `import { useState } from "react";

function InteractiveBox() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <mesh
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        setClicked(!clicked);
      }}
      onDoubleClick={(e) => console.log("더블 클릭!")}
      onPointerDown={(e) => console.log("포인터 다운")}
      onPointerUp={(e) => console.log("포인터 업")}
      onPointerMove={(e) => {
        // e.point - 3D 월드 좌표
        // e.uv - UV 좌표
        // e.face - 충돌한 면
        // e.distance - 카메라와의 거리
      }}
      scale={clicked ? 1.5 : 1}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? "hotpink" : "royalblue"} />
    </mesh>
  );
}`;

  const dragDropCode = `import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/three";

function DraggableBox() {
  const [spring, api] = useSpring(() => ({
    position: [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 },
  }));

  const bind = useDrag(({ offset: [x, y] }) => {
    api.start({ position: [x / 100, -y / 100, 0] });
  });

  return (
    <animated.mesh {...spring} {...bind()}>
      <boxGeometry />
      <meshStandardMaterial color="coral" />
    </animated.mesh>
  );
}`;

  const raycastCode = `import { useThree } from "@react-three/fiber";
import { Raycaster, Vector2 } from "three";
import { useEffect } from "react";

function RaycastExample() {
  const { camera, scene, gl } = useThree();
  const raycaster = new Raycaster();
  const mouse = new Vector2();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // 마우스 좌표를 정규화 (-1 ~ 1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // 레이캐스트 수행
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const hit = intersects[0];
        console.log("충돌 오브젝트:", hit.object);
        console.log("충돌 지점:", hit.point);
        console.log("거리:", hit.distance);
      }
    };

    gl.domElement.addEventListener("click", handleClick);
    return () => gl.domElement.removeEventListener("click", handleClick);
  }, [camera, scene, gl]);

  return null;
}`;

  const events = t('interaction.events', { returnObjects: true }) as any[];

  return (
    <SectionCard
      badge={{ label: t('interaction.badge'), color: 'green' }}
      title={t('interaction.title')}
      description={t('interaction.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('interaction.pointerTitle')}
          icon
          iconColor="green"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {events.map((event: any) => (
              <div
                key={event.name}
                className="bg-green-50 p-3 rounded-lg border border-green-200"
              >
                <MousePointer className="w-4 h-4 text-green-600 mb-1" />
                <span className="text-xs font-bold block text-green-800">
                  {event.name}
                </span>
                <span className="text-xs text-gray-600">{event.desc}</span>
              </div>
            ))}
          </div>
          <CodeBlock
            code={pointerEventsCode}
            language="tsx"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('interaction.dragTitle')} icon iconColor="blue">
          <div className="flex items-center gap-2 mb-3">
            <Move className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-700">
              {t('interaction.dragDesc')}
            </span>
          </div>
          <CodeBlock code={dragDropCode} language="tsx" className="text-xs" />
          <InfoBox variant="blue" title={t('interaction.libraryNote')}>
            <p className="text-sm">{t('interaction.libraryNoteDesc')}</p>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('interaction.raycastTitle')}
          icon
          iconColor="purple"
        >
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-700">
              {t('interaction.raycastDesc')}
            </span>
          </div>
          <CodeBlock code={raycastCode} language="tsx" className="text-xs" />
        </SubSection>

        <InfoBox variant="orange" title={t('interaction.tipTitle')}>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>
              <code className="bg-orange-100 px-1 rounded">
                e.stopPropagation()
              </code>{' '}
              {t('interaction.tips.0')}
            </li>
            <li>{t('interaction.tips.1')}</li>
            <li>{t('interaction.tips.2')}</li>
          </ul>
        </InfoBox>
      </div>
    </SectionCard>
  );
};
