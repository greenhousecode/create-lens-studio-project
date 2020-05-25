# Create MEH App

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

- [x] Lints & formats `.js(x)`, `.ts(x)`, and `.vue` files
- [x] Formats `.graphql`, `.html`, `.json`, `.md`, `.(s)css`, and `.yml` files

## Prerequisites

- [Yarn](https://yarnpkg.com/)
- [Kubectl v1.13.0](https://storage.googleapis.com/kubernetes-release/release/v1.13.0/bin/darwin/amd64/kubectl)
- GitLab [personal access token](https://gitlab.com/profile/personal_access_tokens) (`api`-scoped)

_Recommended: Add `export GITLAB_PERSONAL_ACCESS_TOKEN=<token>` to your `~/.bash_profile` (and/or `~/.zshrc`) so you can use `yarn download-env` and `yarn upload-env` without configuration._

## Functionality

### `pre-commit` git hook

- Lints (and formats), and attempts to autofix your staged (`.js(x)`, `.ts(x)`, and `.vue`) files through [ESLint](https://eslint.org/) (extending [Airbnb](https://github.com/airbnb/javascript#readme) and [Prettier](https://prettier.io/))
- Formats and attempts to autoformat your staged (`.graphql`, `.html`, `.json`, `.md`, `.(s)css`, and `.yml`) files through Prettier

### `pre-push` git hook

- Runs `yarn test`

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
  "prettier.disableLanguages": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```

> **Note:** We use `prettier.disableLanguages` to disable Prettier from handling JS(X) and TS(X) files, because ESLint already formats these (using Prettier under the hood).
