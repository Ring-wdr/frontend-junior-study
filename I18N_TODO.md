# i18n 적용 현황 및 TODO

마지막 검수: 2025-12-20

## 요약
- **완료된 주차**: Week 1-4, 6, 8-10
- **미완료된 주차**: Week 5, 7, 11-15
- **총 미적용 파일 수**: 28개

---

## Week 5 (5개 파일 - 영문 하드코딩)

### 수정 필요 파일
1. `/src/page/week5/components/concurrency-section.tsx`
   - useTranslation('week5') 미사용
   - 모든 텍스트 하드코딩 (영문)
   - i18n 키: week5.concurrency.*
   - 필요한 컴포넌트: Trans (strong, code 태그 포함)

2. `/src/page/week5/components/react19-section.tsx`
   - useTranslation('week5') 미사용
   - 모든 텍스트 하드코딩 (영문)
   - i18n 키: week5.react19.*
   - 필요한 컴포넌트: Trans (strong, code 태그 포함)

3. `/src/page/week5/components/app-router-section.tsx`
   - useTranslation('week5') 미사용
   - 모든 텍스트 하드코딩 (영문)
   - i18n 키: week5.appRouter.*
   - 필요한 컴포넌트: Trans (strong, code 태그 포함)

4. `/src/page/week5/components/data-fetching-section.tsx`
   - useTranslation('week5') 미사용
   - 모든 텍스트 하드코딩 (영문)
   - i18n 키: week5.dataFetching.*
   - 필요한 컴포넌트: Trans (strong, code 태그 포함)

5. `/src/page/week5/components/optimization-section.tsx`
   - useTranslation('week5') 미사용
   - 모든 텍스트 하드코딩 (영문)
   - i18n 키: week5.optimization.*
   - 필요한 컴포넌트: Trans (strong, code 태그 포함)

### i18n JSON 상태
- `/src/i18n/locales/en/week5.json` - 존재하고 완전함 ✓
- `/src/i18n/locales/ko/week5.json` - 존재하고 완전함 ✓

---

## Week 7 (5개 파일 - 영문 하드코딩)

### 수정 필요 파일
1. `/src/page/week7/components/validation-libraries-section.tsx`
   - useTranslation('week7') 미사용
   - 모든 텍스트 하드코딩 (영문)
   - i18n 키: week7.validationLibraries.*
   - 필요한 컴포넌트: Trans (strong 태그 포함)

2. `/src/page/week7/components/async-validation-section.tsx`
   - useTranslation('week7') 미사용
   - 모든 텍스트 하드코딩 (영문)
   - i18n 키: week7.asyncValidation.*
   - 필요한 컴포넌트: Trans (strong 태그 포함)

3. `/src/page/week7/components/input-handling-section.tsx`
   - useTranslation('week7') 미사용
   - 모든 텍스트 하드코딩 (영문)
   - i18n 키: week7.inputHandling.*
   - 필요한 컴포넌트: Trans (strong 태그 포함)

4. `/src/page/week7/components/ux-design-section.tsx`
   - useTranslation('week7') 미사용
   - 모든 텍스트 하드코딩 (영문)
   - i18n 키: week7.uxDesign.*
   - 필요한 컴포넌트: Trans (strong 태그 포함)

5. `/src/page/week7/components/security-section.tsx`
   - useTranslation('week7') 미사용
   - 모든 텍스트 하드코딩 (영문)
   - i18n 키: week7.security.*
   - 필요한 컴포넌트: Trans (strong 태그 포함)

### i18n JSON 상태
- `/src/i18n/locales/en/week7.json` - 존재하고 완전함 ✓
- `/src/i18n/locales/ko/week7.json` - 존재하고 완전함 ✓

---

## Week 11 (9개 파일 - 한글 하드코딩)

### 수정 필요 파일
1. `/src/page/week11/components/browser-rendering-section.tsx`
2. `/src/page/week11/components/bundle-size-section.tsx`
3. `/src/page/week11/components/code-splitting-section.tsx`
4. `/src/page/week11/components/core-web-vitals-section.tsx`
5. `/src/page/week11/components/devtools-section.tsx`
6. `/src/page/week11/components/font-optimization-section.tsx`
7. `/src/page/week11/components/image-optimization-section.tsx`
8. `/src/page/week11/components/lazy-loading-section.tsx`
9. `/src/page/week11/components/network-optimization-section.tsx`

**공통 사항**
- useTranslation('week11') 미사용
- 모든 텍스트 한글 하드코딩
- i18n 키: week11.*
- 필요한 컴포넌트: Trans (strong, code 태그 포함)

### i18n JSON 상태
- `/src/i18n/locales/en/week11.json` - 존재하고 완전함 ✓
- `/src/i18n/locales/ko/week11.json` - 존재하고 완전함 ✓

---

## Week 12 (7개 파일 - 영문 하드코딩)

### 수정 필요 파일
1. `/src/page/week12/components/csrf-section.tsx`
2. `/src/page/week12/components/jwt-session-section.tsx`
3. `/src/page/week12/components/nextauth-section.tsx`
4. `/src/page/week12/components/oidc-section.tsx`
5. `/src/page/week12/components/privacy-section.tsx`
6. `/src/page/week12/components/react2shell-section.tsx`
7. `/src/page/week12/components/xss-csp-section.tsx`

**공통 사항**
- useTranslation('week12') 미사용
- 모든 텍스트 영문 하드코딩
- i18n 키: week12.*
- oauth-section.tsx는 이미 완료됨 ✓

### i18n JSON 상태
- `/src/i18n/locales/en/week12.json` - 존재하고 완전함 ✓
- `/src/i18n/locales/ko/week12.json` - 존재하고 완전함 ✓

---

## Week 13 (3개 파일 - 영문 하드코딩)

### 수정 필요 파일
1. `/src/page/week13/components/combined-pattern-section.tsx`
2. `/src/page/week13/components/indexeddb-section.tsx`
3. `/src/page/week13/components/offline-first-section.tsx`

**공통 사항**
- useTranslation('week13') 미사용
- 모든 텍스트 영문 하드코딩
- i18n 키: week13.*
- service-worker-section.tsx, web-worker-section.tsx는 이미 완료됨 ✓

### i18n JSON 상태
- `/src/i18n/locales/en/week13.json` - 존재하고 완전함 ✓
- `/src/i18n/locales/ko/week13.json` - 존재하고 완전함 ✓

---

## Week 14 (5개 파일 - 한글 하드코딩)

### 수정 필요 파일
1. `/src/page/week14/components/aria-section.tsx`
   - 한글 하드코딩 (제목, 설명)
   - i18n 키: week14.aria.*

2. `/src/page/week14/components/focus-management-section.tsx`
   - 한글 하드코딩 (제목, 설명, 포커스 관리 내용)
   - i18n 키: week14.focusManagement.*

3. `/src/page/week14/components/i18n-basics-section.tsx`
   - 한글 하드코딩 (제목, 설명, 번역 문자열, 현재 로케일 등)
   - i18n 키: week14.i18nBasics.*

4. `/src/page/week14/components/intl-api-section.tsx`
   - 한글 하드코딩 (한국어, 일본어 등 언어 레이블)
   - i18n 키: week14.intlApi.*

5. `/src/page/week14/components/rtl-section.tsx`
   - 한글 하드코딩 (제목, 설명, RTL 관련 텍스트)
   - i18n 키: week14.rtl.*

**완료된 파일**
- accessibility-basics-section.tsx ✓
- semantic-html-section.tsx ✓

### i18n JSON 상태
- `/src/i18n/locales/en/week14.json` - 존재하고 완전함 ✓
- `/src/i18n/locales/ko/week14.json` - 존재하고 완전함 ✓

---

## Week 15 (7개 파일 - 한글 하드코딩)

### 수정 필요 파일
1. `/src/page/week15/components/bundle-optimization-section.tsx`
   - 한글 하드코딩 (번들 최적화 관련)
   - i18n 키: week15.bundleOptimization.*

2. `/src/page/week15/components/bundling-section.tsx`
   - 한글 하드코딩 (번들링, 표준 관련)
   - i18n 키: week15.bundling.*

3. `/src/page/week15/components/devtools-elements-console-section.tsx`
   - 한글 하드코딩 (DevTools Elements, Console)
   - i18n 키: week15.devtoolsElementsConsole.*

4. `/src/page/week15/components/devtools-performance-memory-section.tsx`
   - 한글 하드코딩 (성능, 메모리 관련)
   - i18n 키: week15.devtoolsPerformanceMemory.*

5. `/src/page/week15/components/devtools-sources-network-section.tsx`
   - 한글 하드코딩 (디버깅, 네트워크)
   - i18n 키: week15.devtoolsSourcesNetwork.*

6. `/src/page/week15/components/observability-section.tsx`
   - 한글 하드코딩 (Sentry, 에러 추적)
   - i18n 키: week15.observability.*

7. `/src/page/week15/components/web-vitals-section.tsx`
   - 한글 하드코딩 (Web Vitals, LCP, INP, CLS 등)
   - i18n 키: week15.webVitals.*

### i18n JSON 상태
- `/src/i18n/locales/en/week15.json` - 존재하고 완전함 ✓
- `/src/i18n/locales/ko/week15.json` - 존재하고 완전함 ✓

---

## 적용 패턴

### 1. Import 추가
```typescript
import { Trans, useTranslation } from 'react-i18next';
```

### 2. Hook 선언
```typescript
const { t } = useTranslation('weekX'); // X는 주차 번호
```

### 3. 일반 텍스트 (태그 없음)
```typescript
{t('key.path')}
```

### 4. HTML 태그 포함 (strong, code 등)
```typescript
<Trans t={t} i18nKey="concurrency.whatIsConcurrent.intro" />

// which contains code tag
<Trans t={t} i18nKey="react19.useActionState.intro" components={{ code: <code /> }} />
```

### 5. 배지, 제목 등
```typescript
badge={{ label: t('key.badge'), color: 'blue' }}
title={t('key.title')}
```

### 6. i18n JSON 형식
```json
{
  "key": {
    "title": "제목",
    "description": "설명",
    "intro": "<strong>굵은 텍스트</strong>, 일반 텍스트, <code>코드</code>"
  }
}
```
HTML 태그는 `<strong>`, `<code>` 등의 실제 태그를 사용

---

## 진행 체크리스트

- [ ] Week 5 (5개 파일)
  - [ ] concurrency-section.tsx
  - [ ] react19-section.tsx
  - [ ] app-router-section.tsx
  - [ ] data-fetching-section.tsx
  - [ ] optimization-section.tsx

- [ ] Week 7 (5개 파일)
  - [ ] validation-libraries-section.tsx
  - [ ] async-validation-section.tsx
  - [ ] input-handling-section.tsx
  - [ ] ux-design-section.tsx
  - [ ] security-section.tsx

- [ ] Week 11 (9개 파일)
  - [ ] browser-rendering-section.tsx
  - [ ] bundle-size-section.tsx
  - [ ] code-splitting-section.tsx
  - [ ] core-web-vitals-section.tsx
  - [ ] devtools-section.tsx
  - [ ] font-optimization-section.tsx
  - [ ] image-optimization-section.tsx
  - [ ] lazy-loading-section.tsx
  - [ ] network-optimization-section.tsx

- [ ] Week 12 (7개 파일)
  - [ ] csrf-section.tsx
  - [ ] jwt-session-section.tsx
  - [ ] nextauth-section.tsx
  - [ ] oidc-section.tsx
  - [ ] privacy-section.tsx
  - [ ] react2shell-section.tsx
  - [ ] xss-csp-section.tsx

- [ ] Week 13 (3개 파일)
  - [ ] combined-pattern-section.tsx
  - [ ] indexeddb-section.tsx
  - [ ] offline-first-section.tsx

- [ ] Week 14 (5개 파일)
  - [ ] aria-section.tsx
  - [ ] focus-management-section.tsx
  - [ ] i18n-basics-section.tsx
  - [ ] intl-api-section.tsx
  - [ ] rtl-section.tsx

- [ ] Week 15 (7개 파일)
  - [ ] bundle-optimization-section.tsx
  - [ ] bundling-section.tsx
  - [ ] devtools-elements-console-section.tsx
  - [ ] devtools-performance-memory-section.tsx
  - [ ] devtools-sources-network-section.tsx
  - [ ] observability-section.tsx
  - [ ] web-vitals-section.tsx
