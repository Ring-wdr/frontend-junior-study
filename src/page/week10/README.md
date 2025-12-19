# Week 10: 애니메이션 Part 1 – GSAP 및 Scroll 기반 효과

웹 애니메이션의 기본 원리와

GSAP(GreenSock)를 활용한 고급 애니메이션, 스크롤 기반 인터랙션(ScrollTrigger)을

실무 수준으로 다룰 수 있게 만드는 주차.

React 기반 UI에서도 활용 범위가 매우 넓다.

---

## 1. 학습 핵심 포인트

---

### 🔹 1) 왜 JS 애니메이션인가?

CSS만으로 충분하지 않은 상황:

- 타이밍 제어가 복잡한 경우
- 여러 요소가 순차/병렬로 정교하게 움직일 때
- SVG, Canvas, Three.js 등 DOM 바깥 영역을 다룰 때
- 스크롤 진행도에 따라 UI가 변화해야 할 때

→ 이때 **GSAP**이 최강의 선택지.

---

### 🔹 2) GSAP 기본 문법

GSAP의 핵심 API:

### ✔ gsap.to()

```jsx
gsap.to(".box", { x: 200, duration: 2, ease: "power2.out" });

```

### ✔ gsap.from()

```jsx
gsap.from(".title", { opacity: 0, y: -20 });

```

### ✔ gsap.timeline()

여러 애니메이션을 순서/병렬 조합:

```jsx
const tl = gsap.timeline();
tl.to(".a", { x: 100 })
  .to(".b", { opacity: 1 })
  .from(".c", { y: 50 });

```

→ Timeline은 **복잡한 인터랙션을 설계하기 위한 필수 도구**.

---

### 🔹 3) Easing 이해하기

- power1/2/3, expo, elastic, bounce 등
- UI 반응성을 위한 자연스러운 움직임 설계
- motion guideline: “빠르게 시작해 부드럽게 멈춘다”

---

### 🔹 4) ScrollTrigger — 스크롤 기반 인터랙션

웹에서 가장 많이 쓰이는 고급 인터랙션.

### 핵심 기능:

- 특정 구간에서 애니메이션 시작/종료
- 스크롤 진행도 → 애니메이션 progress에 연결
- pin(고정) 기능 → 섹션을 붙잡아 스크롤 스토리텔링 가능
- scrub 기능 → 스크롤 양과 애니메이션을 동기화

```jsx
gsap.to(".box", {
  x: 300,
  scrollTrigger: {
    trigger: ".section",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,
  }
});

```

---

### 🔹 5) ScrollSmoother (고급)

- 부드러운 스크롤 기반 “패럴랙스” 구현
- 포트폴리오·랜딩 페이지에서 자주 보이는 고급 기술
- 유료 플러그인(Club GreenSock)

지금은 개념만 이해해도 충분하다.

---

### 🔹 6) SVG 애니메이션

- DrawSVGPlugin으로 경로를 그리듯 표현
- 대시 배열 기반 수기 애니메이션 구현
- 로딩 애니메이션, 지도 경로, 아이콘 쓰기 효과 등 가능

---

### 🔹 7) 성능 고려

### 주의해야 할 점:

- transform(x,y,scale,rotate)만 애니메이션할 것
- layout/paint 강제하는 property(top/left/width/height) 움직이면 성능 급락
- 너무 많은 요소를 동시에 애니메이션하면 FPS 하락
- 모바일 GPU 성능 고려 필요

→ DevTools의 Performance 탭에서 직접 프로파일링해 보기.

---

## 2. 추천 학습 자료 (정상 링크)

### 📘 GSAP 공식 문서

https://greensock.com/docs/

### 📘 ScrollTrigger 소개

https://greensock.com/scrolltrigger/

### 📘 GSAP Getting Started

https://greensock.com/get-started/

### 📘 GSAP CodePen 예제 모음

https://codepen.io/collection/nVYWZR

### 📘 Motion & UX 원칙

Google Material Motion

https://material.io/design/motion/understanding-motion.html

---

## 3. Week 9 실습 로드맵 (2시간/일 기준)

### Day 1 — GSAP 기본기

- gsap.to / from 실행
- opacity, x/y, scale 애니메이션 실습
- easing 변경해보며 느낌 비교

### Day 2 — Timeline 설계

- title 등장 → 이미지 페이드 인 → 버튼 bounce 순으로 timeline 구성
- Timeline delay, offset 조정해보기

### Day 3 — ScrollTrigger 입문

- 특정 섹션 진입 시 fade-in 구현
- start/end 옵션 실험

### Day 4 — ScrollTrigger 고급

- scrub: true 로 스크롤 연동
- pin으로 고정되는 섹션 구현
- progress 값을 디버깅해보기

### Day 5 — SVG 애니메이션

- DrawSVGPlugin 없이 stroke-dasharray 방식으로 글쓰기 효과 만들기
- 작은 로딩 스피너 구현

### Day 6 — 성능 튜닝

- DevTools Performance 탭으로 애니메이션 병목 찾기
- transform 기반으로 수정하여 FPS 개선

### Day 7 — 스크롤 인터랙션 미니 프로젝트

예시:

- 랜딩 페이지 hero → scroll-down → reveal sections
- 패럴랙스 이미지 효과
- Timeline + ScrollTrigger 병합

---

## 4. 최종 목표

- GSAP의 핵심 문법을 **막힘 없이 사용할 수 있는 수준**
- ScrollTrigger로 스크롤 인터랙션을 설계할 수 있다
- Timeline 기반 복합 애니메이션 구조를 이해한다
- 성능을 고려한 애니메이션을 구현할 수 있다