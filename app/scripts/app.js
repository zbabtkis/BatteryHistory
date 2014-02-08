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
			.when('/batteries/add', {
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
	.run(function($httpBackend) {
		var Batteries = [
			{
				number: 1,
				type: 'S',
				info: "Some info about it"
			}, {
				number: 2,
				type: 'LIB',
				info: "Just some stuff"
			}
		];

		var History = [
			[
				{
					id: 23,
					batNum: 1,
					op: -1,
					volt: 24000,
					date: 1391809843943,
					location: 1,
					locString: 'GVDA',
					description: "Some longer info"	
				}, {
					id: 21,
					batNum: 1,
					op: 1,
					volt: 18000,
					date: 1391809932034,
					location: 2,
					locString: 'WLA',
					description: "More info here..."
				}
			], [
				{
					id: 15,
					batNum: 2,
					op: 1,
					volt: 120000,
					date: 1391809979141,
					location: 3,
					locString: 'BVDA',
					description: "More info here..."
				}, {
					id: 14,
					batNum: 2,
					op: -1,
					volt: 100000,
					date: 1391809932034,
					location: 3,
					locString: 'BVDA',
					description: "Finally... done"
				}
			]
		];

		$httpBackend.whenGET('/api/batteries')
			.respond(Batteries);

		$httpBackend.whenGET('/api/batteries/:batteryId')
			.respond(function(method, url, data, headers) {
				return batteries[1];
				console.log(arguments);
			});

		$httpBackend.whenGET(/^views\//).passThrough();

	});

