# frontend-junior-study (Nextra docs)

프론트엔드 커리큘럼에 따라 **주차별로 학습 계획**을 정리했습니다. 각 주차에는 해당 주제의 핵심 개념 요약과 함께 **공부 자료 및 블로그 링크**를 제공하며, 이론 학습과 실습(코딩 연습)을 **혼합**하여 진행할 수 있도록 안내합니다. 학습 중 모르는 용어나 개념은 연결된 자료를 통해 심화 조사하세요.

**(⚠️최신 웹 동향에 따라 내용을 구성했으며, 불필요하거나 React 공식 권고에 반하지 않는 범위 내에서만 다룹니다.)**

- [ ] [Week 1: JavaScript 심화 – 런타임, this, 스코프, 비동기 등](src/weeks/week1/README.md)

- [ ] [Week 2: 프로그래밍 패러다임 – 객체지향 디자인 패턴](src/weeks/week2/README.md)

- [ ] [Week 3: 프론트엔드 디자인 패턴 – 컴포넌트 아키텍처](src/weeks/week3/README.md)

- [ ] [Week 4: 전역 상태 관리 (Flux 아키텍처와 Redux 등)](src/weeks/week4/README.md)

- [ ] [Week 5: React & Next.js 신기능 – 동시성, Hooks 심화, Next 13 특징](src/weeks/week5/README.md)

- [ ] [Week 6: 스타일링 (CSS-in-JS와 Utility-First 등)](src/weeks/week6/README.md)

- [ ] [Week 7: 폼 관리 (Forms & Validation)](src/weeks/week7/README.md)

- [ ] [Week 8: 테스팅 (단위 테스트부터 E2E까지)](src/weeks/week8/README.md)

- [ ] [Week 9: 애니메이션 Part 1 – Framer Motion 및 고급 UI 인터랙션](src/weeks/week9/README.md)

- [ ] [Week 10: 애니메이션 Part 1 – GSAP 및 Scroll 기반 효과](src/weeks/week10/README.md)

- [ ] [Week 11: 웹 성능 최적화(Core Web Vitals & Rendering Performance)](src/weeks/week11/README.md)

- [ ] [Week 12: 인증 및 보안 (Authentication & Security)](src/weeks/week12/README.md)

- [ ] [Week 13: 병렬 처리(Web Workers) & 오프라인 전략(PWA) & IndexedDB](src/weeks/week13/README.md)

- [ ] [Week 14: 접근성과 국제화 (Accessibility & i18n)](src/weeks/week14/README.md)

- [ ] [Week 15: 개발 도구 (DevTools 활용 및 번들링 최적화)](src/weeks/week15/README.md)

- [ ] [Week 16: TypeScript - 타입 시스템 마스터하기](src/weeks/week16/README.md)

- [ ] [Week 17: AI 기반 개발 도구와 협업](src/weeks/week17/README.md)

- [ ] [Week 18: WebAssembly와 고성능 웹 애플리케이션](src/weeks/week18/README.md)

- [ ] [Week 19: React Three Fiber와 3D 웹 개발](src/weeks/week19/README.md)

- [ ] [Week 20: 마이크로 프론트엔드와 모노레포](src/weeks/week20/README.md)

- [ ] [Week 21: CI/CD와 DevOps 기초](src/weeks/week21/README.md)

- [ ] [Week 22: 에러 트래킹과 프로덕션 모니터링](src/weeks/week22/README.md)


## Setup

Install the dependencies:

```bash
bun install
```

## Get started

Start the dev server at [http://localhost:3000/frontend-junior-study](http://localhost:3000/frontend-junior-study).

```bash
bun run dev
```

Build the static site (`out/`, includes the Pagefind search index):

```bash
bun run build
```

Preview the static export locally:

```bash
bun run preview
```

## Structure

- `src/app/[lang]/` – Nextra docs layout and MDX page renderer (static export, `ko` / `en`).
- `src/content/{ko,en}/` – one MDX page per week; `## headings` drive the sidebar TOC, and `_meta.ts` sets the sidebar labels.
- `src/weeks/weekN/components/` – interactive section components embedded in the MDX pages.
- `src/i18n/` – typed dictionaries. `useTranslation('weekN')` from `@/i18n/client` only accepts keys that exist in `dictionaries/ko/weekN.json`; `en` is checked against the same shape at compile time.

## Learn more

- [Nextra documentation](https://nextra.site)
- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
