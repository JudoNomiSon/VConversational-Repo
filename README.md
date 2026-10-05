# Gauntlet starter

A Bun + Turborepo monorepo skeleton. Generated from this template, Gauntlet's
review and gating rules apply to this repo from the first commit, because the
structure already matches what they check.

## Layout

```text
apps/       Your applications (Next.js, etc.) go here, one per subfolder
packages/   Shared code goes here, one package per subfolder
```

## Shared config

`packages/config` holds shared ESLint and TypeScript config. Point a new
app's own config at it:

```json
{ "extends": "@starter/config/typescript/nextjs.json" }
```

## Commands

```bash
bun install
bun run dev
bun run build
bun run lint
bun run type-check
```
