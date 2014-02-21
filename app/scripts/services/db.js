'use strict';

angular.module('batteryHistoryAppDev')
  .service('DB', function DB() {
  	function set(key, obj) {
		localStorage['BH.' + key] = angular.toJson(obj);
	}

	function get(key) {
		return angular.fromJson(localStorage['BH.' + key]);
	}

	function initialize(key, data) {
		if(!get(key)) {
			set(key, data);
		}
	}

	initialize('history', [
		{
			id: 1,
			battery: 0,
			operation: 0,
			volts: 12,
			date: Date.now(),
			location: 'GVDA',
			locString: 'Somewhere important',
			description: 'Testing purposes'
		}, 
		{
			id: 2,
			battery: 0,
			operation: 1,
			volts: 11,
			date: Date.now() + 10000,
			location: 'GVDA',
			locString: 'Somewhere important',
			description: 'added info'
		}, 
		{
			id: 3,
			battery: 2,
			operation: 1,
			volts: 12,
			date: Date.now() - 30000,
			location: 'WLA',
			locString: 'Close to river',
			description: 'New battery'
		},
		{
			id: 4,
			battery: 1,
			operation: 2,
			volts: 12,
			date: Date.now() - 2000,
			location: 'DPK',
			locString: 'In the hut',
			description: 'Seems to be discharging'
		}, 
	]);
	
	initialize('battery', [
		{
			number: 0,
			type: 1, 
			description: 'nothing',
		},
		{
			number: 1,
			type: 0, 
			description: 'more nothing'
		},
		{
			number: 2,
			type: 2, 
			description: 'more of the same'
		}
	]);

	this.getBattery = function(params) {
		var bats = get('battery');

		if(typeof params === 'undefined') return bats;

		for(var i = 0; i < bats.length; i++) {
			for(var p in params) {
				if(bats[i][p] !== params[p]) {
					bats = bats.splice(i, 1);
				}
			}
		}
		
		switch(bats.length) {
			case 0:
				return null;
			case 1:
				return bats[1];
			default:
				return bats;
		}
	};

	this.getHistory = function(params) {
		var hist = get('history');

		if(typeof params === 'undefined')  return hist;

		for(var i = 0; i < hist.length; i++) {
			for(var p in params) {
				if(hist[i][p] !== params[p]) {
					hist = hist.splice(i, 1);	
				}
			}			
		}

		switch(hist.length) {
			case 0:
				return null;
			case 1:
				return hist[1];
			default:
				return hist;
		}
	};

	this.saveBattery = function(obj, id) {
		var bats = get('battery');

		if(typeof id !== 'undefined') {
			bats = bats.map(function(bat) {
				if(bat.number === id) {
					return obj;
				}
				return bat;
			});
		} else {
			bats.push(obj);
		}

		set('battery', bats);
	};

	this.saveHistory = function(obj, id) {
		var hist = get('history');

		if(id) {
			hist.map(function(hist) {
				if(hist.batNum === id) {
					return obj;
				}
				return hist;
			});
		} else {
			hist.push(obj);
		}

		set('history', hist);		
	};
  });
