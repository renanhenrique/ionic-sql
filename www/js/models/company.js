"use strict";
// Based on:
//  https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
//  http://javascriptweblog.wordpress.com/2010/06/07/understanding-javascript-prototypes/
//  http://www.webdeveasy.com/angularjs-data-model/
//  http://www.htmlgoodies.com/beyond/javascript/some-javascript-object-prototyping-patterns.html
//  http://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html

angular.module("app.model.company", [
])

.factory('Company',
	function($rootScope, EntityService, Entity, Activity) {

		// Private functions
		// var _privateFnc = function(){};

		// Constructor, with class name
		function Company(startObj) {
			if (startObj) angular.extend(this, startObj);
		};

		// Public methods, assigned to prototype
		Company.prototype = new Entity();

		Company.prototype.loadById = function(companyId) {
	   		var self = this;
			return EntityService.loadById(companyId, $rootScope.USER.id).then(Company.apiResponseTransformer).then(function(company){
				angular.extend(self, company);
				$rootScope.USER.addRecentlyViewed(company.id);
				return self;
			});
		}
	
		
		// Static methods, assigned to class (Instance ('this') is not available in static context)
		Company.build = function(data){
			var company = new Company(data);
			company.isFavorite = (company.isFavorite != undefined); // convert to boolean
			company.activities = Activity.apiResponseTransformer(company.activities);
			if (!company.activities) {
				company.activities = [];
			}
			return company;
		}
		Company.apiResponseTransformer = function(responseData){
			if (responseData == undefined){
				return undefined;
			} else if (angular.isArray(responseData)) {
				return responseData.map(Company.build);
			} else {
				return Company.build(responseData);
			}
		}

		// Calculated properties
		Object.defineProperty(Company.prototype, "fullName", {
			get: function() {
				return this.name;
			}
		});


		return Company;
	}
)
;