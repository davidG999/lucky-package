const { styledConsoleMessage } = require("../../utils/styling.util");
const chalk = require("chalk");
const packageHistory = require("../../utils/packageHistoryManager");
const uninstallPackages = require("./uninstallPackages");

module.exports = function uninstallAllPackagesFromHistory(allEvents) {
  if (!allEvents.length) {
    styledConsoleMessage(
      chalk.yellow("⚠️  No installations found to roll back"),
    );
    return;
  }

  const globalPackages = new Set();
  const localPackages = new Set();

  for (const event of allEvents) {
    for (const pkg of event.packages) {
      (event.global ? globalPackages : localPackages).add(pkg);
    }
  }

  let anyFailures = false;

  if (globalPackages.size) {
    if (!uninstallPackages([...globalPackages], true)) anyFailures = true;
  }
  if (localPackages.size) {
    if (!uninstallPackages([...localPackages], false)) anyFailures = true;
  }

  styledConsoleMessage("");

  if (anyFailures) {
    styledConsoleMessage(chalk.yellow(" ❌ Some packages failed to uninstall"));
  } else {
    packageHistory.writeHistory([]);
    styledConsoleMessage(
      chalk.green(" ✅ All packages uninstalled successfully!"),
    );
  }
};
