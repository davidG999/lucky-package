const path = require("node:path");
const Conf = require("conf");

const rootPath = path.join(__dirname, "..", "..", "..");

const config = new Conf({
  cwd: rootPath,
  configName: ".lucky-package-config",
});

config.set("audit", false);

module.exports = config;
