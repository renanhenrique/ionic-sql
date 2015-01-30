"use strict";
 
angular.module('app.ctrl.households', [ 
	'ui.router.state',
	'app.model.agency'
])

.config(
	function($stateProvider) {
		$stateProvider.state('app.households', {
			url: '/households',
			views : {
				'main' : {
					controller: 	'HouseholdsCtrl as model',
					templateUrl: 	'templates/households.tpl.html'
				}
			},
			resolve: {
				loadHouseholds: function($rootScope, Agency) {
					var USER = $rootScope.USER;
		            return USER.AGENCY.getHouseholds().then(function(households){
			            return households;
		            });
		        }
			}
		});
	}
)

.controller('HouseholdsCtrl', 
	function($scope, $rootScope, $state, loadHouseholds) {
	
		var model 		= this;
		var SESSION 	= $rootScope.SESSION;
		var CONSTANTS 	= $rootScope.CONSTANTS;

		var initView = function() {
			model.households = loadHouseholds;
		}
		
		initView();
	}
)
;