#!/usr/bin/env node
const { version } = require("../package.json");
const { Command } = require("commander");

const program = new Command();

program.name("lucky-package").version(version);

require("./commands/install/install.command")(program);
require("./commands/rollback/rollback.command")(program);
require("./commands/config/config.command")(program);

program.parse(process.argv);
