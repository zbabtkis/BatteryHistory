'use strict';

describe('Service: battery', function () {

  // load the service's module
  beforeEach(module('batteryHistoryApp'));

  // instantiate service
  var battery;
  beforeEach(inject(function (_battery_) {
    battery = _battery_;
  }));

  it('should do something', function () {
    expect(!!battery).toBe(true);
  });

});
