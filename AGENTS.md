# AGENTS.md

Guidance for agents working in this repo. `CLAUDE.md` points here.

## Package manager

This repo uses **bun**. Always use `bun` / `bunx` — never `npm`, `pnpm`, or `yarn`. The lockfile is `bun.lock`; running another package manager would add a competing lockfile (`package-lock.json`, `pnpm-lock.yaml`, etc.). If you see a non-`bun.lock` lockfile appear, remove it.

- Install: `bun install`
- Add a dependency: `bun add <pkg>` (`bun add -d <pkg>` for dev)
- Run scripts: `bun run <script>` (e.g. `bun run dev`, `bun run build`)
- One-off executables: `bunx <tool>`

## Agent skills

### Issue tracker

Issues and PRDs are tracked in GitHub Issues (`emrosas/astro-starter`) via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default canonical labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
