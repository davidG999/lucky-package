const chalk = require("chalk");
const { styledConsoleMessage } = require("../../utils/styling.util");
const getRandomPackages = require("./getRandomPackages");
const installPackages = require("./installPackages");
const packageHistory = require("../../utils/packageHistoryManager");

module.exports = (program) => {
  program
    .command("search")
    .alias("s")
    .description("search for a random package to install")
    .option(
      "-a, --amount <number>",
      "specify a number of random packages to install",
      "1",
    )
    .option("-u, --unsafe", "include potentially unsafe packages")
    .option("-g, --global", "install package globally")
    .action(async (options) => {
      const amount = parseInt(options.amount);
      const isOnePackageRequested = amount === 1;
      const isUnsafeOptionProvided = options.unsafe;
      const isGlobalOptionProvided = options.global;
      const potentiallyUnsafeStyledSubstring =
        chalk.redBright("potentially unsafe");

      const firstStepMessageForOnePackage = `[1/4] 🔎  Searching for a ${isUnsafeOptionProvided ? potentiallyUnsafeStyledSubstring : ""}lucky package...`;
      const firstStepMessageForMultiplePackages = `[1/4] 🔎  Searching for ${amount} ${isUnsafeOptionProvided ? potentiallyUnsafeStyledSubstring : ""}lucky packages...`;
      styledConsoleMessage(
        isOnePackageRequested
          ? firstStepMessageForOnePackage
          : firstStepMessageForMultiplePackages,
      );

      while (true) {
        const packages = await getRandomPackages(amount, options);

        styledConsoleMessage(
          `[2/4] 🎉  Found ${isOnePackageRequested ? "it" : "them"}! ${packages.styledNames.join(" ")}`,
        );
        styledConsoleMessage("[3/4] 🚀  Installing...");
        const installedSuccessfully = installPackages(
          packages.names,
          isGlobalOptionProvided,
        );

        if (installedSuccessfully) {
          packageHistory.addInstallEvent(packages.names, {
            global: isGlobalOptionProvided,
            unsafe: isUnsafeOptionProvided,
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
