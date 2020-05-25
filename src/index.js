#!/usr/bin/env node
const { existsSync } = require('fs');
const app = require('commander');
const boxen = require('boxen');
const chalk = require('chalk');
const clear = require('clear');
const installDependencies = require('./actions/installDependencies');
const { version, description } = require('../package.json');
const askQuestions = require('./actions/askQuestions');
const deleteFolder = require('./actions/deleteFolder');
const createFiles = require('./actions/createFiles');

let input;

app
  .name('yarn create lens-studio-project')
  .version(version)
  .description(description)
  .usage('<app-name>')
  .arguments('<app-name>')
  .action((appName) => {
    input = appName;
  })
  .parse(process.argv);

// App name validation
if (!input) {
  console.log(
    chalk.red(
      `Please supply an ${chalk.bold('app name')}: "yarn create lens-studio-project ${chalk.bold(
        'lens-name',
      )}"`,
    ),
  );

  process.exit(1);
} else if (!/^\/?([\w-]+\/)*[0-9a-z]+(-[0-9a-z]+)*$/.test(input)) {
  console.log(
    chalk.red(
      `For your ${chalk.bold(
        'Lens name',
      )}, please only use kebab-case: "yarn create lens-studio-project ${chalk.bold('lens-name')}"`,
    ),
  );

  process.exit(1);
} else if (existsSync(input)) {
  console.log(chalk.red(`The directory "${input}" already exists`));
  process.exit(1);
}

clear();

console.log(
  boxen(`${chalk.bold('CREATE LENS STUDIO PROJECT')} ${chalk.gray(`v${version}`)}`, {
    borderColor: 'cyan',
    float: 'center',
    padding: 1,
    margin: 1,
  }),
);

(async () => {
  let answers;

  try {
    answers = await askQuestions(input);
    await createFiles(answers);
    await installDependencies(answers);

    console.log(chalk.bold.green('\nAll finished!'));
    process.exit(0);
  } catch (err) {
    console.log(chalk.red(`\nSomething went wrong (${err.message}):`));
    console.log(err.description || err);
    await deleteFolder(answers);
    process.exit(1);
  }
})();
