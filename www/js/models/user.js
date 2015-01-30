"use strict";
// Based on:
//  http://www.webdeveasy.com/angularjs-data-model/
//  http://www.htmlgoodies.com/beyond/javascript/some-javascript-object-prototyping-patterns.html
//  http://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html
//  http://www.htmlgoodies.com/beyond/javascript/some-javascript-object-prototyping-patterns.html
//  http://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html

angular.module("app.model.user", [
	'app.service.user',
	'app.service.agency',
	'app.service.entity',
	'app.model.agency',
	'app.model.person',
	'app.model.household',
	'app.model.company'
])

.factory('User',
	function($rootScope, $q, UserService, AgencyService, Agency, EntityService, Person, Household, Company) { 

		// Private functions
		// var _privateFnc = function(){};

		// Constructor, with class name
		function User(startObj) {
			if (startObj) angular.extend(this, startObj);
		};

		// Public methods, assigned to prototype
		User.prototype = {
		   	loadByNetworkId: function(networkId) {
		   		var self = this;
				return UserService.loadByNetworkId(networkId).then(User.apiResponseTransformer).then(function(user){
					angular.extend(self, user);
					return true;
				});
			}, 
			isRecentlyViewed: function(entityId) {
				return UserService.isRecentlyViewed(this, entityId);
			}, 
			addRecentlyViewed: function(entityId){
				return UserService.addRecentlyViewed(this, entityId);
			},
			getFavoritePersons: function(){
				return EntityService.getFavorites('PSN', this.defaultAgencyId, this.id).then(Person.apiResponseTransformer);
			},
			getFavoriteHouseholds: function(){
				return EntityService.getFavorites('HOU', this.defaultAgencyId, this.id).then(Household.apiResponseTransformer);
			},
			getFavoriteCompanies: function(){
				return EntityService.getFavorites('ORG', this.defaultAgencyId, this.id).then(Company.apiResponseTransformer);
			},
			getRecentPersons: function(){
				return EntityService.getRecentlyViewed('PSN', this.defaultAgencyId, this.id).then(Person.apiResponseTransformer);
			},
			getRecentHouseholds: function(){
				return EntityService.getRecentlyViewed('HOU', this.defaultAgencyId, this.id).then(Household.apiResponseTransformer);
			},
			getRecentCompanies: function(){
				return EntityService.getRecentlyViewed('ORG', this.defaultAgencyId, this.id).then(Company.apiResponseTransformer);
			},
			loadAgencies: function(){
				var self = this;
				return AgencyService.getByUserId(self.id).then(Agency.apiResponseTransformer).then(function(agencies){
					self.AGENCIES 	= agencies;
					self.AGENCY 	= _.find(agencies, {id: self.defaultAgencyId});
					return true;
				});
			},
            save: function(){
                return UserService.save(this);
            }
		};
		
		// Static methods, assigned to class (Instance ('this') is not available in static context)
		User.build = function(data){
			var user = new User(data);

			var deferred = $q.defer();

			var promises 	= [];
			promises.push(
				user.loadAgencies()
			);

        	$q.all(promises).then(function(){
        		deferred.resolve(user);
        	})

			return deferred.promise
		}
		User.apiResponseTransformer = function(responseData){
			if (responseData == undefined){
				return undefined;
			} else if (angular.isArray(responseData)) {
				return responseData.map(User.build);
			} else {
				return User.build(responseData);
			}
		}

		// Calculated properties
		Object.defineProperty(User.prototype, "fullName", {
			get: function() {
				return this.firstName+' '+this.lastName;
			}
		});


		return User;
	}
)
;