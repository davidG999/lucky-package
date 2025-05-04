const chalk = require("chalk");
const { styleTextWithRandomGradient } = require("../../shared/styling.util.js");
const allPackageNames = require("all-the-package-names");

module.exports = async function getRandomPackages(amount) {
  const names = [];
  const styledNames = [];

  for (let i = 0; i < amount; i++) {
    const name =
      allPackageNames[Math.floor(Math.random() * allPackageNames.length)];
    names.push(name);
    styledNames.push(
      chalk.bold.underline(await styleTextWithRandomGradient(name)),
    );
  }

  return { names, styledNames };
};
