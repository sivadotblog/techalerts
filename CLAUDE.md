# techalerts

Docusaurus (TypeScript) static site publishing tech alerts.

## Commands

- `yarn start` — local dev server with live reload
- `yarn build` — static build into `build/`

## Layout

- `docs/` — documentation pages
- `tech-alerts/` — tech alert entries
- `external-radar/` — external radar entries
- `src/` — custom pages, components, CSS
- `static/` — static assets
- `docusaurus.config.ts`, `sidebars.ts` — site configuration

Writing conventions for docs and alerts are in `.claude/rules/docs-conventions.md`
(path-scoped; loads only when those files are touched).
