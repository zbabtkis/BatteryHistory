'use strict';

angular.module('batteryHistoryApp')
  .factory('Event', function ($resource) {
	return $resource('/api/history/:evtId', {evtId: '@evtId', batNum: '@batNum'}); 
  });
