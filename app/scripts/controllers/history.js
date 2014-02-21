'use strict';

angular.module('batteryHistoryApp')
  .controller('HistoryCtrl', function ($scope, $routeParams, Event, Message) {
  	$scope.event = new Event();
	$scope.lastEvent = new Event();

	$scope.types = [
	  'S',
	  'LIB'
	  ];

	function _getLatest() {
		if($scope.battery) {
			$scope.lastEvent = Event.get({
				batNum: $scope.battery.number
			});
		}
	}

	$scope.$watch('battery', _getLatest);

	$scope.save = function(evt, changes) {
		// Check if battery has been selected
		if($scope.battery) {
			evt.batNum = $scope.battery.number;
			angular.extend(evt, changes);

			// Persist change to server.
			evt.$save()
				.then(function() {
					Message.success('Event for battery ' + $scope.battery.number + ' saved');
				}, function() {
					// Battery save AJAX call failed. 
					Message.error('Event for battery ' + $scope.battery.number + ' could not be saved');
				});
		} else {
			Message.error('Choose a battery before clicking an action');
		}
	};

	$scope.isCharging = function() {
		return $scope.lastEvent.onCharge ? "charging" : "discharging";
	};

	$scope.onCharge = function() {
		$scope.save($scope.event, {onCharge: true});
	};

	$scope.offCharge = function() {
		$scope.save($scope.event, {onCharge: false});
	};
  });
