"use strict";
// Based on:
//  https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
//  http://javascriptweblog.wordpress.com/2010/06/07/understanding-javascript-prototypes/
//  http://www.webdeveasy.com/angularjs-data-model/
//  http://www.htmlgoodies.com/beyond/javascript/some-javascript-object-prototyping-patterns.html
//  http://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html

angular.module("app.model.opportunity", [
	'app.service.opportunity'
])

.factory('Opportunity', 
	function(OpportunityService) {

		// Private functions
		// var _privateFnc = function(){};

		// Constructor, with class name
		function Opportunity(startObj) {
			if (startObj) angular.extend(this, startObj);
		};

		// Public methods, assigned to prototype
		Opportunity.prototype = {
		   	loadById: function(opportunityId) {
		   		var self = this;
				return OpportunityService.loadById(opportunityId).then(Opportunity.apiResponseTransformer).then(function(opportunity){
					return opportunity;
				});
			},
			delete: function() {
				return OpportunityService.delete(this.id).then(function(){
					return true;
				})
			}
		};
		
		// Static methods, assigned to class (Instance ('this') is not available in static context)
		Opportunity.build = function(data){
			return new Opportunity(data);
		}
		Opportunity.apiResponseTransformer = function(responseData){
			if (responseData == undefined){
				return undefined;
			} else if (angular.isArray(responseData)) {
				return responseData.map(Opportunity.build);
			} else {
				return Opportunity.build(responseData);
			}
		}


		return Opportunity;
	}
)
;