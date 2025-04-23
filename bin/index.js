const allNames = require('all-the-package-names');
const { execSync } = require('node:child_process');

const randomName = allNames[Math.floor(Math.random() * allNames.length)];
console.log(`🎲 Installing random package: ${randomName}`);
execSync(`npm install ${randomName}`, { stdio: 'inherit' });
