"use strict";
 
angular.module('app.ctrl.opportunities', [ 
	'ui.router.state'
])

.config(
	function($stateProvider) {
		$stateProvider.state('app.opportunities', {
			url: '/opportunities',
			views : {
				'main' : {
					controller: 	'OpportunitiesCtrl as model',
					templateUrl: 	'templates/opportunities.tpl.html'
				}
			}
		});
	}
)

.controller('OpportunitiesCtrl', 
	function($scope, $rootScope, $state, $ionicLoading) {
	
		var model 		= this;
		var SESSION 	= $rootScope.SESSION;
		var CONSTANTS 	= $rootScope.CONSTANTS;
		var USER 		= $rootScope.USER;

		var initView = function() {

			$ionicLoading.show({template: 'Loading...', noBackdrop: true});
			USER.AGENCY.getOpportunities(true).then(function(opportunities){
			    model.opportunities = opportunities;
			    $ionicLoading.hide();
		    })

		}

		model.delete = function(opportunity){
			$ionicLoading.show({template: 'Processing...', noBackdrop: true});
			opportunity.delete().then(function(){
			    $ionicLoading.hide();
		    });
		}

		initView();
	}
)
;