"use strict";
 
angular.module('app.ctrl.search', [ 
	'ui.router.state'
])

.config(
	function($stateProvider) {
		$stateProvider.state('app.search', {
			url: '/search',
			views : {
				'main' : {
					controller: 	'SearchCtrl as model',
					templateUrl: 	'templates/search.tpl.html'
				}
			}
		});
	}
)

.controller('SearchCtrl', 
	function($scope, $rootScope, $state) {
	
		var model 		= this;
		var SESSION 	= $rootScope.SESSION;
		var CONSTANTS 	= $rootScope.CONSTANTS;

		var initView = function() {
		}

		initView();
	}
)
;