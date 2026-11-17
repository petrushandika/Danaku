# Contributing to Danaku

Start with a small, useful change: a reproducible bug fix, clearer setup instructions, or an accessibility improvement.

## Questions and bugs

- Ask setup questions and discuss proposals in [Discussions](https://github.com/petrushandika/Danaku/discussions).
- For a bug, open an [Issue](https://github.com/petrushandika/Danaku/issues) with the affected page, steps to reproduce, expected and actual behavior, and your Node/browser versions.
- Redact screenshots. Never attach `.env` files, credentials, payment details, database dumps or identifiable transaction data.
- Discuss large changes before implementation.

## Pull requests

1. Fork the repository and create a focused branch from `main`.
2. Follow the README setup instructions with a disposable local database and dummy data.
3. Make one coherent change; avoid unrelated formatting or dependency upgrades.
4. Describe what changed, how you tested it, and any known blockers. Include before/after screenshots for UI work using dummy data only.
5. Use a descriptive conventional title, for example `fix: keep transaction actions visible on touch screens` or `docs: clarify local email configuration`.
6. Wait for checks and review. Do not claim tests passed when they were not run.

Backend test and build scripts are declared in `backend/package.json`; frontend build scripts are in `frontend/package.json`. Some existing tooling may need maintenance; report failures rather than silently bypassing checks. Documentation-only changes should at least validate links, image paths and command names against the repository.

Only credit real contributors. Do not create empty PRs, fabricated co-authorship, duplicate discussions or star exchanges to collect achievements.
