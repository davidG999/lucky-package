#!/usr/bin/env node
const chalk = require('chalk');
const { execSync } = require('node:child_process');
const styleTextWithRandomGradient = require('../utils/styleTextWithRandomGradient.js')
const getRandomPackageName = require('../utils/getRandomPackageName.js')

const message = (text) => console.log(chalk.white(text))

async function main() {
  message('🔎 Searching for a lucky package...')

  const randomPackageName = getRandomPackageName();
  const styledPackageName = await styleTextWithRandomGradient(randomPackageName);

  message(`🎉 Found it! ${chalk.bold.underline(styledPackageName)}`);
  message("🚀 Installing...");
  execSync(`npm install ${randomPackageName}`, { stdio: 'inherit' });
}

main()
