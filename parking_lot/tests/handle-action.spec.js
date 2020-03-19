const expect = require('chai').expect;
const sinon = require('sinon');
const actionHandler = require('../libs/action-handler');

describe('Action Handler', function () {
  let consoleStub;
  beforeEach(() => {
    consoleStub = sinon.spy(console, 'log');
  });

  afterEach(() => {
    consoleStub.restore();
  });

  it('create parking lot', function (done) {
    const parkSize = 6;
    const data = actionHandler.create_parking_lot([parkSize])();
    expect(data).has.property('parkSize').eq(parkSize);
    expect(data).has.property('availableSlot').has.lengthOf(parkSize);
    expect(data).has.property('allocatedSlot').has.lengthOf(0);
    expect(consoleStub.withArgs('Created parking lot with 6 slots').calledOnce).is.true;
    done();
  });
  
  it('park a car', function (done) {
    const carNumber = 'KA-01-HH-1234';
    const parkingObj = {
      parkSize: 2,
      registration: {},
      availableSlot: [{
        slotNumber: 0
      }, {
        slotNumber: 1
      }],
      allocatedSlot: []
    }
    const data = actionHandler.park([carNumber])(parkingObj);
    expect(data).has.property('availableSlot').has.lengthOf(1);
    expect(data).has.property('allocatedSlot').has.lengthOf(1);
    expect(data).has.property('registration').has.property(carNumber).has.property('slotNumber');
    expect(consoleStub.withArgs('Allocated slot number: 1').calledOnce).is.true;
    done();
  });
  
  it('park a car when full', function (done) {
    const carNumber = 'KA-01-HH-1234';
    const parkingObj = {
      parkSize: 2,
      registration: {},
      availableSlot: [],
      allocatedSlot: []
    }
    const data = actionHandler.park([carNumber])(parkingObj);
    expect(data).has.property('availableSlot').has.lengthOf(0);
    expect(data).has.property('allocatedSlot').has.lengthOf(0);
    expect(data).has.property('registration').not.has.property(carNumber);
    expect(consoleStub.withArgs('Sorry, parking lot is full').calledOnce).is.true;
    done();
  });
  
  it('leave no regis car', function (done) {
    const carNumber = 'KA-01-HH-1234';
    const parkingHours = 2;
    const parkingObj = {
      parkSize: 2,
      registration: {},
      availableSlot: [],
      allocatedSlot: []
    }
    const data = actionHandler.leave([carNumber, parkingHours])(parkingObj);
    expect(data).has.property('availableSlot').has.lengthOf(0);
    expect(data).has.property('allocatedSlot').has.lengthOf(0);
    expect(data).has.property('registration').not.has.property(carNumber);
    expect(consoleStub.withArgs('Registration number KA-01-HH-1234 not found').calledOnce).is.true;
    done();
  });
  
  it('leave regis car with 2 hour', function (done) {
    const carNumber = 'KA-01-HH-1234';
    const parkingHours = 2;
    const slotNumber = 2
    const parkingObj = {
      parkSize: 3,
      registration: {
        [carNumber]: {
          slotNumber: slotNumber
        }
      },
      availableSlot: [{
        slotNumber: 0
      }, {
        slotNumber: 2
      }],
      allocatedSlot: [{
        carNumber: carNumber,
        slotNumber: slotNumber
      }]
    }
    const data = actionHandler.leave([carNumber, parkingHours])(parkingObj);
    expect(data).has.property('availableSlot').has.lengthOf(3);
    expect(data).has.property('allocatedSlot').has.lengthOf(0);
    expect(data).has.property('registration').not.has.property(carNumber);
    expect(consoleStub.withArgs('Registration number KA-01-HH-1234 with Slot Number 3 is free with Charge 10').calledOnce).is.true;
    done();
  });
  
  it('leave regis car with 4 hours', function (done) {
    const carNumber = 'KA-01-HH-1234';
    const parkingHours = 4;
    const slotNumber = 2
    const parkingObj = {
      parkSize: 3,
      registration: {
        [carNumber]: {
          slotNumber: slotNumber
        }
      },
      availableSlot: [{
        slotNumber: 0
      }, {
        slotNumber: 2
      }],
      allocatedSlot: [{
        carNumber: carNumber,
        slotNumber: slotNumber
      }]
    }
    const data = actionHandler.leave([carNumber, parkingHours])(parkingObj);
    expect(data).has.property('availableSlot').has.lengthOf(3);
    expect(data).has.property('allocatedSlot').has.lengthOf(0);
    expect(data).has.property('registration').not.has.property(carNumber);
    expect(consoleStub.withArgs('Registration number KA-01-HH-1234 with Slot Number 3 is free with Charge 30').calledOnce).is.true;
    done();
  });
    
  it('get status', function (done) {
    const carNumber = 'KA-01-HH-1234';
    const parkingHours = 4;
    const slotNumber = 2
    const parkingObj = {
      parkSize: 3,
      registration: {
        [carNumber]: {
          slotNumber: slotNumber
        }
      },
      availableSlot: [{
        slotNumber: 0
      }, {
        slotNumber: 2
      }],
      allocatedSlot: [{
        carNumber: carNumber,
        slotNumber: slotNumber
      }]
    }
    const data = actionHandler.status([])(parkingObj);
    expect(data).has.property('availableSlot').has.lengthOf(2);
    expect(data).has.property('allocatedSlot').has.lengthOf(1);
    expect(data).has.property('registration').has.property(carNumber);
    expect(consoleStub.withArgs('Slot No.  Registration No.').calledOnce).is.true;
    expect(consoleStub.withArgs('3  KA-01-HH-1234').calledOnce).is.true;
    done();
  });
});
