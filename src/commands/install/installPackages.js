const { execSync } = require("node:child_process");
const { styledConsoleMessage } = require("../.././shared/styling.util");
const config = require("../config/config");

module.exports = function installPackages(packageNames, providedOptions) {
  const globalArg = providedOptions.global ? "--global" : "";
  const audit = config.get("audit");
  const noAuditArg = audit === false ? "--no-audit" : "";

  try {
    styledConsoleMessage(`[3/4] 🚀  Installing...`);

    const installOutput = execSync(
      `npm install ${packageNames.join(" ")} ${globalArg} ${noAuditArg} --no-fund`,
      {
        stdio: "pipe",
      },
    );
    process.stdout.write(installOutput);

    return true;
  } catch (err) {
    return false;
  }
};
