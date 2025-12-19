# Week 14: 접근성과 국제화 (Accessibility & i18n)

**목표:**

서비스 품질을 좌우하는 **접근성(Web Accessibility)**과

글로벌 서비스의 핵심인 **국제화(i18n)**를 실무 수준으로 체득한다.

‘예쁘게 보이는 UI’를 넘어

**누구나 사용하는 UI**, **전 세계에서 사용하는 UI**를 만들 수 있는 개발자로 성장한다.

---

# 1. 웹 접근성(A11y)

---

## 🔹 1) 접근성의 근본 개념

접근성은 단순히 장애를 위한 것이 아니라:

- 다양한 상황(저조도, 소음, 터치 사용 제한, 모바일 환경 등)에서
- 모든 사용자가 제품의 기능을 **동등하게 활용**할 수 있게 하는 것.

React 개발자의 70% 이상이 놓치는 부분이므로 확실히 체득해야 한다.

---

## 🔹 2) WCAG(웹 접근성 표준) 핵심 4대 원칙

WCAG 2.1 기준, 반드시 알아야 할 핵심 네 가지:

### ✔ Perceivable (지각 가능)

- 대체 텍스트 제공
- 명도 대비(contrast) 준수
- 텍스트는 선택 가능하고 확대 가능해야 함

### ✔ Operable (운용 가능)

- 전체 UI가 키보드로 조작 가능해야 함
- 포커스가 보이고 이동 흐름이 자연스러워야 함
- 자동 재생(video/audio) 금지

### ✔ Understandable (이해 가능)

- 폼 라벨 명확히 제공
- 에러 메시지는 구체적으로
- 일관된 내비게이션 구조

### ✔ Robust (견고성)

- 보조 기술(Screen Reader 등)이 인식 가능해야 함
- 시맨틱 태그 사용 필수
- ARIA는 필요한 곳에서만 사용

---

## 🔹 3) 시맨틱 HTML이 최강의 접근성 도구

접근성의 80%는 **HTML을 올바르게 사용하는 것만으로 해결된다.**

- `<button>`을 `<div>`로 대체하지 말 것
- `<label for="...">`로 명확한 연결
- `<nav>`, `<header>`, `<main>`, `<footer>`
- `<table>`은 진짜 테이블에만 사용
- `<fieldset>`, `<legend>`는 폼 그룹에 필수

---

## 🔹 4) ARIA의 올바른 사용

ARIA는 ‘없는 기능을 보완하는 기술’이며, **HTML을 먼저 쓰고 ARIA는 나중**에 붙이는 것이 원칙이다.

자주 쓰는 ARIA 속성:

- role=”dialog”
- aria-expanded=""
- aria-label / aria-labelledby
- aria-live (비동기 메시지)

ARIA를 남용하면 접근성은 “개선이 아니라 악화”된다.

---

## 🔹 5) 포커스 관리 (실무 난이도 높음)

React SPA에서 가장 자주 깨지는 접근성 포인트.

### 필요한 경우:

- 라우트 이동 시 새 페이지의 첫 번째 heading로 focus 이동
- 모달 열릴 때:
    - 모달 내부 첫 요소로 focus 이동
    - 탭 이동이 모달 밖으로 빠져나가지 않도록 trap
    - 닫히면 기존 focus 위치로 복귀

### React 도구

- `focus-trap-react`
- `React Aria` 등 접근성 우수한 컴포넌트 라이브러리

---

## 🔹 6) 접근성 테스트 도구

- **axe DevTools** (가장 강력)
- **Lighthouse A11y**
- **WAVE**
- NVDA(Screen Reader), VoiceOver

React Testing Library에서도 접근성 기반 쿼리(`getByRole`, `getByLabelText`) 사용을 권장.

---

# 2. 국제화(i18n)

---

## 🔹 1) 국제화의 핵심 요소

- 언어(translation)
- 날짜/시간/숫자/통화 포맷
- RTL(right-to-left) 지원
- 복수형 처리(pluralization)
- 지역별 주소·이름 규칙
- 타임존

---

## 🔹 2) Next.js i18n 구조

Next.js에서는 두 가지 방법이 있다:

### ✔ Pages Router의 i18n 라우팅

`next.config.js`에 locales 설정

### ✔ App Router에서 i18n 구현

언어별 딕셔너리 파일을 동적으로 load

Layout에서 언어 감지

URL 구조: `/ko/...`, `/en/...`

---

## 🔹 3) ICU Message Format (실무 표준)

복수형, 선택형 메시지 처리 가능.

예:

```
{count, plural,
  one {# item}
  other {# items}
}

```

라이브러리:

- react-intl
- formatjs
- i18next

---

## 🔹 4) 날짜·숫자·통화 포맷

JS의 Intl API가 매우 강력하다.

### Intl.NumberFormat

```jsx
new Intl.NumberFormat("de-DE").format(1234567.89)
// → 1.234.567,89

```

### Intl.DateTimeFormat

```jsx
new Intl.DateTimeFormat("fr-FR").format(new Date())

```

---

## 🔹 5) RTL 지원

아랍어, 히브리어 사용 국가를 위한 필수 기능.

방법:

- `<html dir="rtl">`
- CSS logical properties 사용
    
    (`margin-inline-start`, `padding-inline-end` 등)
    

Tailwind는 `dir="rtl"` 자동 지원 가능.

---

## 🔹 6) 번역 파일 관리 전략

큰 서비스에서는 번역 관리가 복잡해짐.

패턴:

- `en.json` / `ko.json` 등 파일 분리
- 키 기반
- 동적 로딩
- namespace 단위 분리 (`common`, `auth`, `errors` 등)

번역 누락 체크 자동화도 필요(jest + schema).

---

# 3. 추천 학습 자료 (정상 링크)

---

### 📘 WCAG 2.1

https://www.w3.org/TR/WCAG21/

### 📘 aria-practices

https://www.w3.org/WAI/ARIA/apg/

### 📘 A11y basics (MDN)

https://developer.mozilla.org/en-US/docs/Learn/Accessibility

### 📘 axe DevTools

https://www.deque.com/axe/devtools/

### 📘 i18next

https://www.i18next.com/

### 📘 react-intl / formatjs

https://formatjs.io/

### 📘 Intl API

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

---

# 4. Week 13 실습 로드맵 (2시간/일 기준)

---

## Day 1 — 접근성 점검

- 기존 프로젝트를 axe로 검사
- 명도 대비/role 누락 문제 수정

## Day 2 — 시맨틱 HTML 리팩토링

- `<button>`, `<label>` 올바른 연결
- landmark 태그 적용

## Day 3 — 모달 접근성 구현

- focus trap 적용
- ESC key close
- aria-modal, aria-labelledby 적용

## Day 4 — 폼 접근성

- 라벨 연결
- aria-live로 에러 메시지 제공
- 필수항목 표시 기준 정리

## Day 5 — 국제화 셋업

- Next.js + i18next로 다국어 시작
- `en.json`, `ko.json` 구성
- Translation hook 구현

## Day 6 — 날짜/통화 포맷팅

- Intl API 실습
- 지역 선택에 따른 표기 변화 적용

## Day 7 — RTL & 완성 프로젝트

- RTL 페이지 한 개 구성
- 접근성 + i18n 통합 테스트
- 스크린리더로 실제 읽히는지 점검

---

# 5. 최종 목표

- 접근성(A11y) 이슈를 스스로 찾아내고 해결할 수 있다.
- WCAG 핵심 원칙을 이해하고 실무 UI에 적용할 수 있다.
- 국제화(i18n) 시스템을 구조적으로 설계할 수 있다.
- 다국어 지원 + 접근성 고려된 고품질 UI를 구현할 수 있다.