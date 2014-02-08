'use strict';

angular.module('batteryHistoryApp')
	.controller('MainCtrl', function ($scope, $location, Battery) {
		$scope.battery = null;

		$scope.batteries = Battery.query();

		$scope.viewHistory = function() {
			if($scope.battery) {
				$location.path('/batteries/' + $scope.battery);
			}
		};

		$scope.onCharge = function() {
		};

		$scope.createBattery = function() {
			$location.path('/batteries/add');
		};
	});
