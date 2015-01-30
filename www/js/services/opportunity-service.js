"use strict";
 
angular.module('app.service.opportunity', [
    'app.service.db'
])

.factory('OpportunityService', 
    function($rootScope, DBService) {

        return {

            loadById: function(opportunityId) {
                return DBService.selectOne("SELECT * FROM ENTITY_OPPORTUNITIES WHERE id=?", [opportunityId])
            },
            getByAgencyId: function(agencyId) {
                return DBService.select("SELECT * FROM ENTITY_OPPORTUNITIES WHERE entityId IN (SELECT entityId FROM ENTITIES WHERE agencyId=?)", [agencyId])
            },
            delete: function(opportunityId) {
                return DBService.execute("DELETE FROM ENTITY_OPPORTUNITIES WHERE id=?", [opportunityId])
            }

        }

    }
)