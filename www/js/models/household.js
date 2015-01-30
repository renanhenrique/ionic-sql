"use strict";
// Based on:
//  https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
//  http://javascriptweblog.wordpress.com/2010/06/07/understanding-javascript-prototypes/
//  http://www.webdeveasy.com/angularjs-data-model/
//  http://www.htmlgoodies.com/beyond/javascript/some-javascript-object-prototyping-patterns.html
//  http://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html

angular.module("app.model.household", [
])

.factory('Household', 
	function($rootScope, EntityService, Entity, Activity, Person) {

		// Private functions
		// var _privateFnc = function(){};

		// Constructor, with class name
		function Household(startObj) {
			if (startObj) angular.extend(this, startObj);
		};

		// Public methods, assigned to prototype
		Household.prototype = new Entity();

		Household.prototype.loadById = function(householdId) {
	   		var self = this;
			return EntityService.loadById(householdId, $rootScope.USER.id).then(Household.apiResponseTransformer).then(function(household){
				angular.extend(self, household);
				$rootScope.USER.addRecentlyViewed(household.id);
				return self;
			});
		}


		// Static methods, assigned to class (Instance ('this') is not available in static context)
		Household.build = function(data){
			var household = new Household(data);
			household.isFavorite = (household.isFavorite != undefined); // convert to boolean
			
			household.activities = Activity.apiResponseTransformer(household.activities);
			if (!household.activities) {
				household.activities = [];
			}

			household.members = Person.apiResponseTransformer(household.members);

			return household;
		}
		Household.apiResponseTransformer = function(responseData){
			if (responseData == undefined){
				return undefined;
			} else if (angular.isArray(responseData)) {
				return responseData.map(Household.build);
			} else {
				return Household.build(responseData);
			}
		}

		// Calculated properties
		Object.defineProperty(Household.prototype, "fullName", {
			get: function() {
				return this.name;
			}
		});

		return Household;
	}
)
;