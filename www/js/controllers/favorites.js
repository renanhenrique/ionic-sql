"use strict";
 
angular.module('app.ctrl.favorites', [ 
	'ui.router.state'
])

.config(
	function($stateProvider) {
		$stateProvider.state('app.favorites', {
			url: '/favorites',
			views : {
				'main' : {
					controller: 	'FavoritesCtrl as model',
					templateUrl: 	'templates/favorites.tpl.html'
				}
			},
			resolve: {
				loadPersons: function($rootScope) {
		            return $rootScope.USER.getFavoritePersons();
		        },
		        loadHouseholds: function($rootScope) {
		            return $rootScope.USER.getFavoriteHouseholds();
		        },
		        loadCompanies: function($rootScope) {
		            return $rootScope.USER.getFavoriteCompanies();
		        }
			}
		});
	}
)

.controller('FavoritesCtrl', 
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