const fs = require("fs");
const path = require("path");

const HISTORY_FILE = path.join(process.cwd(), ".lucky-package-history.json");

function readHistory() {
  if (!fs.existsSync(HISTORY_FILE)) return [];
  const content = fs.readFileSync(HISTORY_FILE, "utf-8");
  return JSON.parse(content);
}

function writeHistory(history) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), "utf-8");
}

function addInstallEvent(packages, options = {}) {
  const history = readHistory();
  history.push({
    timestamp: new Date().toISOString(),
    packages,
    ...options,
  });
  writeHistory(history);
}

function getLastInstallEvent() {
  const history = readHistory();
  return history.length > 0 ? history[history.length - 1] : null;
}

function removeLastInstallEvent() {
  const history = readHistory();
  if (history.length > 0) {
    history.pop();
    writeHistory(history);
  }
}

module.exports = {
  addInstallEvent,
  getLastInstallEvent,
  removeLastInstallEvent,
  readHistory,
  writeHistory,
};
