# Week 17: AI 기반 개발 도구와 협업

AI 코드 에이전트, MCP, Skills, Hooks를 활용한 현대적 개발 워크플로우 마스터하기

> 2026년 11월 기준으로 최신화한 문서입니다. 도구의 명령과 설정은 자주 바뀌므로 실제 사용 전에 공식 문서를 확인하세요.

# 1. AI 코드 에이전트의 이해

> 자동완성 도구에서 자율 에이전트로의 진화, 2026년의 주요 도구와 공통 표준

## AI 도구에서 AI 에이전트로

### AI 도구 (2023-2024)

- 코드 자동완성
- 단일 파일 단위 제안
- 매 단계 직접 프롬프트 입력
- 제한된 컨텍스트

### AI 에이전트 (2025-2026)

- 목표를 전달받아 스스로 계획 수립 및 실행
- 다중 파일 편집 및 셸 명령 실행
- MCP·Skills를 활용한 외부 도구 및 지식 연동
- 테스트·린트 결과를 바탕으로 자체 수정 반복
- 서브에이전트·백그라운드 세션을 통한 병렬 작업

## 주요 AI 개발 도구 (2026년 기준)

- **Claude Code**: Anthropic의 코딩 에이전트. 터미널을 중심으로 IDE·데스크톱·웹에서 동작하며 서브에이전트, Skills, Hooks, 플러그인을 지원
- **Codex**: OpenAI의 코딩 에이전트입니다. CLI·IDE 확장·클라우드 작업을 제공하며 AGENTS.md를 지침 파일로 사용합니다.
- **Cursor**: AI 네이티브 IDE입니다. 에이전트 모드와 .cursor/rules 규칙, AGENTS.md를 지원합니다.
- **GitHub Copilot**: VS Code 에이전트 모드와, 이슈를 맡기면 PR을 만드는 클라우드 코딩 에이전트. Agent HQ로 타사 에이전트도 GitHub에서 실행
- **Antigravity**: Google의 에이전트 개발 플랫폼입니다. 개인 사용자용 Gemini CLI는 2026년 6월 Antigravity CLI로 전환되었습니다.
- **Devin Desktop**: Cognition이 2026년 6월 Windsurf를 리브랜딩한 제품. 로컬·클라우드 에이전트를 한 화면에서 관리하는 방향으로 개편

이 밖에 Cline, Aider, goose 같은 오픈소스 에이전트도 있습니다. 제품명과 요금제, 벤치마크 순위는 몇 달 단위로 바뀌므로 도입 전에 공식 문서를 확인하세요.

## 도구를 아우르는 공통 표준

2025년 12월 Linux Foundation 산하에 Agentic AI Foundation(AAIF)이 출범하면서 MCP, AGENTS.md, goose가 창립 프로젝트로 기증되었습니다. 특정 도구에 묶이지 않는 표준을 익혀 두면 도구가 바뀌어도 설정과 지식을 그대로 가져갈 수 있습니다.

- **MCP**: 에이전트가 외부 도구 및 데이터에 연결할 수 있도록 지원하는 프로토콜입니다. Anthropic이 개발하여 AAIF에 기증했습니다.
- **AGENTS.md**: 프로젝트 지침을 담는 마크다운 파일. OpenAI가 기증했고 Codex, Cursor, Copilot 등이 읽으며, Claude Code도 CLAUDE.md가 없으면 읽음
- **Agent Skills**: SKILL.md 폴더로 절차와 지식을 패키징하는 오픈 표준(agentskills.io). 여러 도구에서 재사용 가능

## AI 에이전트의 역량과 한계

### AI 에이전트가 잘하는 작업

- 다중 파일에 걸친 코드 리팩토링
- 라이브러리 및 프레임워크 마이그레이션
- 보일러플레이트 및 테스트 코드 작성
- 에러 추적 및 디버깅
- 코드베이스 탐색과 문서화

### 인간이 해야 하는 것

- 소프트웨어 아키텍처 및 기술 스택 선정
- 비즈니스 요구사항 검증
- 보안 최종 검토
- 사용자 경험 판단
- 머지와 배포의 최종 승인

> **중요: AI는 도구입니다** AI 에이전트는 개발자를 대체하는 것이 아니라, 개발자가 더 높은 수준의 문제에 집중할 수 있게 해주는 증강 도구입니다. 에이전트가 작성한 코드라도 최종 책임은 항상 그 코드를 머지한 사람에게 있습니다.

## 에이전트에게 작업 위임하기

```bash
# 초기 프롬프트와 함께 대화형 세션 시작
claude "사용자 인증 기능을 구현해줘:
       - JWT 기반 인증과 리프레시 토큰
       - 로그인/로그아웃 API
       - 로그인 폼 컴포넌트
       완료 기준: bun run typecheck 와 bun run test 통과"

# 에이전트가 수행하는 루프:
# 1. 프로젝트 구조와 기존 패턴 탐색
# 2. 필요한 파일 생성/수정
# 3. 타입 체크·테스트 실행
# 4. 실패하면 원인을 읽고 다시 수정
# 5. 완료 기준을 만족하면 결과 보고
```

# 2. MCP (Model Context Protocol)

> AI 에이전트가 외부 도구와 데이터에 접근할 수 있게 돕는 표준 프로토콜

## MCP란 무엇인가요?

MCP는 AI 에이전트가 데이터베이스, 브라우저, 외부 API 같은 시스템과 연결되도록 돕는 표준 프로토콜입니다. MCP 서버가 tools(실행 가능한 기능), resources(조회 가능한 데이터), prompts(재사용 프롬프트)를 제공하면, 에이전트(클라이언트)가 이를 호출해 사용합니다. 로컬 프로세스는 stdio로, 원격 서버는 Streamable HTTP로 연결합니다.

## 2026-07-28 스펙에서 달라진 점

MCP 스펙의 최신 리비전은 2026-07-28입니다. 이전 리비전(2025-11-25)과 비교해 프로토콜의 기본 구조가 변경되었으므로, 서버를 직접 구축하거나 기존 예제를 참고할 때는 리비전을 확인해야 합니다.

- 무상태(stateless) 프로토콜 전환: initialize 핸드셰이크와 Mcp-Session-Id 헤더가 제거되었으며, 모든 요청의 _meta 필드에 프로토콜 버전과 클라이언트 capability를 포함합니다
- server/discover 추가: 서버가 지원하는 버전과 capability를 알려 주는 RPC로, 서버는 반드시 구현해야 합니다
- Tasks 사양 분리: 코어 스펙에서 제외되어 공식 확장(extension)으로 이동했습니다
- Roots, Sampling, Logging은 deprecated 상태입니다. 유예 기간에는 동작하지만 새 구현에서는 쓰지 않습니다
- HTTP+SSE 전송은 deprecated이며 Streamable HTTP로 옮겨야 합니다. stdio는 그대로 유지됩니다

## 자주 쓰는 MCP 서버

- **GitHub** (`https://api.githubcopilot.com/mcp/`): 이슈, PR, 코드 검색 (GitHub 공식 원격 서버)
- **Playwright** (`@playwright/mcp`): 브라우저 자동화 (Microsoft 공식)
- **Chrome DevTools** (`chrome-devtools-mcp`): 콘솔·네트워크·성능 트레이스 디버깅 (Chromium 전용)
- **Context7** (`@upstash/context7-mcp`): 라이브러리 최신 문서 검색
- **DBHub** (`@bytebase/dbhub`): PostgreSQL 등 데이터베이스 조회 (읽기 전용 계정 권장)
- **Sentry** (`https://mcp.sentry.dev/mcp`): 에러 이슈 조회와 분석 (OAuth 인증 원격 서버)

## MCP 설정 방법

Claude Code에서는 claude mcp add 명령어로 서버를 추가합니다. 기본값인 local 스코프는 현재 프로젝트에서 사용자만 단독으로 사용하는 설정으로 ~/.claude.json에 저장되며, project 스코프는 프로젝트 루트의 .mcp.json에 저장되어 git을 통해 팀원과 공유할 수 있습니다. user 스코프는 사용자의 모든 프로젝트에 공통으로 적용됩니다. .mcp.json에 정의된 서버는 최초 사용 시 승인 절차를 거치며, 인증 토큰은 파일에 직접 기재하지 않고 ${VAR} 형태의 환경변수 확장으로 주입합니다.

```bash
# 원격 서버 (HTTP) — GitHub 공식 MCP 서버
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# 로컬 서버 (stdio) — `--` 뒤가 서버 실행 명령
claude mcp add playwright -- npx -y @playwright/mcp@latest

# 팀과 공유하려면 project 스코프 → 프로젝트 루트 .mcp.json 에 저장
claude mcp add --scope project context7 -- npx -y @upstash/context7-mcp

# 관리
claude mcp list
claude mcp remove playwright
# 세션 안에서는 /mcp 로 상태 확인, OAuth 인증, 서버 켜기/끄기
```

```jsonc
// .mcp.json (project 스코프, git 으로 공유)
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": { "Authorization": "Bearer ${GITHUB_PAT}" }
    },
    "db": {
      "command": "npx",
      "args": ["-y", "@bytebase/dbhub", "--dsn", "${READONLY_DATABASE_URL}"]
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

## MCP 활용 예시

```bash
# DB 조회 (읽기 전용 계정)
> users 테이블에서 최근 7일간 가입한 사용자 통계를 조회해줘
# → DB MCP 서버의 쿼리 도구 호출

# 브라우저 확인
> localhost:3000 에서 로그인 플로우를 확인하고 스크린샷을 남겨줘
# → Playwright MCP 로 브라우저 조작

# GitHub 연동
> 이 브랜치로 PR 을 만들고, 관련 이슈에 코멘트를 달아줘
# → GitHub MCP 서버 (또는 gh CLI) 사용

# 문서 검색
> Next.js 16 의 캐싱 동작을 공식 문서 기준으로 설명해줘
# → Context7 로 최신 문서를 찾아 답변
```

### 활용 팁

- 프로젝트에 필요한 서버만 연결하고, 사용하지 않는 서버는 /mcp 명령어에서 비활성화하세요
- MCP 도구 정의는 기본적으로 지연 로드되어 도구 이름과 서버 안내문만 컨텍스트에 올라가지만, gh처럼 CLI가 있는 도구는 CLI가 컨텍스트를 더 적게 씁니다
- 데이터베이스는 읽기 전용 계정으로 연결하고, 프로덕션 DB에는 직접 연결하지 마세요
- SSE 전송 방식을 사용하는 기존 설정은 HTTP 전송 방식으로 마이그레이션하세요

# 3. Skills와 Hooks

> 필요할 때만 로드되는 절차적 지식과, 특정 시점에 반드시 실행되는 이벤트 자동화

## Skills: 재사용 가능한 절차와 지식

Skill은 SKILL.md 파일을 포함한 폴더로, 에이전트에게 특정 작업의 수행 절차와 지식을 안내합니다. Claude는 각 skill의 description을 확인하여 관련 작업일 때 스스로 로드하며, 사용자가 /skill-name으로 직접 호출할 수도 있습니다. 본문은 실제로 호출될 때만 컨텍스트에 포함되므로 긴 참고 자료를 추가해도 평소에는 토큰 비용이 거의 들지 않습니다. 기존의 커스텀 슬래시 명령(.claude/commands)은 skill로 통합되었으며, skill 형식은 Agent Skills 오픈 표준을 따르므로 다른 도구에서도 재사용할 수 있습니다.

### Claude Code 번들 스킬

- `/code-review`: 현재 diff나 PR의 버그를 검토
- `/simplify`: 변경된 코드의 중복과 복잡도를 개선
- `/loop`: 프롬프트나 명령을 일정 간격으로 반복 실행
- `/run`: 앱을 직접 실행하여 변경 사항이 정상 동작하는지 검증

```markdown
<!-- .claude/skills/create-component/SKILL.md -->
---
name: create-component
description: 프로젝트 컨벤션에 맞는 React 컴포넌트를 생성한다. 사용자가 새 컴포넌트를 만들어 달라고 할 때 사용.
argument-hint: [component-name]
---

$ARGUMENTS 컴포넌트를 생성한다.

1. src/components 에서 비슷한 컴포넌트를 찾아 패턴을 확인한다
2. 같은 패턴으로 컴포넌트 파일(kebab-case)을 만든다
3. 테스트 파일을 함께 만든다
4. barrel export(index.ts)를 갱신한다
5. bun run typecheck 와 bun run test 로 검증한다
```

### 주요 frontmatter 필드

- `description`: 수행 작업과 사용 시점 설명. Claude가 로드 여부를 판단하는 기준
- `disable-model-invocation`: true 설정 시 사용자만 직접 호출 가능. 배포처럼 사이드 이펙트가 있는 작업에 사용
- `allowed-tools`: skill이 실행되는 턴 동안 사전 승인할 도구 목록
- `context: fork`: skill을 별도 서브에이전트에서 실행하여 메인 컨텍스트를 보호

## Hooks: 이벤트 기반 자동화

Hook은 에이전트의 수명주기 이벤트가 발생할 때 자동으로 실행되는 핸들러입니다. CLAUDE.md의 지침은 에이전트가 참고하는 컨텍스트일 뿐이지만, hook은 조건이 맞으면 반드시 실행되므로 예외가 있어서는 안 되는 규칙을 강제하는 데 씁니다. 명령(command) hook은 이벤트 정보를 stdin의 JSON으로 받고, 종료 코드 2를 반환하면 해당 동작을 차단합니다. 2가 아닌 오류 코드(1 포함)는 차단하지 않는 오류로 처리되어 동작이 그대로 진행된다는 점에 주의하세요.

| Hook | 실행 시점 | 용도 |
| --- | --- | --- |
| `SessionStart` | 세션 시작 및 재개 시 | 실행 환경 준비, 초기 컨텍스트 주입 |
| `UserPromptSubmit` | 프롬프트 제출 직후, 에이전트 처리 전 | 프롬프트 유효성 검사, 추가 컨텍스트 주입 |
| `PreToolUse` | 도구 실행 전 | 위험한 명령 실행 차단, 입력값 보정 |
| `PostToolUse` | 도구 실행 성공 후 | 코드 자동 포맷팅, 린팅, 테스트 수행 |
| `Notification` | 알림 발생 시 | 데스크톱 및 메신저 알림 발송 |
| `Stop` | 에이전트가 응답을 마쳤을 때 | 완료 기준 검사, 리포트 |
| `PreCompact` | 컨텍스트 압축 전 | 보존할 정보 기록 |

이 외에도 SubagentStop, SessionEnd, PermissionRequest 등 30개가 넘는 이벤트가 있습니다. hook 유형도 셸 명령(command) 외에 http, mcp_tool, prompt, 그리고 실험적인 agent가 있습니다.

```jsonc
// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/format.sh"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/block-rm.sh"
          }
        ]
      }
    ]
  }
}
```

```bash
#!/bin/bash
# .claude/hooks/format.sh — 입력은 stdin 의 JSON
FILE=$(jq -r '.tool_input.file_path')
npx prettier --write "$FILE"

#!/bin/bash
# .claude/hooks/block-rm.sh
COMMAND=$(jq -r '.tool_input.command')
if echo "$COMMAND" | grep -q 'rm -rf'; then
  echo "rm -rf 는 hook 으로 차단되었습니다" >&2
  exit 2   # 2 = 차단. exit 1 은 차단이 아니다
fi
exit 0
```

## CLAUDE.md와 AGENTS.md: 프로젝트 컨텍스트

CLAUDE.md는 매 세션이 시작될 때 로드되는 프로젝트 지침 파일입니다. 빌드·테스트 명령, 코드 컨벤션, 반드시 지킬 규칙처럼 코드만 봐서는 알 수 없는 내용을 적습니다. 항상 컨텍스트를 차지하므로 200줄 이하로 유지하고, 특정 작업에만 필요한 절차는 skill로, 특정 경로에만 적용되는 규칙은 .claude/rules/로 옮깁니다. /init 명령으로 초안을 만들 수 있습니다. 여러 도구를 함께 쓴다면 표준 파일인 AGENTS.md에 지침을 두면 됩니다. Claude Code(v2.1.277 이상)는 CLAUDE.md가 없을 때 AGENTS.md를 읽고, 둘 다 있으면 CLAUDE.md만 읽습니다.

```markdown
<!-- CLAUDE.md -->
# E-commerce Platform

## 명령어
- `bun run dev`: 개발 서버
- `bun run typecheck`: 타입 검사
- `bun run test`: 테스트

## 컨벤션
- 파일명은 kebab-case
- 서버 컴포넌트가 기본, 클라이언트는 'use client' 명시
- 타입은 src/types, interface 선호

## 반드시 지킬 것
- 변경 후 typecheck 와 test 를 통과시킨다
- .env 파일은 읽지도 수정하지도 않는다

<!-- 이미 AGENTS.md 가 있다면 CLAUDE.md 에서 가져올 수 있다 -->
@AGENTS.md
```

# 4. 에이전트 모드 실전 활용

> 권한 모드, plan 모드, 서브에이전트, 에이전트 팀을 상황에 맞게 쓰기

## 기본 사용법

```bash
# 대화형 세션 시작
claude

# 초기 프롬프트와 함께 시작
claude "이 프로젝트 구조를 설명해줘"

# 비대화형(headless) 실행 — 스크립트·CI 용
claude -p "타입 에러를 찾아 수정해줘" --output-format json

# 최근 대화 이어가기 / 이름으로 세션 재개
claude -c
claude -r "auth-refactor"

# 격리된 git worktree 에서 시작
claude -w feature-auth

# 백그라운드 에이전트로 실행하고 agent view 에서 모니터링
claude --bg "테스트 전체를 실행하고 실패하면 수정해줘"
claude agents
```

## 권한 모드

권한 모드는 에이전트가 어떤 동작을 사용자의 승인 없이 수행할 수 있는지 결정합니다. 세션 진행 중에는 Shift+Tab으로 전환하고, 세션을 시작할 때는 --permission-mode 옵션으로 지정합니다.

- `default (Manual)`: 파일 수정과 셸 명령 실행 전에 매번 확인
- `acceptEdits`: 파일 편집은 자동 승인, 그 외에는 확인
- `plan`: 읽기와 탐색만 수행하고 소스코드는 수정하지 않음
- `auto`: 사용자 대신 분류기가 위험한 동작을 검토
- `dontAsk`: 미리 허용한 도구만 실행하고 나머지는 거부
- `bypassPermissions`: 모든 검사를 생략. 격리된 환경에서만 사용

## Plan 모드 활용

대규모 리팩토링이나 새 기능 추가처럼 영향 범위가 큰 작업에서는 plan 모드로 시작하세요. 에이전트가 코드를 읽기만 하면서 접근 방법을 제안하고, 사용자가 승인한 뒤에 구현합니다. 방향이 틀린 채로 구현이 진행되어 다시 작업하는 비용을 줄여 줍니다.

```bash
# plan 모드로 시작 (세션 중에는 Shift+Tab 으로 전환)
claude --permission-mode plan

> 인증 모듈을 세션 방식에서 JWT 로 바꾸려고 해. 계획을 세워줘

# plan 모드에서 에이전트는:
# 1. 파일을 읽고 읽기 전용 명령으로 탐색만 한다 (소스 수정 없음)
# 2. 영향받는 파일, 변경 순서, 위험 요소를 계획으로 제시한다
# 3. 사용자가 승인하면 plan 모드를 벗어나 구현을 시작한다
```

## 인터뷰 패턴

인터뷰는 별도의 모드나 플래그가 아니라 프롬프트 패턴입니다. 무엇을 만들지 아직 구체화되지 않았다면, 에이전트에게 스펙을 작성할 수 있을 때까지 본인을 인터뷰해 달라고 요청하세요. 에이전트가 결정되지 않은 부분을 객관식 질문으로 하나씩 묻고, 답변이 모이면 스펙 문서로 정리해 줍니다.

```bash
# 전용 플래그는 없다 — 프롬프트로 요청한다
> 공개 API 에 rate limiting 을 추가하고 싶은데 아직 정리가 안 됐어.
  스펙을 쓸 수 있을 때까지 나를 인터뷰하고, 끝나면 SPEC.md 로 정리해줘.

# 에이전트가 객관식 질문으로 미정 사항을 묻는다:
# - 사용자별 제한인가, API 키별 제한인가?
# - 한도를 넘은 요청은 어떻게 처리하는가?
# - 이번 범위에서 제외할 것은?

# SPEC.md 가 생기면 새 세션에서 구현을 시작한다
claude "SPEC.md 를 읽고 구현해줘"
```

스펙 문서가 완성되면 새 세션에서 구현을 시작하세요. 인터뷰 과정의 긴 대화 없이 깨끗한 컨텍스트와 명문화된 완료 기준으로 출발할 수 있으며, 나중에 결과물을 검토할 때도 같은 문서를 기준으로 삼을 수 있습니다.

## 서브에이전트 활용

서브에이전트는 메인 대화와 분리된 컨텍스트에서 작업하고 요약된 결과만 돌려줍니다. 탐색이나 테스트 실행처럼 출력이 긴 작업을 맡기면 메인 컨텍스트가 깨끗하게 유지됩니다. 자주 쓰는 역할은 .claude/agents/ 아래 마크다운 파일로 정의해 재사용합니다.

- `Explore`: 읽기 전용. 파일 탐색과 코드 검색, 코드베이스 분석
- `Plan`: 읽기 전용. plan 모드에서 계획 수립에 필요한 조사 수행
- `general-purpose`: 탐색과 수정이 모두 필요한 복합 작업
- `커스텀 에이전트`: .claude/agents/*.md로 도구·모델·프롬프트를 직접 정의

```markdown
<!-- .claude/agents/code-improver.md -->
---
name: code-improver
description: 파일을 훑어 가독성·성능 개선점을 제안한다. 코드를 작성하거나 수정한 뒤 사용.
tools: Read, Grep, Glob
model: sonnet
---

너는 코드 개선 전문가다. 발견한 문제마다 원인을 설명하고,
현재 코드와 개선된 코드를 함께 제시한다.

# 사용 예
> code-improver 에이전트로 src/utils 의 개선점을 찾아줘
```

## Claude Code 에이전트 팀

에이전트 팀은 여러 Claude Code 세션이 한 팀으로 협업하는 실험적 기능으로, 기본값은 꺼져 있습니다. 리드 세션이 작업을 나누어 팀원에게 맡기고, 팀원은 각자 독립된 컨텍스트에서 일하며 서로 직접 대화합니다. 같은 요청이라도 팀을 켰을 때와 껐을 때 진행 방식이 달라집니다.

### 에이전트 팀 사용

- 리드가 관점별 리뷰 작업을 공유 작업 목록에 등록합니다
- 보안·성능·테스트 담당 팀원이 각자 독립된 세션에서 동시에 리뷰합니다
- 팀원끼리 메시지를 주고받으며 서로가 발견한 사항을 검토합니다
- 리드가 세 관점의 결과를 종합해 보고합니다

토큰 사용량 많음: 팀원 수에 비례해 증가하며, 팀원이 plan 모드로 동작하면 표준 세션의 약 7배

### 단일 세션

- 하나의 세션이 PR 전체를 읽습니다
- 보안, 성능, 테스트 관점을 순서대로 검토합니다
- 필요한 경우 서브에이전트에게 일부 조사를 맡기고 요약을 전달받습니다
- 하나의 컨텍스트 안에서 결과를 정리해 보고합니다

토큰 사용량 작음: 순차 작업이나 같은 파일을 고치는 작업에는 이쪽이 효율적

## 서브에이전트와 에이전트 팀, 언제 무엇을 쓸까

두 방식 모두 작업을 병렬화하지만 소통 구조가 다릅니다. 서브에이전트는 결과를 메인 에이전트에게만 보고하고, 에이전트 팀의 팀원은 공유 작업 목록을 확인하며 서로 직접 메시지를 주고받습니다.

### 서브에이전트: 결과만 돌려받는 위임

- 메인 에이전트가 조사할 영역을 독립된 단위로 나눕니다
- 서브에이전트가 각자의 컨텍스트에서 병렬로 조사합니다
- 각 서브에이전트는 요약된 결과만 메인 에이전트에게 보고합니다
- 메인 에이전트가 결과를 종합해 원인을 판단합니다

토큰 비용 낮음: 요약된 결과만 메인 컨텍스트로 전달됨

### 에이전트 팀: 서로 토론하는 협업

- 리드가 가설별 작업을 공유 작업 목록에 등록하고 팀원을 생성합니다
- 팀원이 작업을 맡아 각자 독립된 세션에서 가설을 검증합니다
- 팀원끼리 직접 메시지를 보내 서로의 가설을 반박하고 발견을 공유합니다
- 리드가 살아남은 가설을 종합하고 팀원을 종료합니다

토큰 비용 높음: 팀원마다 별도의 Claude 인스턴스가 실행됨

```bash
// settings.json — 실험적 기능이라 직접 켜야 한다
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}

# 팀 구성은 자연어로 요청한다
> PR #142 를 리뷰할 팀원 3명을 만들어줘:
  - 보안 영향 담당
  - 성능 영향 담당
  - 테스트 커버리지 담당
  각자 리뷰한 뒤 서로의 발견을 검토하고 결과를 보고해줘.
```

### 에이전트 팀 사용 가이드

- 리서치와 리뷰, 서로 다른 모듈 개발, 경쟁 가설 디버깅처럼 팀원이 독립적으로 일할 수 있는 작업에 적합합니다
- 순차적인 작업, 동일한 파일을 편집하는 작업, 의존성이 높은 작업은 단일 세션이나 서브에이전트를 쓰는 편이 낫습니다
- 팀원은 3~5명 규모로 시작하고, 팀원마다 서로 다른 파일을 담당하게 하여 충돌을 방지하세요
- 실험적 기능이라 세션을 재개하면 in-process 팀원이 복원되지 않는 등의 제약이 있습니다

## Cursor 규칙 설정

Cursor의 프로젝트 규칙은 .cursor/rules 폴더의 .mdc 파일로 정의합니다. frontmatter의 alwaysApply, description, globs 설정에 따라 항상 적용, 에이전트 판단에 따른 적용, 특정 파일 한정 적용, @멘션을 통한 수동 적용의 네 가지 방식으로 동작합니다. 프로젝트 루트나 하위 디렉터리의 AGENTS.md도 함께 읽습니다.

```markdown
<!-- .cursor/rules/typescript.mdc -->
---
description: TypeScript 작성 규칙
globs: src/**/*.ts, src/**/*.tsx
alwaysApply: false
---

- strict 모드를 준수하고 any 를 쓰지 않는다
- 함수형 컴포넌트만 사용한다
- default export 대신 named export 를 쓴다
- 프로덕션 코드에 console.log 를 남기지 않는다
```

# 5. 프롬프트 엔지니어링 고급

> 에이전트가 볼 수 없는 정보를 전달하고, 스스로 검증할 기준을 제시하는 방법

## 목표와 완료 기준 중심 프롬프트

에이전트는 절차를 스스로 찾을 수 있습니다. 사용자가 제공해야 하는 것은 목표, 작업 범위, 그리고 완료 여부를 판단할 기준입니다.

### 나쁜 예 (모호하거나 절차만 지시)

```text
# 모호한 요청
"이 코드 좀 개선해줘"

# 절차를 하나하나 지시
"1. 먼저 파일을 읽어
 2. 그 다음 함수를 찾아
 3. 타입을 추가해"
```

### 좋은 예 (목표·범위·완료 기준 제시)

```text
# 목표 + 범위 + 완료 기준
"src/utils/date.ts 의 모든 함수에
매개변수와 반환 타입을 추가해줘.
기존 동작은 바꾸지 말고,
bun run typecheck 가 통과하면 완료야."
```

## 컨텍스트 참조

에이전트는 저장소의 코드를 읽을 수는 있지만, 사용자의 머릿속에 있는 배경 지식까지는 파악하지 못합니다. @로 관련 파일을 직접 지정하고, 따라야 할 기존 패턴, 코드에 드러나지 않는 제약, 에러 메시지 전문과 재현 조건을 함께 전달하면 불필요한 탐색이 줄고 결과가 정확해집니다.

```bash
# @ 로 파일을 직접 참조
> @src/utils/validation.ts 의 함수들을 리팩토링해줘

# 따라 할 기존 패턴을 지정
> @src/components/button.tsx 와 같은 패턴으로 input 컴포넌트를 만들어줘

# 에이전트가 볼 수 없는 정보를 알려주기
> 결제 API 는 스테이징에서 5초 넘게 걸릴 때가 있어.
  타임아웃은 10초로 잡고 재시도는 하지 마.

# 에러는 전문과 재현 조건을 함께
> 로그아웃 후 /dashboard 에 접근하면 아래 에러가 나:
  TypeError: Cannot read properties of undefined (reading 'user')
```

## 제약 조건과 검증 기준 명시

테스트 케이스, 기대 출력, 스크린샷처럼 에이전트가 직접 실행해 볼 수 있는 검증 수단을 제공하면, 사용자가 지적하기 전에 스스로 문제를 발견하고 수정합니다. 이는 결과물의 품질을 높이는 효과적인 방법입니다.

```bash
> 인증 미들웨어를 구현해줘.
  제약:
  - 새 의존성 추가 금지 (jose 만 허용)
  - 기존 User 타입 재사용
  - 에러는 커스텀 AppError 로 throw
  검증:
  - src/middleware/auth.test.ts 에 만료 토큰·변조 토큰 케이스 추가
  - bun run test 통과
```

## 반복적 개선 패턴

복잡한 작업은 큰 그림, 세부 구현, 엣지 케이스 순으로 점진적으로 구체화하는 것이 좋습니다. 에이전트가 잘못된 방향으로 진행하기 시작하면 지켜보지 말고 즉시 중단한 뒤 되돌리는 편이 비용을 줄일 수 있습니다. 서로 무관한 작업을 한 세션에 누적하지 말고, 작업 주제가 바뀌면 컨텍스트를 새로 초기화하세요.

```bash
# 1차: 큰 그림 (plan 모드)
> 결제 모듈 구조를 설계해줘. 아직 코드는 쓰지 마

# 2차: 세부 구현
> 승인한 설계대로 PaymentService 부터 구현해줘

# 3차: 엣지 케이스
> 결제 실패 시 재시도와 부분 환불 케이스를 추가해줘

# 방향이 틀렸다면: Esc 로 중단하고 /rewind 로 되돌린다
# 다른 작업으로 넘어갈 때: /clear 로 컨텍스트를 비운다
```

# 6. 실전 워크플로우

> 기능 개발, 버그 수정, 코드 리뷰, 그리고 무인 자동화

## 기능 개발 워크플로우

탐색, 계획, 구현, 검증, 리뷰, 커밋의 순서로 진행합니다. 계획 단계에서 방향을 합의하고, 구현 단계마다 타입 체크와 테스트로 검증하게 하면 마지막에 한꺼번에 고치는 일이 줄어듭니다.

```bash
# 1. 탐색 + 계획 (plan 모드)
claude --permission-mode plan
> PRD.md 를 읽고 구현 계획을 세워줘

# 2. 구현 — 계획 승인 후
> 승인한 계획대로 구현해줘. 단계마다 typecheck 를 돌려줘

# 3. 검증
> 테스트를 작성하고 bun run test 가 통과할 때까지 수정해줘

# 4. 리뷰 — 번들 스킬
> /code-review

# 5. 커밋과 PR
> 변경사항을 커밋하고 PR 을 만들어줘
```

## 버그 수정 워크플로우

에러 메시지 전문과 재현 조건을 함께 주고, 먼저 실패하는 테스트로 버그를 재현하게 하세요. 테스트가 통과로 바뀌는 것이 곧 수정의 증거가 됩니다.

```bash
> 이 에러를 수정해줘:

  TypeError: Cannot read properties of undefined (reading 'user')
      at AuthGuard (src/guards/auth.guard.ts:15)

  재현 조건: 로그아웃 후 보호된 페이지 접근
  먼저 실패하는 테스트로 재현한 다음 고쳐줘.

# 에이전트가 수행하는 작업:
# 1. 에러 위치와 관련 코드 분석
# 2. 실패하는 테스트로 재현
# 3. 원인 진단 후 수정
# 4. 테스트 통과로 검증
```

## 코드 리뷰 워크플로우

```bash
# 현재 diff 리뷰 (번들 스킬)
> /code-review

# 관점을 지정한 리뷰
> 현재 브랜치를 main 과 비교해서 리뷰해줘.
  특히 보안 취약점, 성능, 타입 안정성, 테스트 누락을 확인해줘

# PR 번호로 리뷰 (gh CLI 또는 GitHub MCP 필요)
> PR #123 을 리뷰하고 코멘트를 달아줘
```

## 병렬 실행과 자동화

claude -p는 대화 없이 한 번 실행하고 종료되는 headless 모드로, CI나 스크립트에 연동하기에 적합합니다. 여러 작업을 동시에 진행할 때는 worktree로 세션별 작업 디렉터리를 분리해 변경 사항이 서로 섞이지 않도록 방지합니다. 오래 걸리는 작업은 백그라운드 세션으로 실행한 뒤 agent view에서 진행 상황을 확인합니다.

```bash
# headless 실행 — CI·스크립트에서
claude -p "변경된 파일의 린트 에러를 수정해줘" --max-turns 10

# 파이프 입력
cat build-error.log | claude -p "이 빌드 에러의 원인을 요약해줘"

# worktree 로 격리된 병렬 세션
claude -w fix-login
claude -w refactor-cart

# 백그라운드 세션 실행과 모니터링
claude --bg "의존성을 업데이트하고 테스트를 통과시켜줘"
claude agents
```

### 자동화 팁

- PR 생성과 리뷰는 gh CLI나 GitHub MCP 서버로 연결하세요
- 반복되는 팀 절차(커밋 규칙, 릴리스 체크)는 프로젝트 skill로 만들어 공유하세요
- 자동 실행 시에는 권한 규칙으로 허용 범위를 미리 좁혀 두세요

# 7. 검증과 안전한 사용

> AI 생성 코드의 검증, 권한 관리, 프롬프트 인젝션 대응, 팀 가이드라인

## 자동 검증 설정

PostToolUse hook을 활용하면 파일이 수정될 때마다 린트나 타입 검사를 실행할 수 있습니다. 검사에 실패했을 때 종료 코드 2와 함께 오류를 stderr로 출력하면 에이전트에게 해당 내용이 전달되어 스스로 수정을 시도합니다. 작업 완료 시점에 전체 테스트를 강제하고 싶다면 Stop hook을 사용합니다.

```jsonc
// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/lint-file.sh"
          }
        ]
      }
    ]
  }
}

#!/bin/bash
# .claude/hooks/lint-file.sh
FILE=$(jq -r '.tool_input.file_path')
if ! npx eslint "$FILE" >&2; then
  exit 2   # 린트 결과(stderr)가 에이전트에게 전달된다
fi
```

## 수동 검증 체크리스트

- [ ] 비즈니스 로직이 요구사항과 일치하는가?
- [ ] 기존 코드 패턴과 일관성을 유지하고 있는가?
- [ ] 보안 취약점은 없는가? (입력 검증, 인증/인가)
- [ ] 존재하지 않는 패키지나 API를 사용하지 않았는가?
- [ ] 성능 문제는 없는가? (N+1, 메모리 누수)
- [ ] 에러 처리가 적절하게 이루어졌는가?
- [ ] 테스트가 실제 동작을 검증하는가? (단순 통과만을 위한 테스트가 아닌가)

## 권한 관리

settings.json의 permissions에 도구별 규칙을 지정하여 허용 범위를 설정합니다. 규칙은 deny, ask, allow 순서로 평가되며 먼저 일치한 규칙이 결과를 결정하므로, allow 규칙으로 deny 규칙에 예외를 둘 수는 없습니다. 프로젝트의 .claude/settings.json에 커밋하면 팀 전체가 동일한 규칙을 공유하여 사용하게 됩니다.

```jsonc
// .claude/settings.json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Bash(bun run test *)",
      "Bash(git commit *)",
      "mcp__github__get_*"
    ],
    "ask": [
      "Bash(git push *)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Bash(rm -rf *)"
    ]
  }
}
```

### 프롬프트 인젝션에 대비하기

에이전트가 읽는 웹 페이지, 이슈 본문, MCP 도구의 응답에는 에이전트를 속이려는 지시문이 숨어 있을 수 있습니다. 외부에서 유입된 내용은 지시가 아닌 데이터로 취급해야 하며, 출처를 모르는 MCP 서버·skill·플러그인은 설치하지 않습니다. 비밀 값이 포함된 파일은 deny 규칙으로 차단하고, 모든 검사를 생략하는 bypassPermissions 모드는 격리된 환경에서만 사용합니다.

## 팀 가이드라인

### 허용되는 사용

- 보일러플레이트 코드 생성
- 테스트 코드 작성 보조
- 문서화 작업 지원
- 코드 리뷰 보조
- 디버깅 지원

### 필수 검증 사항

- 모든 AI 생성 코드는 사람의 리뷰를 거친 뒤 머지
- 보안 관련 코드는 시니어 개발자의 승인 필요
- 프로덕션 배포 전 전체 테스트 통과 여부 확인

### 금지 사항

- 비밀 키나 개인정보를 프롬프트에 포함
- AI 생성 코드를 검토 없이 커밋
- 프로덕션 DB에 MCP로 직접 연결
- 출처를 모르는 MCP 서버·skill·플러그인 설치

> **최종 책임** AI 에이전트가 아무리 강력해도 최종 책임은 항상 개발자에게 있습니다. 모든 AI 생성 코드는 반드시 검토를 거친 후 커밋하세요.

# 8. 토큰 절약과 컨텍스트 최적화

> 컨텍스트를 작게 유지하는 습관과 비용에 맞는 브라우저 자동화 도구 선택법

## Playwright MCP에서 Playwright CLI로 전환

Playwright MCP는 페이지의 접근성 스냅샷과 스크린샷을 응답으로 반환하여 컨텍스트에 그대로 누적됩니다. 반면 에이전트용 Playwright CLI(@playwright/cli)는 동일한 결과를 파일로 저장하고 경로만 반환하므로, 에이전트가 필요한 부분만 골라 읽을 수 있습니다. Playwright 팀 역시 셸을 다룰 수 있는 코딩 에이전트에는 CLI가 더 적합하다고 안내합니다. 절감 폭은 측정 조건에 따라 크게 달라지므로, 특정 배수를 맹신하기보다 /context 명령어로 직접 확인해 보세요.

```jsonc
// 기존: .mcp.json 의 Playwright MCP
// 액션마다 접근성 스냅샷이 컨텍스트로 들어온다
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

```bash
# 1) 에이전트용 Playwright CLI 와 스킬 설치
npm install -g @playwright/cli@latest
playwright-cli install --skills

# 2) 에이전트가 셸에서 직접 호출 — 스냅샷·스크린샷은 파일로 저장된다
playwright-cli open http://localhost:3000/login --headed
playwright-cli snapshot
playwright-cli click e15
playwright-cli screenshot

# 3) 확인한 시나리오는 테스트 코드로 고정해 회귀 검증
bunx playwright test e2e/login.spec.ts --reporter=dot
```

- **Playwright MCP가 여전히 적합한 경우**: 브라우저 상태를 유지해야 하는 탐색적 자동화, self-healing 테스트, 장시간 워크플로
- **Playwright CLI가 적합한 경우**: 셸과 파일 시스템을 활용할 수 있는 코딩 에이전트의 일상적인 화면 확인과 E2E 검증

### CLI 전환 체크리스트

- 스크린샷과 trace는 실패한 시점에만 남기세요
- 긴 로그는 파일로 저장하고 에이전트에게는 요약본과 파일 경로만 전달하세요
- 검증이 끝난 시나리오는 테스트 코드로 고정하여 이후에는 playwright test로 검증하세요

## 브라우저 도구 선택: Playwright와 Chrome DevTools MCP

Playwright는 사용자 흐름을 재현하고 검증하는 작업에 강하며, CDP(Chrome DevTools Protocol) 기반의 Chrome DevTools MCP는 콘솔, 네트워크, 성능 트레이스 등 브라우저 내부를 들여다보는 디버깅에 효과적입니다.

| 비교 지표 | Playwright (CLI·MCP) | Chrome DevTools MCP (CDP) | 권장 상황 |
| --- | --- | --- | --- |
| 주 용도 | 클릭·입력 같은 사용자 흐름 자동화와 E2E 테스트 | 콘솔 에러, 네트워크 요청, 성능 트레이스 분석 | 기능 검증은 Playwright, 원인 분석은 DevTools |
| 브라우저 | Chromium, Firefox, WebKit | Chromium 계열 전용 | 크로스 브라우저 확인이 필요하면 Playwright |
| 컨텍스트 비용 | MCP는 스냅샷이 컨텍스트로 유입되고, CLI는 파일로 저장 | 도구 수가 많아 연결해 두면 도구 목록이 컨텍스트를 더 차지 | 필요한 작업을 진행할 때만 연결 |
| 재현성 | 시나리오를 테스트 코드로 작성해 CI에서 반복 실행 가능 | 대화형 디버깅 중심이어서 결과를 코드로 보존하기 어려움 | 회귀 방지는 테스트 코드로 |

## 컨텍스트 최적화 루틴

토큰 비용은 컨텍스트 크기에 비례합니다. 에이전트는 요청마다 이전 대화 전체를 다시 전송하므로, 온종일 켜 둔 세션에서는 단순한 한 줄 질문에도 그동안 누적된 대화 전체가 함께 처리됩니다. 따라서 컨텍스트 크기를 작게 유지하는 것이 가장 효과적인 절약 방법입니다.

```bash
# 무엇이 컨텍스트를 차지하는지 확인
> /context

# 관련 없는 작업으로 넘어갈 때 비우기
> /clear

# 남길 내용을 지정해서 압축
> /compact 코드 변경 내역과 테스트 결과 위주로 남겨줘

# 사용량 확인, 모델·추론 강도 조절
> /usage
> /model
> /effort

# 장황한 출력은 서브에이전트에 맡기기
> 서브에이전트로 전체 테스트를 실행하고 실패한 케이스만 요약해줘
```

- 관련 없는 작업으로 넘어갈 때는 /clear로 세션을 새로 시작하세요
- CLAUDE.md는 200줄 이하로 유지하고, 특정 작업용 지침은 skill로 옮기세요
- 테스트 실행이나 로그 분석처럼 출력량이 많은 작업은 서브에이전트에 위임하세요
- 전용 CLI가 제공되는 도구(gh, aws 등)는 MCP 대신 CLI를 쓰고, 사용하지 않는 MCP 서버는 비활성화하세요
- 대부분의 작업은 가벼운 모델로 처리하고, 복잡한 설계 단계에만 상위 모델과 높은 effort를 적용하세요
- 모호한 요청은 불필요하게 넓은 탐색을 유발하므로 대상 파일, 작업 범위, 완료 기준을 구체적으로 명시하세요
- 에이전트의 진행 방향이 잘못되었다면 Esc로 즉시 중단하고 /rewind로 되돌리세요

# 참고 자료

- [Claude Code 문서](https://code.claude.com/docs)
- [MCP 스펙 2026-07-28 변경 사항](https://modelcontextprotocol.io/specification/2026-07-28/changelog)
- [Agent Skills](https://agentskills.io)
- [AGENTS.md](https://agents.md)
- [Playwright CLI](https://github.com/microsoft/playwright-cli)
- [Cursor Rules](https://cursor.com/docs/context/rules)
