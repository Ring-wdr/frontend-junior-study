# Week 9: 애니메이션 Part 1 – Framer Motion 및 고급 UI 인터랙션

**목표:**

React 환경에서 가장 많이 사용되는 애니메이션 라이브러리 **Framer Motion**의

핵심 철학과 기능을 이해하고,

고급 UI 패턴(드래그, 제스처, Layout Animation, Page Transition)을 구현할 수 있게 만든다.

GSAP이 “절대적인 제어력”을 가진 하드코어 애니메이션이라면,

Framer Motion은 **React 개발자를 위한 가장 실전적인 UI 애니메이션 도구**이다.

---

## 1. 학습 핵심 포인트

---

### 🔹 1) Motion Component의 개념

Framer Motion의 기본 단위:

```jsx
import { motion } from "framer-motion";

<motion.divinitial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
/>

```

특징:

- 선언적(Declarative)
- React의 state 변화와 자연스럽게 연동
- Variants로 복합 상태를 모델링 가능

---

### 🔹 2) Variants — 상태 기반 애니메이션 패턴

Variants는 “애니메이션 상태 집합”을 정의하는 방식.

```jsx
const box = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

```

사용:

```jsx
<motion.div variants={box} initial="hidden" animate="show" />

```

**효과:**

- 자식 요소들에 동일한 애니메이션 규칙 적용 가능
- Stagger(자식 순차 등장)도 자연스럽게 가능

---

### 🔹 3) Gesture 기반 인터랙션

Framer Motion의 강점.

### ✔ whileHover

### ✔ whileTap

### ✔ whileFocus

### ✔ whileInView

예시:

```jsx
<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
  Click
</motion.button>

```

→ 사용자 행동에 반응하는 부드러운 UI 구현 가능.

---

### 🔹 4) Drag — 드래그 가능한 UI

칸반 보드, 카드 드래그 UI, 슬라이더 등에 필수.

```jsx
<motion.div drag dragConstraints={{ left: 0, right: 300 }} />

```

옵션:

- dragElastic
- dragMomentum
- dragDirectionLock

**응용:**

- Trello 카드 이동
- Carousel(슬라이더)
- 이미지 드래그 후 모멘텀 효과

---

### 🔹 5) Layout Animation — 레이아웃 변화 자동 보간

React의 state 변경으로 컴포넌트 크기/위치가 변할 때

Framer Motion이 **자동으로 보간하여 부드럽게 이동**시켜주는 기능.

```jsx
<motion.div layout />

```

사용 예:

- 아코디언 열림/닫힘
- 리스트 아이템 추가/삭제
- Grid → List 형태 변경

이 기능은 **CSS로 구현하기 어려운 영역**을 매우 쉽게 만든다.

---

### 🔹 6) AnimatePresence — 언마운트 애니메이션

조건부 렌더링 시 컴포넌트가 사라지는 순간(exit) 애니메이션을 구현.

```jsx
<AnimatePresence>
  {open && (
    <motion.div exit={{ opacity: 0 }}>
      Modal content
    </motion.div>
  )}
</AnimatePresence>

```

활용:

- 모달
- 드롭다운
- Toast 메시지
- 페이지 전환 애니메이션

---

### 🔹 7) Page Transition (Next.js / React Router)

Framer Motion은 페이지 전환 애니메이션을 쉽게 만들 수 있음.

핵심 개념:

- LayoutGroup
- AnimatePresence
- route 변경시 exit → enter 순으로 애니메이션

---

### 🔹 8) Spring, Keyframes, Transition 구성

기본 transition은 Spring(물리 기반).

옵션:

- stiffness
- damping
- mass

또한 keyframes animation도 가능:

```jsx
animate={{ scale: [1, 1.3, 1] }}

```

UI 마이크로 인터랙션 구현에 탁월.

---

### 🔹 9) 성능 및 접근성 고려

- 너무 많은 motion 요소 남발 금지
- prefers-reduced-motion 지원
- 레이아웃 변화가 성능에 부담될 경우 transform 기반으로 대체
- DevTools Performance로 FPS 측정

---

## 2. 추천 학습 자료 (정상 링크)

### 📘 Framer Motion 공식 문서

https://motion.dev/

### 📘 Variants 가이드

https://motion.dev/docs/animation/variants

### 📘 Drag 가이드

https://motion.dev/docs/gestures/drag

### 📘 AnimatePresence

https://motion.dev/docs/animatepresence

### 📘 Layout Animation

https://motion.dev/docs/layout

### 📘 Framer Motion Tutorial (Scrimba)

https://scrimba.com/learn/framer

---

## 3. Week 10 실습 로드맵 (2시간/일 기준)

### Day 1 — 기본 모션 컴포넌트 익히기

- fade-in, slide-up, scale-in
- transition 옵션 변경해보기

### Day 2 — Variants & Stagger

- Variants 정의
- 리스트 순차 등장 애니메이션 만들기

### Day 3 — Hover/Tap/ScrollInView 제스처

- 버튼 인터랙션 강화
- whileInView를 이용한 스크롤 등장 UI

### Day 4 — Drag & Momentum 실습

- 드래그 가능한 카드
- 칼럼 간 이동 실험

### Day 5 — Layout Animation

- 아코디언
- 리스트 아이템 추가/삭제 시 부드러운 위치 이동
- Grid ↔ List 전환 UI

### Day 6 — Page Transition

- Next.js 라우터 변경 시 fade transition 구현
- AnimatePresence + LayoutGroup 사용

### Day 7 — 완성 미니 프로젝트

예시:

- 카드 갤러리(Drag + Layout)
- 모달/토스트 애니메이션
- 스크롤 등장 + Variants 섞기
- 페이지 전환 애니메이션 추가

---

## 4. Week 10 최종 목표

- Framer Motion의 모든 핵심 기능을 **막힘 없이 사용할 수 있다.**
- React의 상태 변화와 Motion 애니메이션을 자연스럽게 연결할 수 있다.
- Hover/Tap/Drag/Layout 애니메이션을 설계할 수 있다.
- 페이지 전환 및 UI 흐름 전체를 Motion으로 설계할 수 있다.