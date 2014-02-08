'use strict';

angular.module('batteryHistoryApp')
  .factory('Battery', function ($resource) {
	return $resource('/api/batteries');
  });
