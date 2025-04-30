#!/usr/bin/env node
const { version } = require("../package.json");
const { Command } = require("commander");

const program = new Command();

program.name("lucky-package").version(version);

require("./commands/search/search")(program);
require("./commands/rollback/rollback")(program);

program.parse(process.argv);
