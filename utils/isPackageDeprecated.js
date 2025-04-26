const { execSync } = require('node:child_process');

module.exports = function isPackageDeprecated(packageName) {
  try {
    const output = execSync(`npm view ${packageName} deprecated`, { encoding: 'utf8' });
    return output && output.trim() !== '';
  } catch {
    return false;
  }
}
