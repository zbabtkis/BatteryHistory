'use strict';

angular.module('batteryHistoryApp')
  .controller('BatteryCtrl', function ($scope, Battery) {
	$scope.model = new Battery();
	$scope.types = [
	  'S',
	  'LIB'
	  ];

	$scope.save = function() {
		$scope.model.$save();
	};
  });
