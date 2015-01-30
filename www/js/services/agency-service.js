"use strict";
 
angular.module('app.service.agency', [
    'app.service.db'
])

.factory('AgencyService', 
    function($rootScope, DBService) {
        
        return {
            getById: function(agencyId) {
                return DBService.selectOne("SELECT * FROM AGENCIES WHERE id=?", [agencyId])
            },
            getByUserId: function(userId) {
                return DBService.select("SELECT * FROM AGENCIES WHERE id IN (SELECT agencyId FROM USER_AGENCIES WHERE userId=?)", [userId])
            }

        }
    }
)