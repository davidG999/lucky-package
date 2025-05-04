const { execSync } = require("node:child_process");

module.exports = function runSecurityChecks(packageNames) {
  const npqDisabledMarshalls = [
    "MARSHALL_DISABLE_AGE=1",
    "MARSHALL_DISABLE_AUTHOR=1",
    "MARSHALL_DISABLE_DOWNLOADS=1",
    "MARSHALL_DISABLE_REPO=1",
    "MARSHALL_DISABLE_LICENSE=1",
    "MARSHALL_DISABLE_MAINTAINERS_EXPIRED_EMAILS=1",
    "MARSHALL_DISABLE_SIGNATURES=1",
    "MARSHALL_DISABLE_PROVENANCE=1",
  ];

  try {
    const securityCheckOutput = execSync(
      `${npqDisabledMarshalls.join(" ")} npq install ${packageNames.join(" ")} --dry-run`,
    ).toString();

    const possiblyUnsafePackage = securityCheckOutput.includes(
      "Detected possible issues",
    );

    if (possiblyUnsafePackage) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};
