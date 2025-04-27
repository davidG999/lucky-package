#!/usr/bin/env node
const chalk = require("chalk");
const { execSync } = require("node:child_process");
const { version } = require("../package.json");
const {
  styledConsoleMessage,
  styleTextWithRandomGradient,
} = require("./utils/styling.util.js");
const getRandomPackageName = require("./utils/getRandomPackageName.js");

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
    const amountOfPackages = parseInt(options.amount);
    const isOnePackageRequested = amountOfPackages === 1;
    const isUnsafeOptionProvided = options.unsafe;
    const isGlobalOptionProvided = options.global;
    const potentiallyUnsafeStyledSubstring =
      chalk.redBright("potentially unsafe");
    let foundPackageNames = [];
    let styledFoundPackageNames = [];

    const firstStepMessageForOnePackage = `[1/4] 🔎  Searching for a ${isUnsafeOptionProvided ? potentiallyUnsafeStyledSubstring : ""}lucky package...`;
    const firstStepMessageForMultiplePackages = `[1/4] 🔎  Searching for ${amountOfPackages}${isUnsafeOptionProvided ? potentiallyUnsafeStyledSubstring : ""}lucky packages...`;
    styledConsoleMessage(
      isOnePackageRequested
        ? firstStepMessageForOnePackage
        : firstStepMessageForMultiplePackages,
    );

    async function main() {
      foundPackageNames = [];
      styledFoundPackageNames = [];

      for (let i = 0; i < parseInt(options.amount); i++) {
        const randomPackageName = getRandomPackageName(options);
        foundPackageNames.push(randomPackageName);

        const styledPackageName = chalk.bold.underline(
          await styleTextWithRandomGradient(randomPackageName),
        );
        styledFoundPackageNames.push(styledPackageName);
      }

      styledConsoleMessage(
        `[2/4] 🎉  Found ${isOnePackageRequested ? "it" : "them"}! ${styledFoundPackageNames.join(" ")}`,
      );
      tryInstallingPackage();
    }
    await main();

    function tryInstallingPackage() {
      styledConsoleMessage("[3/4] 🚀  Installing...");
      try {
        const output = execSync(
          `npm install ${foundPackageNames.join(" ")} ${isGlobalOptionProvided ? "--global" : ""}`,
          { stdio: "pipe" },
        );
        process.stdout.write(output);

        styledConsoleMessage("");
        styledConsoleMessage(
          `[4/4] ✅  Installed successfully! Run ${chalk.cyan("lucky-package --help")} to see all options`,
        );
      } catch (error) {
        styledConsoleMessage(
          "🔄  Oops, there was a problem installing that package, finding another one...",
        );
        main();
      }
    }
  });

program.parse(process.argv);
