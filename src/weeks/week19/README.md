# Week 19: React Three Fiber와 3D 웹 개발

## 학습 목표

**React Three Fiber(R3F)**를 활용하여 React 생태계에서 3D 그래픽을 선언적으로 개발하는 방법을 학습합니다. Three.js의 강력한 기능을 React의 컴포넌트 패턴으로 조합하여, 인터랙티브 3D 경험, 제품 시각화, 데이터 시각화, 게임 등을 웹에서 구현하는 역량을 갖춥니다.

**대상**: React 기초를 아는 초심자 ~ 3D 웹 개발에 관심 있는 주니어 개발자

---

## 1. React Three Fiber란?

**핵심 개념**

- **선언적 3D 개발**: Three.js를 React 컴포넌트로 래핑하여 JSX 문법으로 3D 씬 구성
- **React 생태계 통합**: hooks, context, suspense 등 React 패턴 그대로 활용
- **자동 리소스 관리**: 컴포넌트 언마운트 시 자동으로 GPU 메모리 정리
- **성능 최적화 내장**: React의 재조정(reconciliation) 알고리즘으로 효율적 렌더링

**Three.js vs React Three Fiber**

```javascript
// Three.js - 명령형 방식
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
material.dispose();
```

```jsx
// React Three Fiber - 선언적 방식
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
// 컴포넌트 언마운트 시 자동 정리!
```

**R3F의 장점**

| 특징 | Three.js (순수) | React Three Fiber |
|------|-----------------|-------------------|
| 코드 스타일 | 명령형 | 선언적 |
| 리소스 관리 | 수동 dispose | 자동 정리 |
| 상태 관리 | 직접 구현 | React 상태/Context |
| 컴포넌트 재사용 | 어려움 | 자연스러움 |
| 생태계 | Three.js 플러그인 | React + Three.js + drei |
| 학습 곡선 | Three.js 전체 학습 | React 지식 활용 가능 |

**학습 자료**
- [React Three Fiber 공식 문서](https://docs.pmnd.rs/react-three-fiber)
- [Three.js 공식 문서](https://threejs.org/docs/)
- [Poimandres 파운데이션](https://pmnd.rs/)

---

## 2. 개발 환경 설정

### 프로젝트 생성

```bash
# Vite + React + TypeScript
npm create vite@latest my-r3f-project -- --template react-ts
cd my-r3f-project

# 핵심 의존성 설치
npm install three @react-three/fiber

# 유틸리티 라이브러리 (권장)
npm install @react-three/drei

# TypeScript 타입
npm install -D @types/three
```

### 기본 구조

```
src/
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
└── main.tsx
```

### 첫 번째 씬 만들기

```tsx
// App.tsx
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
}
```

**학습 자료**
- [R3F 시작하기](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [Drei 컴포넌트 목록](https://github.com/pmndrs/drei)

---

## 3. 핵심 개념

### Canvas 컴포넌트

```tsx
import { Canvas } from "@react-three/fiber";

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
  // 이벤트 설정
  events={undefined}
>
  {/* 3D 씬 내용 */}
</Canvas>
```

### Geometry와 Material

```tsx
// 기본 도형들
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
}
```

### 조명 시스템

```tsx
function Lighting() {
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

      {/* 반구광 - 하늘/땅 색상 */}
      <hemisphereLight
        skyColor="lightblue"
        groundColor="brown"
        intensity={0.5}
      />
    </>
  );
}
```

### 그림자 설정

```tsx
function ShadowScene() {
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
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
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
}
```

**학습 자료**
- [Three.js Geometry 문서](https://threejs.org/docs/#api/en/geometries/BoxGeometry)
- [Three.js Material 문서](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)

---

## 4. Hooks와 애니메이션

### useFrame - 렌더 루프

```tsx
import { useFrame } from "@react-three/fiber";
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
    // state.pointer - 정규화된 포인터 좌표

    // 시간 기반 애니메이션
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
```

### useThree - R3F 상태 접근

```tsx
import { useThree } from "@react-three/fiber";

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
}
```

### useLoader - 에셋 로딩

```tsx
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
}
```

### 커스텀 애니메이션 훅

```tsx
import { useFrame } from "@react-three/fiber";
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
}
```

**학습 자료**
- [R3F Hooks 문서](https://docs.pmnd.rs/react-three-fiber/api/hooks)
- [Three.js MathUtils](https://threejs.org/docs/#api/en/math/MathUtils)

---

## 5. @react-three/drei - 유틸리티 라이브러리

### 카메라 컨트롤

```tsx
import {
  OrbitControls,
  PerspectiveCamera,
  OrthographicCamera,
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
}
```

### 환경과 조명

```tsx
import { Environment, Sky, Stars, Lightformer } from "@react-three/drei";

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
}
```

### 헬퍼와 디버깅

```tsx
import {
  Grid,
  GizmoHelper,
  GizmoViewport,
  Stats,
  Perf,
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

      {/* 성능 모니터 */}
      <Perf position="top-left" />
    </>
  );
}
```

### 텍스트와 HTML

```tsx
import { Text, Text3D, Html, Billboard } from "@react-three/drei";

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
        curveSegments={12}
      >
        3D Text
        <meshStandardMaterial color="gold" />
      </Text3D>

      {/* HTML 오버레이 */}
      <mesh position={[2, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial />
        <Html distanceFactor={10} position={[0, 1, 0]}>
          <div className="annotation">
            제품 정보
          </div>
        </Html>
      </mesh>

      {/* 항상 카메라를 향하는 빌보드 */}
      <Billboard position={[-2, 1, 0]}>
        <Text fontSize={0.3}>Always Facing</Text>
      </Billboard>
    </>
  );
}
```

### 모델 로딩

```tsx
import { useGLTF, useFBX, Clone } from "@react-three/drei";

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
}
```

**학습 자료**
- [Drei GitHub Repository](https://github.com/pmndrs/drei)
- [Drei Storybook](https://drei.pmnd.rs/)

---

## 6. 인터랙션

### 포인터 이벤트

```tsx
import { useState } from "react";

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
}
```

### 드래그 & 드롭

```tsx
import { useDrag } from "@use-gesture/react";
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
}
```

### Raycasting (광선 투사)

```tsx
import { useThree } from "@react-three/fiber";
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
}
```

**학습 자료**
- [R3F 이벤트 시스템](https://docs.pmnd.rs/react-three-fiber/api/events)
- [use-gesture 라이브러리](https://use-gesture.netlify.app/)

---

## 7. 애니메이션 심화

### React Spring + Three

```tsx
import { useSpring, animated, config } from "@react-spring/three";
import { useState } from "react";

function SpringAnimatedBox() {
  const [active, setActive] = useState(false);

  const spring = useSpring({
    scale: active ? 1.5 : 1,
    rotation: active ? [0, Math.PI, 0] : [0, 0, 0],
    color: active ? "hotpink" : "royalblue",
    config: config.wobbly,
  });

  return (
    <animated.mesh
      scale={spring.scale}
      rotation={spring.rotation as any}
      onClick={() => setActive(!active)}
    >
      <boxGeometry />
      <animated.meshStandardMaterial color={spring.color} />
    </animated.mesh>
  );
}
```

### Framer Motion 3D

```tsx
import { motion } from "framer-motion-3d";
import { useState } from "react";

function FramerBox() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.mesh
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        rotateY: isHovered ? Math.PI : 0,
      }}
      transition={{ type: "spring", stiffness: 300 }}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color="mediumpurple" />
    </motion.mesh>
  );
}
```

### GSAP + R3F

```tsx
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { Mesh } from "three";

function GSAPAnimatedBox() {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    // GSAP 타임라인
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(meshRef.current.position, {
      y: 2,
      duration: 1,
      ease: "power2.out",
    })
      .to(meshRef.current.rotation, {
        y: Math.PI * 2,
        duration: 1,
        ease: "power2.inOut",
      })
      .to(meshRef.current.position, {
        y: 0,
        duration: 1,
        ease: "bounce.out",
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color="limegreen" />
    </mesh>
  );
}
```

### 스켈레탈 애니메이션

```tsx
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

function AnimatedCharacter() {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/character.glb");
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    // 첫 번째 애니메이션 재생
    actions[names[0]]?.play();
  }, [actions, names]);

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

// 애니메이션 전환
function CharacterWithControls() {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/character.glb");
  const { actions } = useAnimations(animations, group);

  const playAnimation = (name: string) => {
    // 모든 애니메이션 페이드 아웃
    Object.values(actions).forEach((action) => {
      action?.fadeOut(0.5);
    });

    // 선택한 애니메이션 페이드 인
    actions[name]?.reset().fadeIn(0.5).play();
  };

  return (
    <>
      <group ref={group}>
        <primitive object={scene} />
      </group>
      {/* UI에서 playAnimation 호출 */}
    </>
  );
}
```

**학습 자료**
- [React Spring Three](https://www.react-spring.dev/docs/components/animated)
- [Framer Motion 3D](https://www.framer.com/motion/three-introduction/)
- [GSAP](https://gsap.com/)

---

## 8. 성능 최적화

### 렌더링 최적화

```tsx
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { InstancedMesh, Object3D, Color } from "three";

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
}
```

### LOD (Level of Detail)

```tsx
import { LOD } from "three";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

function LODModel() {
  const lodRef = useRef<LOD>(null);

  const highDetail = useGLTF("/models/car-high.glb");
  const mediumDetail = useGLTF("/models/car-medium.glb");
  const lowDetail = useGLTF("/models/car-low.glb");

  useEffect(() => {
    if (!lodRef.current) return;

    lodRef.current.addLevel(highDetail.scene.clone(), 0);   // 거리 0부터
    lodRef.current.addLevel(mediumDetail.scene.clone(), 5); // 거리 5부터
    lodRef.current.addLevel(lowDetail.scene.clone(), 15);   // 거리 15부터
  }, [highDetail, mediumDetail, lowDetail]);

  return <lOD ref={lodRef} />;
}
```

### 프레임레이트 제어

```tsx
// Canvas에서 프레임 제어
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
}
```

### 메모리 관리

```tsx
import { useEffect } from "react";
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
}
```

### 성능 모니터링

```tsx
import { Perf } from "r3f-perf";
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
}
```

**학습 자료**
- [R3F 성능 팁](https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance)
- [Three.js 최적화](https://discoverthreejs.com/tips-and-tricks/)

---

## 9. 고급 기법

### 포스트 프로세싱

```tsx
import {
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
      <Vignette
        eskil={false}
        offset={0.1}
        darkness={0.5}
      />

      {/* 피사계 심도 */}
      <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      />

      {/* 안티앨리어싱 */}
      <SMAA />
    </EffectComposer>
  );
}
```

### 셰이더 (GLSL)

```tsx
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

// 커스텀 셰이더 머티리얼 정의
const WaveMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uColor: [1.0, 0.0, 0.0],
  },
  // Vertex Shader
  `
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(pos.x * 5.0 + uTime) * 0.1;
      pos.z += cos(pos.y * 5.0 + uTime) * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uColor;
    varying vec2 vUv;

    void main() {
      gl_FragColor = vec4(uColor * vUv.x, 1.0);
    }
  `
);

// React에서 사용할 수 있도록 확장
extend({ WaveMaterial });

// TypeScript 타입 선언
declare module "@react-three/fiber" {
  interface ThreeElements {
    waveMaterial: JSX.IntrinsicElements["shaderMaterial"] & {
      uTime?: number;
      uColor?: [number, number, number];
    };
  }
}

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
}
```

### 물리 엔진 (Rapier)

```tsx
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

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
}
```

### XR (VR/AR)

```tsx
import { XR, Controllers, Hands, VRButton } from "@react-three/xr";

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
}
```

**학습 자료**
- [React Three Postprocessing](https://docs.pmnd.rs/react-postprocessing)
- [The Book of Shaders](https://thebookofshaders.com/)
- [React Three Rapier](https://github.com/pmndrs/react-three-rapier)
- [React XR](https://github.com/pmndrs/react-xr)

---

## 10. 실전 프로젝트 예시

### 제품 컨피규레이터

```tsx
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { useState } from "react";

function ProductConfigurator() {
  const [color, setColor] = useState("#ff0000");
  const { nodes, materials } = useGLTF("/models/shoe.glb");

  return (
    <>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

        <mesh
          geometry={nodes.shoe.geometry}
          material={materials.leather}
          material-color={color}
        />

        <ContactShadows position={[0, -0.8, 0]} opacity={0.5} blur={2} />
        <Environment preset="city" />
        <OrbitControls />
      </Canvas>

      {/* UI */}
      <div className="controls">
        <button onClick={() => setColor("#ff0000")}>빨강</button>
        <button onClick={() => setColor("#00ff00")}>초록</button>
        <button onClick={() => setColor("#0000ff")}>파랑</button>
      </div>
    </>
  );
}
```

### 인터랙티브 데이터 시각화

```tsx
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useMemo, useRef } from "react";

function DataVisualization({ data }) {
  return (
    <Canvas camera={{ position: [0, 5, 10] }}>
      <ambientLight />

      {data.map((item, index) => (
        <DataBar
          key={item.id}
          value={item.value}
          label={item.label}
          position={[index * 1.5 - (data.length * 0.75), 0, 0]}
        />
      ))}

      <OrbitControls />
    </Canvas>
  );
}

function DataBar({ value, label, position }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      // 부드러운 높이 애니메이션
      meshRef.current.scale.y += (value - meshRef.current.scale.y) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        position={[0, value / 2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "royalblue"} />
      </mesh>

      <Text position={[0, -0.5, 0]} fontSize={0.2} color="white">
        {label}
      </Text>

      {hovered && (
        <Html position={[0, value + 0.5, 0]}>
          <div className="tooltip">{value}</div>
        </Html>
      )}
    </group>
  );
}
```

### 포트폴리오 3D 씬

```tsx
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  PresentationControls,
  ContactShadows,
  Html,
} from "@react-three/drei";

function Portfolio() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <color attach="background" args={["#1a1a2e"]} />

      <Suspense fallback={null}>
        <PresentationControls
          global
          rotation={[0.13, 0.1, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-1, 0.75]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <Float rotationIntensity={0.4}>
            {/* 노트북 모델 */}
            <Laptop />
          </Float>
        </PresentationControls>

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          blur={2.5}
        />

        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

function Laptop() {
  const { nodes, materials } = useGLTF("/models/laptop.glb");

  return (
    <group>
      <primitive object={nodes.laptop} />
      <Html
        transform
        wrapperClass="laptop-screen"
        distanceFactor={1.17}
        position={[0, 1.56, -1.4]}
        rotation-x={-0.256}
      >
        <iframe src="https://my-portfolio.com" />
      </Html>
    </group>
  );
}
```

---

## 핵심 자료

- [React Three Fiber 공식 문서](https://docs.pmnd.rs/react-three-fiber)
- [Drei 문서](https://github.com/pmndrs/drei)
- [Three.js 공식 문서](https://threejs.org/docs/)
- [Three.js Journey](https://threejsjourney.com/) - Bruno Simon의 유료 강의
- [Poimandres Discord](https://discord.gg/poimandres) - R3F 커뮤니티

---

## Week 19 실습 로드맵 (2시간/일 기준)

---

### Day 1 — R3F 기초

- React Three Fiber 개념 이해
- 개발 환경 설정 (Vite + R3F + drei)
- 첫 번째 3D 씬 만들기 (박스, 조명, 카메라)

### Day 2 — 도형과 재질

- 다양한 Geometry 실습
- Material 속성 (metalness, roughness, 텍스처)
- 조명 시스템 이해

### Day 3 — 애니메이션

- useFrame 훅으로 렌더 루프 활용
- React Spring / Framer Motion 3D
- 스켈레탈 애니메이션 (GLTF 모델)

### Day 4 — 인터랙션

- 포인터 이벤트 처리
- OrbitControls와 카메라 제어
- Raycasting 기초

### Day 5 — 모델과 환경

- GLTF/GLB 모델 로딩
- Environment 맵과 HDRI
- 그림자와 ContactShadows

### Day 6 — 고급 기법

- 포스트 프로세싱 효과
- 셰이더 기초 (shaderMaterial)
- 물리 엔진 (Rapier) 맛보기

### Day 7 — 종합 프로젝트

- 제품 컨피규레이터 또는 포트폴리오 씬 제작
- 성능 최적화 적용
- 배포 준비

---

## 최종 목표

- **R3F 이해**: React Three Fiber의 선언적 3D 개발 방식을 이해한다.
- **3D 씬 구성**: 조명, 카메라, 재질을 조합하여 완성도 높은 씬을 만든다.
- **애니메이션 구현**: useFrame, React Spring, GSAP으로 다양한 애니메이션을 적용한다.
- **인터랙션 개발**: 포인터 이벤트와 드래그를 통한 사용자 상호작용을 구현한다.
- **성능 최적화**: 인스턴싱, LOD, 프레임 제어로 성능을 최적화한다.
- **실전 적용**: 제품 시각화, 데이터 시각화, 포트폴리오 등 실제 프로젝트에 R3F를 적용한다.

---

## 참고

> React Three Fiber는 Three.js를 "React 방식"으로 사용할 수 있게 해주는 강력한 도구입니다. 선언적 컴포넌트 구조로 3D 씬을 구성하고, React의 상태 관리와 훅을 그대로 활용할 수 있습니다. 기존 Three.js 코드처럼 리소스 정리를 수동으로 하지 않아도 자동으로 처리되며, drei 라이브러리를 통해 수많은 유틸리티 컴포넌트를 바로 사용할 수 있습니다. 3D 웹 개발의 진입 장벽을 크게 낮추면서도, 필요할 때는 Three.js의 모든 저수준 기능에 접근할 수 있는 유연함을 제공합니다.
