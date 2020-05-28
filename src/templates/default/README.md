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

### Using variables

At one point, you probably need to add some Lens studio variables to your code. To accomplish this, every file in `Public/Scripts/src/` has a corresponding variables file. For example, `Public/Scripts/src/index.js` has `Public/Scripts/src/index.variables.js` as a variables file. Make sure to restart Rollup (re-run `yarn start`) once you've made a change in a variables file. Rollup seems to cache these files.

## Deploying

Once ready, you can build your project using `yarn build`. This will generate compressed JS files ready to be deployed.
