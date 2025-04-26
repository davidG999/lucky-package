const isPackageDeprecated = require("./isPackageDeprecated");
const isPackageWithScripts = require("./isPackageWithScripts");

module.exports = function isPackageProbablySafe(packageName) {
  return !isPackageWithScripts(packageName) && !isPackageDeprecated(packageName);
}
