"use strict";
// Based on:
//  http://www.webdeveasy.com/angularjs-data-model/
//  http://www.htmlgoodies.com/beyond/javascript/some-javascript-object-prototyping-patterns.html
//  http://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html
//  http://www.htmlgoodies.com/beyond/javascript/some-javascript-object-prototyping-patterns.html
//  http://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html

angular.module("app.model.agency", [
	'app.service.agency',
	'app.service.entity',	
	'app.service.opportunity',
	'app.model.person',
	'app.model.household',
	'app.model.company',
	'app.model.opportunity'
])

.factory('Agency',
	function($rootScope, AgencyService, EntityService, OpportunityService, Person, Household, Company, Opportunity) {

		// Constructor, with class name
		function Agency(startObj) {
			if (startObj) angular.extend(this, startObj);
		};

		// Public methods, assigned to prototype
		Agency.prototype = {
		   	loadById: function(agencyId) {
		   		var self = this;
				return AgencyService.getById(agencyId).then(Agency.apiResponseTransformer).then(function(agency){
					angular.extend(self, agency);
					return true;
				});
			},
			getPersons: function(){
				return EntityService.getByAgencyId('PSN', this.id, $rootScope.USER.id).then(Person.apiResponseTransformer);
			},
			getHouseholds: function(){
				return EntityService.getByAgencyId('HOU', this.id, $rootScope.USER.id).then(Household.apiResponseTransformer);
			},
			getCompanies: function(){
				return EntityService.getByAgencyId('ORG', this.id, $rootScope.USER.id).then(Company.apiResponseTransformer);
			},
			getOpportunities: function(){
				return OpportunityService.getByAgencyId(this.id);
			}
		};
		
		// Static methods, assigned to class (Instance ('this') is not available in static context)
		Agency.build = function(data){
			var agency = new Agency(data);
			return agency;
		}
		Agency.apiResponseTransformer = function(responseData){
			if (responseData == undefined){
				return undefined;
			} else if (angular.isArray(responseData)) {
				return responseData.map(Agency.build);
			} else {
				return Agency.build(responseData);
			}
		}

		// Calculated properties
		Object.defineProperty(Agency.prototype, "personCount", {
			get: function() {
				return this.getPersons().then(function(persons){
					return persons.length;
				});
			}
		});
		Object.defineProperty(Agency.prototype, "householdCount", {
			get: function() {
				return this.getHouseholds().then(function(households){
					return households.length;
				});
			}
		});
		Object.defineProperty(Agency.prototype, "companyCount", {
			get: function() {
				return this.getCompanies().then(function(companies){
					return companies.length;
				});
			}
		});
		Object.defineProperty(Agency.prototype, "opportunityCount", {
			get: function() {
				return this.getOpportunities().then(function(opportunities){
					return opportunities.length;
				});
			}
		});
		
		return Agency;
	}
)
;