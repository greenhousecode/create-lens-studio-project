const { ui } = require('inquirer');
const { join } = require('path');
const chalk = require('chalk');
const copyTemplates = require('../utils/copyTemplates');
const { classes, helpers } = require('./askQuestions');

const { ESLINT_EXTENDS, LINT_SCRIPTS } = require('../config.json');

const templateDir = join(__dirname, '../templates/default');

module.exports = (answers) => {
  const bar = new ui.BottomBar();
  bar.updateBottomBar(chalk.gray('Creating files…'));

  const now = new Date();
  const variant = 'none';

  const { projectName, name, email } = answers;

  const data = {
    ...answers,
    projectName,
    author: `${name} <${email}>`,
    lintScript: LINT_SCRIPTS[variant],
    eslintExtends: ESLINT_EXTENDS[variant],
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };

  const overrideContents = (transformFileName = undefined) => (file) => ({
    ...file,
    fileName: transformFileName ? transformFileName(file.fileName) : file.fileName,
    fileContents: file.fileContents.replace(/{{([^}]+)}}/g, (_, match) => data[match] || ''),
  });

  const excludedClasses = classes
    .filter((c) => !answers.classes.includes(c.value))
    .map(({ value }) => value);

  const excludedHelpers = helpers
    .filter((c) => !answers.helpers.includes(c.value))
    .map(({ value }) => value);

  // Copy over template files and replace macros
  copyTemplates(
    templateDir,
    answers.cwd,
    overrideContents((fileName) => fileName.replace(/^_/, '.')),
    {
      excludePatterns: [...excludedClasses, ...excludedHelpers],
    },
  );

  bar.updateBottomBar('');
  console.log(chalk.green('✔ Created files'));
};
