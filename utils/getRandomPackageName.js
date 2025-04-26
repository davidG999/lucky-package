const allPackageNames = require('all-the-package-names');
const argv = require('minimist')(process.argv.slice(2));
const isPackageProbablySafe = require("./isPackageProbablySafe");

module.exports = function getRandomPackageName() {
  let randomPackageName;
  const unsafeFlagProvided = argv.unsafe

  while (true) {
    const candidate = allPackageNames[Math.floor(Math.random() * allPackageNames.length)];
    const packagePassedSafetyChecks = isPackageProbablySafe(candidate)

    if (unsafeFlagProvided || packagePassedSafetyChecks) {
      randomPackageName = candidate;
      break;
    }
  }

  return randomPackageName;
}
