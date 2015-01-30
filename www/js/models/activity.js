"use strict";
// Based on:
//  https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
//  http://javascriptweblog.wordpress.com/2010/06/07/understanding-javascript-prototypes/
//  http://www.webdeveasy.com/angularjs-data-model/
//  http://www.htmlgoodies.com/beyond/javascript/some-javascript-object-prototyping-patterns.html
//  http://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html

angular.module("app.model.activity", [
	
])

.factory('Activity', 
	function() {

		// Private functions
		// var _privateFnc = function(){};

		// Constructor, with class name
		function Activity(startObj) {
			if (startObj) angular.extend(this, startObj);
		};

		// Public methods, assigned to prototype
		Activity.prototype = {
		   	
		};
		
		// Static methods, assigned to class (Instance ('this') is not available in static context)
		Activity.build = function(data){
			return new Activity(data);
		}
		Activity.apiResponseTransformer = function(responseData){
			if (responseData == undefined){
				return undefined;
			} else if (angular.isArray(responseData)) {
				return responseData.map(Activity.build);
			} else {
				return Activity.build(responseData);
			}
		}


		return Activity;
	}
)
;