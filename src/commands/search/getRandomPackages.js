const chalk = require("chalk");
const { styleTextWithRandomGradient } = require("../../utils/styling.util.js");
const allPackageNames = require("all-the-package-names");
const isPackageProbablySafe = require("../../utils/isPackageProbablySafe");

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

function getRandomPackageName(options = {}) {
  let randomPackageName;
  const unsafeFlagProvided = options.unsafe;

  while (true) {
    const candidate =
      allPackageNames[Math.floor(Math.random() * allPackageNames.length)];
    const packagePassedSafetyChecks = isPackageProbablySafe(candidate);

    if (unsafeFlagProvided || packagePassedSafetyChecks) {
      randomPackageName = candidate;
      break;
    }
  }

  return randomPackageName;
}
