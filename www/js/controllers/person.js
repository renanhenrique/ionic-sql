"use strict";
 
angular.module('app.ctrl.person', [ 
	'ui.router.state'
])

.config(
	function($stateProvider) {
		$stateProvider.state('app.person', {
			url: '/person/:personId',
			views : {
				'main' : {
					controller: 	'PersonCtrl as model',
					templateUrl: 	'templates/person.tpl.html'
				}
			},
			resolve: {
				loadPerson: function($rootScope, $stateParams, Person) {
					var person 		= new Person();
					var personId	= $stateParams.personId;
					return person.loadById(personId);
		        }
			}
		});
	}
)

.controller('PersonCtrl', 
	function($scope, $rootScope, $state, $ionicPopover, AddActivityModal, loadPerson) {
	
		var model 		= this;
		var SESSION 	= $rootScope.SESSION;
		var CONSTANTS 	= $rootScope.CONSTANTS;

		var addActivityModal = {};

		var initView = function() {
			model.person 	= loadPerson;
			model.activeTab = "DETAIL";

			addActivityModal = new AddActivityModal(model.person);

			$ionicPopover.fromTemplateUrl('popoverMenu.html', {
				scope: $scope
			}).then(function(popoverMenu) {
   				 model.popoverMenu = popoverMenu;
  			});
		};

		model.showAddNoteModal = function(){
			model.activeTab = "JOURNAL";
			addActivityModal.show();
		};

		initView();
	}
)
;