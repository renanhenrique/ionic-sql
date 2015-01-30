"use strict";
 
angular.module('app.ctrl.recentlyViewed', [ 
	'ui.router.state'
])

.config(
	function($stateProvider) {
		$stateProvider.state('app.recentlyViewed', {
			url: '/recentlyViewed',
			views : {
				'main' : {
					controller: 	'RecentlyViewedCtrl as model',
					templateUrl: 	'templates/recently-viewed.tpl.html'
				}
			},
			resolve: {
				loadPersons: function($rootScope) {
		            return $rootScope.USER.getRecentPersons();
		        },
		        loadHouseholds: function($rootScope) {
		            return $rootScope.USER.getRecentHouseholds();
		        },
		        loadCompanies: function($rootScope) {
		            return $rootScope.USER.getRecentCompanies();
		        }
			}
		});
	}
)

.controller('RecentlyViewedCtrl', 
	function($scope, $rootScope, $state, loadPersons, loadHouseholds, loadCompanies) {
	
		var model 		= this;
		var SESSION 	= $rootScope.SESSION;
		var CONSTANTS 	= $rootScope.CONSTANTS;
		var USER 		= $rootScope.USER;

		var initView = function() {
			model.persons 		= loadPersons;
			model.households 	= loadHouseholds;
			model.companies 	= loadCompanies;

			model.activeTab = 'PSN';
		}

		model.toggleFavorite = function(entity, $event){
			$event.preventDefault();
			entity.toggleFavorite()
		}

		initView();
	}
)
;