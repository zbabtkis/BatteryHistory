'use strict';

describe('Controller: BatteryCtrl', function () {

  // load the controller's module
  beforeEach(module('batteryHistoryApp'));

  var BatteryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BatteryCtrl = $controller('BatteryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
