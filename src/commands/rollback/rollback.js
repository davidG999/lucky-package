const { styledConsoleMessage } = require("../../utils/styling.util");
const chalk = require("chalk");
const packageHistory = require("../../utils/packageHistoryManager");
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
        const allEvents = packageHistory.readHistory();
        uninstallAllPackagesFromHistory(allEvents);
      } else {
        const lastEvent = packageHistory.getLastInstallEvent();
        if (!lastEvent) {
          styledConsoleMessage(
            chalk.yellow("⚠️  No installations found to roll back"),
          );
          return;
        }
        if (uninstallPackages(lastEvent.packages, lastEvent.global)) {
          packageHistory.removeLastInstallEvent();
          styledConsoleMessage(chalk.green(" ✅ Uninstall successful!"));
        } else {
          styledConsoleMessage(
            chalk.red(" ❌ Uninstall failed, please check your environment"),
          );
        }
      }
    });
};
