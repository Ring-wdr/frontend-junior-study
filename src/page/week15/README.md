# Week 15: 개발 도구 (DevTools 활용 및 번들링 최적화)

**목표:**

크롬 DevTools를 깊이 있게 활용하고,

네트워크/메모리/퍼포먼스 분석 능력,

번들링 이해(Webpack/Vite/Rollup),

로그 및 에러 모니터링(Sentry 등)까지

**현업 프론트엔드 시니어 개발자의 필수 역량**을 체득한다.

---

# 1. Chrome DevTools 마스터하기

---

## 🔹 1) Elements 패널 (DOM/CSS 디버깅)

- HTML 구조를 실시간 수정
- CSS 수정·추가·우선순위 확인
- 레이아웃(Box model) 분석
- 접근성 탭에서 role/contrast 점검
- 화면 깨짐 문제 해결에 핵심

---

## 🔹 2) Console 패널

- `console.log`보다 훨씬 강력한 기능들:
    - `console.table()`
    - `console.dir()`
    - `%c` 스타일 로그
    - `console.trace()` 호출 스택 추적
- `$0`, `$1` DOM 핸들러
- debugger 없이 함수 호출 시 자동 브레이크: `debug(fn)`

---

## 🔹 3) Sources 패널 (진짜 디버깅)

- Breakpoint 종류:
    - Line breakpoint
    - Conditional breakpoint
    - XHR/Fetch breakpoint
    - DOM Breakpoint (노드 변경 감지)
- Call Stack, Scope, Watch 활용
- async debugging(콜스택 유지) 옵션 중요
- 디버깅 실력이 곧 실력이다.

---

## 🔹 4) Network 패널

- 요청/응답 헤더 분석
- HTTP 캐싱 정책(CF-Cache, Cache-Control) 확인
- 페이로드 크기, TTFB, Keep-Alive 확인
- 네트워크 throttle(3G, offline) 테스트
- 리소스 병목을 찾을 때 필수

---

## 🔹 5) Performance 패널 (렌더링 병목 분석)

- FPS 그래프
- Long Task(>50ms) 탐지
- Layout/Recalc Style 이벤트 탐지
- 자바스크립트 함수 실행 비용 분석
- 애니메이션 성능 확인
- 성능 튜닝의 핵심 도구

---

## 🔹 6) Memory 패널

- JS Heap snapshot
- Detached DOM nodes 탐색 → 메모리 누수 발견
- Allocation instrumentation
- 대규모 SPA에서 필수

---

# 2. 번들링(Webpack/Vite/Rollup) 이해

---

## 🔹 1) Webpack의 핵심 개념

- Entry / Output
- Loaders (ts-loader, babel-loader)
- Plugins (DefinePlugin, HtmlWebpackPlugin 등)
- Code Splitting
- Tree shaking
- Dev server / HMR

현재는 Next.js·Vite가 대세지만

Webpack 구조를 아는 것은 “동작 이해”에 크게 도움됨.

---

## 🔹 2) Vite — 현대 프론트엔드의 표준

- 개발 서버 속도 압도적
- ES Modules 기반
- 번들링은 Rollup 사용
- Test 환경과도 최적화(Vitest)
- Next.js가 아니면 대부분 Vite 기반으로 구성하는 추세

---

## 🔹 3) 번들 분석(Bundle Analyzer)

- 어떤 라이브러리가 번들을 비대하게 만드는지 시각화
- Lodash 전체 import / moment.js 등 사용 여부 확인
- treeshaking 안 되는 패턴 감지

---

## 🔹 4) 번들 최적화 전략

- Dynamic import
- lodash-es / date-fns 같은 경량 라이브러리
- 폰트/이미지 서브셋
- dead code 제거
- sideEffects 플래그 명시

---

# 3. Observability (로그·에러 수집·성능 모니터링)

---

## 🔹 1) 에러 모니터링(Sentry 등)

프론트엔드에서는 에러가 특별히 잘 숨는다.

실서비스라면 반드시 **실시간 에러 수집 시스템**이 필요.

Sentry 기능:

- 실제 사용자 환경의 JS 에러 자동 수집
- Sourcemap 업로드 → 원본 코드 라인 표시
- Breadcrumbs(이전 이벤트 기록)
- 사용자 세션 기반 에러 분석
- 성능 트레이싱(APM)

공식 가이드: https://docs.sentry.io/platforms/javascript/

---

## 🔹 2) 콘솔/네트워크 로깅 구조

- axios interceptors로 체계적으로 로깅
- 서버 응답시간 측정
- 실패한 요청 자동 재시도 로직

---

## 🔹 3) Web Vitals 수집

- 사용자 실제 환경(FID/INP/CLS/LCP)을 로그로 보내
    
    제품의 실사용 성능을 측정하고 개선 가능
    
    (Vercel Analytics 또는 자체 수집 가능)
    

---

# 4. 추천 학습 자료 (정상 링크)

---

### 📘 DevTools 공식 문서

https://developer.chrome.com/docs/devtools/

### 📘 Vite 공식 문서

https://vitejs.dev/guide/

### 📘 Webpack 공식 문서

https://webpack.js.org/concepts/

### 📘 Sentry

https://docs.sentry.io/platforms/javascript/

### 📘 React 성능 최적화 (공식)

https://react.dev/learn/optimizing-performance

---

# 5. Week 14 실습 로드맵 (2시간/일 기준)

---

### Day 1 — DevTools Elements/Console 실습

- DOM 스타일 디버깅
- console.table/trace 활용

### Day 2 — Sources 디버깅 마스터

- conditional breakpoint
- async stack debugging
- call stack 따라가보기

### Day 3 — Network/Performance 분석

- Long Task 찾기
- Layout shift 탐지
- 이미지/폰트 최적화 영향 확인

### Day 4 — Webpack/Vite 번들링 구조 이해

- 작은 프로젝트 직접 구성
- bundle analyzer 실행
- tree shaking 확인

### Day 5 — Sentry 연동

- React 프로젝트에 Sentry 설치
- try/catch + Sentry.captureException 실습
- sourcemap 업로드 후 에러 라인 확인

### Day 6 — Web Vitals 수집

- LCP, CLS, INP 측정 코드 삽입
- dev/prod 차이 분석

### Day 7 — 종합 디버깅 & 번들 최적화 프로젝트

- 랜딩 페이지 하나를 선택
- 성능 분석 → 개선 → 재측정
- 에러 추적 + 로깅 구조 포함한 “프로덕션 품질” 프로젝트 구성

---

# 6. Week 14 최종 목표

- DevTools를 활용해 문제를 빠르게 파악할 수 있다
- 번들·빌드·로깅·에러 수집 체계를 설계할 수 있다
- 실제 서비스 성능을 측정/추적하며 개선할 수 있다
- React/Next.js 기반 서비스 운영에 필요한 **시니어급 실무 역량**을 확보한다