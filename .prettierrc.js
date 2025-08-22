{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "trailingComma": "all",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "jsxSingleQuote": true,
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto",
  "arrowParens": "avoid",
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "options": {
        "parser": "typescript"
      }
    },
    {
      "files": ["*.json"],
      "options": {
        "printWidth": 80,
        "tabWidth": 2
      }
    },
    {
      "files": ["*.md", "*.markdown"],
      "options": {
        "printWidth": 80,
        "proseWrap": "always",
        "tabWidth": 2
      }
    },
    {
      "files": ["*.yml", "*.yaml"],
      "options": {
        "tabWidth": 2,
        "singleQuote": false
      }
    }
  ]
}
