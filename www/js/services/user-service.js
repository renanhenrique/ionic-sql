"use strict";
 
angular.module('app.service.user', [
	'app.service.db'
])

.factory('UserService', 
    function($rootScope, DBService) {

        return {
            loadByNetworkId: function(networkId) {
                var query = "SELECT * FROM USERS WHERE networkId=?";
		        return DBService.selectOne(query, [networkId])
			}, 
            save: function(obj){
                if (entity.id) {
	                var query = "UPDATE USERS SET firstName=?, lastName=?, defaultAgency=?, email=?, latitude=?, longitude=? WHERE id=?";
			        return DBService.execute(query, [obj.firstName, obj.lastName, obj.defaultAgency, obj.email, obj.latitude, obj.longitude, obj.id]);
			    } else {
					var query = "INSERT INTO USERS (networkId, firstName, lastName, defaultAgency, email, latitude, longitude) VALUES (?,?,?,?,?,?,?)";
			        return DBService.insert(query, [obj.networkId, obj.firstName, obj.lastName, obj.defaultAgency, obj.email, obj.latitude, obj.longitude])
                }
            },
            isRecentlyViewed: function(obj, entityId){
            	return DBService.exists("SELECT * FROM USER_ENTITY_RECENTS WHERE userId=? AND entityId=?", [obj.id, entityId]);
            },
            addRecentlyViewed: function(obj, entityId){
            	return DBService.insertIfNotExists("SELECT * FROM USER_ENTITY_RECENTS WHERE userId=? and entityId=?", [obj.id, entityId], "INSERT INTO USER_ENTITY_RECENTS (userId, entityId) VALUES (?,?)", [obj.id, entityId]);
            }

        }

    }
)

