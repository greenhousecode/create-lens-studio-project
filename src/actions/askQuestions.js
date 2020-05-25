const os = require('os');
const { prompt } = require('inquirer');
const { join } = require('path');
const chalk = require('chalk');

const filter = (input) => input.trim().replace(/\s+/g, ' ');

const DEFAULTS = {
  framework: 'none',
  stages: ['prod'],
};

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const classes = [
  { name: 'Button (Add tap listener to Scene Objects)', value: 'classes/Button' },
  { name: 'Audio Manager (for managing audio Assets)', value: 'classes/AudioManager' },
  { name: 'Texture Manager (for managing texture Assets)', value: 'classes/TextureManager' },
  { name: 'Prefab Manager (for managing prefab Assets)', value: 'classes/PrefabManager' },
  { name: 'State Machine (for complex, multi staged lenses)', value: 'classes/StateMachine' },
];

const helpers = [
  { name: 'console (for logging stuff)', value: 'helpers/console' },
  { name: 'duplicator (clone scene objects or prefabs)', value: 'helpers/duplicator' },
  { name: 'time (interval, time outs, etc)', value: 'helpers/time' },
];

module.exports = async (input) => {
  const cwd = input.match(/^\//) ? input : join(process.cwd(), input);
  const appName = input.match(/[0-9a-z-]+$/)[0];

  console.log(chalk.gray(`Creating ${chalk.bold(cwd)}…`));

  const answers = await prompt([
    {
      name: 'username',
      type: 'input',
      message: "What's your name?",
      default: () => os.userInfo().username,
      filter,
      validate: (name) => !!name || 'Please provide your name',
    },
    {
      name: 'email',
      type: 'input',
      message: "What's your email?",
      filter,
      validate: (email) => (!!email && emailRegex.test(email)) || 'Please provide your email',
    },
    {
      name: 'projectName',
      type: 'input',
      message: "What's the name of your Lens?",
      default: () =>
        appName.replace(/-/g, ' ').replace(/^[a-z]| [a-z]/g, (match) => match.toUpperCase()),
      filter,
      validate: (projectName) => !!projectName || 'Please provide a name',
    },
    {
      name: 'description',
      type: 'input',
      message: 'Please provide a one-liner describing your Lens:',
      default: '3D moustaches for everyone!',
      filter,
    },
    {
      name: 'includeCommonlyUsedCode',
      type: 'confirm',
      message: 'Do you want to include commonly used code?',
      filter,
    },
    {
      name: 'classes',
      type: 'checkbox',
      message: 'Which classes would you like to import?',
      when: ({ includeCommonlyUsedCode }) => includeCommonlyUsedCode,
      choices: classes,
    },
    {
      name: 'helpers',
      type: 'checkbox',
      message: 'Which helpers would you like to import?',
      when: ({ includeCommonlyUsedCode }) => includeCommonlyUsedCode,
      choices: helpers,
    },
  ]);

  return { ...DEFAULTS, ...answers, appName, cwd };
};

module.exports.classes = classes;
module.exports.helpers = helpers;
