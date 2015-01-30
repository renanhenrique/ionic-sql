"use strict";
// Based on:
//  https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
//  http://javascriptweblog.wordpress.com/2010/06/07/understanding-javascript-prototypes/
//  http://www.webdeveasy.com/angularjs-data-model/
//  http://www.htmlgoodies.com/beyond/javascript/some-javascript-object-prototyping-patterns.html
//  http://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html

angular.module("app.model.entity", [
])

.factory('Entity', 
	function($rootScope, $q, EntityService, Activity) {

		// Private functions
		// var _privateFnc = function(){};

		// Constructor, with class name
		function Entity(startObj) {
			if (startObj) angular.extend(this, startObj);
		};

		// Public methods, assigned to prototype
		Entity.prototype = {
		   	loadById: function(entityId) {
		   		// impliment
			},
			reload: function(){
                return this.loadById(this.id);
            },
			save: function() {
				return EntityService.save(this);
			},
			toggleFavorite: function(){
				return EntityService.toggleFavorite(this, $rootScope.USER.id);
			},
			addActivity: function(activity){
				var self = this;
				return EntityService.addActivity(this, activity).then(function(){
                    self.reload();
                });;
			}
		};
		
		// Static methods, assigned to class (Instance ('this') is not available in static context)
		Entity.build = function(data){
			// impliment
		}
		Entity.apiResponseTransformer = function(responseData){
			// impliment
		}

		// Calculated properties
		Object.defineProperty(Entity.prototype, "fullName", {
			get: function() {
				return this.firstName+' '+this.lastName;
			}
		});
		Object.defineProperty(Entity.prototype, "fullAddress", {
			get: function() {
				return this.addr1+', '+this.city+', '+this.state;
			}
		});


		return Entity;
	}
)
;