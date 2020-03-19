const fs = require('fs');
const utils = require('./utils');

function getInput(filePath) {
  return utils.pipe([
    readFile,
    parseInputStringToCommands
  ])(filePath);
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function parseInputStringToCommands(data) {
  return data
    .split('\n')
    .map(stardardCommand);
}

function stardardCommand(cmdString) {
  const [action, ...params] = cmdString.trim().split(' ');
  return {
    action,
    params
  }
}

module.exports = {
  readFile,
  getInput,
  parseInputStringToCommands
}