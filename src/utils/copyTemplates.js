const { join } = require('path');
const {
  writeFileSync,
  readFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  lstatSync,
} = require('fs');

const copyTemplates = (
  source,
  target,
  callback = (file) => file,
  { excludePatterns = [] } = {},
) => {
  if (!existsSync(target)) {
    mkdirSync(target, { recursive: true });
  }

  readdirSync(source).forEach((fileName) => {
    const filePath = join(source, fileName);

    const isExcluded = excludePatterns.reduce((bool, pattern) => {
      return bool || filePath.includes(pattern);
    }, false);

    if (isExcluded) return;

    if (lstatSync(filePath).isDirectory()) {
      copyTemplates(filePath, join(target, fileName), callback, { excludePatterns });
    } else {
      const { fileName: newFileName, fileContents: newFileContents } = callback({
        fileName,
        fileContents: readFileSync(filePath, 'utf8'),
      });

      writeFileSync(join(target, newFileName), newFileContents);
    }
  });
};

module.exports = copyTemplates;
