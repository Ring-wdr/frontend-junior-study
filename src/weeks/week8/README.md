# Week 8: 테스팅 (단위 테스트부터 E2E까지)

# **목표:**

프론트엔드 테스트 전반을 **체계적으로 이해하고**,

실제로 프로젝트에서 “테스트 전략을 설계할 수 있는 수준”까지 올라가는 것.

Jest, Vitest, React Testing Library(RTL), MSW(Mock Service Worker),

Playwright(CI 친화적), Cypress(강력한 개발 경험) 등을 균형 있게 다룬다.

---

## 1. 학습 핵심 포인트

---

### 🔹 1) 테스트 종류 3단계 이해

### ✔ Unit Test (단위 테스트)

- 한 함수/한 컴포넌트 단위
- 빠르고 저렴한 테스트
- Pure function 테스트가 가장 이상적

### ✔ Integration Test (통합 테스트)

- 여러 컴포넌트/모듈이 실제로 협력하는지 검증
- 예: API → 상태 업데이트 → 화면 반영
- React Testing Library + MSW 조합이 정석

### ✔ E2E Test (End-to-End)

- 진짜 브라우저에서 사용자의 여정을 테스트
- 예: 로그인 → 대시보드 이동 → 로그아웃
- Playwright/Cypress 사용

> 실무 기준: Unit 60%, Integration 30%, E2E 10% 비율이 이상적.
> 

---

### 🔹 2) React Testing Library(RTL) — 현재 표준

### 핵심 철학: “사용자처럼 테스트하라”

- DOM 직접 검사 X
- getByRole/getByLabelText 등 **접근성 기반 쿼리** 사용
- container.querySelector 금지

---

### 🔹 3) Jest vs Vitest

**Jest**

- 업계 표준, 문서 많음
- transform 비용 때문에 느릴 때가 있음

**Vitest**

- Vite 기반 → 훨씬 빠른 테스트 실행
- Jest API와 거의 동일
- 현대 프론트엔드라면 Vitest 추천

---

### 🔹 4) Mock Service Worker(MSW)

프론트 개발자가 반드시 알아야 하는 필수 도구.

- 네트워크 요청을 **브라우저에서 가로채 mock 응답을 제공**
- backend 준비가 안 되어도 개발 가능
- 통합 테스트에서 매우 강력

예시 흐름:

```
컴포넌트 → fetch('/api/todos') → MSW가 인터셉트 → 가짜 데이터 반환 → UI 렌더링

```

---

### 🔹 5) Playwright / Cypress — E2E 테스트

**Playwright**

- 빠름
- 크로스브라우저 지원 뛰어남
- CI 친화적

**Cypress**

- DX 최고
- 인터랙션 기록/디버깅 경험 우수
- 하지만 브라우저 제약이 있음

> Playwright는 “엔터프라이즈 레벨 E2E 표준”,
> 
> 
> Cypress는 “개발편의성 최강”으로 많이 사용됨.
> 

---

### 🔹 6) Mocking 전략

- `vi.fn()`, `jest.fn()`
- 모듈 전체 mock
- fetch mock
- router mock (next-router-mock)

Mock을 **과하게 쓰면 오히려 테스트가 의미 없어진다.**

가능하면 MSW로 실제 동작 흐름을 테스트하는 것이 이상적.

---

### 🔹 7) 테스트의 안티패턴

- 구현 세부사항 테스트
- 타이밍 의존 테스트
- findBy → waitFor 남용
- snapshot 테스트 남발
    
    (변경에 민감하므로 유지비만 높아짐)
    

---

## 2. 추천 학습 자료 (정상 링크)

### 📘 Testing Library 공식 문서

https://testing-library.com/docs/

### 📘 Vitest 공식 문서

https://vitest.dev/

### 📘 Jest 공식 문서

https://jestjs.io/

### 📘 MSW(Mock Service Worker)

https://mswjs.io/

### 📘 Playwright

https://playwright.dev/

### 📘 Cypress

https://www.cypress.io/

---

## 3. 실습 로드맵 (2시간/일 기준)

### Day 1 — Unit test 기초

- 합계 계산 함수(sum) 테스트
- React 컴포넌트에서 버튼 클릭 카운트 테스트
- RTL 쿼리(getByRole)만 사용하기

### Day 2 — Integration test

- API 데이터를 렌더링하는 컴포넌트 구현
- MSW로 API mock
- “로딩 → 성공 → 에러” 시나리오 모두 테스트

### Day 3 — Routing + State + UI 통합 테스트

- Next.js useRouter mock 또는 실제 App Router 테스트
- 로그인 → 대시보드 이동을 mock 서버 기반으로 테스트

### Day 4 — Vitest 전환

- 기존 Jest 테스트를 Vitest로 마이그레이션
- 속도 차이 체감하기

### Day 5 — E2E 기본

- Playwright 설치
- 첫 테스트: “로그인 페이지 이동 → 로그인 버튼 클릭”
- data-testid 대신 접근성 기반 쿼리 사용

### Day 6 — E2E 시나리오 작성

- CRUD 시나리오 작성
- 에러 페이지까지 테스트
- 스크린샷 비교(visual regression) 맛보기

### Day 7 — 테스트 전략 문서화

- Unit / Integration / E2E 비율 정의
- Mocking 우선순위 규칙
- CI 환경에서 병렬 테스트 전략 정리

---

## 4. 최종 목표

- 프론트엔드 테스트의 전체 생태계를 **머릿속에 구조화**할 수 있다.
- RTL + MSW + Vitest 조합으로 **실전 테스트를 작성할 수 있다.**
- E2E 테스트의 역할과 한계를 이해하고, “언제 써야 하는가”를 판단할 수 있다.
- 테스트 전략을 스스로 설계할 수 있는 수준에 도달한다.