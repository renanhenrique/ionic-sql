"use strict";
 
angular.module('app.ctrl.persons', [ 
	'ui.router.state'
])

.config(
	function($stateProvider) {
		$stateProvider.state('app.persons', {
			url: '/persons',
			views : {
				'main' : {
					controller: 	'PersonsCtrl as model',
					templateUrl: 	'templates/persons.tpl.html'
				}
			},
			resolve: {
				loadPersons: function($rootScope) {
		            return $rootScope.USER.AGENCY.getPersons();
		        }
			}
		});
	}
)

.controller('PersonsCtrl', 
	function($scope, $rootScope, $state, loadPersons) {
	
		var model 		= this;
		var SESSION 	= $rootScope.SESSION;
		var CONSTANTS 	= $rootScope.CONSTANTS;
		var USER	 	= $rootScope.USER;

		var initView = function() {
			model.persons 		= loadPersons;
		}

		initView();
	}
)
;