const chalk = require("chalk");
const { styleTextWithRandomGradient } = require("./styling.util.js");
const getRandomPackageName = require("./getRandomPackageName.js");

module.exports = async function getRandomPackages(amount, options) {
  const names = [];
  const styledNames = [];

  for (let i = 0; i < amount; i++) {
    const name = getRandomPackageName(options);
    names.push(name);
    styledNames.push(
      chalk.bold.underline(await styleTextWithRandomGradient(name)),
    );
  }

  return { names, styledNames };
};
