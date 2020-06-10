# Create Lens Studio Project

> Quickly scaffolds a new Lens Studio project in Node.js by setting up linting, formatting, and building tools. It makes it easier to organize your code and enable code splitting just like on the web!

## Prerequisites

- [NodeJS](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/)

## Usage

Make sure you've got NodeJS and Yarn installed (see links in prerequisites section). Create a new Lens Studio project, or choose an existing one. Open up a terminal in your Lens Studio Project directory and run the following command:

```shell
yarn create lens-studio-project <lens-name>
```

This will download and run this starter in order to create a new Lens Studio project.

**Examples:**

```shell
# Navigate to your Lens Studio directory
cd path/to/my-lens

# Run the starter
yarn create lens-studio-project my-lens
```

```shell
# Or combine the two commands
yarn create lens-studio-project path/to/my-lens
```

## Features

- [x] Lints & formats `.js` files.
- [x] Formats `.json` and `.md` files

## Functionality

### `pre-commit` git hook

- Lints (and formats), and attempts to autofix your staged (`.js`) files through [ESLint](https://eslint.org/) (extending [Airbnb](https://github.com/airbnb/javascript#readme) and [Prettier](https://prettier.io/))
- Formats and attempts to autoformat your staged (`.json`, `.md`) files through Prettier
