"use strict";
 
angular.module('app.ctrl.household', [ 
	'ui.router.state'
])

.config(
	function config($stateProvider) {
		$stateProvider.state('app.household', {
			url: '/household/:householdId',
			views : {
				'main' : {
					controller: 	'HouseholdCtrl as model',
					templateUrl: 	'templates/household.tpl.html'
				}
			},
			resolve: {
				loadHousehold: function($rootScope, $stateParams, Household) {
					var household 	= new Household();
					var householdId	= $stateParams.householdId;
		            return household.loadById(householdId);		        
		        }
			}
		});
	}
)

.controller('HouseholdCtrl', 
	function($scope, $rootScope, $state, AddActivityModal, loadHousehold) {
	
		var model 		= this;
		var SESSION 	= $rootScope.SESSION;
		var CONSTANTS 	= $rootScope.CONSTANTS;

		var addActivityModal = {};

		var initView = function() {
			model.entity = loadHousehold;
			model.activeTab = "DETAIL";

			addActivityModal = new AddActivityModal(model.entity);
		};

		model.showAddNoteModal = function(){
			model.activeTab = "JOURNAL";
			addActivityModal.show();
		};

		model.goToPerson = function(personId){
			$state.go('app.person', {personId: personId})
		};

		initView();
	}
)
;