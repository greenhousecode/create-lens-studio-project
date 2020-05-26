# Create Lens Studio Project

> Quickly scaffolds a new Node.js project by setting up linting, formatting, and building tools.

## Usage

```shell
yarn create lens-studio-project <lens-name>
```

**Examples:**

- `yarn create lens-studio-project my-lens`
- `yarn create lens-studio-project folder/my-lens`
- `yarn create lens-studio-project /folder/my-lens`

## Features

- [x] Lints & formats `.js` files.
- [x] Formats `.json` and `.md` files

## Prerequisites

- [Yarn](https://yarnpkg.com/)

## Functionality

### `pre-commit` git hook

- Lints (and formats), and attempts to autofix your staged (`.js`) files through [ESLint](https://eslint.org/) (extending [Airbnb](https://github.com/airbnb/javascript#readme) and [Prettier](https://prettier.io/))
- Formats and attempts to autoformat your staged (`.json`, `.md`) files through Prettier

## Recommended Visual Studio Code settings

### Extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### `settings.json`

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "editor.formatOnSave": true,
  "prettier.disableLanguages": ["javascript"]
}
```

> **Note:** We use `prettier.disableLanguages` to disable Prettier from handling JS files, because ESLint already formats these (using Prettier under the hood).
