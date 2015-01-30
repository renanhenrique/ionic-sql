"use strict";
 
angular.module('app.model.addActivityModal', [
])

.factory('AddActivityModal', 
    function($rootScope, $ionicModal, Activity) {
        
        function AddActivityModal(entity) {

        	var self = this;

			self.entity = entity;
			self.scope = $rootScope.$new();
			self.scope.model = {};

			self.scope.model.createActivity = function(){
				var descr = self.scope.model.descr;
				var activity = new Activity({actType: "NOTE", descr: descr, status: "Not Started", priority: "High", actDate: "02/01/2015"})
				self.entity.addActivity(activity).then(function(){
					self.scope.modal.hide();
				});
			};

	        $ionicModal.fromTemplateUrl('templates/add-activity-modal.tpl.html', {
				scope: self.scope,
	    		animation: 'slide-in-up'
			}).then(function(modal) {
				self.scope.modal = modal;
			});

		};

		// Public methods, assigned to prototype
		AddActivityModal.prototype = {
		   	show: function() {
		   		this.scope.descr = '';
                this.scope.modal.show();
            }
		};

		return AddActivityModal
    }
)


		