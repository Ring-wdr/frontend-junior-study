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
