const allPackageNames = require('all-the-package-names');
const isPackageProbablySafe = require("./isPackageProbablySafe");

module.exports = function getRandomPackageName(options = {}) {
  let randomPackageName;
  const unsafeFlagProvided = options.unsafe;

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
