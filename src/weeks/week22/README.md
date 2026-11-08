# Week 22: 에러 트래킹과 프로덕션 모니터링

## 학습 목표

프로덕션 환경에서 발생하는 **에러를 실시간으로 추적**하고, 애플리케이션의 **성능과 사용자 경험을 모니터링**하는 방법을 학습합니다. Sentry, LogRocket 등의 도구를 활용하여 문제를 조기에 발견하고, 데이터 기반으로 개선 방향을 결정하는 역량을 갖춥니다.

**대상**: 프로덕션 서비스 운영 경험이 있거나, 운영 환경을 준비하는 개발자

---

## 1. 왜 프로덕션 모니터링이 필요한가?

**핵심 개념**

- **가시성 (Observability)**: 시스템 내부 상태를 외부에서 파악할 수 있는 능력
- **MTTD (Mean Time To Detect)**: 문제 발견까지 걸리는 평균 시간
- **MTTR (Mean Time To Resolve)**: 문제 해결까지 걸리는 평균 시간
- **SLI/SLO/SLA**: 서비스 수준 지표, 목표, 계약

**프로덕션 모니터링의 필요성**

```
로컬 개발 환경:
✓ console.log로 디버깅
✓ 에러 스택트레이스 즉시 확인
✓ 네트워크 탭으로 요청 확인
✓ 모든 환경 통제 가능

프로덕션 환경:
✗ console.log 볼 수 없음
✗ 사용자가 에러 신고 안 하면 모름
✗ 수천 개의 다양한 브라우저/기기
✗ 네트워크 상태, 확장 프로그램 등 변수
```

**모니터링 없이 발생하는 문제**

| 문제 | 결과 |
|------|------|
| 사일런트 에러 | 사용자가 떠나도 모름 |
| 성능 저하 | 전환율 하락, 원인 불명 |
| 특정 환경 버그 | 재현 불가, 해결 불가 |
| 메모리 누수 | 점진적 성능 저하 |

**학습 자료**
- [Observability 개념 (Datadog)](https://www.datadoghq.com/knowledge-center/observability/)

---

## 2. 에러 트래킹 (Sentry)

### Sentry 소개

Sentry는 가장 널리 사용되는 에러 트래킹 플랫폼으로, 프로덕션 에러를 실시간으로 수집하고 분석합니다.

**핵심 기능**
- 에러 자동 그룹핑
- 소스맵 지원 (난독화된 코드 복원)
- 릴리스 추적
- 사용자 영향도 분석
- 슬랙/이메일 알림

### 설치 및 설정

```bash
npm install @sentry/react @sentry/browser
```

```tsx
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://xxxxx@xxx.ingest.sentry.io/xxxxx",
  environment: import.meta.env.MODE,
  release: import.meta.env.VITE_APP_VERSION,

  // 성능 모니터링
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],

  // 샘플링 비율
  tracesSampleRate: 0.1, // 10% 트레이스 수집
  replaysSessionSampleRate: 0.1, // 10% 세션 리플레이
  replaysOnErrorSampleRate: 1.0, // 에러 발생 시 100% 리플레이

  // 민감 정보 필터링
  beforeSend(event) {
    // PII 제거
    if (event.user) {
      delete event.user.email;
    }
    return event;
  },
});

// React Error Boundary와 통합
const App = () => (
  <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
    <MainApp />
  </Sentry.ErrorBoundary>
);
```

### 수동 에러 캡처

```tsx
import * as Sentry from "@sentry/react";

// try-catch에서 에러 캡처
try {
  await riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      feature: "checkout",
      severity: "critical",
    },
    extra: {
      userId: currentUser.id,
      cartItems: cart.items.length,
    },
  });
}

// 커스텀 메시지
Sentry.captureMessage("결제 실패율 증가 감지", {
  level: "warning",
  tags: { feature: "payment" },
});

// 스코프 설정
Sentry.withScope((scope) => {
  scope.setTag("transaction", "checkout");
  scope.setUser({ id: user.id, username: user.name });
  scope.setContext("order", { orderId, amount });
  Sentry.captureException(error);
});
```

### React 통합

```tsx
import * as Sentry from "@sentry/react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

// React Router 통합
Sentry.init({
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
});

// 컴포넌트 프로파일링
const ProfiledComponent = Sentry.withProfiler(MyComponent);

// 에러 경계
function App() {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <div>
          <h1>오류가 발생했습니다</h1>
          <p>{error.message}</p>
          <button onClick={resetError}>다시 시도</button>
        </div>
      )}
      onError={(error, componentStack) => {
        console.error("Error caught:", error, componentStack);
      }}
    >
      <Router>
        <Routes />
      </Router>
    </Sentry.ErrorBoundary>
  );
}
```

### 소스맵 업로드

```yaml
# .github/workflows/deploy.yml
- name: Upload Source Maps to Sentry
  run: |
    npx @sentry/cli releases new ${{ github.sha }}
    npx @sentry/cli releases files ${{ github.sha }} upload-sourcemaps ./dist
    npx @sentry/cli releases finalize ${{ github.sha }}
    npx @sentry/cli releases deploys ${{ github.sha }} new -e production
  env:
    SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
    SENTRY_ORG: my-org
    SENTRY_PROJECT: my-project
```

```javascript
// vite.config.ts
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    sentryVitePlugin({
      org: "my-org",
      project: "my-project",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
});
```

**학습 자료**
- [Sentry 공식 문서](https://docs.sentry.io/)
- [Sentry React 가이드](https://docs.sentry.io/platforms/javascript/guides/react/)

---

## 3. 세션 리플레이 (LogRocket, Sentry)

### 세션 리플레이란?

사용자의 세션을 **비디오처럼 재생**하여 문제 상황을 정확히 이해할 수 있게 해주는 기능입니다.

```
기존 에러 리포트:
"TypeError: Cannot read property 'name' of undefined"
→ 어떤 상황에서? 어떤 동작 후?

세션 리플레이:
[동영상] 사용자가 상품 목록 → 상세 → 장바구니 → 💥 에러
→ 정확한 재현 경로 파악
```

### Sentry Replay

```tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "...",
  integrations: [
    Sentry.replayIntegration({
      // DOM 요소 마스킹
      maskAllText: false,
      maskAllInputs: true,
      blockAllMedia: false,

      // 네트워크 요청 캡처
      networkDetailAllowUrls: ["/api"],
      networkCaptureBodies: true,
      networkRequestHeaders: ["X-Request-Id"],
      networkResponseHeaders: ["X-Response-Id"],
    }),
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### LogRocket 설정

```bash
npm install logrocket logrocket-react
```

```tsx
// src/main.tsx
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

LogRocket.init("org-id/app-id", {
  release: import.meta.env.VITE_APP_VERSION,

  // 네트워크 요청 필터
  network: {
    requestSanitizer: (request) => {
      if (request.headers.Authorization) {
        request.headers.Authorization = "[REDACTED]";
      }
      return request;
    },
    responseSanitizer: (response) => {
      // 민감 데이터 제거
      return response;
    },
  },

  // DOM 요소 마스킹
  dom: {
    inputSanitizer: true,
    textSanitizer: (text) => {
      // 이메일, 전화번호 마스킹
      return text.replace(/\S+@\S+/g, "[EMAIL]");
    },
  },
});

setupLogRocketReact(LogRocket);

// 사용자 식별
LogRocket.identify(userId, {
  name: user.name,
  email: user.email,
  plan: user.plan,
});
```

### Sentry + LogRocket 통합

```tsx
import LogRocket from "logrocket";
import * as Sentry from "@sentry/react";

LogRocket.getSessionURL((sessionURL) => {
  Sentry.configureScope((scope) => {
    scope.setExtra("sessionURL", sessionURL);
  });
});
```

---

## 4. Real User Monitoring (RUM)

### RUM이란?

실제 사용자의 브라우저에서 성능 데이터를 수집하여 분석하는 기법입니다.

```
합성 모니터링 (Synthetic):     실제 사용자 모니터링 (RUM):
- 통제된 환경                  - 실제 사용자 환경
- 주기적 테스트                - 모든 페이지뷰
- 문제 탐지                    - 실제 경험 측정
```

### Core Web Vitals 수집

```tsx
// src/utils/vitals.ts
import { onCLS, onFID, onLCP, onFCP, onTTFB, onINP } from "web-vitals";
import * as Sentry from "@sentry/react";

function sendToAnalytics(metric: Metric) {
  // Sentry로 전송
  Sentry.captureMessage("Web Vital", {
    level: "info",
    tags: {
      metric_name: metric.name,
      metric_rating: metric.rating,
    },
    extra: {
      value: metric.value,
      delta: metric.delta,
      id: metric.id,
    },
  });

  // Google Analytics로 전송
  gtag("event", metric.name, {
    event_category: "Web Vitals",
    value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    event_label: metric.id,
    non_interaction: true,
  });
}

export function reportWebVitals() {
  onCLS(sendToAnalytics);
  onFID(sendToAnalytics);
  onLCP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
  onINP(sendToAnalytics);
}
```

```tsx
// src/main.tsx
import { reportWebVitals } from "./utils/vitals";

reportWebVitals();
```

### 커스텀 성능 측정

```tsx
// 컴포넌트 렌더링 시간 측정
function useRenderTracking(componentName: string) {
  const startTime = useRef(performance.now());

  useEffect(() => {
    const duration = performance.now() - startTime.current;

    Sentry.addBreadcrumb({
      category: "render",
      message: `${componentName} rendered`,
      data: { duration },
      level: "info",
    });

    // 임계값 초과 시 경고
    if (duration > 100) {
      Sentry.captureMessage(`Slow render: ${componentName}`, {
        level: "warning",
        extra: { duration },
      });
    }
  }, [componentName]);
}

// API 호출 시간 측정
async function trackedFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const transaction = Sentry.startTransaction({
    name: `fetch ${url}`,
    op: "http.client",
  });

  try {
    const start = performance.now();
    const response = await fetch(url, options);
    const duration = performance.now() - start;

    transaction.setData("http.response.status_code", response.status);
    transaction.setData("duration", duration);

    return response.json();
  } catch (error) {
    transaction.setStatus("internal_error");
    throw error;
  } finally {
    transaction.finish();
  }
}
```

---

## 5. 사용자 분석 (Analytics)

### Google Analytics 4 설정

```bash
npm install gtag.js  # 또는 직접 스크립트 삽입
```

```tsx
// src/utils/analytics.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function initGA(measurementId: string) {
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false, // SPA에서는 수동으로 처리
  });
}

// 페이지뷰 추적
export function trackPageView(path: string, title?: string) {
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
  });
}

// 이벤트 추적
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

// 전환 추적
export function trackConversion(transactionId: string, value: number) {
  window.gtag("event", "purchase", {
    transaction_id: transactionId,
    value: value,
    currency: "KRW",
  });
}
```

### React Router 통합

```tsx
// src/App.tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView } from "./utils/analytics";

function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return <Routes />;
}
```

### 이벤트 트래킹 설계

```tsx
// src/utils/events.ts
type AnalyticsEvent =
  | { type: "product_view"; productId: string; category: string }
  | { type: "add_to_cart"; productId: string; quantity: number; price: number }
  | { type: "checkout_start"; cartValue: number; itemCount: number }
  | { type: "checkout_complete"; orderId: string; value: number }
  | { type: "search"; query: string; resultCount: number }
  | { type: "error"; errorType: string; message: string };

export function track(event: AnalyticsEvent) {
  switch (event.type) {
    case "product_view":
      window.gtag("event", "view_item", {
        items: [{ item_id: event.productId, item_category: event.category }],
      });
      break;

    case "add_to_cart":
      window.gtag("event", "add_to_cart", {
        currency: "KRW",
        value: event.price * event.quantity,
        items: [{ item_id: event.productId, quantity: event.quantity }],
      });
      break;

    case "checkout_complete":
      window.gtag("event", "purchase", {
        transaction_id: event.orderId,
        value: event.value,
        currency: "KRW",
      });
      break;

    // ... 기타 이벤트
  }

  // 다른 분석 서비스로도 전송
  if (window.mixpanel) {
    window.mixpanel.track(event.type, event);
  }
}
```

### 사용 예시

```tsx
// 컴포넌트에서 사용
function ProductCard({ product }) {
  const handleClick = () => {
    track({
      type: "product_view",
      productId: product.id,
      category: product.category,
    });
  };

  const handleAddToCart = () => {
    track({
      type: "add_to_cart",
      productId: product.id,
      quantity: 1,
      price: product.price,
    });
  };

  return (
    <div onClick={handleClick}>
      <h2>{product.name}</h2>
      <button onClick={handleAddToCart}>장바구니 담기</button>
    </div>
  );
}
```

---

## 6. 알림과 대시보드

### Slack 알림 설정

```typescript
// Sentry 알림 규칙 (Sentry 대시보드에서 설정)
// Settings → Alerts → Create Alert Rule

// 조건 예시:
// - 새로운 이슈 발생 시
// - 1시간 내 동일 이슈 10회 이상
// - 특정 태그 (environment: production)
```

### 커스텀 알림 시스템

```typescript
// src/utils/alerting.ts
import * as Sentry from "@sentry/react";

type AlertLevel = "info" | "warning" | "critical";

interface Alert {
  level: AlertLevel;
  title: string;
  message: string;
  context?: Record<string, any>;
}

async function sendSlackAlert(alert: Alert) {
  const webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL;

  const color = {
    info: "#36a64f",
    warning: "#ff9500",
    critical: "#ff0000",
  }[alert.level];

  await fetch(webhookUrl, {
    method: "POST",
    body: JSON.stringify({
      attachments: [
        {
          color,
          title: alert.title,
          text: alert.message,
          fields: Object.entries(alert.context || {}).map(([key, value]) => ({
            title: key,
            value: String(value),
            short: true,
          })),
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    }),
  });
}

// 사용 예시
export async function alertOnCriticalError(error: Error, context: any) {
  // Sentry에 기록
  Sentry.captureException(error, { extra: context });

  // Slack 알림
  await sendSlackAlert({
    level: "critical",
    title: "🚨 Critical Error",
    message: error.message,
    context: {
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...context,
    },
  });
}
```

### 대시보드 구성

```
권장 대시보드 지표:

📊 에러 메트릭
├── 시간당 에러 수
├── 에러 유형별 분포
├── 영향받은 사용자 수
└── 가장 빈번한 에러 TOP 10

🚀 성능 메트릭
├── Core Web Vitals (LCP, FID, CLS)
├── 페이지별 로드 시간
├── API 응답 시간
└── JavaScript 에러율

👥 사용자 메트릭
├── DAU/MAU
├── 전환율 (퍼널 분석)
├── 이탈률
└── 세션 지속 시간
```

---

## 7. 에러 처리 모범 사례

### 전역 에러 핸들러

```tsx
// src/utils/errorHandler.ts
import * as Sentry from "@sentry/react";

// 전역 에러 핸들러
window.onerror = (message, source, lineno, colno, error) => {
  Sentry.captureException(error || new Error(String(message)), {
    extra: { source, lineno, colno },
  });
};

// Promise 거부 핸들러
window.onunhandledrejection = (event) => {
  Sentry.captureException(event.reason, {
    tags: { type: "unhandledrejection" },
  });
};

// fetch 에러 래퍼
export async function safeFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
      Sentry.captureException(error, {
        extra: { url, status: response.status },
      });
      throw error;
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      // 네트워크 에러
      Sentry.captureException(error, {
        tags: { errorType: "network" },
        extra: { url },
      });
    }
    throw error;
  }
}
```

### Error Boundary 계층화

```tsx
// src/components/ErrorBoundary.tsx
import * as Sentry from "@sentry/react";

// 페이지 레벨 에러 경계
export function PageErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="error-page">
          <h1>페이지를 불러올 수 없습니다</h1>
          <p>잠시 후 다시 시도해 주세요.</p>
          <button onClick={resetError}>다시 시도</button>
          <button onClick={() => window.location.reload()}>
            페이지 새로고침
          </button>
        </div>
      )}
      beforeCapture={(scope) => {
        scope.setTag("errorBoundary", "page");
      }}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}

// 컴포넌트 레벨 에러 경계
export function ComponentErrorBoundary({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <Sentry.ErrorBoundary
      fallback={
        fallback || (
          <div className="component-error">
            이 콘텐츠를 불러올 수 없습니다.
          </div>
        )
      }
      beforeCapture={(scope) => {
        scope.setTag("errorBoundary", "component");
      }}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}

// 사용 예시
function App() {
  return (
    <PageErrorBoundary>
      <Header />
      <main>
        <ComponentErrorBoundary>
          <ProductList />
        </ComponentErrorBoundary>
        <ComponentErrorBoundary>
          <Recommendations />
        </ComponentErrorBoundary>
      </main>
      <Footer />
    </PageErrorBoundary>
  );
}
```

### 에러 분류와 대응

```typescript
// src/utils/errorClassification.ts
enum ErrorSeverity {
  LOW = "low",        // 무시해도 되는 에러
  MEDIUM = "medium",  // 기능 저하
  HIGH = "high",      // 주요 기능 장애
  CRITICAL = "critical", // 서비스 불가
}

function classifyError(error: Error): ErrorSeverity {
  // 네트워크 에러 (일시적)
  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return ErrorSeverity.LOW;
  }

  // 결제 관련 에러
  if (error.message.includes("payment") || error.message.includes("checkout")) {
    return ErrorSeverity.CRITICAL;
  }

  // 인증 에러
  if (error.message.includes("auth") || error.message.includes("401")) {
    return ErrorSeverity.HIGH;
  }

  return ErrorSeverity.MEDIUM;
}

export function handleError(error: Error, context?: Record<string, any>) {
  const severity = classifyError(error);

  Sentry.captureException(error, {
    level: severity === ErrorSeverity.CRITICAL ? "fatal" : "error",
    tags: { severity },
    extra: context,
  });

  // 심각도에 따른 대응
  if (severity === ErrorSeverity.CRITICAL) {
    // 즉시 알림
    sendImmediateAlert(error);
  }
}
```

---

## 8. 개인정보 보호

### 민감 데이터 마스킹

```tsx
// Sentry 설정
Sentry.init({
  beforeSend(event) {
    // 이메일 마스킹
    if (event.user?.email) {
      event.user.email = maskEmail(event.user.email);
    }

    // 요청 데이터에서 민감 정보 제거
    if (event.request?.data) {
      const data = JSON.parse(event.request.data);
      delete data.password;
      delete data.creditCard;
      delete data.ssn;
      event.request.data = JSON.stringify(data);
    }

    return event;
  },

  beforeBreadcrumb(breadcrumb) {
    // 민감한 URL 필터링
    if (breadcrumb.category === "navigation") {
      if (breadcrumb.data?.from?.includes("password")) {
        return null;
      }
    }

    // 콘솔 로그 필터링
    if (breadcrumb.category === "console") {
      if (breadcrumb.message?.includes("token")) {
        return null;
      }
    }

    return breadcrumb;
  },

  // 민감한 필드 자동 스크러빙
  denyUrls: [
    /\/api\/auth/,
    /\/api\/payment/,
  ],
});

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  return `${local[0]}***@${domain}`;
}
```

### GDPR 준수

```tsx
// 사용자 동의 기반 초기화
function initializeMonitoring(consent: UserConsent) {
  if (consent.analytics) {
    initGA(GA_ID);
  }

  if (consent.errorTracking) {
    Sentry.init({
      dsn: SENTRY_DSN,
      // 동의에 따른 기능 활성화
      integrations: consent.sessionReplay
        ? [Sentry.replayIntegration()]
        : [],
    });
  }
}

// 데이터 삭제 요청 처리
async function handleDataDeletionRequest(userId: string) {
  // Sentry 사용자 데이터 삭제
  await fetch(`https://sentry.io/api/0/projects/.../users/${userId}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${SENTRY_API_TOKEN}` },
  });

  // 분석 데이터 삭제
  await deleteUserAnalyticsData(userId);
}
```

---

## 핵심 자료

- [Sentry 공식 문서](https://docs.sentry.io/)
- [LogRocket 문서](https://docs.logrocket.com/)
- [Google Analytics 4 가이드](https://developers.google.com/analytics)
- [Web Vitals 측정](https://web.dev/vitals/)

---

## Week 22 실습 로드맵 (2시간/일 기준)

---

### Day 1 — 에러 트래킹 기초 (Sentry)

- Sentry 계정 생성 및 프로젝트 설정
- React 앱에 Sentry SDK 연동
- 테스트 에러 발생 및 대시보드 확인

### Day 2 — Sentry 심화

- 소스맵 업로드 설정
- 릴리스 추적
- Error Boundary 통합

### Day 3 — 세션 리플레이

- Sentry Replay 또는 LogRocket 설정
- 민감 데이터 마스킹
- 세션 리플레이로 버그 분석

### Day 4 — Real User Monitoring

- Core Web Vitals 수집 구현
- 커스텀 성능 메트릭 추가
- 성능 대시보드 구성

### Day 5 — 사용자 분석

- Google Analytics 4 설정
- 페이지뷰 및 이벤트 트래킹
- 전환 퍼널 설계

### Day 6 — 알림과 대응

- Slack 알림 설정
- 에러 심각도 분류 체계
- 에러 대응 플레이북 작성

### Day 7 — 종합 모니터링 구축

- 전체 모니터링 시스템 통합
- 개인정보 보호 검토
- 팀 문서화 및 온보딩 자료 작성

---

## 최종 목표

- **에러 트래킹 구축**: Sentry로 프로덕션 에러를 실시간 모니터링한다.
- **세션 리플레이 활용**: 사용자 세션을 재생하여 문제를 정확히 분석한다.
- **성능 모니터링**: Core Web Vitals과 커스텀 메트릭을 수집하고 분석한다.
- **사용자 분석**: 이벤트 트래킹으로 사용자 행동을 이해한다.
- **알림 체계 구축**: 심각도에 따른 알림과 대응 프로세스를 운영한다.
- **개인정보 보호**: GDPR 등 규정을 준수하며 데이터를 수집한다.

---

## 참고

> 프로덕션 모니터링은 "사후 대응"이 아닌 "사전 예방"을 위한 것입니다. 에러가 발생하기 전에 경고 신호를 파악하고, 사용자가 불편을 느끼기 전에 문제를 해결하는 것이 목표입니다. 좋은 모니터링 시스템은 **가시성**을 높여 팀이 데이터 기반의 의사결정을 할 수 있게 합니다. 단, 모든 것을 추적하려 하지 말고, **행동 가능한 인사이트**를 제공하는 핵심 지표에 집중하세요. 그리고 개인정보 보호를 항상 최우선으로 고려하세요.
