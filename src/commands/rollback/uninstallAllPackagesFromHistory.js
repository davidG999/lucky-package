const { styledConsoleMessage } = require("../../shared/styling.util");
const chalk = require("chalk");
const PackageHistoryManager = require("../../shared/packageHistoryManager");
const uninstallPackages = require("./uninstallPackages");

module.exports = function uninstallAllPackagesFromHistory(allEvents) {
  if (!allEvents.length) {
    styledConsoleMessage(chalk.yellow("⚠️  No packages found to uninstall"));
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
    PackageHistoryManager.writeHistory([]);
    styledConsoleMessage(
      chalk.green(" ✅ All packages uninstalled successfully!"),
    );
  }
};
