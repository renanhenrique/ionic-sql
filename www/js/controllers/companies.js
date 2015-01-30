"use strict";
 
angular.module('app.ctrl.companies', [ 
	'ui.router.state'
])

.config( 
	function($stateProvider) {
		$stateProvider.state('app.companies', {
			url: '/companies',
			views : {
				'main' : {
					controller: 	'CompaniesCtrl as model',
					templateUrl: 	'templates/companies.tpl.html'
				}
			},
			resolve: {
				loadCompanies: function($rootScope) {
					var USER = $rootScope.USER;
		            return USER.AGENCY.getCompanies().then(function(companies){
			            return companies;
		            });
		        }
			}
		});
	}
)

.controller('CompaniesCtrl', 
	function($scope, $rootScope, $state, loadCompanies) {
	
		var model 		= this;
		var SESSION 	= $rootScope.SESSION;
		var CONSTANTS 	= $rootScope.CONSTANTS;

		var initView = function() {
			model.companies = loadCompanies;
		}
		
		initView();
	}
)
;
