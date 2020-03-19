
# ParkingLot v2.0.0
This is ParkingLot source code for interview.

## Directory Structure
**/** : root
**/parking_lot**: source code
**/parking_lot/tests**: unit test file run by mocha
**/bin**: bash scripts file to run program

## Environment requirement
- Nodejs version >= v8.11.4
- Npm version >= 5.6.0

### Testing Environment
Using JS external libraries:
- mocha
- chai
- sinon

## Setup
Execute *setup* bash scripts file. This script will install all dependencies lib and run all tests by **mocha** lib in **/parking_lot** directory.
```sh
./bin/setup
```

## Running App
Execute *parking_lot* bash scripts file with param is testFilePath.
```sh
./bin/parking_lot testFilePath
```