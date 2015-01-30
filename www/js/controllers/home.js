"use strict";
 
angular.module('app.ctrl.home', [ 
	'ui.router.state'
])

.config(
	function($stateProvider) {
		$stateProvider.state('app.home', {
			url: '/home',
			views : {
				'main' : {
					controller: 	'HomeCtrl as model',
					templateUrl: 	'templates/home.tpl.html'
				}
			}
		});
	}
)

.controller('HomeCtrl', 
	function ($scope, $rootScope, $state, $ionicModal) {
	
		var model 		= this;
		var SESSION 	= $rootScope.SESSION;
		var USER 		= $rootScope.USER;
		var CONSTANTS 	= $rootScope.CONSTANTS;

		var initView = function() {
			model.personCount 		= undefined;
			model.householdCount 	= undefined;
			model.companyCount 		= undefined;

			USER.AGENCY.getPersons().then(function(persons){
				model.personCount = persons.length;
			});
			USER.AGENCY.getHouseholds().then(function(households){
				model.householdCount = households.length;
			});
			USER.AGENCY.getCompanies().then(function(companies){
				model.companyCount = companies.length;
			});
			USER.AGENCY.getOpportunities(true).then(function(opportunities){
				model.opportunityCount = opportunities.length;
			});

		}

		$ionicModal.fromTemplateUrl('templates/agency-switch-modal.tpl.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

		model.handleAgencySelect = function(agency){
			USER.AGENCY = agency;
			initView();
			$scope.modal.hide()
        }
		
		initView();
	}
)
;