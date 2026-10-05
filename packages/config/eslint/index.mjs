/**
 * Shared ESLint base configuration for the SpecOps monorepo.
 * Apps extend this with their own framework-specific configs.
 */
export default [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      '**/.next/**',
      // Netlify build output (adapter + vendored edge-function code). Present
      // locally after a build; not checked out in CI. Without this, eslint lints
      // generated `module = ...` / vendored Deno files and fails locally only.
      '.netlify/**',
      '**/.netlify/**',
      'dist/**',
      '.turbo/**',
    ],
  },
  {
    /**
     * Unused parameters (DEV-531).
     *
     * Promoted from a council finding rather than written as a preference: a
     * function declared a `state` parameter and never read it, and the
     * behaviour a reader would attribute to it came from a different argument
     * entirely. It is the readability-level version of
     * `service-takes-orgid-but-ignores-it`, which exists because a service
     * accepted a tenant id and never applied it.
     *
     * Deliberately ESLint and not a semgrep rule. The first attempt was a
     * semgrep pattern, which does not parse for TypeScript and, because a rule
     * that fails to parse fails the whole scan, would have taken the entire
     * gate down. This is what the linter is for.
     *
     * `^_` is the opt out, already the convention here (`_projects` in
     * workspace.fixtures.ts) and the one `discarded-customer-input` points at.
     * `after-used` so a parameter before a used one is not flagged: you cannot
     * remove it without changing the call signature.
     */
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
