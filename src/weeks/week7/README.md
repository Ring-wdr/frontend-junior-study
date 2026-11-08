# Week 7: 폼 관리 (Forms & Validation)   

**목표:**

프론트엔드에서 가장 버그가 많이 발생하는 영역인 “폼”을

**정확하고 우아하게 관리하는 능력**을 키운다.

React Hook Form, Zod, Formik, 비동기 검증, 이모지 처리, 정규화,

보안(Sanitize, SQL Injection 방지 관점), UX 향상, 낙관적 UI까지

전문적인 폼 설계의 핵심 내용을 모두 다루는 주차.

---

## 1. 학습 핵심 포인트

---

### 🔹 1) 폼 관리의 본질

- 폼은 *UI + 상태 + 검증 + 에러 처리 + 제출 절차*의 복합체
- 폼이 복잡해질수록 구조화된 관리 방식이 필요
- “컨트롤드 vs 언컨트롤드” 개념 이해 필수

---

### 🔹 2) React Hook Form(RHF) — 현대 폼 관리 표준

**장점**

- 언컨트롤드 기반 → 불필요한 리렌더 최소화
- register로 input을 참조 연결 → 퍼포먼스 우수
- formState, handleSubmit이 직관적

**핵심 기능**

- `register`, `handleSubmit`, `formState.errors`
- `watch`, `setValue`, `reset`
- `Controller` (커스텀 입력 컴포넌트 제어)

---

### 🔹 3) Zod — 타입 기반 런타임 검증

TypeScript와의 궁합이 최고.

**장점**

- 스키마 = 타입 = 런타임 검증 → 일관성
- Yup 대비 더 최신 문법, Tree-shaking 우수
- RHF와 `zodResolver`로 매우 잘 통합됨

**예시**

```tsx
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

```

---

### 🔹 4) Formik — 역사적 배경과 현재의 용도

- React 초창기 폼 관리를 정립한 라이브러리
- 여전히 쓰이지만 RHF가 대부분 대체
- 구조가 “컨트롤드 컴포넌트 기반”이라 리렌더가 많아 성능적으로는 불리

---

### 🔹 5) 비동기 검증 전략

- onChange 즉시 검증은 UX를 해칠 때가 많음
- **Debounce**한 검증, blur 시 검증, submit 시 일괄 검증 전략 비교
- 서버측 중복 검사(이메일 중복 등)도 흔한 패턴

---

### 🔹 6) 이모지/유니코드/정규화 처리

실무에서 자주 발생하는 문제!

- 이모지는 길이 2로 잡히기도 함 (UTF-16 surrogate pair)
- 정규화(NFC/NFD) 무시 시 문자열 비교 오류발생
- 정규표현식의 `u` 플래그 필수
- 사용자 입력값을 normalize해 저장하는 것이 권장됨

---

### 🔹 7) 공백 처리 / 봇 방지

- 앞뒤 공백 제거(trim)
- honeypot 필드를 이용한 간단 봇 방지
- 빈 값 검증의 UX (onBlur 또는 submit 시점 권장)

---

### 🔹 8) 입력값 Sanitize & 보안

프론트엔드에서도 해야 할 최소한의 보안 작업.

- XSS 위험이 있는 문자열은 DOM에 삽입 전 sanitize
- Regex 기반 직접 sanitize는 금지(누락 있기 때문), 라이브러리 사용 추천
- Form 데이터는 항상 **서버측 검증이 최종 방어선**, 프론트 검증은 보조적
- SQL Injection은 서버측 방지지만, 프론트는 문제 유발 문자열을 early-filter 가능

---

### 🔹 9) UX 중심 폼 설계

- 에러 메시지는 정확하고 명확하게
- 성공/실패 피드백은 시각적으로 명확하게
- keyboard-friendly UI
- Submit 후 reset 필요 여부 판단
- 낙관적 UI 적용(useOptimistic로 더욱 간단해짐)

---

## 2. 추천 학습 자료 (정상 링크)

### 📘 React Hook Form

https://react-hook-form.com/get-started

### 📘 Zod 문서

https://zod.dev/

### 📘 RHF + Zod Resolver

https://react-hook-form.com/get-started#SchemaValidation

### 📘 Formik

https://formik.org/docs/overview

### 📘 Unicode & Normalization

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize

### 📘 Sanitization 관련

DOMPurify

https://github.com/cure53/DOMPurify

---

## 3. 실습 로드맵 (2시간/일 기준)

### Day 1 — RHF 기본 익히기

- register / handleSubmit 기반 로그인 폼 만들기
- 에러 메시지 UI 구성

### Day 2 — Zod 기반 검증

- RHF + zodResolver 연결
- 비밀번호 규칙/이메일 형식 검증 적용

### Day 3 — 커스텀 입력 & Controller

- RHF Controller로 custom input(formatted input) 제어
- date picker / select 등 Controlled UI 다뤄보기

### Day 4 — 비동기 검증

- Debounce된 API 검증(중복 아이디 체크) 실습
- loading 상태 표시

### Day 5 — 문자/이모지 처리 & sanitize

- normalize(NFC) 적용
- DOMPurify로 사용자 입력 sanitize

### Day 6 — 폼 UX 개선 & 낙관적 UI

- onBlur vs onSubmit UX 비교
- useOptimistic 기반 폼 전송 플로우 구성
- Skeleton or optimistic card append 실습

### Day 7 — 실전 폼 구축

- 회원가입 폼 완성
- 에러 처리, 서버 검증 실패 대응, Reset/Focus 관리
- “제출 → API → 응답 → UI 업데이트” 전체 사이클 경험해보기

---

## 4. 최종 목표

- React에서 “폼 관리의 어려움”을 스스로 해결할 수 있는 수준이 된다.
- RHF + Zod를 통한 **타입 안전(totally safe) 폼 구조**를 구축할 수 있다.
- 이모지/정규화/Sanitize 등 실무 난제를 대응할 수 있다.
- UX 좋은 폼을 설계할 수 있다.