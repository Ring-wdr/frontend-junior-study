Week 6: 스타일링 (CSS-in-JS와 Utility-First 등)

**목표:**

프론트엔드 개발자라면 필수로 갖춰야 하는 **스타일링 전략 전반**을 정복한다.

단순히 “CSS 문법”이 아니라,

**디자인 시스템 구성**, **유틸리티-first(Tailwind)**,

**CSS-in-JS(Emotion/Styled-components)**,

**CSS Modules**, **전역/지역 스타일 설계**,

**반응형 설계**, **테마 시스템**, **접근성 있는 스타일링**까지 다룬다.

여기에 더해 **CSS가 JS의 클래스 맵으로 컴파일되는 과정**, **중복 제거와 충돌 해결**,

**shadcn/ui와 Astryx 같은 디자인 시스템의 구조**를 깊이 있게 살펴본다.

---

## 1. 학습 핵심 포인트

---

### 🔹 1) 디자인 시스템 & 디자인 토큰(Design Tokens)

- 색상, 폰트, 타이포, spacing, radius, shadow 등 **기본 값들을 표준화**
- 어떤 스타일링 접근을 쓰든 **디자인 토큰 정의**는 필수
- CSS 변수(`:root { --color-primary: ... }`)로 구현 가능
- 디자인 팀과 협업 시 가장 중요한 개념
- **토큰의 세 계층**: Primitive(값) → Semantic(용도) → Component(컴포넌트 한정)
- 테마 전환은 Semantic 층이 가리키는 대상만 바꾸는 일

---

### 🔹 1-1) 캐스케이드, 명시도, `@layer`

- 승자 결정 순서: 출처·중요도 → 캐스케이드 레이어 → 명시도 → 출현 순서
- `class` 속성 안에서 클래스를 적은 순서는 결과에 영향을 주지 않음
- `@layer`로 순서를 선언하면 스타일시트 로드 순서와 무관하게 결과가 같음
- 레이어에 속하지 않은 스타일은 모든 레이어보다 우선
- 이후 나오는 모든 스타일링 도구는 "출현 순서에 결과를 맡기지 않는 방법"

---

### 🔹 2) CSS Modules — 유지보수가 쉬운 구조적 CSS

- 클래스가 **컴포넌트 단위로 스코프**됨
    
    (`.module.css`)
    
- 전역 충돌 방지
- 학습 비용이 거의 없음
- Next.js 공식 예제에서도 자주 사용됨

**컴파일 결과**

- 로더가 클래스 이름을 `파일 경로 + 이름` 해시로 바꾸고, JS에는 `{ button: 'Button-module_button__yrx1x' }` 같은 객체를 export
- `composes`는 CSS를 복사하지 않고 맵의 값에 클래스를 하나 더 붙임
- 중복 제거 단위는 파일. 선언 단위 중복은 그대로 남음
- 우선순위는 여전히 출현 순서에 의존 (CSS 청크 로드 순서 문제)

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
- React 서버 컴포넌트에서 사용 불가 (`'use client'` 필요)

**런타임 동작**

- 직렬화 → 해시(`css-l5i0wd`) → 캐시 조회 → 처음 보는 해시만 `<style>`에 삽입
- 중복 제거 단위는 스타일 블록 전체. 선언 하나만 달라도 새 규칙
- styled-components는 2025년 3월 유지보수 모드 발표

**언제 쓰는가?**

- 디자인 변화가 많고 **동적 스타일링**이 많은 앱
- 팀이 JS 중심 사고를 선호할 때
- 컴포넌트 기반 스타일 구조가 중요한 경우

---

### 🔹 3-1) Zero-Runtime: Vanilla Extract와 StyleX

**Vanilla Extract**

- `.css.ts`를 빌드 중에 실행해 정적 CSS 파일 생성
- export는 클래스 이름 문자열로 치환. 결과물 형태는 CSS Modules와 같음
- Recipes(variant), Sprinkles(원자 클래스 설계)

**StyleX**

- Babel 플러그인이 `stylex.create`를 `속성 키 → 원자 클래스` 객체로 치환
- 클래스 이름이 선언의 해시라서 같은 선언은 앱 전체에서 규칙 하나 (선언 단위 중복 제거)
- `stylex.props`가 속성 키 기준으로 병합, 마지막 인자가 이김
- 축약 속성은 우선순위 숫자로 스타일시트를 정렬해 해결
- Meta의 오픈소스 디자인 시스템 Astryx의 기반

---

### 🔹 4) Tailwind CSS — Utility-first 스타일링 표준

현업에서 가장 핫한 스타일링 방식.

**핵심 장점**

- 클래스 조합만으로 빠른 개발
- 생산성이 매우 높고 일관성 유지가 쉬움
- 소스에서 실제로 쓰인 클래스만 생성 → **번들 최소화**
- 대규모 앱에서도 충돌 없이 확장 가능

**단점**

- HTML이 난잡해 보일 수 있음
- 커스텀 디자인이 많으면 theme 확장이 필요함
- 초반 러닝 커브 있음 (클래스 체계 익히기)

**언제 쓰는가?**

- 빠른 UI 개발이 필요한 팀
- 디자인 시스템 구축과 궁합이 매우 좋음
- 스타일 변경·반응형·dark mode 지원이 많은 앱

**빌드 동작 (v4)**

- 소스를 텍스트로 스캔해 클래스 후보 수집 → 유효한 것만 규칙 생성 → 정해진 순서로 정렬
- 출력은 `theme, base, components, utilities` 캐스케이드 레이어
- 토큰은 CSS의 `@theme`에서 정의, 수동 다크 모드는 `@custom-variant`
- 조합해 만든 클래스 이름(`'text-' + color`)은 찾지 못함

**충돌과 tailwind-merge**

- `class="p-4 p-2"`는 스타일시트 순서 때문에 `p-4`가 이김
- `tailwind-merge`는 클래스를 충돌 그룹으로 해석해 뒤에 온 것만 남김
- 이 프로젝트의 `cn`(`src/lib/utils.ts`)이 `clsx` + `twMerge`

---

### 🔹 4-1) 클래스 맵, 중복 제거, 병합 비교

| 방식 | JS에 남는 것 | 중복 제거 단위 | 충돌 해결 |
|---|---|---|---|
| CSS Modules | 이름 → 해시된 클래스 객체 | 파일 | 출현 순서 |
| 런타임 CSS-in-JS | 스타일 문자열, 런타임, 삽입 캐시 | 스타일 블록 | 삽입 순서 |
| Vanilla Extract | 이름 → 클래스 문자열 | `style()` 호출 | 출현 순서 |
| StyleX | 속성 키 → 원자 클래스 객체 | 선언 (앱 전체) | `stylex.props` 병합 |
| Tailwind | 없음 | 유틸리티 (앱 전체) | 출현 순서, `tailwind-merge` |

---

### 🔹 4-2) 디자인 시스템 구조: Headless, shadcn/ui, Astryx

- **층**: 토큰 → Headless 프리미티브(Radix UI, React Aria, Base UI) → 스타일이 입혀진 컴포넌트 → 제품 코드
- **shadcn/ui**: CLI가 소스를 프로젝트에 복사. Radix + Tailwind + `cva` + `cn`, 의미 토큰 CSS 변수와 `@theme inline`
- **Astryx**: Meta의 오픈소스 React 디자인 시스템(베타, MIT, React 19+). StyleX로 작성되어 미리 컴파일된 CSS로 배포. 테마는 CSS 커스텀 프로퍼티 재정의, `swizzle`로 컴포넌트 소스 꺼내기
- **비교 축**: 누가 컴포넌트 코드를 소유하는가 (소스 복사 vs 패키지 배포)

---

### 🔹 5) 반응형 디자인 전략

- 모바일 퍼스트(Mobile-first)
- Tailwind의 breakpoints
    
    (`md:`, `lg:`와 같이 prefix 형태)
    
- CSS `clamp()`, `minmax()` 사용
- 이미지 아트 디렉션(`<picture>`) 이해하기
- 컨테이너 쿼리(`@container`), 동적 뷰포트 단위(`dvh`), 논리 속성(`margin-inline-start`)

---

### 🔹 6) 테마(Theme) 시스템

- 라이트/다크 모드
- CSS 변수 기반 테마 관리
- Tailwind: `dark:` 프리픽스 (v4에서 수동 전환은 `@custom-variant`)
- 첫 화면 깜빡임 방지: 본문 렌더링 전 인라인 스크립트로 테마 지정, `color-scheme`
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
    

### 📘 StyleX, tailwind-merge

- StyleX 공식 문서
    
    https://stylexjs.com/docs/learn/
    
- tailwind-merge
    
    https://github.com/dcastil/tailwind-merge
    

### 📘 디자인 시스템 구현체

- shadcn/ui 공식 문서
    
    https://ui.shadcn.com/docs
    
- Astryx (Meta)
    
    https://github.com/facebook/astryx
    
- MDN – Cascade layers
    
    https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers
    

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