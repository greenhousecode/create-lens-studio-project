const { ui } = require('inquirer');
const chalk = require('chalk');
const spawnPromise = require('../utils/spawnPromise');

const { DEFAULT_DEPENDENCIES, DEFAULT_DEV_DEPENDENCIES } = require('../config.json');

module.exports = async ({ cwd }) => {
  const bar = new ui.BottomBar();
  bar.updateBottomBar(chalk.gray('Installing dependencies (this can take a minute)…'));

  try {
    const dependencies = [...DEFAULT_DEPENDENCIES];

    if (dependencies.length) {
      // Install dependencies
      await spawnPromise('yarn', ['add', ...dependencies], { cwd });
    }

    // Install devDependencies
    await spawnPromise(
      'yarn',
      ['add', ...DEFAULT_DEV_DEPENDENCIES, 'eslint-plugin-prettier', '--dev'],
      { cwd },
    );

    // Install Airbnb ESLint config
    await spawnPromise(
      'npx',
      ['install-peerdeps', 'eslint-config-airbnb-base', '--dev', '--yarn'],
      { cwd },
    );
  } catch (err) {
    bar.updateBottomBar('');
    console.log(chalk.red('✘ Installing failed'));
    throw err;
  }

  bar.updateBottomBar('');
  console.log(chalk.green('✔ Installed dependencies'));
};
