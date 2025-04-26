const { execSync } = require('node:child_process');

module.exports = function isPackageWithScripts(packageName) {
  try {
    const scriptsJson = execSync(`npm view ${packageName} scripts --json`, {encoding: 'utf8'});
    if (!scriptsJson || scriptsJson.trim() === 'null') {
      return false;
    }
    const scripts = JSON.parse(scriptsJson);
    return scripts.preinstall || scripts.install || scripts.postinstall;
  } catch {
    return true;
  }
}
