"use strict";
 
angular.module('app.ctrl.alerts', [ 
	'ui.router.state'
])

.config(
	function($stateProvider) {
		$stateProvider.state('app.alerts', {
			url: '/alerts',
			views : {
				'main' : {
					controller: 	'AlertsCtrl as model',
					templateUrl: 	'templates/alerts.tpl.html'
				}
			}
		});
	}
)

.controller('AlertsCtrl', 
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