const chalk = require("chalk");
const { styledConsoleMessage } = require("../.././shared/styling.util");
const getRandomPackages = require("./getRandomPackages");
const installPackages = require("./installPackages");
const PackageHistoryManager = require("../.././shared/packageHistoryManager");
const runSecurityChecks = require("./runSecurityChecks");

module.exports = (program) => {
  program
    .command("install")
    .alias("i")
    .description("search for a random package to install")
    .option(
      "-a, --amount <number>",
      "specify a number of random packages to install",
      "1",
    )
    .option("-u, --unsafe", "include potentially unsafe packages")
    .option("-g, --global", "install package globally")
    .action(async (providedOptions) => {
      const numberOfPackagesRequested = parseInt(providedOptions.amount);
      const isOnePackageRequested = numberOfPackagesRequested === 1;
      const potentiallyUnsafeStyledSubstring = chalk.redBright(
        "potentially unsafe ",
      );

      const firstStepMessageForOnePackage = `[1/4] 🔎  Searching for a ${providedOptions.unsafe ? potentiallyUnsafeStyledSubstring : ""}lucky package...`;
      const firstStepMessageForMultiplePackages = `[1/4] 🔎  Searching for ${numberOfPackagesRequested} ${providedOptions.unsafe ? potentiallyUnsafeStyledSubstring : ""}lucky packages...`;
      styledConsoleMessage(
        isOnePackageRequested
          ? firstStepMessageForOnePackage
          : firstStepMessageForMultiplePackages,
      );

      while (true) {
        const packages = await getRandomPackages(
          numberOfPackagesRequested,
          providedOptions,
        );

        if (!providedOptions.unsafe) {
          const passedSecurityChecks = runSecurityChecks(packages.names);
          if (!passedSecurityChecks) {
            continue;
          }
        }

        styledConsoleMessage(
          `[2/4] 🎉  Found ${isOnePackageRequested ? "it" : "them"}! ${packages.styledNames.join(" ")}`,
        );

        const installedSuccessfully = installPackages(
          packages.names,
          providedOptions,
        );

        if (installedSuccessfully) {
          PackageHistoryManager.addInstallEvent(packages.names, {
            global: providedOptions.global,
            unsafe: providedOptions.unsafe,
          });

          styledConsoleMessage("");
          styledConsoleMessage(
            `[4/4] ✅ Installed successfully! Run ${chalk.cyan("lucky-package --help")} to see all options`,
          );

          break;
        } else {
          styledConsoleMessage(
            isOnePackageRequested
              ? "🔄  Oops, there was a problem installing that package, finding another one..."
              : "🔄  Oops, there were some problems installing the packages, finding different ones...",
          );
        }
      }
    });
};
