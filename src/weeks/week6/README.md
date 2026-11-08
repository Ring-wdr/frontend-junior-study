Week 6: 스타일링 (CSS-in-JS와 Utility-First 등)

**목표:**

프론트엔드 개발자라면 필수로 갖춰야 하는 **스타일링 전략 전반**을 정복한다.

단순히 “CSS 문법”이 아니라,

**디자인 시스템 구성**, **유틸리티-first(Tailwind)**,

**CSS-in-JS(Emotion/Styled-components)**,

**CSS Modules**, **전역/지역 스타일 설계**,

**반응형 설계**, **테마 시스템**, **접근성 있는 스타일링**까지 다룬다.

---

## 1. 학습 핵심 포인트

---

### 🔹 1) 디자인 시스템 & 디자인 토큰(Design Tokens)

- 색상, 폰트, 타이포, spacing, radius, shadow 등 **기본 값들을 표준화**
- 어떤 스타일링 접근을 쓰든 **디자인 토큰 정의**는 필수
- CSS 변수(`:root { --color-primary: ... }`)로 구현 가능
- 디자인 팀과 협업 시 가장 중요한 개념

---

### 🔹 2) CSS Modules — 유지보수가 쉬운 구조적 CSS

- 클래스가 **컴포넌트 단위로 스코프**됨
    
    (`.module.css`)
    
- 전역 충돌 방지
- 학습 비용이 거의 없음
- Next.js 공식 예제에서도 자주 사용됨

---

### 🔹 3) CSS-in-JS (Emotion / Styled-components)

**장점**

- JS 로직을 그대로 스타일에 활용 가능
    
    `(props) => props.primary ? ... : ...`
    
- 동적 스타일링이 매우 쉬움
- 컴포넌트 단위 캡슐화가 강력하게 보장됨

**단점**

- 런타임 오버헤드 존재
- 큰 앱에서는 성능 비용 고려 필요
- 서버 렌더링 환경에서 스타일 추출 작업 필요

**언제 쓰는가?**

- 디자인 변화가 많고 **동적 스타일링**이 많은 앱
- 팀이 JS 중심 사고를 선호할 때
- 컴포넌트 기반 스타일 구조가 중요한 경우

---

### 🔹 4) Tailwind CSS — Utility-first 스타일링 표준

현업에서 가장 핫한 스타일링 방식.

**핵심 장점**

- 클래스 조합만으로 빠른 개발
- 생산성이 매우 높고 일관성 유지가 쉬움
- Purge로 불필요 CSS 제거 → **번들 최소화**
- 대규모 앱에서도 충돌 없이 확장 가능

**단점**

- HTML이 난잡해 보일 수 있음
- 커스텀 디자인이 많으면 theme 확장이 필요함
- 초반 러닝 커브 있음 (클래스 체계 익히기)

**언제 쓰는가?**

- 빠른 UI 개발이 필요한 팀
- 디자인 시스템 구축과 궁합이 매우 좋음
- 스타일 변경·반응형·dark mode 지원이 많은 앱

---

### 🔹 5) 반응형 디자인 전략

- 모바일 퍼스트(Mobile-first)
- Tailwind의 breakpoints
    
    (`md:`, `lg:`와 같이 prefix 형태)
    
- CSS `clamp()`, `minmax()` 사용
- 이미지 아트 디렉션(`<picture>`) 이해하기

---

### 🔹 6) 테마(Theme) 시스템

- 라이트/다크 모드
- CSS 변수 기반 테마 관리
- Tailwind: `dark:` 프리픽스
- Emotion/Styled-components: ThemeProvider

---

### 🔹 7) 접근성 고려한 스타일링

- focus ring 없애지 않기
- 명도 대비(contrast ratio)
- motion-sensitive 사용자 고려 (`prefers-reduced-motion`)
- 색상만으로 정보 전달하지 않기

---

## 2. 추천 학습 자료 (정상 링크)

### 📘 디자인 시스템 & 토큰

- Design Tokens W3C 커뮤니티 그룹
    
    https://design-tokens.github.io/community-group/
    

### 📘 Tailwind CSS

- 공식 문서
    
    https://tailwindcss.com/docs
    

### 📘 Tailwind로 생각하는 법

- Tailwind UI Demo
    
    https://tailwindui.com/
    

### 📘 Emotion

- 공식 문서
    
    https://emotion.sh/docs/introduction
    

### 📘 Styled-components

- 공식 문서
    
    https://styled-components.com/docs
    

### 📘 CSS Modules

- CSS Modules 소개
    
    https://github.com/css-modules/css-modules
    

### 📘 반응형 이미지

- MDN HTML `<picture>` 요소
    
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
    

---

## 3. Week 6 실습 로드맵 (2시간/일)

### Day 1 — 디자인 토큰 정의

- 색상/폰트/spacing/radius를 JSON or CSS 변수로 정의
- “디자인 시스템의 기본 단위”를 문서화

### Day 2 — CSS Modules 실전

- 컴포넌트 2~3개를 `.module.css`로 스타일링
- 유틸 클래스와 BEM 스타일 비교

### Day 3 — Tailwind 실전

- 버튼/카드/폼 UI를 Tailwind로 구현
- 반응형을 md:, lg:로 작성해보기
- dark 모드 활성화

### Day 4 — CSS-in-JS 실전

- Emotion으로 Button 컴포넌트 작성
- props를 기반으로 동적 스타일 만들기
- ThemeProvider 적용

### Day 5 — 테마 시스템 구축

- CSS 변수 기반 라이트/다크 모드 토글
- Tailwind theme 확장도 함께 실습

### Day 6 — 접근성 중심 스타일링

- focus-visible 적용
- 명도 대비 검사
- prefers-reduced-motion에 따라 애니메이션 제거

### Day 7 — UI 컴포넌트 라이브러리 프로토타입 제작

- Button, Input, Card, Dialog를
    
    “Tailwind 버전”과 “Emotion 버전” 두 가지로 만들어 비교
    
- 어떤 방식이 팀/프로젝트에 더 적합할지 판단

---

## 4. 최종 목표

- 스타일링 기술의 **전체 지도**를 머릿속에 그릴 수 있다.
- Tailwind / CSS Modules / Emotion 중 **상황별 적절한 선택**이 가능하다.
- 디자인 시스템과 테마 시스템을 직접 구축해본 경험을 갖는다.
- 반응형 UI와 접근성 중심 스타일링을 자연스럽게 구현한다.