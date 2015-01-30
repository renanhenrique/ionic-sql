"use strict";
 
angular.module('app.ctrl.notices', [ 
	'ui.router.state'
])

.config(
	function($stateProvider) {
		$stateProvider.state('app.notices', {
			url: '/notices',
			views : {
				'main' : {
					controller: 	'NoticesCtrl as model',
					templateUrl: 	'templates/notices.tpl.html'
				}
			}
		});
	}
)

.controller('NoticesCtrl', 
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