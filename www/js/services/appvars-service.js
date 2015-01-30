"use strict";
 
angular.module('app.service.appvars', [
    'app.service.db'
])

.factory('AppVarsService', 
    function($rootScope, DBService) {
        
        return {
            getByName: function(name) {
                return DBService.selectOne("SELECT value FROM APP_VARS WHERE name=?", [name])
            },
            set: function(name, value) {
                return DBService.insert("INSERT INTO APP_VARS (name, value) VALUES (?, ?)", [name, value])
            }

        }
    }
)