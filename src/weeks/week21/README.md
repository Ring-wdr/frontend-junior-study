# Week 21: CI/CD와 DevOps 기초

## 학습 목표

프론트엔드 애플리케이션의 **빌드, 테스트, 배포를 자동화**하는 CI/CD 파이프라인을 구축하고 운영하는 방법을 학습합니다. GitHub Actions, Docker, 클라우드 배포 플랫폼(Vercel, Netlify, AWS)을 활용하여 코드 변경이 프로덕션에 안전하게 반영되는 전체 파이프라인을 설계합니다.

**대상**: 수동 배포 경험이 있는 주니어 ~ 배포 자동화를 구축하려는 개발자

---

## 1. CI/CD란?

**핵심 개념**

- **CI (Continuous Integration)**: 코드 변경을 자주 통합하고, 자동으로 빌드/테스트
- **CD (Continuous Delivery)**: 언제든 프로덕션 배포가 가능한 상태 유지
- **CD (Continuous Deployment)**: 모든 변경이 자동으로 프로덕션에 배포

**CI/CD 파이프라인 흐름**

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  코드   │───▶│  빌드   │───▶│ 테스트  │───▶│ 스테이징│───▶│프로덕션 │
│  푸시   │    │         │    │         │    │  배포   │    │  배포   │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
     │              │              │              │              │
     └──────────────┴──────────────┴──────────────┴──────────────┘
                         자동화된 파이프라인
```

**CI/CD의 이점**

| 이점 | 설명 |
|------|------|
| 빠른 피드백 | 코드 문제를 조기에 발견 |
| 일관성 | 동일한 프로세스로 항상 배포 |
| 위험 감소 | 작은 변경 단위로 빈번하게 배포 |
| 개발 속도 향상 | 수동 작업 제거로 생산성 증가 |
| 롤백 용이 | 문제 발생 시 빠르게 이전 버전으로 복구 |

**학습 자료**
- [CI/CD 개념 (Atlassian)](https://www.atlassian.com/continuous-delivery)
- [GitHub Actions 문서](https://docs.github.com/en/actions)

---

## 2. GitHub Actions 기초

### 워크플로우 구조

```yaml
# .github/workflows/ci.yml
name: CI  # 워크플로우 이름

on:       # 트리거 조건
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:      # 전역 환경변수
  NODE_VERSION: 20

jobs:     # 작업 정의
  build:
    runs-on: ubuntu-latest  # 실행 환경
    steps:
      - uses: actions/checkout@v4  # 코드 체크아웃
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
      - run: npm ci
      - run: npm run build
```

### 주요 트리거 이벤트

```yaml
on:
  # 푸시 시
  push:
    branches: [main]
    paths:
      - "src/**"
      - "package.json"
    paths-ignore:
      - "**.md"

  # PR 시
  pull_request:
    types: [opened, synchronize, reopened]

  # 수동 실행
  workflow_dispatch:
    inputs:
      environment:
        description: "배포 환경"
        required: true
        default: "staging"
        type: choice
        options:
          - staging
          - production

  # 스케줄 (cron)
  schedule:
    - cron: "0 0 * * *"  # 매일 자정 UTC

  # 다른 워크플로우에서 호출
  workflow_call:
    inputs:
      deploy:
        type: boolean
        required: false
```

### 캐싱

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"  # 자동 캐싱

      # 또는 수동 캐싱
      - uses: actions/cache@v3
        with:
          path: |
            ~/.npm
            node_modules
            .next/cache
          key: ${{ runner.os }}-node-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - run: pnpm install --frozen-lockfile
```

### 매트릭스 빌드

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
        os: [ubuntu-latest, windows-latest]
      fail-fast: false  # 하나 실패해도 나머지 계속

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
```

**학습 자료**
- [GitHub Actions 워크플로우 문법](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

---

## 3. 프론트엔드 CI 파이프라인

### 완전한 CI 워크플로우

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  # 1. 린트 검사
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm format:check

  # 2. 타입 체크
  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck

  # 3. 단위 테스트
  unit-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile
      - run: pnpm test:unit --coverage

      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  # 4. E2E 테스트
  e2e-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      - name: Playwright 설치
        run: pnpm exec playwright install --with-deps

      - name: E2E 테스트 실행
        run: pnpm test:e2e

      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  # 5. 빌드
  build:
    runs-on: ubuntu-latest
    needs: [lint, typecheck, unit-test]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      - uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist/
```

### PR 체크 상태

```yaml
# 필수 체크 설정 (Branch Protection Rules)
# Settings → Branches → Branch protection rules
# - Require status checks to pass before merging
# - Status checks: lint, typecheck, unit-test, build
```

---

## 4. CD: 배포 자동화

### Vercel 자동 배포

```yaml
# .github/workflows/deploy-vercel.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm i -g vercel@latest

      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### AWS S3 + CloudFront 배포

```yaml
# .github/workflows/deploy-aws.yml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      # AWS 자격 증명 (OIDC)
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/GitHubActionsRole
          aws-region: ap-northeast-2

      # S3 동기화
      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} \
            --delete \
            --cache-control "public, max-age=31536000, immutable" \
            --exclude "*.html"
          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} \
            --delete \
            --cache-control "public, max-age=0, must-revalidate" \
            --include "*.html"

      # CloudFront 캐시 무효화
      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

### 환경별 배포 (Staging → Production)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main, develop]

jobs:
  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
        env:
          NEXT_PUBLIC_API_URL: ${{ vars.API_URL }}
      - run: ./deploy.sh staging

  deploy-production:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
        env:
          NEXT_PUBLIC_API_URL: ${{ vars.API_URL }}
      - run: ./deploy.sh production
```

---

## 5. Docker 기초

### 프론트엔드 Dockerfile

```dockerfile
# Dockerfile
# 빌드 스테이지
FROM node:20-alpine AS builder

WORKDIR /app

# pnpm 설치
RUN corepack enable && corepack prepare pnpm@latest --activate

# 의존성 파일 복사 및 설치
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 소스 복사 및 빌드
COPY . .
RUN pnpm build

# 실행 스테이지
FROM nginx:alpine AS runner

# nginx 설정
COPY nginx.conf /etc/nginx/nginx.conf

# 빌드 결과물 복사
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Gzip 압축
        gzip on;
        gzip_types text/plain text/css application/json application/javascript;

        # SPA 라우팅
        location / {
            try_files $uri $uri/ /index.html;
        }

        # 캐싱 설정
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### Next.js Dockerfile

```dockerfile
# Dockerfile.nextjs
FROM node:20-alpine AS base

# 의존성 설치
FROM base AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 빌드
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# 실행
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: "3.8"

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certs:/etc/nginx/certs:ro
    depends_on:
      - web
```

### GitHub Actions에서 Docker 빌드

```yaml
# .github/workflows/docker.yml
name: Docker Build and Push

on:
  push:
    branches: [main]
    tags: ["v*"]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=semver,pattern={{version}}
            type=sha

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

**학습 자료**
- [Docker 공식 문서](https://docs.docker.com/)
- [Docker 멀티스테이지 빌드](https://docs.docker.com/develop/develop-images/multistage-build/)

---

## 6. 시크릿과 환경변수 관리

### GitHub Secrets

```yaml
# 사용법
env:
  API_KEY: ${{ secrets.API_KEY }}

# 환경별 시크릿
jobs:
  deploy:
    environment: production
    env:
      DATABASE_URL: ${{ secrets.DATABASE_URL }}  # 환경별 시크릿
```

### GitHub Environments

```yaml
jobs:
  deploy-staging:
    environment:
      name: staging
      url: https://staging.example.com
    steps:
      - run: echo "Deploying to staging"

  deploy-production:
    needs: deploy-staging
    environment:
      name: production
      url: https://example.com
    steps:
      - run: echo "Deploying to production"
```

### 환경변수 파일 관리

```yaml
# .env.example (버전 관리)
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_GA_ID=

# .github/workflows/deploy.yml
- name: Create .env
  run: |
    echo "NEXT_PUBLIC_API_URL=${{ vars.API_URL }}" >> .env
    echo "NEXT_PUBLIC_GA_ID=${{ secrets.GA_ID }}" >> .env
```

---

## 7. 고급 워크플로우 패턴

### 재사용 가능한 워크플로우

```yaml
# .github/workflows/reusable-build.yml
name: Reusable Build

on:
  workflow_call:
    inputs:
      node-version:
        required: false
        type: string
        default: "20"
    outputs:
      artifact-name:
        value: ${{ jobs.build.outputs.artifact-name }}

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      artifact-name: build-${{ github.sha }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: build-${{ github.sha }}
          path: dist/
```

```yaml
# .github/workflows/main.yml
name: Main

on:
  push:
    branches: [main]

jobs:
  build:
    uses: ./.github/workflows/reusable-build.yml
    with:
      node-version: "20"

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: ${{ needs.build.outputs.artifact-name }}
```

### 조건부 실행

```yaml
jobs:
  changes:
    runs-on: ubuntu-latest
    outputs:
      src: ${{ steps.filter.outputs.src }}
      docs: ${{ steps.filter.outputs.docs }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v2
        id: filter
        with:
          filters: |
            src:
              - 'src/**'
              - 'package.json'
            docs:
              - 'docs/**'

  build:
    needs: changes
    if: needs.changes.outputs.src == 'true'
    runs-on: ubuntu-latest
    steps:
      - run: echo "Building..."

  docs:
    needs: changes
    if: needs.changes.outputs.docs == 'true'
    runs-on: ubuntu-latest
    steps:
      - run: echo "Building docs..."
```

### 수동 배포 승인

```yaml
jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh staging

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment:
      name: production
      # GitHub Settings에서 Required reviewers 설정
    steps:
      - run: ./deploy.sh production
```

### 롤백 워크플로우

```yaml
# .github/workflows/rollback.yml
name: Rollback

on:
  workflow_dispatch:
    inputs:
      version:
        description: "롤백할 버전 (예: v1.2.3)"
        required: true
        type: string

jobs:
  rollback:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Rollback to ${{ inputs.version }}
        run: |
          # Vercel 롤백
          vercel rollback ${{ inputs.version }} --token=${{ secrets.VERCEL_TOKEN }}

          # 또는 Docker 이미지 롤백
          # docker pull ghcr.io/org/app:${{ inputs.version }}
          # docker-compose up -d
```

---

## 8. 보안 모범 사례

### 의존성 보안 검사

```yaml
# .github/workflows/security.yml
name: Security

on:
  schedule:
    - cron: "0 0 * * 1"  # 매주 월요일
  push:
    branches: [main]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: npm audit
        run: npm audit --audit-level=high

      - name: Snyk 검사
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

### Dependabot 설정

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    commit-message:
      prefix: "deps"
    groups:
      dev-dependencies:
        patterns:
          - "*"
        dependency-type: "development"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

### CODEOWNERS

```
# .github/CODEOWNERS
# 전역 소유자
* @team-leads

# 특정 디렉토리
/src/components/ @frontend-team
/infrastructure/ @devops-team
/.github/ @devops-team
```

---

## 핵심 자료

- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Docker 공식 문서](https://docs.docker.com/)
- [Vercel CLI 문서](https://vercel.com/docs/cli)
- [AWS CDK 프론트엔드 배포](https://docs.aws.amazon.com/cdk/latest/guide/home.html)

---

## Week 21 실습 로드맵 (2시간/일 기준)

---

### Day 1 — CI/CD 개념과 GitHub Actions 기초

- CI/CD 개념 이해
- GitHub Actions 워크플로우 구조
- 첫 번째 워크플로우 작성 (Hello World)

### Day 2 — 프론트엔드 CI 파이프라인

- Lint, TypeCheck, Test 자동화
- 캐싱 전략 적용
- PR 체크 상태 설정

### Day 3 — CD: 배포 자동화

- Vercel/Netlify 자동 배포
- 환경별 배포 (staging/production)
- 환경변수 관리

### Day 4 — Docker 기초

- Dockerfile 작성 (멀티스테이지)
- docker-compose 활용
- Docker 이미지 빌드 및 레지스트리 푸시

### Day 5 — 고급 워크플로우

- 재사용 가능한 워크플로우
- 조건부 실행 (paths-filter)
- 수동 배포 승인

### Day 6 — 보안과 모니터링

- 의존성 보안 검사 (npm audit, Snyk)
- Dependabot 설정
- CODEOWNERS 설정

### Day 7 — 종합 프로젝트

- 전체 CI/CD 파이프라인 구축
- 롤백 워크플로우 추가
- 문서화 및 팀 가이드 작성

---

## 최종 목표

- **CI 파이프라인 구축**: 자동 빌드, 린트, 테스트 파이프라인을 설정한다.
- **CD 자동화**: 환경별 자동 배포와 롤백 프로세스를 구현한다.
- **Docker 활용**: 프론트엔드 앱을 컨테이너화하고 배포한다.
- **보안 강화**: 의존성 보안 검사와 시크릿 관리를 적용한다.
- **워크플로우 설계**: 재사용 가능하고 효율적인 파이프라인을 설계한다.

---

## 참고

> CI/CD는 현대 소프트웨어 개발의 필수 요소입니다. "코드를 푸시하면 자동으로 프로덕션에 배포된다"는 목표를 향해, 점진적으로 자동화를 구축하세요. 처음부터 완벽한 파이프라인을 만들려 하지 말고, 가장 반복적인 수동 작업부터 자동화하세요. 빌드 → 테스트 → 배포 순서로 단계적으로 확장하는 것이 좋습니다. CI/CD는 단순히 도구를 설정하는 것이 아니라, **팀의 개발 문화를 바꾸는 것**입니다.
