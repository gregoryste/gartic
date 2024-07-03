module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'react-svg', "transform-util-promisify"],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react-svg/no-unused-ids-in-svg": "error", // Forbid unused IDs
    "react-svg/no-unused-empty-tag-in-svg": "error", // Forbid empty tags
    "react-svg/no-metadata-in-svg": "error" // Forbid metadata like "title" / "desc"
  },
  files: [
    "custom.d.ts"
  ]
}
