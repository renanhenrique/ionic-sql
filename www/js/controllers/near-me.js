"use strict";

angular.module('app.ctrl.nearMe', [ 
	'ui.router.state'
])

.config(
	function($stateProvider) {
		$stateProvider.state('app.nearMe', {
			url: '/nearMe',
			views : {
				'main' : {
					controller: 	'NearMeCtrl as model',
					templateUrl: 	'templates/near-me.tpl.html'
				}
			}
		});
	}
)

.controller('NearMeCtrl', 
	function($scope, $rootScope, $state) {

		var model 		= this;
		var SESSION 	= $rootScope.SESSION;
		var CONSTANTS 	= $rootScope.CONSTANTS;

		var initView = function() {
			
			model.map = {
				center: {
					latitude: 43.07493,
					longitude: -89.381388
				},
				zoom: 13,
				bounds: {},
				options: {
					scroolwheel: false
				}
			};

			model.randomMarkers = [];
		    // Get the bounds from the map once it's loaded
		    $scope.$watch(function() {
		    	return model.map.bounds;
		    }, function(nv, ov) {
		      // Only need to regenerate once
		      	if (!ov.southwest && nv.southwest) {
		      		var markers = [];
		      		for (var i = 0; i < 30; i++) {
		      			markers.push(createRandomMarker(i, model.map.bounds))
		      		}
		      		model.randomMarkers = markers;
		      	}
		  	}, true);

		}
		
		var createRandomMarker = function(i, bounds, idKey) {
			var lat_min = bounds.southwest.latitude,
			lat_range = bounds.northeast.latitude - lat_min,
			lng_min = bounds.southwest.longitude,
			lng_range = bounds.northeast.longitude - lng_min;

			if (idKey == null) {
				idKey = "id";
			}

			var latitude = lat_min + (Math.random() * lat_range);
			var longitude = lng_min + (Math.random() * lng_range);
			var ret = {
				latitude: latitude,
				longitude: longitude,
				title: 'm' + i
			};
			ret[idKey] = i;
			return ret;
		};


	    initView();

	}
)
;