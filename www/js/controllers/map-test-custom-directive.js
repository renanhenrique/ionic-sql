"use strict";
 
angular.module('app.ctrl.mapTestCustomDirective', [ 
	'ui.router.state'
])

.config(
	function($stateProvider) {
		$stateProvider.state('app.mapTestCustomDirective', {
			url: '/mapTestCustomDirective',
			views : {
				'main' : {
					controller: 	'MapTestCustomDirectiveCtrl as model',
					templateUrl: 	'templates/map-test-custom-directive.tpl.html'
				}
			}
		});
	}
)

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(43.07493, -89.381388),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($element[0], mapOptions);
  
        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      ionic.Platform.ready(initialize);
    }
  }
})

.controller('MapTestCustomDirectiveCtrl',
	function($scope, $rootScope, $state) {
	
		var model 		= this;
		var SESSION 	= $rootScope.SESSION;
		var CONSTANTS 	= $rootScope.CONSTANTS;

		var initView = function() {

		}
		
        $scope.mapCreated = function(map) {
            $scope.map = map;
        };

        $scope.centerOnMe = function () {
            console.log("Centering");
            if (!$scope.map) {
              return;
            }

            $scope.loading = $ionicLoading.show({
              content: 'Getting current location...',
              showBackdrop: false
            });

            navigator.geolocation.getCurrentPosition(function (pos) {
              console.log('Got pos', pos);
              $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
              $scope.loading.hide();
            }, function (error) {
              alert('Unable to get location: ' + error.message);
            });
        };
		
		initView();
	}
)
;