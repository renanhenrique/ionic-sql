"use strict";
 
angular.module('app.ctrl.opportunity', [ 
	'ui.router.state'
])

.config(
	function($stateProvider) {
		$stateProvider.state('app.opportunity', {
			url: '/opportunity/:opportunityId',
			views : {
				'main' : {
					controller: 	'OpportunityCtrl as model',
					templateUrl: 	'templates/opportunity.tpl.html'
				}
			},
			resolve: {
				loadOpportunity: function($rootScope, $stateParams, Opportunity) {
					var opportunity 	= new Opportunity();
					var opportunityId	= $stateParams.opportunityId;
					return opportunity.loadById(opportunityId);
		        }
			}
		});
	}
)

.controller('OpportunityCtrl', 
	function($scope, $rootScope, $state, $ionicPopover, $ionicPopup, loadOpportunity) {
	
		var model 		= this;
		var SESSION 	= $rootScope.SESSION;
		var CONSTANTS 	= $rootScope.CONSTANTS;

		var initView = function() {
			model.opportunity = loadOpportunity;
		}

		initView();
	}
)
;