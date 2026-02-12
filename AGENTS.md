# AGENTS.md

You are an expert in JavaScript, Rsbuild, and web application development. You write maintainable, performant, and accessible code.

## Commands

- `bun run dev` - Start the dev server
- `bun run build` - Build the app for production
- `bun run preview` - Preview the production build locally

## Docs

- Rsbuild: https://rsbuild.rs/llms.txt
- Rspack: https://rspack.rs/llms.txt

- Rstest: https://rstest.rs/llms.txt

## Tools

### Biome

- Run `bun run lint` to lint your code
- Run `bun run format` to format your code

### Rstest

- Run `bun run test` to run tests
- Run `bun run test:watch` to run tests in watch mode

## Project Conventions

- **Package Manager**: STRICTLY use `bun`. Do NOT use `npm` or `yarn`.
- **File Naming**: Use `kebab-case` for all files and directories.
- **Comments**: Do NOT add "divider comments" (e.g. `// -- Component --`) or file header comments. Keep code clean.
- **Styling**: Use Tailwind CSS v4. Shared components go in `src/components/ui`.

## Skills

A skill is a set of local instructions to follow that is stored in a `SKILL.md` file. Below is the list of project-local skills in `.claude/skills`.

### Available skills

- react-testing-troubleshooting: React 테스트 문제를 진단하고 해결하는 가이드. (file: .claude/skills/react-testing-troubleshooting/SKILL.md)
- weekly-page-development: 주간 페이지 개발 워크플로우와 참조 템플릿 가이드. (file: .claude/skills/weekly-page-development/SKILL.md)

### How to use skills

- Discovery: The list above is the skills available in this project. Skill bodies live on disk at the listed paths.
- Trigger rules: If the user names a skill (with `$SkillName` or plain text) OR the task clearly matches a skill's description shown above, you must use that skill for that turn. Multiple mentions mean use them all. Do not carry skills across turns unless re-mentioned.
- Missing/blocked: If a named skill isn't in the list or the path can't be read, say so briefly and continue with the best fallback.
- How to use a skill (progressive disclosure):
  1) After deciding to use a skill, open its `SKILL.md`. Read only enough to follow the workflow.
  2) When `SKILL.md` references relative paths (e.g., `scripts/foo.py`), resolve them relative to the skill directory listed above first, and only consider other paths if needed.
  3) If `SKILL.md` points to extra folders such as `references/`, load only the specific files needed for the request; don't bulk-load everything.
  4) If `scripts/` exist, prefer running or patching them instead of retyping large code blocks.
  5) If `assets/` or templates exist, reuse them instead of recreating from scratch.
- Coordination and sequencing:
  - If multiple skills apply, choose the minimal set that covers the request and state the order you'll use them.
  - Announce which skill(s) you're using and why (one short line). If you skip an obvious skill, say why.
- Context hygiene:
  - Keep context small: summarize long sections instead of pasting them; only load extra files when needed.
  - Avoid deep reference-chasing: prefer opening only files directly linked from `SKILL.md` unless you're blocked.
  - When variants exist (frameworks, providers, domains), pick only the relevant reference file(s) and note that choice.
- Safety and fallback: If a skill can't be applied cleanly (missing files, unclear instructions), state the issue, pick the next-best approach, and continue.
