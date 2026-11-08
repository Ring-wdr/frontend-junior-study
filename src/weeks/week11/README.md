# 📘 Week 11 — 웹 성능 최적화(Core Web Vitals & Rendering Performance)

**목표:**

웹 성능 최적화의 전반적인 개념을 이해하고

**Core Web Vitals(LCP, FID/INP, CLS)**를 개선하는 방법을 체계적으로 학습한다.

또한 렌더링 병목 분석(DevTools Performance), Lazy-loading 전략,

이미지·폰트 최적화, 코드 스플리팅까지 “실무 최적화의 핵심”을 익힌다.

---

## 1. 학습 핵심 포인트

---

### 🔹 1) Core Web Vitals 3대 지표

### ✔ LCP (Largest Contentful Paint)

- 주요 콘텐츠가 화면에 표시되기까지 걸리는 시간
- 주로 **큰 이미지, hero 영역, 폰트 로딩**이 원인
- 개선 전략: 이미지 최적화, preconnect, server rendering, CDN 활용

### ✔ FID → INP (Input Delay → Interaction to Next Paint)

- 사용자가 클릭/입력했을 때 반응이 지연되는 시간
- 원인: 메인 스레드가 바쁜 상태(Long Task)
- 개선 전략:
    - heavy 계산 분리
    - Web Worker
    - useTransition로 UI block 방지
    - 불필요한 JS 줄이기

### ✔ CLS (Cumulative Layout Shift)

- 화면 요소가 “밀리는” 레이아웃 불안정 문제
- 원인: 이미지 width/height 미지정, 광고 영역 미지정, 폰트 FOUT
- 해결:
    - 이미지 사이즈 명시
    - ad container skeleton
    - font-display: swap

---

### 🔹 2) 브라우저 렌더링 구조 이해

- JS 실행 → Style 계산 → Layout → Paint → Composite
- Layout/paint 강제하는 코드가 성능을 크게 해침
- scroll/resize 같은 이벤트는 Debounce/Throttle 필요
- React의 re-render는 Layout에 영향을 줄 수 있으므로 컴포넌트 분리 중요

---

### 🔹 3) DevTools Performance 프로파일링

프론트엔드 개발자라면 반드시 익혀야 하는 스킬.

프로파일링을 통해:

- Long Task (50ms↑) 탐색
- Layout thrashing 여부 확인
- FPS 하락 원인 분석
- 스크립트 실행 비용 분석

“추측으로 성능 개선하는 것”은 금물.

**측정 → 문제 확인 → 개선 → 재측정**

이 프로세스를 반드시 몸에 익혀야 한다.

---

### 🔹 4) 코드 스플리팅(Code Splitting)

- React.lazy + Suspense
- Next.js dynamic import
- 사용 시나리오:
    - 초기 렌더에 필요 없는 대형 페이지
    - 대규모 차트 library
    - 관리자 페이지 등 낮은 사용 빈도

→ 초기 JS 번들 크기가 크게 줄어듦.

---

### 🔹 5) Lazy Loading 전략

- 이미지 lazy load
- 컴포넌트 lazy load
- data fetch lazy load
- IntersectionObserver 활용

---

### 🔹 6) 이미지 최적화(가장 효과 큰 영역!)

### ✔ WebP/AVIF

### ✔ next/image (자동 Sizing + DPR 대응 + Lazyload + 최적화)

### ✔ Responsive images (srcset, sizes)

### ✔ Preload / preconnect

이미지는 전체 성능을 결정하는 “가장 중요한 자원”이다.

---

### 🔹 7) 폰트 최적화

- preload로 폰트 미리 가져오기
- font-display: swap
- subset(font 서브셋)으로 용량 줄이기
- Next.js의 next/font 사용하면 자동 최적화

---

### 🔹 8) 네트워크 최적화

- HTTP/2 병렬 전송
- CDN edge 캐싱
- 캐시 정책(Cache-Control) 전략
- preconnect, dns-prefetch, prerender

---

### 🔹 9) 번들 사이즈 최적화

- Tree-shaking 되지 않는 코드 제거
- lodash-es 사용
- Date-fns처럼 함수 단위 import
- moment.js 같은 heavy 라이브러리 지양
- Bundle analyzer로 분석

---

## 2. 추천 학습 자료 (정상 링크)

### 📘 Web.dev — Core Web Vitals

https://web.dev/vitals/

### 📘 LCP 개선 가이드

https://web.dev/lcp/

### 📘 INP 개선 가이드

https://web.dev/inp/

### 📘 CLS 개선 가이드

https://web.dev/cls/

### 📘 React Performance 공식 문서

https://react.dev/learn/optimizing-performance

### 📘 DevTools Performance 사용법

https://developer.chrome.com/docs/devtools/performance/

### 📘 이미지 최적화 가이드

https://web.dev/fast/#images

### 📘 폰트 최적화

https://web.dev/optimize-lcp/#web-fonts

### 📘 Next.js 성능 최적화

https://nextjs.org/docs/app/building-your-application/optimizing

---

## 3. Week 11 실습 로드맵 (2시간/일 기준)

### Day 1 — Core Web Vitals 측정

- Lighthouse로 현재 앱 성능 측정
- LCP 요소 식별
- Layout Shift 원인 탐색

### Day 2 — DevTools Performance 프로파일링

- 스크롤 시 성능 하락 분석
- Re-render 과도한 컴포넌트 탐색

### Day 3 — Code Splitting 적용

- Chart.js 또는 editor 라이브러리 dynamic import
- React.lazy + Suspense 적용

### Day 4 — 이미지 최적화

- next/image로 교체
- WebP 변환
- responsive sizes 적용
- LCP 개선 수치 비교

### Day 5 — 폰트 최적화

- next/font로 교체
- preload 제거 전/후 비교
- CLS 개선되는지 확인

### Day 6 — 네트워크 + 캐시 전략

- preconnect 적용
- 캐시 전략 설정(Cache-Control 헤더)
- API 응답 캐싱과 stale-while-revalidate 실험

### Day 7 — 종합 개선 프로젝트

- 랜딩 페이지 하나 최적화
- 초기 LCP 3s → 1.5s 이하로 개선
- 개선 과정 문서화

---

## 4. Week 11 최종 목표

- Core Web Vitals를 **수치로 분석하고 개선할 수 있는 능력**
- DevTools로 성능 병목을 찾아내는 역량
- 이미지·폰트·번들 최적화를 정확히 적용할 수 있음
- React & Next.js 앱 최적화를 스스로 설계할 수 있음