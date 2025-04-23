#!/usr/bin/env node
const allNames = require('all-the-package-names');
const { execSync } = require('node:child_process');

function isPackagePotentiallyDangerous(packageName) {
  try {
    const scriptsJson = execSync(`npm view ${packageName} scripts --json`, { encoding: 'utf8' });
    if (!scriptsJson || scriptsJson.trim() === 'null') {
      return false;
    }
    const scripts = JSON.parse(scriptsJson);
    return scripts.preinstall || scripts.install || scripts.postinstall;
  } catch {
    return true;
  }
}

let randomName;
while (true) {
  const candidate = allNames[Math.floor(Math.random() * allNames.length)];
  if (!isPackagePotentiallyDangerous(candidate)) {
    randomName = candidate;
    break;
  }
}

console.log(`🎲 Installing random package: ${randomName}`);
execSync(`npm install ${randomName}`, { stdio: 'inherit' });
