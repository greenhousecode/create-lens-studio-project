import fs from 'fs';
import glob from 'glob';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';

import { BUILD_PATH, SOURCE_PATH, VARIABLES_PATH } from './global.config';

const isProduction = process.env.NODE_ENV === 'production';

const getVariables = (id) => {
  try {
    const sourcePath = SOURCE_PATH.replace('./', '');
    const variablesPath = VARIABLES_PATH.replace('./', '');
    const location = id.replace(sourcePath, variablesPath).replace('.js', '.variables.js');
    return fs.readFileSync(location).toString('utf8');
  } catch (e) {
    return '';
  }
};

const pluginsDevelop = [
  resolve(),
  json(),
  babel({
    babelrc: false,
    presets: [['@babel/env', { modules: false }]],
    plugins: ['@babel/plugin-proposal-class-properties'],
  }),
];

const pluginsProduction = [terser({ output: { comments: 'all' } })];

const createConfigPerFile = () => {
  const entries = glob.sync(`${SOURCE_PATH}/*[!.variables].js`);
  const plugins = isProduction ? [...pluginsDevelop, ...pluginsProduction] : [...pluginsDevelop];

  if (!entries.length) {
    throw new Error(
      `There are no entry points in your source folder. Your configured source folder is "${SOURCE_PATH}".`,
    );
  }

  return entries.map((location) => {
    const fileName = location.match(/\w+\.js/)[0];

    return {
      plugins,
      input: location,
      output: {
        intro: getVariables(location),
        file: location.replace(SOURCE_PATH, BUILD_PATH).replace(fileName, `build_${fileName}`),
        name: location.replace(SOURCE_PATH, ''),
        format: 'iife',
      },
      watch: {
        include: '/Public/scripts/src',
      }
    };
  });
};

export default createConfigPerFile();
