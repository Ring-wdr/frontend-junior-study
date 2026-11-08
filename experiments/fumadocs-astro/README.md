# Fumadocs + Astro 검증 (1~2주차)

현재 Nextra 앱(`../../`)을 Fumadocs + Astro로 옮길 수 있는지 1~2주차만으로 검증한 실험입니다. 섹션 컴포넌트와 사전은 루트의 `src/weeks`, `src/i18n`을 그대로 import합니다.

```bash
bun install
bun run build      # dist/ 에 정적 사이트 생성
bun run typecheck
```

## 결과

| 항목 | 결과 |
| --- | --- |
| `output: 'static'` 빌드 | 성공: `/docs/week-1`, `/en/docs/week-1` 등 6페이지와 검색 인덱스 |
| i18n 라우팅 | `[...lang]` + `hideLocale: 'default-locale'`. 한국어는 접두사 없이(`/docs/…`), 영어는 `/en/docs/…` |
| 언어 전환 | Fumadocs 내장 스위처로 `/docs/week-1/`에서 `/en/docs/week-1/`로 이동하고, 섹션 텍스트도 영어로 바뀜 |
| 타입 안전 사전 | frontmatter `namespace`로 사전을 로드하고, MDX `wrapper`의 `I18nProvider`로 공급. 기존 `useTranslation` 그대로 동작 |
| 인터랙션 | MDX 본문 전체가 하나의 `client:load` island로 hydrate되어 데모 클릭이 동작함 |
| 모바일(375px) | 가로 넘침 0, 목차는 상단 드롭다운으로 표시 |
| 검색 | 로케일별 정적 인덱스. 한국어 검색어(`심층`, `패턴`)도 동작 |

## 옮기면서 필요했던 조정

1. **섹션 컴포넌트는 MDX `import`가 아니라 `src/components/mdx.tsx`에 등록해야 합니다.**
   - Fumadocs island는 `components` 모듈에 등록된 컴포넌트만 island 안에서 렌더링합니다.
   - MDX에서 `import`한 컴포넌트는 Astro가 island 바깥의 slot으로 렌더링합니다. 그래서 Provider가 닿지 않고 hydration도 되지 않습니다(`useTranslation must be used inside <I18nProvider>` 에러로 확인).
2. **의존성 버전 중복 제거(`resolve.dedupe`).**
   - 루트는 `lucide-react@0.562`, `fumadocs-ui`는 `lucide-react@1.x`를 씁니다.
   - 서버와 클라이언트가 서로 다른 버전을 써서 아이콘 SVG가 달라졌고, 그 결과 hydration 에러 #418이 났습니다.
   - `react`, `react-dom`, `lucide-react`를 dedupe해서 해결했습니다.
3. **`react-syntax-highlighter`는 SSR 번들에 포함.**
   - ESM 빌드의 import에 확장자가 없어 Node에서 바로 로드하면 실패합니다.
   - `ssr.noExternal`과 Astro의 `prerender` 환경 설정에 같은 값을 넣어 해결했습니다. Next는 이 처리를 자동으로 합니다.

## 트레이드오프와 한계

- **번들 분할**
  - 등록한 모든 섹션 컴포넌트가 island 하나의 번들(`docs.*.js`, 2주차 기준 약 930KB, minify 후)에 들어갑니다.
  - 22주차로 늘리면 페이지마다 전체 컴포넌트를 받게 됩니다. 실제 전환 시에는 `components`에 `React.lazy` 등으로 주차별 분할을 따로 설계해야 합니다.
  - Nextra는 페이지별로 자동 분할합니다.
- **검색 범위**
  - Fumadocs 기본 검색은 MDX 본문(제목, 설명, 헤딩)만 인덱싱합니다.
  - 컴포넌트가 렌더링하는 텍스트(예: "Observer")는 검색되지 않습니다.
  - 현재 Nextra는 Pagefind로 렌더링된 HTML 전체를 인덱싱합니다.
- **dev 서버**
  - `astro dev`에서 루트 의존성(`@babel/runtime` CJS 등)을 SSR로 실행하는 부분이 아직 불안정합니다.
  - 이번 검증은 정적 빌드(`astro build`) 기준입니다.
- **루트 리다이렉트 불필요**
  - 한국어가 기본 언어라 접두사가 없어서, 별도 리다이렉트 스크립트가 필요 없습니다.
  - 대신 브라우저 언어에 따른 자동 이동은 하지 않습니다.
