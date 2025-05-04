const { styledConsoleMessage } = require("../.././shared/styling.util");
const chalk = require("chalk");
const { execSync } = require("node:child_process");

module.exports = function uninstallPackages(packages, isGlobal) {
  if (!packages.length) return false;
  const uninstallCmd = `npm uninstall ${packages.join(" ")}${isGlobal ? " --global" : ""}`;
  try {
    styledConsoleMessage(
      ` ⏪ Uninstalling${isGlobal ? " global" : " local"} packages: ${chalk.cyan(packages.join(" "))}`,
    );
    execSync(uninstallCmd, { stdio: "inherit" });
    return true;
  } catch {
    styledConsoleMessage(
      chalk.red(
        ` ❌ Failed to uninstall ${isGlobal ? "global" : "local"} packages: ${packages.join(" ")}`,
      ),
    );
    return false;
  }
};
