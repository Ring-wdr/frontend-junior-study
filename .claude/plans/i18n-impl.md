# i18n 전체 프로젝트 적용 계획

## 개요
- **목표:** 전체 프로젝트에 다국어 지원 적용
- **라이브러리:** i18next + react-i18next
- **지원 언어:** 한국어(ko), 영어(en)
- **기본 언어:** 한국어(ko)

## 프로젝트 현황
- 총 16개 페이지 (main-page + week1~15)
- 각 week당 4~9개 섹션 컴포넌트 (총 약 100개+)
- 공통 컴포넌트: SectionCard, SubSection, InfoBox, DemoBox, CodeBlock

---

## Phase 1: 기초 설정

### 1.1 패키지 설치
```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

### 1.2 번역 파일 구조 생성
```
src/
├── i18n/
│   ├── index.ts                 # i18n 초기화
│   └── locales/
│       ├── ko/
│       │   ├── common.json      # 공통 UI
│       │   ├── main.json        # 메인 페이지
│       │   └── week1~15.json    # 각 주차별
│       └── en/
│           ├── common.json
│           ├── main.json
│           └── week1~15.json
```

### 1.3 i18n 초기화 (`src/i18n/index.ts`)
- i18next 설정
- 브라우저 언어 감지
- fallbackLng: 'ko'
- localStorage에 언어 설정 저장

### 1.4 앱 진입점 연결 (`src/index.tsx`)
- `import './i18n'` 추가

---

## Phase 2: 공통 컴포넌트 수정

### 수정할 파일들
| 파일 | 변경 내용 |
|------|----------|
| `src/components/section-card.tsx` | titleKey, descriptionKey prop 추가 |
| `src/components/sub-section.tsx` | titleKey prop 추가 |
| `src/components/info-box.tsx` | titleKey prop 추가 |
| `src/components/demo-box.tsx` | labelKey prop 추가 |

### 번역 키 네이밍 컨벤션
```
[네임스페이스].[섹션].[요소]

예시:
- common.navigation.backToDashboard
- week1.eventLoop.title
- week1.eventLoop.description
```

---

## Phase 3: 언어 전환 UI

### 3.1 LanguageSwitcher 컴포넌트 생성
- 위치: `src/components/language-switcher.tsx`
- 한국어/영어 토글 버튼
- 현재 언어 하이라이트

### 3.2 배치 위치
- 각 페이지 헤더 우측 (Back 버튼 반대편)

---

## Phase 4: 번역 파일 작성

### common.json 구조
```json
{
  "navigation": {
    "backToDashboard": "← 대시보드로 돌아가기"
  },
  "ui": {
    "interactiveDemo": "인터랙티브 데모"
  }
}
```

### week별 JSON 구조
```json
{
  "header": {
    "title": "...",
    "description": "..."
  },
  "tabs": { ... },
  "sectionName": {
    "badge": "...",
    "title": "...",
    "description": "...",
    "content": { ... }
  }
}
```

---

## Phase 5: 페이지/섹션 마이그레이션

### 마이그레이션 순서
1. 공통 컴포넌트
2. 메인 페이지 (`main-page.tsx`)
3. Week 1 (패턴 확립)
4. Week 2~15 (패턴 복제)

### 섹션 컴포넌트 변환 패턴
```tsx
// Before
<SectionCard
  title="Event Loop Visualizer"
  description="Step through the Event Loop..."
>

// After
const { t } = useTranslation('week1');
<SectionCard
  title={t('eventLoop.title')}
  description={t('eventLoop.description')}
>
```

---

## 번역 제외 항목

### 고유 명사 (번역 안 함)
- React, Next.js, TypeScript, JavaScript
- WCAG, ARIA, HTML, CSS
- Redux, MobX, Zustand
- Webpack, Vite, Rsbuild
- 기타 라이브러리/프레임워크 이름

### 코드 블록
- `<CodeBlock code={...} />` 내용은 번역하지 않음

---

## Critical Files

### 생성할 파일
- `src/i18n/index.ts`
- `src/i18n/locales/ko/common.json`
- `src/i18n/locales/ko/main.json`
- `src/i18n/locales/ko/week1.json` ~ `week15.json`
- `src/i18n/locales/en/common.json`
- `src/i18n/locales/en/main.json`
- `src/i18n/locales/en/week1.json` ~ `week15.json`
- `src/components/language-switcher.tsx`

### 수정할 파일
- `src/index.tsx` - i18n import 추가
- `src/components/section-card.tsx` - 번역 키 지원
- `src/components/sub-section.tsx` - 번역 키 지원
- `src/components/info-box.tsx` - 번역 키 지원
- `src/components/demo-box.tsx` - 번역 키 지원
- `src/page/main-page.tsx` - 번역 적용
- `src/page/week1~15/page.tsx` - 번역 적용
- `src/page/week1~15/components/*.tsx` - 모든 섹션 번역 적용

---

## 작업 순서 요약

| 단계 | 작업 | 산출물 |
|------|------|--------|
| 1 | 패키지 설치 & i18n 초기화 | i18n/index.ts |
| 2 | 번역 파일 구조 생성 | locales/**/*.json |
| 3 | 공통 컴포넌트 수정 | section-card, sub-section, info-box, demo-box |
| 4 | LanguageSwitcher 구현 | language-switcher.tsx |
| 5 | 메인 페이지 마이그레이션 | main-page.tsx |
| 6 | Week 1 마이그레이션 (패턴 확립) | week1/**/*.tsx |
| 7 | Week 2~15 마이그레이션 | 나머지 모든 페이지 |
| 8 | 테스트 & 마무리 | - |

---

## 주의사항

1. **점진적 마이그레이션:** Week 단위로 진행, 각 완료 후 테스트
2. **하위 호환성:** `title`과 `titleKey` 동시 지원으로 기존 코드 유지
3. **번역 품질:** 기술 용어 일관성 유지
4. **코드 블록 보존:** CodeBlock 내용은 절대 번역하지 않음

## 현재 작업 상황
- [✅] week1
- [✅] week2
- [✅] week3
- [✅] week4
- [✅] week5
- [✅] week6
- [✅] week7
- [✅] week8
- [✅] week9
- [✅] week10
- [✅] week11
- [✅] week12
- [✅] week13
- [✅] week14
- [✅] week15

## 완료 사항
- 모든 번역 파일 생성 완료 (ko/en × week1~15)
- 모든 페이지 컴포넌트 i18n 적용 완료
- 모든 섹션 컴포넌트 i18n 적용 완료
- "Back to Dashboard" 하드코딩 제거 완료
- 빌드 테스트 통과

