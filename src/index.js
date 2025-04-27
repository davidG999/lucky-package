#!/usr/bin/env node
const chalk = require("chalk");
const { version } = require("../package.json");
const { styledConsoleMessage } = require("./utils/styling.util.js");
const getRandomPackages = require("./utils/getRandomPackages.js");
const installPackages = require("./utils/installPackages.js");

const { Command } = require("commander");
const program = new Command();

program.name("lucky-package").version(version);

program
  .option(
    "-a, --amount <number>",
    "specify a number of random packages to install",
    1,
  )
  .option("-u, --unsafe", "include potentially unsafe packages")
  .option("-g, --global", "install package globally")
  .action(async (options) => {
    const amount = parseInt(options.amount);
    const isOnePackageRequested = amount === 1;
    const isUnsafeOptionProvided = options.unsafe;
    const isGlobal = options.global;
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
      const installedSuccessfully = installPackages(packages.names, isGlobal);
      console.log("installedSuccessfully", installedSuccessfully);

      if (installedSuccessfully) {
        styledConsoleMessage("");
        styledConsoleMessage(
          `[4/4] ✅  Installed successfully! Run ${chalk.cyan("lucky-package --help")} to see all options`,
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

program.parse(process.argv);
