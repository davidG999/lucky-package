const { execSync } = require("node:child_process");

module.exports = function installPackages(
  packageNames,
  isGlobalOptionProvided,
) {
  try {
    const globalArg = isGlobalOptionProvided ? "--global" : "";

    const output = execSync(
      `npm install ${packageNames.join(" ")} ${globalArg}`,
      { stdio: "pipe" },
    );
    process.stdout.write(output);

    return true;
  } catch (_) {
    return false;
  }
};
