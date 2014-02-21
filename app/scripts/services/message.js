'use strict';

angular.module('batteryHistoryApp')
  .service('Message', function Message($rootScope) {
  	$rootScope.messages = [];	
	function add(msg) {
		$rootScope.messages.push(msg);
	}

	function set(msg) {
		clear();
		// Messages should be aray
		$rootScope.messages = [msg];
	}

	function clear() {
		$rootScope.messages = [];
	}

	return {
		set: set, 

		add: add, 

		success: function(msg) {
			set({success: true, value: msg});
		},

		error: function(msg) {
			set({danger: true, value: msg});
		}
	};
  });
