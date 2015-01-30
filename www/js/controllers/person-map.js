"use strict";
 
angular.module('app.ctrl.personMap', [ 
	'ui.router.state'
])

.config(
	function($stateProvider) {
		$stateProvider.state('app.personMap', {
			url: '/personMap/:personId',
			views : {
				'main' : {
					controller: 	'PersonMapCtrl as model',
					templateUrl: 	'templates/person-map.tpl.html'
				}
			},
			resolve: {
				loadPerson: function($rootScope, $stateParams, Person) {
					var person 		= new Person();
					var personId	= $stateParams.personId;
					return person.loadById(personId);
		        }
			}
		});
	}
)

.controller('PersonMapCtrl', 
	function($scope, $rootScope, $state, $ionicLoading, loadPerson) {
	
		var model 		= this;
		var SESSION 	= $rootScope.SESSION;
		var CONSTANTS 	= $rootScope.CONSTANTS;

		var initView = function() {
			model.person = loadPerson;

			model.map = {
	            center: {
	                latitude: model.person.latitude,
	                longitude: model.person.longitude
	            },
	            zoom: 13,
	            fit: false
	        };

 			model.map.markers = [];
        	model.map.markers.push({id:"1", latitude: model.person.latitude, longitude: model.person.longitude, options: {labelAnchor: "80 85", labelContent: model.person.fullName+"<br>"+model.person.addr1, labelClass: 'marker-labels', title: model.person.fullName}});

        	console.log(model.map.markers)
	        //USER.AGENCY.getPersons().then(function(persons){
	        	//model.map.markers = _.map(persons, function(person){
	        	//	return {id: person.id, latitude: person.latitude, longitude: person.longitude}
	        	//})
		    //})

		}

		model.centerOnMe = function () {
			if (!model.map) {
			  return;
			}

			$scope.loading = $ionicLoading.show({
			  content: 'Getting current location...',
			  showBackdrop: false
			});

			navigator.geolocation.getCurrentPosition(function (pos) {
			  console.log('Got pos', pos);
			  model.map.center = {latitude: pos.coords.latitude, longitude: pos.coords.longitude};
			  $ionicLoading.hide();
			}, function (error) {
			  alert('Unable to get location: ' + error.message);
			});
		  };
		
		initView();
	}
)
;