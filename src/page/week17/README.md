# Week 17: AI 기반 개발 도구와 협업

**목표:**

최신 프론트엔드 개발에서 핵심 경쟁력으로 부상한 **AI 코드 에이전트**를 효과적으로 활용하는 방법을 학습한다.

GitHub Copilot, Cursor, Claude Code 등의 도구와 **MCP(Model Context Protocol)**, **Skills**, **Hooks** 등 최신 확장 기능을 통해

**자율적 태스크 수행**, **외부 서비스 연동**, **워크플로우 자동화**를 달성하면서도,

**AI의 한계를 인식**하고 **인간의 검증과 창의적 사고**를 결합하는 방법을 체득한다.

---

# 1. AI 코드 에이전트의 이해

---

## 1) AI 도구에서 AI 에이전트로의 진화

2024년까지의 AI 도구는 **단순 자동완성** 수준이었다면,
2025-2026년의 AI 에이전트는 **자율적으로 태스크를 수행**하는 수준으로 발전했다.

### AI 도구 (2023-2024)

- 코드 자동완성
- 단일 파일 내 제안
- 수동 프롬프트 필요
- 제한된 컨텍스트

### AI 에이전트 (2025-2026)

- **자율적 태스크 수행**: 목표만 주면 스스로 계획하고 실행
- **멀티파일 편집**: 프로젝트 전체를 인식하고 수정
- **외부 도구 연동**: MCP를 통한 DB, API, 브라우저 등 접근
- **반복적 자기 개선**: 실패 시 스스로 수정하고 재시도
- **워크플로우 자동화**: 커밋, PR, 배포까지 일괄 처리

---

## 2) 주요 AI 개발 도구 비교 (2025-2026)

| 도구 | 특징 | 에이전트 기능 | MCP 지원 |
|------|------|--------------|---------|
| **Claude Code** | CLI 기반 에이전트 | 완전 자율 수행, 서브에이전트 | 완벽 지원 |
| **Cursor** | AI-네이티브 IDE | Composer 멀티파일, Agent Mode | 지원 |
| **GitHub Copilot** | VS Code 통합 | Copilot Workspace, Agent | 제한적 |
| **Windsurf** | AI IDE | Cascade 에이전트 | 지원 |
| **Cline** | VS Code 확장 | 자율 에이전트 | 지원 |
| **Aider** | CLI 도구 | Git 통합 에이전트 | 미지원 |

---

## 3) AI 에이전트의 핵심 역량과 한계

### AI 에이전트가 잘하는 것

- **복잡한 리팩토링**: 수십 개 파일 동시 수정
- **마이그레이션 작업**: 버전 업그레이드, 라이브러리 교체
- **보일러플레이트 생성**: 프로젝트 구조 자동 생성
- **디버깅**: 에러 추적, 로그 분석, 수정 적용
- **문서화**: 코드 분석 후 문서 자동 생성

### 여전히 인간이 해야 하는 것

- **아키텍처 결정**: 기술 선택, 설계 방향
- **비즈니스 로직 검증**: 도메인 지식 기반 판단
- **보안 최종 검토**: 민감 정보, 취약점 확인
- **사용자 경험 판단**: 디자인, UX 결정
- **최종 승인**: 모든 변경사항 검토

---

# 2. MCP (Model Context Protocol)

---

## 1) MCP란 무엇인가?

**MCP(Model Context Protocol)**는 AI 에이전트가 외부 도구와 데이터 소스에 접근할 수 있게 해주는 **표준 프로토콜**이다.

```
┌─────────────┐      MCP      ┌─────────────┐
│  AI Agent   │◄────────────►│  MCP Server │
│ (Claude등)  │   Protocol   │ (도구/데이터) │
└─────────────┘              └─────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
               [Database]    [Browser]    [External API]
```

### MCP의 핵심 개념

- **MCP Server**: 특정 기능을 제공하는 서버 (DB 접근, 웹 검색 등)
- **MCP Client**: AI 에이전트가 MCP 서버에 연결하는 클라이언트
- **Tools**: MCP 서버가 제공하는 실행 가능한 기능
- **Resources**: MCP 서버가 제공하는 데이터 소스

---

## 2) 주요 MCP 서버 종류

### 데이터베이스 연동

```json
// Claude Code 설정 예시 (~/.claude/settings.json)
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost:5432/mydb"
      }
    }
  }
}
```

```bash
# 사용 예시
claude "users 테이블에서 최근 7일간 가입한 사용자 통계를 조회해줘"
# → AI가 직접 DB 쿼리 실행
```

### 웹 브라우저 제어

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright"]
    }
  }
}
```

```bash
# 사용 예시
claude "localhost:3000에서 로그인 플로우를 테스트하고 스크린샷 찍어줘"
# → AI가 브라우저 열고 직접 테스트
```

### 외부 API 연동

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxx"
      }
    }
  }
}
```

```bash
# 사용 예시
claude "이 브랜치로 PR 만들고, 관련 이슈에 코멘트 달아줘"
# → AI가 GitHub API 직접 호출
```

### 문서 검색 (Context7)

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@context7/mcp-server"]
    }
  }
}
```

```bash
# 사용 예시
claude "Next.js 15의 새로운 캐싱 동작에 대해 공식 문서를 참고해서 설명해줘"
# → AI가 최신 문서 검색 후 답변
```

---

## 3) MCP 서버 직접 만들기

프로젝트 특화 MCP 서버를 만들어 AI 에이전트의 능력을 확장할 수 있다.

### TypeScript MCP 서버 예시

```typescript
// my-mcp-server/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "my-project-tools",
  version: "1.0.0",
}, {
  capabilities: {
    tools: {},
  },
});

// 커스텀 도구 정의
server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "deploy_preview",
      description: "Vercel에 프리뷰 배포를 실행합니다",
      inputSchema: {
        type: "object",
        properties: {
          branch: { type: "string", description: "배포할 브랜치" },
        },
        required: ["branch"],
      },
    },
  ],
}));

server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "deploy_preview") {
    const { branch } = request.params.arguments;
    // Vercel CLI 호출 로직
    return { content: [{ type: "text", text: `${branch} 배포 완료` }] };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

```json
// 설정에 추가
{
  "mcpServers": {
    "my-project": {
      "command": "npx",
      "args": ["tsx", "./my-mcp-server/index.ts"]
    }
  }
}
```

---

## 4) MCP 활용 실전 시나리오

### 풀스택 개발 자동화

```bash
claude "사용자 프로필 편집 기능을 추가해줘:
       1. DB에 필요한 컬럼 추가
       2. API 엔드포인트 구현
       3. React 컴포넌트 작성
       4. 브라우저에서 테스트"

# AI가 실행하는 작업:
# 1. Postgres MCP로 ALTER TABLE 실행
# 2. 코드 작성 및 파일 저장
# 3. Playwright MCP로 브라우저 테스트
# 4. 결과 리포트 생성
```

### 데이터 기반 코드 생성

```bash
claude "DB 스키마를 분석해서 모든 테이블에 대한
       TypeScript 타입과 Prisma 스키마를 생성해줘"

# AI가 실행하는 작업:
# 1. Postgres MCP로 information_schema 조회
# 2. 타입 정의 파일 생성
# 3. Prisma 스키마 생성
# 4. 기존 코드와 일관성 검증
```

---

# 3. Skills와 Hooks

---

## 1) Skills: 재사용 가능한 워크플로우

**Skills**는 자주 사용하는 복잡한 작업을 정의하고 재사용할 수 있게 해주는 기능이다.

### Skill 정의 예시

```markdown
<!-- .claude/skills/create-component/SKILL.md -->
# Create Component Skill

## 트리거
사용자가 "컴포넌트 만들어줘" 또는 "/component" 입력 시

## 워크플로우
1. 컴포넌트 이름과 위치 확인
2. 프로젝트의 기존 컴포넌트 패턴 분석
3. 동일한 패턴으로 새 컴포넌트 생성:
   - TypeScript 인터페이스
   - 스타일 파일 (CSS Modules / Tailwind)
   - 테스트 파일
   - Storybook 스토리
4. barrel export 업데이트
```

### Skill 사용

```bash
# 슬래시 명령어로 호출
claude "/component UserAvatar"

# 또는 자연어로
claude "UserAvatar 컴포넌트 만들어줘"
```

### 실용적인 Skill 예시들

```markdown
<!-- /commit skill -->
# 변경사항 분석 후 컨벤셔널 커밋 메시지 생성

<!-- /review-pr skill -->
# PR 코드 리뷰 및 개선 제안

<!-- /migrate skill -->
# 라이브러리 버전 마이그레이션 가이드

<!-- /docs skill -->
# 코드 분석 후 문서 자동 생성
```

---

## 2) Hooks: 이벤트 기반 자동화

**Hooks**는 특정 이벤트 발생 시 자동으로 실행되는 스크립트다.

### Hook 종류

| Hook | 실행 시점 | 용도 |
|------|----------|------|
| `PreToolUse` | 도구 실행 전 | 위험한 명령 차단, 로깅 |
| `PostToolUse` | 도구 실행 후 | 결과 검증, 알림 |
| `Notification` | 사용자 응답 대기 시 | 슬랙/디스코드 알림 |
| `Stop` | 에이전트 종료 시 | 정리 작업, 리포트 |

### Hook 설정 예시

```json
// .claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo '실행 명령: $TOOL_INPUT' >> ~/.claude/audit.log"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx eslint --fix $FILE_PATH"
          }
        ]
      }
    ],
    "Notification": [
      {
        "type": "command",
        "command": "osascript -e 'display notification \"Claude 응답 대기 중\" with title \"Claude Code\"'"
      }
    ]
  }
}
```

### 실용적인 Hook 활용

```json
// 파일 저장 후 자동 포맷팅
{
  "PostToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "command",
          "command": "prettier --write $FILE_PATH"
        }
      ]
    }
  ]
}

// 위험한 명령 차단
{
  "PreToolUse": [
    {
      "matcher": "Bash",
      "hooks": [
        {
          "type": "command",
          "command": "if echo '$TOOL_INPUT' | grep -q 'rm -rf /'; then exit 1; fi"
        }
      ]
    }
  ]
}
```

---

## 3) CLAUDE.md: 프로젝트 컨텍스트 정의

**CLAUDE.md**는 AI 에이전트에게 프로젝트 컨텍스트를 제공하는 파일이다.

```markdown
<!-- CLAUDE.md -->
# 프로젝트: E-commerce Platform

## 기술 스택
- Next.js 15 (App Router)
- TypeScript 5.x
- Tailwind CSS + shadcn/ui
- Prisma + PostgreSQL
- TanStack Query v5

## 코드 컨벤션
- 컴포넌트: PascalCase, 폴더별 index.ts barrel export
- 훅: use 접두사, src/hooks 폴더
- 타입: src/types 폴더, interface 선호
- 테스트: __tests__ 폴더, *.test.tsx

## 중요 규칙
- 서버 컴포넌트 기본, 클라이언트는 'use client' 명시
- API 라우트는 src/app/api 하위에 구성
- 환경변수는 .env.local (커밋 금지)

## 자주 사용하는 명령어
- `pnpm dev`: 개발 서버
- `pnpm test`: 테스트 실행
- `pnpm lint`: 린트 검사
```

---

# 4. 에이전트 모드 실전 활용

---

## 1) Claude Code 에이전트 모드

### 기본 사용법

```bash
# 단순 질문
claude "이 함수가 뭘 하는지 설명해줘"

# 에이전트 태스크
claude "사용자 인증 기능을 구현해줘" --agent

# 백그라운드 실행
claude "테스트 전체 실행하고 실패하면 수정해줘" --background
```

### Plan 모드 활용

```bash
claude "대규모 리팩토링이 필요해" --plan

# AI가 먼저 계획을 세우고 승인을 요청
# 1. 영향받는 파일 목록
# 2. 변경 순서
# 3. 예상 위험도
# 승인 후 실행
```

### 서브에이전트 활용

```bash
claude "이 프로젝트의 성능을 분석하고 개선해줘"

# 메인 에이전트가 서브에이전트 생성:
# - Explore 에이전트: 코드베이스 분석
# - Bash 에이전트: 벤치마크 실행
# - Plan 에이전트: 개선 계획 수립
```

---

## 2) Cursor Agent Mode

### Composer 에이전트

```
Cmd+I로 Composer 열기

프롬프트:
"@codebase 전체를 분석해서
사용하지 않는 의존성을 찾아 제거하고,
package.json 정리해줘"

# Cursor가 자동으로:
# 1. 모든 import 문 분석
# 2. package.json과 비교
# 3. 미사용 패키지 식별
# 4. 제거 및 lockfile 업데이트
```

### Rules 설정

```markdown
<!-- .cursor/rules -->
## 코드 스타일
- 항상 TypeScript strict 모드 준수
- 함수형 컴포넌트만 사용
- any 타입 금지

## 자동 작업
- 파일 생성 시 테스트 파일도 함께 생성
- import 정리는 항상 실행

## 금지 사항
- console.log 프로덕션 코드에 금지
- inline 스타일 금지
```

---

## 3) 멀티 에이전트 협업

### 복잡한 태스크 분할

```bash
# 하나의 요청이 여러 에이전트로 분할 실행
claude "새로운 결제 시스템을 구현해줘:
       - Stripe 연동
       - 웹훅 처리
       - 결제 내역 DB 저장
       - 관리자 대시보드"

# 실행 흐름:
# 1. Plan 에이전트: 전체 아키텍처 설계
# 2. Explore 에이전트: 기존 코드 패턴 분석
# 3. Code 에이전트: 구현 (병렬 실행)
#    - API 라우트 구현
#    - DB 스키마 생성
#    - 프론트엔드 컴포넌트
# 4. Test 에이전트: 테스트 작성 및 실행
# 5. Review 에이전트: 코드 품질 검증
```

---

# 5. 프롬프트 엔지니어링 고급

---

## 1) 에이전트 친화적 프롬프트

### 목표 중심 프롬프트

```
// 나쁜 예 (단계별 지시)
"1. 먼저 파일을 읽어
 2. 그 다음 함수를 찾아
 3. 타입을 추가해"

// 좋은 예 (목표 중심)
"이 모듈의 모든 함수에 TypeScript 타입을 추가해줘.
기존 동작은 변경하지 말고, 타입 추론이 가능한 곳은 명시하지 않아도 돼."
```

### 컨텍스트 참조

```bash
# 파일 직접 참조
claude "src/utils/validation.ts 파일의 함수들을 리팩토링해줘"

# 패턴 참조
claude "@src/components/Button 과 같은 패턴으로 Input 컴포넌트 만들어줘"

# 문서 참조
claude "README의 API 문서를 보고 클라이언트 코드 생성해줘"
```

### 제약 조건 명시

```bash
claude "인증 미들웨어를 구현해줘.
       제약:
       - 외부 라이브러리 사용 금지 (jose만 허용)
       - 기존 User 타입 활용
       - 에러는 커스텀 AppError로 throw"
```

---

## 2) 반복적 개선 패턴

### 점진적 구체화

```bash
# 1차: 큰 그림
claude "결제 시스템 아키텍처를 설계해줘"

# 2차: 세부 구현
claude "방금 설계한 아키텍처에서
       PaymentService 클래스를 구현해줘"

# 3차: 엣지 케이스
claude "결제 실패 시 재시도 로직과
       부분 환불 케이스를 추가해줘"
```

### 피드백 기반 수정

```bash
# 결과 확인 후
claude "방금 만든 코드에서:
       - 에러 핸들링이 너무 단순해
       - 로깅이 없어
       - 타입이 any로 되어있는 부분 수정해줘"
```

---

# 6. 실전 워크플로우

---

## 1) 기능 개발 워크플로우

```bash
# 1. 요구사항 분석
claude "PRD.md를 읽고 필요한 기술적 작업 목록을 만들어줘"

# 2. 설계
claude "작업 목록을 바탕으로 구현 계획을 세워줘" --plan

# 3. 구현
claude "승인된 계획대로 구현해줘"

# 4. 테스트
claude "구현한 기능에 대한 테스트를 작성하고 실행해줘"

# 5. 리뷰
claude "변경사항을 리뷰하고 개선점을 제안해줘"

# 6. 커밋
claude "/commit"  # skill 사용
```

---

## 2) 버그 수정 워크플로우

```bash
# 에러 정보와 함께 요청
claude "이 에러를 수정해줘:

       Error: Cannot read property 'user' of undefined
       at AuthGuard (src/guards/auth.guard.ts:15)

       재현 조건: 로그아웃 후 보호된 페이지 접근"

# AI가 수행하는 작업:
# 1. 에러 위치 파악
# 2. 관련 코드 분석
# 3. 원인 진단
# 4. 수정 적용
# 5. 테스트로 검증
```

---

## 3) 코드 리뷰 워크플로우

```bash
# PR 리뷰 요청
claude "현재 브랜치의 변경사항을 main과 비교해서 리뷰해줘.
       특히 확인해줄 것:
       - 보안 취약점
       - 성능 이슈
       - 타입 안정성
       - 테스트 커버리지"

# MCP로 GitHub 연동 시
claude "PR #123을 리뷰하고 코멘트를 달아줘"
```

---

# 7. 검증과 안전한 사용

---

## 1) AI 생성 코드 검증

### 자동 검증 Hook 설정

```json
{
  "PostToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        { "type": "command", "command": "npx tsc --noEmit" },
        { "type": "command", "command": "npx eslint $FILE_PATH" },
        { "type": "command", "command": "npx jest --findRelatedTests $FILE_PATH" }
      ]
    }
  ]
}
```

### 수동 검증 체크리스트

- [ ] 비즈니스 로직이 요구사항과 일치하는가?
- [ ] 기존 코드 패턴과 일관성이 있는가?
- [ ] 보안 취약점이 없는가? (입력 검증, 인증/인가)
- [ ] 성능 문제가 없는가? (N+1, 메모리 누수)
- [ ] 에러 처리가 적절한가?
- [ ] 테스트가 충분한가?

---

## 2) 권한 관리

### 허용 목록 설정

```json
// .claude/settings.json
{
  "permissions": {
    "allowedTools": ["Read", "Write", "Edit", "Glob", "Grep"],
    "deniedTools": ["Bash"],  // 위험한 명령 차단
    "allowedPaths": ["src/**", "tests/**"],
    "deniedPaths": [".env*", "secrets/**"]
  }
}
```

### MCP 서버 권한 제한

```json
{
  "mcpServers": {
    "postgres": {
      "command": "...",
      "env": {
        "DATABASE_URL": "...",
        "READONLY": "true"  // 읽기 전용 모드
      }
    }
  }
}
```

---

## 3) 팀 가이드라인

### AI 도구 사용 정책 예시

```markdown
# AI 개발 도구 사용 가이드라인

## 허용되는 사용
- 보일러플레이트 코드 생성
- 테스트 코드 작성 보조
- 문서화 작업
- 코드 리뷰 보조
- 디버깅 지원

## 필수 검증 사항
- 모든 AI 생성 코드는 수동 리뷰 필수
- 보안 관련 코드는 시니어 개발자 승인 필요
- 프로덕션 배포 전 전체 테스트 통과 확인

## 금지 사항
- 민감한 정보를 프롬프트에 포함
- AI 생성 코드 무검토 커밋
- 프로덕션 DB에 직접 MCP 연결

## 커밋 컨벤션
- AI 보조 시 Co-Authored-By 태그 추가
- 복잡한 AI 생성 코드는 리뷰 코멘트 필수
```

---

# 8. 추천 학습 자료

---

### MCP 공식 문서

https://modelcontextprotocol.io/

### Claude Code 공식 문서

https://docs.anthropic.com/en/docs/claude-code

### Cursor 공식 문서

https://docs.cursor.com/

### GitHub Copilot 공식 문서

https://docs.github.com/en/copilot

### Anthropic Cookbook (MCP 예제)

https://github.com/anthropics/anthropic-cookbook

### MCP 서버 목록

https://github.com/modelcontextprotocol/servers

---

# 9. Week 17 실습 로드맵 (2시간/일 기준)

---

## Day 1 — AI 에이전트 도구 설정

- Claude Code 또는 Cursor 설치
- 기본 에이전트 기능 실습
- CLAUDE.md / .cursor/rules 설정

## Day 2 — MCP 기초

- MCP 개념 이해
- Context7 MCP 서버 연동 (최신 문서 검색)
- 파일시스템 MCP 실습

## Day 3 — MCP 심화

- PostgreSQL 또는 SQLite MCP 연동
- GitHub MCP로 이슈/PR 관리
- Playwright MCP로 브라우저 자동화

## Day 4 — Skills & Hooks 활용

- 커스텀 Skill 정의
- 자주 쓰는 Hook 설정
- 자동 포맷팅/린팅 Hook 구성

## Day 5 — 에이전트 모드 실전

- Plan 모드로 대규모 작업 계획
- 멀티파일 리팩토링 실습
- 서브에이전트 활용

## Day 6 — 워크플로우 자동화

- 기능 개발 전체 플로우 자동화
- PR 생성 및 리뷰 자동화
- CI/CD 연동 시나리오

## Day 7 — 종합 프로젝트

- MCP + Skills + Hooks 통합 환경 구성
- 실제 기능을 AI 에이전트와 함께 구현
- 팀 가이드라인 문서 작성

---

# 10. 최종 목표

- **AI 에이전트 활용**: Claude Code, Cursor 등의 에이전트 모드를 효과적으로 사용할 수 있다.
- **MCP 이해와 활용**: MCP를 통해 AI 에이전트의 능력을 확장하고 외부 서비스와 연동할 수 있다.
- **Skills/Hooks 커스터마이징**: 팀과 프로젝트에 맞는 워크플로우를 자동화할 수 있다.
- **안전한 사용**: AI 생성 코드를 적절히 검증하고 권한을 관리할 수 있다.
- **팀 협업**: AI 도구 사용에 대한 팀 가이드라인을 수립하고 적용할 수 있다.

---

## 참고

> 2025-2026년의 AI 개발 도구는 단순한 코드 완성 도구에서 **자율적으로 태스크를 수행하는 에이전트**로 진화했습니다. MCP를 통해 데이터베이스, 외부 API, 브라우저 등에 접근할 수 있게 되었고, Skills와 Hooks로 워크플로우를 자동화할 수 있습니다. 하지만 이러한 강력한 도구일수록 **인간의 감독과 검증**이 더욱 중요합니다. AI 에이전트는 개발자를 대체하는 것이 아니라, 개발자가 더 높은 수준의 문제에 집중할 수 있게 해주는 **증강 도구**입니다. 최종 책임은 항상 인간에게 있으며, 모든 AI 생성 결과물은 반드시 검토되어야 합니다.
