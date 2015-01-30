"use strict";
 
angular.module('app.ctrl.company', [ 
	'ui.router.state'
])

.config(
	function($stateProvider) {
		$stateProvider.state('app.company', {
			url: '/company/:companyId',
			views : {
				'main' : {
					controller: 	'CompanyCtrl as model',
					templateUrl: 	'templates/company.tpl.html'
				}
			},
			resolve: {
				loadCompany: function($rootScope, $stateParams, Company) {
					var company 	= new Company();
					var companyId	= $stateParams.companyId;
		            return company.loadById(companyId);	
		        }
			}
		});
	}
)

.controller('CompanyCtrl', 
	function($scope, $rootScope, $state, AddActivityModal, loadCompany) {
	
		var model 		= this;
		var SESSION 	= $rootScope.SESSION;
		var CONSTANTS 	= $rootScope.CONSTANTS;

		var addActivityModal = {};

		var initView = function() {
			model.entity = loadCompany;
			model.activeTab = "DETAIL";

			addActivityModal = new AddActivityModal(model.entity);
		}

		model.showAddNoteModal = function(){
			model.activeTab = "JOURNAL";
			addActivityModal.show();
		};
				
		initView();
	}
)
;
