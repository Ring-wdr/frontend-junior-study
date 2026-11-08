# Week 20: 마이크로 프론트엔드와 모노레포

## 학습 목표

대규모 프론트엔드 애플리케이션을 **독립적으로 배포 가능한 단위**로 분할하는 **마이크로 프론트엔드** 아키텍처를 이해하고, 여러 패키지를 효율적으로 관리하는 **모노레포** 전략을 학습합니다. Turborepo, Nx, pnpm workspaces, Module Federation 등의 도구를 활용하여 팀 간 협업과 독립적 배포가 가능한 프로젝트 구조를 설계합니다.

**대상**: 중소규모 프로젝트 경험이 있는 주니어 ~ 대규모 프로젝트를 설계하려는 시니어 개발자

---

## 1. 마이크로 프론트엔드란?

**핵심 개념**

- **독립적 배포**: 각 팀이 자신의 영역을 독립적으로 개발, 테스트, 배포
- **기술 스택 자유**: 팀별로 다른 프레임워크(React, Vue, Angular) 사용 가능
- **팀 자율성**: 기능 단위로 팀을 구성하여 의사결정 분산
- **격리된 장애**: 한 영역의 오류가 전체 앱에 영향을 주지 않음

**모놀리식 vs 마이크로 프론트엔드**

```
모놀리식 프론트엔드:
┌─────────────────────────────────────────┐
│              단일 애플리케이션            │
│  ┌─────────┬─────────┬─────────┐       │
│  │  헤더   │  상품   │  결제   │       │
│  │         │  목록   │  시스템  │       │
│  └─────────┴─────────┴─────────┘       │
│         하나의 코드베이스, 하나의 배포     │
└─────────────────────────────────────────┘

마이크로 프론트엔드:
┌─────────────────────────────────────────┐
│              컨테이너 애플리케이션          │
├─────────────┬─────────────┬─────────────┤
│   헤더 MFE  │  상품 MFE   │  결제 MFE   │
│  (Team A)  │  (Team B)  │  (Team C)  │
│   React    │    Vue     │   React    │
│   v18.2    │    v3.4    │   v19.0    │
└─────────────┴─────────────┴─────────────┘
   개별 배포      개별 배포      개별 배포
```

**언제 마이크로 프론트엔드를 도입해야 할까?**

| 도입 권장 | 도입 비권장 |
|----------|------------|
| 10명 이상의 개발팀 | 소규모 팀 (5명 이하) |
| 여러 팀이 동시에 개발 | 단일 팀이 전체 소유 |
| 독립적 배포 주기 필요 | 동시 배포가 가능한 경우 |
| 레거시 점진적 마이그레이션 | 신규 프로젝트 MVP |
| 다양한 기술 스택 공존 | 일관된 기술 스택 유지 |

**학습 자료**
- [Micro Frontends (martinfowler.com)](https://martinfowler.com/articles/micro-frontends.html)
- [Micro-Frontends 공식 사이트](https://micro-frontends.org/)

---

## 2. 마이크로 프론트엔드 통합 방식

### 빌드 타임 통합 (npm 패키지)

```json
// package.json
{
  "dependencies": {
    "@mfe/header": "^1.2.0",
    "@mfe/product-list": "^2.1.0",
    "@mfe/checkout": "^1.0.5"
  }
}
```

```tsx
// App.tsx
import Header from "@mfe/header";
import ProductList from "@mfe/product-list";
import Checkout from "@mfe/checkout";

function App() {
  return (
    <>
      <Header />
      <ProductList />
      <Checkout />
    </>
  );
}
```

**장점**: 간단함, 타입 안전성
**단점**: 독립 배포 불가, 전체 재배포 필요

---

### 런타임 통합: Module Federation (권장)

Webpack 5의 Module Federation을 사용해 런타임에 원격 모듈 로드

```javascript
// host/webpack.config.js (컨테이너 앱)
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        header: "header@http://localhost:3001/remoteEntry.js",
        productList: "productList@http://localhost:3002/remoteEntry.js",
        checkout: "checkout@http://localhost:3003/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
      },
    }),
  ],
};
```

```javascript
// header/webpack.config.js (원격 앱)
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "header",
      filename: "remoteEntry.js",
      exposes: {
        "./Header": "./src/Header",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
};
```

```tsx
// host/src/App.tsx
import React, { Suspense } from "react";

const Header = React.lazy(() => import("header/Header"));
const ProductList = React.lazy(() => import("productList/ProductList"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <ProductList />
    </Suspense>
  );
}
```

---

### Vite에서 Module Federation

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        remoteApp: "http://localhost:5001/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
  },
});
```

---

### 런타임 통합: Single-SPA

프레임워크에 구애받지 않는 마이크로 프론트엔드 오케스트레이터

```javascript
// root-config.js
import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@org/header",
  app: () => System.import("@org/header"),
  activeWhen: ["/"],
});

registerApplication({
  name: "@org/products",
  app: () => System.import("@org/products"),
  activeWhen: ["/products"],
});

registerApplication({
  name: "@org/checkout",
  app: () => System.import("@org/checkout"),
  activeWhen: ["/checkout"],
});

start();
```

```html
<!-- index.html -->
<script type="systemjs-importmap">
  {
    "imports": {
      "@org/header": "http://localhost:8081/org-header.js",
      "@org/products": "http://localhost:8082/org-products.js",
      "@org/checkout": "http://localhost:8083/org-checkout.js"
    }
  }
</script>
```

---

### iframe 통합

가장 간단하지만 제한적인 방식

```html
<div class="mfe-container">
  <iframe src="http://header.example.com" title="Header"></iframe>
  <iframe src="http://products.example.com" title="Products"></iframe>
</div>
```

**장점**: 완전한 격리
**단점**: 성능 오버헤드, 스타일 공유 불가, UX 제한

**학습 자료**
- [Module Federation 공식 문서](https://webpack.js.org/concepts/module-federation/)
- [Single-SPA 문서](https://single-spa.js.org/)

---

## 3. 마이크로 프론트엔드 간 통신

### 커스텀 이벤트 (권장)

```typescript
// shared/events.ts
export const MFE_EVENTS = {
  USER_LOGIN: "mfe:user:login",
  CART_UPDATE: "mfe:cart:update",
  NAVIGATION: "mfe:navigation",
} as const;

// 이벤트 발행
export function emitEvent<T>(eventName: string, detail: T) {
  window.dispatchEvent(new CustomEvent(eventName, { detail }));
}

// 이벤트 구독
export function subscribeEvent<T>(
  eventName: string,
  handler: (event: CustomEvent<T>) => void
) {
  window.addEventListener(eventName, handler as EventListener);
  return () => window.removeEventListener(eventName, handler as EventListener);
}
```

```tsx
// header/src/Header.tsx
import { emitEvent, MFE_EVENTS } from "@shared/events";

function Header() {
  const handleLogin = (user: User) => {
    emitEvent(MFE_EVENTS.USER_LOGIN, { user });
  };

  return <button onClick={() => handleLogin(currentUser)}>로그인</button>;
}
```

```tsx
// checkout/src/Checkout.tsx
import { useEffect, useState } from "react";
import { subscribeEvent, MFE_EVENTS } from "@shared/events";

function Checkout() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return subscribeEvent(MFE_EVENTS.USER_LOGIN, (event) => {
      setUser(event.detail.user);
    });
  }, []);

  return <div>{user ? `환영합니다, ${user.name}` : "로그인 필요"}</div>;
}
```

### Props 전달 (Module Federation)

```tsx
// host/src/App.tsx
const ProductList = React.lazy(() => import("productList/ProductList"));

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  return (
    <Suspense fallback={<Loading />}>
      <ProductList onAddToCart={handleAddToCart} />
      <CartSummary items={cartItems} />
    </Suspense>
  );
}
```

### 공유 상태 (Zustand/Redux)

```typescript
// shared-store/src/userStore.ts
import { create } from "zustand";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

```javascript
// webpack.config.js (각 MFE에서 공유)
new ModuleFederationPlugin({
  shared: {
    "shared-store": { singleton: true },
    zustand: { singleton: true },
  },
});
```

---

## 4. 모노레포란?

**핵심 개념**

- **단일 저장소**: 여러 프로젝트/패키지를 하나의 Git 저장소에서 관리
- **코드 공유**: 공통 코드를 쉽게 공유하고 재사용
- **원자적 커밋**: 여러 패키지에 걸친 변경을 하나의 커밋으로
- **일관된 도구**: 린팅, 테스팅, 빌드 설정 통일

**폴리레포 vs 모노레포**

```
폴리레포:
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ repo-1  │ │ repo-2  │ │ repo-3  │ │ repo-4  │
│ (web)   │ │ (api)   │ │ (mobile)│ │(shared) │
└─────────┘ └─────────┘ └─────────┘ └─────────┘
   각각의 Git 저장소, 버전 관리, CI/CD

모노레포:
┌─────────────────────────────────────────┐
│              monorepo                   │
├─────────┬─────────┬─────────┬──────────┤
│ apps/   │ apps/   │ apps/   │packages/ │
│  web    │  api    │ mobile  │ shared   │
└─────────┴─────────┴─────────┴──────────┘
   하나의 Git 저장소, 통합 도구
```

**학습 자료**
- [모노레포 가이드 (monorepo.tools)](https://monorepo.tools/)

---

## 5. 모노레포 도구 비교

| 도구 | 특징 | 복잡도 | 추천 상황 |
|------|------|--------|----------|
| **pnpm workspaces** | 빠른 패키지 매니저, 간단한 설정 | 낮음 | 소규모, 시작점 |
| **Turborepo** | 캐싱, 병렬 빌드, Vercel 지원 | 중간 | 중규모, 빠른 빌드 |
| **Nx** | 의존성 그래프, 플러그인 생태계 | 높음 | 대규모, 엔터프라이즈 |
| **Lerna** | 기존 도구, 버전 관리 | 중간 | 레거시 프로젝트 |

---

## 6. pnpm Workspaces

### 프로젝트 구조

```
my-monorepo/
├── package.json
├── pnpm-workspace.yaml
├── apps/
│   ├── web/
│   │   └── package.json
│   └── admin/
│       └── package.json
└── packages/
    ├── ui/
    │   └── package.json
    ├── utils/
    │   └── package.json
    └── config/
        └── package.json
```

### 설정

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

```json
// 루트 package.json
{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "dev": "pnpm -r dev",
    "build": "pnpm -r build",
    "lint": "pnpm -r lint",
    "test": "pnpm -r test"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

```json
// packages/ui/package.json
{
  "name": "@repo/ui",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "dev": "tsup --watch",
    "build": "tsup"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  }
}
```

```json
// apps/web/package.json
{
  "name": "web",
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/utils": "workspace:*"
  }
}
```

### 명령어

```bash
# 모든 패키지에서 명령 실행
pnpm -r build

# 특정 패키지만
pnpm --filter web dev

# 의존성이 있는 패키지 포함
pnpm --filter web... build

# 패키지 추가 (특정 앱에)
pnpm add lodash --filter web

# 공통 개발 의존성 (루트)
pnpm add -D typescript -w
```

---

## 7. Turborepo

### 설치 및 초기화

```bash
# 새 프로젝트
npx create-turbo@latest

# 기존 모노레포에 추가
pnpm add -D turbo -w
```

### 설정

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {
      "dependsOn": ["build"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    }
  }
}
```

### 명령어

```bash
# 모든 패키지 빌드 (캐싱 + 병렬)
turbo build

# 특정 앱만
turbo build --filter=web

# 변경된 패키지만
turbo build --filter=...[origin/main]

# 캐시 무시
turbo build --force

# 의존성 그래프 시각화
turbo build --graph
```

### Remote Caching (Vercel)

```bash
# 로그인
npx turbo login

# 저장소 연결
npx turbo link

# 이후 CI에서 캐시 공유됨
```

**학습 자료**
- [Turborepo 공식 문서](https://turbo.build/repo/docs)

---

## 8. Nx

### 설치 및 초기화

```bash
# 새 프로젝트
npx create-nx-workspace@latest my-org

# 기존 모노레포에 추가
npx nx@latest init
```

### 프로젝트 구조

```
my-org/
├── apps/
│   ├── web/
│   └── api/
├── libs/
│   ├── shared/
│   │   └── ui/
│   └── feature/
│       └── auth/
├── nx.json
├── workspace.json
└── package.json
```

### 설정

```json
// nx.json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "cache": true
    },
    "test": {
      "cache": true
    }
  },
  "defaultBase": "main",
  "namedInputs": {
    "default": ["{projectRoot}/**/*"]
  }
}
```

### 명령어

```bash
# 앱 생성
nx generate @nx/react:application web

# 라이브러리 생성
nx generate @nx/react:library ui --directory=shared

# 빌드 (영향받는 것만)
nx affected:build

# 의존성 그래프
nx graph

# 특정 프로젝트 실행
nx serve web
nx test shared-ui
```

### 의존성 그래프 활용

```bash
# 변경된 파일에 영향받는 프로젝트만 빌드
nx affected:build --base=origin/main

# CI에서 효율적 테스트
nx affected:test --base=origin/main
```

**학습 자료**
- [Nx 공식 문서](https://nx.dev/)

---

## 9. 공유 패키지 설계

### UI 컴포넌트 라이브러리

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.styles.ts
│   │   │   └── index.ts
│   │   ├── Input/
│   │   └── Modal/
│   ├── hooks/
│   └── index.ts
├── package.json
└── tsconfig.json
```

```tsx
// packages/ui/src/components/Button/Button.tsx
import { forwardRef } from "react";
import { buttonStyles } from "./Button.styles";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonStyles({ variant, size, className })}
        {...props}
      />
    );
  }
);
```

### 공유 설정 패키지

```
packages/config/
├── eslint/
│   └── index.js
├── typescript/
│   ├── base.json
│   ├── react.json
│   └── node.json
└── package.json
```

```json
// packages/config/typescript/react.json
{
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["DOM", "DOM.Iterable", "ES2022"]
  }
}
```

```json
// apps/web/tsconfig.json
{
  "extends": "@repo/config/typescript/react.json",
  "include": ["src"]
}
```

### 유틸리티 패키지

```typescript
// packages/utils/src/format.ts
export function formatCurrency(amount: number, currency = "KRW"): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(date: Date, format = "YYYY-MM-DD"): string {
  // 구현...
}
```

---

## 10. 버전 관리와 배포

### Changesets (권장)

```bash
# 설치
pnpm add -D @changesets/cli -w

# 초기화
pnpm changeset init

# 변경사항 기록
pnpm changeset

# 버전 업데이트
pnpm changeset version

# 배포
pnpm changeset publish
```

```markdown
<!-- .changeset/cool-feature.md -->
---
"@repo/ui": minor
"@repo/utils": patch
---

Button 컴포넌트에 loading 상태 추가
```

### GitHub Actions CI

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile

      # Turborepo 캐시
      - uses: actions/cache@v3
        with:
          path: .turbo
          key: turbo-${{ github.sha }}
          restore-keys: turbo-

      - run: pnpm turbo build lint test --filter=...[origin/main]
```

---

## 핵심 자료

- [Micro Frontends (martinfowler.com)](https://martinfowler.com/articles/micro-frontends.html)
- [Module Federation 예제](https://github.com/module-federation/module-federation-examples)
- [Turborepo 문서](https://turbo.build/repo/docs)
- [Nx 문서](https://nx.dev/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Changesets](https://github.com/changesets/changesets)

---

## Week 20 실습 로드맵 (2시간/일 기준)

---

### Day 1 — 마이크로 프론트엔드 개념

- 마이크로 프론트엔드 아키텍처 이해
- 모놀리식과 비교, 장단점 분석
- 통합 방식 비교 (빌드타임, 런타임, iframe)

### Day 2 — Module Federation 기초

- Webpack 5 Module Federation 설정
- Host/Remote 앱 구성
- 공유 의존성 설정

### Day 3 — MFE 통신과 상태 공유

- 커스텀 이벤트 기반 통신
- 공유 상태 라이브러리 연동
- 에러 처리와 폴백

### Day 4 — 모노레포 기초 (pnpm)

- pnpm workspaces 설정
- 패키지 구조 설계
- workspace 프로토콜 이해

### Day 5 — Turborepo 도입

- Turborepo 설정 및 파이프라인
- 캐싱 전략과 병렬 빌드
- Remote Caching 연동

### Day 6 — 공유 패키지 개발

- UI 컴포넌트 라이브러리 구축
- 공유 설정 패키지 (ESLint, TS)
- 유틸리티 패키지 설계

### Day 7 — 종합 프로젝트

- MFE + 모노레포 통합 아키텍처
- CI/CD 파이프라인 구성
- Changesets로 버전 관리

---

## 최종 목표

- **마이크로 프론트엔드 이해**: 분산 프론트엔드 아키텍처의 개념과 적용 시점을 판단한다.
- **Module Federation 활용**: Webpack/Vite에서 런타임 모듈 공유를 구현한다.
- **모노레포 구축**: pnpm/Turborepo/Nx로 효율적인 모노레포를 운영한다.
- **공유 패키지 설계**: UI, 설정, 유틸리티 패키지를 설계하고 관리한다.
- **자동화**: Changesets와 CI/CD로 버전 관리와 배포를 자동화한다.

---

## 참고

> 마이크로 프론트엔드와 모노레포는 서로 다른 문제를 해결하지만, 함께 사용하면 더욱 강력합니다. 모노레포는 **코드 공유와 일관성**을, 마이크로 프론트엔드는 **독립적 배포와 팀 자율성**을 제공합니다. 두 기술 모두 복잡성을 수반하므로, 프로젝트 규모와 팀 상황을 고려하여 점진적으로 도입하는 것이 좋습니다. "마이크로"라는 이름에 현혹되지 말고, 실제로 필요한 시점에 도입하세요.
