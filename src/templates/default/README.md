# {{name}}

{{description}}

## Installing & setting up

Once pulled, run `yarn` to install your project. You can configure your source & build path in `global.config.js`.

## Development

While developing this lens, run:

```shell
yarn start
```

This will create uncompressed scripts located in `build`. Each script in `Public/Scripts/src/` will create a new build file, so it's easy to create separate scripts for different functionality.

For example, `Public/Scripts/src/index.js` will create `Public/Scripts/build/build_index.js`.

### Importing modules

To import existing code, or code you've written yourself, simply import modules. Never worked with modules in Javascript? You can read all about it in [this article on Medium](https://medium.com/@thejasonfile/a-simple-intro-to-javascript-imports-and-exports-389dd53c3fac).

An example for importing the `console` module, designed to make printing to the console a lot easier. It has extra functionality build on top of the native `print` method from Lens Studio and works in similar ways as the web browser variant.

```js
// In your index.js file, simply import the console module:
import console from './helpers/console';

console.log('Hello', 'world!');
```

### Exporting modules

Once you've created code in a separate file, you can export it and import it in other files.

```js
// myCustomModule.js

// Export a named variable
export const otherHello = () => print('Hello from named export');

// Or as the default export
export default () => print('Hello from default export');
```

And in another file, you can import them as so:

```js
import defaultHello, { otherHello } from './path/to/my/module';

defaultHello(); // will print "Hello from default export"
otherHello(); // will print "Hello from named export"
```

### Using variables

At one point, you probably need to add some Lens studio variables to your code. To accomplish this, every file in `Public/Scripts/src/` has a corresponding variables file. For example, `Public/Scripts/src/index.js` has `Public/Scripts/src/index.variables.js` as a variables file. Make sure to restart Rollup (re-run `yarn start`) once you've made a change in a variables file. Rollup seems to cache these files.

## Deploying

Once ready, you can build your project using `yarn build`. This will generate compressed JS files ready to be deployed.

## Recommended Visual Studio Code settings

We recommend [Visual Studio Code](https://code.visualstudio.com/) as your code editor, as it is very powerfull, well maintained and free! Use any other IDE you like, but we wanted to add some settings that can help you while developing.

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
