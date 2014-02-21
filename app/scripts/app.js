'use strict';

angular.module('batteryHistoryApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }) 
		.when('/batteries', {
			templateUrl: 'views/battery-list.html',
			controller: 'BatteriesCtrl'
		})
		.when('/batteries/history/add/:batteryId?', {
			templateUrl: 'views/editor.html',
			controller: 'BatteryCtrl'
		})
		.when('/batteries/:batteryId', {
			templateUrl: 'views/battery-view.html',
			controller: 'BatteryCtrl'
		})
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('batteryHistoryAppDev', ['batteryHistoryApp', 'ngMockE2E'])
	.run(function($httpBackend, $rootScope, DB) {
		function _parseParams(urlStr) {
			var paramstr = urlStr.split('?')[1]
			  , params
			  , obj = {};

			if(paramstr) {
				params = paramstr.split('&');

				params.forEach(function(param) {
					var pair = param.split('=');
					obj[pair[0]] = pair[1];
				});
			}

			return obj;
		}
			
		$httpBackend.whenGET('/api/batteries')
			.respond(function() {
				return [200, DB.getBattery(), {}];
			});

		$httpBackend.whenPOST('/api/batteries')
			.respond(function(method, url, data) {
				DB.saveBattery(angular.fromJson(data));
				return [200];
			});

		$httpBackend.whenPOST(/\/api\/batteries\/[0-9]+/)
			.respond(function(method, url, data) {
				var id = parseInt(url.split('/')[3]);

				DB.saveBattery(angular.fromJson(data), id);

				return [200];
			});

		$httpBackend.whenGET(/\/api\/batteries\/[0-9]+/)
			.respond(function(method, url, data, headers) {
				var id = parseInt(url.split('/')[3]);

				var battery = DB.getBattery({number: id});
				return [200, battery, {}];	
			});

		$httpBackend.whenGET(/\/api\/history(.*)/)
			.respond(function(method, url, data) {
				var params = _parseParams(url);
				console.log(params);
				var history = DB.getHistory(params);
				return [200, history, {}];
			});

		$httpBackend.whenPOST(/\/api\/history(.*)/)
			.respond(function(method, url, data) {
				var params = _parseParams(url);

				console.log(params);
			});

		$httpBackend.whenGET(/^views\//).passThrough();

	});

