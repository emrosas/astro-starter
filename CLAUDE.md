# CLAUDE.md

See **[AGENTS.md](./AGENTS.md)** for all repo-specific agent guidance — it is the single source of truth. Key points mirrored here so nothing is missed:

- **Package manager: bun.** Use `bun` / `bunx` only — never `npm`, `pnpm`, or `yarn`. The lockfile is `bun.lock`; other package managers would add a competing lockfile.
- Agent skills configuration (issue tracker, triage labels, domain docs) lives under `docs/agents/`. See [AGENTS.md](./AGENTS.md) for the summary.
