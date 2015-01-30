"use strict";
 
angular.module('app.ctrl.mapTestJavascript', [ 
	'ui.router.state'
])

.config( 
	function($stateProvider) {
		$stateProvider.state('app.mapTestJavascript', {
			url: '/mapTestJavascript',
			views : {
				'main' : {
					controller: 	'MapTestJavascriptCtrl as model',
					templateUrl: 	'templates/map-test-javascript.tpl.html'
				}
			}
		});
	}
)

.controller('MapTestJavascriptCtrl', 
	function($scope, $rootScope, $state, $compile) {
	
		var model 		= this;
		var SESSION 	= $rootScope.SESSION;
		var CONSTANTS 	= $rootScope.CONSTANTS;

		var initView = function() {
			
		}
		
		function initialize() {
	        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
	        
	        var mapOptions = {
	          center: myLatlng,
	          zoom: 16,
	          mapTypeId: google.maps.MapTypeId.ROADMAP
	        };
	        var map = new google.maps.Map(document.getElementById("map"),
	            mapOptions);
	        
	        //Marker + infowindow + angularjs compiled ng-click
	        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
	        var compiled = $compile(contentString)($scope);

	        var infowindow = new google.maps.InfoWindow({
	          content: compiled[0]
	        });

	        var marker = new google.maps.Marker({
	          position: myLatlng,
	          map: map,
	          title: 'Location description...'
	        });

	        google.maps.event.addListener(marker, 'click', function() {
	          infowindow.open(map,marker);
	        });

	        $scope.map = map;
	    }
	    
	    ionic.Platform.ready(initialize);
	      
	    $scope.centerOnMe = function() {
	    	if(!$scope.map) {
	    		return;
	    	}

	        $scope.loading = $ionicLoading.show({
	        	content: 'Getting current location...',
	        	showBackdrop: false
	        });

	        navigator.geolocation.getCurrentPosition(function(pos) {
	        	$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
	        	$scope.loading.hide();
	        }, function(error) {
	        	alert('Unable to get location: ' + error.message);
	        });
	    };
	      
	    $scope.clickTest = function() {
	        alert('Example of infowindow with ng-click')
      	};

		initView();
	}
)
;