const { execSync } = require("node:child_process");

module.exports = function installPackages(packageNames, globalFlag) {
  try {
    const globalArg = globalFlag ? "--global" : "";

    const output = execSync(
      `npm install ${packageNames.join(" ")} ${globalArg} --progress=true`,
      { stdio: "pipe" },
    );
    process.stdout.write(output);

    return true;
  } catch (_) {
    return false;
  }
};
