"use strict";
// Based on:
//  https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
//  http://javascriptweblog.wordpress.com/2010/06/07/understanding-javascript-prototypes/
//  http://www.webdeveasy.com/angularjs-data-model/
//  http://www.htmlgoodies.com/beyond/javascript/some-javascript-object-prototyping-patterns.html
//  http://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html

angular.module("app.model.person", [
])

.factory('Person', 
	function($rootScope, $q, EntityService, Entity, Activity) {

		// Private functions
		// var _privateFnc = function(){};

		// Constructor, with class name
		function Person(startObj) {
			if (startObj) angular.extend(this, startObj);
		};

		// Public methods, assigned to prototype
		Person.prototype = new Entity();

		Person.prototype.loadById = function(personId) {
	   		var self = this;
			return EntityService.loadById(personId, $rootScope.USER.id).then(Person.apiResponseTransformer).then(function(person){
				angular.extend(self, person);
				$rootScope.USER.addRecentlyViewed(person.id);
				return self;
			});
		}
	
		
		// Static methods, assigned to class (Instance ('this') is not available in static context)
		Person.build = function(data){
			var person = new Person(data);
			person.isFavorite = (person.isFavorite != undefined); // convert to boolean
			person.activities = Activity.apiResponseTransformer(person.activities);
			if (!person.activities) {
				person.activities = [];
			}
			return person;
		}
		Person.apiResponseTransformer = function(responseData){
			if (responseData == undefined){
				return undefined;
			} else if (angular.isArray(responseData)) {
				return responseData.map(Person.build);
			} else {
				return Person.build(responseData);
			}
		}

		// Calculated properties
		Object.defineProperty(Person.prototype, "fullName", {
			get: function() {
				return this.firstName+' '+this.lastName;
			}
		});



		return Person;
	}
)
;