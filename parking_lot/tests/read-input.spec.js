const expect = require('chai').expect;
const path = require('path');
const inputReader = require('../libs/input-reader');

describe('Read Input File', function () {
  const inputFilePath = path.join(__dirname, './test_file_inputs.txt');
  it('is existed file in bin/parking_lot/file_inputs.txt', function (done) {
    const data = inputReader.readFile(inputFilePath);
    expect(data).is.not.null;
    done();
  });
  
  it('parse string to command array', function (done) {
    const data = inputReader.parseInputStringToCommands(`create_parking_lot 6
park KA-01-HH-1234`);
    expect(data).has.lengthOf(2);
    expect(data[0]).has.property('action').eq('create_parking_lot');
    expect(data[0]).has.property('params').has.lengthOf(1);
    done();
  });
  
  it('convert input file to command array', function (done) {
    const data = inputReader.getInput(inputFilePath);
    expect(data).has.lengthOf(18);
    expect(data[0]).has.property('action').eq('create_parking_lot');
    expect(data[0]).has.property('params').has.lengthOf(1);
    done();
  });
});
