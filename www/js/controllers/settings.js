"use strict";
 
angular.module('app.ctrl.settings', [ 
	'ui.router.state'
])

.config(
	function($stateProvider) {
		$stateProvider.state('app.settings', {
			url: '/settings',
			views : {
				'main' : {
					controller: 	'SettingsCtrl as model',
					templateUrl: 	'templates/settings.tpl.html'
				}
			},
			resolve: {
				
			}
		});
	}
)

.controller('SettingsCtrl',
	function($scope, $rootScope, $ionicPopup, DBService, AppVarsService) {
	
		var model 		= this;
		var SESSION 	= $rootScope.SESSION;
		var CONSTANTS 	= $rootScope.CONSTANTS;

		var initView = function() {
		}
		
		model.resetDatabase = function(){
			DBService.initialize().then(function(){
				var alertPopup = $ionicPopup.alert({
			     	title: 'Reinitialization Complete',
			     	template: ''
			   	});
			   	alertPopup.then(function(res) {});
			});
		}

		initView();
	}
)
;