const utils = require('./utils');

function createParkingLot([parkSize = 0]) {
  return () => {
    console.log(`Created parking lot with ${parkSize} slots`);
    return {
      parkSize,
      registration: {},
      availableSlot: createSlot(parkSize),
      allocatedSlot: []
    }
  }
}

function createSlot(parkSize) {
  let availableSlot = [];
  for (let i = 0; i < parkSize; i++) {
    availableSlot.push({
      slotNumber: i
    });
  }
  return availableSlot;
}

function park([carNumber]) {
  return (parkingObj) => {
    const isFullParkingLot = parkingObj.availableSlot.length === 0;
    return isFullParkingLot ? fullParking(parkingObj) : parkACard(parkingObj, carNumber)
  }
}

function fullParking(parkingObj) {
  console.log(`Sorry, parking lot is full`);
  return {
    ...parkingObj
  }
}

function parkACard(parkingObj, carNumber) {
  const [slotInfo, ...availableSlot] = parkingObj.availableSlot;
  const carSlot = {
    carNumber,
    slotInfo,
  }
  const allocatedSlot = pushAllocatedSlot(parkingObj.allocatedSlot, carSlot);
  const registration = regisACar(parkingObj.registration, carSlot);
  console.log(`Allocated slot number: ${slotInfo.slotNumber + 1}`)
  return {
    availableSlot,
    allocatedSlot,
    registration
  }
}

function regisACar(registration, carSlot) {
  return Object.assign({
    [carSlot.carNumber]: carSlot.slotInfo
  }, registration)
}

function pushAllocatedSlot(allocatedSlot, carSlot) {
  return allocatedSlot.concat([{
    slotNumber: carSlot.slotInfo.slotNumber,
    carNumber: carSlot.carNumber,
  }]).sort(sortSlotArray);
}

function leave([carNumber, parkedHour]) {
  return (parkingObj) => {
    const carParkingSlot = getCarParkingSlot(parkingObj.registration, carNumber);
    return !!carParkingSlot ? leaveCar(parkingObj, carParkingSlot, carNumber, parkedHour) : noRegisCar(parkingObj, carNumber);
  }
}

function getCarParkingSlot(registration, carNumber) {
  return registration[carNumber];
}

function noRegisCar(parkingObj, carNumber) {
  console.log(`Registration number ${carNumber} not found`);
  return parkingObj;
}

function leaveCar(parkingObj, carParkingSlot, carNumber, parkedHour) {
  const allocatedSlot = removeAllocatedCar(parkingObj.allocatedSlot, carParkingSlot.slotNumber);
  const availableSlot = pushAvailableSlot(parkingObj.availableSlot, carParkingSlot);
  const registration = unregisCar(parkingObj.registration, carNumber);
  const parkedPrice = getParkedPrice(parkedHour);
  console.log(`Registration number ${carNumber} with Slot Number ${carParkingSlot.slotNumber + 1} is free with Charge ${parkedPrice}`);
  return {
    availableSlot,
    allocatedSlot,
    registration
  }
}

function removeAllocatedCar(allocatedSlot, slotNumber) {
  const i = getIndexOfSlot(allocatedSlot, slotNumber);
  if (i === -1) {
    throw new Error('INVALID_PARKED_CAR');
  }
  allocatedSlot.splice(i, 1);
  return allocatedSlot;
}

function getIndexOfSlot(arr, slotNumber) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    if (arr[i].slotNumber === slotNumber) {
      return i;
    }
  }
  return -1;
}

function pushAvailableSlot(availableSlot, {
  slotNumber
}) {
  return availableSlot.concat([{
    slotNumber
  }]).sort(sortSlotArray);
}

function sortSlotArray(current, next) {
  return current.slotNumber - next.slotNumber
}

function unregisCar(registration, carNumber) {
  delete registration[carNumber];
  return registration;
}

function getParkedPrice(parkedHour) {
  const first2HoursPrice = 10;
  if (parkedHour <= 2) {
    return first2HoursPrice;
  }
  const addtionalHourPrice = 10;
  return first2HoursPrice + (parkedHour - 2) * addtionalHourPrice;
}

function status() {
  return (parkingObj) => {
    printParkingLogStatus(parkingObj);
    return parkingObj;
  }
}

function printParkingLogStatus(parkingObj) {
  console.log(`Slot No.  Registration No.`)
  parkingObj.allocatedSlot.forEach(({
    slotNumber,
    carNumber
  }) => {
    console.log(`${slotNumber + 1}  ${carNumber}`);
  });
}

module.exports = {
  create_parking_lot: createParkingLot,
  park,
  leave,
  status,
}
