const inputReader = require('./libs/input-reader');
const actionHandler = require('./libs/action-handler');
const utils = require('./libs/utils');

function runParkingLot(inputFilePath) {
  return utils.pipe([
    inputReader.getInput,
    handleCommands
  ])(inputFilePath)
}

function handleCommands(commands) {
  return utils.pipe(commands.map(mappingAction))();
}

function mappingAction({
  action,
  params
}) {
  return actionHandler[action](params)
}
const [filePath] = process.argv.slice(2);
runParkingLot(filePath);