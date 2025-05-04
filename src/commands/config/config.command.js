const config = require("./config");
const { styledConsoleMessage } = require("../../shared/styling.util");
const chalk = require("chalk");

module.exports = (program) => {
  program
    .command("config")
    .alias("c")
    .description("edit global config options")
    .option(
      "-a, --audit <boolean>",
      "specify whether to run npm audit on installed packages",
    )
    .action(async (providedOptions) => {
      if (providedOptions.audit !== undefined) {
        let auditBooleanValue;

        if (providedOptions.audit === "true") auditBooleanValue = true;
        else if (providedOptions.audit === "false") auditBooleanValue = false;
        else {
          styledConsoleMessage(
            chalk.yellow(
              "⚠️  Invalid value. Please specify either true or false",
            ),
          );
          return;
        }

        config.set("audit", auditBooleanValue);
      }
    });
};
