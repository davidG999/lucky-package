const fs = require("fs");
const path = require("path");

const historyFileName = ".lucky-package-history.json";
const HISTORY_FILE = path.join(process.cwd(), historyFileName);

class PackageHistoryManager {
  static readHistory() {
    if (!fs.existsSync(HISTORY_FILE)) return [];
    const content = fs.readFileSync(HISTORY_FILE, "utf-8");
    return JSON.parse(content);
  }

  static writeHistory(history) {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), "utf-8");
  }

  static addInstallEvent(packages, options = {}) {
    const history = this.readHistory();
    history.push({
      timestamp: new Date().toISOString(),
      packages,
      ...options,
    });
    this.writeHistory(history);
  }

  static getLastInstallEvent() {
    const history = this.readHistory();
    return history.length > 0 ? history[history.length - 1] : null;
  }

  static removeLastInstallEvent() {
    const history = this.readHistory();
    if (history.length > 0) {
      history.pop();
      this.writeHistory(history);
    }
  }
}

module.exports = PackageHistoryManager;
