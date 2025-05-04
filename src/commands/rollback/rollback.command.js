const { styledConsoleMessage } = require("../.././shared/styling.util");
const chalk = require("chalk");
const PackageHistoryManager = require("../.././shared/packageHistoryManager");
const uninstallAllPackagesFromHistory = require("./uninstallAllPackagesFromHistory");
const uninstallPackages = require("./uninstallPackages");

module.exports = (program) => {
  program
    .command("rollback")
    .alias("r")
    .description("uninstall packages installed by lucky-package")
    .option("-l, --last", "uninstall last installed packages (default)")
    .option("-a, --all", "uninstall all packages")
    .action((options) => {
      if (options.all && options.last) {
        styledConsoleMessage(
          chalk.red(
            " ❌  Please specify only only one option (--all or --last)",
          ),
        );
        process.exit(1);
      }

      if (options.all) {
        const allEvents = PackageHistoryManager.readHistory();
        uninstallAllPackagesFromHistory(allEvents);
      } else {
        const lastEvent = PackageHistoryManager.getLastInstallEvent();
        if (!lastEvent) {
          styledConsoleMessage(
            chalk.yellow("⚠️  No packages found to uninstall"),
          );
          return;
        }
        if (uninstallPackages(lastEvent.packages, lastEvent.global)) {
          PackageHistoryManager.removeLastInstallEvent();
          styledConsoleMessage("");
          styledConsoleMessage(chalk.green(" ✅ Uninstalled successfully!"));
        } else {
          styledConsoleMessage(
            chalk.red(" ❌ Uninstall failed, please check your environment"),
          );
        }
      }
    });
};
