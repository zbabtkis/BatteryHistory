'use strict';

angular.module('batteryHistoryApp')
  .controller('BatteryCtrl', function ($scope, Battery, Message, $routeParams) {
	$scope.battery = null;
	// Pull all batteries from server.
	$scope.batteries = Battery.query();
  });
